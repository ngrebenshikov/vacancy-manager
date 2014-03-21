
Ext.define('VM.model.ApplicantConsideration', {
    extend: 'Ext.data.Model',
    idProperty: 'ConsiderationID',
    fields: [
                 {
                     name: 'ConsiderationID',
                     type: 'int',
                     usenull: true
                 }, {
                     name: 'ApplicantID',
                     type: 'int'
                 }, {
                     name: 'Vacancy',
                     type: 'string'
                 }

        ],
    proxy: {
        type: 'ajax',
        api: {
            read: '/Applicant/LoadAppConsiderations',
            create: '/Applicant/CreateApplicantConsideration'
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