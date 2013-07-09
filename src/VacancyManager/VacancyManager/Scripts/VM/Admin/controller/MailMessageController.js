Ext.define('VM.controller.MailMessageController',
    {
        extend: 'Ext.app.Controller',
        views: ['MailMessage.Create', 'MailMessage.MailMessageApplicants'],

        init: function () {
            this.control({
                // Создать
                'button[action = NewMailMessage]':
                    { click: this.NewMailMessage },
                'button[action = selectMailMessageApps]':
                    { click: this.SelectMailMessageApps },
            });
        },

        /* ===== */
        SelectMailMessageApps: function (button) {
            var searchAppGrid = Ext.getCmp('searchApplicantGrid');
            var records = searchAppGrid.getSelectionModel().getSelection(),
                selectedApps = '';
            var mailMessageAppsField = Ext.getCmp('mailMessageApps');
            mailMessageAppsField.selectedAppsMails =[];
            console.log();
            searchAppGrid.getStore().each(function (applicant) {
                if (applicant.get('Selected') == true) {
                    selectedApps += (applicant.get('FullName') + '(' + applicant.get('Email') + ') \n');
                    mailMessageAppsField.selectedAppsMails.push(applicant.get('Email'));
                 }
            });
            mailMessageAppsField.setValue(selectedApps);
            button.up('window').close();

        },

        NewMailMessage: function (button) {
            var fileForm = Ext.getCmp('UploadFileForm').getForm(),
                Message = Ext.getCmp('txtNewMailMessage').getValue(), 
                selectedApps = Ext.getCmp('mailMessageApps').selectedAppsMails,
                MessageSb = Ext.getCmp('txtNewMsailMessageSb').getValue();

            if (fileForm.isValid()) {
                fileForm.submit({
                    url: '../../VMMailMessage/SendVMMailMessage',
                    waitMsg: 'Отправка сообщения...',
                    params:
                              {
                                  Emails: selectedApps,
                                  message: Message,
                                  subject: MessageSb
                              },
                    success: function (form, action) {
                        button.up('window').close();
                    }
                });
            }
        }

   })
