Ext.define('VM.model.SysConfigModel',
    {
        extend: 'Ext.data.Model',
        idProperty: 'Id',
        fields: ['Id', 'ConfigGroup','Name', 'Value']
    }
);