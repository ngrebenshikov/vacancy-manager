Ext.define
('VM.view.Roles.List',
  {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RolesList',
    requires: ['Ext.toolbar.Toolbar'],
    title: 'Roles List',

    initComponent: function ()
    {
      Ext.apply
      (this,
        {
          items:
          [
            {
              xtype: 'dataview',
              id: 'RolesDataview',
              trackOver: true,
              store: "Roles",
              cls: "DataView-list",
              itemSelector: ".DataView-list-item",
              overItemCls: 'DataView-list-item-hover',
              tpl: '<tpl for="."><div class="DataView-list-item">{Name}</div></tpl>',
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
                  text: 'Add Role',
                  action: 'AddRole'
                },
                {
                  text: 'Remove Role',
                  disabled: true,
                  action: 'RemoveRole'
                }
              ]
            }
          ]
        }
      );
      this.callParent(arguments);
    },

    onSelectionChange: function (selmodel, selection)
    {
      var selected = selection[0],
            button = this.down('button[action=RemoveRole]');
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
