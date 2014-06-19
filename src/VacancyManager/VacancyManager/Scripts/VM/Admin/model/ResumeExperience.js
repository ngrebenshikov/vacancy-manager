Ext.define('VM.model.ResumeExperience', {
    extend: 'Ext.data.Model',
    idProperty: 'ExperienceId',
    fields: ['ExperienceId', 'Job', 'Project', 'Position', 'ResumeId',
        { name: 'StartDate',
            type: 'date',
            dateFormat: 'd.m.Y'
        },
        { name: 'FinishDate',
            type: 'date',
            dateFormat: 'd.m.Y'
        },

        'Duties', 'IsEducation'],
    proxy: {
        type: 'ajax',
        api: {
            read: '/ResumeExperience/GetResumeExperience',
            destroy: '/ResumeExperience/DeleteExperience',
            update: '/ResumeExperience/UpdateExperience',
            create: '/ResumeExperience/CreateExperience'
        },

        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },

        writer: {
            type: 'json',
            root: 'resumeExperience',
            allowSingle: true,
            listful: true,
            writeAllFields: true
        }
    }
});