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

            newRec = form.getValues();

            //            var ApplicantRequirementsStore = Ext.StoreManager.lookup('ApplicantRequirements');
            //            var records = [];
            //            ApplicantRequirementsStore.each(function (rec) {
            //                records.push(rec.data);
            //            });

            //            store.add({ params: { "id": -1, "data": newRec, "grid": records} });

            var curApplicant = form.getRecord();
            form.updateRecord(curApplicant);
            curApplicant.save({
                success: function (record, operation) {
                    ApplicantId = record.getId();
                    store.insert(0, record);

                    var ApplicantRequirementsStore = Ext.StoreManager.lookup('ApplicantRequirements');
                    ApplicantRequirementsStore.each(function (applicantRequirements) {
                        if (applicantRequirements.get('IsChecked') == true) {
                            applicantRequirements.set('ApplicantId', ApplicantId);
                        }
                    });

                    //TODO: удалить из ApplicantRequirementsStore все невыделенные
                    ApplicantRequirementsStore.sync();
                }
            });

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

                //                rec.set(newRec);

                //                var ApplicantRequirementsStore = Ext.StoreManager.lookup('ApplicantRequirements');
                //                ApplicantRequirementsStore.sync();

                var ApplicantRequirementsStore = Ext.StoreManager.lookup('ApplicantRequirements');
                var records = [];
                ApplicantRequirementsStore.each(function (rec) {
                    records.push(rec.data);
                });

                var curId = rec.getId();

                store.add({ params: { "id": curId, "data": newRec, "grid": records} });
                //store.sync();
                win.close();
            }
        },

        /* ===== */
        RemoveApplicant: function (button) {
            var grid = Ext.getCmp('ApplicantGrid'),
                store = this.getApplicantStore(),
                selection = grid.getView().getSelectionModel().getSelection()[0];

            if (selection != null) {
                Ext.Msg.show({
                    title: 'Удаление соискателя',
                    msg: 'Удалить соискателя "' + selection.get('FullName') + '"',
                    width: 300,
                    buttons: Ext.Msg.YESNO,
                    fn: function (btn) {
                        if (btn == 'yes') {
                            store.remove(selection);
                        }
                    }
                });
            }
            button.disable();
        }
    }
);