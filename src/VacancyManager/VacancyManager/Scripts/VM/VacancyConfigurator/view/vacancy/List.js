
Ext.define('VM.view.vacancy.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancylist',
    region: "center",
    height: 500,
    id: 'vacancyGrid',
    autoSizeColumns: true,
    autoHeight: true,
    forceFit: true,
    frame: true,
    title: 'Вакансии',
    store: 'Vacancy',
    columns: [                                      
                      {
                          dataIndex: 'Title',
                          text: 'Вакансия',
                          width: 120, 
                          sortable: true,
                          field: { xtype: 'textfield' },
                          menuDisabled: true 
                      }, {
                          dataIndex: 'Description',
                          text: 'Описание',
                          width: 220, 
                          sortable: false,
                          field: { xtype: 'textfield' },
                          menuDisabled: true
                      }, { 
                          dataIndex: 'OpeningDate',
                          text: 'Дата открытия',
                          width: 60,
                          sortable: true,
                          field: { xtype: 'datefield' },
                          menuDisabled: true,
                          renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                      }, {
                          dataIndex: 'ForeignLanguage',
                          text: 'Иностранные языки',
                          width: 120,
                          sortable: false,
                          field: { xtype: 'textfield' },
                          menuDisabled: true
                      }, { 
                         dataIndex: 'Requirments',
                         text: 'Требования',
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
        displayInfo: true,
        displayMsg: 'Показано  {0} - {1} из {2}',
        emptyMsg: 'Нет данных для отображения'
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

