Ext.define('VM.view.MailMessage.ViewMessage',
{
    extend: 'Ext.window.Window',
    alias: 'widget.MailMessageView',
    requires: ['Ext.form.Panel'],
    title: 'Просмотр сообщения',
    buttonAlign: 'center',
    width: 455,
    height: 395,
    items: //Элементы окна
    [{
        xtype: 'form',
        id: 'MessageViewForm',
        padding: '5 5 5 5',
        border: false,
        style: 'background-color: #fff;',
        items: //Элементы формы
        [
        {
            xtype: 'htmleditor',
            enableAlignments: true,
            enableColors: true,
            enableFont: true,
            enableFontSize: true,
            enableFormat: true,
            enableLinks: true,
            enableLists: true,
            enableSourceEdit: false,
            readonly: true,
            width: 430,
            height: 200,
            id: 'tafMessagetext'
        }, {
            xtype: 'form',
            id: 'FileForm',
            border: false,
            items: //Элементы формы
            [{
                xtype: 'panel',
                autoScroll: true,
                title: 'Вложения',
                height: 120,
                width: 430,
                border: true,
                items: [{
                    xtype: 'AttachmentList'
                }]
            }]
        }]
    }],
    buttons: [

          { text: 'Закрыть',
              handler: function () {
                  this.up('window').close();
              }
          }],

    initComponent: function () {
        this.callParent(arguments);
    }
});