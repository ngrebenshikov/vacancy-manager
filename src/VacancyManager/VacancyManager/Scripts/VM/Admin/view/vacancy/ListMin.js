Ext.define('VM.view.vacancy.ListMin', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyListMin',
    id: 'vacancyGridMin',
    store: 'Vacancy',
    forceFit: true,
    columns: [
              {
                  dataIndex: 'Title',
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
        var searchAppGrid = this;
        searchAppGrid.fbar = ['Поиск: ',
            {
                xtype: 'triggerfield',
                width: 315,
                enableKeyEvents: true,
                triggerCls: 'x-form-clear-trigger',

                onChange: function () {
                    me = this;
                    var store = searchAppGrid.getStore();
                    store.clearFilter();
                    var searchStore = store,
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
                    var store = searchAppGrid.getStore();
                    store.clearFilter();
                    me.value = '';

                }
            }],
         searchAppGrid.callParent(arguments);
    }


});


