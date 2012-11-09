Ext.define('VM.store.InputMessage',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.InputMessage',
    id: 'InputMessageStore',
    autoLoad: true,
    autoSync: true,
    autoSave: false,

    proxy:
        {
            type: 'ajax',
            api:
            {
                read: '/InputMessage/Index',
                create: '/InputMessage/Create',
                update: '/InputMessage/Update',
                destroy: '/InputMessage/Delete'
            },

            reader:
            {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            },

            writer:
            {
                type: 'json',
                encode: false,
                listful: true,
                writeAllFields: true,
                getRecordData: function (record) {
                    return { 'data': Ext.JSON.encode(record.data)
                    };
                }
            },
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }
});