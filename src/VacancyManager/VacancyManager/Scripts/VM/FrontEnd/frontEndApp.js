﻿

function LogIn(login_form, login_window) {
    var form = login_form.getForm(),
        values = form.getValues();

    Ext.Ajax.request({
        url: '../../VMUser/ExtJSLogOn',
        params:
        {
            login: values.login,
            password: values.password
        },
        success: function (result, request) {
            var JsonResult = Ext.JSON.decode(result.responseText);

            if (JsonResult.success) {

                var appReqStore = Ext.StoreManager.lookup('ApplicantRequirement'),
                    applicant = Ext.create('VM.model.Applicant', JsonResult.applicant),
                    resumeStore = Ext.StoreManager.lookup('Resume'),
                    appConsStore = Ext.StoreManager.lookup('ApplicantConsideration');

                var appForm = Ext.getCmp('frmManageApplicant').getForm();
               
                if (model.VacancyKey !== null) {
                    var consideration = Ext.create('VM.model.ApplicantConsideration', {
                        Vacancy: model.VacancyKey,
                        ApplicantID: applicant.getId()
                    });

                    consideration.save();
                }

                appForm.loadRecord(applicant);

                appReqStore.load({ params: { "id": applicant.getId()} });
                resumeStore.load({ params: { "appId": applicant.getId()} });
                appConsStore.load({ params: { "AppId": applicant.getId()} });

                login_window.close();
            }
            else {
                Ext.MessageBox.show({
                    title: 'Ошибка',
                    msg: JsonResult.LogOnResult,
                    minWidth: 200,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        }
    });
};

function CreateLoginWindow() {
    var login_form = Ext.create('Ext.form.Panel', {
        border: false,
        frame: false,
        style: 'background-color: #fff;',
        labelWidth: 55,
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [
          {
              fieldLabel: 'Login',
              name: 'login',
              anchor: '100%'
          }, {
              fieldLabel: 'Password',
              name: 'password',
              inputType: 'password',
              anchor: '100%',
              listeners: {
                  scope: this,
                  specialkey: function (f, e) {
                      if (e.getKey() == e.ENTER) {
                          LogIn(login_form, login_window);
                      }
                  }
              }
          }],
        buttons: [{
            text: 'Регистрация',
            handler: function (button) {
                var view = Ext.widget('registerForm');
                console.log(view);
            }
        }, '->', {
            text: 'Вход',
            handler: function (button) {
                LogIn(login_form, login_window);
            }
        }]
    });

    var login_window = Ext.create('Ext.window.Window', {
        width: 300,
        height: 160,
        modal: true,
        frame: true,
        draggable: false,
        closable: false,
        layout: 'fit',
        title: 'Авторизация',
        items: login_form
    });

    login_window.show();

};

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'VM.Shared': '/Scripts/VM/Shared'
    }
});

Ext.Loader.setPath('Ext.ux', '/ExtLib/ux');
Ext.Loader.setPath('Ext.ux.StatusBar', '/ExtLib/ux/statusbar/StatusBar.js');

    Ext.application({
        name: 'VM',
        appFolder: '/Scripts/VM/FrontEnd',

        stores: [
     'Resume',
     'ResumeRequirement',
     'ResumeEducation',
     'ApplicantRequirement',
     'ApplicantConsideration'],

        controllers: [
     'FrontEnd',
     'ResumeExperience',
     'ResumeEducation',
     'ResumeController'],

        launch: function () {
            Ext.create('Ext.container.Viewport', {
                layout: 'fit',
                items: [
                { xtype: 'FrontEndMain' }
            ]
            });

            if (UserIsAuthenticated === false) {
                CreateLoginWindow();
            }

            else {

                var appReqStore = this.getApplicantRequirementStore(),
                    applicant = Ext.create('VM.model.Applicant', model.Applicant),
                    resumeStore = this.getResumeStore(),
                    AppID = model.Applicant.ApplicantID;
               
                var appConsStore = this.getApplicantConsiderationStore();
                var appForm = Ext.getCmp('frmManageApplicant').getForm();

                appForm.loadRecord(applicant);
                appReqStore.load({ params: { "id": AppID} });
                resumeStore.load({ params: { "appId": AppID} });
                appConsStore.load({ params: { "AppId": AppID} });
            }

            Ext.QuickTips.init();
        }
    });

