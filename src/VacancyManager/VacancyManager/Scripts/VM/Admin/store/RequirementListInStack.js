Ext.define
('VM.store.RequirementListInStack',
  {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.RequirementListInStack',
    //id: 'RequirementListInStackStore',
    autoSync: true,
    autoSave: true,
    proxy:
    {
      type: 'ajax',
      api:
      {
        read: '../../RequirementStack/GetRequirementListInStack',
        update: '../../RequirementStack/UpdateRequirementInStack',
        create: '../../RequirementStack/AddRequirementToStack',
        destroy: '../../RequirementStack/DeleteRequirementFromStack'
      },
      reader:
      {
        type: 'json',
        root: 'RequirementList',
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
      },
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
  }
);
