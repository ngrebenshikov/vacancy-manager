Ext.define('VM.model.InputMessage',
    {
        extend: 'Ext.data.Model',
        idProperty: 'Id',
        fields: [
            { name: 'Id', type: 'int' },
            { name: 'SendDate', type: 'date', dateFormat: 'MS' },
            { name: 'DeliveryDate', type: 'date', dateFormat: 'MS' },
            { name: 'Sender', type: 'string' },
            { name: 'Subject', type: 'string' },
            { name: 'Text', type: 'string' },
            { name: 'IsRead', type: 'boolean' },
            { name: 'Vacancy', type: 'string' },
            { name: 'ConsiderationId', type: 'int' },
            'AttachmentFile'
        ],

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
    })