

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

        var states = Ext.create('Ext.data.Store', {
            fields: ['LanquageID', 'Lanquage', 'LanquageFlag'],
            data: [
               { LanquageID: 1, Lanquage: 'Русский' },
               { LanquageID: 2, Lanquage: 'English' }
           ]
        });

        this.items = [{
            xtype: 'form',
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'combobox',
                    name: 'LanquageID',
                    editable: false,
                    fieldLabel: 'Язык заполнения резюме',
                    flex: 1,
                    labelWidth: 170,
                    displayField: 'Lanquage',
                    queryMode: 'local',
                    store: states,
                    value: states.getAt(0),
                    valueField: 'LanquageID'
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Должность',
                    allowBlank: false,
                    name: 'Position',
                    width: 150,
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