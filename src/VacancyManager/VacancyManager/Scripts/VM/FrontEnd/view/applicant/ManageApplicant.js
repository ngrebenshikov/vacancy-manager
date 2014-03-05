
Ext.define('VM.view.applicant.ManageApplicant', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ManageApplicant',
    border: true,
    region: 'west',
    title: 'Appp',
    layout: {
        type: 'anchor'
    },
    width: 200,
    bodyPadding: '5 5 5 5',
    initComponent: function () {

        this.items = [{
            xtype: 'fieldset',
            title: 'ФИО',
            style: 'background-color: #fff;',
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'На русском языке',
                id: 'ApplicantFullName',
                name: 'FullName',
                labelAlign: 'top',
                allowBlank: false,
                margins: '0 0 0 5'
            }, {
                id: 'ApplicantFullNameEn',
                fieldLabel: 'На английском языке',
                name: 'FullNameEn',
                labelAlign: 'top',
                allowBlank: true,
                blankText: 'Поле не может быть пустым.',
                margins: '0 0 0 5'
            }]
        }, {
            xtype: 'fieldcontainer',
            labelStyle: 'font-weight:bold;padding:0;',
            padding: '5 5 5 5',
            defaultType: 'textfield',
            items: [{
                xtype: 'textfield',
                id: 'ApplicantContactPhone',
                name: 'ContactPhone',
                labelAlign: 'top',
                fieldLabel: Strings.ContactPhone,
                afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                regex: /^\+?\d+-?\d+-?\d+-?\d+-?\d+$/,
                allowBlank: false,
                margins: '0 0 0 5'
            }, {
                xtype: 'textfield',
                fieldLabel: Strings.UserEmail,
                id: 'ApplicantEmail',
                labelAlign: 'top',
                name: 'Email',
                vtype: 'email',
                afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                allowBlank: false,
                margins: '0 0 0 5'
            }]
        }],

        this.callParent(arguments);

    }
});