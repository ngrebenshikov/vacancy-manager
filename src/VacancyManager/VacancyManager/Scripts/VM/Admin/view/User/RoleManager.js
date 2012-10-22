Ext.define
('VM.view.User.RoleManager',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.RoleManager',

    requires: ['Ext.form.Panel'],

    title: 'Role manager',
    layout: 'fit',
    autoShow: true,
    height: 300,
    width: 280,

    initComponent: function ()
    {
      this.items =
      [
        {
          xtype: 'form',
          padding: '5 5 0 5',
          border: false,
          style: 'background-color: #fff;',
          items:
          [
            {
              xtype: 'displayfield',
              name: 'UserName',
              allowBlank: false
            },
            {
              xtype: 'dataview',
              autoScroll: true, store: 'Roles',
              tpl: '<tpl for="."><div class="DataView-list"><input type="checkbox" id="check{Name}" value="c{Name}" onclick="oncheck(id)">{Name}</div></tpl>',
              autoHeight: false, height: 265,
              multiSelect: true, itemSelector: 'DataView-list-item',
              emptyText: 'No data to display',
              loadingText: 'Please Wait...',
              style: 'border:1px solid #99BBE8;background:#fff;'
            }
          ]
        }
      ];

      this.buttons =
      [
        {
          text: 'Change roles',
          action: 'ChangeRoles'
        },
        {
          text: 'Cancel',
          scope: this,
          handler: this.close
        }
      ];

      this.callParent(arguments);
    }
  }
);

VM.view.User.RoleManager.implement({
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

