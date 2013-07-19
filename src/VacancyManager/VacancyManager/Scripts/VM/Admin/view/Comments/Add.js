Ext.define('VM.view.Comments.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.commentsAdd',
    title: 'Добавление комментария',
    height: 250,
    width: 450,
    autoShow: true,
    maximizable: false,
    collapsible: false,
    modal: true,
    buttonAlign: 'center',
    layout: 'fit',
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 5 5',
                border: false,
                style: 'background-color: #fff;',
                layout: 'border',
                items: [{
                    xtype: 'panel',
                    region: 'center',
                    width: 350,
                    border: false,
                    padding: '5 5 5 5',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    style: 'background-color: #fff;',
                    items: [
                 {
                     xtype: 'textareafield',
                     fieldLabel: 'Описание',
                     flex: 1,
                     id: 'txtareacommentBody',
                     name: 'Body',
                     allowBlank: false
                 }]
                }
           ]
            },
             this.buttons = [{
                 text: 'Сохранить',
                 action: 'addComment'
             }, {
                 text: 'Отмена',
                 scope: this,
                 handler: this.close
             }]
        ];
        this.callParent(arguments);
    }
});