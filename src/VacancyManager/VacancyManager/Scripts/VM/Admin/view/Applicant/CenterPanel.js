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
    border: false,
    layout: 'fit',
    padding: '5 5 5 5',
    style: 'background-color: #fff;',
    items:
    [{
        title: Strings.Skills,
        layout: 'fit',
        autoHeight: true,
        items: //Элементы fieldset
        [{
            /*** Грид для отображения навыков(Requirement) ***/
            xtype: 'grid',
            id: 'ApplicantRequirementsGrid',
            autoSizeColumns: true,
            forceFit: true,
            margin: '0 0 12 0',
            frame: false,
            layout: 'fit',
            autoHeight: true,
            split: true,
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
                width: 20,
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
    },
    { title: Strings.Vacancies,
        layout: 'border',
        id: 'tabAppVac',
        autoHeight: true,
        items:
       [
       { xtype: 'applicantConsiderationsList',
           region: 'west',
           split: true
       },
       { xtype: 'commentsList',
           region: 'center',
           autoHeight: true,
           title: 'Комментарии',
           columns: [
  	        {
  	            width: 100,
  	            flex: 1,
  	            sortable: false,
  	            menuDisabled: true,
  	            textalign: 'justify',
  	            dataIndex: 'Body',
  	            tdCls: 'wrap-text'
  	        },
            {
                width: 90,
                xtype: 'templatecolumn',
                tdCls: 'wrap-text',
                tpl:
                    new Ext.XTemplate(
                       '<b>{[Ext.Date.format(values.CreationDate, "d.m.Y")]} <br> от {CommentatorName}</b>'
                 )
            },

         ],
           bbar: [
            {
                text: 'Новый комментарий',
                name: 'btnewConsComments',
                id: 'newConsComments',
                handler: function () {
                    var cons = Ext.getCmp('applicantConsiderationsGrid').getView().getSelectionModel().getSelection()[0];
                    if (cons != undefined)
                    { var consCreate = Ext.create('VM.view.Comments.Add').show(); }
                }
            }
           ],
           width: 300,
           height: 375
       }

      ]
    },
    { title: 'Комментарии',
        id: 'ApplicantCommentsTab',
        layout: 'anchor',
        items: [
        { xtype: 'appCommentsList',
            anchor: '100% 70%'
        },
        {
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
        id: 'ApplicantMessagesTab',
        margin: '0 0 0 0',
        items: [
        { xtype: 'ApplicantMessagesList',
            forceFit: true,
            layout: 'fit',
            height: 350,
            margin: '0 0 0 0'
        }
      ]

    },
       {
           title: Strings.Resumes,
           id: 'ApplicantResumeTab',
           items: [
             {
                 xtype: 'grid',
                 autoSizeColumns: true,
                 id: 'ApplicantRes',
                 store: 'Resume',
                 columns:
                 [{
                     header: 'Дата',
                     dataIndex: 'Date',
                     sortable: false,
                     menuDisabled: true,
                     flex: 1

                 },
                 {
                     header: 'Резюме',
                     dataIndex: 'ResumeId',
                     sortable: false,
                     menuDisabled: true,
                     flex: 1
                 },
                 {
                     header: 'Интервал резюме',
                     dataIndex: 'StartDate',
                     sortable: false,
                     menuDisabled: true,
                     flex: 1
                 }, {
                     xtype: 'actioncolumn',
                     width: 30,
                     align: 'center',
                     sortable: false,
                     menuDisabled: true,
                     items:
                     [{
                         icon: '/Content/icons/pdfico.png',
                         tooltip: 'Создать pdf',
                         handler: function (grid, rowIndex, colIndex) {
                             var resumeStore = grid.getStore();
                             var record = resumeStore.getAt(rowIndex);
                             window.open('/Resume/CreatePdfCopy/' + record.getId());
                         }
                     }]
                 },
                 {
                     xtype: 'actioncolumn',
                     width: 30,
                     align: 'center',
                     sortable: false,
                     menuDisabled: true,
                     items:
                     [{
                         icon: '/Content/icons/CopyIco.png',
                         tooltip: 'Клонировать резюме',
                         handler: function (grid, rowIndex, colIndex) {
                             var resumeStore = grid.getStore();
                             var record = resumeStore.getAt(rowIndex);
                             Ext.Ajax.request
                              ({
                                  url: '../../Resume/CreateResumeCopy/' + record.getId(),
                                  success: function (result, request) {
                                      var JsonResult = Ext.JSON.decode(result.responseText);

                                      var newResume = Ext.create('VM.model.ApplicantResumeGrid', {
                                          ResumeId: JsonResult.resume.ResumeId,
                                          Position: JsonResult.resume.Position,
                                          Summary: JsonResult.resume.Summary,
                                          Training: JsonResult.resume.Training,
                                          Date: JsonResult.resume.Date
                                      });

                                      resumeStore.insert(0, newResume);
                                  }
                              });
                         }
                     }]
                 }],

                 tbar: [{
                     text: Strings.btnAdd,
                     icon: '/Content/icons/add.gif',
                     name: 'btnAdd',
                     id: 'Add',
                     action: 'CreateResume'
                 }, {
                     text: Strings.btnRemove,
                     icon: '/Content/icons/delete.gif',
                     name: 'btnRemove',
                     id: 'RemoveResume',
                     action: 'RemoveResume',
                     disabled: true
                 }],
                 listeners: {
                     selectionchange: function (view, selections, options) {
                         var button = Ext.getCmp('RemoveResume');
                         if (selections != null)
                             button.enable();
                     }
                 }
             }
           ]


       }
  ]
})