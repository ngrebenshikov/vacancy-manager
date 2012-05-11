Ext.define
('VM.store.Roles',
  {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.Roles',
    autoLoad: true,
    autoSync:true,
    proxy:
    {
      type: 'ajax',
      api:
      {
        read: '../../Roles/GetRoles',
        create: '../../Roles/AddRole',
        destroy: '../../Roles/DeleteRole'
      },
      reader:
      {
        type: 'json',
        root: 'RolesList',
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
