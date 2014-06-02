Ext.define('VM.view.vacancy.VacancyRequirementsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vacancyrequirementsList',
    region: 'center',
    height: 500,
    id: 'vacancyrequirementsGrid',
    border: true,
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 2
    })],
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        id: 'vacReqGrouping'
    }],
    store: 'VacancyRequirements',
    columns: [{
        xtype: 'checkcolumn',
        dataIndex: 'IsRequire',
        width: 30,
        align: 'center',
        sortable: false,
        field: { xtype: 'checkboxfield' },
        menuDisabled: true
    }, {
        dataIndex: 'RequirementName',
        text: Strings.Skill,
        flex: 1,
        sortable: false,
        menuDisabled: true
    }, {
        dataIndex: 'Comments',
        text: Strings.UserCommentary,
        width: 120,
        sortable: false,
        field: { xtype: 'textfield' },
        menuDisabled: true
    }]
});