Ext.define('VM.view.Resume.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.resumeList',
    id: 'ApplicantRes',
    store: 'Resume',
    columns: [{
        text: 'Дата',
        dataIndex: 'Date',
        align: 'center',
        sortable: false,
        menuDisabled: true,
        width: 100
    }, {
        text: 'Язык резюме',
        dataIndex: 'LanquageID',
        sortable: false,
        align: 'center',
        menuDisabled: true,
        flex: 1,
        renderer: function (value) {
            var cssPrefix = Ext.baseCSSPrefix,
               Lang = 'Русский';
            if (value == 2) {
                Lang = 'English';
            }
            return Lang;
        }
    }, {
        text: 'Интервал',
        dataIndex: 'StartDate',
        sortable: false,
        align: 'center',
        menuDisabled: true,
        flex: 1
    }, {
        text: 'Статус',
        dataIndex: 'StatusID',
        sortable: false,
        align: 'center',
        menuDisabled: true,
        flex: 1,
        renderer: function (value) {
            var cssPrefix = Ext.baseCSSPrefix,
               LockStatus = 'Заполнение';
            if (value == 2) {
                LockStatus = 'Проверено';
            }
            return LockStatus;
        }
    }, {
        xtype: 'actioncolumn',
        width: 30,
        align: 'center',
        sortable: false,
        menuDisabled: true,
        items: [{
            icon: '/Content/icons/pdfico.png',
            tooltip: 'Создать pdf',
            handler: function (grid, rowIndex, colIndex) {
                var resumeStore = grid.getStore();
                var record = resumeStore.getAt(rowIndex);
                window.open('/Resume/CreatePdfCopy/' + record.getId());
            }
        }]
    }, {
        xtype: 'actioncolumn',
        width: 30,
        align: 'center',
        sortable: false,
        menuDisabled: true,
        items: [{
            icon: '/Content/icons/CopyIco.png',
            tooltip: 'Клонировать резюме',
            handler: function (grid, rowIndex, colIndex) {
                var resumeStore = grid.getStore();
                var record = resumeStore.getAt(rowIndex);
                Ext.Ajax.request({
                    url: '../../Resume/CreateResumeCopy/' + record.getId(),
                    success: function (result, request) {
                        var JsonResult = Ext.JSON.decode(result.responseText);
                        var newResume = Ext.create('VM.model.Resume', {
                            ResumeId: JsonResult.resume.ResumeId,
                            Position: JsonResult.resume.Position,
                            Summary: JsonResult.resume.Summary,
                            LanquageID: JsonResult.resume.LanquageID,
                            StartDate: JsonResult.resume.StartDate,
                            Training: JsonResult.resume.Training,
                            Date: JsonResult.resume.Date
                        });
                        resumeStore.insert(0, newResume);
                    }
                });
            }
        }]
    }],

    bbar: [
    {
        text: Strings.btnAdd,
        icon: '/Content/icons/add.gif',
        name: 'btnAdd',
        id: 'AddResumeToApplicant',
        action: 'CreateResume'
    }, {
        text: 'Редактировать',
        name: 'btnEditResume',
        id: 'editResume',
        action: 'EditResume'
    }, {
        text: 'Принять резюме',
        name: 'btnAcceptOrRejectResume',
        resumeStatus: 1,
        id: 'btn_AcceptOrRejectResume',
        disabled: true,
        action: 'AcceptOrRejectResume',
        updateTextStatus: function (status) {
            me = this;
            var text = ' Принять резюме ';
            if (status == 2) { text = ' Отклонить резюме '; }
            me.resumeStatus = status;
            me.setText(text);
        }
    }, '->', {
        text: Strings.btnRemove,
        icon: '/Content/icons/delete.gif',
        name: 'btnRemove',
        id: 'RemoveResume',
        action: 'RemoveResume',
        disabled: true
    }],

    listeners: {
        selectionchange: function (view, selections, options) {
            var button = Ext.getCmp('RemoveResume');
            if (selections != null) {
                button.enable();
            }

        }
    },

    viewConfig: {
        // autoScroll: true,
        loadingText: 'Загрузка резюме...'
    }
});