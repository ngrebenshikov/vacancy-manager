Ext.define('VM.controller.InputMessageController',
    {
        extend: 'Ext.app.Controller',
        models: ['InputMessage', 'Attachment'], // 'Vacancy', 'Consideration'],
        stores: ['InputMessage', 'Attachment'], //, 'Vacancy', 'Consideration'],
        views: ['InputMessage.Index', 'InputMessage.Create'],

        init: function () {
            this.control({
                'InputMessageIndex #InputMessageGrid':
                    {
                        itemclick: this.ShowText,
                        selectionchange: this.SelectionChange
                    },

                'InputMessageCreate #InputMessageVacancy':
                    { select: this.OnVacancyCboxSelect },

                // Открыть форму "Создать"
                'button[action=CreateInputMessageShowForm]':
                    { click: this.CreateInputMessageShowForm },
                // Создать
                'button[action=CreateInputMessage]':
                    { click: this.CreateInputMessage },

                // Удалить
                'button[action=RemoveInputMessage]':
                    { click: this.RemoveInputMessage },

                // Открыть форму "Редактировать"
                'button[action=EditInputMessageShowForm]':
                    { click: this.EditInputMessageShowForm },
                // Сохранить изменения
                'button[action=EditInputMessage]':
                    { click: this.EditInputMessage },

                'button[action=Upload]':
                    { click: this.Upload }
            });
        },

        /* ===== */
        CreateInputMessageShowForm: function () {
            var view = Ext.widget('InputMessageCreate'),
                obj = Ext.create('VM.model.InputMessage', {
                    Subject: 'Тема'
                });

            view.down('form').loadRecord(obj);
        },

        CreateInputMessage: function (button) {
            var form = Ext.getCmp('InputMessageCreateForm').getForm(),
                store = Ext.StoreManager.lookup('InputMessage');

            var obj = form.getRecord();    // Получаем record с формы, но тот record который загружали через loadRecord
            form.updateRecord(obj);        // Обновляем с формы полученный выше record 


            //*******************************************//
            //*******************************************//
            var fileForm = Ext.getCmp('UploadFileForm').getForm();
            obj.save({
                success: function (record, operation) {
                    objId = record.getId();
                    store.add(record);

                    if (fileForm.isValid()) {
                        fileForm.submit({
                            url: 'Attachment/UploadFile',
                            //waitMsg: 'Saving your details...'
                            success: function (form, action) {
                                button.up('window').close();
                            }
                        });
                    }
                    
                }
            });
            ///////////////////////////////////////////////
            ///////////////////////////////////////////////


        },

        // Вызывается при itemclick на гриде 
        // 1. Грузит текст сообщения при itemclick.
        // 2. Меняет IsRead сообщения на true, при условии, что выбранно одно сообщение 
        ShowText: function (grid, record) {
            var isRead = record.get('IsRead');
            var store = Ext.StoreManager.lookup('InputMessage');

            if (grid.getSelectionModel().getSelection().length == 1) {
                if (isRead != true) {
                    record.set('IsRead', true)
                    //store.sync();
                }
            };


            //            var attStore = Ext.StoreManager.lookup('Attachment');
            //            attStore.load({params : { 'id' : record.getId() } });


            var obj = grid.getSelectionModel().getSelection()[0];
            Ext.getCmp('InputMessageText').setValue(obj.get('Text'));
            if (obj.get('Text') == '')
                Ext.getCmp('InputMessageText').emptyText = 'Текст в выбранном сообщении отсутствует';
        },

        /* ===== */
        RemoveInputMessage: function (button) {
            var grid = Ext.getCmp('InputMessageGrid'),
                store = Ext.StoreManager.lookup('InputMessage'),
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
                                button.disable();
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
//                                Ext.each(selection, function (select) {
//                                    store.remove(select);
//                                });
                                button.disable();
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
                                Ext.each(selection, function (select) {
                                    store.remove(select);
                                });
                                button.disable();
                            }
                        }
                    });
                }
            }
        },

        SelectionChange: function (view, selections, options) {
            var button = Ext.getCmp('RemoveInputMessage'); //Ищет по ID компонента
            if (selections != null)
                button.enable();
        },

        OnVacancyCboxSelect: function (combo, records) {
            var comboSender = Ext.getCmp('InputMessageSender');

            comboSender.clearValue();
            comboSender.store.load({ params: { "id": combo.getValue()} });

            comboSender.enable();
        },

        Upload: function () {
            var fileForm = Ext.getCmp('UploadFileForm').getForm();

            if (fileForm.isValid()) {
                fileForm.submit({
                    url: 'Attachment/UploadFile'
                    //waitMsg: 'Saving your details...'
                });
            }
        }
    })
