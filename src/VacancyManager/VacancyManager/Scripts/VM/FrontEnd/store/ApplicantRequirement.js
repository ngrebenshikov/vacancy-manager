﻿Ext.define('VM.store.ApplicantRequirement', {
    extend: 'Ext.data.Store',
    model: 'VM.model.ApplicantRequirement',
    id: 'ApplicantRequirements',
    groupField: 'StackName',
    autoLoad: false,
    autoSync: false,
    autoSave: true,
    proxy: {
        type: 'ajax',
        api: {
            create: '/ApplicantRequirement/Create',
            read: '/ApplicantRequirement/Load',
            update: '/ApplicantRequirement/Update'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            allowSingle: false,
            listful: true,
            root: 'applicantRequirements',
            writeAllFields: true
        }
    }
});

