Ext.define
('VM.view.Admin.Main',
  {
    extend: 'Ext.tab.Panel',
    alias: 'widget.AdminMain',
    title: Strings.AdminTitle,
    activeTab: 0,

    initComponent: function ()
    {
      Ext.applyIf
      (this,
        {
          tools:
          [{
            type: 'close',
            handler: function ()
            {
              Ext.Ajax.request(
                {
                  url: '../../User/ExtJSLogOff'
                });
            }
          }],
          items:
          [
            {
              xtype: 'panel',
              title: Strings.Users,
              autoScroll: true,
              layout: 'fit',
              items:
              [
                { xtype: 'UserList' }
              ]
            },
            {
              xtype: 'panel',
              title: "Вакансии",
              autoScroll: true,
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
              autoScroll: true,
              layout: 'fit',
              items:
                [
                    { xtype: 'SysConfigList' }
                ]
            },
            {
              xtype: 'panel',
              title: "Соискатели",
              autoScroll: true,
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
    }
  }
);