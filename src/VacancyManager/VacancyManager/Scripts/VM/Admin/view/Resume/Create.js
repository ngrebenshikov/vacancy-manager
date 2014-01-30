Ext.define('VM.view.Resume.Create',
{
    extend: 'Ext.window.Window',
    alias: 'widget.resumeCreate',

  
    title: 'Создание резюме',
    border: false,
    layout: 'fit',
    height: 350,
    width: 350,
    autoShow: true,
    modal: true,
    padding: '10 5 5 5',


    initComponent: function () {
        this.items = [{
            xtype: 'form',
            store: 'ApplicantResumeGrid',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textareafield',
                fieldLabel: 'Должность',
                name: 'Position',
                flex: 1
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Кратко',
                name: 'Summary',
                flex: 1
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Обучение',
                name: 'Training',
                flex: 1
            }, {
                xtype: 'datefield',
                anchor: '100%',
                name: 'Date',
                fieldLabel: 'Выберите дату',
            }]
        }],
        
        this.buttons =
        [{
            text: 'Сохранить',
            icon: '/ExtLib/resources/icons/accept.gif',
            action: 'SaveResume',
        }],
      
        this.callParent(arguments);
    }
});