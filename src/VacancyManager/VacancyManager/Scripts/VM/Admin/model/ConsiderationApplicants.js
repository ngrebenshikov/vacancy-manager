Ext.define('VM.model.ConsiderationApplicants',
    {
        extend: 'Ext.data.Model',
        idProperty: 'ApplicantID',
        fields: ['ApplicantID', 'FullName', 'Requirements'],
        proxy:
        {
            type: 'ajax',
            api:
            {
                read: '/Considerations/GetApplicants'
            },

            reader:
            {
                type: 'json',
                root: 'freeapplicants',
                successProperty: 'success'
            },

            writer:
            {
                type: 'json',
                encode: false,
                listful: true,
                writeAllFields: true,
                getRecordData: function (record) {
                    return { 'freeapplicants': Ext.JSON.encode(record.data)
                    };
                }
            },
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }
    })