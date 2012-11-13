Ext.define('VM.store.Attachment',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.Attachment',
    id: 'AttachmentStore',
    autoLoad: false,
    autoSync: false,
    autoSave: false,

    proxy: {
        type: 'ajax',
        api:
        {
            read: '/Attachment/Index',
        },

        reader:
        {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },

        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});