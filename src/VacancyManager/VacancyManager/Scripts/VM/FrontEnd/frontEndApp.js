
function LogIn() {
    var form = login_window.down('form').getForm(),
        values = form.getValues();
    Ext.Ajax.request({
        url: '../../User/ExtJSLogOn',
        params:
        {
            login: values.login,
            password: values.password
        },
        success: function (result, request) {
            var appReqStore = Ext.StoreManager.lookup('ApplicantRequirement');
            appReqStore.load({ params: { "id": -1} }); 
            login_window.close();
        }
    });
};

var login_window = new Ext.Window({
    //   title: 'Авторизация',
    width: 300,
    height: 130,
    modal: true,
    frame: true,
    frameHeader: false,
    draggable: false,
    closable: false,
    layout: 'fit',
    items: {
        xtype: 'form',
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
                           LogIn();
                      }
                  }
              }
          }],
        buttons: [{
            text: 'Вход',
            margins: '5 5 5 5',
            handler: function (button) {
                LogIn();
            }
        }]
    }
});


Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'VM.Shared': '/Scripts/VM/Shared'
    }
});

    Ext.Loader.setPath('Ext.ux', '/ExtLib/ux');
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

            if (UserIsAuthenticated === "False") {
                login_window.show();
            }

            Ext.QuickTips.init();
        }
    });

var resumeCreated = false,
    Resume = null;

