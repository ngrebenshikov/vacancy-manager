Ext.define('ManageEducation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ManageEducation',
    border: false,
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
            items: [{
                xtype: 'textfield',
                name: 'Job',
                fieldLabel: 'Место учебы'
            }, {
                xtype: 'textfield',
                name: 'Project',
                fieldLabel: 'Учебное заведение'
            }, {
                xtype: 'textfield',
                name: 'Position',
                fieldLabel: 'Кафедра'
            }, {
                xtype: 'textareafield',
                name: 'Duties',
                fieldLabel: 'Специальность',
                flex: 1
            }, {
                xtype: 'datefield',
                name: 'StartDate',
                fieldLabel: 'Дата начала',
                format: 'd.m.Y',
                altFormats: '|d.m.Y'
            }, {
                xtype: 'datefield',
                name: 'FinishDate',
                fieldLabel: 'Дата окончания',
                format: 'd.m.Y',
                altFormats: '|d.m.Y'
            }
           ]
        },

       ],

        this.callParent(arguments);
    }
});


Ext.define('ManageExperience', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ManageExperience',
    border: false,
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
            items: [{
                xtype: 'textfield',
                name: 'Job',
                fieldLabel: 'Место работы'
            }, {
                xtype: 'textfield',
                name: 'Project',
                fieldLabel: 'Проект'
            }, {
                xtype: 'textfield',
                name: 'Position',
                fieldLabel: 'Должность'
            }, {
                xtype: 'textareafield',
                name: 'Duties',
                fieldLabel: 'Обязанности',
                flex: 1
            }, {
                xtype: 'datefield',
                name: 'StartDate',
                fieldLabel: 'Дата открытия',
                format: 'd.m.Y',
                altFormats: '|d.m.Y'
            }, {
                xtype: 'datefield',
                name: 'FinishDate',
                fieldLabel: 'Дата окончания',
                format: 'd.m.Y',
                altFormats: '|d.m.Y'
            }
           ]     
          },
        
       ],

        this.callParent(arguments);
    }
});