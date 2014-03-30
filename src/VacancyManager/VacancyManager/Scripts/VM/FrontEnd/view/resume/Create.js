
Ext.define('VM.view.resume.Create', {
    extend: 'Ext.window.Window',
    alias: 'widget.resumeCreate',
    requires: ['VM.Shared.WizardPanel',
               'VM.Shared.WizardMenu'],
    border: false,
    title: 'Новое резюме',
    layout: 'border',
    height: 450,
    width: 700,
    autoShow: true,
    modal: true,
    closable: false,
    buttonAlign: 'center',
    initComponent: function () {
        this.items = [
           { xtype: 'WizardMenu',
               width: 185
           },
           { xtype: 'WizardPanel' }
        ],

        this.buttons = [{
            text: 'Выход',
            scope: this,
            handler: function (button) {
                this.close();
            }
        }],

        this.callParent(arguments);
    }
});