Ext.define('VM.view.User.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.UserList',
    id: 'UserGrid',
    autoSizeColumns: true,
    frame: false,
    store: 'User',
    viewConfig: {
        loadingText: 'Загрузка пользователей'
    },
    initComponent: function () {
        Ext.apply(this, {
            columns: [{
                dataIndex: 'UserName',
                align: 'center',
                text: Strings.UserName,
                flex: 1,
                sortable: true,
                menuDisabled: true
            }, {
                dataIndex: 'Roles',
                align: 'center',
                text: Strings.UserRoles,
                flex: 1,
                menuDisabled: true,
                renderer: function (value) {
                    var str = "";
                    for (var i = 0; i < value.length; i++) {
                        str = str + value[i];
                        if (i != value.length - 1)
                            str = str + ", ";
                    }
                    return str;
                }
            }, {
                dataIndex: 'Email',
                align: 'center',
                text: Strings.UserEmail,
                flex: 1,
                sortable: true,
                field: { xtype: 'textfield' },
                menuDisabled: true
            }, {
                dataIndex: 'CreateDate',
                text: Strings.UserCreationDate,
                align: 'center',
                width: 90,
                sortable: true,
                menuDisabled: true,
                renderer: Ext.util.Format.dateRenderer('d.m.Y')
            }, {
                dataIndex: 'LastLoginDate',
                text: 'Последний \n визит',
                align: 'center',
                width: 95,
                sortable: true,
                menuDisabled: true,
                renderer: Ext.util.Format.dateRenderer('d.m.Y')
            }, {
                header: 'Последняя блокировка',
                columns: [
                          {
                              dataIndex: 'LastLockedOutDate',
                              header: Strings.UserLastLockedOutDate,
                              align: 'center',
                              width: 70,
                              sortable: true,
                              menuDisabled: true,
                              renderer: Ext.util.Format.dateRenderer('d.m.Y')
                          },
                          {
                              dataIndex: 'LastLockedOutReason',
                              align: 'center',
                              header: Strings.UserLastLockedOutReason,
                              width: 270,
                              sortable: false,
                              menuDisabled: true
                          }]
            }, {
                dataIndex: 'IsActivated',
                align: 'center',
                header: Strings.UserList_IsActivated,
                width: 80,
                sortable: false,
                menuDisabled: true,
                renderer: function (value) {
                    var cssPrefix = Ext.baseCSSPrefix,
                        cls = [cssPrefix + 'grid-checkheader'];

                    if (value) {
                        cls.push(cssPrefix + 'grid-checkheader-checked');
                    }
                    return '<div class="' + cls.join(' ') + '">&#160;</div>';
                }
            }, {
                dataIndex: 'IsLockedOut',
                align: 'center',
                header: Strings.UserIsLockedOut,
                width: 80,
                sortable: false,
                menuDisabled: true,
                renderer: function (value) {
                    var cssPrefix = Ext.baseCSSPrefix,
                        cls = [cssPrefix + 'grid-checkheader'];

                    if (value) {
                        cls.push(cssPrefix + 'grid-checkheader-checked');
                    }

                    return '<div class="' + cls.join(' ') + '">&#160;</div>';
                }
            }],

            bbar: [{
                text: Strings.UserBNewUser,
                name: 'btnloadBlankUser',
                icon: '/Content/icons/add.gif',
                id: 'btnloadBlankUser',
                action: 'CreateUser'
            }, {
                text: Strings.UserBEdit,
                name: 'btnUserEdit',
                icon: '/Content/icons/edit.png',
                id: 'UserEdit',
                action: 'callEdit'
            }, {
                text: Strings.UserBLockUnlock,
                name: 'btnBanManager',
                icon: '/Content/icons/ban.gif',
                id: 'BanManager',
                action: 'banManager'
            }, {
                text: 'Обновить',
                icon: '/Content/icons/refresh.gif',
                name: 'btnRefreshUserList',
                id: 'RefreshUserList',
                action: 'refreshUserList'
            }, '->', {
                text: Strings.UserBDelete,
                action: 'deleteUser',
                icon: '/Content/icons/delete.gif'
            }]
        });
        this.callParent(arguments);
    }
});



