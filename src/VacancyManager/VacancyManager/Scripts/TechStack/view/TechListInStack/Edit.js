Ext.define('TechStack.view.TechListInStack.Edit', {
  extend: 'Ext.window.Window',
  alias: 'widget.TechListInStackEdit',

  requires: ['Ext.form.Panel'],

  title: 'Edit Technology',
  layout: 'fit',
  autoShow: true,
  height: 60,
  width: 280,

  initComponent: function () {
    this.items = [
            {
              xtype: 'form',
              padding: '5 5 0 5',
              border: false,
              style: 'background-color: #fff;',
              items: [
                    {
                      xtype: 'textfield',
                      name: 'Name',
                      fieldLabel: 'Name'
                    }
                ]
            }
        ];
    this.buttons = [
            {
              text: 'Save',
              action: 'UpdateTech'
            },
            {
              text: 'Cancel',
              scope: this,
              handler: this.close
            }
        ];
    this.callParent(arguments);
  }
});

