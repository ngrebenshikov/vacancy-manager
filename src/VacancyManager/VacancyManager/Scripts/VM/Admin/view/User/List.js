Ext.define('VM.view.User.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.UserList',
  region: "center",
  id: 'UserGrid',
  autoSizeColumns: true,
  forceFit: true,
  frame: false,
  //title: Strings.Users,
  store: 'User',
  initComponent: function ()
  {
    Ext.apply(this,
      {
        columns: [
                {
                  dataIndex: 'UserName',
                  text: Strings.UserName,
                  width: 120,
                  sortable: true,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                },
                {
                  dataIndex: 'Roles',
                  text: Strings.UserRoles,
                  width: 120,
                  menuDisabled: true,
                  field: { xtype: 'textfield' },
                  renderer: function (value)
                  {
                    var str = "";
                    for (var i = 0; i < value.length; i++)
                    {
                      str = str + value[i];
                      if (i != value.length - 1)
                        str = str + "; ";
                    }
                    return str;
                  }
                },
                {
                  dataIndex: 'Email',
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
                  width: 70,
                  sortable: true,
                  field: { xtype: 'datefield' },
                  menuDisabled: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },
                {
                  dataIndex: 'LastLoginDate',
                  text: Strings.UserLastLoginDate,
                  width: 70,
                  sortable: true,
                  field: { xtype: 'datefield' },
                  menuDisabled: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },
                {
                  dataIndex: 'LastLockedOutDate',
                  text: Strings.UserLastLockedOutDate,
                  width: 70,
                  sortable: true,
                  field: { xtype: 'datefield' },
                  menuDisabled: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },
                {
                  dataIndex: 'LastLockedOutReason',
                  text: Strings.UserLastLockedOutReason,
                  width: 70,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                },
                {
                  dataIndex: 'IsActivated',
                  text: Strings.UserList_IsActivated,
                  width: 70,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                },
                {
                  dataIndex: 'IsLockedOut',
                  text: Strings.UserIsLockedOut,
                  width: 70,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
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

/*function BanRender(val)
{
if (val)
{
return 'UnBan';
}
else
{
return 'Ban';
}
}*/

