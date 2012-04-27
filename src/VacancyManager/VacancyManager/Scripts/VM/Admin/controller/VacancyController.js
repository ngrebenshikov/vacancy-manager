﻿
Ext.define('VM.controller.VacancyController', {
    extend: 'Ext.app.Controller',

    stores: ['Vacancy'],

    models: ['VM.model.Vacancy'],

    views: ['vacancy.List', 'vacancy.Edit', 'vacancy.Add'],

    init: function () {
        this.control(
                {
                    'vacancyList dataview': {
                        itemdblclick: this.editVacancy
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
    },

    updateVacancy: function (button) {
        var wndvacanyEdit = button.up('window'),
           frm_vacancyform = wndvacanyEdit.down('form'),
           sel_vacancy = frm_vacancyform.getRecord(),
           newvalues = frm_vacancyform.getValues();
        var newdate = eval("({ dtm: new Date(newvalues['OpeningDate']) })");
        newvalues['OpeningDate'] = newdate.dtm;
        sel_vacancy.set(newvalues);
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

        ;
    }

});