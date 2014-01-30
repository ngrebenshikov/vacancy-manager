Ext.define('VM.controller.ApplicantController',
    {
        extend: 'Ext.app.Controller',
        models: ['ApplicantModel', 'ApplicantRequirements', 'ApplicantConsiderations', 'Comment'],
        stores: ['Applicant', 'ApplicantRequirements', 'VacancyAssign', 'ApplicantConsiderations', 'Comments', 'ApplicantComments', 'ApplicantResumeGrid', 'ResumeExperience', 'ApplicantMessages'],
        views: ['Applicant.List', 'Applicant.Create', 'Applicant.Edit', 'Applicant.ApplicantConsiderations', 'Resume.Create',
        'Comments.List', 'Applicant.ApplicantComments', 'Applicant.ApplicantMessagesList', 'Comments.Add', 'vacancy.ListMin', 'Resume.CreateExperience'],

        init: function () {
            this.control({

                'ApplicantList':
                    { itemdblclick: this.EditApplicantShowForm },
                'applicantConsiderationsList':
                    { itemclick: this.GetComments },
                'button[action=addAppComment]':
                    { click: this.addAppComment },
                // Открыть форму "Создать"
                'button[action=CreateApplicantShowForm]':
                    { click: this.CreateApplicantShowForm },
                // Удалить
                'button[action=RemoveApplicant]':
                    { click: this.RemoveApplicant },
                // Удалить резюме
                'button[action=RemoveResume]':
                    { click: this.RemoveResume },
                //Создать Резюме
                'button[action=CreateResume]':
                    { click: this.CreateResume },
                'button[action=SaveResume]':
                    { click: this.SaveResume },
                //Добавить опыт
                'button[action=CreateExperience]':
                    { click: this.CreateExperience },
                //Удалить опыт
                'button[action=RemoveExperience]':
                   { click: this.RemoveExperience },
                'button[action=SaveExperience]':
                    { click: this.SaveExperience },
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

                'button[action=addConsComment]':
                    { click: this.addConsComment },

                'button[action=addAppCons]':
                    { click: this.addAppCons }
            });
        },

        ReumeControl: 0,

        addAppCons: function (button) {
            var appConsStore = this.getApplicantConsiderationsStore(),
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

                            newAppConsideration = Ext.create('VM.model.ApplicantConsiderations', {
                                VacancyID: selectedVacancyId,
                                ApplicantID: appId
                            });

                            appConsStore.insert(0, newAppConsideration);
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

        addConsComment: function (button) {

            var consGrid = Ext.getCmp('applicantConsiderationsGrid');

            if (consGrid != undefined) {
                var commentsStore = this.getCommentsStore(),
                newCommentBody = Ext.getCmp('consCommentBody').getValue();

                var grid = Ext.getCmp('ApplicantGrid'),
                appId = grid.getView().getSelectionModel().getSelection()[0].getId(),
                consId = consGrid.getView().getSelectionModel().getSelection()[0].getId();

                newComment = Ext.create('VM.model.Comment', {
                    Body: newCommentBody,
                    CreationDate: (Ext.Date.format(new Date(), 'd.m.Y')),
                    ConsiderationID: consId,
                    ApplicantId: appId
                });

                button.up('window').close();
                commentsStore.insert(0, newComment);

            }
        },

        addAppComment: function (button) {
            var appCommentsStore = this.getApplicantCommentsStore(),
                newCommentBody = Ext.getCmp('newAppCommnent').getValue();

            var grid = Ext.getCmp('ApplicantGrid'),
                appId = grid.getView().getSelectionModel().getSelection()[0].getId();

            newComment = Ext.create('VM.model.Comment', {
                Body: newCommentBody,
                CreationDate: (Ext.Date.format(new Date(), 'd.m.Y')),
                ConsiderationID: null,
                ApplicantId: appId
            });

            appCommentsStore.insert(0, newComment);
        },

        GetComments: function (grid, row) {
            commentsStore = this.getCommentsStore();
            commentsStore.load({ params: { "considerationId": row.getId()} });
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

            var obj = grid.getSelectionModel().getSelection()[0];
            var appConsStore = this.getApplicantConsiderationsStore();
            var appReqStore = Ext.StoreManager.lookup('ApplicantRequirements');
            appReqStore.load({ params: { "id": obj.get("ApplicantID")} });
            view.down('form').loadRecord(record);
            fromCons = false;
            // Для фильтрации //            
            Ext.getCmp('ShowHideSkills').disable();
            appReqStore.each(function (appReq) {
                if (appReq.get('IsChecked') == true) {
                    Ext.getCmp('ShowHideSkills').enable();
                    return false;
                }
            });
            // *** //

            appReqStore.load({ params: { "id": obj.get("ApplicantID")} });
            appConsStore.load({ params: { "AppId": obj.get("ApplicantID")} });
            commentsStore = this.getCommentsStore();
            commentsStore.load({ params: { "considerationId": -1} });
            var appCommsStore = this.getApplicantCommentsStore();
            appCommsStore.load({ params: { "appId": obj.get("ApplicantID")} });
            createWCons = false;
            var appId = obj.getId(),
                applicantMessagesStore = this.getApplicantMessagesStore();
            applicantMessagesStore.load({ params: { "AppId": appId, "ConsId": 0} });

            var appResumeStore = Ext.StoreManager.lookup('ApplicantResumeGrid');
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

        /* ===== */


        RemoveResume: function (button) {
            var grid = Ext.getCmp('ApplicantRes');
            var store = this.getApplicantResumeGridStore();
            var selection = grid.getView().getSelectionModel().getSelection()[0];
          
            if (selection != null) {
                store.remove(selection);
                button.disable();
            }
        },

        CreateResume: function () {
            var AddResume = Ext.widget('resumeCreate');
            var date = new Date();
            var grid = Ext.getCmp('ApplicantGrid'),
                appID = grid.getView().getSelectionModel().getSelection()[0];
            
          //  var ResGrid = Ext.getCmp('ApplicantRes');
          //  values.ResumeId = ResGrid.getView().getSelectionModel().getSelection()[0].getId();

            newResume = Ext.create('VM.model.ApplicantResumeGrid', {
                Position: 'Должность..',
                Summary: 'Кратко..',
                Training: 'Обучение..',
                Date: date,
                ApplicantId: appID
            });
            
            if (this.ReumeControl != 0) {
                var ExpStore = Ext.StoreManager.lookup('ResumeExperience');
                ExpStore.load({ params: { "ResId": 5 } });  //нужно получить последнюю запись в гриде резюме и поставить сюда
            }
                                 
            AddResume.down('tabpanel').down('form').loadRecord(newResume);
            alert(this.ReumeControl);
        },

        SaveResume: function (button) {
            if (this.ReumeControl != 1) {
                var win = button.up('window'),
                   tab = win.down('tabpanel'),
                   form = tab.down('form'),
                   values = form.getValues();
                var applicantGrid = Ext.getCmp('ApplicantGrid');
                values.ApplicantId = applicantGrid.getView().getSelectionModel().getSelection()[0].getId();
                var store = this.getApplicantResumeGridStore();
                store.add(values);
                win.close();
            }
            else {
                var win = button.up('window');
                win.close();
                this.ReumeControl = 0;
            }
           
        },

        CreateExperience: function (button) {
            var AddExp = Ext.widget('createExperience');
             
            newExp = Ext.create('VM.model.ResumeExperience', {
                Job: 'Работа..',
                Project: 'Проект..',
                Position: 'Должность..',
                Duties: 'Обязанности..',
                ResumeId: '',
            });

            AddExp.down('form').loadRecord(newExp);
            if (this.ReumeControl != 1) {
                var grid = button.up('grid'),
                    tab = grid.up('tabpanel'),
                    form = tab.down('form'),
                    values = form.getValues();
                var applicantGrid = Ext.getCmp('ApplicantGrid');
                values.ApplicantId = applicantGrid.getView().getSelectionModel().getSelection()[0].getId();
                var store = this.getApplicantResumeGridStore();
                store.add(values);
                this.ReumeControl = 1;
            }
        },

        RemoveExperience: function (button) {
            var grid = Ext.getCmp('ResumeExp');
            var store = this.getResumeExperienceStore();
            var selection = grid.getView().getSelectionModel().getSelection()[0];
           
            if (selection != null) {
                store.remove(selection);
                button.disable();
            }
        
        },

        SaveExperience: function (button) {
            var win = button.up('window'),
                form = win.down('form'),
                values = form.getValues();
            var ResGrid = Ext.getCmp('ApplicantRes');
            //if ()
           // values.ResumeId = ResGrid.getView().getSelectionModel().getSelection()[0].getId();
            var store = this.getResumeExperienceStore();
            store.add(values);
            win.close();
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