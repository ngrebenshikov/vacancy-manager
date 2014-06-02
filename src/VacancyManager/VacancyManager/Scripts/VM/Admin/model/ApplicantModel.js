Ext.define('VM.model.ApplicantModel', {
    extend: 'Ext.data.Model',
    idProperty: 'ApplicantID',
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
            root: 'applicant'
        }
    }
});