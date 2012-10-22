Ext.define('VM.model.VacancyRequirements',
  {
      extend: 'Ext.data.Model',
      idProperty: 'RequirementID',
      fields: [
            { name: 'VacancyRequirementID', type: 'int' },
            { name: 'StackName', type: 'string' }, 
            { name: 'VacancyID', type: 'int' },            
            { name: 'RequirementStackID', type: 'int'},
            { name: 'RequirementID', type: 'int' },
            { name: 'RequirementName', type: 'string' },
            { name: 'Comments', type: 'string' },
            { name: 'Require', type: 'bool' }
        ]
  }
);