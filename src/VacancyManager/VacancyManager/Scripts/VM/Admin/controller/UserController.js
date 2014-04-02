Ext.define('VM.controller.UserController', {
    extend: 'Ext.app.Controller',

    stores: ['User', 'Roles'],

    models: ['User'],

    views: ['User.List', 'User.Edit', 'User.BanReason', 'User.Edit', 'User.ChangePassword'],

    init: function () {
        this.control(
                {
                    'UserList dataview': {
                        itemdblclick: this.callEdit
                    },
                    'button[action=CreateUser]': {
                        click: this.CreateUser
                    },
                    'button[action=addUser]': {
                        click: this.addUser
                    },
                    'button[action=refreshUserList]': {
                        click: this.refreshUserList
                    },
                    'button[action=BanUser]': {
                        click: this.BanUser
                    },
                    'button[action=passworChangeManager]': {
                        click: this.passworChangeManager
                    },

                    'button[action=ChangePassword]': {
                        click: this.ChangePassword
                    },

                    'button[action=callEdit]': {
                        click: this.callEdit
                    },
                    'button[action=ChangeUser]': {
                        click: this.ChangeUser
                    },
                    'button[action=deleteUser]': {
                        click: this.deleteUser
                    },
                    'button[action=banManager]': {
                        click: this.banManager
                    }
                });

    },

    passworChangeManager: function (button) {
        var wndUserChangePassword = Ext.create('VM.view.User.ChangePassword');
        wndUserChangePassword.show();

    },

    ChangePassword: function (button) {
        var wnd = button.up('window'),
            form = wnd.down('form').getForm(),
            values = form.getValues()

        var passwordCredentials = {
            oldpassword: values.oldpassword,
            newpassword: values.newpassword,
            confirmpassword: values.confirmpassword
        };

        Ext.Ajax.request({
            url: '/VMUser/ChangePassword',
            params: { "passwordcredentials": Ext.JSON.encode(passwordCredentials) },
            success: function (result, request) {
                var data = Ext.JSON.decode(result.responseText);
                Ext.MessageBox.show({
                    title: 'Смена пароля',
                    msg: data.message,
                    buttons: Ext.MessageBox.OK
                });
                if (data.success)  { wnd.close(); }
            }
        });

    },

    refreshUserList: function (button) {
        userStore = this.getUserStore();
        userStore.load();
    },

    addUser: function (button) {
        var Userstore = this.getUserStore();
        var wndUserCreate = button.up('window');
        var frm_Userform = wndUserCreate.down('form');
        var newvalues = frm_Userform.getValues();
        Userstore.add(Ext.create('VM.model.User', newvalues));
        wndUserCreate.close();
    },


    CreateUser: function () {
        var wndUserEdit = Ext.create('VM.view.User.Add').show(),
        user = Ext.create('VM.model.User', {
            UserName: 'Новый пользователь',
            Email: 'name@mail.com',
            Password: 'пароль'
        });
        wndUserEdit.down('form').loadRecord(user);
    },

    banManager: function (button) {
        var grid = button.up('grid');
        var sel_User = grid.getView().getSelectionModel().getSelection()[0];
        if (sel_User == undefined)
            return;
        var Userstore = grid.getStore();
        if (!sel_User.get('IsLockedOut')) {
            var BanWindow = Ext.create('VM.view.User.BanReason').show();
            BanWindow.down('form').loadRecord(sel_User);
        }
        else {
            Ext.Msg.show({
                title: 'Разбанить пользователя',
                msg: 'Разбанить пользователя? "' + sel_User.get('UserName') + '"',
                width: 300,
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn == 'yes') {
                        sel_User.set('IsLockedOut', false);
                        Userstore.sync();
                    }
                }
            });
        }
    },

    BanUser: function (button) {
        var BanWindow = button.up('window');
        var BanForm = BanWindow.down('form');
        var sel_User = BanForm.getRecord();
        var newvalues = BanForm.getValues();
        sel_User.set({ LastLockedOutReason: newvalues.LastLockedOutReason,
            IsLockedOut: true
        });
        BanWindow.close();
    },

    deleteUser: function (button) {
        var grid = button.up('grid');
        var sel_User = grid.getView().getSelectionModel().getSelection()[0];
        if (sel_User == undefined)
            return;
        var Userstore = grid.getStore();
        Ext.Msg.show({
            title: 'Удаление пользователя',
            msg: 'Уладить пользователя? "' + sel_User.get('UserName') + '"',
            width: 300,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    if (sel_User) {
                        Userstore.remove(sel_User);
                    }
                }
            }
        });
    },

    callEdit: function (button) {
        var grid = button.up('grid');
        var sel_User = grid.getView().getSelectionModel().getSelection()[0];
        if (sel_User == undefined)
            return;
        changed = false;
        RoleMngWindow = Ext.create('VM.view.User.Edit').show();
        RoleMngWindow.down('form').loadRecord(sel_User);
        roles = sel_User.get("Roles");
        window.parent.setTimeout(function () { RoleMngWindow.CheckSelectedRoles(); }, 0);
    },

    ChangeUser: function (button) {
        var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        values.Roles = roles;
        record.set(values);
        record.save();
        roles = null;
        win.close();
    }
});
var RoleMngWindow; //Нужно для расставления галочек
var roles; //необходимо для правильного обновления модели
var changed = false; //Чтобы не гонять на сервер одни и теже данные если пользователь ничего не поменял и нажал кнопочку change roles