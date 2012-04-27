Ext.define
('VM.store.BaseStore',
  {
    extend: 'Ext.data.Store',
    listeners: {
      exception: function (store, response, op)
      {
        console.log('Exception !');
      }
    }
  }
);
