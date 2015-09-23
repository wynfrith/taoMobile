function urlEncode(t,e,n){if(null==t)return"";var r="",i=typeof t;if("string"==i||"number"==i||"boolean"==i)r+="&"+e+"="+(null==n||n?t:t);else for(var o in t){var a=null==e?o:e+(t instanceof Array?"["+o+"]":"."+o);r+=urlEncode(t[o],a,n)}return r}function urlToObj(t,e){e||(e={});var n,r,i;if(null==t)return e;t=t.split("?").slice(-1)[0],console.log(t);var o=t.split("&");return o.forEach(function(t){i=t.split("="),n=i[0],r=i[1],e[n]=r}),e}!function(t,e){var n=t.documentElement,r="orientationchange"in window?"orientationchange":"resize",i=function(){var t=n.clientWidth;t&&(n.style.fontSize=100*(t/320)+"px")};t.addEventListener&&(e.addEventListener(r,i,!1),t.addEventListener("DOMContentLoaded",i,!1))}(document,window);var Zepto=function(){function t(t){return null==t?String(t):B[Y.call(t)]||"object"}function e(e){return"function"==t(e)}function n(t){return null!=t&&t==t.window}function r(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function i(e){return"object"==t(e)}function o(t){return i(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype}function a(t){return"number"==typeof t.length}function s(t){return N.call(t,function(t){return null!=t})}function c(t){return t.length>0?T.fn.concat.apply([],t):t}function u(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(t){return t in P?P[t]:P[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function f(t,e){return"number"!=typeof e||M[u(t)]?e:e+"px"}function h(t){var e,n;return O[t]||(e=L.createElement(t),L.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),O[t]=n),O[t]}function p(t){return"children"in t?j.call(t.children):T.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function d(t,e,n){for(x in e)n&&(o(e[x])||G(e[x]))?(o(e[x])&&!o(t[x])&&(t[x]={}),G(e[x])&&!G(t[x])&&(t[x]=[]),d(t[x],e[x],n)):e[x]!==b&&(t[x]=e[x])}function m(t,e){return null==e?T(t):T(t).filter(e)}function g(t,n,r,i){return e(n)?n.call(t,r,i):n}function v(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function y(t,e){var n=t.className||"",r=n&&n.baseVal!==b;return e===b?r?n.baseVal:n:void(r?n.baseVal=e:t.className=e)}function w(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?T.parseJSON(t):t):t}catch(e){return t}}function E(t,e){e(t);for(var n=0,r=t.childNodes.length;r>n;n++)E(t.childNodes[n],e)}var b,x,T,C,k,S,$=[],j=$.slice,N=$.filter,L=window.document,O={},P={},M={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},A=/^\s*<(\w+|!)[^>]*>/,D=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,F=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,_=/^(?:body|html)$/i,R=/([A-Z])/g,Z=["val","css","html","text","data","width","height","offset"],q=["after","prepend","before","append"],z=L.createElement("table"),H=L.createElement("tr"),I={tr:L.createElement("tbody"),tbody:z,thead:z,tfoot:z,td:H,th:H,"*":L.createElement("div")},W=/complete|loaded|interactive/,X=/^[\w-]*$/,B={},Y=B.toString,V={},U=L.createElement("div"),J={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},G=Array.isArray||function(t){return t instanceof Array};return V.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var r,i=t.parentNode,o=!i;return o&&(i=U).appendChild(t),r=~V.qsa(i,e).indexOf(t),o&&U.removeChild(t),r},k=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},S=function(t){return N.call(t,function(e,n){return t.indexOf(e)==n})},V.fragment=function(t,e,n){var r,i,a;return D.test(t)&&(r=T(L.createElement(RegExp.$1))),r||(t.replace&&(t=t.replace(F,"<$1></$2>")),e===b&&(e=A.test(t)&&RegExp.$1),e in I||(e="*"),a=I[e],a.innerHTML=""+t,r=T.each(j.call(a.childNodes),function(){a.removeChild(this)})),o(n)&&(i=T(r),T.each(n,function(t,e){Z.indexOf(t)>-1?i[t](e):i.attr(t,e)})),r},V.Z=function(t,e){return t=t||[],t.__proto__=T.fn,t.selector=e||"",t},V.isZ=function(t){return t instanceof V.Z},V.init=function(t,n){var r;if(!t)return V.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&A.test(t))r=V.fragment(t,RegExp.$1,n),t=null;else{if(n!==b)return T(n).find(t);r=V.qsa(L,t)}else{if(e(t))return T(L).ready(t);if(V.isZ(t))return t;if(G(t))r=s(t);else if(i(t))r=[t],t=null;else if(A.test(t))r=V.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==b)return T(n).find(t);r=V.qsa(L,t)}}return V.Z(r,t)},T=function(t,e){return V.init(t,e)},T.extend=function(t){var e,n=j.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){d(t,n,e)}),t},V.qsa=function(t,e){var n,i="#"==e[0],o=!i&&"."==e[0],a=i||o?e.slice(1):e,s=X.test(a);return r(t)&&s&&i?(n=t.getElementById(a))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:j.call(s&&!i?o?t.getElementsByClassName(a):t.getElementsByTagName(e):t.querySelectorAll(e))},T.contains=L.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},T.type=t,T.isFunction=e,T.isWindow=n,T.isArray=G,T.isPlainObject=o,T.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},T.inArray=function(t,e,n){return $.indexOf.call(e,t,n)},T.camelCase=k,T.trim=function(t){return null==t?"":String.prototype.trim.call(t)},T.uuid=0,T.support={},T.expr={},T.map=function(t,e){var n,r,i,o=[];if(a(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&o.push(n);else for(i in t)n=e(t[i],i),null!=n&&o.push(n);return c(o)},T.each=function(t,e){var n,r;if(a(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(r in t)if(e.call(t[r],r,t[r])===!1)return t;return t},T.grep=function(t,e){return N.call(t,e)},window.JSON&&(T.parseJSON=JSON.parse),T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){B["[object "+e+"]"]=e.toLowerCase()}),T.fn={forEach:$.forEach,reduce:$.reduce,push:$.push,sort:$.sort,indexOf:$.indexOf,concat:$.concat,map:function(t){return T(T.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return T(j.apply(this,arguments))},ready:function(t){return W.test(L.readyState)&&L.body?t(T):L.addEventListener("DOMContentLoaded",function(){t(T)},!1),this},get:function(t){return t===b?j.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return $.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return e(t)?this.not(this.not(t)):T(N.call(this,function(e){return V.matches(e,t)}))},add:function(t,e){return T(S(this.concat(T(t,e))))},is:function(t){return this.length>0&&V.matches(this[0],t)},not:function(t){var n=[];if(e(t)&&t.call!==b)this.each(function(e){t.call(this,e)||n.push(this)});else{var r="string"==typeof t?this.filter(t):a(t)&&e(t.item)?j.call(t):T(t);this.forEach(function(t){r.indexOf(t)<0&&n.push(t)})}return T(n)},has:function(t){return this.filter(function(){return i(t)?T.contains(this,t):T(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!i(t)?t:T(t)},last:function(){var t=this[this.length-1];return t&&!i(t)?t:T(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?T(t).filter(function(){var t=this;return $.some.call(n,function(e){return T.contains(e,t)})}):1==this.length?T(V.qsa(this[0],t)):this.map(function(){return V.qsa(this,t)}):T()},closest:function(t,e){var n=this[0],i=!1;for("object"==typeof t&&(i=T(t));n&&!(i?i.indexOf(n)>=0:V.matches(n,t));)n=n!==e&&!r(n)&&n.parentNode;return T(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=T.map(n,function(t){return(t=t.parentNode)&&!r(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return m(e,t)},parent:function(t){return m(S(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return p(this)}),t)},contents:function(){return this.map(function(){return j.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,e){return N.call(p(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return T.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=h(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=e(t);if(this[0]&&!n)var r=T(t).get(0),i=r.parentNode||this.length>1;return this.each(function(e){T(this).wrapAll(n?t.call(this,e):i?r.cloneNode(!0):r)})},wrapAll:function(t){if(this[0]){T(this[0]).before(t=T(t));for(var e;(e=t.children()).length;)t=e.first();T(t).append(this)}return this},wrapInner:function(t){var n=e(t);return this.each(function(e){var r=T(this),i=r.contents(),o=n?t.call(this,e):t;i.length?i.wrapAll(o):r.append(o)})},unwrap:function(){return this.parent().each(function(){T(this).replaceWith(T(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=T(this);(t===b?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return T(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return T(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;T(this).empty().append(g(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=g(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(t,e){var n;return"string"!=typeof t||1 in arguments?this.each(function(n){if(1===this.nodeType)if(i(t))for(x in t)v(this,x,t[x]);else v(this,t,g(this,e,n,this.getAttribute(t)))}):this.length&&1===this[0].nodeType?!(n=this[0].getAttribute(t))&&t in this[0]?this[0][t]:n:b},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){v(this,t)},this)})},prop:function(t,e){return t=J[t]||t,1 in arguments?this.each(function(n){this[t]=g(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(t,e){var n="data-"+t.replace(R,"-$1").toLowerCase(),r=1 in arguments?this.attr(n,e):this.attr(n);return null!==r?w(r):b},val:function(t){return 0 in arguments?this.each(function(e){this.value=g(this,t,e,this.value)}):this[0]&&(this[0].multiple?T(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var n=T(this),r=g(this,t,e,n.offset()),i=n.offsetParent().offset(),o={top:r.top-i.top,left:r.left-i.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(e,n){if(arguments.length<2){var r,i=this[0];if(!i)return;if(r=getComputedStyle(i,""),"string"==typeof e)return i.style[k(e)]||r.getPropertyValue(e);if(G(e)){var o={};return T.each(e,function(t,e){o[e]=i.style[k(e)]||r.getPropertyValue(e)}),o}}var a="";if("string"==t(e))n||0===n?a=u(e)+":"+f(e,n):this.each(function(){this.style.removeProperty(u(e))});else for(x in e)e[x]||0===e[x]?a+=u(x)+":"+f(x,e[x])+";":this.each(function(){this.style.removeProperty(u(x))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(T(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?$.some.call(this,function(t){return this.test(y(t))},l(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){C=[];var n=y(this),r=g(this,t,e,n);r.split(/\s+/g).forEach(function(t){T(this).hasClass(t)||C.push(t)},this),C.length&&y(this,n+(n?" ":"")+C.join(" "))}}):this},removeClass:function(t){return this.each(function(e){if("className"in this){if(t===b)return y(this,"");C=y(this),g(this,t,e,C).split(/\s+/g).forEach(function(t){C=C.replace(l(t)," ")}),y(this,C.trim())}})},toggleClass:function(t,e){return t?this.each(function(n){var r=T(this),i=g(this,t,n,y(this));i.split(/\s+/g).forEach(function(t){(e===b?!r.hasClass(t):e)?r.addClass(t):r.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===b?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===b?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),r=_.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(T(t).css("margin-top"))||0,n.left-=parseFloat(T(t).css("margin-left"))||0,r.top+=parseFloat(T(e[0]).css("border-top-width"))||0,r.left+=parseFloat(T(e[0]).css("border-left-width"))||0,{top:n.top-r.top,left:n.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||L.body;t&&!_.test(t.nodeName)&&"static"==T(t).css("position");)t=t.offsetParent;return t})}},T.fn.detach=T.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});T.fn[t]=function(i){var o,a=this[0];return i===b?n(a)?a["inner"+e]:r(a)?a.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){a=T(this),a.css(t,g(this,i,e,a[t]()))})}}),q.forEach(function(e,n){var r=n%2;T.fn[e]=function(){var e,i,o=T.map(arguments,function(n){return e=t(n),"object"==e||"array"==e||null==n?n:V.fragment(n)}),a=this.length>1;return o.length<1?this:this.each(function(t,e){i=r?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null;var s=T.contains(L.documentElement,i);o.forEach(function(t){if(a)t=t.cloneNode(!0);else if(!i)return T(t).remove();i.insertBefore(t,e),s&&E(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},T.fn[r?e+"To":"insert"+(n?"Before":"After")]=function(t){return T(t)[e](this),this}}),V.Z.prototype=T.fn,V.uniq=S,V.deserializeValue=w,T.zepto=V,T}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function e(t){return t._zid||(t._zid=h++)}function n(t,n,o,a){if(n=r(n),n.ns)var s=i(n.ns);return(g[e(t)]||[]).filter(function(t){return!(!t||n.e&&t.e!=n.e||n.ns&&!s.test(t.ns)||o&&e(t.fn)!==e(o)||a&&t.sel!=a)})}function r(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function i(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,e){return t.del&&!y&&t.e in w||!!e}function a(t){return E[t]||y&&w[t]||t}function s(n,i,s,c,l,h,p){var d=e(n),m=g[d]||(g[d]=[]);i.split(/\s/).forEach(function(e){if("ready"==e)return t(document).ready(s);var i=r(e);i.fn=s,i.sel=l,i.e in E&&(s=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?i.fn.apply(this,arguments):void 0}),i.del=h;var d=h||s;i.proxy=function(t){if(t=u(t),!t.isImmediatePropagationStopped()){t.data=c;var e=d.apply(n,t._args==f?[t]:[t].concat(t._args));return e===!1&&(t.preventDefault(),t.stopPropagation()),e}},i.i=m.length,m.push(i),"addEventListener"in n&&n.addEventListener(a(i.e),i.proxy,o(i,p))})}function c(t,r,i,s,c){var u=e(t);(r||"").split(/\s/).forEach(function(e){n(t,e,i,s).forEach(function(e){delete g[u][e.i],"removeEventListener"in t&&t.removeEventListener(a(e.e),e.proxy,o(e,c))})})}function u(e,n){return(n||!e.isDefaultPrevented)&&(n||(n=e),t.each(C,function(t,r){var i=n[t];e[t]=function(){return this[r]=b,i&&i.apply(n,arguments)},e[r]=x}),(n.defaultPrevented!==f?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=b)),e}function l(t){var e,n={originalEvent:t};for(e in t)T.test(e)||t[e]===f||(n[e]=t[e]);return u(n,t)}var f,h=1,p=Array.prototype.slice,d=t.isFunction,m=function(t){return"string"==typeof t},g={},v={},y="onfocusin"in window,w={focus:"focusin",blur:"focusout"},E={mouseenter:"mouseover",mouseleave:"mouseout"};v.click=v.mousedown=v.mouseup=v.mousemove="MouseEvents",t.event={add:s,remove:c},t.proxy=function(n,r){var i=2 in arguments&&p.call(arguments,2);if(d(n)){var o=function(){return n.apply(r,i?i.concat(p.call(arguments)):arguments)};return o._zid=e(n),o}if(m(r))return i?(i.unshift(n[r],n),t.proxy.apply(null,i)):t.proxy(n[r],n);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,r){return this.on(t,e,n,r,1)};var b=function(){return!0},x=function(){return!1},T=/^([A-Z]|returnValue$|layer[XY]$)/,C={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,n,r,i,o){var a,u,h=this;return e&&!m(e)?(t.each(e,function(t,e){h.on(t,n,r,e,o)}),h):(m(n)||d(i)||i===!1||(i=r,r=n,n=f),(d(r)||r===!1)&&(i=r,r=f),i===!1&&(i=x),h.each(function(f,h){o&&(a=function(t){return c(h,t.type,i),i.apply(this,arguments)}),n&&(u=function(e){var r,o=t(e.target).closest(n,h).get(0);return o&&o!==h?(r=t.extend(l(e),{currentTarget:o,liveFired:h}),(a||i).apply(o,[r].concat(p.call(arguments,1)))):void 0}),s(h,e,i,r,n,u||a)}))},t.fn.off=function(e,n,r){var i=this;return e&&!m(e)?(t.each(e,function(t,e){i.off(t,n,e)}),i):(m(n)||d(r)||r===!1||(r=n,n=f),r===!1&&(r=x),i.each(function(){c(this,e,r,n)}))},t.fn.trigger=function(e,n){return e=m(e)||t.isPlainObject(e)?t.Event(e):u(e),e._args=n,this.each(function(){e.type in w&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,r){var i,o;return this.each(function(a,s){i=l(m(e)?t.Event(e):e),i._args=r,i.target=s,t.each(n(s,e.type||e),function(t,e){return o=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){m(t)||(e=t,t=e.type);var n=document.createEvent(v[t]||"Events"),r=!0;if(e)for(var i in e)"bubbles"==i?r=!!e[i]:n[i]=e[i];return n.initEvent(t,r,!0),u(n)}}(Zepto),function(t){function e(e,n,r){var i=t.Event(n);return t(e).trigger(i,r),!i.isDefaultPrevented()}function n(t,n,r,i){return t.global?e(n||y,r,i):void 0}function r(e){e.global&&0===t.active++&&n(e,null,"ajaxStart")}function i(e){e.global&&!--t.active&&n(e,null,"ajaxStop")}function o(t,e){var r=e.context;return e.beforeSend.call(r,t,e)===!1||n(e,r,"ajaxBeforeSend",[t,e])===!1?!1:void n(e,r,"ajaxSend",[t,e])}function a(t,e,r,i){var o=r.context,a="success";r.success.call(o,t,a,e),i&&i.resolveWith(o,[t,a,e]),n(r,o,"ajaxSuccess",[e,r,t]),c(a,e,r)}function s(t,e,r,i,o){var a=i.context;i.error.call(a,r,e,t),o&&o.rejectWith(a,[r,e,t]),n(i,a,"ajaxError",[r,i,t||e]),c(e,r,i)}function c(t,e,r){var o=r.context;r.complete.call(o,e,t),n(r,o,"ajaxComplete",[e,r]),i(r)}function u(){}function l(t){return t&&(t=t.split(";",2)[0]),t&&(t==T?"html":t==x?"json":E.test(t)?"script":b.test(t)&&"xml")||"text"}function f(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function h(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=f(e.url,e.data),e.data=void 0)}function p(e,n,r,i){return t.isFunction(n)&&(i=r,r=n,n=void 0),t.isFunction(r)||(i=r,r=void 0),{url:e,data:n,success:r,dataType:i}}function d(e,n,r,i){var o,a=t.isArray(n),s=t.isPlainObject(n);t.each(n,function(n,c){o=t.type(c),i&&(n=r?i:i+"["+(s||"object"==o||"array"==o?n:"")+"]"),!i&&a?e.add(c.name,c.value):"array"==o||!r&&"object"==o?d(e,c,r,n):e.add(n,c)})}var m,g,v=0,y=window.document,w=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,E=/^(?:text|application)\/javascript/i,b=/^(?:text|application)\/xml/i,x="application/json",T="text/html",C=/^\s*$/,k=y.createElement("a");k.href=window.location.href,t.active=0,t.ajaxJSONP=function(e,n){if(!("type"in e))return t.ajax(e);var r,i,c=e.jsonpCallback,u=(t.isFunction(c)?c():c)||"jsonp"+ ++v,l=y.createElement("script"),f=window[u],h=function(e){t(l).triggerHandler("error",e||"abort")},p={abort:h};return n&&n.promise(p),t(l).on("load error",function(o,c){clearTimeout(i),t(l).off().remove(),"error"!=o.type&&r?a(r[0],p,e,n):s(null,c||"error",p,e,n),window[u]=f,r&&t.isFunction(f)&&f(r[0]),f=r=void 0}),o(p,e)===!1?(h("abort"),p):(window[u]=function(){r=arguments},l.src=e.url.replace(/\?(.+)=\?/,"?$1="+u),y.head.appendChild(l),e.timeout>0&&(i=setTimeout(function(){h("timeout")},e.timeout)),p)},t.ajaxSettings={type:"GET",beforeSend:u,success:u,error:u,complete:u,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:x,xml:"application/xml, text/xml",html:T,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n,i=t.extend({},e||{}),c=t.Deferred&&t.Deferred();for(m in t.ajaxSettings)void 0===i[m]&&(i[m]=t.ajaxSettings[m]);r(i),i.crossDomain||(n=y.createElement("a"),n.href=i.url,n.href=n.href,i.crossDomain=k.protocol+"//"+k.host!=n.protocol+"//"+n.host),i.url||(i.url=window.location.toString()),h(i);var p=i.dataType,d=/\?.+=\?/.test(i.url);if(d&&(p="jsonp"),i.cache!==!1&&(e&&e.cache===!0||"script"!=p&&"jsonp"!=p)||(i.url=f(i.url,"_="+Date.now())),"jsonp"==p)return d||(i.url=f(i.url,i.jsonp?i.jsonp+"=?":i.jsonp===!1?"":"callback=?")),t.ajaxJSONP(i,c);var v,w=i.accepts[p],E={},b=function(t,e){E[t.toLowerCase()]=[t,e]},x=/^([\w-]+:)\/\//.test(i.url)?RegExp.$1:window.location.protocol,T=i.xhr(),S=T.setRequestHeader;if(c&&c.promise(T),i.crossDomain||b("X-Requested-With","XMLHttpRequest"),b("Accept",w||"*/*"),(w=i.mimeType||w)&&(w.indexOf(",")>-1&&(w=w.split(",",2)[0]),T.overrideMimeType&&T.overrideMimeType(w)),(i.contentType||i.contentType!==!1&&i.data&&"GET"!=i.type.toUpperCase())&&b("Content-Type",i.contentType||"application/x-www-form-urlencoded"),i.headers)for(g in i.headers)b(g,i.headers[g]);if(T.setRequestHeader=b,T.onreadystatechange=function(){if(4==T.readyState){T.onreadystatechange=u,clearTimeout(v);var e,n=!1;if(T.status>=200&&T.status<300||304==T.status||0==T.status&&"file:"==x){p=p||l(i.mimeType||T.getResponseHeader("content-type")),e=T.responseText;try{"script"==p?(1,eval)(e):"xml"==p?e=T.responseXML:"json"==p&&(e=C.test(e)?null:t.parseJSON(e))}catch(r){n=r}n?s(n,"parsererror",T,i,c):a(e,T,i,c)}else s(T.statusText||null,T.status?"error":"abort",T,i,c)}},o(T,i)===!1)return T.abort(),s(null,"abort",T,i,c),T;if(i.xhrFields)for(g in i.xhrFields)T[g]=i.xhrFields[g];var $="async"in i?i.async:!0;T.open(i.type,i.url,$,i.username,i.password);for(g in E)S.apply(T,E[g]);return i.timeout>0&&(v=setTimeout(function(){T.onreadystatechange=u,T.abort(),s(null,"timeout",T,i,c)},i.timeout)),T.send(i.data?i.data:null),T},t.get=function(){return t.ajax(p.apply(null,arguments))},t.post=function(){var e=p.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=p.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,r){if(!this.length)return this;var i,o=this,a=e.split(/\s/),s=p(e,n,r),c=s.success;return a.length>1&&(s.url=a[0],i=a[1]),s.success=function(e){o.html(i?t("<div>").html(e.replace(w,"")).find(i):e),c&&c.apply(o,arguments)},t.ajax(s),this};var S=encodeURIComponent;t.param=function(e,n){var r=[];return r.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(S(e)+"="+S(n))},d(r,e,n),r.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var e,n,r=[],i=function(t){return t.forEach?t.forEach(i):void r.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(r,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&i(t(o).val())}),r},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto),!function(){"use strict";function t(e,r){function i(t,e){return function(){return t.apply(e,arguments)}}var o;if(r=r||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=r.touchBoundary||10,this.layer=e,this.tapDelay=r.tapDelay||200,this.tapTimeout=r.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],s=this,c=0,u=a.length;u>c;c++)s[a[c]]=i(s[a[c]],s);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,r){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,r):i.call(e,t,n,r)},e.addEventListener=function(t,n,r){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),r):i.call(e,t,n,r)}),"function"==typeof e.onclick&&(o=e.onclick,e.addEventListener("click",function(t){o(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,r=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=r&&/OS 4_\d(_\d)?/.test(navigator.userAgent),o=r&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(r&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,r;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),r=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,r.screenX,r.screenY,r.clientX,r.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;r&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,o;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],r){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,s,c,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,o&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),s=l.tagName.toLowerCase(),"label"===s){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||r&&window.top!==window&&"input"===s?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),r&&"select"===s||(this.targetElement=null,t.preventDefault()),!1);return r&&!i&&(c=l.fastClickScrollParent,c&&c.fastClickLastScrollTop!==c.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:!t.cancelable||this.needsClick(this.targetElement)&&!this.cancelNextClick?!0:(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),
t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,r,i,o;if("undefined"==typeof window.ontouchstart)return!0;if(r=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(r>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(o=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],o>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}(),!function(){function t(t){return t.replace(w,"").replace(E,",").replace(b,"").replace(x,"").replace(T,"").split(C)}function e(t){return"'"+t.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function n(n,r){function i(t){return h+=t.split(/\n/).length-1,l&&(t=t.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),t&&(t=y[1]+e(t)+y[2]+"\n"),t}function o(e){var n=h;if(u?e=u(e,r):a&&(e=e.replace(/\n/g,function(){return h++,"$line="+h+";"})),0===e.indexOf("=")){var i=f&&!/^=[=#]/.test(e);if(e=e.replace(/^=[=#]?|[\s;]*$/g,""),i){var o=e.replace(/\s*\([^\)]+\)/,"");p[o]||/^(include|print)$/.test(o)||(e="$escape("+e+")")}else e="$string("+e+")";e=y[1]+e+y[2]}return a&&(e="$line="+n+";"+e),v(t(e),function(t){if(t&&!m[t]){var e;e="print"===t?E:"include"===t?b:p[t]?"$utils."+t:d[t]?"$helpers."+t:"$data."+t,x+=t+"="+e+",",m[t]=!0}}),e+"\n"}var a=r.debug,s=r.openTag,c=r.closeTag,u=r.parser,l=r.compress,f=r.escape,h=1,m={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},g="".trim,y=g?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],w=g?"$out+=text;return $out;":"$out.push(text);",E="function(){var text=''.concat.apply('',arguments);"+w+"}",b="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+w+"}",x="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(a?"$line=0,":""),T=y[0],C="return new String("+y[3]+");";v(n.split(s),function(t){t=t.split(c);var e=t[0],n=t[1];1===t.length?T+=i(e):(T+=o(e),n&&(T+=i(n)))});var k=x+T+C;a&&(k="try{"+k+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+e(n)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var S=new Function("$data","$filename",k);return S.prototype=p,S}catch($){throw $.temp="function anonymous($data,$filename) {"+k+"}",$}}var r=function(t,e){return"string"==typeof e?g(e,{filename:t}):a(t,e)};r.version="3.0.0",r.config=function(t,e){i[t]=e};var i=r.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},o=r.cache={};r.render=function(t,e){return g(t,e)};var a=r.renderFile=function(t,e){var n=r.get(t)||m({filename:t,name:"Render Error",message:"Template not found"});return e?n(e):n};r.get=function(t){var e;if(o[t])e=o[t];else if("object"==typeof document){var n=document.getElementById(t);if(n){var r=(n.value||n.innerHTML).replace(/^\s*|\s*$/g,"");e=g(r,{filename:t})}}return e};var s=function(t,e){return"string"!=typeof t&&(e=typeof t,"number"===e?t+="":t="function"===e?s(t.call(t)):""),t},c={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},u=function(t){return c[t]},l=function(t){return s(t).replace(/&(?![\w#]+;)|[<>"']/g,u)},f=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},h=function(t,e){var n,r;if(f(t))for(n=0,r=t.length;r>n;n++)e.call(t,t[n],n,t);else for(n in t)e.call(t,t[n],n)},p=r.utils={$helpers:{},$include:a,$string:s,$escape:l,$each:h};r.helper=function(t,e){d[t]=e};var d=r.helpers=p.$helpers;r.onerror=function(t){var e="Template Error\n\n";for(var n in t)e+="<"+n+">\n"+t[n]+"\n\n";"object"==typeof console&&console.error(e)};var m=function(t){return r.onerror(t),function(){return"{Template Error}"}},g=r.compile=function(t,e){function r(n){try{return new c(n,s)+""}catch(r){return e.debug?m(r)():(e.debug=!0,g(t,e)(n))}}e=e||{};for(var a in i)void 0===e[a]&&(e[a]=i[a]);var s=e.filename;try{var c=n(t,e)}catch(u){return u.filename=s||"anonymous",u.name="Syntax Error",m(u)}return r.prototype=c.prototype,r.toString=function(){return c.toString()},s&&e.cache&&(o[s]=r),r},v=p.$each,y="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",w=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,E=/[^\w$]+/g,b=new RegExp(["\\b"+y.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),x=/^\d[^,]*|,\d[^,]*/g,T=/^,+|,+$/g,C=/^$|,+/;i.openTag="{{",i.closeTag="}}";var k=function(t,e){var n=e.split(":"),r=n.shift(),i=n.join(":")||"";return i&&(i=", "+i),"$helpers."+r+"("+t+i+")"};i.parser=function(t){t=t.replace(/^\s/,"");var e=t.split(" "),n=e.shift(),i=e.join(" ");switch(n){case"if":t="if("+i+"){";break;case"else":e="if"===e.shift()?" if("+e.join(" ")+")":"",t="}else"+e+"{";break;case"/if":t="}";break;case"each":var o=e[0]||"$data",a=e[1]||"as",s=e[2]||"$value",c=e[3]||"$index",u=s+","+c;"as"!==a&&(o="[]"),t="$each("+o+",function("+u+"){";break;case"/each":t="});";break;case"echo":t="print("+i+");";break;case"print":case"include":t=n+"("+e.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(i)){var l=!0;0===t.indexOf("#")&&(t=t.substr(1),l=!1);for(var f=0,h=t.split("|"),p=h.length,d=h[f++];p>f;f++)d=k(d,h[f]);t=(l?"=":"=#")+d}else t=r.helpers[n]?"=#"+n+"("+e.join(",")+");":"="+t}return t},"function"==typeof define?define(function(){return r}):"undefined"!=typeof exports?module.exports=r:this.template=r}(),template.helper("dateFormat",function(t,e){t=new Date(t);var n={M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds(),q:Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};return e=e.replace(/([yMdhmsqS])+/g,function(e,r){var i=n[r];return void 0!==i?(e.length>1&&(i="0"+i,i=i.substr(i.length-2)),i):"y"===r?(t.getFullYear()+"").substr(4-e.length):e})}),template.helper("omit",function(t,e){return t.length>e?t.substring(0,e)+"...":t});