Ext.define
('VM.view.User.RoleManager',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RoleManager',

    requires: ['Ext.form.Panel'],

    title: 'Role manager',
    layout: 'fit',
    autoShow: true,
    height: 60,
    width: 280,

    initComponent: function ()
    {
      this.items =
      [
        {
          xtype: 'form',
          padding: '5 5 0 5',
          border: false,
          style: 'background-color: #fff;',
          items:
          [
            {
              xtype: 'displayfield',
              name: 'UserName',
              allowBlank: false
            }
          ]
        }
      ];

      this.buttons =
      [
        {
          text: 'Change roles',
          action: 'ChangeRoles'
        },
        {
          text: 'Cancel',
          scope: this,
          handler: this.close
        }
      ];

      this.callParent(arguments);
    }
  }
);

