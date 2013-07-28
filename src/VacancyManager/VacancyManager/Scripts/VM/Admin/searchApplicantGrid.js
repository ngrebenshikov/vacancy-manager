﻿
Ext.define('VM.searchApplicantGrid', {
    extend: 'Ext.grid.Panel',
    id: 'searchApplicantGrid',
    alias: 'widget.searchApplicantGrid',
    appSearchReqs: [],
    appSearchVacs: [],
    store: 'SearchApplicants',
    columns: [{
        dataIndex: 'Selected',
        xtype: 'checkcolumn',
        width: 30,
        align: 'center',
        sortable: false,
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
    },
    {
        dataIndex: 'Vacancies',
        text: 'Вакансии',
        width: 130,
        sortable: false,
        flex: 1,
        menuDisabled: true
    }],

    initComponent: function () {

        var searchAppGrid = this;

        searchAppGrid.bbar = [{
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
                                        id: 'searchFullName',
                                        fieldLabel: 'ФИО',
                                        margin: 2,

                                        onChange: function () {
                                            searchAppGrid.filterApplicants();
                                        },

                                        onTriggerClick: function (e) {
                                            me = this;
                                            searchAppGrid.filterApplicants();
                                            me.setValue('');
                                        }
                                    }]
                          },
                          { xtype: 'panel',
                              width: 500,
                              layout: 'hbox',
                              border: false,
                              items: [
                                    {
                                        xtype: 'triggerfield',
                                        enableKeyEvents: false,
                                        fieldLabel: 'Требования',
                                        triggerCls: 'x-form-clear-trigger',
                                        id: 'searchReqs',
                                        width: 420,
                                        emptyText: 'Выберите требования...',
                                        margin: 2,
                                        onTriggerClick: function (e) {
                                            me = this;
                                            searchAppGrid.appSearchReqs = [];
                                            searchAppGrid.filterApplicants();
                                            me.setValue('');
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Изменить',
                                        handler: function (button) {
                                            searchAppGrid.onSelectReqButtonClick();
                                        }
                                    }]
                          },
                          { xtype: 'panel',
                              width: 500,
                              layout: 'hbox',
                              border: false,
                              items: [
                                    {
                                        xtype: 'triggerfield',
                                        enableKeyEvents: false,
                                        fieldLabel: 'Вакансии',
                                        width: 420,
                                        emptyText: 'Выберите вакансии...',
                                        triggerCls: 'x-form-clear-trigger',
                                        id: 'searchVacs',
                                        margin: 2,
                                        onTriggerClick: function (e) {
                                            me = this;
                                            searchAppGrid.appSearchVacs = [];
                                            searchAppGrid.filterApplicants();
                                            me.setValue('');
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Изменить',
                                        handler: function (button) {
                                            searchAppGrid.onSelectVacancyButtonClick();
                                        }
                                    }]
                          }
                          ]
        }
     ],

     searchAppGrid.callParent(arguments);

    },

    onSelectVacancyButtonClick: function () {

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

            bbar: ['Поиск: ',
            {
                xtype: 'triggerfield',
                width: 315,
                enableKeyEvents: true,
                triggerCls: 'x-form-clear-trigger',

                onChange: function () {
                    me = this;
                    searchVacancyStore.clearFilter();
                    var searchStore = searchVacancyStore,
                        fieldName = 'Title';

                    var fieldValue = me.getValue();

                    searchStore.filter({
                        property: fieldName,
                        value: fieldValue,
                        exactMatch: false,
                        caseSensitive: false
                    });
                },

                onTriggerClick: function (e) {
                    searchVacancyStore.clearFilter();
                    me.value = '';

                }
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
                    selectedVacs = [];

                    Ext.Array.each(records, function (rec) {
                        selectedVacs.push(rec.get('Title'));
                    });

                    var searchVacsField = Ext.getCmp('searchVacs');
                    searchVacsField.setValue(selectedVacs);

                    var searchAppGrid = Ext.getCmp('searchApplicantGrid');
                    searchAppGrid.appSearchVacs = selectedVacs;
                    searchAppGrid.filterApplicants();

                    searchVacancyWin.close();
                    searchVacancyStore.clearFilter();
                }
            },

          { text: 'Отмена',
              handler: function () {
                  this.up('window').close();
                  searchVacancyStore.clearFilter();
              }
          }]
        });

        searchVacancyWin = Ext.widget('window', {
            title: 'Выберите вакансии',
            width: 400,
            height: 400,
            minHeight: 400,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: searchVacancyForm
        });

        searchVacancyWin.show();

    },

    filterApplicants: function () {

        var me = this;
        var searchApplicantsStore = me.getStore();

        searchApplicantsStore.clearFilter();

        var fullName = Ext.getCmp('searchFullName').getValue();

        searchApplicantsStore.filterBy(function (record) {

            var countReqs = 0,
                countVacs = 0;

            Ext.Array.each(me.appSearchReqs, function (rec) {

                if (Ext.Array.contains(record.get('Requirements'), rec)) {
                    countReqs++;
                }
            });

            Ext.Array.each(me.appSearchVacs, function (rec) {

                if (Ext.Array.contains(record.get('Vacancies'), rec)) {
                    countVacs++;
                }
            });

            var regexp = new RegExp(fullName, "i");

            if ((countReqs >= me.appSearchReqs.length) && (countVacs >= me.appSearchVacs.length) && (regexp.test(record.get("FullName")))) {
                return true;
            }
            else {
                return false;
            }

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
                        selectedReqs = [];

                    Ext.Array.each(records, function (rec) {
                        selectedReqs.push(rec.get('RequirementName'));
                    });

                    searchReqsField = Ext.getCmp('searchReqs').setValue(selectedReqs);

                    var searchAppGrid = Ext.getCmp('searchApplicantGrid');
                    searchAppGrid.appSearchReqs = selectedReqs;
                    searchAppGrid.filterApplicants();
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