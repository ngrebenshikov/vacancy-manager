Ext.define('VM.FirstStep', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.FirstStep',
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
                type: 'anchor'
            },
            items: [
            {   xtype: 'textfield',
                fieldLabel: 'Должность',
                allowBlank: true,
                anchor: '100%',
                flex: 1,
                name: 'Position'
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Кратко',
                allowBlank: true,
                anchor: '100% 95%',
                flex: 1,
                name: 'Summary'
            }],
            buttons: [{
                text: 'Next',
                margin: 5,
                action: 'FinishFirtStep'
            }]
        }],

        this.callParent(arguments);
    }
});