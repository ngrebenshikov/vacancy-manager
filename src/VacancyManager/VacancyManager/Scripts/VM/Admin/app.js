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
    launch: function ()
    {
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

var PreviousRequest;

Ext.Ajax.on('requestcomplete', function (connection, response)
{
  try
  {
    if (response.responseText)
    {
      var result = Ext.JSON.decode(response.responseText);
      if (result.success === false)
      {
        switch (result.message)
        {
          case '401':
            PreviousRequest = response.request.options;
            login_form = new Ext.form.FormPanel(
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
            login_window = new Ext.Window(
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
                  handler: function ()
                  {
                    login_window.getEl().mask('Login...');
                    Ext.Ajax.request(
                    {
                      url: '../../Account/ExtJSLogOn',
                      params:
                      { login: login_form.getForm().getValues().login,
                        password: login_form.getForm().getValues().password
                      },
                      success: function (result, request)
                      {
                        var JsonResult = Ext.JSON.decode(result.responseText);
                        if (JsonResult.LogOnResult != '')
                        {
                          Ext.MessageBox.show(
                          {
                            title: 'Error',
                            msg: JsonResult.LogOnResult,
                            minWidth: 200,
                            bottons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                          });
                          login_window.getEl().unmask(true);
                        }
                        else
                        {
                          //Повторение предыдущего запроса(пока только одного)
                          //Нужно протестировать, возможно из PreviousRequest нужно сделать массив
                          Ext.Ajax.request(PreviousRequest);
                          login_window.close();
                        }
                      }
                    });
                  }
                },
                { text: 'Cancel',
                  handler: function () { login_window.close(); }
                }
              ]
            });
            login_window.show();
            break;
            Ext.Msg.alert('Error', result.message);
        }
      }
    }
  } catch (err)
  {
  }
});