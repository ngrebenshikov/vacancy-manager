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
            root: 'experience',
            successProperty: 'success'
        },

        writer:
                {
                    type: 'json',
                    root: 'data',
                    encode: false,
                    listful: true,
                    writeAllFields: true,
                    getRecordData: function (record) {
                        return Ext.JSON.encode(record.data);
                    }
                },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }

    }
});