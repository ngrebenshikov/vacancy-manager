Ext.define('VM.controller.UserController', {
  extend: 'Ext.app.Controller',

  stores: ['User', 'Roles'],

  models: ['User'],

  views: ['User.List', 'User.Edit', 'User.BanReason', 'User.RoleManager'],

  init: function ()
  {
    this.control(
                {
                  'UserList dataview': {
                    itemclick: this.ButtonDisabler
                  },
                  'button[action = CreateUser]': {
                    click: this.CreateUser
                  },
                  'button[action = addUser]': {
                    click: this.addUser
                  },
                  'button[action = BanUser]': {
                    click: this.BanUser
                  },
                  'button[action = callRoleManager]': {
                    click: this.callRoleManager
                  },
                  'button[action = ChangeRoles]': {
                    click: this.ChangeRoles
                  },
                  'button[action = deleteUser]': {
                    click: this.deleteUser
                  },
                  'button[action = banManager]': {
                    click: this.banManager
                  }
                });

  },

  addUser: function (button)
  {
    var Userstore = this.getUserStore();
    var wndUserCreate = button.up('window');
    var frm_Userform = wndUserCreate.down('form');
    var sel_User = frm_Userform.getRecord();
    var newvalues = frm_Userform.getValues();
    Userstore.add(Ext.create('VM.model.User', newvalues));
    wndUserCreate.close();
  },


  CreateUser: function ()
  {
    var wndUserEdit = Ext.create('VM.view.User.Add').show(),
        user = Ext.create('VM.model.User', {
          UserName: 'Новый пользователь',
          Email: 'name@mail.com',
          Password: 'пароль'
        });
    wndUserEdit.down('form').loadRecord(user);
  },

  banManager: function (button)
  {
    var grid = button.up('grid');
    //var Userstore = grid.getStore();
    var sel_User = grid.getView().getSelectionModel().getSelection()[0];
    if (sel_User.get('IsActivated'))
    {
      var BanWindow = Ext.create('VM.view.User.BanReason').show();
      BanWindow.down('form').loadRecord(sel_User);
    }
    else
    {
      Ext.Msg.show({
        title: 'Разбанить пользователя',
        msg: 'Разбанить пользователя? "' + sel_User.get('UserName') + '"',
        width: 300,
        buttons: Ext.Msg.YESNO,
        fn: function (btn)
        {
          if (btn == 'yes')
          {
            sel_User.set('IsActivated', true);
            //Userstore.sync();
          }
        }
      });
    }
  },

  BanUser: function (button)
  {
    //var Userstore = this.getUserStore();
    var BanWindow = button.up('window');
    var BanForm = BanWindow.down('form');
    var sel_User = BanForm.getRecord();
    var newvalues = BanForm.getValues();
    newvalues['IsActivated'] = false;
    sel_User.set(newvalues);
    //Userstore.sync();
    BanWindow.close();
  },

  deleteUser: function (button)
  {
    var grid = button.up('grid'),
            Userstore = grid.getStore(),
            sel_User = grid.getView().getSelectionModel().getSelection()[0];
    Ext.Msg.show({
      title: 'Удаление пользователя',
      msg: 'Уладить пользователя? "' + sel_User.get('UserName') + '"',
      width: 300,
      buttons: Ext.Msg.YESNO,
      fn: function (btn)
      {
        if (btn == 'yes')
        {
          if (sel_User)
          {
            Userstore.remove(sel_User);
          }
        }
      }
    });
  },

  callRoleManager: function (button)
  {
    changed = false;
    var grid = button.up('grid');
    var UserStore = grid.getStore();
    var sel_user = grid.getView().getSelectionModel().getSelection()[0];
    RoleMngWindow = Ext.create('VM.view.User.RoleManager').show();
    RoleMngWindow.down('form').loadRecord(sel_user);
    roles = sel_user.get("Roles");
    window.parent.setTimeout(function () { RoleMngWindow.CheckSelectedRoles(); }, 0);
  },

  ChangeRoles: function (button)
  {
    var win = button.up('window');
    if (changed)
    {
      win.down("form").getRecord().set("Roles", roles);
      win.down("form").getRecord().setDirty();
      this.getUserStore().sync();
    }
    roles = null;
    win.close();
  },

  ButtonDisabler: function (button)
  {
    //Добавить сюда функционал хайда кнопок которые могут быть нажаты только если выделен пользователь
    //Ext.Msg.alert('Наше пробное сообщение', 'Hello, World!');
  }
});
var RoleMngWindow; //Нужно для расставления галочек
var roles; //необходимо для правильного обновления модели
var changed = false; //Чтобы не гонять на сервер одни и теже данные если пользователь ничего не поменял и нажал кнопочку change roles