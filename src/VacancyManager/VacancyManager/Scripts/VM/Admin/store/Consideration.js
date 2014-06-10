Ext.define('VM.store.Consideration', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.Consideration',
    id: 'ConsiderationStore',
    curConsideration: null,
    activeVacancy: undefined,
    autoLoad: false,
    autoSync: false,
    autoSave: true,
    getVacancy: function () {
        return this.vacancy;
    }
});