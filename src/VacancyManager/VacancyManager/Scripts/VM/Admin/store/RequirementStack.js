Ext.define
('VM.store.RequirementStack',
  {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.RequirementStack',
    //id: 'RequirementStackStore',
    autoLoad: true,
    autoSync: true,
    autoSave: true,
    proxy:
    {
      type: 'ajax',
      api:
      {
        read: '../../RequirementStack/GetStack',
        update: '../../RequirementStack/UpdateStack',
        create: '../../RequirementStack/AddStack',
        destroy: '../../RequirementStack/DeleteStack'
      },
      reader:
      {
        type: 'json',
        root: 'RequirementStackList',
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
      },
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
  }
);
