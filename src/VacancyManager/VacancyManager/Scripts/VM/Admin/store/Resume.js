Ext.define('VM.store.Resume', {
    extend: 'Ext.data.Store',
    model: 'VM.model.Resume',
    id: 'ResumeStore',
    activeRecord: undefined,
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