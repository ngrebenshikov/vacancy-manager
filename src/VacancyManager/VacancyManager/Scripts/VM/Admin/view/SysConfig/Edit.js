Ext.define('VM.view.SysConfig.Edit',
{
    extend: 'Ext.window.Window',
    alias: 'widget.SysConfigEdit',
    requires:
    [
        'VM.view.SysConfig.Form'
    ],

    title: Strings.ConfEdit,
    layout: 'fit',
    buttonAlign: 'center',
    autoShow: true,
    modal: true,
    height: 150,
    width: 380,
    items: //Элементы окна
    [{
        xtype: 'sysConfigForm'
    }],

    buttons: [{
        text: Strings.btnSave,
        action: 'Update'
    }, {
        text: 'Отмена',
        handler: function (button) {
            button.up('window').close();
        }
    }],

    initComponent: function () {
        this.callParent(arguments);
    }
});
