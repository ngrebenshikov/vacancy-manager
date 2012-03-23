Ext.define
('TechStack.view.TechStack.List',
{
  extend: 'Ext.grid.Panel',
  alias: 'widget.TechStackList',

  title: 'Technology Stack List',
  store: 'TechStack',
  collapsible: true,
  animCollapse: true,
  split: true,
  region: 'west',
  margins: '5 0 0 0',
  cmargins: '5 5 0 0',
  width: 175,
  minSize: 100,
  maxSize: 250,
  columns:
  [
  { header: 'Name', dataIndex: 'name', flex: 1 }
  ]
}
);
