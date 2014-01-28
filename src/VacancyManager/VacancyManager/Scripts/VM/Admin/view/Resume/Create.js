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
            xtype: 'tabpanel',
            
            items: [{
                title: 'Общее',
                xtype: 'form',
                store: 'ApplicantResumeGrid',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items:[{
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
                },]
            },{
                title: 'Опыт',
                xtype: 'panel',
                
                items: [{
                    xtype: 'grid',
                    store: 'ResumeExperience',
                    id: 'ResumeExp',
                    columns:
                    [{
                        header: 'Работа',
                        dataIndex: 'Job',
                        sortable: false,
                        menuDisabled: true,
                        flex: 1
                    },
                    {
                        header: 'Должность',
                        dataIndex: 'Position',
                        sortable: false,
                        menuDisabled: true,
                        flex: 1
                    },
                    {
                        header: 'Проект',
                        dataIndex: 'Project',
                        sortable: false,
                        menuDisabled: true,
                        flex: 1
                    }],
                    tbar: [{
                        text: Strings.btnAdd,
                        icon: '/Content/icons/add.gif',
                        name: 'btncreate',
                        action: 'CreateExperience'
                    }, {
                        text: Strings.btnRemove,
                        icon: '/Content/icons/delete.gif',
                        name: 'btnrem',
                        action: 'RemoveExperience',
                        disabled: true
                    }],
                    listeners: {
                        selectionchange: function (view, selections, options) {
                            var button = Ext.getCmp('RemoveExperience');
                            if (selections != null)
                                button.enable();
                        }
                    }

                }]
            }]
            
        }]
        
        this.buttons =
        [{
            text: 'Сохранить',
            icon: '/ExtLib/resources/icons/accept.gif',
            action: 'SaveResume',
        }],
      
        this.callParent(arguments);
    }
});