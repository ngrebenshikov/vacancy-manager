Ext.define('VM.Shared.WizardPanel', {
    extend: 'Ext.form.Panel',
    title: 'Мастер заполнения резюме',
    id: 'wizard',
    requires: ['VM.Shared.FirstStep',
               'VM.Shared.SecondStep',
               'VM.Shared.ThirdStep',
               'VM.Shared.FouthStep',
               'VM.Shared.LastStep'],
    alias: 'widget.WizardPanel',
    region: 'center',
    layout: 'card',
    defaults: {
        border: false,
        bodyPadding: 20
    },
    items: [
            {
                itemId: 'step-1',
                xtype: 'FirstStep'
            }, {
                itemId: 'step-2',
                xtype: 'SecondStep'
            }, {
                itemId: 'step-3',
                xtype: 'ThirdStep'
            }, {
                itemId: 'step-4',
                xtype: 'FouthStep'
            }, {
                itemId: 'step-5',
                xtype: 'LastStep'
            }

        ]
});