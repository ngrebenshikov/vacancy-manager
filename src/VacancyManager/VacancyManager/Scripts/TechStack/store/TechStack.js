Ext.define('TechStack.store.TechStack', {
    extend: 'Ext.data.Store',
    model: 'TechStack.model.TechStack',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read: '../TechnologyStack',
            update: '../TechnologyStack',
        },
        reader: {
            type: 'json',
            root: 'TechStackList',
            successProperty: 'success'
        }
    }
});
