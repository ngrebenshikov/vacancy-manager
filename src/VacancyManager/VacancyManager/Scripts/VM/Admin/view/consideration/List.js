
Ext.define('VM.view.consideration.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.considerationList',
    height: 200,
    border: true,
    vacancy: undefined,
    padding: '5 0 0 0',
    frame: false,
    initComponent: function () {

        this.columns = [{
            text: Strings.FullName,
            sortable: true,
            menuDisabled: true,
            width: 150,
            dataIndex: 'FullName'
        }, {
            text: 'Текст комментария',
            flex: 1,
            sortable: false,
            menuDisabled: true,
            dataIndex: 'LastCommentBody'
        }, {
            text: 'Комментариев',
            align: 'center',
            width: 120,
            sortable: false,
            menuDisabled: true,
            dataIndex: 'CommentsCount'
        }, {
            text: 'Статус заявки',
            width: 140,
            align: 'center',
            sortable: false,
            menuDisabled: true,
            dataIndex: 'Status'
        }];

        this.bbar = [{
            text: Strings.btnAddConsideration,
            action: 'loadBlankConsideration'
        }, {
            text: Strings.btnCommentsView,
            action: 'loadComments'
        }, {
            text: 'Почтовые сообщения',
            action: 'loadMessages'
        }, '-', {
            text: 'Изменить статус',
            action: 'changeStatus'
        }, '->', {
            text: Strings.btnDeleteConsideration,
            action: 'deleteConsideration'
        }];

        this.callParent(arguments);
    }
});
