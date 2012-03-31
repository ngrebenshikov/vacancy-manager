Ext.define('TechStack.view.TechStack.Create', {
  extend: 'Ext.window.Window',
  alias: 'widget.TechStackCreate',

  requires: ['Ext.form.Panel'],

  title: 'Create TechStack List',
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
                      id:'TechStackName',
                      name: 'Name',
                      fieldLabel: 'Name'
                    }
                ]
            }
        ];

    this.buttons = [
            {
              text: 'Create',
              action: 'CreateTechStack'
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

