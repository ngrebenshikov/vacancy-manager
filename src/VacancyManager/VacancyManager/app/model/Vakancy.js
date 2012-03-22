
Ext.define('AM.model.Vakancy', {
    extend: 'Ext.data.Model',
    idProperty: 'v_ID',
    fields: [
                 { name: 'v_ID', type: 'int' },
                 { name: 'Title' },
                 { name: 'Description' },
                 { name: 'OpeningDate', type: 'date', dateFormat: 'MS' },
                 { name: 'ForeignLanguage' },
                 { name: 'Requirments' },
                 { name: 'IsVisible' }
        ]
});