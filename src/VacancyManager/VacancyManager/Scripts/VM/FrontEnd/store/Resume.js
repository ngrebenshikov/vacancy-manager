Ext.define('VM.store.Resume', {
    extend: 'Ext.data.Store',
    model: 'VM.model.Resume',
    id: 'ResumeStore',
    autoLoad: false,
    autoSync: true,
    autoSave: false
});