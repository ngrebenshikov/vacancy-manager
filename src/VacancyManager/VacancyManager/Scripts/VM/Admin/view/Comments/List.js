
Ext.define('VM.view.Comments.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commentsList',
    hideHeaders: true,
    store: 'Comments',
    region: 'center',
    layout: 'anchor',
    id: 'gridcomments',
    columns: [
  	        {
  	            width: 100,
  	            flex: 1,
  	            sortable: false,
  	            menuDisabled: true,
                textalign: 'justify',
  	            dataIndex: 'Body',
  	            tdCls: 'wrap-text'
  	        },
            {
                sortable: false,
                width: 90,
                menuDisabled: true,
                xtype: 'templatecolumn',
                tdCls: 'wrap-text',
                tpl: 
                    new Ext.XTemplate(
                       '<b>{[Ext.Date.format(values.CreationDate, "d.m.Y")]} <br> от {CommentatorName}</b>'

                 )
            }
    ],
    width: 520,
    height: 375,
    bbar: [{
        text: 'Обновить список',
        name: 'btnUpdateCommentsList',
        align: 'right',
        id: 'updateCommentsList',
        action: 'updateCommentsList' 
    }
   ]
});
