
Ext.define('VM.view.consideration.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.considerationEdit',
    title: 'Edit consideration',
    height: 450,
    width: 650,
    autoShow: true,
    modal: true,
    layout: 'fit',
    buttonAlign: 'center',
    initComponent: function () {
        this.items =
      [
        {
            xtype: 'form',
            padding: '5 5 0 5',
            border: false,
            style: 'background-color: #fff;',
            items:
          [
          ]
        }
      ];

        this.buttons =
      [
       {
           text: 'Cancel',
           scope: this,
           handler: this.close
       }
      ];

        this.callParent(arguments);
    }
});