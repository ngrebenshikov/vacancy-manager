﻿Ext.define('VM.view.Applicant.Create',
{
    extend: 'Ext.window.Window',
    alias: 'widget.applicantCreate',

    requires: 
    [
        'Ext.tab.*',
        'Ext.window.*',
        'Ext.tip.*',
        'Ext.layout.container.Border',
        'VM.view.Applicant.WestPanel',
        'VM.view.Applicant.CenterPanel'
    ],

    title: Strings.ApplicantNew,
    height: 450,
    width: 650,
    autoShow: true,
    modal: true,
    buttonAlign: 'center',
    layout: 'border',
    resizable: true,
    initComponent: function () {
        this.items =
        [{
            xtype: 'westPanel'
        }, {
            xtype: 'centerPanel'        
        }],
        
        this.buttons =
        [{
            text: Strings.btnAdd,
            id: 'btnAddApplicant',
            icon: '/ExtLib/resources/icons/accept.gif',
            action: 'CreateApplicant',
            listeners: {
                mouseover: {
                    fn: function () {
                        this.focus();
                    }
                }
            }
        }, {
            text: 'Отмена',
            scope: this,
            handler: function (button) {
                wnd = button.up('window');
                wnd.close();
            }
        }],

        this.callParent(arguments);
    }
})