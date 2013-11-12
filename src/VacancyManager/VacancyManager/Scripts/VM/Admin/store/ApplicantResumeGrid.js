Ext.define('VM.store.ApplicantResumeGrid', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantResumeGrid',
    id: 'ApplicantResumeGrid',
    autoLoad: false,
    autoSync: false,
    autoSave: false,
    listeners: {
        'datachanged': function () {
            var me = this;
            appRes = Ext.getCmp('ApplicantResumeTab');
            appRes.setTitle(Strings.Resumes + ' (' + me.getCount() + ')');
        }
    },

    proxy: {
        type: 'ajax',
        api: {
            read: '/Resume/LoadResume',
            destroy: '/Resume/DeleteResume'
        },

        reader: {
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
                getRecordData: function (record) {
                    return {
                        'data': Ext.JSON.encode(record.data)
                    };
                }
            },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }

    }
});