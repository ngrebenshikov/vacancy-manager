Ext.define('VM.view.Admin.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AdminMain',
    id: 'MainTabPanel',
    activeTab: 0,
    bodyStyle: 'background-image: Url(/Content/icons/square.gif);',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bodyPadding: '20 40 20 40',
    initComponent: function () {
        Ext.applyIf(this, {
            items: [{
                xtype: 'panel',
                region: 'west',
                width: 170,
                tabIndex: 1,
                layout: 'vbox',
                bodyStyle: 'background-image: Url(/Content/icons/square.gif);',
                border: false,
                items: [{
                    xtype: 'button',
                    pressed: true,
                    width: 140,
                    icon: '/Content/icons/list.png',
                    text: 'Вакансии',
                    tabIndex: 1,
                    iconAlign: 'left',
                    textAlign: 'left',
                    height: 30,
                    toggleGroup: 'MainGroup',
                    enableToggle: true,        
                    margin: '0 0 4 0',
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'button',
                    pressed: false,
                    iconAlign: 'left',
                    textAlign: 'left',
                    width: 140,
                    text: Strings.Users,
                    tabIndex: 2,
                    icon: '/Content/icons/group.png',
                    toggleGroup: 'MainGroup',
                    enableToggle: true,
                    margin: '0 0 4 0',
                    height: 30,
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'button',
                    pressed: false,
                    width: 140,
                    text: Strings.RequirementsTabTitle,
                    tabIndex: 3,
                    icon: '/Content/icons/doc-m.png',
                    iconAlign: 'left',
                    textAlign: 'left',
                    toggleGroup: 'MainGroup',
                    enableToggle: true,
                    height: 30,
                    margin: '0 0 4 0',
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'button',
                    pressed: false,
                    width: 140,
                    text: Strings.Applicants,
                    icon: '/Content/icons/user.png',
                    tabIndex: 4,
                    iconAlign: 'left',
                    textAlign: 'left',
                    toggleGroup: 'MainGroup',
                    enableToggle: true,
                    margin: '0 0 4 0',
                    height: 30,
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'button',
                    pressed: false,
                    width: 140,
                    text: Strings.MailMessages,
                    icon: '/Content/icons/email.png',
                    tabIndex: 5,
                    iconAlign: 'left',
                    textAlign: 'left',
                    id: 'MessagesTab',
                    toggleGroup: 'MainGroup',
                    enableToggle: true,
                    margin: '0 0 4 0',
                    height: 30,
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'button',
                    pressed: false,
                    width: 140,
                    text: 'Конфигурация',
                    icon: '/Content/icons/config.png',
                    tabIndex: 6,
                    iconAlign: 'left',
                    textAlign: 'left',
                    id: 'ConfigTab',
                    toggleGroup: 'MainGroup',
                    enableToggle: true,
                    margin: '0 0 4 0',
                    height: 30,
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'component',
                    width: 140,
                    html: '<hr><br>'
                }, {
                    xtype: 'button',
                    width: 140,
                    text: 'Сменить пароль',
                    icon: '/Content/icons/ban.gif',
                    action: 'passworChangeManager',
                    iconAlign: 'left',
                    textAlign: 'left',
                    height: 30,
                    margin: '0 0 1 0'
                }, {
                    xtype: 'component',
                    width: 140,
                    html: '<hr><br>'
                }, {
                    xtype: 'button',
                    width: 140,
                    text: 'Выход',
                    height: 30,
                    handler: function () {
                        Ext.Ajax.request({
                            url: '../../VMUser/ExtJSLogOff',
                            success: function (result, request) {
                                CreateLoginWindow();
                            }
                        });
                    }
                }
              ]
            }, {
                xtype: 'form',
                id: 'Containers',
                flex: 1,
                border: false,
                layout: 'card',
                items: [{
                    itemId: 'MainMenuItem1',
                    title: 'Вакансии',
                    xtype: 'vacancyList'
                }, {
                    itemId: 'MainMenuItem2',
                    title: Strings.Users,
                    frame: true,
                    xtype: 'UserList'
                }, {
                    xtype: 'panel',
                    border: false,
                    bodyStyle: 'background-color: #fff;',
                    itemId: 'MainMenuItem3',
                    layout: {
                        type: 'border'
                    },
                    items: [{
                        xtype: 'RequirementStackList',
                        region: 'west'
                    }, {
                        xtype: 'RequirementListInStackList',
                        region: 'center'
                    }]
                }, {
                    itemId: 'MainMenuItem4',
                    title: Strings.Applicants,
                    frame: true,
                    xtype: 'ApplicantList'
                }, {
                    itemId: 'MainMenuItem5',
                    title: Strings.MailMessages,
                    frame: true,
                    xtype: 'MailMessageList'
                }, {
                    itemId: 'MainMenuItem6',
                    title: 'Конфигурация',
                    frame: true,
                    xtype: 'SysConfigList'
                }]
            }]
        });

        this.callParent(arguments);
    }

});