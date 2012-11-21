Ext.define('VM.view.SysConfig.Edit',
{
    extend: 'Ext.window.Window',
    alias: 'widget.SysConfigEdit',
    requires: ['Ext.form.Panel'],

    title: Strings.ConfEdit,
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
            text: Strings.btnSave,
            action: 'Update'
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

