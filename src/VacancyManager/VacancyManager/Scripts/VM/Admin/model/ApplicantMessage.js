Ext.define('VM.model.ApplicantMessage',
    {
        extend: 'Ext.data.Model',
        idProperty: 'Id',
        fields: [
            { name: 'Id', type: 'int' },
            { name: 'DeliveryDate', type: 'date', dateFormat: 'd.m.Y' },
            { name: 'From', type: 'string' },
            { name: 'Subject', type: 'string' },
            { name: 'Text', type: 'string' },
            'AttachmentFile'
        ],

        proxy:
        {
            type: 'ajax',
            api:
            {
                read: '/Applicant/LoadAppMessages'
            },

            reader:
            {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            },

            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }
    })