Ext.define
('VM.view.RequirementStack.Create',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RequirementStackCreate',

    requires: ['Ext.form.Panel'],

    title: 'Create RequirementStack List',
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
              id: 'RequirementStackName',
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
          action: 'CreateRequirementStack'
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

