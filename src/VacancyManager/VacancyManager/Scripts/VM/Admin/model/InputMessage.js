Ext.define('VM.model.InputMessage',
    {
        extend: 'Ext.data.Model',
        idProperty: 'Id',
        fields: ['Id', 'SendDate', 'DeliveryDate', 'Sender', 'Subject', 'Text', 'IsRead', 'Vacancy', 'ConsiderationId']
})