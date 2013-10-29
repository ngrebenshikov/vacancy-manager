Ext.define('VM.store.ResumeApplicant', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ResumeApplicant',
    id: 'ResumeApplicant',
    autoLoad: true,
    autoSync: true,
    autoSave: true,
    proxy:
       {
           type: 'ajax',
           api:
           {
               read: '/Resume/',
               create: '/Resume/',
               update: '/Resume/',
           },

           reader:
           {
               type: 'json',
               root: 'Resume/',
               successProperty: 'success'
           }
       }
});