(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["xlsx"],{"2f14":function(t,e,o){"use strict";o("c5f6");var n=function(t){if(console.log(t),0===t)return"0B";var e=1024,o=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],n=Math.floor(Math.log(t)/Math.log(e)),i=(t/Math.pow(e,n)).toFixed(2);return i+" "+o[n]},i=function(t){var e=new Date(t),o=e.getMonth()+1,n=e.getDate(),i=new Date,r=6e4,a=60*r,s=24*a,c=30*s,l=i-e,u=l/c,p=Number((l/(7*s)).toPrecision(1)),f=Number((l/s).toPrecision(1)),b=Number((l/a).toPrecision(1)),d=Number((l/r).toPrecision(1)),h="";return l<0||(h=u>1?o+"月"+n:p>1?p+"周前":f>1?f+"天前":b>1?b+"时前":d>1?d+"分前":"刚发布"),h};e["a"]={bytesToSize:n,getDateDiff:i}},5390:function(t,e,o){"use strict";var n=o("f743"),i=o.n(n);i.a},"5dbc":function(t,e,o){var n=o("d3f4"),i=o("8b97").set;t.exports=function(t,e,o){var r,a=e.constructor;return a!==o&&"function"==typeof a&&(r=a.prototype)!==o.prototype&&n(r)&&i&&i(t,r),t}},"83d7":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"Xlsx container-box"},[o("mt-header",{attrs:{fixed:"",title:"表格转json数据"}},[o("router-link",{attrs:{slot:"left",to:"/home"},slot:"left"},[o("mt-button",{attrs:{icon:"back"},on:{click:function(e){return t.$router.back(-1)}}},[t._v("返回")])],1)],1),o("section",{staticClass:"xlsx-content"},[o("mt-cell",{attrs:{title:"数组格式"}},[o("mt-switch",{model:{value:t.isArray,callback:function(e){t.isArray=e},expression:"isArray"}})],1),o("mt-cell",{attrs:{title:"去除逗号"}},[o("mt-switch",{attrs:{disabled:t.isArray},model:{value:t.comma,callback:function(e){t.comma=e},expression:"comma"}})],1),o("mt-cell",{attrs:{title:"换行"}},[o("mt-field",{attrs:{placeholder:"每隔几条换行",type:"number"},model:{value:t.wrap,callback:function(e){t.wrap=e},expression:"wrap"}})],1),o("mt-cell",{attrs:{title:"xlsx文件"}},[o("vue-xlsx-table",{on:{"on-select-file":t._handleSelectedFile}},[o("span",{staticClass:"btn-text"},[t._v("上传")])])],1),o("mt-cell",{attrs:{title:"转换结果"}}),o("mt-field",{attrs:{placeholder:"转换后结果",type:"textarea",rows:"8"},model:{value:t.result,callback:function(e){t.result=e},expression:"result"}}),o("div",{staticClass:"btn-group"},[o("mt-button",{attrs:{type:"default",size:"large"},on:{click:t._handelCopy}},[t._v("复制")]),o("mt-button",{attrs:{type:"primary",size:"large"},on:{click:t._popupVisibleShow}},[t._v("下载")])],1)],1),o("mt-popup",{staticStyle:{width:"100%"},attrs:{"popup-transition":"popup-fade",closeOnClickModal:"true",position:"bottom"},model:{value:t.popupVisible,callback:function(e){t.popupVisible=e},expression:"popupVisible"}},[o("mt-picker",{staticStyle:{width:"100%"},attrs:{slots:t.slots,showToolbar:""},on:{change:t._onValuesChange}},[o("div",{staticClass:"picker-toolbar"},[o("div",{on:{click:function(e){t.popupVisible=!t.popupVisible}}},[t._v("取消")]),o("span",[t._v("文件大小"+t._s(t.fileSize))]),o("div",{on:{click:t._downloadFile}},[t._v("确定")])])])],1)],1)},i=[],r=(o("6b54"),o("2397"),o("d225")),a=o("b0b4"),s=o("308d"),c=o("6bb5"),l=o("4e2b"),u=o("9ab4"),p=o("2f14"),f=o("60a3");function b(t){return function(){var e,o=Object(c["a"])(t);if(d()){var n=Object(c["a"])(this).constructor;e=Reflect.construct(o,arguments,n)}else e=o.apply(this,arguments);return Object(s["a"])(this,e)}}function d(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var h=function(t){Object(l["a"])(o,t);var e=b(o);function o(){var t;return Object(r["a"])(this,o),t=e.apply(this,arguments),t.loadStatus=!1,t.isArray=!1,t.comma=!0,t.wrap=1,t.fileSize="",t.result="",t.fileType="",t.saveLink=null,t.showToolbar=!0,t.popupVisible=!1,t.slots=[{values:[".txt",".json",".js"]}],t}return Object(a["a"])(o,[{key:"_handleSelectedFile",value:function(t){var e=this,o=function(t,o,n){for(var i="",r=1;r<=t.length;r++)i+=JSON.stringify(t[r-1]),!n&&(i+=","),r%o==0&&(i+="\n");console.log(i),e.result=i},n=t.body;this.isArray?this.result=JSON.stringify(n):o(n,this.wrap,this.comma)}},{key:"_handelCopy",value:function(){var t=this,e=function(e){e.clipboardData.setData("text/plain",t.result),e.preventDefault()};return document.addEventListener("copy",e),this["$toast"]({message:"复制成功",position:"middle"}),document.execCommand("copy")}},{key:"_onValuesChange",value:function(t,e){this.fileType=e[0],console.log(e[0])}},{key:"_downloadFile",value:function(){var t=function(t){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),t.dispatchEvent(e)};t(this.saveLink),this.popupVisible=!1}},{key:"_popupVisibleShow",value:function(){this.popupVisible=!0;var t=window["URL"]||window["webkitURL"]||window;console.log("urlObject",t);var e=new Blob([this.result]);console.log("downloadData",e),this.fileSize=p["a"].bytesToSize(e.size),console.log(this.fileSize),this.saveLink=document.createElementNS("http://www.w3.org/1999/xhtml","a"),this.saveLink["href"]=t.createObjectURL(e),this.saveLink["download"]=(new Date).getTime()+this.fileType}},{key:"mounted",value:function(){}},{key:"getIsArray",value:function(t,e){console.log("newVal",t),t&&(this.comma=!1)}}]),o}(f["b"]);Object(u["a"])([Object(f["c"])("isArray")],h.prototype,"getIsArray",null),h=Object(u["a"])([f["a"]],h);var v=h,m=v,y=(o("5390"),o("2877")),w=Object(y["a"])(m,n,i,!1,null,"5c950e8f",null);e["default"]=w.exports},"8b97":function(t,e,o){var n=o("d3f4"),i=o("cb7c"),r=function(t,e){if(i(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,n){try{n=o("9b43")(Function.call,o("11e9").f(Object.prototype,"__proto__").set,2),n(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,o){return r(t,o),e?t.__proto__=o:n(t,o),t}}({},!1):void 0),check:r}},aa77:function(t,e,o){var n=o("5ca1"),i=o("be13"),r=o("79e5"),a=o("fdef"),s="["+a+"]",c="​",l=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),p=function(t,e,o){var i={},s=r((function(){return!!a[t]()||c[t]()!=c})),l=i[t]=s?e(f):a[t];o&&(i[o]=l),n(n.P+n.F*s,"String",i)},f=p.trim=function(t,e){return t=String(i(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=p},c5f6:function(t,e,o){"use strict";var n=o("7726"),i=o("69a8"),r=o("2d95"),a=o("5dbc"),s=o("6a99"),c=o("79e5"),l=o("9093").f,u=o("11e9").f,p=o("86cc").f,f=o("aa77").trim,b="Number",d=n[b],h=d,v=d.prototype,m=r(o("2aeb")(v))==b,y="trim"in String.prototype,w=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){e=y?e.trim():f(e,3);var o,n,i,r=e.charCodeAt(0);if(43===r||45===r){if(o=e.charCodeAt(2),88===o||120===o)return NaN}else if(48===r){switch(e.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+e}for(var a,c=e.slice(2),l=0,u=c.length;l<u;l++)if(a=c.charCodeAt(l),a<48||a>i)return NaN;return parseInt(c,n)}}return+e};if(!d(" 0o1")||!d("0b1")||d("+0x1")){d=function(t){var e=arguments.length<1?0:t,o=this;return o instanceof d&&(m?c((function(){v.valueOf.call(o)})):r(o)!=b)?a(new h(w(e)),o,d):w(e)};for(var g,_=o("9e1e")?l(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;_.length>k;k++)i(h,g=_[k])&&!i(d,g)&&p(d,g,u(h,g));d.prototype=v,v.constructor=d,o("2aba")(n,b,d)}},f743:function(t,e,o){},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);