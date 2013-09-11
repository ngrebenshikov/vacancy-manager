Ext.define
('VM.view.User.BanReason',
  {
    extend: 'Ext.window.Window',
    alias: 'widget.BanReason',

    requires: ['Ext.form.Panel'],

    title: 'Ban reason',
    layout: 'fit',
    autoShow: true,
    autoHeight: true,
    autoWidth:true,

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
              xtype: 'textarea',
              id: 'lastLockedOutReason',
              name: 'LastLockedOutReason',
              fieldLabel: 'Ban reason',
              allowBlank: false
            }
          ]
        }
      ];

      this.buttons =
      [
        {
          text: 'Ban',
          action: 'BanUser'
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

