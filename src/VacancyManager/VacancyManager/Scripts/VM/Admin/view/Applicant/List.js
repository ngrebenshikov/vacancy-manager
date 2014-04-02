Ext.define('VM.view.Applicant.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ApplicantList',
    region: 'center',
    id: 'ApplicantGrid',
    autoSizeCoulms: true,
    split: true,
    frame: false,
    store: 'Applicant',
    viewConfig: {
        id: 'Applicantgv',
        loadingText: 'Загрузка соискателей...'
    },
    initComponent: function () {
        Ext.apply(this, {
            columns: [{
                dataIndex: 'FullName',
                text: Strings.FullName,
                width: 150,
                sortable: false,
                menuDisabled: true
            }, {
                dataIndex: 'Requirements',
                text: Strings.Skills,
                flex: 1,
                width: 120,
                sortable: false,
                menuDisabled: true
            }, {
                dataIndex: 'ContactPhone',
                text: 'Контактный телефон',
                width: 120,
                sortable: false,
                menuDisabled: true
            }, {
                dataIndex: 'Email',
                text: 'E-mail',
                width: 150,
                sortable: false,
                menuDisabled: true
            }],

            bbar: [{
                text: Strings.btnAdd,
                icon: '/Content/icons/add.gif',
                tooltip: 'Добавить нового соискателя',
                name: 'btnCreateApplicant',
                id: 'CreateApplicant',
                action: 'CreateApplicantShowForm'
            }, {
                text: 'Обновить',
                icon: '/Content/icons/refresh.gif',
                name: 'btnRefreshApplicantList',
                id: 'RefreshApplicantList',
                action: 'refreshApplicantList'
            }, '->', {
                text: Strings.btnRemove,
                icon: '/Content/icons/delete.gif',
                tooltip: 'Удалить выбранного соискателя',
                name: 'btnRemoveApplicant',
                id: 'RemoveApplicant',
                action: 'RemoveApplicant',
                disabled: true
            }],

            listeners: {
                selectionchange: function (view, selections, options) {
                    var button = Ext.getCmp('RemoveApplicant');
                    if (selections != null)
                        button.enable();
                }
            }
        });

        this.callParent(arguments);
    }
}); 