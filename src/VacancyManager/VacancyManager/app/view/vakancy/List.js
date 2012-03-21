
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
                      { dataIndex: 'ID', text: 'Код', width: 40, sortable: false, field: { xtype: 'textfield' }, menuDisabled: true },
                      { dataIndex: 'Title', text: 'Вакансия', width: 120, sortable: true, field: { xtype: 'textfield' }, menuDisabled: true },
                      { dataIndex: 'Description', text: 'Описание', width: 220, sortable: false, field: { xtype: 'textfield' }, menuDisabled: true },
                      { dataIndex: 'OpeningDate', text: 'Дата открытия', width: 60, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y'), field: { xtype: 'datefield' }, menuDisabled: true },
                      { dataIndex: 'ForeignLanguage', text: 'Иностранные языки', width: 120, sortable: false, field: { xtype: 'textfield' }, menuDisabled: true },
                      { dataIndex: 'Requirments', text: 'Требования', width: 120, sortable: false, field: { xtype: 'textfield' }, menuDisabled: true }
             ],

    plugins: [
                    Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit: 3,
                        pluginId: 'rowEditing'
                    })
            ],
    //   listeners: {
    //     itemdblclick: function (dv, record, item, index, e) {
    ///         alert('working');
    //      }
    //  },
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
            // Новая модель
            var r = Ext.create('AM.store.Vakancy', {
                Title: 'Новая вакансия',
                Description: 'Описание вакансии',
                OpeningDate: new Date(),
                ForeignLanguage: 'Иностранные языки',
                Requirments: 'Требования',
                IsVisible: true
            });
            store = Ext.data.StoreManager.get("AM.store.Vakancy");
            store.insert(0, r);
        }
    }, {
              text: 'fgd',
              handler: function () {
                  store = Ext.data.StoreManager.get("AM.store.Vakancy"); 
                  store.save();
              }
            } , {
                text: 'Удалить вакансию',
                handler: function () {
                    store = Ext.data.StoreManager.get("AM.store.Vakancy"); 
                    grid = Ext.getCmp("vakancyGrid");
                    var s = grid.getSelectionModel().getSelection();
                    for (var i = 0, r; r = s[i]; i++) {
                        store.remove(r);
                    }
                }
     

    }
              ]
});