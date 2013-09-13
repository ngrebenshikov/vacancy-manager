var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2,
    listeners: {
        beforeedit: function (e, editor) {
            if (e.colIdx == 1)
                return false;
        }
    }
});

Ext.define('VM.view.vacancy.VacancyRequirementsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyrequirementsList',
    region: 'center',
    height: 500,
    id: 'vacancyrequirementsGrid',
    autoSizeColumns: true,
    forceFit: true,
    frame: false,
    split: true,
    plugins: [cellEditing],
    features: [Ext.create('Ext.grid.feature.Grouping',{
        groupHeaderTpl: '{name}: ' + Strings.Skills + ' ({rows.length})'
    })],
    title: Strings.Skills,  
    store: 'VacancyRequirements',
    columns: [
             {   xtype: 'checkcolumn',
                 dataIndex: 'IsRequire',
                 width: 10,
                 align: 'center',
                 sortable: false,
                 field: { xtype: 'checkboxfield' },
                 menuDisabled: true
             }, {
                  dataIndex: 'RequirementName',
                  text: Strings.Skill,
                  width: 120,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
             }, {
                  dataIndex: 'Comments',
                  text: Strings.UserCommentary,
                  width: 120,
                  sortable: false,
                  field: { xtype: 'textfield' },
                  menuDisabled: true
                }

             ]
});