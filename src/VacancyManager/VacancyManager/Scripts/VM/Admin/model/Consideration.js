
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
                     name: 'UserFullName',
                     type: 'string'
                 }, {
                     name: 'LastCommentDate',
                     type: 'string'
                 }, {
                     name: 'LastCommentBody',
                     type: 'string'
                 }, {
                     name: 'CommentsCount',
                     type: 'int'
                 }

        ]
});