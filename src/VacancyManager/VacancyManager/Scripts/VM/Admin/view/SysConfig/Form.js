Ext.define('VM.view.SysConfig.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sysConfigForm',
    padding: '5 5 5 5',
    border: false,
    layout: {
     type : 'anchor'
    },
    style: 'background-color: #fff;',
    items:
    [{
        xtype: 'textfield',
        id: 'SysConfigName',
        name: 'Name',
        anchor: '100%',
        fieldLabel: Strings.ConfName,
        allowBlank: false
    }, {
        xtype: 'textfield',
        id: 'SysConfigValue',
        name: 'Value',
        anchor: '100%',
        fieldLabel: Strings.Value,
        allowBlank: false
    }]
})