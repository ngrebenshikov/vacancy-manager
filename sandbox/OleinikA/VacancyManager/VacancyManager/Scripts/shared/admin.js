﻿    Ext.create('Ext.tab.Panel', {
        width: 300,
        height: 200,
        activeTab: 0,
        items: [
        {
            title: 'Tab 1',
            html: 'A simple tab'
        },
        {
            title: 'Tab 2',
            html: 'Another one'
        }
    ],
        renderTo: Ext.getBody()
    });