Ext.define('VM.store.MailMessage',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.MailMessage',
    id: 'MailMessageStore',
    currentMessageType: 1,
    autoLoad: false,
    autoSync: true,
    autoSave: false,

    listeners: {
        'datachanged': function () {
            var btn = Ext.getCmp('Messages_Incoming');
            var nonReadCount = 0;
            var store = Ext.StoreManager.lookup('MailMessage');
           
            if (store.currentMessageType == 1) {
                store.each(function (st) {
                    if (st.get('IsRead') == false)
                        nonReadCount++;
                });
                if (nonReadCount > 0) {
                    btn.setText(Strings.InputMessages + ' (' + nonReadCount + ')');
                } else {
                    btn.setText(Strings.InputMessages);
                }
            }

        }
    }
});

