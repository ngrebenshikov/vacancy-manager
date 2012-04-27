Ext.define('VM.store.User', {
  extend: 'VM.store.BaseStore',
  model: 'VM.model.User',
  id: 'VacancyStore',
  autoLoad: true,
  autoSync: true,
  autoSave: true,
  proxy: {
    type: 'ajax',
    api: {
      read: '/User/Load',
      create: '/User/Create',
      update: '/User/Update',
      destroy: '/User/Delete'
    },
    reader: {
      type: 'json',
      root: 'data',
      totalProperty: 'total'
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