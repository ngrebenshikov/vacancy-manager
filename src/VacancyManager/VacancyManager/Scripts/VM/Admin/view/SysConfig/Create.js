Ext.define('VM.view.SysConfig.Create',
{
    extend: 'Ext.window.Window',
    alias: 'widget.SysConfigCreate',
    requires: ['Ext.form.Panel'],

    title: 'Новый параметр',
    layout: 'fit',
    autoShow: true,
    modal: true,
    height: 150,
    width: 280,

    initComponent: function () 
    {
        this.items =
        [{
            xtype: 'form',
            padding: '5 5 5 5',
            border: false,
            style: 'background-color: #fff;',
            items:
            [{
                xtype: 'textfield',
                id: 'SysConfigName',
                name: 'Name',
                fieldLabel: 'Имя',
                allowBlank: false
            },{
                xtype: 'textfield',
                id: 'SysConfigValue',
                name: 'Value',
                fieldLabel: 'Значение',
                allowBlank: false
            }]
        }];

        this.buttons =
        [{
            text: 'Добавить',
            action: 'CreateConf'
        },{
            text: 'Отмена',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});

