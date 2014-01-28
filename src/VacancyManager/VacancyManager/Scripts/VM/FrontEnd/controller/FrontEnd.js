Ext.define('VM.controller.FrontEnd',
  { extend: 'Ext.app.Controller',
      stores: ['Resume', 'ResumeRequirement'],
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

              'button[action=GoToSecondStep]':
              { click: this.GoToSecondStep },

              'button[action=FinishThirdStep]':
              { click: this.FinishThirdStep },

              'button[action=GoToThirdStep]':
              { click: this.GoToThirdStep },

              'button[action=FinishFouthStep]':
              { click: this.FinishFouthStep },

              'button[action=GoToFouthStep]':
              { click: this.GoToFouthStep },

              'button[action=FinishStep]':
              { click: this.FinishFouthStep }
          }
      );
      },

      SelectStep: function (view, record) {
          var wizard = Ext.getCmp('wizard'),
              stageindex = record.get('stageindex');
          wizard.getLayout().setActiveItem(stageindex);
      },

      FinishFouthStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');

          if (form.getForm().isValid()) {
              wizard.getLayout().setActiveItem('step-5');
          }
      },

      FinishStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');
      },

      GoToFirstStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          wizard.getLayout().setActiveItem('step-3');

      },

      GoToFouthStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          wizard.getLayout().setActiveItem('step-4');

      },

      GoToThirdStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          wizard.getLayout().setActiveItem('step-3');

      },

      FinishFirtStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form'),
              values = form.getForm().getValues();
          var wmenu = Ext.getCmp('wizardMenuGrid').getStore();
          if (wmenu != undefined) {
              wmenu.getAt(0).set('ischeck', true);
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
          }

              wizard.getLayout().setActiveItem('step-3');
       },

      FinishThirdStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');

          if (form.getForm().isValid()) {
              wizard.getLayout().setActiveItem('step-4');
          }
      },

      GoToFirstStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');

          if (form.getForm().isValid()) {
              wizard.getLayout().setActiveItem('step-1');
          }
      },

      GoToSecondStep: function (button) {
          var wizard = Ext.getCmp('wizard');
          var form = button.up('form');

          if (form.getForm().isValid()) {
              wizard.getLayout().setActiveItem('step-2');
          }
      }
  }
);

