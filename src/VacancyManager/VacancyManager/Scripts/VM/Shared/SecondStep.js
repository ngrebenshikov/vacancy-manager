Ext.define('VM.Shared.SecondStep', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.SecondStep',
    requires: ['VM.Shared.ReqsList',
               'VM.store.ResumeRequirement'],
    border: false,
    height: 250,
    width: 350,
    layout: {
        type: 'fit'
    },
    initComponent: function () {

        var ReqsList = Ext.create('VM.Shared.ReqsList', {
            store: 'ResumeRequirement',
            id: 'resReqs'
        });

        this.items = [{
            xtype: 'form',
            border: false,
            layout: {
                type: 'fit'
            },
            items: [
              ReqsList
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