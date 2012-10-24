Ext.define('VM.model.ApplicantModel',
    {
        extend: 'Ext.data.Model',
        idProperty: 'ApplicantID',
        fields: ['ApplicantID', 'FullName', 'ContactPhone', 'Email']
    }
);