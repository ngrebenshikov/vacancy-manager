Ext.define('VM.ExpList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ExpList',
    height: 500,
    id: 'jobGrid',
    autoSizeColumns: true,
    frame: false,
    split: true,
    title: 'Профессиональный опыт',
    columns:
    [{
        text: 'Период',
        dataIndex: 'Period',
        sortable: false,
        menuDisabled: true,
        flex: 1
    }, {
        text: 'Место работы',
        dataIndex: 'Job',
        sortable: false,
        menuDisabled: true,
        flex: 1

    }, {
        text: 'Должность',
        dataIndex: 'Position',
        sortable: false,
        menuDisabled: true,
        flex: 1
    },
    {
        text: 'Проект',
        dataIndex: 'Project',
        sortable: false,
        menuDisabled: true,
        flex: 1
    }],

    bbar: [{
        text: 'Добавить',
        name: 'AddExp',
        id: 'btnAddExp',
        action: 'AddExpirience'
    }, {
        text: 'Редактировать',
        name: 'EditExpirience',
        id: 'btnEditExpirience',
        action: 'EditExpirience'
    }, '->',
    {
        text: 'Удалить',
        action: 'DeleteExpirience'
    }
   ]

});