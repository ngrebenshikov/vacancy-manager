Ext.define('VM.view.applicant.ApplicantConsiderations', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.applicantConsiderationsList',
    id: 'applicantConsiderationsGrid',
    store: 'ApplicantConsideration',
    hideHeaders: true,
    columns: [
              {
                  dataIndex: 'Vacancy',
                  width: 140,
                  flex: 1,
                  sortable: true,
                  menuDisabled: true
              }]
});