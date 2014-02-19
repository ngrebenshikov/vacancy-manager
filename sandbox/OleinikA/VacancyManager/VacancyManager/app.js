Ext.Loader.setConfig({ enabled: true });
//Ext.require('Ext.container.Viewport');
Ext.application({
    name: 'AM',

    controllers: [
        'Users'
    ],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'userlist'
                }
            ]
        });
    }
});

  