
Ext.define('VM.view.User.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.UserAdd',
    title: 'Редактирование пользователей',
    height: 450,
    width: 430,
    autoShow: true,
    modal: true,
    layout: 'fit',
    buttonAlign: 'center',
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                padding: '15 15 5 5',
                border: false,
                style: 'background-color: #fff;',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                {
                    xtype: 'textfield',
                    id: 'txtUserName',
                    fieldLabel: 'Имя пользователя',
                    name: 'UserName',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    id: 'txtEmail',
                    fieldLabel: 'Email',
                    name: 'Email',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    id: 'txtPassword',
                    fieldLabel: 'Password',
                    name: 'Password',
                    allowBlank: false
                }, {
                    xtype: 'textareafield',
                    fieldLabel: 'Комментарий',
                    flex: 1,
                    id: 'txtUserComment',
                    name: 'UserComment',
                    margins: '0',
                    allowBlank: false
                }, {
                    xtype: 'datefield',
                    id: 'dtCreateDate',
                    fieldLabel: 'Дата создания',
                    name: 'CreateDate',
                    allowBlank: false
                }, {
                    xtype: 'datefield',
                    id: 'dtLaslLoginDate',
                    fieldLabel: 'Последний визит',
                    name: 'LaslLoginDate',
                    allowBlank: false
                }, {
                    xtype: 'datefield',
                    id: 'dtLastLockedOutDate',
                    fieldLabel: 'Дата последней блокировки',
                    name: 'LastLockedOutDate',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    id: 'dtLastLockedOutReason',
                    fieldLabel: 'Причина последней блокировки',
                    name: 'LastLockedOutReason',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    id: 'txtEmailKey',
                    name: 'EmailKey',
                    fieldLabel: 'EmailKey',
                    allowBlank: false
                }
             ]
            },
             this.buttons = [{
                 text: 'Сохранить',
                 action: 'addUser'
             }, {
                 text: 'Отмена',
                 scope: this,
                 handler: this.close
             }]
        ];
        this.callParent(arguments);
    }
});