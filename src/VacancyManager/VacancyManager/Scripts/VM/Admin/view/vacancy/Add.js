
Ext.define('VM.view.vacancy.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.vacancyAdd',
    title: 'Редактирование вакансии',
    height: 450,
    width: 430,
    autoShow: true,
    modal: true,
    layout: 'fit',
    buttonAlign: 'center',
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                padding: '15 15 5 5',
                border: false,
                style: 'background-color: #fff;',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
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
                    flex: 1,
                    id: 'txtareaDescription',
                    name: 'Description',
                    margins: '0',
                    allowBlank: false
                }, {
                    xtype: 'datefield',
                    id: 'dtOpeningDate',
                    fieldLabel: 'Дата открытия',
                    name: 'OpeningDate',
                    allowBlank: false,
                    format: 'd F Y'
                }, {
                    xtype: 'textfield',
                    id: 'txtForeignLanguage',
                    name: 'ForeignLanguage',
                    fieldLabel: 'Иностранные языки',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    id: 'txtRequirments',
                    name: 'Requirments',
                    fieldLabel: 'Требования',
                    allowBlank: false
                }, {
                    xtype: 'checkboxfield',
                    id: 'bIsVisible',
                    name: 'IsVisible',
                    inputValue: 'true',
                    uncheckedValue: 'false',
                    fieldLabel: 'Актуально',
                    allowBlank: false
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