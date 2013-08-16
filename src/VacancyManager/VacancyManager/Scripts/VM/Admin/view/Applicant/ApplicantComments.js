Ext.define('VM.view.Applicant.ApplicantComments', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.appCommentsList',
    hideHeaders: true,
    store: 'ApplicantComments',
    height: 350,
    id: 'appsCommentsList',
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
    ]
});

