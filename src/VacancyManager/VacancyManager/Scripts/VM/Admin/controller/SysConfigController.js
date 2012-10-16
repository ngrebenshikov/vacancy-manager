Ext.define('VM.controller.SysConfigController',
    {
        extend: 'Ext.app.Controller',
        models: ['SysConfigModel'],
        stores: ['SysConfig'],
        views: ['SysConfig.List', 'SysConfig.Create'],

        init: function () {
            this.control({
                'SysConfigList dataview':
                    { itemclick: this.ButtonDisabler },
                'button[action=Add]':
                    { click: this.Add },
                'button[action=Remove]':
                    { click: this.Remove },
                'button[action=CreateConf]':
                    { click: this.CreateConf }
            });
        },

        Add: function () {
            var win = Ext.create('VM.view.SysConfig.Create').show(),
                conf = Ext.create('VM.model.SysConfigModel', {
                    Name: 'Имя параметра',
                    Value: 'Значение параметра'
                });
            win.down('form').loadRecord(Ext.create('VM.model.SysConfigModel', conf));
        },

        CreateConf: function (button) {
            var store = this.getSysConfigStore();
                win = button.up('window');
                form = win.down('form');
                rec = form.getRecord();
                newConf = form.getValues();

            store.add(newConf);
            win.close();
        },

        Remove: function (button) {
            var grid = button.up('grid'),
                store = this.getSysConfigStore(),
                selection = grid.getView().getSelectionModel().getSelection()[0];

            //            var store = this.getSysConfigStore();
            //            var id = this.getSysConfigData().getSelectionModel().getSelection()[0].get("Name");
            store.remove(selection);
        }
    }
);