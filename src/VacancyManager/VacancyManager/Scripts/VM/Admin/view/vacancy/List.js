Ext.define('VM.view.vacancy.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyList',
    region: 'center',
    height: 500,
    id: 'vacancyGrid',
    autoSizeColumns: true,
    forceFit: true,
    frame: false,
    split: true,
    store: 'Vacancy',
    columns: [
              {  
                  dataIndex: 'Title',
                  text: 'Вакансия',
                  width: 120, 
                  sortable: true,
                  field: { xtype: 'textfield' },
                  flex: 1,
                  menuDisabled: true
              }, { 
                  dataIndex: 'OpeningDate',
                  text: 'Дата открытия',
                  width: 100,
                  align: 'center',
                  sortable: true,
                  field: { xtype: 'datefield' },
                  menuDisabled: true,
                  renderer: Ext.util.Format.dateRenderer('d F Y'),
              }, {
                  dataIndex: 'Requirments',
                  text: 'Требования',
                  width: 130,
                  sortable: false,
                  menuDisabled: true
              }, {
                  dataIndex: 'Considerations',
                  align: 'center',
                  text: 'Соискателей',
                  width: 120,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
              }
             ],
    dockedItems: [{
                  xtype: 'pagingtoolbar',
                  store: 'Vacancy',
                  dock: 'bottom',
                  displayInfo: true
    }],
    plugins: [{
                  ptype: 'rowexpander',
                  expandOnDblClick: false,
                  selectRowOnExpand : true,
                  rowBodyTpl: [' <center> ',
                               ' <br> ',
                               ' <div id="IssueSubCategoryGridRow-{VacancyID}"></div>',
                               ' <br> ',
                               ' </center> ']
    }],

    bbar: [{
        text: 'Новая вакансия',
        name: 'btnLoadBlankVacancy',
        id: 'loadBlankVacancy',
        action: 'loadBlankVacancy' 
    }, {
        text: 'Редактировать',
        name: 'btnEditVacancy',
        id: 'EditVacancy',
        action: 'editVacancy' 
    },
    {  
        text: 'Удалить вакансию',
        action: 'deleteVacancy'
    }
   ]
});


