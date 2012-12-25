Ext.define('VM.view.Comments.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.commentsList',
    hideHeaders: true,
    store: 'Comments',
    region: 'center',
    id: 'gridcomments',
    columns: [
  	        {
  	            width: 200,
  	            flex: 1,
  	            sortable: false,
  	            menuDisabled: true,
  	            align: 'justify',
  	            dataIndex: 'Body'
  	        },
            {
                sortable: false,
                width: 120,
                xtype: 'templatecolumn',
                tpl: 
                    new Ext.XTemplate(
                       '<h3><span>{[Ext.Date.format(values.CreationDate, "d.m.Y")]} <br> от {CommentatorName}</span></h3>'

                 )
            }

        ],

            width: 525,
            height: 375,
    viewConfig: {
        stripeRows: true
    },
    bbar: [{
        text: 'Новый комментарий',
        name: 'btnLoadBlankComment',
        id: 'BlankComment',
        action: 'loadBlankComment' 
    }, {
        text: 'Редактировать',
        name: 'btnEditComment',
        id: 'EditComment',
        action: 'editComment' 
    },
    {  
        text: 'Удалить комментарий',
        action: 'deleteComment'
    }
   ]
});
