Ext.define('VM.store.ApplicantResumeGr', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantResumeGr',
    id: 'ApplicantResumeGr',
    autoLoad: false,
    autoSync: false,
    autoSave: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/Resume/LoadResume',
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
    }
});