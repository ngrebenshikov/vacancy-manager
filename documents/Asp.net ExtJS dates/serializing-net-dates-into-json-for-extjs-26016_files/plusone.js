var gapi=window.gapi=window.gapi||{};(function(){var h=void 0,j=!0,l=null,p=!1,aa=encodeURIComponent,q=window,ba=parseInt,s=document,v="push",w="test",x="replace",y="indexOf",z="createElement",A="setAttribute",ca="getElementsByTagName",B="length",da="size",ea="split",C="call",D="getAttribute",F="href",G="action",H="apply",I="join",J="toLowerCase";var L=q,M=s,N=L.location,fa=function(){},O=function(a,b,c){return a[b]=a[b]||c},ga=function(a){for(var b=0;b<this[B];b++)if(this[b]===a)return b;return-1},ha=function(a){for(var a=a.sort(),b=[],c=h,d=0;d<a[B];d++){var e=a[d];e!=c&&b[v](e);c=e}return b},ia=/&/g,ja=/</g,ka=/>/g,la=/"/g,ma=/'/g,na=function(a){return(""+a)[x](ia,"&amp;")[x](ja,"&lt;")[x](ka,"&gt;")[x](la,"&quot;")[x](ma,"&#39;")},P=function(){var a;if((a=Object.create)&&/\[native code\]/[w](a))a=a(l);else{a={};for(var b in a)a[b]=h}return a},
Q=function(a,b){return Object.prototype.hasOwnProperty[C](a,b)},R=function(a,b){var a=a||{},c;for(c in a)Q(a,c)&&(b[c]=a[c])},oa=function(a){return function(){L.setTimeout(a,0)}},S=O(L,"gapi",{});var pa=function(a,b,c){b=RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&b.exec(a))try{c=decodeURIComponent(a[2])}catch(d){}return c},qa=/^([^?#]*)(\?([^#]*))?(\#(.*))?$/,ra=function(a){var b=[];if(a)for(var c in a)Q(a,c)&&a[c]!=l&&b[v](aa(c)+"="+aa(a[c]));return b},sa=function(a,b,c){var a=a.match(qa),d=P();d.c=a[1];d.b=a[3]?[a[3]]:[];d.a=a[5]?[a[5]]:[];d.b[v][H](d.b,ra(b));d.a[v][H](d.a,ra(c));return d.c+(0<d.b[B]?"?"+d.b[I]("&"):"")+(0<d.a[B]?"#"+d.a[I]("&"):"")};var ta=function(a,b,c){if(L[b+"EventListener"])L[b+"EventListener"]("message",a,p);else if(L[c+"tachEvent"])L[c+"tachEvent"]("onmessage",a)};var T;T=O(L,"___jsl",P());O(T,"I",0);var ua=function(a){return pa(a,"jsh",T.h)},va=function(a){return O(O(T,"H",P()),a,P())},wa=function(a,b){O(T,"df",P())[a]=b};var xa=P(),U=[];U[v](["jsl",function(a){for(var b in a)if(Q(a,b)){var c=a[b];"object"==typeof c?T[b]=O(T,b,[]).concat(c):O(T,b,c)}if(a=a.u)b=O(T,"us",[]),b[v](a),(c=/^https:(.*)$/.exec(a))&&b[v]("http:"+c[1]),O(T,"u",a)}]);xa.m=function(a){var b=T.ms||"https://apis.google.com",a=a[0];if(!a||0<=a[y](".."))throw"Bad hint";return b+a};
var ya=function(a){return a[I](",")[x](/\./g,"_")[x](/-/g,"_")},za=function(a,b){for(var c=[],d=0;d<a[B];++d){var e=a[d];e&&0>ga[C](b,e)&&c[v](e)}return c},Aa=function(){var a=ua(N[F]);if(!a)throw"Bad hint";return a},Ba=function(a){var b=a[ea](";"),c=xa[b.shift()],b=c&&c(b);if(!b)throw"Bad hint:"+a;return b},Da=function(a){"loading"!=M.readyState?Ca(a):M.write(['<script src="',a,'"><\/script>'][I](""))},Ca=function(a){var b=M[z]("script");b[A]("src",a);b.async="true";a=M[ca]("script")[0];a.parentNode.insertBefore(b,
a)},Ea=function(a,b){var c=b&&b._c;if(c)for(var d=0;d<U[B];d++){var e=U[d][0],f=U[d][1];f&&Q(c,e)&&f(c[e],a,b)}},Fa=function(){return p},Ga=function(){return j},V=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);Ea(a,c);var d=c.h||Aa(),e=c.callback,f=c.config,t=O(va(d),"r",[]).sort(),m=O(va(d),"L",[]).sort(),n=function(a){m[v][H](m,o);var b=((S||{}).config||{}).update;b?b(f):f&&O(T,"cu",[])[v](f);if(a){b=d===ua(N[F])?O(S,"_",P()):P();b=O(va(d),"_",b);a(b)}e&&e();return 1},i=a?ha(a[ea](":")):
[],o=za(i,m);if(!o[B])return n();var o=za(i,t),g=T.I++,k="loaded_"+g;if(!Fa(o,c,d,k)){S[k]=function(a){if(!a)return 0;var b=function(){S[k]=l;return n(a)};if(S["loaded_"+(g-1)])S[k]=b;else for(b();b=S["loaded_"+ ++g];)if(!b())break};if(!o[B])return S[k](fa);i=Ba(d);i=i[x]("__features__",ya(o))[x](/\/$/,"")+(t[B]?"/ed=1/exm="+ya(t):"")+(Ga(d)?"/cb=gapi."+k:"");t[v][H](t,o);c.sync||L.___gapisync?Da(i):Ca(i)}};S.load=V;var Ha=function(a){var b=T.cm;return function(){b&&b();if(T.p)T.cm=Ha(a);else{var c=a.shift();c&&V[H]({},c)}}},Fa=function(a,b,c,d){var e=O(T,"SL",[]);if(T.p)return e[v]([a[I](":"),b]),T.cm=Ha(e),j;if(Ga(c))return p;if(T.LP)return e[v]([a[I](":"),b]),j;T.LP=j;T.cm=function(){S[d](function(){T.p=h;T.LP=p;var a=e.shift();a&&V[H]({},a)})};T.p=a;return p},Ga=function(a){return!/\/widget\/|ms=widget/[w](a)};var W=function(){return q.___jsl=q.___jsl||{}},Ia=function(a){var b=W();b[a]=b[a]||[];return b[a]},X=function(a){var b=W();b.cfg=!a&&b.cfg||{};return b.cfg},Ja=function(a){return"object"===typeof a&&/\[native code\]/[w](a[v])},Y=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]&&b[c]&&"object"===typeof a[c]&&"object"===typeof b[c]&&!Ja(a[c])&&!Ja(b[c])?Y(a[c],b[c]):b[c]&&"object"===typeof b[c]?(a[c]=Ja(b[c])?[]:{},Y(a[c],b[c])):a[c]=b[c])},Ka=function(a){if(a){var b="",c=a.nodeType;if(3==
c||4==c)b=a.nodeValue;else if(a.innerText)b=a.innerText;else if(a.innerHTML)b=a.innerHTML;else if(a.firstChild){b=[];for(a=a.firstChild;a;a=a.nextSibling)b[v](Ka(a));b=b[I]("")}return b}},Z=function(a){if(!a)return X();for(var a=a[ea]("/"),b=X(),c=0,d=a[B];b&&"object"===typeof b&&c<d;++c)b=b[a[c]];return c===a[B]&&b!==h?b:h},La=function(){X(j);var a=q.___gcfg,b=Ia("cu");if(a&&a!==q.___gu){var c={};Y(c,a);b[v](c);q.___gu=a}var a=Ia("cu"),d=s.scripts||s[ca]("script")||[],c=[],e=[],f=W().u;f&&e[v](f);
W().us&&e[v][H](e,W().us);for(f=0;f<d[B];++f)for(var t=d[f],m=0;m<e[B];++m)t.src&&0==t.src[y](e[m])&&c[v](t);0==c[B]&&d[d[B]-1].src&&c[v](d[d[B]-1]);for(d=0;d<c[B];++d)if(!c[d][D]("gapi_processed")){c[d][A]("gapi_processed",j);if(e=Ka(c[d])){for(;0==e.charCodeAt(e[B]-1);)e=e.substring(0,e[B]-1);f=h;try{f=(new Function("return ("+e+"\n)"))()}catch(n){}if("object"===typeof f)e=f;else{try{f=(new Function("return ({"+e+"\n})"))()}catch(i){}e="object"===typeof f?f:{}}}else e=h;e&&a[v](e)}d=Ia("cd");a=
0;for(c=d[B];a<c;++a)Y(X(),d[a]);d=Ia("ci");a=0;for(c=d[B];a<c;++a)Y(X(),d[a]);a=0;for(c=b[B];a<c;++a)Y(X(),b[a])};var Ma=function(){var a=q.__GOOGLEAPIS;a&&(O(T,"ci",[])[v](a),q.__GOOGLEAPIS=h)};var $=q,Na=s,Oa=function(a){if("complete"===Na.readyState)a();else{var b=p,c=function(){if(!b)return b=j,a[H](this,arguments)};$.addEventListener?($.addEventListener("load",c,p),$.addEventListener("DOMContentLoaded",c,p)):$.attachEvent&&($.attachEvent("onreadystatechange",function(){"complete"===Na.readyState&&c[H](this,arguments)}),$.attachEvent("onload",c))}};var Pa,Qa=P(),Ra=O(T,"FW",[]),Sa=function(){for(var a=P(),b=M[ca]("*"),c=0;c<b[B];++c){var d=b[c],e=d.nodeName[J](),f=h;if(!d[D]("data-gapiscan")&&(0==e[y]("g:")?f=e.substr(2):(e=""+(d.className||d[D]("class")))&&0==e[y]("g-")&&(f=e.substr(2)),f&&Qa[f]))d[A]("data-gapiscan",j),O(a,f,[])[v](d)}return a},Ta=function(){},Ua=function(a){var b=Sa(),c=[],d="explicit"==Z("parsetags"),e;for(e in b)Ra[v](e),(S[e]&&S[e].go||d)&&c[v](e);d={};if(0<c[B])var f=a,a=function(){for(var a=0;a<c[B];a++)S[c[a]].go();
f&&f()};d.callback=a;a=Ra[I](":");V(a,d);Ta(a,b,Pa)},Va=function(a,b){for(var c=O(b._c,"ds",[]),d=0;d<a[B];d++)c[v](["gapi",a[d],"go"][I](".")),c[v](["gapi",a[d],"render"][I]("."))};U[v](["platform",function(a,b,c){Pa=c;b&&Ra[v](b);for(b=0;b<a[B];b++)Qa[a[b]]=1;c&&Va(a,c);Ma();La();if("explicit"!=Z("parsetags")){var d;if(c&&(a=c.callback))d=oa(a),c.callback=h;Oa(function(){Ua(d)});Ua()}}]);O(S,"platform",{}).go=Ua;U[v](["ds",function(a,b,c){for(var d=[].slice,b=0,e;e=a[b];++b){for(var f=L,t=e[ea]("."),m=0;m<t[B]-1;++m)f=O(f,t[m],{});m=t[m];f[m]||(f[m]=function(){var a=3==t[B]?t[t[B]-2]:"",b=c._c.platform,f="gapi"==t[0]&&b&&0<=ga[C](b,a),g=[];wa(e,function(a){for(var b=0;g[b];++b)a[H](L,g[b])});return function(){g[v](d[C](arguments,0));f&&V(a)}}())}}]);var Wa=/^\{h\:'/,Xa=/^!_/,$a=function(a,b){function c(){ta(d,"remove","de")}function d(d){var f=d.data,t=d.origin;Ya(f,b)&&Za(a,function(){c();for(var a=O(T,"RPMQ",[]),b=0;b<a[B];b++)a[b]({data:f,origin:t})})}0===b[B]||(!q.JSON||!q.JSON.parse)||(ta(d,"add","at"),V(a,c))},Ya=function(a,b){a=""+a;if(Wa[w](a))return j;a=a[x](Xa,"");if(!/^\{/[w](a))return p;try{var c=q.JSON.parse(a)}catch(d){return p}if(!c)return p;var e=c.f;return c.s&&e&&-1!=ga[C](b,e)?j:p},Za=function(a,b){V(a,b)};var ab=["left","right"],bb="inline bubble none only pp vertical-bubble".split(" "),cb=function(a){var b=s[z]("div"),c=s[z]("a");c.href=a;b.appendChild(c);b.innerHTML=b.innerHTML;return b.firstChild[F]},db=function(a,b,c,d){if(a)a=cb(a);else a:{a=d||"canonical";b=s[ca]("link");c=0;for(d=b[B];c<d;c++){var e=b[c],f=e[D]("rel");if(f&&f[J]()==a&&(e=e[D]("href")))if(e=cb(e)){a=e;break a}}a=q.location[F]}return a},gb=function(a){a.source=[l,"source"];a.expandTo=[l,"expandTo"];a.align=[eb];a.annotation=[fb]},
hb=function(a,b){if("string"==typeof a){var c;for(c=0;c<b[B];c++)if(b[c]==a[J]())return a[J]()}},eb=function(a){return hb(a,ab)},fb=function(a){return hb(a,bb)},ib={tall:{"true":{width:50,height:60},"false":{width:50,height:24}},small:{"false":{width:24,height:15},"true":{width:70,height:15}},medium:{"false":{width:32,height:20},"true":{width:90,height:20}},standard:{"false":{width:38,height:24},"true":{width:106,height:24}}},jb=function(a){return"string"==typeof a?""!=a&&"0"!=a&&"false"!=a[J]():
!!a},kb=function(a){var b=ba(a,10);if(b==a)return""+b},lb=function(a){if(jb(a))return"true"},mb=function(a){return"string"==typeof a&&ib[a[J]()]?a[J]():"standard"},nb={href:[db,"url"],width:[kb],size:[mb],resize:[lb],autosize:[lb],count:[function(a,b){return"tall"==mb(b[da])?"true":b.count==l||jb(b.count)?"true":"false"}],db:[function(a,b,c){a==l&&c&&(a=c.db,a==l&&(a=c.gwidget&&c.gwidget.db));return jb(a)?1:h}],ecp:[function(a,b,c){a==l&&c&&(a=c.ecp,a==l&&(a=c.gwidget&&c.gwidget.ecp));if(jb(a))return"true"}],
textcolor:[function(a){if("string"==typeof a&&a.match(/^[0-9A-F]{6}$/i))return a}],drm:[lb],ad:[lb],cr:[kb],ag:[kb],"fr-ai":[],"fr-sigh":[]};var ob={badge:{width:300,height:131},smallbadge:{width:300,height:69}},pb=function(a){return"string"==typeof a&&ob[a[J]()]?a[J]():"badge"};var qb={allowtransparency:"true",frameborder:0,hspace:0,marginheight:0,marginwidth:0,scrolling:"no",style:"",tabindex:"0",vspace:0,width:"100%"},rb=0;var sb=/:([a-zA-Z_]+):/g,tb=["onPlusOne","_ready","_close,_open","_resizeMe","_renderstart"],ub={},vb=l,wb=O(T,"WI",P()),xb=function(){var a=Z("googleapis.config/sessionIndex");a==l&&(a=q.__X_GOOG_AUTHUSER);if(a==l){var b=q.google;b&&(a=b.authuser)}a==l&&(a=h,a==l&&(a=q.location[F]),a=a?pa(a,"authuser"):l);return a==l?l:""+a},yb=function(a,b){if(!vb){var c=Z("iframes/:socialhost:"),d=xb()||"0",e=xb();vb={socialhost:c,session_index:d,session_prefix:e!==h&&e!==l&&""!==e?"u/"+e+"/":""}}return vb[b]||
""},zb=function(a,b){var c={};R(b,c);var d;d=db(c[F],0,0,b[G]?l:"publisher");c.url=d;delete c[F];c.hl=Z("lang")||"en-US";c.size=pb(b[da]);d=b.width;c.width=!d?b[G]?h:ob[pb(b[da])].width:ba(d);d=b.height;c.height=!d?b[G]?h:ob[pb(b[da])].height:ba(d);return c},Ab=["style","data-gapiscan"],Bb=function(a){var b=h;"number"===typeof a?b=a:"string"===typeof a&&(b=ba(a,10));return b};ub.plusone=[function(a,b){var c={};R(nb,c);gb(c);var d={},e=Z(),f;for(f in c)c.hasOwnProperty(f)&&(d[c[f][1]||f]=(c[f]&&c[f][0]||function(a){return a})(b[f[J]()],b,e));return d}];Ta=function(a,b,c){for(var d=["_c","jsl","h"],e=0;e<d[B]&&c;e++)c=c[d[e]];if(c&&!(0==c[y]("n;")&&c!=ua(N[F]))){var c=[],f;for(f in b)for(var d=b[f],e=0,t=d[B];e<t;e++){var m;var n=f;m=d[e];if(m.parentNode){var i;i=m;for(var o=P(),g=0!=i.nodeName[J]()[y]("g:"),k=0,E=i.attributes[B];k<E;k++){var r=i.attributes[k],u=r.name,r=r.value;0<=ga[C](Ab,u)||(g&&0!=u[y]("data-")||"null"===r)||(g&&(u=u.substr(5)),o[u[J]()]=r)}g=o;i=i.style;(k=Bb(i&&i.height))&&(g.height=""+k);(i=Bb(i&&i.width))&&(g.width=""+i);
i=o;o=n;g=h;g=o;"plus"==o&&i[G]&&(g=o+"_"+i[G]);(g=Z("iframes/"+g+"/url"))||(g=":socialhost:/_/widget/render/"+o);o=g[x](sb,yb);g=((ub[n]||[])[0]||zb)(n,i);g.hl=Z("lang")||"en-US";k=g;E=/^#|^fr-/;u={};r=h;for(r in k)Q(k,r)&&E[w](r)&&(u[r[x](E,"")]=k[r],delete k[r]);var E=k=u,u=i,r=[].concat(tb),K=Z("iframes/"+n+"/methods");"object"===typeof K&&/\[native code\]/[w](K[v])&&(r=r.concat(K));K=h;for(K in u)Q(u,K)&&/^on/[w](K)&&r[v](K);E._methods=r[I](",");o=sa(o,g,k);g=n;n=s[z]("div");m[A]("data-gapistub",
j);k=n;O(wb,g,0);g="___"+g+"_"+wb[g]++;k.id=g;n.style.cssText="position:absolute;width:100px;left:-10000px;";n[A]("data-gwattr",ra(i)[I](":"));m.parentNode.insertBefore(n,m);i=o;o=n;m=n={};g=h;k=0;do g=m.id||["I",rb++,"_",(new Date).getTime()][I]("");while(s.getElementById(g)&&5>++k);if(5==k)throw"Error creating iframe id";m=g;o="string"===typeof o?s.getElementById(o):o;k=m;g=n;u=N[F];E=P();(r=pa(u,"_bsh",T.bsh))&&(E._bsh=r);(u=ua(u))&&(E.jsh=u);u=h;r=P();r.id=k;r.parent=N.protocol+"//"+N.host;k=
r;g.hintInFragment?R(E,k):u=E;i=sa(i,u,k);g=m;k=n;n=P();R(qb,n);n.name=n.id=g;R(k.attributes,n);n.src=i;i=h;try{i=M[z]('<iframe frameborder="'+na(n.frameborder)+'" scrolling="'+na(n.scrolling)+'" name="'+na(n.name)+'"/>')}catch(Cb){i=M[z]("iframe")}g=h;for(g in n)k=n[g],"style"==g&&"object"===typeof k?R(k,i.style):i[A](g,n[g]);o.innerHTML="";o.appendChild(i)}else m=l;m&&c[v](m)}$a(a,c)}};})();
gapi.load("plusone",{callback:window["gapi_onload"],_c:{"platform":["plusone","plus","additnow"],"jsl":{"u":"https://apis.google.com/js/plusone.js","ci":{"lexps":[34,38,65,36,40,44,15,45,17,48,52,57,61,60,30],"oauth-flow":{},"iframes":{"additnow":{"url":"https://apis.google.com/additnow/additnow.html?bsv=pr"},"plus":{"url":":socialhost:/u/:session_index:/_/pages/badge?bsv=pr"},":socialhost:":"https://plusone.google.com","configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator"},":signuphost:":"https://plus.google.com","plusone":{"preloadUrl":["https://ssl.gstatic.com/s2/oz/images/stars/po/Publisher/sprite4-a67f741843ffc4220554c34bd01bb0bb.png"],"params":{"count":"","url":"","size":""},"url":":socialhost:/:session_prefix:_/+1/fastbutton?bsv=pr"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&bsv=pr"}},"googleapis.config":{"mobilesignupurl":"https://m.google.com/app/plus/oob?"}},"h":"m;/_/apps-static/_/js/gapi/__features__/rt=j/ver=nFIyTv5Vkiw.ru./sv=1/am=!gFuVl93svF6I1poz5g/d=1/rs=AItRSTNBvnudm4K_3xC1Lr6YMSk-80hMYw"},"ds":["gapi.plusone.go","gapi.plusone.render","gapi.plus.go","gapi.plus.render"]}});