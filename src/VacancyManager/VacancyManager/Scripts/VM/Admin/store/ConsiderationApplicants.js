Ext.define('VM.store.ConsiderationApplicants',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ConsiderationApplicants',
    id: 'considerationApplicantsStore',
    autoLoad: false,
    autoSync: true,
    autoSave: true
});