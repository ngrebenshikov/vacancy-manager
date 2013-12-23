Ext.define('VM.controller.MailMessageController',
    {
        extend: 'Ext.app.Controller',

        stores: ['MailMessage', 'Attachment', 'Consideration', 'ConsiderationAssign'],
        views: ['MailMessage.Create', 'MailMessage.MailMessageApplicants', 'MailMessage.List', 'MailMessage.ViewMessage',
                'MailMessage.AttachmentList', 'Applicant.ApplicantMessages', 'Applicant.ApplicantMessagesList', 'MailMessage.ConsiderationAssignList'],

        init: function () {
            var defaultmessagetype = 1;
            var mailsStore = Ext.StoreManager.lookup('MailMessage');
            mailsStore.load({ params: { "messagetype": defaultmessagetype} });

            this.control({
                // Создать
                'button[action = SendMailMessage]':
                    { click: this.SendMailMessage },

                'button[action = browseMessage]':
                    { click: this.callEdit },

                'button[action = newMailMessage]':
                    { click: this.NewMailMessage },

                'button[action = updateMessages]':
                    { click: this.UpdateMessages },

                'button[action = getIncomingMessages]':
                    { click: this.GetIncomingMessages },

                'button[action = deleteMessage]':
                    { click: this.DeleteMessage },

                'button[action = getSendedMessages]':
                    { click: this.GetSendedMessages },

                'button[action = assignToConsideration]':
                    { click: this.AssignToConsideration },

                'button[action = getDirtyMessages]':
                    { click: this.GetDirtyMessages },

                'button[action = ReadMessage]':
                    { click: this.readAppMessage },

                'button[action = SendNewMessage]':
                    { click: this.NewMailMessageApp },

                'ApplicantMessagesList dataview': {
                    itemdblclick: this.readAppMessage
                },

                'MailMessageList dataview': {
                    itemdblclick: this.callEdit
                },

                'MailMessageList #MFilterField':
                    { keyup: this.FilterKeyUp },

                'AttachmentList dataview': {
                    itemdblclick: this.Download
                },

                'button[action = selectMailMessageApps]':
                    { click: this.SelectMailMessageApps }
            });
        },

        AssignToConsideration: function (button) {
            var mailMessage = Ext.getCmp('MailMessageGrid').getSelectionModel().getSelection()[0],
               cons = Ext.getCmp('considerationAssignGrid').getSelectionModel().getSelection()[0],
               consId = 0;
            if (mailMessage != undefined) {
                if (cons != undefined) {
                    consId = cons.getId();
                    mailMessage.set({
                        ConsiderationId: consId,
                        Vacancy_C: cons.get('Vacancy')
                    });
                  }
                else
                    alert('Выберите вакансию!!!');
            }
            button.up('window').close();
        },

        NewMailMessage: function (button) {
            var searchApplicantsStore = Ext.StoreManager.lookup("SearchApplicants");
            searchApplicantsStore.load({ params: { "vacancyId": 0} });
            var view = Ext.create('VM.view.MailMessage.Create').show();
            createWCons = false;
        },

        NewMailMessageApp: function (button) {
            var consStore = this.getConsiderationStore(),
                appGrid = Ext.getCmp('ApplicantGrid'),
                selectedApp = appGrid.getView().getSelectionModel().getSelection()[0];

            var view = Ext.create('VM.view.MailMessage.Create').show();
            var MailMessageSb = Ext.getCmp('txtNewMailMessageSb');
            var mailMessageAppsField = Ext.getCmp('mailMessageApps'),
                fName = "";
            if (fromCons == true) {
                createWCons = true;
                MailMessageSb.setValue(consStore.curConsideration.get('Vacancy'));
                mailMessageAppsField.selectedAppsMails = [];
                mailMessageAppsField.selectedAppsMails.push(consStore.curConsideration.get('Email'));
                fName = consStore.curConsideration.get('FullName') + ' (' + mailMessageAppsField.selectedAppsMails + ')';
            }
            else {
                mailMessageAppsField.selectedAppsMails = [];
                mailMessageAppsField.selectedAppsMails.push(selectedApp.get('Email'));
                fName = selectedApp.get('FullName') + ' (' + mailMessageAppsField.selectedAppsMails + ')';

            }

            mailMessageAppsField.setValue(fName);
            var btnselectAppsField = Ext.getCmp('selectMApps');
            btnselectAppsField.hide();
            mailMessageAppsField.setReadOnly(true);
        },

        UpdateMessages: function (button) {
            var mailMessageStore = this.getMailMessageStore();
            if (mailMessageStore.currentMessageType == 1) {
                Ext.Ajax.request(
           { url: '../../VMMailMessage/UpdateMailsListFromIMAP',
               success: function (result, request) {
                   var mailsStore = Ext.StoreManager.lookup('MailMessage');
                   mailsStore.load({ params: { "messagetype": mailMessageStore.currentMessageType} });
               }
           });
            }
            else {
                mailMessageStore.load({ params: { "messagetype": mailMessageStore.currentMessageType} });
            }
        },

        GetIncomingMessages: function (button) {
            var mailsStore = this.getMailMessageStore();
            mailsStore.currentMessageType = 1;
            mailsStore.load({ params: { "messagetype": 1} });
        },

        GetSendedMessages: function (button) {
            var mailsStore = this.getMailMessageStore();
            messageOper1.action = 'updateIncomingMessages';
            messageOper1.text = 'Обновить';
            mailsStore.currentMessageType = 2;
            mailsStore.load({ params: { "messagetype": 2} });
        },

        GetDirtyMessages: function (button) {
            var mailsStore = this.getMailMessageStore();
            mailsStore.currentMessageType = 3;
            mailsStore.load({ params: { "messagetype": 3} });
        },

        readAppMessage: function (button) {
            attachmentsStore = this.getAttachmentStore();
            var view = Ext.create('VM.view.MailMessage.ViewMessage').show();
            var mailMessage = Ext.getCmp('ApplicantMessagesGrid').getSelectionModel().getSelection()[0];
            var mailMessageText = Ext.getCmp('tafMessagetext');
            mailMessage.set('IsRead', 'true');
            mailMessageText.setValue(mailMessage.get('Text'));
            attachmentsStore.load({ params: { "id": mailMessage.get('Id')} });
        },

        callEdit: function (button) {
            var view = Ext.create('VM.view.MailMessage.ViewMessage').show();
            attachmentsStore = this.getAttachmentStore();
            var mailMessage = Ext.getCmp('MailMessageGrid').getSelectionModel().getSelection()[0];
            var mailMessageText = Ext.getCmp('tafMessagetext');
            mailMessageText.setValue(mailMessage.get('Text'));
            mailMessage.set('IsRead', 'true');
            attachmentsStore.load({ params: { "id": mailMessage.get('Id')} });
        },

        /* ===== */
        SelectMailMessageApps: function (button) {
            var searchAppGrid = Ext.getCmp('searchApplicantGrid');
            var records = searchAppGrid.getSelectionModel().getSelection(),
                selectedApps = '';
            var mailMessageAppsField = Ext.getCmp('mailMessageApps');
            mailMessageAppsField.selectedAppsMails = [];
            searchAppGrid.getStore().each(function (applicant) {
                if (applicant.get('Selected') == true) {
                    selectedApps += (applicant.get('FullName') + '(' + applicant.get('Email') + ') \n');
                    mailMessageAppsField.selectedAppsMails.push(applicant.get('Email'));
                }
            });
            mailMessageAppsField.setValue(selectedApps);
            button.up('window').close();

        },

        Download: function (view, record) {
            window.open('Attachment/Download/' + record.getId());
        },

        SendMailMessage: function (button) {
            var fileForm = Ext.getCmp('UploadFileForm').getForm(),
                Message = Ext.getCmp('txtNewMailMessage').getValue(),
                selectedApps = Ext.getCmp('mailMessageApps').selectedAppsMails,
                MessageSb = Ext.getCmp('txtNewMailMessageSb').getValue(),
                curConsideration = this.getConsiderationStore().curConsideration;

            if (createWCons == true) { consID = curConsideration.getId(); }
            else consID = 0;

            var mailsStore = this.getMailMessageStore();

            mailsStore.currentMessageType = 2;

            if (fileForm.isValid()) {
                fileForm.submit({
                    url: '../../VMMailMessage/SendVMMailMessage',
                    waitMsg: 'Отправка сообщения...',
                    params:
                              {
                                  Emails: selectedApps,
                                  message: Message,
                                  subject: MessageSb,
                                  consId: consID
                              },

                    success: function (form, action) {
                        button.up('window').close();
                        mailsStore.load({ params: { "messagetype": mailsStore.currentMessageType} });
                    }
                });
            }
        },

        FilterKeyUp: function (field, e) {
            if (e.getKey() == 8 || e.isSpecialKey() == false) {
                var label = Ext.getCmp("LabelForFilter");
                var regexp = new RegExp(field.getValue(), "i");
                var store = Ext.StoreManager.lookup('MailMessage');
                store.filterBy(function (record) {
                    if (regexp.test(record.get("Sender")) || regexp.test(record.get("Subject")))
                        return true;
                });
                if (store.getCount() == 1 && !(Ext.isEmpty(field.getValue()))) {
                    field.labelEl.update('<font color="#038A0E">' + store.getCount() + ' сообщение</font>');
                }
                else if (store.getCount() > 1 && store.getCount() < 5 && !(Ext.isEmpty(field.getValue()))) {
                    field.labelEl.update('<font color="#038A0E">' + store.getCount() + ' сообщения</font>');
                }
                else if (store.getCount() >= 5 && !(Ext.isEmpty(field.getValue()))) {
                    field.labelEl.update('<font color="#038A0E">' + store.getCount() + ' сообщений</font>');
                }
                else if (store.getCount() <= 0 && !(Ext.isEmpty(field.getValue()))) {
                    field.labelEl.update('<font color="#F25252">Не найдено</font>');
                }
                else {
                    field.labelEl.update('');
                }
            }
        },

        DeleteMessage: function (button) {
            var grid = button.up('grid'),
                store = Ext.StoreManager.lookup('MailMessage'),
                selection = grid.getView().getSelectionModel().getSelection();

            if (selection != null) {
                if (selection.length == 1) {
                    Ext.Msg.show({
                        title: 'Удалить?',
                        msg: 'Удалить сообщение "' + selection[0].get('Subject') + '"?',
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        fn: function (btn) {
                            if (btn == 'yes') {
                                store.remove(selection[0]);
                            }
                        }
                    });
                } else if (selection.length > 1 && selection.length < 5) {
                    Ext.Msg.show({
                        title: 'Удалить?',
                        msg: 'Удалить ' + selection.length + ' сообщения?',
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        fn: function (btn) {
                            if (btn == 'yes') {
                                store.remove(selection);
                            }
                        }
                    });
                } else if (selection.length >= 5) {
                    Ext.Msg.show({
                        title: 'Удалить?',
                        msg: 'Удалить ' + selection.length + ' сообщений?',
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        fn: function (btn) {
                            if (btn == 'yes') {
                                store.remove(selection);
                            }
                        }
                    });
                }
            }
        }

    })
