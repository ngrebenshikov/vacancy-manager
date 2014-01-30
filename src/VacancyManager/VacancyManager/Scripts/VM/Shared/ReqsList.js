var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2,
    listeners: {
        beforeedit: function (e, editor) {
            if (e.colIdx == 1)
                return false;
        }
    }
});

Ext.define('VM.ReqsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ReqsList',
    height: 500,
    id: 'resReqsGrid',
    frame: false,
    plugins: [cellEditing],
    features: [Ext.create('Ext.grid.feature.Grouping', {
        groupHeaderTpl: '{name}: ' + Strings.Skills + ' ({rows.length})'
    })],

    title: Strings.Skills,

    columns: [
             {   xtype: 'checkcolumn',
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



