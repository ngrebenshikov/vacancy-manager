Ext.define('VM.view.Comments.Manage', {
    extend: 'Ext.window.Window',
    alias: 'widget.commentsManage',
    title: 'Комментарии',
    height: 450,
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
                items: [{
                         xtype: 'commentsList'
                }]
            },
             this.buttons = [{
                 text: 'Выход',
                 scope: this,
                 handler: this.close
             }]
        ];
        this.callParent(arguments);
    }
});