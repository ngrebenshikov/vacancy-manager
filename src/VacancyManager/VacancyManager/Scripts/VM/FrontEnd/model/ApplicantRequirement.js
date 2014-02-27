Ext.define('VM.model.ApplicantRequirement', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: ['Id', 'ApplicantId', 'StackId', 'StackName', 'RequirementId', 'RequirementName', 'CommentText', 'IsChecked']
});