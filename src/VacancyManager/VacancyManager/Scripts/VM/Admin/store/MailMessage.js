Ext.define('VM.store.MailMessage',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.MailMessage',
    id: 'MailMessageStore',
    currentMessageType: 1,
    nonReadCount: 0,
    autoLoad: false,
    autoSync: true,
    autoSave: false,

    listeners: {
        'datachanged': function () {
            var btn = Ext.getCmp('MessagesTab');
            var store = this,
                appComsTab = Ext.getCmp('messagesTab');
            store.nonReadCount = 0;
            if (btn != undefined) {
                if (store.currentMessageType == 1) {
                    store.each(function (st) {
                        if (st.get('IsRead') == false)
                            store.nonReadCount++;
                    });

                    if (store.nonReadCount > 0) {
                        if (appComsTab != undefined) { appComsTab.setText(Strings.MailMessages + ' (' + store.nonReadCount + ')');  }
                        btn.setText(Strings.MailMessages + ' (' + store.nonReadCount + ')');
                    } else {
                        btn.setText(Strings.MailMessages);
                        if (appComsTab != undefined) { appComsTab.setText(Strings.MailMessages); }
                    }
                }
            }
        }
    }


});

