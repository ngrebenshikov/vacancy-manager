Ext.define('VM.store.Consideration', {
  extend: 'VM.store.BaseStore',
  model: 'VM.model.Consideration',
  id: 'ConsiderationStore',
  autoLoad: false,
  autoSync: false,
  autoSave: true,
  proxy: {
    type: 'ajax',
    api: {
      read: '/Vacancy/LoadConsiderations',
      create: '/Vacancy/CreateConsideration',
      update: '/Vacancy/UpdateConsideration',
      destroy: '/Vacancy/DeleteConsideration'
    },
    reader: {
      type: 'json',
      root: 'considerations',
      totalProperty: 'total'
    },
    writer: {
      type: 'json',
      encode: false,
      listful: true,
      writeAllFields: true,
      getRecordData: function (record)
      {
        return { 'considerations': Ext.JSON.encode(record.data) };
      }
    },
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
  }
});