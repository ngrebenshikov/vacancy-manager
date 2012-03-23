Ext.define('TechStack.view.TechStack.Edit', {
  extend: 'Ext.window.Window',
  alias: 'widget.TechStackEdit',

  requires: ['Ext.form.Panel'],

  title: 'Edit TechStack List',
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
                      name: 'name',
                      fieldLabel: 'Name'
                    }
                ]
            }
        ];

    this.buttons = [
            {
              text: 'Save',
              action: 'save'
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

