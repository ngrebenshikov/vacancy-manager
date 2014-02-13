

Ext.define('VM.Shared.FirstStep', {
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
                type: 'vbox',
                align: 'stretch'
            },
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Должность',
                    allowBlank: false,
                    flex: 1,
                    name: 'Position'
                }, {
                    xtype: 'component',
                    html: '<div data-qtip="' + Strings.QT_Position + '" class="qtip-target">?</div>'
                }]
            }, {
                xtype: 'fieldcontainer',
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Кратко',
                    allowBlank: false,
                    flex: 1,
                    name: 'Summary'
                }, { xtype: 'component',
                    html: '<div data-qtip="' + Strings.QT_Summary + '" class="qtip-target">?</div>'
                }]
            }],
            buttons: [{
                text: 'Next',
                margin: 5,
                action: 'FinishFirstStep'
            }]
        }],

        this.callParent(arguments);
    }
});