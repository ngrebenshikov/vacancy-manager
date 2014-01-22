Ext.define
('VM.view.RequirementStack.List',
  {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RequirementStackList',
    requires: ['Ext.toolbar.Toolbar'],
    title: Strings.RequirementStackList,
    collapsible: true,
    animCollapse: true,
    split: true,
    //region: 'west',
    //margins: '5 0 0 0',
    //cmargins: '5 5 0 0',
    width: 290,
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
              id: 'RequirementStackDataview',
              trackOver: true,
              store: "RequirementStack",
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
                  text: Strings.btnAddRequirementStack,
                  action: 'AddRequirementStack'
                },
                {
                  text: Strings.btnRemoveRequirementStak,
                  disabled: true,
                  action: 'RemoveRequirementStack'
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
            button = this.down('button[action=RemoveRequirementStack]');
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
