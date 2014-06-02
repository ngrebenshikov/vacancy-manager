Ext.define('VM.view.User.Edit', {
      extend: 'Ext.window.Window',
      alias: 'widget.Edit',
      buttonAlign: 'center',
      requires: ['Ext.form.Panel'],
      title: 'Редактирование пользователя',
      layout: 'fit',
      autoShow: true,
      height: 300,
      width: 380,
      initComponent: function () {
          this.items = [{
              xtype: 'form',
              padding: '5 5 0 5',
              border: false,
              layout: {
                  type: 'vbox',
                  align: 'stretch'
              },
              bodyPadding: 10,
              style: 'background-color: #fff;',
              items: [
            {
                xtype: 'textfield',
                name: 'UserName',
                fieldLabel: "Пользователь",
                allowBlank: false
            }, {
                xtype: 'panel',
                flex: 1,
                bodyPadding: 5,
                border: true, 
                title: 'Роли',
                items: [{
                    xtype: 'dataview',
                    autoScroll: true, store: 'Roles',
                    tpl: '<tpl for="."><div class="DataView-list"><input type="checkbox" id="check{Name}" value="c{Name}" onclick="oncheck(id)">{Name}</div></tpl>',
                    autoHeight: false,
                    multiSelect: true, itemSelector: 'DataView-list-item',
                    emptyText: 'No data to display',
                    loadingText: 'Please Wait...',
                    style: 'background:#fff;'
                }]
            }]
          }];

          this.buttons = [{
              text: 'Сохранить',
              action: 'ChangeUser'
          }, {
              text: 'Отмена',
              scope: this,
              handler: this.close
          }];

          this.callParent(arguments);
      }
  });

VM.view.User.Edit.implement({
  CheckSelectedRoles: function ()
  {
    var form = RoleMngWindow.down("form");
    var record = form.getRecord();
    var roles = record.get("Roles");
    for (var i = 0; i < roles.length; i++)
    {
      document.getElementById("check" + roles[i]).checked = true;
    }
  }
});

function oncheck(str)
{
  changed = true;
  if (document.getElementById(str).checked)
  {
    roles.push(str.slice("check".length));
  } else
  {
    roles.splice(roles.indexOf(str.slice("check".length)), 1);
  }
}

