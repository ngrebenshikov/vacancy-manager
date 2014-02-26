Ext.define('VM.model.Resume',
    {
        extend: 'Ext.data.Model',
        idProperty: 'ResumeId',
        fields: ['ResumeId', 'ApplicantId', 'StartDate', 'AdditionalInformation', 'Position', 'Summary', 'Training', 'Date'],
        proxy: {
            type: 'ajax',
            api: {
                read: '/Resume/LoadResume',
                destroy: '/Resume/DeleteResume',
                update: '/Resume/UpdateResume',
                create: '/Resume/CreateResume'
            },

            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            },

            writer:
                {
                    type: 'json',
                    encode: false,
                    listful: true,
                    root: 'data',
                    writeAllFields: true,
                    getRecordData: function (record) {
                        return Ext.JSON.encode(record.data)
                    }
                },
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }

        }
    });