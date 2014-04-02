Ext.define('VM.view.User.ChangePassword', {
    extend: 'Ext.window.Window',
    alias: 'widget.ChangePassword',
    requires: ['Ext.form.Panel'],
    title: 'Забанить/Разбанить',
    layout: 'fit',
    autoShow: true,
    buttonAlign: 'center',
    height: 200,
    width: 400,
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            padding: '5 5 0 5',
            layout: 'anchor',
            border: false,
            style: 'background-color: #fff;',
            items: [{
                xtype: 'textfield',
                anchor: '100%',
                id: 'txtOldUserPassword',
                inputType: 'password',
                name: 'oldpassword',
                fieldLabel: 'Старый пароль',
                allowBlank: false
            }, {
                xtype: 'textfield',
                id: 'txtNewUserPassword',
                anchor: '100%',
                inputType: 'password',
                name: 'newpassword',
                fieldLabel: 'Новый пароль',
                allowBlank: false
            }, {
                xtype: 'textfield',
                id: 'txtConfirmUserPassword',
                inputType: 'password',
                anchor: '100%',
                name: 'confirmpassword',
                fieldLabel: 'Повторите пароль',
                allowBlank: false
            }]
        }];

        this.buttons = [{
            text: 'Сменить пароль',
            action: 'ChangePassword'
        }, {
            text: 'Отмена',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});

