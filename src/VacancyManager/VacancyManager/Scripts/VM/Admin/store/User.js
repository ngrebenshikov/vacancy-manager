Ext.define('VM.store.User', {
  extend: 'VM.store.BaseStore',
  model: 'VM.model.User',
  id: 'UsersStore',
  autoLoad: true,
  autoSave: true,
  autoSync: true

});