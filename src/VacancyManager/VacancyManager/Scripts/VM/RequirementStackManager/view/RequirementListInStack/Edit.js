Ext.define
('VM.view.RequirementListInStack.Edit',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RequirementListInStackEdit',

    requires: ['Ext.form.Panel'],

    title: 'Edit Requirementnology',
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
          text: 'Save',
          action: 'UpdateRequirement'
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

