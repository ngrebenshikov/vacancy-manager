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
  	            width: 200,
  	            flex: 1,
  	            sortable: false,
  	            menuDisabled: true,
  	            align: 'justify',
  	            dataIndex: 'UserRole'
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
    bbar: [{
        text: 'Обновить список',
        name: 'btnUpdateCommentsList',
        align: 'right',
        id: 'updateCommentsList',
        action: 'updateCommentsList' 
    }
   ],
    viewConfig: {
        stripeRows: false,
        getRowClass: function (record) {
            return record.get('UserRoles') == 'Admin' ? 'admin-row' : 'user-row';
        } 
    }
});
