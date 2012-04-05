Ext.define
('VM.controller.TechStack',
  {
    extend: 'Ext.app.Controller',
    stores: ['TechStack'],
    models: ['VM.model.TechStack'],
    views: ['TechStack.Create', 'TechStack.Edit', 'TechStack.List'],
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
      this.control(
        {
          'viewport > TechStackList dataview':
          {
            itemdblclick: this.editTechStack,
            itemclick: this.loadTechList
          },
          'TechStackEdit button[action=UpdateTechStack]':
          {
            click: this.updateTechStack
          },
          'TechStackCreate button[action=CreateTechStack]':
          {
            click: this.CreateTechStack
          },
          'TechStackList button[action=AddTechnologyStack]':
          {
            click: this.AddTechnologyStack
          },
          'TechStackList button[action=RemoveTechnologyStack]':
          {
            click: this.RemoveTechnologyStack
          }
        }
      );
    },

    AddTechnologyStack: function ()
    {
      var Create = Ext.create('VM.view.TechStack.Create').show();
      Create.down('form').loadRecord(Ext.create('VM.model.TechStack', { Name: "Stack Name" }));
    },

    CreateTechStack: function (button)
    {
      var win = button.up('window');
      var form = win.down('form').form;
      var newStack = Ext.create('VM.model.TechStack', { Name: form._fields.items[0].value });
      win.close();
      this.getTechStackStore().add(newStack);
      this.getTechStackStore().sync();
      //Следующая строка по идее не должна тут быть
      //Но по неведомым мне причинам ExtJS стал отказываться получать ID стека после добавления
      this.getTechStackStore().load();
    },

    RemoveTechnologyStack: function ()
    {
      var store = this.getTechStackStore();
      var id = this.getTechStackData().getSelectionModel().getSelection()[0].get("TechnologyStackID");
      //Ext.Msg.alert('Debug','Debug');
      store.remove(this.getTechStackData().getSelectionModel().getSelection()[0]);
      store.sync();
      this.application.controllers.map["TechListInStack"].changeList(id);
    },

    editTechStack: function (grid, record)
    {
      var edit = Ext.create('VM.view.TechStack.Edit').show();
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

