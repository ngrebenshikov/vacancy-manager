Ext.Loader.setConfig
(
  {
    enabled: true
  }
);

Ext.Loader.setPath('Ext.ux', 'ExtLib/ux');

Ext.require('Ext.ux.CheckColumn');

Ext.application
(
  {
    name: 'VM',
    appFolder: '/Scripts/VM/FrontEnd',
    stores: [
     'Resume',
     'ResumeRequirement'
    ],
    controllers: [
     'FrontEnd'
    ],
    launch: function ()
    {
      Ext.create('Ext.container.Viewport',
      {
        layout: 'fit',
        items:
        [{ xtype: 'FrontEndMain'}]
      }
      );
    }
  }
);

var resumeCreated = false,
    Resume = null;