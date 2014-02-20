Ext.define('VM.Shared.LastStep', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.LastStep',
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
                align: 'stretch',
                type: 'vbox'
            },
            items: [{
                xtype: 'fieldcontainer',
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                 { xtype: 'textareafield',
                     fieldLabel: 'Сертификаты и тренинги',
                     allowBlank: true,
                     flex: 1,
                     name: 'Training'
                 }, {
                     xtype: 'component',
                     html: '<div data-qtip="' + Strings.QT_Training + '" class="qtip-target">?</div>'
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
                      fieldLabel: 'Дополнительная информация',
                      allowBlank: true,
                      flex: 1,
                      name: 'AdditionalInformation'
                  }, {
                      xtype: 'component',
                      html: '<div data-qtip="Дополнительная информация <br> Additional Information" class="qtip-target">?</div>'
                  }]

            }]
        }],

        this.callParent(arguments);
    }
});