
Ext.define('VM.view.consideration.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.considerationAdd',
    title: Strings.AddApplicant,
    height: 430,
    width: 575,
    autoShow: true,
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
            style: 'background-color: #fff;',
            items:
            [
             { xtype: 'considerationapllicantsList',
                 viewconfig: {
                     width: 550
                 }
             }
            ]
        }
      ];
        this.buttons = [   
             {
                 text: 'Сохранить',
                 action: 'AddConsideration'
             }, {
                 text: 'Отмена',
                 scope: this,
                 handler: this.close
             }
      ];

        this.callParent(arguments);
    }
});