Ext.define('VM.model.ExperienceRequirement', {
      extend: 'Ext.data.Model',
      idProperty: 'Id',
      fields: [
            { name: 'Id', type: 'int' },
            { name: 'StackName', type: 'string' },
            { name: 'ExperienceId', type: 'int' },
            { name: 'RequirementStackID', type: 'int' },
            { name: 'RequirementID', type: 'int' },
            { name: 'RequirementName', type: 'string' },
            { name: 'Comments', type: 'string' },
            { name: 'IsRequire', type: 'bool' }
        ]
  }
);