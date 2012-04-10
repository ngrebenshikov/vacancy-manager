Ext.define('VM.store.Vacancy', {
    extend: 'Ext.data.Store',
    model: 'VM.model.Vacancy',
    id : 'VacancyStore',
    autoLoad: true,
    autoSync: true,
    autoSave: true,
        proxy: {
        type: 'ajax',
        api: {//Потом вставить сюда прямые ссылки(типа http://BlaBlaBla/Vacancy/*)
        //Убрал Vacancy/ из ссылок на время пока не сделаю нормальную админку
            read: 'Load',
            create: 'Create',
            update: 'Update',
            destroy: 'Delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            getRecordData: function (record) {
                return { 'data': Ext.JSON.encode(record.data) };
            }
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});