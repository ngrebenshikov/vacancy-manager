Ext.define('VM.view.SysConfig.Create',
{
    extend: 'Ext.window.Window',
    alias: 'widget.SysConfigCreate',
    requires:
    [
        'VM.view.SysConfig.Form'
    ],

    title: Strings.ConfNew,
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
        text: Strings.btnAdd,
        action: 'CreateConf'
    }],

    initComponent: function () {
        this.callParent(arguments);
    }
});

