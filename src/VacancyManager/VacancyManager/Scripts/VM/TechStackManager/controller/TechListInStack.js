Ext.define
('VM.controller.TechListInStack',
  {
    extend: 'Ext.app.Controller',
    stores: ['TechListInStack'],
    models: ['VM.model.TechListInStack'],
    views: ['TechListInStack.Create','TechListInStack.Edit', 'TechListInStack.List'],
    refs: [
          {
            ref: 'TechListInStackPanel',
            selector: 'panel'
          },
          {
            ref: 'TechStackData',
            selector: 'TechStackList dataview'
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
            click: this.editTech
          },
          'TechListInStackList button[action=AddTech]':
          {
            click: this.AddTech
          },
          'TechCreate button[action=CreateTech]':
          {
            click: this.CreateTech
          },
          'TechListInStackEdit button[action=UpdateTech]':
          {
            click: this.updateTech
          }
        }
      );
    },

    AddTech: function ()
    {
      if(this.getTechStackData().getSelectionModel().getSelection()[0]===undefined)
        Ext.Msg.alert('Warning', 'Tech Stack not selected');
      else
      {
        var Create = Ext.create('VM.view.TechListInStack.Create').show();
        Create.down('form').loadRecord(Ext.create('VM.model.TechListInStack', { Name: "Tech Name" }));
      }
    },

    CreateTech: function (button)
    {
      var id = this.getTechStackData().getSelectionModel().getSelection()[0].get('TechnologyStackID');
      //Ext.Msg.alert('Debug', id);
      var win = button.up('window');
      var form = win.down('form').form;
      var newTech = Ext.create('VM.model.TechListInStack', { TechnologyStackID: id,Name: form._fields.items[0].value, });
      this.getTechListInStackStore().add(newTech);
      win.close();
      this.getTechListInStackStore().sync();
    },

    editTech: function (grid, record)
    {
      var edit = Ext.create('VM.view.TechListInStack.Edit').show();
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
      panel.items.removeAll();
      store.load({params: {"id": id}});
    }
  }
);

