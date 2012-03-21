Ext.define('AM.store.Vakancy', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Vakancy',
    alias: 'widget.VakancyStore',
    autoLoad: true,
    autoSync: true,
    autoSave: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/Vakancy/Load',
            create: 'Vakancy/Create',
            update: '/Vakancy/Update',
            destroy: '/Vakancy/Delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});