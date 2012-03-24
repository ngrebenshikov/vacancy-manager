Ext.define
('TechStack.store.TechStack',
  {
    extend: 'Ext.data.Store',
    model: 'TechStack.model.TechStack',
    autoLoad: true,

    proxy:
    {
      type: 'ajax',
      api:
      {
        read: '../TechnologyStack/Get',
        update: '../TechnologyStack/Update',
        create: '../TechnologyStack/Add',
        destroy: '../TechnologyStack/Delete'
      },
      reader:
      {
        type: 'json',
        root: 'TechStackList',
        successProperty: 'success'
      }
    }
  }
);
