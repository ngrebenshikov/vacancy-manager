Ext.define
('VM.store.TechListInStack',
  {
    extend: 'Ext.data.Store',
    model: 'VM.model.TechListInStack',
    id: 'TechListInStackStore',
    proxy:
    {
      type: 'ajax',
      api:
      {
        read: '../TechnologyStack/GetTechListInStack',
        update: '../TechnologyStack/UpdateTechInStack',
        create: '../TechnologyStack/AddTechToStack',
        destroy: '../TechnologyStack/DeleteTechFromStack'
      },
      reader:
      {
        type: 'json',
        root: 'TechList',
        successProperty: 'success'
      },
      writer:
      {
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
