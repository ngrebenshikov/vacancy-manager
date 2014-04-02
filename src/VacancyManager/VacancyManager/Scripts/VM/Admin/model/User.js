Ext.define('VM.model.User', {
    extend: 'Ext.data.Model',
    idProperty: 'UserID',
    autoSave: true,
    autoSync: true,
    fields:
    [
      { name: 'UserID', type: 'int', useNull: true },
      { name: 'UserName', type: 'string' },
      { name: 'Email', type: 'string' },
      { name: 'UserComment', type: 'string' },
      { name: 'CreateDate', type: 'date', dateFormat: 'MS' },
      { name: 'LastLoginDate', type: 'date', dateFormat: 'MS' },
      { name: 'IsActivated', type: 'bool' },
      { name: 'IsLockedOut', type: 'bool' },
      { name: 'LastLockedOutDate', type: 'date', dateFormat: 'MS' },
      { name: 'LastLockedOutReason', type: 'string' },
      { name: 'Roles' }
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: '../../VMUser/ExtJSUserListLoad',
            create: '../../VMUser/ExtJSCreateUser',
            update: '../../VMUser/ExtJSUpdateUser',
            destroy: '../../VMUser/ExtJSDeleteUser'
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