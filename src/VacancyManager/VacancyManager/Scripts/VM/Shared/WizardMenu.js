
var myData = [
        ['step-1','Основная информация', false],
        ['step-2', 'Компетенция', false],
        ['step-3', 'Профессональный опыт', false],
        ['step-4', 'Образование', false],
        ['step-5', 'Дополниетельная информация', false]
];

var store = Ext.create('Ext.data.ArrayStore', {
    id: 'stageindex',
    autoLoad: true,
    autoSync: true,
    autoSave: true,
    fields: [
           { name: 'stageindex' },
           { name: 'stage' },
           { name: 'ischeck', type: 'boolean' }
        ],
    data: myData
});

Ext.define('VM.WizardMenu', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.WizardMenu',
    collapsible: true,
    id: 'wizardMenuGrid',
    split: true,
    region: 'west',
    hideHeaders: true,
    store: this.store,
    width: 240,
    title: 'Этапы',
    minSize: 100,
    maxSize: 100,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    dataIndex: 'ischeck',
                    align: 'center',
                    width: 40,
                    sortable: false,
                    menuDisabled: true,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var f = value;
                        var cssPrefix = Ext.baseCSSPrefix,
                        cls = [cssPrefix + 'grid-checkheader'];

                        if (f) {
                            cls.push(cssPrefix + 'grid-checkheader-checked');
                        }
                        return '<div class="' + cls.join(' ') + '">&#160;</div>';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'stage',
                    flex: 1
                }
            ],
            viewConfig: {

            }
        });

        me.callParent(arguments);
    }

});