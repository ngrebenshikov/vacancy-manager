Ext.define('VM.controller.InputMessageController',
    {
        extend: 'Ext.app.Controller',
        models: ['InputMessage', 'Attachment'],
        stores: ['InputMessage', 'Attachment'],
        views: ['InputMessage.Index', 'InputMessage.Create'],

        init: function () {
            this.control({
                'InputMessageIndex #InputMessageGrid':
                    {
                        itemclick: this.ItemClick,
                        selectionchange: this.SelectionChange
                    },

                'InputMessageIndex #IMFilterField':
                    { keyup: this.FilterKeyUp },

                'InputMessageIndex #AttachmentGrid':
                    { itemdblclick: this.Download },

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
                    { click: this.RemoveInputMessage }
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

            var fileForm = Ext.getCmp('UploadFileForm').getForm();
            obj.save({
                success: function (record, operation) {
                    objId = record.getId();
                    store.add(record);

                    if (Ext.getCmp('InputMessageAttachment').getValue() == "") {
                        button.up('window').close();
                    }
                    else {
                        if (fileForm.isValid()) {
                            fileForm.submit({
                                url: 'Attachment/Upload/' + objId,
                                success: function (form, action) {
                                    button.up('window').close();
                                }
                            });
                        }
                    }
                }
            });
        },

        // Вызывается при itemclick на гриде 
        // 1. Меняет IsRead сообщения на true, при условии, что выбранно одно сообщение.
        // 2. Отображает вложения, если есть.
        // 3. Грузит текст сообщения.
        ItemClick: function (grid, record) {
            var isRead = record.get('IsRead');
            var store = Ext.StoreManager.lookup('InputMessage');

            if (grid.getSelectionModel().getSelection().length == 1) {
                // 1
                if (isRead != true) {
                    record.set('IsRead', true)
                }

                // 2
                var attStore = Ext.StoreManager.lookup('Attachment');
                attStore.load({ params: { 'id': record.getId()} });
                var fn = function () {
                    if (attStore.getCount() > 0) {
                        Ext.getCmp('imAttachmentPanel').setTitle(Strings.Attachment + ' (' + attStore.getCount() + ')');
                        if (attStore.getCount() <= 3) {
                            Ext.getCmp('imAttachmentPanel').setHeight(30 + 26 * attStore.getCount());
                        }
                        Ext.getCmp('imAttachmentPanel').expand(false);
                    } else {
                        Ext.getCmp('imAttachmentPanel').setTitle(Strings.Attachment);
                        Ext.getCmp('imAttachmentPanel').collapse(false);
                    }
                    attStore.un('load', fn);
                }
                attStore.on('load', fn);

                // 3
                var textArea = Ext.getCmp('InputMessageText');
                var panel = Ext.getCmp('imTextPanel');
                panel.setTitle('<font color="#837F7F">От: </font>' + record.get('Sender') + '<br><font color="#837F7F">Тема: </font>' + record.get('Subject') + '<br><font color="#837F7F">Вакансия: </font>' + record.get('Vacancy'))
                if (record.get('Text') == '') {
                    textArea.reset();
                    Ext.getCmp('InputMessageText').emptyText = 'Текст в выбранном сообщении отсутствует';
                } else {
                    Ext.getCmp('InputMessageText').setValue(record.get('Text'));
                }
            };
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
                                store.remove(selection);
                                button.disable();
                            }
                        }
                    });
                }
            }
        },

        SelectionChange: function (view, selected, options) {
            var button = Ext.getCmp('RemoveInputMessage');
            if (selected.length > 0) {
                button.enable();
            }
        },

        OnVacancyCboxSelect: function (combo, records) {
            var comboSender = Ext.getCmp('InputMessageSender');

            comboSender.clearValue();
            comboSender.store.load({ params: { "id": combo.getValue()} });

            comboSender.enable();
        },

        Download: function (view, record) {
            window.open('Attachment/Download/' + record.getId());
        },

        FilterKeyUp: function (field, e) {
            if (e.getKey() == 8 || e.isSpecialKey() == false) {
                var label = Ext.getCmp("LabelForFilter");
                var regexp = new RegExp(field.getValue(), "i");
                var store = Ext.StoreManager.lookup('InputMessage');
                store.filterBy(function (record) {
                    if (regexp.test(record.get("Sender")) || regexp.test(record.get("Vacancy")) || regexp.test(record.get("Subject")))
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
        }
    })
