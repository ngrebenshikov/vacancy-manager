
Ext.define('VM.view.resume.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.resumeEdit',
    requires: ['VM.Shared.FirstStep',
               'VM.Shared.SecondStep',
               'VM.Shared.ThirdStep',
               'VM.Shared.FouthStep',
               'VM.Shared.LastStep'],
    title: 'Редактирование резюме',
    height: 450,
    width: 700,
    autoShow: true,
    modal: true,
    padding: '10 5 5 5',
    buttonAlign: 'center',
    autoScroll: true,
    layout: {
        type: 'anchor'
    },
    defaults: {
        border: false,
        bodyPadding: 20
    },

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                height: 1450,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                 {
                     itemId: 'step-1',
                     xtype: 'FirstStep',
                     margin: 5
                 }, {
                     itemId: 'step-2',
                     xtype: 'SecondStep',
                     margin: 10
                 }, {
                     itemId: 'step-3',
                     xtype: 'ThirdStep',
                     margin: 10
                 }, {
                     itemId: 'step-4',
                     xtype: 'FouthStep',
                     margin: 10
                 }, {
                     itemId: 'step-5',
                     xtype: 'LastStep',
                     margin: 5
                 }]
            }],
       this.buttons = [{
           text: 'Сохранить',
           action: 'FinishStep'
       }, {
           text: 'Отмена',
           scope: this,
           handler: this.close
       }],
        this.callParent(arguments);
    }
});