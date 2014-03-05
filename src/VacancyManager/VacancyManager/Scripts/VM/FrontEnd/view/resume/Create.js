
Ext.define('VM.view.resume.Create', {
    extend: 'Ext.window.Window',
    alias: 'widget.resumeCreate',
    requires: ['VM.Shared.WizardPanel',
               'VM.Shared.WizardMenu'],
    title: 'Создание резюме',
    border: false,
    layout: 'border',
    height: 450,
    width: 700,
    autoShow: true,
    modal: true,
    padding: '10 5 5 5',


    initComponent: function () {
        this.items = [
           { xtype: 'WizardMenu',
             width: 200 },
           { xtype: 'WizardPanel' }
          ],

        this.callParent(arguments);
    }
});