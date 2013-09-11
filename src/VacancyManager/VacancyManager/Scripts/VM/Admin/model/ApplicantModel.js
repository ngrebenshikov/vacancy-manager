Ext.define('VM.model.ApplicantModel',
    {
        extend: 'Ext.data.Model',
        idProperty: 'ApplicantID',
        fields: ['ApplicantID', 'FullName', 'ContactPhone', 'Email', 'Emloyed', 'Requirements'],
    proxy:
        {
            type: 'ajax',
            api:
            {
                read: '/Applicant/Load',
                create: '/Applicant/Create',
                update: '/Applicant/Update',
                destroy: '/Applicant/Delete'
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