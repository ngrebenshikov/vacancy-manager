Ext.define('VM.store.Consideration', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.Consideration',
    id: 'ConsiderationStore',
    curConsideration: null,
    autoLoad: false,
    autoSync: false,
    autoSave: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/Considerations/Load',
            create: '/Considerations/Create',
            destroy: '/Considerations/Delete'
        },
        reader: {
            type: 'json',
            root: 'considerations',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            allowSingle: true,
            root: 'data',
            getRecordData: function (record) {
                return Ext.JSON.encode(record.data);
            }
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});