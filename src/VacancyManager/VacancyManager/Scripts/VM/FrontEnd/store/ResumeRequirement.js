Ext.define('VM.store.ResumeRequirement', {
    extend: 'Ext.data.Store',
    model: 'VM.model.ResumeRequirement',
    groupField: 'StackName',
    autoLoad: false,
    autoSync: false,
    autoSave: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/ResumeRequirement/Load',
            create: '/ResumeRequirement/Create',
            update : '/ResumeRequirement/Update'
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
            root: 'resumeRequirements'
        }
    }
});