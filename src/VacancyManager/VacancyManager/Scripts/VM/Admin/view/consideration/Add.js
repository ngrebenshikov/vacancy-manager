
Ext.define('VM.view.consideration.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.considerationAdd',
    title: Strings.AddApplicant,
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