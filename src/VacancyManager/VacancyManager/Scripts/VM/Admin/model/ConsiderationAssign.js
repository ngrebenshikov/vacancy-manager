
Ext.define('VM.model.ConsiderationAssign', {
    extend: 'Ext.data.Model',
    idProperty: 'ConsiderationID',
    fields: [
                 {
                     name: 'ConsiderationID',
                     type: 'int',
                     usenull: true
                 }, {
                     name: 'VacancyID',
                     type: 'int'
                 }, {
                     name: 'ApplicantID',
                     type: 'int'
                 }, {
                     name: 'Vacancy',
                     type: 'string'
                 }
        ]
});