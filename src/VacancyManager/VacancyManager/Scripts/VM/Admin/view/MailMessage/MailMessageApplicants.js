
Ext.define('VM.view.MailMessage.MailMessageApplicants', {
    extend: 'Ext.window.Window',
    alias: 'widget.MailMessageApplicants',
    title: 'Выберите соискателей',
    height: 430,
    width: 575,
    modal: true,
    buttonAlign: 'center',
    initComponent: function () {
        this.items =
      [
        {
            xtype: 'form',
            padding: '5 5 5 5',
            border: false,
            style: 'background-color: #fff;',
            items:
            [
             { xtype: 'searchApplicantGrid',
                 viewconfig: {
                     width: 550
                 }
             }
            ]
        }
       ];
        this.buttons = [
             {
                 text: 'Выбрать',
                 action: 'selectMailMessageApps'
             }, {
                 text: 'Отмена',
                 scope: this,
                 handler: this.close
             }
      ];

        this.callParent(arguments);
    }
});