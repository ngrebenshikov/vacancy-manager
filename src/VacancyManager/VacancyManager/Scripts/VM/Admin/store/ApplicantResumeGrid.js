Ext.define('VM.store.ApplicantResumeGrid', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantResumeGrid',
    id: 'ApplicantResumeGrid',
    autoLoad: false,
    autoSync: true,
    autoSave: false,
    listeners: {
        'datachanged': function () {
            var me = this;
            appRes = Ext.getCmp('ApplicantResumeTab');
            appRes.setTitle(Strings.Resumes + ' (' + me.getCount() + ')');
        }
    }
});