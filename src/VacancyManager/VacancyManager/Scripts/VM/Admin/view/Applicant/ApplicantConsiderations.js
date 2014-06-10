Ext.define('VM.view.Applicant.ApplicantConsiderations', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.applicantConsiderationsList',
    store: 'Consideration',
    id: 'applicantConsiderationsGrid',
    enableColumnResize: false,
    columns: [{
                  dataIndex: 'Vacancy',
                  header: 'Вакансия',
                  flex: 1,
                  sortable: false,
                  menuDisabled: true
              }, {
                  text: 'Текст комментария',
                  flex: 1,
                  sortable: false,
                  menuDisabled: true,
                  dataIndex: 'LastCommentBody'
              }, {
                  text: 'Комментариев',
                  align: 'center',
                  width: 120,
                  sortable: false,
                  menuDisabled: true,
                  dataIndex: 'CommentsCount'
              }, {
                  text: 'Статус заявки',
                  width: 140,
                  align: 'center',
                  sortable: false,
                  menuDisabled: true,
                  dataIndex: 'Status'
              }],


});