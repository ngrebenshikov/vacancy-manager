Ext.define('VM.LastStep', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.LastStep',
    border: false,
    height: 250,
    autoScroll: true,
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
                name: 'Training'
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
            }, '->', {
                text: 'Finish',
                margin: 5,
                action: 'FinishStep'
            }, {
                text: 'Print',
                margin: 5,
                action: 'ResumePdfCopy',
                icon: '/Content/icons/pdfico.png',
                tooltip: 'Создать pdf'
            }

            ]
        }],

        this.callParent(arguments);
    }
});