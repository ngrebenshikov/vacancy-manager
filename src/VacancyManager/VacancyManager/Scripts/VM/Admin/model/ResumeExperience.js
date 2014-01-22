
Ext.define('VM.model.ResumeExperience',
    {
        extend: 'Ext.data.Model',
        idProperty: 'ExperienceId',
        fields: ['ExperienceId', 'Job', 'Project', 'Position', 'ResumeId', 'StartDate', 'FinishDate', 'Duties', 'IsEducation'],
        proxy: {
            type: 'ajax',
            api: {
                read: '/Experience/LoadExperience',
                destroy: '/Experience/DeleteExperience',
                create: 'Experience/CreateExperience'
            },

            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            },

            writer:
                {
                    type: 'json',
                    encode: false,
                    listful: true,
                    writeAllFields: true,
                    getRecordData: function (record) {
                        return {
                            'data': Ext.JSON.encode(record.data)
                        };
                    }
                },
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }

        }
    });