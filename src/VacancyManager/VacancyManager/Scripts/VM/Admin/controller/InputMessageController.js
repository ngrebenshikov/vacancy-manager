Ext.define('VM.controller.InputMessageController',
    {
        extend: 'Ext.app.Controller',
        models: ['InputMessage', 'Vacancy', 'Consideration'],
        stores: ['InputMessage', 'Vacancy', 'Consideration'],
        views: ['InputMessage.Index', 'InputMessage.Create'],

        init: function () {
            this.control({
                'InputMessageIndex #InputMessageGrid':
                    { itemclick: this.ShowText,
                      selectionchange: this.SelectionChange },

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

            store.add(obj);

            button.up('window').close();
        },

        /* ===== */
        ShowText: function (grid, record) {
            var isRead = record.get('IsRead');
            var store = Ext.StoreManager.lookup('InputMessage');
            if (isRead != true) {
                record.set('IsRead', true)
                store.sync();
            }

            var obj = grid.getSelectionModel().getSelection()[0];
            Ext.getCmp('InputMessageText').setValue(obj.get('Text'));
            if (obj.get('Text') == '')
                Ext.getCmp('InputMessageText').emptyText = 'Текст в выбранном сообщении отсутствует';
        },

        RemoveInputMessage: function (button) {
            var grid = Ext.getCmp('InputMessageGrid'),
                store = Ext.StoreManager.lookup('InputMessage'),
                selection = grid.getView().getSelectionModel().getSelection()[0];

            if (selection != null) {
                Ext.Msg.show({
                    title: 'Удалить?',
                    msg: 'Удалить сообщение "' + selection.get('Subject') + '"',
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

        SelectionChange: function (view, selections, options) {
                    var button = Ext.getCmp('RemoveInputMessage'); //Ищет по ID компонента
                    if (selections != null)
                        button.enable();
        },

        OnVacancyCboxSelect: function (combo, records) {
            var comboSender = Ext.getCmp('InputMessageSender');
            
            comboSender.clearValue();
            comboSender.store.load({ params: {"id" : combo.getValue()} });
            
            comboSender.enable();
        }
    })
