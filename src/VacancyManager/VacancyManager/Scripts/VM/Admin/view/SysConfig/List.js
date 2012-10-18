Ext.define('VM.view.SysConfig.List',
{
    extend: 'Ext.grid.Panel',
    alias: 'widget.SysConfigList',
    region: 'center',
    id: 'SysConfigGrid',
    autoSizeCoulms: true,
    forceFit: true,
    split: true,
    frame: false,
    title: 'Конфигурация',
    store: 'SysConfig',

    initComponent: function () {
        Ext.apply(this,
        {
            columns: [{
                dataIndex: 'Name',
                text: 'Параметр',
                width: 40,
                sortable: true,
                field: { xtype: 'textfield' },
                flex: 1,
                menuDisabled: true
            }, {
                dataIndex: 'Value',
                text: 'Значение',
                width: 120,
                sortable: false,
                field: { xtype: 'textfield' },
                menuDisabled: true
            }],

            bbar: [{
                text: 'Добавить',
                name: 'btnAdd',
                id: 'Add',
                action: 'Add'
            }, {
                text: 'Удалить',
                name: 'btnRemove',
                id: 'Remove',
                action: 'Remove'
            }]
        });

        this.callParent(arguments);
    }
}); 