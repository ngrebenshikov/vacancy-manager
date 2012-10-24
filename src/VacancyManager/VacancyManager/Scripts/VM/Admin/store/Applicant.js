Ext.define('VM.store.Applicant',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantModel',
    id: 'ApplicantStore',
    autoLoad: true,
    autoSync: true,
    autoSave: true,
    
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
            root: 'ApplicantList',
            successProperty: 'success'
        },

        writer:
        {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            getRecordData: function (record) {
                return { 'data': Ext.JSON.encode(record.data) };
            }
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});