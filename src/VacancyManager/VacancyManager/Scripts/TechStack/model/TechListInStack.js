Ext.define('TechStack.model.TechListInStack', {
  extend: 'Ext.data.Model',
  idProperty: 'TechnologyID',
  fields: ['TechnologyID', 'TechnologyStackID', 'Name']
  //TechnologyStackID добавлен сюда для того,
  //чтобы в будущем внести возможность перемещения технологии в другой стек
});
