
Ext.define('VM.controller.ConsiderationController', {

    extend: 'Ext.app.Controller',

    stores: ['Consideration', 'Applicant'],

    models: ['VM.model.Consideration'],

    views: ['consideration.List', 'VM.view.consideration.ConsiderationApllicantsList'],

    init: function () {
        this.control(
                { 'considerationList dataview': {
                    itemclick: this.itemClick
                },

                    'button[action = deleteConsideration]': {
                        click: this.deleteConsideration
                    },
                    'button[action = loadBlankConsideration]': {
                        click: this.loadBlankConsideration
                    },
                    'button[action = AddConsideration]': {
                        click: this.AddConsideration
                    }
                });

    },

    itemClick: function (view, record) {
        vacancyId = record.get('VacancyID');
        vacancyGrid = Ext.getCmp('vacancyGrid');
        var index = vacancyGrid.getStore().find('VacancyID', vacancyId);
        vacancyGrid.getSelectionModel().select(index);
    },

    AddConsideration: function (button) {
        var wndconsiderationAdd = button.up('window'),
            considerationForm = wndconsiderationAdd.down('form'),
            applicantGrid = considerationForm.down('grid'),
            selectedVacancy = Ext.getCmp('vacancyGrid').getSelectionModel().getSelection()[0],
            selectedVacancyId = selectedVacancy.getId(),
            applicantStore = this.getApplicantStore(),
            considerationStore = Ext.StoreManager.lookup('Consideration' + selectedVacancyId),
            selectedApplicant = applicantGrid.getSelectionModel().getSelection()[0];
        if (selectedApplicant != undefined) {
            newConsideration = Ext.create('VM.model.Consideration', {
                VacancyID: selectedVacancyId,
                ApplicantID: selectedApplicant.get('ApplicantID'),
                FullName: selectedApplicant.get('FullName')
            });

            considerationStore.insert(0, newConsideration);
            wndconsiderationAdd.close();
        }
        else
            alert('Выберите соискателя');

    },

    loadBlankConsideration: function (button) {
        var considerationGrid = button.up('grid'),
            vacancyGrid = Ext.getCmp('vacancyGrid'),
            index = vacancyGrid.getStore().find('VacancyID', considerationGrid.vacancy.getId());
        vacancyGrid.getSelectionModel().select(index);
        var wndConsiderationAdd = Ext.create('VM.view.consideration.Add').show();
    },

    deleteConsideration: function (button) {
        var grid = button.up('grid'),
            considerationStore = grid.getStore(),
            sel_consideration = grid.getView().getSelectionModel().getSelection()[0];
        Ext.Msg.show({
            title: 'Удаление соискателя',
            msg: 'Уладить соискателя "' + sel_consideration.get('FullName') + '"',
            width: 300,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    if (sel_consideration) {
                        considerationStore.remove(sel_consideration)
                    }
                }
            }
        });
    }
});

