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
    appFolder: '/Scripts/VM/Admin',
    controllers:
    [
      'Admin'
    ],
    launch: function ()
    {
      Ext.create('Ext.container.Viewport',
      {
        layout: 'fit',
        items:
        [
          {xtype: 'AdminMain'}
        ]
      }
      );
    }
  }
);