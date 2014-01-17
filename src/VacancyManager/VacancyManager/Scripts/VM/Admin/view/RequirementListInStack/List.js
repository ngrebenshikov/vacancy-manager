Ext.define
('VM.view.RequirementListInStack.List',
  {
    extend: 'Ext.grid.Panel',
    alias: 'widget.RequirementListInStackList',
    title: Strings.RequirementListinStack,
    store: 'RequirementListInStack',
    //region: 'center',
    //margins: '5 0 0 0',
    columns:
    [
      { text: Strings.TitleRequirementName, menuDisabled: true, dataIndex: 'Name', flex: 1 },
      { text: Strings.TitleRequirementNameEn, menuDisabled: true, dataIndex: 'NameEn', flex: 1 },
      {
        xtype: 'actioncolumn',
        width: 50,
        sortable: false,
        menuDisabled:true,
        items:
        [{
          icon: '/ExtLib/resources/themes/images/default/form/exclamation.gif',
          tooltip: 'Удалить',
          handler: function (grid, rowIndex, colIndex)
          {
            grid.store.removeAt(rowIndex);
          }
        }]
      }
    ],
    dockedItems:
    [{
      xtype: 'toolbar',
      items:
      [
        {
          text: Strings.AddRequirementToStack,
          id: 'AddRequirementToStack',
          hidden: false,
          action: 'AddRequirement'
        }
      ]
    }]
  }
);
