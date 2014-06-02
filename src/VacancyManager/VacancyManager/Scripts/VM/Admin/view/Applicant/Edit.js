Ext.define('VM.view.Applicant.Edit',
{
    extend: 'Ext.window.Window',
    alias: 'widget.applicantEdit',

    requires:
    [
        'Ext.tab.*',
        'Ext.window.*',
        'Ext.tip.*',
        'Ext.layout.container.Border',
        'VM.view.Applicant.WestPanel',
        'VM.view.Applicant.CenterPanel'
    ],

    title: Strings.ApplicantEdit,
    height: 480,
    width: 730,
    autoShow: true,
    maximizable: true,
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
            text: Strings.btnSave,
            icon: '/ExtLib/resources/icons/accept.gif',
            action: 'EditApplicant',
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