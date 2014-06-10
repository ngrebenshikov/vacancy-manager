Ext.define('VM.store.ApplicantRequirements', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantRequirements',
    id: 'ApplicantRequirements',
    groupField: 'StackName',
    autoLoad: false,
    autoSync: false,
    autoSave: true,
    proxy: {
        type: 'ajax',
        api: {
            create: '/ApplicantRequirement/Create',
            read: '/ApplicantRequirement/Load',
            update: '/ApplicantRequirement/Update'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            allowSingle: false,
            listful: true,
            writeAllFields: true,
            root: 'applicantRequirements'
        }
    }
});