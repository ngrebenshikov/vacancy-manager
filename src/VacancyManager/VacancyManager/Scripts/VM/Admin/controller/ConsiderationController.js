Ext.define('VM.controller.ConsiderationController', {
    extend: 'Ext.app.Controller',

    stores: ['Consideration', 'Applicant', 'SearchApplicants', 'Comments', 'ApplicantMessages', 'ConsiderationStatus'],

    models: ['VM.model.Consideration', 'VM.model.SearchApplicants', 'VM.model.ApplicantMessage'],

    views: ['consideration.List', 'VM.view.Comments.List', 'Applicant.ApplicantMessages'],

    init: function () {
        this.control({
            'considerationList dataview': {
                itemclick: this.itemClick,
                itemdblclick: this.loadComments,
                itemcontextmenu: this.showMenu
            },

            'button[action=deleteConsideration]': {
                click: this.deleteConsideration
            },
            'button[action=loadBlankConsideration]': {
                click: this.loadBlankConsideration
            },
            'button[action=AddConsideration]': {
                click: this.AddConsideration
            },
            'button[action=changeStatus]': {
                click: this.changeStatus
            },
            'button[action=loadComments]': {
                click: this.loadComments
            },
            'button[action=loadMessages]': {
                click: this.loadMessages
            }
        });

    },

    createMenu: function () {
        var considerationStore = this.getConsiderationStore(),
            contextMenu = Ext.create('Ext.menu.Menu', {
                frame: false,
                width: 150,
                showSeparator: false
            });

        var statuses = this.getConsiderationStatusStore();
        statuses.each(function (conStatus) {
            statusID = conStatus.getId();
            contextMenu.add({
                text: conStatus.get('Status'),
                statusId: statusID,
                width: 145,
                handler: function (item) {
                    var rec = considerationStore.curConsideration;
                    if (rec != undefined) {
                        rec.set('ConsiderationStatusId', item.statusId);
                        rec.save();
                    }
                }
            });
        });

        return contextMenu;
    },

    changeStatus: function (button) {
        var pos = button.getPosition(false);
        contextMenu = this.createMenu();
        pos1 = pos[1] - 110;
        pos0 = pos[0] - 15;
        pos[0] = pos0;
        pos[1] = pos1;
        contextMenu.showAt(pos);
    },

    showMenu: function (view, rec, node, index, e) {
        e.stopEvent();

        contextMenu = this.createMenu();
        contextMenu.showAt(e.getXY());

        return false;
    },

    loadComments: function (button) {
        var grid = button.up('grid'),
        selectedConsideration = grid.getSelectionModel().getSelection()[0];
        if (selectedConsideration != undefined) {
            var considerationId = selectedConsideration.get('ConsiderationID')
            commentsStore = this.getCommentsStore();
            commentsStore.consideration = selectedConsideration;
            commentsStore.load({ params: { "considerationId": considerationId} });
            var wndCommentsManage = Ext.create('VM.view.Comments.Manage').show();
        }
        else
            Ext.Msg.show({
                title: 'Выберите соискателя',
                msg: 'Не выбран соискатель',
                width: 300,
                buttons: Ext.Msg.OK
            });
    },

    loadMessages: function (button) {
        fromCons = true;
        var grid = button.up('grid'),
            selectedConsideration = grid.getSelectionModel().getSelection()[0];
        if (selectedConsideration != undefined) {
            var appId = selectedConsideration.get('ApplicantID'),
                    consId = selectedConsideration.get('ConsiderationID'),
                    applicantMessagesStore = this.getApplicantMessagesStore();
            applicantMessagesStore.load({ params: { "AppId": appId, "ConsId": consId} });
            var wndapplicantMessagesManage = Ext.create('VM.view.Applicant.ApplicantMessages').show();
        }
        else
            Ext.Msg.show({
                title: 'Выберите соискателя',
                msg: 'Не выбран соискатель',
                width: 300,
                buttons: Ext.Msg.OK
            });
    },

    itemClick: function (view, record) {
        var vacancyId = record.get('VacancyID'),
            vacancyGrid = Ext.getCmp('vacancyGrid'),
            index = vacancyGrid.getStore().find('VacancyID', vacancyId),
            considerationStore = this.getConsiderationStore();
        vacancyGrid.getSelectionModel().select(index);
        considerationStore.curConsideration = record;
    },

    AddConsideration: function (button) {
        var wndconsiderationAdd = button.up('window'),
            considerationForm = wndconsiderationAdd.down('form'),
            applicantGrid = considerationForm.down('grid'),
            selectedVacancy = Ext.getCmp('vacancyGrid').getSelectionModel().getSelection()[0],
            selectedVacancyId = selectedVacancy.getId(),
            considerationStore = Ext.StoreManager.lookup('ConsiderationStore_' + selectedVacancyId);
        var selectedApplicants = applicantGrid.getSelectionModel().getSelection();
        Ext.Array.each(selectedApplicants, function (applicant) {
            newConsideration = Ext.create('VM.model.Consideration', {
                VacancyID: selectedVacancyId,
                ApplicantID: applicant.get('ApplicantID'),
                Vacancy: selectedVacancy.get('Title'),
                FullName: applicant.get('FullName')
            });
            considerationStore.insert(0, newConsideration);
        });

        considerationStore.sync();
        wndconsiderationAdd.close();
    },

    loadBlankConsideration: function (button) {
        var considerationGrid = button.up('grid'),
            vacancyGrid = Ext.getCmp('vacancyGrid'),
            searchApplicantsStore = this.getSearchApplicantsStore(),
            selectedVacancyId = considerationGrid.vacancy.getId();
        index = vacancyGrid.getStore().find('VacancyID', selectedVacancyId);
        vacancyGrid.getSelectionModel().select(index);
        Ext.create('VM.view.consideration.Add').show();
        searchApplicantsStore.load({ params: { "vacancyId": selectedVacancyId} });
    },

    deleteConsideration: function (button) {
        var grid = button.up('grid'),
            considerationStore = grid.getStore(),
            sel_consideration = grid.getView().getSelectionModel().getSelection()[0];
        if (sel_consideration != undefined) {
            Ext.Msg.show({
                title: 'Удаление соискателя',
                msg: 'Уладить соискателя "' + sel_consideration.get('FullName') + '"',
                width: 300,
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn == 'yes') {
                        if (sel_consideration) {
                            considerationStore.remove(sel_consideration);
                            considerationStore.sync();
                        }
                    }
                }
            });
        }
    }
});

