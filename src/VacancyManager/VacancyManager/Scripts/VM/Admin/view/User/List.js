var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2,
    listeners: {
        beforeedit: function (e, editor) {
            return false;
        }
    }
});

Ext.define('VM.view.User.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.UserList',
    //region: "center",
    //layout:'fit',
    layoutOnTabChange: true,
    id: 'UserGrid',
    plugins: [cellEditing],
    autoSizeColumns: true,
    forceFit: true,
    frame: false,
    //title: Strings.Users,
    store: 'User',
    initComponent: function () {
        Ext.apply(this,
      {
          columns: [
                {
                    dataIndex: 'UserName',
                    align: 'center',
                    text: Strings.UserName,
                    width: 120,
                    sortable: true,
                    menuDisabled: true
                },
                {
                    dataIndex: 'Roles',
                    align: 'center',
                    text: Strings.UserRoles,
                    width: 120,
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
                },
                {
                    dataIndex: 'Email',
                    align: 'center',
                    text: Strings.UserEmail,
                    width: 120,
                    sortable: true,
                    field: { xtype: 'textfield' },
                    menuDisabled: true
                },
          /*{
          dataIndex: 'UserComment',
          text: Strings.UserCommentary,
          width: 120,
          sortable: false,
          field: { xtype: 'textfield' },
          menuDisabled: true
          },*/
                {
                dataIndex: 'CreateDate',
                text: Strings.UserCreationDate,
                align: 'center',
                width: 70,
                sortable: true,
                field: { xtype: 'datefield' },
                menuDisabled: true,
                renderer: Ext.util.Format.dateRenderer('d.m.Y')
            },
               {
                   dataIndex: 'LastLoginDate',
                   text: Strings.UserLastLoginDate,
                   align: 'center',
                   width: 70,
                   sortable: true,
                   field: { xtype: 'datefield' },
                   menuDisabled: true,
                   renderer: Ext.util.Format.dateRenderer('d.m.Y')
               }, {
                   text: 'Последняя блокировка',
                   columns: [
                          {
                              dataIndex: 'LastLockedOutDate',
                              text: Strings.UserLastLockedOutDate,
                              align: 'center',
                              width: 70,
                              sortable: true,
                              field: { xtype: 'datefield' },
                              menuDisabled: true,
                              renderer: Ext.util.Format.dateRenderer('d.m.Y')
                          },
                          {
                              dataIndex: 'LastLockedOutReason',
                              align: 'center',
                              text: Strings.UserLastLockedOutReason,
                              flex: 1,
                              sortable: false,
                              field: { xtype: 'textfield' },
                              menuDisabled: true
                          }]
               },
                {
                    dataIndex: 'IsActivated',
                    align: 'center',
                    text: Strings.UserList_IsActivated,
                    width: 70,
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
                },
                {
                    dataIndex: 'IsLockedOut',
                    align: 'center',
                    text: Strings.UserIsLockedOut,
                    width: 70,
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
                }
              ],
          dockedItems: [
                  {
                      xtype: 'pagingtoolbar',
                      store: 'User',
                      dock: 'bottom',
                      displayInfo: true,
                      displayMsg: Strings.UserToolbarDislpayMsg,
                      emptyMsg: Strings.UserToolbarEmptyMsg
                  }
                ],
          bbar:
        [
          {
              text: Strings.UserBNewUser,
              name: 'btnloadBlankUser',
              id: 'btnloadBlankUser',
              action: 'CreateUser'
          },
          {
              text: Strings.UserBLockUnlock,
              name: 'btnBanManager',
              id: 'BanManager',
              action: 'banManager'
          },
          {
              text: Strings.UserBEdit,
              name: 'btnEdit',
              id: 'UserEdit',
              action: 'callEdit'
          },
          {
              text: Strings.UserBDelete,
              action: 'deleteUser'
          }
        ]
      });
        this.callParent(arguments);
    }
});



