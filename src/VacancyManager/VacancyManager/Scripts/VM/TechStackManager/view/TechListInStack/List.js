Ext.define
('VM.view.TechListInStack.List',
  {
    extend: 'Ext.grid.Panel',
    alias: 'widget.TechListInStackList',
    title: 'Technology List in Stack',
    store: 'TechListInStack',
    region: 'center',
    margins: '5 0 0 0',
    columns:
    [
      { header: 'Name', menuDisabled: true, dataIndex: 'Name', flex: 1 },
      {
        xtype: 'actioncolumn',
        width: 50,
        sortable: false,
        menuDisabled:true,
        items:
        [{
          icon: '/ExtLib/resources/themes/images/default/form/exclamation.gif',
          tooltip: 'Delete technology',
          handler: function (grid, rowIndex, colIndex)
          {
            grid.store.removeAt(rowIndex);
            grid.store.sync();
            //Ext.Msg.alert('Debug', grid.store.getAt(rowIndex).get('Name'));
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
          text: 'Add Technology to Stack',
          id: 'AddTechToStack',
          hidden: false,
          action: 'AddTech'
        }
      ]
    }]
  }
);
