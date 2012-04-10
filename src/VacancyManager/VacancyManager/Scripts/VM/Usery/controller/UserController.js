
Ext.define('VM.controller.UserController', {
    extend: 'Ext.app.Controller',

    stores: ['User'],

    models: ['User'],

    views: ['User.List', 'User.Edit'],

    init: function () {
        this.control(
                {
                    'viewport > Userlist dataview': {
                        itemdblclick: this.editUser
                    },
                    'button[action = loadBlankUser]': {
                        click: this.loadBlankUser
                    },
                    'button[action = addUser]': {
                        click: this.addUser
                    },
                    'button[action = editUser]': {
                        click: this.editUser
                    },
                    'button[action = updateUser]': {
                        click: this.updateUser
                    },
                    'button[action = deleteUser]': {
                        click: this.deleteUser
                    },
                });

    },

    addUser: function (button) {
        var Userstore = this.getUserStore(),
           wndUserEdit = button.up('window');
        console.log(wndUserEdit);
        var 
        frm_Userform = wndUserEdit.down('form'),
           sel_User = frm_Userform.getRecord(),
           newvalues = frm_Userform.getValues();
       var newdate = eval("({ dtm: new Date(newvalues['CreateDate']) })");
        newvalues['CreateDate'] = newdate.dtm;        
       newdate = eval("({ dtm: new Date(newvalues['LaslLoginDate']) })");
        newvalues['LaslLoginDate'] = newdate.dtm;
        console.log( newdate.dtm);           
       newdate = eval("({ dtm: new Date(newvalues['LastLockedOutDate']) })");
        newvalues['LastLockedOutDate'] = newdate.dtm;
        Userstore.add(newvalues);
        wndUserEdit.close();
    },


    loadBlankUser: function () {
    console.log("dwede");
        var wndUserEdit = Ext.create('VM.view.User.Add').show(),
        blankUser = Ext.create('VM.model.User', {
            UserName: 'Новый пользователь',
            Email: 'name@mail.com',
            Password: 'пароль',
            UserComment: 'комментарий',
            CreateDate: new Date(),
            LaslLoginDate: new Date(),
            IsActivated: true,
            IsLockedOut: false,
            LastLockedOutDate: new Date(),
            LastLockedOutReason: 'Причина блокировки',
            EmailKey: 'E-mailkey'
        });
        wndUserEdit.down('form').loadRecord(blankUser);
    },


    editUser: function (button) {
        var grid = button.up('grid'),
           sel_User = grid.getView().getSelectionModel().getSelection()[0],
           wndUserEdit = Ext.create('VM.view.User.Edit').show();
        wndUserEdit.down('form').loadRecord(sel_User);
    },

    updateUser: function (button) {
        var wndUserEdit = button.up('window'),
           frm_Userform = wndUserEdit.down('form'),
           sel_User = frm_Userform.getRecord(),
           newvalues = frm_Userform.getValues();
        console.log(wndUserEdit);
       var newdate = eval("({ dtm: new Date(newvalues['CreateDate']) })");
        newvalues['CreateDate'] = newdate.dtm;        
       newdate = eval("({ dtm: new Date(newvalues['LaslLoginDate']) })");
        newvalues['LaslLoginDate'] = newdate.dtm;           
       newdate = eval("({ dtm: new Date(newvalues['LastLockedOutDate']) })");
        newvalues['LastLockedOutDate'] = newdate.dtm;
        sel_User.set(newvalues);
        wndUserEdit.close();
        this.getUserStore().sync();
    },



    deleteUser: function (button) {
        var grid = button.up('grid'), 
            Userstore = grid.getStore(),
            sel_User = grid.getView().getSelectionModel().getSelection()[0];
        Ext.Msg.show({
            title: 'Удаление пользователя',
            msg: 'Уладить пользователя? "' + sel_User.get('UserName') + '"',
            width: 300,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    if (sel_User) {
                        Userstore.remove(sel_User)
                    }
                }
            }
        });       
    }
});