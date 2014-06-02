var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2
});

Ext.define('VM.Shared.ExpReqsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ExpReqsList',
    height: 600,
    id: 'resExpReqsGrid',
    frame: false,
    border: true,
    plugins: [cellEditing],
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        id: 'reqsGrouping'
    }],

    title: Strings.Skills,

    columns: [
             { xtype: 'checkcolumn',
                 dataIndex: 'IsRequire',
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
                 dataIndex: 'Comments',
                 text: Strings.UserCommentary,
                 width: 120,
                 flex: 1,
                 field: { xtype: 'textfield' },
                 sortable: false,
                 menuDisabled: true
             }
          ]
});



