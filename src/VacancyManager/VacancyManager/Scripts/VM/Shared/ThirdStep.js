Ext.define('VM.ThirdStep', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ThirdStep',
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
                type: 'fit'
            },
            items: [
               { xtype: 'ExpList' }
            ],
            buttons: [{
                text: 'Prev',
                margin: 5,
                action: 'GoToSecondStep'
            }, {
                text: 'Next',
                margin: 5,
                action: 'FinishThirdStep'
            }
            ]
        }],

        this.callParent(arguments);
    }
});