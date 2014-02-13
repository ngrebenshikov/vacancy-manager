Ext.define('VM.Shared.EduList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.EduList',
    height: 500,
    id: 'eduGrid',
    autoSizeColumns: true,
    frame: false,
    split: true,
    title: 'Образование',
    store: 'ResumeExperience',
    columns:
    [ {
        text: 'Учебное заведение',
        dataIndex: 'Job',
        sortable: false,
        menuDisabled: true,
        flex: 1

    }, {
        text: 'Кафедра',
        dataIndex: 'Position',
        sortable: false,
        menuDisabled: true,
        flex: 1
    },
       {
           text: 'Специальность',
           dataIndex: 'Project',
           sortable: false,
           menuDisabled: true,
           flex: 1
       }],
    bbar: [{
        text: 'Добавить',
        name: 'AddEdu',
        id: 'btnAddEducation',
        action: 'AddEducation'
    }, {
        text: 'Редактировать',
        name: 'EditEducation',
        id: 'btnEditEducation',
        action: 'EditEducation'
    }, '->',
    {
        text: 'Удалить',
        action: 'DeleteEducation'
    }
   ]

});