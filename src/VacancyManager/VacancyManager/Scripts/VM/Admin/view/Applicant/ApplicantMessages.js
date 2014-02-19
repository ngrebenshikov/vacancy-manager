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
                    xtype: 'ApplicantMessagesList',
                    region: 'center'
                }]
            }],
             this.buttons = [{
                 text: 'Выход',
                 scope: this,
                 handler: function () {
                     this.close();
                     fromCons = false;
                 }
             }];

        this.callParent(arguments);

    }
});

