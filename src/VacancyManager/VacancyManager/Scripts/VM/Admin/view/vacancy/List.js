Ext.define('VM.view.vacancy.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyList',
    id: 'vacancyGrid',
    frame: true,
    border: true,
    layout: 'fit',
    viewConfig: {
        id: 'Vacancygv',
        // autoScroll: true,
        loadingText: 'Загрузка вакансий...'
    },

    plugins: [{
        ptype: 'rowexpander',
        expandOnDblClick: false,
        selectRowOnExpand: true,
        rowBodyTpl: ['<div id="VacancyConsiderationGridRow-{VacancyID}" ></div>']
    }],

    initComponent: function () {

        vacancyGrid = this;
        vacancyGrid.store = 'Vacancy';
        vacancyGrid.columns = [
              {
                  dataIndex: 'Title',
                  text: 'Вакансия',
                  width: 180,
                  sortable: true,
                  menuDisabled: true
              }, {
                  dataIndex: 'Requirements',
                  text: 'Требования',
                  width: 130,
                  sortable: false,
                  flex: 1,
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
              }, {
                  dataIndex: 'Considerations',
                  align: 'center',
                  text: 'Соискателей',
                  width: 120,
                  sortable: false,
                  menuDisabled: true
              }],

    vacancyGrid.bbar = [{
        text: 'Новая вакансия',
        icon: '/Content/icons/add.gif',
        name: 'btnLoadBlankVacancy',
        id: 'loadBlankVacancy',
        action: 'loadBlankVacancy'
    }, {
        text: 'Редактировать',
        name: 'btnEditVacancy',
        icon: '/Content/icons/edit.png',
        id: 'EditVacancy',
        action: 'editVacancy'
    }, {
        text: 'Обновить',
        icon: '/Content/icons/refresh.gif',
        name: 'btnRefreshVacancyList',
        id: 'RefreshVacancyList',
        action: 'refreshVacancyList'
    }, '->',
    {
        text: 'Удалить вакансию',
        action: 'deleteVacancy',
        icon: '/Content/icons/delete.gif'
    }],
      vacancyGrid.callParent(arguments);
    }
});


