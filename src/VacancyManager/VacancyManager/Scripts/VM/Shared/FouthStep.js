Ext.define('VM.Shared.FouthStep', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.FouthStep',
    requires: ['VM.Shared.EduList',
               'VM.Shared.ManageEducation'],
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
               { xtype: 'EduList' }
            ],
            buttons: [{
                text: 'Prev',
                margin: 5,
                action: 'GoToThirdStep'
            }, {
                text: 'Next',
                margin: 5,
                action: 'FinishFouthStep'
            }
            ]
        }],

        this.callParent(arguments);
    }
});