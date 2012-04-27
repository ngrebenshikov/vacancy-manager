Ext.define
('VM.view.RequirementListInStack.Create',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RequirementCreate',

    requires: ['Ext.form.Panel'],

    title: 'Create Requirement',
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
              id: 'RequirementName',
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
          action: 'CreateRequirement'
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

