Ext.define('VM.controller.ResumeController',
    {
        extend: 'Ext.app.Controller',
        models: ['VM.model.ApplicantRequirements'],
        stores: ['ApplicantResumeGr'],
        views: ['VM.view.Applicant.Edit'],

        init: function () {
            this.control({

            })

        }
    });