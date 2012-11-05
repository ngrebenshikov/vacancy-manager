Ext.define('VM.store.VacancyRequirements', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.VacancyRequirements',
    groupField: 'StackName',
    autoLoad: false,
    autoSync: false,
    autoSave: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/VacancyRequirement/Load',
            create: '/VacancyRequirement/Create',
            update: '/VacancyRequirement/Update'
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
            allowSingle: true,
            root: 'data',
            getRecordData: function (record) {
                return Ext.JSON.encode(record.data);
            }
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});