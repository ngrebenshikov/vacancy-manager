



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
     'ResumeEducation',
     'ResumeController'],
        launch: function () {
            Ext.create('Ext.container.Viewport', {
                layout: 'fit',
                items: [
                { xtype: 'FrontEndMain' }
            ]
            });

          /*  if (UserIsAuthenticated === "False") {

                Ext.create('Ext.Window', {
                    title: 'Right Header, plain: true',
                    width: 400,
                    height: 200,
                    modal: true,
                    x: 450,
                    y: 200,
                    layout: 'fit',
                    items: {
                        border: false
                    }
                }).show(); 
            }*/
            Ext.QuickTips.init();
        }
    });

var resumeCreated = false,
    Resume = null;

