Ext.define('VM.store.Consideration', {
  extend: 'VM.store.BaseStore',
  model: 'VM.model.Consideration',
  id: 'ConsiderationStore',
  vacancy: null,
  autoLoad: false,
  autoSync: true,
  autoSave: true,
  proxy: {
    type: 'ajax',
    api: {
      read: '/Considerations/LoadConsiderations',
      create: '/Vacancy/CreateConsideration',
      update: '/Vacancy/UpdateConsideration',
      destroy: '/Considerations/DeleteConsideration'
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