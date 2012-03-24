Ext.define
('TechStack.view.TechStack.List',
  {
    extend: 'Ext.panel.Panel',
    alias: 'widget.TechStackList',
    requires: ['Ext.toolbar.Toolbar'],
    title: 'Technology Stack List',
    //store: 'TechStack',
    collapsible: true,
    animCollapse: true,
    split: true,
    region: 'west',
    margins: '5 0 0 0',
    cmargins: '5 5 0 0',
    width: 270,
    minSize: 100,
    maxSize: 250,

    initComponent: function ()
    {
      Ext.apply
      (this,
        {
          items:
          [
            {
              xtype: 'dataview',
              trackOver: true,
              store: "TechStack",
              cls: "TechStack-list",
              itemSelector: ".TechStack-list-item",
              overItemCls: 'TechStack-list-item-hover',
              tpl: '<tpl for="."><div class="TechStack-list-item">{Name}</div></tpl>',
              listeners:
              {
                selectionchange: this.onSelectionChange,
                scope: this
              }
            }
          ],

          dockedItems:
          [
            {
              xtype: 'toolbar',
              items:
              [
                {
                  text: 'Add Technology Stack',
                  action: 'AddTechnologyStack'
                },
                {
                  text: 'RemoveTechnologyStack',
                  disabled: true,
                  action: 'RemoveTechnologyStack'
                }
              ]
            }
          ]
        }
      );
      this.callParent(arguments);
    },
    /*requires: ['Ext.toolbar.Toolbar'],

    columns:
    [
    { header: 'Technology Stack', dataIndex: 'Name', flex: 1 }
    ],

    dockedItems:
    [
    {
    xtype: 'toolbar',
    items:
    [
    {
    id: 'AddTechnologyStack',
    text: 'Add Technology Stack',
    action: 'AddTechnologyStack'
    },
    {
    id: 'RemoveTechnologyStack',
    text: 'Remove Technology Stack',
    disabled: true,
    action: 'RemoveTechnologyStack'
    }
    ]
    }
    ]
    },*/

    onSelectionChange: function (selmodel, selection)
    {
      var selected = selection[0],
            button = this.down('button[action=RemoveTechnologyStack]');
      if (selected)
      {
        button.enable();
      }
      else
      {
        button.disable();
      }
    }
  }
);
