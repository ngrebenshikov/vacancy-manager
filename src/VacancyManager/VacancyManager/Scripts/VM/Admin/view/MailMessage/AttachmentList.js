Ext.define('VM.view.MailMessage.AttachmentList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.AttachmentList',
    autoSizeColumns: true,
    forceFit: true,
    frame: false,
    hideHeaders: true,
    layout: 'fit',
    id: 'AttachmentGrid',
    store: 'Attachment',
    columns:
      [
      {
         xtype: 'templatecolumn',
         tpl: '<img src="/Content/MIME-icons/' + '{Icon}' + '.png"/>',
         menuDisabled: true
      },
      {
          dataIndex: 'FileName',
          text: 'FileName',
          flex: 1,
          sortable: true,
          menuDisabled: true
      }, ]
});