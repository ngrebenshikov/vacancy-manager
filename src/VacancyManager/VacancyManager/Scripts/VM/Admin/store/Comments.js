Ext.define('VM.store.Comments', { 
      extend: 'VM.store.BaseStore',
      model: 'VM.model.Comment',
      autoLoad: false,
      autoSync: true,
      consideration: undefined,
      id: 'CommentsStore',
      proxy:
    {
        type: 'ajax',
        api:
      {
          read: '/Comments/Load',
          create: 'Comments/Create',
          update: '/Comments/Update',
          destroy: 'Comments/Delete'
      },
        reader:
      {
          type: 'json',
          root: 'comments',
          successProperty: 'success'
      },
        writer:
      {
          type: 'json',
          encode: false,
          listful: true,
          writeAllFields: true,
          getRecordData: function (record) {
              return { 'comments': Ext.JSON.encode(record.data) };
          }
      },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
  }
);

