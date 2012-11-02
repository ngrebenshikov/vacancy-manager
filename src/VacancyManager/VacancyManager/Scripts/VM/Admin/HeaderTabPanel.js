Ext.define
  ("VM.HeaderTabPanel",
    {
      extend: 'Ext.tab.Panel',
      topButtons: null,

      addTopButton: function (buttonConfig)
      {
        var button = Ext.ComponentMgr.create(buttonConfig, 'button');
        var buttonDiv = Ext.DomHelper.insertFirst(this.header,
        { tag: "div", style: "height:15px;float:right;margin-top:-3px;margin-left:3px;" }, true);
        button.render(buttonDiv);
      },
      onRender: function (ct, position)
      {
        //this.superclass.onRender.apply(this, arguments);
        if (this.topButtons != null)
        {
          if (Ext.isArray(this.topButtons))
          {
            for (var idx = 0; idx < this.topButtons.length; idx++)
            {
              this.addTopButton(this.topButtons[idx]);
            }
          }
          else
          {
            this.addTopButton(this.topButtons);
          }
        }
      }
    }
  );