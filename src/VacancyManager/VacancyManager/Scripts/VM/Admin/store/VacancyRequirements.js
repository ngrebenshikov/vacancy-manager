Ext.define('VM.store.VacancyRequirements', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.VacancyRequirements',
    groupField: 'StackName',
    autoLoad: false,
    autoSync: true,
    autoSave: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/Vacancy/LoadVacRequirements',
            update: '/Vacancy/UpdateVacRequirements',
            create: '/Vacancy/UpdateVacRequirements'
         },
        reader: {
            type: 'json',
            root: 'VacancyRequirements',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            getRecordData: function (record) {
                return { 'data': Ext.JSON.encode(record.data) };
            }
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});