

Ext.define('VM.controller.ApplicantController', {
        extend: 'Ext.app.Controller',
        models: ['ApplicantModel', 'ApplicantRequirements', 'Consideration', 'Comment'],
        stores: ['Applicant', 'ApplicantRequirements', 'VacancyAssign', 'Consideration', 'Comments', 'ApplicantMessages'],
        views: ['Applicant.List', 'Applicant.Create', 'Applicant.Edit', 'Applicant.ApplicantConsiderations', 'Resume.Create', 'Comments.List',
         'Applicant.ApplicantMessagesList', 'Comments.Add', 'vacancy.ListMin', 'Resume.List'],

        init: function () {
            this.control({

                'ApplicantList':
                    { itemdblclick: this.EditApplicantShowForm },
                'button[action=addAppComment]':
                    { click: this.addAppComment },
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
                    { click: this.ShowHideSkills },
                // Обновить список
                'button[action=refreshApplicantList]':
                    { click: this.RefreshApplicantList },
                'button[action=addConsComment]':
                    { click: this.addConsComment },

                'button[action=addAppCons]':
                    { click: this.addAppCons }
            });
        },

        RefreshApplicantList: function (button) {
            applicantStore = this.getApplicantStore();
            applicantStore.load();
        },

        addAppCons: function (button) {
            var appConsStore = this.getConsiderationStore(),
                vacStore = this.getVacancyAssignStore();

            var grid = Ext.getCmp('ApplicantGrid'),
                appId = grid.getView().getSelectionModel().getSelection()[0].getId();

            vacStore.load({ params: { "appId": appId} });

            searchVacancyWin = Ext.widget('window', {
                title: 'Выберите вакансии',
                width: 400,
                height: 400,
                minHeight: 400,
                layout: 'fit',
                resizable: true,
                modal: true,
                buttonAlign: 'center',
                items: [
                 { xtype: 'vacancyListMin' }
                ],
                buttons:
                [
                    { text: 'Выбрать',
                        handler: function (button) {

                            var vacancyGrid = button.up('window').down('grid'),
                                selectedVacancy = vacancyGrid.getSelectionModel().getSelection()[0],
                                selectedVacancyId = selectedVacancy.getId();

                            newAppConsideration = Ext.create('VM.model.Consideration', {
                                VacancyID: selectedVacancyId,
                                ApplicantID: appId,
                                Vacancy: selectedVacancy.get('Vacancy')
                            });

                            appConsStore.insert(0, newAppConsideration);
                            appConsStore.sync();
                            button.up('window').close();
                           
                        }

                    }, { text: 'Отмена',
                        handler: function (button) {
                            button.up('window').close();
                        }
                    }
                ]
            });

            searchVacancyWin.show();

        },

        addAppComment: function (button) {
            var commentsStore = this.getCommentsStore(),
                newCommentBody = Ext.getCmp('newAppCommnent').getValue();

            var grid = Ext.getCmp('ApplicantGrid'),
                appId = grid.getView().getSelectionModel().getSelection()[0].getId();

            newComment = Ext.create('VM.model.Comment', {
                Body: newCommentBody,
                CreationDate: (Ext.Date.format(new Date(), 'd.m.Y')),
                ConsiderationID: null,
                ApplicantId: appId
            });

            commentsStore.insert(0, newComment);
        },

        /* ===== */
        CreateApplicantShowForm: function () {
            var view = Ext.widget('applicantCreate'),
                newApplicant = Ext.create('VM.model.ApplicantModel', {
                    FullName: 'FullName',
                    ContactPhone: '+123-456-78-90',
                    Email: 'email@example.net'
                });

            var appReqStore = Ext.StoreManager.lookup('ApplicantRequirements');
            appReqStore.load({ params: { "id": -1} });

            view.down('form').loadRecord(newApplicant);
        },

        CreateApplicant: function (button) {
            var form = Ext.getCmp('applicantInfoForm').getForm(),
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
                    ApplicantRequirementsStore.clearFilter();
                    ApplicantRequirementsStore.sync();

                    var f = function (storeAR, operation) {
                        store.load();
                        ApplicantRequirementsStore.un("write", f);
                    };

                    ApplicantRequirementsStore.on("write", f);
                }
            });

            button.up('window').close();

            var removeButton = Ext.getCmp('RemoveApplicant');
            removeButton.disable();
        },

        /* ===== */
        EditApplicantShowForm: function (grid, record) {
            var view = Ext.widget('applicantEdit');

            var obj = grid.getSelectionModel().getSelection()[0],
                appId = obj.get("ApplicantID");

            var appConsStore = this.getConsiderationStore();
            var appReqStore = Ext.StoreManager.lookup('ApplicantRequirements');
            appReqStore.load({ params: { "id": obj.get("ApplicantID")} });
            view.down('form').loadRecord(record);
            // Для фильтрации //            
            Ext.getCmp('ShowHideSkills').disable();
            appReqStore.each(function (appReq) {
                if (appReq.get('IsChecked') == true) {
                    Ext.getCmp('ShowHideSkills').enable();
                    return false;
                }
            });
            // *** //
            appReqStore.load({ params: { "id": appId} });
            appConsStore.load({ params: { "applicantId": appId} });
            commentsStore = this.getCommentsStore();
            commentsStore.load({ params: { "applicantId": appId} });
            var applicantMessagesStore = this.getApplicantMessagesStore();
            applicantMessagesStore.load({ params: { "AppId": appId, "ConsId": 0} });
            var appResumeStore = Ext.StoreManager.lookup('Resume');
            appResumeStore.load({ params: { "appId": obj.get("ApplicantID")} });
        },

        EditApplicant: function (button) {
            var form = Ext.getCmp('applicantInfoForm').getForm(),
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

                var f = function (storeAR, operation) {
                    store.load();
                    ApplicantRequirementsStore.un("write", f);
                };

                ApplicantRequirementsStore.on("write", f);

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