Ext.define('VM.view.MailMessage.List',
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.MailMessageList',
    id: 'mailMessageGrid',
    region: 'center',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },
    items:
    [{
        xtype: 'grid',
        id: 'MailMessageGrid',
        autoSizeColumns: true,
        forceFit: true,
        frame: false,
        layout: 'fit',
        region: 'center',
        multiSelect: true,
        store: 'MailMessage',
        columns:
            [{
                dataIndex: 'From',
                text: Strings.Sender,
                width: 120,
                sortable: true,
                menuDisabled: true
            }, {
                dataIndex: 'To',
                text: 'Получатель',
                width: 120,
                sortable: true,
                menuDisabled: true
            }, {
                dataIndex: 'Subject',
                text: Strings.Subject,
                width: 50,
                sortable: true,
                menuDisabled: true
            }, {
                dataIndex: 'Vacancy_C',
                text: Strings.Vacancy,
                width: 50,
                sortable: true,
                menuDisabled: true
            }, {
                xtype: 'datecolumn',
                format: 'd.m.Y H:i',
                dataIndex: 'SendDate',
                text: Strings.SendDate,
                width: 50,
                sortable: true,
                menuDisabled: true
            }, {
                xtype: 'datecolumn',
                format: 'd.m.Y H:i',
                dataIndex: 'DeliveryDate',
                text: Strings.DeliveryDate,
                width: 50,
                sortable: true,
                menuDisabled: true
            }, {
                xtype: 'actioncolumn',
                width: 20,
                align: 'center',
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'Content/icons/UserMail.png',
                    tooltip: 'Прикрепить к соискателю',
                    handler: function (view, rowIndex, colIndex, item, e) {
                        var mailsStore = Ext.StoreManager.lookup('MailMessage'),
                            consAssignStore = Ext.StoreManager.lookup('ConsiderationAssign');
                        var rec = mailsStore.getAt(rowIndex);
                        if (mailsStore.currentMessageType == 1) {
                            consAssignStore.load({ params: { "Email": rec.get('From')} });
                        }
                        else {
                            consAssignStore.load({ params: { "Email": rec.get('To')} });
                        }

                        Ext.create('VM.view.MailMessage.ConsiderationAssign').show();
                    }
                }]
            }],

        tbar: [
              {
                  text: Strings.InputMessages,
                  name: 'btnInputMessage',
                  id: 'Messages_Incoming',
                  action: 'getIncomingMessages'
              }, '-',
              {
                  text: 'Исходящие сообщения',
                  name: 'btnSendedMessage',
                  id: 'Messages_Sended',
                  action: 'getSendedMessages'
              }, '->',
              {
                  xtype: 'triggerfield',
                  emptyText: Strings.MessageFilter,
                  width: 350,
                  fieldLabel: ' ',
                  labelSeparator: '',
                  id: 'MFilterField',
                  enableKeyEvents: true,
                  triggerCls: 'x-form-clear-trigger',

                  onTriggerClick: function (e) {
                      this.reset();
                      this.labelEl.update('');
                      Ext.StoreManager.lookup('MailMessage').clearFilter();
                  }
              }],
        bbar: [{
            text: 'Просмотр сообщения',
            name: 'btnBrowseMessage',
            id: 'messageOper3',
            action: 'browseMessage'
        }, '-', {
            text: Strings.SendMessage,
            name: 'btnewMailMessage',
            id: 'messageOper2',
            action: 'newMailMessage'
        }, '-', {
            text: 'Удалить сообщение',
            action: 'deleteMessage',
            id: 'messageOper4'
        }, '->', {
            text: 'Обновить',
            name: 'btnUpdateinbox',
            id: 'messageOper1',
            action: 'updateMessages'
        }
             ],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: 'MailMessage',
            dock: 'bottom',
            displayInfo: true
        }],
        viewConfig: {
            getRowClass: function (record, index, rowParams, store) {
                var isRead = record.get('IsRead');
                if (isRead != true) {
                    return 'new-message';
                }
            }
        }
    }]
});