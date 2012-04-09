Ext.Loader.setConfig({ enabled: true });

Ext.application({
  name: 'VM',

  appFolder: '/Scripts/VM/Usery',

  controllers: ['UserController'],

  launch: function ()
  {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [
                {
                    xtype: 'UserList'
                }
            ]
    });
  }
});

  