var checkedCount = 0;

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
                    { click: this.EditApplicant },
                // Скрыть/показать
                'button[action=ShowHideSkills]':
                    { click: this.ShowHideSkills }
            });
        },

        /* ===== */
        CreateApplicantShowForm: function () {
            var view = Ext.widget('ApplicantCreate'),
                newApplicant = Ext.create('VM.model.ApplicantModel', {
                    FullName: 'FullName',
                    ContactPhone: '+123-456-78-90',
                    Email: 'email@example.net'
                });

            var appReqStore = Ext.StoreManager.lookup('ApplicantRequirements');
            appReqStore.load({ params: { "id": -1} });

            checkedCount = 0;

            view.down('form').loadRecord(newApplicant);
        },

        CreateApplicant: function (button) {
            var form = Ext.getCmp('applicantCreateForm').getForm(),
                grid = button.up('window').down('grid'),
                store = this.getApplicantStore();

            var curApplicant = form.getRecord();    // Получаем record с формы, но тот record который загружали через loadRecord
            form.updateRecord(curApplicant);        // Обновляем с формы полученный выше record 
            curApplicant.save({
                success: function (record, operation) {
                    ApplicantId = record.getId();
                    store.insert(0, record);

                    var ApplicantRequirementsStore = Ext.StoreManager.lookup('ApplicantRequirements');
                    ApplicantRequirementsStore.each(function (applicantRequirements) {
                        applicantRequirements.set('ApplicantId', ApplicantId);
                    });
                    ApplicantRequirementsStore.sync();
                    ApplicantRequirementsStore.clearFilter();
                }
            });

            button.up('window').close();

            var removeButton = Ext.getCmp('RemoveApplicant');
            removeButton.disable();
        },

        /* ===== */
        EditApplicantShowForm: function (grid, record) {
            var view = Ext.widget('ApplicantEdit');

            var obj = grid.getSelectionModel().getSelection()[0];

            var appReqStore = Ext.StoreManager.lookup('ApplicantRequirements');
            appReqStore.load({ params: { "id": obj.get("ApplicantID")} });

            // Для фильтрации //
            checkedCount = 0;
            appReqStore.each(function (appReq) {
                if (appReq.get('IsChecked') == true)
                    checkedCount++;
            });
            if (checkedCount > 0)
                Ext.getCmp('ShowHideSkills').enable();
            // *** //

            view.down('form').loadRecord(record);
        },

        EditApplicant: function (button) {
            var form = Ext.getCmp('applicantEditForm').getForm(),
                grid = button.up('window').down('grid'),
                store = this.getApplicantStore();

            if (form.isValid()) {
                var curApplicant = form.getRecord();    // Получаем record с формы, но тот record который загружали через loadRecord
                form.updateRecord(curApplicant);        // Обновляем с формы полученный выше record

                var ApplicantRequirementsStore = Ext.StoreManager.lookup('ApplicantRequirements');
                ApplicantRequirementsStore.each(function (appReq) {
                    if (appReq.get('ApplicantId') == "") {
                        appReq.set('ApplicantId', curApplicant.get('ApplicantID'));
                    }
                    if ((appReq.get('IsChecked') == false) && (appReq.get('CommentText') != "")) {
                        appReq.set('CommentText', "");
                    }
                });
                ApplicantRequirementsStore.clearFilter();
                ApplicantRequirementsStore.sync();

                button.up('window').close();
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
                            button.disable();
                        }
                    }
                });
            }
        },

        /* ===== */
        ShowHideSkills: function (button) {
            var store = Ext.StoreManager.lookup('ApplicantRequirements');

            if (button.text == Strings.btnHide) {
                button.setText(Strings.btnShow);
                store.filter("IsChecked", true);
            }
            else {
                button.setText(Strings.btnHide);
                store.clearFilter();
            }
        }
    }
);