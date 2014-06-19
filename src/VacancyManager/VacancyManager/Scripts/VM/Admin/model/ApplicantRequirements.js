Ext.define('VM.model.ApplicantRequirements', {
        extend: 'Ext.data.Model',
        idProperty: 'Id',
        fields: [{ name: 'Id', type: 'int' },
        'ApplicantId', 'StackId', 'StackName', 'RequirementId', 'RequirementName', 'Comments', 'IsChecked']
    }
);