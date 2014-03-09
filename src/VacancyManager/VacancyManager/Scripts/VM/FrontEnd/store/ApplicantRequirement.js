Ext.define('VM.store.ApplicantRequirement', {
    extend: 'Ext.data.Store',
    model: 'VM.model.ApplicantRequirement',
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
            encode: false,
            listful: true,
            root: 'data',
            writeAllFields: true,
            getRecordData: function (record) {
                return Ext.JSON.encode(record.data);
            }
        },

        headers: { 'Content-Type': 'application/json; charset=UTF-8' }

    }
});

