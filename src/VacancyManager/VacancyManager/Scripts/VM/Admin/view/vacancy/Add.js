
Ext.define('VM.view.vacancy.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.vacancyAdd',
    title: 'Редактирование вакансии',
    height: 450,
    width: 650,
    autoShow: true,
    modal: true,
    layout: 'fit',
    buttonAlign: 'center',
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                id: 'VacancyInfoForm',
                padding: '5 5 5 5',
                border: false,
                style: 'background-color: #fff;',
                layout: 'border',
                items: [{
                    xtype: 'panel',
                    region: 'center',
                    width: 350,
                    border: false,
                    padding: '5 5 5 5',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    style: 'background-color: #fff;',
                items: [
                {
                    xtype: 'textfield',
                    id: 'txtTitle',
                    fieldLabel: 'Название',
                    name: 'Title',
                    allowBlank: false
                }, {
                    xtype: 'textareafield',
                    fieldLabel: 'Описание',
                    flex: 2,
                    id: 'txtareaDescription',
                    name: 'Description',
                    margins: '0',
                    allowBlank: false
                }, {
                    xtype: 'datefield',
                    id: 'dtOpeningDate',
                    fieldLabel: 'Дата открытия',
                    name: 'OpeningDate',
                    format: 'd.m.Y',
                    altFormats: '|d.m.Y',
                    allowBlank: false
                }, {
                    xtype: 'checkboxfield',
                    id: 'bIsVisible',
                    name: 'IsVisible',
                    inputValue: 'true',
                    uncheckedValue: 'false',
                    fieldLabel: 'Актуально',
                    allowBlank: false
                }]
                }, { xtype: 'vacancyrequirementsList',
                    region: 'east',
                    width: 300
                }
           ]
            },
             this.buttons = [{
                 text: 'Сохранить',
                 action: 'addVacancy'
             }, {
                 text: 'Отмена',
                 scope: this,
                 handler: this.close
             }]
        ];
        this.callParent(arguments);
    }
});