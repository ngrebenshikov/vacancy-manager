Ext.define('VM.store.ApplicantComments', { 
    extend: 'VM.store.BaseStore',
    model: 'VM.model.Comment',
    autoLoad: false,
    autoSync: true,
    id: 'applicantCommentsStore',
    proxy:
    {
        type: 'ajax',
        api:
      {
          read: '/Comments/LoadAppComments'
      },
        reader:
      {
          type: 'json',
          root: 'applicantcomments',
          successProperty: 'success'
      }
    },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
   }
);

