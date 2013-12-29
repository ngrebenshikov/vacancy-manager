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
                id: 'CommentsInfoForm',
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
                     xtype: 'htmleditor',
                     enableAlignments: true,
                     enableColors: true,
                     enableFont: true,
                     enableFontSize: true,
                     enableFormat: true,
                     enableLinks: true,
                     enableLists: true,
                     enableSourceEdit: true,
                     fieldLabel: 'Комментарий',
                     flex: 1,
                     id: 'consCommentBody',
                     name: 'Body',
                     allowBlank: true
                 }]
                }
           ]
            },
             this.buttons = [{
                 text: 'Сохранить',
                 action: 'addConsComment'
             }, {
                 text: 'Отмена',
                 scope: this,
                 handler: this.close
             }]
        ];
        this.callParent(arguments);
    }
});