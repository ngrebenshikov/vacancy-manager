Ext.define('TechStack.store.TechListInStack', {
    extend: 'Ext.data.Store',
    model: 'TechStack.model.TechListInStack',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read: '../TechnologyStack/TechListInStack',
            update: '../TechnologyStack/TechListInStack',
        },
        reader: {
            type: 'json',
            root: 'TechList',
            successProperty: 'success'
        }
    }
});
