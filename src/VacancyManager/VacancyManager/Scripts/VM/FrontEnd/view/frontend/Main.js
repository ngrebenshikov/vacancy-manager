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
        me.items = [
          { xtype: 'ManageApplicant' },
          { xtype: 'ApplicantDopInfo' }
        ],

       me.buttons = [{ 
           text: 'Save',
           margin: '5 5 5 2'
       }],

        me.callParent(arguments);
    }

});