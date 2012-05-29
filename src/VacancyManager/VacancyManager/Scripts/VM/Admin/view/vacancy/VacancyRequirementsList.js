var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2
});

Ext.define('VM.view.vacancy.VacancyRequirementsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyrequirementsList',
    region: 'center',
    height: 500,
    id: 'vacancyrequirementsGrid',
    autoSizeColumns: true,
    //autoHeight: true,
    forceFit: true,
    frame: false,
    split: true,
    plugins: [cellEditing],
    features: [Ext.create('Ext.grid.feature.Grouping',{
              groupHeaderTpl: '{name} требований: ({rows.length})'
    })],
    title: 'Требования',  
    store: 'VacancyRequirements',
    columns: [
             {   xtype: 'checkcolumn',
                 dataIndex: 'Require',
                 width: 10,
                 align: 'center',
                 sortable: false,
                 field: { xtype: 'checkboxfield' },
                 menuDisabled: true
             }, {
                  dataIndex: 'RequirementName',
                  text: 'RequirementName',
                  width: 120,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
             }, {
                  dataIndex: 'Comments',
                  text: 'Comments',
                  width: 120,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                }

             ]
});