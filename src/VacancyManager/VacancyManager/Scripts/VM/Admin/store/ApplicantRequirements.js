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
            read: '/ApplicantRequirement/LoadApplicantRequirements',
            update: '/ApplicantRequirement/UpdateApplicantRequirements'
        },
        reader: {
            type: 'json',
            root: 'ApplicantRequirements',
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