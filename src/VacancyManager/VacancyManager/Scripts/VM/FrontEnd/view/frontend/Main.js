Ext.define('VM.view.frontend.Main', {
    extend: 'Ext.form.Panel',
    requires: ['VM.Shared.WizardPanel'],
    layout: {
        type: 'border'
    },
    alias: 'widget.FrontEndMain',
    bodyPadding: 10,
    title: 'My Form',

    initComponent: function () {
        var me = this;
        me.hbuttons = [{
            text: "Выход",
            handler: function () {

                Ext.Ajax.request({
                    url: '../../User/ExtJSLogOff',
                    success: function (result, request) {

                        UserIsAuthenticated = false;
                        var appReqStore = Ext.StoreManager.lookup('ApplicantRequirement'),
                            resumeStore = Ext.StoreManager.lookup('Resume');

                        var appForm = Ext.getCmp('frmManageApplicant').getForm();
                        appForm.reset();

                        appReqStore.removeAll(false);
                        resumeStore.removeAll(false);
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
           text: 'Save',
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

