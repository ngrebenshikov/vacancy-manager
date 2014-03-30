
Ext.define('VM.view.Admin.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AdminMain',
    id: 'MainTabPanel',
    activeTab: 0,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bodyPadding: 10,
    initComponent: function () {
        Ext.applyIf(this, {
            items: [{
                xtype: 'panel',
                region: 'west',
                width: 150,
                tabIndex: 1,
                layout: 'vbox',
                border: false,
                items: [{
                    xtype: 'button',
                    pressed: true,
                    width: 130,
                    icon: '/Content/icons/list.png',
                    text: 'Вакансии',
                    tabIndex: 1,
                    iconAlign: 'left',
                    textAlign: 'left',
                    toggleGroup: 'MainGroup',
                    enableToggle: true,
                    scale: 'medium',
                    margin: '0 0 1 0',
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'button',
                    pressed: false,
                    iconAlign: 'left',
                    textAlign: 'left',
                    width: 130,
                    text: Strings.Users,
                    tabIndex: 2,
                    icon: '/Content/icons/group.png',
                    toggleGroup: 'MainGroup',
                    scale: 'medium',
                    enableToggle: true,
                    margin: '0 0 1 0',
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'button',
                    pressed: false,
                    width: 130,
                    text: Strings.RequirementsTabTitle,
                    tabIndex: 3,
                    icon: '/Content/icons/doc-m.png',
                    iconAlign: 'left',
                    textAlign: 'left',
                    toggleGroup: 'MainGroup',
                    scale: 'medium',
                    enableToggle: true,
                    margin: '0 0 1 0',
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'button',
                    pressed: false,
                    width: 130,
                    text: Strings.Applicants,
                    icon: '/Content/icons/user.png',
                    tabIndex: 4,
                    iconAlign: 'left',
                    textAlign: 'left',
                    toggleGroup: 'MainGroup',
                    scale: 'medium',
                    enableToggle: true,
                    margin: '0 0 1 0',
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'button',
                    pressed: false,
                    width: 130,
                    text: Strings.MailMessages,
                    icon: '/Content/icons/email.png',
                    tabIndex: 5,
                    iconAlign: 'left',
                    textAlign: 'left',
                    id: 'MessagesTab',
                    toggleGroup: 'MainGroup',
                    scale: 'medium',
                    enableToggle: true,
                    margin: '0 0 1 0',
                    handler: function (button) {
                        var wizard = Ext.getCmp('Containers');
                        wizard.getLayout().setActiveItem('MainMenuItem' + button.tabIndex);
                    }
                }, {
                    xtype: 'component',
                    width: 130,
                    html: '<hr><br>'
                }, {
                    xtype: 'button',
                    scale: 'medium',
                    width: 130,
                    text: "Выход",
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
                split: true,
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
                    border: true,
                    frame: true,
                    title: Strings.RequirementsTabTitle,
                    itemId: 'MainMenuItem3',
                    layout: {
                        type: 'border'
                    },
                    items: [{
                        xtype: 'RequirementStackList',
                        split: true,
                        region: 'west'
                    }, {
                        xtype: 'RequirementListInStackList',
                        split: true,
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
                }]
            }]
        });

        this.callParent(arguments);
    }

});