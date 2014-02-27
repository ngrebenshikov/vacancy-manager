Ext.define('VM.store.ApplicantMessages',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantMessage',
    id: 'MailMessageStore',
    autoLoad: false,
    autoSync: true,
    autoSave: false,
    listeners: {
        'datachanged': function () {
            me = this;
            appMesTab = Ext.getCmp('ApplicantMessagesTab');
            if (appMesTab != undefined) {
                appMesTab.setTitle(Strings.MailMessages + ' (' + me.getCount() + ')');
            }
        }
    }
});
