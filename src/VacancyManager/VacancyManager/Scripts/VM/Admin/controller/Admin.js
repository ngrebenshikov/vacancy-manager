Ext.define
('VM.controller.Admin',
  {
    extend: 'Ext.app.Controller',
    views: ['Admin.Main', 'vacancy.List', 'User.List'],
    refs: [],

    init: function ()
    {
      this.control(
        {

        }
      );
    }
  }
);

