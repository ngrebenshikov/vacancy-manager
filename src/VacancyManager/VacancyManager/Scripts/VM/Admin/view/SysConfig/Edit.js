Ext.define('VM.view.SysConfig.Edit',
{
    extend: 'Ext.window.Window',
    alias: 'widget.SysConfigEdit',
    requires: ['Ext.form.Panel'],

    title: 'Изменить параметр',
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
            fieldLabel: 'Имя',
            allowBlank: false,
            vtype: 'alphanum'
        }, {
            xtype: 'textfield',
            id: 'SysConfigValue',
            name: 'Value',
            fieldLabel: 'Значение',
            allowBlank: false,
            vtype: 'alphanum'
        }],

        buttons: //Кнопки окна
        [{
            text: 'Сохранить',
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

