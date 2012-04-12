
Ext.define('VM.view.consideration.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.considerationList',
    region: 'center',
    height: 400,
    id: 'considerationGrid',
    autoSizeColumns: true,
    autoHeight: true,
    forceFit: true,
    frame: false,
    split: true,
    title: 'Consideration',  
    store: 'Consideration',
    columns: [                                   
                      {
                          dataIndex: 'ConsiderationID',
                          text: 'ConsiderationID',
                          width: 120, 
                          sortable: true,
                          field: { xtype: 'textfield' },
                          menuDisabled: true 
                      }, { 
                          dataIndex: 'VacancyID',
                          text: 'VacancyID',
                          width: 60,
                          sortable: true,
                          field: { xtype: 'textfield' },
                          menuDisabled: true
                      }, {
                          dataIndex: 'ApplicantID',
                          text: 'ApplicantID',
                          width: 120,
                          sortable: false,
                          field: { xtype: 'textfield' },
                          menuDisabled: true
                      }
   ]
        

});