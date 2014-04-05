Ext.define('VM.view.SysConfig.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.SysConfigList',
    id: 'SysConfigGrid',
    frame: true,
    store: 'SysConfig',
    features: [Ext.create('Ext.grid.feature.Grouping', { groupHeaderTpl: '{name}' })],
    initComponent: function () {
        Ext.apply(this, {
            columns: [{
                dataIndex: 'Name',
                header: Strings.ConfName,
                flex: 1,
                sortable: true,
                menuDisabled: true
            }, {
                dataIndex: 'Value',
                align: 'center',
                header: Strings.Value,
                flex: 1,
                sortable: false,
                menuDisabled: true,
                renderer: function (value) {
                    var cssPrefix = Ext.baseCSSPrefix,
                        cls = [cssPrefix + 'grid-checkheader'];

                    if (value == "true" || value == "True") {
                        cls.push(cssPrefix + 'grid-checkheader-checked');
                        return '<div class="' + cls.join(' ') + '">&#160;</div>';
                    }
                    else if (value == "false" || value == "False") {
                        return '<div class="' + cls.join(' ') + '">&#160;</div>';
                    }
                    else
                        return value;
                }
            }],

            bbar: [{
                text: Strings.btnAdd,
                icon: '/Content/icons/add.gif',
                name: 'btnAdd',
                id: 'Add',
                action: 'Add'
            }, {
                text: 'Обновить',
                icon: '/Content/icons/refresh.gif',
                name: 'btnRefreshSysConfigList',
                id: 'RefreshSysConfigList',
                action: 'refreshSysConfigList'
            }, '->', {
                text: Strings.btnRemove,
                icon: '/Content/icons/delete.gif',
                name: 'btnRemove',
                id: 'btnRemoveSysConfig',
                action: 'Remove',
                disabled: true
            }]
        });

        this.callParent(arguments);
    }
}); 