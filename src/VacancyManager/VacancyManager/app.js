Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'AM',

    controllers: ['VakancyController'],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'vakancylist'
                }
            ]
        });
    }
});

  