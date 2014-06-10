/// <reference path="~/Scripts/VM/Admin/app.js" />

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

                    'button[action=refreshVacancyList]': {
                        click: this.refreshVacancyList
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

    refreshVacancyList: function (button) {
        vacancyStore = this.getVacancyStore();
        vacancyStore.load();
    },

    destroyConsiderationsGrid: function (rowNode, record, expandRow) {
        var ConsiderationsGrid = rowNode.grid;
        if (ConsiderationsGrid !== undefined) {
            ConsiderationsGrid.getStore().destroyStore();
            ConsiderationsGrid.destroy();
        }

    },

    createConsiderationsGrid: function (rowNode, record, expandRow) {
        var vacancyId = record.get('VacancyID'),
            considerationsStoreId = 'ConsiderationStore_' + vacancyId,
            targetId = 'VacancyConsiderationGridRow-' + vacancyId,
            targetGridId = targetId + '_grid';

        if (Ext.getCmp(targetGridId) == undefined) {
            var VacancyConsiderationGrid = Ext.create('VM.view.consideration.List', {
                id: targetGridId,
                renderTo: targetId,
                store: Ext.create('VM.store.Consideration', {
                    extend: 'VM.store.Consideration',
                    activeVacancy: record,
                    id: considerationsStoreId
                }).load({ params: { "vacancyId": vacancyId} })
            });

            rowNode.grid = VacancyConsiderationGrid;
            VacancyConsiderationGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
            VacancyConsiderationGrid.fireEvent("bind", VacancyConsiderationGrid, { VacancyID: vacancyId });
        }
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
                VacancyRequirementsStore.each(function (vacancyRequirements) {
                    vacancyRequirements.set('VacancyID', VacancyID);
                });

                VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
                VacancyRequirementsStore.sync();

                var f = function (storeAR, operation) {
                    Ext.Ajax.request({
                        url: '../../Vacancy/LoadSingle?id=' + VacancyID,
                        method: 'GET',
                        success: function (result, request) {
                            var JsonResult = Ext.JSON.decode(result.responseText).data;
                            vacancystore.insert(0, Ext.create('VM.model.Vacancy', JsonResult));
                        }
                    });

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

        VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
        var upRecs = VacancyRequirementsStore.getUpdatedRecords();
        if (upRecs.length !== 0) {
            var f = function (storeAR, operation) {
                sel_vacancy.set(newvalues);
                VacancyRequirementsStore.un("write", f);
            };

            VacancyRequirementsStore.on("write", f);
        }
        else {
            sel_vacancy.set(newvalues);
        }
        VacancyRequirementsStore.sync();
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