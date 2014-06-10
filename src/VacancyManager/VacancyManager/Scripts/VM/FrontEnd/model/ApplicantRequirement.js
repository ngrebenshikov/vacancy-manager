﻿Ext.define('VM.model.ApplicantRequirement', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{ name: 'Id', type: 'int' }, 
            'ApplicantId', 'StackId', 'StackName', 'RequirementId', 'RequirementName', 'CommentText', 'IsChecked']
});