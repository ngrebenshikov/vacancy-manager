Ext.define('VM.view.Applicant.ApplicantConsiderations', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.applicantConsiderationsList',
    id: 'applicantConsiderationsGrid',
    store: 'ApplicantConsiderations',
    width: 150,
    bodyPadding: 2,
    enableColumnResize: false,
    columns: [
              {
                  dataIndex: 'Vacancy',
                  header: 'Вакансия',
                  flex: 1,
                  sortable: false,
                  menuDisabled: true
              }],
    viewConfig: {
        columnLines: true
    }
});