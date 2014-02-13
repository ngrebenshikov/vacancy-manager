Ext.define('VM.store.VacancyAssign', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.VacancyAssign',
    id: 'VacancyAssignStore',
    autoLoad: false,
    autoSync: false,
    autoSave: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/Vacancy/GetVacancyAssign'
        },
        reader: {
            type: 'json',
            root: 'vacancyAssign',
            totalProperty: 'total'
        }
    },
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
})