
Ext.define('VM.view.applicant.ManageApplicant', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ManageApplicant',
    border: false,
    frame: true,
    padding: '5 5 5 5',
    region: 'center',
    title: 'Appp',
    style: 'background-color: #fff;',
    layout: {
        type: 'fit'
    },
    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            frame: false,
            padding: '5 5 5 5',
            style: 'background-color: #fff;',
            id: 'frmAppInfo',
            layout: {
                type: 'border'
            },

            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 100
            },

            items: [
              {
                  xtype: 'panel',
                  region: 'center',
                  border: false,
                  frame: false,
                  layout: {
                      type: 'vbox',
                      align: 'strench'
                  },
                  style: 'background-color: #fff;',
                  items: [{
                      xtype: 'fieldcontainer',
                      fieldLabel: 'ФИО',
                      style: 'background-color: #fff;',
                      defaultType: 'textfield',

                      items: [{
                          flex: 1,
                          fieldLabel: 'На русском языке',
                          id: 'ApplicantFullName',
                          name: 'FullName',
                          allowBlank: false,
                          margins: '0 0 0 5'
                      }, {
                          id: 'ApplicantFullNameEn',
                          fieldLabel: 'На английском языке',
                          name: 'FullNameEn',
                          allowBlank: true,
                          flex: 1,
                          blankText: 'Поле не может быть пустым.',
                          margins: '0 0 0 5'
                      }]
                  }, {
                      xtype: 'fieldcontainer',
                      labelStyle: 'font-weight:bold;padding:0;',

                      defaultType: 'textfield',
                      items: [{
                          xtype: 'textfield',
                          id: 'ApplicantContactPhone',
                          name: 'ContactPhone',
                          fieldLabel: Strings.ContactPhone,
                          afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                          regex: /^\+?\d+-?\d+-?\d+-?\d+-?\d+$/,
                          allowBlank: false,
                          margins: '0 0 0 5'
                      }, {
                          xtype: 'textfield',
                          fieldLabel: Strings.UserEmail,
                          id: 'ApplicantEmail',
                          name: 'Email',
                          vtype: 'email',
                          afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                          allowBlank: false,
                          margins: '0 0 0 5'
                      }]
                  }]
              },
              { xtype: 'AppReqsList',
                  region: 'east',
                  width: 300
              }]
        }],

        this.buttons = [{
            text: 'Next',
            margin: 5,
            action: 'GetApplicantInfo'
        }],
        this.callParent(arguments);

    }
});