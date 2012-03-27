
Ext.define('VM.controller.VacancyController', {
    extend: 'Ext.app.Controller',

    stores: ['Vacancy'],

    models: ['Vacancy'],

    views: ['vacancy.List', 'vacancy.Edit'],

    init: function () {
        this.control(
                {
                    'viewport > vacancylist dataview': {
                        itemdblclick: this.editVacancy
                    },
                    'button[action = addVacancy]': {
                        click: this.addVacancy
                    },
                    'button[action = editVacancy]': {
                        click: this.editVacancy
                    },
                    'button[action = updateVacancy]': {
                        click: this.updateVacancy
                    },
                    'button[action = deleteVacancy]': {
                        click: this.deleteVacancy
                    }
                });

    },

    addVacancy: function () {
        var vacancystore = this.getVacancyStore(),
       //     grid = Ext.getCmp('vacancyGrid'),
       //     wndvacanyEdit = Ext.create('VM.view.vacancy.Edit').show()
        newvacancy = Ext.create('VM.model.Vacancy', {
            Title: 'Новая вакансия',
            Description: 'Описание вакансии',
            OpeningDate: new Date(),
            ForeignLanguage: 'Иностранные языки',
            Requirments: 'Требования',
            IsVisible: true
        });
        vacancystore.insert(0, newvacancy);
        //var sel_vacancy = grid.getView().getSelectionModel().selectRow(0);
       // 
       //    console.log(sel_vacancy);
        //wndvacanyEdit.down('form').loadRecord(sel_vacancy);
        //   grid.getView().refresh();
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
        sel_vacancy.set(newvalues);
        wndvacanyEdit.close();
        this.getVacancyStore().sync();
    },

    deleteVacancy: function (button) {
        var grid = button.up('grid'),
            vacancystore = grid.getStore(),
            sel_vacancy = grid.getView().getSelectionModel().getSelection()[0];
        if (sel_vacancy) {
            vacancystore.remove(sel_vacancy)
        };
    }

});