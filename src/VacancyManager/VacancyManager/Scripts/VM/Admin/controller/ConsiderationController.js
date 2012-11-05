
Ext.define('VM.controller.ConsiderationController', {

    extend: 'Ext.app.Controller',

    stores: ['Consideration'],

    models: ['VM.model.Consideration'],

    views: ['consideration.List'],

    init: function () {
        this.control(
                {
                    'considerationList dataview': {
                        //    expandbody: this.loadcons,
                        // collapsebody: this.destroygrid//,
                        itemclick: this.selRecord
                    },
                    'button[action = deleteConsideration]': {
                        click: this.deleteConsideration
                    },
                    'button[action = addConsideration]': {
                        click: this.addConsideration
                    }
                });

    },
    selRecord: function (view, model) {
        //   console.log(view);
        //   view.getSelectionModel().deselectAll();
    },

    addConsideration: function (button) {
        var compcmp = Ext.getCmp('ConsiderationsGrid1').down('button');
        console.log(compcmp);

    },

    deleteConsideration: function (button) {
        var grid = button.up('grid'),
            considerationStore = grid.getStore(),
            sel_consideration = grid.getView().getSelectionModel().getSelection()[0];
        Ext.Msg.show({
            title: 'Удаление соискателя',
            msg: 'Уладить соискателя "' + sel_consideration.get('UserFullName') + '"',
            width: 300,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    if (sel_consideration) {
                        considerationStore.remove(sel_consideration)
                    }
                }
            }
        });
    }
});

