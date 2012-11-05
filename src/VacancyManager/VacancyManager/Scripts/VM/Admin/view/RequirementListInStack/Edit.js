Ext.define
('VM.view.RequirementListInStack.Edit',
  {
      extend: 'Ext.window.Window',
      alias: 'widget.RequirementListInStackEdit',

      requires: ['Ext.form.Panel'],

      title: Strings.TitleWindowEditRequirement,
      layout: 'fit',
      autoShow: true,
      height: 60,
      width: 280,
      modal: true,

      initComponent: function () {
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
                    fieldLabel: Strings.TitleRequirementName,
                    allowBlank: false
                }
          ]
        }
      ];
          this.buttons =
      [
        {
            text: Strings.btnSave,
            action: 'UpdateRequirement'
        },
        {
            text: Strings.btnCancel,
            scope: this,
            handler: this.close
        }
       ];
          this.callParent(arguments);
      }
  }
);

