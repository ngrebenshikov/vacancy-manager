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
                fieldLabel: 'Работа'
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
                format: 'd.m.y'
            }, {
                xtype: 'datefield',
                name: 'FinishDate',
                fieldLabel: 'Дата окончания',
                format: 'd.m.y'
            }
           ]     
          },
        
       ],

        this.callParent(arguments);
    }
});