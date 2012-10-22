Ext.define
('VM.view.RequirementListInStack.Create',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RequirementCreate',

    requires: ['Ext.form.Panel'],

    title: Strings.TitleWindowCreateRequirement,
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
              fieldLabel: Strings.TitleRequirementName,
              allowBlank: false
            }
          ]
        }
      ];

      this.buttons =
      [
        {
          text: Strings.btnAdd,
          action: 'CreateRequirement'
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

