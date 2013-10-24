﻿Ext.define('VM.view.vacancy.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyList',
    id: 'vacancyGrid',
    store: 'Vacancy',
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
                  format:'d.m.Y',
                  menuDisabled: true
              }, {
                  dataIndex: 'Requirements',
                  text: 'Требования',
                  width: 130,
                  sortable: false,
                  flex: 1,
                  menuDisabled: true
              }, {
                  dataIndex: 'Considerations',
                  align: 'center',
                  text: 'Соискателей',
                  width: 120,
                  sortable: false,
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
                  rowBodyTpl: ['<div class="ux-row-expander-box"></div>']

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


