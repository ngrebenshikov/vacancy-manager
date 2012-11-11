Ext.define('VM.view.InputMessage.Create',
{
    extend: 'Ext.window.Window',
    alias: 'widget.InputMessageCreate',
    requires: ['Ext.form.Panel'],

    title: Strings.ConfNew,
    layout: 'fit',
    autoShow: true,
    modal: true,
    autoHeight: true,
    autoWidth: true,
    items: //Элементы окна
    [{
        xtype: 'form',
        id: 'InputMessageCreateForm',
        padding: '5 5 5 5',
        border: false,
        style: 'background-color: #fff;',
        items: //Элементы формы
        [{
            xtype: 'combobox',
            id: 'InputMessageVacancy',
            name: 'Vacancy',
            store: 'Vacancy',
            displayField: 'Title',
            valueField: 'VacancyID',
            fieldLabel: Strings.Vacancy
        }, {
            xtype: 'combobox',
            id: 'InputMessageSender',
            name: 'ConsiderationId',
            store: 'Consideration',
            displayField: 'FullName',
            valueField: 'ConsiderationID',
            fieldLabel: Strings.Sender,
            queryMode: 'local',
            disabled: true
        }, {
            xtype: 'textfield',
            id: 'InputMessageSubject',
            name: 'Subject',
            fieldLabel: Strings.Subject
        }, {
//            xtype: 'textfield',
//            id: 'InputMessageSendDate',
//            name: 'SendDate',
//            fieldLabel: Strings.SendDate
//        }, {
//            xtype: 'textfield',
//            id: 'InputMessageDeliveryDate',
//            name: 'DeliveryDate',
//            fieldLabel: Strings.DeliveryDate
//        }, {
            xtype: 'form',
            id: 'UploadFileForm',
            border: false,
            //style: 'background-color: #fff;',
            items: //Элементы формы
            [{
                xtype: 'filefield',
                id: 'InputMessageAttachment',
                emptyText: 'Выберите файл',
                fieldLabel: 'Файл',
                name: 'AttachmentFile',
                buttonText: '',
                buttonConfig: {
                    iconCls: 'upload-icon'
                }
            }],
        }, {
            xtype: 'textareafield',
            name: 'Text',
            grow: true,
            name: 'Text',
            anchor: '100%'
        }],

        buttons: //Кнопки окна
        [{
            text: Strings.btnAdd,
            action: 'CreateInputMessage'
        }, {
            text: 'Upload',
            action: 'Upload'
        }]
    }],
    initComponent: function () {
        this.callParent(arguments);
    }
});

