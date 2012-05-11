
Ext.define('VM.view.User.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.UserList',
  region: "center",
  height: 500,
  //autoHeight: true,
  //autoScroll:true,
  id: 'UserGrid',
  autoSizeColumns: true,
  forceFit: true,
  frame: true,
  title: 'Пользователи',
  store: 'User',
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
                        text: 'Заблокирован:',
                        width: 70,
                        sortable: false,
                        field: { xtype: 'textfield' },
                        menuDisabled: true
                      }
             ],
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: 'User',
    dock: 'bottom',
    displayInfo: true,
    displayMsg: 'Показано  {0} - {1} из {2}',
    emptyMsg: 'Нет данных для отображения'
  }],

  bbar: [{
    text: 'Новый пользователь',
    name: 'btnloadBlankUser',
    id: 'btnloadBlankUser',
    action: 'CreateUser'
  }, {
    text: 'Редактировать',
    name: 'btnEditUser',
    id: 'EditUser',
    action: 'editUser'
  },
    {
      text: 'Удалить пользователя',
      action: 'deleteUser'
    }
   ]


});

