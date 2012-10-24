Ext.define('VM.controller.ApplicantController',
    {
        extend: 'Ext.app.Controller',
        models: ['ApplicantModel', 'ApplicantRequirements'],
        stores: ['Applicant', 'ApplicantRequirements'],
        views: ['Applicant.List', 'Applicant.Create', 'Applicant.Edit'],

        init: function () {
            this.control({
                'ApplicantList':
                    { itemdblclick: this.EditApplicantShowForm },
                // Открыть форму "Создать"
                'button[action=CreateApplicantShowForm]':
                    { click: this.CreateApplicantShowForm },
                // Удалить
                'button[action=RemoveApplicant]':
                    { click: this.RemoveApplicant },
                // Создать
                'button[action=CreateApplicant]':
                    { click: this.CreateApplicant },
                // Открыть форму "Редактировать"
                'button[action=EditApplicantShowForm]':
                    { click: this.EditApplicantShowForm }
            });
        },

        /* ===== */
        CreateApplicantShowForm: function () {
            var view = Ext.widget('ApplicantCreate'),
                newApplicant = Ext.create('VM.model.ApplicantModel', {
                    FullName: 'FullName',
                    ContactPhone: 'ContactPhone',
                    Email: 'email@example.net'
                });

            var appReqStore = Ext.StoreManager.lookup('ApplicantRequirements');
            appReqStore.load({ params: { "id": -1} });

            view.down('form').loadRecord(newApplicant);
        },

        CreateApplicant: function (button) {
            var form = Ext.getCmp('applicantCreateForm').getForm();

            if (form.isValid()) {
                var store = this.getApplicantStore(),
                    newApplicant = form.getValues();
                store.add(newApplicant);
            }
            button.up('window').close();
            Ext.getCmp('ApplicantGrid').clearSelection();
        },

        /* ===== */
        EditApplicantShowForm: function (grid, record) {
            //            var view = Ext.widget('SysConfigEdit');
            //            view.down('form').loadRecord(record);
        },

        EditApplicant: function (button) {
            var win = button.up('window'),
                form = win.down('form').getForm();

            if (form.isValid()) {
                var store = this.getSysConfigStore(),
                    rec = form.getRecord(),
                    newConf = form.getValues();

                rec.set(newConf);
                store.sync();
                win.close();
            }
        },

        /* ===== */
        RemoveApplicant: function (button) {
            var grid = Ext.getCmp('ApplicantGrid'),
                store = this.getApplicantStore(),
                selection = grid.getView().getSelectionModel().getSelection()[0];

            if (selection != null) {
                store.remove(selection);
            }
            Ext.getCmp('Remove').disable();
        }
    }
);