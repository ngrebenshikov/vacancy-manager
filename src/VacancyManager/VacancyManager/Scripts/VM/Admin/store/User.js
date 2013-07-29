Ext.define('VM.store.User', {
  extend: 'VM.store.BaseStore',
  model: 'VM.model.User',
  id: 'VacancyStore',
  autoLoad: true,
  //autoSync: true,
  //autoSave: true,
  proxy: {
    type: 'ajax',
    api: {
      read: '../../User/ExtJSUserListLoad',
      create: '../../User/ExtJSCreateUser',
      update: '../../User/ExtJSUpdateUser',
      destroy: '../../User/ExtJSDeleteUser'
    },
    reader: {
      type: 'json',
      root: 'data',
      totalProperty: 'total',
      successProperty: 'success'
    },
    writer: {
      type: 'json',
      encode: false,
      listful: true,
      writeAllFields: true,
      getRecordData: function (record)
      {
        return { 'data': Ext.JSON.encode(record.data) };
      }
    },
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
  }
});