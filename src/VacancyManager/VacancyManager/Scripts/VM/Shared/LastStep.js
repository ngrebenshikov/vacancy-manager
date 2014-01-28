Ext.define('VM.LastStep', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.LastStep',
    border: false,
    height: 250,
    width: 350,
    layout: {
        type: 'fit'
    },
    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            layout: {
                align: 'stretch',

                type: 'vbox'
            },
            items: [
            {   xtype: 'textareafield',
                fieldLabel: 'Сертификаты и тренинги',
                allowBlank: true,
                flex: 1,
                name: 'traning'
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Дополнительная информация',
                allowBlank: true,
                flex: 1,
                name: 'AdditionalInformation'
            }],

            buttons: [{
                text: 'Prev',
                margin: 5,
                action: 'GoToFouthStep'
            }, {
                text: 'Finish',
                margin: 5,
                action: 'FinishStep'
            }
            ]
        }],

        this.callParent(arguments);
    }
});