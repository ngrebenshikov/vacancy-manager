Ext.define('VM.view.consideration.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.considerationList',
    region: 'center',
    height: 180,
    border: false,
    padding: '5 0 0 0',
    autoSizeColumns: true,
    autoHeight: true,
    forceFit: true,
    frame: false,
    split: true,
    columns: [
            {
                text: 'UserFullName',
                sortable: false,
                dataIndex: 'UserFullName'
            }, {
                text: 'LastCommentBody',
                flex: 1,
                width: 200,
                sortable: false,
                dataIndex: 'LastCommentBody'
            }, {
                text: 'Дата комментария',
                width: 120,
                sortable: true,
                dataIndex: 'LastCommentDate'
            }, {
                text: 'Всего комментариев',
                align: 'center',
                width: 120,
                sortable: true,
                dataIndex: 'CommentsCount'
            }
        ],
    bbar: [{
        text: 'New Consideration',
        name: 'btnLAddConsideration',
        id: 'AddConsideration',
        action: 'addConsideration' 
    }, {
        text: 'Edit Consideration',
        name: 'btnEditConsideration',
        id: 'EditConsideration',
        action: 'editConsideration' 
    },
    {
        text: 'Delete Consideration',
        action: 'deleteConsideration'
    }
   ],
    title: 'Considerations'
});
