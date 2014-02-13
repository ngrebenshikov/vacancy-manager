Ext.define('VM.view.vacancy.ListMin', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyListMin',
    id: 'vacancyGridMin',
    store: 'VacancyAssign',
    forceFit: true,
    columns: [
              {
                  dataIndex: 'Vacancy',
                  text: 'Вакансия',
                  width: 180,
                  sortable: true,
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
              }

             ],
    initComponent: function () {
        var searchVacGrid = this;
        searchVacGrid.fbar = ['Поиск: ',
            {
                xtype: 'triggerfield',
                width: 315,
                enableKeyEvents: true,
                triggerCls: 'x-form-clear-trigger',

                onChange: function () {
                    me = this;
                    var store = searchVacGrid.getStore();
                    store.clearFilter();
                    var searchStore = store,
                        fieldName = 'Vacancy';

                    var fieldValue = me.getValue();

                    searchStore.filter({
                        property: fieldName,
                        value: fieldValue,
                        exactMatch: false,
                        caseSensitive: false
                    });
                },

                onTriggerClick: function (e) {
                    var store = searchVacGrid.getStore();
                    store.clearFilter();
                    me.value = '';

                }
            }],
         searchVacGrid.callParent(arguments);
    }


});


