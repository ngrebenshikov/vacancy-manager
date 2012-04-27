
Ext.define('VM.view.vacancy.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyList',
    region: 'center',
    height: 500,
    id: 'vacancyGrid',
    autoSizeColumns: true,
    //autoHeight: true,
    forceFit: true,
    frame: false,
    split: true,
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
                  dataIndex: 'OpeningDate',
                  text: 'Дата открытия',
                  width: 60,
                  sortable: true,
                  field: { xtype: 'datefield' },
                  menuDisabled: true,
                  renderer: Ext.util.Format.dateRenderer('d F Y'),
              }, {
                  dataIndex: 'ForeignLanguage',
                  text: 'Иностранные языки',
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
            rowBodyTpl : [
                '<br>',
                '<p><b>Описание:</b> {Description}</p><br>',
                '<p><b>Требования:</b> {Requirments}</p>'
            ]
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


