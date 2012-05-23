Ext.define('VM.model.VacancyRequirements',
  {
      extend: 'Ext.data.Model',
      fields: [
            { name: 'RequirementStackID', type: 'int'},
            { name: 'StackName', type: 'string' },
            { name: 'RequirementID', type: 'int' },
            { name: 'RequirementName', type: 'string' },
            { name: 'Comments', type: 'string' },
            { name: 'Require', type: 'bool' }
        ]
  }
);