Ext.define
('VM.view.Roles.Create',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RoleCreate',

    requires: ['Ext.form.Panel'],

    title: 'Create Role',
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
              xtype: 'textfield',
              id:'RoleName',
              name: 'Name',
              fieldLabel: 'Name',
              allowBlank: false
            }
          ]
        }
      ];

      this.buttons =
      [
        {
          text: 'Create',
          action: 'CreateRole'
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

