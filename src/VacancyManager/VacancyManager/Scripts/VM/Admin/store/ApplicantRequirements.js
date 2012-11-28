﻿Ext.define('VM.store.ApplicantRequirements', {
    extend: 'VM.store.BaseStore',
    model: 'VM.model.ApplicantRequirements',
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
            encode: false,
            listful: true,
            writeAllFields: true,
//            getRecordData: function (record) {
//                return { 'data': Ext.JSON.encode(record.data) }
//            }
        },
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }
});