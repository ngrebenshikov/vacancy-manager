Ext.define('VM.view.applicant.ApplicantRequirments', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.AppReqsList',
    id: 'appReqsGrid',
    frame: false,

    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 2
    })],

    features: [Ext.create('Ext.grid.feature.Grouping', {
        groupHeaderTpl: '{name}: ' + Strings.Skills + ' ({rows.length})'
    })],

    store: 'ApplicantRequirement',
    columns: [
             { xtype: 'checkcolumn',
                 dataIndex: 'IsChecked',
                 width: 40,
                 align: 'center',
                 sortable: false,
                 menuDisabled: true
             }, {
                 dataIndex: 'RequirementName',
                 text: Strings.Skill,
                 width: 120,
                 flex: 1,
                 sortable: false,
                 menuDisabled: true
             }, {
                 dataIndex: 'CommentText',
                 text: Strings.UserCommentary,
                 width: 120,
                 flex: 1,
                 field: { xtype: 'textfield' },
                 sortable: false,
                 menuDisabled: true
             }
          ]
 
});