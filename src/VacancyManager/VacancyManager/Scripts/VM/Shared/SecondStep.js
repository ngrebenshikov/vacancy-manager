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

        this.items = [
              ReqsList          
        ],

        this.callParent(arguments);
    }
});