Ext.define('VM.controller.FrontEnd',
  { extend: 'Ext.app.Controller',
      stores: ['Resume', 'ResumeRequirement', 'ResumeExperience'],
      views: ['frontend.Main'],
      refs: [],

      init: function () {
          this.control({

              'WizardMenu dataview':
              { itemclick: this.SelectStep },

              'button[action=FinishFirtStep]':
              { click: this.FinishFirtStep },

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
          var updateResume = this.getResumeStore().getAt(0);
          updateResume.set(values);

          console.log(updateResume);
          var wmenu = Ext.getCmp('wizardMenuGrid').getStore();
          if (wmenu != undefined) {
              wmenu.getAt(4).set('ischeck', true);
              wmenu.getAt(5).set('enabled', true);
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


      FinishFirtStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form'),
              values = form.getForm().getValues();
          var wmenu = Ext.getCmp('wizardMenuGrid').getStore();
          if (wmenu != undefined) {
              wmenu.getAt(0).set('ischeck', true);
              wmenu.getAt(1).set('enabled', true);
          }

          var resumeRequirementStore = this.getResumeRequirementStore();
          if (form.getForm().isValid()) {
              var resumeStore = this.getResumeStore();
              if (resumeCreated == false) {
                  var newResume = Ext.create('VM.model.Resume', {
                      Position: values.Position,
                      Summary: values.Summary,
                      ApplicantId: 0
                  });
                  newResume.save({
                      success: function (record, operation) {
                          resumeCreated = true;
                          resumeStore.insert(0, record);
                          resumeRequirementStore.load({ params: { "id": record.getId()} });
                      }
                  });
              }
              else {
                  updateResume = resumeStore.getAt(0);
                  updateResume.set(values);
              }
          }


          wizard.getLayout().setActiveItem('step-2');
      },

      FinishSecondStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');
          var resumeRequirementStore = this.getResumeRequirementStore();
          var resumeStore = this.getResumeStore();

          resumeRequirementStore.each(function (resumeRequirement) {
              resumeRequirement.set('ResumeId', resumeStore.getAt(0).getId());
          });

          resumeRequirementStore.sync();

          var wmenu = Ext.getCmp('wizardMenuGrid').getStore();
          if (wmenu != undefined) {
              wmenu.getAt(1).set('ischeck', true);
              wmenu.getAt(2).set('enabled', true);
          }

          wizard.getLayout().setActiveItem('step-3');
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

