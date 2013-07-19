Ext.define('VM.store.Applicant',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantModel',
    id: 'ApplicantStore',
    autoLoad: true,
    autoSync: true,
    autoSave: false
});