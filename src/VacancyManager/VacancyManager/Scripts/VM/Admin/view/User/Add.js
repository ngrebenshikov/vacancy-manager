
Ext.define('VM.view.User.Add', {
  extend: 'Ext.window.Window',
  alias: 'widget.UserAdd',
  title: 'Создание нового пользователя',
  height: 175,
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
                  allowBlank: false,
                  regex: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                }, {
                  xtype: 'textfield',
                  id: 'txtPassword',
                  fieldLabel: 'Password',
                  name: 'Password',
                  allowBlank: false
                }
             ]
            },
             this.buttons = [{
               text: 'Создать',
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