Ext.define('VM.model.ApplicantRequirements',
    {
        extend: 'Ext.data.Model',
        idProperty: 'Id',
        fields: ['Id', 'ApplicantId', 'StackId', 'StackName', 'RequirementId', 'RequirementName', 'CommentText','CurrentId', 'IsChecked']
    }
);