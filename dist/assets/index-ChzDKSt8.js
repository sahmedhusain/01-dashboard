import{r as J,j as i,m as K,R as Pt}from"./animation-vendor-Ixux-_Rc.js";import{r as Lg,a as Yg}from"./react-vendor-DJG_os-6.js";import{g as $,u as Qg,A as Mu,_ as Zg,O as Vd,a as Vg,P as kg,b as Kg,I as Jg,c as Pg,d as Wg,f as Fg,e as fi,h as e0}from"./apollo-vendor-CY2L-3ta.js";import{L as Xd,M as kd,U as ci,a as t0,E as a0,b as l0,c as s0,C as Kd,d as di,T as Ls,A as n0,e as Jd,S as At,f as Eu,F as Ys,g as Pd,h as Wd,i as $u,j as Fd,k as i0,l as r0,m as u0,n as Du,o as c0,G as o0,D as f0,p as d0,q as Hd,X as m0,r as h0,s as g0,R as p0,H as y0}from"./ui-vendor-DiO1C7IC.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))d(h);new MutationObserver(h=>{for(const p of h)if(p.type==="childList")for(const j of p.addedNodes)j.tagName==="LINK"&&j.rel==="modulepreload"&&d(j)}).observe(document,{childList:!0,subtree:!0});function f(h){const p={};return h.integrity&&(p.integrity=h.integrity),h.referrerPolicy&&(p.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?p.credentials="include":h.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function d(h){if(h.ep)return;h.ep=!0;const p=f(h);fetch(h.href,p)}})();var Ru={exports:{}},Cs={},wu={exports:{}},Uu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ld;function x0(){return Ld||(Ld=1,function(r){function c(E,C){var V=E.length;E.push(C);e:for(;0<V;){var fe=V-1>>>1,re=E[fe];if(0<h(re,C))E[fe]=C,E[V]=re,V=fe;else break e}}function f(E){return E.length===0?null:E[0]}function d(E){if(E.length===0)return null;var C=E[0],V=E.pop();if(V!==C){E[0]=V;e:for(var fe=0,re=E.length,Ce=re>>>1;fe<Ce;){var xe=2*(fe+1)-1,ie=E[xe],Ee=xe+1,dt=E[Ee];if(0>h(ie,V))Ee<re&&0>h(dt,ie)?(E[fe]=dt,E[Ee]=V,fe=Ee):(E[fe]=ie,E[xe]=V,fe=xe);else if(Ee<re&&0>h(dt,V))E[fe]=dt,E[Ee]=V,fe=Ee;else break e}}return C}function h(E,C){var V=E.sortIndex-C.sortIndex;return V!==0?V:E.id-C.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var p=performance;r.unstable_now=function(){return p.now()}}else{var j=Date,S=j.now();r.unstable_now=function(){return j.now()-S}}var I=[],G=[],z=1,w=null,_=3,b=!1,N=!1,R=!1,q=!1,B=typeof setTimeout=="function"?setTimeout:null,X=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;function F(E){for(var C=f(G);C!==null;){if(C.callback===null)d(G);else if(C.startTime<=E)d(G),C.sortIndex=C.expirationTime,c(I,C);else break;C=f(G)}}function pe(E){if(R=!1,F(E),!N)if(f(I)!==null)N=!0,we||(we=!0,Ve());else{var C=f(G);C!==null&&ft(pe,C.startTime-E)}}var we=!1,Ue=-1,et=5,Ft=-1;function Ka(){return q?!0:!(r.unstable_now()-Ft<et)}function ea(){if(q=!1,we){var E=r.unstable_now();Ft=E;var C=!0;try{e:{N=!1,R&&(R=!1,X(Ue),Ue=-1),b=!0;var V=_;try{t:{for(F(E),w=f(I);w!==null&&!(w.expirationTime>E&&Ka());){var fe=w.callback;if(typeof fe=="function"){w.callback=null,_=w.priorityLevel;var re=fe(w.expirationTime<=E);if(E=r.unstable_now(),typeof re=="function"){w.callback=re,F(E),C=!0;break t}w===f(I)&&d(I),F(E)}else d(I);w=f(I)}if(w!==null)C=!0;else{var Ce=f(G);Ce!==null&&ft(pe,Ce.startTime-E),C=!1}}break e}finally{w=null,_=V,b=!1}C=void 0}}finally{C?Ve():we=!1}}}var Ve;if(typeof P=="function")Ve=function(){P(ea)};else if(typeof MessageChannel<"u"){var Ja=new MessageChannel,wa=Ja.port2;Ja.port1.onmessage=ea,Ve=function(){wa.postMessage(null)}}else Ve=function(){B(ea,0)};function ft(E,C){Ue=B(function(){E(r.unstable_now())},C)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(E){E.callback=null},r.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):et=0<E?Math.floor(1e3/E):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_next=function(E){switch(_){case 1:case 2:case 3:var C=3;break;default:C=_}var V=_;_=C;try{return E()}finally{_=V}},r.unstable_requestPaint=function(){q=!0},r.unstable_runWithPriority=function(E,C){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var V=_;_=E;try{return C()}finally{_=V}},r.unstable_scheduleCallback=function(E,C,V){var fe=r.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?fe+V:fe):V=fe,E){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=V+re,E={id:z++,callback:C,priorityLevel:E,startTime:V,expirationTime:re,sortIndex:-1},V>fe?(E.sortIndex=V,c(G,E),f(I)===null&&E===f(G)&&(R?(X(Ue),Ue=-1):R=!0,ft(pe,V-fe))):(E.sortIndex=re,c(I,E),N||b||(N=!0,we||(we=!0,Ve()))),E},r.unstable_shouldYield=Ka,r.unstable_wrapCallback=function(E){var C=_;return function(){var V=_;_=C;try{return E.apply(this,arguments)}finally{_=V}}}}(Uu)),Uu}var Yd;function v0(){return Yd||(Yd=1,wu.exports=x0()),wu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qd;function b0(){if(Qd)return Cs;Qd=1;var r=v0(),c=Lg(),f=Yg();function d(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function p(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function j(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function S(e){if(p(e)!==e)throw Error(d(188))}function I(e){var t=e.alternate;if(!t){if(t=p(e),t===null)throw Error(d(188));return t!==e?null:e}for(var a=e,l=t;;){var s=a.return;if(s===null)break;var n=s.alternate;if(n===null){if(l=s.return,l!==null){a=l;continue}break}if(s.child===n.child){for(n=s.child;n;){if(n===a)return S(s),e;if(n===l)return S(s),t;n=n.sibling}throw Error(d(188))}if(a.return!==l.return)a=s,l=n;else{for(var u=!1,o=s.child;o;){if(o===a){u=!0,a=s,l=n;break}if(o===l){u=!0,l=s,a=n;break}o=o.sibling}if(!u){for(o=n.child;o;){if(o===a){u=!0,a=n,l=s;break}if(o===l){u=!0,l=n,a=s;break}o=o.sibling}if(!u)throw Error(d(189))}}if(a.alternate!==l)throw Error(d(190))}if(a.tag!==3)throw Error(d(188));return a.stateNode.current===a?e:t}function G(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=G(e),t!==null)return t;e=e.sibling}return null}var z=Object.assign,w=Symbol.for("react.element"),_=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),R=Symbol.for("react.strict_mode"),q=Symbol.for("react.profiler"),B=Symbol.for("react.provider"),X=Symbol.for("react.consumer"),P=Symbol.for("react.context"),F=Symbol.for("react.forward_ref"),pe=Symbol.for("react.suspense"),we=Symbol.for("react.suspense_list"),Ue=Symbol.for("react.memo"),et=Symbol.for("react.lazy"),Ft=Symbol.for("react.activity"),Ka=Symbol.for("react.memo_cache_sentinel"),ea=Symbol.iterator;function Ve(e){return e===null||typeof e!="object"?null:(e=ea&&e[ea]||e["@@iterator"],typeof e=="function"?e:null)}var Ja=Symbol.for("react.client.reference");function wa(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Ja?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case q:return"Profiler";case R:return"StrictMode";case pe:return"Suspense";case we:return"SuspenseList";case Ft:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case P:return(e.displayName||"Context")+".Provider";case X:return(e._context.displayName||"Context")+".Consumer";case F:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ue:return t=e.displayName||null,t!==null?t:wa(e.type)||"Memo";case et:t=e._payload,e=e._init;try{return wa(e(t))}catch{}}return null}var ft=Array.isArray,E=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,C=f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V={pending:!1,data:null,method:null,action:null},fe=[],re=-1;function Ce(e){return{current:e}}function xe(e){0>re||(e.current=fe[re],fe[re]=null,re--)}function ie(e,t){re++,fe[re]=e.current,e.current=t}var Ee=Ce(null),dt=Ce(null),Tt=Ce(null),Pa=Ce(null);function Wa(e,t){switch(ie(Tt,t),ie(dt,e),ie(Ee,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?gd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=gd(t),e=pd(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}xe(Ee),ie(Ee,e)}function Rt(){xe(Ee),xe(dt),xe(Tt)}function ta(e){e.memoizedState!==null&&ie(Pa,e);var t=Ee.current,a=pd(t,e.type);t!==a&&(ie(dt,e),ie(Ee,a))}function Fa(e){dt.current===e&&(xe(Ee),xe(dt)),Pa.current===e&&(xe(Pa),$s._currentValue=V)}var L=Object.prototype.hasOwnProperty,_e=r.unstable_scheduleCallback,el=r.unstable_cancelCallback,Hl=r.unstable_shouldYield,Am=r.unstable_requestPaint,wt=r.unstable_now,Sm=r.unstable_getCurrentPriorityLevel,Vu=r.unstable_ImmediatePriority,ku=r.unstable_UserBlockingPriority,ks=r.unstable_NormalPriority,_m=r.unstable_LowPriority,Ku=r.unstable_IdlePriority,Nm=r.log,Tm=r.unstable_setDisableYieldValue,Ll=null,tt=null;function aa(e){if(typeof Nm=="function"&&Tm(e),tt&&typeof tt.setStrictMode=="function")try{tt.setStrictMode(Ll,e)}catch{}}var at=Math.clz32?Math.clz32:Um,Rm=Math.log,wm=Math.LN2;function Um(e){return e>>>=0,e===0?32:31-(Rm(e)/wm|0)|0}var Ks=256,Js=4194304;function Ua(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ps(e,t,a){var l=e.pendingLanes;if(l===0)return 0;var s=0,n=e.suspendedLanes,u=e.pingedLanes;e=e.warmLanes;var o=l&134217727;return o!==0?(l=o&~n,l!==0?s=Ua(l):(u&=o,u!==0?s=Ua(u):a||(a=o&~e,a!==0&&(s=Ua(a))))):(o=l&~n,o!==0?s=Ua(o):u!==0?s=Ua(u):a||(a=l&~e,a!==0&&(s=Ua(a)))),s===0?0:t!==0&&t!==s&&(t&n)===0&&(n=s&-s,a=t&-t,n>=a||n===32&&(a&4194048)!==0)?t:s}function Yl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Em(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ju(){var e=Ks;return Ks<<=1,(Ks&4194048)===0&&(Ks=256),e}function Pu(){var e=Js;return Js<<=1,(Js&62914560)===0&&(Js=4194304),e}function pi(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Ql(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Dm(e,t,a,l,s,n){var u=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var o=e.entanglements,m=e.expirationTimes,v=e.hiddenUpdates;for(a=u&~a;0<a;){var U=31-at(a),O=1<<U;o[U]=0,m[U]=-1;var A=v[U];if(A!==null)for(v[U]=null,U=0;U<A.length;U++){var T=A[U];T!==null&&(T.lane&=-536870913)}a&=~O}l!==0&&Wu(e,l,0),n!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=n&~(u&~t))}function Wu(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-at(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|a&4194090}function Fu(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var l=31-at(a),s=1<<l;s&t|e[l]&t&&(e[l]|=t),a&=~s}}function yi(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function xi(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ec(){var e=C.p;return e!==0?e:(e=window.event,e===void 0?32:$d(e.type))}function Om(e,t){var a=C.p;try{return C.p=e,t()}finally{C.p=a}}var la=Math.random().toString(36).slice(2),Ye="__reactFiber$"+la,ke="__reactProps$"+la,tl="__reactContainer$"+la,vi="__reactEvents$"+la,qm="__reactListeners$"+la,Mm="__reactHandles$"+la,tc="__reactResources$"+la,Zl="__reactMarker$"+la;function bi(e){delete e[Ye],delete e[ke],delete e[vi],delete e[qm],delete e[Mm]}function al(e){var t=e[Ye];if(t)return t;for(var a=e.parentNode;a;){if(t=a[tl]||a[Ye]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=bd(e);e!==null;){if(a=e[Ye])return a;e=bd(e)}return t}e=a,a=e.parentNode}return null}function ll(e){if(e=e[Ye]||e[tl]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function Vl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(d(33))}function sl(e){var t=e[tc];return t||(t=e[tc]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ie(e){e[Zl]=!0}var ac=new Set,lc={};function Ea(e,t){nl(e,t),nl(e+"Capture",t)}function nl(e,t){for(lc[e]=t,e=0;e<t.length;e++)ac.add(t[e])}var $m=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),sc={},nc={};function Im(e){return L.call(nc,e)?!0:L.call(sc,e)?!1:$m.test(e)?nc[e]=!0:(sc[e]=!0,!1)}function Ws(e,t,a){if(Im(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Fs(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function It(e,t,a,l){if(l===null)e.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+l)}}var ji,ic;function il(e){if(ji===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);ji=t&&t[1]||"",ic=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ji+e+ic}var Ai=!1;function Si(e,t){if(!e||Ai)return"";Ai=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var O=function(){throw Error()};if(Object.defineProperty(O.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(O,[])}catch(T){var A=T}Reflect.construct(e,[],O)}else{try{O.call()}catch(T){A=T}e.call(O.prototype)}}else{try{throw Error()}catch(T){A=T}(O=e())&&typeof O.catch=="function"&&O.catch(function(){})}}catch(T){if(T&&A&&typeof T.stack=="string")return[T.stack,A.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var n=l.DetermineComponentFrameRoot(),u=n[0],o=n[1];if(u&&o){var m=u.split(`
`),v=o.split(`
`);for(s=l=0;l<m.length&&!m[l].includes("DetermineComponentFrameRoot");)l++;for(;s<v.length&&!v[s].includes("DetermineComponentFrameRoot");)s++;if(l===m.length||s===v.length)for(l=m.length-1,s=v.length-1;1<=l&&0<=s&&m[l]!==v[s];)s--;for(;1<=l&&0<=s;l--,s--)if(m[l]!==v[s]){if(l!==1||s!==1)do if(l--,s--,0>s||m[l]!==v[s]){var U=`
`+m[l].replace(" at new "," at ");return e.displayName&&U.includes("<anonymous>")&&(U=U.replace("<anonymous>",e.displayName)),U}while(1<=l&&0<=s);break}}}finally{Ai=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?il(a):""}function Gm(e){switch(e.tag){case 26:case 27:case 5:return il(e.type);case 16:return il("Lazy");case 13:return il("Suspense");case 19:return il("SuspenseList");case 0:case 15:return Si(e.type,!1);case 11:return Si(e.type.render,!1);case 1:return Si(e.type,!0);case 31:return il("Activity");default:return""}}function rc(e){try{var t="";do t+=Gm(e),e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function mt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function uc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function zm(e){var t=uc(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),l=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var s=a.get,n=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(u){l=""+u,n.call(this,u)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return l},setValue:function(u){l=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function en(e){e._valueTracker||(e._valueTracker=zm(e))}function cc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),l="";return e&&(l=uc(e)?e.checked?"true":"false":e.value),e=l,e!==a?(t.setValue(e),!0):!1}function tn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Bm=/[\n"\\]/g;function ht(e){return e.replace(Bm,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function _i(e,t,a,l,s,n,u,o){e.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.type=u:e.removeAttribute("type"),t!=null?u==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+mt(t)):e.value!==""+mt(t)&&(e.value=""+mt(t)):u!=="submit"&&u!=="reset"||e.removeAttribute("value"),t!=null?Ni(e,u,mt(t)):a!=null?Ni(e,u,mt(a)):l!=null&&e.removeAttribute("value"),s==null&&n!=null&&(e.defaultChecked=!!n),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+mt(o):e.removeAttribute("name")}function oc(e,t,a,l,s,n,u,o){if(n!=null&&typeof n!="function"&&typeof n!="symbol"&&typeof n!="boolean"&&(e.type=n),t!=null||a!=null){if(!(n!=="submit"&&n!=="reset"||t!=null))return;a=a!=null?""+mt(a):"",t=t!=null?""+mt(t):a,o||t===e.value||(e.value=t),e.defaultValue=t}l=l??s,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=o?e.checked:!!l,e.defaultChecked=!!l,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.name=u)}function Ni(e,t,a){t==="number"&&tn(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function rl(e,t,a,l){if(e=e.options,t){t={};for(var s=0;s<a.length;s++)t["$"+a[s]]=!0;for(a=0;a<e.length;a++)s=t.hasOwnProperty("$"+e[a].value),e[a].selected!==s&&(e[a].selected=s),s&&l&&(e[a].defaultSelected=!0)}else{for(a=""+mt(a),t=null,s=0;s<e.length;s++){if(e[s].value===a){e[s].selected=!0,l&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function fc(e,t,a){if(t!=null&&(t=""+mt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+mt(a):""}function dc(e,t,a,l){if(t==null){if(l!=null){if(a!=null)throw Error(d(92));if(ft(l)){if(1<l.length)throw Error(d(93));l=l[0]}a=l}a==null&&(a=""),t=a}a=mt(t),e.defaultValue=a,l=e.textContent,l===a&&l!==""&&l!==null&&(e.value=l)}function ul(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var Cm=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function mc(e,t,a){var l=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,a):typeof a!="number"||a===0||Cm.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function hc(e,t,a){if(t!=null&&typeof t!="object")throw Error(d(62));if(e=e.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var s in t)l=t[s],t.hasOwnProperty(s)&&a[s]!==l&&mc(e,s,l)}else for(var n in t)t.hasOwnProperty(n)&&mc(e,n,t[n])}function Ti(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Hm=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function an(e){return Hm.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var Ri=null;function wi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var cl=null,ol=null;function gc(e){var t=ll(e);if(t&&(e=t.stateNode)){var a=e[ke]||null;e:switch(e=t.stateNode,t.type){case"input":if(_i(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ht(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var l=a[t];if(l!==e&&l.form===e.form){var s=l[ke]||null;if(!s)throw Error(d(90));_i(l,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<a.length;t++)l=a[t],l.form===e.form&&cc(l)}break e;case"textarea":fc(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&rl(e,!!a.multiple,t,!1)}}}var Ui=!1;function pc(e,t,a){if(Ui)return e(t,a);Ui=!0;try{var l=e(t);return l}finally{if(Ui=!1,(cl!==null||ol!==null)&&(Hn(),cl&&(t=cl,e=ol,ol=cl=null,gc(t),e)))for(t=0;t<e.length;t++)gc(e[t])}}function kl(e,t){var a=e.stateNode;if(a===null)return null;var l=a[ke]||null;if(l===null)return null;a=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(d(231,t,typeof a));return a}var Gt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ei=!1;if(Gt)try{var Kl={};Object.defineProperty(Kl,"passive",{get:function(){Ei=!0}}),window.addEventListener("test",Kl,Kl),window.removeEventListener("test",Kl,Kl)}catch{Ei=!1}var sa=null,Di=null,ln=null;function yc(){if(ln)return ln;var e,t=Di,a=t.length,l,s="value"in sa?sa.value:sa.textContent,n=s.length;for(e=0;e<a&&t[e]===s[e];e++);var u=a-e;for(l=1;l<=u&&t[a-l]===s[n-l];l++);return ln=s.slice(e,1<l?1-l:void 0)}function sn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function nn(){return!0}function xc(){return!1}function Ke(e){function t(a,l,s,n,u){this._reactName=a,this._targetInst=s,this.type=l,this.nativeEvent=n,this.target=u,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(a=e[o],this[o]=a?a(n):n[o]);return this.isDefaultPrevented=(n.defaultPrevented!=null?n.defaultPrevented:n.returnValue===!1)?nn:xc,this.isPropagationStopped=xc,this}return z(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=nn)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=nn)},persist:function(){},isPersistent:nn}),t}var Da={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rn=Ke(Da),Jl=z({},Da,{view:0,detail:0}),Lm=Ke(Jl),Oi,qi,Pl,un=z({},Jl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$i,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Pl&&(Pl&&e.type==="mousemove"?(Oi=e.screenX-Pl.screenX,qi=e.screenY-Pl.screenY):qi=Oi=0,Pl=e),Oi)},movementY:function(e){return"movementY"in e?e.movementY:qi}}),vc=Ke(un),Ym=z({},un,{dataTransfer:0}),Qm=Ke(Ym),Zm=z({},Jl,{relatedTarget:0}),Mi=Ke(Zm),Vm=z({},Da,{animationName:0,elapsedTime:0,pseudoElement:0}),km=Ke(Vm),Km=z({},Da,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Jm=Ke(Km),Pm=z({},Da,{data:0}),bc=Ke(Pm),Wm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},eh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function th(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=eh[e])?!!t[e]:!1}function $i(){return th}var ah=z({},Jl,{key:function(e){if(e.key){var t=Wm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=sn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Fm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$i,charCode:function(e){return e.type==="keypress"?sn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?sn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),lh=Ke(ah),sh=z({},un,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),jc=Ke(sh),nh=z({},Jl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$i}),ih=Ke(nh),rh=z({},Da,{propertyName:0,elapsedTime:0,pseudoElement:0}),uh=Ke(rh),ch=z({},un,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),oh=Ke(ch),fh=z({},Da,{newState:0,oldState:0}),dh=Ke(fh),mh=[9,13,27,32],Ii=Gt&&"CompositionEvent"in window,Wl=null;Gt&&"documentMode"in document&&(Wl=document.documentMode);var hh=Gt&&"TextEvent"in window&&!Wl,Ac=Gt&&(!Ii||Wl&&8<Wl&&11>=Wl),Sc=" ",_c=!1;function Nc(e,t){switch(e){case"keyup":return mh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Tc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var fl=!1;function gh(e,t){switch(e){case"compositionend":return Tc(t);case"keypress":return t.which!==32?null:(_c=!0,Sc);case"textInput":return e=t.data,e===Sc&&_c?null:e;default:return null}}function ph(e,t){if(fl)return e==="compositionend"||!Ii&&Nc(e,t)?(e=yc(),ln=Di=sa=null,fl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ac&&t.locale!=="ko"?null:t.data;default:return null}}var yh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!yh[e.type]:t==="textarea"}function wc(e,t,a,l){cl?ol?ol.push(l):ol=[l]:cl=l,t=kn(t,"onChange"),0<t.length&&(a=new rn("onChange","change",null,a,l),e.push({event:a,listeners:t}))}var Fl=null,es=null;function xh(e){od(e,0)}function cn(e){var t=Vl(e);if(cc(t))return e}function Uc(e,t){if(e==="change")return t}var Ec=!1;if(Gt){var Gi;if(Gt){var zi="oninput"in document;if(!zi){var Dc=document.createElement("div");Dc.setAttribute("oninput","return;"),zi=typeof Dc.oninput=="function"}Gi=zi}else Gi=!1;Ec=Gi&&(!document.documentMode||9<document.documentMode)}function Oc(){Fl&&(Fl.detachEvent("onpropertychange",qc),es=Fl=null)}function qc(e){if(e.propertyName==="value"&&cn(es)){var t=[];wc(t,es,e,wi(e)),pc(xh,t)}}function vh(e,t,a){e==="focusin"?(Oc(),Fl=t,es=a,Fl.attachEvent("onpropertychange",qc)):e==="focusout"&&Oc()}function bh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return cn(es)}function jh(e,t){if(e==="click")return cn(t)}function Ah(e,t){if(e==="input"||e==="change")return cn(t)}function Sh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var lt=typeof Object.is=="function"?Object.is:Sh;function ts(e,t){if(lt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),l=Object.keys(t);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var s=a[l];if(!L.call(t,s)||!lt(e[s],t[s]))return!1}return!0}function Mc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function $c(e,t){var a=Mc(e);e=0;for(var l;a;){if(a.nodeType===3){if(l=e+a.textContent.length,e<=t&&l>=t)return{node:a,offset:t-e};e=l}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Mc(a)}}function Ic(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ic(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gc(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=tn(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=tn(e.document)}return t}function Bi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var _h=Gt&&"documentMode"in document&&11>=document.documentMode,dl=null,Ci=null,as=null,Xi=!1;function zc(e,t,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Xi||dl==null||dl!==tn(l)||(l=dl,"selectionStart"in l&&Bi(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),as&&ts(as,l)||(as=l,l=kn(Ci,"onSelect"),0<l.length&&(t=new rn("onSelect","select",null,t,a),e.push({event:t,listeners:l}),t.target=dl)))}function Oa(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var ml={animationend:Oa("Animation","AnimationEnd"),animationiteration:Oa("Animation","AnimationIteration"),animationstart:Oa("Animation","AnimationStart"),transitionrun:Oa("Transition","TransitionRun"),transitionstart:Oa("Transition","TransitionStart"),transitioncancel:Oa("Transition","TransitionCancel"),transitionend:Oa("Transition","TransitionEnd")},Hi={},Bc={};Gt&&(Bc=document.createElement("div").style,"AnimationEvent"in window||(delete ml.animationend.animation,delete ml.animationiteration.animation,delete ml.animationstart.animation),"TransitionEvent"in window||delete ml.transitionend.transition);function qa(e){if(Hi[e])return Hi[e];if(!ml[e])return e;var t=ml[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Bc)return Hi[e]=t[a];return e}var Cc=qa("animationend"),Xc=qa("animationiteration"),Hc=qa("animationstart"),Nh=qa("transitionrun"),Th=qa("transitionstart"),Rh=qa("transitioncancel"),Lc=qa("transitionend"),Yc=new Map,Li="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Li.push("scrollEnd");function St(e,t){Yc.set(e,t),Ea(t,[e])}var Qc=new WeakMap;function gt(e,t){if(typeof e=="object"&&e!==null){var a=Qc.get(e);return a!==void 0?a:(t={value:e,source:t,stack:rc(t)},Qc.set(e,t),t)}return{value:e,source:t,stack:rc(t)}}var pt=[],hl=0,Yi=0;function on(){for(var e=hl,t=Yi=hl=0;t<e;){var a=pt[t];pt[t++]=null;var l=pt[t];pt[t++]=null;var s=pt[t];pt[t++]=null;var n=pt[t];if(pt[t++]=null,l!==null&&s!==null){var u=l.pending;u===null?s.next=s:(s.next=u.next,u.next=s),l.pending=s}n!==0&&Zc(a,s,n)}}function fn(e,t,a,l){pt[hl++]=e,pt[hl++]=t,pt[hl++]=a,pt[hl++]=l,Yi|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Qi(e,t,a,l){return fn(e,t,a,l),dn(e)}function gl(e,t){return fn(e,null,null,t),dn(e)}function Zc(e,t,a){e.lanes|=a;var l=e.alternate;l!==null&&(l.lanes|=a);for(var s=!1,n=e.return;n!==null;)n.childLanes|=a,l=n.alternate,l!==null&&(l.childLanes|=a),n.tag===22&&(e=n.stateNode,e===null||e._visibility&1||(s=!0)),e=n,n=n.return;return e.tag===3?(n=e.stateNode,s&&t!==null&&(s=31-at(a),e=n.hiddenUpdates,l=e[s],l===null?e[s]=[t]:l.push(t),t.lane=a|536870912),n):null}function dn(e){if(50<Rs)throw Rs=0,Pr=null,Error(d(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var pl={};function wh(e,t,a,l){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function st(e,t,a,l){return new wh(e,t,a,l)}function Zi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zt(e,t){var a=e.alternate;return a===null?(a=st(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Vc(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function mn(e,t,a,l,s,n){var u=0;if(l=e,typeof e=="function")Zi(e)&&(u=1);else if(typeof e=="string")u=Eg(e,a,Ee.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Ft:return e=st(31,a,t,s),e.elementType=Ft,e.lanes=n,e;case N:return Ma(a.children,s,n,t);case R:u=8,s|=24;break;case q:return e=st(12,a,t,s|2),e.elementType=q,e.lanes=n,e;case pe:return e=st(13,a,t,s),e.elementType=pe,e.lanes=n,e;case we:return e=st(19,a,t,s),e.elementType=we,e.lanes=n,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case B:case P:u=10;break e;case X:u=9;break e;case F:u=11;break e;case Ue:u=14;break e;case et:u=16,l=null;break e}u=29,a=Error(d(130,e===null?"null":typeof e,"")),l=null}return t=st(u,a,t,s),t.elementType=e,t.type=l,t.lanes=n,t}function Ma(e,t,a,l){return e=st(7,e,l,t),e.lanes=a,e}function Vi(e,t,a){return e=st(6,e,null,t),e.lanes=a,e}function ki(e,t,a){return t=st(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var yl=[],xl=0,hn=null,gn=0,yt=[],xt=0,$a=null,Bt=1,Ct="";function Ia(e,t){yl[xl++]=gn,yl[xl++]=hn,hn=e,gn=t}function kc(e,t,a){yt[xt++]=Bt,yt[xt++]=Ct,yt[xt++]=$a,$a=e;var l=Bt;e=Ct;var s=32-at(l)-1;l&=~(1<<s),a+=1;var n=32-at(t)+s;if(30<n){var u=s-s%5;n=(l&(1<<u)-1).toString(32),l>>=u,s-=u,Bt=1<<32-at(t)+s|a<<s|l,Ct=n+e}else Bt=1<<n|a<<s|l,Ct=e}function Ki(e){e.return!==null&&(Ia(e,1),kc(e,1,0))}function Ji(e){for(;e===hn;)hn=yl[--xl],yl[xl]=null,gn=yl[--xl],yl[xl]=null;for(;e===$a;)$a=yt[--xt],yt[xt]=null,Ct=yt[--xt],yt[xt]=null,Bt=yt[--xt],yt[xt]=null}var Ze=null,Ae=null,ne=!1,Ga=null,Ut=!1,Pi=Error(d(519));function za(e){var t=Error(d(418,""));throw ns(gt(t,e)),Pi}function Kc(e){var t=e.stateNode,a=e.type,l=e.memoizedProps;switch(t[Ye]=e,t[ke]=l,a){case"dialog":ae("cancel",t),ae("close",t);break;case"iframe":case"object":case"embed":ae("load",t);break;case"video":case"audio":for(a=0;a<Us.length;a++)ae(Us[a],t);break;case"source":ae("error",t);break;case"img":case"image":case"link":ae("error",t),ae("load",t);break;case"details":ae("toggle",t);break;case"input":ae("invalid",t),oc(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0),en(t);break;case"select":ae("invalid",t);break;case"textarea":ae("invalid",t),dc(t,l.value,l.defaultValue,l.children),en(t)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||l.suppressHydrationWarning===!0||hd(t.textContent,a)?(l.popover!=null&&(ae("beforetoggle",t),ae("toggle",t)),l.onScroll!=null&&ae("scroll",t),l.onScrollEnd!=null&&ae("scrollend",t),l.onClick!=null&&(t.onclick=Kn),t=!0):t=!1,t||za(e)}function Jc(e){for(Ze=e.return;Ze;)switch(Ze.tag){case 5:case 13:Ut=!1;return;case 27:case 3:Ut=!0;return;default:Ze=Ze.return}}function ls(e){if(e!==Ze)return!1;if(!ne)return Jc(e),ne=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||mu(e.type,e.memoizedProps)),a=!a),a&&Ae&&za(e),Jc(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(t===0){Ae=Nt(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++;e=e.nextSibling}Ae=null}}else t===27?(t=Ae,ba(e.type)?(e=yu,yu=null,Ae=e):Ae=t):Ae=Ze?Nt(e.stateNode.nextSibling):null;return!0}function ss(){Ae=Ze=null,ne=!1}function Pc(){var e=Ga;return e!==null&&(We===null?We=e:We.push.apply(We,e),Ga=null),e}function ns(e){Ga===null?Ga=[e]:Ga.push(e)}var Wi=Ce(null),Ba=null,Xt=null;function na(e,t,a){ie(Wi,t._currentValue),t._currentValue=a}function Ht(e){e._currentValue=Wi.current,xe(Wi)}function Fi(e,t,a){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===a)break;e=e.return}}function er(e,t,a,l){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var n=s.dependencies;if(n!==null){var u=s.child;n=n.firstContext;e:for(;n!==null;){var o=n;n=s;for(var m=0;m<t.length;m++)if(o.context===t[m]){n.lanes|=a,o=n.alternate,o!==null&&(o.lanes|=a),Fi(n.return,a,e),l||(u=null);break e}n=o.next}}else if(s.tag===18){if(u=s.return,u===null)throw Error(d(341));u.lanes|=a,n=u.alternate,n!==null&&(n.lanes|=a),Fi(u,a,e),u=null}else u=s.child;if(u!==null)u.return=s;else for(u=s;u!==null;){if(u===e){u=null;break}if(s=u.sibling,s!==null){s.return=u.return,u=s;break}u=u.return}s=u}}function is(e,t,a,l){e=null;for(var s=t,n=!1;s!==null;){if(!n){if((s.flags&524288)!==0)n=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var u=s.alternate;if(u===null)throw Error(d(387));if(u=u.memoizedProps,u!==null){var o=s.type;lt(s.pendingProps.value,u.value)||(e!==null?e.push(o):e=[o])}}else if(s===Pa.current){if(u=s.alternate,u===null)throw Error(d(387));u.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push($s):e=[$s])}s=s.return}e!==null&&er(t,e,a,l),t.flags|=262144}function pn(e){for(e=e.firstContext;e!==null;){if(!lt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ca(e){Ba=e,Xt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Qe(e){return Wc(Ba,e)}function yn(e,t){return Ba===null&&Ca(e),Wc(e,t)}function Wc(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Xt===null){if(e===null)throw Error(d(308));Xt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Xt=Xt.next=t;return a}var Uh=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},Eh=r.unstable_scheduleCallback,Dh=r.unstable_NormalPriority,Me={$$typeof:P,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function tr(){return{controller:new Uh,data:new Map,refCount:0}}function rs(e){e.refCount--,e.refCount===0&&Eh(Dh,function(){e.controller.abort()})}var us=null,ar=0,vl=0,bl=null;function Oh(e,t){if(us===null){var a=us=[];ar=0,vl=su(),bl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return ar++,t.then(Fc,Fc),t}function Fc(){if(--ar===0&&us!==null){bl!==null&&(bl.status="fulfilled");var e=us;us=null,vl=0,bl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function qh(e,t){var a=[],l={status:"pending",value:null,reason:null,then:function(s){a.push(s)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var s=0;s<a.length;s++)(0,a[s])(t)},function(s){for(l.status="rejected",l.reason=s,s=0;s<a.length;s++)(0,a[s])(void 0)}),l}var eo=E.S;E.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&Oh(e,t),eo!==null&&eo(e,t)};var Xa=Ce(null);function lr(){var e=Xa.current;return e!==null?e:ye.pooledCache}function xn(e,t){t===null?ie(Xa,Xa.current):ie(Xa,t.pool)}function to(){var e=lr();return e===null?null:{parent:Me._currentValue,pool:e}}var cs=Error(d(460)),ao=Error(d(474)),vn=Error(d(542)),sr={then:function(){}};function lo(e){return e=e.status,e==="fulfilled"||e==="rejected"}function bn(){}function so(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(bn,bn),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,io(e),e;default:if(typeof t.status=="string")t.then(bn,bn);else{if(e=ye,e!==null&&100<e.shellSuspendCounter)throw Error(d(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=l}},function(l){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,io(e),e}throw os=t,cs}}var os=null;function no(){if(os===null)throw Error(d(459));var e=os;return os=null,e}function io(e){if(e===cs||e===vn)throw Error(d(483))}var ia=!1;function nr(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ir(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ra(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ua(e,t,a){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(ue&2)!==0){var s=l.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),l.pending=t,t=dn(e),Zc(e,null,a),t}return fn(e,l,t,a),dn(e)}function fs(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Fu(e,a)}}function rr(e,t){var a=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var s=null,n=null;if(a=a.firstBaseUpdate,a!==null){do{var u={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};n===null?s=n=u:n=n.next=u,a=a.next}while(a!==null);n===null?s=n=t:n=n.next=t}else s=n=t;a={baseState:l.baseState,firstBaseUpdate:s,lastBaseUpdate:n,shared:l.shared,callbacks:l.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var ur=!1;function ds(){if(ur){var e=bl;if(e!==null)throw e}}function ms(e,t,a,l){ur=!1;var s=e.updateQueue;ia=!1;var n=s.firstBaseUpdate,u=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var m=o,v=m.next;m.next=null,u===null?n=v:u.next=v,u=m;var U=e.alternate;U!==null&&(U=U.updateQueue,o=U.lastBaseUpdate,o!==u&&(o===null?U.firstBaseUpdate=v:o.next=v,U.lastBaseUpdate=m))}if(n!==null){var O=s.baseState;u=0,U=v=m=null,o=n;do{var A=o.lane&-536870913,T=A!==o.lane;if(T?(le&A)===A:(l&A)===A){A!==0&&A===vl&&(ur=!0),U!==null&&(U=U.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var k=e,Q=o;A=t;var he=a;switch(Q.tag){case 1:if(k=Q.payload,typeof k=="function"){O=k.call(he,O,A);break e}O=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=Q.payload,A=typeof k=="function"?k.call(he,O,A):k,A==null)break e;O=z({},O,A);break e;case 2:ia=!0}}A=o.callback,A!==null&&(e.flags|=64,T&&(e.flags|=8192),T=s.callbacks,T===null?s.callbacks=[A]:T.push(A))}else T={lane:A,tag:o.tag,payload:o.payload,callback:o.callback,next:null},U===null?(v=U=T,m=O):U=U.next=T,u|=A;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;T=o,o=T.next,T.next=null,s.lastBaseUpdate=T,s.shared.pending=null}}while(!0);U===null&&(m=O),s.baseState=m,s.firstBaseUpdate=v,s.lastBaseUpdate=U,n===null&&(s.shared.lanes=0),pa|=u,e.lanes=u,e.memoizedState=O}}function ro(e,t){if(typeof e!="function")throw Error(d(191,e));e.call(t)}function uo(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)ro(a[e],t)}var jl=Ce(null),jn=Ce(0);function co(e,t){e=Kt,ie(jn,e),ie(jl,t),Kt=e|t.baseLanes}function cr(){ie(jn,Kt),ie(jl,jl.current)}function or(){Kt=jn.current,xe(jl),xe(jn)}var ca=0,W=null,de=null,De=null,An=!1,Al=!1,Ha=!1,Sn=0,hs=0,Sl=null,Mh=0;function Ne(){throw Error(d(321))}function fr(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!lt(e[a],t[a]))return!1;return!0}function dr(e,t,a,l,s,n){return ca=n,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Vo:ko,Ha=!1,n=a(l,s),Ha=!1,Al&&(n=fo(t,a,l,s)),oo(e),n}function oo(e){E.H=Un;var t=de!==null&&de.next!==null;if(ca=0,De=de=W=null,An=!1,hs=0,Sl=null,t)throw Error(d(300));e===null||Ge||(e=e.dependencies,e!==null&&pn(e)&&(Ge=!0))}function fo(e,t,a,l){W=e;var s=0;do{if(Al&&(Sl=null),hs=0,Al=!1,25<=s)throw Error(d(301));if(s+=1,De=de=null,e.updateQueue!=null){var n=e.updateQueue;n.lastEffect=null,n.events=null,n.stores=null,n.memoCache!=null&&(n.memoCache.index=0)}E.H=Xh,n=t(a,l)}while(Al);return n}function $h(){var e=E.H,t=e.useState()[0];return t=typeof t.then=="function"?gs(t):t,e=e.useState()[0],(de!==null?de.memoizedState:null)!==e&&(W.flags|=1024),t}function mr(){var e=Sn!==0;return Sn=0,e}function hr(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function gr(e){if(An){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}An=!1}ca=0,De=de=W=null,Al=!1,hs=Sn=0,Sl=null}function Je(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return De===null?W.memoizedState=De=e:De=De.next=e,De}function Oe(){if(de===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=de.next;var t=De===null?W.memoizedState:De.next;if(t!==null)De=t,de=e;else{if(e===null)throw W.alternate===null?Error(d(467)):Error(d(310));de=e,e={memoizedState:de.memoizedState,baseState:de.baseState,baseQueue:de.baseQueue,queue:de.queue,next:null},De===null?W.memoizedState=De=e:De=De.next=e}return De}function pr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function gs(e){var t=hs;return hs+=1,Sl===null&&(Sl=[]),e=so(Sl,e,t),t=W,(De===null?t.memoizedState:De.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Vo:ko),e}function _n(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return gs(e);if(e.$$typeof===P)return Qe(e)}throw Error(d(438,String(e)))}function yr(e){var t=null,a=W.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var l=W.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=pr(),W.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),l=0;l<e;l++)a[l]=Ka;return t.index++,a}function Lt(e,t){return typeof t=="function"?t(e):t}function Nn(e){var t=Oe();return xr(t,de,e)}function xr(e,t,a){var l=e.queue;if(l===null)throw Error(d(311));l.lastRenderedReducer=a;var s=e.baseQueue,n=l.pending;if(n!==null){if(s!==null){var u=s.next;s.next=n.next,n.next=u}t.baseQueue=s=n,l.pending=null}if(n=e.baseState,s===null)e.memoizedState=n;else{t=s.next;var o=u=null,m=null,v=t,U=!1;do{var O=v.lane&-536870913;if(O!==v.lane?(le&O)===O:(ca&O)===O){var A=v.revertLane;if(A===0)m!==null&&(m=m.next={lane:0,revertLane:0,action:v.action,hasEagerState:v.hasEagerState,eagerState:v.eagerState,next:null}),O===vl&&(U=!0);else if((ca&A)===A){v=v.next,A===vl&&(U=!0);continue}else O={lane:0,revertLane:v.revertLane,action:v.action,hasEagerState:v.hasEagerState,eagerState:v.eagerState,next:null},m===null?(o=m=O,u=n):m=m.next=O,W.lanes|=A,pa|=A;O=v.action,Ha&&a(n,O),n=v.hasEagerState?v.eagerState:a(n,O)}else A={lane:O,revertLane:v.revertLane,action:v.action,hasEagerState:v.hasEagerState,eagerState:v.eagerState,next:null},m===null?(o=m=A,u=n):m=m.next=A,W.lanes|=O,pa|=O;v=v.next}while(v!==null&&v!==t);if(m===null?u=n:m.next=o,!lt(n,e.memoizedState)&&(Ge=!0,U&&(a=bl,a!==null)))throw a;e.memoizedState=n,e.baseState=u,e.baseQueue=m,l.lastRenderedState=n}return s===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function vr(e){var t=Oe(),a=t.queue;if(a===null)throw Error(d(311));a.lastRenderedReducer=e;var l=a.dispatch,s=a.pending,n=t.memoizedState;if(s!==null){a.pending=null;var u=s=s.next;do n=e(n,u.action),u=u.next;while(u!==s);lt(n,t.memoizedState)||(Ge=!0),t.memoizedState=n,t.baseQueue===null&&(t.baseState=n),a.lastRenderedState=n}return[n,l]}function mo(e,t,a){var l=W,s=Oe(),n=ne;if(n){if(a===void 0)throw Error(d(407));a=a()}else a=t();var u=!lt((de||s).memoizedState,a);u&&(s.memoizedState=a,Ge=!0),s=s.queue;var o=po.bind(null,l,s,e);if(ps(2048,8,o,[e]),s.getSnapshot!==t||u||De!==null&&De.memoizedState.tag&1){if(l.flags|=2048,_l(9,Tn(),go.bind(null,l,s,a,t),null),ye===null)throw Error(d(349));n||(ca&124)!==0||ho(l,t,a)}return a}function ho(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=W.updateQueue,t===null?(t=pr(),W.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function go(e,t,a,l){t.value=a,t.getSnapshot=l,yo(t)&&xo(e)}function po(e,t,a){return a(function(){yo(t)&&xo(e)})}function yo(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!lt(e,a)}catch{return!0}}function xo(e){var t=gl(e,2);t!==null&&ct(t,e,2)}function br(e){var t=Je();if(typeof e=="function"){var a=e;if(e=a(),Ha){aa(!0);try{a()}finally{aa(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lt,lastRenderedState:e},t}function vo(e,t,a,l){return e.baseState=a,xr(e,de,typeof l=="function"?l:Lt)}function Ih(e,t,a,l,s){if(wn(e))throw Error(d(485));if(e=t.action,e!==null){var n={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){n.listeners.push(u)}};E.T!==null?a(!0):n.isTransition=!1,l(n),a=t.pending,a===null?(n.next=t.pending=n,bo(t,n)):(n.next=a.next,t.pending=a.next=n)}}function bo(e,t){var a=t.action,l=t.payload,s=e.state;if(t.isTransition){var n=E.T,u={};E.T=u;try{var o=a(s,l),m=E.S;m!==null&&m(u,o),jo(e,t,o)}catch(v){jr(e,t,v)}finally{E.T=n}}else try{n=a(s,l),jo(e,t,n)}catch(v){jr(e,t,v)}}function jo(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){Ao(e,t,l)},function(l){return jr(e,t,l)}):Ao(e,t,a)}function Ao(e,t,a){t.status="fulfilled",t.value=a,So(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,bo(e,a)))}function jr(e,t,a){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=a,So(t),t=t.next;while(t!==l)}e.action=null}function So(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function _o(e,t){return t}function No(e,t){if(ne){var a=ye.formState;if(a!==null){e:{var l=W;if(ne){if(Ae){t:{for(var s=Ae,n=Ut;s.nodeType!==8;){if(!n){s=null;break t}if(s=Nt(s.nextSibling),s===null){s=null;break t}}n=s.data,s=n==="F!"||n==="F"?s:null}if(s){Ae=Nt(s.nextSibling),l=s.data==="F!";break e}}za(l)}l=!1}l&&(t=a[0])}}return a=Je(),a.memoizedState=a.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:_o,lastRenderedState:t},a.queue=l,a=Yo.bind(null,W,l),l.dispatch=a,l=br(!1),n=Tr.bind(null,W,!1,l.queue),l=Je(),s={state:t,dispatch:null,action:e,pending:null},l.queue=s,a=Ih.bind(null,W,s,n,a),s.dispatch=a,l.memoizedState=e,[t,a,!1]}function To(e){var t=Oe();return Ro(t,de,e)}function Ro(e,t,a){if(t=xr(e,t,_o)[0],e=Nn(Lt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=gs(t)}catch(u){throw u===cs?vn:u}else l=t;t=Oe();var s=t.queue,n=s.dispatch;return a!==t.memoizedState&&(W.flags|=2048,_l(9,Tn(),Gh.bind(null,s,a),null)),[l,n,e]}function Gh(e,t){e.action=t}function wo(e){var t=Oe(),a=de;if(a!==null)return Ro(t,a,e);Oe(),t=t.memoizedState,a=Oe();var l=a.queue.dispatch;return a.memoizedState=e,[t,l,!1]}function _l(e,t,a,l){return e={tag:e,create:a,deps:l,inst:t,next:null},t=W.updateQueue,t===null&&(t=pr(),W.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(l=a.next,a.next=e,e.next=l,t.lastEffect=e),e}function Tn(){return{destroy:void 0,resource:void 0}}function Uo(){return Oe().memoizedState}function Rn(e,t,a,l){var s=Je();l=l===void 0?null:l,W.flags|=e,s.memoizedState=_l(1|t,Tn(),a,l)}function ps(e,t,a,l){var s=Oe();l=l===void 0?null:l;var n=s.memoizedState.inst;de!==null&&l!==null&&fr(l,de.memoizedState.deps)?s.memoizedState=_l(t,n,a,l):(W.flags|=e,s.memoizedState=_l(1|t,n,a,l))}function Eo(e,t){Rn(8390656,8,e,t)}function Do(e,t){ps(2048,8,e,t)}function Oo(e,t){return ps(4,2,e,t)}function qo(e,t){return ps(4,4,e,t)}function Mo(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function $o(e,t,a){a=a!=null?a.concat([e]):null,ps(4,4,Mo.bind(null,t,e),a)}function Ar(){}function Io(e,t){var a=Oe();t=t===void 0?null:t;var l=a.memoizedState;return t!==null&&fr(t,l[1])?l[0]:(a.memoizedState=[e,t],e)}function Go(e,t){var a=Oe();t=t===void 0?null:t;var l=a.memoizedState;if(t!==null&&fr(t,l[1]))return l[0];if(l=e(),Ha){aa(!0);try{e()}finally{aa(!1)}}return a.memoizedState=[l,t],l}function Sr(e,t,a){return a===void 0||(ca&1073741824)!==0?e.memoizedState=t:(e.memoizedState=a,e=Xf(),W.lanes|=e,pa|=e,a)}function zo(e,t,a,l){return lt(a,t)?a:jl.current!==null?(e=Sr(e,a,l),lt(e,t)||(Ge=!0),e):(ca&42)===0?(Ge=!0,e.memoizedState=a):(e=Xf(),W.lanes|=e,pa|=e,t)}function Bo(e,t,a,l,s){var n=C.p;C.p=n!==0&&8>n?n:8;var u=E.T,o={};E.T=o,Tr(e,!1,t,a);try{var m=s(),v=E.S;if(v!==null&&v(o,m),m!==null&&typeof m=="object"&&typeof m.then=="function"){var U=qh(m,l);ys(e,t,U,ut(e))}else ys(e,t,l,ut(e))}catch(O){ys(e,t,{then:function(){},status:"rejected",reason:O},ut())}finally{C.p=n,E.T=u}}function zh(){}function _r(e,t,a,l){if(e.tag!==5)throw Error(d(476));var s=Co(e).queue;Bo(e,s,t,V,a===null?zh:function(){return Xo(e),a(l)})}function Co(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:V,baseState:V,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lt,lastRenderedState:V},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Xo(e){var t=Co(e).next.queue;ys(e,t,{},ut())}function Nr(){return Qe($s)}function Ho(){return Oe().memoizedState}function Lo(){return Oe().memoizedState}function Bh(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=ut();e=ra(a);var l=ua(t,e,a);l!==null&&(ct(l,t,a),fs(l,t,a)),t={cache:tr()},e.payload=t;return}t=t.return}}function Ch(e,t,a){var l=ut();a={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},wn(e)?Qo(t,a):(a=Qi(e,t,a,l),a!==null&&(ct(a,e,l),Zo(a,t,l)))}function Yo(e,t,a){var l=ut();ys(e,t,a,l)}function ys(e,t,a,l){var s={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(wn(e))Qo(t,s);else{var n=e.alternate;if(e.lanes===0&&(n===null||n.lanes===0)&&(n=t.lastRenderedReducer,n!==null))try{var u=t.lastRenderedState,o=n(u,a);if(s.hasEagerState=!0,s.eagerState=o,lt(o,u))return fn(e,t,s,0),ye===null&&on(),!1}catch{}finally{}if(a=Qi(e,t,s,l),a!==null)return ct(a,e,l),Zo(a,t,l),!0}return!1}function Tr(e,t,a,l){if(l={lane:2,revertLane:su(),action:l,hasEagerState:!1,eagerState:null,next:null},wn(e)){if(t)throw Error(d(479))}else t=Qi(e,a,l,2),t!==null&&ct(t,e,2)}function wn(e){var t=e.alternate;return e===W||t!==null&&t===W}function Qo(e,t){Al=An=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Zo(e,t,a){if((a&4194048)!==0){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Fu(e,a)}}var Un={readContext:Qe,use:_n,useCallback:Ne,useContext:Ne,useEffect:Ne,useImperativeHandle:Ne,useLayoutEffect:Ne,useInsertionEffect:Ne,useMemo:Ne,useReducer:Ne,useRef:Ne,useState:Ne,useDebugValue:Ne,useDeferredValue:Ne,useTransition:Ne,useSyncExternalStore:Ne,useId:Ne,useHostTransitionStatus:Ne,useFormState:Ne,useActionState:Ne,useOptimistic:Ne,useMemoCache:Ne,useCacheRefresh:Ne},Vo={readContext:Qe,use:_n,useCallback:function(e,t){return Je().memoizedState=[e,t===void 0?null:t],e},useContext:Qe,useEffect:Eo,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,Rn(4194308,4,Mo.bind(null,t,e),a)},useLayoutEffect:function(e,t){return Rn(4194308,4,e,t)},useInsertionEffect:function(e,t){Rn(4,2,e,t)},useMemo:function(e,t){var a=Je();t=t===void 0?null:t;var l=e();if(Ha){aa(!0);try{e()}finally{aa(!1)}}return a.memoizedState=[l,t],l},useReducer:function(e,t,a){var l=Je();if(a!==void 0){var s=a(t);if(Ha){aa(!0);try{a(t)}finally{aa(!1)}}}else s=t;return l.memoizedState=l.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},l.queue=e,e=e.dispatch=Ch.bind(null,W,e),[l.memoizedState,e]},useRef:function(e){var t=Je();return e={current:e},t.memoizedState=e},useState:function(e){e=br(e);var t=e.queue,a=Yo.bind(null,W,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Ar,useDeferredValue:function(e,t){var a=Je();return Sr(a,e,t)},useTransition:function(){var e=br(!1);return e=Bo.bind(null,W,e.queue,!0,!1),Je().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var l=W,s=Je();if(ne){if(a===void 0)throw Error(d(407));a=a()}else{if(a=t(),ye===null)throw Error(d(349));(le&124)!==0||ho(l,t,a)}s.memoizedState=a;var n={value:a,getSnapshot:t};return s.queue=n,Eo(po.bind(null,l,n,e),[e]),l.flags|=2048,_l(9,Tn(),go.bind(null,l,n,a,t),null),a},useId:function(){var e=Je(),t=ye.identifierPrefix;if(ne){var a=Ct,l=Bt;a=(l&~(1<<32-at(l)-1)).toString(32)+a,t="«"+t+"R"+a,a=Sn++,0<a&&(t+="H"+a.toString(32)),t+="»"}else a=Mh++,t="«"+t+"r"+a.toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:Nr,useFormState:No,useActionState:No,useOptimistic:function(e){var t=Je();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=Tr.bind(null,W,!0,a),a.dispatch=t,[e,t]},useMemoCache:yr,useCacheRefresh:function(){return Je().memoizedState=Bh.bind(null,W)}},ko={readContext:Qe,use:_n,useCallback:Io,useContext:Qe,useEffect:Do,useImperativeHandle:$o,useInsertionEffect:Oo,useLayoutEffect:qo,useMemo:Go,useReducer:Nn,useRef:Uo,useState:function(){return Nn(Lt)},useDebugValue:Ar,useDeferredValue:function(e,t){var a=Oe();return zo(a,de.memoizedState,e,t)},useTransition:function(){var e=Nn(Lt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:gs(e),t]},useSyncExternalStore:mo,useId:Ho,useHostTransitionStatus:Nr,useFormState:To,useActionState:To,useOptimistic:function(e,t){var a=Oe();return vo(a,de,e,t)},useMemoCache:yr,useCacheRefresh:Lo},Xh={readContext:Qe,use:_n,useCallback:Io,useContext:Qe,useEffect:Do,useImperativeHandle:$o,useInsertionEffect:Oo,useLayoutEffect:qo,useMemo:Go,useReducer:vr,useRef:Uo,useState:function(){return vr(Lt)},useDebugValue:Ar,useDeferredValue:function(e,t){var a=Oe();return de===null?Sr(a,e,t):zo(a,de.memoizedState,e,t)},useTransition:function(){var e=vr(Lt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:gs(e),t]},useSyncExternalStore:mo,useId:Ho,useHostTransitionStatus:Nr,useFormState:wo,useActionState:wo,useOptimistic:function(e,t){var a=Oe();return de!==null?vo(a,de,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:yr,useCacheRefresh:Lo},Nl=null,xs=0;function En(e){var t=xs;return xs+=1,Nl===null&&(Nl=[]),so(Nl,e,t)}function vs(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Dn(e,t){throw t.$$typeof===w?Error(d(525)):(e=Object.prototype.toString.call(t),Error(d(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Ko(e){var t=e._init;return t(e._payload)}function Jo(e){function t(y,g){if(e){var x=y.deletions;x===null?(y.deletions=[g],y.flags|=16):x.push(g)}}function a(y,g){if(!e)return null;for(;g!==null;)t(y,g),g=g.sibling;return null}function l(y){for(var g=new Map;y!==null;)y.key!==null?g.set(y.key,y):g.set(y.index,y),y=y.sibling;return g}function s(y,g){return y=zt(y,g),y.index=0,y.sibling=null,y}function n(y,g,x){return y.index=x,e?(x=y.alternate,x!==null?(x=x.index,x<g?(y.flags|=67108866,g):x):(y.flags|=67108866,g)):(y.flags|=1048576,g)}function u(y){return e&&y.alternate===null&&(y.flags|=67108866),y}function o(y,g,x,D){return g===null||g.tag!==6?(g=Vi(x,y.mode,D),g.return=y,g):(g=s(g,x),g.return=y,g)}function m(y,g,x,D){var H=x.type;return H===N?U(y,g,x.props.children,D,x.key):g!==null&&(g.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===et&&Ko(H)===g.type)?(g=s(g,x.props),vs(g,x),g.return=y,g):(g=mn(x.type,x.key,x.props,null,y.mode,D),vs(g,x),g.return=y,g)}function v(y,g,x,D){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=ki(x,y.mode,D),g.return=y,g):(g=s(g,x.children||[]),g.return=y,g)}function U(y,g,x,D,H){return g===null||g.tag!==7?(g=Ma(x,y.mode,D,H),g.return=y,g):(g=s(g,x),g.return=y,g)}function O(y,g,x){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=Vi(""+g,y.mode,x),g.return=y,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case _:return x=mn(g.type,g.key,g.props,null,y.mode,x),vs(x,g),x.return=y,x;case b:return g=ki(g,y.mode,x),g.return=y,g;case et:var D=g._init;return g=D(g._payload),O(y,g,x)}if(ft(g)||Ve(g))return g=Ma(g,y.mode,x,null),g.return=y,g;if(typeof g.then=="function")return O(y,En(g),x);if(g.$$typeof===P)return O(y,yn(y,g),x);Dn(y,g)}return null}function A(y,g,x,D){var H=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return H!==null?null:o(y,g,""+x,D);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case _:return x.key===H?m(y,g,x,D):null;case b:return x.key===H?v(y,g,x,D):null;case et:return H=x._init,x=H(x._payload),A(y,g,x,D)}if(ft(x)||Ve(x))return H!==null?null:U(y,g,x,D,null);if(typeof x.then=="function")return A(y,g,En(x),D);if(x.$$typeof===P)return A(y,g,yn(y,x),D);Dn(y,x)}return null}function T(y,g,x,D,H){if(typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint")return y=y.get(x)||null,o(g,y,""+D,H);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case _:return y=y.get(D.key===null?x:D.key)||null,m(g,y,D,H);case b:return y=y.get(D.key===null?x:D.key)||null,v(g,y,D,H);case et:var ee=D._init;return D=ee(D._payload),T(y,g,x,D,H)}if(ft(D)||Ve(D))return y=y.get(x)||null,U(g,y,D,H,null);if(typeof D.then=="function")return T(y,g,x,En(D),H);if(D.$$typeof===P)return T(y,g,x,yn(g,D),H);Dn(g,D)}return null}function k(y,g,x,D){for(var H=null,ee=null,Y=g,Z=g=0,Be=null;Y!==null&&Z<x.length;Z++){Y.index>Z?(Be=Y,Y=null):Be=Y.sibling;var se=A(y,Y,x[Z],D);if(se===null){Y===null&&(Y=Be);break}e&&Y&&se.alternate===null&&t(y,Y),g=n(se,g,Z),ee===null?H=se:ee.sibling=se,ee=se,Y=Be}if(Z===x.length)return a(y,Y),ne&&Ia(y,Z),H;if(Y===null){for(;Z<x.length;Z++)Y=O(y,x[Z],D),Y!==null&&(g=n(Y,g,Z),ee===null?H=Y:ee.sibling=Y,ee=Y);return ne&&Ia(y,Z),H}for(Y=l(Y);Z<x.length;Z++)Be=T(Y,y,Z,x[Z],D),Be!==null&&(e&&Be.alternate!==null&&Y.delete(Be.key===null?Z:Be.key),g=n(Be,g,Z),ee===null?H=Be:ee.sibling=Be,ee=Be);return e&&Y.forEach(function(Na){return t(y,Na)}),ne&&Ia(y,Z),H}function Q(y,g,x,D){if(x==null)throw Error(d(151));for(var H=null,ee=null,Y=g,Z=g=0,Be=null,se=x.next();Y!==null&&!se.done;Z++,se=x.next()){Y.index>Z?(Be=Y,Y=null):Be=Y.sibling;var Na=A(y,Y,se.value,D);if(Na===null){Y===null&&(Y=Be);break}e&&Y&&Na.alternate===null&&t(y,Y),g=n(Na,g,Z),ee===null?H=Na:ee.sibling=Na,ee=Na,Y=Be}if(se.done)return a(y,Y),ne&&Ia(y,Z),H;if(Y===null){for(;!se.done;Z++,se=x.next())se=O(y,se.value,D),se!==null&&(g=n(se,g,Z),ee===null?H=se:ee.sibling=se,ee=se);return ne&&Ia(y,Z),H}for(Y=l(Y);!se.done;Z++,se=x.next())se=T(Y,y,Z,se.value,D),se!==null&&(e&&se.alternate!==null&&Y.delete(se.key===null?Z:se.key),g=n(se,g,Z),ee===null?H=se:ee.sibling=se,ee=se);return e&&Y.forEach(function(Hg){return t(y,Hg)}),ne&&Ia(y,Z),H}function he(y,g,x,D){if(typeof x=="object"&&x!==null&&x.type===N&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case _:e:{for(var H=x.key;g!==null;){if(g.key===H){if(H=x.type,H===N){if(g.tag===7){a(y,g.sibling),D=s(g,x.props.children),D.return=y,y=D;break e}}else if(g.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===et&&Ko(H)===g.type){a(y,g.sibling),D=s(g,x.props),vs(D,x),D.return=y,y=D;break e}a(y,g);break}else t(y,g);g=g.sibling}x.type===N?(D=Ma(x.props.children,y.mode,D,x.key),D.return=y,y=D):(D=mn(x.type,x.key,x.props,null,y.mode,D),vs(D,x),D.return=y,y=D)}return u(y);case b:e:{for(H=x.key;g!==null;){if(g.key===H)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){a(y,g.sibling),D=s(g,x.children||[]),D.return=y,y=D;break e}else{a(y,g);break}else t(y,g);g=g.sibling}D=ki(x,y.mode,D),D.return=y,y=D}return u(y);case et:return H=x._init,x=H(x._payload),he(y,g,x,D)}if(ft(x))return k(y,g,x,D);if(Ve(x)){if(H=Ve(x),typeof H!="function")throw Error(d(150));return x=H.call(x),Q(y,g,x,D)}if(typeof x.then=="function")return he(y,g,En(x),D);if(x.$$typeof===P)return he(y,g,yn(y,x),D);Dn(y,x)}return typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint"?(x=""+x,g!==null&&g.tag===6?(a(y,g.sibling),D=s(g,x),D.return=y,y=D):(a(y,g),D=Vi(x,y.mode,D),D.return=y,y=D),u(y)):a(y,g)}return function(y,g,x,D){try{xs=0;var H=he(y,g,x,D);return Nl=null,H}catch(Y){if(Y===cs||Y===vn)throw Y;var ee=st(29,Y,null,y.mode);return ee.lanes=D,ee.return=y,ee}finally{}}}var Tl=Jo(!0),Po=Jo(!1),vt=Ce(null),Et=null;function oa(e){var t=e.alternate;ie($e,$e.current&1),ie(vt,e),Et===null&&(t===null||jl.current!==null||t.memoizedState!==null)&&(Et=e)}function Wo(e){if(e.tag===22){if(ie($e,$e.current),ie(vt,e),Et===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Et=e)}}else fa()}function fa(){ie($e,$e.current),ie(vt,vt.current)}function Yt(e){xe(vt),Et===e&&(Et=null),xe($e)}var $e=Ce(0);function On(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||pu(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function Rr(e,t,a,l){t=e.memoizedState,a=a(l,t),a=a==null?t:z({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var wr={enqueueSetState:function(e,t,a){e=e._reactInternals;var l=ut(),s=ra(l);s.payload=t,a!=null&&(s.callback=a),t=ua(e,s,l),t!==null&&(ct(t,e,l),fs(t,e,l))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var l=ut(),s=ra(l);s.tag=1,s.payload=t,a!=null&&(s.callback=a),t=ua(e,s,l),t!==null&&(ct(t,e,l),fs(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=ut(),l=ra(a);l.tag=2,t!=null&&(l.callback=t),t=ua(e,l,a),t!==null&&(ct(t,e,a),fs(t,e,a))}};function Fo(e,t,a,l,s,n,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,n,u):t.prototype&&t.prototype.isPureReactComponent?!ts(a,l)||!ts(s,n):!0}function ef(e,t,a,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,l),t.state!==e&&wr.enqueueReplaceState(t,t.state,null)}function La(e,t){var a=t;if("ref"in t){a={};for(var l in t)l!=="ref"&&(a[l]=t[l])}if(e=e.defaultProps){a===t&&(a=z({},a));for(var s in e)a[s]===void 0&&(a[s]=e[s])}return a}var qn=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function tf(e){qn(e)}function af(e){console.error(e)}function lf(e){qn(e)}function Mn(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function sf(e,t,a){try{var l=e.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function Ur(e,t,a){return a=ra(a),a.tag=3,a.payload={element:null},a.callback=function(){Mn(e,t)},a}function nf(e){return e=ra(e),e.tag=3,e}function rf(e,t,a,l){var s=a.type.getDerivedStateFromError;if(typeof s=="function"){var n=l.value;e.payload=function(){return s(n)},e.callback=function(){sf(t,a,l)}}var u=a.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(e.callback=function(){sf(t,a,l),typeof s!="function"&&(ya===null?ya=new Set([this]):ya.add(this));var o=l.stack;this.componentDidCatch(l.value,{componentStack:o!==null?o:""})})}function Hh(e,t,a,l,s){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=a.alternate,t!==null&&is(t,a,s,!0),a=vt.current,a!==null){switch(a.tag){case 13:return Et===null?Fr():a.alternate===null&&Se===0&&(Se=3),a.flags&=-257,a.flags|=65536,a.lanes=s,l===sr?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([l]):t.add(l),tu(e,l,s)),!1;case 22:return a.flags|=65536,l===sr?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([l]):a.add(l)),tu(e,l,s)),!1}throw Error(d(435,a.tag))}return tu(e,l,s),Fr(),!1}if(ne)return t=vt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,l!==Pi&&(e=Error(d(422),{cause:l}),ns(gt(e,a)))):(l!==Pi&&(t=Error(d(423),{cause:l}),ns(gt(t,a))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,l=gt(l,a),s=Ur(e.stateNode,l,s),rr(e,s),Se!==4&&(Se=2)),!1;var n=Error(d(520),{cause:l});if(n=gt(n,a),Ts===null?Ts=[n]:Ts.push(n),Se!==4&&(Se=2),t===null)return!0;l=gt(l,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=s&-s,a.lanes|=e,e=Ur(a.stateNode,l,e),rr(a,e),!1;case 1:if(t=a.type,n=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||n!==null&&typeof n.componentDidCatch=="function"&&(ya===null||!ya.has(n))))return a.flags|=65536,s&=-s,a.lanes|=s,s=nf(s),rf(s,e,a,l),rr(a,s),!1}a=a.return}while(a!==null);return!1}var uf=Error(d(461)),Ge=!1;function Xe(e,t,a,l){t.child=e===null?Po(t,null,a,l):Tl(t,e.child,a,l)}function cf(e,t,a,l,s){a=a.render;var n=t.ref;if("ref"in l){var u={};for(var o in l)o!=="ref"&&(u[o]=l[o])}else u=l;return Ca(t),l=dr(e,t,a,u,n,s),o=mr(),e!==null&&!Ge?(hr(e,t,s),Qt(e,t,s)):(ne&&o&&Ki(t),t.flags|=1,Xe(e,t,l,s),t.child)}function of(e,t,a,l,s){if(e===null){var n=a.type;return typeof n=="function"&&!Zi(n)&&n.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=n,ff(e,t,n,l,s)):(e=mn(a.type,null,l,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(n=e.child,!Gr(e,s)){var u=n.memoizedProps;if(a=a.compare,a=a!==null?a:ts,a(u,l)&&e.ref===t.ref)return Qt(e,t,s)}return t.flags|=1,e=zt(n,l),e.ref=t.ref,e.return=t,t.child=e}function ff(e,t,a,l,s){if(e!==null){var n=e.memoizedProps;if(ts(n,l)&&e.ref===t.ref)if(Ge=!1,t.pendingProps=l=n,Gr(e,s))(e.flags&131072)!==0&&(Ge=!0);else return t.lanes=e.lanes,Qt(e,t,s)}return Er(e,t,a,l,s)}function df(e,t,a){var l=t.pendingProps,s=l.children,n=e!==null?e.memoizedState:null;if(l.mode==="hidden"){if((t.flags&128)!==0){if(l=n!==null?n.baseLanes|a:a,e!==null){for(s=t.child=e.child,n=0;s!==null;)n=n|s.lanes|s.childLanes,s=s.sibling;t.childLanes=n&~l}else t.childLanes=0,t.child=null;return mf(e,t,l,a)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&xn(t,n!==null?n.cachePool:null),n!==null?co(t,n):cr(),Wo(t);else return t.lanes=t.childLanes=536870912,mf(e,t,n!==null?n.baseLanes|a:a,a)}else n!==null?(xn(t,n.cachePool),co(t,n),fa(),t.memoizedState=null):(e!==null&&xn(t,null),cr(),fa());return Xe(e,t,s,a),t.child}function mf(e,t,a,l){var s=lr();return s=s===null?null:{parent:Me._currentValue,pool:s},t.memoizedState={baseLanes:a,cachePool:s},e!==null&&xn(t,null),cr(),Wo(t),e!==null&&is(e,t,l,!0),null}function $n(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(d(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Er(e,t,a,l,s){return Ca(t),a=dr(e,t,a,l,void 0,s),l=mr(),e!==null&&!Ge?(hr(e,t,s),Qt(e,t,s)):(ne&&l&&Ki(t),t.flags|=1,Xe(e,t,a,s),t.child)}function hf(e,t,a,l,s,n){return Ca(t),t.updateQueue=null,a=fo(t,l,a,s),oo(e),l=mr(),e!==null&&!Ge?(hr(e,t,n),Qt(e,t,n)):(ne&&l&&Ki(t),t.flags|=1,Xe(e,t,a,n),t.child)}function gf(e,t,a,l,s){if(Ca(t),t.stateNode===null){var n=pl,u=a.contextType;typeof u=="object"&&u!==null&&(n=Qe(u)),n=new a(l,n),t.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=wr,t.stateNode=n,n._reactInternals=t,n=t.stateNode,n.props=l,n.state=t.memoizedState,n.refs={},nr(t),u=a.contextType,n.context=typeof u=="object"&&u!==null?Qe(u):pl,n.state=t.memoizedState,u=a.getDerivedStateFromProps,typeof u=="function"&&(Rr(t,a,u,l),n.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof n.getSnapshotBeforeUpdate=="function"||typeof n.UNSAFE_componentWillMount!="function"&&typeof n.componentWillMount!="function"||(u=n.state,typeof n.componentWillMount=="function"&&n.componentWillMount(),typeof n.UNSAFE_componentWillMount=="function"&&n.UNSAFE_componentWillMount(),u!==n.state&&wr.enqueueReplaceState(n,n.state,null),ms(t,l,n,s),ds(),n.state=t.memoizedState),typeof n.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){n=t.stateNode;var o=t.memoizedProps,m=La(a,o);n.props=m;var v=n.context,U=a.contextType;u=pl,typeof U=="object"&&U!==null&&(u=Qe(U));var O=a.getDerivedStateFromProps;U=typeof O=="function"||typeof n.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,U||typeof n.UNSAFE_componentWillReceiveProps!="function"&&typeof n.componentWillReceiveProps!="function"||(o||v!==u)&&ef(t,n,l,u),ia=!1;var A=t.memoizedState;n.state=A,ms(t,l,n,s),ds(),v=t.memoizedState,o||A!==v||ia?(typeof O=="function"&&(Rr(t,a,O,l),v=t.memoizedState),(m=ia||Fo(t,a,m,l,A,v,u))?(U||typeof n.UNSAFE_componentWillMount!="function"&&typeof n.componentWillMount!="function"||(typeof n.componentWillMount=="function"&&n.componentWillMount(),typeof n.UNSAFE_componentWillMount=="function"&&n.UNSAFE_componentWillMount()),typeof n.componentDidMount=="function"&&(t.flags|=4194308)):(typeof n.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=v),n.props=l,n.state=v,n.context=u,l=m):(typeof n.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{n=t.stateNode,ir(e,t),u=t.memoizedProps,U=La(a,u),n.props=U,O=t.pendingProps,A=n.context,v=a.contextType,m=pl,typeof v=="object"&&v!==null&&(m=Qe(v)),o=a.getDerivedStateFromProps,(v=typeof o=="function"||typeof n.getSnapshotBeforeUpdate=="function")||typeof n.UNSAFE_componentWillReceiveProps!="function"&&typeof n.componentWillReceiveProps!="function"||(u!==O||A!==m)&&ef(t,n,l,m),ia=!1,A=t.memoizedState,n.state=A,ms(t,l,n,s),ds();var T=t.memoizedState;u!==O||A!==T||ia||e!==null&&e.dependencies!==null&&pn(e.dependencies)?(typeof o=="function"&&(Rr(t,a,o,l),T=t.memoizedState),(U=ia||Fo(t,a,U,l,A,T,m)||e!==null&&e.dependencies!==null&&pn(e.dependencies))?(v||typeof n.UNSAFE_componentWillUpdate!="function"&&typeof n.componentWillUpdate!="function"||(typeof n.componentWillUpdate=="function"&&n.componentWillUpdate(l,T,m),typeof n.UNSAFE_componentWillUpdate=="function"&&n.UNSAFE_componentWillUpdate(l,T,m)),typeof n.componentDidUpdate=="function"&&(t.flags|=4),typeof n.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof n.componentDidUpdate!="function"||u===e.memoizedProps&&A===e.memoizedState||(t.flags|=4),typeof n.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&A===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=T),n.props=l,n.state=T,n.context=m,l=U):(typeof n.componentDidUpdate!="function"||u===e.memoizedProps&&A===e.memoizedState||(t.flags|=4),typeof n.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&A===e.memoizedState||(t.flags|=1024),l=!1)}return n=l,$n(e,t),l=(t.flags&128)!==0,n||l?(n=t.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:n.render(),t.flags|=1,e!==null&&l?(t.child=Tl(t,e.child,null,s),t.child=Tl(t,null,a,s)):Xe(e,t,a,s),t.memoizedState=n.state,e=t.child):e=Qt(e,t,s),e}function pf(e,t,a,l){return ss(),t.flags|=256,Xe(e,t,a,l),t.child}var Dr={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Or(e){return{baseLanes:e,cachePool:to()}}function qr(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=bt),e}function yf(e,t,a){var l=t.pendingProps,s=!1,n=(t.flags&128)!==0,u;if((u=n)||(u=e!==null&&e.memoizedState===null?!1:($e.current&2)!==0),u&&(s=!0,t.flags&=-129),u=(t.flags&32)!==0,t.flags&=-33,e===null){if(ne){if(s?oa(t):fa(),ne){var o=Ae,m;if(m=o){e:{for(m=o,o=Ut;m.nodeType!==8;){if(!o){o=null;break e}if(m=Nt(m.nextSibling),m===null){o=null;break e}}o=m}o!==null?(t.memoizedState={dehydrated:o,treeContext:$a!==null?{id:Bt,overflow:Ct}:null,retryLane:536870912,hydrationErrors:null},m=st(18,null,null,0),m.stateNode=o,m.return=t,t.child=m,Ze=t,Ae=null,m=!0):m=!1}m||za(t)}if(o=t.memoizedState,o!==null&&(o=o.dehydrated,o!==null))return pu(o)?t.lanes=32:t.lanes=536870912,null;Yt(t)}return o=l.children,l=l.fallback,s?(fa(),s=t.mode,o=In({mode:"hidden",children:o},s),l=Ma(l,s,a,null),o.return=t,l.return=t,o.sibling=l,t.child=o,s=t.child,s.memoizedState=Or(a),s.childLanes=qr(e,u,a),t.memoizedState=Dr,l):(oa(t),Mr(t,o))}if(m=e.memoizedState,m!==null&&(o=m.dehydrated,o!==null)){if(n)t.flags&256?(oa(t),t.flags&=-257,t=$r(e,t,a)):t.memoizedState!==null?(fa(),t.child=e.child,t.flags|=128,t=null):(fa(),s=l.fallback,o=t.mode,l=In({mode:"visible",children:l.children},o),s=Ma(s,o,a,null),s.flags|=2,l.return=t,s.return=t,l.sibling=s,t.child=l,Tl(t,e.child,null,a),l=t.child,l.memoizedState=Or(a),l.childLanes=qr(e,u,a),t.memoizedState=Dr,t=s);else if(oa(t),pu(o)){if(u=o.nextSibling&&o.nextSibling.dataset,u)var v=u.dgst;u=v,l=Error(d(419)),l.stack="",l.digest=u,ns({value:l,source:null,stack:null}),t=$r(e,t,a)}else if(Ge||is(e,t,a,!1),u=(a&e.childLanes)!==0,Ge||u){if(u=ye,u!==null&&(l=a&-a,l=(l&42)!==0?1:yi(l),l=(l&(u.suspendedLanes|a))!==0?0:l,l!==0&&l!==m.retryLane))throw m.retryLane=l,gl(e,l),ct(u,e,l),uf;o.data==="$?"||Fr(),t=$r(e,t,a)}else o.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=m.treeContext,Ae=Nt(o.nextSibling),Ze=t,ne=!0,Ga=null,Ut=!1,e!==null&&(yt[xt++]=Bt,yt[xt++]=Ct,yt[xt++]=$a,Bt=e.id,Ct=e.overflow,$a=t),t=Mr(t,l.children),t.flags|=4096);return t}return s?(fa(),s=l.fallback,o=t.mode,m=e.child,v=m.sibling,l=zt(m,{mode:"hidden",children:l.children}),l.subtreeFlags=m.subtreeFlags&65011712,v!==null?s=zt(v,s):(s=Ma(s,o,a,null),s.flags|=2),s.return=t,l.return=t,l.sibling=s,t.child=l,l=s,s=t.child,o=e.child.memoizedState,o===null?o=Or(a):(m=o.cachePool,m!==null?(v=Me._currentValue,m=m.parent!==v?{parent:v,pool:v}:m):m=to(),o={baseLanes:o.baseLanes|a,cachePool:m}),s.memoizedState=o,s.childLanes=qr(e,u,a),t.memoizedState=Dr,l):(oa(t),a=e.child,e=a.sibling,a=zt(a,{mode:"visible",children:l.children}),a.return=t,a.sibling=null,e!==null&&(u=t.deletions,u===null?(t.deletions=[e],t.flags|=16):u.push(e)),t.child=a,t.memoizedState=null,a)}function Mr(e,t){return t=In({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function In(e,t){return e=st(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function $r(e,t,a){return Tl(t,e.child,null,a),e=Mr(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xf(e,t,a){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),Fi(e.return,t,a)}function Ir(e,t,a,l,s){var n=e.memoizedState;n===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:s}:(n.isBackwards=t,n.rendering=null,n.renderingStartTime=0,n.last=l,n.tail=a,n.tailMode=s)}function vf(e,t,a){var l=t.pendingProps,s=l.revealOrder,n=l.tail;if(Xe(e,t,l.children,a),l=$e.current,(l&2)!==0)l=l&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&xf(e,a,t);else if(e.tag===19)xf(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}switch(ie($e,l),s){case"forwards":for(a=t.child,s=null;a!==null;)e=a.alternate,e!==null&&On(e)===null&&(s=a),a=a.sibling;a=s,a===null?(s=t.child,t.child=null):(s=a.sibling,a.sibling=null),Ir(t,!1,s,a,n);break;case"backwards":for(a=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&On(e)===null){t.child=s;break}e=s.sibling,s.sibling=a,a=s,s=e}Ir(t,!0,a,null,n);break;case"together":Ir(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Qt(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),pa|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(is(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(d(153));if(t.child!==null){for(e=t.child,a=zt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=zt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Gr(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&pn(e)))}function Lh(e,t,a){switch(t.tag){case 3:Wa(t,t.stateNode.containerInfo),na(t,Me,e.memoizedState.cache),ss();break;case 27:case 5:ta(t);break;case 4:Wa(t,t.stateNode.containerInfo);break;case 10:na(t,t.type,t.memoizedProps.value);break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(oa(t),t.flags|=128,null):(a&t.child.childLanes)!==0?yf(e,t,a):(oa(t),e=Qt(e,t,a),e!==null?e.sibling:null);oa(t);break;case 19:var s=(e.flags&128)!==0;if(l=(a&t.childLanes)!==0,l||(is(e,t,a,!1),l=(a&t.childLanes)!==0),s){if(l)return vf(e,t,a);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ie($e,$e.current),l)break;return null;case 22:case 23:return t.lanes=0,df(e,t,a);case 24:na(t,Me,e.memoizedState.cache)}return Qt(e,t,a)}function bf(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ge=!0;else{if(!Gr(e,a)&&(t.flags&128)===0)return Ge=!1,Lh(e,t,a);Ge=(e.flags&131072)!==0}else Ge=!1,ne&&(t.flags&1048576)!==0&&kc(t,gn,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var l=t.elementType,s=l._init;if(l=s(l._payload),t.type=l,typeof l=="function")Zi(l)?(e=La(l,e),t.tag=1,t=gf(null,t,l,e,a)):(t.tag=0,t=Er(null,t,l,e,a));else{if(l!=null){if(s=l.$$typeof,s===F){t.tag=11,t=cf(null,t,l,e,a);break e}else if(s===Ue){t.tag=14,t=of(null,t,l,e,a);break e}}throw t=wa(l)||l,Error(d(306,t,""))}}return t;case 0:return Er(e,t,t.type,t.pendingProps,a);case 1:return l=t.type,s=La(l,t.pendingProps),gf(e,t,l,s,a);case 3:e:{if(Wa(t,t.stateNode.containerInfo),e===null)throw Error(d(387));l=t.pendingProps;var n=t.memoizedState;s=n.element,ir(e,t),ms(t,l,null,a);var u=t.memoizedState;if(l=u.cache,na(t,Me,l),l!==n.cache&&er(t,[Me],a,!0),ds(),l=u.element,n.isDehydrated)if(n={element:l,isDehydrated:!1,cache:u.cache},t.updateQueue.baseState=n,t.memoizedState=n,t.flags&256){t=pf(e,t,l,a);break e}else if(l!==s){s=gt(Error(d(424)),t),ns(s),t=pf(e,t,l,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ae=Nt(e.firstChild),Ze=t,ne=!0,Ga=null,Ut=!0,a=Po(t,null,l,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(ss(),l===s){t=Qt(e,t,a);break e}Xe(e,t,l,a)}t=t.child}return t;case 26:return $n(e,t),e===null?(a=_d(t.type,null,t.pendingProps,null))?t.memoizedState=a:ne||(a=t.type,e=t.pendingProps,l=Jn(Tt.current).createElement(a),l[Ye]=t,l[ke]=e,Le(l,a,e),Ie(l),t.stateNode=l):t.memoizedState=_d(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ta(t),e===null&&ne&&(l=t.stateNode=jd(t.type,t.pendingProps,Tt.current),Ze=t,Ut=!0,s=Ae,ba(t.type)?(yu=s,Ae=Nt(l.firstChild)):Ae=s),Xe(e,t,t.pendingProps.children,a),$n(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ne&&((s=l=Ae)&&(l=yg(l,t.type,t.pendingProps,Ut),l!==null?(t.stateNode=l,Ze=t,Ae=Nt(l.firstChild),Ut=!1,s=!0):s=!1),s||za(t)),ta(t),s=t.type,n=t.pendingProps,u=e!==null?e.memoizedProps:null,l=n.children,mu(s,n)?l=null:u!==null&&mu(s,u)&&(t.flags|=32),t.memoizedState!==null&&(s=dr(e,t,$h,null,null,a),$s._currentValue=s),$n(e,t),Xe(e,t,l,a),t.child;case 6:return e===null&&ne&&((e=a=Ae)&&(a=xg(a,t.pendingProps,Ut),a!==null?(t.stateNode=a,Ze=t,Ae=null,e=!0):e=!1),e||za(t)),null;case 13:return yf(e,t,a);case 4:return Wa(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=Tl(t,null,l,a):Xe(e,t,l,a),t.child;case 11:return cf(e,t,t.type,t.pendingProps,a);case 7:return Xe(e,t,t.pendingProps,a),t.child;case 8:return Xe(e,t,t.pendingProps.children,a),t.child;case 12:return Xe(e,t,t.pendingProps.children,a),t.child;case 10:return l=t.pendingProps,na(t,t.type,l.value),Xe(e,t,l.children,a),t.child;case 9:return s=t.type._context,l=t.pendingProps.children,Ca(t),s=Qe(s),l=l(s),t.flags|=1,Xe(e,t,l,a),t.child;case 14:return of(e,t,t.type,t.pendingProps,a);case 15:return ff(e,t,t.type,t.pendingProps,a);case 19:return vf(e,t,a);case 31:return l=t.pendingProps,a=t.mode,l={mode:l.mode,children:l.children},e===null?(a=In(l,a),a.ref=t.ref,t.child=a,a.return=t,t=a):(a=zt(e.child,l),a.ref=t.ref,t.child=a,a.return=t,t=a),t;case 22:return df(e,t,a);case 24:return Ca(t),l=Qe(Me),e===null?(s=lr(),s===null&&(s=ye,n=tr(),s.pooledCache=n,n.refCount++,n!==null&&(s.pooledCacheLanes|=a),s=n),t.memoizedState={parent:l,cache:s},nr(t),na(t,Me,s)):((e.lanes&a)!==0&&(ir(e,t),ms(t,null,null,a),ds()),s=e.memoizedState,n=t.memoizedState,s.parent!==l?(s={parent:l,cache:l},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),na(t,Me,l)):(l=n.cache,na(t,Me,l),l!==s.cache&&er(t,[Me],a,!0))),Xe(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(d(156,t.tag))}function Zt(e){e.flags|=4}function jf(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Ud(t)){if(t=vt.current,t!==null&&((le&4194048)===le?Et!==null:(le&62914560)!==le&&(le&536870912)===0||t!==Et))throw os=sr,ao;e.flags|=8192}}function Gn(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Pu():536870912,e.lanes|=t,El|=t)}function bs(e,t){if(!ne)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function je(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,l=0;if(t)for(var s=e.child;s!==null;)a|=s.lanes|s.childLanes,l|=s.subtreeFlags&65011712,l|=s.flags&65011712,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)a|=s.lanes|s.childLanes,l|=s.subtreeFlags,l|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=l,e.childLanes=a,t}function Yh(e,t,a){var l=t.pendingProps;switch(Ji(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return je(t),null;case 1:return je(t),null;case 3:return a=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Ht(Me),Rt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ls(t)?Zt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Pc())),je(t),null;case 26:return a=t.memoizedState,e===null?(Zt(t),a!==null?(je(t),jf(t,a)):(je(t),t.flags&=-16777217)):a?a!==e.memoizedState?(Zt(t),je(t),jf(t,a)):(je(t),t.flags&=-16777217):(e.memoizedProps!==l&&Zt(t),je(t),t.flags&=-16777217),null;case 27:Fa(t),a=Tt.current;var s=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Zt(t);else{if(!l){if(t.stateNode===null)throw Error(d(166));return je(t),null}e=Ee.current,ls(t)?Kc(t):(e=jd(s,l,a),t.stateNode=e,Zt(t))}return je(t),null;case 5:if(Fa(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Zt(t);else{if(!l){if(t.stateNode===null)throw Error(d(166));return je(t),null}if(e=Ee.current,ls(t))Kc(t);else{switch(s=Jn(Tt.current),e){case 1:e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof l.is=="string"?s.createElement("select",{is:l.is}):s.createElement("select"),l.multiple?e.multiple=!0:l.size&&(e.size=l.size);break;default:e=typeof l.is=="string"?s.createElement(a,{is:l.is}):s.createElement(a)}}e[Ye]=t,e[ke]=l;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)e.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=e;e:switch(Le(e,a,l),a){case"button":case"input":case"select":case"textarea":e=!!l.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&Zt(t)}}return je(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&Zt(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(d(166));if(e=Tt.current,ls(t)){if(e=t.stateNode,a=t.memoizedProps,l=null,s=Ze,s!==null)switch(s.tag){case 27:case 5:l=s.memoizedProps}e[Ye]=t,e=!!(e.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||hd(e.nodeValue,a)),e||za(t)}else e=Jn(e).createTextNode(l),e[Ye]=t,t.stateNode=e}return je(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=ls(t),l!==null&&l.dehydrated!==null){if(e===null){if(!s)throw Error(d(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(d(317));s[Ye]=t}else ss(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;je(t),s=!1}else s=Pc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(Yt(t),t):(Yt(t),null)}if(Yt(t),(t.flags&128)!==0)return t.lanes=a,t;if(a=l!==null,e=e!==null&&e.memoizedState!==null,a){l=t.child,s=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(s=l.alternate.memoizedState.cachePool.pool);var n=null;l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(n=l.memoizedState.cachePool.pool),n!==s&&(l.flags|=2048)}return a!==e&&a&&(t.child.flags|=8192),Gn(t,t.updateQueue),je(t),null;case 4:return Rt(),e===null&&uu(t.stateNode.containerInfo),je(t),null;case 10:return Ht(t.type),je(t),null;case 19:if(xe($e),s=t.memoizedState,s===null)return je(t),null;if(l=(t.flags&128)!==0,n=s.rendering,n===null)if(l)bs(s,!1);else{if(Se!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(n=On(e),n!==null){for(t.flags|=128,bs(s,!1),e=n.updateQueue,t.updateQueue=e,Gn(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Vc(a,e),a=a.sibling;return ie($e,$e.current&1|2),t.child}e=e.sibling}s.tail!==null&&wt()>Cn&&(t.flags|=128,l=!0,bs(s,!1),t.lanes=4194304)}else{if(!l)if(e=On(n),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Gn(t,e),bs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!n.alternate&&!ne)return je(t),null}else 2*wt()-s.renderingStartTime>Cn&&a!==536870912&&(t.flags|=128,l=!0,bs(s,!1),t.lanes=4194304);s.isBackwards?(n.sibling=t.child,t.child=n):(e=s.last,e!==null?e.sibling=n:t.child=n,s.last=n)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=wt(),t.sibling=null,e=$e.current,ie($e,l?e&1|2:e&1),t):(je(t),null);case 22:case 23:return Yt(t),or(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?(a&536870912)!==0&&(t.flags&128)===0&&(je(t),t.subtreeFlags&6&&(t.flags|=8192)):je(t),a=t.updateQueue,a!==null&&Gn(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(t.flags|=2048),e!==null&&xe(Xa),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Ht(Me),je(t),null;case 25:return null;case 30:return null}throw Error(d(156,t.tag))}function Qh(e,t){switch(Ji(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ht(Me),Rt(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Fa(t),null;case 13:if(Yt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(d(340));ss()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return xe($e),null;case 4:return Rt(),null;case 10:return Ht(t.type),null;case 22:case 23:return Yt(t),or(),e!==null&&xe(Xa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ht(Me),null;case 25:return null;default:return null}}function Af(e,t){switch(Ji(t),t.tag){case 3:Ht(Me),Rt();break;case 26:case 27:case 5:Fa(t);break;case 4:Rt();break;case 13:Yt(t);break;case 19:xe($e);break;case 10:Ht(t.type);break;case 22:case 23:Yt(t),or(),e!==null&&xe(Xa);break;case 24:Ht(Me)}}function js(e,t){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var s=l.next;a=s;do{if((a.tag&e)===e){l=void 0;var n=a.create,u=a.inst;l=n(),u.destroy=l}a=a.next}while(a!==s)}}catch(o){ge(t,t.return,o)}}function da(e,t,a){try{var l=t.updateQueue,s=l!==null?l.lastEffect:null;if(s!==null){var n=s.next;l=n;do{if((l.tag&e)===e){var u=l.inst,o=u.destroy;if(o!==void 0){u.destroy=void 0,s=t;var m=a,v=o;try{v()}catch(U){ge(s,m,U)}}}l=l.next}while(l!==n)}}catch(U){ge(t,t.return,U)}}function Sf(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{uo(t,a)}catch(l){ge(e,e.return,l)}}}function _f(e,t,a){a.props=La(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(l){ge(e,t,l)}}function As(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof a=="function"?e.refCleanup=a(l):a.current=l}}catch(s){ge(e,t,s)}}function Dt(e,t){var a=e.ref,l=e.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(s){ge(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(s){ge(e,t,s)}else a.current=null}function Nf(e){var t=e.type,a=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break e;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(s){ge(e,e.return,s)}}function zr(e,t,a){try{var l=e.stateNode;dg(l,e.type,a,t),l[ke]=t}catch(s){ge(e,e.return,s)}}function Tf(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ba(e.type)||e.tag===4}function Br(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Tf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ba(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Cr(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Kn));else if(l!==4&&(l===27&&ba(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Cr(e,t,a),e=e.sibling;e!==null;)Cr(e,t,a),e=e.sibling}function zn(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(l!==4&&(l===27&&ba(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(zn(e,t,a),e=e.sibling;e!==null;)zn(e,t,a),e=e.sibling}function Rf(e){var t=e.stateNode,a=e.memoizedProps;try{for(var l=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);Le(t,l,a),t[Ye]=e,t[ke]=a}catch(n){ge(e,e.return,n)}}var Vt=!1,Te=!1,Xr=!1,wf=typeof WeakSet=="function"?WeakSet:Set,ze=null;function Zh(e,t){if(e=e.containerInfo,fu=ai,e=Gc(e),Bi(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var s=l.anchorOffset,n=l.focusNode;l=l.focusOffset;try{a.nodeType,n.nodeType}catch{a=null;break e}var u=0,o=-1,m=-1,v=0,U=0,O=e,A=null;t:for(;;){for(var T;O!==a||s!==0&&O.nodeType!==3||(o=u+s),O!==n||l!==0&&O.nodeType!==3||(m=u+l),O.nodeType===3&&(u+=O.nodeValue.length),(T=O.firstChild)!==null;)A=O,O=T;for(;;){if(O===e)break t;if(A===a&&++v===s&&(o=u),A===n&&++U===l&&(m=u),(T=O.nextSibling)!==null)break;O=A,A=O.parentNode}O=T}a=o===-1||m===-1?null:{start:o,end:m}}else a=null}a=a||{start:0,end:0}}else a=null;for(du={focusedElem:e,selectionRange:a},ai=!1,ze=t;ze!==null;)if(t=ze,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,ze=e;else for(;ze!==null;){switch(t=ze,n=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&n!==null){e=void 0,a=t,s=n.memoizedProps,n=n.memoizedState,l=a.stateNode;try{var k=La(a.type,s,a.elementType===a.type);e=l.getSnapshotBeforeUpdate(k,n),l.__reactInternalSnapshotBeforeUpdate=e}catch(Q){ge(a,a.return,Q)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)gu(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":gu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(d(163))}if(e=t.sibling,e!==null){e.return=t.return,ze=e;break}ze=t.return}}function Uf(e,t,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:ma(e,a),l&4&&js(5,a);break;case 1:if(ma(e,a),l&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(u){ge(a,a.return,u)}else{var s=La(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(u){ge(a,a.return,u)}}l&64&&Sf(a),l&512&&As(a,a.return);break;case 3:if(ma(e,a),l&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{uo(e,t)}catch(u){ge(a,a.return,u)}}break;case 27:t===null&&l&4&&Rf(a);case 26:case 5:ma(e,a),t===null&&l&4&&Nf(a),l&512&&As(a,a.return);break;case 12:ma(e,a);break;case 13:ma(e,a),l&4&&Of(e,a),l&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=tg.bind(null,a),vg(e,a))));break;case 22:if(l=a.memoizedState!==null||Vt,!l){t=t!==null&&t.memoizedState!==null||Te,s=Vt;var n=Te;Vt=l,(Te=t)&&!n?ha(e,a,(a.subtreeFlags&8772)!==0):ma(e,a),Vt=s,Te=n}break;case 30:break;default:ma(e,a)}}function Ef(e){var t=e.alternate;t!==null&&(e.alternate=null,Ef(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&bi(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var be=null,Pe=!1;function kt(e,t,a){for(a=a.child;a!==null;)Df(e,t,a),a=a.sibling}function Df(e,t,a){if(tt&&typeof tt.onCommitFiberUnmount=="function")try{tt.onCommitFiberUnmount(Ll,a)}catch{}switch(a.tag){case 26:Te||Dt(a,t),kt(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Te||Dt(a,t);var l=be,s=Pe;ba(a.type)&&(be=a.stateNode,Pe=!1),kt(e,t,a),Ds(a.stateNode),be=l,Pe=s;break;case 5:Te||Dt(a,t);case 6:if(l=be,s=Pe,be=null,kt(e,t,a),be=l,Pe=s,be!==null)if(Pe)try{(be.nodeType===9?be.body:be.nodeName==="HTML"?be.ownerDocument.body:be).removeChild(a.stateNode)}catch(n){ge(a,t,n)}else try{be.removeChild(a.stateNode)}catch(n){ge(a,t,n)}break;case 18:be!==null&&(Pe?(e=be,vd(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Bs(e)):vd(be,a.stateNode));break;case 4:l=be,s=Pe,be=a.stateNode.containerInfo,Pe=!0,kt(e,t,a),be=l,Pe=s;break;case 0:case 11:case 14:case 15:Te||da(2,a,t),Te||da(4,a,t),kt(e,t,a);break;case 1:Te||(Dt(a,t),l=a.stateNode,typeof l.componentWillUnmount=="function"&&_f(a,t,l)),kt(e,t,a);break;case 21:kt(e,t,a);break;case 22:Te=(l=Te)||a.memoizedState!==null,kt(e,t,a),Te=l;break;default:kt(e,t,a)}}function Of(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Bs(e)}catch(a){ge(t,t.return,a)}}function Vh(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new wf),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new wf),t;default:throw Error(d(435,e.tag))}}function Hr(e,t){var a=Vh(e);t.forEach(function(l){var s=ag.bind(null,e,l);a.has(l)||(a.add(l),l.then(s,s))})}function nt(e,t){var a=t.deletions;if(a!==null)for(var l=0;l<a.length;l++){var s=a[l],n=e,u=t,o=u;e:for(;o!==null;){switch(o.tag){case 27:if(ba(o.type)){be=o.stateNode,Pe=!1;break e}break;case 5:be=o.stateNode,Pe=!1;break e;case 3:case 4:be=o.stateNode.containerInfo,Pe=!0;break e}o=o.return}if(be===null)throw Error(d(160));Df(n,u,s),be=null,Pe=!1,n=s.alternate,n!==null&&(n.return=null),s.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)qf(t,e),t=t.sibling}var _t=null;function qf(e,t){var a=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:nt(t,e),it(e),l&4&&(da(3,e,e.return),js(3,e),da(5,e,e.return));break;case 1:nt(t,e),it(e),l&512&&(Te||a===null||Dt(a,a.return)),l&64&&Vt&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var s=_t;if(nt(t,e),it(e),l&512&&(Te||a===null||Dt(a,a.return)),l&4){var n=a!==null?a.memoizedState:null;if(l=e.memoizedState,a===null)if(l===null)if(e.stateNode===null){e:{l=e.type,a=e.memoizedProps,s=s.ownerDocument||s;t:switch(l){case"title":n=s.getElementsByTagName("title")[0],(!n||n[Zl]||n[Ye]||n.namespaceURI==="http://www.w3.org/2000/svg"||n.hasAttribute("itemprop"))&&(n=s.createElement(l),s.head.insertBefore(n,s.querySelector("head > title"))),Le(n,l,a),n[Ye]=e,Ie(n),l=n;break e;case"link":var u=Rd("link","href",s).get(l+(a.href||""));if(u){for(var o=0;o<u.length;o++)if(n=u[o],n.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&n.getAttribute("rel")===(a.rel==null?null:a.rel)&&n.getAttribute("title")===(a.title==null?null:a.title)&&n.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){u.splice(o,1);break t}}n=s.createElement(l),Le(n,l,a),s.head.appendChild(n);break;case"meta":if(u=Rd("meta","content",s).get(l+(a.content||""))){for(o=0;o<u.length;o++)if(n=u[o],n.getAttribute("content")===(a.content==null?null:""+a.content)&&n.getAttribute("name")===(a.name==null?null:a.name)&&n.getAttribute("property")===(a.property==null?null:a.property)&&n.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&n.getAttribute("charset")===(a.charSet==null?null:a.charSet)){u.splice(o,1);break t}}n=s.createElement(l),Le(n,l,a),s.head.appendChild(n);break;default:throw Error(d(468,l))}n[Ye]=e,Ie(n),l=n}e.stateNode=l}else wd(s,e.type,e.stateNode);else e.stateNode=Td(s,l,e.memoizedProps);else n!==l?(n===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):n.count--,l===null?wd(s,e.type,e.stateNode):Td(s,l,e.memoizedProps)):l===null&&e.stateNode!==null&&zr(e,e.memoizedProps,a.memoizedProps)}break;case 27:nt(t,e),it(e),l&512&&(Te||a===null||Dt(a,a.return)),a!==null&&l&4&&zr(e,e.memoizedProps,a.memoizedProps);break;case 5:if(nt(t,e),it(e),l&512&&(Te||a===null||Dt(a,a.return)),e.flags&32){s=e.stateNode;try{ul(s,"")}catch(T){ge(e,e.return,T)}}l&4&&e.stateNode!=null&&(s=e.memoizedProps,zr(e,s,a!==null?a.memoizedProps:s)),l&1024&&(Xr=!0);break;case 6:if(nt(t,e),it(e),l&4){if(e.stateNode===null)throw Error(d(162));l=e.memoizedProps,a=e.stateNode;try{a.nodeValue=l}catch(T){ge(e,e.return,T)}}break;case 3:if(Fn=null,s=_t,_t=Pn(t.containerInfo),nt(t,e),_t=s,it(e),l&4&&a!==null&&a.memoizedState.isDehydrated)try{Bs(t.containerInfo)}catch(T){ge(e,e.return,T)}Xr&&(Xr=!1,Mf(e));break;case 4:l=_t,_t=Pn(e.stateNode.containerInfo),nt(t,e),it(e),_t=l;break;case 12:nt(t,e),it(e);break;case 13:nt(t,e),it(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(kr=wt()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Hr(e,l)));break;case 22:s=e.memoizedState!==null;var m=a!==null&&a.memoizedState!==null,v=Vt,U=Te;if(Vt=v||s,Te=U||m,nt(t,e),Te=U,Vt=v,it(e),l&8192)e:for(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,s&&(a===null||m||Vt||Te||Ya(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){m=a=t;try{if(n=m.stateNode,s)u=n.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{o=m.stateNode;var O=m.memoizedProps.style,A=O!=null&&O.hasOwnProperty("display")?O.display:null;o.style.display=A==null||typeof A=="boolean"?"":(""+A).trim()}}catch(T){ge(m,m.return,T)}}}else if(t.tag===6){if(a===null){m=t;try{m.stateNode.nodeValue=s?"":m.memoizedProps}catch(T){ge(m,m.return,T)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,Hr(e,a))));break;case 19:nt(t,e),it(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Hr(e,l)));break;case 30:break;case 21:break;default:nt(t,e),it(e)}}function it(e){var t=e.flags;if(t&2){try{for(var a,l=e.return;l!==null;){if(Tf(l)){a=l;break}l=l.return}if(a==null)throw Error(d(160));switch(a.tag){case 27:var s=a.stateNode,n=Br(e);zn(e,n,s);break;case 5:var u=a.stateNode;a.flags&32&&(ul(u,""),a.flags&=-33);var o=Br(e);zn(e,o,u);break;case 3:case 4:var m=a.stateNode.containerInfo,v=Br(e);Cr(e,v,m);break;default:throw Error(d(161))}}catch(U){ge(e,e.return,U)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Mf(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Mf(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ma(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Uf(e,t.alternate,t),t=t.sibling}function Ya(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:da(4,t,t.return),Ya(t);break;case 1:Dt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&_f(t,t.return,a),Ya(t);break;case 27:Ds(t.stateNode);case 26:case 5:Dt(t,t.return),Ya(t);break;case 22:t.memoizedState===null&&Ya(t);break;case 30:Ya(t);break;default:Ya(t)}e=e.sibling}}function ha(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,s=e,n=t,u=n.flags;switch(n.tag){case 0:case 11:case 15:ha(s,n,a),js(4,n);break;case 1:if(ha(s,n,a),l=n,s=l.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(v){ge(l,l.return,v)}if(l=n,s=l.updateQueue,s!==null){var o=l.stateNode;try{var m=s.shared.hiddenCallbacks;if(m!==null)for(s.shared.hiddenCallbacks=null,s=0;s<m.length;s++)ro(m[s],o)}catch(v){ge(l,l.return,v)}}a&&u&64&&Sf(n),As(n,n.return);break;case 27:Rf(n);case 26:case 5:ha(s,n,a),a&&l===null&&u&4&&Nf(n),As(n,n.return);break;case 12:ha(s,n,a);break;case 13:ha(s,n,a),a&&u&4&&Of(s,n);break;case 22:n.memoizedState===null&&ha(s,n,a),As(n,n.return);break;case 30:break;default:ha(s,n,a)}t=t.sibling}}function Lr(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&rs(a))}function Yr(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&rs(e))}function Ot(e,t,a,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)$f(e,t,a,l),t=t.sibling}function $f(e,t,a,l){var s=t.flags;switch(t.tag){case 0:case 11:case 15:Ot(e,t,a,l),s&2048&&js(9,t);break;case 1:Ot(e,t,a,l);break;case 3:Ot(e,t,a,l),s&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&rs(e)));break;case 12:if(s&2048){Ot(e,t,a,l),e=t.stateNode;try{var n=t.memoizedProps,u=n.id,o=n.onPostCommit;typeof o=="function"&&o(u,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(m){ge(t,t.return,m)}}else Ot(e,t,a,l);break;case 13:Ot(e,t,a,l);break;case 23:break;case 22:n=t.stateNode,u=t.alternate,t.memoizedState!==null?n._visibility&2?Ot(e,t,a,l):Ss(e,t):n._visibility&2?Ot(e,t,a,l):(n._visibility|=2,Rl(e,t,a,l,(t.subtreeFlags&10256)!==0)),s&2048&&Lr(u,t);break;case 24:Ot(e,t,a,l),s&2048&&Yr(t.alternate,t);break;default:Ot(e,t,a,l)}}function Rl(e,t,a,l,s){for(s=s&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var n=e,u=t,o=a,m=l,v=u.flags;switch(u.tag){case 0:case 11:case 15:Rl(n,u,o,m,s),js(8,u);break;case 23:break;case 22:var U=u.stateNode;u.memoizedState!==null?U._visibility&2?Rl(n,u,o,m,s):Ss(n,u):(U._visibility|=2,Rl(n,u,o,m,s)),s&&v&2048&&Lr(u.alternate,u);break;case 24:Rl(n,u,o,m,s),s&&v&2048&&Yr(u.alternate,u);break;default:Rl(n,u,o,m,s)}t=t.sibling}}function Ss(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,l=t,s=l.flags;switch(l.tag){case 22:Ss(a,l),s&2048&&Lr(l.alternate,l);break;case 24:Ss(a,l),s&2048&&Yr(l.alternate,l);break;default:Ss(a,l)}t=t.sibling}}var _s=8192;function wl(e){if(e.subtreeFlags&_s)for(e=e.child;e!==null;)If(e),e=e.sibling}function If(e){switch(e.tag){case 26:wl(e),e.flags&_s&&e.memoizedState!==null&&Og(_t,e.memoizedState,e.memoizedProps);break;case 5:wl(e);break;case 3:case 4:var t=_t;_t=Pn(e.stateNode.containerInfo),wl(e),_t=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=_s,_s=16777216,wl(e),_s=t):wl(e));break;default:wl(e)}}function Gf(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ns(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];ze=l,Bf(l,e)}Gf(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)zf(e),e=e.sibling}function zf(e){switch(e.tag){case 0:case 11:case 15:Ns(e),e.flags&2048&&da(9,e,e.return);break;case 3:Ns(e);break;case 12:Ns(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Bn(e)):Ns(e);break;default:Ns(e)}}function Bn(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];ze=l,Bf(l,e)}Gf(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:da(8,t,t.return),Bn(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Bn(t));break;default:Bn(t)}e=e.sibling}}function Bf(e,t){for(;ze!==null;){var a=ze;switch(a.tag){case 0:case 11:case 15:da(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:rs(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,ze=l;else e:for(a=e;ze!==null;){l=ze;var s=l.sibling,n=l.return;if(Ef(l),l===a){ze=null;break e}if(s!==null){s.return=n,ze=s;break e}ze=n}}}var kh={getCacheForType:function(e){var t=Qe(Me),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a}},Kh=typeof WeakMap=="function"?WeakMap:Map,ue=0,ye=null,te=null,le=0,ce=0,rt=null,ga=!1,Ul=!1,Qr=!1,Kt=0,Se=0,pa=0,Qa=0,Zr=0,bt=0,El=0,Ts=null,We=null,Vr=!1,kr=0,Cn=1/0,Xn=null,ya=null,He=0,xa=null,Dl=null,Ol=0,Kr=0,Jr=null,Cf=null,Rs=0,Pr=null;function ut(){if((ue&2)!==0&&le!==0)return le&-le;if(E.T!==null){var e=vl;return e!==0?e:su()}return ec()}function Xf(){bt===0&&(bt=(le&536870912)===0||ne?Ju():536870912);var e=vt.current;return e!==null&&(e.flags|=32),bt}function ct(e,t,a){(e===ye&&(ce===2||ce===9)||e.cancelPendingCommit!==null)&&(ql(e,0),va(e,le,bt,!1)),Ql(e,a),((ue&2)===0||e!==ye)&&(e===ye&&((ue&2)===0&&(Qa|=a),Se===4&&va(e,le,bt,!1)),qt(e))}function Hf(e,t,a){if((ue&6)!==0)throw Error(d(327));var l=!a&&(t&124)===0&&(t&e.expiredLanes)===0||Yl(e,t),s=l?Wh(e,t):eu(e,t,!0),n=l;do{if(s===0){Ul&&!l&&va(e,t,0,!1);break}else{if(a=e.current.alternate,n&&!Jh(a)){s=eu(e,t,!1),n=!1;continue}if(s===2){if(n=t,e.errorRecoveryDisabledLanes&n)var u=0;else u=e.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){t=u;e:{var o=e;s=Ts;var m=o.current.memoizedState.isDehydrated;if(m&&(ql(o,u).flags|=256),u=eu(o,u,!1),u!==2){if(Qr&&!m){o.errorRecoveryDisabledLanes|=n,Qa|=n,s=4;break e}n=We,We=s,n!==null&&(We===null?We=n:We.push.apply(We,n))}s=u}if(n=!1,s!==2)continue}}if(s===1){ql(e,0),va(e,t,0,!0);break}e:{switch(l=e,n=s,n){case 0:case 1:throw Error(d(345));case 4:if((t&4194048)!==t)break;case 6:va(l,t,bt,!ga);break e;case 2:We=null;break;case 3:case 5:break;default:throw Error(d(329))}if((t&62914560)===t&&(s=kr+300-wt(),10<s)){if(va(l,t,bt,!ga),Ps(l,0,!0)!==0)break e;l.timeoutHandle=yd(Lf.bind(null,l,a,We,Xn,Vr,t,bt,Qa,El,ga,n,2,-0,0),s);break e}Lf(l,a,We,Xn,Vr,t,bt,Qa,El,ga,n,0,-0,0)}}break}while(!0);qt(e)}function Lf(e,t,a,l,s,n,u,o,m,v,U,O,A,T){if(e.timeoutHandle=-1,O=t.subtreeFlags,(O&8192||(O&16785408)===16785408)&&(Ms={stylesheets:null,count:0,unsuspend:Dg},If(t),O=qg(),O!==null)){e.cancelPendingCommit=O(Jf.bind(null,e,t,n,a,l,s,u,o,m,U,1,A,T)),va(e,n,u,!v);return}Jf(e,t,n,a,l,s,u,o,m)}function Jh(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var s=a[l],n=s.getSnapshot;s=s.value;try{if(!lt(n(),s))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function va(e,t,a,l){t&=~Zr,t&=~Qa,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var s=t;0<s;){var n=31-at(s),u=1<<n;l[n]=-1,s&=~u}a!==0&&Wu(e,a,t)}function Hn(){return(ue&6)===0?(ws(0),!1):!0}function Wr(){if(te!==null){if(ce===0)var e=te.return;else e=te,Xt=Ba=null,gr(e),Nl=null,xs=0,e=te;for(;e!==null;)Af(e.alternate,e),e=e.return;te=null}}function ql(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,hg(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Wr(),ye=e,te=a=zt(e.current,null),le=t,ce=0,rt=null,ga=!1,Ul=Yl(e,t),Qr=!1,El=bt=Zr=Qa=pa=Se=0,We=Ts=null,Vr=!1,(t&8)!==0&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var s=31-at(l),n=1<<s;t|=e[s],l&=~n}return Kt=t,on(),a}function Yf(e,t){W=null,E.H=Un,t===cs||t===vn?(t=no(),ce=3):t===ao?(t=no(),ce=4):ce=t===uf?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,rt=t,te===null&&(Se=1,Mn(e,gt(t,e.current)))}function Qf(){var e=E.H;return E.H=Un,e===null?Un:e}function Zf(){var e=E.A;return E.A=kh,e}function Fr(){Se=4,ga||(le&4194048)!==le&&vt.current!==null||(Ul=!0),(pa&134217727)===0&&(Qa&134217727)===0||ye===null||va(ye,le,bt,!1)}function eu(e,t,a){var l=ue;ue|=2;var s=Qf(),n=Zf();(ye!==e||le!==t)&&(Xn=null,ql(e,t)),t=!1;var u=Se;e:do try{if(ce!==0&&te!==null){var o=te,m=rt;switch(ce){case 8:Wr(),u=6;break e;case 3:case 2:case 9:case 6:vt.current===null&&(t=!0);var v=ce;if(ce=0,rt=null,Ml(e,o,m,v),a&&Ul){u=0;break e}break;default:v=ce,ce=0,rt=null,Ml(e,o,m,v)}}Ph(),u=Se;break}catch(U){Yf(e,U)}while(!0);return t&&e.shellSuspendCounter++,Xt=Ba=null,ue=l,E.H=s,E.A=n,te===null&&(ye=null,le=0,on()),u}function Ph(){for(;te!==null;)Vf(te)}function Wh(e,t){var a=ue;ue|=2;var l=Qf(),s=Zf();ye!==e||le!==t?(Xn=null,Cn=wt()+500,ql(e,t)):Ul=Yl(e,t);e:do try{if(ce!==0&&te!==null){t=te;var n=rt;t:switch(ce){case 1:ce=0,rt=null,Ml(e,t,n,1);break;case 2:case 9:if(lo(n)){ce=0,rt=null,kf(t);break}t=function(){ce!==2&&ce!==9||ye!==e||(ce=7),qt(e)},n.then(t,t);break e;case 3:ce=7;break e;case 4:ce=5;break e;case 7:lo(n)?(ce=0,rt=null,kf(t)):(ce=0,rt=null,Ml(e,t,n,7));break;case 5:var u=null;switch(te.tag){case 26:u=te.memoizedState;case 5:case 27:var o=te;if(!u||Ud(u)){ce=0,rt=null;var m=o.sibling;if(m!==null)te=m;else{var v=o.return;v!==null?(te=v,Ln(v)):te=null}break t}}ce=0,rt=null,Ml(e,t,n,5);break;case 6:ce=0,rt=null,Ml(e,t,n,6);break;case 8:Wr(),Se=6;break e;default:throw Error(d(462))}}Fh();break}catch(U){Yf(e,U)}while(!0);return Xt=Ba=null,E.H=l,E.A=s,ue=a,te!==null?0:(ye=null,le=0,on(),Se)}function Fh(){for(;te!==null&&!Hl();)Vf(te)}function Vf(e){var t=bf(e.alternate,e,Kt);e.memoizedProps=e.pendingProps,t===null?Ln(e):te=t}function kf(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=hf(a,t,t.pendingProps,t.type,void 0,le);break;case 11:t=hf(a,t,t.pendingProps,t.type.render,t.ref,le);break;case 5:gr(t);default:Af(a,t),t=te=Vc(t,Kt),t=bf(a,t,Kt)}e.memoizedProps=e.pendingProps,t===null?Ln(e):te=t}function Ml(e,t,a,l){Xt=Ba=null,gr(t),Nl=null,xs=0;var s=t.return;try{if(Hh(e,s,t,a,le)){Se=1,Mn(e,gt(a,e.current)),te=null;return}}catch(n){if(s!==null)throw te=s,n;Se=1,Mn(e,gt(a,e.current)),te=null;return}t.flags&32768?(ne||l===1?e=!0:Ul||(le&536870912)!==0?e=!1:(ga=e=!0,(l===2||l===9||l===3||l===6)&&(l=vt.current,l!==null&&l.tag===13&&(l.flags|=16384))),Kf(t,e)):Ln(t)}function Ln(e){var t=e;do{if((t.flags&32768)!==0){Kf(t,ga);return}e=t.return;var a=Yh(t.alternate,t,Kt);if(a!==null){te=a;return}if(t=t.sibling,t!==null){te=t;return}te=t=e}while(t!==null);Se===0&&(Se=5)}function Kf(e,t){do{var a=Qh(e.alternate,e);if(a!==null){a.flags&=32767,te=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){te=e;return}te=e=a}while(e!==null);Se=6,te=null}function Jf(e,t,a,l,s,n,u,o,m){e.cancelPendingCommit=null;do Yn();while(He!==0);if((ue&6)!==0)throw Error(d(327));if(t!==null){if(t===e.current)throw Error(d(177));if(n=t.lanes|t.childLanes,n|=Yi,Dm(e,a,n,u,o,m),e===ye&&(te=ye=null,le=0),Dl=t,xa=e,Ol=a,Kr=n,Jr=s,Cf=l,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,lg(ks,function(){return td(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||l){l=E.T,E.T=null,s=C.p,C.p=2,u=ue,ue|=4;try{Zh(e,t,a)}finally{ue=u,C.p=s,E.T=l}}He=1,Pf(),Wf(),Ff()}}function Pf(){if(He===1){He=0;var e=xa,t=Dl,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=E.T,E.T=null;var l=C.p;C.p=2;var s=ue;ue|=4;try{qf(t,e);var n=du,u=Gc(e.containerInfo),o=n.focusedElem,m=n.selectionRange;if(u!==o&&o&&o.ownerDocument&&Ic(o.ownerDocument.documentElement,o)){if(m!==null&&Bi(o)){var v=m.start,U=m.end;if(U===void 0&&(U=v),"selectionStart"in o)o.selectionStart=v,o.selectionEnd=Math.min(U,o.value.length);else{var O=o.ownerDocument||document,A=O&&O.defaultView||window;if(A.getSelection){var T=A.getSelection(),k=o.textContent.length,Q=Math.min(m.start,k),he=m.end===void 0?Q:Math.min(m.end,k);!T.extend&&Q>he&&(u=he,he=Q,Q=u);var y=$c(o,Q),g=$c(o,he);if(y&&g&&(T.rangeCount!==1||T.anchorNode!==y.node||T.anchorOffset!==y.offset||T.focusNode!==g.node||T.focusOffset!==g.offset)){var x=O.createRange();x.setStart(y.node,y.offset),T.removeAllRanges(),Q>he?(T.addRange(x),T.extend(g.node,g.offset)):(x.setEnd(g.node,g.offset),T.addRange(x))}}}}for(O=[],T=o;T=T.parentNode;)T.nodeType===1&&O.push({element:T,left:T.scrollLeft,top:T.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<O.length;o++){var D=O[o];D.element.scrollLeft=D.left,D.element.scrollTop=D.top}}ai=!!fu,du=fu=null}finally{ue=s,C.p=l,E.T=a}}e.current=t,He=2}}function Wf(){if(He===2){He=0;var e=xa,t=Dl,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=E.T,E.T=null;var l=C.p;C.p=2;var s=ue;ue|=4;try{Uf(e,t.alternate,t)}finally{ue=s,C.p=l,E.T=a}}He=3}}function Ff(){if(He===4||He===3){He=0,Am();var e=xa,t=Dl,a=Ol,l=Cf;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?He=5:(He=0,Dl=xa=null,ed(e,e.pendingLanes));var s=e.pendingLanes;if(s===0&&(ya=null),xi(a),t=t.stateNode,tt&&typeof tt.onCommitFiberRoot=="function")try{tt.onCommitFiberRoot(Ll,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=E.T,s=C.p,C.p=2,E.T=null;try{for(var n=e.onRecoverableError,u=0;u<l.length;u++){var o=l[u];n(o.value,{componentStack:o.stack})}}finally{E.T=t,C.p=s}}(Ol&3)!==0&&Yn(),qt(e),s=e.pendingLanes,(a&4194090)!==0&&(s&42)!==0?e===Pr?Rs++:(Rs=0,Pr=e):Rs=0,ws(0)}}function ed(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,rs(t)))}function Yn(e){return Pf(),Wf(),Ff(),td()}function td(){if(He!==5)return!1;var e=xa,t=Kr;Kr=0;var a=xi(Ol),l=E.T,s=C.p;try{C.p=32>a?32:a,E.T=null,a=Jr,Jr=null;var n=xa,u=Ol;if(He=0,Dl=xa=null,Ol=0,(ue&6)!==0)throw Error(d(331));var o=ue;if(ue|=4,zf(n.current),$f(n,n.current,u,a),ue=o,ws(0,!1),tt&&typeof tt.onPostCommitFiberRoot=="function")try{tt.onPostCommitFiberRoot(Ll,n)}catch{}return!0}finally{C.p=s,E.T=l,ed(e,t)}}function ad(e,t,a){t=gt(a,t),t=Ur(e.stateNode,t,2),e=ua(e,t,2),e!==null&&(Ql(e,2),qt(e))}function ge(e,t,a){if(e.tag===3)ad(e,e,a);else for(;t!==null;){if(t.tag===3){ad(t,e,a);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(ya===null||!ya.has(l))){e=gt(a,e),a=nf(2),l=ua(t,a,2),l!==null&&(rf(a,l,t,e),Ql(l,2),qt(l));break}}t=t.return}}function tu(e,t,a){var l=e.pingCache;if(l===null){l=e.pingCache=new Kh;var s=new Set;l.set(t,s)}else s=l.get(t),s===void 0&&(s=new Set,l.set(t,s));s.has(a)||(Qr=!0,s.add(a),e=eg.bind(null,e,t,a),t.then(e,e))}function eg(e,t,a){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,ye===e&&(le&a)===a&&(Se===4||Se===3&&(le&62914560)===le&&300>wt()-kr?(ue&2)===0&&ql(e,0):Zr|=a,El===le&&(El=0)),qt(e)}function ld(e,t){t===0&&(t=Pu()),e=gl(e,t),e!==null&&(Ql(e,t),qt(e))}function tg(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),ld(e,a)}function ag(e,t){var a=0;switch(e.tag){case 13:var l=e.stateNode,s=e.memoizedState;s!==null&&(a=s.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(d(314))}l!==null&&l.delete(t),ld(e,a)}function lg(e,t){return _e(e,t)}var Qn=null,$l=null,au=!1,Zn=!1,lu=!1,Za=0;function qt(e){e!==$l&&e.next===null&&($l===null?Qn=$l=e:$l=$l.next=e),Zn=!0,au||(au=!0,ng())}function ws(e,t){if(!lu&&Zn){lu=!0;do for(var a=!1,l=Qn;l!==null;){if(e!==0){var s=l.pendingLanes;if(s===0)var n=0;else{var u=l.suspendedLanes,o=l.pingedLanes;n=(1<<31-at(42|e)+1)-1,n&=s&~(u&~o),n=n&201326741?n&201326741|1:n?n|2:0}n!==0&&(a=!0,rd(l,n))}else n=le,n=Ps(l,l===ye?n:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(n&3)===0||Yl(l,n)||(a=!0,rd(l,n));l=l.next}while(a);lu=!1}}function sg(){sd()}function sd(){Zn=au=!1;var e=0;Za!==0&&(mg()&&(e=Za),Za=0);for(var t=wt(),a=null,l=Qn;l!==null;){var s=l.next,n=nd(l,t);n===0?(l.next=null,a===null?Qn=s:a.next=s,s===null&&($l=a)):(a=l,(e!==0||(n&3)!==0)&&(Zn=!0)),l=s}ws(e)}function nd(e,t){for(var a=e.suspendedLanes,l=e.pingedLanes,s=e.expirationTimes,n=e.pendingLanes&-62914561;0<n;){var u=31-at(n),o=1<<u,m=s[u];m===-1?((o&a)===0||(o&l)!==0)&&(s[u]=Em(o,t)):m<=t&&(e.expiredLanes|=o),n&=~o}if(t=ye,a=le,a=Ps(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,a===0||e===t&&(ce===2||ce===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&el(l),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Yl(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(l!==null&&el(l),xi(a)){case 2:case 8:a=ku;break;case 32:a=ks;break;case 268435456:a=Ku;break;default:a=ks}return l=id.bind(null,e),a=_e(a,l),e.callbackPriority=t,e.callbackNode=a,t}return l!==null&&l!==null&&el(l),e.callbackPriority=2,e.callbackNode=null,2}function id(e,t){if(He!==0&&He!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Yn()&&e.callbackNode!==a)return null;var l=le;return l=Ps(e,e===ye?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(Hf(e,l,t),nd(e,wt()),e.callbackNode!=null&&e.callbackNode===a?id.bind(null,e):null)}function rd(e,t){if(Yn())return null;Hf(e,t,!0)}function ng(){gg(function(){(ue&6)!==0?_e(Vu,sg):sd()})}function su(){return Za===0&&(Za=Ju()),Za}function ud(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:an(""+e)}function cd(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function ig(e,t,a,l,s){if(t==="submit"&&a&&a.stateNode===s){var n=ud((s[ke]||null).action),u=l.submitter;u&&(t=(t=u[ke]||null)?ud(t.formAction):u.getAttribute("formAction"),t!==null&&(n=t,u=null));var o=new rn("action","action",null,l,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Za!==0){var m=u?cd(s,u):new FormData(s);_r(a,{pending:!0,data:m,method:s.method,action:n},null,m)}}else typeof n=="function"&&(o.preventDefault(),m=u?cd(s,u):new FormData(s),_r(a,{pending:!0,data:m,method:s.method,action:n},n,m))},currentTarget:s}]})}}for(var nu=0;nu<Li.length;nu++){var iu=Li[nu],rg=iu.toLowerCase(),ug=iu[0].toUpperCase()+iu.slice(1);St(rg,"on"+ug)}St(Cc,"onAnimationEnd"),St(Xc,"onAnimationIteration"),St(Hc,"onAnimationStart"),St("dblclick","onDoubleClick"),St("focusin","onFocus"),St("focusout","onBlur"),St(Nh,"onTransitionRun"),St(Th,"onTransitionStart"),St(Rh,"onTransitionCancel"),St(Lc,"onTransitionEnd"),nl("onMouseEnter",["mouseout","mouseover"]),nl("onMouseLeave",["mouseout","mouseover"]),nl("onPointerEnter",["pointerout","pointerover"]),nl("onPointerLeave",["pointerout","pointerover"]),Ea("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ea("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ea("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ea("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ea("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ea("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Us="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),cg=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Us));function od(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var l=e[a],s=l.event;l=l.listeners;e:{var n=void 0;if(t)for(var u=l.length-1;0<=u;u--){var o=l[u],m=o.instance,v=o.currentTarget;if(o=o.listener,m!==n&&s.isPropagationStopped())break e;n=o,s.currentTarget=v;try{n(s)}catch(U){qn(U)}s.currentTarget=null,n=m}else for(u=0;u<l.length;u++){if(o=l[u],m=o.instance,v=o.currentTarget,o=o.listener,m!==n&&s.isPropagationStopped())break e;n=o,s.currentTarget=v;try{n(s)}catch(U){qn(U)}s.currentTarget=null,n=m}}}}function ae(e,t){var a=t[vi];a===void 0&&(a=t[vi]=new Set);var l=e+"__bubble";a.has(l)||(fd(t,e,2,!1),a.add(l))}function ru(e,t,a){var l=0;t&&(l|=4),fd(a,e,l,t)}var Vn="_reactListening"+Math.random().toString(36).slice(2);function uu(e){if(!e[Vn]){e[Vn]=!0,ac.forEach(function(a){a!=="selectionchange"&&(cg.has(a)||ru(a,!1,e),ru(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Vn]||(t[Vn]=!0,ru("selectionchange",!1,t))}}function fd(e,t,a,l){switch($d(t)){case 2:var s=Ig;break;case 8:s=Gg;break;default:s=Au}a=s.bind(null,t,a,e),s=void 0,!Ei||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),l?s!==void 0?e.addEventListener(t,a,{capture:!0,passive:s}):e.addEventListener(t,a,!0):s!==void 0?e.addEventListener(t,a,{passive:s}):e.addEventListener(t,a,!1)}function cu(e,t,a,l,s){var n=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var u=l.tag;if(u===3||u===4){var o=l.stateNode.containerInfo;if(o===s)break;if(u===4)for(u=l.return;u!==null;){var m=u.tag;if((m===3||m===4)&&u.stateNode.containerInfo===s)return;u=u.return}for(;o!==null;){if(u=al(o),u===null)return;if(m=u.tag,m===5||m===6||m===26||m===27){l=n=u;continue e}o=o.parentNode}}l=l.return}pc(function(){var v=n,U=wi(a),O=[];e:{var A=Yc.get(e);if(A!==void 0){var T=rn,k=e;switch(e){case"keypress":if(sn(a)===0)break e;case"keydown":case"keyup":T=lh;break;case"focusin":k="focus",T=Mi;break;case"focusout":k="blur",T=Mi;break;case"beforeblur":case"afterblur":T=Mi;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":T=vc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":T=Qm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":T=ih;break;case Cc:case Xc:case Hc:T=km;break;case Lc:T=uh;break;case"scroll":case"scrollend":T=Lm;break;case"wheel":T=oh;break;case"copy":case"cut":case"paste":T=Jm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":T=jc;break;case"toggle":case"beforetoggle":T=dh}var Q=(t&4)!==0,he=!Q&&(e==="scroll"||e==="scrollend"),y=Q?A!==null?A+"Capture":null:A;Q=[];for(var g=v,x;g!==null;){var D=g;if(x=D.stateNode,D=D.tag,D!==5&&D!==26&&D!==27||x===null||y===null||(D=kl(g,y),D!=null&&Q.push(Es(g,D,x))),he)break;g=g.return}0<Q.length&&(A=new T(A,k,null,a,U),O.push({event:A,listeners:Q}))}}if((t&7)===0){e:{if(A=e==="mouseover"||e==="pointerover",T=e==="mouseout"||e==="pointerout",A&&a!==Ri&&(k=a.relatedTarget||a.fromElement)&&(al(k)||k[tl]))break e;if((T||A)&&(A=U.window===U?U:(A=U.ownerDocument)?A.defaultView||A.parentWindow:window,T?(k=a.relatedTarget||a.toElement,T=v,k=k?al(k):null,k!==null&&(he=p(k),Q=k.tag,k!==he||Q!==5&&Q!==27&&Q!==6)&&(k=null)):(T=null,k=v),T!==k)){if(Q=vc,D="onMouseLeave",y="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(Q=jc,D="onPointerLeave",y="onPointerEnter",g="pointer"),he=T==null?A:Vl(T),x=k==null?A:Vl(k),A=new Q(D,g+"leave",T,a,U),A.target=he,A.relatedTarget=x,D=null,al(U)===v&&(Q=new Q(y,g+"enter",k,a,U),Q.target=x,Q.relatedTarget=he,D=Q),he=D,T&&k)t:{for(Q=T,y=k,g=0,x=Q;x;x=Il(x))g++;for(x=0,D=y;D;D=Il(D))x++;for(;0<g-x;)Q=Il(Q),g--;for(;0<x-g;)y=Il(y),x--;for(;g--;){if(Q===y||y!==null&&Q===y.alternate)break t;Q=Il(Q),y=Il(y)}Q=null}else Q=null;T!==null&&dd(O,A,T,Q,!1),k!==null&&he!==null&&dd(O,he,k,Q,!0)}}e:{if(A=v?Vl(v):window,T=A.nodeName&&A.nodeName.toLowerCase(),T==="select"||T==="input"&&A.type==="file")var H=Uc;else if(Rc(A))if(Ec)H=Ah;else{H=bh;var ee=vh}else T=A.nodeName,!T||T.toLowerCase()!=="input"||A.type!=="checkbox"&&A.type!=="radio"?v&&Ti(v.elementType)&&(H=Uc):H=jh;if(H&&(H=H(e,v))){wc(O,H,a,U);break e}ee&&ee(e,A,v),e==="focusout"&&v&&A.type==="number"&&v.memoizedProps.value!=null&&Ni(A,"number",A.value)}switch(ee=v?Vl(v):window,e){case"focusin":(Rc(ee)||ee.contentEditable==="true")&&(dl=ee,Ci=v,as=null);break;case"focusout":as=Ci=dl=null;break;case"mousedown":Xi=!0;break;case"contextmenu":case"mouseup":case"dragend":Xi=!1,zc(O,a,U);break;case"selectionchange":if(_h)break;case"keydown":case"keyup":zc(O,a,U)}var Y;if(Ii)e:{switch(e){case"compositionstart":var Z="onCompositionStart";break e;case"compositionend":Z="onCompositionEnd";break e;case"compositionupdate":Z="onCompositionUpdate";break e}Z=void 0}else fl?Nc(e,a)&&(Z="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Z="onCompositionStart");Z&&(Ac&&a.locale!=="ko"&&(fl||Z!=="onCompositionStart"?Z==="onCompositionEnd"&&fl&&(Y=yc()):(sa=U,Di="value"in sa?sa.value:sa.textContent,fl=!0)),ee=kn(v,Z),0<ee.length&&(Z=new bc(Z,e,null,a,U),O.push({event:Z,listeners:ee}),Y?Z.data=Y:(Y=Tc(a),Y!==null&&(Z.data=Y)))),(Y=hh?gh(e,a):ph(e,a))&&(Z=kn(v,"onBeforeInput"),0<Z.length&&(ee=new bc("onBeforeInput","beforeinput",null,a,U),O.push({event:ee,listeners:Z}),ee.data=Y)),ig(O,e,v,a,U)}od(O,t)})}function Es(e,t,a){return{instance:e,listener:t,currentTarget:a}}function kn(e,t){for(var a=t+"Capture",l=[];e!==null;){var s=e,n=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||n===null||(s=kl(e,a),s!=null&&l.unshift(Es(e,s,n)),s=kl(e,t),s!=null&&l.push(Es(e,s,n))),e.tag===3)return l;e=e.return}return[]}function Il(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function dd(e,t,a,l,s){for(var n=t._reactName,u=[];a!==null&&a!==l;){var o=a,m=o.alternate,v=o.stateNode;if(o=o.tag,m!==null&&m===l)break;o!==5&&o!==26&&o!==27||v===null||(m=v,s?(v=kl(a,n),v!=null&&u.unshift(Es(a,v,m))):s||(v=kl(a,n),v!=null&&u.push(Es(a,v,m)))),a=a.return}u.length!==0&&e.push({event:t,listeners:u})}var og=/\r\n?/g,fg=/\u0000|\uFFFD/g;function md(e){return(typeof e=="string"?e:""+e).replace(og,`
`).replace(fg,"")}function hd(e,t){return t=md(t),md(e)===t}function Kn(){}function me(e,t,a,l,s,n){switch(a){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||ul(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&ul(e,""+l);break;case"className":Fs(e,"class",l);break;case"tabIndex":Fs(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Fs(e,a,l);break;case"style":hc(e,l,n);break;case"data":if(t!=="object"){Fs(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=an(""+l),e.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof n=="function"&&(a==="formAction"?(t!=="input"&&me(e,t,"name",s.name,s,null),me(e,t,"formEncType",s.formEncType,s,null),me(e,t,"formMethod",s.formMethod,s,null),me(e,t,"formTarget",s.formTarget,s,null)):(me(e,t,"encType",s.encType,s,null),me(e,t,"method",s.method,s,null),me(e,t,"target",s.target,s,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=an(""+l),e.setAttribute(a,l);break;case"onClick":l!=null&&(e.onclick=Kn);break;case"onScroll":l!=null&&ae("scroll",e);break;case"onScrollEnd":l!=null&&ae("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(d(61));if(a=l.__html,a!=null){if(s.children!=null)throw Error(d(60));e.innerHTML=a}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}a=an(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""+l):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":l===!0?e.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,l):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(a,l):e.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(a):e.setAttribute(a,l);break;case"popover":ae("beforetoggle",e),ae("toggle",e),Ws(e,"popover",l);break;case"xlinkActuate":It(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":It(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":It(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":It(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":It(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":It(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":It(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":It(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":It(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Ws(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Xm.get(a)||a,Ws(e,a,l))}}function ou(e,t,a,l,s,n){switch(a){case"style":hc(e,l,n);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(d(61));if(a=l.__html,a!=null){if(s.children!=null)throw Error(d(60));e.innerHTML=a}}break;case"children":typeof l=="string"?ul(e,l):(typeof l=="number"||typeof l=="bigint")&&ul(e,""+l);break;case"onScroll":l!=null&&ae("scroll",e);break;case"onScrollEnd":l!=null&&ae("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Kn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!lc.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(s=a.endsWith("Capture"),t=a.slice(2,s?a.length-7:void 0),n=e[ke]||null,n=n!=null?n[a]:null,typeof n=="function"&&e.removeEventListener(t,n,s),typeof l=="function")){typeof n!="function"&&n!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,l,s);break e}a in e?e[a]=l:l===!0?e.setAttribute(a,""):Ws(e,a,l)}}}function Le(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ae("error",e),ae("load",e);var l=!1,s=!1,n;for(n in a)if(a.hasOwnProperty(n)){var u=a[n];if(u!=null)switch(n){case"src":l=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:me(e,t,n,u,a,null)}}s&&me(e,t,"srcSet",a.srcSet,a,null),l&&me(e,t,"src",a.src,a,null);return;case"input":ae("invalid",e);var o=n=u=s=null,m=null,v=null;for(l in a)if(a.hasOwnProperty(l)){var U=a[l];if(U!=null)switch(l){case"name":s=U;break;case"type":u=U;break;case"checked":m=U;break;case"defaultChecked":v=U;break;case"value":n=U;break;case"defaultValue":o=U;break;case"children":case"dangerouslySetInnerHTML":if(U!=null)throw Error(d(137,t));break;default:me(e,t,l,U,a,null)}}oc(e,n,o,m,v,u,s,!1),en(e);return;case"select":ae("invalid",e),l=u=n=null;for(s in a)if(a.hasOwnProperty(s)&&(o=a[s],o!=null))switch(s){case"value":n=o;break;case"defaultValue":u=o;break;case"multiple":l=o;default:me(e,t,s,o,a,null)}t=n,a=u,e.multiple=!!l,t!=null?rl(e,!!l,t,!1):a!=null&&rl(e,!!l,a,!0);return;case"textarea":ae("invalid",e),n=s=l=null;for(u in a)if(a.hasOwnProperty(u)&&(o=a[u],o!=null))switch(u){case"value":l=o;break;case"defaultValue":s=o;break;case"children":n=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(d(91));break;default:me(e,t,u,o,a,null)}dc(e,l,s,n),en(e);return;case"option":for(m in a)if(a.hasOwnProperty(m)&&(l=a[m],l!=null))switch(m){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:me(e,t,m,l,a,null)}return;case"dialog":ae("beforetoggle",e),ae("toggle",e),ae("cancel",e),ae("close",e);break;case"iframe":case"object":ae("load",e);break;case"video":case"audio":for(l=0;l<Us.length;l++)ae(Us[l],e);break;case"image":ae("error",e),ae("load",e);break;case"details":ae("toggle",e);break;case"embed":case"source":case"link":ae("error",e),ae("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(v in a)if(a.hasOwnProperty(v)&&(l=a[v],l!=null))switch(v){case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:me(e,t,v,l,a,null)}return;default:if(Ti(t)){for(U in a)a.hasOwnProperty(U)&&(l=a[U],l!==void 0&&ou(e,t,U,l,a,void 0));return}}for(o in a)a.hasOwnProperty(o)&&(l=a[o],l!=null&&me(e,t,o,l,a,null))}function dg(e,t,a,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,n=null,u=null,o=null,m=null,v=null,U=null;for(T in a){var O=a[T];if(a.hasOwnProperty(T)&&O!=null)switch(T){case"checked":break;case"value":break;case"defaultValue":m=O;default:l.hasOwnProperty(T)||me(e,t,T,null,l,O)}}for(var A in l){var T=l[A];if(O=a[A],l.hasOwnProperty(A)&&(T!=null||O!=null))switch(A){case"type":n=T;break;case"name":s=T;break;case"checked":v=T;break;case"defaultChecked":U=T;break;case"value":u=T;break;case"defaultValue":o=T;break;case"children":case"dangerouslySetInnerHTML":if(T!=null)throw Error(d(137,t));break;default:T!==O&&me(e,t,A,T,l,O)}}_i(e,u,o,m,v,U,n,s);return;case"select":T=u=o=A=null;for(n in a)if(m=a[n],a.hasOwnProperty(n)&&m!=null)switch(n){case"value":break;case"multiple":T=m;default:l.hasOwnProperty(n)||me(e,t,n,null,l,m)}for(s in l)if(n=l[s],m=a[s],l.hasOwnProperty(s)&&(n!=null||m!=null))switch(s){case"value":A=n;break;case"defaultValue":o=n;break;case"multiple":u=n;default:n!==m&&me(e,t,s,n,l,m)}t=o,a=u,l=T,A!=null?rl(e,!!a,A,!1):!!l!=!!a&&(t!=null?rl(e,!!a,t,!0):rl(e,!!a,a?[]:"",!1));return;case"textarea":T=A=null;for(o in a)if(s=a[o],a.hasOwnProperty(o)&&s!=null&&!l.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:me(e,t,o,null,l,s)}for(u in l)if(s=l[u],n=a[u],l.hasOwnProperty(u)&&(s!=null||n!=null))switch(u){case"value":A=s;break;case"defaultValue":T=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(d(91));break;default:s!==n&&me(e,t,u,s,l,n)}fc(e,A,T);return;case"option":for(var k in a)if(A=a[k],a.hasOwnProperty(k)&&A!=null&&!l.hasOwnProperty(k))switch(k){case"selected":e.selected=!1;break;default:me(e,t,k,null,l,A)}for(m in l)if(A=l[m],T=a[m],l.hasOwnProperty(m)&&A!==T&&(A!=null||T!=null))switch(m){case"selected":e.selected=A&&typeof A!="function"&&typeof A!="symbol";break;default:me(e,t,m,A,l,T)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Q in a)A=a[Q],a.hasOwnProperty(Q)&&A!=null&&!l.hasOwnProperty(Q)&&me(e,t,Q,null,l,A);for(v in l)if(A=l[v],T=a[v],l.hasOwnProperty(v)&&A!==T&&(A!=null||T!=null))switch(v){case"children":case"dangerouslySetInnerHTML":if(A!=null)throw Error(d(137,t));break;default:me(e,t,v,A,l,T)}return;default:if(Ti(t)){for(var he in a)A=a[he],a.hasOwnProperty(he)&&A!==void 0&&!l.hasOwnProperty(he)&&ou(e,t,he,void 0,l,A);for(U in l)A=l[U],T=a[U],!l.hasOwnProperty(U)||A===T||A===void 0&&T===void 0||ou(e,t,U,A,l,T);return}}for(var y in a)A=a[y],a.hasOwnProperty(y)&&A!=null&&!l.hasOwnProperty(y)&&me(e,t,y,null,l,A);for(O in l)A=l[O],T=a[O],!l.hasOwnProperty(O)||A===T||A==null&&T==null||me(e,t,O,A,l,T)}var fu=null,du=null;function Jn(e){return e.nodeType===9?e:e.ownerDocument}function gd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function pd(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function mu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var hu=null;function mg(){var e=window.event;return e&&e.type==="popstate"?e===hu?!1:(hu=e,!0):(hu=null,!1)}var yd=typeof setTimeout=="function"?setTimeout:void 0,hg=typeof clearTimeout=="function"?clearTimeout:void 0,xd=typeof Promise=="function"?Promise:void 0,gg=typeof queueMicrotask=="function"?queueMicrotask:typeof xd<"u"?function(e){return xd.resolve(null).then(e).catch(pg)}:yd;function pg(e){setTimeout(function(){throw e})}function ba(e){return e==="head"}function vd(e,t){var a=t,l=0,s=0;do{var n=a.nextSibling;if(e.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(0<l&&8>l){a=l;var u=e.ownerDocument;if(a&1&&Ds(u.documentElement),a&2&&Ds(u.body),a&4)for(a=u.head,Ds(a),u=a.firstChild;u;){var o=u.nextSibling,m=u.nodeName;u[Zl]||m==="SCRIPT"||m==="STYLE"||m==="LINK"&&u.rel.toLowerCase()==="stylesheet"||a.removeChild(u),u=o}}if(s===0){e.removeChild(n),Bs(t);return}s--}else a==="$"||a==="$?"||a==="$!"?s++:l=a.charCodeAt(0)-48;else l=0;a=n}while(a);Bs(t)}function gu(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":gu(a),bi(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function yg(e,t,a,l){for(;e.nodeType===1;){var s=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Zl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(n=e.getAttribute("rel"),n==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(n!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(n=e.getAttribute("src"),(n!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&n&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var n=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===n)return e}else return e;if(e=Nt(e.nextSibling),e===null)break}return null}function xg(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Nt(e.nextSibling),e===null))return null;return e}function pu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function vg(e,t){var a=e.ownerDocument;if(e.data!=="$?"||a.readyState==="complete")t();else{var l=function(){t(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Nt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var yu=null;function bd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}function jd(e,t,a){switch(t=Jn(a),e){case"html":if(e=t.documentElement,!e)throw Error(d(452));return e;case"head":if(e=t.head,!e)throw Error(d(453));return e;case"body":if(e=t.body,!e)throw Error(d(454));return e;default:throw Error(d(451))}}function Ds(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);bi(e)}var jt=new Map,Ad=new Set;function Pn(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Jt=C.d;C.d={f:bg,r:jg,D:Ag,C:Sg,L:_g,m:Ng,X:Rg,S:Tg,M:wg};function bg(){var e=Jt.f(),t=Hn();return e||t}function jg(e){var t=ll(e);t!==null&&t.tag===5&&t.type==="form"?Xo(t):Jt.r(e)}var Gl=typeof document>"u"?null:document;function Sd(e,t,a){var l=Gl;if(l&&typeof t=="string"&&t){var s=ht(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof a=="string"&&(s+='[crossorigin="'+a+'"]'),Ad.has(s)||(Ad.add(s),e={rel:e,crossOrigin:a,href:t},l.querySelector(s)===null&&(t=l.createElement("link"),Le(t,"link",e),Ie(t),l.head.appendChild(t)))}}function Ag(e){Jt.D(e),Sd("dns-prefetch",e,null)}function Sg(e,t){Jt.C(e,t),Sd("preconnect",e,t)}function _g(e,t,a){Jt.L(e,t,a);var l=Gl;if(l&&e&&t){var s='link[rel="preload"][as="'+ht(t)+'"]';t==="image"&&a&&a.imageSrcSet?(s+='[imagesrcset="'+ht(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(s+='[imagesizes="'+ht(a.imageSizes)+'"]')):s+='[href="'+ht(e)+'"]';var n=s;switch(t){case"style":n=zl(e);break;case"script":n=Bl(e)}jt.has(n)||(e=z({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),jt.set(n,e),l.querySelector(s)!==null||t==="style"&&l.querySelector(Os(n))||t==="script"&&l.querySelector(qs(n))||(t=l.createElement("link"),Le(t,"link",e),Ie(t),l.head.appendChild(t)))}}function Ng(e,t){Jt.m(e,t);var a=Gl;if(a&&e){var l=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+ht(l)+'"][href="'+ht(e)+'"]',n=s;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":n=Bl(e)}if(!jt.has(n)&&(e=z({rel:"modulepreload",href:e},t),jt.set(n,e),a.querySelector(s)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(qs(n)))return}l=a.createElement("link"),Le(l,"link",e),Ie(l),a.head.appendChild(l)}}}function Tg(e,t,a){Jt.S(e,t,a);var l=Gl;if(l&&e){var s=sl(l).hoistableStyles,n=zl(e);t=t||"default";var u=s.get(n);if(!u){var o={loading:0,preload:null};if(u=l.querySelector(Os(n)))o.loading=5;else{e=z({rel:"stylesheet",href:e,"data-precedence":t},a),(a=jt.get(n))&&xu(e,a);var m=u=l.createElement("link");Ie(m),Le(m,"link",e),m._p=new Promise(function(v,U){m.onload=v,m.onerror=U}),m.addEventListener("load",function(){o.loading|=1}),m.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Wn(u,t,l)}u={type:"stylesheet",instance:u,count:1,state:o},s.set(n,u)}}}function Rg(e,t){Jt.X(e,t);var a=Gl;if(a&&e){var l=sl(a).hoistableScripts,s=Bl(e),n=l.get(s);n||(n=a.querySelector(qs(s)),n||(e=z({src:e,async:!0},t),(t=jt.get(s))&&vu(e,t),n=a.createElement("script"),Ie(n),Le(n,"link",e),a.head.appendChild(n)),n={type:"script",instance:n,count:1,state:null},l.set(s,n))}}function wg(e,t){Jt.M(e,t);var a=Gl;if(a&&e){var l=sl(a).hoistableScripts,s=Bl(e),n=l.get(s);n||(n=a.querySelector(qs(s)),n||(e=z({src:e,async:!0,type:"module"},t),(t=jt.get(s))&&vu(e,t),n=a.createElement("script"),Ie(n),Le(n,"link",e),a.head.appendChild(n)),n={type:"script",instance:n,count:1,state:null},l.set(s,n))}}function _d(e,t,a,l){var s=(s=Tt.current)?Pn(s):null;if(!s)throw Error(d(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=zl(a.href),a=sl(s).hoistableStyles,l=a.get(t),l||(l={type:"style",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=zl(a.href);var n=sl(s).hoistableStyles,u=n.get(e);if(u||(s=s.ownerDocument||s,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},n.set(e,u),(n=s.querySelector(Os(e)))&&!n._p&&(u.instance=n,u.state.loading=5),jt.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},jt.set(e,a),n||Ug(s,e,a,u.state))),t&&l===null)throw Error(d(528,""));return u}if(t&&l!==null)throw Error(d(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Bl(a),a=sl(s).hoistableScripts,l=a.get(t),l||(l={type:"script",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(d(444,e))}}function zl(e){return'href="'+ht(e)+'"'}function Os(e){return'link[rel="stylesheet"]['+e+"]"}function Nd(e){return z({},e,{"data-precedence":e.precedence,precedence:null})}function Ug(e,t,a,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),Le(t,"link",a),Ie(t),e.head.appendChild(t))}function Bl(e){return'[src="'+ht(e)+'"]'}function qs(e){return"script[async]"+e}function Td(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+ht(a.href)+'"]');if(l)return t.instance=l,Ie(l),l;var s=z({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),Ie(l),Le(l,"style",s),Wn(l,a.precedence,e),t.instance=l;case"stylesheet":s=zl(a.href);var n=e.querySelector(Os(s));if(n)return t.state.loading|=4,t.instance=n,Ie(n),n;l=Nd(a),(s=jt.get(s))&&xu(l,s),n=(e.ownerDocument||e).createElement("link"),Ie(n);var u=n;return u._p=new Promise(function(o,m){u.onload=o,u.onerror=m}),Le(n,"link",l),t.state.loading|=4,Wn(n,a.precedence,e),t.instance=n;case"script":return n=Bl(a.src),(s=e.querySelector(qs(n)))?(t.instance=s,Ie(s),s):(l=a,(s=jt.get(n))&&(l=z({},a),vu(l,s)),e=e.ownerDocument||e,s=e.createElement("script"),Ie(s),Le(s,"link",l),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(d(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(l=t.instance,t.state.loading|=4,Wn(l,a.precedence,e));return t.instance}function Wn(e,t,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=l.length?l[l.length-1]:null,n=s,u=0;u<l.length;u++){var o=l[u];if(o.dataset.precedence===t)n=o;else if(n!==s)break}n?n.parentNode.insertBefore(e,n.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function xu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function vu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Fn=null;function Rd(e,t,a){if(Fn===null){var l=new Map,s=Fn=new Map;s.set(a,l)}else s=Fn,l=s.get(a),l||(l=new Map,s.set(a,l));if(l.has(e))return l;for(l.set(e,null),a=a.getElementsByTagName(e),s=0;s<a.length;s++){var n=a[s];if(!(n[Zl]||n[Ye]||e==="link"&&n.getAttribute("rel")==="stylesheet")&&n.namespaceURI!=="http://www.w3.org/2000/svg"){var u=n.getAttribute(t)||"";u=e+u;var o=l.get(u);o?o.push(n):l.set(u,[n])}}return l}function wd(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function Eg(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Ud(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var Ms=null;function Dg(){}function Og(e,t,a){if(Ms===null)throw Error(d(475));var l=Ms;if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var s=zl(a.href),n=e.querySelector(Os(s));if(n){e=n._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(l.count++,l=ei.bind(l),e.then(l,l)),t.state.loading|=4,t.instance=n,Ie(n);return}n=e.ownerDocument||e,a=Nd(a),(s=jt.get(s))&&xu(a,s),n=n.createElement("link"),Ie(n);var u=n;u._p=new Promise(function(o,m){u.onload=o,u.onerror=m}),Le(n,"link",a),t.instance=n}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(l.count++,t=ei.bind(l),e.addEventListener("load",t),e.addEventListener("error",t))}}function qg(){if(Ms===null)throw Error(d(475));var e=Ms;return e.stylesheets&&e.count===0&&bu(e,e.stylesheets),0<e.count?function(t){var a=setTimeout(function(){if(e.stylesheets&&bu(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a)}}:null}function ei(){if(this.count--,this.count===0){if(this.stylesheets)bu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var ti=null;function bu(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ti=new Map,t.forEach(Mg,e),ti=null,ei.call(e))}function Mg(e,t){if(!(t.state.loading&4)){var a=ti.get(e);if(a)var l=a.get(null);else{a=new Map,ti.set(e,a);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),n=0;n<s.length;n++){var u=s[n];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(a.set(u.dataset.precedence,u),l=u)}l&&a.set(null,l)}s=t.instance,u=s.getAttribute("data-precedence"),n=a.get(u)||l,n===l&&a.set(null,s),a.set(u,s),this.count++,l=ei.bind(this),s.addEventListener("load",l),s.addEventListener("error",l),n?n.parentNode.insertBefore(s,n.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var $s={$$typeof:P,Provider:null,Consumer:null,_currentValue:V,_currentValue2:V,_threadCount:0};function $g(e,t,a,l,s,n,u,o){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=pi(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pi(0),this.hiddenUpdates=pi(null),this.identifierPrefix=l,this.onUncaughtError=s,this.onCaughtError=n,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function Ed(e,t,a,l,s,n,u,o,m,v,U,O){return e=new $g(e,t,a,u,o,m,v,O),t=1,n===!0&&(t|=24),n=st(3,null,null,t),e.current=n,n.stateNode=e,t=tr(),t.refCount++,e.pooledCache=t,t.refCount++,n.memoizedState={element:l,isDehydrated:a,cache:t},nr(n),e}function Dd(e){return e?(e=pl,e):pl}function Od(e,t,a,l,s,n){s=Dd(s),l.context===null?l.context=s:l.pendingContext=s,l=ra(t),l.payload={element:a},n=n===void 0?null:n,n!==null&&(l.callback=n),a=ua(e,l,t),a!==null&&(ct(a,e,t),fs(a,e,t))}function qd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function ju(e,t){qd(e,t),(e=e.alternate)&&qd(e,t)}function Md(e){if(e.tag===13){var t=gl(e,67108864);t!==null&&ct(t,e,67108864),ju(e,67108864)}}var ai=!0;function Ig(e,t,a,l){var s=E.T;E.T=null;var n=C.p;try{C.p=2,Au(e,t,a,l)}finally{C.p=n,E.T=s}}function Gg(e,t,a,l){var s=E.T;E.T=null;var n=C.p;try{C.p=8,Au(e,t,a,l)}finally{C.p=n,E.T=s}}function Au(e,t,a,l){if(ai){var s=Su(l);if(s===null)cu(e,t,l,li,a),Id(e,l);else if(Bg(s,e,t,a,l))l.stopPropagation();else if(Id(e,l),t&4&&-1<zg.indexOf(e)){for(;s!==null;){var n=ll(s);if(n!==null)switch(n.tag){case 3:if(n=n.stateNode,n.current.memoizedState.isDehydrated){var u=Ua(n.pendingLanes);if(u!==0){var o=n;for(o.pendingLanes|=2,o.entangledLanes|=2;u;){var m=1<<31-at(u);o.entanglements[1]|=m,u&=~m}qt(n),(ue&6)===0&&(Cn=wt()+500,ws(0))}}break;case 13:o=gl(n,2),o!==null&&ct(o,n,2),Hn(),ju(n,2)}if(n=Su(l),n===null&&cu(e,t,l,li,a),n===s)break;s=n}s!==null&&l.stopPropagation()}else cu(e,t,l,null,a)}}function Su(e){return e=wi(e),_u(e)}var li=null;function _u(e){if(li=null,e=al(e),e!==null){var t=p(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=j(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return li=e,null}function $d(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Sm()){case Vu:return 2;case ku:return 8;case ks:case _m:return 32;case Ku:return 268435456;default:return 32}default:return 32}}var Nu=!1,ja=null,Aa=null,Sa=null,Is=new Map,Gs=new Map,_a=[],zg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Id(e,t){switch(e){case"focusin":case"focusout":ja=null;break;case"dragenter":case"dragleave":Aa=null;break;case"mouseover":case"mouseout":Sa=null;break;case"pointerover":case"pointerout":Is.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Gs.delete(t.pointerId)}}function zs(e,t,a,l,s,n){return e===null||e.nativeEvent!==n?(e={blockedOn:t,domEventName:a,eventSystemFlags:l,nativeEvent:n,targetContainers:[s]},t!==null&&(t=ll(t),t!==null&&Md(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Bg(e,t,a,l,s){switch(t){case"focusin":return ja=zs(ja,e,t,a,l,s),!0;case"dragenter":return Aa=zs(Aa,e,t,a,l,s),!0;case"mouseover":return Sa=zs(Sa,e,t,a,l,s),!0;case"pointerover":var n=s.pointerId;return Is.set(n,zs(Is.get(n)||null,e,t,a,l,s)),!0;case"gotpointercapture":return n=s.pointerId,Gs.set(n,zs(Gs.get(n)||null,e,t,a,l,s)),!0}return!1}function Gd(e){var t=al(e.target);if(t!==null){var a=p(t);if(a!==null){if(t=a.tag,t===13){if(t=j(a),t!==null){e.blockedOn=t,Om(e.priority,function(){if(a.tag===13){var l=ut();l=yi(l);var s=gl(a,l);s!==null&&ct(s,a,l),ju(a,l)}});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function si(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=Su(e.nativeEvent);if(a===null){a=e.nativeEvent;var l=new a.constructor(a.type,a);Ri=l,a.target.dispatchEvent(l),Ri=null}else return t=ll(a),t!==null&&Md(t),e.blockedOn=a,!1;t.shift()}return!0}function zd(e,t,a){si(e)&&a.delete(t)}function Cg(){Nu=!1,ja!==null&&si(ja)&&(ja=null),Aa!==null&&si(Aa)&&(Aa=null),Sa!==null&&si(Sa)&&(Sa=null),Is.forEach(zd),Gs.forEach(zd)}function ni(e,t){e.blockedOn===t&&(e.blockedOn=null,Nu||(Nu=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Cg)))}var ii=null;function Bd(e){ii!==e&&(ii=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){ii===e&&(ii=null);for(var t=0;t<e.length;t+=3){var a=e[t],l=e[t+1],s=e[t+2];if(typeof l!="function"){if(_u(l||a)===null)continue;break}var n=ll(a);n!==null&&(e.splice(t,3),t-=3,_r(n,{pending:!0,data:s,method:a.method,action:l},l,s))}}))}function Bs(e){function t(m){return ni(m,e)}ja!==null&&ni(ja,e),Aa!==null&&ni(Aa,e),Sa!==null&&ni(Sa,e),Is.forEach(t),Gs.forEach(t);for(var a=0;a<_a.length;a++){var l=_a[a];l.blockedOn===e&&(l.blockedOn=null)}for(;0<_a.length&&(a=_a[0],a.blockedOn===null);)Gd(a),a.blockedOn===null&&_a.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var s=a[l],n=a[l+1],u=s[ke]||null;if(typeof n=="function")u||Bd(a);else if(u){var o=null;if(n&&n.hasAttribute("formAction")){if(s=n,u=n[ke]||null)o=u.formAction;else if(_u(s)!==null)continue}else o=u.action;typeof o=="function"?a[l+1]=o:(a.splice(l,3),l-=3),Bd(a)}}}function Tu(e){this._internalRoot=e}ri.prototype.render=Tu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(d(409));var a=t.current,l=ut();Od(a,l,e,t,null,null)},ri.prototype.unmount=Tu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Od(e.current,2,null,e,null,null),Hn(),t[tl]=null}};function ri(e){this._internalRoot=e}ri.prototype.unstable_scheduleHydration=function(e){if(e){var t=ec();e={blockedOn:null,target:e,priority:t};for(var a=0;a<_a.length&&t!==0&&t<_a[a].priority;a++);_a.splice(a,0,e),a===0&&Gd(e)}};var Cd=c.version;if(Cd!=="19.1.0")throw Error(d(527,Cd,"19.1.0"));C.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(d(188)):(e=Object.keys(e).join(","),Error(d(268,e)));return e=I(t),e=e!==null?G(e):null,e=e===null?null:e.stateNode,e};var Xg={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:E,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ui=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ui.isDisabled&&ui.supportsFiber)try{Ll=ui.inject(Xg),tt=ui}catch{}}return Cs.createRoot=function(e,t){if(!h(e))throw Error(d(299));var a=!1,l="",s=tf,n=af,u=lf,o=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(n=t.onCaughtError),t.onRecoverableError!==void 0&&(u=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(o=t.unstable_transitionCallbacks)),t=Ed(e,1,!1,null,null,a,l,s,n,u,o,null),e[tl]=t.current,uu(e),new Tu(t)},Cs.hydrateRoot=function(e,t,a){if(!h(e))throw Error(d(299));var l=!1,s="",n=tf,u=af,o=lf,m=null,v=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(s=a.identifierPrefix),a.onUncaughtError!==void 0&&(n=a.onUncaughtError),a.onCaughtError!==void 0&&(u=a.onCaughtError),a.onRecoverableError!==void 0&&(o=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(m=a.unstable_transitionCallbacks),a.formState!==void 0&&(v=a.formState)),t=Ed(e,1,!0,t,a??null,l,s,n,u,o,m,v),t.context=Dd(null),a=t.current,l=ut(),l=yi(l),s=ra(l),s.callback=null,ua(a,s,l),a=l,t.current.lanes=a,Ql(t,a),qt(t),e[tl]=t.current,uu(e),new ri(t)},Cs.version="19.1.0",Cs}var Zd;function j0(){if(Zd)return Ru.exports;Zd=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(c){console.error(c)}}return r(),Ru.exports=b0(),Ru.exports}var A0=j0();class Hs extends Error{}Hs.prototype.name="InvalidTokenError";function S0(r){return decodeURIComponent(atob(r).replace(/(.)/g,(c,f)=>{let d=f.charCodeAt(0).toString(16).toUpperCase();return d.length<2&&(d="0"+d),"%"+d}))}function _0(r){let c=r.replace(/-/g,"+").replace(/_/g,"/");switch(c.length%4){case 0:break;case 2:c+="==";break;case 3:c+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return S0(c)}catch{return atob(c)}}function em(r,c){if(typeof r!="string")throw new Hs("Invalid token specified: must be a string");c||(c={});const f=c.header===!0?0:1,d=r.split(".")[f];if(typeof d!="string")throw new Hs(`Invalid token specified: missing part #${f+1}`);let h;try{h=_0(d)}catch(p){throw new Hs(`Invalid token specified: invalid base64 for part #${f+1} (${p.message})`)}try{return JSON.parse(h)}catch(p){throw new Hs(`Invalid token specified: invalid json for part #${f+1} (${p.message})`)}}const tm="https://learn.reboot01.com/api",N0=`${tm}/auth/signin`,T0=`${tm}/graphql-engine/v1/graphql`,Iu="reboot01_jwt_token",Gu="reboot01_user_data",R0=(r,c)=>{const f=`${r}:${c}`;return btoa(f)},w0=async(r,c)=>{try{const f=R0(r,c),d=await fetch(N0,{method:"POST",headers:{Authorization:`Basic ${f}`,"Content-Type":"application/json"}});if(!d.ok)throw d.status===401?new Error("Invalid credentials. Please check your username/email and password."):d.status===403?new Error("Access forbidden. Please contact support."):d.status>=500?new Error("Server error. Please try again later."):new Error(`Authentication failed: ${d.statusText}`);const h=await d.text();if(!h||h.trim()==="")throw new Error("No token received from server");const p=h.trim().replace(/^["']|["']$/g,"");if(!p.includes(".")||p.split(".").length!==3)throw console.error("Invalid token format. Token:",p.substring(0,50)+"..."),new Error("Invalid token format received from server");if(!Bu(p))throw console.error("Token failed format validation"),new Error("Token format validation failed");const j=em(p),S={id:j.sub,username:j.username||r,email:j.email,exp:j.exp,iat:j.iat};return{token:p,user:S}}catch(f){throw f.name==="InvalidTokenError"?new Error("Invalid token received from server"):f}},U0=(r,c)=>{localStorage.setItem(Iu,r),localStorage.setItem(Gu,JSON.stringify(c))},zu=()=>localStorage.getItem(Iu),E0=()=>{const r=localStorage.getItem(Gu);return r?JSON.parse(r):null},Bu=r=>{if(!r||typeof r!="string")return!1;const c=r.split(".");if(c.length!==3)return!1;try{return c.forEach(f=>{if(!f)throw new Error("Empty part");if(!/^[A-Za-z0-9_-]+$/.test(f))throw new Error("Invalid characters")}),!0}catch{return!1}},am=r=>{try{if(!Bu(r))return!0;const c=em(r),f=Date.now()/1e3;return c.exp<f}catch(c){return console.warn("Token validation error:",c.message),!0}},D0=()=>{const r=zu();return r?!am(r):!1},Va=()=>{localStorage.removeItem(Iu),localStorage.removeItem(Gu)},O0=()=>{const r=zu();return!r||!Bu(r)||am(r)?(r&&(console.warn("Clearing invalid or expired token"),Va()),{}):{Authorization:`Bearer ${r}`}},q0=r=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r),M0=r=>q0(r)?"email":"username",Fe={LOGIN_START:"LOGIN_START",LOGIN_SUCCESS:"LOGIN_SUCCESS",LOGIN_FAILURE:"LOGIN_FAILURE",LOGOUT:"LOGOUT",RESTORE_SESSION:"RESTORE_SESSION",CLEAR_ERROR:"CLEAR_ERROR"},$0={user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!1},I0=(r,c)=>{switch(c.type){case Fe.LOGIN_START:return{...r,isLoading:!0,error:null};case Fe.LOGIN_SUCCESS:return{...r,user:c.payload.user,token:c.payload.token,isAuthenticated:!0,isLoading:!1,error:null,isInitialized:!0};case Fe.LOGIN_FAILURE:return{...r,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:c.payload.error,isInitialized:!0};case Fe.LOGOUT:return{...r,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!0};case Fe.RESTORE_SESSION:return{...r,user:c.payload.user,token:c.payload.token,isAuthenticated:c.payload.isAuthenticated,isInitialized:!0};case Fe.CLEAR_ERROR:return{...r,error:null};default:return r}},lm=J.createContext(null),G0=({children:r})=>{const[c,f]=J.useReducer(I0,$0);J.useEffect(()=>{(()=>{try{const I=zu(),G=E0();I&&G&&D0()?f({type:Fe.RESTORE_SESSION,payload:{user:G,token:I,isAuthenticated:!0}}):(Va(),f({type:Fe.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}}))}catch(I){console.warn("Session restoration error:",I.message),Va(),f({type:Fe.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}})}})()},[]);const d=async(S,I)=>{f({type:Fe.LOGIN_START});try{const{token:G,user:z}=await w0(S,I);return U0(G,z),f({type:Fe.LOGIN_SUCCESS,payload:{user:z,token:G}}),{success:!0}}catch(G){return f({type:Fe.LOGIN_FAILURE,payload:{error:G.message}}),{success:!1,error:G.message}}},h=()=>{Va(),f({type:Fe.LOGOUT})},p=()=>{f({type:Fe.CLEAR_ERROR})},j={user:c.user,token:c.token,isAuthenticated:c.isAuthenticated,isLoading:c.isLoading,error:c.error,isInitialized:c.isInitialized,login:d,logout:h,clearError:p};return i.jsx(lm.Provider,{value:j,children:r})},Xl=()=>{const r=J.useContext(lm);if(!r)throw new Error("useAuth must be used within an AuthProvider");return r};$`
  fragment ErrorInfo on Error {
    message
    code
    path
  }
`;$`
  fragment PaginationInfo on Query {
    totalCount: aggregate {
      count
    }
  }
`;const oe=$`
  fragment UserInfo on user {
    id
    login
    attrs
    profile
    campus
    createdAt
    updatedAt
    # Personal information
    firstName
    lastName
    email
    avatarUrl
    # Social/External accounts
    discordId
    discordLogin
    githubId
    # Audit and performance metrics
    auditRatio
    totalUp
    totalDown
    totalUpBonus
    auditsAssigned
  }
`,Wt=$`
  fragment UserBasicInfo on user {
    id
    login
    firstName
    lastName
    campus
    avatarUrl
  }
`;$`
  fragment UserPublicInfo on user {
    id
    login
    firstName
    lastName
    campus
    avatarUrl
    auditRatio
    totalUp
    totalDown
    # Public view data
    public {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;const ve=$`
  fragment ObjectInfo on object {
    id
    name
    type
    attrs
    childrenAttrs
    campus
    createdAt
    updatedAt
    externalRelationUrl
    referenceId
    referencedAt
  }
`,$t=$`
  fragment TransactionInfo on transaction {
    id
    type
    amount
    userId
    attrs
    createdAt
    path
    objectId
    eventId
    campus
  }
`,ka=$`
  fragment ResultInfo on result {
    id
    grade
    attrs
    type
    userId
    groupId
    objectId
    path
    version
    eventId
    isLast
    campus
    createdAt
    updatedAt
  }
`,mi=$`
  fragment ProgressInfo on progress {
    id
    userId
    groupId
    eventId
    version
    grade
    isDone
    path
    campus
    objectId
    createdAt
    updatedAt
  }
`,Zs=$`
  fragment AuditInfo on audit {
    id
    groupId
    auditorId
    attrs
    grade
    createdAt
    updatedAt
    resultId
    endAt
  }
`,Cu=$`
  fragment AuditAggregateInfo on audit_aggregate {
    aggregate {
      count
      avg {
        grade
      }
      max {
        grade
      }
      min {
        grade
      }
      sum {
        grade
      }
    }
  }
`,hi=$`
  fragment TransactionAggregateInfo on transaction_aggregate {
    aggregate {
      count
      avg {
        amount
      }
      max {
        amount
      }
      min {
        amount
      }
      sum {
        amount
      }
    }
  }
`,z0=$`
  fragment ProgressAggregateInfo on progress_aggregate {
    aggregate {
      count
      avg {
        grade
      }
      max {
        grade
      }
      min {
        grade
      }
    }
  }
`,Xu=$`
  fragment ResultAggregateInfo on result_aggregate {
    aggregate {
      count
      avg {
        grade
      }
      max {
        grade
      }
      min {
        grade
      }
      sum {
        grade
      }
    }
  }
`,B0=$`
  fragment ObjectAggregateInfo on object_aggregate {
    aggregate {
      count
    }
  }
`,gi=$`
  fragment EventInfo on event {
    id
    path
    campus
    createdAt
    endAt
  }
`,sm=$`
  fragment EventUserInfo on event_user {
    id
    userId
    createdAt
  }
`,nm=$`
  fragment EventUserAggregateInfo on event_user_aggregate {
    aggregate {
      count
    }
  }
`,im=$`
  fragment GroupInfo on group {
    id
    path
    campus
    status
    captainId
    createdAt
    updatedAt
  }
`,rm=$`
  fragment GroupUserInfo on group_user {
    id
    userId
    confirmed
    createdAt
    updatedAt
  }
`;$`
  fragment GroupAggregateInfo on group_aggregate {
    aggregate {
      count
    }
  }
`;$`
  fragment GroupUserAggregateInfo on group_user_aggregate {
    aggregate {
      count
    }
  }
`;const um=$`
  fragment LabelInfo on label {
    id
    name
    description
    color
    createdAt
    updatedAt
  }
`,cm=$`
  fragment LabelUserInfo on label_user {
    id
    userId
    labelId
    createdAt
  }
`,C0=$`
  fragment LabelUserAggregateInfo on label_user_aggregate {
    aggregate {
      count
    }
  }
`,Hu=$`
  fragment MatchInfo on match {
    id
    userId
    matchId
    bet
    result
    confirmed
    createdAt
    updatedAt
    path
    campus
  }
`,X0=$`
  fragment MatchAggregateInfo on match_aggregate {
    aggregate {
      count
    }
  }
`,om=$`
  fragment ObjectAvailabilityInfo on object_availability {
    id
    userId
    objectId
    available
    createdAt
    updatedAt
  }
`,H0=$`
  fragment ObjectAvailabilityAggregateInfo on object_availability_aggregate {
    aggregate {
      count
    }
  }
`,fm=$`
  fragment ProgressByPathViewInfo on progress_by_path_view {
    id
    userId
    path
    grade
    isDone
    createdAt
    updatedAt
  }
`,L0=$`
  fragment ProgressByPathViewAggregateInfo on progress_by_path_view_aggregate {
    aggregate {
      count
    }
  }
`,Lu=$`
  fragment RecordInfo on record {
    id
    userId
    authorId
    message
    banEndAt
    createdAt
    updatedAt
  }
`,Yu=$`
  fragment RegistrationInfo on registration {
    id
    path
    campus
    startAt
    endAt
    eventStartAt
    attrs
    createdAt
    updatedAt
  }
`,dm=$`
  fragment RegistrationUserInfo on registration_user {
    id
    userId
    registrationId
    createdAt
  }
`,Y0=$`
  fragment RegistrationUserAggregateInfo on registration_user_aggregate {
    aggregate {
      count
    }
  }
`,Qu=$`
  fragment RoleInfo on role {
    id
    slug
    name
    description
    createdAt
    updatedAt
  }
`,Zu=$`
  fragment UserRoleInfo on user_role {
    id
    userId
    roleId
    createdAt
    updatedAt
  }
`;$`
  fragment UserRoleAggregateInfo on user_role_aggregate {
    aggregate {
      count
    }
  }
`;const Q0=$`
  fragment UserRolesViewInfo on user_roles_view {
    id
    userId
    roleId
    slug
    name
    description
  }
`;$`
  fragment UserRolesViewAggregateInfo on user_roles_view_aggregate {
    aggregate {
      count
    }
  }
`;const mm=$`
  fragment ToadSessionInfo on toad_sessions {
    id
    userId
    sessionData
    createdAt
    updatedAt
    expiresAt
  }
`,Z0=$`
  fragment ToadSessionsAggregateInfo on toad_sessions_aggregate {
    aggregate {
      count
    }
  }
`,hm=$`
  fragment XPInfo on xp {
    id
    userId
    amount
    originEventId
    path
    createdAt
  }
`;$`
  fragment MarkdownInfo on markdown {
    id
    name
    content
    path
    createdAt
    updatedAt
  }
`;$`
  query GetUserInfo {
    user {
      ...UserInfo
    }
  }
  ${oe}
`;$`
  query GetEnhancedUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # User events
      events {
        ...EventUserInfo
        event {
          ...EventInfo
          object {
            ...ObjectInfo
          }
          registration {
            ...RegistrationInfo
          }
        }
      }

      # User events aggregate
      events_aggregate {
        ...EventUserAggregateInfo
      }

      # User groups
      groups {
        ...GroupUserInfo
        group {
          ...GroupInfo
          captain {
            ...UserBasicInfo
          }
          object {
            ...ObjectInfo
          }
        }
      }

      # Groups where user is captain
      groupsByCaptainid {
        ...GroupInfo
        groupUsers {
          ...GroupUserInfo
          user {
            ...UserBasicInfo
          }
        }
        object {
          ...ObjectInfo
        }
      }

      # User labels
      labels {
        ...LabelUserInfo
        label {
          ...LabelInfo
        }
      }

      # User matches (betting system)
      matches {
        ...MatchInfo
        matchedUser: userByMatchId {
          ...UserBasicInfo
        }
        object {
          ...ObjectInfo
        }
        event {
          ...EventInfo
        }
      }

      # Object availabilities
      objectAvailabilities {
        ...ObjectAvailabilityInfo
        object {
          ...ObjectInfo
        }
      }

      # User objects (created by user)
      objects {
        ...ObjectInfo
        reference {
          ...ObjectInfo
        }
      }

      # Progress by path view
      progressesByPath {
        ...ProgressByPathViewInfo
      }

      # User records (bans, warnings)
      records {
        ...RecordInfo
        author {
          ...UserBasicInfo
        }
      }

      # Records authored by user
      recordsByAuthorid {
        ...RecordInfo
        user {
          ...UserBasicInfo
        }
      }

      # User registrations
      registrations {
        ...RegistrationUserInfo
        registration {
          ...RegistrationInfo
          object {
            ...ObjectInfo
          }
        }
      }

      # User roles
      user_roles {
        ...UserRoleInfo
        role {
          ...RoleInfo
        }
      }

      # User roles view
      roles {
        ...UserRolesViewInfo
      }

      # User sessions
      sessions {
        ...ToadSessionInfo
      }

      # User XPs
      xps {
        ...XPInfo
      }
    }
  }
  ${oe}
  ${Wt}
  ${sm}
  ${nm}
  ${gi}
  ${ve}
  ${Yu}
  ${rm}
  ${im}
  ${cm}
  ${um}
  ${Hu}
  ${om}
  ${fm}
  ${Lu}
  ${dm}
  ${Zu}
  ${Qu}
  ${Q0}
  ${mm}
  ${hm}
`;$`
  query GetUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # User records (bans, warnings, etc.)
      records {
        ...RecordInfo
        author {
          ...UserBasicInfo
        }
      }

      # User roles
      user_roles {
        ...UserRoleInfo
        role {
          ...RoleInfo
        }
      }
    }
  }
  ${oe}
  ${Wt}
  ${Lu}
  ${Zu}
  ${Qu}
`;$`
  query GetUserEventsDetailed($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User events
      events(
        limit: $limit
        offset: $offset
        order_by: { event: { createdAt: desc } }
      ) {
        ...EventUserInfo
        event {
          ...EventInfo
          object {
            ...ObjectInfo
            author {
              ...UserBasicInfo
            }
          }
          registration {
            ...RegistrationInfo
            object {
              ...ObjectInfo
            }
          }
          parent {
            ...EventInfo
          }
        }
      }

      # Events aggregate
      events_aggregate {
        ...EventUserAggregateInfo
      }

      # User registrations
      registrations(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...RegistrationUserInfo
        registration {
          ...RegistrationInfo
          object {
            ...ObjectInfo
          }
          parent {
            ...RegistrationInfo
          }
        }
      }

      # Registrations aggregate
      registrations_aggregate {
        ...RegistrationUserAggregateInfo
      }
    }
  }
  ${sm}
  ${nm}
  ${gi}
  ${ve}
  ${Wt}
  ${Yu}
  ${dm}
  ${Y0}
`;$`
  query GetUserLabels($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User labels
      labels {
        ...LabelUserInfo
        label {
          ...LabelInfo
        }
      }

      # Labels aggregate
      labels_aggregate {
        ...LabelUserAggregateInfo
      }
    }
  }
  ${cm}
  ${C0}
  ${um}
`;$`
  query GetUserMatchesDetailed($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User matches
      matches(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...MatchInfo
        # The matched user
        matchedUser: userByMatchId {
          ...UserBasicInfo
        }
        # Related object
        object {
          ...ObjectInfo
          author {
            ...UserBasicInfo
          }
        }
        # Related event
        event {
          ...EventInfo
          object {
            ...ObjectInfo
          }
        }
      }

      # Matches aggregate
      matches_aggregate {
        ...MatchAggregateInfo
      }
    }
  }
  ${Hu}
  ${X0}
  ${Wt}
  ${ve}
  ${gi}
`;$`
  query GetUserObjectAvailabilities($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # Object availabilities
      objectAvailabilities(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...ObjectAvailabilityInfo
        object {
          ...ObjectInfo
          author {
            ...UserBasicInfo
          }
          reference {
            ...ObjectInfo
          }
        }
      }

      # Object availabilities aggregate
      objectAvailabilities_aggregate {
        ...ObjectAvailabilityAggregateInfo
      }
    }
  }
  ${om}
  ${H0}
  ${ve}
  ${Wt}
`;const V0=$`
  query GetComprehensiveUserAnalytics($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      # Basic user info from user table schema
      id
login
      profile
      attrs
      campus
      createdAt
      updatedAt

      # XP transactions - amount is in bytes, convert to KB by /1000
      transactions(
        where: { type: { _eq: "xp" } }
        order_by: { createdAt: desc }
        limit: 100
      ) {
        id
        type
        amount
        createdAt
        path
        object {
          id
          name
          type
        }
      }

      # XP transactions aggregate for total calculation
      xpTransactions: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          count
          sum {
            amount
          }
        }
      }

      # Up transactions (audit reviews given)
      upTransactions: transactions_aggregate(
        where: { type: { _eq: "up" } }
      ) {
        aggregate {
          count
          sum {
            amount
          }
        }
      }

      # Down transactions (audit reviews received)
      downTransactions: transactions_aggregate(
        where: { type: { _eq: "down" } }
      ) {
        aggregate {
          count
          sum {
            amount
          }
        }
      }

      # Results for project statistics
      results(
        where: { isLast: { _eq: true } }
        order_by: { createdAt: desc }
        limit: 50
      ) {
        id
        grade
        type
        createdAt
        path
        object {
          id
          name
          type
        }
      }

      # Results aggregates
      results_aggregate(where: { isLast: { _eq: true } }) {
        aggregate {
          count
        }
      }

      # Passed results (grade >= 1)
      passedResults: results_aggregate(
        where: {
          isLast: { _eq: true }
          grade: { _gte: 1 }
        }
      ) {
        aggregate {
          count
        }
      }

      # Audits given by this user (using auditorId)
      audits(limit: 50, order_by: { createdAt: desc }) {
        id
        grade
        createdAt
        attrs
        group {
          id
          path
          object {
            name
            type
          }
        }
      }

      # Audits given aggregate
      audits_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      # Progress data
      progresses(
        where: { isDone: { _eq: true } }
        order_by: { createdAt: desc }
        limit: 50
      ) {
        id
        grade
        createdAt
        path
        object {
          id
          name
          type
        }
      }

      # Events for campus and registration info
      events(limit: 10, order_by: { createdAt: asc }) {
        id
        createdAt
        event {
          id
          campus
          createdAt
          path
        }
      }
    }
  }
`;$`
  query GetPerformanceAnalytics($userId: Int!, $startDate: timestamptz, $endDate: timestamptz) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # Time-filtered transaction analytics
      recentTransactions: transactions_aggregate(
        where: {
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }

      # Recent XP gains
      recentXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }

      # Recent project completions
      recentProjects: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          createdAt: { _gte: $startDate, _lte: $endDate }
          isLast: { _eq: true }
        }
      ) {
        ...ResultAggregateInfo
      }

      # Recent audits given
      recentAuditsGiven: audits_aggregate(
        where: {
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...AuditAggregateInfo
      }

      # Recent progress updates
      recentProgress: progresses_aggregate(
        where: {
          updatedAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...ProgressAggregateInfo
      }

      # Activity by object type
      projectActivity: transactions_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }

      exerciseActivity: transactions_aggregate(
        where: {
          object: { type: { _eq: "exercise" } }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }

      questActivity: transactions_aggregate(
        where: {
          object: { type: { _eq: "quest" } }
          createdAt: { _gte: $startDate, _lte: $endDate }
        }
      ) {
        ...TransactionAggregateInfo
      }
    }
  }
  ${oe}
  ${hi}
  ${Xu}
  ${Cu}
  ${z0}
`;$`
  query GetCampusComparisonAnalytics($userId: Int!, $campus: String!) {
    # User's data
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # User's campus-specific metrics
      campusTransactions: transactions_aggregate(
        where: { campus: { _eq: $campus } }
      ) {
        ...TransactionAggregateInfo
      }

      campusXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
          campus: { _eq: $campus }
        }
      ) {
        ...TransactionAggregateInfo
      }

      campusProjects: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          campus: { _eq: $campus }
          isLast: { _eq: true }
        }
      ) {
        ...ResultAggregateInfo
      }
    }

    # Campus averages for comparison
    campusUsers: user(
      where: { campus: { _eq: $campus } }
      limit: 1000
    ) {
      id
      login
      auditRatio
      totalUp
      totalDown

      # Individual user XP for ranking
      userXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      # Individual user projects for ranking
      userProjects: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
        }
      }
    }
  }
  ${oe}
  ${hi}
  ${Xu}
`;$`
  query GetCollaborationAnalytics($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # Group collaboration metrics
      groups {
        ...GroupUserInfo
        group {
          ...GroupInfo
          # Group performance metrics
          groupUsers {
            ...GroupUserInfo
            user {
              ...UserBasicInfo
              # Collaborator XP for team analysis
              collaboratorXP: transactions_aggregate(
                where: { type: { _eq: "xp" } }
              ) {
                aggregate {
                  sum { amount }
                }
              }
            }
          }
          # Group results
          results: results_aggregate {
            ...ResultAggregateInfo
          }
          # Group audits
          audits: audits_aggregate {
            ...AuditAggregateInfo
          }
        }
      }

      # Groups as captain with team performance
      groupsByCaptainid {
        ...GroupInfo
        groupUsers {
          ...GroupUserInfo
          user {
            ...UserBasicInfo
            # Team member performance
            memberXP: transactions_aggregate(
              where: { type: { _eq: "xp" } }
            ) {
              aggregate {
                sum { amount }
                count
              }
            }
            memberProjects: results_aggregate(
              where: {
                object: { type: { _eq: "project" } }
                grade: { _gte: 1 }
                isLast: { _eq: true }
              }
            ) {
              aggregate {
                count
              }
            }
          }
        }
        # Team results
        teamResults: results_aggregate {
          ...ResultAggregateInfo
        }
      }

      # Audit relationships for network analysis
      audits {
        ...AuditInfo
        group {
          ...GroupInfo
          groupUsers {
            ...GroupUserInfo
            user {
              ...UserBasicInfo
            }
          }
        }
      }

      # Skill progression through transactions
      skillTransactions: transactions(
        where: {
          type: { _like: "%skill%" }
        }
        order_by: { createdAt: asc }
      ) {
        ...TransactionInfo
        object {
          ...ObjectInfo
          # Skill hierarchy
          children: objectChildrenByParentId {
            id
            key
            index
            child {
              ...ObjectInfo
            }
          }
        }
      }

      # Match/betting relationships for competitive analysis
      matches {
        ...MatchInfo
        matchedUser: userByMatchId {
          ...UserBasicInfo
          # Opponent performance for comparison
          opponentXP: transactions_aggregate(
            where: { type: { _eq: "xp" } }
          ) {
            aggregate {
              sum { amount }
            }
          }
        }
        object {
          ...ObjectInfo
        }
      }
    }
  }
  ${oe}
  ${Wt}
  ${rm}
  ${im}
  ${Xu}
  ${Cu}
  ${Zs}
  ${$t}
  ${ve}
  ${Hu}
`;$`
  query GetUserProgressByPath($userId: Int!, $pathPattern: String = "%", $limit: Int = 50, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # Progress by path
      progressesByPath(
        where: { path: { _like: $pathPattern } }
        limit: $limit
        offset: $offset
        order_by: { updatedAt: desc }
      ) {
        ...ProgressByPathViewInfo
      }

      # Progress by path aggregate
      progressesByPath_aggregate(
        where: { path: { _like: $pathPattern } }
      ) {
        ...ProgressByPathViewAggregateInfo
      }
    }
  }
  ${fm}
  ${L0}
`;$`
  query GetUserSessions($userId: Int!, $limit: Int = 10, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User sessions
      sessions(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...ToadSessionInfo
      }

      # Sessions aggregate
      sessions_aggregate {
        ...ToadSessionsAggregateInfo
      }
    }
  }
  ${mm}
  ${Z0}
`;$`
  query GetUserXPs($userId: Int!, $limit: Int = 100, $offset: Int = 0) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # User XPs
      xps(
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...XPInfo
      }
    }
  }
  ${hm}
`;$`
  query GetUserCreatedObjects($userId: Int!, $limit: Int = 50, $offset: Int = 0, $objectType: String = null) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # Objects created by user
      objects(
        where: { type: { _eq: $objectType } }
        limit: $limit
        offset: $offset
        order_by: { createdAt: desc }
      ) {
        ...ObjectInfo
        reference {
          ...ObjectInfo
          author {
            ...UserBasicInfo
          }
        }
        # Objects that reference this object
        referencedBy: objectsByReferenceId(limit: 5) {
          ...ObjectInfo
        }
        # Object children
        children: objectChildrenByParentId(limit: 10) {
          id
          key
          index
          attrs
          child {
            ...ObjectInfo
          }
        }
      }

      # Objects aggregate
      objects_aggregate(
        where: { type: { _eq: $objectType } }
      ) {
        ...ObjectAggregateInfo
      }
    }
  }
  ${ve}
  ${B0}
  ${Wt}
`;$`
  query GetTopTransaction($campus: String = null, $pathPattern: String = "%") {
    transaction(
      order_by: { amount: desc }
      limit: 1
      where: {
        type: { _eq: "xp" }
        path: { _like: $pathPattern }
        campus: { _eq: $campus }
      }
    ) {
      amount
      type
      createdAt
      path
      campus
      object {
        name
        type
        attrs
      }
      event {
        id
        path
        campus
      }
    }
  }
`;$`
  query GetTotalXP($eventPath: String = null, $campus: String = null) {
    transaction_aggregate(
      where: {
        type: { _eq: "xp" }
        event: { path: { _eq: $eventPath } }
        campus: { _eq: $campus }
      }
    ) {
      aggregate {
        sum {
          # XP amount in bytes, converted to KB using factor of 1000
          amount
        }
        count
      }
    }
  }
`;$`
  query GetUserTechnologies {
    transaction(
      where: {
        _and: [
          { type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" } }
          { type: { _like: "%skill%" } }
          { object: { type: { _eq: "project" } } }
          { type: { _in: [
            "skill_git", "skill_go", "skill_js",
            "skill_html", "skill_css", "skill_unix", "skill_docker",
            "skill_sql"
          ] } }
        ]
      }
      order_by: [{ type: asc }, { createdAt: desc }]
      distinct_on: type
    ) {
      amount
      type
      createdAt
      object {
        name
        type
      }
    }
  }
`;$`
  query GetUserTechnicalSkills {
    transaction(
      where: {
        _and: [
          { type: { _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])" } }
          { type: { _like: "%skill%" } }
          { object: { type: { _eq: "project" } } }
          { type: { _in: [
            "skill_prog", "skill_algo", "skill_sys-admin", "skill_front-end",
            "skill_back-end", "skill_stats", "skill_ai", "skill_game",
            "skill_tcp"
          ] } }
        ]
      }
      order_by: [{ type: asc }, { createdAt: desc }]
      distinct_on: type
    ) {
      amount
      type
      createdAt
      object {
        name
        type
      }
    }
  }
`;$`
  query GetAuditStatus($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login

      # Audits given by user (as auditor)
      validAuditsGiven: audit_aggregate(
        where: {
          auditorId: { _eq: $userId }
          grade: { _gte: 1 }
        }
      ) {
        aggregate {
          count
        }
        nodes {
          id
          grade
          group {
            id
            path
            captainId
            status
          }
        }
      }

      failedAuditsGiven: audit_aggregate(
        where: {
          auditorId: { _eq: $userId }
          grade: { _lt: 1 }
        }
      ) {
        aggregate {
          count
        }
        nodes {
          id
          grade
          group {
            id
            path
            captainId
            status
          }
        }
      }
    }
  }
`;$`
  query GetXPStatistics($userId: Int!, $campus: String = null) {
    # User basic info with audit metrics
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo
      # Direct XP fields from user table
      totalUp
      totalDown
      totalUpBonus
      auditRatio
      auditsAssigned
    }

    # Total XP from transactions - amount is in bytes, divide by 1000 for KB
    totalXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        campus: { _eq: $campus }
      }
    ) {
      ...TransactionAggregateInfo
    }

    # XP by project with enhanced object and event data
    xpByProject: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: "project" } }
        campus: { _eq: $campus }
      }
      order_by: { amount: desc }
      limit: 50
    ) {
      ...TransactionInfo
      # Enhanced object information
      object {
        ...ObjectInfo
        author {
          ...UserBasicInfo
        }
        reference {
          ...ObjectInfo
        }
      }
      # Enhanced event information
      event {
        ...EventInfo
        parent {
          ...EventInfo
        }
        object {
          ...ObjectInfo
        }
        registration {
          ...RegistrationInfo
        }
      }
    }

    # XP timeline for progression tracking with enhanced data
    xpTimeline: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        campus: { _eq: $campus }
      }
      order_by: { createdAt: asc }
      limit: 200
    ) {
      ...TransactionInfo
      object {
        ...ObjectInfo
        author {
          ...UserBasicInfo
        }
      }
      event {
        ...EventInfo
        parent {
          ...EventInfo
        }
        object {
          ...ObjectInfo
        }
      }
    }
  }
  ${oe}
  ${Wt}
  ${$t}
  ${hi}
  ${ve}
  ${gi}
  ${Yu}
`;$`
  query GetProjectStatistics($userId: Int!) {
    # All project results
    projectResults: result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        isLast: { _eq: true }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      createdAt
      updatedAt
      path
      object {
        name
        type
      }
      event {
        id
        path
        createdAt
        endAt
      }
    }

    # Project statistics aggregates
    totalProjects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        isLast: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }

    passedProjects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
        grade: { _gte: 1 }
        isLast: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;$`
  query GetAuditRatio($userId: Int!, $campus: String = null) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo
      # Direct audit metrics from user table
      auditRatio
      totalUp
      totalDown
      totalUpBonus
      auditsAssigned

      # Up transactions aggregate
      upTransactions: transactions_aggregate(
        where: {
          type: { _eq: "up" }
          campus: { _eq: $campus }
        }
      ) {
        ...TransactionAggregateInfo
      }

      # Down transactions aggregate
      downTransactions: transactions_aggregate(
        where: {
          type: { _eq: "down" }
          campus: { _eq: $campus }
        }
      ) {
        ...TransactionAggregateInfo
      }

      # Audits given by user (as auditor)
      auditsGiven: audits_aggregate {
        ...AuditAggregateInfo
      }

      # Audits received through group membership
      auditsReceived: audits_aggregate(
        where: {
          group: {
            groupUsers: {
              userId: { _eq: $userId }
            }
          }
        }
      ) {
        ...AuditAggregateInfo
      }

      # User roles with enhanced data
      user_roles {
        ...UserRoleInfo
        role {
          ...RoleInfo
        }
      }

      # User records with enhanced author data
      records {
        ...RecordInfo
        author {
          ...UserBasicInfo
        }
      }

      # Records authored by this user
      recordsByAuthorid {
        ...RecordInfo
        user {
          ...UserBasicInfo
        }
      }
    }
  }
  ${oe}
  ${Wt}
  ${hi}
  ${Cu}
  ${Zu}
  ${Qu}
  ${Lu}
`;$`
  query GetUserTransactions(
    $userId: Int!
    $limit: Int = 100
    $offset: Int = 0
    $transactionTypes: [String!] = ["xp", "up", "down"]
    $campus: String = null
  ) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _in: $transactionTypes }
        campus: { _eq: $campus }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...TransactionInfo
      # Related object information following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
        # Reference relationships
        reference {
          id
          name
          type
          attrs
        }
      }
      # Related event information following official structure
      event {
        id
        path
        campus
        createdAt
        endAt
        # Parent event relationship
        parent {
          id
          path
          campus
        }
        # Registration information
        registration {
          id
          startAt
          endAt
          eventStartAt
        }
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }

    # Transaction aggregates for statistics
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _in: $transactionTypes }
        campus: { _eq: $campus }
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
        avg {
          amount
        }
        max {
          amount
        }
        min {
          amount
        }
      }
    }
  }
  ${$t}
  ${ve}
  ${oe}
`;$`
  query GetUserProgress($userId: Int!, $limit: Int = 50, $offset: Int = 0, $isDone: Boolean = null) {
    progress(
      where: {
        userId: { _eq: $userId }
        isDone: { _eq: $isDone }
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...ProgressInfo
      # Related object information following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
        # Reference relationships
        reference {
          id
          name
          type
          attrs
        }
        # Object children relationships
        children: objectChildrenByParentId {
          id
          key
          index
          attrs
          child {
            id
            name
            type
            attrs
          }
        }
      }
      # Related event information following official structure
      event {
        id
        path
        createdAt
        endAt
        campus
        # Parent event relationship
        parent {
          id
          path
          campus
        }
        # Registration information
        registration {
          id
          startAt
          endAt
          eventStartAt
        }
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
      # Related group information following official structure
      group {
        id
        status
        captainId
        createdAt
        updatedAt
        path
        campus
        # Group users following official group_user table structure
        groupUsers {
          id
          confirmed
          createdAt
          updatedAt
          user {
            ...UserInfo
          }
        }
        # Captain information
        captain {
          ...UserInfo
        }
        # Related object
        object {
          id
          name
          type
          attrs
        }
        # Related event
        event {
          id
          path
          campus
        }
      }
    }

    # Progress statistics
    progress_aggregate(
      where: { userId: { _eq: $userId } }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
  ${mi}
  ${ve}
  ${oe}
`;$`
  query GetUserResults($userId: Int!, $limit: Int = 50, $offset: Int = 0, $type: String = null, $minGrade: Float = null) {
    result(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
        grade: { _gte: $minGrade }
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...ResultInfo
      # Related object information following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
        # Reference relationships
        reference {
          id
          name
          type
          attrs
        }
      }
      # Related event information following official structure
      event {
        id
        path
        campus
        createdAt
        endAt
        # Parent event relationship
        parent {
          id
          path
          campus
        }
        # Registration information
        registration {
          id
          startAt
          endAt
          eventStartAt
        }
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
      # Related group information following official structure
      group {
        id
        status
        captainId
        createdAt
        updatedAt
        path
        campus
        # Group users following official group_user table structure
        groupUsers {
          id
          confirmed
          createdAt
          updatedAt
          user {
            ...UserInfo
          }
        }
        # Captain information
        captain {
          ...UserInfo
        }
      }
      # Related audits for this result following official audit table structure
      audits {
        ...AuditInfo
        # Auditor information
        auditor {
          ...UserInfo
        }
        # Related group
        group {
          id
          status
          captainId
          path
          campus
        }
      }
    }

    # Result statistics
    result_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
        max {
          grade
        }
        min {
          grade
        }
      }
    }
  }
  ${ka}
  ${ve}
  ${oe}
  ${Zs}
`;$`
  query GetUserAudits($userId: Int!, $limit: Int = 50, $offset: Int = 0, $asAuditor: Boolean = null) {
    # Audits where user is the auditor following official audit table structure
    audits_given: audit(
      where: {
        auditorId: { _eq: $userId }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...AuditInfo
      # Related group information following official structure
      group {
        id
        path
        status
        captainId
        createdAt
        updatedAt
        campus
        # Group users following official group_user table structure
        groupUsers {
          id
          confirmed
          createdAt
          updatedAt
          user {
            ...UserInfo
          }
        }
        # Captain information
        captain {
          ...UserInfo
        }
        # Related object
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Related event
        event {
          id
          path
          campus
          createdAt
          endAt
        }
      }
      # Related result following official result table structure
      result {
        ...ResultInfo
        # Related object
        object {
          id
          name
          type
          attrs
        }
        # Related event
        event {
          id
          path
          campus
        }
        # Related group
        group {
          id
          status
          captainId
          path
        }
      }
      # Auditor information
      auditor {
        ...UserInfo
      }
    }

    # Audits received by user (through group membership) following official structure
    audits_received: audit(
      where: {
        group: {
          groupUsers: {
            userId: { _eq: $userId }
          }
        }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...AuditInfo
      # Auditor information
      auditor {
        ...UserInfo
      }
      # Related group
      group {
        id
        path
        status
        captainId
        campus
        # Group users
        groupUsers {
          id
          confirmed
          user {
            ...UserInfo
          }
        }
      }
      # Related result
      result {
        ...ResultInfo
      }
    }

    # Audit statistics for audits given
    audit_stats_given: audit_aggregate(
      where: { auditorId: { _eq: $userId } }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }

    # Audit statistics for audits received
    audit_stats_received: audit_aggregate(
      where: {
        group: {
          groupUsers: {
            userId: { _eq: $userId }
          }
        }
      }
    ) {
      aggregate {
        count
        avg {
          grade
        }
      }
    }
  }
  ${Zs}
  ${oe}
  ${ve}
  ${ka}
`;$`
  query GetEvents($userId: Int!, $limit: Int = 50) {
    event(
      where: {
        eventUsers: { userId: { _eq: $userId } }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      path
      createdAt
      endAt
      campus
      # Parent event relationship following official structure
      parent {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related object following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Registration information following official structure
      registration {
        id
        startAt
        endAt
        eventStartAt
      }
      # Event users following official event_user table structure
      eventUsers {
        id
        userId
        createdAt
        user {
          ...UserInfo
        }
      }
    }
  }
  ${ve}
  ${oe}
`;$`
  query GetUserGroups($userId: Int!) {
    group(
      where: {
        groupUsers: { userId: { _eq: $userId } }
      }
      order_by: { createdAt: desc }
    ) {
      id
      path
      createdAt
      updatedAt
      campus
      status
      captainId
      # Related object following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event following official structure
      event {
        id
        path
        createdAt
        endAt
        campus
        # Parent event relationship
        parent {
          id
          path
          campus
        }
        # Registration information
        registration {
          id
          startAt
          endAt
          eventStartAt
        }
      }
      # Group users following official group_user table structure
      groupUsers {
        id
        confirmed
        createdAt
        updatedAt
        user {
          ...UserInfo
        }
      }
      # Captain information
      captain {
        ...UserInfo
      }
    }
  }
  ${ve}
  ${oe}
`;$`
  query GetUserSkills($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      distinct_on: path
    ) {
      ...TransactionInfo
      # Related object information following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
        # Reference relationships
        reference {
          id
          name
          type
          attrs
        }
        # Object children relationships for skill hierarchies
        children: objectChildrenByParentId {
          id
          key
          index
          attrs
          child {
            id
            name
            type
            attrs
          }
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }
  }
  ${$t}
  ${ve}
  ${oe}
`;const k0=$`
  query SearchUsers($searchTerm: String!) {
    user(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { profile: { _ilike: $searchTerm } }
          { attrs: { _ilike: $searchTerm } }
        ]
      }
      limit: 10
    ) {
      ...UserInfo
      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }
      # User records (bans, warnings) following official record table structure
      records {
        id
        message
        banEndAt
        createdAt
        author {
          ...UserInfo
        }
      }
    }
  }
  ${oe}
`;$`
  query GetUserEvents($userId: Int!, $limit: Int = 50, $offset: Int = 0, $status: String = null) {
    # Events user is registered for following official event_user table structure
    user_events: eventUser(
      where: { userId: { _eq: $userId } }
      order_by: { event: { createdAt: desc } }
      limit: $limit
      offset: $offset
    ) {
      id
      userId
      createdAt
      # Related event following official structure
      event {
        id
        path
        createdAt
        endAt
        campus
        # Parent event relationship
        parent {
          id
          path
          campus
          createdAt
          endAt
          # Related object
          object {
            id
            name
            type
            attrs
          }
        }
        # Related object following official structure
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Registration information following official structure
        registration {
          id
          startAt
          endAt
          eventStartAt
          path
          campus
          attrs
          # Related object
          object {
            id
            name
            type
            attrs
          }
          # Parent registration relationship
          parent {
            id
            path
            campus
          }
        }
      }
      # User information
      user {
        ...UserInfo
      }
    }

    # User registrations following official registration_user table structure
    user_registrations: registrationUser(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      userId
      createdAt
      # Related registration following official structure
      registration {
        id
        startAt
        endAt
        eventStartAt
        path
        campus
        attrs
        # Related object
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Parent registration relationship
        parent {
          id
          path
          campus
          # Related object
          object {
            id
            name
            type
            attrs
          }
        }
      }
      # User information
      user {
        ...UserInfo
      }
    }

    # Event statistics
    event_stats: eventUser_aggregate(
      where: { userId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${ve}
  ${oe}
`;$`
  query GetUserMatches($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    # Matches where user is involved (if match table exists)
    user_matches: match(
      where: {
        _or: [
          { userId: { _eq: $userId } }
          { matchId: { _eq: $userId } }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      bet
      result
      confirmed
      createdAt
      updatedAt
      path
      campus
      # The user who initiated the match
      user {
        ...UserInfo
      }
      # The matched user
      matchedUser: userByMatchId {
        ...UserInfo
      }
      # Related object following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event following official structure
      event {
        id
        path
        createdAt
        endAt
        campus
        # Parent event relationship
        parent {
          id
          path
          campus
        }
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }

    # Match statistics
    match_stats: match_aggregate(
      where: {
        _or: [
          { userId: { _eq: $userId } }
          { matchId: { _eq: $userId } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }

    # Successful bets
    successful_bets: match_aggregate(
      where: {
        userId: { _eq: $userId }
        result: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }

    # Failed bets
    failed_bets: match_aggregate(
      where: {
        userId: { _eq: $userId }
        result: { _eq: false }
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${oe}
  ${ve}
`;$`
  query GetObjectDetails($objectId: Int!, $userId: Int = null) {
    object(where: { id: { _eq: $objectId } }) {
      ...ObjectInfo
      # Reference relationships following official structure
      reference {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Objects that reference this object
      referencedBy: objectsByReferenceId {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Author information following official structure
      author {
        ...UserInfo
        # User roles
        userRoles {
          id
          role {
            id
            slug
            name
            description
          }
        }
      }
      # Object children relationships following official object_child table structure
      children: objectChildrenByParentId {
        id
        key
        index
        attrs
        child {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
      }
      # Parent relationships
      parents: objectChildrenByChildId {
        id
        key
        index
        attrs
        parent {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
      }
      # Related events following official structure
      events {
        id
        path
        createdAt
        endAt
        campus
        # Parent event relationship
        parent {
          id
          path
          campus
        }
        # Registration information
        registration {
          id
          startAt
          endAt
          eventStartAt
        }
      }
      # User-specific data (if userId provided) following official structure
      userProgress: progresses(
        where: { userId: { _eq: $userId } }
        order_by: { updatedAt: desc }
        limit: 1
      ) {
        ...ProgressInfo
        # Related group
        group {
          id
          status
          captainId
          path
          campus
        }
        # Related event
        event {
          id
          path
          campus
          createdAt
          endAt
        }
      }
      userResults: results(
        where: { userId: { _eq: $userId } }
        order_by: { updatedAt: desc }
        limit: 5
      ) {
        ...ResultInfo
        # Related group
        group {
          id
          status
          captainId
          path
          campus
        }
        # Related event
        event {
          id
          path
          campus
        }
      }
      userTransactions: transactions(
        where: { userId: { _eq: $userId } }
        order_by: { createdAt: desc }
      ) {
        ...TransactionInfo
        # Related event
        event {
          id
          path
          campus
          createdAt
          endAt
        }
      }
    }
  }
  ${ve}
  ${oe}
  ${mi}
  ${ka}
  ${$t}
`;$`
  query AdvancedSearch(
    $searchTerm: String!
    $searchType: String = "all"
    $limit: Int = 20
    $offset: Int = 0
    $userId: Int = null
  ) {
    # Search users following official structure
    users: user(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { profile: { _ilike: $searchTerm } }
          { attrs: { _ilike: $searchTerm } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
      ...UserInfo
      # User statistics following official transaction table structure
      totalXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }
      # User records (bans, warnings) following official record table structure
      records {
        id
        message
        banEndAt
        createdAt
        author {
          id
          login
        }
      }
    }

    # Search objects/projects following official structure
    objects: object(
      where: {
        _or: [
          { name: { _ilike: $searchTerm } }
          { attrs: { _ilike: $searchTerm } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
      ...ObjectInfo
      # Author information
      author {
        ...UserInfo
      }
      # Reference relationships
      reference {
        id
        name
        type
        attrs
      }
      # User progress on this object (if userId provided) following official structure
      userProgress: progresses(
        where: { userId: { _eq: $userId } }
        limit: 1
      ) {
        ...ProgressInfo
        # Related group
        group {
          id
          status
          captainId
          path
        }
        # Related event
        event {
          id
          path
          campus
        }
      }
    }

    # Search events following official structure
    events: event(
      where: {
        _or: [
          { path: { _ilike: $searchTerm } }
          { object: { name: { _ilike: $searchTerm } } }
        ]
      }
      limit: $limit
      offset: $offset
    ) {
      id
      path
      createdAt
      endAt
      campus
      # Parent event relationship
      parent {
        id
        path
        campus
      }
      # Related object
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Registration information
      registration {
        id
        startAt
        endAt
        eventStartAt
      }
      # User participation (if userId provided) following official event_user table structure
      userParticipation: eventUsers(
        where: { userId: { _eq: $userId } }
        limit: 1
      ) {
        id
        userId
        createdAt
        user {
          ...UserInfo
        }
      }
    }
  }
  ${oe}
  ${ve}
  ${mi}
`;$`
  query GetUserAnalytics($userId: Int!) {
    # Time-based performance metrics following official transaction table structure
    daily_xp: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      ...TransactionInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
    }

    # Skill progression over time following official structure
    skill_progression: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      ...TransactionInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
        # Object children relationships for skill hierarchies
        children: objectChildrenByParentId {
          id
          key
          index
          attrs
          child {
            id
            name
            type
            attrs
          }
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
    }

    # Project completion timeline following official result table structure
    project_timeline: result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _in: ["project", "exercise", "quest"] } }
        isLast: { _eq: true }
      }
      order_by: { createdAt: asc }
    ) {
      ...ResultInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related group information
      group {
        id
        status
        captainId
        path
        campus
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }

    # Audit performance over time following official audit table structure
    audit_timeline: audit(
      where: {
        _or: [
          { auditorId: { _eq: $userId } }
          { group: { groupUsers: { userId: { _eq: $userId } } } }
        ]
      }
      order_by: { createdAt: asc }
    ) {
      ...AuditInfo
      # Auditor information
      auditor {
        ...UserInfo
      }
      # Related group following official structure
      group {
        id
        status
        captainId
        path
        campus
        # Related object
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Group users
        groupUsers {
          id
          confirmed
          user {
            ...UserInfo
          }
        }
      }
      # Related result
      result {
        ...ResultInfo
      }
    }

    # Activity patterns
    activity_by_hour: transaction(
      where: {
        userId: { _eq: $userId }
      }
    ) {
      createdAt
      type
      amount
    }

    # Performance benchmarks
    user_ranking: user(
      order_by: {
        transactions_aggregate: {
          sum: { amount: desc }
        }
      }
      where: {
        transactions: {
          type: { _eq: "xp" }
        }
      }
      limit: 100
    ) {
      id
      login
      totalXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
  ${$t}
  ${ve}
  ${oe}
  ${ka}
  ${Zs}
`;$`
  query GetLeaderboard($limit: Int = 50, $campus: String = null, $objectType: String = null) {
    # XP Leaderboard following official transaction table structure
    xp_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        transactions: { type: { _eq: "xp" } }
      }
      order_by: {
        transactions_aggregate: {
          sum: { amount: desc }
        }
      }
      limit: $limit
    ) {
      ...UserInfo
      # Total XP calculation following official structure
      totalXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
          count
        }
      }
      # Projects completed following official result table structure
      projectsCompleted: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
        }
      }
      # Audits given following official audit table structure
      auditsGiven: audits_aggregate(
        where: { auditorId: { _eq: id } }
      ) {
        aggregate {
          count
        }
      }
      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }
    }

    # Project completion leaderboard following official result table structure
    project_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        results: {
          object: { type: { _eq: $objectType } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      }
      order_by: {
        results_aggregate: {
          count: desc
        }
      }
      limit: $limit
    ) {
      ...UserInfo
      # Projects completed following official structure
      projectsCompleted: results_aggregate(
        where: {
          object: { type: { _eq: $objectType } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
      # User roles
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }
    }

    # Audit ratio leaderboard following official audit table structure
    audit_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        audits: { id: { _is_null: false } }
      }
      limit: $limit
    ) {
      ...UserInfo
      # Audits given following official structure
      auditsGiven: audits_aggregate(
        where: { auditorId: { _eq: id } }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
      # Audits received through group membership following official structure
      auditsReceived: audits_aggregate(
        where: {
          group: {
            groupUsers: {
              userId: { _eq: id }
            }
          }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
    }
  }
  ${oe}
`;$`
  query CompareUsers($userIds: [Int!]!) {
    users: user(where: { id: { _in: $userIds } }) {
      ...UserInfo

      # XP Statistics following official transaction table structure
      totalXP: transactions_aggregate(
        where: {
          type: { _eq: "xp" }
        }
      ) {
        aggregate {
          sum {
            amount
          }
          count
          avg {
            amount
          }
        }
      }

      # Project Statistics following official result table structure
      projectStats: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      passedProjects: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          grade: { _gte: 1 }
          isLast: { _eq: true }
        }
      ) {
        aggregate {
          count
        }
      }

      # Audit Statistics following official audit table structure
      auditsGiven: audits_aggregate(
        where: { auditorId: { _eq: id } }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      # Audits received through group membership following official structure
      auditsReceived: audits_aggregate(
        where: {
          group: {
            groupUsers: {
              userId: { _eq: id }
            }
          }
        }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }

      # Activity Timeline following official structure
      recentActivity: transactions(
        order_by: { createdAt: desc }
        limit: 10
      ) {
        ...TransactionInfo
        # Related object information
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Related event information
        event {
          id
          path
          campus
          createdAt
          endAt
        }
      }
    }
  }
  ${oe}
  ${$t}
  ${ve}
`;$`
  query GetXPByProject($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { amount: desc }
    ) {
      ...TransactionInfo
      # Related object information following official structure
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
        # Reference relationships
        reference {
          id
          name
          type
          attrs
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
        # Related object
        object {
          id
          name
          type
          attrs
        }
      }
    }
  }
  ${$t}
  ${ve}
  ${oe}
`;$`
  query GetXPTimeline($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      ...TransactionInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
    }
  }
  ${$t}
  ${ve}
  ${oe}
`;$`
  query GetPiscineStats($userId: Int!) {
    # Get all piscine results following official result table structure
    result(
      where: {
        userId: { _eq: $userId }
        path: { _like: "%piscine%" }
      }
      order_by: { createdAt: desc }
    ) {
      ...ResultInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related group information
      group {
        id
        status
        captainId
        path
        campus
        # Group users
        groupUsers {
          id
          confirmed
          user {
            ...UserInfo
          }
        }
      }
    }

    # Get piscine progress entries following official progress table structure
    progress(
      where: {
        userId: { _eq: $userId }
        path: { _like: "%piscine%" }
      }
      order_by: { createdAt: desc }
    ) {
      ...ProgressInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related group information
      group {
        id
        status
        captainId
        path
        campus
      }
    }
  }
  ${ka}
  ${mi}
  ${ve}
  ${oe}
`;$`
  query GetEnhancedProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # Get user's first event to determine registration/start date following official event_user structure
      eventUsers(
        order_by: { event: { createdAt: asc } }
        limit: 1
      ) {
        id
        createdAt
        event {
          id
          createdAt
          path
          campus
          # Related object
          object {
            id
            name
            type
            attrs
          }
        }
      }

      # User roles following official user_role table structure
      userRoles {
        id
        role {
          id
          slug
          name
          description
        }
      }

      # User records (bans, warnings) following official record table structure
      records {
        id
        message
        banEndAt
        createdAt
        author {
          ...UserInfo
        }
      }

      # Get total project count following official result table structure
      results_aggregate {
        aggregate {
          count
        }
      }

      # Get passed projects count
      passed_projects: results_aggregate(
        where: { grade: { _gte: 1 } }
      ) {
        aggregate {
          count
        }
      }
    }
  }
  ${oe}
`;$`
  query GetProjectTimeline($userId: Int!) {
    result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: asc }
    ) {
      ...ResultInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
      # Related group information
      group {
        id
        status
        captainId
        path
        campus
        # Group users
        groupUsers {
          id
          confirmed
          user {
            ...UserInfo
          }
        }
      }
    }

    # Get corresponding XP transactions for projects following official structure
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: asc }
    ) {
      ...TransactionInfo
      # Related object information
      object {
        ...ObjectInfo
        # Author information
        author {
          ...UserInfo
        }
      }
      # Related event information
      event {
        id
        path
        campus
        createdAt
        endAt
      }
    }
  }
  ${ka}
  ${$t}
  ${ve}
  ${oe}
`;$`
  query GetDetailedAuditStats($userId: Int!) {
    # Audits given by user following official audit table structure
    audits_given: audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      ...AuditInfo
      # Related group information
      group {
        id
        path
        status
        captainId
        campus
        # Related object
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Group users
        groupUsers {
          id
          confirmed
          user {
            ...UserInfo
          }
        }
      }
      # Related result
      result {
        ...ResultInfo
      }
    }

    # Audits received by user (through group membership) following official structure
    audits_received: audit(
      where: {
        group: {
          groupUsers: {
            userId: { _eq: $userId }
          }
        }
      }
      order_by: { createdAt: desc }
      limit: 100
    ) {
      ...AuditInfo
      # Auditor information
      auditor {
        ...UserInfo
      }
      # Related group information
      group {
        id
        path
        status
        captainId
        campus
        # Related object
        object {
          ...ObjectInfo
          # Author information
          author {
            ...UserInfo
          }
        }
        # Group users
        groupUsers {
          id
          confirmed
          user {
            ...UserInfo
          }
        }
      }
      # Related result
      result {
        ...ResultInfo
      }
    }
  }
  ${Zs}
  ${ve}
  ${oe}
  ${ka}
`;const K0=$`
  query SearchProjectsByStatus(
    $userId: Int!
    $status: [String!] = ["working", "audit", "setup", "finished"]
    $searchTerm: String = "%%"
    $limit: Int = 20
    $offset: Int = 0
    $campus: String = null
  ) {
    # Search user's projects/results by status with proper filtering
    results: result(
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [
          {
            _or: [
              { object: { name: { _ilike: $searchTerm } } }
              { path: { _ilike: $searchTerm } }
            ]
          }
          {
            # Status filtering based on grade and completion state
            _or: [
              # Finished: grade >= 1 (passed) and isLast = true
              {
                _and: [
                  { grade: { _gte: 1 } }
                  { isLast: { _eq: true } }
                ]
              }
              # Working: grade < 1 and recent activity
              {
                _and: [
                  { grade: { _lt: 1 } }
                  { isLast: { _eq: false } }
                  { updatedAt: { _gte: "2024-01-01" } }
                ]
              }
              # Setup: very recent creation, no significant progress
              {
                _and: [
                  { grade: { _eq: 0 } }
                  { createdAt: { _gte: "2024-07-01" } }
                ]
              }
            ]
          }
        ]
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      type
      isLast
      version
      createdAt
      updatedAt
      path
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        campus
      }
      group {
        id
        status
        captainId
      }
    }

    # Get corresponding progress entries with status context
    progress: progress(
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [
          {
            _or: [
              { object: { name: { _ilike: $searchTerm } } }
              { path: { _ilike: $searchTerm } }
            ]
          }
        ]
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      isDone
      version
      createdAt
      updatedAt
      path
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        campus
      }
      group {
        id
        status
        captainId
      }
    }
  }
`,J0=$`
  query SearchAuditsByStatus(
    $userId: Int!
    $status: [String!] = ["working", "audit", "setup", "finished"]
    $searchTerm: String = "%%"
    $limit: Int = 20
    $offset: Int = 0
    $campus: String = null
  ) {
    # Audits given by user with group status filtering
    audits_given: audit(
      where: {
        auditorId: { _eq: $userId }
        _and: [
          {
            _or: [
              { group: { path: { _ilike: $searchTerm } } }
              { group: { object: { name: { _ilike: $searchTerm } } } }
            ]
          }
          {
            # Filter by group status (working, audit, setup, finished)
            group: {
              status: { _in: $status }
              campus: { _eq: $campus }
            }
          }
          {
            # Additional status filtering for audits
            _or: [
              # Working: audit in progress (no result yet)
              { resultId: { _is_null: true } }
              # Finished: audit completed with result
              { resultId: { _is_null: false } }
              # Setup: recently created
              { createdAt: { _gte: "2024-07-01" } }
            ]
          }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      attrs
      code
      version
      endAt
      private
      createdAt
      updatedAt
      group {
        id
        path
        status
        captainId
        campus
        object {
          id
          name
          type
          attrs
        }
        event {
          id
          path
          campus
        }
      }
      result {
        id
        grade
        type
        createdAt
      }
    }

    # Audits received by user through group membership
    audits_received: audit(
      where: {
        group: {
          group_user: {
            userId: { _eq: $userId }
          }
          status: { _in: $status }
          campus: { _eq: $campus }
        }
        _and: [
          {
            _or: [
              { group: { path: { _ilike: $searchTerm } } }
              { group: { object: { name: { _ilike: $searchTerm } } } }
            ]
          }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      grade
      attrs
      version
      endAt
      createdAt
      updatedAt
      auditor {
        id
        login
        profile
      }
      group {
        id
        path
        status
        captainId
        campus
        object {
          id
          name
          type
          attrs
        }
      }
      result {
        id
        grade
        type
        createdAt
      }
    }
  }
`;$`
  query GetProjectsPaginated(
    $userId: Int!
    $limit: Int = 20
    $offset: Int = 0
    $orderBy: [result_order_by!] = { updatedAt: desc }
    $where: result_bool_exp = {}
    $campus: String = null
  ) {
    # Main results with error boundary
    results: result(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [$where]
      }
    ) {
      id
      grade
      type
      isLast
      version
      createdAt
      updatedAt
      path
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        campus
      }
      group {
        id
        status
        captainId
        campus
      }
    }

    # Total count for pagination with error handling
    results_aggregate(
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [$where]
      }
    ) {
      aggregate {
        count
        max {
          updatedAt
        }
        min {
          createdAt
        }
      }
    }
  }
`;$`
  query GetTransactionsPaginated(
    $userId: Int!
    $limit: Int = 50
    $offset: Int = 0
    $orderBy: [transaction_order_by!] = { createdAt: desc }
    $where: transaction_bool_exp = {}
    $campus: String = null
  ) {
    # Main transactions with proper XP handling (factor of 1000)
    transactions: transaction(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [$where]
      }
    ) {
      id
      amount
      type
      createdAt
      updatedAt
      path
      campus
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        campus
      }
    }

    # Pagination metadata
    transactions_aggregate(
      where: {
        userId: { _eq: $userId }
        campus: { _eq: $campus }
        _and: [$where]
      }
    ) {
      aggregate {
        count
        sum {
          amount
        }
        avg {
          amount
        }
      }
    }
  }
`;$`
  query GetObjectHierarchy($objectId: Int!, $depth: Int = 3) {
    object(where: { id: { _eq: $objectId } }) {
      id
      name
      type
      attrs

      # Children objects through object_child relationship
      childObjects: object_child(
        where: { parentId: { _eq: $objectId } }
        order_by: { childId: asc }
      ) {
        childId
        parentId
        child {
          id
          name
          type
          attrs

          # Nested children (limited depth)
          childObjects: object_child(
            order_by: { childId: asc }
            limit: 50
          ) {
            childId
            child {
              id
              name
              type
            }
          }
        }
      }

      # Parent objects
      parentObjects: object_child(
        where: { childId: { _eq: $objectId } }
      ) {
        parentId
        childId
        parent {
          id
          name
          type
          attrs
        }
      }
    }
  }
`;$`
  query GetUserRolesDetailed($userId: Int!) {
    # Query user_role junction table directly
    user_role(where: { userId: { _eq: $userId } }) {
      id
      userId
      roleId
      role {
        id
        slug
        name
        description
        createdAt
        updatedAt

        # Role permissions if available
        attrs
      }
    }

    # Also get basic user info
    user(where: { id: { _eq: $userId } }) {
      id
      login
      profile
      campus
    }
  }
`;$`
  query GetAuditResultConnections($userId: Int!, $limit: Int = 50) {
    # Audits with their corresponding results
    audit(
      where: {
        _or: [
          { auditorId: { _eq: $userId } }
          { group: { group_user: { userId: { _eq: $userId } } } }
        ]
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      grade
      attrs
      version
      endAt
      private
      createdAt
      updatedAt

      # Auditor information
      auditor {
        id
        login
        profile
      }

      # Group being audited
      group {
        id
        path
        status
        captainId
        campus

        # Group members
        group_user {
          userId
          user {
            id
            login
            profile
          }
        }

        # Related object
        object {
          id
          name
          type
          attrs
        }
      }

      # Connected result if exists
      result {
        id
        grade
        type
        isLast
        version
        createdAt
        updatedAt
        path
        campus

        # Result's object
        object {
          id
          name
          type
          attrs
        }
      }
    }
  }
`;const P0=$`
  query SearchUsersWithStatus(
    $searchTerm: String!
    $status: String = "all"
    $campus: String = ""
    $limit: Int = 20
    $offset: Int = 0
  ) {
    users: user(
      where: {
        _and: [
          {
            _or: [
              { login: { _ilike: $searchTerm } }
              { profile: { _ilike: $searchTerm } }
              { attrs: { _ilike: $searchTerm } }
            ]
          }
          {
            # Campus filtering if specified
            campus: { _ilike: $campus }
          }
        ]
      }
      order_by: { login: asc }
      limit: $limit
      offset: $offset
    ) {
      id
      login
      profile
      campus
      createdAt
      updatedAt

      # Get recent activity to determine status
      recent_results: results(
        order_by: { updatedAt: desc }
        limit: 5
      ) {
        id
        grade
        updatedAt
        object {
          name
          type
        }
      }

      # Get recent transactions for activity
      recent_transactions: transactions(
        where: { type: { _eq: "xp" } }
        order_by: { createdAt: desc }
        limit: 3
      ) {
        id
        amount
        createdAt
      }
    }
  }
`;$`
  query ValidateSchema {
    # Test core tables exist and have expected fields
    user(limit: 1) {
      id
      login
      profile
      attrs
      campus
      createdAt
      updatedAt
    }

    transaction(limit: 1) {
      id
      userId
      type
      amount
      createdAt
      path
      campus
    }

    result(limit: 1) {
      id
      userId
      grade
      type
      isLast
      version
      createdAt
      updatedAt
      path
      campus
    }

    audit(limit: 1) {
      id
      auditorId
      grade
      attrs
      version
      endAt
      private
      createdAt
      updatedAt
    }

    progress(limit: 1) {
      id
      userId
      grade
      isDone
      version
      createdAt
      updatedAt
      path
      campus
    }

    group(limit: 1) {
      id
      captainId
      status
      campus
      createdAt
      updatedAt
      path
    }

    object(limit: 1) {
      id
      name
      type
      attrs
      createdAt
      updatedAt
    }

    event(limit: 1) {
      id
      path
      campus
      createdAt
      updatedAt
    }
  }
`;$`
  query GetUserDashboard($userId: Int!, $campus: String = null, $limit: Int = 20) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      profile
      attrs
      campus
      createdAt
      updatedAt

      # Recent XP transactions (converted from bytes to KB)
      recentXP: transaction(
        where: {
          type: { _eq: "xp" }
          campus: { _eq: $campus }
        }
        order_by: { createdAt: desc }
        limit: $limit
      ) {
        id
        amount
        createdAt
        path
        object {
          name
          type
        }
      }

      # Total XP calculation
      totalXP: transaction_aggregate(
        where: {
          type: { _eq: "xp" }
          campus: { _eq: $campus }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      # Audit ratio calculation
      upTransactions: transaction_aggregate(
        where: {
          type: { _eq: "up" }
          campus: { _eq: $campus }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      downTransactions: transaction_aggregate(
        where: {
          type: { _eq: "down" }
          campus: { _eq: $campus }
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      # Recent results
      recentResults: result(
        where: { campus: { _eq: $campus } }
        order_by: { updatedAt: desc }
        limit: $limit
      ) {
        id
        grade
        type
        isLast
        updatedAt
        path
        object {
          name
          type
        }
      }

      # User roles - removed until correct relationship field is identified
      # Use GET_USER_ROLES_DETAILED query separately to get user roles
    }
  }
`;const W0=1e3,Ta=r=>{if(!r||r===0)return"0";const c=Number(r);return isNaN(c)?"0":c>=1e6?`${(c/1e6).toFixed(1)}M`:c>=1e3?`${(c/1e3).toFixed(1)}K`:c.toString()},Cl=r=>Number(r)/W0,F0=r=>{if(!r)return null;if(r.profile)try{const c=typeof r.profile=="string"?JSON.parse(r.profile):r.profile;if(c.avatar)return c.avatar;if(c.avatarUrl)return c.avatarUrl;if(c.picture)return c.picture}catch(c){console.warn("Error parsing user profile for avatar:",c)}if(r.attrs)try{const c=typeof r.attrs=="string"?JSON.parse(r.attrs):r.attrs;if(c.avatar)return c.avatar;if(c.avatarUrl)return c.avatarUrl;if(c.picture)return c.picture;if(c.image)return c.image}catch(c){console.warn("Error parsing user attrs for avatar:",c)}return null},oi=r=>{if(!r)return"Unknown User";if(r.firstName&&r.lastName)return`${r.firstName} ${r.lastName}`;if(r.firstName)return r.firstName;if(r.lastName)return r.lastName;if(r.profile)try{const c=typeof r.profile=="string"?JSON.parse(r.profile):r.profile;if(c.firstName&&c.lastName)return`${c.firstName} ${c.lastName}`;if(c.name)return c.name;if(c.displayName)return c.displayName}catch(c){console.warn("Error parsing user profile for display name:",c)}return r.login||r.username||"Unknown User"},ep=r=>{if(!r)return null;if(r.email)return r.email;if(r.profile)try{const c=typeof r.profile=="string"?JSON.parse(r.profile):r.profile;if(c.email)return c.email}catch(c){console.warn("Error parsing user profile for email:",c)}if(r.attrs)try{const c=typeof r.attrs=="string"?JSON.parse(r.attrs):r.attrs;if(c.email)return c.email}catch(c){console.warn("Error parsing user attrs for email:",c)}return null},gm=r=>!r||r<=0?1:Math.floor(r/1e3)+1,tp=r=>{const c=gm(r),f=(c-1)*1e3,d=c*1e3,p=(r-f)/1e3*100,j=d-r;return{currentLevel:c,progressPercentage:Math.max(0,Math.min(100,p)),xpNeeded:Math.max(0,j),currentLevelXP:f,nextLevelXP:d}},Ou=(r,c={})=>{if(!r)return"Unknown";const f={year:"numeric",month:"short",day:"numeric"};try{return new Date(r).toLocaleDateString("en-US",{...f,...c})}catch(d){return console.warn("Error formatting date:",d),"Invalid Date"}},ap=r=>{if(!r)return{auditRatio:0,totalUp:0,totalDown:0,auditsGiven:0,auditsReceived:0};const c=r.auditRatio||0,f=r.upTransactions?.aggregate?.sum?.amount||r.totalUp||0,d=r.downTransactions?.aggregate?.sum?.amount||r.totalDown||0,h=r.audits_aggregate?.aggregate?.count||r.auditsAssigned||0,p=r.auditsReceived?.aggregate?.count||0;return{auditRatio:c,totalUp:Cl(f),totalDown:Cl(Math.abs(d)),auditsGiven:h,auditsReceived:p}},lp=r=>{const c=r?.totalProjects?.aggregate?.count||0,f=r?.passedProjects?.aggregate?.count||0,d=c-f,h=c>0?f/c*100:0;return{totalProjects:c,passedProjects:f,failedProjects:d,passRate:h}},pm=r=>{if(!Array.isArray(r))return{totalXP:0,xpByProject:[],timeline:[]};const c=r.filter(p=>p.type==="xp"),f=c.reduce((p,j)=>p+Cl(j.amount),0),d=c.reduce((p,j)=>{const S=j.object?.name||j.path?.split("/").pop()||"Unknown",I=`${S}_${j.objectId||"no_id"}`;return p[I]||(p[I]={name:S,path:j.path,objectId:j.objectId,totalXP:0,type:j.object?.type||"unknown",transactions:[]}),p[I].totalXP+=Cl(j.amount),p[I].transactions.push(j),p},{}),h=c.map(p=>({date:p.createdAt,amount:Cl(p.amount),project:p.object?.name||p.path?.split("/").pop()||"Unknown",type:p.object?.type||"unknown"})).sort((p,j)=>new Date(p.date)-new Date(j.date));return{totalXP:f,xpByProject:Object.values(d).sort((p,j)=>j.totalXP-p.totalXP),timeline:h}},sp=r=>{if(!r)return"Unknown Campus";if(r.campus)return r.campus;if(r.events&&r.events.length>0){const c=r.events[0];if(c.event?.campus)return c.event.campus;if(c.campus)return c.campus}return"Unknown Campus"},np=r=>{if(!r)return null;if(r.createdAt)return r.createdAt;if(r.events&&r.events.length>0){const c=r.events.sort((f,d)=>new Date(f.createdAt||f.event?.createdAt)-new Date(d.createdAt||d.event?.createdAt));return c[0].createdAt||c[0].event?.createdAt}return null},ip=r=>{if(!Array.isArray(r))return[];const f=r.filter(d=>d.type&&d.type.includes("skill")).reduce((d,h)=>{const p=h.type;d[p]||(d[p]={name:p.replace("skill_","").replace(/_/g," "),type:p,totalXP:0,transactions:[],lastActivity:null}),d[p].totalXP+=Cl(h.amount),d[p].transactions.push(h);const j=new Date(h.createdAt);return(!d[p].lastActivity||j>new Date(d[p].lastActivity))&&(d[p].lastActivity=h.createdAt),d},{});return Object.values(f).sort((d,h)=>h.totalXP-d.totalXP)},rp=r=>{if(!Array.isArray(r))return{total:0,completed:0,inProgress:0,completionRate:0};const c=r.length,f=r.filter(p=>p.isDone).length,d=r.filter(p=>!p.isDone&&p.grade>0).length,h=c>0?f/c*100:0;return{total:c,completed:f,inProgress:d,completionRate:h,averageGrade:c>0?r.reduce((p,j)=>p+(j.grade||0),0)/c:0}},up=r=>{if(!r)return null;const c=Array.isArray(r)?r[0]:r;if(!c)return null;const f=oi(c),d=ep(c),h=sp(c),p=np(c),j=pm(c.transactions||[]),S=j.totalXP,I=gm(S),G=tp(S),z=ap(c),w=lp({totalProjects:c.results_aggregate,passedProjects:c.passedResults}),_=rp(c.progresses||[]),b=ip(c.transactions||[]);return{id:c.id,login:c.login,displayName:f,email:d,campus:h,registrationDate:p,totalXP:S,userLevel:I,levelProgress:G,xpByProject:j.xpByProject,xpTimeline:j.timeline,...w,..._,...z,skills:b,rawData:c}},cp=r=>{if(r<1e3)return 0;let c=0,f=0;for(;f<=r;)c++,f=c*(c+1)*500;return c-1},op=r=>{const c=r+1;return c*(c+1)*500},fp=(r,c)=>{const f=c*(c+1)*500,d=op(c),h=r-f,p=d-f;return{current:h,required:p,percentage:p>0?h/p*100:0}},Re={SET_LOADING:"SET_LOADING",SET_ERROR:"SET_ERROR",SET_USER_DATA:"SET_USER_DATA",SET_XP_DATA:"SET_XP_DATA",SET_PROJECT_DATA:"SET_PROJECT_DATA",SET_AUDIT_DATA:"SET_AUDIT_DATA",SET_PROGRESS_DATA:"SET_PROGRESS_DATA",SET_SKILL_DATA:"SET_SKILL_DATA",CLEAR_DATA:"CLEAR_DATA",REFRESH_DATA:"REFRESH_DATA"},ym={loading:!1,error:null,user:null,userStatistics:null,totalXP:0,xpByProject:[],xpTimeline:[],xpStatistics:null,totalProjects:0,passedProjects:0,failedProjects:0,passRate:0,projectResults:[],auditRatio:0,auditsGiven:0,auditsReceived:0,auditStatistics:null,totalProgress:0,completedProgress:0,inProgressItems:0,completionRate:0,progressData:[],skills:[],skillStatistics:null,userLevel:1,levelProgress:{currentLevel:1,progressPercentage:0,xpNeeded:1e3},lastUpdated:null,isStale:!1},dp=(r,c)=>{switch(c.type){case Re.SET_LOADING:return{...r,loading:c.payload,error:c.payload?null:r.error};case Re.SET_ERROR:return{...r,loading:!1,error:c.payload};case Re.SET_USER_DATA:const f=up(c.payload);return{...r,user:c.payload,userStatistics:f,totalXP:f?.totalXP||0,userLevel:f?.userLevel||1,levelProgress:f?.levelProgress||r.levelProgress,lastUpdated:new Date().toISOString(),isStale:!1};case Re.SET_XP_DATA:return{...r,xpStatistics:c.payload,totalXP:c.payload.totalXP||r.totalXP,xpByProject:c.payload.xpByProject||[],xpTimeline:c.payload.timeline||[]};case Re.SET_PROJECT_DATA:return{...r,totalProjects:c.payload.totalProjects||0,passedProjects:c.payload.passedProjects||0,failedProjects:c.payload.failedProjects||0,passRate:c.payload.passRate||0,projectResults:c.payload.results||[]};case Re.SET_AUDIT_DATA:return{...r,auditRatio:c.payload.auditRatio||0,auditsGiven:c.payload.given?.count||0,auditsReceived:c.payload.received?.count||0,auditStatistics:c.payload};case Re.SET_PROGRESS_DATA:return{...r,totalProgress:c.payload.total||0,completedProgress:c.payload.completed||0,inProgressItems:c.payload.inProgress||0,completionRate:c.payload.completionRate||0,progressData:c.payload.data||[]};case Re.SET_SKILL_DATA:return{...r,skills:c.payload.skills||[],skillStatistics:c.payload};case Re.CLEAR_DATA:return{...ym};case Re.REFRESH_DATA:return{...r,isStale:!0};default:return r}},xm=J.createContext(null),mp=({children:r})=>{const[c,f]=J.useReducer(dp,ym),{user:d,isAuthenticated:h}=Xl(),{data:p,loading:j,error:S,refetch:I}=Qg(V0,{variables:{userId:d?.id},skip:!h||!d?.id,errorPolicy:"all",fetchPolicy:"cache-and-network",notifyOnNetworkStatusChange:!0});J.useEffect(()=>{if(!h||!d?.id){f({type:Re.CLEAR_DATA});return}if(f({type:Re.SET_LOADING,payload:j}),S){f({type:Re.SET_ERROR,payload:S});return}if(!j&&p?.user?.[0]){const w=p.user[0];let _={},b={};try{_=typeof w.profile=="string"?JSON.parse(w.profile):w.profile||{}}catch(Ue){console.warn("Error parsing user profile JSON:",Ue)}try{b=typeof w.attrs=="string"?JSON.parse(w.attrs):w.attrs||{}}catch(Ue){console.warn("Error parsing user attrs JSON:",Ue)}const N=w.xpTransactions?.aggregate?.sum?.amount||0,R=Math.round(N/1e3),q=cp(R),B={id:w.id,login:w.login,campus:w.campus,createdAt:w.createdAt,updatedAt:w.updatedAt,profile:_,attrs:b,totalXP:R,level:q,rawData:w};if(f({type:Re.SET_USER_DATA,payload:B}),w.transactions){const Ue=pm(w.transactions);f({type:Re.SET_XP_DATA,payload:{...Ue,totalXP:R,level:q,transactions:w.transactions}})}const X=w.results_aggregate?.aggregate?.count||0,P=w.passedResults?.aggregate?.count||0;f({type:Re.SET_PROJECT_DATA,payload:{totalProjects:X,passedProjects:P,failedProjects:X-P,passRate:X>0?P/X*100:0,results:w.results||[]}});const F=w.upTransactions?.aggregate?.count||0,pe=w.downTransactions?.aggregate?.count||0,we=pe>0?F/pe:F>0?F:0;f({type:Re.SET_AUDIT_DATA,payload:{auditRatio:Math.round(we*100)/100,given:{count:w.audits_aggregate?.aggregate?.count||0,avgGrade:w.audits_aggregate?.aggregate?.avg?.grade||0},received:{count:pe},audits:w.audits||[]}})}},[h,d?.id,p,j,S]);const z={...c,loading:j,error:S,refetchAll:async()=>{f({type:Re.SET_LOADING,payload:!0});try{await I()}catch(w){f({type:Re.SET_ERROR,payload:w})}},clearData:()=>f({type:Re.CLEAR_DATA}),refreshData:()=>f({type:Re.REFRESH_DATA})};return i.jsx(xm.Provider,{value:z,children:r})},Vs=()=>{const r=J.useContext(xm);if(!r)throw new Error("useData must be used within a DataProvider");return r};function vm(r){return new Mu(function(c,f){var d=Zg(c,[]);return new Vd(function(h){var p,j=!1;return Promise.resolve(d).then(function(S){return r(S,c.getContext())}).then(c.setContext).then(function(){j||(p=f(c).subscribe({next:h.next.bind(h),error:h.error.bind(h),complete:h.complete.bind(h)}))}).catch(h.error.bind(h)),function(){j=!0,p&&p.unsubscribe()}})})}function bm(r){return new Mu(function(c,f){return new Vd(function(d){var h,p,j;try{h=f(c).subscribe({next:function(S){if(S.errors?j=r({graphQLErrors:S.errors,response:S,operation:c,forward:f}):Vg(S)&&(j=r({protocolErrors:S.extensions[kg],response:S,operation:c,forward:f})),j){p=j.subscribe({next:d.next.bind(d),error:d.error.bind(d),complete:d.complete.bind(d)});return}d.next(S)},error:function(S){if(j=r({operation:c,networkError:S,graphQLErrors:S&&S.result&&S.result.errors||void 0,forward:f}),j){p=j.subscribe({next:d.next.bind(d),error:d.error.bind(d),complete:d.complete.bind(d)});return}d.error(S)},complete:function(){j||d.complete.bind(d)()}})}catch(S){r({networkError:S,operation:c,forward:f}),d.error(S)}return function(){h&&h.unsubscribe(),p&&h.unsubscribe()}})})}(function(r){Kg(c,r);function c(f){var d=r.call(this)||this;return d.link=bm(f),d}return c.prototype.request=function(f,d){return this.link.request(f,d)},c})(Mu);const hp=()=>new Jg({typePolicies:{Query:{fields:{user:{keyArgs:["where"],merge(r,c){return c}},transaction:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},progress:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},event:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},group:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},audit:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},result:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},object:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},eventUser:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},groupUser:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},labelUser:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},match:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},objectAvailability:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},progressByPathView:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},record:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},registration:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},registrationUser:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},userRole:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},toadSessions:{keyArgs:["where","order_by"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}}}},user:{keyFields:["id"],fields:{profile:{merge:!0},attrs:{merge:!0},events:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},groups:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},groupsByCaptainid:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},labels:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},matches:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},objectAvailabilities:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},objects:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},progressesByPath:{keyArgs:["where","limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},records:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},recordsByAuthorid:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},registrations:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},user_roles:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},roles:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},sessions:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},xps:{keyArgs:["limit","offset"],merge(r=[],c,{args:f}){return f?.offset&&f.offset>0?[...r,...c]:c}},transactions:{merge:!1},results:{merge:!1},progresses:{merge:!1},transactions_aggregate:{merge:!1},progresses_aggregate:{merge:!1},results_aggregate:{merge:!1},audits_aggregate:{merge:!1},events_aggregate:{merge:!1},groups_aggregate:{merge:!1},groupsByCaptainid_aggregate:{merge:!1},labels_aggregate:{merge:!1},matches_aggregate:{merge:!1},objectAvailabilities_aggregate:{merge:!1},objects_aggregate:{merge:!1},progressesByPath_aggregate:{merge:!1},registrations_aggregate:{merge:!1},user_roles_aggregate:{merge:!1},roles_aggregate:{merge:!1},sessions_aggregate:{merge:!1}}},transaction_aggregate:{merge:!0},result_aggregate:{merge:!0},progress_aggregate:{merge:!0},audit_aggregate:{merge:!0}},possibleTypes:{},dataIdFromObject:r=>{switch(r.__typename){case"User":return`User:${r.id}`;case"Transaction":return`Transaction:${r.id}`;case"Result":return`Result:${r.id}`;case"Progress":return`Progress:${r.id}`;case"Audit":return`Audit:${r.id}`;case"Event":return`Event:${r.id}`;case"Group":return`Group:${r.id}`;case"Object":return`Object:${r.id}`;default:return null}}});class gp{constructor(){this.metrics=new Map,this.slowQueryThreshold=1e3}startQuery(c,f){const d=`${c}_${Date.now()}_${Math.random()}`;return this.metrics.set(d,{queryName:c,variables:f,startTime:performance.now(),endTime:null,duration:null,error:null}),d}endQuery(c,f=null){const d=this.metrics.get(c);if(d&&(d.endTime=performance.now(),d.duration=d.endTime-d.startTime,d.error=f,d.duration>this.slowQueryThreshold&&console.warn("Slow GraphQL query detected:",{queryName:d.queryName,duration:`${d.duration.toFixed(2)}ms`,variables:d.variables}),this.metrics.size>100)){const h=this.metrics.keys().next().value;this.metrics.delete(h)}}getStats(){const c=Array.from(this.metrics.values()).filter(h=>h.duration!==null);if(c.length===0)return{totalQueries:0,averageDuration:0,slowQueries:0};const f=c.reduce((h,p)=>h+p.duration,0),d=c.filter(h=>h.duration>this.slowQueryThreshold).length;return{totalQueries:c.length,averageDuration:f/c.length,slowQueries:d,slowQueryPercentage:d/c.length*100}}}const qu=new gp,pp=Pg({uri:T0}),yp=vm((r,{headers:c})=>{const f=O0();return{headers:{...c,...f,"Content-Type":"application/json"}}}),xp=vm((r,{headers:c})=>{const f=qu.startQuery("GraphQL Query",{});return{headers:c,queryId:f}}),vp=bm(({graphQLErrors:r,networkError:c,operation:f})=>{const d=f.getContext().queryId;if(r&&r.forEach(({message:h,locations:p,path:j,extensions:S})=>{if(console.error(`[GraphQL error]: Message: ${h}, Location: ${p}, Path: ${j}`),d&&qu.endQuery(d,h),h.includes("JWT")||h.includes("JWS")||h.includes("verify")){console.warn("JWT verification error detected, clearing auth data"),Va();return}if(S?.code==="UNAUTHENTICATED"||S?.code==="FORBIDDEN"){console.warn("Authentication error detected, clearing auth data"),Va();return}}),c&&(console.error(`[Network error]: ${c}`),d&&qu.endQuery(d,c.message),c.statusCode===401||c.statusCode===403)){console.warn("Network authentication error, clearing auth data"),Va();return}}),jm=new Wg({link:Fg([vp,xp,yp,pp]),cache:hp(),defaultOptions:{watchQuery:{errorPolicy:"all",fetchPolicy:"cache-first",notifyOnNetworkStatusChange:!0},query:{errorPolicy:"all",fetchPolicy:"cache-first"},mutate:{errorPolicy:"all"}}});jm.clearStore().catch(console.warn);const bp=()=>{const[r,c]=J.useState({identifier:"",password:""}),[f,d]=J.useState(!1),[h,p]=J.useState("username"),{login:j,isLoading:S,error:I,clearError:G}=Xl();J.useEffect(()=>{r.identifier&&p(M0(r.identifier))},[r.identifier]),J.useEffect(()=>{I&&G()},[r.identifier,r.password,I,G]);const z=b=>{const{name:N,value:R}=b.target;c(q=>({...q,[N]:R}))},w=async b=>{b.preventDefault(),!(!r.identifier.trim()||!r.password.trim())&&await j(r.identifier.trim(),r.password)},_=()=>{d(!f)};return i.jsxs("div",{className:"min-h-screen flex items-center justify-center p-4",children:[i.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900"}),i.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[i.jsx(K.div,{className:"absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl",animate:{scale:[1,1.2,1],opacity:[.3,.5,.3]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),i.jsx(K.div,{className:"absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl",animate:{scale:[1.2,1,1.2],opacity:[.5,.3,.5]},transition:{duration:10,repeat:1/0,ease:"easeInOut"}})]}),i.jsx(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"relative z-10 w-full max-w-md",children:i.jsxs("div",{className:"glass-card p-8",children:[i.jsxs("div",{className:"text-center mb-8",children:[i.jsx(K.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mx-auto mb-4",children:i.jsx(Xd,{className:"w-8 h-8 text-white"})}),i.jsx("h1",{className:"text-3xl font-bold gradient-text mb-2",children:"Welcome Back"}),i.jsx("p",{className:"text-surface-300",children:"Sign in to access your profile dashboard"})]}),I&&i.jsx(K.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg",children:i.jsx("p",{className:"text-red-300 text-sm",children:I})}),i.jsxs("form",{onSubmit:w,className:"space-y-6",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Username or Email"}),i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:h==="email"?i.jsx(kd,{className:"h-5 w-5 text-surface-400"}):i.jsx(ci,{className:"h-5 w-5 text-surface-400"})}),i.jsx("input",{type:"text",name:"identifier",value:r.identifier,onChange:z,className:"material-input pl-10 w-full",placeholder:"Enter your username or email",autoComplete:"username",required:!0,disabled:S})]})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Password"}),i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:i.jsx(t0,{className:"h-5 w-5 text-surface-400"})}),i.jsx("input",{type:f?"text":"password",name:"password",value:r.password,onChange:z,className:"material-input pl-10 pr-10 w-full",placeholder:"Enter your password",autoComplete:"current-password",required:!0,disabled:S}),i.jsx("button",{type:"button",onClick:_,className:"absolute inset-y-0 right-0 pr-3 flex items-center",disabled:S,children:f?i.jsx(a0,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"}):i.jsx(l0,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"})})]})]}),i.jsx(K.button,{type:"submit",disabled:S||!r.identifier.trim()||!r.password.trim(),className:"w-full glass-button py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed",whileHover:{scale:1.02},whileTap:{scale:.98},children:S?i.jsxs("div",{className:"flex items-center justify-center",children:[i.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"}),"Signing in..."]}):i.jsxs("div",{className:"flex items-center justify-center",children:[i.jsx(Xd,{className:"w-5 h-5 mr-2"}),"Sign In"]})})]}),i.jsx("div",{className:"mt-8 text-center",children:i.jsx("p",{className:"text-surface-400 text-sm",children:"Use your reboot01 platform credentials"})})]})})]})},qe=(...r)=>r.filter(Boolean).join(" "),M=({children:r,className:c="",hover:f=!1,animate:d=!0,onClick:h,...p})=>{const j="glass-card p-6",S=f?"card-hover cursor-pointer":"",I=d?K.div:"div",G=d?{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3}}:{};return i.jsx(I,{className:qe(j,S,c),onClick:h,...G,...p,children:r})},jp=({children:r,className:c=""})=>i.jsx("div",{className:qe("mb-4",c),children:r}),Ap=({children:r,className:c=""})=>i.jsx("h3",{className:qe("text-xl font-semibold text-white mb-2",c),children:r}),Sp=({children:r,className:c=""})=>i.jsx("p",{className:qe("text-surface-300 text-sm",c),children:r}),_p=({children:r,className:c=""})=>i.jsx("div",{className:qe("",c),children:r}),Np=({children:r,className:c=""})=>i.jsx("div",{className:qe("mt-4 pt-4 border-t border-white/10",c),children:r});M.Header=jp;M.Title=Ap;M.Description=Sp;M.Content=_p;M.Footer=Np;const Mt=({children:r,variant:c="primary",size:f="md",disabled:d=!1,loading:h=!1,className:p="",onClick:j,type:S="button",...I})=>{const G="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",z={primary:"glass-button",secondary:"bg-surface-700 hover:bg-surface-600 text-white border border-surface-600",outline:"border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white",ghost:"text-surface-300 hover:text-white hover:bg-white/10",danger:"bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"},w={sm:"px-3 py-1.5 text-sm rounded-md",md:"px-4 py-2 text-sm rounded-lg",lg:"px-6 py-3 text-base rounded-lg",xl:"px-8 py-4 text-lg rounded-xl"},_=qe(G,z[c],w[f],p);return i.jsxs(K.button,{type:S,className:_,disabled:d||h,onClick:j,whileHover:{scale:d||h?1:1.02,transition:{type:"spring",stiffness:400,damping:10}},whileTap:{scale:d||h?1:.98,transition:{type:"spring",stiffness:400,damping:10}},initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},...I,children:[h&&i.jsx(K.div,{className:"rounded-full h-4 w-4 border-b-2 border-current mr-2",animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),r]})},Qs=({size:r="md",text:c="",className:f="",fullScreen:d=!1})=>{const h={sm:"h-4 w-4",md:"h-8 w-8",lg:"h-12 w-12",xl:"h-16 w-16"},p={sm:"text-sm",md:"text-base",lg:"text-lg",xl:"text-xl"},j=i.jsx("div",{className:qe("animate-spin rounded-full border-b-2 border-primary-400",h[r])}),S=i.jsxs("div",{className:qe("flex flex-col items-center justify-center space-y-4",f),children:[j,c&&i.jsx("p",{className:qe("text-surface-300",p[r]),children:c})]});return d?i.jsx(K.div,{initial:{opacity:0},animate:{opacity:1},className:"fixed inset-0 bg-surface-900/50 backdrop-blur-sm flex items-center justify-center z-50",children:S}):S},Xs=({className:r="",...c})=>i.jsx("div",{className:qe("animate-pulse rounded-md bg-surface-700/50",r),...c}),ot=()=>i.jsxs("div",{className:"glass-card p-6 space-y-4",children:[i.jsx(Xs,{className:"h-4 w-3/4"}),i.jsx(Xs,{className:"h-4 w-1/2"}),i.jsxs("div",{className:"space-y-2",children:[i.jsx(Xs,{className:"h-3 w-full"}),i.jsx(Xs,{className:"h-3 w-5/6"}),i.jsx(Xs,{className:"h-3 w-4/6"})]})]}),Tp=({tabs:r=[],activeTab:c,onTabChange:f,className:d=""})=>i.jsx("div",{className:qe("fixed bottom-0 left-0 right-0 z-40 bg-surface-900/95 backdrop-blur-md border-t border-white/10 md:hidden",d),children:i.jsx("div",{className:"flex justify-around items-center py-2",children:r.map(h=>{const p=h.icon,j=c===h.id;return i.jsxs(K.button,{onClick:()=>f(h.id),className:qe("flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative",j?"text-primary-300":"text-surface-400 hover:text-surface-200"),whileTap:{scale:.95},children:[j&&i.jsx(K.div,{className:"absolute -top-1 w-8 h-1 bg-primary-400 rounded-full",layoutId:"activeTab",transition:{type:"spring",stiffness:500,damping:30}}),i.jsx(p,{className:"w-5 h-5 mb-1"}),i.jsx("span",{className:"text-xs font-medium truncate max-w-16",children:h.label.split(" ")[0]})]},h.id)})})}),Rp=({value:r=0,max:c=100,className:f="",showValue:d=!0,size:h="md",color:p="primary",animated:j=!0,label:S=""})=>{const I=Math.min(Math.max(r/c*100,0),100),G={sm:"h-2",md:"h-3",lg:"h-4",xl:"h-6"},z={primary:"bg-primary-500",secondary:"bg-surface-500",success:"bg-green-500",warning:"bg-yellow-500",danger:"bg-red-500",accent:"bg-accent-500"};return i.jsxs("div",{className:qe("w-full",f),children:[(S||d)&&i.jsxs("div",{className:"flex justify-between items-center mb-2",children:[S&&i.jsx("span",{className:"text-sm font-medium text-surface-200",children:S}),d&&i.jsxs("span",{className:"text-sm text-surface-300",children:[Math.round(I),"%"]})]}),i.jsx("div",{className:qe("w-full bg-surface-700/50 rounded-full overflow-hidden",G[h]),children:i.jsx(K.div,{className:qe("h-full rounded-full",z[p]),initial:j?{width:0}:{width:`${I}%`},animate:{width:`${I}%`},transition:{duration:j?1:0,ease:"easeOut"}})})]})},wp=({value:r=0,max:c=100,size:f=120,strokeWidth:d=8,className:h="",color:p="primary",showValue:j=!0,label:S=""})=>{const I=Math.min(Math.max(r/c*100,0),100),G=(f-d)/2,z=G*2*Math.PI,w=z,_=z-I/100*z,b={primary:"#14b8a6",secondary:"#64748b",success:"#10b981",warning:"#f59e0b",danger:"#ef4444",accent:"#d946ef"};return i.jsxs("div",{className:qe("relative inline-flex items-center justify-center",h),children:[i.jsxs("svg",{width:f,height:f,className:"transform -rotate-90",children:[i.jsx("circle",{cx:f/2,cy:f/2,r:G,stroke:"rgba(100, 116, 139, 0.2)",strokeWidth:d,fill:"transparent"}),i.jsx(K.circle,{cx:f/2,cy:f/2,r:G,stroke:b[p],strokeWidth:d,fill:"transparent",strokeLinecap:"round",strokeDasharray:w,initial:{strokeDashoffset:z},animate:{strokeDashoffset:_},transition:{duration:1,ease:"easeOut"}})]}),i.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:[j&&i.jsx("span",{className:"text-2xl font-bold text-white",children:Math.round(I)}),S&&i.jsx("span",{className:"text-xs text-surface-300 mt-1",children:S})]})]})},Ra=({children:r,variant:c="default",size:f="md",className:d="",animate:h=!1,...p})=>{const j="inline-flex items-center font-medium rounded-full",S={default:"bg-surface-700 text-surface-200",primary:"bg-primary-500/20 text-primary-300 border border-primary-500/30",secondary:"bg-surface-600 text-surface-200",success:"bg-green-500/20 text-green-300 border border-green-500/30",warning:"bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",danger:"bg-red-500/20 text-red-300 border border-red-500/30",accent:"bg-accent-500/20 text-accent-300 border border-accent-500/30",outline:"border border-surface-500 text-surface-300"},I={sm:"px-2 py-0.5 text-xs",md:"px-2.5 py-1 text-sm",lg:"px-3 py-1.5 text-base"},G=qe(j,S[c],I[f],d),z=h?K.span:"span",w=h?{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{type:"spring",stiffness:500,damping:30}}:{};return i.jsx(z,{className:G,...w,...p,children:r})},Up=({status:r,className:c=""})=>{const f=r==="pass"||r==="PASS"||r===!0||r>=1;return i.jsx(Ra,{variant:f?"success":"danger",className:c,animate:!0,children:f?"Pass":"Fail"})},Ep=({level:r,className:c=""})=>i.jsxs(Ra,{variant:"primary",className:c,animate:!0,children:["Level ",r]}),Dp=({xp:r,className:c=""})=>i.jsxs(Ra,{variant:"accent",className:c,animate:!0,children:[r.toLocaleString()," XP"]}),Op=({user:r,size:c="md",className:f="",showBorder:d=!1,animate:h=!0,onClick:p,...j})=>{const[S,I]=J.useState(!1),G=F0(r),z=oi(r),w={xs:"w-6 h-6",sm:"w-8 h-8",md:"w-12 h-12",lg:"w-16 h-16",xl:"w-24 h-24","2xl":"w-32 h-32"},_={xs:"w-3 h-3",sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8",xl:"w-12 h-12","2xl":"w-16 h-16"},b=qe("rounded-full flex items-center justify-center overflow-hidden",w[c],d&&"border-2 border-primary-400",p&&"cursor-pointer hover:opacity-80 transition-opacity",f),N=h?K.div:"div",R=h?{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.2},whileHover:p?{scale:1.05}:void 0,whileTap:p?{scale:.95}:void 0}:{},q=()=>{I(!0)};return i.jsx(N,{className:b,onClick:p,title:z,...R,...j,children:G&&!S?i.jsx("img",{src:G,alt:`${z}'s avatar`,className:"w-full h-full object-cover",onError:q,loading:"lazy"}):i.jsx("div",{className:"w-full h-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center",children:i.jsx(ci,{className:qe("text-white",_[c])})})})},qp=()=>{const{userData:r,xpData:c,projectData:f,auditData:d,loading:h}=Vs(),p=r?.profile||{},j=r?.attrs||{},S=j.firstName||p.firstName||"",I=j.lastName||p.lastName||"",z=(S&&I?`${S} ${I}`:"")||r?.login||"Unknown User";r?.login;const w=j.email||p.email||"No email provided",_=r?.campus||"Unknown Campus",b=r?.createdAt,N=r?.totalXP||0,R=r?.level||0,q=fp(N,R);f?.totalProjects;const B=f?.passedProjects||0;f?.failedProjects;const X=f?.passRate||0,P=d?.auditRatio||0,F=d?.given?.count||0,pe=d?.received?.count||0;return d?.given?.avgGrade,h?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[i.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[i.jsx(ot,{}),i.jsx(ot,{})]}),i.jsxs("div",{className:"space-y-6",children:[i.jsx(ot,{}),i.jsx(ot,{}),i.jsx(ot,{})]})]}):i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[i.jsx("div",{className:"lg:col-span-2",children:i.jsxs(M,{className:"h-full",children:[i.jsx(M.Header,{children:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsx(M.Title,{children:"User Profile"}),i.jsx(Ep,{level:R})]})}),i.jsx(M.Content,{children:i.jsxs("div",{className:"flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8",children:[i.jsx("div",{className:"flex-shrink-0",children:i.jsx(Op,{user:r,size:"xl",showBorder:!0,animate:!0})}),i.jsxs("div",{className:"flex-1 space-y-4",children:[i.jsxs("div",{children:[i.jsx("h2",{className:"text-2xl font-bold text-white mb-1",children:z}),i.jsxs("p",{className:"text-surface-300",children:["@",r?.login||"unknown"]})]}),i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(kd,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm",children:w})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(s0,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm",children:_})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(Kd,{className:"w-4 h-4"}),i.jsxs("span",{className:"text-sm",children:["Joined ",Ou(r?.createdAt)]})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(di,{className:"w-4 h-4"}),i.jsxs("span",{className:"text-sm",children:["Started ",Ou(b)]})]})]}),i.jsxs("div",{className:"flex flex-wrap gap-2",children:[i.jsx(Dp,{xp:N}),i.jsxs(Ra,{variant:"primary",children:[B," / ",f?.totalProjects||0," Projects"]}),i.jsxs(Ra,{variant:"accent",children:["Audit Ratio: ",P.toFixed(2)]}),X>0&&i.jsxs(Ra,{variant:"success",children:[X.toFixed(1),"% Success Rate"]})]})]})]})})]})}),i.jsxs("div",{className:"space-y-6",children:[i.jsxs(M,{children:[i.jsxs(M.Header,{children:[i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(Ls,{className:"w-5 h-5 mr-2"}),"User Level"]}),i.jsx(M.Description,{children:"Apprentice developer"})]}),i.jsxs(M.Content,{className:"flex flex-col items-center",children:[i.jsx(wp,{value:q.percentage||0,max:100,size:120,color:"primary",label:`Level ${R}`}),i.jsxs("p",{className:"text-sm text-surface-300 mt-4 text-center",children:[Ta(q.required-q.current)," XP to next level"]})]})]}),i.jsxs(M,{children:[i.jsx(M.Header,{children:i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(n0,{className:"w-5 h-5 mr-2"}),"Audits Ratio"]})}),i.jsx(M.Content,{children:i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Done"}),i.jsx("span",{className:"text-primary-300 font-semibold",children:F})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Received"}),i.jsx("span",{className:"text-primary-300 font-semibold",children:pe})]}),i.jsxs("div",{className:"text-center pt-4 border-t border-white/10",children:[i.jsx("div",{className:"text-3xl font-bold text-primary-300",children:P.toFixed(1)}),i.jsx("p",{className:"text-sm text-surface-400",children:"Best ratio ever!"})]})]})})]}),i.jsxs(M,{children:[i.jsx(M.Header,{children:i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(Jd,{className:"w-5 h-5 mr-2"}),"Quick Stats"]})}),i.jsx(M.Content,{children:i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Total XP"}),i.jsx("span",{className:"text-white font-semibold",children:Ta(N)})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Projects Passed"}),i.jsx("span",{className:"text-green-400 font-semibold",children:B})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Success Rate"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[X.toFixed(1),"%"]})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Audits Given"}),i.jsx("span",{className:"text-accent-300 font-semibold",children:F})]})]})})]})]})]})},Mp=()=>{const[r,{data:c,loading:f,error:d}]=fi(k0,{errorPolicy:"all"});return{searchUsers:p=>{p.trim()&&r({variables:{searchTerm:`%${p}%`}})},users:c?.user||[],loading:f,error:d}},$p=()=>{const{user:r,isAuthenticated:c}=Xl(),[f,d]=Pt.useState([]),[h,p]=Pt.useState(!1),[j,S]=Pt.useState(null),[I]=fi(K0,{errorPolicy:"all",onCompleted:b=>{const N=G(b);d(N),p(!1)},onError:b=>{S(b),p(!1)}}),G=b=>{if(!b)return[];const N=b.results||[],R=b.progress||[];return[...N,...R].map(B=>{const X=z(B);return{...B,status:X,type:B.isDone!==void 0?"progress":"result"}}).sort((B,X)=>new Date(X.updatedAt)-new Date(B.updatedAt))},z=b=>{const N=new Date,R=new Date(b.updatedAt),q=new Date(b.createdAt),B=(N-R)/(1e3*60*60*24),X=(N-q)/(1e3*60*60*24);return b.grade>=1?"finished":X<=7&&b.grade===0?"setup":b.grade===0&&B<=3?"audit":(b.grade===0&&B<=30,"working")};return{searchResults:f,searchProjects:(b="",N="all",R={})=>{if(!c||!r?.id)return;p(!0),S(null);const{limit:q=20,offset:B=0}=R;I({variables:{userId:r.id,status:N,searchTerm:`%${b}%`,limit:q,offset:B}})},filterByStatus:b=>b==="all"?f:f.filter(N=>N.status===b),loading:h,error:j,statusCounts:{all:f.length,working:f.filter(b=>b.status==="working").length,audit:f.filter(b=>b.status==="audit").length,setup:f.filter(b=>b.status==="setup").length,finished:f.filter(b=>b.status==="finished").length}}},Ip=()=>{const{user:r,isAuthenticated:c}=Xl(),[f,d]=Pt.useState([]),[h,p]=Pt.useState(!1),[j,S]=Pt.useState(null),[I]=fi(J0,{errorPolicy:"all",onCompleted:N=>{const R=G(N);d(R),p(!1)},onError:N=>{S(N),p(!1)}}),G=N=>{if(!N)return[];const R=(N.audits_given||[]).map(B=>({...B,type:"given",status:z(B)})),q=(N.audits_received||[]).map(B=>({...B,type:"received",status:z(B)}));return[...R,...q].sort((B,X)=>new Date(X.createdAt)-new Date(B.createdAt))},z=N=>{const R=new Date,q=new Date(N.createdAt),B=N.endAt?new Date(N.endAt):null,X=(R-q)/(1e3*60*60*24);return B?"finished":X<=1?"setup":!B&&X<=7?"working":"audit"};return{searchResults:f,searchAudits:(N="",R="all",q={})=>{if(!c||!r?.id)return;p(!0),S(null);const{limit:B=20,offset:X=0}=q;I({variables:{userId:r.id,status:R,searchTerm:`%${N}%`,limit:B,offset:X}})},filterByStatus:N=>N==="all"?f:f.filter(R=>R.status===N),filterByType:N=>N==="all"?f:f.filter(R=>R.type===N),loading:h,error:j,statusCounts:{all:f.length,working:f.filter(N=>N.status==="working").length,audit:f.filter(N=>N.status==="audit").length,setup:f.filter(N=>N.status==="setup").length,finished:f.filter(N=>N.status==="finished").length},typeCounts:{all:f.length,given:f.filter(N=>N.type==="given").length,received:f.filter(N=>N.type==="received").length}}},Gp=()=>{const[r,c]=Pt.useState([]),[f,d]=Pt.useState(!1),[h,p]=Pt.useState(null),[j]=fi(P0,{errorPolicy:"all",onCompleted:_=>{const b=S(_);c(b),d(!1)},onError:_=>{p(_),d(!1)}}),S=_=>_?.users?_.users.map(b=>{const N=I(b),R=b.recent_transactions?.reduce((B,X)=>B+X.amount,0)||0,q=b.recent_results?.length>0;return{...b,status:N,totalXP:R,recentActivity:q,lastActive:b.recent_results?.[0]?.updatedAt||b.updatedAt}}):[],I=_=>{const b=new Date,N=new Date(_.updatedAt),R=(b-N)/(1e3*60*60*24),q=_.recent_results||[];if(q.some(pe=>{const we=new Date(pe.updatedAt);return(b-we)/(1e3*60*60*24)<=7}))return"working";const X=new Date(_.createdAt);return(b-X)/(1e3*60*60*24)<=30&&q.length<=2?"setup":q.length>0&&R<=30?"audit":q.filter(pe=>pe.grade>=1).length>=3?"finished":"working"};return{searchResults:r,searchUsers:(_="",b="all",N="",R={})=>{d(!0),p(null);const{limit:q=20,offset:B=0}=R;j({variables:{searchTerm:`%${_}%`,status:b,campus:N?`%${N}%`:"%",limit:q,offset:B}})},filterByStatus:_=>_==="all"?r:r.filter(b=>b.status===_),filterByCampus:_=>!_||_==="all"?r:r.filter(b=>b.campus&&b.campus.toLowerCase().includes(_.toLowerCase())),loading:f,error:h,statusCounts:{all:r.length,working:r.filter(_=>_.status==="working").length,audit:r.filter(_=>_.status==="audit").length,setup:r.filter(_=>_.status==="setup").length,finished:r.filter(_=>_.status==="finished").length},campuses:[...new Set(r.map(_=>_.campus).filter(Boolean))]}},zp=({result:r,type:c})=>{const f=j=>{switch(j){case"working":return"text-blue-400 bg-blue-400/10";case"audit":return"text-yellow-400 bg-yellow-400/10";case"setup":return"text-purple-400 bg-purple-400/10";case"finished":return"text-green-400 bg-green-400/10";default:return"text-surface-400 bg-surface-400/10"}},d=j=>{switch(j){case"working":return di;case"audit":return Pd;case"setup":return Wd;case"finished":return $u;default:return Ys}},h=j=>new Date(j).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"}),p=d(r.status);return i.jsxs(K.div,{className:"flex items-center justify-between p-4 bg-surface-800 rounded-lg hover:bg-surface-700 transition-colors duration-200",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},children:[i.jsx("div",{className:"flex-1",children:i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx(p,{className:`w-4 h-4 ${f(r.status).split(" ")[0]}`}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white",children:c==="users"?r.login:r.object?.name||r.path?.split("/").pop()||"Unknown"}),i.jsx("p",{className:"text-sm text-surface-400",children:c==="users"?r.campus||"No campus":r.path||"No path"})]})]})}),i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${f(r.status)}`,children:r.status}),c==="projects"&&i.jsxs("span",{className:"text-sm text-surface-300",children:["Grade: ",r.grade||0]}),c==="audits"&&i.jsx("span",{className:"text-sm text-surface-300",children:r.type==="given"?"Given":"Received"}),c==="users"&&r.totalXP&&i.jsxs("span",{className:"text-sm text-surface-300",children:[r.totalXP," XP"]}),i.jsx("span",{className:"text-xs text-surface-500",children:h(r.updatedAt||r.createdAt)})]})]})},Bp=()=>{const[r,c]=J.useState("projects"),[f,d]=J.useState(""),[h,p]=J.useState("all"),[j,S]=J.useState(""),[I,G]=J.useState({cohort:"All Cohorts",status:"Working"}),[z,w]=J.useState({username:"",status:"Working"}),[_,b]=J.useState({cohort:"All Cohorts",limit:"0"}),{searchResults:N,searchProjects:R,filterByStatus:q,statusCounts:B,loading:X}=$p(),{searchResults:P,searchAudits:F,filterByStatus:pe,statusCounts:we,loading:Ue}=Ip(),{searchResults:et,searchUsers:Ft,filterByStatus:Ka,statusCounts:ea,campuses:Ve,loading:Ja}=Gp(),{searchUsers:wa,users:ft,loading:E}=Mp(),C=[{value:"all",label:"All Status",icon:Ys,color:"text-surface-400"},{value:"working",label:"Working",icon:di,color:"text-blue-400"},{value:"audit",label:"In Audit",icon:Pd,color:"text-yellow-400"},{value:"setup",label:"Setup",icon:Wd,color:"text-purple-400"},{value:"finished",label:"Finished",icon:$u,color:"text-green-400"}],V=[{value:"projects",label:"Projects",icon:Ls},{value:"audits",label:"Audits",icon:Eu},{value:"users",label:"Users",icon:At}],fe=["All Cohorts","Cohort 1","Cohort 2","Cohort 3","Cohort 4"],re=()=>{if(!(!f.trim()&&h==="all"))switch(r){case"projects":R(f,h);break;case"audits":F(f,h);break;case"users":Ft(f,h,j);break}},Ce=L=>{p(L),setTimeout(()=>{re()},100)},xe=L=>{c(L),d(""),p("all")},ie=()=>{console.log("Group search - legacy")},Ee=()=>{f.trim()&&wa(f)},dt=()=>{console.log("Ranking search - legacy")},Tt=()=>{switch(r){case"projects":return h==="all"?N:q(h);case"audits":return h==="all"?P:pe(h);case"users":return h==="all"?et:Ka(h);default:return[]}},Pa=()=>{switch(r){case"projects":return X;case"audits":return Ue;case"users":return Ja;default:return!1}},Wa=()=>{switch(r){case"projects":return B;case"audits":return we;case"users":return ea;default:return{all:0,working:0,audit:0,setup:0,finished:0}}},Rt=Tt(),ta=Pa(),Fa=Wa();return i.jsxs("div",{className:"space-y-6",children:[i.jsxs(M,{children:[i.jsxs(M.Header,{children:[i.jsxs(M.Title,{className:"flex items-center text-primary-300",children:[i.jsx(At,{className:"w-5 h-5 mr-2"}),"Enhanced Search with Status Filtering"]}),i.jsx(M.Description,{children:"Search projects, audits, and users with selective status filtering: working, audit, setup, finished"})]}),i.jsxs(M.Content,{className:"space-y-6",children:[i.jsx("div",{className:"flex space-x-1 bg-surface-800 p-1 rounded-lg",children:V.map(L=>{const _e=L.icon;return i.jsxs("button",{onClick:()=>xe(L.value),className:`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${r===L.value?"bg-primary-500 text-white shadow-lg":"text-surface-300 hover:text-white hover:bg-surface-700"}`,children:[i.jsx(_e,{className:"w-4 h-4 mr-2"}),L.label]},L.value)})}),i.jsxs("div",{className:"flex space-x-4",children:[i.jsxs("div",{className:"flex-1",children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Search Term"}),i.jsxs("div",{className:"relative",children:[i.jsx(At,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",value:f,onChange:L=>d(L.target.value),onKeyDown:L=>L.key==="Enter"&&re(),placeholder:`Search ${r}...`,className:"material-input pl-10 w-full"})]})]}),r==="users"&&i.jsxs("div",{className:"w-48",children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Campus"}),i.jsxs("select",{value:j,onChange:L=>S(L.target.value),className:"material-input w-full",children:[i.jsx("option",{value:"",children:"All Campuses"}),Ve.map(L=>i.jsx("option",{value:L,children:L},L))]})]})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-3",children:"Filter by Status"}),i.jsx("div",{className:"flex flex-wrap gap-2",children:C.map(L=>{const _e=L.icon,el=Fa[L.value]||0,Hl=h===L.value;return i.jsxs(K.button,{onClick:()=>Ce(L.value),className:`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${Hl?"bg-primary-500 text-white shadow-lg":"bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-white"}`,whileHover:{scale:1.05},whileTap:{scale:.95},children:[i.jsx(_e,{className:`w-4 h-4 mr-2 ${Hl?"text-white":L.color}`}),L.label,el>0&&i.jsx("span",{className:`ml-2 px-2 py-0.5 rounded-full text-xs ${Hl?"bg-white/20":"bg-surface-600"}`,children:el})]},L.value)})})]}),i.jsx("div",{className:"flex justify-end",children:i.jsx(Mt,{onClick:re,disabled:ta,className:"px-6",children:ta?i.jsxs(i.Fragment,{children:[i.jsx(Qs,{className:"w-4 h-4 mr-2"}),"Searching..."]}):i.jsxs(i.Fragment,{children:[i.jsx(At,{className:"w-4 h-4 mr-2"}),"Search ",r]})})})]})]}),(Rt.length>0||ta)&&i.jsxs(M,{children:[i.jsx(M.Header,{children:i.jsxs(M.Title,{className:"flex items-center justify-between",children:[i.jsx("span",{children:"Search Results"}),i.jsxs("span",{className:"text-sm text-surface-400",children:[Rt.length," ",r," found"]})]})}),i.jsx(M.Content,{children:ta?i.jsxs("div",{className:"flex items-center justify-center py-8",children:[i.jsx(Qs,{className:"w-6 h-6 mr-2"}),i.jsxs("span",{children:["Searching ",r,"..."]})]}):i.jsx("div",{className:"space-y-3 max-h-96 overflow-y-auto",children:Rt.map((L,_e)=>i.jsx(zp,{result:L,type:r},L.id||_e))})})]}),i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsxs(M,{children:[i.jsx(M.Header,{children:i.jsxs(M.Title,{className:"flex items-center text-primary-300",children:[i.jsx(Eu,{className:"w-5 h-5 mr-2"}),"Group Search"]})}),i.jsxs(M.Content,{className:"space-y-4",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Select Cohort"}),i.jsx("div",{className:"relative",children:i.jsx("select",{value:I.cohort,onChange:L=>G(_e=>({..._e,cohort:L.target.value})),className:"material-input w-full appearance-none",children:fe.map(L=>i.jsx("option",{value:L,className:"bg-surface-800",children:L},L))})})]}),i.jsx("div",{children:i.jsx("input",{type:"text",value:I.status,onChange:L=>G(_e=>({..._e,status:L.target.value})),className:"material-input w-full",placeholder:"Status"})}),i.jsxs(Mt,{onClick:ie,className:"w-full",children:[i.jsx(At,{className:"w-4 h-4 mr-2"}),"Search"]})]})]}),i.jsxs(M,{children:[i.jsx(M.Header,{children:i.jsxs(M.Title,{className:"flex items-center text-primary-300",children:[i.jsx(At,{className:"w-5 h-5 mr-2"}),"User Advance Search"]})}),i.jsxs(M.Content,{className:"space-y-4",children:[i.jsx("div",{children:i.jsx("input",{type:"text",value:z.username,onChange:L=>w(_e=>({..._e,username:L.target.value})),className:"material-input w-full",placeholder:"Username"})}),i.jsx("div",{children:i.jsx("input",{type:"text",value:z.status,onChange:L=>w(_e=>({..._e,status:L.target.value})),className:"material-input w-full",placeholder:"Status"})}),i.jsxs(Mt,{onClick:Ee,className:"w-full",loading:E,children:[i.jsx(At,{className:"w-4 h-4 mr-2"}),"Search"]}),ft.length>0&&i.jsxs("div",{className:"mt-4 space-y-2",children:[i.jsx("h4",{className:"text-sm font-medium text-surface-200",children:"Results:"}),ft.map(L=>i.jsxs(K.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"p-3 bg-surface-800/50 rounded-lg",children:[i.jsx("p",{className:"text-white font-medium",children:L.login}),(L.firstName||L.lastName)&&i.jsxs("p",{className:"text-surface-300 text-sm",children:[L.firstName," ",L.lastName]})]},L.id))]})]})]}),i.jsxs(M,{children:[i.jsx(M.Header,{children:i.jsxs(M.Title,{className:"flex items-center text-primary-300",children:[i.jsx(Ls,{className:"w-5 h-5 mr-2"}),"Ranking Search"]})}),i.jsxs(M.Content,{className:"space-y-4",children:[i.jsx("div",{children:i.jsx("input",{type:"number",value:_.limit,onChange:L=>b(_e=>({..._e,limit:L.target.value})),className:"material-input w-full",placeholder:"0",min:"0"})}),i.jsx("div",{children:i.jsx("select",{value:_.cohort,onChange:L=>b(_e=>({..._e,cohort:L.target.value})),className:"material-input w-full appearance-none",children:fe.map(L=>i.jsx("option",{value:L,className:"bg-surface-800",children:L},L))})}),i.jsxs(Mt,{onClick:dt,className:"w-full",children:[i.jsx(Ls,{className:"w-4 h-4 mr-2"}),"Search Rankings"]})]})]}),i.jsxs(M,{className:"xl:col-span-3",children:[i.jsx(M.Header,{children:i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(Ys,{className:"w-5 h-5 mr-2"}),"Search Tips"]})}),i.jsx(M.Content,{children:i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"Group Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Search for groups by cohort and status. Filter by working status to find active groups."})]}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"User Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Find specific users by username. Add status filters to narrow down results."})]}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"Ranking Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"View top performers by cohort. Set a limit to see top N users or leave as 0 for all."})]})]})})]})]})]})},Cp=({data:r=[],width:c=600,height:f=300,className:d=""})=>{const h={top:20,right:30,bottom:40,left:60},p=c-h.left-h.right,j=f-h.top-h.bottom,S=J.useMemo(()=>{if(!r||r.length===0){const R=[];let q=0;for(let B=0;B<12;B++){const X=Math.floor(Math.random()*500)+100;q+=X,R.push({date:new Date(2024,B,1).toISOString().split("T")[0],amount:X,cumulative:q})}return R}return r},[r]),{xScale:I,yScale:G,maxY:z}=J.useMemo(()=>{if(S.length===0)return{xScale:()=>0,yScale:()=>0,maxY:0};const R=Math.max(...S.map(F=>F.cumulative)),q=new Date(Math.min(...S.map(F=>new Date(F.date)))),B=new Date(Math.max(...S.map(F=>new Date(F.date))));return{xScale:F=>(new Date(F)-q)/(B-q)*p,yScale:F=>j-F/R*j,maxY:R}},[S,p,j]),w=J.useMemo(()=>S.length===0?"":S.map((R,q)=>{const B=I(R.date),X=G(R.cumulative);return`${q===0?"M":"L"} ${B} ${X}`}).join(" "),[S,I,G]),_=J.useMemo(()=>{if(S.length===0)return"";const R=w,q=S[0],B=S[S.length-1];return`${R} L ${I(B.date)} ${j} L ${I(q.date)} ${j} Z`},[w,S,I,j]),b=J.useMemo(()=>{const q=[];for(let B=0;B<=5;B++){const X=z/5*B;q.push({value:Math.round(X),y:G(X)})}return q},[z,G]),N=J.useMemo(()=>{if(S.length===0)return[];const R=Math.min(6,S.length),q=Math.floor(S.length/R),B=[];for(let X=0;X<S.length;X+=q){const P=S[X];B.push({label:new Date(P.date).toLocaleDateString("en-US",{month:"short"}),x:I(P.date)})}return B},[S,I]);return i.jsx("div",{className:`w-full ${d}`,children:i.jsxs("svg",{width:c,height:f,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.3"}),i.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.05"})]}),i.jsxs("filter",{id:"glow",children:[i.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsxs("g",{transform:`translate(${h.left}, ${h.top})`,children:[b.map((R,q)=>i.jsx("line",{x1:0,y1:R.y,x2:p,y2:R.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},q)),i.jsx(K.path,{d:_,fill:"url(#xpGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),i.jsx(K.path,{d:w,fill:"none",stroke:"#14b8a6",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),S.map((R,q)=>i.jsx(K.circle,{cx:I(R.date),cy:G(R.cumulative),r:"4",fill:"#14b8a6",stroke:"#ffffff",strokeWidth:"2",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:.1*q},className:"cursor-pointer hover:r-6 transition-all",children:i.jsx("title",{children:`${new Date(R.date).toLocaleDateString()}: ${R.cumulative.toLocaleString()} XP`})},q)),i.jsx("line",{x1:0,y1:0,x2:0,y2:j,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),i.jsx("line",{x1:0,y1:j,x2:p,y2:j,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),b.map((R,q)=>i.jsx("text",{x:-10,y:R.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.value.toLocaleString()},q)),N.map((R,q)=>i.jsx("text",{x:R.x,y:j+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.label},q)),i.jsx("text",{x:p/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"XP Progress Over Time"}),i.jsx("text",{x:-40,y:j/2,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",transform:`rotate(-90, -40, ${j/2})`,children:"Experience Points"})]})]})})},Xp=({passedProjects:r=15,failedProjects:c=3,size:f=200,className:d=""})=>{const h=r+c,p=f/2-20,j=f/2,{passedPath:S,failedPath:I}=J.useMemo(()=>{if(h===0)return{passedAngle:0,failedAngle:0,passedPath:"",failedPath:""};const _=r/h*360,b=c/h*360,N=(B,X,P,F)=>{const pe=G(F,F,P,X),we=G(F,F,P,B),Ue=X-B<=180?"0":"1";return["M",F,F,"L",pe.x,pe.y,"A",P,P,0,Ue,0,we.x,we.y,"Z"].join(" ")},R=N(0,_,p,j),q=N(_,_+b,p,j);return{passedAngle:_,failedAngle:b,passedPath:R,failedPath:q}},[r,c,h,p,j]);function G(_,b,N,R){const q=(R-90)*Math.PI/180;return{x:_+N*Math.cos(q),y:b+N*Math.sin(q)}}const z=h>0?Math.round(r/h*100):0,w=h>0?Math.round(c/h*100):0;return h===0?i.jsx("div",{className:`flex items-center justify-center ${d}`,style:{width:f,height:f},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"w-16 h-16 border-4 border-surface-600 rounded-full mx-auto mb-2"}),i.jsx("p",{className:"text-sm",children:"No project data"})]})}):i.jsxs("div",{className:`relative ${d}`,style:{width:f,height:f},children:[i.jsxs("svg",{width:f,height:f,className:"transform -rotate-90",children:[i.jsx("defs",{children:i.jsxs("filter",{id:"pieGlow",children:[i.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),i.jsx(K.path,{d:S,fill:"#10b981",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.2},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`Passed: ${r} projects (${z}%)`})}),i.jsx(K.path,{d:I,fill:"#ef4444",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`Failed: ${c} projects (${w}%)`})}),i.jsx("circle",{cx:j,cy:j,r:p*.6,fill:"rgba(15, 23, 42, 0.9)",stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"})]}),i.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center text-center",children:[i.jsxs("div",{className:"text-2xl font-bold text-white",children:[z,"%"]}),i.jsx("div",{className:"text-xs text-surface-300 mt-1",children:"Success Rate"})]}),i.jsxs("div",{className:"absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 text-xs",children:[i.jsxs("div",{className:"flex items-center space-x-1",children:[i.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"}),i.jsxs("span",{className:"text-surface-300",children:["Passed (",r,")"]})]}),i.jsxs("div",{className:"flex items-center space-x-1",children:[i.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),i.jsxs("span",{className:"text-surface-300",children:["Failed (",c,")"]})]})]})]})},Hp=({auditsGiven:r=24,auditsReceived:c=12,width:f=400,height:d=250,className:h=""})=>{const p={top:20,right:30,bottom:60,left:60},j=f-p.left-p.right,S=d-p.top-p.bottom,I=[{label:"Audits Given",value:r,color:"#14b8a6"},{label:"Audits Received",value:c,color:"#d946ef"}],G=Math.max(...I.map(R=>R.value)),z=j/I.length*.6,w=j/I.length,_=J.useCallback(R=>S-R/G*S,[S,G]),b=J.useMemo(()=>{const q=[];for(let B=0;B<=5;B++){const X=Math.round(G/5*B);q.push({value:X,y:_(X)})}return q},[G,_]),N=c>0?(r/c).toFixed(1):"∞";return i.jsx("div",{className:`w-full ${h}`,children:i.jsxs("svg",{width:f,height:d,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"givenGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.4"})]}),i.jsxs("linearGradient",{id:"receivedGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#d946ef",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"#d946ef",stopOpacity:"0.4"})]}),i.jsxs("filter",{id:"barGlow",children:[i.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsxs("g",{transform:`translate(${p.left}, ${p.top})`,children:[b.map((R,q)=>i.jsx("line",{x1:0,y1:R.y,x2:j,y2:R.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},q)),I.map((R,q)=>{const B=q*w+(w-z)/2,X=S-_(R.value),P=q===0?"givenGradient":"receivedGradient";return i.jsxs("g",{children:[i.jsx(K.rect,{x:B,y:_(R.value),width:z,height:X,fill:`url(#${P})`,stroke:R.color,strokeWidth:"2",rx:"4",filter:"url(#barGlow)",initial:{height:0,y:S},animate:{height:X,y:_(R.value)},transition:{duration:1,delay:q*.2,ease:"easeOut"},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`${R.label}: ${R.value}`})}),i.jsx(K.text,{x:B+z/2,y:_(R.value)-8,textAnchor:"middle",fill:"white",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:q*.2+.5},children:R.value}),i.jsx("text",{x:B+z/2,y:S+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.label.split(" ")[0]}),i.jsx("text",{x:B+z/2,y:S+35,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.label.split(" ")[1]})]},q)}),i.jsx("line",{x1:0,y1:0,x2:0,y2:S,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),i.jsx("line",{x1:0,y1:S,x2:j,y2:S,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),b.map((R,q)=>i.jsx("text",{x:-10,y:R.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.value},q)),i.jsx("text",{x:j/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"Audit Statistics"}),i.jsxs("g",{transform:`translate(${j-80}, 20)`,children:[i.jsx("rect",{x:0,y:0,width:80,height:40,fill:"rgba(255, 255, 255, 0.1)",stroke:"rgba(255, 255, 255, 0.2)",strokeWidth:"1",rx:"4"}),i.jsx("text",{x:40,y:15,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"10",fontFamily:"Inter, sans-serif",children:"Ratio"}),i.jsx("text",{x:40,y:32,textAnchor:"middle",fill:"#14b8a6",fontSize:"16",fontWeight:"700",fontFamily:"Inter, sans-serif",children:N})]})]})]})})},Lp=({data:r=[],width:c=600,height:f=400,maxBars:d=15,className:h=""})=>{const p=J.useMemo(()=>{if(!r||r.length===0)return[];const w=r.slice(0,d),_=Math.max(...w.map(b=>b.totalXP));return w.map((b,N)=>({...b,percentage:b.totalXP/_*100,index:N}))},[r,d]),j={top:20,right:80,bottom:40,left:200},S=c-j.left-j.right,I=f-j.top-j.bottom,G=Math.max(20,I/Math.max(p.length,1)-4),z=(w,_=25)=>w?w.length>_?`${w.substring(0,_)}...`:w:"Unknown Project";return p.length?i.jsx("div",{className:h,children:i.jsxs("svg",{width:c,height:f,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpBarGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(147, 51, 234)",stopOpacity:"0.9"})]}),i.jsx("filter",{id:"barShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:i.jsx("feDropShadow",{dx:"2",dy:"2",stdDeviation:"3",floodOpacity:"0.3"})})]}),i.jsxs("text",{x:c/2,y:15,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:["XP Earned by Project (Top ",p.length,")"]}),i.jsxs("g",{transform:`translate(${j.left}, ${j.top})`,children:[[0,25,50,75,100].map(w=>i.jsxs("g",{children:[i.jsx("line",{x1:w/100*S,y1:0,x2:w/100*S,y2:I,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsxs("text",{x:w/100*S,y:I+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:[w,"%"]})]},w)),p.map((w,_)=>{const b=_*(G+4),N=w.percentage/100*S;return i.jsxs("g",{children:[i.jsx("text",{x:-10,y:b+G/2,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-200 text-xs font-medium",children:z(w.name)}),i.jsx("rect",{x:0,y:b,width:S,height:G,fill:"rgb(30, 41, 59)",rx:"4"}),i.jsx(K.rect,{x:0,y:b,width:N,height:G,fill:"url(#xpBarGradient)",filter:"url(#barShadow)",rx:"4",initial:{width:0},animate:{width:N},transition:{duration:.8,delay:_*.1,ease:"easeOut"}}),i.jsxs(K.text,{x:N+8,y:b+G/2,dominantBaseline:"middle",className:"fill-surface-100 text-xs font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:_*.1+.3},children:[Ta(w.totalXP)," XP"]}),i.jsx(K.rect,{x:0,y:b,width:S,height:G,fill:"transparent",className:"cursor-pointer",whileHover:{fill:"rgba(59, 130, 246, 0.1)"},transition:{duration:.2}})]},w.path||_)}),i.jsx("text",{x:-180,y:I/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -180, ${I/2})`,className:"fill-surface-300 text-sm font-medium",children:"Projects"}),i.jsx("text",{x:S/2,y:I+35,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Relative XP Distribution (%)"})]}),i.jsxs("g",{transform:`translate(${c-70}, 30)`,children:[i.jsx("rect",{x:0,y:0,width:12,height:8,fill:"url(#xpBarGradient)",rx:"2"}),i.jsx("text",{x:18,y:6,dominantBaseline:"middle",className:"fill-surface-300 text-xs",children:"XP Earned"})]})]})}):i.jsx("div",{className:`flex items-center justify-center ${h}`,style:{width:c,height:f},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"📊"}),i.jsx("div",{children:"No project data available"})]})})},Yp=({data:r=[],width:c=700,height:f=400,className:d=""})=>{const h=J.useMemo(()=>{if(!r||r.length===0)return{points:[],maxXP:0,dateRange:null};const b=[...r].sort((B,X)=>new Date(B.date)-new Date(X.date)),N=Math.max(...b.map(B=>B.cumulativeXP)),R=new Date(b[0].date),q=new Date(b[b.length-1].date);return{points:b,maxXP:N,dateRange:{min:R,max:q}}},[r]),p={top:30,right:60,bottom:60,left:80},j=c-p.left-p.right,S=f-p.top-p.bottom,I=b=>Ou(b,{month:"short",day:"numeric",year:"2-digit"}),G=b=>b.length===0?"":b.map((R,q)=>{const B=(new Date(R.date)-h.dateRange.min)/(h.dateRange.max-h.dateRange.min)*j,X=S-R.cumulativeXP/h.maxXP*S;return q===0?`M ${B} ${X}`:`L ${B} ${X}`}).join(" "),z=b=>{if(b.length===0)return"";const N=G(b),R=b[b.length-1],q=(new Date(R.date)-h.dateRange.min)/(h.dateRange.max-h.dateRange.min)*j;return`${N} L ${q} ${S} L 0 ${S} Z`};if(!h.points.length)return i.jsx("div",{className:`flex items-center justify-center ${d}`,style:{width:c,height:f},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"📈"}),i.jsx("div",{children:"No timeline data available"})]})});const w=G(h.points),_=z(h.points);return i.jsx("div",{className:d,children:i.jsxs("svg",{width:c,height:f,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpTimelineGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.3"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.05"})]}),i.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)"}),i.jsx("stop",{offset:"50%",stopColor:"rgb(147, 51, 234)"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(236, 72, 153)"})]}),i.jsxs("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[i.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsx("text",{x:c/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"XP Progression Over Time"}),i.jsxs("g",{transform:`translate(${p.left}, ${p.top})`,children:[[0,.25,.5,.75,1].map(b=>{const N=S-b*S,R=b*h.maxXP;return i.jsxs("g",{children:[i.jsx("line",{x1:0,y1:N,x2:j,y2:N,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsx("text",{x:-10,y:N,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-400 text-xs",children:Ta(R)})]},b)}),h.dateRange&&[0,.25,.5,.75,1].map(b=>{const N=b*j,R=new Date(h.dateRange.min.getTime()+b*(h.dateRange.max.getTime()-h.dateRange.min.getTime()));return i.jsxs("g",{children:[i.jsx("line",{x1:N,y1:0,x2:N,y2:S,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsx("text",{x:N,y:S+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:I(R)})]},b)}),i.jsx(K.path,{d:_,fill:"url(#xpTimelineGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),i.jsx(K.path,{d:w,fill:"none",stroke:"url(#lineGradient)",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),h.points.map((b,N)=>{const R=(new Date(b.date)-h.dateRange.min)/(h.dateRange.max-h.dateRange.min)*j,q=S-b.cumulativeXP/h.maxXP*S;return i.jsxs(K.g,{children:[i.jsx(K.circle,{cx:R,cy:q,r:"4",fill:"rgb(59, 130, 246)",stroke:"white",strokeWidth:"2",className:"cursor-pointer",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:N/h.points.length*2+.5},whileHover:{scale:1.5}}),i.jsxs(K.g,{initial:{opacity:0},whileHover:{opacity:1},transition:{duration:.2},children:[i.jsx("rect",{x:R-60,y:q-40,width:"120",height:"30",fill:"rgb(30, 41, 59)",stroke:"rgb(71, 85, 105)",rx:"4",className:"pointer-events-none"}),i.jsxs("text",{x:R,y:q-30,textAnchor:"middle",className:"fill-surface-100 text-xs font-medium pointer-events-none",children:[Ta(b.cumulativeXP)," XP"]}),i.jsx("text",{x:R,y:q-18,textAnchor:"middle",className:"fill-surface-400 text-xs pointer-events-none",children:I(b.date)})]})]},N)}),i.jsx("text",{x:-50,y:S/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -50, ${S/2})`,className:"fill-surface-300 text-sm font-medium",children:"Cumulative XP"}),i.jsx("text",{x:j/2,y:S+45,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Timeline"})]}),i.jsxs("g",{transform:`translate(${c-150}, 40)`,children:[i.jsx("rect",{x:0,y:0,width:"140",height:"60",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsxs("text",{x:10,y:18,className:"fill-surface-200 text-xs font-medium",children:["Total XP: ",Ta(h.maxXP)]}),i.jsxs("text",{x:10,y:32,className:"fill-surface-400 text-xs",children:["Projects: ",h.points.length]}),i.jsxs("text",{x:10,y:46,className:"fill-surface-400 text-xs",children:["Duration: ",Math.ceil((h.dateRange.max-h.dateRange.min)/(1e3*60*60*24))," days"]})]})]})})},Qp=({data:r={},width:c=500,height:f=400,className:d=""})=>{const h=J.useMemo(()=>{const{jsStats:w={},goStats:_={},overall:b={}}=r,N=[];b.passed>0&&N.push({label:"Passed",value:b.passed,percentage:b.passed/b.total*100,color:"rgb(34, 197, 94)",hoverColor:"rgb(22, 163, 74)"}),b.failed>0&&N.push({label:"Failed",value:b.failed,percentage:b.failed/b.total*100,color:"rgb(239, 68, 68)",hoverColor:"rgb(220, 38, 38)"});let R=-90;return{segments:N.map(B=>{const X=B.percentage/100*360,P={...B,startAngle:R,endAngle:R+X,angle:X};return R+=X,P}),jsStats:w,goStats:_,overall:b}},[r]),p=c/2,j=f/2,S=Math.min(c,f)/3,I=S*.4,G=(w,_,b,N)=>{const R=(N-90)*Math.PI/180;return{x:w+b*Math.cos(R),y:_+b*Math.sin(R)}},z=(w,_,b,N,R,q=0)=>{const B=G(w,_,b,R),X=G(w,_,b,N),P=R-N<=180?"0":"1";if(q>0){const F=G(w,_,q,R),pe=G(w,_,q,N);return["M",B.x,B.y,"A",b,b,0,P,0,X.x,X.y,"L",pe.x,pe.y,"A",q,q,0,P,1,F.x,F.y,"Z"].join(" ")}else return["M",w,_,"L",B.x,B.y,"A",b,b,0,P,0,X.x,X.y,"Z"].join(" ")};return!h.segments.length||h.overall.total===0?i.jsx("div",{className:`flex items-center justify-center ${d}`,style:{width:c,height:f},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"🥧"}),i.jsx("div",{children:"No piscine data available"})]})}):i.jsx("div",{className:d,children:i.jsxs("svg",{width:c,height:f,className:"overflow-visible",children:[i.jsx("defs",{children:i.jsx("filter",{id:"pieShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:i.jsx("feDropShadow",{dx:"2",dy:"4",stdDeviation:"4",floodOpacity:"0.3"})})}),i.jsx("text",{x:c/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"Piscine Performance Overview"}),h.segments.map((w,_)=>{const b=z(p,j,S,w.startAngle,w.endAngle,I),N=(w.startAngle+w.endAngle)/2,R=S+30,q=G(p,j,R,N);return i.jsxs("g",{children:[i.jsx(K.path,{d:b,fill:w.color,filter:"url(#pieShadow)",className:"cursor-pointer",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.6,delay:_*.2,ease:"easeOut"},whileHover:{fill:w.hoverColor,scale:1.05}}),i.jsxs(K.text,{x:q.x,y:q.y,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-100 text-sm font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:_*.2+.3},children:[w.percentage.toFixed(1),"%"]}),i.jsxs(K.text,{x:q.x,y:q.y+15,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-400 text-xs",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:_*.2+.4},children:["(",w.value," ",w.label.toLowerCase(),")"]})]},w.label)}),i.jsxs("g",{children:[i.jsx("text",{x:p,y:j-10,textAnchor:"middle",className:"fill-surface-100 text-lg font-bold",children:h.overall.total}),i.jsx("text",{x:p,y:j+8,textAnchor:"middle",className:"fill-surface-400 text-sm",children:"Total Attempts"})]}),i.jsx("g",{transform:`translate(20, ${f-100})`,children:h.segments.map((w,_)=>i.jsxs("g",{transform:`translate(0, ${_*20})`,children:[i.jsx("rect",{x:0,y:0,width:12,height:12,fill:w.color,rx:"2"}),i.jsxs("text",{x:18,y:9,dominantBaseline:"middle",className:"fill-surface-200 text-sm",children:[w.label,": ",w.value]})]},w.label))}),i.jsxs("g",{transform:`translate(${c-180}, 50)`,children:[i.jsx("rect",{x:0,y:0,width:"170",height:"120",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Breakdown by Track"}),i.jsx("text",{x:10,y:38,className:"fill-surface-300 text-xs font-medium",children:"JavaScript Piscine:"}),i.jsxs("text",{x:15,y:52,className:"fill-surface-400 text-xs",children:["Passed: ",h.jsStats.passed||0]}),i.jsxs("text",{x:15,y:64,className:"fill-surface-400 text-xs",children:["Failed: ",h.jsStats.failed||0]}),i.jsx("text",{x:10,y:84,className:"fill-surface-300 text-xs font-medium",children:"Go Piscine:"}),i.jsxs("text",{x:15,y:98,className:"fill-surface-400 text-xs",children:["Passed: ",h.goStats.passed||0]}),i.jsxs("text",{x:15,y:110,className:"fill-surface-400 text-xs",children:["Failed: ",h.goStats.failed||0]})]}),i.jsxs("g",{transform:`translate(${c-180}, 180)`,children:[i.jsx("rect",{x:0,y:0,width:"170",height:"40",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Success Rate"}),i.jsxs("text",{x:10,y:32,className:"fill-primary-400 text-lg font-bold",children:[h.overall.passRate?.toFixed(1)||0,"%"]})]})]})})},Zp=()=>{const{userData:r,xpData:c,projectData:f,auditData:d,loading:h}=Vs(),p=c?.timeline||[],j=c?.byProject||[];r?.totalXP,r?.level,f?.totalProjects;const S=f?.passedProjects||0,I=f?.failedProjects||0;f?.passRate;const G=d?.given?.count||0,z=d?.received?.count||0;return d?.auditRatio,h?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsx(ot,{}),i.jsx(ot,{}),i.jsx(ot,{}),i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsx(ot,{})}),i.jsx("div",{className:"lg:col-span-2",children:i.jsx(ot,{})}),i.jsx(ot,{})]}):i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsxs(M,{children:[i.jsxs(M.Header,{children:[i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(di,{className:"w-5 h-5 mr-2"}),"XP Progression Timeline"]}),i.jsx(M.Description,{children:"Your cumulative experience points growth over time"})]}),i.jsx(M.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Yp,{data:p,width:900,height:400})})})]})}),i.jsx("div",{className:"lg:col-span-2",children:i.jsxs(M,{children:[i.jsxs(M.Header,{children:[i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(Fd,{className:"w-5 h-5 mr-2"}),"XP by Project"]}),i.jsx(M.Description,{children:"Top projects ranked by experience points earned"})]}),i.jsx(M.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Lp,{data:j,width:700,height:500,maxBars:15})})})]})}),i.jsxs(M,{children:[i.jsxs(M.Header,{children:[i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(Jd,{className:"w-5 h-5 mr-2"}),"Piscine Performance"]}),i.jsx(M.Description,{children:"JavaScript and Go piscine statistics"})]}),i.jsx(M.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Qp,{data:[],width:400,height:350})})})]}),i.jsxs(M,{children:[i.jsxs(M.Header,{children:[i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(Ls,{className:"w-5 h-5 mr-2"}),"XP Progress Overview"]}),i.jsx(M.Description,{children:"Your experience points progression summary"})]}),i.jsx(M.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Cp,{data:p||[],width:400,height:300})})})]}),i.jsxs(M,{children:[i.jsxs(M.Header,{children:[i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(i0,{className:"w-5 h-5 mr-2"}),"Project Success Rate"]}),i.jsx(M.Description,{children:"Pass/Fail ratio for your projects"})]}),i.jsx(M.Content,{children:i.jsx("div",{className:"flex justify-center py-8",children:i.jsx(Xp,{passedProjects:S,failedProjects:I,size:250})})})]}),i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsxs(M,{children:[i.jsxs(M.Header,{children:[i.jsxs(M.Title,{className:"flex items-center",children:[i.jsx(r0,{className:"w-5 h-5 mr-2"}),"Audit Performance Analytics"]}),i.jsx(M.Description,{children:"Comprehensive audit statistics and performance metrics"})]}),i.jsx(M.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Hp,{auditsGiven:G,auditsReceived:z,width:900,height:400})})})]})})]})},Vp=()=>{const[r,c]=J.useState(""),[f,d]=J.useState("all"),[h,p]=J.useState("date"),{auditStatistics:j,loading:S,error:I}=Vs();if(S)return i.jsx(Qs,{});I&&console.error("Error loading audit data:",I);const G=[{id:1,user:"mohamedmoo",project:"mini-framework",result:"Pass",status:"pass",date:"2024-01-15",grade:1.2},{id:2,user:"musabd",project:"social-network",result:"Pass",status:"pass",date:"2024-01-14",grade:1},{id:3,user:"hadieif",project:"social-network",result:"Fail",status:"fail",date:"2024-01-13",grade:.8},{id:4,user:"aalmadhoo",project:"real-time-forum",result:"Pass",status:"pass",date:"2024-01-12",grade:1.5},{id:5,user:"hussainali2",project:"graphql",result:"Pass",status:"pass",date:"2024-01-11",grade:1.1},{id:6,user:"aabdulhu",project:"mini-framework",result:"Fail",status:"fail",date:"2024-01-10",grade:.6},{id:7,user:"yoowad",project:"graphql",result:"Pass",status:"pass",date:"2024-01-09",grade:1.3},{id:8,user:"musabd",project:"real-time-forum",result:"Pass",status:"pass",date:"2024-01-08",grade:1},{id:9,user:"mohamedmoo",project:"make-your-game",result:"Pass",status:"pass",date:"2024-01-07",grade:1.4}],z=G.filter(N=>{const R=N.user.toLowerCase().includes(r.toLowerCase())||N.project.toLowerCase().includes(r.toLowerCase()),q=f==="all"||N.status===f;return R&&q}).sort((N,R)=>{switch(h){case"date":return new Date(R.date)-new Date(N.date);case"user":return N.user.localeCompare(R.user);case"project":return N.project.localeCompare(R.project);default:return 0}}),w=G.filter(N=>N.status==="pass").length,_=G.filter(N=>N.status==="fail").length,b=G.reduce((N,R)=>N+R.grade,0)/G.length;return i.jsxs("div",{className:"space-y-6",children:[i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[i.jsx(M,{children:i.jsxs(M.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-green-500/20 rounded-lg",children:i.jsx($u,{className:"w-6 h-6 text-green-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:w}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Passed Audits"})]})]})}),i.jsx(M,{children:i.jsxs(M.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-red-500/20 rounded-lg",children:i.jsx(u0,{className:"w-6 h-6 text-red-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:_}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Failed Audits"})]})]})}),i.jsx(M,{children:i.jsxs(M.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-primary-500/20 rounded-lg",children:i.jsx(Du,{className:"w-6 h-6 text-primary-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:b.toFixed(1)}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Average Grade"})]})]})})]}),i.jsx(M,{children:i.jsx(M.Content,{children:i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[i.jsxs("div",{className:"flex-1 relative",children:[i.jsx(At,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",placeholder:"Search audits...",value:r,onChange:N=>c(N.target.value),className:"material-input pl-10 w-full"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Ys,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:f,onChange:N=>d(N.target.value),className:"material-input",children:[i.jsx("option",{value:"all",children:"All Status"}),i.jsx("option",{value:"pass",children:"Passed"}),i.jsx("option",{value:"fail",children:"Failed"})]})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Kd,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:h,onChange:N=>p(N.target.value),className:"material-input",children:[i.jsx("option",{value:"date",children:"Sort by Date"}),i.jsx("option",{value:"user",children:"Sort by User"}),i.jsx("option",{value:"project",children:"Sort by Project"})]})]})]})})}),i.jsxs(M,{children:[i.jsxs(M.Header,{children:[i.jsxs(M.Title,{className:"flex items-center justify-between",children:[i.jsxs("div",{className:"flex items-center",children:[i.jsx(Du,{className:"w-5 h-5 mr-2"}),"Audits (",z.length,")"]}),i.jsxs(Ra,{variant:"primary",size:"sm",children:[(w/G.length*100).toFixed(0),"% Pass Rate"]})]}),i.jsx(M.Description,{children:"Your recent audit history"})]}),i.jsxs(M.Content,{children:[i.jsx("div",{className:"overflow-x-auto",children:i.jsxs("table",{className:"w-full",children:[i.jsx("thead",{children:i.jsxs("tr",{className:"border-b border-white/10",children:[i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"User"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Project"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Grade"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Date"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Result"})]})}),i.jsx("tbody",{children:z.map((N,R)=>i.jsxs(K.tr,{className:"border-b border-white/5 hover:bg-white/5 transition-colors",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2,delay:R*.05},children:[i.jsx("td",{className:"py-3 px-4 text-white font-medium",children:N.user}),i.jsx("td",{className:"py-3 px-4 text-surface-300",children:N.project}),i.jsx("td",{className:"py-3 px-4",children:i.jsx("span",{className:`font-semibold ${N.grade>=1?"text-green-400":"text-red-400"}`,children:N.grade.toFixed(1)})}),i.jsx("td",{className:"py-3 px-4 text-surface-400 text-sm",children:new Date(N.date).toLocaleDateString()}),i.jsx("td",{className:"py-3 px-4",children:i.jsx(Up,{status:N.status})})]},N.id))})]})}),z.length===0&&i.jsxs("div",{className:"text-center py-8 text-surface-400",children:[i.jsx(At,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),i.jsx("p",{children:"No audits found matching your criteria"})]})]})]})]})},kp=()=>{const[r,c]=J.useState(""),[f,d]=J.useState("xp"),{skills:h,loading:p}=Vs(),j=[{name:"JavaScript",totalXP:2500,projects:8,type:"language",level:"Advanced"},{name:"Go",totalXP:1800,projects:5,type:"language",level:"Intermediate"},{name:"React",totalXP:1500,projects:6,type:"framework",level:"Intermediate"},{name:"Docker",totalXP:1200,projects:4,type:"tool",level:"Intermediate"},{name:"PostgreSQL",totalXP:1e3,projects:3,type:"database",level:"Beginner"},{name:"GraphQL",totalXP:800,projects:2,type:"api",level:"Beginner"},{name:"Node.js",totalXP:1400,projects:5,type:"runtime",level:"Intermediate"},{name:"Git",totalXP:2e3,projects:10,type:"tool",level:"Advanced"}],S=h.length>0?h:j,I=S.filter(_=>_.name.toLowerCase().includes(r.toLowerCase())).sort((_,b)=>{switch(f){case"xp":return b.totalXP-_.totalXP;case"projects":return b.projects-_.projects;case"name":return _.name.localeCompare(b.name);default:return 0}}),G=_=>{switch(_){case"language":return i.jsx(d0,{className:"w-4 h-4"});case"database":return i.jsx(f0,{className:"w-4 h-4"});case"framework":case"api":return i.jsx(o0,{className:"w-4 h-4"});default:return i.jsx(c0,{className:"w-4 h-4"})}},z=_=>{switch(_){case"Advanced":return"success";case"Intermediate":return"primary";case"Beginner":return"warning";default:return"secondary"}},w=Math.max(...S.map(_=>_.totalXP));return p?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[i.jsx(ot,{}),i.jsx(ot,{})]}):i.jsxs("div",{className:"space-y-6",children:[i.jsx(M,{children:i.jsx(M.Content,{children:i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[i.jsxs("div",{className:"flex-1 relative",children:[i.jsx(At,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",placeholder:"Search technologies...",value:r,onChange:_=>c(_.target.value),className:"material-input pl-10 w-full"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Ys,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:f,onChange:_=>d(_.target.value),className:"material-input",children:[i.jsx("option",{value:"xp",children:"Sort by XP"}),i.jsx("option",{value:"projects",children:"Sort by Projects"}),i.jsx("option",{value:"name",children:"Sort by Name"})]})]})]})})}),i.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:I.map((_,b)=>i.jsx(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:b*.1},children:i.jsx(M,{hover:!0,className:"h-full",children:i.jsxs(M.Content,{children:[i.jsxs("div",{className:"flex items-start justify-between mb-3",children:[i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("div",{className:"p-2 bg-primary-500/20 rounded-lg text-primary-400",children:G(_.type)}),i.jsxs("div",{children:[i.jsx("h3",{className:"font-semibold text-white",children:_.name}),i.jsx("p",{className:"text-xs text-surface-400 capitalize",children:_.type})]})]}),i.jsx(Ra,{variant:z(_.level||"Beginner"),size:"sm",children:_.level||"Beginner"})]}),i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{children:[i.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[i.jsx("span",{className:"text-surface-300",children:"Experience"}),i.jsxs("span",{className:"text-primary-300",children:[_.totalXP.toLocaleString()," XP"]})]}),i.jsx(Rp,{value:_.totalXP,max:w,size:"sm",color:"primary",showValue:!1})]}),i.jsxs("div",{className:"flex justify-between text-sm",children:[i.jsx("span",{className:"text-surface-300",children:"Projects"}),i.jsx("span",{className:"text-accent-300 font-medium",children:_.projects})]})]})]})})},_.name))}),I.length===0&&i.jsx(M,{children:i.jsx(M.Content,{children:i.jsxs("div",{className:"text-center py-8 text-surface-400",children:[i.jsx(At,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),i.jsxs("p",{children:['No technologies found matching "',r,'"']})]})})})]})},Kp=()=>{const[r,c]=J.useState("profile"),[f,d]=J.useState(!1),{logout:h,user:p}=Xl(),{userStatistics:j,totalXP:S,loading:I,error:G}=Vs();J.useEffect(()=>{d(!1)},[r]);const z=[{id:"profile",label:"Profile & Data",icon:ci},{id:"search",label:"Search Queries",icon:At},{id:"stats",label:"Statistics",icon:Fd},{id:"audits",label:"Audits",icon:Du},{id:"technologies",label:"Technologies",icon:Eu}],w=()=>{h()};return I?i.jsx("div",{className:"min-h-screen flex items-center justify-center",children:i.jsx(Qs,{size:"lg",text:"Loading your dashboard..."})}):G?(console.error("Dashboard error:",G),i.jsx("div",{className:"min-h-screen flex items-center justify-center p-4",children:i.jsxs(M,{className:"max-w-md text-center",children:[i.jsxs(M.Header,{children:[i.jsx(M.Title,{className:"text-red-400",children:"Error Loading Dashboard"}),i.jsx(M.Description,{children:G.message||"Failed to load dashboard data"})]}),i.jsx(M.Content,{children:i.jsxs("div",{className:"space-y-3",children:[i.jsx(Mt,{onClick:()=>window.location.reload(),className:"w-full",children:"Reload Page"}),!1]})})]})})):i.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 pb-20 md:pb-0",children:[i.jsx("header",{className:"sticky top-0 z-40 bg-surface-900/80 backdrop-blur-md border-b border-white/10",children:i.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[i.jsxs("div",{className:"flex items-center justify-between h-16",children:[i.jsxs("div",{className:"flex items-center",children:[i.jsx(K.div,{initial:{scale:0},animate:{scale:1},className:"w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-400 rounded-lg flex items-center justify-center mr-3",children:i.jsx(ci,{className:"w-5 h-5 text-white"})}),i.jsx("h1",{className:"text-lg md:text-xl font-bold gradient-text",children:"Profile Dashboard"})]}),i.jsxs("div",{className:"hidden md:flex items-center space-x-4",children:[i.jsxs("div",{className:"text-right",children:[i.jsx("p",{className:"text-sm font-medium text-white",children:oi(j)||p?.username}),i.jsx("p",{className:"text-xs text-surface-400",children:Ta(S)})]}),i.jsx(Mt,{variant:"ghost",size:"sm",onClick:w,className:"text-surface-300 hover:text-red-400",children:i.jsx(Hd,{className:"w-4 h-4"})})]}),i.jsx("div",{className:"md:hidden",children:i.jsx(Mt,{variant:"ghost",size:"sm",onClick:()=>d(!f),className:"text-surface-300",children:f?i.jsx(m0,{className:"w-5 h-5"}):i.jsx(h0,{className:"w-5 h-5"})})})]}),f&&i.jsx(K.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"md:hidden border-t border-white/10 py-4",children:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-sm font-medium text-white",children:oi(j)||p?.username}),i.jsx("p",{className:"text-xs text-surface-400",children:Ta(S)})]}),i.jsxs(Mt,{variant:"ghost",size:"sm",onClick:w,className:"text-surface-300 hover:text-red-400",children:[i.jsx(Hd,{className:"w-4 h-4 mr-2"}),"Logout"]})]})})]})}),i.jsx("nav",{className:"sticky top-16 z-30 bg-surface-800/80 backdrop-blur-md border-b border-white/10 hidden md:block",children:i.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:i.jsx("div",{className:"flex space-x-8 overflow-x-auto",children:z.map(_=>{const b=_.icon,N=r===_.id;return i.jsxs(K.button,{onClick:()=>c(_.id),className:`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap relative ${N?"border-primary-400 text-primary-300":"border-transparent text-surface-400 hover:text-surface-200"}`,whileHover:{y:-2},whileTap:{y:0},children:[i.jsx(b,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm font-medium",children:_.label}),N&&i.jsx(K.div,{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400",layoutId:"activeTabIndicator",transition:{type:"spring",stiffness:500,damping:30}})]},_.id)})})})}),i.jsx(Tp,{tabs:z,activeTab:r,onTabChange:c}),i.jsx("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:i.jsxs(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[r==="profile"&&i.jsx(qp,{}),r==="search"&&i.jsx(Bp,{}),r==="stats"&&i.jsx(Zp,{}),r==="audits"&&i.jsx(Vp,{}),r==="technologies"&&i.jsx(kp,{})]},r)})]})};class Jp extends J.Component{constructor(c){super(c),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(c,f){this.setState({error:c,errorInfo:f})}handleRetry=()=>{this.setState({hasError:!1,error:null,errorInfo:null})};handleReload=()=>{window.location.reload()};render(){return this.state.hasError?i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 flex items-center justify-center p-4",children:i.jsx(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"max-w-md w-full",children:i.jsx(M,{className:"text-center",children:i.jsxs(M.Content,{children:[i.jsx(K.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4",children:i.jsx(g0,{className:"w-8 h-8 text-red-400"})}),i.jsx("h1",{className:"text-2xl font-bold text-white mb-2",children:"Oops! Something went wrong"}),i.jsx("p",{className:"text-surface-300 mb-6",children:"We encountered an unexpected error. This has been logged and we'll look into it."}),!1,i.jsxs("div",{className:"flex flex-col sm:flex-row gap-3",children:[i.jsxs(Mt,{onClick:this.handleRetry,className:"flex-1",variant:"primary",children:[i.jsx(p0,{className:"w-4 h-4 mr-2"}),"Try Again"]}),i.jsxs(Mt,{onClick:this.handleReload,className:"flex-1",variant:"secondary",children:[i.jsx(y0,{className:"w-4 h-4 mr-2"}),"Reload Page"]})]})]})})})}):this.props.children}}const Pp=()=>{const{isAuthenticated:r,isInitialized:c}=Xl();return c?r?i.jsx(Kp,{}):i.jsx(bp,{}):i.jsx(Qs,{fullScreen:!0,size:"lg",text:"Initializing..."})};function Wp(){return i.jsx(Jp,{children:i.jsx(e0,{client:jm,children:i.jsx(G0,{children:i.jsx(mp,{children:i.jsx(Pp,{})})})})})}A0.createRoot(document.getElementById("root")).render(i.jsx(J.StrictMode,{children:i.jsx(Wp,{})}));
