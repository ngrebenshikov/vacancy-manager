var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2
});

Ext.define('VM.view.Applicant.Create',
{
    extend: 'Ext.window.Window',
    alias: 'widget.ApplicantCreate',
    requires: ['Ext.panel.*', 'Ext.grid.*'],

    title: 'Новый соискатель',
    layout: 'fit',
    autoShow: true,
    autoHeight: true,
    modal: true,
    resizable: false,
    width: 500,
    height: 450,
    items: //Элементы окна
    [{
        xtype: 'form',
        id: 'applicantCreateForm',
        padding: '3',
        border: true,
        autoHeight: true,
        //style: 'background-color: #fff;',
        defaults: {
            labelWidth: 70,
            padding: '5'
        },
        items: //Элементы формы
        [{
            xtype: 'textfield',
            id: 'ApplicantFullName',
            name: 'FullName',
            fieldLabel: 'ФИО',
            //style: 'width: 300;',
            allowBlank: false
        }, {
            xtype: 'textfield',
            id: 'ApplicantContactPhone',
            name: 'ContactPhone',
            fieldLabel: 'Контактный номер',
            vtype: 'alphanum' //переделать на "только цифры, + и -"
        }, {
            xtype: 'textfield',
            id: 'ApplicantEmail',
            name: 'Email',
            fieldLabel: 'E-mail',
            vtype: 'email'
        }, {
            xtype: 'fieldset',
            id: 'RequirementsFieldSet',
            title: 'Профессиональные навыки',
            collapsible: false,
            autoWidth: true,
            autoHeight: true,
            items: //Элементы fieldset 
            [{
/*** Грид для отображения навыков(Requirement) ***/
                xtype: 'grid', 
                id: 'ApplicantRequirementsGrid',
                autoSizeColumns: true,
                forceFit: true,
                frame: false,
               // split: true,
                plugins: [cellEditing],
                features: [Ext.create('Ext.grid.feature.Grouping', {
                    groupHeaderTpl: '{name}: ({rows.length})'
                })],
                store: 'ApplicantRequirements',
                columns: 
                [{ 
                     xtype: 'checkcolumn',
                     dataIndex: 'IsChecked',
                     width: 20,
                     align: 'center',
                     sortable: false,
                     field: { xtype: 'checkboxfield' },
                     menuDisabled: true
                 }, {
                     dataIndex: 'RequirementName',
                     text: 'Навык',
                     width: 120,
                     sortable: true,
                     field: { xtype: 'textfield' },
                     menuDisabled: true
                 }, {
                     dataIndex: 'CommentText',
                     text: 'Комментарий',
                     width: 120,
                     sortable: false,
                     field: { xtype: 'textfield' },
                     menuDisabled: true
                 }]
/*** Конец - Грид для отображения навыков(Requirement) ***/
            }]
        }],
                
        buttons: //Кнопки окна
        [{
            text: 'Добавить',
            action: 'CreateApplicant'
        }]
    }],
    initComponent: function () {
        this.callParent(arguments);
    }
});