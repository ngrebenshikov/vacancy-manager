
Ext.define('VM.model.ApplicantConsiderations', {
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

        ]
});