Ext.Loader.setConfig
(
  {
    enabled: true
  }
);

Ext.application
(
  {
    name: 'VM', //'TechStackManager',
    appFolder: '/Scripts/VM/TechStackManager',
    controllers:
    [
      'TechStack',
      'TechListInStack'
    ],
    launch: function () {
      Ext.create('Ext.container.Viewport',
      {
        layout: 'border',
        items:
        [
          { xtype: 'TechStackList' },
          { xtype: 'TechListInStackList' }
        ]
      }
      );
    }
  }
);