Ext.define('VM.store.Vacancy', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.Vacancy',
    id: 'VacancyStore',
    autoLoad: true,
    autoSync: true,
    autoSave: false
});