Ext.define('VM.controller.SysConfigController',
    {
        extend: 'Ext.app.Controller',
        models: ['SysConfigModel'],
        stores: ['SysConfig'],
        views: ['SysConfig.List', 'SysConfig.Create', 'SysConfig.Edit'],

        init: function () {
            this.control({
                'SysConfigList':
                    { itemdblclick: this.UpdateForm },
                'button[action=Add]':
                    { click: this.Add },
                'button[action=Remove]':
                    { click: this.Remove },
                'button[action=CreateConf]':
                    { click: this.CreateConf },
                'button[action=Update]':
                    { click: this.Update }
            });
        },

        Add: function () {
            var win = Ext.create('VM.view.SysConfig.Create').show(),
                conf = Ext.create('VM.model.SysConfigModel', {
                    Name: 'Name',
                    Value: 'Value'
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
                Ext.getCmp('SysConfigGrid').clearSelection();
            }
        },

        UpdateForm: function (record) {
            var view = Ext.widget('SysConfigEdit');
            view.down('form').loadRecord(record);
        },

        Update: function (button) {
            var win = button.up('window'),
                form = win.down('form').getForm();

            if (form.isValid()) {
                var store = this.getSysConfigStore(),
                    rec = form.getRecord(),
                    newConf = form.getValues();

                rec.set(newConf);
                store.sync();
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