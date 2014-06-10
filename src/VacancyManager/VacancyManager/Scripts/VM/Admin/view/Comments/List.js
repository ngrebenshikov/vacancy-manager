Ext.define('VM.view.Comments.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commentsList',
    store: 'Comments',
    border: true,
    disableSelection: true,
    id: 'gridcomments',
    columns: [{
        flex: 3,
        sortable: false,
        text: 'Коментарий',
        menuDisabled: true,
        textalign: 'justify',
        dataIndex: 'Body',
        tdCls: 'wrap-text'
    }, {
        sortable: false,
        width: 120,
        text: 'Дата',
        flex: 1,
        align: 'center',
        menuDisabled: true,
        xtype: 'templatecolumn',
        tdCls: 'wrap-text',
        tpl:new Ext.XTemplate(
                       '<b>{[Ext.Date.format(values.CreationDate, "d.m.Y")]} <br> от {CommentatorName}</b><br>',
                       '<tpl if="ConsiderationID != null">',
                        '<b>Вакансия: {Vacancy}</b>',
                        '</tpl>')
    }],
    viewConfig: {
        trackOver: false
    }
});
