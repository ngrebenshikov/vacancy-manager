﻿Ext.define('VM.controller.ResumeController', {
    extend: 'Ext.app.Controller',
    stores: ['ResumeRequirement', 'Resume', 'ResumeExperience', 'ResumeEducation'],
    views: ['resume.Create', 'resume.Edit'],

    init: function () {

        this.control({

            'resumeList dataview':
              { itemclick: this.setActiveRecord },

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

            // Редактировать резюме
            'button[action=EditResume]':
              { click: this.EditResume }
        })

    },
    /* ===== */
    setActiveRecord: function (view, record) {
        var resumeStore = this.getResumeStore();
        resumeStore.activeRecord = record;
    },

    EditResume: function (button) {
        var winEditResume = Ext.widget('resumeEdit');
        var resumeStore = this.getResumeStore(),
            editResume = resumeStore.activeRecord;
        var form = winEditResume.down('form');
        form.loadRecord(editResume);
        var resumeRequirementStore = this.getResumeRequirementStore();
        resumeRequirementStore.load({ params: { "id": editResume.getId()} });
        var resumeExpStore = this.getResumeExperienceStore();
        resumeExpStore.load({ params: { "ResId": editResume.getId(), "isEdu": false} });
        var resumeEduStore = this.getResumeEducationStore();
        resumeEduStore.load({ params: { "ResId": editResume.getId(), "isEdu": true} });
    },

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
        var appForm = Ext.getCmp('frmManageApplicant').getForm(),
            applicant = appForm.getRecord(),
            appId = applicant.getId();

        if (appId != 0) {
            var AddResume = Ext.widget('resumeCreate');
            var resumeStore = this.getResumeStore();
            resumeStore.activeRecord = undefined;
            var resumeExpStore = this.getResumeExperienceStore();
            var resumeEduStore = this.getResumeEducationStore();
            resumeExpStore.removeAll(true);
            resumeEduStore.removeAll(true);
        }
        else {
            Ext.MessageBox.alert('Ошибка', 'Вы не зарегистированы как соискатель?');
        }
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
            wizard.getLayout().setActiveItem(stageindex);
        }

    },

    FinishStep: function (button) {
        var wizard = Ext.getCmp('wizard');
        var form = undefined,
            win = undefined;

        if (wizard != undefined) {
            win = wizard.up('window');
            form = button.up('form');
        }
        else {
            win = button.up('window');
            form = win.down('form');
        };

        var values = form.getValues();
        var resumeRequirementStore = this.getResumeRequirementStore(),
            resumeStore = this.getResumeStore();

        updateResume = resumeStore.activeRecord;
        updateResume.set(values);
        updateResume.save({
            success: function (record, operation) {
                resumeRequirementStore.sync();
            }
        });

        var wmenu = Ext.getCmp('wizardMenuGrid');
        if (wmenu != undefined) {
            wmenu.getStore().getAt(4).set('ischeck', true);
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

        var appForm = Ext.getCmp('frmManageApplicant').getForm();

        applicant = appForm.getRecord();
        appId = applicant.getId();

        var updateResume = resumeStore.activeRecord;

        var resumeRequirementStore = this.getResumeRequirementStore();

        if (form.getForm().isValid()) {
            if (updateResume == undefined) {
                var newResume = Ext.create('VM.model.Resume', {
                    Position: values.Position,
                    Summary: values.Summary,
                    ApplicantID: appId
                });

                newResume.save({
                    success: function (record, operation) {
                        resumeStore.insert(0, record);
                        resumeStore.activeRecord = record;
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