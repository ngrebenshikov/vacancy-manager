
Ext.define('VM.model.Consideration', {
    extend: 'Ext.data.Model',
    idProperty: 'ConsiderationID',
    fields: [
                 {
                     name: 'ConsiderationID',
                     type: 'int',
                     usenull: true
                 },
                 {
                     name: 'VacancyID',
                     type: 'int',
                 },
                 {
                     name: 'ApplicantID'
                 }
        ]
});