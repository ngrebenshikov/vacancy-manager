Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'VM.Shared': '/Scripts/VM/Shared'
    }
});

Ext.Loader.setPath('Ext.ux', '/ExtLib/ux');
Ext.require('Ext.ux.CheckColumn');

Ext.application({
    name: 'VM',
    appFolder: '/Scripts/VM/FrontEnd',
    stores: [
     'Resume',
     'ResumeRequirement',
     'ResumeEducation'],
    controllers: [
     'FrontEnd',
     'ResumeExperience',
     'ResumeEducation'],
    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                { xtype: 'FrontEndMain' }
            ]
        });

        Ext.QuickTips.init();
    }
});

var resumeCreated = false,
    Resume = null;

