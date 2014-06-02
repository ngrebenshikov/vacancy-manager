
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
                 }, {
                     name: 'Status',
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
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }

});