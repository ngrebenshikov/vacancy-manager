
Ext.define('VM.model.Consideration', {
    extend: 'Ext.data.Model',
    idProperty: 'ConsiderationID',
    fields: [
                 {
                     name: 'ConsiderationID',
                     type: 'int',
                     usenull: true
                 }, {
                     name: 'VacancyID',
                     type: 'int'
                 }, {
                     name: 'ApplicantID',
                     type: 'int'
                 }, {
                     name: 'FullName',
                     type: 'string'
                 }, {
                     name: 'LastCommentDate',
                     type: 'date',
                     dateFormat: 'd.m.Y'
                 }, {
                     name: 'LastCommentBody',
                     type: 'string'
                 }, {
                     name: 'CommentsCount',
                     type: 'int'
                 }

        ]
});