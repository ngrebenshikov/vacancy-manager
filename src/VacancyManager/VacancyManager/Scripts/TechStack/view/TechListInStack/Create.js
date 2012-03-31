Ext.define('TechStack.view.TechListInStack.Create', {
  extend: 'Ext.window.Window',
  alias: 'widget.TechCreate',

  requires: ['Ext.form.Panel'],

  title: 'Create Tech',
  layout: 'fit',
  autoShow: true,
  height: 60,
  width: 280,

  initComponent: function ()
  {
    this.items = [
            {
              xtype: 'form',
              padding: '5 5 0 5',
              border: false,
              style: 'background-color: #fff;',

              items: [
                    {
                      xtype: 'textfield',
                      id:'TechName',
                      name: 'Name',
                      fieldLabel: 'Name'
                    }
                ]
            }
        ];

    this.buttons = [
            {
              text: 'Create',
              action: 'CreateTech'
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

