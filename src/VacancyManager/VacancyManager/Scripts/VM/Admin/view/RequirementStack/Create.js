Ext.define
('VM.view.RequirementStack.Create',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RequirementStackCreate',

    requires: ['Ext.form.Panel'],

    title: Strings.CreateRequirementStackList,
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
              id: 'RequirementStackName',
              name: 'Name',
              fieldLabel: Strings.TitleRequirementStackName,
              allowBlank: false
            },
            {
                xtype: 'textfield',
                id: 'RequirementStackNameEn',
                name: 'NameEn',
                fieldLabel: Strings.TitleRequirementStackNameEn,
                allowBlank: true
            }
          ]
        }
      ];

      this.buttons =
      [
        {
            text: Strings.btnAdd,
          action: 'CreateRequirementStack'
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

