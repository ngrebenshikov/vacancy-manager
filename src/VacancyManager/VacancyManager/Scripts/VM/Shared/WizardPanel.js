Ext.define('VM.Shared.WizardPanel', {
    extend: 'Ext.form.Panel',
  //  title: 'Мастер заполнения резюме',
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
    defaults: {
        border: false,
        bodyPadding: 10
    },
    items: [{
        itemId: 'step-1',
        xtype: 'FirstStep',
        bbar: ['->', {
            text: 'Далее',
            margin: 5,
            width: 80,
            action: 'FinishFirstStep'
        }]
    }, {
        itemId: 'step-2',
        xtype: 'SecondStep',
        bbar: [{
            text: 'Назад',
            margin: 5,
            width: 80,
            action: 'GoToFirstStep'
        }, '->', {
            text: 'Далее',
            margin: 5,
            width: 80,
            action: 'FinishSecondStep'
        }]
    }, {
        itemId: 'step-3',
        xtype: 'ThirdStep',
        bbar: [{
            text: 'Назад',
            margin: 5,
            width: 80,
            action: 'GoToSecondStep'
        }, '->', {
            text: 'Далее',
            margin: 5,
            width: 80,
            action: 'FinishThirdStep'
        }]
    }, {
        itemId: 'step-4',
        xtype: 'FouthStep',
        bbar: [{
            text: 'Назад',
            margin: 5,
            width: 80,
            action: 'GoToThirdStep'
        }, '->', {
            text: 'Далее',
            margin: 5,
            width: 80,
            action: 'FinishFouthStep'
        }]
    }, {
        itemId: 'step-5',
        xtype: 'LastStep',
        bbar: [{
            text: 'Назад',
            margin: 5,
            width: 80,
            action: 'GoToFouthStep'
        }, '->', {
            text: 'Завершить',
            margin: 5,
            width: 80,
            action: 'FinishStep'
        }]
    }]
 });