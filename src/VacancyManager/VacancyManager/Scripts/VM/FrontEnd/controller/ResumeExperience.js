Ext.define('VM.controller.ResumeExperience',
  { extend: 'Ext.app.Controller',
      stores: ['Resume', 'ResumeExperience', 'ExperienceRequirement'],
      views: [],
      refs: [],

      init: function () {
          this.control({
              'ExpList dataview':
              { itemclick: this.click },

              'button[action=FinishThirdStep]':
              { click: this.FinishThirdStep },

              'button[action=GoToSecondStep]':
              { click: this.GoToSecondStep },

              'button[action=AddExperience]':
              { click: this.AddExperience },

              'button[action=EditExperience]':
              { click: this.EditExperience },

              'button[action=UpdateResumeExperience]':
              { click: this.UpdateResumeExperience },

              'button[action=CreateResumeExperience]':
              { click: this.CreateResumeExperience },

              'button[action=DeleteExpirience]':
              { click: this.DeleteExpirience }
          }
      );
      },

      DeleteExpirience: function (button) {
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

          //    console.log(record);

      },

      UpdateResumeExperience: function (button) {
          var win = button.up('window'),
              form = win.down('form'),
              values = form.getValues();
          var resumeExpStore = this.getResumeExperienceStore();
          ResumeExp = form.getRecord();

          if (form.getForm().isValid()) {
              ResumeExp.set(values);
              var resumeExpReqStore = this.getExperienceRequirementStore();
              ResumeExp.save({
                  success: function (record, operation) {
                      resumeExpReqStore.sync();
                  }
              });
              win.close();
          }
      },

      CreateResumeExperience: function (button) {
          var win = button.up('window'),
              form = win.down('form'),
              values = form.getValues();
          var resumeStore = this.getResumeStore(),
              Resume = resumeStore.activeRecord;

          if (form.getForm().isValid()) {
              var newExp = Ext.create('VM.model.ResumeExperience', {
                  Job: values.Job,
                  Project: values.Project,
                  Position: values.Position,
                  Duties: values.Duties,
                  StartDate: values.StartDate,
                  FinishDate: values.FinishDate,
                  IsEducation: false,
                  ResumeId: Resume.getId()
              });

              var store = this.getResumeExperienceStore();
              var resumeExpReqStore = this.getExperienceRequirementStore();
              newExp.save({
                  success: function (record, operation) {
                      store.insert(0, record);
                      resumeExpReqStore.each(function (ExpReq) {
                          ExpReq.set('ExperienceId', record.getId());
                      });
                      resumeExpReqStore.sync();
                  }
              });

              win.close();
          }
      },

      EditExperience: function (button) {

          var ExpReqsList = Ext.create('VM.Shared.ExpReqsList', {
              store: 'ExperienceRequirement',
              id: 'expReqsList',
              region: 'east',
              width: 300
          });

          var ExpWin = Ext.widget('window', {
              title: 'Информация о профессиональном опыте',
              width: 750,
              height: 500,
              minHeight: 400,
              layout: 'fit',
              modal: true,
              buttonAlign: 'center',
              items: [
                 { xtype: 'form',
                     id: 'ExpForm',
                     border: false,
                     layout: 'border',
                     style: 'background-color: #fff;',
                     items: [
                        { xtype: 'ManageExperience',
                            region: 'center'
                        }, ExpReqsList
                     ]
                 }
              ],
              buttons: [
                { text: 'Сохранить',
                    action: 'UpdateResumeExperience'
                },
                { text: 'Отмена',
                    handler: function () {
                        ExpWin.close();
                    }
                }
              ]
          });

          ExpWin.show();

          var frm = ExpWin.down('form').getForm(),
              grid = button.up('grid'),
              Exp = grid.getSelectionModel().getSelection()[0];

          frm.loadRecord(Exp);
          var expreqstore = this.getExperienceRequirementStore();
          expreqstore.load({ params: { "id": Exp.getId()} });
      },

      AddExperience: function (button) {

          var ExpReqsList = Ext.create('VM.Shared.ExpReqsList', {
              store: 'ExperienceRequirement',
              id: 'expReqsList1',
              region: 'east',
              width: 300
          });

          var expreqstore = this.getExperienceRequirementStore();
          expreqstore.load({ params: { "id": -1} });

          var ExpWin = Ext.widget('window', {
              title: 'Информация о профессиональном опыте',
              width: 750,
              height: 500,
              minHeight: 400,
              layout: 'fit',
              modal: true,
              buttonAlign: 'center',
              items: [
                 { xtype: 'form',
                     id: 'ExpForm',
                     border: false,
                     layout: 'border',
                     style: 'background-color: #fff;',
                     items: [
                        { xtype: 'ManageExperience',
                            region: 'center'
                        }, ExpReqsList
                     ]
                 }
              ],
              buttons: [
                { text: 'Сохранить',
                    action: 'CreateResumeExperience'
                },
                { text: 'Отмена',
                    handler: function () {
                        ExpWin.close();
                    }
                }
              ]
          });

          ExpWin.show();

      },

      FinishThirdStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');
          var searchStore = this.getResumeExperienceStore();

          if (searchStore.getCount() != 0) {

              wizard.getLayout().setActiveItem('step-4');
              var wmenu = Ext.getCmp('wizardMenuGrid').getStore();
              if (wmenu != undefined) {
                  wmenu.getAt(2).set('ischeck', true);
                  wmenu.getAt(3).set('enabled', true);
              }
          }
      },


      GoToSecondStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');

          wizard.getLayout().setActiveItem('step-2');
      }
  }
);

