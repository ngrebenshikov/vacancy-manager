Ext.define
('VM.view.Admin.Main',
  {
      extend: 'Ext.tab.Panel',
      alias: 'widget.AdminMain',
      id: 'MainTabPanel',
      title: Strings.AdminTitle,
      activeTab: 0,
      removePanelHeader: false,
      minTabWidth: 50,

      initComponent: function () {
          Ext.applyIf
      (this,
        {
            hbuttons:
          [
            {
                text: "Выход",
                handler: function () {
                    Ext.Ajax.request
                (
                  {
                      url: '../../User/ExtJSLogOff',
                      success: function (result, request) {
                          CreateLoginWindow();
                      }
                  }
                );
                }
            }
          ],
            items:
          [
            {
                tabConfig: {
                    title: Strings.Users
                },
                xtype: 'panel',
                //title: Strings.Users,
                //autoScroll: true,
                layout: 'fit',
                items:
              [
                { xtype: 'UserList' }
              ]
            },
            {
                tabConfig: {
                    title: Strings.Vacancies
                },
                xtype: 'panel',
                //title: "Вакансии",
                //autoScroll: true,
                layout: 'fit',
                items:
              [
                { xtype: 'vacancyList' }
              ]
            },
            {
                tabConfig: {
                    title: Strings.RequirementsTabTitle
                },
                xtype: 'panel',
                layout: {
                    type: 'border'
                },

                autoScroll: true,
                //title: Strings.RequirementsTabTitle,
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
                tabConfig: {
                    title: Strings.Configuration,
                    icon: '/Content/icons/config.png'
                },
                xtype: 'panel',
                //autoScroll: true,
                layout: 'fit',
                items:
                [
                    { xtype: 'SysConfigList' }
                ]
            },
            {
                tabConfig: {
                    title: Strings.Applicants,
                    icon: '/Content/icons/user.png'
                },
                xtype: 'panel',
                //autoScroll: true,
                layout: 'fit',
                items:
                [
                    { xtype: 'ApplicantList' }
                ]
            },
            {
                tabConfig: {
                    title: Strings.MailMessages,
                    id: 'MessageTab',
                    icon: '/Content/icons/email.png'
                },
                xtype: 'panel',
                //autoScroll: true,
                layout: 'fit',
                items:
                [
                    { xtype: 'MailMessageList' }
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

      addHeaderButtons: function (panel) {
          var header = this.getHeader();
          if (panel.hbuttons) {
              for (var i = 0; i < panel.hbuttons.length; i++) {
                  header.add(new Ext.button.Button(
            {
                text: panel.hbuttons[i].text,
                handler: panel.hbuttons[i].handler
            }));
              }
          }
      }
  }
);
