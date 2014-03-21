

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
                    name: 'Position',
                    flex: 1,
                    blankText: Strings.RequiredMessage
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
                    name: 'Summary',
                    blankText: Strings.RequiredMessage
                }, { 
                    xtype: 'component',
                    html: '<div data-qtip="' + Strings.QT_Summary + '" class="qtip-target">?</div>'
                }]
            }]
        }],

        this.callParent(arguments);
    }
});