Ext.define('VM.view.Applicant.ApplicantMessagesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ApplicantMessagesList',
    id: 'ApplicantMessagesGrid',
    store: 'ApplicantMessages',
    height: 465,
    forceFit: true,
    hideHeaders: true,   
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
                     columns: [{
                        width: 100,
                        flex: 2,
                        sortable: false,
                        menuDisabled: true,
                        dataIndex: 'Text',
                        tdCls: 'allow-lists'
                    }, {
                        sortable: false,
                        width: 130,
                        menuDisabled: true,
                        xtype: 'templatecolumn',
                        tdCls: 'wrap-text',
                        tpl:
                        new Ext.XTemplate(
                       '<b>{[Ext.Date.format(values.DeliveryDate, "d.m.Y")]} от <br>{From}</b>'
                         )
                    }],
            viewConfig: {
              loadingText: 'Загрузка сообщений...',
              layout: 'fit',
              autoSizeColumns: true
          },

          bbar: [{
              text: 'Просмотр сообщения',
              name: 'btnReadNewMessage',
              id: 'ReadMessage',
              action: 'ReadMessage'
          }, {
              text: 'Новое сообщение',
              name: 'btnSendNewMessage',
              id: 'SendNewMessage',
              action: 'SendNewMessage'
          }]
        });

        me.callParent(arguments);
    }

});