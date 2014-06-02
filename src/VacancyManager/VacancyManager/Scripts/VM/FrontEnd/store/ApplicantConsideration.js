Ext.define('VM.store.ApplicantConsideration', {
    extend: 'Ext.data.Store',
    model: 'VM.model.ApplicantConsideration',
    id: 'ApplicantConsiderationStore',
    autoLoad: false,
    autoSync: true,
    autoSave: true
});