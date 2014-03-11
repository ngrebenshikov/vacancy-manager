Ext.define('VM.store.ApplicantConsideration', {
    extend: 'Ext.data.Store',
    model: 'VM.model.ApplicantConsideration',
    id: 'ApplicantConsiderationStore',
    autoLoad: false,
    autoSync: true,
    autoSave: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/Applicant/LoadAppConsiderations',
            create: '/Considerations/Create',
            destroy: '/Considerations/Delete'
        },
        reader: {
            type: 'json',
            root: 'considerations',
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