Ext.define('VM.model.SearchApplicants',
    {
        extend: 'Ext.data.Model',
        idProperty: 'ApplicantID',
        fields: ['ApplicantID', 'FullName', 'Requirements', 'Vacancies'],
        proxy:
        {
            type: 'ajax',
            api:
            {
                read: '/Applicant/GetSearchApplicants'
            },

            reader:
            {
                type: 'json',
                root: 'freeapplicants',
                successProperty: 'success'
            }
        }
    });