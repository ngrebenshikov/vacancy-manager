Ext.Loader.setConfig
(
  {
    enabled: true
  }
);

Ext.Loader.setPath('Ext.ux', 'ExtLib/ux');

Ext.application
(
  {
    name: 'VM',
    appFolder: '/Scripts/VM/FrontEnd',
    controllers:
    [],
    launch: function ()
    {
      Ext.create('Ext.container.Viewport',
      {
        layout: 'fit',
        items:
        []
      }
      );
    }
  }
);

