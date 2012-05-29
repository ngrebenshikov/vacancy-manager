﻿
Ext.define('VM.controller.VacancyController', {
    extend: 'Ext.app.Controller',

    stores: ['Vacancy', 'VacancyRequirements'],

    models: ['VM.model.Vacancy', 'VM.model.VacancyRequirements'],

    views: ['vacancy.List', 'vacancy.Edit', 'vacancy.Add', 'vacancy.VacancyRequirementsList'],

    init: function () {
        this.control(
                {
                    'vacancyList dataview': {
                        expandbody: this.loadcons,
                        collapsebody: this.destroygrid//,
                        //   itemdblclick: this.editVacancy
                    },
                    'button[action = loadBlankVacancy]': {
                        click: this.loadBlankVacancy
                    },
                    'button[action = editVacancy]': {
                        click: this.editVacancy
                    },
                    'button[action = updateVacancy]': {
                        click: this.updateVacancy
                    },
                    'button[action = deleteVacancy]': {
                        click: this.deleteVacancy
                    },
                    'button[action = addVacancy]': {
                        click: this.addVacancy
                    }
                });

    },

    destroygrid: function (rowNode, record, expandRow) {
        SubGrid = Ext.getCmp('IssueSubCategoryGridRowGrid-' + record.get('VacancyID'));
        SubGrid.destroy();
    },

    loadcons: function (rowNode, record, expandRow) {
        targetid = 'IssueSubCategoryGridRow-' + record.get('VacancyID');
        gridid = 'IssueSubCategoryGridRowGrid-' + record.get('VacancyID');

        var grid = Ext.create('Ext.grid.Panel', {
            id: gridid,
            padding: '10 10 10 10',
            columns: [
            {
                text: 'ConsiderationID',
                flex: 1,
                sortable: false,
                dataIndex: 'ConsiderationID'
            }, {
                text: 'VacancyID',
                width: 75,
                sortable: true,
                dataIndex: 'VacancyID'
            }, {
                text: 'ApplicantID',
                width: 75,
                sortable: true,
                dataIndex: 'ApplicantID'
            }
        ],
            height: 300,
            forceFit: true,
            title: 'Considerations Grid',
            renderTo: targetid,
            viewConfig: {
                stripeRows: true
            }
        });
    },

    addVacancy: function (button) {
        var vacancystore = this.getVacancyStore(),
           wndvacanyEdit = button.up('window'),
           frm_vacancyform = wndvacanyEdit.down('form'),
           sel_vacancy = frm_vacancyform.getRecord(),
           newvalues = frm_vacancyform.getValues();
        var newOpeningDate = eval("({ dtm: new Date(newvalues['OpeningDate']) })");
        newvalues['OpeningDate'] = newOpeningDate.dtm;
        vacancystore.add(newvalues);
        wndvacanyEdit.close();
    },

    loadBlankVacancy: function () {
        VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
        VacancyRequirementsStore.load({ params: { "id": -1} });
        var wndvacanyEdit = Ext.create('VM.view.vacancy.Add').show(),
        blankvacancy = Ext.create('VM.model.Vacancy', {
            Title: 'Новая вакансия',
            Description: 'Описание вакансии',
            OpeningDate: new Date(),
            ForeignLanguage: 'Иностранные языки',
            Requirments: 'Требования',
            IsVisible: true
        });
        wndvacanyEdit.down('form').loadRecord(blankvacancy);
    },

    editVacancy: function (button) {
        var grid = button.up('grid'),
            sel_vacancy = grid.getView().getSelectionModel().getSelection()[0],
            wndvacanyEdit = Ext.create('VM.view.vacancy.Edit').show();
        wndvacanyEdit.down('form').loadRecord(sel_vacancy);
        VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
        VacancyRequirementsStore.load({ params: { "id": sel_vacancy.get('VacancyID')} });
    },

    updateVacancy: function (button) {
        var wndvacanyEdit = button.up('window'),
           frm_vacancyform = wndvacanyEdit.down('form'),
           sel_vacancy = frm_vacancyform.getRecord(),
           newvalues = frm_vacancyform.getValues();
        var newdate = eval("({ dtm: new Date(newvalues['OpeningDate']) })");
        newvalues['OpeningDate'] = newdate.dtm;
        sel_vacancy.set(newvalues);
        VacancyRequirementsStore = Ext.StoreManager.lookup('VacancyRequirements');
        VacancyRequirementsStore.each(function (record, index) {
            if (record.data['VacancyID'] = -1) {
                record.data['VacancyID'] = sel_vacancy.get('VacancyID');
            }
        });
        VacancyRequirementsStore.sync();
        wndvacanyEdit.close();
    },

    deleteVacancy: function (button) {
        var grid = button.up('grid'),
            vacancystore = grid.getStore(),
            sel_vacancy = grid.getView().getSelectionModel().getSelection()[0];
        Ext.Msg.show({
            title: 'Удаление вакансии',
            msg: 'Уладить вакансию "' + sel_vacancy.get('Title') + '"',
            width: 300,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    if (sel_vacancy) {
                        vacancystore.remove(sel_vacancy)
                    }
                }
            }
        });


    }

});