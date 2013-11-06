Ext.define('VM.view.Applicant.ApplicantMessages', {
    extend: 'Ext.window.Window',
    alias: 'widget.ApplicantMessagesManage',
    title: 'Почтовые сообщения',
    height: 540,
    width: 550,
    autoShow: true,
    maximizable: false,
    collapsible: false,
    modal: true,
    buttonAlign: 'center',
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 5 5',
                border: false,
                style: 'background-color: #fff;',
                items: [
                {
                      xtype: 'gridpanel',
                      store: 'ApplicantMessages',
                      id: 'appsMessagesList',
                      region: 'center',
                      layout: 'fit',
                      autoSizeColumns: true,
                      height: 465,
                      columns: [{
  	                    width: 100,
  	                    flex: 2,
  	                    sortable: false,
  	                    menuDisabled: true,
  	                    dataIndex: 'Text',
                        text: 'Сообщение',
  	                    tdCls: 'wrap-text'
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
  	                  }]
                }]
            }],
             this.buttons = [{
                 text: 'Выход',
                 scope: this,
                 handler: this.close
             }];

        this.callParent(arguments);

    }
});

