Ext.define('VM.SecondStep', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.SecondStep',
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
               { xtype: 'ReqsList',
                 store: 'ResumeRequirement'
               }
            ],
            buttons: [{
                text: 'Prev',
                margin: 5,
                action: 'GoToFirstStep'
             }, {
                text: 'Next',
                margin: 5,
                action: 'FinishSecondStep'
             }
            ]
        }],

        this.callParent(arguments);
    }
});