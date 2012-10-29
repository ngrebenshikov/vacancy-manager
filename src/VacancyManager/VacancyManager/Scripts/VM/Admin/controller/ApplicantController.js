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
                    { click: this.EditApplicantShowForm },
                // Сохранить изменения
                'button[action=EditApplicant]':
                    { click: this.EditApplicant }
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
            var form = Ext.getCmp('applicantCreateForm').getForm(),
                grid = button.up('window').down('grid'),
                store = this.getApplicantStore(),
                curApplicant = form.getValues();

            var ApplicantRequirementsStore = Ext.StoreManager.lookup('ApplicantRequirements');
            var records = [];
            ApplicantRequirementsStore.each(function (rec) {
                records.push(rec.data);
            });

            store.add({ params: { "data": curApplicant, "grid": records} });

            //curApplicant = form.getRecord();
            //            curApplicant.save({
            //                success: function (record, operation) {
            //                    ApplicantId = record.getId();
            //                    store.insert(0, record);

            //                    ApplicantRequirementsStore.each(function (applicantRequirements) {
            //                        if (applicantRequirements.get('IsChecked') == true) {
            //                            applicantRequirements.set('ApplicantId', ApplicantId);
            //                        }
            //                    });
            //                    ApplicantRequirementsStore = Ext.StoreManager.lookup('ApplicantRequirements');
            //                    ApplicantRequirementsStore.sync();
            //                }
            //            });

            button.up('window').close();
        },

        /* ===== */
        EditApplicantShowForm: function (grid, record) {
            var view = Ext.widget('ApplicantEdit');

            var obj = grid.getSelectionModel().getSelection()[0];

            var appReqStore = Ext.StoreManager.lookup('ApplicantRequirements');
            appReqStore.load({ params: { "id": obj.get("ApplicantID")} });

            view.down('form').loadRecord(record);
        },

        EditApplicant: function (button) {
            var form = Ext.getCmp('applicantEditForm').getForm(),
                win = button.up('window');

            if (form.isValid()) {
                var store = this.getApplicantStore(),
                    rec = form.getRecord(),
                    newRec = form.getValues();

                var ApplicantRequirementsStore = Ext.StoreManager.lookup('ApplicantRequirements');
                var records = [];
                ApplicantRequirementsStore.each(function (rec) {
                    records.push(rec.data);
                });

                rec.set(newRec);

//                var AppReqStore = this.getApplicantRequirementsStore();
//                AppReqStore.sync();

                store.sync();
                win.close();
            }

//            var wndvacanyEdit = button.up('window'),
//           frm_vacancyform = wndvacanyEdit.down('form'),
//           sel_vacancy = frm_vacancyform.getRecord(),
//           newvalues = frm_vacancyform.getValues();
//            var newdate = eval("({ dtm: new Date(newvalues['OpeningDate']) })");
//            newvalues['OpeningDate'] = newdate.dtm;
//            sel_vacancy.set(newvalues);
//            VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
//            VacancyRequirementsStore.sync();
//            wndvacanyEdit.close();
        },

        /* ===== */
        RemoveApplicant: function (button) {
            var grid = Ext.getCmp('ApplicantGrid'),
                store = this.getApplicantStore(),
                selection = grid.getView().getSelectionModel().getSelection()[0];

            if (selection != null) {
                store.remove(selection);
            }
            button.disable();
        }
    }
);