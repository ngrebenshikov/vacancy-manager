
Ext.define('VM.controller.VacancyController', {
    extend: 'Ext.app.Controller',

    stores: ['Vacancy', 'VacancyRequirements'],

    models: ['VM.model.Vacancy', 'VM.model.VacancyRequirements'],

    views: ['vacancy.List', 'vacancy.Edit', 'vacancy.Add', 'vacancy.VacancyRequirementsList'],

    init: function () {
        this.control(
                {
                    'vacancyList dataview': {
                        expandbody: this.createConsiderationsGrid,
                        collapsebody: this.destroyConsiderationsGrid
                    },

                    'button[action=loadBlankVacancy]': {
                        click: this.loadBlankVacancy
                    },
                    'button[action=editVacancy]': {
                        click: this.editVacancy
                    },
                    'button[action=updateVacancy]': {
                        click: this.updateVacancy
                    },
                    'button[action=deleteVacancy]': {
                        click: this.deleteVacancy
                    },
                    'button[action=addVacancy]': {
                        click: this.addVacancy
                    }
                });

    },

    destroyConsiderationsGrid: function (rowNode, record, expandRow) {
        var ConsiderationsGrid = Ext.get(expandRow).down('.ux-row-expander-box').down('div');
        ConsiderationsGrid.destroy();
    },

    createConsiderationsGrid: function (rowNode, record, expandRow) {

        var vacancyId = record.get('VacancyID'),
             gridId = 'ConsiderationsGrid' + vacancyId,
             considerationsStoreId = 'Consideration' + vacancyId;

        var element = Ext.get(expandRow).down('.ux-row-expander-box');

        var ConsiderationsStore = Ext.create('VM.store.Consideration', {
            extend: 'VM.store.Consideration',
            id: considerationsStoreId
        });

        ConsiderationsStore.load({ params: { "id": vacancyId} });

        grid = Ext.create('VM.view.consideration.List', {
            id: gridId,
            store: ConsiderationsStore,
            vacancy: record
        });

        grid.render(element);
        grid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
    },

    addVacancy: function (button) {
        var vacancystore = this.getVacancyStore(),
           wndvacanyEdit = button.up('window');

        var form = Ext.getCmp('VacancyInfoForm').getForm();
        var curVacancy = form.getRecord();
        form.updateRecord(curVacancy);

        curVacancy.save({
            success: function (record, operation) {
                VacancyID = record.getId();
                vacancystore.insert(0, record);

                VacancyRequirementsStore.each(function (vacancyRequirements) {
                    vacancyRequirements.set('VacancyID', VacancyID);
                });

                VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
                VacancyRequirementsStore.sync();

                var f = function (storeAR, operation) {
                    vacancystore.load();
                    VacancyRequirementsStore.un("write", f);
                };
                VacancyRequirementsStore.on("write", f);

            }
        });

        wndvacanyEdit.close();
    },

    loadBlankVacancy: function () {
        VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
        VacancyRequirementsStore.load({ params: { "id": -1} });
        var wndvacanyEdit = Ext.create('VM.view.vacancy.Add').show(),
        blankvacancy = Ext.create('VM.model.Vacancy', {
            Title: 'Новая вакансия',
            Description: 'Описание вакансии',
            OpeningDate: (Ext.Date.format(new Date(), 'd.m.Y')),
            Requirements: '',
            IsVisible: true
        });

        wndvacanyEdit.down('form').loadRecord(blankvacancy);
    },

    editVacancy: function (button) {
        var grid = button.up('grid'),
            sel_vacancy = grid.getView().getSelectionModel().getSelection()[0];
        if (sel_vacancy != undefined) {
            var wndvacanyEdit = Ext.create('VM.view.vacancy.Edit').show();
            wndvacanyEdit.down('form').loadRecord(sel_vacancy);
            VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
            VacancyRequirementsStore.load({ params: { "id": sel_vacancy.get('VacancyID')} });
        }
    },

    updateVacancy: function (button) {
        var wndvacanyEdit = button.up('window'),
           frm_vacancyform = wndvacanyEdit.down('form'),
           sel_vacancy = frm_vacancyform.getRecord(),
           newvalues = frm_vacancyform.getValues();
        sel_vacancy.set(newvalues);
        VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
        VacancyRequirementsStore.sync();
        this.getVacancyStore().load();
        wndvacanyEdit.close();
    },

    deleteVacancy: function (button) {
        var grid = button.up('grid'),
            vacancystore = grid.getStore(),
            sel_vacancy = grid.getView().getSelectionModel().getSelection()[0];
        if (sel_vacancy != undefined) {
            Ext.Msg.show({
                title: 'Удаление вакансии',
                msg: 'Уладить вакансию "' + sel_vacancy.get('Title') + '"',
                width: 300,
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn == 'yes') {
                        if (sel_vacancy) {
                            vacancystore.remove(sel_vacancy);
                        }
                    }
                }
            });
        }

    }

});