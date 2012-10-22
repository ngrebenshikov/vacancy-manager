
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
                     name: 'Requirements'
                 },
                 {
                     name: 'IsVisible'
                 },
                 {
                     name: 'Considerations',
                     type: 'int'
                 },
                 {
                     name: 'TechnologyStacks'
                 }
        ]
        ,
    proxy: {
        type: 'ajax',
        api: {
            read: '/Vacancy/Load',
            create: '/Vacancy/Create',
            update: '/Vacancy/Update',
            destroy: '/Vacancy/Delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            getRecordData: function (record) {
                return { 'data': Ext.JSON.encode(record.data) };
            }
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});