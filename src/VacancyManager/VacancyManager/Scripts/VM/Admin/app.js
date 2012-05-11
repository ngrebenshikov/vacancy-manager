Ext.Loader.setConfig
(
  {
    enabled: true
  }
);

Ext.Loader.setPath('Ext.ux', 'ExtLib/ux');

Ext.application
(
  {
    name: 'VM',
    appFolder: '/Scripts/VM/Admin',
    controllers:
    [
      'Admin',
      'RequirementStack',
      'RequirementListInStack',
      'VacancyController',
      'UserController',
      'Roles'
    ],
    launch: function () {
      Ext.create('Ext.container.Viewport',
      {
        layout: 'fit',
        items:
        [
          { xtype: 'AdminMain' }
        ]
      }
      );
    }
  }
);

var PreviousRequest = new Array();
var Login_window_Created = false;

Ext.Ajax.on('requestcomplete', function (connection, response) {
  try {
    if (response.responseText) {
      var result = Ext.JSON.decode(response.responseText);
      if (result.success === false) {
        switch (result.message) {
          case '401':
            PreviousRequest.push(response.request.options);
            if (Login_window_Created)
              return;
            Login_window_Created = true;
            var login_form = new Ext.form.FormPanel(
              {
                labelWidth: 55,
                frame: true,
                defaultType: 'textfield',
                items:
                  [
                    { fieldLabel: 'Login', name: 'login', anchor: '100%' },
                    { fieldLabel: 'Password', name: 'password', inputType: 'password', anchor: '100%' }
                  ]
              });
            var login_window = new Ext.Window(
              {
                title: 'Login form',
                width: 300,
                height: 150,
                layout: 'fit',
                plain: true,
                closable: false,
                bodyStyle: 'padding:5px;',
                items: login_form,
                buttons:
                  [
                    { text: 'Login',
                      handler: function () {
                        //login_window.getEl().mask('Login...');
                        Ext.Ajax.request(
                          {
                            url: '../../Account/ExtJSLogOn',
                            params:
                              { login: login_form.getForm().getValues().login,
                                password: login_form.getForm().getValues().password
                              },
                            success: function (result, request) {
                              var JsonResult = Ext.JSON.decode(result.responseText);
                              if (JsonResult.LogOnResult != '') {
                                Ext.MessageBox.show(
                                  {
                                    title: 'Error',
                                    msg: JsonResult.LogOnResult,
                                    minWidth: 200,
                                    bottons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                  });
                                login_window.getEl().unmask(true);
                                Login_window_Created = false;
                              }
                              else {
                                for (var i = 0; i < PreviousRequest.length; i++) {
                                  Ext.Ajax.request(PreviousRequest[i]);
                                }
                                PreviousRequest = new Array();
                                Login_window_Created = false;
                                login_window.close();
                              }
                            }
                          });
                      }
                    },
                    { text: 'Cancel',
                      handler: function () {
                        Login_window_Created = false; login_window.close();
                      }
                    }
                  ]
              });
            login_window.show();
            break;
          default:
            Ext.Msg.alert('Error', result.message+'Refresh the browser page or tabe page');
            break;
        }
      }
    }
  } catch (err) {
  }
});