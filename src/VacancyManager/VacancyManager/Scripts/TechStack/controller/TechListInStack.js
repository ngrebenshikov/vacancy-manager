Ext.define
('TechStack.controller.TechListInStack',
  {
    extend: 'Ext.app.Controller',
    stores: ['TechListInStack'],
    models: ['TechListInStack'],
    views: ['TechListInStack.Edit', 'TechListInStack.List'],
    refs: [
          {
            ref: 'TechListInStackPanel',
            selector: 'panel'
          }
      ],

    init: function ()
    {
      this.control
      (
        {
          'viewport > TechListInStackList dataview':
          {
            itemdblclick: this.editTech
          },
          'TechListInStackEdit button[action=save]':
          {
            click: this.updateTech
          }
        }
      );
    },

    editTech: function (grid, record)
    {
      var edit = Ext.create('TechStack.view.TechListInStack.Edit').show();

      edit.down('form').loadRecord(record);
    },

    updateTech: function (button)
    {
      var win = button.up('window'),
              form = win.down('form'),
              record = form.getRecord(),
              values = form.getValues();

      record.set(values);
      win.close();
      this.getTechListInStackStore().sync();
    },

    changeList: function (id)
    {
      var store = this.getTechListInStackStore();
      var panel = this.getTechListInStackPanel();
      store.load({
        params: {
          "id": id
        }
      });
      //Ext.Msg.alert('Debug', 'Debug msg');
      /*Ext.Ajax.request
      (
      {
      url: "../TechnologyStack/TechListInStack?id=" + id,
      success: function (response, opts)
      {
      Ext.Msg.alert("Debug", response.responseText);
      },
      failure: function (response, opts)
      {

      }
      }
      );*/
    }
  }
);
