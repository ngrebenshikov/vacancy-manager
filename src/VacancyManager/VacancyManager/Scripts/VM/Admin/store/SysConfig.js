Ext.define('VM.store.SysConfig',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.SysConfigModel',
    id: 'SysConfigStore',
    autoLoad: true,
    autoSync: true,
    autoSave: true,
    
    proxy:
    {
        type: 'ajax',
        api:
        {
            read: '/SysConfig/GetList',
            create: '/SysConfig/Create',
            destroy: '/SysConfig/Delete'
        },

        reader:
        {
            type: 'json',
            root: 'SysConfigList',
            successProperty: 'success'
        },

        writer:
        {
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