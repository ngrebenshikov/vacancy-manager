Ext.define('VM.view.MailMessage.Create',
{
    extend: 'Ext.window.Window',
    alias: 'widget.MailMessageCreate',
    requires: ['Ext.form.Panel'],
    title: 'Новое сообщение',
    buttonAlign: 'center',
    width: 455,
    height: 395,
    items: //Элементы окна
    [{
        xtype: 'form',
        id: 'MessageCreateForm',
        padding: '5 5 5 5',
        border: false,
        createWCons: false,
        style: 'background-color: #fff;',
        items: //Элементы формы
        [
        { xtype: 'panel',
            border: false,
            layout: 'hbox',
            items: [
          {
              xtype: 'textareafield',
              fieldLabel: 'Кому',
              id: 'mailMessageApps',
              selectedAppsMails: [],
              width: 400,
              height: 63,
              padding: '0 0 0 0',
              emptyText: 'Выберите получателей...'
          },
          {
              xtype: 'button',
              id: 'selectMApps',
              text: '...',
              margin: 1,
              handler: function (button) {
                  var view = Ext.create('VM.view.MailMessage.MailMessageApplicants').show();
              }
          }
            ]
        }, {
            xtype: 'textfield',
            id: 'txtNewMailMessageSb',
            name: 'Subject',
            width: 430,
            fieldLabel: Strings.Subject
        }, {
            xtype: 'htmleditor',
            id: 'txtNewMailMessage',
            enableAlignments: true,
            enableColors: true,
            enableFont: true,
            enableFontSize: true,
            enableFormat: true,
            enableLinks: true,
            enableLists: true,
            enableSourceEdit: true,
            xtype: 'textareafield',
            fieldLabel: 'Сообщение',
            height: 100,
            width: 430
        }, {
            xtype: 'form',
            id: 'UploadFileForm',
            border: false,
            items: //Элементы формы
            [{
                xtype: 'panel',
                autoScroll: true,
                title: 'Вложения',
                height: 120,
                width: 430,
                border: true,
                items: [
                       {
                           xtype: 'filefield',
                           id: 'NewMessageAttachment',
                           emptyText: 'Выберите файл',
                           fieldLabel: 'Файл',
                           name: 'AttachmentFile',
                           plugins: [Ext.ux.FieldReplicator],
                           buttonText: '...',
                           margin: 5,
                           width: 350

                       }]
            }]
        }]
    }],
    buttons: [
          { text: 'Отправить',
            action: 'SendMailMessage'
          },

          { text: 'Отмена',
              handler: function () {
                  this.up('window').close();
              }
          }],

    initComponent: function () {
        this.callParent(arguments);
    }
});

