﻿Ext.define('VM.view.consideration.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.considerationList',
    height: 180,
    border: false,
    vacancy: undefined,
    padding: '5 0 0 0',
    autoSizeColumns: true,
    autoHeight: true,
    forceFit: true,
    frame: false,
    split: true,
    columns: [
            {
                text: Strings.FullName,
                sortable: true,
                width: 150,
                dataIndex: 'FullName'
            }, {
                text: 'Текст комментария',
                flex: 1,
                width: 200,
                sortable: false,
                dataIndex: 'LastCommentBody'
            }, {
                text: 'Дата комментария',
                width: 120,
                xtype: 'datecolumn',
                format: 'd.m.Y',
                align: 'center',
                sortable: false,
                dataIndex: 'LastCommentDate'
            }, {
                text: 'Комментариев',
                align: 'center',
                width: 120,
                sortable: false,
                dataIndex: 'CommentsCount'
            }
        ],
    bbar:
     [{
        text: Strings.btnAddConsideration,
        action: 'loadBlankConsideration' 
    }, {
        text: Strings.btnCommentsView,
        action: 'loadComments' 
    },
    {
        text: Strings.btnDeleteConsideration,
        action: 'deleteConsideration'
    }
   ],
});
