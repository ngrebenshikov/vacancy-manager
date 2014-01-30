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
            root: 'ResumeRequirements',
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