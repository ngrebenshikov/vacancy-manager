﻿Ext.define('VM.view.Applicant.WestPanel', {
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
            fieldLabel: 'На русском языке',
            labelAlign: 'top',
            name: 'FullName',
            allowBlank: false,
            anchor: '100%',
            blankText: 'Поле не может быть пустым.'
        },
        {
            xtype: 'textfield',
            labelAlign: 'top',
            fieldLabel: 'На английском языке',
            name: 'FullNameEn',
            allowBlank: true,
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
            name: 'Email',
            anchor: '100%',
            vtype: 'email',
            vtypeText: 'Поле должно соответствовать формату "mail@example.com".'
        }]
    }, {
		xtype: 'fieldset',
        title: Strings.Employed,
        collapsible: false,
        autoWidth: true,
        autoHeight: true,
        items:
        [{ 
            xtype: 'checkbox',
            name: 'Employed',
            boxLabel: 'Трудоустроен',
            checked: 'true'
		}]
	}]
})          

/*        xtype: 'form',
        id: 'applicantCreateForm',
        border: false,
        style: 'background-color: #fff;',
        layout: 'border',*/