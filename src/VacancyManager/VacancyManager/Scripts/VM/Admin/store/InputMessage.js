Ext.define('VM.store.InputMessage',
{
    extend: 'VM.store.BaseStore',
    model: 'VM.model.InputMessage',
    id: 'InputMessageStore',
    autoLoad: true,
    autoSync: true,
    autoSave: false,

    listeners: {
        'datachanged': function () {
            var tab = Ext.getCmp('InputMessageTab');
            var nonReadCount = 0;
            var store = Ext.StoreManager.lookup('InputMessage');
            store.each(function (st) {
                if (st.get('IsRead') == false)
                    nonReadCount++;
            });
            tab.setText(Strings.InputMessages + ' (' + nonReadCount + ')');
        }
    }
});