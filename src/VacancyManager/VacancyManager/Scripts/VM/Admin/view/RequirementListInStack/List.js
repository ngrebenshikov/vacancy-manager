Ext.define('VM.view.RequirementListInStack.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.RequirementListInStackList',
    title: Strings.RequirementListinStack,
    store: 'RequirementListInStack',
    columns: [
      { text: Strings.TitleRequirementName, menuDisabled: true, dataIndex: 'Name', flex: 1 },
      { text: Strings.TitleRequirementNameEn, menuDisabled: true, dataIndex: 'NameEn', flex: 1 },
      {
          xtype: 'actioncolumn',
          width: 50,
          sortable: false,
          align: 'center',
          menuDisabled: true,
          items: [{
              icon: '/ExtLib/resources/themes/images/default/form/exclamation.gif',
              tooltip: 'Удалить',
              handler: function (grid, rowIndex, colIndex) {
                  grid.store.removeAt(rowIndex);
              }
          }]
      }],
    bbar: [{
        text: Strings.AddRequirementToStack,
        id: 'AddRequirementToStack',
        icon: '/Content/icons/add.gif',
        hidden: false,
        action: 'AddRequirement'
    }]
});
