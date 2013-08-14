Ext.define('VM.view.Applicant.WestPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.westPanel',
    region: 'west',
    border: false,
    id: 'applicantInfoForm',
    width: 180,
    padding: '5 5 5 5',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    style: 'background-color: #fff;',
    items:
    [{
        xtype: 'fieldset',  // ФИО
        title: Strings.FullName,
        collapsible: false,
        autoWidth: true,
        autoHeight: true,
        items:
        [{
            xtype: 'textfield',
            id: 'ApplicantFullName',
            name: 'FullName',
            allowBlank: false,
            anchor: '100%',
            blankText: 'Поле не может быть пустым.'
        }]
    }, {
        xtype: 'fieldset',  // Контактный телефон
        title: Strings.ContactPhone,
        collapsible: false,
        autoWidth: true,
        autoHeight: true,
        items:
        [{
            xtype: 'textfield',
            id: 'ApplicantContactPhone',
            name: 'ContactPhone',
            anchor: '100%',
            maxLength: 16,
            enforceMaxLength: true,
            regex: /^\+?\d+-?\d+-?\d+-?\d+-?\d+$/,
            regexText: 'Поле может содержать только цифры и знаки "+" и "-".'
        }]
    }, {
        xtype: 'fieldset',  // E-mail
        title: Strings.UserEmail,
        collapsible: false,
        autoWidth: true,
        autoHeight: true,
        items:
        [{
            xtype: 'textfield',
            id: 'ApplicantEmail',
            name: 'Email',
            anchor: '100%',
            vtype: 'email',
            vtypeText: 'Поле должно соответствовать формату "mail@example.com".'
        }]
    }]
})          

/*        xtype: 'form',
        id: 'applicantCreateForm',
        border: false,
        style: 'background-color: #fff;',
        layout: 'border',*/