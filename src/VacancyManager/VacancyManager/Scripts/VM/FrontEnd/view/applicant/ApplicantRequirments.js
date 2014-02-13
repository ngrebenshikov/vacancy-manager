Ext.define('VM.view.applicant.ApplicantRequirments', {
    extend: 'VM.Shared.ReqsList',
    requires: ['VM.Shared.ReqsList'],
    alias: 'widget.AppReqsList',
    id: 'appReqsGrid',
    store: 'ApplicantRequirement',
    listeners: {
        'render': function (grid, fn) {
            me = grid;
            store = me.getStore();
            store.load({ params: { "id": -1} });
        }
    }
});