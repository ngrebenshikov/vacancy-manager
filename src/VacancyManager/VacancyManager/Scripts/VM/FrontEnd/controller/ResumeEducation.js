Ext.define('VM.controller.ResumeEducation',
  { extend: 'Ext.app.Controller',
      stores: ['Resume', 'ResumeEducation'],
      views: [],
      refs: [],

      init: function () {
          this.control({
              'EduList dataview':
              { itemclick: this.click },

              'button[action=FinishFouthStep]':
              { click: this.FinishFouthStep },

              'button[action=GoToThirdStep]':
              { click: this.GoToThirdStep },

              'button[action=AddEducation]':
              { click: this.AddEducation },

              'button[action=DeleteEducation]':
              { click: this.DeleteEducation },

              'button[action=EditEducation]':
              { click: this.EditEducation },

              'button[action=UpdateResumeEducation]':
              { click: this.UpdateResumeEducation },

              'button[action=CreateResumeEducation]':
              { click: this.CreateResumeEducation }

          }
      );
      },

      DeleteEducation: function (button) {
          var grid = button.up('grid'),
                record = grid.getSelectionModel().getSelection()[0],
                store = grid.getStore();
          Ext.Msg.show({
              title: 'Удаление информации об опыте',
              msg: 'Уладить "' + record.get('Job') + '"',
              width: 300,
              buttons: Ext.Msg.YESNO,
              fn: function (btn) {
                  if (btn == 'yes') {
                      store.remove(record);
                  }
              }
          });
      },


      click: function (view, record) {

          console.log(record);

      },

      UpdateResumeEducation: function (button) {
          var win = button.up('window'),
              form = win.down('form'),
              values = form.getValues();
          var resumeEduStore = this.getResumeEducationStore(),
              ResumeEdu = form.getRecord();
          if (form.getForm().isValid()) {
              ResumeEdu.set(values);
              ResumeEdu.save();
              win.close();
          }
      },

      CreateResumeEducation: function (button) {
          var win = button.up('window'),
              form = win.down('form'),
              values = form.getValues();
          var resumeStore = this.getResumeStore(),
              Resume = resumeStore.activeRecord;

          if (form.getForm().isValid()) {
              var newEdu = Ext.create('VM.model.ResumeExperience', {
                  Job: values.Job,
                  Project: values.Project,
                  Position: values.Position,
                  Duties: values.Duties,
                  StartDate: values.StartDate,
                  FinishDate: values.FinishDate,
                  IsEducation: true,
                  ResumeId: Resume.getId()
              });

              var store = this.getResumeEducationStore();
              newEdu.save({
                  success: function (record, operation) {
                      store.insert(0, record);
                  }
              });

              win.close();
          }
      },

      EditEducation: function (button) {
          var EduWin = Ext.widget('window', {
              title: 'Информация об образовании',
              width: 650,
              height: 400,
              minHeight: 400,
              layout: 'fit',
              modal: true,
              buttonAlign: 'center',
              items: [
                 { xtype: 'form',
                     id: 'EduForm',
                     border: false,
                     layout: 'border',
                     style: 'background-color: #fff;',
                     items: [
                        { xtype: 'ManageEducation',
                            region: 'center'
                        }
                     ]
                 }
              ],
              buttons: [
                { text: 'Сохранить',
                    action: 'UpdateResumeEducation'
                },
                { text: 'Отмена',
                    handler: function () {
                        EduWin.close();
                    }
                }
              ]
          });

          EduWin.show();

          var frm = EduWin.down('form').getForm(),
              grid = button.up('grid'),
              Edu = grid.getSelectionModel().getSelection()[0];

          frm.loadRecord(Edu);

      },

      AddEducation: function (button) {

          var EduWin = Ext.widget('window', {
              title: 'Информация об образовании',
              width: 650,
              height: 400,
              minHeight: 400,
              layout: 'fit',
              modal: true,
              buttonAlign: 'center',
              items: [
                 { xtype: 'form',
                     id: 'EduForm',
                     border: false,
                     layout: 'border',
                     style: 'background-color: #fff;',
                     items: [
                        { xtype: 'ManageEducation',
                            region: 'center'
                        }
                     ]
                 }
              ],
              buttons: [
                { text: 'Сохранить',
                    action: 'CreateResumeEducation'
                },
                { text: 'Отмена',
                    handler: function () {
                        EduWin.close();
                    }
                }
              ]
          });

          EduWin.show();
      },

      GoToThirdStep: function (button) {
          var wizard = Ext.getCmp('wizard');

          wizard.getLayout().setActiveItem('step-3');
      },

      FinishFouthStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');
          var searchStore = this.getResumeEducationStore();
          if (searchStore.getCount() != 0) {
              var wmItemState = Ext.getCmp('imgItem4'),
                wmItem1 = Ext.getCmp('Item4'),
                wmItem2 = Ext.getCmp('Item5');

              wmItem1.toggle(false);
              wmItem2.enable(false);
              wmItem2.toggle(true);

              wmItemState.setSrc('/Content/icons/checked.gif');
              wizard.getLayout().setActiveItem('step-5');
          }
      }
  }
);

