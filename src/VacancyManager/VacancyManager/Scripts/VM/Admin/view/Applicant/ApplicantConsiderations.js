Ext.define('VM.view.Applicant.ApplicantConsiderations', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.applicantConsiderationsList',
    id: 'applicantConsiderationsGrid',
    store: 'ApplicantConsiderations',
    width: 143,
    title: 'Вакансии',
    hideHeaders: true,
    height: 350,
    columns: [
              {
                  dataIndex: 'VacancyTitle',
                  width: 140,
                  sortable: true,
                  menuDisabled: true
              }]
});