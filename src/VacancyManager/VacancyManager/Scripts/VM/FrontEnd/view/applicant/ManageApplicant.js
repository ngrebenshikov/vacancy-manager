
Ext.define('VM.view.applicant.ManageApplicant', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ManageApplicant',
    border: true,
    id: 'frmManageApplicant',
    region: 'west',
    title: 'Информация о соискателе',
    layout: {
        type: 'anchor'
    },
    width: 220,
    bodyPadding: '5 5 5 5',
    initComponent: function () {

        this.items = [{
            xtype: 'fieldset',
            title: 'ФИО',
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'На русском языке',
                id: 'ApplicantFullName',
                name: 'FullName',
                width: 180,
                labelAlign: 'top',
                allowBlank: false,
                margins: '0 0 0 5'
            }, {
                id: 'ApplicantFullNameEn',
                fieldLabel: 'На английском языке',
                name: 'FullNameEn',
                labelAlign: 'top',
                allowBlank: true,
                width: 180,
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
                width: 200,
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
                width: 200,
                name: 'Email',
                vtype: 'email',
                afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Обязательный реквизит">*</span>',
                allowBlank: false,
                margins: '0 0 0 5'
            }]
        }];

        this.callParent(arguments);

    }
});