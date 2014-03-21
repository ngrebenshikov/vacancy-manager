Ext.define('VM.model.Applicant', {
    extend: 'Ext.data.Model',
    idProperty: 'ApplicantID',
    autoLoad: false,
    autoSync: false,
    autoSave: false,
    fields: ['ApplicantID', 'FullName', 'FullNameEn', 'ContactPhone', 'Email', 'Employed', 'Requirements'],
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
                root: 'data',
                getRecordData: function (record) {
                    return Ext.JSON.encode(record.data);
                }
            },

            headers: { 'Content-Type': 'application/json; charset=UTF-8' }

        }
});