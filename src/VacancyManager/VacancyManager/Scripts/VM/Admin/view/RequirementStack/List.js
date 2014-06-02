Ext.define('VM.view.RequirementStack.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.RequirementStackList',
    requires: ['Ext.toolbar.Toolbar'],
    title: Strings.RequirementStackList,
    collapsible: true,
    animCollapse: true,
    frame: true,
    width: 400,
    margins: '0 10 0 0',
    store: 'RequirementStack',
    minSize: 100,
    maxSize: 500,
    columns: [{
        dataIndex: 'Name',
        text: Strings.TitleRequirementStackName,
        width: 180,
        flex: 1,
        sortable: true,
        menuDisabled: true
    }, {
        dataIndex: 'NameEn',
        text: Strings.TitleRequirementStackNameEn,
        width: 180,
        sortable: true,
        menuDisabled: true
    }],
    bbar: [{
        text: Strings.btnAddRequirementStack,
        icon: '/Content/icons/add.gif',
        action: 'AddRequirementStack'
    }, '->', {
        text: Strings.btnRemoveRequirementStak,
        icon: '/Content/icons/delete.gif',
        action: 'RemoveRequirementStack'
    }]
});

