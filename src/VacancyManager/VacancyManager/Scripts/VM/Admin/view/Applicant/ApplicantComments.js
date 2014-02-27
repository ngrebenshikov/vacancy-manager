Ext.define('VM.view.Applicant.ApplicantComments', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.appCommentsList',
    hideHeaders: false,
    store: 'ApplicantComments',
    id: 'appsCommentsList',
    region: 'center',
    layout: 'fit',
    columns: [
  	        {   header: 'Комментарий',
  	            width: 100,
  	            flex: 1,
  	            sortable: false,
  	            menuDisabled: true,
  	            dataIndex: 'Body',
  	            tdCls: 'wrap-text'
  	        },
            {   header: 'Дата',
                sortable: false,
                align: 'center',
                menuDisabled: true,
                xtype: 'templatecolumn',
                tdCls: 'wrap-text',
                tpl:
                    new Ext.XTemplate(
                       '<b>{[Ext.Date.format(values.CreationDate, "d.m.Y")]} <br> от {CommentatorName} <br> Вакансия: {VacancyName} </b>'

                )
            }
    ]
});

