Ext.define('VM.store.ConsiderationStatus', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ConsiderationStatus',
    id: 'ConsiderationStatusStore',
    autoLoad: true,
    autoSync: false,
    autoSave: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/ConsiderationStatus/Load'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});