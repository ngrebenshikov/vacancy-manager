Ext.define('VM.view.Applicant.List',
{
    extend: 'Ext.grid.Panel',
    alias: 'widget.ApplicantList',
    region: 'center',
    id: 'ApplicantGrid',
    autoSizeCoulms: true,
    forceFit: true,
    split: true,
    frame: false,
    //title: Strings.ApplicantList,
    store: 'Applicant',

    initComponent: function () {
        Ext.apply(this,
        {
            columns: [{
                dataIndex: 'FullName',
                text: Strings.FullName,
                width: 40,
                sortable: true,
                field: { xtype: 'textfield' },
                menuDisabled: true
            }, {
                dataIndex: 'Requirements',
                text: Strings.Skills,
                width: 120,
                sortable: false,
                field: { xtype: 'textfield' },
                menuDisabled: true
            },/* {
                dataIndex: 'ContactPhone',
                text: 'Контактный телефон',
                width: 120,
                sortable: false,
                field: { xtype: 'textfield' },
                menuDisabled: true
            }, {
                dataIndex: 'Email',
                text: 'E-mail',
                width: 120,
                sortable: true,
                field: { xtype: 'textfield' },
                menuDisabled: true
            }*/],

            tbar: [{
                text: Strings.btnAdd,
                icon: '/ExtLib/resources/icons/user_add.gif',
                tooltip: 'Добавить нового соискателя',
                name: 'btnCreateApplicant',
                id: 'CreateApplicant',
                action: 'CreateApplicantShowForm'
            }, {
                text: Strings.btnRemove,
                icon: '/ExtLib/resources/icons/user_delete.gif',
                tooltip: 'Удалить выбранного соискателя',
                name: 'btnRemoveApplicant',
                id: 'RemoveApplicant',
                action: 'RemoveApplicant',
                disabled: true
            }],

            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'Applicant',
                dock: 'bottom',
                displayInfo: true
            }],

            listeners: {
                selectionchange: function (view, selections, options) {
                    var button = Ext.getCmp('RemoveApplicant'); //Ищет по ID компонента
                    if (selections != null)
                        button.enable();
                }
            }
        });

        this.callParent(arguments);
    }
}); 