Ext.define
('VM.view.RequirementStack.Create',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RequirementStackCreate',

    requires: ['Ext.form.Panel'],

    title: Strings.CreateRequirementStackList,
    layout: 'fit',
    autoShow: true,
    height: 60,
    width: 280,
    modal: true,

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
              fieldLabel: Strings.TitleRequirementStackName,
              allowBlank: false
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

