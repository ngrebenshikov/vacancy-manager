
Ext.define('AM.view.vakancy.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vakancylist',
    region: "center",
    height: 400,
    id: 'vakancyGrid',
    autoSizeColumns: true,
    forceFit: true,
    frame: true,
    title: 'Вакансии',
    store: 'Vakancy',

    columns: [
                      { dataIndex: 'Title', text: 'Вакансия', width: 120, sortable: true, field: { xtype: 'textfield' }, menuDisabled: true },
                      { dataIndex: 'Description', text: 'Описание', width: 220, sortable: false, field: { xtype: 'textfield' }, menuDisabled: true },
                      { dataIndex: 'OpeningDate', text: 'Дата открытия', width: 60, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y'), field: { xtype: 'datefield' }, menuDisabled: true },
                      { dataIndex: 'ForeignLanguage', text: 'Иностранные языки', width: 120, sortable: false, field: { xtype: 'textfield' }, menuDisabled: true },
                      { dataIndex: 'Requirments', text: 'Требования', width: 120, sortable: false, field: { xtype: 'textfield' }, menuDisabled: true }
             ],

    plugins: [
                    Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit: 2,
                        pluginId: 'rowEditing'
                    })
            ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Vakancy',
        dock: 'bottom',
        displayInfo: true,
        displayMsg: 'Показано  {0} - {1} из {2}',
        emptyMsg: 'Нет данных для отображения'
    }],
    tbar: [{
        text: 'Новая вакансия',
        handler: function () {
            var grid = Ext.getCmp("vakancyGrid");
            var store = grid.getStore();
            var s = grid.getSelectionModel().getSelection();
            var r = Ext.create('AM.model.Vakancy', {
                Title: 'Новая вакансия',
                Description: 'Описание вакансии',
                OpeningDate: new Date(),
                ForeignLanguage: 'Иностранные языки',
                Requirments: 'Требования',
                IsVisible: true
            });
            store.insert(0, r);
        }
    }, {
        text: 'Сохранить',
        handler: function () {
            var grid = Ext.getCmp("vakancyGrid");
            var store = grid.getStore();
            store.save();
        }
    }, {
        text: 'Удалить вакансию',
        handler: function () {
            var grid = Ext.getCmp("vakancyGrid");
            var store = grid.getStore();
            var s = grid.getSelectionModel().getSelection();
            for (var i = 0, r; r = s[i]; i++) {
                store.remove(r);
            }
        }


    }
   ]
});