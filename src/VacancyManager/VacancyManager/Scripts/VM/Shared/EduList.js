Ext.define('VM.EduList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.EduList',
    height: 500,
    id: 'eduGrid',
    autoSizeColumns: true,
    frame: false,
    split: true,
    title: 'Образование',
    columns:
    [{
        text: 'Период',
        dataIndex: 'Period',
        sortable: false,
        menuDisabled: true,
        flex: 1
    }, {
        text: 'Учебное заведение',
        dataIndex: 'Job',
        sortable: false,
        menuDisabled: true,
        flex: 1

    }, {
        text: 'Кафедра',
        dataIndex: 'Position',
        sortable: false,
        menuDisabled: true,
        flex: 1
    },
       {
           text: 'Специальность',
           dataIndex: 'Project',
           sortable: false,
           menuDisabled: true,
           flex: 1
       }]

});