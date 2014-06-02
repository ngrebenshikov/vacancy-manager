Ext.define('VM.model.ConsiderationStatus', {
    extend: 'Ext.data.Model',
    idProperty: 'ConsiderationStatusID',
    fields: [
                 {
                     name: 'ConsiderationStatusID',
                     type: 'int'
                 }, {
                     name: 'Status',
                     type: 'string'
                 }
        ]
});