Ext.define('VM.store.ApplicantConsiderations', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantConsiderations',
    id: 'ApplicantConsiderationStore',
    autoLoad: false,
    autoSync: false,
    autoSave: false,
    listeners: {
        'datachanged': function () {
            var me = this;
            appVacs = Ext.getCmp('tabAppVac');
            appVacs.setTitle(Strings.Vacancies + ' (' + me.getCount() + ')');
        }
    },
    proxy: {
        type: 'ajax',
        api: {
            read: '/Applicant/LoadAppConsiderations'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});