var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 2,
    listeners: {
        beforeedit: function (e, editor) {
            if (e.field == 'RequirementName')
                return false;
        }
    }
});

Ext.define('VM.view.Applicant.CenterPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.centerPanel',
    region: 'center',
    border: true,
    layout: 'fit',
    plain: true,
    padding: '5 5 5 5',
    style: 'background-color: #fff;',
    items:
    [{
        title: Strings.Skills,
        layout: 'fit',
        border: false,
        items: //Элементы fieldset
        [{
            /*** Грид для отображения навыков(Requirement) ***/
            xtype: 'grid',
            id: 'ApplicantRequirementsGrid',
            autoSizeColumns: true,
            border: false,
            region: 'center',
            plugins: [cellEditing],
            features: [Ext.create('Ext.grid.feature.Grouping', {
                groupHeaderTpl: '{name}: ({rows.length})'
            })],
            store: 'ApplicantRequirements',
            columns:
            [{
                xtype: 'checkcolumn',
                dataIndex: 'IsChecked',
                width: 30,
                align: 'center',
                sortable: false,
                menuDisabled: true,
                listeners: {
                    checkchange: function (column, rowIndex, checked) {
                        Ext.getCmp('ShowHideSkills').disable();

                        var store = Ext.StoreManager.lookup('ApplicantRequirements');

                        store.each(function (appReq) {
                            if (appReq.get('IsChecked') === true) {
                                Ext.getCmp('ShowHideSkills').enable();
                                return false;
                            }
                        });
                    }
                }
            }, {
                dataIndex: 'RequirementName',
                text: Strings.Skill,
                width: 120,
                flex: 1,
                sortable: false,
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

            bbar:
            [{
                text: Strings.btnHide,
                name: 'btnShowHideSkills',
                id: 'ShowHideSkills',
                action: 'ShowHideSkills',
                disabled: true
            }]
            /*** Конец - Грид для отображения навыков(Requirement) ***/
        }]
    },
    { title: Strings.Vacancies,
        layout: 'border',
        border: false,
        id: 'tabAppVac',
        items:
        [{ xtype: 'commentsList',
            region: 'center',
            border: false,
            margin: '0 0 0 0',
            id: 'appConsCommentsList',
            bbar: ['->', {
                text: 'Новый комментарий',
                name: 'btnewConsComments',
                id: 'newConsComments',
                handler: function () {
                    var cons = Ext.getCmp('applicantConsiderationsGrid').getView().getSelectionModel().getSelection()[0];
                    if (cons != undefined)
                    { var consCreate = Ext.create('VM.view.Comments.Add').show(); }
                }
            } ]
        }, {
            xtype: 'applicantConsiderationsList',
            border: false,
            region: 'west',
            bbar: [
            {
                text: 'Новая вакансия',
                name: 'btnAddCons',
                id: 'AddAppCons',
                action: 'addAppCons'
            }]
        }]
    },
    { title: 'Комментарии',
        id: 'ApplicantCommentsTab',
        border: false,
        layout: 'anchor',
        items: [
        { xtype: 'appCommentsList',
            border: false,
            anchor: '100% 70%'
        }, {
            xtype: 'panel',
            anchor: '98% 30%',
            padding: '5 5 5 5',
            border: false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            style: 'background-color: #fff;',
            items: [{
                xtype: 'htmleditor',
                enableAlignments: true,
                enableColors: true,
                enableFont: true,
                enableFontSize: true,
                enableFormat: true,
                enableLinks: true,
                enableLists: true,
                enableSourceEdit: true,
                fieldLabel: 'Комментарий',
                flex: 1,
                id: 'newAppCommnent',
                name: 'newAppCommnent',
                allowBlank: true
            }, {
                xtype: 'panel',
                width: 100,
                border: false,
                items: [
                          {
                              xtype: 'button',
                              text: 'Добавить',
                              margin: '5',
                              action: 'addAppComment'
                          },
                          {
                              xtype: 'button',
                              text: 'Очистить',
                              action: 'clearCommentArea',
                              margin: '5'
                          }]
            }]
        }
      ]

    },

    { title: 'Cообщения',
        layout: 'fit',
        border: false,
        id: 'ApplicantMessagesTab',
        margin: '0 0 0 0',
        items: [
        { xtype: 'ApplicantMessagesList',
            layout: 'fit',
            border: false,
            height: 350,
            margin: '0 0 0 0'
        }
      ]

    },
       {
           title: Strings.Resumes,
           layout: 'fit',
           border: false,
           id: 'ApplicantResumeTab',
           items: [
             { xtype: 'resumeList', border: false }
           ]


       }
  ]
})