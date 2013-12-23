Ext.define('VM.view.Comments.Manage', {
    extend: 'Ext.window.Window',
    alias: 'widget.commentsManage',
    title: 'Комментарии',
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
                    xtype: 'commentsList'
                },
                {
                    xtype: 'panel',
                    width: 550,
                    padding: '5 5 5 5',
                    border: false,
                    layout: 'hbox',
                    style: 'background-color: #fff;',
                    items: [{
                        xtype: 'textareafield',
                        fieldLabel: 'Комментарий',
                        width: 350,
                        id: 'txtareaConsiderationComment',
                        name: 'ConsiderationComment',
                        allowBlank: true
                    }, {
                        xtype: 'panel',
                        width: 150,
                        border: false,
                        items: [
                          {
                              xtype: 'button',
                              text: 'Добавить комментарий',
                              margin: '5',
                              action: 'addComment' 
                          },
                          {
                              xtype: 'button',
                              text: 'Очистить',
                              action: 'clearCommentArea',
                              margin: '5'
                          }]
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