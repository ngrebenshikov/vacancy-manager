
function LogIn(login_form, login_window) {
    var form = login_form.getForm(),
        values = form.getValues();
    Ext.Ajax.request({
        url: '../../User/ExtJSLogOn',
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
                    resumeStore = Ext.StoreManager.lookup('Resume');

                var appForm = Ext.getCmp('frmManageApplicant').getForm();
                appForm.loadRecord(applicant);
                appReqStore.load({ params: { "id": applicant.getId()} });
                resumeStore.load({ params: { "appId": applicant.getId()} });
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
        title: 'Авторизация',
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
            margins: '5 5 5 5',
            handler: function (button) {
                var view = Ext.widget('registerForm');
                console.log(view);
            }
        }, {
            text: 'Вход',
            margins: '5 5 5 5',
            handler: function (button) {
                LogIn(login_form, login_window);
            }
        }]
    });

    var login_window = Ext.create('Ext.window.Window', {
        width: 300,
        height: 130,
        modal: true,
        frame: true,
        frameHeader: false,
        draggable: false,
        closable: false,
        layout: 'fit',
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

    Ext.require('Ext.ux.CheckColumn');
    Ext.application({
        name: 'VM',
        appFolder: '/Scripts/VM/FrontEnd',

        stores: [
     'Resume',
     'ResumeRequirement',
     'ResumeEducation',
     'ApplicantRequirement'],

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
                    resumeStore = this.getResumeStore();

                var appForm = Ext.getCmp('frmManageApplicant').getForm();
                appForm.loadRecord(applicant);
                appReqStore.load({ params: { "id": model.Applicant.ApplicantID} });
                resumeStore.load({ params: { "appId": applicant.getId()} });
            }

            Ext.QuickTips.init();
        }
    });

    var resumeCreated = false,
    Resume = null;
