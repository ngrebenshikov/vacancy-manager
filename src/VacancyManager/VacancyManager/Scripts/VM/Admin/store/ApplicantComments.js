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
          read: '/Comments/LoadAppComments',
          create: '/Comments/Create'
      },
        reader:
      {
          type: 'json',
          root: 'comments',
          successProperty: 'success'
      },
      writer: {
          type: 'json',
          encode: false,
          listful: true,
          writeAllFields: true,
          getRecordData: function (record) {
              return { 'comments': Ext.JSON.encode(record.data) };
          }
      }
    },

    headers: { 'Content-Type': 'application/json; charset=UTF-8' },

    listeners: {
        'datachanged': function () {
            me = this;
            appComsTab = Ext.getCmp('ApplicantCommentsTab');
            if (appComsTab != undefined) {
                appComsTab.setTitle(Strings.btnCommentsView + ' (' + me.getCount() + ')');
            }
        }
    }
});

