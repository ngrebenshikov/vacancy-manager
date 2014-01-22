Ext.define('VM.model.ApplicantResumeGrid',
    {
        extend: 'Ext.data.Model',
        idProperty: 'ResumeId',
        fields: ['ResumeId', 'ApplicantId', 'StartDate', 'Position', 'Summary', 'Training', 'Date'],
        proxy: {
            type: 'ajax',
            api: {
                read: '/Resume/LoadResume',
                destroy: '/Resume/DeleteResume',
                create: 'Resume/CreateResume'
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
                    writeAllFields: true,
                    getRecordData: function (record) {
                        return {
                            'data': Ext.JSON.encode(record.data)
                        };
                    }
                },
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }

        }    });