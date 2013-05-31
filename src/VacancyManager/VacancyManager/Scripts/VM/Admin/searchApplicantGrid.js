
Ext.define('VM.searchApplicantGrid', {
    extend: 'Ext.grid.Panel',
    id: 'searchApplicantGrid',
    alias: 'widget.searchApplicantGrid',
    store: 'ConsiderationApplicants',
    columns: [{
        dataIndex: 'Selected',
        text: '',
        xtype: 'checkcolumn',
        width: 30,
        sortable: true,
        menuDisabled: true
    },
    {
        dataIndex: 'FullName',
        text: Strings.FullName,
        width: 200,
        sortable: true,
        menuDisabled: true
    }, {
        dataIndex: 'Requirements',
        text: Strings.Skills,
        width: 130,
        sortable: false,
        flex: 1,
        menuDisabled: true
    }],

    initComponent: function () {
        var me = this;
        me.bbar = [{
            xtype: 'panel',
            width: 550,
            border: true,
            items: [
                          { xtype: 'panel',
                              width: 500,
                              layout: 'hbox',
                              border: false,
                              items: [
                                    {
                                        xtype: 'triggerfield',
                                        enableKeyEvents: true,
                                        triggerCls: 'x-form-clear-trigger',
                                        width: 485,
                                        fieldLabel: 'ФИО',
                                        margin: 2
                                    }]
                          },
                          { xtype: 'panel',
                              width: 500,
                              layout: 'hbox',
                              border: false,
                              items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Требования',
                                        id: 'searchReqs',
                                        width: 420,
                                        readOnly: true,
                                        value: 'Выберите требования...',
                                        margin: 2
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Изменить',
                                        handler: function (button) {
                                            me.onSelectReqButtonClick();
                                        }
                                    }]
                          },
                          { xtype: 'panel',
                              width: 500,
                              layout: 'hbox',
                              border: false,
                              items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Вакансии',
                                        readOnly: true,
                                        width: 420,
                                        value: 'Выберите вакансии...',
                                        id: 'searchVacs',
                                        margin: 2
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Изменить',
                                        handler: function (button) {
                                            searchVacancyWin.show();
                                        }
                                    }]
                          }
                          ]
        }
     ],

     me.callParent(arguments);

    },

    onSelectReqButtonClick: function () {

        var me = this;

        Ext.define('searchVacancyModel', {
            extend: 'Ext.data.Model',
            idProperty: 'VacancyID',
            fields: [
                 {
                     name: 'VacancyID',
                     type: 'int',
                     usenull: true
                 },
                 { name: 'Title' },
                 {
                     name: 'OpeningDate',
                     type: 'date',
                     dateFormat: 'd.m.Y'
                 }]
        });

        var searchVacancyStore = Ext.create('Ext.data.Store', {
            model: 'searchVacancyModel',
            id: 'searchVacancyStore',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/Vacancy/Load'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total',
                    successProperty: 'success'
                }
            },
            autoLoad: true,
            autoSync: true,
            autoSave: false
        });

        var smSearchVacancy = Ext.create('Ext.selection.CheckboxModel');

        var searchVacancyGrid = Ext.create('Ext.grid.Panel', {
            height: 310,
            id: 'searchVacancyGrid',
            autoSizeColumns: true,
            forceFit: true,
            frame: false,
            selModel: smSearchVacancy,
            split: true,
            store: searchVacancyStore,
            columns: [{
                dataIndex: 'Title',
                text: 'Вакансия',
                width: 120,
                sortable: false,
                menuDisabled: true
            }, {
                dataIndex: 'OpeningDate',
                text: 'Дата открытия',
                width: 150,
                align: 'center',
                sortable: true,
                xtype: 'datecolumn',
                format: 'd.m.Y',
                menuDisabled: true
            },
         ], 

         bbar:  [{
                   xtype: 'triggerfield',
                   enableKeyEvents: true,
                   triggerCls: 'x-form-clear-trigger',
                   width: 485,
                   fieldLabel: 'Поиск:',
                   margin: 2
                }]
        });

        var searchVacancyForm = Ext.widget('form', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            bodyPadding: 10,

            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },
            defaults: {
                margins: '0 0 10 0'
            },

            items: searchVacancyGrid,
            buttonAlign: 'center',
            buttons: [
            { text: 'Добавить',
                handler: function () {

                    var records = searchVacancyGrid.getSelectionModel().getSelection(),
                  selectedVacs = [],
                  selectedVacsIDs = [];

                    Ext.Array.each(records, function (rec) {
                        selectedVacs.push(rec.get('Title'));
                        selectedVacsIDs.push(rec.get('VacancyID'));
                    })
                    var searchVacsField = Ext.getCmp('searchVacs');
                    searchVacsField.setValue(selectedVacs);
                    searchVacancyWin.hide();
                }
            },
          { text: 'Отмена',
              handler: function ()
              { this.up('window').hide(); }
          }]
        });

        searchVacancyWin = Ext.widget('window', {
            title: 'Выберите вакансии',
            closeAction: 'hide',
            width: 400,
            height: 400,
            minHeight: 400,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: searchVacancyForm
        });
    },

    onSelectReqButtonClick: function () {
        var me = this;

        Ext.define('reqModel', {
            extend: 'Ext.data.Model',
            idProperty: 'RequirementID',
            fields: [
            { name: 'StackName', type: 'string' },
            { name: 'RequirementID', type: 'int' },
            { name: 'RequirementName', type: 'string' }
            ]
        });

        var reqStore = Ext.create('Ext.data.Store', {
            model: 'reqModel',
            groupField: 'StackName',
            autoLoad: false,
            autoSync: false,
            autoSave: true,
            proxy: {
                type: 'ajax',
                api: {
                    read: '/RequirementStack/GetRequirementsWithStacks'
                },
                reader: {
                    type: 'json',
                    root: 'reqs',
                    totalProperty: 'total'
                }
            }
        });

        reqStore.load();

        var sm = Ext.create('Ext.selection.CheckboxModel');


        var reqGrid = Ext.create('Ext.grid.Panel', {
            height: 310,
            id: 'requirementsGrid',
            autoSizeColumns: true,
            forceFit: true,
            frame: false,
            selModel: sm,
            split: true,
            store: reqStore,
            features: [Ext.create('Ext.grid.feature.Grouping', {
                groupHeaderTpl: '{name}: ' + Strings.Skills + ' ({rows.length})'
            })],
            columns: [{
                dataIndex: 'RequirementName',
                text: Strings.Skill,
                width: 120,
                sortable: false,
                field: { xtype: 'textfield' },
                menuDisabled: true
            }
         ]
        });

        var reqForm = Ext.widget('form', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            bodyPadding: 10,

            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },
            defaults: {
                margins: '0 0 10 0'
            },

            items: reqGrid,
            buttonAlign: 'center',
            buttons: [
            { text: 'Добавить',
                handler: function () {
                    var records = reqGrid.getSelectionModel().getSelection(),
                  selectedReqs = [],
                  selectedReqsIDs = [];
                    Ext.Array.each(records, function (rec) {
                        selectedReqs.push(rec.get('RequirementName'));
                        selectedReqsIDs.push(rec.get('RequirementID'));
                    })
                    searchReqsField = Ext.getCmp('searchReqs').setValue(selectedReqs);
                    reqWin.hide();
                }
            },

            { text: 'Отмена',
                handler: function () {
                    this.up('window').hide();
                }
            }]
        });

        reqWin = Ext.widget('window', {
            title: 'Выберите навыки',
            closeAction: 'hide',
            width: 400,
            height: 400,
            minHeight: 400,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: reqForm
        });

        reqWin.show();
    },

    height: 350,
    width: 550,
    viewConfig: {
        stripeRows: true
    }
});