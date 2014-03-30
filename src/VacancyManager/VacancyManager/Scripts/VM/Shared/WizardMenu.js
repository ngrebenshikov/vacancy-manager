Ext.define('VM.Shared.WizardMenu', {
    extend: 'Ext.form.Panel',
    alias: 'widget.WizardMenu',
    region: 'west',
    border: true,
    bodyPadding: 5,
    split: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
       { xtype: 'container',
           layout: {
               type: 'hbox'
           },
           items: [
           { xtype: 'image',
               width: 16,
               margin: 1,
               id: 'imgItem1',
               src: '/Content/icons/unchecked.gif'
           },
           { xtype: 'button',
               tabIndex: 1,
               id: 'Item1',
               pressed: true,
               text: 'Основная информация', toggleGroup: '1', scale: 'small', enableToggle: true, flex: 1, margin: '0 0 1 0',
               handler: function (button) {
                   var wizard = Ext.getCmp('wizard');
                   wizard.getLayout().setActiveItem('step-' + button.tabIndex);
               }
           }
         ]
       }, { xtype: 'container',
           layout: 'hbox',
           items: [
           { xtype: 'image',
               margin: 1,
               width: 16,
               id: 'imgItem2',
               src: '/Content/icons/unchecked.gif'
           },
           { xtype: 'button',
             tabIndex: 2,
             id: 'Item2',
             disabled: true,
             text: 'Компетенция', toggleGroup: '1', scale: 'small', enableToggle: true, flex: 1, margin: '0 0 1 0',
             handler: function (button) {
                 var wizard = Ext.getCmp('wizard');
                 wizard.getLayout().setActiveItem('step-' + button.tabIndex);
             } 
         }]
       }, { xtype: 'container',
           layout: 'hbox',
           items: [
           { xtype: 'image',
               width: 16,
               id: 'imgItem3',
               margin: 1,
               src: '/Content/icons/unchecked.gif'
           },
           { xtype: 'button',
               tabIndex: 3,
               id: 'Item3',
               disabled: true,
               text: 'Профессональный опыт', toggleGroup: '1', scale: 'small', enableToggle: true, flex: 1, margin: '0 0 1 0',
               handler: function (button) {
                   var wizard = Ext.getCmp('wizard');
                   wizard.getLayout().setActiveItem('step-' + button.tabIndex);
               } 
           }
         ]
       }, { xtype: 'container',
           layout: 'hbox',
           items: [
           { xtype: 'image',
               width: 16,
               margin: 1,
               id: 'imgItem4',
               src: '/Content/icons/unchecked.gif'
           },
           { xtype: 'button',
               tabIndex: 4,
               id: 'Item4',
               disabled: true,
               text: 'Образование', toggleGroup: '1', scale: 'small', enableToggle: true, flex: 1, margin: '0 0 1 0',
               handler: function (button) {
                   var wizard = Ext.getCmp('wizard');
                   wizard.getLayout().setActiveItem('step-' + button.tabIndex);
               } 
           }
         ]
       }, { xtype: 'container',
           layout: 'hbox',
           items: [
           { xtype: 'image',
               margin: 1,
               width: 16,
               id: 'imgItem5',
               src: '/Content/icons/unchecked.gif'
           },
           { xtype: 'button',
               tabIndex: 5,
               id: 'Item5',
               disabled: true,
               text: 'Дополнительно', toggleGroup: '1', scale: 'small', enableToggle: true, flex: 1, margin: '0 0 1 0',
               handler: function (button) {
                   var wizard = Ext.getCmp('wizard');
                   wizard.getLayout().setActiveItem('step-' + button.tabIndex);
               }
           }
         ]
       }

   ]
});
