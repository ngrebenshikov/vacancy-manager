Ext.define
('VM.controller.RequirementListInStack',
  {
    extend: 'Ext.app.Controller',
    stores: ['RequirementListInStack'],
    models: ['VM.model.RequirementListInStack'],
    views: ['RequirementListInStack.Create','RequirementListInStack.Edit', 'RequirementListInStack.List'],
    refs: [
          {
            ref: 'RequirementListInStackPanel',
            selector: 'panel'
          },
          {
            ref: 'RequirementStackData',
            selector: 'RequirementStackList dataview'
          }
      ],

    init: function ()
    {
      this.control
      (
        {
          'RequirementListInStackList dataview':
          {
            itemdblclick: this.editRequirement
          },
          'RequirementListInStackEdit button[action=save]':
          {
            click: this.editRequirement
          },
          'RequirementListInStackList button[action=AddRequirement]':
          {
            click: this.AddRequirement
          },
          'RequirementCreate button[action=CreateRequirement]':
          {
            click: this.CreateRequirement
          },
          'RequirementListInStackEdit button[action=UpdateRequirement]':
          {
            click: this.updateRequirement
          }
        }
      );
    },

    AddRequirement: function ()
    {
      if(this.getRequirementStackData().getSelectionModel().getSelection()[0]===undefined)
        Ext.Msg.alert('Warning', 'Requirement Stack not selected');
      else
      {
        var Create = Ext.create('VM.view.RequirementListInStack.Create').show();
        Create.down('form').loadRecord(Ext.create('VM.model.RequirementListInStack', { Name: "Requirement Name" }));
      }
    },

    CreateRequirement: function (button)
    {
      var id = this.getRequirementStackData().getSelectionModel().getSelection()[0].get('RequirementStackID');
      var win = button.up('window');
      var form = win.down('form').form;
      var newRequirement = Ext.create('VM.model.RequirementListInStack', { RequirementStackID: id,Name: form._fields.items[0].value, });
      this.getRequirementListInStackStore().add(newRequirement);
      win.close();
    },

    editRequirement: function (grid, record)
    {
      var edit = Ext.create('VM.view.RequirementListInStack.Edit').show();
      edit.down('form').loadRecord(record);
    },

    updateRequirement: function (button)
    {
      var win = button.up('window'),
              form = win.down('form'),
              record = form.getRecord(),
              values = form.getValues();
      record.set(values);
      win.close();
    },

    changeList: function (id)
    {
      var store = this.getRequirementListInStackStore();
      var panel = this.getRequirementListInStackPanel();
      panel.items.removeAll();
      store.load({params: {"id": id}});
    }
  }
);

