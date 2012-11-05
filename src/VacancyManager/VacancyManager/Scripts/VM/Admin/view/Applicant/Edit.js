﻿var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2,
    listeners: {
        beforeedit: function (e, editor) {
            if (e.field == 'RequirementName')
                return false;
        }
    }
});

Ext.define('VM.view.Applicant.Edit',
{
    extend: 'Ext.window.Window',
    alias: 'widget.ApplicantEdit',

    requires: ['Ext.tab.*',
    'Ext.window.*',
    'Ext.tip.*',
    'Ext.layout.container.Border'],

    title: Strings.ApplicantNew,
    height: 450,
    width: 650,
    autoShow: true,
    modal: true,
    layout: 'fit',
    resizable: false,
    items:
    [{
        xtype: 'form',
        id: 'applicantEditForm',
        border: false,
        style: 'background-color: #fff;',
        layout: 'border',
        items:
        [{
            xtype: 'panel', // панель слева
            region: 'west',
            border: false,
            width: 250,
            padding: '5 5 5 5',
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            style: 'background-color: #fff;',
            items:
            [{
                xtype: 'fieldset',  // ФИО
                title: Strings.FullName,
                collapsible: false,
                autoWidth: true,
                autoHeight: true,
                items:
                [{
                    xtype: 'textfield',
                    id: 'ApplicantFullName',
                    name: 'FullName',
                    allowBlank: false,
                    anchor: '100%',
                    invalidText: 'Поле не может быть пустым.'
                }]
            }, {
                xtype: 'fieldset',  // Контактный телефон
                title: Strings.ContactPhone,
                collapsible: false,
                autoWidth: true,
                autoHeight: true,
                items:
                [{
                    xtype: 'textfield',
                    id: 'ApplicantContactPhone',
                    name: 'ContactPhone',
                    anchor: '100%',
                    maxLength: 16,
                    enforceMaxLength: true,
                    regex: /^\+?\d+-?\d+-?\d+-?\d+-?\d+$/,
                    regexText: 'Поле может содержать только цифры и знаки "+" и "-".'
                }]
            }, {
                xtype: 'fieldset',  // E-mail
                title: Strings.UserEmail,
                collapsible: false,
                autoWidth: true,
                autoHeight: true,
                items:
                [{
                    xtype: 'textfield',
                    id: 'ApplicantEmail',
                    name: 'Email',
                    anchor: '100%',
                    vtype: 'email',
                    vtypeText: 'Поле должно соответствовать формату "mail@example.com".'
                }]
            }]
        }, {
            xtype: 'panel', // панель справа
            region: 'center',
            border: false,
            padding: '5 5 5 5',
            style: 'background-color: #fff;',
            items:
            [{
                xtype: 'fieldset',
                id: 'RequirementsFieldSet',
                title: Strings.Skills,
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
                    autoWidth: true,
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
                        menuDisabled: true,
                        listeners: {
                            checkchange: function (column, rowIndex, checked) {
                                if (checked)
                                    checkedCount++;
                                else
                                    checkedCount--;

                                if (checkedCount > 0)
                                    Ext.getCmp('ShowHideSkills').enable();
                                else
                                    Ext.getCmp('ShowHideSkills').disable();
                            }
                        }
                    }, {
                        dataIndex: 'RequirementName',
                        text: Strings.Skill,
                        width: 120,
                        sortable: true,
                        field: { xtype: 'textfield' },
                        menuDisabled: true
                    }, {
                        dataIndex: 'CommentText',
                        text: Strings.UserCommentary,
                        width: 120,
                        sortable: false,
                        field: { xtype: 'textfield' },
                        menuDisabled: true,
                        editable: false
                    }],

                    tbar:
                    [{
                        text: Strings.btnHide,
                        name: 'btnShowHideSkills',
                        id: 'ShowHideSkills',
                        action: 'ShowHideSkills',
                        disabled: true
                    }]
                    /*** Конец - Грид для отображения навыков(Requirement) ***/
                }]
            }]
        }]
    }],
    buttons:
    [{
        text: Strings.btnSave,
        action: 'EditApplicant'
    }],

    initComponent: function () {
        this.callParent(arguments);
    }
})