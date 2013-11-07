Ext.define('VM.store.ApplicantMessages',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantMessage',
    id: 'MailMessageStore',
    autoLoad: false,
    autoSync: true,
    autoSave: false

});
