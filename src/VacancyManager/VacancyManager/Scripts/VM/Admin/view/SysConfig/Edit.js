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
    autoShow: true,
    modal: true,
    height: 150,
    width: 280,
    items: //Элементы окна
    [{
        xtype: 'sysConfigForm'
    }],

    buttons: //Кнопки окна
    [{
        text: Strings.btnSave,
        action: 'Update'
    }],

    initComponent: function () {
        this.callParent(arguments);
    }
});
