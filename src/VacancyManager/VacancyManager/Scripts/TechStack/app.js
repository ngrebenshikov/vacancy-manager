Ext.application
(
  {
    name: 'TechStack',
    appFolder: '/Scripts/TechStack',
    controllers:
    [
      'TechStack',
      'TechListInStack'
    ],
    launch: function()
    {
      Ext.create('Ext.container.Viewport',
      {
        layout:'border',
        items:
        [
          {xtype: 'TechStackList'},
          {xtype: 'TechListInStackList'}
        ]
      }
      );
    }
  }
);