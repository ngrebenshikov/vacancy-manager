Ext.define
('VM.model.RequirementListInStack',
  {
    extend: 'Ext.data.Model',
    idProperty: 'RequirementID',
    fields: ['RequirementID', 'RequirementStackID', 'Name']
    //RequirementnologyStackID добавлен сюда для того,
    //чтобы в будущем внести возможность перемещения технологии в другой стек
  }
);
