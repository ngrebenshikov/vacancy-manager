
Ext.define('VM.view.consideration.ConsiderationApllicantsList', {
    extend: 'Ext.ux.LiveSearchGridPanel',
    id: 'considerationapllicantsGrid',
    alias: 'widget.considerationapllicantsList',
    store: 'Applicant',
    columns: [{
        dataIndex: 'FullName',
        text: Strings.FullName,
        width: 200,
        sortable: true,
        field: { xtype: 'textfield' },
        menuDisabled: true
    }, {
        dataIndex: 'Requirement',
        text: Strings.Skills,
        flex: 1,
        sortable: false,
        field: { xtype: 'textfield' },
        menuDisabled: true
    }],
    height: 350,
    width: 550,
    title: 'Applicants',
    viewConfig: {
        stripeRows: true
    }
});