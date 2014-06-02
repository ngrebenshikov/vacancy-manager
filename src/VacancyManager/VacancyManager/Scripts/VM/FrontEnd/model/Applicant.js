Ext.define('VM.model.Applicant', {
    extend: 'Ext.data.Model',
    idProperty: 'ApplicantID',
    autoLoad: false,
    autoSync: false,
    autoSave: false,
    fields: ['ApplicantID', 'FullName', 'FullNameEn', 'ContactPhone', 'Email', 'Employed', 'Requirements'],
    proxy: {
        type: 'ajax',
        api: {
            read: '/Applicant/Load',
            create: '/Applicant/Create',
            update: '/Applicant/Update',
            destroy: '/Applicant/Delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            encode: false,
            writeAllFields: true,
            root: 'applicant'
        }
    }
});