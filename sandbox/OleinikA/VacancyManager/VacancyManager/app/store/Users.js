var writer = new Ext.data.JsonWriter({
    type: 'json',
    encode: false,
    listful: true,
    writeAllFields: true,
    returnJson: true
});

var reader = new Ext.data.JsonReader({
    totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'Id',
    root: 'Data',
    messageProperty: 'message' 
});

var proxy = new Ext.data.HttpProxy({
    reader: reader,
    writer: writer,
    type: 'ajax',
    api: {
        read: '/UserInfo/Index',
        create: '/UserInfo/Create',
        update: '/UserInfo/Edit',
        destroy: '/UserInfo/Delete'
    },
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
});

Ext.define('AM.store.Users', {
    extend: 'Ext.data.Store',
    model: 'AM.model.User',
    autoLoad: true,
    paramsAsHash: true,
    proxy: proxy
});





//Ext.require([
//    'Ext.data.*',
//    ]);

//Ext.define('AM.store.proxy', {
//    extend: "Ext.data.proxy.Ajax",
//    type: 'ajax',
//    url: 'UserInfo/GetPaged',
//    reader: {
//        type: 'json',
//        successProperty: 'Success',
//        totalProperty: 'total',
//        idProperty: 'Id',
//        root: 'Data'
//    },
//    writer: {
//        type: 'json'
//    }
//});

//Ext.define('AM.store.Users', {
//    extend: 'Ext.data.Store',
//    model: 'AM.model.User',
//    autoLoad: true,
//    proxy: 'AM.store.proxy'
//});



//var proxy = {
//    type: 'ajax',
//    url: 'UserInfo/GetPaged',
//    reader: {
//        type: 'json',
//        successProperty: 'Success',
//        totalProperty: 'total',
//        idProperty: 'Id',
//        root: 'Data'
//    },
//    writer: {
//        type: 'json'
//    }
//};

//Ext.define('AM.store.Users', {
//    extend: 'Ext.data.Store',
//    model: 'AM.model.User',
//    autoLoad: true,
//    proxy: proxy
//});