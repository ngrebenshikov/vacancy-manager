Ext.define
('VM.view.RequirementListInStack.Create',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RequirementCreate',

    requires: ['Ext.form.Panel'],

    title: Strings.TitleWindowCreateRequirement,
    layout: 'fit',
    autoShow: true,
    height: 180,
    width: 360,
    modal: true,

    initComponent: function ()
    {
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
              id: 'RequirementName',
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

