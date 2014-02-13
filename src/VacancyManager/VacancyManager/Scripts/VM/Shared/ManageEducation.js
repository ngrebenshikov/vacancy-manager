
Ext.define('VM.Shared.ManageEducation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ManageEducation',
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
            id: 'frmResumeEducation',
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
                        fieldLabel: 'Место учебы',
                        allowBlank: false,
                    }, {
                        xtype: 'component',
                        html: '<div data-qtip="' + Strings.QT_EduPlace + '" class="qtip-target">?</div>'
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
                          fieldLabel: 'Факультет'
                      }, {
                          xtype: 'component',
                          html: '<div data-qtip="' + Strings.QT_Department + '" class="qtip-target">?</div>'
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
                           flex: 1,
                           fieldLabel: 'Кафедра'
                       }, {
                           xtype: 'component',
                           html: '<div data-qtip="' + Strings.QT_Cafedra + '" class="qtip-target">?</div>'
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
                        fieldLabel: 'Специальность',
                        flex: 1
                    }, {
                        xtype: 'component',
                        html: '<div data-qtip="' + Strings.QT_Status + '" class="qtip-target">?</div>'
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
                           fieldLabel: 'Дата поступления',
                           altFormats: '|d.m.Y'
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
                           fieldLabel: 'Дата окончания',
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