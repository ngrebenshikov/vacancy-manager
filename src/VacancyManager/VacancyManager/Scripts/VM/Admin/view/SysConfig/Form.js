Ext.define('VM.view.SysConfig.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sysConfigForm',
    padding: '5 5 5 5',
    border: false,
    style: 'background-color: #fff;',
    items:
    [{
        xtype: 'textfield',
        id: 'SysConfigName',
        name: 'Name',
        fieldLabel: Strings.ConfName,
        allowBlank: false,
        vtype: 'alphanum'
    }, {
        xtype: 'textfield',
        id: 'SysConfigValue',
        name: 'Value',
        fieldLabel: Strings.Value,
        allowBlank: false
    }]
})