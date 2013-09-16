Ext.define('VM.view.Applicant.ApplicantComments', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.appCommentsList',
    hideHeaders: true,
    store: 'ApplicantComments',
    id: 'appsCommentsList',
    autoSizeColumns: true,
    region: 'center',
    layout: 'fit',
    forceFit: true,
    columns: [
  	        {
  	            width: 100,
  	            flex: 2,
  	            sortable: false,
  	            menuDisabled: true,
   	            dataIndex: 'Body',
  	            tdCls: 'wrap-text'
  	        },
            {
                sortable: false,
                align: 'center',
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

