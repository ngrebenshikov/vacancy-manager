Ext.define('VM.view.applicant.ApplicantConsiderations', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.applicantConsiderationsList',
    id: 'applicantConsiderationsGrid',
    store: 'ApplicantConsideration',
    columns: [
              {
                  dataIndex: 'Vacancy',
                  header: 'Вакансия',
                  width: 140,
                  flex: 1,
                  sortable: true,
                  menuDisabled: true
              }, {
                  dataIndex: 'Status',
                  header: 'Статус заявки',
                  align: 'center',
                  width: 140,
                  sortable: true,
                  menuDisabled: true
              }]
});