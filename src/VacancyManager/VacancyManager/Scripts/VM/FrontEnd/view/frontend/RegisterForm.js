﻿
Ext.define('VM.view.frontend.RegisterForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.registerForm',
    modal: true,
    frame: true,
    border: true,
    closable: false,
    frameHeader: false,
    draggable: false,
    height: 400,
    width: 430,
    style: 'background-color: #fff;',
    autoShow: true,
    layout: 'fit',
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: '5',
                buttonAlign: 'center',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                title: 'Регистрация соискателя',
                border: false,
                style: 'background-color: #fff;',
                items: [{
                    xtype: 'fieldset',
                    title: 'Сведения учетной записи',
                    anchor: '100%',
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: 'Логин',
                        id: 'txtUserName',
                        name: 'UserName',
                        anchor: '100%',
                        allowBlank: false,
                        margins: '0 0 0 5'
                    }, {
                        inputType: 'password',
                        id: 'pwdUserPassword',
                        fieldLabel: 'Пароль',
                        name: 'UserPassword',
                        allowBlank: false,
                        anchor: '100%',
                        blankText: 'Поле не может быть пустым.',
                        margins: '0 0 0 5'
                    }, {
                        inputType: 'password',
                        id: 'pwdСonfirmedUserPassword',
                        fieldLabel: 'Повторите пароль',
                        name: 'СonfirmedUserPassword',
                        allowBlank: false,
                        anchor: '100%',
                        blankText: 'Поле не может быть пустым.',
                        margins: '0 0 0 5'
                    }]
                }, {
                    xtype: 'fieldset',
                    title: 'ФИО',
                    anchor: '100%',
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: 'На русском языке',
                        id: 'ApplicantFullName',
                        name: 'FullName',
                        anchor: '100%',
                        allowBlank: false,
                        margins: '0 0 0 5'
                    }, {
                        id: 'ApplicantFullNameEn',
                        fieldLabel: 'На английском языке',
                        name: 'FullNameEn',
                        allowBlank: true,
                        anchor: '100%',
                        blankText: 'Поле не может быть пустым.',
                        margins: '0 0 0 5'
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    padding: '5 5 5 5',
                    anchor: '100%',
                    defaultType: 'textfield',
                    items: [{
                        xtype: 'textfield',
                        id: 'ApplicantContactPhone',
                        name: 'ContactPhone',
                        anchor: '100%',
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
                        anchor: '100%',
                        vtype: 'email',
                        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                        allowBlank: false,
                        margins: '0 0 0 5'
                    }]
                }],

                buttons: [{
                    text: 'Регистрация',
                    margins: '10',
                    handler: function (button) {
                        var form = this.up('form').getForm(),
                            values = Ext.JSON.encode(form.getValues());
                        regwnd = this.up('form').up('window');

                        var box = Ext.MessageBox.wait('Регицистрация пользователя', 'Выполняем операции!!');
                        Ext.Ajax.request({
                            url: '/Account/Register',
                            params: { "regForm": values },
                            success: function (result, request) {

                                var data = Ext.JSON.decode(result.responseText),
                                   created = data.info.Item1,
                                   message = data.info.Item2;
                                if (created === true) {
                                    box.close();
                                    regwnd.close();
                                }
                                else {
                                    alert(message);
                                    box.close();
                                }
                            }
                        });

                    }
                }, {
                    text: 'Отмена',
                    margins: '10',
                    scope: this,
                    handler: this.close
                }]
            }],


        this.callParent(arguments);
    }
});