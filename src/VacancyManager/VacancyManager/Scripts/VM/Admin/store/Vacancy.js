﻿Ext.define('VM.store.Vacancy', {
  extend: 'VM.store.BaseStore',
  model: 'VM.model.Vacancy',
  id: 'VacancyStore',
  autoLoad: true,
  autoSync: true,
  autoSave: true,
  proxy: {
    type: 'ajax',
    api: {
      read: '/Vacancy/Load',
      create: '/Vacancy/Create',
      update: '/Vacancy/Update',
      destroy: '/Vacancy/Delete'
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
      getRecordData: function (record)
      {
        return { 'data': Ext.JSON.encode(record.data) };
      }
    },
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
  }
});