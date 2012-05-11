Ext.define
('VM.controller.Roles',
  {
    extend: 'Ext.app.Controller',
    stores: ['Roles'],
    models: ['VM.model.Roles'],
    views: ['Roles.Create', 'Roles.List'],
    refs: [
          {
            ref: 'RolesData',
            selector: 'RolesList dataview'
          }
      ],

    init: function () {
      this.control
      (
        {
          'RolesList button[action=AddRole]':
          {
            click: this.AddRole
          },
          'RolesList button[action=RemoveRole]':
          {
            click: this.RemoveRole
          },
          'RoleCreate button[action=CreateRole]':
          {
            click: this.CreateRole
          }
        }
      );
    },

    AddRole: function () {
      var Create = Ext.create('VM.view.Roles.Create').show();
      Create.down('form').loadRecord(Ext.create('VM.model.Roles', { Name: "Role Name" }));
    },

    CreateRole: function (button) {
      var store = this.getRolesStore();
      var win = button.up('window');
      var form = win.down('form');
      var rec = form.getRecord();
      var newRole = form.getValues();
      store.add(newRole);
      win.close();
    },

    RemoveRole: function () {
      var store = this.getRolesStore();
      var id = this.getRolesData().getSelectionModel().getSelection()[0].get("Name");
      store.remove(this.getRolesData().getSelectionModel().getSelection()[0]);
    }
  }
);

