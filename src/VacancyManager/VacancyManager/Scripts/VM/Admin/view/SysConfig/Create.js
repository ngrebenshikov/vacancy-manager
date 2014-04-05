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
    buttonAlign: 'center',
    modal: true,
    height: 150,
    width: 380,
    items: //Элементы окна
    [{
        xtype: 'sysConfigForm'
    }],

    buttons: [{
        text: Strings.btnAdd,
        action: 'CreateConf'
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

