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
    margins: '5 5 5 5',
    frame: true,
    defaults: {
        border: false,
        bodyPadding: 10
    },
    items: [
            {
                itemId: 'step-1',
                xtype: 'FirstStep',
                buttons: [{
                    text: 'Next',
                    margin: 5,
                    action: 'FinishFirstStep'
                }]
            }, {
                itemId: 'step-2',
                xtype: 'SecondStep',
                buttons: [{
                    text: 'Prev',
                    margin: 5,
                    action: 'GoToFirstStep'
                }, {
                    text: 'Next',
                    margin: 5,
                    action: 'FinishSecondStep'
                }]
            }, {
                itemId: 'step-3',
                xtype: 'ThirdStep',
                buttons: [{
                    text: 'Prev',
                    margin: 5,
                    action: 'GoToSecondStep'
                }, {
                    text: 'Next',
                    margin: 5,
                    action: 'FinishThirdStep'
                }]
            }, {
                itemId: 'step-4',
                xtype: 'FouthStep',
                buttons: [{
                    text: 'Prev',
                    margin: 5,
                    action: 'GoToThirdStep'
                }, {
                    text: 'Next',
                    margin: 5,
                    action: 'FinishFouthStep'
                }]
            }, {
                itemId: 'step-5',
                xtype: 'LastStep',
                buttons: [{
                    text: 'Prev',
                    margin: 5,
                    action: 'GoToFouthStep'
                }, '->', {
                    text: 'Finish',
                    margin: 5,
                    action: 'FinishStep'
                }]
            }

        ]



});