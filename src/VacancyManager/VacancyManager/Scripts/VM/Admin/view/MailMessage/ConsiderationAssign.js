Ext.define('VM.view.MailMessage.ConsiderationAssign', {
    extend: 'Ext.window.Window',
    alias: 'widget.considerationAssign',
    title: 'Выберите вакансию',
    height: 330,
    width: 300,
    modal: true,
    layout: 'fit',
    buttonAlign: 'center',
    initComponent: function () {
        this.items =
      [
        {
            xtype: 'form',
            padding: '5 5 5 5',
            border: false,
            layout: 'fit',
            style: 'background-color: #fff;',
            items:
            [
             { xtype: 'ConsiderationAssignList',
               viewconfig: {
                     width: 275
                 }
             }
            ]
        }
       ];
        this.buttons = [
             {
                 text: 'Выбрать',
                 action: 'assignToConsideration'
             }, {
                 text: 'Отмена',
                 scope: this,
                 handler: this.close
             }
      ];

        this.callParent(arguments);
    }
});