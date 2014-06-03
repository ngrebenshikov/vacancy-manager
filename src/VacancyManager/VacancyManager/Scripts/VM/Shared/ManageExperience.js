Ext.define('VM.Shared.ManageExperience', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ManageExperience',
    defaults: {
        border: false,
        bodyPadding: 5
    },
    layout: {
        type: 'fit'
    },
    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            padding: '5 5 5 5',
            style: 'background-color: #fff;',
            id: 'frmResumeExperience',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'Job',
                        flex: 1,
                        fieldLabel: 'Место работы',
                        allowBlank: false,
                        blankText: Strings.RequiredMessage
                    }, {
                        xtype: 'component',
                        html: '<div data-qtip="' + Strings.QT_Job + '" class="qtip-target">?</div>'
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
                          name: 'Project',
                          flex: 1,
                          allowBlank: false,
                          fieldLabel: 'Проект',
                          blankText: Strings.RequiredMessage
                      }, {
                          xtype: 'component',
                          html: '<div data-qtip="' + Strings.QT_Project + '" class="qtip-target">?</div>'
                      }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                       {
                           xtype: 'textfield',
                           name: 'Position',
                           allowBlank: false,
                           flex: 1,
                           fieldLabel: 'Должность',
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
                        name: 'Duties',
                        fieldLabel: 'Обязанности',
                        allowBlank: false,
                        flex: 1,
                        blankText: Strings.RequiredMessage
                    }, {
                        xtype: 'component',
                        html: '<div data-qtip="' + Strings.QT_Duties + '" class="qtip-target">?</div>'
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                       {
                           xtype: 'datefield',
                           name: 'StartDate',
                           format: 'd.m.Y',
                           flex: 1,
                           allowBlank: false,
                           fieldLabel: 'Трудоустроен',
                           altFormats: '|d.m.Y',
                           blankText: Strings.RequiredMessage
                       }, {
                           xtype: 'component',
                           html: '<div data-qtip="' + Strings.QT_BeginExp + '" class="qtip-target">?</div>'
                       }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                       {
                           xtype: 'datefield',
                           name: 'FinishDate',
                           allowBlank: true,
                           fieldLabel: 'Уволен',
                           format: 'd.m.Y',
                           flex: 1,
                           altFormats: '|d.m.Y'
                       }, {
                           xtype: 'component',
                           html: '<div data-qtip="' + Strings.QT_EndExp + '" class="qtip-target">?</div>'
                       }]
                }]
        }],

        this.callParent(arguments);
    }
});