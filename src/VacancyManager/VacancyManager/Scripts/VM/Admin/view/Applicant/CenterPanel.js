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
         autoSizeColumns: true,
         autoHeight: true,
         title: 'Комментарии',
           columns: [
  	        {
  	            width: 100,
  	            flex: 1,
  	            sortable: false,
  	            menuDisabled: true,
  	            dataIndex: 'Body',
  	            tdCls: 'wrap-text'
  	        },
            {
                width: 100,
                xtype: 'templatecolumn',
                tdCls: 'wrap-text',
                tpl:
                    new Ext.XTemplate(
                       '<b>{[Ext.Date.format(values.CreationDate, "d.m.Y")]} <br> от {CommentatorName}</b>'
                 )
            },

         ],
           width: 300,
           height: 375,
         bbar: []
       }

      ]
    },
    { title: 'Комментарии',
      layout: 'fit',
      items: [
        { xtype: 'appCommentsList'}
      ]

    }
  ]
})