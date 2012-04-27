﻿Ext.Loader.setConfig
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
    appFolder: '/Scripts/VM/Admin',
    controllers:
    [
      'Admin',
      'RequirementStack',
      'RequirementListInStack',
      'VacancyController',
      'UserController',
      'Roles'
    ],
    launch: function ()
    {
      Ext.create('Ext.container.Viewport',
      {
        layout: 'fit',
        items:
        [
          { xtype: 'AdminMain' }
        ]
      }
      );
    }
  }
);