Ext.define('VM.controller.SysConfigController', {
    extend: 'Ext.app.Controller',
    models: ['SysConfigModel'],
    stores: ['SysConfig'],
    views: ['SysConfig.List', 'SysConfig.Create', 'SysConfig.Edit'],

    init: function () {
        this.control({
            'SysConfigList':
                    { itemdblclick: this.UpdateForm,
                        selectionchange: this.Click
                    },

            'button[action=Add]':
                    { click: this.Add },
            'button[action=Remove]':
                    { click: this.Remove },
            'button[action=refreshSysConfigList]':
                    { click: this.refreshSysConfigList },
            'button[action=CreateConf]':
                    { click: this.CreateConf },
            'button[action=Update]':
                    { click: this.Update }
        });
    },

    Click: function (view, records) {
        var btn = Ext.getCmp('btnRemoveSysConfig');
        btn.disable();
        if (records[0].get('ConfigGroup') === 'Пользовательские параметры') {
               btn.enable();
        }
    },

    refreshSysConfigList: function (button) {
        sysConfigStore = this.getSysConfigStore();
        sysConfigStore.load();
    },

    Add: function () {
        var win = Ext.create('VM.view.SysConfig.Create').show(),
                conf = Ext.create('VM.model.SysConfigModel', {
                    Name: 'Name',
                    Value: 'Value',
                    ConfigGroup: 'Пользовательские параметры'
                });
        win.down('form').loadRecord(conf);
    },

    CreateConf: function (button) {
        var win = button.up('window'),
                form = win.down('form').getForm();
        if (form.isValid()) {
            var store = this.getSysConfigStore(),
                    newConf = form.getValues();
            store.add(newConf);
            win.close();
        }
    },

    UpdateForm: function () {
        var view = Ext.widget('SysConfigEdit');
        var record = Ext.getCmp('SysConfigGrid').getSelectionModel().getSelection();
        view.down('form').loadRecord(record[0]);
    },

    Update: function (button) {
        var win = button.up('window'),
                form = win.down('form').getForm();

        if (form.isValid()) {
            var store = this.getSysConfigStore(),
                    rec = form.getRecord(),
                    newConf = form.getValues();

            rec.set(newConf);
            win.close();
        }
    },

    Remove: function (button) {
        var grid = Ext.getCmp('SysConfigGrid'),
                store = this.getSysConfigStore(),
                selection = grid.getView().getSelectionModel().getSelection()[0];

        if (selection != null) {
            store.remove(selection);
            Ext.getCmp('Remove').disable();
        }
    }
}
);