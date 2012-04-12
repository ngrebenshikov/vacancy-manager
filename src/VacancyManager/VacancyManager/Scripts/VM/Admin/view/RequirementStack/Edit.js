Ext.define
('VM.view.RequirementStack.Edit',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RequirementStackEdit',

    requires: ['Ext.form.Panel'],

    title: 'Edit RequirementStack List',
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
          action: 'UpdateRequirementStack'
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

