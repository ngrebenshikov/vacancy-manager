﻿Ext.define
('VM.view.Admin.Main',
  {
    extend: 'Ext.tab.Panel',
    alias: 'widget.AdminMain',
    title: Strings.AdminTitle,
    activeTab: 0,
    removePanelHeader: false,

    initComponent: function ()
    {
      Ext.applyIf
      (this,
        {
          hbuttons:
          [
            {
              text: "Log out",
              handler: function ()
              {
                Ext.Ajax.request(
              {
                url: '../../User/ExtJSLogOff',
                success: function (result, request)
                {
                  CreateLoginWindow();
                }
              });
              }
            }
          ],
          items:
          [
            {
              xtype: 'panel',
              title: Strings.Users,
              layout: 'fit',
              //autoScroll: true,
              items:
              [
                { xtype: 'UserList' }
              ]
            },
            {
              xtype: 'panel',
              title: "Вакансии",
              //autoScroll: true,
              layout: 'fit',
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
              title: Strings.RequirementsTabTitle,
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
              xtype: 'panel',
              title: "Конфигурация",
              //autoScroll: true,
              layout: 'fit',
              items:
                [
                    { xtype: 'SysConfigList' }
                ]
            },
            {
              xtype: 'panel',
              title: "Соискатели",
              //autoScroll: true,
              layout: 'fit',
              items:
                [
                    { xtype: 'ApplicantList' }
                ]
            }
          /*{
          xtype:'panel',
          layout: {
          type: 'fit'
          },
          title: "Роли",
          items:
          [
          {
          xtype: 'RolesList'
          }
          ]
          }*/
          ]
        }
      );
      this.callParent(arguments);
      this.on("render", this.addHeaderButtons, this);
    },

    addHeaderButtons: function (panel)
    {
      var header = this.getHeader();
      if (panel.hbuttons)
      {
        for (var i = 0; i < panel.hbuttons.length; i++)
        {
          header.add(new Ext.button.Button(
            {
              text: panel.hbuttons[0].text,
              handler: panel.hbuttons[0].handler
            }));
        }
      }
    }
  }
);
