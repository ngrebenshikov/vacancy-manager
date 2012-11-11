Ext.define('VM.model.InputMessage',
    {
        extend: 'Ext.data.Model',
        idProperty: 'Id',
        fields: ['Id', 'SendDate', 'DeliveryDate', 'Sender', 'Subject', 'Text', 'IsRead', 'Vacancy', 'ConsiderationId', 'AttachmentFile'],

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