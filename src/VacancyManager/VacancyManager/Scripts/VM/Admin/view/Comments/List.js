
Ext.define('VM.view.Comments.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commentsList',
    store: 'Comments',
    id: 'gridcomments',
    columns: [
  	        {
  	            flex: 1,
  	            sortable: false,
                text: 'Коментарий',
  	            menuDisabled: true,
                textalign: 'justify',
  	            dataIndex: 'Body',
  	            tdCls: 'wrap-text'
  	        },
            {
                sortable: false,
                width: 90,
                text: 'Дата',
                menuDisabled: true,
                xtype: 'templatecolumn',
                tdCls: 'wrap-text',
                tpl: 
                    new Ext.XTemplate(
                       '<b>{[Ext.Date.format(values.CreationDate, "d.m.Y")]} <br> от {CommentatorName}</b>'

                 )
            }
    ],
    bbar: [{
        text: 'Обновить список',
        name: 'btnUpdateCommentsList',
        align: 'right',
        id: 'updateCommentsList',
        action: 'updateCommentsList' 
    }
   ]
});
