Ext.define('VM.view.SysConfig.Create',
{
    extend: 'Ext.window.Window',
    alias: 'widget.SysConfigCreate',
    requires: ['Ext.form.Panel'],

    title: Strings.ConfNew,
    layout: 'fit',
    autoShow: true,
    modal: true,
    height: 150,
    width: 280,
    items: //Элементы окна
    [{
        xtype: 'form',
        padding: '5 5 5 5',
        border: false,
        style: 'background-color: #fff;',
        items: //Элементы формы
        [{
            xtype: 'textfield',
            id: 'SysConfigName',
            name: 'Name',
            fieldLabel: Strings.ConfName,
            allowBlank: false,
            vtype: 'alphanum'
        }, {
            xtype: 'textfield',
            id: 'SysConfigValue',
            name: 'Value',
            fieldLabel: Strings.Value,
            allowBlank: false
        }],

        buttons: //Кнопки окна
        [{
            text: Strings.btnAdd,
            action: 'CreateConf'
        } 
//        {
//            text: 'Отмена',
//            scope: this,
//            handler: this.close
//        }
        ]
    }],
    initComponent: function () {
        this.callParent(arguments);
    }
});

