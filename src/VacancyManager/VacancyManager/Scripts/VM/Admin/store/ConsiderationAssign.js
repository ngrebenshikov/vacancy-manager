Ext.define('VM.store.ConsiderationAssign', {
  extend: 'VM.store.BaseStore',
  model: 'VM.model.ConsiderationAssign',
  id: 'ConsiderationAssignStore',
  curConsideration: null,
  autoLoad: false,
  autoSync: false,
  autoSave: false,
  proxy: {
    type: 'ajax',
    api: {
      read: '/Considerations/GetConsiderationAssign'
    },
    reader: {
      type: 'json',
      root: 'considerationsAssign',
      totalProperty: 'total'
    }
  },
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
  })