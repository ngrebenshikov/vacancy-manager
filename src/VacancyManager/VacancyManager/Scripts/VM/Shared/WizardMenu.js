
/*var myData = { 'items': [
        {'step-1', 'Основная информация', false},
        {'step-2', 'Компетенция', false},
        {'step-3', 'Профессональный опыт', false},
        {'step-4', 'Образование', false},
        {'step-5', 'Дополнительная информация', false}
]
};*/

var store = Ext.create('Ext.data.Store', {
    id: 'stageindex',
    autoLoad: false,
    autoSync: true,
    autoSave: true,
    fields: [
           { name: 'stageindex' },
           { name: 'stage' },
           { name: 'ischeck', type: 'boolean' },
           { name: 'enabled', type: 'boolean' },
        ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    },
    data:{'items':[
        { 'stageindex': 'step-1', 'stage': 'Основная информация', 'ischeck': 'false', 'enabled': 'true' },
        { 'stageindex': 'step-2', 'stage': 'Компетенция', 'ischeck': 'false', 'enabled': 'false' },
        { 'stageindex': 'step-3', 'stage': 'Профессональный опыт', 'ischeck': 'false', 'enabled': 'false' },
        { 'stageindex': 'step-4', 'stage': 'Образование', 'ischeck': 'false', 'enabled': 'false' },
        { 'stageindex': 'step-5', 'stage': 'Дополнительная информация', 'ischeck': 'false', 'enabled': 'false' }
    ]}
});

Ext.define('VM.Shared.WizardMenu', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.WizardMenu',
    collapsible: true,
    id: 'wizardMenuGrid',
    split: true,
    region: 'west',
    hideHeaders: true,
    store: this.store,
    width: 240,
    border: true,
    frame: true,
    title: 'Этапы',
    minSize: 100,
    maxSize: 100,
    initComponent: function () {
        var me = this;
        var wmenu = me.getStore();
        wmenu.load();

        Ext.applyIf(me, {
            columns: [
                { xtype: 'checkcolumn',
                    dataIndex: 'ischeck',
                    align: 'center',
                    width: 40,
                    sortable: false,
                    menuDisabled: true,
                    processEvent: function () { return false; }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'stage',
                    flex: 1
                }
            ],
            viewConfig: {
                getRowClass: function (record, index) {
                    // disabled-row - custom css class for disabled (you must declare it)
                    if (record.get('enabled') == false) return 'disabled-row';
                }

            }

        });

        me.callParent(arguments);
    }

});