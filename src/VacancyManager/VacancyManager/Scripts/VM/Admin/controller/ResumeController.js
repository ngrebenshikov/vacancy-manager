Ext.define('VM.controller.ResumeController', {
    extend: 'Ext.app.Controller',
    stores: ['ResumeRequirement',  'Resume', 'ResumeExperience'],
    views: ['Applicant.Edit', 'Resume.Create'],

    init: function () {

        this.control({

            'WizardMenu dataview':
              { itemclick: this.SelectStep },

            'button[action=FinishFirstStep]':
              { click: this.FinishFirstStep },

            //Создать Резюме
            'button[action=CreateResume]':
              { click: this.CreateResume },

            'button[action=FinishSecondStep]':
              { click: this.FinishSecondStep },

            'button[action=GoToFirstStep]':
              { click: this.GoToFirstStep },

            'button[action=GoToFouthStep]':
              { click: this.GoToFouthStep },

            'button[action=FinishStep]':
              { click: this.FinishStep },

            'button[action=ResumePdfCopy]':
              { click: this.ResumePdfCopy },

              // Удалить резюме
              'button[action=RemoveResume]':
              { click: this.RemoveResume },
        })

    },
        /* ===== */


    RemoveResume: function (button) {
            var grid = Ext.getCmp('ApplicantRes');
            var store = this.getResumeStore();
            var selection = grid.getView().getSelectionModel().getSelection()[0];
            if (selection != null) {
                store.remove(selection);
                button.disable();
            }
    },

    CreateResume: function () {
        var AddResume = Ext.widget('resumeCreate');
        var resumeStore = this.getResumeStore();
        resumeStore.activeRecord = undefined;

    },

    ResumePdfCopy: function (button) {
        var wizard = Ext.getCmp('wizard');
        var form = button.up('form');
        var resumeStore = this.getResumeStore();
        var record = resumeStore.activeRecord;
        window.open('/Resume/CreatePdfCopy/' + record.getId());
        win = wizard.up('window');
        win.close();
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
            values = form.getValues(),
            win = wizard.up('window');

        var resumeStore = this.getResumeStore();
        updateResume = resumeStore.activeRecord;
        updateResume.set(values);
        updateResume.save();

        var wmenu = Ext.getCmp('wizardMenuGrid').getStore();
        if (wmenu != undefined) {
            wmenu.getAt(4).set('ischeck', true);
        }

        win.close();

    },

    GoToFirstStep: function (button) {
        var wizard = Ext.getCmp('wizard');
        wizard.getLayout().setActiveItem('step-1');

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
        var appGrid = Ext.getCmp('ApplicantGrid'),
            appId = appGrid.getView().getSelectionModel().getSelection()[0].getId();

        var updateResume = resumeStore.activeRecord;

        var resumeRequirementStore = this.getResumeRequirementStore();

        if (form.getForm().isValid()) {
            if (updateResume == undefined) {
                var newResume = Ext.create('VM.model.Resume', {
                    Position: values.Position,
                    Summary: values.Summary,
                    ApplicantID: appId
                });
                resumeStore.activeRecord = newResume;
                newResume.save({
                    success: function (record, operation) {
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

        var appReqsCount = 0;

        resumeRequirementStore.each(function (resumeRequirement) {
            var IsRequire = resumeRequirement.get('IsRequire');
            if (IsRequire) {
                appReqsCount++;
            }
            resumeRequirement.set('ResumeId', resumeStore.activeRecord.getId());
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
        wizard.getLayout().setActiveItem('step-1');
    }
});