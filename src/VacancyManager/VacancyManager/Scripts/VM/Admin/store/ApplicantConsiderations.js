Ext.define('VM.store.ApplicantConsiderations', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantConsiderations',
    id: 'ApplicantConsiderationStore',
    autoLoad: false,
    autoSync: true,
    autoSave: true,
    listeners: {
        'datachanged': function () {
            var me = this;
            appVacs = Ext.getCmp('tabAppVac');
            if (appVacs != undefined) {
                appVacs.setTitle(Strings.Vacancies + ' (' + me.getCount() + ')');
            }
        }
    },
    proxy: {
        type: 'ajax',
        api: {
            read: '/Applicant/LoadAppConsiderations',
            create: '/Considerations/Create',
            destroy: '/Considerations/Delete'
        },
        reader: {
            type: 'json',
            root: 'considerations',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            allowSingle: true,
            root: 'data',
            getRecordData: function (record) {
                return Ext.JSON.encode(record.data);
            }
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }

});