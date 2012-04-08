Ext.define
('VM.view.Admin.Main',
  {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AdminMain',
    title: 'Admin',
    /*split: true,
    margins: '5 0 0 0',
    cmargins: '5 5 0 0',*/

    initComponent: function ()
    {
      Ext.apply
      (this,
        {
          items:
          [
            {
              xtype: "tabpanel",
              items: [{
                title: "Вакансии",
                html: "<iframe src=\"../Vacancy/\" width=\"100%\" height=\"100%\" frameborder=\"0\">Браузер не понимает тег iframe</iframe>"
              }, {
                title: "Технологии",
                html: "<iframe src=\"ViewTechnologyStack/\" width=\"100%\" height=\"100%\" frameborder=\"0\">Браузер не понимает тег iframe</iframe>"
              }],
              activeTab: 0
            }
          ]
        }
      );
      this.callParent(arguments);
    }
  }
);
