Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'VM.Shared': '/Scripts/VM/Shared'
    }
});

var 
  createWCons = false,
  fromCons = false,
  resumeCreated = false;

Ext.Loader.setPath('Ext.ux', 'ExtLib/ux');

Ext.require([
    'Ext.ux.CheckColumn',
    'Ext.toolbar.Paging'
]);

Ext.application({
    name: 'VM',
    appFolder: '/Scripts/VM/Admin',

    stores: [
    'ResumeRequirement',
    'ResumeExperience',
    'ResumeEducation'
    ],

    controllers: [
      'Admin',
      'RequirementStack',
      'ConsiderationController',
      'RequirementListInStack',
      'VacancyController',
      'ResumeController',
      'CommentsController',
      'UserController',
      'Roles',
      'SysConfigController',
      'ApplicantController',
      'MailMessageController',
      'ResumeExperience',
      'ResumeEducation'
    ],
    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
             { xtype: 'AdminMain' }
          ]
        });

        Ext.QuickTips.init();
    }
});

var PreviousRequest = new Array();
var Login_window_Created = false;

Ext.Ajax.on('requestexception', function (conn, response, options)
{
  if (!response.status)
    return;
  switch (response.status)
  {
    case 401:
      PreviousRequest.push(response.request.options);
      if (Login_window_Created)
        return;
      CreateLoginWindow();
      break;
    default:
      Ext.Msg.alert('Error', result.message + 'Refresh the browser page or tabe page');
      break;
  }
});

Ext.Ajax.on('requestcomplete', function (connection, response) {
    try {
        if (response.responseText) {
            var result = Ext.JSON.decode(response.responseText);
            /*var title;
            if (result.success)
            title = 'Запрос успешно завершён';
            else
            title = 'Ошибка при выполении запроса';
            Ext.MessageBox.show(
            {
            title: title,
            msg: result.message,
            minWidth: 200,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
            }
            );*/
            if (!result.success) {
                Ext.MessageBox.show({
                    title: 'Ошибка при выполении запроса',
                    msg: result.message,
                    minWidth: 200,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    } catch (err) {
    }
});

function onLoginButtonClick(login_form, login_window)
{
  Ext.Ajax.request
  (
    {
      url: '../../VMUser/ExtJSLogOn',
      params:
      {
        login: login_form.getForm().getValues().login,
        password: login_form.getForm().getValues().password
      },
      success: function (result, request)
      {
        var JsonResult = Ext.JSON.decode(result.responseText);
        if (!JsonResult.success)
        {
          Ext.MessageBox.show(
            {
              title: 'Error',
              msg: JsonResult.LogOnResult,
              minWidth: 200,
              buttons: Ext.MessageBox.OK,
              icon: Ext.MessageBox.WARNING
            });
          Login_window_Created = false;
        }
        else
        {
          for (var i = 0; i < PreviousRequest.length; i++)
          {
            Ext.Ajax.request(PreviousRequest[i]);
          }
          PreviousRequest = new Array();
          Login_window_Created = false;
          login_window.close();
        }
      }
    }
  );
}



function CreateLoginWindow() {
    Login_window_Created = true;

  var login_form =
    new Ext.form.FormPanel(
      {
        labelWidth: 55,
        frame: true,
        defaultType: 'textfield',
        items:
          [
            {
              fieldLabel: 'Login',
              name: 'login',
              anchor: '100%'
            },
            {
              fieldLabel: 'Password',
              name: 'password',
              inputType: 'password',
              anchor: '100%',
              listeners: {
                scope: this,
                specialkey: function (f, e)
                {
                  if (e.getKey() == e.ENTER)
                  {
                      onLoginButtonClick(login_form, login_window);
                  }
                }
              }
            }
          ]
  });

  var login_window =
    new Ext.Window(
      {
        title: 'Login form',
        width: 300,
        height: 150,
        layout: 'fit',
        modal: true,
        plain: true,
        closable: false,
        bodyStyle: 'padding:5px;',
        items: login_form,
        buttons:
        [
          {
            text: 'Login',
            handler: function ()
            {
              onLoginButtonClick(login_form, login_window);
            }
          }
        ]
      });
  login_window.show();
}