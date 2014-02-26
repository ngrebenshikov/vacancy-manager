Ext.define('VM.view.MailMessage.ConsiderationAssignList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ConsiderationAssignList',
    id: 'considerationAssignGrid',
    height: 250,
    border: true,
    padding: '5 0 0 0',
    hideHeaders: true,
    forceFit: true,
    store: 'ConsiderationAssign',
    frame: false,
    columns: [
            {
                text: Strings.FullName,
                sortable: true,
                width: 150,
                dataIndex: 'Vacancy'
            }
        ]
});
