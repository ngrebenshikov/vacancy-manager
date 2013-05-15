Ext.define('VM.view.InputMessage.Index',
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.InputMessageIndex',
    region: 'center',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },
    items:
    [{
        region: 'north',
        height: '50%',
        layout: 'fit',
        border: false,
        items:
        [{
            xtype: 'grid',
            id: 'InputMessageGrid',
            autoSizeColumns: true,
            forceFit: true,
            frame: false,
            layout: 'fit',
            region: 'center',
            multiSelect: true,
            store: 'InputMessage',
            columns:
            [{
                dataIndex: 'Sender',
                text: Strings.Sender,
                width: 120,
                sortable: true,
                menuDisabled: true
            }, {
                dataIndex: 'Vacancy',
                text: Strings.Vacancy,
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
            }],

            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'InputMessage',
                dock: 'bottom',
                displayInfo: true
            }],

            tbar: [{
//                text: Strings.btnAdd,
//                icon: '/Content/icons/add.gif',
//                tooltip: 'Добавить сообщение',
//                name: 'btnCreateInputMessage',
//                id: 'CreateInputMessage',
//                action: 'CreateInputMessageShowForm'
//            }, {
                text: Strings.btnRemove,
                icon: '/Content/icons/delete.gif',
                tooltip: 'Добавить нового соискателя',
                name: 'btnRemoveInputMessage',
                id: 'RemoveInputMessage',
                action: 'RemoveInputMessage',
                disabled: true  
            }, '->', {
                xtype: 'triggerfield',
                emptyText: Strings.MessageFilter,
                width: 350,
                fieldLabel: ' ',
                labelSeparator: '',
                id: 'IMFilterField',
                enableKeyEvents: true,
                triggerCls: 'x-form-clear-trigger',

                onTriggerClick: function (e) {
                    this.reset();
                    this.labelEl.update('');
                    Ext.StoreManager.lookup('InputMessage').clearFilter();
                }
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
    }, {
        region: 'center',
        id: 'imTextPanel',
        border: true,
        layout: 'anchor',
        autoScroll: true,
        items:
        [{
            id: 'InputMessageText',
            xtype: 'textareafield',
            emptyText: 'Выберите сообщение',
            grow: true,
            readOnly: true,
            name: 'Text',
            html: "",
            anchor: '100%'
        }]
    }, {
        region: 'south',
        title: Strings.Attachment,
        id: 'imAttachmentPanel',
        collapsible: true,
        collapsed: true,
        height: 111,
        border: true,
        layout: 'fit',
        items:
        [{
            xtype: 'grid',
            id: 'AttachmentGrid',
            autoSizeColumns: true,
            forceFit: true,
            frame: false,
            hideHeaders: true,
            layout: 'fit',
            region: 'center',
            store: 'Attachment',
            columns:
            [{
                xtype: 'templatecolumn',
                tpl: '<img src="/Content/MIME-icons/' + '{Icon}' + '.png"/> {FileName} ({FileSize} Kb)',
                text: 'FileName',
                dataIndex: 'FileName',
                width: 300,
                menuDisabled: true
            }]
        }]
    }]
});