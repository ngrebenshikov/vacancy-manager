Ext.define('VM.model.MailMessage',
    {
        extend: 'Ext.data.Model',
        idProperty: 'Id',
        fields: [
            { name: 'Id', type: 'int' },
            { name: 'Subject', type: 'string' },
            { name: 'From', type: 'string' },
            { name: 'To', type: 'string' },
            { name: 'Text', type: 'string' },
            { name: 'IsRead', type: 'boolean' },
            { name: 'SendDate', type: 'date', dateFormat: 'MS' },
            { name: 'DeliveryDate', type: 'date', dateFormat: 'MS' },
            { name: 'ConsiderationId', type: 'int' },
            { name: 'Vacancy_C', type: 'string' },
            'AttachmentFile'
        ],

        proxy:
        {
            type: 'ajax',
            api:
            {
                read: '/VMMailMessage/Index',
                create: '/VMMailMessage/Create',
                update: '/VMMailMessage/Update',
                destroy: '/VMMailMessage/Delete'
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