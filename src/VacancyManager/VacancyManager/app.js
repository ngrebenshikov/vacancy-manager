Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'VM',

    controllers: ['VacancyController'],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'vacancylist'
                }
            ]
        });
    }
});

  