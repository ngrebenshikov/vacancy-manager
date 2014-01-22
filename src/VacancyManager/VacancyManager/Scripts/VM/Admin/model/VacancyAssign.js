
Ext.define('VM.model.VacancyAssign', {
    extend: 'Ext.data.Model',
    idProperty: 'VacancyID',
    fields: [
                 {
                     name: 'VacancyID',
                     type: 'int',
                     usenull: true
                 }, {
                     name: 'OpeningDate',
                     dateFormat: 'd.m.Y',
                     type: 'date'
                 }, {
                     name: 'Vacancy',
                     type: 'string'
                 }
        ]
});