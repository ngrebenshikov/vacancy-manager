﻿Ext.define('VM.view.InputMessage.Index',
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.InputMessageIndex',
    region: 'center',
    border: false,
    layout: 'border',
    defaults: {
        split: true,
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
                //field: { xtype: 'textfield' },
                menuDisabled: true
            }, {
                dataIndex: 'Subject',
                text: Strings.Subject,
                width: 50,
                sortable: true,
                field: { xtype: 'textfield' },
                menuDisabled: true
//            }, {
//                dataIndex: 'SendDate',
//                text: Strings.SendDate,
//                width: 50,
//                sortable: true,
//                //field: { xtype: 'textfield' },
//                menuDisabled: true
//            }, {
//                dataIndex: 'DeliveryDate',
//                text: Strings.DeliveryDate,
//                width: 50,
//                sortable: true,
//                field: { xtype: 'textfield' },
//                menuDisabled: true
            }],
            
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'InputMessage',
                dock: 'bottom',
                displayInfo: true
            }],

            viewConfig: {
                getRowClass: function(record, index, rowParams, store) {
                    var isRead = record.get('IsRead');
                    if (isRead != true) {
                        return 'new-message';
                    }
                }
            }
        }]       
    },{
        region: 'center',
        title: 'Текст сообщения',
        border: true,
        layout: 'fit',
        items:
        [{
            id: 'InputMessageText',
            xtype: 'textareafield',
            emptyText: 'Выберите сообщение',
            grow: true,
            region: 'center',
            name: 'Text',
            anchor: '100%'
        }]
    },{
        region: 'south',
        title: 'Вложения',
        collapsible: true,
        collapsed: true,
        border: true,
        layout: 'fit',
        items:
        [{
            xtype: 'textfield'
        }]
    }],
    
    tbar: 
    [{
        text: Strings.btnAdd,
        icon: '/Content/icons/add.gif',
        tooltip: 'Добавить сообщение',
        name: 'btnCreateInputMessage',
        id: 'CreateInputMessage',
        action: 'CreateInputMessageShowForm'
    },{
        text: Strings.btnRemove,
        icon: '/Content/icons/delete.gif',
        tooltip: 'Добавить нового соискателя',
        name: 'btnRemoveInputMessage',
        id: 'RemoveInputMessage',
        action: 'RemoveInputMessage',
        disabled: true
    }]    
}); 