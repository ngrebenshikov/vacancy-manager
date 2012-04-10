Ext.Loader.setConfig
(
  {
    enabled: true
  }
);

Ext.application
(
  {
    name: 'VM',
    appFolder: '/Scripts/VM/RequirementStackManager',
    controllers:
    [
      'RequirementStack',
      'RequirementListInStack'
    ],
    launch: function () {
      Ext.create('Ext.container.Viewport',
      {
        layout: 'border',
        items:
        [
          { xtype: 'RequirementStackList' },
          { xtype: 'RequirementListInStackList' }
        ]
      }
      );
    }
  }
);