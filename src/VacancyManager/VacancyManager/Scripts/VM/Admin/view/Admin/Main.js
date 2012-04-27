﻿Ext.define
('VM.view.Admin.Main',
  {
    extend: 'Ext.tab.Panel',
    alias: 'widget.AdminMain',
    title: 'Admin',
    activeTab: 0,

    initComponent: function ()
    {
      Ext.applyIf
      (this,
        {
          items:
          [
            {
              xtype: 'panel',
              title: "Пользователи",
              autoScroll: true,
              items:
              [
                { xtype: 'UserList' }
              ]
            },
            {
              xtype: 'panel',
              title: "Вакансии",
              autoScroll: true,
              items:
              [
                { xtype: 'vacancyList' }
              ]
            },
            {
              xtype: 'panel',
              layout: {
                type: 'border'
              },
              autoScroll: true,
              title: "Технологии",
              items:
              [
                {
                  xtype: 'RequirementStackList',
                  region: 'west'
                },
                {
                  xtype: 'RequirementListInStackList',
                  region: 'center'
                }
              ]
            },
            {
              xtype:'panel',
              layout: {
                type: 'fit'
              },
              title: "Роли",
              items:
              [
                {
                  xtype: 'RolesList',
                }
              ]
            }
          ]
        }
      );
      this.callParent(arguments);
    }
  }
);