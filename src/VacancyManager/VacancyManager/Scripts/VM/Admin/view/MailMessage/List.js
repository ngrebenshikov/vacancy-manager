Ext.define('VM.view.MailMessage.List', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MailMessageList',
    id: 'mailMessageGrid',
    region: 'center',
    border: false,
    layout: 'fit',
    items:
    [{
        xtype: 'grid',
        id: 'MailMessageGrid',
        frame: false,
        multiSelect: true,
        store: 'MailMessage',
        columns:
            [{
                dataIndex: 'From',
                text: Strings.Sender,
                flex: 1,
                sortable: true,
                menuDisabled: true
            }, {
                dataIndex: 'To',
                text: 'Получатель',
                flex: 1,
                sortable: true,
                menuDisabled: true
            }, {
                dataIndex: 'Subject',
                text: Strings.Subject,
                flex: 1,
                sortable: true,
                menuDisabled: true
            }, {
                dataIndex: 'Vacancy_C',
                text: Strings.Vacancy,
                width: 120,
                align: 'center',
                sortable: true,
                menuDisabled: true
            }, {
                xtype: 'datecolumn',
                format: 'd.m.Y H:i',
                dataIndex: 'SendDate',
                text: Strings.SendDate,
                align: 'center',
                width: 90,
                sortable: true,
                menuDisabled: true
            }, {
                xtype: 'datecolumn',
                format: 'd.m.Y H:i',
                align: 'center',
                dataIndex: 'DeliveryDate',
                text: Strings.DeliveryDate,
                width: 90,
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
                  enableToggle: true,
                  pressed: true,
                  toggleGroup: 'MessagesGroup',
                  id: 'Messages_Incoming',
                  action: 'getIncomingMessages'
              }, '-',
              {
                  text: 'Исходящие сообщения',
                  enableToggle: true,
                  toggleGroup: 'MessagesGroup',
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
            icon: '/Content/icons/edit.png',
            action: 'browseMessage'
        }, {
            text: Strings.SendMessage,
            name: 'btnewMailMessage',
            icon: '/Content/icons/add.gif',
            id: 'messageOper2',
            action: 'newMailMessage'
        }, {
            text: 'Обновить',
            icon: '/Content/icons/refresh.gif',
            name: 'btnUpdateinbox',
            id: 'messageOper1',
            action: 'updateMessages'
        }, '->', {
            text: 'Удалить сообщение',
            action: 'deleteMessage',
            icon: '/Content/icons/delete.gif',
            id: 'messageOper4'
        }],

        viewConfig: {
            loadingText: 'Загрузка сообщений',
            getRowClass: function (record, index, rowParams, store) {
                var isRead = record.get('IsRead');
                if (isRead != true) {
                    return 'new-message';
                }
            }
        }
    }]
});