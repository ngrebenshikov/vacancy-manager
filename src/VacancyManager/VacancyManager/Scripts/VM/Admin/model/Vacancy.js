
Ext.define('VM.model.Vacancy', {
    extend: 'Ext.data.Model',
    idProperty: 'VacancyID',
    fields: [
                 {
                     name: 'VacancyID',
                     type: 'int',
                     usenull: true
                 },
                 {
                     name: 'Title'
                 },
                 {
                     name: 'Description'
                 },
                 {
                     name: 'OpeningDate',
                     type: 'date',
                     dateFormat: 'MS'
                 },
                 {
                     name: 'ForeignLanguage'
                 },
                 {
                     name: 'Requirments'
                 },
                 {
                     name: 'IsVisible'
                 },
                 {
                     name: 'Considerations',
                     type: 'auto'
                 },
                 {
                     name: 'TechnologyStacks'
                 }
        ]
});