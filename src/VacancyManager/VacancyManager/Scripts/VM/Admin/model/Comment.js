Ext.define('VM.model.Comment', {
    extend: 'Ext.data.Model',
    idProperty: 'CommentID',
    fields:
    [
      { name: 'CommentID', type: 'int', useNull: true },
      { name: 'CreationDate', type: 'date', dateFormat: 'd.m.Y' },
      { name: 'Body', type: 'string' },
      { name: 'UserID', type: 'int' },
      { name: 'UserRoles', type: 'string' },
      { name: 'CommentatorName', type: 'string' },
      { name: 'VacancyName', type: 'string' },
      { name: 'ConsiderationID', type: 'int' }

    ]
});