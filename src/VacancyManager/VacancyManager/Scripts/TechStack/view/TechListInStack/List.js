Ext.define
('TechStack.view.TechListInStack.List',
{
  extend: 'Ext.grid.Panel',
  alias: 'widget.TechListInStackList',

  title: 'Technology List in Stack',
  store: 'TechListInStack',
  region: 'center',
  margins: '5 0 0 0',
  columns:
  [
  { header: 'Name', dataIndex: 'name', flex: 1 }
  ]
}
);
