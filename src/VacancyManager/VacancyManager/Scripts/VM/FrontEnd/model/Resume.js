Ext.define('VM.model.Resume', {
    extend: 'Ext.data.Model',
    idProperty: 'ResumeId',
    fields: ['ResumeId', 'ApplicantID', 'StartDate', 'AdditionalInformation', 'StatusID', 'Position', 'Summary', 'Training', 'Date', 'LanquageID'],
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
        writer: {
            type: 'json',
            listful: true,
            root: 'resume',
            writeAllFields: true
        }
    }
});