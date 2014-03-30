Ext.define('VM.view.RequirementStack.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.RequirementStackList',
    requires: ['Ext.toolbar.Toolbar'],
    title: Strings.RequirementStackList,
    collapsible: true,
    animCollapse: true,
    autoSizeColumns: true,
    forceFit: true,
    store: 'RequirementStack',
    minSize: 100,
    maxSize: 500,
    columns: [
              {
                  dataIndex: 'Name',
                  text: Strings.TitleRequirementStackName,
                  width: 180,
                  sortable: true,
                  menuDisabled: true
              }, {
                  dataIndex: 'NameEn',
                  text: Strings.TitleRequirementStackNameEn,
                  width: 180,
                  sortable: true,
                  menuDisabled: true
              }
              ],
    bbar:
          [{
              text: Strings.btnAddRequirementStack,
              action: 'AddRequirementStack'
          },
          {
              text: Strings.btnRemoveRequirementStak,
              action: 'RemoveRequirementStack'
          }
        ]
});

