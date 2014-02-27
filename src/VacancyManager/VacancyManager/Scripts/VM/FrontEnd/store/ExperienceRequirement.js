Ext.define('VM.store.ExperienceRequirement', {
    extend: 'Ext.data.Store',
    model: 'VM.model.ExperienceRequirement',
    groupField: 'StackName',
    autoLoad: false,
    autoSync: false,
    autoSave: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/ResumeExperience/LoadExperienceRequirements',
            create: '/ResumeExperience/CreateExperienceRequirements',
            update: '/ResumeExperience/UpdateExperienceRequirements'
        },
        reader: {
            type: 'json',
            root: 'ExperienceRequirements',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            allowSingle: true,
            root: 'data',
            getRecordData: function (record) {
                return Ext.JSON.encode(record.data);
            }
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});