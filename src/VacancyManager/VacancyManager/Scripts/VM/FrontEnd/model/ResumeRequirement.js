Ext.define('VM.model.ResumeRequirement', {
      extend: 'Ext.data.Model',
      idProperty: 'Id',
      fields: [
            { name: 'Id', type: 'int' },
            { name: 'StackName', type: 'string' }, 
            { name: 'ResumeId', type: 'int' },            
            { name: 'RequirementStackID', type: 'int'},
            { name: 'RequirementID', type: 'int' },
            { name: 'RequirementName', type: 'string' },
            { name: 'Comments', type: 'string' },
            { name: 'IsRequire', type: 'bool' }
        ]
  }
);