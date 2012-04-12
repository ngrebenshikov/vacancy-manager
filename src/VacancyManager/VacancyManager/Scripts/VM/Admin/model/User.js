Ext.define('VM.model.User', {
    extend: 'Ext.data.Model',
    idProperty: 'UserID',
    fields: [
                    { name: 'UserID', type: 'int', useNull: true },
                    { name: 'UserName', type: 'string' },
                    { name: 'Email', type: 'string' },
                    { name: 'Password', type: 'string' },
                    { name: 'UserComment', type: 'string' },
                    { name: 'CreateDate', type: 'date', dateFormat: 'MS' },
                    { name: 'LaslLoginDate', type: 'date', dateFormat: 'MS' },
                    { name: 'IsActivated', type: 'bool' },
                    { name: 'IsLockedOut', type: 'bool' },                
                    {name: 'LastLockedOutDate', type: 'date', dateFormat: 'MS' },
                    { name: 'LastLockedOutReason', type: 'string' },
                    { name: 'EmailKey', type: 'string' }
                    ]




});