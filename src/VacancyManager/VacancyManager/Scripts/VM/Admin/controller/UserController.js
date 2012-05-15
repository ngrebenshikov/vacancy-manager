
Ext.define('VM.controller.UserController', {
  extend: 'Ext.app.Controller',

  stores: ['User'],

  models: ['User'],

  views: ['User.List', 'User.Edit', 'User.BanReason'],

  init: function ()
  {
    this.control(
                {
                  'button[action = CreateUser]': {
                    click: this.CreateUser
                  },
                  'button[action = addUser]': {
                    click: this.addUser
                  },
                  'button[action = BanUser]': {
                    click: this.BanUser
                  },
                  'button[action = updateUser]': {
                    click: this.updateUser
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
  }
});