Ext.define
('VM.controller.RequirementStack',
  {
    extend: 'Ext.app.Controller',
    stores: ['RequirementStack'],
    models: ['VM.model.RequirementStack'],
    views: ['RequirementStack.Create', 'RequirementStack.Edit', 'RequirementStack.List'],
    refs: [
          {
            ref: 'RequirementStackPanel',
            selector: 'panel'
          },
          {
            ref: 'RequirementStackData',
            selector: 'RequirementStackList dataview'
          }
      ],
      
    init: function ()
    {
      this.control(
        {
          'RequirementStackList dataview':
          {
            itemdblclick: this.editRequirementStack,
            itemclick: this.loadRequirementList
          },
          'RequirementStackEdit button[action=UpdateRequirementStack]':
          {
            click: this.updateRequirementStack
          },
          'RequirementStackCreate button[action=CreateRequirementStack]':
          {
            click: this.CreateRequirementStack
          },
          'RequirementStackList button[action=AddRequirementStack]':
          {
            click: this.AddRequirementStack
          },
          'RequirementStackList button[action=RemoveRequirementStack]':
          {
            click: this.RemoveRequirementStack
          }
        }
      );
    },

    AddRequirementStack: function ()
    {
      var create = Ext.create('VM.view.RequirementStack.Create').show();
      var record = Ext.create('VM.model.RequirementStack', { Name: "Stack Name" });
      create.down('form').loadRecord(record);
    },

    CreateRequirementStack: function (button)
    {
      var store = this.getRequirementStackStore();
      var win = button.up('window');
      var form = win.down('form');
      var rec = form.getRecord();
      var newStack = form.getValues();
      store.add(newStack);
      win.close();
    },

    RemoveRequirementStack: function ()
    {
      var store = this.getRequirementStackStore();
      var id = this.getRequirementStackData().getSelectionModel().getSelection()[0].get("RequirementStackID");
      store.remove(this.getRequirementStackData().getSelectionModel().getSelection()[0]);
      this.application.controllers.map["RequirementListInStack"].changeList(id);
    },

    editRequirementStack: function (grid, record)
    {
      var edit = Ext.create('VM.view.RequirementStack.Edit').show();
      edit.down('form').loadRecord(record);
    },

    updateRequirementStack: function (button)
    {
      var win = button.up('window'),
              form = win.down('form'),
              record = form.getRecord(),
              values = form.getValues();
      record.set(values);
      win.close();
    },

    loadRequirementList: function (grid, record)
    {
      var id = record.get("RequirementStackID");
      var RequirementListInStackobj = this.application.controllers.map["RequirementListInStack"].changeList(id);
    }
  }
);

