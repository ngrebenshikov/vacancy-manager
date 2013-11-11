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
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
    }
});