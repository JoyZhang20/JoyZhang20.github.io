/*
 * 快捷键插件:详情参见：jquery.hotkeys.js(v1.0)
 */
;(function(b){b.hotkeys={version:"1.0",specialKeys:{8:"backspace",9:"tab",10:"return",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",59:";",61:"=",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",224:"meta"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":'"',",":"<",".":">","/":"?","\\":"|"},textAcceptingInputTypes:["text","password","number","email","url","range","date","month","week","time","datetime","datetime-local","search","color","tel"],textInputTypes:/textarea|input|select/i,options:{filterInputAcceptingElements:true,filterTextInputs:true,filterContentEditable:true,filterEvent:function(){return false}}};function a(d){try{if(typeof d.data==="string"){d.data={keys:d.data}}if(!d.data||!d.data.keys||typeof d.data.keys!=="string"){return}var c=d.handler,f=d.data.keys.toLowerCase().split(" ");d.handler=function(e){var q=d.data.filterInputAcceptingElements||b.hotkeys.options.filterInputAcceptingElements;var s=d.data.filterContentEditable||b.hotkeys.options.filterContentEditable;var n=d.data.filterTextInputs||b.hotkeys.options.filterTextInputs;var r=d.data.filterEvent||b.hotkeys.options.filterEvent;if(this!==e.target&&(q&&b.hotkeys.textInputTypes.test(e.target.nodeName)||(s&&b(e.target).attr("contenteditable"))||(n&&b.inArray(e.target.type,b.hotkeys.textAcceptingInputTypes)>-1))||(r.call(this,e)==true)){return}console.log(e.which);var p=e.type!=="keypress"&&b.hotkeys.specialKeys[e.which],o=String.fromCharCode(e.which).toLowerCase(),j="",k={};b.each(["alt","ctrl","shift"],function(i,l){if(e[l+"Key"]&&p!==l){j+=l+"+"}});if(e.metaKey&&!e.ctrlKey&&p!=="meta"){j+="meta+"}if(e.metaKey&&p!=="meta"&&j.indexOf("alt+ctrl+shift+")>-1){j=j.replace("alt+ctrl+shift+","hyper+")}if(p){k[j+p]=true}else{k[j+o]=true;k[j+b.hotkeys.shiftNums[o]]=true;if(j==="shift+"){k[b.hotkeys.shiftNums[o]]=true}}for(var m=0,h=f.length;m<h;m++){if(k[f[m]]){return c.apply(this,arguments)}}}}catch(g){}}b.each(["keydown","keyup","keypress"],function(){b.event.special[this]={add:a}})})(jQuery||this.jQuery||window.jQuery);
/*
 * input事件扩展:详情参见：jquery.event.input.js 
 */
;(function(e,d,c){if("onpropertychange" in document){var a=/^INPUT|TEXTAREA$/,b=function(f){return a.test(f.nodeName)};e.event.special[c]={setup:function(){var f=this;if(!b(f)){return false}e.data(f,"@oldValue",f.value);e.event.add(f,"propertychange",function(g){if(e.data(this,"@oldValue")!==this.value){e.event.trigger("input",null,this)}e.data(this,"@oldValue",this.value)})},teardown:function(){var f=this;if(!b(f)){return false}e.event.remove(f,"propertychange");e.removeData(f,"@oldValue")}}}e.fn[c]=function(f){return f?this.bind(c,f):this.trigger(c)}})(jQuery,[],"input");
/*
 * outerClick事件扩展:详情参见：jquery.event.outerClick.js 
 */
;(function(c,b,d){function a(h){for(var f=0,e=b.length,j=h.target,g;f<e;f++){g=b[f];if(g!==j&&!(g.contains?g.contains(j):g.compareDocumentPosition?g.compareDocumentPosition(j)&16:1)){c.event.trigger(d,h,g)}}}c.event.special[d]={setup:function(){var e=b.length;if(!e){c.event.add(document,"click",a)}if(c.inArray(this,b)<0){b[e]=this}},teardown:function(){var e=c.inArray(this,b);if(e>=0){b.splice(e,1);if(!b.length){c.event.remove(document,"click",a)}}}};c.fn[d]=function(e){return e?this.bind(d,e):this.trigger(d)}})(jQuery,[],"outerClick");
/*
 * resize事件扩展:详情参见：jquery.event.resize.js 
 */
;(function(e,d,g,j){var h=e([]),l=e.resize=e.extend(e.resize,{}),a,f=g+"-special-event",i="setTimeout",k="throttleWindow";l.delay=250;l[k]=true;function b(){a=d[i](function(){h.each(function(){var o=e(this),m=o.width(),n=o.height(),c=e.data(this,f);if(m!==c.w||n!==c.h){o.trigger("resize",[c.w=m,c.h=n])}});b()},l.delay)}e.event.special[g]={setup:function(){if(!l[k]&&this[i]){return false}var c=e(this);h=h.add(c);e.data(this,f,{w:c.width(),h:c.height()});if(h.length===1){b()}},teardown:function(){if(!l[k]&&this[i]){return false}var c=e(this);h=h.not(c);c.removeData(f);if(!h.length){window.clearTimeout(a)}},add:function(n){if(!l[k]&&this[i]){return false}var c=e.noop;function m(q,v,u){var t=e(this),r=e.data(this,f);r.w=(v!==j)?v:t.width();r.h=(u!==j)?u:t.height();c.apply(this,arguments)}if(e.isFunction(n)){c=n;return m}else{c=n.handler;n.handler=m}}}})(jQuery,this,"resize");
/*
 * mousewheel事件扩展:详情参见：jquery.event.mousewheel.js 
 */
;(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?module.exports=c:c(jQuery)})(function(c){function l(a){var b=a||window.event,k=r.call(arguments,1),g,e=0,d=0,f,l=0,n=0;a=c.event.fix(b);a.type="mousewheel";"detail"in b&&(d=-1*b.detail);"wheelDelta"in b&&(d=b.wheelDelta);"wheelDeltaY"in b&&(d=b.wheelDeltaY);"wheelDeltaX"in b&&(e=-1*b.wheelDeltaX);"axis"in b&&b.axis===b.HORIZONTAL_AXIS&&(e=-1*d,d=0);g=0===d?e:d;"deltaY"in b&&(g=d=-1*b.deltaY);"deltaX"in b&&(e=b.deltaX,0===d&&(g=-1*e));if(0!==d||0!==e){1===b.deltaMode?(f=c.data(this,"mousewheel-line-height"),g*=f,d*=f,e*=f):2===b.deltaMode&&(f=c.data(this,"mousewheel-page-height"),g*=f,d*=f,e*=f);f=Math.max(Math.abs(d),Math.abs(e));if(!h||f<h)h=f,m.settings.adjustOldDeltas&&"mousewheel"===b.type&&0===f%120&&(h/=40);m.settings.adjustOldDeltas&&"mousewheel"===b.type&&0===f%120&&(g/=40,e/=40,d/=40);g=Math[1<=g?"floor":"ceil"](g/h);e=Math[1<=e?"floor":"ceil"](e/h);d=Math[1<=d?"floor":"ceil"](d/h);m.settings.normalizeOffset&&this.getBoundingClientRect&&(b=this.getBoundingClientRect(),l=a.clientX-b.left,n=a.clientY-b.top);a.deltaX=e;a.deltaY=d;a.deltaFactor=h;a.offsetX=l;a.offsetY=n;a.deltaMode=0;k.unshift(a,g,e,d);p&&clearTimeout(p);p=setTimeout(t,200);return(c.event.dispatch||c.event.handle).apply(this,k)}}function t(){h=null}var n=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],k="onwheel"in document||9<=document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],r=Array.prototype.slice,p,h;if(c.event.fixHooks)for(var q=n.length;q;)c.event.fixHooks[n[--q]]=c.event.mouseHooks;var m=c.event.special.mousewheel={version:"3.1.11",setup:function(){if(this.addEventListener)for(var a=k.length;a;)this.addEventListener(k[--a],l,!1);else this.onmousewheel=l;c.data(this,"mousewheel-line-height",m.getLineHeight(this));c.data(this,"mousewheel-page-height",m.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var a=k.length;a;)this.removeEventListener(k[--a],l,!1);else this.onmousewheel=null;c.removeData(this,"mousewheel-line-height");c.removeData(this,"mousewheel-page-height")},getLineHeight:function(a){a=c(a)["offsetParent"in c.fn?"offsetParent":"parent"]();a.length||(a=c("body"));return parseInt(a.css("fontSize"),10)},getPageHeight:function(a){return c(a).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};c.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/*
 * jquery事件扩展:详情参见：jquery.event.fix.js 
 */
;(function(a){a.event.get=function(){if(!a.browser.msie){if(window.event){return window.event}var c=arguments.callee.caller;var b;var d=0;while(c!=null&&d<40){b=c.arguments[0];if(b&&(b.constructor==Event||b.constructor==MouseEvent)){return a.event.fix(b)}d++;c=c.caller}return a.event.fix(b)}else{return a.event.fix(window.event)}};a.fn.pasteEvents=function(b){if(b==undefined){b=10}return a(this).each(function(){var c=a(this);c.on("paste",function(){c.trigger("prepaste");setTimeout(function(){c.trigger("postpaste")},b)})})};a.each(("click dblclick ").split(" "),function(c,b){a.fn[b]=function(e,d){d=d||e;e=a.isFunction(e)?{}:e;return arguments.length>0?this.on(b,null,e,function(i){var g=this;var h=a.data(g,"disabled");if(h!=undefined&&h===true){return}var f=a(g).is("button")||a.trim(a(g).attr("role")||"")=="button"||a(g).hasClass("btn");if(f&&a.trim(a(g).attr("role")||"")!="tab"){a.when(a.Deferred(function(k){a(g).disabled();if(a.isFunction(d)){d.call(g,i)}if(e.resolveType=="custom"){a(g).off("btn:enabled").on("btn:enabled",function(){k.resolve()})}else{var j=parseInt(e.statusDelay||800);window.setTimeout(function(){k.resolve()},j)}}).promise()).always(function(){a(g).enabled()})}else{if(a.isFunction(d)){d.call(g,i)}}}):this.trigger(b)}});a.fn.triggerEvent=function(b,c,d){return this.each(function(){jQuery.event.trigger(b,c,this);if(a.isFunction(c)){d=c}if(a.isFunction(d)){d.call(this,b,c)}})}})(jQuery);
/*
 * jquery事件委托:详情参见：jquery.event.delegate.js 
 */
;(function(a){a(document).off("click.data-api",'[data-toggle*="clearfix"]').on("click.data-api",'[data-toggle*="clearfix"]',function(b){if(b.currentTarget=this){var c=a(this).data("target");if(a.trim(c).length>0){a(c).each(function(){var e=this.type,d=this.tagName.toLowerCase();if((e=="hidden"&&(d=="input"||d=="textarea"))||e=="text"||e=="password"||d=="textarea"){this.value=""}else{if(e=="checkbox"||e=="radio"){this.checked=false}else{if(d=="select"){this.selectedIndex=-1}}}})}}}).off("keyup.data-api",'[data-toggle*="float"]').on("keyup.data-api",'[data-toggle*="float"]',function(i){if(a.trim(this.value).length>0){this.value=this.value.replace(/[^\d|.]/g,"")||"";this.value=this.value.replace(/\.+/g,".")||"";var c=this.value.indexOf(".");if(c==0){this.value="0"+this.value}if(c>0){var h=this.value.substring(this.value.indexOf("."),this.value.length);if(a.trim(h).length>0){var j=this.value.lastIndexOf(".");if(c!=j){this.value=this.value.substr(0,j)}if(a.defined(a(this).data("mined"))){var d=parseFloat(a(this).data("mined")||0);if(parseFloat(this.value)<d){this.value=d}}if(a.defined(a(this).data("maxed"))){var b=parseFloat(a(this).data("maxed")||0);if(parseFloat(this.value)>b){this.value=b}}if(a.defined(a(this).data("fixed"))){var g=parseInt(a(this).data("fixed")||0);if(a.trim(h).length>g){this.value=Number(this.value).toFixed(g)}}}}else{if(a.defined(a(this).data("maxed"))){var b=parseFloat(a(this).data("maxed")||0);if(parseInt(this.value)>b){var f=a.trim(this.value).length;this.value=a.trim(this.value).substring(0,(f>1?f-1:0))}}if(a.defined(a(this).data("mined"))){var d=parseFloat(a(this).data("mined")||0);if(parseInt(this.value)<d){this.value=d}}this.value=Number(this.value).toFixed(0)}}}).on("blur.data-api",'[data-toggle*="float"]',function(c){if(a.trim(this.value).length>0){var b=this.value.indexOf(".");if(b==(this.value.length-1)){this.value=this.value.substr(0,b)}this.value=Number(this.value)}}).off("keydown.data-api").on("keydown.data-api","*",function(c){var b=a.event.fix(c);if(b.keyCode==8){if(a(this).is("input")||a(this).is("textarea")){if(a(this).prop("readonly")==true||a(this).prop("disabled")==true){b.preventDefault()}}else{b.preventDefault()}b.stopPropagation()}else{if(b.keyCode==13){if(a(this).is("input")||a(this).is("textarea")){if(a(this).hasClass("ui-pg-input")){b.preventDefault()}}}else{if(b.keyCode==27){b.preventDefault();b.stopPropagation()}}}}).off("focus",".ke-input-text").on("focus",".ke-input-text",function(){return false})})(jQuery);

/*
 * 对popover在bootbox中做兼容处理
 */
;$(function(){$(".popover").on("shown.bs.popover",function(){var _this=$(this);var t=parseInt($(this).css("top"));var bootbox=$(".bootbox");if(t<100&&bootbox.size()>0){_this.addClass("topmost")}})});
