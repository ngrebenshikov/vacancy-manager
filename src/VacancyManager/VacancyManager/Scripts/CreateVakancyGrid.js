Ext.onReady(function () {

    Ext.define('Vakancy', {
        extend: 'Ext.data.Model',
        idProperty: 'ID',
        fields: [
                 { name: 'ID', type: 'int' },
                 { name: 'Title' },
                 { name: 'Description' },
                 { name: 'OpeningDate', type: 'date', dateFormat: 'MS' },
                 { name: 'ForeignLanguage' },
                 { name: 'Requirments' },
                 { name: 'IsVisible' }
        ]
    });

    var VakancyStore = new Ext.data.Store({
        autoLoad: true,
        autoSync: true,
        autoSave: false,
        model: 'Vakancy',
        proxy: {
            type: 'ajax',
            api: {
                read: '/Vakancy/Load',
                create: 'Vakancy/Create',
                update: '/Vakancy/Update',
                destroy: '/Vakancy/Delete'
            },
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'total'
            },
            writer: {
                type: 'json',
                encode: false,
                listful: true,
                writeAllFields: true,
                getRecordData: function (record) {
                    return { 'data': Ext.JSON.encode(record.data) };
                }
            },
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }
    });

    var editpanel = new Ext.form.FormPanel({
        border: false,
        frame: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        labelWidth: 100,
        items: [
                {
                    xtype: 'textfield',
                    id: 'txtTitle',
                    fieldLabel: 'Название',
                    allowBlank: false
                }, {
                    xtype: 'textareafield',
                    fieldLabel: 'Описание',
                    flex: 1,
                    id: 'txtareaDescription',
                    margins: '0',
                    allowBlank: false
                }, {
                    xtype: 'datefield',
                    id: 'dtOpeningDate',
                    fieldLabel: 'Дата открытия',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    id: 'txtForeignLanguage',
                    fieldLabel: 'Иностранные языки',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    id: 'txtRequirments',
                    fieldLabel: 'Требования',
                    allowBlank: false
                }, {
                    xtype: 'checkboxfield',
                    id: 'bIsVisible',
                    fieldLabel: 'Актуально',
                    allowBlank: false
                }

             ]
    });

    var editForm = new Ext.Window({
        title: 'sdsdf',
        height: 450,
        width: 430,
        modal: true,
        closeAction: 'hide',
        layout: 'fit',
        items: editpanel,
        buttonAlign: 'center',
        buttons: [{
            text: 'Сохранить',
            handler: function () {
                //Запись полей формы в рекорд
                VakancyStore.save();
                editForm.hide();
            }

        }, {
            text: 'Отмена',
            handler: function () {
                editForm.hide();
            }
        }]

    });


    // Создаем грид
    var grid = new Ext.grid.GridPanel({
        renderTo: 'VakancyGrid',
        region: "center",
        height: 400,
        autoSizeColumns: true,
        forceFit: true,
        frame: true,
        title: 'Вакансии',
        store: VakancyStore,
        iconCls: 'icon-user',
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
                        clicksToEdit: 2,
                        pluginId: 'rowEditing'
                    })
            ],
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: VakancyStore,
            dock: 'bottom',
            displayInfo: true,
            displayMsg: 'Показано  {0} - {1} из {2}',
            emptyMsg: 'Нет данных для отображения'
        }],
        tbar: [{
            text: 'Новая вакансия',
            handler: function () {
                // Новая модель
                var r = Ext.create('Vakancy', {
                    Title: 'Новая вакансия',
                    Description: 'Описание вакансии',
                    OpeningDate: Ext.Date.clearTime(new Date()),
                    ForeignLanguage: 'Иностранные языки',
                    Requirments: 'Требования',
                    IsVisible: true
                });

                VakancyStore.insert(0, r);
            }
        },

            {
                text: 'Редактировать',
                handler: function () {
                    editForm.update = true;
                    editForm.setTitle('Редактирование вакансии');
                    editForm.show();

                    var records = grid.getSelectionModel().getSelection();
                    Ext.getCmp("txtTitle").setValue(records[0].data.Title);
                    Ext.getCmp("txtareaDescription").setValue(records[0].data.Description);
                    Ext.getCmp("dtOpeningDate").setValue(records[0].data.OpeningDate);
                    Ext.getCmp("txtForeignLanguage").setValue(records[0].data.ForeignLanguage);
                    Ext.getCmp("txtRequirments").setValue(records[0].data.Requirments);
                    Ext.getCmp("bIsVisible").setValue(records[0].data.IsVisible);
                }
            }
            ,
            {
                text: 'Удалить вакансию',
                handler: function () {
                    var s = grid.getSelectionModel().getSelection();
                    for (var i = 0, r; r = s[i]; i++) {
                        VakancyStore.remove(r);
                    }
                }
            },
             {
                 text: 'Сохранить изменения',
                 handler: function () {
                     VakancyStore.save();
                 }
             }]


    });

});