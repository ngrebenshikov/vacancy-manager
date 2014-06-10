
Ext.define('VM.model.Consideration', {
    extend: 'Ext.data.Model',
    idProperty: 'ConsiderationID',
    fields: [
         { name: 'ConsiderationID', type: 'int', usenull: true },
         { name: 'VacancyID', type: 'int' },
         { name: 'ApplicantID', type: 'int' },
         { name: 'ConsiderationStatusId', type: 'int' },
         { name: 'Status', type: 'string', persist: false },
         { name: 'FullName', type: 'string' }, 
         { name: 'LastCommentDate', type: 'date', dateFormat: 'd.m.Y' },
         { name: 'LastCommentBody', type: 'string', persist: false },
         { name: 'CommentsCount', type: 'int', persist: false },
         { name: 'Email', type: 'string' },
         { name: 'Vacancy', type: 'string' }
    ],

    changeComment: function (newValue) {
        var c = this.get('CommentsCount');
        this.set('LastCommentBody', newValue);
        this.set('CommentsCount', c + 1);
    },

    proxy: {
        type: 'ajax',
        api: {
            read: '/Considerations/Load',
            create: '/Considerations/Create',
            update: '/Considerations/Update',
            destroy: '/Considerations/Delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            listful: true,
            writeAllFields: true,
            allowSingle: false,
            root: 'considerations'
        }
    }
});