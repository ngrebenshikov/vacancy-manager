Ext.define('VM.view.Resume.CreateExperience',
{
    extend: 'Ext.window.Window',
    alias: 'widget.createExperience',

    title: 'Опыт',
    border: false,
    layout: 'fit',
    height: 400,
    width: 400,
    autoShow: true,
    modal: true,
    padding: '10 5 5 5',


    initComponent: function () {
        this.items = [{
            xtype: 'form',
            store: 'ResumeExperience',
            id: 'ResumeExp',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                name: 'Job',
                fieldLabel: 'Работа',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'Project',
                fieldLabel: 'Проект',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'Position',
                fieldLabel: 'Должность',
                flex: 1
            }, {
                xtype: 'checkbox',
                boxLabel: 'Обучение?',
                checked: 'false',
                flex: 1
            }, {
                xtype: 'textareafield',
                name: 'Duties',
                fieldLabel: 'Обязанности',
                flex: 1
            }, {
                xtype: 'datefield',
                name: 'StartDate',
                fieldLabel: 'Дата открытия',
                format: 'd.m.y',
                flex: 1
            }, {
                xtype: 'datefield',
                name: 'FinishDate',
                fieldLabel: 'Дата окончания',
                format: 'd.m.y',
                flex: 1
            }

            ]

        }]

        this.buttons = [{
            text: 'Cохранить',
            icon: '/ExtLib/resources/icons/accept.gif',
            action: 'SaveExperience'
        }],

        this.callParent(arguments);
    }
    
 })