﻿Ext.define('VM.controller.FrontEnd', {
    extend: 'Ext.app.Controller',
    stores: ['Resume', 'ResumeRequirement', 'ResumeExperience', 'ApplicantRequirement', 'ApplicantConsideration'],
    views: ['frontend.Main', 'applicant.ManageApplicant', 'applicant.ApplicantRequirments',
             'applicant.ApplicantDopInfo', 'resume.List', 'frontend.RegisterForm', 'applicant.ApplicantConsiderations'],
    refs: [],

    init: function (application) {

        me = this;

        me.control({
            'button[action=SaveApplicant]':
              { click: this.SaveApplicant }
        });
    },

    SaveApplicant: function (button) {
        var appReqStore = this.getApplicantRequirementStore();

        var appForm = Ext.getCmp('frmManageApplicant').getForm(),
            applicant = appForm.getRecord();
        var vals = appForm.getValues();
        applicant.set(vals);
        applicant.save({
            success: function (record) {
                var id = record.getId();
                appForm.loadRecord(record);
                appReqStore.each(function (appRequirement) {              
                    var AppId = appRequirement.get('ApplicantId');
 
                    if (AppId === "") {
                        appRequirement.set('ApplicantId', id);
                    }

                });

                appReqStore.sync();
            }
        });

    }
});

