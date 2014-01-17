Ext.define
('VM.view.RequirementListInStack.Edit',
  {
      extend: 'Ext.window.Window',
      alias: 'widget.RequirementListInStackEdit',

      requires: ['Ext.form.Panel'],

      title: Strings.TitleWindowEditRequirement,
      layout: 'fit',
      autoShow: true,
      height: 180,
      width: 360,
      modal: true,

      initComponent: function () {
          this.items =
      [
        {
            xtype: 'form',
            padding: '5 5 0 5',
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            style: 'background-color: #fff;',
            items:
          [
                {
                    xtype: 'textfield',
                    name: 'Name',
                    fieldLabel: Strings.TitleRequirementName,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'NameEn',
                    fieldLabel: Strings.TitleRequirementNameEn,
                    allowBlank: true
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

