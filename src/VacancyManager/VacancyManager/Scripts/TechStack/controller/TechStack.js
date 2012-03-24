Ext.define
('TechStack.controller.TechStack',
  {
    extend: 'Ext.app.Controller',
    stores: ['TechStack'],
    models: ['TechStack'],
    views: ['TechStack.view.TechStack.Edit', 'TechStack.view.TechStack.List'],
    refs: [
          {
            ref: 'TechStackPanel',
            selector: 'panel'
          }
      ],

    init: function ()
    {
      this.control({
        'viewport > TechStackList dataview': {
          itemdblclick: this.editTechStack,
          itemclick: this.loadTechList
        },
        'TechStackEdit button[action=save]': {
          click: this.updateTechStack
        }
      });
    },

    editTechStack: function (grid, record)
    {
      var edit = Ext.create('TechStack.view.TechStack.Edit').show();
      edit.down('form').loadRecord(record);
    },

    updateTechStack: function (button)
    {
      var win = button.up('window'),
              form = win.down('form'),
              record = form.getRecord(),
              values = form.getValues();
      record.set(values);
      win.close();
      this.getTechStackStore().sync();
    },

    loadTechList: function (grid, record)
    {
      var id = record.get("TechnologyStackID");
      id--;
      var TechListInStackobj = this.application.controllers.map["TechListInStack"].changeList(id);
    }
  }
);

