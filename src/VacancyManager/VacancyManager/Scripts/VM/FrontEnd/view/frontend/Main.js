Ext.define('VM.view.frontend.Main', {
    extend: 'Ext.form.Panel',
    layout: {
        type: 'border'
    },
    height: 250,
    width: 400,
    alias: 'widget.FrontEndMain',
    bodyPadding: 10,
    title: 'My Form',

    initComponent: function () {
        var me = this;
        me.items = [
          { xtype: 'WizardMenu' },
          { xtype: 'WizardPanel'}
        ],
        me.callParent(arguments);
    }

});