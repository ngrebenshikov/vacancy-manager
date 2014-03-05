Ext.define('VM.controller.FrontEnd',
  { extend: 'Ext.app.Controller',
      stores: ['Resume', 'ResumeRequirement', 'ResumeExperience', 'ApplicantRequirement'],
      views: ['frontend.Main', 'applicant.ManageApplicant', 'applicant.ApplicantRequirments', 'applicant.ApplicantDopInfo', 'resume.List'],
      refs: [],

      init: function (application) {

          this.control({

          });
      }

  }
);

