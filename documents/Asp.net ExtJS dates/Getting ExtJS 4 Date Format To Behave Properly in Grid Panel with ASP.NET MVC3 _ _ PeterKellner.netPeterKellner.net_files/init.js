Ext.onReady(function() {
    // Function for sidebar cookie
    var jQCookie = jaaulde.utils.cookies;
    function sideCatCookie (opt) {
        if (opt.destroy) {
            jQCookie.del('sideCat');
        }
        if (opt.get) {
           return jQCookie.get( 'sideCat' );
        }
        if (opt.set) {
            var dateExpiry = new Date();
            dateExpiry.setDate(dateExpiry.getDate()+30);

            jQCookie.set("sideCat", opt.value, {expiresAt: dateExpiry});
        }
    }
    // Function to toggle sidebar collapse and expand
    function sideCatToggle () {
        var catLink = Ext.get("sideCatLink");
        sideCatCookie({destroy: true});

        if (catLink.dom && catLink.dom.innerHTML === "Expand Categories [+]") {
            Ext.fly("sideCatWrap").addClass("sideCatUnWrap");
            Ext.fly("sideCatWrap").removeClass("sideCatWrap");
            sideCatCookie({set: true, value:"expand"});
            catLink.update("Collapse Categories &#91;&#45;&#93;");
        } else {
            Ext.fly("sideCatWrap").addClass("sideCatWrap");
            Ext.fly("sideCatWrap").removeClass("sideCatUnWrap");
            sideCatCookie({set: true, value:"collapse"});
            catLink.update("Expand Categories &#91;&#43;&#93;");
        }
    }
    // Get sidebar cookie
    var catCookie = sideCatCookie({get: true});
    // Check sideBar cookie
    if (catCookie === "expand") {
        // Defer function call for IE's sake
        sideCatToggle.defer(2000);
    }
    // Bind to sidebar category link
    // Have to make a function call coz it seems ExtCore on IE has some dom error
    function bindCatLink () {
        var sideCatLink = Ext.get("sideCatLink");
        if (sideCatLink) {
            sideCatLink.on('click',sideCatToggle);
        }
    }
    // Call our binding function but deferred
    bindCatLink.defer(2000);
});