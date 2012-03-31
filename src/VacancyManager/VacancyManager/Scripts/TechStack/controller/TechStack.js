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
          },
          {
            ref: 'TechStackData',
            selector: 'TechStackList dataview'
          }
      ],

    init: function ()
    {
      this.control({
        'viewport > TechStackList dataview': {
          itemdblclick: this.editTechStack,
          itemclick: this.loadTechList
        },
        'TechStackEdit button[action=UpdateTechStack]': {
          click: this.updateTechStack
        },
        'TechStackCreate button[action=CreateTechStack]': {
          click: this.CreateTechStack
        },
        'TechStackList button[action=AddTechnologyStack]': {
          click: this.AddTechnologyStack
        },
        'TechStackList button[action=RemoveTechnologyStack]': {
          click: this.RemoveTechnologyStack
        }
      });
    },

    AddTechnologyStack: function ()
    {
      var Create = Ext.create('TechStack.view.TechStack.Create').show();
    },

    CreateTechStack: function (button)
    {
      var win = button.up('window');
      var form = win.down('form').form;
      var newStack = Ext.create('TechStack.model.TechStack', { Name: form._fields.items[0].value});
      this.getTechStackStore().add(newStack);
      win.close();
      this.getTechStackStore().sync();
    },

    RemoveTechnologyStack: function ()
    {
      var store = this.getTechStackStore();
      //Ext.Msg.alert('Debug','Debug');
      store.remove(this.getTechStackData().getSelectionModel().getSelection()[0]);
      store.sync();
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
      var TechListInStackobj = this.application.controllers.map["TechListInStack"].changeList(id);
    }
  }
);

