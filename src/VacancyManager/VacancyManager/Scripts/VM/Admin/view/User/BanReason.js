Ext.define('VM.view.User.BanReason', {
    extend: 'Ext.window.Window',
    alias: 'widget.BanReason',
    requires: ['Ext.form.Panel'],
    title: 'Забанить/Разбанить',
    layout: 'fit',
    autoShow: true,
    buttonAlign: 'center',
    height: 200,
    width: 400,
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            padding: '5 5 0 5',
            layout: 'fit',
            border: false,
            style: 'background-color: #fff;',
            items: [{
                xtype: 'textarea',
                id: 'lastLockedOutReason',
                name: 'LastLockedOutReason',
                fieldLabel: 'Причина блокировки',
                allowBlank: false
            }]
        }];

        this.buttons = [{
            text: 'Забанить',
            action: 'BanUser'
        }, {
            text: 'Отмена',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});

