Ext.define('VM.controller.FrontEnd',
  { extend: 'Ext.app.Controller',
      stores: ['Resume', 'ResumeRequirement', 'ResumeExperience', 'ApplicantRequirement'],
      views: ['frontend.Main', 'applicant.ManageApplicant', 'applicant.ApplicantRequirments'],
      refs: [],

      init: function () {
          
          this.control({
              
              'WizardMenu dataview':
              { itemclick: this.SelectStep },

              'button[action=FinishFirstStep]':
              { click: this.FinishFirstStep },

              'button[action=FinishSecondStep]':
              { click: this.FinishSecondStep },

              'button[action=GoToFirstStep]':
              { click: this.GoToFirstStep },

              'button[action=GoToFouthStep]':
              { click: this.GoToFouthStep },

              'button[action=FinishStep]':
              { click: this.FinishStep },

              'button[action=ResumePdfCopy]':
              { click: this.ResumePdfCopy }

          }
      );
      },

      ResumePdfCopy: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');
          var resumeStore = this.getResumeStore();
          var record = resumeStore.getAt(0);
          window.open('/Resume/CreatePdfCopy/' + record.getId());

      },

      SelectStep: function (view, record) {
          var wizard = Ext.getCmp('wizard'),
              stageindex = record.get('stageindex');
          enabled = record.get('enabled');
          var isEdu = false;
          if (enabled) {
              var searchStore = this.getResumeExperienceStore(),
                            fieldName = 'IsEducation';

              if (stageindex == 'step-4')
                  isEdu = true;
              if (stageindex == 'step-3')
                  isEdu = false;

              searchStore.clearFilter();
              searchStore.filter({
                  property: fieldName,
                  value: isEdu,
                  exactMatch: false,
                  caseSensitive: false
              });

              wizard.getLayout().setActiveItem(stageindex);
          }

      },

      FinishStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form'),
              values = form.getValues();

          var resumeStore = this.getResumeStore();
          updateResume = resumeStore.activeRecord;
          updateResume.set(values);
          updateResume.save();

          var wmenu = Ext.getCmp('wizardMenuGrid').getStore();
          if (wmenu != undefined) {
              wmenu.getAt(4).set('ischeck', true);
          }
      },

      GoToFirstStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          wizard.getLayout().setActiveItem('step-3');

      },

      GoToFouthStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          wizard.getLayout().setActiveItem('step-4');

      },


      FinishFirstStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form'),
            values = form.getForm().getValues(),
            resumeStore = this.getResumeStore();

          var updateResume = resumeStore.activeRecord;

          var resumeRequirementStore = this.getResumeRequirementStore();

          if (form.getForm().isValid()) {
              if (updateResume == undefined) {
                  var newResume = Ext.create('VM.model.Resume', {
                      Position: values.Position,
                      Summary: values.Summary,
                      ApplicantID: 0
                  });
                  resumeStore.activeRecord = newResume;
                  newResume.save({
                      success: function (record, operation) {
                          resumeCreated = true;
                          resumeStore.insert(0, record);
                          resumeRequirementStore.load({ params: { "id": record.getId()} });
                      }
                  });
              }
              else {
                  updateResume = resumeStore.activeRecord;
                  updateResume.set(values);
                  updateResume.save();
              }

              var wmenu = Ext.getCmp('wizardMenuGrid').getStore();
              if (wmenu != undefined) {
                  wmenu.getAt(0).set('ischeck', true);
                  wmenu.getAt(1).set('enabled', true);
              }
              wizard.getLayout().setActiveItem('step-2');
          }

      },

      FinishSecondStep: function (button) {
          var wizard = Ext.getCmp('wizard'),
              form = button.up('form'),
              resumeRequirementStore = this.getResumeRequirementStore(),
              resumeStore = this.getResumeStore();

          var appReqsCount = 0,
              curResume = resumeStore.activeRecord;

          console.log(curResume);

          resumeRequirementStore.each(function (resumeRequirement) {
              var IsRequire = resumeRequirement.get('IsRequire');
              if (IsRequire) {
                  appReqsCount++;
              }
              resumeRequirement.set('ResumeId', curResume.getId());
          });

          resumeRequirementStore.sync();

          if (appReqsCount != 0) {
              var wmenu = Ext.getCmp('wizardMenuGrid').getStore();
              if (wmenu != undefined) {
                  wmenu.getAt(1).set('ischeck', true);
                  wmenu.getAt(2).set('enabled', true);
              }

              wizard.getLayout().setActiveItem('step-3');
          }

      },

      GoToFirstStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');

          if (form.getForm().isValid()) {
              wizard.getLayout().setActiveItem('step-1');
          }
      }

  }
);

