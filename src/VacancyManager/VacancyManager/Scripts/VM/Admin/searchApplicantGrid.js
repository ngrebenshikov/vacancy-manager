
Ext.define('VM.searchApplicantGrid', {
    extend: 'Ext.grid.Panel',
    id: 'searchApplicantGrid',
    alias: 'widget.searchApplicantGrid',
    appSearchReqs: [],
    appSearchVacs: [],
   // selType: 'checkboxmodel',
    appSearchEmp: 1,
    appSearchEmpC: 0,
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
    },
    {
        dataIndex: 'Employed',
        text: 'Трудоустроен',
        width: 130,
        sortable: false,
        align: 'center',
        menuDisabled: true,
        renderer: function (value) {
            var cssPrefix = Ext.baseCSSPrefix,
                        cls = [cssPrefix + 'grid-checkheader'];

            if (value) {
                cls.push(cssPrefix + 'grid-checkheader-checked');
            }
            return '<div class="' + cls.join(' ') + '">&#160;</div>';
        }
    }],

    initComponent: function () {

        var searchAppGrid = this;

        searchAppGrid.fbar = [{
            xtype: 'panel',
            width: 550,
            border: false,
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
                          },
                          {
                              width: 500,
                              border: false,
                              id: 'searchEmployed',
                              enableKeyEvents: true,
                              items: [{
                                  xtype: 'combobox',
                                  fieldLabel: 'Трудоустройство',
                                  store: ['Трудоустроен', 'Не Трудоустроен', 'Не выбран'],
                                  listeners: {

                                      change: function (field, newValue, oldValue) {
                                          switch (newValue) {
                                              case "Трудоустроен":
                                                  searchAppGrid.appSearchEmp = 1;
                                                  searchAppGrid.appSearchEmpC = 1;
                                                  searchAppGrid.filterApplicants();
                                                  break;
                                              case "Не Трудоустроен":
                                                  searchAppGrid.appSearchEmp = 0;
                                                  searchAppGrid.appSearchEmpC = 0;
                                                  searchAppGrid.filterApplicants();
                                                  break;
                                              case "Не выбран":
                                                  searchAppGrid.appSearchEmp = 1;
                                                  searchAppGrid.appSearchEmpC = 0;
                                                  searchAppGrid.filterApplicants();
                                                  break;
                                          }

                                      }
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

        var smSearchVacancy = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: true
        });

        var searchVacancyGrid = Ext.create('Ext.grid.Panel', {
            height: 310,
            id: 'searchVacancyGrid',
            autoSizeColumns: true,
            frame: false,
            multiSelect: true,
            selType: 'checkboxmodel',
            store: searchVacancyStore,
            columns: [{
                dataIndex: 'Title',
                text: 'Вакансия',
                flex: 1,
                sortable: false,
                menuDisabled: true
            }, {
                dataIndex: 'OpeningDate',
                text: 'Дата открытия',
                width: 100,
                align: 'center',
                sortable: true,
                xtype: 'datecolumn',
                format: 'd.m.Y',
                menuDisabled: true
            }
         ],

            fbar: ['Поиск: ',
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

            if ((countReqs >= me.appSearchReqs.length) && (countVacs >= me.appSearchVacs.length) && (regexp.test(record.get("FullName"))) && ((record.get("Employed") == me.appSearchEmp) || (record.get("Employed") == me.appSearchEmpC))) {
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


        var sm = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: true
        });

        var reqGrid = Ext.create('Ext.grid.Panel', {
            height: 310,
            id: 'requirementsGrid',
            autoSizeColumns: true,
            forceFit: true,
            frame: false,
            selModel: sm,
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
                    reqWin.close();
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