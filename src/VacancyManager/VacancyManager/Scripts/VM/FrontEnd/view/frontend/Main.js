Ext.define('VM.view.frontend.Main', {
    extend: 'Ext.panel.Panel',
    requires: ['VM.Shared.WizardPanel'],
    layout: {
        type: 'border'
    },
    alias: 'widget.FrontEndMain',
    bodyPadding: 20,
    bodyStyle: 'background-image: Url(/Content/icons/square.gif);',
    title: 'Соискатель',
    margins: '20 60 20 60',
    frame: true,
    initComponent: function () {
        var me = this;
        me.hbuttons = [{
            text: "Выход",
            handler: function () {
                Ext.Ajax.request({
                    url: '../../VMUser/ExtJSLogOff',
                    success: function (result, request) {

                        UserIsAuthenticated = false;

                        var appgrid = Ext.getCmp('applicantConsiderationsGrid');

                        var appForm = Ext.getCmp('frmManageApplicant').getForm();
                        appForm.reset();
                        var appReqStore = Ext.StoreManager.lookup('ApplicantRequirement'),
                            resumeStore = Ext.StoreManager.lookup('Resume'),
                            appConsStore = Ext.StoreManager.lookup('ApplicantConsideration');
                        CreateLoginWindow();
                    }
                });
            }
        }],

        me.items = [
          { xtype: 'ManageApplicant' },
          { xtype: 'ApplicantDopInfo' }
        ],

       me.buttons = [{
           text: 'Сохранить',
           action: 'SaveApplicant',
           margin: '5 5 5 2'
       }],

        me.callParent(arguments);
        this.on("render", this.addHeaderButtons, this);
    },

    addHeaderButtons: function (panel) {
        var header = this.getHeader();
        if (panel.hbuttons) {
            for (var i = 0; i < panel.hbuttons.length; i++) {
                header.add(new Ext.button.Button({
                    text: panel.hbuttons[i].text,
                    handler: panel.hbuttons[i].handler
                }));
            }
        }
    }

});

