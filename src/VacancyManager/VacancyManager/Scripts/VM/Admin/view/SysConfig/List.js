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
    //title: Strings.Conf,
    store: 'SysConfig',

    initComponent: function () {
        Ext.apply(this,
        {
            columns: [{
                dataIndex: 'Name',
                text: Strings.ConfName,
                width: 40,
                sortable: true,
                field: { xtype: 'textfield' },
                flex: 1,
                menuDisabled: true
            }, {
                dataIndex: 'Value',
                text: Strings.Value,
                width: 120,
                sortable: false,
                field: { xtype: 'textfield' },
                menuDisabled: true
            }],

            tbar: [{
                text: Strings.btnAdd,
                icon: '/Content/icons/add.gif',
                name: 'btnAdd',
                id: 'Add',
                action: 'Add'
            }, {
                text: Strings.btnRemove,
                icon: '/Content/icons/delete.gif',
                name: 'btnRemove',
                id: 'Remove',
                action: 'Remove',
                disabled: true
            }],

            listeners: {
                selectionchange: function (view, selections, options) {
                    var button = Ext.getCmp('Remove');
                    if (selections != null)
                        button.enable();
                }
            }
        });

        this.callParent(arguments);
    }
}); 