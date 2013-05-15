Ext.define('VM.view.consideration.ConsiderationApllicantsList', {
    extend: 'Ext.ux.LiveSearchGridPanel',
    id: 'considerationapllicantsGrid',
    alias: 'widget.considerationapllicantsList',
    store: 'ConsiderationApplicants',
    columns: [{
                 dataIndex: 'FullName',
                 text: Strings.FullName,
                 width: 200,
                 sortable: true,
                 field: { xtype: 'textfield' },
                 menuDisabled: true
              }, {
                 dataIndex: 'Requirements',
                 text: Strings.Skills,
                 width: 130,
                 sortable: false,
                 flex: 1,
                 menuDisabled: true
              }],
    height: 350,
    width: 550,
    viewConfig: {
        stripeRows: true
    }
});