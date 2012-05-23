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
    features: [Ext.create('Ext.grid.feature.Grouping',{
              groupHeaderTpl: '{name} требований: ({rows.length})'
    })],
    title: 'Требования',  
    store: 'VacancyRequirements',
    columns: [
             {
                 dataIndex: 'Require',
                 width: 10,
                 align: 'center',
                 sortable: false,
                 field: { xtype: 'checkboxfield' },
                 menuDisabled: true,
                 renderer: function(value) {
                    var text = '<input type="checkbox"';
                    if(value)
                     text += ' checked="checked"';
                    return text + '/>';
                 }
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