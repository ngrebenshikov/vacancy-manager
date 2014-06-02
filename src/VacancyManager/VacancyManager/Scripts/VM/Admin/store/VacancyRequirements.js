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
            root: 'data',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            listful: true,
            allowSingle: false,
            writeAllFields: true,
            root: 'vacancyRequirements'
        }
    }
});