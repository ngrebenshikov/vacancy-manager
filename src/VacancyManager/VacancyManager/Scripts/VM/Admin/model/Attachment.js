Ext.define('VM.model.Attachment',
    {
        extend: 'Ext.data.Model',
        idProperty: 'Id',
        fields: ['Id', 'FileName', 'FileSize', 'ContentType', 'InputMessageId']
})