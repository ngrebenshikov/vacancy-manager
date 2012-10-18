Ext.define('VM.view.User.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.UserList',
  region: "center",
  id: 'UserGrid',
  autoSizeColumns: true,
  forceFit: true,
  frame: false,
  title: 'Пользователи',
  store: 'User',
  initComponent: function ()
  {
    Ext.apply(this,
      {
        columns: [
                {
                  dataIndex: 'UserName',
                  text: 'Имя пользователя',
                  width: 120,
                  sortable: true,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                },
                {
                  dataIndex: 'Roles',
                  text: 'Роли',
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
                  text: 'Email',
                  width: 120,
                  sortable: true,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                },
                {
                  dataIndex: 'UserComment',
                  text: 'Комментарий',
                  width: 120,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                },
                {
                  dataIndex: 'CreateDate',
                  text: 'Дата создания',
                  width: 70,
                  sortable: true,
                  field: { xtype: 'datefield' },
                  menuDisabled: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },
                {
                  dataIndex: 'LaslLoginDate',
                  text: 'Последний визит',
                  width: 70,
                  sortable: true,
                  field: { xtype: 'datefield' },
                  menuDisabled: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },
                {
                  dataIndex: 'LastLockedOutDate',
                  text: 'Дата последней блокировки',
                  width: 70,
                  sortable: true,
                  field: { xtype: 'datefield' },
                  menuDisabled: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },
                {
                  dataIndex: 'LastLockedOutReason',
                  text: 'Причина последней блокировки',
                  width: 70,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                },
                {
                  dataIndex: 'IsActivated',
                  text: 'Активирован',
                  width: 70,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                },
                {
                  dataIndex: 'IsLockedOut',
                  text: 'Забанен',
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
                    displayMsg: 'Показано  {0} - {1} из {2}',
                    emptyMsg: 'Нет данных для отображения'
                  }
                ],
        bbar:
        [
          {
            text: 'Новый пользователь',
            name: 'btnloadBlankUser',
            id: 'btnloadBlankUser',
            action: 'CreateUser'
          },
          {
            text: 'Забанить/Разбанить',
            name: 'btnBanManager',
            id: 'BanManager',
            action: 'banManager'
          },
          {
            text: 'Назначить роли',
            name: 'btnRoleManager',
            id: 'RoleMng',
            action: 'callRoleManager'
          },
          {
            text: 'Удалить пользователя',
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

