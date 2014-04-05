Ext.define('VM.view.vacancy.VacancyRequirementsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyrequirementsList',
    region: 'center',
    height: 500,
    id: 'vacancyrequirementsGrid',
    forceFit: true,
    frame: false,
    split: true,
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 2
    })],
    features: [Ext.create('Ext.grid.feature.Grouping', { groupHeaderTpl: '{name}' })],
    title: Strings.Skills,
    store: 'VacancyRequirements',
    columns: [
             { xtype: 'checkcolumn',
                 dataIndex: 'IsRequire',
                 width: 30,
                 align: 'center',
                 sortable: false,
                 field: { xtype: 'checkboxfield' },
                 menuDisabled: true
             }, {
                 dataIndex: 'RequirementName',
                 text: Strings.Skill,
                 flex :1,
                 sortable: false,
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