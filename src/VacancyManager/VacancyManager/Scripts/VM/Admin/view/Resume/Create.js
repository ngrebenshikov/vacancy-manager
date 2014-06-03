
Ext.define('VM.view.Resume.Create', {
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
    bodyStyle: 'background-color: #fff;',
    buttonAlign: 'center',
    initComponent: function () {
        this.items = [{
            xtype: 'WizardMenu',
            style: 'background-color: #fff;',
            width: 200
        }, { xtype: 'WizardPanel',
            bodyStyle: 'background-color: #fff;'
        }],

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