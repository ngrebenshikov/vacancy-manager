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
        read: '../TechnologyStack/GetStack',
        update: '../TechnologyStack/UpdateStack',
        create: '../TechnologyStack/AddStack',
        destroy: '../TechnologyStack/DeleteStack'
      },
      reader:
      {
        type: 'json',
        root: 'TechStackList',
        successProperty: 'success'
      },
      writer: {
        type: 'json',
        encode: false,
        listful: true,
        writeAllFields: true,
        getRecordData: function (record)
        {
          return { 'data': Ext.JSON.encode(record.data) };
        }
      }
    }
  }
);
