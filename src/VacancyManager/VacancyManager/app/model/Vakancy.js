
Ext.define('AM.model.Vakancy', {
    extend: 'Ext.data.Model',
    idProperty: 'ID',
    fields: [
                 { name: 'ID', type: 'int' },
                 { name: 'Title' },
                 { name: 'Description' },
                 { name: 'OpeningDate', type: 'date', dateFormat: 'MS' },
                 { name: 'ForeignLanguage' },
                 { name: 'Requirments' },
                 { name: 'IsVisible' }
        ]
});