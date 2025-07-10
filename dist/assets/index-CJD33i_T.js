import{r as W,j as i,m as K,R as ea}from"./animation-vendor-Ixux-_Rc.js";import{r as Ph,a as Wh}from"./react-vendor-DJG_os-6.js";import{A as Iu,_ as Fh,O as Jd,g as e0,P as t0,a as a0,b as z,I as l0,c as s0,d as n0,f as i0,u as ta,e as oi,h as r0}from"./apollo-vendor-Css74xKN.js";import{L as Ld,M as Pd,U as ri,a as u0,E as c0,b as o0,c as f0,C as Wd,d as fi,T as Xs,A as d0,e as Fd,S as Nt,f as Eu,F as Hs,g as eg,h as tg,i as Mu,j as ag,k as g0,l as m0,m as h0,n as Ou,o as p0,G as y0,D as x0,p as v0,q as Yd,X as b0,r as j0,s as A0,R as S0,H as _0}from"./ui-vendor-DiO1C7IC.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))d(m);new MutationObserver(m=>{for(const A of m)if(A.type==="childList")for(const x of A.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&d(x)}).observe(document,{childList:!0,subtree:!0});function f(m){const A={};return m.integrity&&(A.integrity=m.integrity),m.referrerPolicy&&(A.referrerPolicy=m.referrerPolicy),m.crossOrigin==="use-credentials"?A.credentials="include":m.crossOrigin==="anonymous"?A.credentials="omit":A.credentials="same-origin",A}function d(m){if(m.ep)return;m.ep=!0;const A=f(m);fetch(m.href,A)}})();var wu={exports:{}},zs={},Ru={exports:{}},Uu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qd;function N0(){return Qd||(Qd=1,function(u){function c(D,X){var V=D.length;D.push(X);e:for(;0<V;){var ge=V-1>>>1,oe=D[ge];if(0<m(oe,X))D[ge]=X,D[V]=oe,V=ge;else break e}}function f(D){return D.length===0?null:D[0]}function d(D){if(D.length===0)return null;var X=D[0],V=D.pop();if(V!==X){D[0]=V;e:for(var ge=0,oe=D.length,Xe=oe>>>1;ge<Xe;){var ve=2*(ge+1)-1,ue=D[ve],Oe=ve+1,ht=D[Oe];if(0>m(ue,V))Oe<oe&&0>m(ht,ue)?(D[ge]=ht,D[Oe]=V,ge=Oe):(D[ge]=ue,D[ve]=V,ge=ve);else if(Oe<oe&&0>m(ht,V))D[ge]=ht,D[Oe]=V,ge=Oe;else break e}}return X}function m(D,X){var V=D.sortIndex-X.sortIndex;return V!==0?V:D.id-X.id}if(u.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var A=performance;u.unstable_now=function(){return A.now()}}else{var x=Date,j=x.now();u.unstable_now=function(){return x.now()-j}}var U=[],E=[],I=1,T=null,v=3,p=!1,w=!1,R=!1,$=!1,B=typeof setTimeout=="function"?setTimeout:null,C=typeof clearTimeout=="function"?clearTimeout:null,ae=typeof setImmediate<"u"?setImmediate:null;function se(D){for(var X=f(E);X!==null;){if(X.callback===null)d(E);else if(X.startTime<=D)d(E),X.sortIndex=X.expirationTime,c(U,X);else break;X=f(E)}}function Se(D){if(R=!1,se(D),!w)if(f(U)!==null)w=!0,Ee||(Ee=!0,Ze());else{var X=f(E);X!==null&&mt(Se,X.startTime-D)}}var Ee=!1,Qe=-1,J=5,ne=-1;function Te(){return $?!0:!(u.unstable_now()-ne<J)}function gt(){if($=!1,Ee){var D=u.unstable_now();ne=D;var X=!0;try{e:{w=!1,R&&(R=!1,C(Qe),Qe=-1),p=!0;var V=v;try{t:{for(se(D),T=f(U);T!==null&&!(T.expirationTime>D&&Te());){var ge=T.callback;if(typeof ge=="function"){T.callback=null,v=T.priorityLevel;var oe=ge(T.expirationTime<=D);if(D=u.unstable_now(),typeof oe=="function"){T.callback=oe,se(D),X=!0;break t}T===f(U)&&d(U),se(D)}else d(U);T=f(U)}if(T!==null)X=!0;else{var Xe=f(E);Xe!==null&&mt(Se,Xe.startTime-D),X=!1}}break e}finally{T=null,v=V,p=!1}X=void 0}}finally{X?Ze():Ee=!1}}}var Ze;if(typeof ae=="function")Ze=function(){ae(gt)};else if(typeof MessageChannel<"u"){var Ja=new MessageChannel,Ua=Ja.port2;Ja.port1.onmessage=gt,Ze=function(){Ua.postMessage(null)}}else Ze=function(){B(gt,0)};function mt(D,X){Qe=B(function(){D(u.unstable_now())},X)}u.unstable_IdlePriority=5,u.unstable_ImmediatePriority=1,u.unstable_LowPriority=4,u.unstable_NormalPriority=3,u.unstable_Profiling=null,u.unstable_UserBlockingPriority=2,u.unstable_cancelCallback=function(D){D.callback=null},u.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):J=0<D?Math.floor(1e3/D):5},u.unstable_getCurrentPriorityLevel=function(){return v},u.unstable_next=function(D){switch(v){case 1:case 2:case 3:var X=3;break;default:X=v}var V=v;v=X;try{return D()}finally{v=V}},u.unstable_requestPaint=function(){$=!0},u.unstable_runWithPriority=function(D,X){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var V=v;v=D;try{return X()}finally{v=V}},u.unstable_scheduleCallback=function(D,X,V){var ge=u.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?ge+V:ge):V=ge,D){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=V+oe,D={id:I++,callback:X,priorityLevel:D,startTime:V,expirationTime:oe,sortIndex:-1},V>ge?(D.sortIndex=V,c(E,D),f(U)===null&&D===f(E)&&(R?(C(Qe),Qe=-1):R=!0,mt(Se,V-ge))):(D.sortIndex=oe,c(U,D),w||p||(w=!0,Ee||(Ee=!0,Ze()))),D},u.unstable_shouldYield=Te,u.unstable_wrapCallback=function(D){var X=v;return function(){var V=v;v=X;try{return D.apply(this,arguments)}finally{v=V}}}}(Uu)),Uu}var Zd;function T0(){return Zd||(Zd=1,Ru.exports=N0()),Ru.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vd;function w0(){if(Vd)return zs;Vd=1;var u=T0(),c=Ph(),f=Wh();function d(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function m(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function A(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function x(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function j(e){if(A(e)!==e)throw Error(d(188))}function U(e){var t=e.alternate;if(!t){if(t=A(e),t===null)throw Error(d(188));return t!==e?null:e}for(var a=e,l=t;;){var s=a.return;if(s===null)break;var n=s.alternate;if(n===null){if(l=s.return,l!==null){a=l;continue}break}if(s.child===n.child){for(n=s.child;n;){if(n===a)return j(s),e;if(n===l)return j(s),t;n=n.sibling}throw Error(d(188))}if(a.return!==l.return)a=s,l=n;else{for(var r=!1,o=s.child;o;){if(o===a){r=!0,a=s,l=n;break}if(o===l){r=!0,l=s,a=n;break}o=o.sibling}if(!r){for(o=n.child;o;){if(o===a){r=!0,a=n,l=s;break}if(o===l){r=!0,l=n,a=s;break}o=o.sibling}if(!r)throw Error(d(189))}}if(a.alternate!==l)throw Error(d(190))}if(a.tag!==3)throw Error(d(188));return a.stateNode.current===a?e:t}function E(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=E(e),t!==null)return t;e=e.sibling}return null}var I=Object.assign,T=Symbol.for("react.element"),v=Symbol.for("react.transitional.element"),p=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),R=Symbol.for("react.strict_mode"),$=Symbol.for("react.profiler"),B=Symbol.for("react.provider"),C=Symbol.for("react.consumer"),ae=Symbol.for("react.context"),se=Symbol.for("react.forward_ref"),Se=Symbol.for("react.suspense"),Ee=Symbol.for("react.suspense_list"),Qe=Symbol.for("react.memo"),J=Symbol.for("react.lazy"),ne=Symbol.for("react.activity"),Te=Symbol.for("react.memo_cache_sentinel"),gt=Symbol.iterator;function Ze(e){return e===null||typeof e!="object"?null:(e=gt&&e[gt]||e["@@iterator"],typeof e=="function"?e:null)}var Ja=Symbol.for("react.client.reference");function Ua(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Ja?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case $:return"Profiler";case R:return"StrictMode";case Se:return"Suspense";case Ee:return"SuspenseList";case ne:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case p:return"Portal";case ae:return(e.displayName||"Context")+".Provider";case C:return(e._context.displayName||"Context")+".Consumer";case se:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Qe:return t=e.displayName||null,t!==null?t:Ua(e.type)||"Memo";case J:t=e._payload,e=e._init;try{return Ua(e(t))}catch{}}return null}var mt=Array.isArray,D=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V={pending:!1,data:null,method:null,action:null},ge=[],oe=-1;function Xe(e){return{current:e}}function ve(e){0>oe||(e.current=ge[oe],ge[oe]=null,oe--)}function ue(e,t){oe++,ge[oe]=e.current,e.current=t}var Oe=Xe(null),ht=Xe(null),Ut=Xe(null),Pa=Xe(null);function Wa(e,t){switch(ue(Ut,t),ue(ht,e),ue(Oe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?yd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=yd(t),e=xd(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}ve(Oe),ue(Oe,e)}function Et(){ve(Oe),ve(ht),ve(Ut)}function la(e){e.memoizedState!==null&&ue(Pa,e);var t=Oe.current,a=xd(t,e.type);t!==a&&(ue(ht,e),ue(Oe,a))}function Fa(e){ht.current===e&&(ve(Oe),ve(ht)),Pa.current===e&&(ve(Pa),qs._currentValue=V)}var L=Object.prototype.hasOwnProperty,we=u.unstable_scheduleCallback,el=u.unstable_cancelCallback,Cl=u.unstable_shouldYield,Eg=u.unstable_requestPaint,Ot=u.unstable_now,Og=u.unstable_getCurrentPriorityLevel,Ku=u.unstable_ImmediatePriority,Ju=u.unstable_UserBlockingPriority,Qs=u.unstable_NormalPriority,Dg=u.unstable_LowPriority,Pu=u.unstable_IdlePriority,qg=u.log,Ig=u.unstable_setDisableYieldValue,Xl=null,lt=null;function sa(e){if(typeof qg=="function"&&Ig(e),lt&&typeof lt.setStrictMode=="function")try{lt.setStrictMode(Xl,e)}catch{}}var st=Math.clz32?Math.clz32:Gg,Mg=Math.log,$g=Math.LN2;function Gg(e){return e>>>=0,e===0?32:31-(Mg(e)/$g|0)|0}var Zs=256,Vs=4194304;function Ea(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ks(e,t,a){var l=e.pendingLanes;if(l===0)return 0;var s=0,n=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=l&134217727;return o!==0?(l=o&~n,l!==0?s=Ea(l):(r&=o,r!==0?s=Ea(r):a||(a=o&~e,a!==0&&(s=Ea(a))))):(o=l&~n,o!==0?s=Ea(o):r!==0?s=Ea(r):a||(a=l&~e,a!==0&&(s=Ea(a)))),s===0?0:t!==0&&t!==s&&(t&n)===0&&(n=s&-s,a=t&-t,n>=a||n===32&&(a&4194048)!==0)?t:s}function Hl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function zg(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Wu(){var e=Zs;return Zs<<=1,(Zs&4194048)===0&&(Zs=256),e}function Fu(){var e=Vs;return Vs<<=1,(Vs&62914560)===0&&(Vs=4194304),e}function pi(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Ll(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Bg(e,t,a,l,s,n){var r=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var o=e.entanglements,g=e.expirationTimes,S=e.hiddenUpdates;for(a=r&~a;0<a;){var O=31-st(a),M=1<<O;o[O]=0,g[O]=-1;var _=S[O];if(_!==null)for(S[O]=null,O=0;O<_.length;O++){var N=_[O];N!==null&&(N.lane&=-536870913)}a&=~M}l!==0&&ec(e,l,0),n!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=n&~(r&~t))}function ec(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-st(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|a&4194090}function tc(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var l=31-st(a),s=1<<l;s&t|e[l]&t&&(e[l]|=t),a&=~s}}function yi(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function xi(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ac(){var e=X.p;return e!==0?e:(e=window.event,e===void 0?32:Gd(e.type))}function Cg(e,t){var a=X.p;try{return X.p=e,t()}finally{X.p=a}}var na=Math.random().toString(36).slice(2),Ve="__reactFiber$"+na,Je="__reactProps$"+na,tl="__reactContainer$"+na,vi="__reactEvents$"+na,Xg="__reactListeners$"+na,Hg="__reactHandles$"+na,lc="__reactResources$"+na,Yl="__reactMarker$"+na;function bi(e){delete e[Ve],delete e[Je],delete e[vi],delete e[Xg],delete e[Hg]}function al(e){var t=e[Ve];if(t)return t;for(var a=e.parentNode;a;){if(t=a[tl]||a[Ve]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Ad(e);e!==null;){if(a=e[Ve])return a;e=Ad(e)}return t}e=a,a=e.parentNode}return null}function ll(e){if(e=e[Ve]||e[tl]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function Ql(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(d(33))}function sl(e){var t=e[lc];return t||(t=e[lc]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ge(e){e[Yl]=!0}var sc=new Set,nc={};function Oa(e,t){nl(e,t),nl(e+"Capture",t)}function nl(e,t){for(nc[e]=t,e=0;e<t.length;e++)sc.add(t[e])}var Lg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ic={},rc={};function Yg(e){return L.call(rc,e)?!0:L.call(ic,e)?!1:Lg.test(e)?rc[e]=!0:(ic[e]=!0,!1)}function Ks(e,t,a){if(Yg(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Js(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Bt(e,t,a,l){if(l===null)e.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+l)}}var ji,uc;function il(e){if(ji===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);ji=t&&t[1]||"",uc=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ji+e+uc}var Ai=!1;function Si(e,t){if(!e||Ai)return"";Ai=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var M=function(){throw Error()};if(Object.defineProperty(M.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(M,[])}catch(N){var _=N}Reflect.construct(e,[],M)}else{try{M.call()}catch(N){_=N}e.call(M.prototype)}}else{try{throw Error()}catch(N){_=N}(M=e())&&typeof M.catch=="function"&&M.catch(function(){})}}catch(N){if(N&&_&&typeof N.stack=="string")return[N.stack,_.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var n=l.DetermineComponentFrameRoot(),r=n[0],o=n[1];if(r&&o){var g=r.split(`
`),S=o.split(`
`);for(s=l=0;l<g.length&&!g[l].includes("DetermineComponentFrameRoot");)l++;for(;s<S.length&&!S[s].includes("DetermineComponentFrameRoot");)s++;if(l===g.length||s===S.length)for(l=g.length-1,s=S.length-1;1<=l&&0<=s&&g[l]!==S[s];)s--;for(;1<=l&&0<=s;l--,s--)if(g[l]!==S[s]){if(l!==1||s!==1)do if(l--,s--,0>s||g[l]!==S[s]){var O=`
`+g[l].replace(" at new "," at ");return e.displayName&&O.includes("<anonymous>")&&(O=O.replace("<anonymous>",e.displayName)),O}while(1<=l&&0<=s);break}}}finally{Ai=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?il(a):""}function Qg(e){switch(e.tag){case 26:case 27:case 5:return il(e.type);case 16:return il("Lazy");case 13:return il("Suspense");case 19:return il("SuspenseList");case 0:case 15:return Si(e.type,!1);case 11:return Si(e.type.render,!1);case 1:return Si(e.type,!0);case 31:return il("Activity");default:return""}}function cc(e){try{var t="";do t+=Qg(e),e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function pt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function oc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Zg(e){var t=oc(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),l=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var s=a.get,n=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){l=""+r,n.call(this,r)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return l},setValue:function(r){l=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ps(e){e._valueTracker||(e._valueTracker=Zg(e))}function fc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),l="";return e&&(l=oc(e)?e.checked?"true":"false":e.value),e=l,e!==a?(t.setValue(e),!0):!1}function Ws(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Vg=/[\n"\\]/g;function yt(e){return e.replace(Vg,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function _i(e,t,a,l,s,n,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+pt(t)):e.value!==""+pt(t)&&(e.value=""+pt(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?Ni(e,r,pt(t)):a!=null?Ni(e,r,pt(a)):l!=null&&e.removeAttribute("value"),s==null&&n!=null&&(e.defaultChecked=!!n),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+pt(o):e.removeAttribute("name")}function dc(e,t,a,l,s,n,r,o){if(n!=null&&typeof n!="function"&&typeof n!="symbol"&&typeof n!="boolean"&&(e.type=n),t!=null||a!=null){if(!(n!=="submit"&&n!=="reset"||t!=null))return;a=a!=null?""+pt(a):"",t=t!=null?""+pt(t):a,o||t===e.value||(e.value=t),e.defaultValue=t}l=l??s,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=o?e.checked:!!l,e.defaultChecked=!!l,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r)}function Ni(e,t,a){t==="number"&&Ws(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function rl(e,t,a,l){if(e=e.options,t){t={};for(var s=0;s<a.length;s++)t["$"+a[s]]=!0;for(a=0;a<e.length;a++)s=t.hasOwnProperty("$"+e[a].value),e[a].selected!==s&&(e[a].selected=s),s&&l&&(e[a].defaultSelected=!0)}else{for(a=""+pt(a),t=null,s=0;s<e.length;s++){if(e[s].value===a){e[s].selected=!0,l&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function gc(e,t,a){if(t!=null&&(t=""+pt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+pt(a):""}function mc(e,t,a,l){if(t==null){if(l!=null){if(a!=null)throw Error(d(92));if(mt(l)){if(1<l.length)throw Error(d(93));l=l[0]}a=l}a==null&&(a=""),t=a}a=pt(t),e.defaultValue=a,l=e.textContent,l===a&&l!==""&&l!==null&&(e.value=l)}function ul(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var kg=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function hc(e,t,a){var l=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,a):typeof a!="number"||a===0||kg.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function pc(e,t,a){if(t!=null&&typeof t!="object")throw Error(d(62));if(e=e.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var s in t)l=t[s],t.hasOwnProperty(s)&&a[s]!==l&&hc(e,s,l)}else for(var n in t)t.hasOwnProperty(n)&&hc(e,n,t[n])}function Ti(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Kg=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Jg=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Fs(e){return Jg.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var wi=null;function Ri(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var cl=null,ol=null;function yc(e){var t=ll(e);if(t&&(e=t.stateNode)){var a=e[Je]||null;e:switch(e=t.stateNode,t.type){case"input":if(_i(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+yt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var l=a[t];if(l!==e&&l.form===e.form){var s=l[Je]||null;if(!s)throw Error(d(90));_i(l,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<a.length;t++)l=a[t],l.form===e.form&&fc(l)}break e;case"textarea":gc(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&rl(e,!!a.multiple,t,!1)}}}var Ui=!1;function xc(e,t,a){if(Ui)return e(t,a);Ui=!0;try{var l=e(t);return l}finally{if(Ui=!1,(cl!==null||ol!==null)&&(Bn(),cl&&(t=cl,e=ol,ol=cl=null,yc(t),e)))for(t=0;t<e.length;t++)yc(e[t])}}function Zl(e,t){var a=e.stateNode;if(a===null)return null;var l=a[Je]||null;if(l===null)return null;a=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(d(231,t,typeof a));return a}var Ct=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ei=!1;if(Ct)try{var Vl={};Object.defineProperty(Vl,"passive",{get:function(){Ei=!0}}),window.addEventListener("test",Vl,Vl),window.removeEventListener("test",Vl,Vl)}catch{Ei=!1}var ia=null,Oi=null,en=null;function vc(){if(en)return en;var e,t=Oi,a=t.length,l,s="value"in ia?ia.value:ia.textContent,n=s.length;for(e=0;e<a&&t[e]===s[e];e++);var r=a-e;for(l=1;l<=r&&t[a-l]===s[n-l];l++);return en=s.slice(e,1<l?1-l:void 0)}function tn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function an(){return!0}function bc(){return!1}function Pe(e){function t(a,l,s,n,r){this._reactName=a,this._targetInst=s,this.type=l,this.nativeEvent=n,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(a=e[o],this[o]=a?a(n):n[o]);return this.isDefaultPrevented=(n.defaultPrevented!=null?n.defaultPrevented:n.returnValue===!1)?an:bc,this.isPropagationStopped=bc,this}return I(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=an)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=an)},persist:function(){},isPersistent:an}),t}var Da={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ln=Pe(Da),kl=I({},Da,{view:0,detail:0}),Pg=Pe(kl),Di,qi,Kl,sn=I({},kl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Mi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Kl&&(Kl&&e.type==="mousemove"?(Di=e.screenX-Kl.screenX,qi=e.screenY-Kl.screenY):qi=Di=0,Kl=e),Di)},movementY:function(e){return"movementY"in e?e.movementY:qi}}),jc=Pe(sn),Wg=I({},sn,{dataTransfer:0}),Fg=Pe(Wg),em=I({},kl,{relatedTarget:0}),Ii=Pe(em),tm=I({},Da,{animationName:0,elapsedTime:0,pseudoElement:0}),am=Pe(tm),lm=I({},Da,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),sm=Pe(lm),nm=I({},Da,{data:0}),Ac=Pe(nm),im={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},um={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function cm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=um[e])?!!t[e]:!1}function Mi(){return cm}var om=I({},kl,{key:function(e){if(e.key){var t=im[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=tn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?rm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Mi,charCode:function(e){return e.type==="keypress"?tn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?tn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),fm=Pe(om),dm=I({},sn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Sc=Pe(dm),gm=I({},kl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Mi}),mm=Pe(gm),hm=I({},Da,{propertyName:0,elapsedTime:0,pseudoElement:0}),pm=Pe(hm),ym=I({},sn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),xm=Pe(ym),vm=I({},Da,{newState:0,oldState:0}),bm=Pe(vm),jm=[9,13,27,32],$i=Ct&&"CompositionEvent"in window,Jl=null;Ct&&"documentMode"in document&&(Jl=document.documentMode);var Am=Ct&&"TextEvent"in window&&!Jl,_c=Ct&&(!$i||Jl&&8<Jl&&11>=Jl),Nc=" ",Tc=!1;function wc(e,t){switch(e){case"keyup":return jm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Rc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var fl=!1;function Sm(e,t){switch(e){case"compositionend":return Rc(t);case"keypress":return t.which!==32?null:(Tc=!0,Nc);case"textInput":return e=t.data,e===Nc&&Tc?null:e;default:return null}}function _m(e,t){if(fl)return e==="compositionend"||!$i&&wc(e,t)?(e=vc(),en=Oi=ia=null,fl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return _c&&t.locale!=="ko"?null:t.data;default:return null}}var Nm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Uc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Nm[e.type]:t==="textarea"}function Ec(e,t,a,l){cl?ol?ol.push(l):ol=[l]:cl=l,t=Qn(t,"onChange"),0<t.length&&(a=new ln("onChange","change",null,a,l),e.push({event:a,listeners:t}))}var Pl=null,Wl=null;function Tm(e){dd(e,0)}function nn(e){var t=Ql(e);if(fc(t))return e}function Oc(e,t){if(e==="change")return t}var Dc=!1;if(Ct){var Gi;if(Ct){var zi="oninput"in document;if(!zi){var qc=document.createElement("div");qc.setAttribute("oninput","return;"),zi=typeof qc.oninput=="function"}Gi=zi}else Gi=!1;Dc=Gi&&(!document.documentMode||9<document.documentMode)}function Ic(){Pl&&(Pl.detachEvent("onpropertychange",Mc),Wl=Pl=null)}function Mc(e){if(e.propertyName==="value"&&nn(Wl)){var t=[];Ec(t,Wl,e,Ri(e)),xc(Tm,t)}}function wm(e,t,a){e==="focusin"?(Ic(),Pl=t,Wl=a,Pl.attachEvent("onpropertychange",Mc)):e==="focusout"&&Ic()}function Rm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return nn(Wl)}function Um(e,t){if(e==="click")return nn(t)}function Em(e,t){if(e==="input"||e==="change")return nn(t)}function Om(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var nt=typeof Object.is=="function"?Object.is:Om;function Fl(e,t){if(nt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),l=Object.keys(t);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var s=a[l];if(!L.call(t,s)||!nt(e[s],t[s]))return!1}return!0}function $c(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gc(e,t){var a=$c(e);e=0;for(var l;a;){if(a.nodeType===3){if(l=e+a.textContent.length,e<=t&&l>=t)return{node:a,offset:t-e};e=l}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=$c(a)}}function zc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?zc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Bc(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ws(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Ws(e.document)}return t}function Bi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Dm=Ct&&"documentMode"in document&&11>=document.documentMode,dl=null,Ci=null,es=null,Xi=!1;function Cc(e,t,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Xi||dl==null||dl!==Ws(l)||(l=dl,"selectionStart"in l&&Bi(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),es&&Fl(es,l)||(es=l,l=Qn(Ci,"onSelect"),0<l.length&&(t=new ln("onSelect","select",null,t,a),e.push({event:t,listeners:l}),t.target=dl)))}function qa(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var gl={animationend:qa("Animation","AnimationEnd"),animationiteration:qa("Animation","AnimationIteration"),animationstart:qa("Animation","AnimationStart"),transitionrun:qa("Transition","TransitionRun"),transitionstart:qa("Transition","TransitionStart"),transitioncancel:qa("Transition","TransitionCancel"),transitionend:qa("Transition","TransitionEnd")},Hi={},Xc={};Ct&&(Xc=document.createElement("div").style,"AnimationEvent"in window||(delete gl.animationend.animation,delete gl.animationiteration.animation,delete gl.animationstart.animation),"TransitionEvent"in window||delete gl.transitionend.transition);function Ia(e){if(Hi[e])return Hi[e];if(!gl[e])return e;var t=gl[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Xc)return Hi[e]=t[a];return e}var Hc=Ia("animationend"),Lc=Ia("animationiteration"),Yc=Ia("animationstart"),qm=Ia("transitionrun"),Im=Ia("transitionstart"),Mm=Ia("transitioncancel"),Qc=Ia("transitionend"),Zc=new Map,Li="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Li.push("scrollEnd");function Tt(e,t){Zc.set(e,t),Oa(t,[e])}var Vc=new WeakMap;function xt(e,t){if(typeof e=="object"&&e!==null){var a=Vc.get(e);return a!==void 0?a:(t={value:e,source:t,stack:cc(t)},Vc.set(e,t),t)}return{value:e,source:t,stack:cc(t)}}var vt=[],ml=0,Yi=0;function rn(){for(var e=ml,t=Yi=ml=0;t<e;){var a=vt[t];vt[t++]=null;var l=vt[t];vt[t++]=null;var s=vt[t];vt[t++]=null;var n=vt[t];if(vt[t++]=null,l!==null&&s!==null){var r=l.pending;r===null?s.next=s:(s.next=r.next,r.next=s),l.pending=s}n!==0&&kc(a,s,n)}}function un(e,t,a,l){vt[ml++]=e,vt[ml++]=t,vt[ml++]=a,vt[ml++]=l,Yi|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Qi(e,t,a,l){return un(e,t,a,l),cn(e)}function hl(e,t){return un(e,null,null,t),cn(e)}function kc(e,t,a){e.lanes|=a;var l=e.alternate;l!==null&&(l.lanes|=a);for(var s=!1,n=e.return;n!==null;)n.childLanes|=a,l=n.alternate,l!==null&&(l.childLanes|=a),n.tag===22&&(e=n.stateNode,e===null||e._visibility&1||(s=!0)),e=n,n=n.return;return e.tag===3?(n=e.stateNode,s&&t!==null&&(s=31-st(a),e=n.hiddenUpdates,l=e[s],l===null?e[s]=[t]:l.push(t),t.lane=a|536870912),n):null}function cn(e){if(50<Ns)throw Ns=0,Pr=null,Error(d(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var pl={};function $m(e,t,a,l){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function it(e,t,a,l){return new $m(e,t,a,l)}function Zi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Xt(e,t){var a=e.alternate;return a===null?(a=it(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Kc(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function on(e,t,a,l,s,n){var r=0;if(l=e,typeof e=="function")Zi(e)&&(r=1);else if(typeof e=="string")r=zh(e,a,Oe.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case ne:return e=it(31,a,t,s),e.elementType=ne,e.lanes=n,e;case w:return Ma(a.children,s,n,t);case R:r=8,s|=24;break;case $:return e=it(12,a,t,s|2),e.elementType=$,e.lanes=n,e;case Se:return e=it(13,a,t,s),e.elementType=Se,e.lanes=n,e;case Ee:return e=it(19,a,t,s),e.elementType=Ee,e.lanes=n,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case B:case ae:r=10;break e;case C:r=9;break e;case se:r=11;break e;case Qe:r=14;break e;case J:r=16,l=null;break e}r=29,a=Error(d(130,e===null?"null":typeof e,"")),l=null}return t=it(r,a,t,s),t.elementType=e,t.type=l,t.lanes=n,t}function Ma(e,t,a,l){return e=it(7,e,l,t),e.lanes=a,e}function Vi(e,t,a){return e=it(6,e,null,t),e.lanes=a,e}function ki(e,t,a){return t=it(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var yl=[],xl=0,fn=null,dn=0,bt=[],jt=0,$a=null,Ht=1,Lt="";function Ga(e,t){yl[xl++]=dn,yl[xl++]=fn,fn=e,dn=t}function Jc(e,t,a){bt[jt++]=Ht,bt[jt++]=Lt,bt[jt++]=$a,$a=e;var l=Ht;e=Lt;var s=32-st(l)-1;l&=~(1<<s),a+=1;var n=32-st(t)+s;if(30<n){var r=s-s%5;n=(l&(1<<r)-1).toString(32),l>>=r,s-=r,Ht=1<<32-st(t)+s|a<<s|l,Lt=n+e}else Ht=1<<n|a<<s|l,Lt=e}function Ki(e){e.return!==null&&(Ga(e,1),Jc(e,1,0))}function Ji(e){for(;e===fn;)fn=yl[--xl],yl[xl]=null,dn=yl[--xl],yl[xl]=null;for(;e===$a;)$a=bt[--jt],bt[jt]=null,Lt=bt[--jt],bt[jt]=null,Ht=bt[--jt],bt[jt]=null}var Ke=null,_e=null,re=!1,za=null,Dt=!1,Pi=Error(d(519));function Ba(e){var t=Error(d(418,""));throw ls(xt(t,e)),Pi}function Pc(e){var t=e.stateNode,a=e.type,l=e.memoizedProps;switch(t[Ve]=e,t[Je]=l,a){case"dialog":te("cancel",t),te("close",t);break;case"iframe":case"object":case"embed":te("load",t);break;case"video":case"audio":for(a=0;a<ws.length;a++)te(ws[a],t);break;case"source":te("error",t);break;case"img":case"image":case"link":te("error",t),te("load",t);break;case"details":te("toggle",t);break;case"input":te("invalid",t),dc(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0),Ps(t);break;case"select":te("invalid",t);break;case"textarea":te("invalid",t),mc(t,l.value,l.defaultValue,l.children),Ps(t)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||l.suppressHydrationWarning===!0||pd(t.textContent,a)?(l.popover!=null&&(te("beforetoggle",t),te("toggle",t)),l.onScroll!=null&&te("scroll",t),l.onScrollEnd!=null&&te("scrollend",t),l.onClick!=null&&(t.onclick=Zn),t=!0):t=!1,t||Ba(e)}function Wc(e){for(Ke=e.return;Ke;)switch(Ke.tag){case 5:case 13:Dt=!1;return;case 27:case 3:Dt=!0;return;default:Ke=Ke.return}}function ts(e){if(e!==Ke)return!1;if(!re)return Wc(e),re=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||gu(e.type,e.memoizedProps)),a=!a),a&&_e&&Ba(e),Wc(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(t===0){_e=Rt(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++;e=e.nextSibling}_e=null}}else t===27?(t=_e,Aa(e.type)?(e=yu,yu=null,_e=e):_e=t):_e=Ke?Rt(e.stateNode.nextSibling):null;return!0}function as(){_e=Ke=null,re=!1}function Fc(){var e=za;return e!==null&&(et===null?et=e:et.push.apply(et,e),za=null),e}function ls(e){za===null?za=[e]:za.push(e)}var Wi=Xe(null),Ca=null,Yt=null;function ra(e,t,a){ue(Wi,t._currentValue),t._currentValue=a}function Qt(e){e._currentValue=Wi.current,ve(Wi)}function Fi(e,t,a){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===a)break;e=e.return}}function er(e,t,a,l){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var n=s.dependencies;if(n!==null){var r=s.child;n=n.firstContext;e:for(;n!==null;){var o=n;n=s;for(var g=0;g<t.length;g++)if(o.context===t[g]){n.lanes|=a,o=n.alternate,o!==null&&(o.lanes|=a),Fi(n.return,a,e),l||(r=null);break e}n=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(d(341));r.lanes|=a,n=r.alternate,n!==null&&(n.lanes|=a),Fi(r,a,e),r=null}else r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function ss(e,t,a,l){e=null;for(var s=t,n=!1;s!==null;){if(!n){if((s.flags&524288)!==0)n=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(d(387));if(r=r.memoizedProps,r!==null){var o=s.type;nt(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===Pa.current){if(r=s.alternate,r===null)throw Error(d(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(qs):e=[qs])}s=s.return}e!==null&&er(t,e,a,l),t.flags|=262144}function gn(e){for(e=e.firstContext;e!==null;){if(!nt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Xa(e){Ca=e,Yt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ke(e){return eo(Ca,e)}function mn(e,t){return Ca===null&&Xa(e),eo(e,t)}function eo(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Yt===null){if(e===null)throw Error(d(308));Yt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Yt=Yt.next=t;return a}var Gm=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},zm=u.unstable_scheduleCallback,Bm=u.unstable_NormalPriority,Me={$$typeof:ae,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function tr(){return{controller:new Gm,data:new Map,refCount:0}}function ns(e){e.refCount--,e.refCount===0&&zm(Bm,function(){e.controller.abort()})}var is=null,ar=0,vl=0,bl=null;function Cm(e,t){if(is===null){var a=is=[];ar=0,vl=su(),bl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return ar++,t.then(to,to),t}function to(){if(--ar===0&&is!==null){bl!==null&&(bl.status="fulfilled");var e=is;is=null,vl=0,bl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Xm(e,t){var a=[],l={status:"pending",value:null,reason:null,then:function(s){a.push(s)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var s=0;s<a.length;s++)(0,a[s])(t)},function(s){for(l.status="rejected",l.reason=s,s=0;s<a.length;s++)(0,a[s])(void 0)}),l}var ao=D.S;D.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&Cm(e,t),ao!==null&&ao(e,t)};var Ha=Xe(null);function lr(){var e=Ha.current;return e!==null?e:xe.pooledCache}function hn(e,t){t===null?ue(Ha,Ha.current):ue(Ha,t.pool)}function lo(){var e=lr();return e===null?null:{parent:Me._currentValue,pool:e}}var rs=Error(d(460)),so=Error(d(474)),pn=Error(d(542)),sr={then:function(){}};function no(e){return e=e.status,e==="fulfilled"||e==="rejected"}function yn(){}function io(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(yn,yn),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,uo(e),e;default:if(typeof t.status=="string")t.then(yn,yn);else{if(e=xe,e!==null&&100<e.shellSuspendCounter)throw Error(d(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=l}},function(l){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,uo(e),e}throw us=t,rs}}var us=null;function ro(){if(us===null)throw Error(d(459));var e=us;return us=null,e}function uo(e){if(e===rs||e===pn)throw Error(d(483))}var ua=!1;function nr(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ir(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ca(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function oa(e,t,a){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(fe&2)!==0){var s=l.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),l.pending=t,t=cn(e),kc(e,null,a),t}return un(e,l,t,a),cn(e)}function cs(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,tc(e,a)}}function rr(e,t){var a=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var s=null,n=null;if(a=a.firstBaseUpdate,a!==null){do{var r={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};n===null?s=n=r:n=n.next=r,a=a.next}while(a!==null);n===null?s=n=t:n=n.next=t}else s=n=t;a={baseState:l.baseState,firstBaseUpdate:s,lastBaseUpdate:n,shared:l.shared,callbacks:l.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var ur=!1;function os(){if(ur){var e=bl;if(e!==null)throw e}}function fs(e,t,a,l){ur=!1;var s=e.updateQueue;ua=!1;var n=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var g=o,S=g.next;g.next=null,r===null?n=S:r.next=S,r=g;var O=e.alternate;O!==null&&(O=O.updateQueue,o=O.lastBaseUpdate,o!==r&&(o===null?O.firstBaseUpdate=S:o.next=S,O.lastBaseUpdate=g))}if(n!==null){var M=s.baseState;r=0,O=S=g=null,o=n;do{var _=o.lane&-536870913,N=_!==o.lane;if(N?(le&_)===_:(l&_)===_){_!==0&&_===vl&&(ur=!0),O!==null&&(O=O.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var k=e,Q=o;_=t;var pe=a;switch(Q.tag){case 1:if(k=Q.payload,typeof k=="function"){M=k.call(pe,M,_);break e}M=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=Q.payload,_=typeof k=="function"?k.call(pe,M,_):k,_==null)break e;M=I({},M,_);break e;case 2:ua=!0}}_=o.callback,_!==null&&(e.flags|=64,N&&(e.flags|=8192),N=s.callbacks,N===null?s.callbacks=[_]:N.push(_))}else N={lane:_,tag:o.tag,payload:o.payload,callback:o.callback,next:null},O===null?(S=O=N,g=M):O=O.next=N,r|=_;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;N=o,o=N.next,N.next=null,s.lastBaseUpdate=N,s.shared.pending=null}}while(!0);O===null&&(g=M),s.baseState=g,s.firstBaseUpdate=S,s.lastBaseUpdate=O,n===null&&(s.shared.lanes=0),xa|=r,e.lanes=r,e.memoizedState=M}}function co(e,t){if(typeof e!="function")throw Error(d(191,e));e.call(t)}function oo(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)co(a[e],t)}var jl=Xe(null),xn=Xe(0);function fo(e,t){e=Wt,ue(xn,e),ue(jl,t),Wt=e|t.baseLanes}function cr(){ue(xn,Wt),ue(jl,jl.current)}function or(){Wt=xn.current,ve(jl),ve(xn)}var fa=0,P=null,me=null,De=null,vn=!1,Al=!1,La=!1,bn=0,ds=0,Sl=null,Hm=0;function Re(){throw Error(d(321))}function fr(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!nt(e[a],t[a]))return!1;return!0}function dr(e,t,a,l,s,n){return fa=n,P=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,D.H=e===null||e.memoizedState===null?Ko:Jo,La=!1,n=a(l,s),La=!1,Al&&(n=mo(t,a,l,s)),go(e),n}function go(e){D.H=Tn;var t=me!==null&&me.next!==null;if(fa=0,De=me=P=null,vn=!1,ds=0,Sl=null,t)throw Error(d(300));e===null||ze||(e=e.dependencies,e!==null&&gn(e)&&(ze=!0))}function mo(e,t,a,l){P=e;var s=0;do{if(Al&&(Sl=null),ds=0,Al=!1,25<=s)throw Error(d(301));if(s+=1,De=me=null,e.updateQueue!=null){var n=e.updateQueue;n.lastEffect=null,n.events=null,n.stores=null,n.memoCache!=null&&(n.memoCache.index=0)}D.H=Km,n=t(a,l)}while(Al);return n}function Lm(){var e=D.H,t=e.useState()[0];return t=typeof t.then=="function"?gs(t):t,e=e.useState()[0],(me!==null?me.memoizedState:null)!==e&&(P.flags|=1024),t}function gr(){var e=bn!==0;return bn=0,e}function mr(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function hr(e){if(vn){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}vn=!1}fa=0,De=me=P=null,Al=!1,ds=bn=0,Sl=null}function We(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return De===null?P.memoizedState=De=e:De=De.next=e,De}function qe(){if(me===null){var e=P.alternate;e=e!==null?e.memoizedState:null}else e=me.next;var t=De===null?P.memoizedState:De.next;if(t!==null)De=t,me=e;else{if(e===null)throw P.alternate===null?Error(d(467)):Error(d(310));me=e,e={memoizedState:me.memoizedState,baseState:me.baseState,baseQueue:me.baseQueue,queue:me.queue,next:null},De===null?P.memoizedState=De=e:De=De.next=e}return De}function pr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function gs(e){var t=ds;return ds+=1,Sl===null&&(Sl=[]),e=io(Sl,e,t),t=P,(De===null?t.memoizedState:De.next)===null&&(t=t.alternate,D.H=t===null||t.memoizedState===null?Ko:Jo),e}function jn(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return gs(e);if(e.$$typeof===ae)return ke(e)}throw Error(d(438,String(e)))}function yr(e){var t=null,a=P.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var l=P.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=pr(),P.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),l=0;l<e;l++)a[l]=Te;return t.index++,a}function Zt(e,t){return typeof t=="function"?t(e):t}function An(e){var t=qe();return xr(t,me,e)}function xr(e,t,a){var l=e.queue;if(l===null)throw Error(d(311));l.lastRenderedReducer=a;var s=e.baseQueue,n=l.pending;if(n!==null){if(s!==null){var r=s.next;s.next=n.next,n.next=r}t.baseQueue=s=n,l.pending=null}if(n=e.baseState,s===null)e.memoizedState=n;else{t=s.next;var o=r=null,g=null,S=t,O=!1;do{var M=S.lane&-536870913;if(M!==S.lane?(le&M)===M:(fa&M)===M){var _=S.revertLane;if(_===0)g!==null&&(g=g.next={lane:0,revertLane:0,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null}),M===vl&&(O=!0);else if((fa&_)===_){S=S.next,_===vl&&(O=!0);continue}else M={lane:0,revertLane:S.revertLane,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null},g===null?(o=g=M,r=n):g=g.next=M,P.lanes|=_,xa|=_;M=S.action,La&&a(n,M),n=S.hasEagerState?S.eagerState:a(n,M)}else _={lane:M,revertLane:S.revertLane,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null},g===null?(o=g=_,r=n):g=g.next=_,P.lanes|=M,xa|=M;S=S.next}while(S!==null&&S!==t);if(g===null?r=n:g.next=o,!nt(n,e.memoizedState)&&(ze=!0,O&&(a=bl,a!==null)))throw a;e.memoizedState=n,e.baseState=r,e.baseQueue=g,l.lastRenderedState=n}return s===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function vr(e){var t=qe(),a=t.queue;if(a===null)throw Error(d(311));a.lastRenderedReducer=e;var l=a.dispatch,s=a.pending,n=t.memoizedState;if(s!==null){a.pending=null;var r=s=s.next;do n=e(n,r.action),r=r.next;while(r!==s);nt(n,t.memoizedState)||(ze=!0),t.memoizedState=n,t.baseQueue===null&&(t.baseState=n),a.lastRenderedState=n}return[n,l]}function ho(e,t,a){var l=P,s=qe(),n=re;if(n){if(a===void 0)throw Error(d(407));a=a()}else a=t();var r=!nt((me||s).memoizedState,a);r&&(s.memoizedState=a,ze=!0),s=s.queue;var o=xo.bind(null,l,s,e);if(ms(2048,8,o,[e]),s.getSnapshot!==t||r||De!==null&&De.memoizedState.tag&1){if(l.flags|=2048,_l(9,Sn(),yo.bind(null,l,s,a,t),null),xe===null)throw Error(d(349));n||(fa&124)!==0||po(l,t,a)}return a}function po(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=P.updateQueue,t===null?(t=pr(),P.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function yo(e,t,a,l){t.value=a,t.getSnapshot=l,vo(t)&&bo(e)}function xo(e,t,a){return a(function(){vo(t)&&bo(e)})}function vo(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!nt(e,a)}catch{return!0}}function bo(e){var t=hl(e,2);t!==null&&ft(t,e,2)}function br(e){var t=We();if(typeof e=="function"){var a=e;if(e=a(),La){sa(!0);try{a()}finally{sa(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zt,lastRenderedState:e},t}function jo(e,t,a,l){return e.baseState=a,xr(e,me,typeof l=="function"?l:Zt)}function Ym(e,t,a,l,s){if(Nn(e))throw Error(d(485));if(e=t.action,e!==null){var n={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){n.listeners.push(r)}};D.T!==null?a(!0):n.isTransition=!1,l(n),a=t.pending,a===null?(n.next=t.pending=n,Ao(t,n)):(n.next=a.next,t.pending=a.next=n)}}function Ao(e,t){var a=t.action,l=t.payload,s=e.state;if(t.isTransition){var n=D.T,r={};D.T=r;try{var o=a(s,l),g=D.S;g!==null&&g(r,o),So(e,t,o)}catch(S){jr(e,t,S)}finally{D.T=n}}else try{n=a(s,l),So(e,t,n)}catch(S){jr(e,t,S)}}function So(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){_o(e,t,l)},function(l){return jr(e,t,l)}):_o(e,t,a)}function _o(e,t,a){t.status="fulfilled",t.value=a,No(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Ao(e,a)))}function jr(e,t,a){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=a,No(t),t=t.next;while(t!==l)}e.action=null}function No(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function To(e,t){return t}function wo(e,t){if(re){var a=xe.formState;if(a!==null){e:{var l=P;if(re){if(_e){t:{for(var s=_e,n=Dt;s.nodeType!==8;){if(!n){s=null;break t}if(s=Rt(s.nextSibling),s===null){s=null;break t}}n=s.data,s=n==="F!"||n==="F"?s:null}if(s){_e=Rt(s.nextSibling),l=s.data==="F!";break e}}Ba(l)}l=!1}l&&(t=a[0])}}return a=We(),a.memoizedState=a.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:To,lastRenderedState:t},a.queue=l,a=Zo.bind(null,P,l),l.dispatch=a,l=br(!1),n=Tr.bind(null,P,!1,l.queue),l=We(),s={state:t,dispatch:null,action:e,pending:null},l.queue=s,a=Ym.bind(null,P,s,n,a),s.dispatch=a,l.memoizedState=e,[t,a,!1]}function Ro(e){var t=qe();return Uo(t,me,e)}function Uo(e,t,a){if(t=xr(e,t,To)[0],e=An(Zt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=gs(t)}catch(r){throw r===rs?pn:r}else l=t;t=qe();var s=t.queue,n=s.dispatch;return a!==t.memoizedState&&(P.flags|=2048,_l(9,Sn(),Qm.bind(null,s,a),null)),[l,n,e]}function Qm(e,t){e.action=t}function Eo(e){var t=qe(),a=me;if(a!==null)return Uo(t,a,e);qe(),t=t.memoizedState,a=qe();var l=a.queue.dispatch;return a.memoizedState=e,[t,l,!1]}function _l(e,t,a,l){return e={tag:e,create:a,deps:l,inst:t,next:null},t=P.updateQueue,t===null&&(t=pr(),P.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(l=a.next,a.next=e,e.next=l,t.lastEffect=e),e}function Sn(){return{destroy:void 0,resource:void 0}}function Oo(){return qe().memoizedState}function _n(e,t,a,l){var s=We();l=l===void 0?null:l,P.flags|=e,s.memoizedState=_l(1|t,Sn(),a,l)}function ms(e,t,a,l){var s=qe();l=l===void 0?null:l;var n=s.memoizedState.inst;me!==null&&l!==null&&fr(l,me.memoizedState.deps)?s.memoizedState=_l(t,n,a,l):(P.flags|=e,s.memoizedState=_l(1|t,n,a,l))}function Do(e,t){_n(8390656,8,e,t)}function qo(e,t){ms(2048,8,e,t)}function Io(e,t){return ms(4,2,e,t)}function Mo(e,t){return ms(4,4,e,t)}function $o(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Go(e,t,a){a=a!=null?a.concat([e]):null,ms(4,4,$o.bind(null,t,e),a)}function Ar(){}function zo(e,t){var a=qe();t=t===void 0?null:t;var l=a.memoizedState;return t!==null&&fr(t,l[1])?l[0]:(a.memoizedState=[e,t],e)}function Bo(e,t){var a=qe();t=t===void 0?null:t;var l=a.memoizedState;if(t!==null&&fr(t,l[1]))return l[0];if(l=e(),La){sa(!0);try{e()}finally{sa(!1)}}return a.memoizedState=[l,t],l}function Sr(e,t,a){return a===void 0||(fa&1073741824)!==0?e.memoizedState=t:(e.memoizedState=a,e=Lf(),P.lanes|=e,xa|=e,a)}function Co(e,t,a,l){return nt(a,t)?a:jl.current!==null?(e=Sr(e,a,l),nt(e,t)||(ze=!0),e):(fa&42)===0?(ze=!0,e.memoizedState=a):(e=Lf(),P.lanes|=e,xa|=e,t)}function Xo(e,t,a,l,s){var n=X.p;X.p=n!==0&&8>n?n:8;var r=D.T,o={};D.T=o,Tr(e,!1,t,a);try{var g=s(),S=D.S;if(S!==null&&S(o,g),g!==null&&typeof g=="object"&&typeof g.then=="function"){var O=Xm(g,l);hs(e,t,O,ot(e))}else hs(e,t,l,ot(e))}catch(M){hs(e,t,{then:function(){},status:"rejected",reason:M},ot())}finally{X.p=n,D.T=r}}function Zm(){}function _r(e,t,a,l){if(e.tag!==5)throw Error(d(476));var s=Ho(e).queue;Xo(e,s,t,V,a===null?Zm:function(){return Lo(e),a(l)})}function Ho(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:V,baseState:V,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zt,lastRenderedState:V},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Lo(e){var t=Ho(e).next.queue;hs(e,t,{},ot())}function Nr(){return ke(qs)}function Yo(){return qe().memoizedState}function Qo(){return qe().memoizedState}function Vm(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=ot();e=ca(a);var l=oa(t,e,a);l!==null&&(ft(l,t,a),cs(l,t,a)),t={cache:tr()},e.payload=t;return}t=t.return}}function km(e,t,a){var l=ot();a={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},Nn(e)?Vo(t,a):(a=Qi(e,t,a,l),a!==null&&(ft(a,e,l),ko(a,t,l)))}function Zo(e,t,a){var l=ot();hs(e,t,a,l)}function hs(e,t,a,l){var s={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(Nn(e))Vo(t,s);else{var n=e.alternate;if(e.lanes===0&&(n===null||n.lanes===0)&&(n=t.lastRenderedReducer,n!==null))try{var r=t.lastRenderedState,o=n(r,a);if(s.hasEagerState=!0,s.eagerState=o,nt(o,r))return un(e,t,s,0),xe===null&&rn(),!1}catch{}finally{}if(a=Qi(e,t,s,l),a!==null)return ft(a,e,l),ko(a,t,l),!0}return!1}function Tr(e,t,a,l){if(l={lane:2,revertLane:su(),action:l,hasEagerState:!1,eagerState:null,next:null},Nn(e)){if(t)throw Error(d(479))}else t=Qi(e,a,l,2),t!==null&&ft(t,e,2)}function Nn(e){var t=e.alternate;return e===P||t!==null&&t===P}function Vo(e,t){Al=vn=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function ko(e,t,a){if((a&4194048)!==0){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,tc(e,a)}}var Tn={readContext:ke,use:jn,useCallback:Re,useContext:Re,useEffect:Re,useImperativeHandle:Re,useLayoutEffect:Re,useInsertionEffect:Re,useMemo:Re,useReducer:Re,useRef:Re,useState:Re,useDebugValue:Re,useDeferredValue:Re,useTransition:Re,useSyncExternalStore:Re,useId:Re,useHostTransitionStatus:Re,useFormState:Re,useActionState:Re,useOptimistic:Re,useMemoCache:Re,useCacheRefresh:Re},Ko={readContext:ke,use:jn,useCallback:function(e,t){return We().memoizedState=[e,t===void 0?null:t],e},useContext:ke,useEffect:Do,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,_n(4194308,4,$o.bind(null,t,e),a)},useLayoutEffect:function(e,t){return _n(4194308,4,e,t)},useInsertionEffect:function(e,t){_n(4,2,e,t)},useMemo:function(e,t){var a=We();t=t===void 0?null:t;var l=e();if(La){sa(!0);try{e()}finally{sa(!1)}}return a.memoizedState=[l,t],l},useReducer:function(e,t,a){var l=We();if(a!==void 0){var s=a(t);if(La){sa(!0);try{a(t)}finally{sa(!1)}}}else s=t;return l.memoizedState=l.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},l.queue=e,e=e.dispatch=km.bind(null,P,e),[l.memoizedState,e]},useRef:function(e){var t=We();return e={current:e},t.memoizedState=e},useState:function(e){e=br(e);var t=e.queue,a=Zo.bind(null,P,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Ar,useDeferredValue:function(e,t){var a=We();return Sr(a,e,t)},useTransition:function(){var e=br(!1);return e=Xo.bind(null,P,e.queue,!0,!1),We().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var l=P,s=We();if(re){if(a===void 0)throw Error(d(407));a=a()}else{if(a=t(),xe===null)throw Error(d(349));(le&124)!==0||po(l,t,a)}s.memoizedState=a;var n={value:a,getSnapshot:t};return s.queue=n,Do(xo.bind(null,l,n,e),[e]),l.flags|=2048,_l(9,Sn(),yo.bind(null,l,n,a,t),null),a},useId:function(){var e=We(),t=xe.identifierPrefix;if(re){var a=Lt,l=Ht;a=(l&~(1<<32-st(l)-1)).toString(32)+a,t="«"+t+"R"+a,a=bn++,0<a&&(t+="H"+a.toString(32)),t+="»"}else a=Hm++,t="«"+t+"r"+a.toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:Nr,useFormState:wo,useActionState:wo,useOptimistic:function(e){var t=We();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=Tr.bind(null,P,!0,a),a.dispatch=t,[e,t]},useMemoCache:yr,useCacheRefresh:function(){return We().memoizedState=Vm.bind(null,P)}},Jo={readContext:ke,use:jn,useCallback:zo,useContext:ke,useEffect:qo,useImperativeHandle:Go,useInsertionEffect:Io,useLayoutEffect:Mo,useMemo:Bo,useReducer:An,useRef:Oo,useState:function(){return An(Zt)},useDebugValue:Ar,useDeferredValue:function(e,t){var a=qe();return Co(a,me.memoizedState,e,t)},useTransition:function(){var e=An(Zt)[0],t=qe().memoizedState;return[typeof e=="boolean"?e:gs(e),t]},useSyncExternalStore:ho,useId:Yo,useHostTransitionStatus:Nr,useFormState:Ro,useActionState:Ro,useOptimistic:function(e,t){var a=qe();return jo(a,me,e,t)},useMemoCache:yr,useCacheRefresh:Qo},Km={readContext:ke,use:jn,useCallback:zo,useContext:ke,useEffect:qo,useImperativeHandle:Go,useInsertionEffect:Io,useLayoutEffect:Mo,useMemo:Bo,useReducer:vr,useRef:Oo,useState:function(){return vr(Zt)},useDebugValue:Ar,useDeferredValue:function(e,t){var a=qe();return me===null?Sr(a,e,t):Co(a,me.memoizedState,e,t)},useTransition:function(){var e=vr(Zt)[0],t=qe().memoizedState;return[typeof e=="boolean"?e:gs(e),t]},useSyncExternalStore:ho,useId:Yo,useHostTransitionStatus:Nr,useFormState:Eo,useActionState:Eo,useOptimistic:function(e,t){var a=qe();return me!==null?jo(a,me,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:yr,useCacheRefresh:Qo},Nl=null,ps=0;function wn(e){var t=ps;return ps+=1,Nl===null&&(Nl=[]),io(Nl,e,t)}function ys(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Rn(e,t){throw t.$$typeof===T?Error(d(525)):(e=Object.prototype.toString.call(t),Error(d(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Po(e){var t=e._init;return t(e._payload)}function Wo(e){function t(y,h){if(e){var b=y.deletions;b===null?(y.deletions=[h],y.flags|=16):b.push(h)}}function a(y,h){if(!e)return null;for(;h!==null;)t(y,h),h=h.sibling;return null}function l(y){for(var h=new Map;y!==null;)y.key!==null?h.set(y.key,y):h.set(y.index,y),y=y.sibling;return h}function s(y,h){return y=Xt(y,h),y.index=0,y.sibling=null,y}function n(y,h,b){return y.index=b,e?(b=y.alternate,b!==null?(b=b.index,b<h?(y.flags|=67108866,h):b):(y.flags|=67108866,h)):(y.flags|=1048576,h)}function r(y){return e&&y.alternate===null&&(y.flags|=67108866),y}function o(y,h,b,q){return h===null||h.tag!==6?(h=Vi(b,y.mode,q),h.return=y,h):(h=s(h,b),h.return=y,h)}function g(y,h,b,q){var H=b.type;return H===w?O(y,h,b.props.children,q,b.key):h!==null&&(h.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===J&&Po(H)===h.type)?(h=s(h,b.props),ys(h,b),h.return=y,h):(h=on(b.type,b.key,b.props,null,y.mode,q),ys(h,b),h.return=y,h)}function S(y,h,b,q){return h===null||h.tag!==4||h.stateNode.containerInfo!==b.containerInfo||h.stateNode.implementation!==b.implementation?(h=ki(b,y.mode,q),h.return=y,h):(h=s(h,b.children||[]),h.return=y,h)}function O(y,h,b,q,H){return h===null||h.tag!==7?(h=Ma(b,y.mode,q,H),h.return=y,h):(h=s(h,b),h.return=y,h)}function M(y,h,b){if(typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint")return h=Vi(""+h,y.mode,b),h.return=y,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case v:return b=on(h.type,h.key,h.props,null,y.mode,b),ys(b,h),b.return=y,b;case p:return h=ki(h,y.mode,b),h.return=y,h;case J:var q=h._init;return h=q(h._payload),M(y,h,b)}if(mt(h)||Ze(h))return h=Ma(h,y.mode,b,null),h.return=y,h;if(typeof h.then=="function")return M(y,wn(h),b);if(h.$$typeof===ae)return M(y,mn(y,h),b);Rn(y,h)}return null}function _(y,h,b,q){var H=h!==null?h.key:null;if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return H!==null?null:o(y,h,""+b,q);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case v:return b.key===H?g(y,h,b,q):null;case p:return b.key===H?S(y,h,b,q):null;case J:return H=b._init,b=H(b._payload),_(y,h,b,q)}if(mt(b)||Ze(b))return H!==null?null:O(y,h,b,q,null);if(typeof b.then=="function")return _(y,h,wn(b),q);if(b.$$typeof===ae)return _(y,h,mn(y,b),q);Rn(y,b)}return null}function N(y,h,b,q,H){if(typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint")return y=y.get(b)||null,o(h,y,""+q,H);if(typeof q=="object"&&q!==null){switch(q.$$typeof){case v:return y=y.get(q.key===null?b:q.key)||null,g(h,y,q,H);case p:return y=y.get(q.key===null?b:q.key)||null,S(h,y,q,H);case J:var F=q._init;return q=F(q._payload),N(y,h,b,q,H)}if(mt(q)||Ze(q))return y=y.get(b)||null,O(h,y,q,H,null);if(typeof q.then=="function")return N(y,h,b,wn(q),H);if(q.$$typeof===ae)return N(y,h,b,mn(h,q),H);Rn(h,q)}return null}function k(y,h,b,q){for(var H=null,F=null,Y=h,Z=h=0,Ce=null;Y!==null&&Z<b.length;Z++){Y.index>Z?(Ce=Y,Y=null):Ce=Y.sibling;var ie=_(y,Y,b[Z],q);if(ie===null){Y===null&&(Y=Ce);break}e&&Y&&ie.alternate===null&&t(y,Y),h=n(ie,h,Z),F===null?H=ie:F.sibling=ie,F=ie,Y=Ce}if(Z===b.length)return a(y,Y),re&&Ga(y,Z),H;if(Y===null){for(;Z<b.length;Z++)Y=M(y,b[Z],q),Y!==null&&(h=n(Y,h,Z),F===null?H=Y:F.sibling=Y,F=Y);return re&&Ga(y,Z),H}for(Y=l(Y);Z<b.length;Z++)Ce=N(Y,y,Z,b[Z],q),Ce!==null&&(e&&Ce.alternate!==null&&Y.delete(Ce.key===null?Z:Ce.key),h=n(Ce,h,Z),F===null?H=Ce:F.sibling=Ce,F=Ce);return e&&Y.forEach(function(wa){return t(y,wa)}),re&&Ga(y,Z),H}function Q(y,h,b,q){if(b==null)throw Error(d(151));for(var H=null,F=null,Y=h,Z=h=0,Ce=null,ie=b.next();Y!==null&&!ie.done;Z++,ie=b.next()){Y.index>Z?(Ce=Y,Y=null):Ce=Y.sibling;var wa=_(y,Y,ie.value,q);if(wa===null){Y===null&&(Y=Ce);break}e&&Y&&wa.alternate===null&&t(y,Y),h=n(wa,h,Z),F===null?H=wa:F.sibling=wa,F=wa,Y=Ce}if(ie.done)return a(y,Y),re&&Ga(y,Z),H;if(Y===null){for(;!ie.done;Z++,ie=b.next())ie=M(y,ie.value,q),ie!==null&&(h=n(ie,h,Z),F===null?H=ie:F.sibling=ie,F=ie);return re&&Ga(y,Z),H}for(Y=l(Y);!ie.done;Z++,ie=b.next())ie=N(Y,y,Z,ie.value,q),ie!==null&&(e&&ie.alternate!==null&&Y.delete(ie.key===null?Z:ie.key),h=n(ie,h,Z),F===null?H=ie:F.sibling=ie,F=ie);return e&&Y.forEach(function(Jh){return t(y,Jh)}),re&&Ga(y,Z),H}function pe(y,h,b,q){if(typeof b=="object"&&b!==null&&b.type===w&&b.key===null&&(b=b.props.children),typeof b=="object"&&b!==null){switch(b.$$typeof){case v:e:{for(var H=b.key;h!==null;){if(h.key===H){if(H=b.type,H===w){if(h.tag===7){a(y,h.sibling),q=s(h,b.props.children),q.return=y,y=q;break e}}else if(h.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===J&&Po(H)===h.type){a(y,h.sibling),q=s(h,b.props),ys(q,b),q.return=y,y=q;break e}a(y,h);break}else t(y,h);h=h.sibling}b.type===w?(q=Ma(b.props.children,y.mode,q,b.key),q.return=y,y=q):(q=on(b.type,b.key,b.props,null,y.mode,q),ys(q,b),q.return=y,y=q)}return r(y);case p:e:{for(H=b.key;h!==null;){if(h.key===H)if(h.tag===4&&h.stateNode.containerInfo===b.containerInfo&&h.stateNode.implementation===b.implementation){a(y,h.sibling),q=s(h,b.children||[]),q.return=y,y=q;break e}else{a(y,h);break}else t(y,h);h=h.sibling}q=ki(b,y.mode,q),q.return=y,y=q}return r(y);case J:return H=b._init,b=H(b._payload),pe(y,h,b,q)}if(mt(b))return k(y,h,b,q);if(Ze(b)){if(H=Ze(b),typeof H!="function")throw Error(d(150));return b=H.call(b),Q(y,h,b,q)}if(typeof b.then=="function")return pe(y,h,wn(b),q);if(b.$$typeof===ae)return pe(y,h,mn(y,b),q);Rn(y,b)}return typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint"?(b=""+b,h!==null&&h.tag===6?(a(y,h.sibling),q=s(h,b),q.return=y,y=q):(a(y,h),q=Vi(b,y.mode,q),q.return=y,y=q),r(y)):a(y,h)}return function(y,h,b,q){try{ps=0;var H=pe(y,h,b,q);return Nl=null,H}catch(Y){if(Y===rs||Y===pn)throw Y;var F=it(29,Y,null,y.mode);return F.lanes=q,F.return=y,F}finally{}}}var Tl=Wo(!0),Fo=Wo(!1),At=Xe(null),qt=null;function da(e){var t=e.alternate;ue($e,$e.current&1),ue(At,e),qt===null&&(t===null||jl.current!==null||t.memoizedState!==null)&&(qt=e)}function ef(e){if(e.tag===22){if(ue($e,$e.current),ue(At,e),qt===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(qt=e)}}else ga()}function ga(){ue($e,$e.current),ue(At,At.current)}function Vt(e){ve(At),qt===e&&(qt=null),ve($e)}var $e=Xe(0);function Un(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||pu(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function wr(e,t,a,l){t=e.memoizedState,a=a(l,t),a=a==null?t:I({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Rr={enqueueSetState:function(e,t,a){e=e._reactInternals;var l=ot(),s=ca(l);s.payload=t,a!=null&&(s.callback=a),t=oa(e,s,l),t!==null&&(ft(t,e,l),cs(t,e,l))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var l=ot(),s=ca(l);s.tag=1,s.payload=t,a!=null&&(s.callback=a),t=oa(e,s,l),t!==null&&(ft(t,e,l),cs(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=ot(),l=ca(a);l.tag=2,t!=null&&(l.callback=t),t=oa(e,l,a),t!==null&&(ft(t,e,a),cs(t,e,a))}};function tf(e,t,a,l,s,n,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,n,r):t.prototype&&t.prototype.isPureReactComponent?!Fl(a,l)||!Fl(s,n):!0}function af(e,t,a,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,l),t.state!==e&&Rr.enqueueReplaceState(t,t.state,null)}function Ya(e,t){var a=t;if("ref"in t){a={};for(var l in t)l!=="ref"&&(a[l]=t[l])}if(e=e.defaultProps){a===t&&(a=I({},a));for(var s in e)a[s]===void 0&&(a[s]=e[s])}return a}var En=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function lf(e){En(e)}function sf(e){console.error(e)}function nf(e){En(e)}function On(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function rf(e,t,a){try{var l=e.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function Ur(e,t,a){return a=ca(a),a.tag=3,a.payload={element:null},a.callback=function(){On(e,t)},a}function uf(e){return e=ca(e),e.tag=3,e}function cf(e,t,a,l){var s=a.type.getDerivedStateFromError;if(typeof s=="function"){var n=l.value;e.payload=function(){return s(n)},e.callback=function(){rf(t,a,l)}}var r=a.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){rf(t,a,l),typeof s!="function"&&(va===null?va=new Set([this]):va.add(this));var o=l.stack;this.componentDidCatch(l.value,{componentStack:o!==null?o:""})})}function Jm(e,t,a,l,s){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=a.alternate,t!==null&&ss(t,a,s,!0),a=At.current,a!==null){switch(a.tag){case 13:return qt===null?Fr():a.alternate===null&&Ne===0&&(Ne=3),a.flags&=-257,a.flags|=65536,a.lanes=s,l===sr?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([l]):t.add(l),tu(e,l,s)),!1;case 22:return a.flags|=65536,l===sr?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([l]):a.add(l)),tu(e,l,s)),!1}throw Error(d(435,a.tag))}return tu(e,l,s),Fr(),!1}if(re)return t=At.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,l!==Pi&&(e=Error(d(422),{cause:l}),ls(xt(e,a)))):(l!==Pi&&(t=Error(d(423),{cause:l}),ls(xt(t,a))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,l=xt(l,a),s=Ur(e.stateNode,l,s),rr(e,s),Ne!==4&&(Ne=2)),!1;var n=Error(d(520),{cause:l});if(n=xt(n,a),_s===null?_s=[n]:_s.push(n),Ne!==4&&(Ne=2),t===null)return!0;l=xt(l,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=s&-s,a.lanes|=e,e=Ur(a.stateNode,l,e),rr(a,e),!1;case 1:if(t=a.type,n=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||n!==null&&typeof n.componentDidCatch=="function"&&(va===null||!va.has(n))))return a.flags|=65536,s&=-s,a.lanes|=s,s=uf(s),cf(s,e,a,l),rr(a,s),!1}a=a.return}while(a!==null);return!1}var of=Error(d(461)),ze=!1;function He(e,t,a,l){t.child=e===null?Fo(t,null,a,l):Tl(t,e.child,a,l)}function ff(e,t,a,l,s){a=a.render;var n=t.ref;if("ref"in l){var r={};for(var o in l)o!=="ref"&&(r[o]=l[o])}else r=l;return Xa(t),l=dr(e,t,a,r,n,s),o=gr(),e!==null&&!ze?(mr(e,t,s),kt(e,t,s)):(re&&o&&Ki(t),t.flags|=1,He(e,t,l,s),t.child)}function df(e,t,a,l,s){if(e===null){var n=a.type;return typeof n=="function"&&!Zi(n)&&n.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=n,gf(e,t,n,l,s)):(e=on(a.type,null,l,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(n=e.child,!Gr(e,s)){var r=n.memoizedProps;if(a=a.compare,a=a!==null?a:Fl,a(r,l)&&e.ref===t.ref)return kt(e,t,s)}return t.flags|=1,e=Xt(n,l),e.ref=t.ref,e.return=t,t.child=e}function gf(e,t,a,l,s){if(e!==null){var n=e.memoizedProps;if(Fl(n,l)&&e.ref===t.ref)if(ze=!1,t.pendingProps=l=n,Gr(e,s))(e.flags&131072)!==0&&(ze=!0);else return t.lanes=e.lanes,kt(e,t,s)}return Er(e,t,a,l,s)}function mf(e,t,a){var l=t.pendingProps,s=l.children,n=e!==null?e.memoizedState:null;if(l.mode==="hidden"){if((t.flags&128)!==0){if(l=n!==null?n.baseLanes|a:a,e!==null){for(s=t.child=e.child,n=0;s!==null;)n=n|s.lanes|s.childLanes,s=s.sibling;t.childLanes=n&~l}else t.childLanes=0,t.child=null;return hf(e,t,l,a)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&hn(t,n!==null?n.cachePool:null),n!==null?fo(t,n):cr(),ef(t);else return t.lanes=t.childLanes=536870912,hf(e,t,n!==null?n.baseLanes|a:a,a)}else n!==null?(hn(t,n.cachePool),fo(t,n),ga(),t.memoizedState=null):(e!==null&&hn(t,null),cr(),ga());return He(e,t,s,a),t.child}function hf(e,t,a,l){var s=lr();return s=s===null?null:{parent:Me._currentValue,pool:s},t.memoizedState={baseLanes:a,cachePool:s},e!==null&&hn(t,null),cr(),ef(t),e!==null&&ss(e,t,l,!0),null}function Dn(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(d(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Er(e,t,a,l,s){return Xa(t),a=dr(e,t,a,l,void 0,s),l=gr(),e!==null&&!ze?(mr(e,t,s),kt(e,t,s)):(re&&l&&Ki(t),t.flags|=1,He(e,t,a,s),t.child)}function pf(e,t,a,l,s,n){return Xa(t),t.updateQueue=null,a=mo(t,l,a,s),go(e),l=gr(),e!==null&&!ze?(mr(e,t,n),kt(e,t,n)):(re&&l&&Ki(t),t.flags|=1,He(e,t,a,n),t.child)}function yf(e,t,a,l,s){if(Xa(t),t.stateNode===null){var n=pl,r=a.contextType;typeof r=="object"&&r!==null&&(n=ke(r)),n=new a(l,n),t.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Rr,t.stateNode=n,n._reactInternals=t,n=t.stateNode,n.props=l,n.state=t.memoizedState,n.refs={},nr(t),r=a.contextType,n.context=typeof r=="object"&&r!==null?ke(r):pl,n.state=t.memoizedState,r=a.getDerivedStateFromProps,typeof r=="function"&&(wr(t,a,r,l),n.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof n.getSnapshotBeforeUpdate=="function"||typeof n.UNSAFE_componentWillMount!="function"&&typeof n.componentWillMount!="function"||(r=n.state,typeof n.componentWillMount=="function"&&n.componentWillMount(),typeof n.UNSAFE_componentWillMount=="function"&&n.UNSAFE_componentWillMount(),r!==n.state&&Rr.enqueueReplaceState(n,n.state,null),fs(t,l,n,s),os(),n.state=t.memoizedState),typeof n.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){n=t.stateNode;var o=t.memoizedProps,g=Ya(a,o);n.props=g;var S=n.context,O=a.contextType;r=pl,typeof O=="object"&&O!==null&&(r=ke(O));var M=a.getDerivedStateFromProps;O=typeof M=="function"||typeof n.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,O||typeof n.UNSAFE_componentWillReceiveProps!="function"&&typeof n.componentWillReceiveProps!="function"||(o||S!==r)&&af(t,n,l,r),ua=!1;var _=t.memoizedState;n.state=_,fs(t,l,n,s),os(),S=t.memoizedState,o||_!==S||ua?(typeof M=="function"&&(wr(t,a,M,l),S=t.memoizedState),(g=ua||tf(t,a,g,l,_,S,r))?(O||typeof n.UNSAFE_componentWillMount!="function"&&typeof n.componentWillMount!="function"||(typeof n.componentWillMount=="function"&&n.componentWillMount(),typeof n.UNSAFE_componentWillMount=="function"&&n.UNSAFE_componentWillMount()),typeof n.componentDidMount=="function"&&(t.flags|=4194308)):(typeof n.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=S),n.props=l,n.state=S,n.context=r,l=g):(typeof n.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{n=t.stateNode,ir(e,t),r=t.memoizedProps,O=Ya(a,r),n.props=O,M=t.pendingProps,_=n.context,S=a.contextType,g=pl,typeof S=="object"&&S!==null&&(g=ke(S)),o=a.getDerivedStateFromProps,(S=typeof o=="function"||typeof n.getSnapshotBeforeUpdate=="function")||typeof n.UNSAFE_componentWillReceiveProps!="function"&&typeof n.componentWillReceiveProps!="function"||(r!==M||_!==g)&&af(t,n,l,g),ua=!1,_=t.memoizedState,n.state=_,fs(t,l,n,s),os();var N=t.memoizedState;r!==M||_!==N||ua||e!==null&&e.dependencies!==null&&gn(e.dependencies)?(typeof o=="function"&&(wr(t,a,o,l),N=t.memoizedState),(O=ua||tf(t,a,O,l,_,N,g)||e!==null&&e.dependencies!==null&&gn(e.dependencies))?(S||typeof n.UNSAFE_componentWillUpdate!="function"&&typeof n.componentWillUpdate!="function"||(typeof n.componentWillUpdate=="function"&&n.componentWillUpdate(l,N,g),typeof n.UNSAFE_componentWillUpdate=="function"&&n.UNSAFE_componentWillUpdate(l,N,g)),typeof n.componentDidUpdate=="function"&&(t.flags|=4),typeof n.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof n.componentDidUpdate!="function"||r===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof n.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=N),n.props=l,n.state=N,n.context=g,l=O):(typeof n.componentDidUpdate!="function"||r===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof n.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),l=!1)}return n=l,Dn(e,t),l=(t.flags&128)!==0,n||l?(n=t.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:n.render(),t.flags|=1,e!==null&&l?(t.child=Tl(t,e.child,null,s),t.child=Tl(t,null,a,s)):He(e,t,a,s),t.memoizedState=n.state,e=t.child):e=kt(e,t,s),e}function xf(e,t,a,l){return as(),t.flags|=256,He(e,t,a,l),t.child}var Or={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Dr(e){return{baseLanes:e,cachePool:lo()}}function qr(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=St),e}function vf(e,t,a){var l=t.pendingProps,s=!1,n=(t.flags&128)!==0,r;if((r=n)||(r=e!==null&&e.memoizedState===null?!1:($e.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(re){if(s?da(t):ga(),re){var o=_e,g;if(g=o){e:{for(g=o,o=Dt;g.nodeType!==8;){if(!o){o=null;break e}if(g=Rt(g.nextSibling),g===null){o=null;break e}}o=g}o!==null?(t.memoizedState={dehydrated:o,treeContext:$a!==null?{id:Ht,overflow:Lt}:null,retryLane:536870912,hydrationErrors:null},g=it(18,null,null,0),g.stateNode=o,g.return=t,t.child=g,Ke=t,_e=null,g=!0):g=!1}g||Ba(t)}if(o=t.memoizedState,o!==null&&(o=o.dehydrated,o!==null))return pu(o)?t.lanes=32:t.lanes=536870912,null;Vt(t)}return o=l.children,l=l.fallback,s?(ga(),s=t.mode,o=qn({mode:"hidden",children:o},s),l=Ma(l,s,a,null),o.return=t,l.return=t,o.sibling=l,t.child=o,s=t.child,s.memoizedState=Dr(a),s.childLanes=qr(e,r,a),t.memoizedState=Or,l):(da(t),Ir(t,o))}if(g=e.memoizedState,g!==null&&(o=g.dehydrated,o!==null)){if(n)t.flags&256?(da(t),t.flags&=-257,t=Mr(e,t,a)):t.memoizedState!==null?(ga(),t.child=e.child,t.flags|=128,t=null):(ga(),s=l.fallback,o=t.mode,l=qn({mode:"visible",children:l.children},o),s=Ma(s,o,a,null),s.flags|=2,l.return=t,s.return=t,l.sibling=s,t.child=l,Tl(t,e.child,null,a),l=t.child,l.memoizedState=Dr(a),l.childLanes=qr(e,r,a),t.memoizedState=Or,t=s);else if(da(t),pu(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var S=r.dgst;r=S,l=Error(d(419)),l.stack="",l.digest=r,ls({value:l,source:null,stack:null}),t=Mr(e,t,a)}else if(ze||ss(e,t,a,!1),r=(a&e.childLanes)!==0,ze||r){if(r=xe,r!==null&&(l=a&-a,l=(l&42)!==0?1:yi(l),l=(l&(r.suspendedLanes|a))!==0?0:l,l!==0&&l!==g.retryLane))throw g.retryLane=l,hl(e,l),ft(r,e,l),of;o.data==="$?"||Fr(),t=Mr(e,t,a)}else o.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=g.treeContext,_e=Rt(o.nextSibling),Ke=t,re=!0,za=null,Dt=!1,e!==null&&(bt[jt++]=Ht,bt[jt++]=Lt,bt[jt++]=$a,Ht=e.id,Lt=e.overflow,$a=t),t=Ir(t,l.children),t.flags|=4096);return t}return s?(ga(),s=l.fallback,o=t.mode,g=e.child,S=g.sibling,l=Xt(g,{mode:"hidden",children:l.children}),l.subtreeFlags=g.subtreeFlags&65011712,S!==null?s=Xt(S,s):(s=Ma(s,o,a,null),s.flags|=2),s.return=t,l.return=t,l.sibling=s,t.child=l,l=s,s=t.child,o=e.child.memoizedState,o===null?o=Dr(a):(g=o.cachePool,g!==null?(S=Me._currentValue,g=g.parent!==S?{parent:S,pool:S}:g):g=lo(),o={baseLanes:o.baseLanes|a,cachePool:g}),s.memoizedState=o,s.childLanes=qr(e,r,a),t.memoizedState=Or,l):(da(t),a=e.child,e=a.sibling,a=Xt(a,{mode:"visible",children:l.children}),a.return=t,a.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=a,t.memoizedState=null,a)}function Ir(e,t){return t=qn({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function qn(e,t){return e=it(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Mr(e,t,a){return Tl(t,e.child,null,a),e=Ir(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function bf(e,t,a){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),Fi(e.return,t,a)}function $r(e,t,a,l,s){var n=e.memoizedState;n===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:s}:(n.isBackwards=t,n.rendering=null,n.renderingStartTime=0,n.last=l,n.tail=a,n.tailMode=s)}function jf(e,t,a){var l=t.pendingProps,s=l.revealOrder,n=l.tail;if(He(e,t,l.children,a),l=$e.current,(l&2)!==0)l=l&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&bf(e,a,t);else if(e.tag===19)bf(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}switch(ue($e,l),s){case"forwards":for(a=t.child,s=null;a!==null;)e=a.alternate,e!==null&&Un(e)===null&&(s=a),a=a.sibling;a=s,a===null?(s=t.child,t.child=null):(s=a.sibling,a.sibling=null),$r(t,!1,s,a,n);break;case"backwards":for(a=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Un(e)===null){t.child=s;break}e=s.sibling,s.sibling=a,a=s,s=e}$r(t,!0,a,null,n);break;case"together":$r(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function kt(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),xa|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(ss(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(d(153));if(t.child!==null){for(e=t.child,a=Xt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Xt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Gr(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&gn(e)))}function Pm(e,t,a){switch(t.tag){case 3:Wa(t,t.stateNode.containerInfo),ra(t,Me,e.memoizedState.cache),as();break;case 27:case 5:la(t);break;case 4:Wa(t,t.stateNode.containerInfo);break;case 10:ra(t,t.type,t.memoizedProps.value);break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(da(t),t.flags|=128,null):(a&t.child.childLanes)!==0?vf(e,t,a):(da(t),e=kt(e,t,a),e!==null?e.sibling:null);da(t);break;case 19:var s=(e.flags&128)!==0;if(l=(a&t.childLanes)!==0,l||(ss(e,t,a,!1),l=(a&t.childLanes)!==0),s){if(l)return jf(e,t,a);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ue($e,$e.current),l)break;return null;case 22:case 23:return t.lanes=0,mf(e,t,a);case 24:ra(t,Me,e.memoizedState.cache)}return kt(e,t,a)}function Af(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)ze=!0;else{if(!Gr(e,a)&&(t.flags&128)===0)return ze=!1,Pm(e,t,a);ze=(e.flags&131072)!==0}else ze=!1,re&&(t.flags&1048576)!==0&&Jc(t,dn,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var l=t.elementType,s=l._init;if(l=s(l._payload),t.type=l,typeof l=="function")Zi(l)?(e=Ya(l,e),t.tag=1,t=yf(null,t,l,e,a)):(t.tag=0,t=Er(null,t,l,e,a));else{if(l!=null){if(s=l.$$typeof,s===se){t.tag=11,t=ff(null,t,l,e,a);break e}else if(s===Qe){t.tag=14,t=df(null,t,l,e,a);break e}}throw t=Ua(l)||l,Error(d(306,t,""))}}return t;case 0:return Er(e,t,t.type,t.pendingProps,a);case 1:return l=t.type,s=Ya(l,t.pendingProps),yf(e,t,l,s,a);case 3:e:{if(Wa(t,t.stateNode.containerInfo),e===null)throw Error(d(387));l=t.pendingProps;var n=t.memoizedState;s=n.element,ir(e,t),fs(t,l,null,a);var r=t.memoizedState;if(l=r.cache,ra(t,Me,l),l!==n.cache&&er(t,[Me],a,!0),os(),l=r.element,n.isDehydrated)if(n={element:l,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=n,t.memoizedState=n,t.flags&256){t=xf(e,t,l,a);break e}else if(l!==s){s=xt(Error(d(424)),t),ls(s),t=xf(e,t,l,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(_e=Rt(e.firstChild),Ke=t,re=!0,za=null,Dt=!0,a=Fo(t,null,l,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(as(),l===s){t=kt(e,t,a);break e}He(e,t,l,a)}t=t.child}return t;case 26:return Dn(e,t),e===null?(a=Td(t.type,null,t.pendingProps,null))?t.memoizedState=a:re||(a=t.type,e=t.pendingProps,l=Vn(Ut.current).createElement(a),l[Ve]=t,l[Je]=e,Ye(l,a,e),Ge(l),t.stateNode=l):t.memoizedState=Td(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return la(t),e===null&&re&&(l=t.stateNode=Sd(t.type,t.pendingProps,Ut.current),Ke=t,Dt=!0,s=_e,Aa(t.type)?(yu=s,_e=Rt(l.firstChild)):_e=s),He(e,t,t.pendingProps.children,a),Dn(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&re&&((s=l=_e)&&(l=Nh(l,t.type,t.pendingProps,Dt),l!==null?(t.stateNode=l,Ke=t,_e=Rt(l.firstChild),Dt=!1,s=!0):s=!1),s||Ba(t)),la(t),s=t.type,n=t.pendingProps,r=e!==null?e.memoizedProps:null,l=n.children,gu(s,n)?l=null:r!==null&&gu(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=dr(e,t,Lm,null,null,a),qs._currentValue=s),Dn(e,t),He(e,t,l,a),t.child;case 6:return e===null&&re&&((e=a=_e)&&(a=Th(a,t.pendingProps,Dt),a!==null?(t.stateNode=a,Ke=t,_e=null,e=!0):e=!1),e||Ba(t)),null;case 13:return vf(e,t,a);case 4:return Wa(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=Tl(t,null,l,a):He(e,t,l,a),t.child;case 11:return ff(e,t,t.type,t.pendingProps,a);case 7:return He(e,t,t.pendingProps,a),t.child;case 8:return He(e,t,t.pendingProps.children,a),t.child;case 12:return He(e,t,t.pendingProps.children,a),t.child;case 10:return l=t.pendingProps,ra(t,t.type,l.value),He(e,t,l.children,a),t.child;case 9:return s=t.type._context,l=t.pendingProps.children,Xa(t),s=ke(s),l=l(s),t.flags|=1,He(e,t,l,a),t.child;case 14:return df(e,t,t.type,t.pendingProps,a);case 15:return gf(e,t,t.type,t.pendingProps,a);case 19:return jf(e,t,a);case 31:return l=t.pendingProps,a=t.mode,l={mode:l.mode,children:l.children},e===null?(a=qn(l,a),a.ref=t.ref,t.child=a,a.return=t,t=a):(a=Xt(e.child,l),a.ref=t.ref,t.child=a,a.return=t,t=a),t;case 22:return mf(e,t,a);case 24:return Xa(t),l=ke(Me),e===null?(s=lr(),s===null&&(s=xe,n=tr(),s.pooledCache=n,n.refCount++,n!==null&&(s.pooledCacheLanes|=a),s=n),t.memoizedState={parent:l,cache:s},nr(t),ra(t,Me,s)):((e.lanes&a)!==0&&(ir(e,t),fs(t,null,null,a),os()),s=e.memoizedState,n=t.memoizedState,s.parent!==l?(s={parent:l,cache:l},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),ra(t,Me,l)):(l=n.cache,ra(t,Me,l),l!==s.cache&&er(t,[Me],a,!0))),He(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(d(156,t.tag))}function Kt(e){e.flags|=4}function Sf(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Od(t)){if(t=At.current,t!==null&&((le&4194048)===le?qt!==null:(le&62914560)!==le&&(le&536870912)===0||t!==qt))throw us=sr,so;e.flags|=8192}}function In(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Fu():536870912,e.lanes|=t,El|=t)}function xs(e,t){if(!re)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function Ae(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,l=0;if(t)for(var s=e.child;s!==null;)a|=s.lanes|s.childLanes,l|=s.subtreeFlags&65011712,l|=s.flags&65011712,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)a|=s.lanes|s.childLanes,l|=s.subtreeFlags,l|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=l,e.childLanes=a,t}function Wm(e,t,a){var l=t.pendingProps;switch(Ji(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ae(t),null;case 1:return Ae(t),null;case 3:return a=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Qt(Me),Et(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ts(t)?Kt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Fc())),Ae(t),null;case 26:return a=t.memoizedState,e===null?(Kt(t),a!==null?(Ae(t),Sf(t,a)):(Ae(t),t.flags&=-16777217)):a?a!==e.memoizedState?(Kt(t),Ae(t),Sf(t,a)):(Ae(t),t.flags&=-16777217):(e.memoizedProps!==l&&Kt(t),Ae(t),t.flags&=-16777217),null;case 27:Fa(t),a=Ut.current;var s=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Kt(t);else{if(!l){if(t.stateNode===null)throw Error(d(166));return Ae(t),null}e=Oe.current,ts(t)?Pc(t):(e=Sd(s,l,a),t.stateNode=e,Kt(t))}return Ae(t),null;case 5:if(Fa(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Kt(t);else{if(!l){if(t.stateNode===null)throw Error(d(166));return Ae(t),null}if(e=Oe.current,ts(t))Pc(t);else{switch(s=Vn(Ut.current),e){case 1:e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof l.is=="string"?s.createElement("select",{is:l.is}):s.createElement("select"),l.multiple?e.multiple=!0:l.size&&(e.size=l.size);break;default:e=typeof l.is=="string"?s.createElement(a,{is:l.is}):s.createElement(a)}}e[Ve]=t,e[Je]=l;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)e.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=e;e:switch(Ye(e,a,l),a){case"button":case"input":case"select":case"textarea":e=!!l.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&Kt(t)}}return Ae(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&Kt(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(d(166));if(e=Ut.current,ts(t)){if(e=t.stateNode,a=t.memoizedProps,l=null,s=Ke,s!==null)switch(s.tag){case 27:case 5:l=s.memoizedProps}e[Ve]=t,e=!!(e.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||pd(e.nodeValue,a)),e||Ba(t)}else e=Vn(e).createTextNode(l),e[Ve]=t,t.stateNode=e}return Ae(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=ts(t),l!==null&&l.dehydrated!==null){if(e===null){if(!s)throw Error(d(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(d(317));s[Ve]=t}else as(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ae(t),s=!1}else s=Fc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(Vt(t),t):(Vt(t),null)}if(Vt(t),(t.flags&128)!==0)return t.lanes=a,t;if(a=l!==null,e=e!==null&&e.memoizedState!==null,a){l=t.child,s=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(s=l.alternate.memoizedState.cachePool.pool);var n=null;l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(n=l.memoizedState.cachePool.pool),n!==s&&(l.flags|=2048)}return a!==e&&a&&(t.child.flags|=8192),In(t,t.updateQueue),Ae(t),null;case 4:return Et(),e===null&&uu(t.stateNode.containerInfo),Ae(t),null;case 10:return Qt(t.type),Ae(t),null;case 19:if(ve($e),s=t.memoizedState,s===null)return Ae(t),null;if(l=(t.flags&128)!==0,n=s.rendering,n===null)if(l)xs(s,!1);else{if(Ne!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(n=Un(e),n!==null){for(t.flags|=128,xs(s,!1),e=n.updateQueue,t.updateQueue=e,In(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Kc(a,e),a=a.sibling;return ue($e,$e.current&1|2),t.child}e=e.sibling}s.tail!==null&&Ot()>Gn&&(t.flags|=128,l=!0,xs(s,!1),t.lanes=4194304)}else{if(!l)if(e=Un(n),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,In(t,e),xs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!n.alternate&&!re)return Ae(t),null}else 2*Ot()-s.renderingStartTime>Gn&&a!==536870912&&(t.flags|=128,l=!0,xs(s,!1),t.lanes=4194304);s.isBackwards?(n.sibling=t.child,t.child=n):(e=s.last,e!==null?e.sibling=n:t.child=n,s.last=n)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Ot(),t.sibling=null,e=$e.current,ue($e,l?e&1|2:e&1),t):(Ae(t),null);case 22:case 23:return Vt(t),or(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?(a&536870912)!==0&&(t.flags&128)===0&&(Ae(t),t.subtreeFlags&6&&(t.flags|=8192)):Ae(t),a=t.updateQueue,a!==null&&In(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(t.flags|=2048),e!==null&&ve(Ha),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Qt(Me),Ae(t),null;case 25:return null;case 30:return null}throw Error(d(156,t.tag))}function Fm(e,t){switch(Ji(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Qt(Me),Et(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Fa(t),null;case 13:if(Vt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(d(340));as()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ve($e),null;case 4:return Et(),null;case 10:return Qt(t.type),null;case 22:case 23:return Vt(t),or(),e!==null&&ve(Ha),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Qt(Me),null;case 25:return null;default:return null}}function _f(e,t){switch(Ji(t),t.tag){case 3:Qt(Me),Et();break;case 26:case 27:case 5:Fa(t);break;case 4:Et();break;case 13:Vt(t);break;case 19:ve($e);break;case 10:Qt(t.type);break;case 22:case 23:Vt(t),or(),e!==null&&ve(Ha);break;case 24:Qt(Me)}}function vs(e,t){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var s=l.next;a=s;do{if((a.tag&e)===e){l=void 0;var n=a.create,r=a.inst;l=n(),r.destroy=l}a=a.next}while(a!==s)}}catch(o){ye(t,t.return,o)}}function ma(e,t,a){try{var l=t.updateQueue,s=l!==null?l.lastEffect:null;if(s!==null){var n=s.next;l=n;do{if((l.tag&e)===e){var r=l.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var g=a,S=o;try{S()}catch(O){ye(s,g,O)}}}l=l.next}while(l!==n)}}catch(O){ye(t,t.return,O)}}function Nf(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{oo(t,a)}catch(l){ye(e,e.return,l)}}}function Tf(e,t,a){a.props=Ya(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(l){ye(e,t,l)}}function bs(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof a=="function"?e.refCleanup=a(l):a.current=l}}catch(s){ye(e,t,s)}}function It(e,t){var a=e.ref,l=e.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(s){ye(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(s){ye(e,t,s)}else a.current=null}function wf(e){var t=e.type,a=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break e;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(s){ye(e,e.return,s)}}function zr(e,t,a){try{var l=e.stateNode;bh(l,e.type,a,t),l[Je]=t}catch(s){ye(e,e.return,s)}}function Rf(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Aa(e.type)||e.tag===4}function Br(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Rf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Aa(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Cr(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Zn));else if(l!==4&&(l===27&&Aa(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Cr(e,t,a),e=e.sibling;e!==null;)Cr(e,t,a),e=e.sibling}function Mn(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(l!==4&&(l===27&&Aa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Mn(e,t,a),e=e.sibling;e!==null;)Mn(e,t,a),e=e.sibling}function Uf(e){var t=e.stateNode,a=e.memoizedProps;try{for(var l=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);Ye(t,l,a),t[Ve]=e,t[Je]=a}catch(n){ye(e,e.return,n)}}var Jt=!1,Ue=!1,Xr=!1,Ef=typeof WeakSet=="function"?WeakSet:Set,Be=null;function eh(e,t){if(e=e.containerInfo,fu=Fn,e=Bc(e),Bi(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var s=l.anchorOffset,n=l.focusNode;l=l.focusOffset;try{a.nodeType,n.nodeType}catch{a=null;break e}var r=0,o=-1,g=-1,S=0,O=0,M=e,_=null;t:for(;;){for(var N;M!==a||s!==0&&M.nodeType!==3||(o=r+s),M!==n||l!==0&&M.nodeType!==3||(g=r+l),M.nodeType===3&&(r+=M.nodeValue.length),(N=M.firstChild)!==null;)_=M,M=N;for(;;){if(M===e)break t;if(_===a&&++S===s&&(o=r),_===n&&++O===l&&(g=r),(N=M.nextSibling)!==null)break;M=_,_=M.parentNode}M=N}a=o===-1||g===-1?null:{start:o,end:g}}else a=null}a=a||{start:0,end:0}}else a=null;for(du={focusedElem:e,selectionRange:a},Fn=!1,Be=t;Be!==null;)if(t=Be,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,Be=e;else for(;Be!==null;){switch(t=Be,n=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&n!==null){e=void 0,a=t,s=n.memoizedProps,n=n.memoizedState,l=a.stateNode;try{var k=Ya(a.type,s,a.elementType===a.type);e=l.getSnapshotBeforeUpdate(k,n),l.__reactInternalSnapshotBeforeUpdate=e}catch(Q){ye(a,a.return,Q)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)hu(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":hu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(d(163))}if(e=t.sibling,e!==null){e.return=t.return,Be=e;break}Be=t.return}}function Of(e,t,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:ha(e,a),l&4&&vs(5,a);break;case 1:if(ha(e,a),l&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(r){ye(a,a.return,r)}else{var s=Ya(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){ye(a,a.return,r)}}l&64&&Nf(a),l&512&&bs(a,a.return);break;case 3:if(ha(e,a),l&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{oo(e,t)}catch(r){ye(a,a.return,r)}}break;case 27:t===null&&l&4&&Uf(a);case 26:case 5:ha(e,a),t===null&&l&4&&wf(a),l&512&&bs(a,a.return);break;case 12:ha(e,a);break;case 13:ha(e,a),l&4&&If(e,a),l&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=ch.bind(null,a),wh(e,a))));break;case 22:if(l=a.memoizedState!==null||Jt,!l){t=t!==null&&t.memoizedState!==null||Ue,s=Jt;var n=Ue;Jt=l,(Ue=t)&&!n?pa(e,a,(a.subtreeFlags&8772)!==0):ha(e,a),Jt=s,Ue=n}break;case 30:break;default:ha(e,a)}}function Df(e){var t=e.alternate;t!==null&&(e.alternate=null,Df(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&bi(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var je=null,Fe=!1;function Pt(e,t,a){for(a=a.child;a!==null;)qf(e,t,a),a=a.sibling}function qf(e,t,a){if(lt&&typeof lt.onCommitFiberUnmount=="function")try{lt.onCommitFiberUnmount(Xl,a)}catch{}switch(a.tag){case 26:Ue||It(a,t),Pt(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Ue||It(a,t);var l=je,s=Fe;Aa(a.type)&&(je=a.stateNode,Fe=!1),Pt(e,t,a),Us(a.stateNode),je=l,Fe=s;break;case 5:Ue||It(a,t);case 6:if(l=je,s=Fe,je=null,Pt(e,t,a),je=l,Fe=s,je!==null)if(Fe)try{(je.nodeType===9?je.body:je.nodeName==="HTML"?je.ownerDocument.body:je).removeChild(a.stateNode)}catch(n){ye(a,t,n)}else try{je.removeChild(a.stateNode)}catch(n){ye(a,t,n)}break;case 18:je!==null&&(Fe?(e=je,jd(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Gs(e)):jd(je,a.stateNode));break;case 4:l=je,s=Fe,je=a.stateNode.containerInfo,Fe=!0,Pt(e,t,a),je=l,Fe=s;break;case 0:case 11:case 14:case 15:Ue||ma(2,a,t),Ue||ma(4,a,t),Pt(e,t,a);break;case 1:Ue||(It(a,t),l=a.stateNode,typeof l.componentWillUnmount=="function"&&Tf(a,t,l)),Pt(e,t,a);break;case 21:Pt(e,t,a);break;case 22:Ue=(l=Ue)||a.memoizedState!==null,Pt(e,t,a),Ue=l;break;default:Pt(e,t,a)}}function If(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Gs(e)}catch(a){ye(t,t.return,a)}}function th(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Ef),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Ef),t;default:throw Error(d(435,e.tag))}}function Hr(e,t){var a=th(e);t.forEach(function(l){var s=oh.bind(null,e,l);a.has(l)||(a.add(l),l.then(s,s))})}function rt(e,t){var a=t.deletions;if(a!==null)for(var l=0;l<a.length;l++){var s=a[l],n=e,r=t,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(Aa(o.type)){je=o.stateNode,Fe=!1;break e}break;case 5:je=o.stateNode,Fe=!1;break e;case 3:case 4:je=o.stateNode.containerInfo,Fe=!0;break e}o=o.return}if(je===null)throw Error(d(160));qf(n,r,s),je=null,Fe=!1,n=s.alternate,n!==null&&(n.return=null),s.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)Mf(t,e),t=t.sibling}var wt=null;function Mf(e,t){var a=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:rt(t,e),ut(e),l&4&&(ma(3,e,e.return),vs(3,e),ma(5,e,e.return));break;case 1:rt(t,e),ut(e),l&512&&(Ue||a===null||It(a,a.return)),l&64&&Jt&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var s=wt;if(rt(t,e),ut(e),l&512&&(Ue||a===null||It(a,a.return)),l&4){var n=a!==null?a.memoizedState:null;if(l=e.memoizedState,a===null)if(l===null)if(e.stateNode===null){e:{l=e.type,a=e.memoizedProps,s=s.ownerDocument||s;t:switch(l){case"title":n=s.getElementsByTagName("title")[0],(!n||n[Yl]||n[Ve]||n.namespaceURI==="http://www.w3.org/2000/svg"||n.hasAttribute("itemprop"))&&(n=s.createElement(l),s.head.insertBefore(n,s.querySelector("head > title"))),Ye(n,l,a),n[Ve]=e,Ge(n),l=n;break e;case"link":var r=Ud("link","href",s).get(l+(a.href||""));if(r){for(var o=0;o<r.length;o++)if(n=r[o],n.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&n.getAttribute("rel")===(a.rel==null?null:a.rel)&&n.getAttribute("title")===(a.title==null?null:a.title)&&n.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){r.splice(o,1);break t}}n=s.createElement(l),Ye(n,l,a),s.head.appendChild(n);break;case"meta":if(r=Ud("meta","content",s).get(l+(a.content||""))){for(o=0;o<r.length;o++)if(n=r[o],n.getAttribute("content")===(a.content==null?null:""+a.content)&&n.getAttribute("name")===(a.name==null?null:a.name)&&n.getAttribute("property")===(a.property==null?null:a.property)&&n.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&n.getAttribute("charset")===(a.charSet==null?null:a.charSet)){r.splice(o,1);break t}}n=s.createElement(l),Ye(n,l,a),s.head.appendChild(n);break;default:throw Error(d(468,l))}n[Ve]=e,Ge(n),l=n}e.stateNode=l}else Ed(s,e.type,e.stateNode);else e.stateNode=Rd(s,l,e.memoizedProps);else n!==l?(n===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):n.count--,l===null?Ed(s,e.type,e.stateNode):Rd(s,l,e.memoizedProps)):l===null&&e.stateNode!==null&&zr(e,e.memoizedProps,a.memoizedProps)}break;case 27:rt(t,e),ut(e),l&512&&(Ue||a===null||It(a,a.return)),a!==null&&l&4&&zr(e,e.memoizedProps,a.memoizedProps);break;case 5:if(rt(t,e),ut(e),l&512&&(Ue||a===null||It(a,a.return)),e.flags&32){s=e.stateNode;try{ul(s,"")}catch(N){ye(e,e.return,N)}}l&4&&e.stateNode!=null&&(s=e.memoizedProps,zr(e,s,a!==null?a.memoizedProps:s)),l&1024&&(Xr=!0);break;case 6:if(rt(t,e),ut(e),l&4){if(e.stateNode===null)throw Error(d(162));l=e.memoizedProps,a=e.stateNode;try{a.nodeValue=l}catch(N){ye(e,e.return,N)}}break;case 3:if(Jn=null,s=wt,wt=kn(t.containerInfo),rt(t,e),wt=s,ut(e),l&4&&a!==null&&a.memoizedState.isDehydrated)try{Gs(t.containerInfo)}catch(N){ye(e,e.return,N)}Xr&&(Xr=!1,$f(e));break;case 4:l=wt,wt=kn(e.stateNode.containerInfo),rt(t,e),ut(e),wt=l;break;case 12:rt(t,e),ut(e);break;case 13:rt(t,e),ut(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(kr=Ot()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Hr(e,l)));break;case 22:s=e.memoizedState!==null;var g=a!==null&&a.memoizedState!==null,S=Jt,O=Ue;if(Jt=S||s,Ue=O||g,rt(t,e),Ue=O,Jt=S,ut(e),l&8192)e:for(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,s&&(a===null||g||Jt||Ue||Qa(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){g=a=t;try{if(n=g.stateNode,s)r=n.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=g.stateNode;var M=g.memoizedProps.style,_=M!=null&&M.hasOwnProperty("display")?M.display:null;o.style.display=_==null||typeof _=="boolean"?"":(""+_).trim()}}catch(N){ye(g,g.return,N)}}}else if(t.tag===6){if(a===null){g=t;try{g.stateNode.nodeValue=s?"":g.memoizedProps}catch(N){ye(g,g.return,N)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,Hr(e,a))));break;case 19:rt(t,e),ut(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Hr(e,l)));break;case 30:break;case 21:break;default:rt(t,e),ut(e)}}function ut(e){var t=e.flags;if(t&2){try{for(var a,l=e.return;l!==null;){if(Rf(l)){a=l;break}l=l.return}if(a==null)throw Error(d(160));switch(a.tag){case 27:var s=a.stateNode,n=Br(e);Mn(e,n,s);break;case 5:var r=a.stateNode;a.flags&32&&(ul(r,""),a.flags&=-33);var o=Br(e);Mn(e,o,r);break;case 3:case 4:var g=a.stateNode.containerInfo,S=Br(e);Cr(e,S,g);break;default:throw Error(d(161))}}catch(O){ye(e,e.return,O)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function $f(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;$f(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ha(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Of(e,t.alternate,t),t=t.sibling}function Qa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:ma(4,t,t.return),Qa(t);break;case 1:It(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&Tf(t,t.return,a),Qa(t);break;case 27:Us(t.stateNode);case 26:case 5:It(t,t.return),Qa(t);break;case 22:t.memoizedState===null&&Qa(t);break;case 30:Qa(t);break;default:Qa(t)}e=e.sibling}}function pa(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,s=e,n=t,r=n.flags;switch(n.tag){case 0:case 11:case 15:pa(s,n,a),vs(4,n);break;case 1:if(pa(s,n,a),l=n,s=l.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(S){ye(l,l.return,S)}if(l=n,s=l.updateQueue,s!==null){var o=l.stateNode;try{var g=s.shared.hiddenCallbacks;if(g!==null)for(s.shared.hiddenCallbacks=null,s=0;s<g.length;s++)co(g[s],o)}catch(S){ye(l,l.return,S)}}a&&r&64&&Nf(n),bs(n,n.return);break;case 27:Uf(n);case 26:case 5:pa(s,n,a),a&&l===null&&r&4&&wf(n),bs(n,n.return);break;case 12:pa(s,n,a);break;case 13:pa(s,n,a),a&&r&4&&If(s,n);break;case 22:n.memoizedState===null&&pa(s,n,a),bs(n,n.return);break;case 30:break;default:pa(s,n,a)}t=t.sibling}}function Lr(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&ns(a))}function Yr(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ns(e))}function Mt(e,t,a,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Gf(e,t,a,l),t=t.sibling}function Gf(e,t,a,l){var s=t.flags;switch(t.tag){case 0:case 11:case 15:Mt(e,t,a,l),s&2048&&vs(9,t);break;case 1:Mt(e,t,a,l);break;case 3:Mt(e,t,a,l),s&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ns(e)));break;case 12:if(s&2048){Mt(e,t,a,l),e=t.stateNode;try{var n=t.memoizedProps,r=n.id,o=n.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(g){ye(t,t.return,g)}}else Mt(e,t,a,l);break;case 13:Mt(e,t,a,l);break;case 23:break;case 22:n=t.stateNode,r=t.alternate,t.memoizedState!==null?n._visibility&2?Mt(e,t,a,l):js(e,t):n._visibility&2?Mt(e,t,a,l):(n._visibility|=2,wl(e,t,a,l,(t.subtreeFlags&10256)!==0)),s&2048&&Lr(r,t);break;case 24:Mt(e,t,a,l),s&2048&&Yr(t.alternate,t);break;default:Mt(e,t,a,l)}}function wl(e,t,a,l,s){for(s=s&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var n=e,r=t,o=a,g=l,S=r.flags;switch(r.tag){case 0:case 11:case 15:wl(n,r,o,g,s),vs(8,r);break;case 23:break;case 22:var O=r.stateNode;r.memoizedState!==null?O._visibility&2?wl(n,r,o,g,s):js(n,r):(O._visibility|=2,wl(n,r,o,g,s)),s&&S&2048&&Lr(r.alternate,r);break;case 24:wl(n,r,o,g,s),s&&S&2048&&Yr(r.alternate,r);break;default:wl(n,r,o,g,s)}t=t.sibling}}function js(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,l=t,s=l.flags;switch(l.tag){case 22:js(a,l),s&2048&&Lr(l.alternate,l);break;case 24:js(a,l),s&2048&&Yr(l.alternate,l);break;default:js(a,l)}t=t.sibling}}var As=8192;function Rl(e){if(e.subtreeFlags&As)for(e=e.child;e!==null;)zf(e),e=e.sibling}function zf(e){switch(e.tag){case 26:Rl(e),e.flags&As&&e.memoizedState!==null&&Ch(wt,e.memoizedState,e.memoizedProps);break;case 5:Rl(e);break;case 3:case 4:var t=wt;wt=kn(e.stateNode.containerInfo),Rl(e),wt=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=As,As=16777216,Rl(e),As=t):Rl(e));break;default:Rl(e)}}function Bf(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ss(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Be=l,Xf(l,e)}Bf(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Cf(e),e=e.sibling}function Cf(e){switch(e.tag){case 0:case 11:case 15:Ss(e),e.flags&2048&&ma(9,e,e.return);break;case 3:Ss(e);break;case 12:Ss(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,$n(e)):Ss(e);break;default:Ss(e)}}function $n(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Be=l,Xf(l,e)}Bf(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ma(8,t,t.return),$n(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,$n(t));break;default:$n(t)}e=e.sibling}}function Xf(e,t){for(;Be!==null;){var a=Be;switch(a.tag){case 0:case 11:case 15:ma(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:ns(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,Be=l;else e:for(a=e;Be!==null;){l=Be;var s=l.sibling,n=l.return;if(Df(l),l===a){Be=null;break e}if(s!==null){s.return=n,Be=s;break e}Be=n}}}var ah={getCacheForType:function(e){var t=ke(Me),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a}},lh=typeof WeakMap=="function"?WeakMap:Map,fe=0,xe=null,ee=null,le=0,de=0,ct=null,ya=!1,Ul=!1,Qr=!1,Wt=0,Ne=0,xa=0,Za=0,Zr=0,St=0,El=0,_s=null,et=null,Vr=!1,kr=0,Gn=1/0,zn=null,va=null,Le=0,ba=null,Ol=null,Dl=0,Kr=0,Jr=null,Hf=null,Ns=0,Pr=null;function ot(){if((fe&2)!==0&&le!==0)return le&-le;if(D.T!==null){var e=vl;return e!==0?e:su()}return ac()}function Lf(){St===0&&(St=(le&536870912)===0||re?Wu():536870912);var e=At.current;return e!==null&&(e.flags|=32),St}function ft(e,t,a){(e===xe&&(de===2||de===9)||e.cancelPendingCommit!==null)&&(ql(e,0),ja(e,le,St,!1)),Ll(e,a),((fe&2)===0||e!==xe)&&(e===xe&&((fe&2)===0&&(Za|=a),Ne===4&&ja(e,le,St,!1)),$t(e))}function Yf(e,t,a){if((fe&6)!==0)throw Error(d(327));var l=!a&&(t&124)===0&&(t&e.expiredLanes)===0||Hl(e,t),s=l?ih(e,t):eu(e,t,!0),n=l;do{if(s===0){Ul&&!l&&ja(e,t,0,!1);break}else{if(a=e.current.alternate,n&&!sh(a)){s=eu(e,t,!1),n=!1;continue}if(s===2){if(n=t,e.errorRecoveryDisabledLanes&n)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;e:{var o=e;s=_s;var g=o.current.memoizedState.isDehydrated;if(g&&(ql(o,r).flags|=256),r=eu(o,r,!1),r!==2){if(Qr&&!g){o.errorRecoveryDisabledLanes|=n,Za|=n,s=4;break e}n=et,et=s,n!==null&&(et===null?et=n:et.push.apply(et,n))}s=r}if(n=!1,s!==2)continue}}if(s===1){ql(e,0),ja(e,t,0,!0);break}e:{switch(l=e,n=s,n){case 0:case 1:throw Error(d(345));case 4:if((t&4194048)!==t)break;case 6:ja(l,t,St,!ya);break e;case 2:et=null;break;case 3:case 5:break;default:throw Error(d(329))}if((t&62914560)===t&&(s=kr+300-Ot(),10<s)){if(ja(l,t,St,!ya),ks(l,0,!0)!==0)break e;l.timeoutHandle=vd(Qf.bind(null,l,a,et,zn,Vr,t,St,Za,El,ya,n,2,-0,0),s);break e}Qf(l,a,et,zn,Vr,t,St,Za,El,ya,n,0,-0,0)}}break}while(!0);$t(e)}function Qf(e,t,a,l,s,n,r,o,g,S,O,M,_,N){if(e.timeoutHandle=-1,M=t.subtreeFlags,(M&8192||(M&16785408)===16785408)&&(Ds={stylesheets:null,count:0,unsuspend:Bh},zf(t),M=Xh(),M!==null)){e.cancelPendingCommit=M(Wf.bind(null,e,t,n,a,l,s,r,o,g,O,1,_,N)),ja(e,n,r,!S);return}Wf(e,t,n,a,l,s,r,o,g)}function sh(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var s=a[l],n=s.getSnapshot;s=s.value;try{if(!nt(n(),s))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ja(e,t,a,l){t&=~Zr,t&=~Za,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var s=t;0<s;){var n=31-st(s),r=1<<n;l[n]=-1,s&=~r}a!==0&&ec(e,a,t)}function Bn(){return(fe&6)===0?(Ts(0),!1):!0}function Wr(){if(ee!==null){if(de===0)var e=ee.return;else e=ee,Yt=Ca=null,hr(e),Nl=null,ps=0,e=ee;for(;e!==null;)_f(e.alternate,e),e=e.return;ee=null}}function ql(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Ah(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Wr(),xe=e,ee=a=Xt(e.current,null),le=t,de=0,ct=null,ya=!1,Ul=Hl(e,t),Qr=!1,El=St=Zr=Za=xa=Ne=0,et=_s=null,Vr=!1,(t&8)!==0&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var s=31-st(l),n=1<<s;t|=e[s],l&=~n}return Wt=t,rn(),a}function Zf(e,t){P=null,D.H=Tn,t===rs||t===pn?(t=ro(),de=3):t===so?(t=ro(),de=4):de=t===of?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ct=t,ee===null&&(Ne=1,On(e,xt(t,e.current)))}function Vf(){var e=D.H;return D.H=Tn,e===null?Tn:e}function kf(){var e=D.A;return D.A=ah,e}function Fr(){Ne=4,ya||(le&4194048)!==le&&At.current!==null||(Ul=!0),(xa&134217727)===0&&(Za&134217727)===0||xe===null||ja(xe,le,St,!1)}function eu(e,t,a){var l=fe;fe|=2;var s=Vf(),n=kf();(xe!==e||le!==t)&&(zn=null,ql(e,t)),t=!1;var r=Ne;e:do try{if(de!==0&&ee!==null){var o=ee,g=ct;switch(de){case 8:Wr(),r=6;break e;case 3:case 2:case 9:case 6:At.current===null&&(t=!0);var S=de;if(de=0,ct=null,Il(e,o,g,S),a&&Ul){r=0;break e}break;default:S=de,de=0,ct=null,Il(e,o,g,S)}}nh(),r=Ne;break}catch(O){Zf(e,O)}while(!0);return t&&e.shellSuspendCounter++,Yt=Ca=null,fe=l,D.H=s,D.A=n,ee===null&&(xe=null,le=0,rn()),r}function nh(){for(;ee!==null;)Kf(ee)}function ih(e,t){var a=fe;fe|=2;var l=Vf(),s=kf();xe!==e||le!==t?(zn=null,Gn=Ot()+500,ql(e,t)):Ul=Hl(e,t);e:do try{if(de!==0&&ee!==null){t=ee;var n=ct;t:switch(de){case 1:de=0,ct=null,Il(e,t,n,1);break;case 2:case 9:if(no(n)){de=0,ct=null,Jf(t);break}t=function(){de!==2&&de!==9||xe!==e||(de=7),$t(e)},n.then(t,t);break e;case 3:de=7;break e;case 4:de=5;break e;case 7:no(n)?(de=0,ct=null,Jf(t)):(de=0,ct=null,Il(e,t,n,7));break;case 5:var r=null;switch(ee.tag){case 26:r=ee.memoizedState;case 5:case 27:var o=ee;if(!r||Od(r)){de=0,ct=null;var g=o.sibling;if(g!==null)ee=g;else{var S=o.return;S!==null?(ee=S,Cn(S)):ee=null}break t}}de=0,ct=null,Il(e,t,n,5);break;case 6:de=0,ct=null,Il(e,t,n,6);break;case 8:Wr(),Ne=6;break e;default:throw Error(d(462))}}rh();break}catch(O){Zf(e,O)}while(!0);return Yt=Ca=null,D.H=l,D.A=s,fe=a,ee!==null?0:(xe=null,le=0,rn(),Ne)}function rh(){for(;ee!==null&&!Cl();)Kf(ee)}function Kf(e){var t=Af(e.alternate,e,Wt);e.memoizedProps=e.pendingProps,t===null?Cn(e):ee=t}function Jf(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=pf(a,t,t.pendingProps,t.type,void 0,le);break;case 11:t=pf(a,t,t.pendingProps,t.type.render,t.ref,le);break;case 5:hr(t);default:_f(a,t),t=ee=Kc(t,Wt),t=Af(a,t,Wt)}e.memoizedProps=e.pendingProps,t===null?Cn(e):ee=t}function Il(e,t,a,l){Yt=Ca=null,hr(t),Nl=null,ps=0;var s=t.return;try{if(Jm(e,s,t,a,le)){Ne=1,On(e,xt(a,e.current)),ee=null;return}}catch(n){if(s!==null)throw ee=s,n;Ne=1,On(e,xt(a,e.current)),ee=null;return}t.flags&32768?(re||l===1?e=!0:Ul||(le&536870912)!==0?e=!1:(ya=e=!0,(l===2||l===9||l===3||l===6)&&(l=At.current,l!==null&&l.tag===13&&(l.flags|=16384))),Pf(t,e)):Cn(t)}function Cn(e){var t=e;do{if((t.flags&32768)!==0){Pf(t,ya);return}e=t.return;var a=Wm(t.alternate,t,Wt);if(a!==null){ee=a;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);Ne===0&&(Ne=5)}function Pf(e,t){do{var a=Fm(e.alternate,e);if(a!==null){a.flags&=32767,ee=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){ee=e;return}ee=e=a}while(e!==null);Ne=6,ee=null}function Wf(e,t,a,l,s,n,r,o,g){e.cancelPendingCommit=null;do Xn();while(Le!==0);if((fe&6)!==0)throw Error(d(327));if(t!==null){if(t===e.current)throw Error(d(177));if(n=t.lanes|t.childLanes,n|=Yi,Bg(e,a,n,r,o,g),e===xe&&(ee=xe=null,le=0),Ol=t,ba=e,Dl=a,Kr=n,Jr=s,Hf=l,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,fh(Qs,function(){return ld(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||l){l=D.T,D.T=null,s=X.p,X.p=2,r=fe,fe|=4;try{eh(e,t,a)}finally{fe=r,X.p=s,D.T=l}}Le=1,Ff(),ed(),td()}}function Ff(){if(Le===1){Le=0;var e=ba,t=Ol,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=D.T,D.T=null;var l=X.p;X.p=2;var s=fe;fe|=4;try{Mf(t,e);var n=du,r=Bc(e.containerInfo),o=n.focusedElem,g=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&zc(o.ownerDocument.documentElement,o)){if(g!==null&&Bi(o)){var S=g.start,O=g.end;if(O===void 0&&(O=S),"selectionStart"in o)o.selectionStart=S,o.selectionEnd=Math.min(O,o.value.length);else{var M=o.ownerDocument||document,_=M&&M.defaultView||window;if(_.getSelection){var N=_.getSelection(),k=o.textContent.length,Q=Math.min(g.start,k),pe=g.end===void 0?Q:Math.min(g.end,k);!N.extend&&Q>pe&&(r=pe,pe=Q,Q=r);var y=Gc(o,Q),h=Gc(o,pe);if(y&&h&&(N.rangeCount!==1||N.anchorNode!==y.node||N.anchorOffset!==y.offset||N.focusNode!==h.node||N.focusOffset!==h.offset)){var b=M.createRange();b.setStart(y.node,y.offset),N.removeAllRanges(),Q>pe?(N.addRange(b),N.extend(h.node,h.offset)):(b.setEnd(h.node,h.offset),N.addRange(b))}}}}for(M=[],N=o;N=N.parentNode;)N.nodeType===1&&M.push({element:N,left:N.scrollLeft,top:N.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<M.length;o++){var q=M[o];q.element.scrollLeft=q.left,q.element.scrollTop=q.top}}Fn=!!fu,du=fu=null}finally{fe=s,X.p=l,D.T=a}}e.current=t,Le=2}}function ed(){if(Le===2){Le=0;var e=ba,t=Ol,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=D.T,D.T=null;var l=X.p;X.p=2;var s=fe;fe|=4;try{Of(e,t.alternate,t)}finally{fe=s,X.p=l,D.T=a}}Le=3}}function td(){if(Le===4||Le===3){Le=0,Eg();var e=ba,t=Ol,a=Dl,l=Hf;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Le=5:(Le=0,Ol=ba=null,ad(e,e.pendingLanes));var s=e.pendingLanes;if(s===0&&(va=null),xi(a),t=t.stateNode,lt&&typeof lt.onCommitFiberRoot=="function")try{lt.onCommitFiberRoot(Xl,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=D.T,s=X.p,X.p=2,D.T=null;try{for(var n=e.onRecoverableError,r=0;r<l.length;r++){var o=l[r];n(o.value,{componentStack:o.stack})}}finally{D.T=t,X.p=s}}(Dl&3)!==0&&Xn(),$t(e),s=e.pendingLanes,(a&4194090)!==0&&(s&42)!==0?e===Pr?Ns++:(Ns=0,Pr=e):Ns=0,Ts(0)}}function ad(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ns(t)))}function Xn(e){return Ff(),ed(),td(),ld()}function ld(){if(Le!==5)return!1;var e=ba,t=Kr;Kr=0;var a=xi(Dl),l=D.T,s=X.p;try{X.p=32>a?32:a,D.T=null,a=Jr,Jr=null;var n=ba,r=Dl;if(Le=0,Ol=ba=null,Dl=0,(fe&6)!==0)throw Error(d(331));var o=fe;if(fe|=4,Cf(n.current),Gf(n,n.current,r,a),fe=o,Ts(0,!1),lt&&typeof lt.onPostCommitFiberRoot=="function")try{lt.onPostCommitFiberRoot(Xl,n)}catch{}return!0}finally{X.p=s,D.T=l,ad(e,t)}}function sd(e,t,a){t=xt(a,t),t=Ur(e.stateNode,t,2),e=oa(e,t,2),e!==null&&(Ll(e,2),$t(e))}function ye(e,t,a){if(e.tag===3)sd(e,e,a);else for(;t!==null;){if(t.tag===3){sd(t,e,a);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(va===null||!va.has(l))){e=xt(a,e),a=uf(2),l=oa(t,a,2),l!==null&&(cf(a,l,t,e),Ll(l,2),$t(l));break}}t=t.return}}function tu(e,t,a){var l=e.pingCache;if(l===null){l=e.pingCache=new lh;var s=new Set;l.set(t,s)}else s=l.get(t),s===void 0&&(s=new Set,l.set(t,s));s.has(a)||(Qr=!0,s.add(a),e=uh.bind(null,e,t,a),t.then(e,e))}function uh(e,t,a){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,xe===e&&(le&a)===a&&(Ne===4||Ne===3&&(le&62914560)===le&&300>Ot()-kr?(fe&2)===0&&ql(e,0):Zr|=a,El===le&&(El=0)),$t(e)}function nd(e,t){t===0&&(t=Fu()),e=hl(e,t),e!==null&&(Ll(e,t),$t(e))}function ch(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),nd(e,a)}function oh(e,t){var a=0;switch(e.tag){case 13:var l=e.stateNode,s=e.memoizedState;s!==null&&(a=s.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(d(314))}l!==null&&l.delete(t),nd(e,a)}function fh(e,t){return we(e,t)}var Hn=null,Ml=null,au=!1,Ln=!1,lu=!1,Va=0;function $t(e){e!==Ml&&e.next===null&&(Ml===null?Hn=Ml=e:Ml=Ml.next=e),Ln=!0,au||(au=!0,gh())}function Ts(e,t){if(!lu&&Ln){lu=!0;do for(var a=!1,l=Hn;l!==null;){if(e!==0){var s=l.pendingLanes;if(s===0)var n=0;else{var r=l.suspendedLanes,o=l.pingedLanes;n=(1<<31-st(42|e)+1)-1,n&=s&~(r&~o),n=n&201326741?n&201326741|1:n?n|2:0}n!==0&&(a=!0,cd(l,n))}else n=le,n=ks(l,l===xe?n:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(n&3)===0||Hl(l,n)||(a=!0,cd(l,n));l=l.next}while(a);lu=!1}}function dh(){id()}function id(){Ln=au=!1;var e=0;Va!==0&&(jh()&&(e=Va),Va=0);for(var t=Ot(),a=null,l=Hn;l!==null;){var s=l.next,n=rd(l,t);n===0?(l.next=null,a===null?Hn=s:a.next=s,s===null&&(Ml=a)):(a=l,(e!==0||(n&3)!==0)&&(Ln=!0)),l=s}Ts(e)}function rd(e,t){for(var a=e.suspendedLanes,l=e.pingedLanes,s=e.expirationTimes,n=e.pendingLanes&-62914561;0<n;){var r=31-st(n),o=1<<r,g=s[r];g===-1?((o&a)===0||(o&l)!==0)&&(s[r]=zg(o,t)):g<=t&&(e.expiredLanes|=o),n&=~o}if(t=xe,a=le,a=ks(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,a===0||e===t&&(de===2||de===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&el(l),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Hl(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(l!==null&&el(l),xi(a)){case 2:case 8:a=Ju;break;case 32:a=Qs;break;case 268435456:a=Pu;break;default:a=Qs}return l=ud.bind(null,e),a=we(a,l),e.callbackPriority=t,e.callbackNode=a,t}return l!==null&&l!==null&&el(l),e.callbackPriority=2,e.callbackNode=null,2}function ud(e,t){if(Le!==0&&Le!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Xn()&&e.callbackNode!==a)return null;var l=le;return l=ks(e,e===xe?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(Yf(e,l,t),rd(e,Ot()),e.callbackNode!=null&&e.callbackNode===a?ud.bind(null,e):null)}function cd(e,t){if(Xn())return null;Yf(e,t,!0)}function gh(){Sh(function(){(fe&6)!==0?we(Ku,dh):id()})}function su(){return Va===0&&(Va=Wu()),Va}function od(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Fs(""+e)}function fd(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function mh(e,t,a,l,s){if(t==="submit"&&a&&a.stateNode===s){var n=od((s[Je]||null).action),r=l.submitter;r&&(t=(t=r[Je]||null)?od(t.formAction):r.getAttribute("formAction"),t!==null&&(n=t,r=null));var o=new ln("action","action",null,l,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Va!==0){var g=r?fd(s,r):new FormData(s);_r(a,{pending:!0,data:g,method:s.method,action:n},null,g)}}else typeof n=="function"&&(o.preventDefault(),g=r?fd(s,r):new FormData(s),_r(a,{pending:!0,data:g,method:s.method,action:n},n,g))},currentTarget:s}]})}}for(var nu=0;nu<Li.length;nu++){var iu=Li[nu],hh=iu.toLowerCase(),ph=iu[0].toUpperCase()+iu.slice(1);Tt(hh,"on"+ph)}Tt(Hc,"onAnimationEnd"),Tt(Lc,"onAnimationIteration"),Tt(Yc,"onAnimationStart"),Tt("dblclick","onDoubleClick"),Tt("focusin","onFocus"),Tt("focusout","onBlur"),Tt(qm,"onTransitionRun"),Tt(Im,"onTransitionStart"),Tt(Mm,"onTransitionCancel"),Tt(Qc,"onTransitionEnd"),nl("onMouseEnter",["mouseout","mouseover"]),nl("onMouseLeave",["mouseout","mouseover"]),nl("onPointerEnter",["pointerout","pointerover"]),nl("onPointerLeave",["pointerout","pointerover"]),Oa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Oa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Oa("onBeforeInput",["compositionend","keypress","textInput","paste"]),Oa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Oa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Oa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ws="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),yh=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ws));function dd(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var l=e[a],s=l.event;l=l.listeners;e:{var n=void 0;if(t)for(var r=l.length-1;0<=r;r--){var o=l[r],g=o.instance,S=o.currentTarget;if(o=o.listener,g!==n&&s.isPropagationStopped())break e;n=o,s.currentTarget=S;try{n(s)}catch(O){En(O)}s.currentTarget=null,n=g}else for(r=0;r<l.length;r++){if(o=l[r],g=o.instance,S=o.currentTarget,o=o.listener,g!==n&&s.isPropagationStopped())break e;n=o,s.currentTarget=S;try{n(s)}catch(O){En(O)}s.currentTarget=null,n=g}}}}function te(e,t){var a=t[vi];a===void 0&&(a=t[vi]=new Set);var l=e+"__bubble";a.has(l)||(gd(t,e,2,!1),a.add(l))}function ru(e,t,a){var l=0;t&&(l|=4),gd(a,e,l,t)}var Yn="_reactListening"+Math.random().toString(36).slice(2);function uu(e){if(!e[Yn]){e[Yn]=!0,sc.forEach(function(a){a!=="selectionchange"&&(yh.has(a)||ru(a,!1,e),ru(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Yn]||(t[Yn]=!0,ru("selectionchange",!1,t))}}function gd(e,t,a,l){switch(Gd(t)){case 2:var s=Yh;break;case 8:s=Qh;break;default:s=Au}a=s.bind(null,t,a,e),s=void 0,!Ei||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),l?s!==void 0?e.addEventListener(t,a,{capture:!0,passive:s}):e.addEventListener(t,a,!0):s!==void 0?e.addEventListener(t,a,{passive:s}):e.addEventListener(t,a,!1)}function cu(e,t,a,l,s){var n=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var r=l.tag;if(r===3||r===4){var o=l.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=l.return;r!==null;){var g=r.tag;if((g===3||g===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=al(o),r===null)return;if(g=r.tag,g===5||g===6||g===26||g===27){l=n=r;continue e}o=o.parentNode}}l=l.return}xc(function(){var S=n,O=Ri(a),M=[];e:{var _=Zc.get(e);if(_!==void 0){var N=ln,k=e;switch(e){case"keypress":if(tn(a)===0)break e;case"keydown":case"keyup":N=fm;break;case"focusin":k="focus",N=Ii;break;case"focusout":k="blur",N=Ii;break;case"beforeblur":case"afterblur":N=Ii;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=jc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=Fg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=mm;break;case Hc:case Lc:case Yc:N=am;break;case Qc:N=pm;break;case"scroll":case"scrollend":N=Pg;break;case"wheel":N=xm;break;case"copy":case"cut":case"paste":N=sm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=Sc;break;case"toggle":case"beforetoggle":N=bm}var Q=(t&4)!==0,pe=!Q&&(e==="scroll"||e==="scrollend"),y=Q?_!==null?_+"Capture":null:_;Q=[];for(var h=S,b;h!==null;){var q=h;if(b=q.stateNode,q=q.tag,q!==5&&q!==26&&q!==27||b===null||y===null||(q=Zl(h,y),q!=null&&Q.push(Rs(h,q,b))),pe)break;h=h.return}0<Q.length&&(_=new N(_,k,null,a,O),M.push({event:_,listeners:Q}))}}if((t&7)===0){e:{if(_=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",_&&a!==wi&&(k=a.relatedTarget||a.fromElement)&&(al(k)||k[tl]))break e;if((N||_)&&(_=O.window===O?O:(_=O.ownerDocument)?_.defaultView||_.parentWindow:window,N?(k=a.relatedTarget||a.toElement,N=S,k=k?al(k):null,k!==null&&(pe=A(k),Q=k.tag,k!==pe||Q!==5&&Q!==27&&Q!==6)&&(k=null)):(N=null,k=S),N!==k)){if(Q=jc,q="onMouseLeave",y="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(Q=Sc,q="onPointerLeave",y="onPointerEnter",h="pointer"),pe=N==null?_:Ql(N),b=k==null?_:Ql(k),_=new Q(q,h+"leave",N,a,O),_.target=pe,_.relatedTarget=b,q=null,al(O)===S&&(Q=new Q(y,h+"enter",k,a,O),Q.target=b,Q.relatedTarget=pe,q=Q),pe=q,N&&k)t:{for(Q=N,y=k,h=0,b=Q;b;b=$l(b))h++;for(b=0,q=y;q;q=$l(q))b++;for(;0<h-b;)Q=$l(Q),h--;for(;0<b-h;)y=$l(y),b--;for(;h--;){if(Q===y||y!==null&&Q===y.alternate)break t;Q=$l(Q),y=$l(y)}Q=null}else Q=null;N!==null&&md(M,_,N,Q,!1),k!==null&&pe!==null&&md(M,pe,k,Q,!0)}}e:{if(_=S?Ql(S):window,N=_.nodeName&&_.nodeName.toLowerCase(),N==="select"||N==="input"&&_.type==="file")var H=Oc;else if(Uc(_))if(Dc)H=Em;else{H=Rm;var F=wm}else N=_.nodeName,!N||N.toLowerCase()!=="input"||_.type!=="checkbox"&&_.type!=="radio"?S&&Ti(S.elementType)&&(H=Oc):H=Um;if(H&&(H=H(e,S))){Ec(M,H,a,O);break e}F&&F(e,_,S),e==="focusout"&&S&&_.type==="number"&&S.memoizedProps.value!=null&&Ni(_,"number",_.value)}switch(F=S?Ql(S):window,e){case"focusin":(Uc(F)||F.contentEditable==="true")&&(dl=F,Ci=S,es=null);break;case"focusout":es=Ci=dl=null;break;case"mousedown":Xi=!0;break;case"contextmenu":case"mouseup":case"dragend":Xi=!1,Cc(M,a,O);break;case"selectionchange":if(Dm)break;case"keydown":case"keyup":Cc(M,a,O)}var Y;if($i)e:{switch(e){case"compositionstart":var Z="onCompositionStart";break e;case"compositionend":Z="onCompositionEnd";break e;case"compositionupdate":Z="onCompositionUpdate";break e}Z=void 0}else fl?wc(e,a)&&(Z="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Z="onCompositionStart");Z&&(_c&&a.locale!=="ko"&&(fl||Z!=="onCompositionStart"?Z==="onCompositionEnd"&&fl&&(Y=vc()):(ia=O,Oi="value"in ia?ia.value:ia.textContent,fl=!0)),F=Qn(S,Z),0<F.length&&(Z=new Ac(Z,e,null,a,O),M.push({event:Z,listeners:F}),Y?Z.data=Y:(Y=Rc(a),Y!==null&&(Z.data=Y)))),(Y=Am?Sm(e,a):_m(e,a))&&(Z=Qn(S,"onBeforeInput"),0<Z.length&&(F=new Ac("onBeforeInput","beforeinput",null,a,O),M.push({event:F,listeners:Z}),F.data=Y)),mh(M,e,S,a,O)}dd(M,t)})}function Rs(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Qn(e,t){for(var a=t+"Capture",l=[];e!==null;){var s=e,n=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||n===null||(s=Zl(e,a),s!=null&&l.unshift(Rs(e,s,n)),s=Zl(e,t),s!=null&&l.push(Rs(e,s,n))),e.tag===3)return l;e=e.return}return[]}function $l(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function md(e,t,a,l,s){for(var n=t._reactName,r=[];a!==null&&a!==l;){var o=a,g=o.alternate,S=o.stateNode;if(o=o.tag,g!==null&&g===l)break;o!==5&&o!==26&&o!==27||S===null||(g=S,s?(S=Zl(a,n),S!=null&&r.unshift(Rs(a,S,g))):s||(S=Zl(a,n),S!=null&&r.push(Rs(a,S,g)))),a=a.return}r.length!==0&&e.push({event:t,listeners:r})}var xh=/\r\n?/g,vh=/\u0000|\uFFFD/g;function hd(e){return(typeof e=="string"?e:""+e).replace(xh,`
`).replace(vh,"")}function pd(e,t){return t=hd(t),hd(e)===t}function Zn(){}function he(e,t,a,l,s,n){switch(a){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||ul(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&ul(e,""+l);break;case"className":Js(e,"class",l);break;case"tabIndex":Js(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Js(e,a,l);break;case"style":pc(e,l,n);break;case"data":if(t!=="object"){Js(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Fs(""+l),e.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof n=="function"&&(a==="formAction"?(t!=="input"&&he(e,t,"name",s.name,s,null),he(e,t,"formEncType",s.formEncType,s,null),he(e,t,"formMethod",s.formMethod,s,null),he(e,t,"formTarget",s.formTarget,s,null)):(he(e,t,"encType",s.encType,s,null),he(e,t,"method",s.method,s,null),he(e,t,"target",s.target,s,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Fs(""+l),e.setAttribute(a,l);break;case"onClick":l!=null&&(e.onclick=Zn);break;case"onScroll":l!=null&&te("scroll",e);break;case"onScrollEnd":l!=null&&te("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(d(61));if(a=l.__html,a!=null){if(s.children!=null)throw Error(d(60));e.innerHTML=a}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}a=Fs(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""+l):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":l===!0?e.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,l):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(a,l):e.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(a):e.setAttribute(a,l);break;case"popover":te("beforetoggle",e),te("toggle",e),Ks(e,"popover",l);break;case"xlinkActuate":Bt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Bt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Bt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Bt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Bt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Bt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Ks(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Kg.get(a)||a,Ks(e,a,l))}}function ou(e,t,a,l,s,n){switch(a){case"style":pc(e,l,n);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(d(61));if(a=l.__html,a!=null){if(s.children!=null)throw Error(d(60));e.innerHTML=a}}break;case"children":typeof l=="string"?ul(e,l):(typeof l=="number"||typeof l=="bigint")&&ul(e,""+l);break;case"onScroll":l!=null&&te("scroll",e);break;case"onScrollEnd":l!=null&&te("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Zn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!nc.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(s=a.endsWith("Capture"),t=a.slice(2,s?a.length-7:void 0),n=e[Je]||null,n=n!=null?n[a]:null,typeof n=="function"&&e.removeEventListener(t,n,s),typeof l=="function")){typeof n!="function"&&n!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,l,s);break e}a in e?e[a]=l:l===!0?e.setAttribute(a,""):Ks(e,a,l)}}}function Ye(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":te("error",e),te("load",e);var l=!1,s=!1,n;for(n in a)if(a.hasOwnProperty(n)){var r=a[n];if(r!=null)switch(n){case"src":l=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:he(e,t,n,r,a,null)}}s&&he(e,t,"srcSet",a.srcSet,a,null),l&&he(e,t,"src",a.src,a,null);return;case"input":te("invalid",e);var o=n=r=s=null,g=null,S=null;for(l in a)if(a.hasOwnProperty(l)){var O=a[l];if(O!=null)switch(l){case"name":s=O;break;case"type":r=O;break;case"checked":g=O;break;case"defaultChecked":S=O;break;case"value":n=O;break;case"defaultValue":o=O;break;case"children":case"dangerouslySetInnerHTML":if(O!=null)throw Error(d(137,t));break;default:he(e,t,l,O,a,null)}}dc(e,n,o,g,S,r,s,!1),Ps(e);return;case"select":te("invalid",e),l=r=n=null;for(s in a)if(a.hasOwnProperty(s)&&(o=a[s],o!=null))switch(s){case"value":n=o;break;case"defaultValue":r=o;break;case"multiple":l=o;default:he(e,t,s,o,a,null)}t=n,a=r,e.multiple=!!l,t!=null?rl(e,!!l,t,!1):a!=null&&rl(e,!!l,a,!0);return;case"textarea":te("invalid",e),n=s=l=null;for(r in a)if(a.hasOwnProperty(r)&&(o=a[r],o!=null))switch(r){case"value":l=o;break;case"defaultValue":s=o;break;case"children":n=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(d(91));break;default:he(e,t,r,o,a,null)}mc(e,l,s,n),Ps(e);return;case"option":for(g in a)if(a.hasOwnProperty(g)&&(l=a[g],l!=null))switch(g){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:he(e,t,g,l,a,null)}return;case"dialog":te("beforetoggle",e),te("toggle",e),te("cancel",e),te("close",e);break;case"iframe":case"object":te("load",e);break;case"video":case"audio":for(l=0;l<ws.length;l++)te(ws[l],e);break;case"image":te("error",e),te("load",e);break;case"details":te("toggle",e);break;case"embed":case"source":case"link":te("error",e),te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(S in a)if(a.hasOwnProperty(S)&&(l=a[S],l!=null))switch(S){case"children":case"dangerouslySetInnerHTML":throw Error(d(137,t));default:he(e,t,S,l,a,null)}return;default:if(Ti(t)){for(O in a)a.hasOwnProperty(O)&&(l=a[O],l!==void 0&&ou(e,t,O,l,a,void 0));return}}for(o in a)a.hasOwnProperty(o)&&(l=a[o],l!=null&&he(e,t,o,l,a,null))}function bh(e,t,a,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,n=null,r=null,o=null,g=null,S=null,O=null;for(N in a){var M=a[N];if(a.hasOwnProperty(N)&&M!=null)switch(N){case"checked":break;case"value":break;case"defaultValue":g=M;default:l.hasOwnProperty(N)||he(e,t,N,null,l,M)}}for(var _ in l){var N=l[_];if(M=a[_],l.hasOwnProperty(_)&&(N!=null||M!=null))switch(_){case"type":n=N;break;case"name":s=N;break;case"checked":S=N;break;case"defaultChecked":O=N;break;case"value":r=N;break;case"defaultValue":o=N;break;case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(d(137,t));break;default:N!==M&&he(e,t,_,N,l,M)}}_i(e,r,o,g,S,O,n,s);return;case"select":N=r=o=_=null;for(n in a)if(g=a[n],a.hasOwnProperty(n)&&g!=null)switch(n){case"value":break;case"multiple":N=g;default:l.hasOwnProperty(n)||he(e,t,n,null,l,g)}for(s in l)if(n=l[s],g=a[s],l.hasOwnProperty(s)&&(n!=null||g!=null))switch(s){case"value":_=n;break;case"defaultValue":o=n;break;case"multiple":r=n;default:n!==g&&he(e,t,s,n,l,g)}t=o,a=r,l=N,_!=null?rl(e,!!a,_,!1):!!l!=!!a&&(t!=null?rl(e,!!a,t,!0):rl(e,!!a,a?[]:"",!1));return;case"textarea":N=_=null;for(o in a)if(s=a[o],a.hasOwnProperty(o)&&s!=null&&!l.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:he(e,t,o,null,l,s)}for(r in l)if(s=l[r],n=a[r],l.hasOwnProperty(r)&&(s!=null||n!=null))switch(r){case"value":_=s;break;case"defaultValue":N=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(d(91));break;default:s!==n&&he(e,t,r,s,l,n)}gc(e,_,N);return;case"option":for(var k in a)if(_=a[k],a.hasOwnProperty(k)&&_!=null&&!l.hasOwnProperty(k))switch(k){case"selected":e.selected=!1;break;default:he(e,t,k,null,l,_)}for(g in l)if(_=l[g],N=a[g],l.hasOwnProperty(g)&&_!==N&&(_!=null||N!=null))switch(g){case"selected":e.selected=_&&typeof _!="function"&&typeof _!="symbol";break;default:he(e,t,g,_,l,N)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Q in a)_=a[Q],a.hasOwnProperty(Q)&&_!=null&&!l.hasOwnProperty(Q)&&he(e,t,Q,null,l,_);for(S in l)if(_=l[S],N=a[S],l.hasOwnProperty(S)&&_!==N&&(_!=null||N!=null))switch(S){case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(d(137,t));break;default:he(e,t,S,_,l,N)}return;default:if(Ti(t)){for(var pe in a)_=a[pe],a.hasOwnProperty(pe)&&_!==void 0&&!l.hasOwnProperty(pe)&&ou(e,t,pe,void 0,l,_);for(O in l)_=l[O],N=a[O],!l.hasOwnProperty(O)||_===N||_===void 0&&N===void 0||ou(e,t,O,_,l,N);return}}for(var y in a)_=a[y],a.hasOwnProperty(y)&&_!=null&&!l.hasOwnProperty(y)&&he(e,t,y,null,l,_);for(M in l)_=l[M],N=a[M],!l.hasOwnProperty(M)||_===N||_==null&&N==null||he(e,t,M,_,l,N)}var fu=null,du=null;function Vn(e){return e.nodeType===9?e:e.ownerDocument}function yd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function xd(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function gu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mu=null;function jh(){var e=window.event;return e&&e.type==="popstate"?e===mu?!1:(mu=e,!0):(mu=null,!1)}var vd=typeof setTimeout=="function"?setTimeout:void 0,Ah=typeof clearTimeout=="function"?clearTimeout:void 0,bd=typeof Promise=="function"?Promise:void 0,Sh=typeof queueMicrotask=="function"?queueMicrotask:typeof bd<"u"?function(e){return bd.resolve(null).then(e).catch(_h)}:vd;function _h(e){setTimeout(function(){throw e})}function Aa(e){return e==="head"}function jd(e,t){var a=t,l=0,s=0;do{var n=a.nextSibling;if(e.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(0<l&&8>l){a=l;var r=e.ownerDocument;if(a&1&&Us(r.documentElement),a&2&&Us(r.body),a&4)for(a=r.head,Us(a),r=a.firstChild;r;){var o=r.nextSibling,g=r.nodeName;r[Yl]||g==="SCRIPT"||g==="STYLE"||g==="LINK"&&r.rel.toLowerCase()==="stylesheet"||a.removeChild(r),r=o}}if(s===0){e.removeChild(n),Gs(t);return}s--}else a==="$"||a==="$?"||a==="$!"?s++:l=a.charCodeAt(0)-48;else l=0;a=n}while(a);Gs(t)}function hu(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":hu(a),bi(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Nh(e,t,a,l){for(;e.nodeType===1;){var s=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Yl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(n=e.getAttribute("rel"),n==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(n!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(n=e.getAttribute("src"),(n!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&n&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var n=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===n)return e}else return e;if(e=Rt(e.nextSibling),e===null)break}return null}function Th(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Rt(e.nextSibling),e===null))return null;return e}function pu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function wh(e,t){var a=e.ownerDocument;if(e.data!=="$?"||a.readyState==="complete")t();else{var l=function(){t(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Rt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var yu=null;function Ad(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}function Sd(e,t,a){switch(t=Vn(a),e){case"html":if(e=t.documentElement,!e)throw Error(d(452));return e;case"head":if(e=t.head,!e)throw Error(d(453));return e;case"body":if(e=t.body,!e)throw Error(d(454));return e;default:throw Error(d(451))}}function Us(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);bi(e)}var _t=new Map,_d=new Set;function kn(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ft=X.d;X.d={f:Rh,r:Uh,D:Eh,C:Oh,L:Dh,m:qh,X:Mh,S:Ih,M:$h};function Rh(){var e=Ft.f(),t=Bn();return e||t}function Uh(e){var t=ll(e);t!==null&&t.tag===5&&t.type==="form"?Lo(t):Ft.r(e)}var Gl=typeof document>"u"?null:document;function Nd(e,t,a){var l=Gl;if(l&&typeof t=="string"&&t){var s=yt(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof a=="string"&&(s+='[crossorigin="'+a+'"]'),_d.has(s)||(_d.add(s),e={rel:e,crossOrigin:a,href:t},l.querySelector(s)===null&&(t=l.createElement("link"),Ye(t,"link",e),Ge(t),l.head.appendChild(t)))}}function Eh(e){Ft.D(e),Nd("dns-prefetch",e,null)}function Oh(e,t){Ft.C(e,t),Nd("preconnect",e,t)}function Dh(e,t,a){Ft.L(e,t,a);var l=Gl;if(l&&e&&t){var s='link[rel="preload"][as="'+yt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(s+='[imagesrcset="'+yt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(s+='[imagesizes="'+yt(a.imageSizes)+'"]')):s+='[href="'+yt(e)+'"]';var n=s;switch(t){case"style":n=zl(e);break;case"script":n=Bl(e)}_t.has(n)||(e=I({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),_t.set(n,e),l.querySelector(s)!==null||t==="style"&&l.querySelector(Es(n))||t==="script"&&l.querySelector(Os(n))||(t=l.createElement("link"),Ye(t,"link",e),Ge(t),l.head.appendChild(t)))}}function qh(e,t){Ft.m(e,t);var a=Gl;if(a&&e){var l=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+yt(l)+'"][href="'+yt(e)+'"]',n=s;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":n=Bl(e)}if(!_t.has(n)&&(e=I({rel:"modulepreload",href:e},t),_t.set(n,e),a.querySelector(s)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Os(n)))return}l=a.createElement("link"),Ye(l,"link",e),Ge(l),a.head.appendChild(l)}}}function Ih(e,t,a){Ft.S(e,t,a);var l=Gl;if(l&&e){var s=sl(l).hoistableStyles,n=zl(e);t=t||"default";var r=s.get(n);if(!r){var o={loading:0,preload:null};if(r=l.querySelector(Es(n)))o.loading=5;else{e=I({rel:"stylesheet",href:e,"data-precedence":t},a),(a=_t.get(n))&&xu(e,a);var g=r=l.createElement("link");Ge(g),Ye(g,"link",e),g._p=new Promise(function(S,O){g.onload=S,g.onerror=O}),g.addEventListener("load",function(){o.loading|=1}),g.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Kn(r,t,l)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(n,r)}}}function Mh(e,t){Ft.X(e,t);var a=Gl;if(a&&e){var l=sl(a).hoistableScripts,s=Bl(e),n=l.get(s);n||(n=a.querySelector(Os(s)),n||(e=I({src:e,async:!0},t),(t=_t.get(s))&&vu(e,t),n=a.createElement("script"),Ge(n),Ye(n,"link",e),a.head.appendChild(n)),n={type:"script",instance:n,count:1,state:null},l.set(s,n))}}function $h(e,t){Ft.M(e,t);var a=Gl;if(a&&e){var l=sl(a).hoistableScripts,s=Bl(e),n=l.get(s);n||(n=a.querySelector(Os(s)),n||(e=I({src:e,async:!0,type:"module"},t),(t=_t.get(s))&&vu(e,t),n=a.createElement("script"),Ge(n),Ye(n,"link",e),a.head.appendChild(n)),n={type:"script",instance:n,count:1,state:null},l.set(s,n))}}function Td(e,t,a,l){var s=(s=Ut.current)?kn(s):null;if(!s)throw Error(d(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=zl(a.href),a=sl(s).hoistableStyles,l=a.get(t),l||(l={type:"style",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=zl(a.href);var n=sl(s).hoistableStyles,r=n.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},n.set(e,r),(n=s.querySelector(Es(e)))&&!n._p&&(r.instance=n,r.state.loading=5),_t.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},_t.set(e,a),n||Gh(s,e,a,r.state))),t&&l===null)throw Error(d(528,""));return r}if(t&&l!==null)throw Error(d(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Bl(a),a=sl(s).hoistableScripts,l=a.get(t),l||(l={type:"script",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(d(444,e))}}function zl(e){return'href="'+yt(e)+'"'}function Es(e){return'link[rel="stylesheet"]['+e+"]"}function wd(e){return I({},e,{"data-precedence":e.precedence,precedence:null})}function Gh(e,t,a,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),Ye(t,"link",a),Ge(t),e.head.appendChild(t))}function Bl(e){return'[src="'+yt(e)+'"]'}function Os(e){return"script[async]"+e}function Rd(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+yt(a.href)+'"]');if(l)return t.instance=l,Ge(l),l;var s=I({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),Ge(l),Ye(l,"style",s),Kn(l,a.precedence,e),t.instance=l;case"stylesheet":s=zl(a.href);var n=e.querySelector(Es(s));if(n)return t.state.loading|=4,t.instance=n,Ge(n),n;l=wd(a),(s=_t.get(s))&&xu(l,s),n=(e.ownerDocument||e).createElement("link"),Ge(n);var r=n;return r._p=new Promise(function(o,g){r.onload=o,r.onerror=g}),Ye(n,"link",l),t.state.loading|=4,Kn(n,a.precedence,e),t.instance=n;case"script":return n=Bl(a.src),(s=e.querySelector(Os(n)))?(t.instance=s,Ge(s),s):(l=a,(s=_t.get(n))&&(l=I({},a),vu(l,s)),e=e.ownerDocument||e,s=e.createElement("script"),Ge(s),Ye(s,"link",l),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(d(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(l=t.instance,t.state.loading|=4,Kn(l,a.precedence,e));return t.instance}function Kn(e,t,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=l.length?l[l.length-1]:null,n=s,r=0;r<l.length;r++){var o=l[r];if(o.dataset.precedence===t)n=o;else if(n!==s)break}n?n.parentNode.insertBefore(e,n.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function xu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function vu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Jn=null;function Ud(e,t,a){if(Jn===null){var l=new Map,s=Jn=new Map;s.set(a,l)}else s=Jn,l=s.get(a),l||(l=new Map,s.set(a,l));if(l.has(e))return l;for(l.set(e,null),a=a.getElementsByTagName(e),s=0;s<a.length;s++){var n=a[s];if(!(n[Yl]||n[Ve]||e==="link"&&n.getAttribute("rel")==="stylesheet")&&n.namespaceURI!=="http://www.w3.org/2000/svg"){var r=n.getAttribute(t)||"";r=e+r;var o=l.get(r);o?o.push(n):l.set(r,[n])}}return l}function Ed(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function zh(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Od(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var Ds=null;function Bh(){}function Ch(e,t,a){if(Ds===null)throw Error(d(475));var l=Ds;if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var s=zl(a.href),n=e.querySelector(Es(s));if(n){e=n._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(l.count++,l=Pn.bind(l),e.then(l,l)),t.state.loading|=4,t.instance=n,Ge(n);return}n=e.ownerDocument||e,a=wd(a),(s=_t.get(s))&&xu(a,s),n=n.createElement("link"),Ge(n);var r=n;r._p=new Promise(function(o,g){r.onload=o,r.onerror=g}),Ye(n,"link",a),t.instance=n}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(l.count++,t=Pn.bind(l),e.addEventListener("load",t),e.addEventListener("error",t))}}function Xh(){if(Ds===null)throw Error(d(475));var e=Ds;return e.stylesheets&&e.count===0&&bu(e,e.stylesheets),0<e.count?function(t){var a=setTimeout(function(){if(e.stylesheets&&bu(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a)}}:null}function Pn(){if(this.count--,this.count===0){if(this.stylesheets)bu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Wn=null;function bu(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Wn=new Map,t.forEach(Hh,e),Wn=null,Pn.call(e))}function Hh(e,t){if(!(t.state.loading&4)){var a=Wn.get(e);if(a)var l=a.get(null);else{a=new Map,Wn.set(e,a);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),n=0;n<s.length;n++){var r=s[n];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(a.set(r.dataset.precedence,r),l=r)}l&&a.set(null,l)}s=t.instance,r=s.getAttribute("data-precedence"),n=a.get(r)||l,n===l&&a.set(null,s),a.set(r,s),this.count++,l=Pn.bind(this),s.addEventListener("load",l),s.addEventListener("error",l),n?n.parentNode.insertBefore(s,n.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var qs={$$typeof:ae,Provider:null,Consumer:null,_currentValue:V,_currentValue2:V,_threadCount:0};function Lh(e,t,a,l,s,n,r,o){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=pi(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pi(0),this.hiddenUpdates=pi(null),this.identifierPrefix=l,this.onUncaughtError=s,this.onCaughtError=n,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function Dd(e,t,a,l,s,n,r,o,g,S,O,M){return e=new Lh(e,t,a,r,o,g,S,M),t=1,n===!0&&(t|=24),n=it(3,null,null,t),e.current=n,n.stateNode=e,t=tr(),t.refCount++,e.pooledCache=t,t.refCount++,n.memoizedState={element:l,isDehydrated:a,cache:t},nr(n),e}function qd(e){return e?(e=pl,e):pl}function Id(e,t,a,l,s,n){s=qd(s),l.context===null?l.context=s:l.pendingContext=s,l=ca(t),l.payload={element:a},n=n===void 0?null:n,n!==null&&(l.callback=n),a=oa(e,l,t),a!==null&&(ft(a,e,t),cs(a,e,t))}function Md(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function ju(e,t){Md(e,t),(e=e.alternate)&&Md(e,t)}function $d(e){if(e.tag===13){var t=hl(e,67108864);t!==null&&ft(t,e,67108864),ju(e,67108864)}}var Fn=!0;function Yh(e,t,a,l){var s=D.T;D.T=null;var n=X.p;try{X.p=2,Au(e,t,a,l)}finally{X.p=n,D.T=s}}function Qh(e,t,a,l){var s=D.T;D.T=null;var n=X.p;try{X.p=8,Au(e,t,a,l)}finally{X.p=n,D.T=s}}function Au(e,t,a,l){if(Fn){var s=Su(l);if(s===null)cu(e,t,l,ei,a),zd(e,l);else if(Vh(s,e,t,a,l))l.stopPropagation();else if(zd(e,l),t&4&&-1<Zh.indexOf(e)){for(;s!==null;){var n=ll(s);if(n!==null)switch(n.tag){case 3:if(n=n.stateNode,n.current.memoizedState.isDehydrated){var r=Ea(n.pendingLanes);if(r!==0){var o=n;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var g=1<<31-st(r);o.entanglements[1]|=g,r&=~g}$t(n),(fe&6)===0&&(Gn=Ot()+500,Ts(0))}}break;case 13:o=hl(n,2),o!==null&&ft(o,n,2),Bn(),ju(n,2)}if(n=Su(l),n===null&&cu(e,t,l,ei,a),n===s)break;s=n}s!==null&&l.stopPropagation()}else cu(e,t,l,null,a)}}function Su(e){return e=Ri(e),_u(e)}var ei=null;function _u(e){if(ei=null,e=al(e),e!==null){var t=A(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=x(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return ei=e,null}function Gd(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Og()){case Ku:return 2;case Ju:return 8;case Qs:case Dg:return 32;case Pu:return 268435456;default:return 32}default:return 32}}var Nu=!1,Sa=null,_a=null,Na=null,Is=new Map,Ms=new Map,Ta=[],Zh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function zd(e,t){switch(e){case"focusin":case"focusout":Sa=null;break;case"dragenter":case"dragleave":_a=null;break;case"mouseover":case"mouseout":Na=null;break;case"pointerover":case"pointerout":Is.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ms.delete(t.pointerId)}}function $s(e,t,a,l,s,n){return e===null||e.nativeEvent!==n?(e={blockedOn:t,domEventName:a,eventSystemFlags:l,nativeEvent:n,targetContainers:[s]},t!==null&&(t=ll(t),t!==null&&$d(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Vh(e,t,a,l,s){switch(t){case"focusin":return Sa=$s(Sa,e,t,a,l,s),!0;case"dragenter":return _a=$s(_a,e,t,a,l,s),!0;case"mouseover":return Na=$s(Na,e,t,a,l,s),!0;case"pointerover":var n=s.pointerId;return Is.set(n,$s(Is.get(n)||null,e,t,a,l,s)),!0;case"gotpointercapture":return n=s.pointerId,Ms.set(n,$s(Ms.get(n)||null,e,t,a,l,s)),!0}return!1}function Bd(e){var t=al(e.target);if(t!==null){var a=A(t);if(a!==null){if(t=a.tag,t===13){if(t=x(a),t!==null){e.blockedOn=t,Cg(e.priority,function(){if(a.tag===13){var l=ot();l=yi(l);var s=hl(a,l);s!==null&&ft(s,a,l),ju(a,l)}});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ti(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=Su(e.nativeEvent);if(a===null){a=e.nativeEvent;var l=new a.constructor(a.type,a);wi=l,a.target.dispatchEvent(l),wi=null}else return t=ll(a),t!==null&&$d(t),e.blockedOn=a,!1;t.shift()}return!0}function Cd(e,t,a){ti(e)&&a.delete(t)}function kh(){Nu=!1,Sa!==null&&ti(Sa)&&(Sa=null),_a!==null&&ti(_a)&&(_a=null),Na!==null&&ti(Na)&&(Na=null),Is.forEach(Cd),Ms.forEach(Cd)}function ai(e,t){e.blockedOn===t&&(e.blockedOn=null,Nu||(Nu=!0,u.unstable_scheduleCallback(u.unstable_NormalPriority,kh)))}var li=null;function Xd(e){li!==e&&(li=e,u.unstable_scheduleCallback(u.unstable_NormalPriority,function(){li===e&&(li=null);for(var t=0;t<e.length;t+=3){var a=e[t],l=e[t+1],s=e[t+2];if(typeof l!="function"){if(_u(l||a)===null)continue;break}var n=ll(a);n!==null&&(e.splice(t,3),t-=3,_r(n,{pending:!0,data:s,method:a.method,action:l},l,s))}}))}function Gs(e){function t(g){return ai(g,e)}Sa!==null&&ai(Sa,e),_a!==null&&ai(_a,e),Na!==null&&ai(Na,e),Is.forEach(t),Ms.forEach(t);for(var a=0;a<Ta.length;a++){var l=Ta[a];l.blockedOn===e&&(l.blockedOn=null)}for(;0<Ta.length&&(a=Ta[0],a.blockedOn===null);)Bd(a),a.blockedOn===null&&Ta.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var s=a[l],n=a[l+1],r=s[Je]||null;if(typeof n=="function")r||Xd(a);else if(r){var o=null;if(n&&n.hasAttribute("formAction")){if(s=n,r=n[Je]||null)o=r.formAction;else if(_u(s)!==null)continue}else o=r.action;typeof o=="function"?a[l+1]=o:(a.splice(l,3),l-=3),Xd(a)}}}function Tu(e){this._internalRoot=e}si.prototype.render=Tu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(d(409));var a=t.current,l=ot();Id(a,l,e,t,null,null)},si.prototype.unmount=Tu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Id(e.current,2,null,e,null,null),Bn(),t[tl]=null}};function si(e){this._internalRoot=e}si.prototype.unstable_scheduleHydration=function(e){if(e){var t=ac();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Ta.length&&t!==0&&t<Ta[a].priority;a++);Ta.splice(a,0,e),a===0&&Bd(e)}};var Hd=c.version;if(Hd!=="19.1.0")throw Error(d(527,Hd,"19.1.0"));X.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(d(188)):(e=Object.keys(e).join(","),Error(d(268,e)));return e=U(t),e=e!==null?E(e):null,e=e===null?null:e.stateNode,e};var Kh={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:D,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ni=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ni.isDisabled&&ni.supportsFiber)try{Xl=ni.inject(Kh),lt=ni}catch{}}return zs.createRoot=function(e,t){if(!m(e))throw Error(d(299));var a=!1,l="",s=lf,n=sf,r=nf,o=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(n=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(o=t.unstable_transitionCallbacks)),t=Dd(e,1,!1,null,null,a,l,s,n,r,o,null),e[tl]=t.current,uu(e),new Tu(t)},zs.hydrateRoot=function(e,t,a){if(!m(e))throw Error(d(299));var l=!1,s="",n=lf,r=sf,o=nf,g=null,S=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(s=a.identifierPrefix),a.onUncaughtError!==void 0&&(n=a.onUncaughtError),a.onCaughtError!==void 0&&(r=a.onCaughtError),a.onRecoverableError!==void 0&&(o=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(g=a.unstable_transitionCallbacks),a.formState!==void 0&&(S=a.formState)),t=Dd(e,1,!0,t,a??null,l,s,n,r,o,g,S),t.context=qd(null),a=t.current,l=ot(),l=yi(l),s=ca(l),s.callback=null,oa(a,s,l),a=l,t.current.lanes=a,Ll(t,a),$t(t),e[tl]=t.current,uu(e),new si(t)},zs.version="19.1.0",zs}var kd;function R0(){if(kd)return wu.exports;kd=1;function u(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u)}catch(c){console.error(c)}}return u(),wu.exports=w0(),wu.exports}var U0=R0();class Cs extends Error{}Cs.prototype.name="InvalidTokenError";function E0(u){return decodeURIComponent(atob(u).replace(/(.)/g,(c,f)=>{let d=f.charCodeAt(0).toString(16).toUpperCase();return d.length<2&&(d="0"+d),"%"+d}))}function O0(u){let c=u.replace(/-/g,"+").replace(/_/g,"/");switch(c.length%4){case 0:break;case 2:c+="==";break;case 3:c+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return E0(c)}catch{return atob(c)}}function lg(u,c){if(typeof u!="string")throw new Cs("Invalid token specified: must be a string");c||(c={});const f=c.header===!0?0:1,d=u.split(".")[f];if(typeof d!="string")throw new Cs(`Invalid token specified: missing part #${f+1}`);let m;try{m=O0(d)}catch(A){throw new Cs(`Invalid token specified: invalid base64 for part #${f+1} (${A.message})`)}try{return JSON.parse(m)}catch(A){throw new Cs(`Invalid token specified: invalid json for part #${f+1} (${A.message})`)}}const sg="https://learn.reboot01.com/api",D0=`${sg}/auth/signin`,q0=`${sg}/graphql-engine/v1/graphql`,$u="reboot01_jwt_token",Gu="reboot01_user_data",I0=(u,c)=>{const f=`${u}:${c}`;return btoa(f)},M0=async(u,c)=>{try{const f=I0(u,c),d=await fetch(D0,{method:"POST",headers:{Authorization:`Basic ${f}`,"Content-Type":"application/json"}});if(!d.ok)throw d.status===401?new Error("Invalid credentials. Please check your username/email and password."):d.status===403?new Error("Access forbidden. Please contact support."):d.status>=500?new Error("Server error. Please try again later."):new Error(`Authentication failed: ${d.statusText}`);const m=await d.text();if(!m||m.trim()==="")throw new Error("No token received from server");const A=m.trim().replace(/^["']|["']$/g,"");if(!A.includes(".")||A.split(".").length!==3)throw console.error("Invalid token format. Token:",A.substring(0,50)+"..."),new Error("Invalid token format received from server");if(!Bu(A))throw console.error("Token failed format validation"),new Error("Token format validation failed");const x=lg(A),j={id:x.sub,username:x.username||u,email:x.email,exp:x.exp,iat:x.iat};return{token:A,user:j}}catch(f){throw f.name==="InvalidTokenError"?new Error("Invalid token received from server"):f}},$0=(u,c)=>{localStorage.setItem($u,u),localStorage.setItem(Gu,JSON.stringify(c))},zu=()=>localStorage.getItem($u),G0=()=>{const u=localStorage.getItem(Gu);return u?JSON.parse(u):null},Bu=u=>{if(!u||typeof u!="string")return!1;const c=u.split(".");if(c.length!==3)return!1;try{return c.forEach(f=>{if(!f)throw new Error("Empty part");if(!/^[A-Za-z0-9_-]+$/.test(f))throw new Error("Invalid characters")}),!0}catch{return!1}},ng=u=>{try{if(!Bu(u))return!0;const c=lg(u),f=Date.now()/1e3;return c.exp<f}catch(c){return console.warn("Token validation error:",c.message),!0}},z0=()=>{const u=zu();return u?!ng(u):!1},ka=()=>{localStorage.removeItem($u),localStorage.removeItem(Gu)},B0=()=>{const u=zu();return!u||!Bu(u)||ng(u)?(u&&(console.warn("Clearing invalid or expired token"),ka()),{}):{Authorization:`Bearer ${u}`}},C0=u=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u),X0=u=>C0(u)?"email":"username",tt={LOGIN_START:"LOGIN_START",LOGIN_SUCCESS:"LOGIN_SUCCESS",LOGIN_FAILURE:"LOGIN_FAILURE",LOGOUT:"LOGOUT",RESTORE_SESSION:"RESTORE_SESSION",CLEAR_ERROR:"CLEAR_ERROR"},H0={user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!1},L0=(u,c)=>{switch(c.type){case tt.LOGIN_START:return{...u,isLoading:!0,error:null};case tt.LOGIN_SUCCESS:return{...u,user:c.payload.user,token:c.payload.token,isAuthenticated:!0,isLoading:!1,error:null,isInitialized:!0};case tt.LOGIN_FAILURE:return{...u,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:c.payload.error,isInitialized:!0};case tt.LOGOUT:return{...u,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!0};case tt.RESTORE_SESSION:return{...u,user:c.payload.user,token:c.payload.token,isAuthenticated:c.payload.isAuthenticated,isInitialized:!0};case tt.CLEAR_ERROR:return{...u,error:null};default:return u}},ig=W.createContext(null),Y0=({children:u})=>{const[c,f]=W.useReducer(L0,H0);W.useEffect(()=>{(()=>{try{const U=zu(),E=G0();U&&E&&z0()?f({type:tt.RESTORE_SESSION,payload:{user:E,token:U,isAuthenticated:!0}}):(ka(),f({type:tt.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}}))}catch(U){console.warn("Session restoration error:",U.message),ka(),f({type:tt.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}})}})()},[]);const d=async(j,U)=>{f({type:tt.LOGIN_START});try{const{token:E,user:I}=await M0(j,U);return $0(E,I),f({type:tt.LOGIN_SUCCESS,payload:{user:I,token:E}}),{success:!0}}catch(E){return f({type:tt.LOGIN_FAILURE,payload:{error:E.message}}),{success:!1,error:E.message}}},m=()=>{ka(),f({type:tt.LOGOUT})},A=()=>{f({type:tt.CLEAR_ERROR})},x={user:c.user,token:c.token,isAuthenticated:c.isAuthenticated,isLoading:c.isLoading,error:c.error,isInitialized:c.isInitialized,login:d,logout:m,clearError:A};return i.jsx(ig.Provider,{value:x,children:u})},at=()=>{const u=W.useContext(ig);if(!u)throw new Error("useAuth must be used within an AuthProvider");return u};function rg(u){return new Iu(function(c,f){var d=Fh(c,[]);return new Jd(function(m){var A,x=!1;return Promise.resolve(d).then(function(j){return u(j,c.getContext())}).then(c.setContext).then(function(){x||(A=f(c).subscribe({next:m.next.bind(m),error:m.error.bind(m),complete:m.complete.bind(m)}))}).catch(m.error.bind(m)),function(){x=!0,A&&A.unsubscribe()}})})}function ug(u){return new Iu(function(c,f){return new Jd(function(d){var m,A,x;try{m=f(c).subscribe({next:function(j){if(j.errors?x=u({graphQLErrors:j.errors,response:j,operation:c,forward:f}):e0(j)&&(x=u({protocolErrors:j.extensions[t0],response:j,operation:c,forward:f})),x){A=x.subscribe({next:d.next.bind(d),error:d.error.bind(d),complete:d.complete.bind(d)});return}d.next(j)},error:function(j){if(x=u({operation:c,networkError:j,graphQLErrors:j&&j.result&&j.result.errors||void 0,forward:f}),x){A=x.subscribe({next:d.next.bind(d),error:d.error.bind(d),complete:d.complete.bind(d)});return}d.error(j)},complete:function(){x||d.complete.bind(d)()}})}catch(j){u({networkError:j,operation:c,forward:f}),d.error(j)}return function(){m&&m.unsubscribe(),A&&m.unsubscribe()}})})}(function(u){a0(c,u);function c(f){var d=u.call(this)||this;return d.link=ug(f),d}return c.prototype.request=function(f,d){return this.link.request(f,d)},c})(Iu);z`
  fragment ErrorInfo on Error {
    message
    code
    path
  }
`;z`
  fragment PaginationInfo on Query {
    totalCount: aggregate {
      count
    }
  }
`;const ce=z`
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
`,aa=z`
  fragment UserBasicInfo on user {
    id
    login
    firstName
    lastName
    campus
    avatarUrl
  }
`;z`
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
`;const be=z`
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
`,zt=z`
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
`,Ka=z`
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
`,di=z`
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
`,Ls=z`
  fragment AuditInfo on audit {
    id
    groupId
    auditorId
    attrs
    grade
    createdAt
    updatedAt
    code
    resultId
    version
    endAt
    private
  }
`,gi=z`
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
`,Ys=z`
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
`,cg=z`
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
`,mi=z`
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
`,og=z`
  fragment ObjectAggregateInfo on object_aggregate {
    aggregate {
      count
    }
  }
`,hi=z`
  fragment EventInfo on event {
    id
    path
    campus
    createdAt
    endAt
  }
`,fg=z`
  fragment EventUserInfo on event_user {
    id
    userId
    createdAt
  }
`,Cu=z`
  fragment EventUserAggregateInfo on event_user_aggregate {
    aggregate {
      count
    }
  }
`,dg=z`
  fragment GroupInfo on group {
    id
    path
    campus
    status
    captainId
    createdAt
    updatedAt
  }
`,gg=z`
  fragment GroupUserInfo on group_user {
    id
    userId
    confirmed
    createdAt
    updatedAt
  }
`,Q0=z`
  fragment GroupAggregateInfo on group_aggregate {
    aggregate {
      count
    }
  }
`,Z0=z`
  fragment GroupUserAggregateInfo on group_user_aggregate {
    aggregate {
      count
    }
  }
`,mg=z`
  fragment LabelInfo on label {
    id
    name
    description
    color
    createdAt
    updatedAt
  }
`,hg=z`
  fragment LabelUserInfo on label_user {
    id
    userId
    labelId
    createdAt
  }
`,pg=z`
  fragment LabelUserAggregateInfo on label_user_aggregate {
    aggregate {
      count
    }
  }
`,Xu=z`
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
`,yg=z`
  fragment MatchAggregateInfo on match_aggregate {
    aggregate {
      count
    }
  }
`,xg=z`
  fragment ObjectAvailabilityInfo on object_availability {
    id
    userId
    objectId
    available
    createdAt
    updatedAt
  }
`,vg=z`
  fragment ObjectAvailabilityAggregateInfo on object_availability_aggregate {
    aggregate {
      count
    }
  }
`,bg=z`
  fragment ProgressByPathViewInfo on progress_by_path_view {
    id
    userId
    path
    grade
    isDone
    createdAt
    updatedAt
  }
`,jg=z`
  fragment ProgressByPathViewAggregateInfo on progress_by_path_view_aggregate {
    aggregate {
      count
      avg {
        grade
      }
    }
  }
`,Hu=z`
  fragment RecordInfo on record {
    id
    userId
    authorId
    message
    banEndAt
    createdAt
    updatedAt
  }
`,Lu=z`
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
`,Ag=z`
  fragment RegistrationUserInfo on registration_user {
    id
    userId
    registrationId
    createdAt
  }
`,Sg=z`
  fragment RegistrationUserAggregateInfo on registration_user_aggregate {
    aggregate {
      count
    }
  }
`,Yu=z`
  fragment RoleInfo on role {
    id
    slug
    name
    description
    createdAt
    updatedAt
  }
`,Qu=z`
  fragment UserRoleInfo on user_role {
    id
    userId
    roleId
    createdAt
    updatedAt
  }
`,V0=z`
  fragment UserRoleAggregateInfo on user_role_aggregate {
    aggregate {
      count
    }
  }
`,k0=z`
  fragment UserRolesViewInfo on user_roles_view {
    id
    userId
    roleId
    slug
    name
    description
  }
`,K0=z`
  fragment UserRolesViewAggregateInfo on user_roles_view_aggregate {
    aggregate {
      count
    }
  }
`,_g=z`
  fragment ToadSessionInfo on toad_sessions {
    id
    userId
    sessionData
    createdAt
    updatedAt
    expiresAt
  }
`,Ng=z`
  fragment ToadSessionsAggregateInfo on toad_sessions_aggregate {
    aggregate {
      count
    }
  }
`,Tg=z`
  fragment XPInfo on xp {
    id
    userId
    amount
    originEventId
    path
    createdAt
  }
`;z`
  fragment MarkdownInfo on markdown {
    id
    name
    content
    path
    createdAt
    updatedAt
  }
`;z`
  query GetUserInfo {
    user {
      ...UserInfo
    }
  }
  ${ce}
`;z`
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
  ${ce}
  ${aa}
  ${fg}
  ${Cu}
  ${hi}
  ${be}
  ${Lu}
  ${gg}
  ${dg}
  ${hg}
  ${mg}
  ${Xu}
  ${xg}
  ${bg}
  ${Hu}
  ${Ag}
  ${Qu}
  ${Yu}
  ${k0}
  ${_g}
  ${Tg}
`;const J0=z`
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
  ${ce}
  ${aa}
  ${Hu}
  ${Qu}
  ${Yu}
`;z`
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
  ${fg}
  ${Cu}
  ${hi}
  ${be}
  ${aa}
  ${Lu}
  ${Ag}
  ${Sg}
`;z`
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
  ${hg}
  ${pg}
  ${mg}
`;z`
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
  ${Xu}
  ${yg}
  ${aa}
  ${be}
  ${hi}
`;z`
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
  ${xg}
  ${vg}
  ${be}
  ${aa}
`;z`
  query GetComprehensiveUserAnalytics($userId: Int!, $campus: String = null) {
    user(where: { id: { _eq: $userId } }) {
      ...UserInfo

      # Direct metrics from user table
      auditRatio
      totalUp
      totalDown
      totalUpBonus
      auditsAssigned

      # All transaction aggregates
      transactions_aggregate {
        ...TransactionAggregateInfo
      }

      # XP transactions aggregate
      xpTransactions: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        ...TransactionAggregateInfo
      }

      # Up transactions aggregate
      upTransactions: transactions_aggregate(
        where: { type: { _eq: "up" } }
      ) {
        ...TransactionAggregateInfo
      }

      # Down transactions aggregate
      downTransactions: transactions_aggregate(
        where: { type: { _eq: "down" } }
      ) {
        ...TransactionAggregateInfo
      }

      # All progress aggregate
      progresses_aggregate {
        ...ProgressAggregateInfo
      }

      # Completed progress aggregate
      completedProgress: progresses_aggregate(
        where: { isDone: { _eq: true } }
      ) {
        ...ProgressAggregateInfo
      }

      # All results aggregate
      results_aggregate {
        ...ResultAggregateInfo
      }

      # Passed results aggregate
      passedResults: results_aggregate(
        where: { grade: { _gte: 1 } }
      ) {
        ...ResultAggregateInfo
      }

      # Project results aggregate
      projectResults: results_aggregate(
        where: {
          object: { type: { _eq: "project" } }
          isLast: { _eq: true }
        }
      ) {
        ...ResultAggregateInfo
      }

      # Audits given aggregate
      audits_aggregate {
        ...AuditAggregateInfo
      }

      # Events aggregate
      events_aggregate {
        ...EventUserAggregateInfo
      }

      # Groups aggregate
      groups_aggregate {
        ...GroupUserAggregateInfo
      }

      # Groups as captain aggregate
      groupsByCaptainid_aggregate {
        ...GroupAggregateInfo
      }

      # Labels aggregate
      labels_aggregate {
        ...LabelUserAggregateInfo
      }

      # Matches aggregate
      matches_aggregate {
        ...MatchAggregateInfo
      }

      # Object availabilities aggregate
      objectAvailabilities_aggregate {
        ...ObjectAvailabilityAggregateInfo
      }

      # Created objects aggregate
      objects_aggregate {
        ...ObjectAggregateInfo
      }

      # Progress by path aggregate
      progressesByPath_aggregate {
        ...ProgressByPathViewAggregateInfo
      }

      # Registrations aggregate
      registrations_aggregate {
        ...RegistrationUserAggregateInfo
      }

      # User roles aggregate
      user_roles_aggregate {
        ...UserRoleAggregateInfo
      }

      # Roles view aggregate
      roles_aggregate {
        ...UserRolesViewAggregateInfo
      }

      # Sessions aggregate
      sessions_aggregate {
        ...ToadSessionsAggregateInfo
      }
    }
  }
  ${ce}
  ${Ys}
  ${cg}
  ${mi}
  ${gi}
  ${Cu}
  ${Z0}
  ${Q0}
  ${pg}
  ${yg}
  ${vg}
  ${og}
  ${jg}
  ${Sg}
  ${V0}
  ${K0}
  ${Ng}
`;z`
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
  ${ce}
  ${Ys}
  ${mi}
  ${gi}
  ${cg}
`;z`
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
  ${ce}
  ${Ys}
  ${mi}
`;z`
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
  ${ce}
  ${aa}
  ${gg}
  ${dg}
  ${mi}
  ${gi}
  ${Ls}
  ${zt}
  ${be}
  ${Xu}
`;z`
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
  ${bg}
  ${jg}
`;z`
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
  ${_g}
  ${Ng}
`;z`
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
  ${Tg}
`;z`
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
  ${be}
  ${og}
  ${aa}
`;z`
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
`;z`
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
`;z`
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
`;z`
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
`;z`
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
`;const P0=z`
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
  ${ce}
  ${aa}
  ${zt}
  ${Ys}
  ${be}
  ${hi}
  ${Lu}
`,W0=z`
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
`,F0=z`
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
  ${ce}
  ${aa}
  ${Ys}
  ${gi}
  ${Qu}
  ${Yu}
  ${Hu}
`;z`
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
  ${zt}
  ${be}
  ${ce}
`;z`
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
  ${di}
  ${be}
  ${ce}
`;z`
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
  ${Ka}
  ${be}
  ${ce}
  ${Ls}
`;z`
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
  ${Ls}
  ${ce}
  ${be}
  ${Ka}
`;z`
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
  ${be}
  ${ce}
`;z`
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
  ${be}
  ${ce}
`;const ep=z`
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
  ${zt}
  ${be}
  ${ce}
`,tp=z`
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
  ${ce}
`;z`
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
  ${be}
  ${ce}
`;z`
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
  ${ce}
  ${be}
`;z`
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
  ${be}
  ${ce}
  ${di}
  ${Ka}
  ${zt}
`;z`
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
  ${ce}
  ${be}
  ${di}
`;z`
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
  ${zt}
  ${be}
  ${ce}
  ${Ka}
  ${Ls}
`;z`
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
  ${ce}
`;z`
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
  ${ce}
  ${zt}
  ${be}
`;const ap=z`
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
  ${zt}
  ${be}
  ${ce}
`,lp=z`
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
  ${zt}
  ${be}
  ${ce}
`,sp=z`
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
  ${Ka}
  ${di}
  ${be}
  ${ce}
`,np=z`
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
  ${ce}
`;z`
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
  ${Ka}
  ${zt}
  ${be}
  ${ce}
`;z`
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
  ${Ls}
  ${be}
  ${ce}
  ${Ka}
`;const ip=z`
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
`,rp=z`
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
`;z`
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
`;z`
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
`;z`
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
`;z`
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
`;z`
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
`;const up=z`
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
`;z`
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
`;z`
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
`;const cp=()=>new l0({typePolicies:{Query:{fields:{user:{keyArgs:["where"],merge(u,c){return c}},transaction:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},progress:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},event:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},group:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},audit:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},result:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},object:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},eventUser:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},groupUser:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},labelUser:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},match:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},objectAvailability:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},progressByPathView:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},record:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},registration:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},registrationUser:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},userRole:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},toadSessions:{keyArgs:["where","order_by"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}}}},user:{keyFields:["id"],fields:{profile:{merge:!0},attrs:{merge:!0},events:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},groups:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},groupsByCaptainid:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},labels:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},matches:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},objectAvailabilities:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},objects:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},progressesByPath:{keyArgs:["where","limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},records:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},recordsByAuthorid:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},registrations:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},user_roles:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},roles:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},sessions:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},xps:{keyArgs:["limit","offset"],merge(u=[],c,{args:f}){return f?.offset&&f.offset>0?[...u,...c]:c}},transactions:{merge:!1},results:{merge:!1},progresses:{merge:!1},transactions_aggregate:{merge:!1},progresses_aggregate:{merge:!1},results_aggregate:{merge:!1},audits_aggregate:{merge:!1},events_aggregate:{merge:!1},groups_aggregate:{merge:!1},groupsByCaptainid_aggregate:{merge:!1},labels_aggregate:{merge:!1},matches_aggregate:{merge:!1},objectAvailabilities_aggregate:{merge:!1},objects_aggregate:{merge:!1},progressesByPath_aggregate:{merge:!1},registrations_aggregate:{merge:!1},user_roles_aggregate:{merge:!1},roles_aggregate:{merge:!1},sessions_aggregate:{merge:!1}}},transaction_aggregate:{merge:!0},result_aggregate:{merge:!0},progress_aggregate:{merge:!0},audit_aggregate:{merge:!0}},possibleTypes:{},dataIdFromObject:u=>{switch(u.__typename){case"User":return`User:${u.id}`;case"Transaction":return`Transaction:${u.id}`;case"Result":return`Result:${u.id}`;case"Progress":return`Progress:${u.id}`;case"Audit":return`Audit:${u.id}`;case"Event":return`Event:${u.id}`;case"Group":return`Group:${u.id}`;case"Object":return`Object:${u.id}`;default:return null}}});class op{constructor(){this.metrics=new Map,this.slowQueryThreshold=1e3}startQuery(c,f){const d=`${c}_${Date.now()}_${Math.random()}`;return this.metrics.set(d,{queryName:c,variables:f,startTime:performance.now(),endTime:null,duration:null,error:null}),d}endQuery(c,f=null){const d=this.metrics.get(c);if(d&&(d.endTime=performance.now(),d.duration=d.endTime-d.startTime,d.error=f,d.duration>this.slowQueryThreshold&&console.warn("Slow GraphQL query detected:",{queryName:d.queryName,duration:`${d.duration.toFixed(2)}ms`,variables:d.variables}),this.metrics.size>100)){const m=this.metrics.keys().next().value;this.metrics.delete(m)}}getStats(){const c=Array.from(this.metrics.values()).filter(m=>m.duration!==null);if(c.length===0)return{totalQueries:0,averageDuration:0,slowQueries:0};const f=c.reduce((m,A)=>m+A.duration,0),d=c.filter(m=>m.duration>this.slowQueryThreshold).length;return{totalQueries:c.length,averageDuration:f/c.length,slowQueries:d,slowQueryPercentage:d/c.length*100}}}const Du=new op,fp=s0({uri:q0}),dp=rg((u,{headers:c})=>{const f=B0();return{headers:{...c,...f,"Content-Type":"application/json"}}}),gp=rg((u,{headers:c})=>{const f=Du.startQuery("GraphQL Query",{});return{headers:c,queryId:f}}),mp=ug(({graphQLErrors:u,networkError:c,operation:f})=>{const d=f.getContext().queryId;if(u&&u.forEach(({message:m,locations:A,path:x,extensions:j})=>{if(console.error(`[GraphQL error]: Message: ${m}, Location: ${A}, Path: ${x}`),d&&Du.endQuery(d,m),m.includes("JWT")||m.includes("JWS")||m.includes("verify")){console.warn("JWT verification error detected, clearing auth data"),ka();return}if(j?.code==="UNAUTHENTICATED"||j?.code==="FORBIDDEN"){console.warn("Authentication error detected, clearing auth data"),ka();return}}),c&&(console.error(`[Network error]: ${c}`),d&&Du.endQuery(d,c.message),c.statusCode===401||c.statusCode===403)){console.warn("Network authentication error, clearing auth data"),ka();return}}),wg=new n0({link:i0([mp,gp,dp,fp]),cache:cp(),defaultOptions:{watchQuery:{errorPolicy:"all",fetchPolicy:"cache-first",notifyOnNetworkStatusChange:!0},query:{errorPolicy:"all",fetchPolicy:"cache-first"},mutate:{errorPolicy:"all"}}});wg.clearStore().catch(console.warn);const hp=()=>{const[u,c]=W.useState({identifier:"",password:""}),[f,d]=W.useState(!1),[m,A]=W.useState("username"),{login:x,isLoading:j,error:U,clearError:E}=at();W.useEffect(()=>{u.identifier&&A(X0(u.identifier))},[u.identifier]),W.useEffect(()=>{U&&E()},[u.identifier,u.password,U,E]);const I=p=>{const{name:w,value:R}=p.target;c($=>({...$,[w]:R}))},T=async p=>{p.preventDefault(),!(!u.identifier.trim()||!u.password.trim())&&await x(u.identifier.trim(),u.password)},v=()=>{d(!f)};return i.jsxs("div",{className:"min-h-screen flex items-center justify-center p-4",children:[i.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900"}),i.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[i.jsx(K.div,{className:"absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl",animate:{scale:[1,1.2,1],opacity:[.3,.5,.3]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),i.jsx(K.div,{className:"absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl",animate:{scale:[1.2,1,1.2],opacity:[.5,.3,.5]},transition:{duration:10,repeat:1/0,ease:"easeInOut"}})]}),i.jsx(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"relative z-10 w-full max-w-md",children:i.jsxs("div",{className:"glass-card p-8",children:[i.jsxs("div",{className:"text-center mb-8",children:[i.jsx(K.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mx-auto mb-4",children:i.jsx(Ld,{className:"w-8 h-8 text-white"})}),i.jsx("h1",{className:"text-3xl font-bold gradient-text mb-2",children:"Welcome Back"}),i.jsx("p",{className:"text-surface-300",children:"Sign in to access your profile dashboard"})]}),U&&i.jsx(K.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg",children:i.jsx("p",{className:"text-red-300 text-sm",children:U})}),i.jsxs("form",{onSubmit:T,className:"space-y-6",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Username or Email"}),i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:m==="email"?i.jsx(Pd,{className:"h-5 w-5 text-surface-400"}):i.jsx(ri,{className:"h-5 w-5 text-surface-400"})}),i.jsx("input",{type:"text",name:"identifier",value:u.identifier,onChange:I,className:"material-input pl-10 w-full",placeholder:"Enter your username or email",autoComplete:"username",required:!0,disabled:j})]})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Password"}),i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:i.jsx(u0,{className:"h-5 w-5 text-surface-400"})}),i.jsx("input",{type:f?"text":"password",name:"password",value:u.password,onChange:I,className:"material-input pl-10 pr-10 w-full",placeholder:"Enter your password",autoComplete:"current-password",required:!0,disabled:j}),i.jsx("button",{type:"button",onClick:v,className:"absolute inset-y-0 right-0 pr-3 flex items-center",disabled:j,children:f?i.jsx(c0,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"}):i.jsx(o0,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"})})]})]}),i.jsx(K.button,{type:"submit",disabled:j||!u.identifier.trim()||!u.password.trim(),className:"w-full glass-button py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed",whileHover:{scale:1.02},whileTap:{scale:.98},children:j?i.jsxs("div",{className:"flex items-center justify-center",children:[i.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"}),"Signing in..."]}):i.jsxs("div",{className:"flex items-center justify-center",children:[i.jsx(Ld,{className:"w-5 h-5 mr-2"}),"Sign In"]})})]}),i.jsx("div",{className:"mt-8 text-center",children:i.jsx("p",{className:"text-surface-400 text-sm",children:"Use your reboot01 platform credentials"})})]})})]})},Rg=()=>{const{user:u,isAuthenticated:c}=at(),{data:f,loading:d,error:m,refetch:A}=ta(J0,{variables:{userId:u?.id},skip:!c||!u?.id,errorPolicy:"all",notifyOnNetworkStatusChange:!0,fetchPolicy:"network-only"}),x=f?.user?.[0]||null;return{profile:x?{...x,registrationDate:x.events?.[0]?.createdAt,startCampus:x.events?.[0]?.campus,totalXP:x.totalXP?.aggregate?.sum?.amount||0,totalProjects:x.projectResults?.aggregate?.count||0,passedProjects:x.passedProjects?.aggregate?.count||0,passRate:x.projectResults?.aggregate?.count>0?x.passedProjects?.aggregate?.count/x.projectResults?.aggregate?.count*100:0}:null,userRoles:[],records:x?.records||[],loading:d,error:m,refetch:A}},Zu=(u={})=>{const{user:c,isAuthenticated:f}=at(),{skip:d=!1}=u,{data:m,loading:A,error:x,refetch:j}=ta(P0,{variables:{userId:c?.id},skip:!f||!c?.id||d,errorPolicy:"all",fetchPolicy:"network-only"}),U=m?.xp_total?.aggregate||{},E=m?.xp_transactions||[],I=m?.xp_by_type?.nodes||[],T=m?.audit_rewards||[],v=m?.audit_rewards_stats?.aggregate||{},p=x?0:U.sum?.amount||0,w=U.count||0,R=U.avg?.amount||0,$=U.max?.amount||0,B=U.min?.amount||0,C=x?[]:E.reduce((J,ne)=>{const Te=new Date(ne.createdAt).toISOString().split("T")[0],gt=J.find(Ze=>Ze.date===Te);return gt?(gt.amount+=ne.amount,gt.transactions.push(ne)):J.push({date:Te,amount:ne.amount,cumulative:0,transactions:[ne]}),J},[]);let ae=0;C.sort((J,ne)=>new Date(J.date)-new Date(ne.date)),C.forEach(J=>{ae+=J.amount,J.cumulative=ae});const se=I.reduce((J,ne)=>{const Te=ne.object?.type||"unknown";return J[Te]||(J[Te]={type:Te,totalXP:0,count:0}),J[Te].totalXP+=ne.amount,J[Te].count+=1,J},{}),Se=E.reduce((J,ne)=>{const Te=ne.object?.name||ne.path.split("/").pop()||"unknown";return J[Te]||(J[Te]={name:Te,path:ne.path,totalXP:0,type:ne.object?.type||"unknown",transactions:[]}),J[Te].totalXP+=ne.amount,J[Te].transactions.push(ne),J},{}),Ee={totalRewards:v.sum?.amount||0,rewardCount:v.count||0,upRewards:T.filter(J=>J.type==="up"),downRewards:T.filter(J=>J.type==="down")},Qe={xpPerDay:C.length>0?p/C.length:0,mostProductiveDay:C.reduce((J,ne)=>ne.amount>(J?.amount||0)?ne:J,null),consistencyScore:pp(C),growthRate:yp(C)};return{totalXP:p,transactionCount:w,averageXP:R,maxXP:$,minXP:B,xpProgression:C,xpTransactions:E,xpByObjectType:Object.values(se).sort((J,ne)=>ne.totalXP-J.totalXP),xpByProject:Object.values(Se).sort((J,ne)=>ne.totalXP-J.totalXP),auditRewards:T,auditRewardsAnalysis:Ee,performanceMetrics:Qe,loading:A,error:x,refetch:j}},pp=u=>{if(u.length<2)return 0;const c=u.map(x=>x.amount),f=c.reduce((x,j)=>x+j,0)/c.length,d=c.reduce((x,j)=>x+Math.pow(j-f,2),0)/c.length,m=Math.sqrt(d),A=f>0?m/f:1;return Math.max(0,Math.min(100,(1-A)*100))},yp=u=>{if(u.length<2)return 0;const c=u.slice(0,7),f=u.slice(-7),d=c.reduce((A,x)=>A+x.amount,0)/c.length,m=f.reduce((A,x)=>A+x.amount,0)/f.length;return d>0?(m-d)/d*100:0},Vu=()=>{const{user:u,isAuthenticated:c}=at(),{data:f,loading:d,error:m,refetch:A}=ta(W0,{variables:{userId:u?.id},skip:!c||!u?.id,errorPolicy:"all",fetchPolicy:"network-only"}),x=m?0:f?.total_projects?.aggregate?.count||0,j=m?0:f?.passed_projects?.aggregate?.count||0,U=m?[]:f?.result||[],E=x>0?j/x*100:0;return{totalProjects:x,passedProjects:j,failedProjects:x-j,passRate:E,projects:U,loading:d,error:m,refetch:A}},ku=()=>{const{user:u,isAuthenticated:c}=at(),{data:f,loading:d,error:m,refetch:A}=ta(F0,{variables:{userId:u?.id},skip:!c||!u?.id,errorPolicy:"all",fetchPolicy:"network-only"}),x=m?0:f?.audits_given?.aggregate?.count||0,j=m?0:f?.audits_received?.aggregate?.count||0,U=j>0?x/j:0;return{auditsGiven:x,auditsReceived:j,auditRatio:U,loading:d,error:m,refetch:A}},xp=()=>{const{user:u,isAuthenticated:c}=at(),{data:f,loading:d,error:m,refetch:A}=ta(ep,{variables:{userId:u?.id},skip:!c||!u?.id,errorPolicy:"all",fetchPolicy:"network-only"});return{skills:(f?.transaction||[]).map(U=>{const E=U.path.split("/");return{name:E[E.length-1]||"unknown",xp:U.amount,type:U.object?.type||"unknown",path:U.path}}).reduce((U,E)=>{const I=U.find(T=>T.name===E.name);return I?(I.totalXP+=E.xp,I.projects+=1):U.push({name:E.name,totalXP:E.xp,projects:1,type:E.type}),U},[]).sort((U,E)=>E.totalXP-U.totalXP),loading:d,error:m,refetch:A}},vp=()=>{const{profile:u,loading:c,error:f}=Rg(),{totalXP:d,loading:m,error:A}=Zu(),{passedProjects:x,loading:j,error:U}=Vu(),{auditsGiven:E,auditsReceived:I,auditRatio:T,loading:v,error:p}=ku(),w=c||m||j||v;typeof window<"u"&&window.location?.hostname==="localhost"&&(f&&console.log("Profile error:",f.message),A&&console.log("XP error:",A.message),U&&console.log("Projects error:",U.message),p&&console.log("Audit error:",p.message),!w&&!f&&!A&&!U&&!p&&console.log("✅ Dashboard data loaded successfully:",{profile:!!u,totalXP:d,passedProjects:x,auditsGiven:E,auditsReceived:I,auditRatio:T}));const $=f&&(f.message?.includes("JWT")||f.message?.includes("authentication")||f.message?.includes("unauthorized"))?f:null;return{profile:u,totalXP:d,passedProjects:x,auditsGiven:E,auditsReceived:I,auditRatio:T,loading:w,error:$,refetch:()=>{window.location.reload()}}},bp=()=>{const[u,{data:c,loading:f,error:d}]=oi(tp,{errorPolicy:"all"});return{searchUsers:A=>{A.trim()&&u({variables:{searchTerm:`%${A}%`}})},users:c?.user||[],loading:f,error:d}},jp=()=>{const{user:u,isAuthenticated:c}=at(),{data:f,loading:d,error:m,refetch:A}=ta(ap,{variables:{userId:u?.id},skip:!c||!u?.id,errorPolicy:"all"});return{xpByProject:(U=>{if(!U)return[];const E={};return U.forEach(I=>{const T=I.object?.name||I.path?.split("/").pop()||"Unknown",v=I.path;E[v]||(E[v]={name:T,path:v,totalXP:0,type:I.object?.type||"unknown",transactions:[]}),E[v].totalXP+=I.amount,E[v].transactions.push(I)}),Object.values(E).sort((I,T)=>T.totalXP-I.totalXP).slice(0,20)})(f?.transaction),loading:d,error:m,refetch:A}},Ap=()=>{const{user:u,isAuthenticated:c}=at(),{data:f,loading:d,error:m,refetch:A}=ta(lp,{variables:{userId:u?.id},skip:!c||!u?.id,errorPolicy:"all"});return{xpTimeline:(U=>{if(!U)return[];let E=0;return U.map(I=>(E+=I.amount,{date:new Date(I.createdAt),xp:I.amount,cumulativeXP:E,project:I.object?.name||I.path?.split("/").pop(),path:I.path}))})(f?.transaction),loading:d,error:m,refetch:A}},Sp=()=>{const{user:u,isAuthenticated:c}=at(),{data:f,loading:d,error:m,refetch:A}=ta(sp,{variables:{userId:u?.id},skip:!c||!u?.id,errorPolicy:"all"});return{piscineStats:((U,E)=>{if(!U&&!E)return{jsStats:{},goStats:{},overall:{}};const I=[...U||[],...E||[]],T=I.filter(w=>w.path?.includes("piscine-js")||w.path?.includes("javascript")),v=I.filter(w=>w.path?.includes("piscine-go")||w.path?.includes("golang")),p=w=>{const R=w.filter(C=>C.grade>=1).length,$=w.filter(C=>C.grade<1).length,B=w.length;return{passed:R,failed:$,total:B,passRate:B>0?R/B*100:0}};return{jsStats:p(T),goStats:p(v),overall:p(I)}})(f?.result,f?.progress),loading:d,error:m,refetch:A}},_p=()=>{const{user:u,isAuthenticated:c}=at(),{data:f,loading:d,error:m,refetch:A}=ta(np,{variables:{userId:u?.id},skip:!c||!u?.id,errorPolicy:"all"}),x=f?.user?.[0],j=x?.events?.[0],U=x?.results_aggregate?.aggregate?.count||0,E=x?.passed_projects?.aggregate?.count||0;return{profile:x?{...x,registrationDate:j?.createdAt,startCampus:j?.campus,totalProjects:U,passedProjects:E,passRate:U>0?E/U*100:0}:null,loading:d,error:m,refetch:A}},Np=()=>{const{user:u,isAuthenticated:c}=at(),[f,d]=ea.useState([]),[m,A]=ea.useState(!1),[x,j]=ea.useState(null),[U]=oi(ip,{errorPolicy:"all",onCompleted:p=>{const w=E(p);d(w),A(!1)},onError:p=>{j(p),A(!1)}}),E=p=>{if(!p)return[];const w=p.results||[],R=p.progress||[];return[...w,...R].map(B=>{const C=I(B);return{...B,status:C,type:B.isDone!==void 0?"progress":"result"}}).sort((B,C)=>new Date(C.updatedAt)-new Date(B.updatedAt))},I=p=>{const w=new Date,R=new Date(p.updatedAt),$=new Date(p.createdAt),B=(w-R)/(1e3*60*60*24),C=(w-$)/(1e3*60*60*24);return p.grade>=1?"finished":C<=7&&p.grade===0?"setup":p.grade===0&&B<=3?"audit":(p.grade===0&&B<=30,"working")};return{searchResults:f,searchProjects:(p="",w="all",R={})=>{if(!c||!u?.id)return;A(!0),j(null);const{limit:$=20,offset:B=0}=R;U({variables:{userId:u.id,status:w,searchTerm:`%${p}%`,limit:$,offset:B}})},filterByStatus:p=>p==="all"?f:f.filter(w=>w.status===p),loading:m,error:x,statusCounts:{all:f.length,working:f.filter(p=>p.status==="working").length,audit:f.filter(p=>p.status==="audit").length,setup:f.filter(p=>p.status==="setup").length,finished:f.filter(p=>p.status==="finished").length}}},Tp=()=>{const{user:u,isAuthenticated:c}=at(),[f,d]=ea.useState([]),[m,A]=ea.useState(!1),[x,j]=ea.useState(null),[U]=oi(rp,{errorPolicy:"all",onCompleted:w=>{const R=E(w);d(R),A(!1)},onError:w=>{j(w),A(!1)}}),E=w=>{if(!w)return[];const R=(w.audits_given||[]).map(B=>({...B,type:"given",status:I(B)})),$=(w.audits_received||[]).map(B=>({...B,type:"received",status:I(B)}));return[...R,...$].sort((B,C)=>new Date(C.createdAt)-new Date(B.createdAt))},I=w=>{const R=new Date,$=new Date(w.createdAt),B=w.endAt?new Date(w.endAt):null,C=(R-$)/(1e3*60*60*24);return B?"finished":C<=1?"setup":!B&&C<=7?"working":"audit"};return{searchResults:f,searchAudits:(w="",R="all",$={})=>{if(!c||!u?.id)return;A(!0),j(null);const{limit:B=20,offset:C=0}=$;U({variables:{userId:u.id,status:R,searchTerm:`%${w}%`,limit:B,offset:C}})},filterByStatus:w=>w==="all"?f:f.filter(R=>R.status===w),filterByType:w=>w==="all"?f:f.filter(R=>R.type===w),loading:m,error:x,statusCounts:{all:f.length,working:f.filter(w=>w.status==="working").length,audit:f.filter(w=>w.status==="audit").length,setup:f.filter(w=>w.status==="setup").length,finished:f.filter(w=>w.status==="finished").length},typeCounts:{all:f.length,given:f.filter(w=>w.type==="given").length,received:f.filter(w=>w.type==="received").length}}},wp=()=>{const[u,c]=ea.useState([]),[f,d]=ea.useState(!1),[m,A]=ea.useState(null),[x]=oi(up,{errorPolicy:"all",onCompleted:v=>{const p=j(v);c(p),d(!1)},onError:v=>{A(v),d(!1)}}),j=v=>v?.users?v.users.map(p=>{const w=U(p),R=p.recent_transactions?.reduce((B,C)=>B+C.amount,0)||0,$=p.recent_results?.length>0;return{...p,status:w,totalXP:R,recentActivity:$,lastActive:p.recent_results?.[0]?.updatedAt||p.updatedAt}}):[],U=v=>{const p=new Date,w=new Date(v.updatedAt),R=(p-w)/(1e3*60*60*24),$=v.recent_results||[];if($.some(Se=>{const Ee=new Date(Se.updatedAt);return(p-Ee)/(1e3*60*60*24)<=7}))return"working";const C=new Date(v.createdAt);return(p-C)/(1e3*60*60*24)<=30&&$.length<=2?"setup":$.length>0&&R<=30?"audit":$.filter(Se=>Se.grade>=1).length>=3?"finished":"working"};return{searchResults:u,searchUsers:(v="",p="all",w="",R={})=>{d(!0),A(null);const{limit:$=20,offset:B=0}=R;x({variables:{searchTerm:`%${v}%`,status:p,campus:w?`%${w}%`:"%",limit:$,offset:B}})},filterByStatus:v=>v==="all"?u:u.filter(p=>p.status===v),filterByCampus:v=>!v||v==="all"?u:u.filter(p=>p.campus&&p.campus.toLowerCase().includes(v.toLowerCase())),loading:f,error:m,statusCounts:{all:u.length,working:u.filter(v=>v.status==="working").length,audit:u.filter(v=>v.status==="audit").length,setup:u.filter(v=>v.status==="setup").length,finished:u.filter(v=>v.status==="finished").length},campuses:[...new Set(u.map(v=>v.campus).filter(Boolean))]}},Ie=(...u)=>u.filter(Boolean).join(" "),G=({children:u,className:c="",hover:f=!1,animate:d=!0,onClick:m,...A})=>{const x="glass-card p-6",j=f?"card-hover cursor-pointer":"",U=d?K.div:"div",E=d?{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3}}:{};return i.jsx(U,{className:Ie(x,j,c),onClick:m,...E,...A,children:u})},Rp=({children:u,className:c=""})=>i.jsx("div",{className:Ie("mb-4",c),children:u}),Up=({children:u,className:c=""})=>i.jsx("h3",{className:Ie("text-xl font-semibold text-white mb-2",c),children:u}),Ep=({children:u,className:c=""})=>i.jsx("p",{className:Ie("text-surface-300 text-sm",c),children:u}),Op=({children:u,className:c=""})=>i.jsx("div",{className:Ie("",c),children:u}),Dp=({children:u,className:c=""})=>i.jsx("div",{className:Ie("mt-4 pt-4 border-t border-white/10",c),children:u});G.Header=Rp;G.Title=Up;G.Description=Ep;G.Content=Op;G.Footer=Dp;const Gt=({children:u,variant:c="primary",size:f="md",disabled:d=!1,loading:m=!1,className:A="",onClick:x,type:j="button",...U})=>{const E="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",I={primary:"glass-button",secondary:"bg-surface-700 hover:bg-surface-600 text-white border border-surface-600",outline:"border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white",ghost:"text-surface-300 hover:text-white hover:bg-white/10",danger:"bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"},T={sm:"px-3 py-1.5 text-sm rounded-md",md:"px-4 py-2 text-sm rounded-lg",lg:"px-6 py-3 text-base rounded-lg",xl:"px-8 py-4 text-lg rounded-xl"},v=Ie(E,I[c],T[f],A);return i.jsxs(K.button,{type:j,className:v,disabled:d||m,onClick:x,whileHover:{scale:d||m?1:1.02,transition:{type:"spring",stiffness:400,damping:10}},whileTap:{scale:d||m?1:.98,transition:{type:"spring",stiffness:400,damping:10}},initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},...U,children:[m&&i.jsx(K.div,{className:"rounded-full h-4 w-4 border-b-2 border-current mr-2",animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),u]})},ui=({size:u="md",text:c="",className:f="",fullScreen:d=!1})=>{const m={sm:"h-4 w-4",md:"h-8 w-8",lg:"h-12 w-12",xl:"h-16 w-16"},A={sm:"text-sm",md:"text-base",lg:"text-lg",xl:"text-xl"},x=i.jsx("div",{className:Ie("animate-spin rounded-full border-b-2 border-primary-400",m[u])}),j=i.jsxs("div",{className:Ie("flex flex-col items-center justify-center space-y-4",f),children:[x,c&&i.jsx("p",{className:Ie("text-surface-300",A[u]),children:c})]});return d?i.jsx(K.div,{initial:{opacity:0},animate:{opacity:1},className:"fixed inset-0 bg-surface-900/50 backdrop-blur-sm flex items-center justify-center z-50",children:j}):j},Bs=({className:u="",...c})=>i.jsx("div",{className:Ie("animate-pulse rounded-md bg-surface-700/50",u),...c}),dt=()=>i.jsxs("div",{className:"glass-card p-6 space-y-4",children:[i.jsx(Bs,{className:"h-4 w-3/4"}),i.jsx(Bs,{className:"h-4 w-1/2"}),i.jsxs("div",{className:"space-y-2",children:[i.jsx(Bs,{className:"h-3 w-full"}),i.jsx(Bs,{className:"h-3 w-5/6"}),i.jsx(Bs,{className:"h-3 w-4/6"})]})]}),qp=({tabs:u=[],activeTab:c,onTabChange:f,className:d=""})=>i.jsx("div",{className:Ie("fixed bottom-0 left-0 right-0 z-40 bg-surface-900/95 backdrop-blur-md border-t border-white/10 md:hidden",d),children:i.jsx("div",{className:"flex justify-around items-center py-2",children:u.map(m=>{const A=m.icon,x=c===m.id;return i.jsxs(K.button,{onClick:()=>f(m.id),className:Ie("flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative",x?"text-primary-300":"text-surface-400 hover:text-surface-200"),whileTap:{scale:.95},children:[x&&i.jsx(K.div,{className:"absolute -top-1 w-8 h-1 bg-primary-400 rounded-full",layoutId:"activeTab",transition:{type:"spring",stiffness:500,damping:30}}),i.jsx(A,{className:"w-5 h-5 mb-1"}),i.jsx("span",{className:"text-xs font-medium truncate max-w-16",children:m.label.split(" ")[0]})]},m.id)})})}),Ip=({value:u=0,max:c=100,className:f="",showValue:d=!0,size:m="md",color:A="primary",animated:x=!0,label:j=""})=>{const U=Math.min(Math.max(u/c*100,0),100),E={sm:"h-2",md:"h-3",lg:"h-4",xl:"h-6"},I={primary:"bg-primary-500",secondary:"bg-surface-500",success:"bg-green-500",warning:"bg-yellow-500",danger:"bg-red-500",accent:"bg-accent-500"};return i.jsxs("div",{className:Ie("w-full",f),children:[(j||d)&&i.jsxs("div",{className:"flex justify-between items-center mb-2",children:[j&&i.jsx("span",{className:"text-sm font-medium text-surface-200",children:j}),d&&i.jsxs("span",{className:"text-sm text-surface-300",children:[Math.round(U),"%"]})]}),i.jsx("div",{className:Ie("w-full bg-surface-700/50 rounded-full overflow-hidden",E[m]),children:i.jsx(K.div,{className:Ie("h-full rounded-full",I[A]),initial:x?{width:0}:{width:`${U}%`},animate:{width:`${U}%`},transition:{duration:x?1:0,ease:"easeOut"}})})]})},Mp=({value:u=0,max:c=100,size:f=120,strokeWidth:d=8,className:m="",color:A="primary",showValue:x=!0,label:j=""})=>{const U=Math.min(Math.max(u/c*100,0),100),E=(f-d)/2,I=E*2*Math.PI,T=I,v=I-U/100*I,p={primary:"#14b8a6",secondary:"#64748b",success:"#10b981",warning:"#f59e0b",danger:"#ef4444",accent:"#d946ef"};return i.jsxs("div",{className:Ie("relative inline-flex items-center justify-center",m),children:[i.jsxs("svg",{width:f,height:f,className:"transform -rotate-90",children:[i.jsx("circle",{cx:f/2,cy:f/2,r:E,stroke:"rgba(100, 116, 139, 0.2)",strokeWidth:d,fill:"transparent"}),i.jsx(K.circle,{cx:f/2,cy:f/2,r:E,stroke:p[A],strokeWidth:d,fill:"transparent",strokeLinecap:"round",strokeDasharray:T,initial:{strokeDashoffset:I},animate:{strokeDashoffset:v},transition:{duration:1,ease:"easeOut"}})]}),i.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:[x&&i.jsx("span",{className:"text-2xl font-bold text-white",children:Math.round(U)}),j&&i.jsx("span",{className:"text-xs text-surface-300 mt-1",children:j})]})]})},Ra=({children:u,variant:c="default",size:f="md",className:d="",animate:m=!1,...A})=>{const x="inline-flex items-center font-medium rounded-full",j={default:"bg-surface-700 text-surface-200",primary:"bg-primary-500/20 text-primary-300 border border-primary-500/30",secondary:"bg-surface-600 text-surface-200",success:"bg-green-500/20 text-green-300 border border-green-500/30",warning:"bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",danger:"bg-red-500/20 text-red-300 border border-red-500/30",accent:"bg-accent-500/20 text-accent-300 border border-accent-500/30",outline:"border border-surface-500 text-surface-300"},U={sm:"px-2 py-0.5 text-xs",md:"px-2.5 py-1 text-sm",lg:"px-3 py-1.5 text-base"},E=Ie(x,j[c],U[f],d),I=m?K.span:"span",T=m?{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{type:"spring",stiffness:500,damping:30}}:{};return i.jsx(I,{className:E,...T,...A,children:u})},$p=({status:u,className:c=""})=>{const f=u==="pass"||u==="PASS"||u===!0||u>=1;return i.jsx(Ra,{variant:f?"success":"danger",className:c,animate:!0,children:f?"Pass":"Fail"})},Gp=({level:u,className:c=""})=>i.jsxs(Ra,{variant:"primary",className:c,animate:!0,children:["Level ",u]}),zp=({xp:u,className:c=""})=>i.jsxs(Ra,{variant:"accent",className:c,animate:!0,children:[u.toLocaleString()," XP"]}),ii=u=>{if(!u||u===0)return"0";const c=Number(u);return isNaN(c)?"0":c>=1e6?`${(c/1e6).toFixed(1)}M`:c>=1e3?`${(c/1e3).toFixed(1)}K`:c.toString()},Bp=u=>{if(!u)return null;if(u.profile)try{const c=typeof u.profile=="string"?JSON.parse(u.profile):u.profile;if(c.avatar)return c.avatar;if(c.avatarUrl)return c.avatarUrl;if(c.picture)return c.picture}catch(c){console.warn("Error parsing user profile for avatar:",c)}if(u.attrs)try{const c=typeof u.attrs=="string"?JSON.parse(u.attrs):u.attrs;if(c.avatar)return c.avatar;if(c.avatarUrl)return c.avatarUrl;if(c.picture)return c.picture;if(c.image)return c.image}catch(c){console.warn("Error parsing user attrs for avatar:",c)}return null},ci=u=>{if(!u)return"Unknown User";if(u.profile)try{const c=typeof u.profile=="string"?JSON.parse(u.profile):u.profile;if(c.firstName&&c.lastName)return`${c.firstName} ${c.lastName}`;if(c.name)return c.name;if(c.displayName)return c.displayName}catch(c){console.warn("Error parsing user profile for display name:",c)}return u.login||u.username||"Unknown User"},Cp=u=>{if(!u)return null;if(u.profile)try{const c=typeof u.profile=="string"?JSON.parse(u.profile):u.profile;if(c.email)return c.email}catch(c){console.warn("Error parsing user profile for email:",c)}if(u.attrs)try{const c=typeof u.attrs=="string"?JSON.parse(u.attrs):u.attrs;if(c.email)return c.email}catch(c){console.warn("Error parsing user attrs for email:",c)}return null},Ug=u=>!u||u<=0?1:Math.floor(u/1e3)+1,Xp=u=>{const c=Ug(u),f=(c-1)*1e3,d=c*1e3,A=(u-f)/1e3*100,x=d-u;return{currentLevel:c,progressPercentage:Math.max(0,Math.min(100,A)),xpNeeded:Math.max(0,x),currentLevelXP:f,nextLevelXP:d}},qu=(u,c={})=>{if(!u)return"Unknown";const f={year:"numeric",month:"short",day:"numeric"};try{return new Date(u).toLocaleDateString("en-US",{...f,...c})}catch(d){return console.warn("Error formatting date:",d),"Invalid Date"}},Kd=(u,c="en-US")=>u==null||isNaN(u)?"0":Number(u).toLocaleString(c),Hp=({user:u,size:c="md",className:f="",showBorder:d=!1,animate:m=!0,onClick:A,...x})=>{const[j,U]=W.useState(!1),E=Bp(u),I=ci(u),T={xs:"w-6 h-6",sm:"w-8 h-8",md:"w-12 h-12",lg:"w-16 h-16",xl:"w-24 h-24","2xl":"w-32 h-32"},v={xs:"w-3 h-3",sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8",xl:"w-12 h-12","2xl":"w-16 h-16"},p=Ie("rounded-full flex items-center justify-center overflow-hidden",T[c],d&&"border-2 border-primary-400",A&&"cursor-pointer hover:opacity-80 transition-opacity",f),w=m?K.div:"div",R=m?{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.2},whileHover:A?{scale:1.05}:void 0,whileTap:A?{scale:.95}:void 0}:{},$=()=>{U(!0)};return i.jsx(w,{className:p,onClick:A,title:I,...R,...x,children:E&&!j?i.jsx("img",{src:E,alt:`${I}'s avatar`,className:"w-full h-full object-cover",onError:$,loading:"lazy"}):i.jsx("div",{className:"w-full h-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center",children:i.jsx(ri,{className:Ie("text-white",v[c])})})})},Lp=()=>{const{profile:u,loading:c}=Rg(),{profile:f,loading:d}=_p(),{totalXP:m,loading:A}=Zu(),{passedProjects:x,passRate:j,loading:U}=Vu(),{auditRatio:E,auditsGiven:I,auditsReceived:T,loading:v}=ku(),p=f||u,w=Ug(m),R=Xp(m),$=ci(p),B=Cp(p);return c||d||A||U||v?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[i.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[i.jsx(dt,{}),i.jsx(dt,{})]}),i.jsxs("div",{className:"space-y-6",children:[i.jsx(dt,{}),i.jsx(dt,{}),i.jsx(dt,{})]})]}):i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[i.jsx("div",{className:"lg:col-span-2",children:i.jsxs(G,{className:"h-full",children:[i.jsx(G.Header,{children:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsx(G.Title,{children:"User Profile"}),i.jsx(Gp,{level:w})]})}),i.jsx(G.Content,{children:i.jsxs("div",{className:"flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8",children:[i.jsx("div",{className:"flex-shrink-0",children:i.jsx(Hp,{user:p,size:"xl",showBorder:!0,animate:!0})}),i.jsxs("div",{className:"flex-1 space-y-4",children:[i.jsxs("div",{children:[i.jsx("h2",{className:"text-2xl font-bold text-white mb-1",children:$}),i.jsxs("p",{className:"text-surface-300",children:["@",p?.login||"username"]})]}),i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(Pd,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm",children:B||"No email"})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(f0,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm",children:p?.campus||p?.startCampus||"Campus not specified"})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(Wd,{className:"w-4 h-4"}),i.jsxs("span",{className:"text-sm",children:["Joined ",qu(p?.createdAt)]})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(fi,{className:"w-4 h-4"}),i.jsxs("span",{className:"text-sm",children:["Started ",qu(p?.registrationDate)]})]})]}),i.jsxs("div",{className:"flex flex-wrap gap-2",children:[i.jsx(zp,{xp:m}),i.jsxs(Ra,{variant:"primary",children:[p?.passedProjects||x," / ",p?.totalProjects||"N/A"," Projects"]}),i.jsxs(Ra,{variant:"accent",children:["Audit Ratio: ",E.toFixed(2)]}),p?.passRate&&i.jsxs(Ra,{variant:"success",children:[p.passRate.toFixed(1),"% Success Rate"]})]})]})]})})]})}),i.jsxs("div",{className:"space-y-6",children:[i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Xs,{className:"w-5 h-5 mr-2"}),"User Level"]}),i.jsx(G.Description,{children:"Apprentice developer"})]}),i.jsxs(G.Content,{className:"flex flex-col items-center",children:[i.jsx(Mp,{value:R.progressPercentage,max:100,size:120,color:"primary",label:`Level ${w}`}),i.jsxs("p",{className:"text-sm text-surface-300 mt-4 text-center",children:[R.xpNeeded," XP to next level"]})]})]}),i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(d0,{className:"w-5 h-5 mr-2"}),"Audits Ratio"]})}),i.jsx(G.Content,{children:i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Done"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[(I/1024*1e3).toFixed(0)," MB"]})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Received"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[(T/1024*1e3).toFixed(0)," MB"]})]}),i.jsxs("div",{className:"text-center pt-4 border-t border-white/10",children:[i.jsx("div",{className:"text-3xl font-bold text-primary-300",children:E.toFixed(1)}),i.jsx("p",{className:"text-sm text-surface-400",children:"Best ratio ever!"})]})]})})]}),i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Fd,{className:"w-5 h-5 mr-2"}),"Quick Stats"]})}),i.jsx(G.Content,{children:i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Total XP"}),i.jsx("span",{className:"text-white font-semibold",children:m.toLocaleString()})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Projects Passed"}),i.jsx("span",{className:"text-green-400 font-semibold",children:x})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Success Rate"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[j.toFixed(1),"%"]})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Audits Given"}),i.jsx("span",{className:"text-accent-300 font-semibold",children:I})]})]})})]})]})]})},Yp=({result:u,type:c})=>{const f=x=>{switch(x){case"working":return"text-blue-400 bg-blue-400/10";case"audit":return"text-yellow-400 bg-yellow-400/10";case"setup":return"text-purple-400 bg-purple-400/10";case"finished":return"text-green-400 bg-green-400/10";default:return"text-surface-400 bg-surface-400/10"}},d=x=>{switch(x){case"working":return fi;case"audit":return eg;case"setup":return tg;case"finished":return Mu;default:return Hs}},m=x=>new Date(x).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"}),A=d(u.status);return i.jsxs(K.div,{className:"flex items-center justify-between p-4 bg-surface-800 rounded-lg hover:bg-surface-700 transition-colors duration-200",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},children:[i.jsx("div",{className:"flex-1",children:i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx(A,{className:`w-4 h-4 ${f(u.status).split(" ")[0]}`}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white",children:c==="users"?u.login:u.object?.name||u.path?.split("/").pop()||"Unknown"}),i.jsx("p",{className:"text-sm text-surface-400",children:c==="users"?u.campus||"No campus":u.path||"No path"})]})]})}),i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${f(u.status)}`,children:u.status}),c==="projects"&&i.jsxs("span",{className:"text-sm text-surface-300",children:["Grade: ",u.grade||0]}),c==="audits"&&i.jsx("span",{className:"text-sm text-surface-300",children:u.type==="given"?"Given":"Received"}),c==="users"&&u.totalXP&&i.jsxs("span",{className:"text-sm text-surface-300",children:[u.totalXP," XP"]}),i.jsx("span",{className:"text-xs text-surface-500",children:m(u.updatedAt||u.createdAt)})]})]})},Qp=()=>{const[u,c]=W.useState("projects"),[f,d]=W.useState(""),[m,A]=W.useState("all"),[x,j]=W.useState(""),[U,E]=W.useState({cohort:"All Cohorts",status:"Working"}),[I,T]=W.useState({username:"",status:"Working"}),[v,p]=W.useState({cohort:"All Cohorts",limit:"0"}),{searchResults:w,searchProjects:R,filterByStatus:$,statusCounts:B,loading:C}=Np(),{searchResults:ae,searchAudits:se,filterByStatus:Se,statusCounts:Ee,loading:Qe}=Tp(),{searchResults:J,searchUsers:ne,filterByStatus:Te,statusCounts:gt,campuses:Ze,loading:Ja}=wp(),{searchUsers:Ua,users:mt,loading:D}=bp(),X=[{value:"all",label:"All Status",icon:Hs,color:"text-surface-400"},{value:"working",label:"Working",icon:fi,color:"text-blue-400"},{value:"audit",label:"In Audit",icon:eg,color:"text-yellow-400"},{value:"setup",label:"Setup",icon:tg,color:"text-purple-400"},{value:"finished",label:"Finished",icon:Mu,color:"text-green-400"}],V=[{value:"projects",label:"Projects",icon:Xs},{value:"audits",label:"Audits",icon:Eu},{value:"users",label:"Users",icon:Nt}],ge=["All Cohorts","Cohort 1","Cohort 2","Cohort 3","Cohort 4"],oe=()=>{if(!(!f.trim()&&m==="all"))switch(u){case"projects":R(f,m);break;case"audits":se(f,m);break;case"users":ne(f,m,x);break}},Xe=L=>{A(L),setTimeout(()=>{oe()},100)},ve=L=>{c(L),d(""),A("all")},ue=()=>{console.log("Group search - legacy")},Oe=()=>{f.trim()&&Ua(f)},ht=()=>{console.log("Ranking search - legacy")},Ut=()=>{switch(u){case"projects":return m==="all"?w:$(m);case"audits":return m==="all"?ae:Se(m);case"users":return m==="all"?J:Te(m);default:return[]}},Pa=()=>{switch(u){case"projects":return C;case"audits":return Qe;case"users":return Ja;default:return!1}},Wa=()=>{switch(u){case"projects":return B;case"audits":return Ee;case"users":return gt;default:return{all:0,working:0,audit:0,setup:0,finished:0}}},Et=Ut(),la=Pa(),Fa=Wa();return i.jsxs("div",{className:"space-y-6",children:[i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center text-primary-300",children:[i.jsx(Nt,{className:"w-5 h-5 mr-2"}),"Enhanced Search with Status Filtering"]}),i.jsx(G.Description,{children:"Search projects, audits, and users with selective status filtering: working, audit, setup, finished"})]}),i.jsxs(G.Content,{className:"space-y-6",children:[i.jsx("div",{className:"flex space-x-1 bg-surface-800 p-1 rounded-lg",children:V.map(L=>{const we=L.icon;return i.jsxs("button",{onClick:()=>ve(L.value),className:`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${u===L.value?"bg-primary-500 text-white shadow-lg":"text-surface-300 hover:text-white hover:bg-surface-700"}`,children:[i.jsx(we,{className:"w-4 h-4 mr-2"}),L.label]},L.value)})}),i.jsxs("div",{className:"flex space-x-4",children:[i.jsxs("div",{className:"flex-1",children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Search Term"}),i.jsxs("div",{className:"relative",children:[i.jsx(Nt,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",value:f,onChange:L=>d(L.target.value),onKeyDown:L=>L.key==="Enter"&&oe(),placeholder:`Search ${u}...`,className:"material-input pl-10 w-full"})]})]}),u==="users"&&i.jsxs("div",{className:"w-48",children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Campus"}),i.jsxs("select",{value:x,onChange:L=>j(L.target.value),className:"material-input w-full",children:[i.jsx("option",{value:"",children:"All Campuses"}),Ze.map(L=>i.jsx("option",{value:L,children:L},L))]})]})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-3",children:"Filter by Status"}),i.jsx("div",{className:"flex flex-wrap gap-2",children:X.map(L=>{const we=L.icon,el=Fa[L.value]||0,Cl=m===L.value;return i.jsxs(K.button,{onClick:()=>Xe(L.value),className:`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${Cl?"bg-primary-500 text-white shadow-lg":"bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-white"}`,whileHover:{scale:1.05},whileTap:{scale:.95},children:[i.jsx(we,{className:`w-4 h-4 mr-2 ${Cl?"text-white":L.color}`}),L.label,el>0&&i.jsx("span",{className:`ml-2 px-2 py-0.5 rounded-full text-xs ${Cl?"bg-white/20":"bg-surface-600"}`,children:el})]},L.value)})})]}),i.jsx("div",{className:"flex justify-end",children:i.jsx(Gt,{onClick:oe,disabled:la,className:"px-6",children:la?i.jsxs(i.Fragment,{children:[i.jsx(ui,{className:"w-4 h-4 mr-2"}),"Searching..."]}):i.jsxs(i.Fragment,{children:[i.jsx(Nt,{className:"w-4 h-4 mr-2"}),"Search ",u]})})})]})]}),(Et.length>0||la)&&i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center justify-between",children:[i.jsx("span",{children:"Search Results"}),i.jsxs("span",{className:"text-sm text-surface-400",children:[Et.length," ",u," found"]})]})}),i.jsx(G.Content,{children:la?i.jsxs("div",{className:"flex items-center justify-center py-8",children:[i.jsx(ui,{className:"w-6 h-6 mr-2"}),i.jsxs("span",{children:["Searching ",u,"..."]})]}):i.jsx("div",{className:"space-y-3 max-h-96 overflow-y-auto",children:Et.map((L,we)=>i.jsx(Yp,{result:L,type:u},L.id||we))})})]}),i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center text-primary-300",children:[i.jsx(Eu,{className:"w-5 h-5 mr-2"}),"Group Search"]})}),i.jsxs(G.Content,{className:"space-y-4",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Select Cohort"}),i.jsx("div",{className:"relative",children:i.jsx("select",{value:U.cohort,onChange:L=>E(we=>({...we,cohort:L.target.value})),className:"material-input w-full appearance-none",children:ge.map(L=>i.jsx("option",{value:L,className:"bg-surface-800",children:L},L))})})]}),i.jsx("div",{children:i.jsx("input",{type:"text",value:U.status,onChange:L=>E(we=>({...we,status:L.target.value})),className:"material-input w-full",placeholder:"Status"})}),i.jsxs(Gt,{onClick:ue,className:"w-full",children:[i.jsx(Nt,{className:"w-4 h-4 mr-2"}),"Search"]})]})]}),i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center text-primary-300",children:[i.jsx(Nt,{className:"w-5 h-5 mr-2"}),"User Advance Search"]})}),i.jsxs(G.Content,{className:"space-y-4",children:[i.jsx("div",{children:i.jsx("input",{type:"text",value:I.username,onChange:L=>T(we=>({...we,username:L.target.value})),className:"material-input w-full",placeholder:"Username"})}),i.jsx("div",{children:i.jsx("input",{type:"text",value:I.status,onChange:L=>T(we=>({...we,status:L.target.value})),className:"material-input w-full",placeholder:"Status"})}),i.jsxs(Gt,{onClick:Oe,className:"w-full",loading:D,children:[i.jsx(Nt,{className:"w-4 h-4 mr-2"}),"Search"]}),mt.length>0&&i.jsxs("div",{className:"mt-4 space-y-2",children:[i.jsx("h4",{className:"text-sm font-medium text-surface-200",children:"Results:"}),mt.map(L=>i.jsxs(K.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"p-3 bg-surface-800/50 rounded-lg",children:[i.jsx("p",{className:"text-white font-medium",children:L.login}),(L.firstName||L.lastName)&&i.jsxs("p",{className:"text-surface-300 text-sm",children:[L.firstName," ",L.lastName]})]},L.id))]})]})]}),i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center text-primary-300",children:[i.jsx(Xs,{className:"w-5 h-5 mr-2"}),"Ranking Search"]})}),i.jsxs(G.Content,{className:"space-y-4",children:[i.jsx("div",{children:i.jsx("input",{type:"number",value:v.limit,onChange:L=>p(we=>({...we,limit:L.target.value})),className:"material-input w-full",placeholder:"0",min:"0"})}),i.jsx("div",{children:i.jsx("select",{value:v.cohort,onChange:L=>p(we=>({...we,cohort:L.target.value})),className:"material-input w-full appearance-none",children:ge.map(L=>i.jsx("option",{value:L,className:"bg-surface-800",children:L},L))})}),i.jsxs(Gt,{onClick:ht,className:"w-full",children:[i.jsx(Xs,{className:"w-4 h-4 mr-2"}),"Search Rankings"]})]})]}),i.jsxs(G,{className:"xl:col-span-3",children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Hs,{className:"w-5 h-5 mr-2"}),"Search Tips"]})}),i.jsx(G.Content,{children:i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"Group Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Search for groups by cohort and status. Filter by working status to find active groups."})]}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"User Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Find specific users by username. Add status filters to narrow down results."})]}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"Ranking Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"View top performers by cohort. Set a limit to see top N users or leave as 0 for all."})]})]})})]})]})]})},Zp=({data:u=[],width:c=600,height:f=300,className:d=""})=>{const m={top:20,right:30,bottom:40,left:60},A=c-m.left-m.right,x=f-m.top-m.bottom,j=W.useMemo(()=>{if(!u||u.length===0){const R=[];let $=0;for(let B=0;B<12;B++){const C=Math.floor(Math.random()*500)+100;$+=C,R.push({date:new Date(2024,B,1).toISOString().split("T")[0],amount:C,cumulative:$})}return R}return u},[u]),{xScale:U,yScale:E,maxY:I}=W.useMemo(()=>{if(j.length===0)return{xScale:()=>0,yScale:()=>0,maxY:0};const R=Math.max(...j.map(se=>se.cumulative)),$=new Date(Math.min(...j.map(se=>new Date(se.date)))),B=new Date(Math.max(...j.map(se=>new Date(se.date))));return{xScale:se=>(new Date(se)-$)/(B-$)*A,yScale:se=>x-se/R*x,maxY:R}},[j,A,x]),T=W.useMemo(()=>j.length===0?"":j.map((R,$)=>{const B=U(R.date),C=E(R.cumulative);return`${$===0?"M":"L"} ${B} ${C}`}).join(" "),[j,U,E]),v=W.useMemo(()=>{if(j.length===0)return"";const R=T,$=j[0],B=j[j.length-1];return`${R} L ${U(B.date)} ${x} L ${U($.date)} ${x} Z`},[T,j,U,x]),p=W.useMemo(()=>{const $=[];for(let B=0;B<=5;B++){const C=I/5*B;$.push({value:Math.round(C),y:E(C)})}return $},[I,E]),w=W.useMemo(()=>{if(j.length===0)return[];const R=Math.min(6,j.length),$=Math.floor(j.length/R),B=[];for(let C=0;C<j.length;C+=$){const ae=j[C];B.push({label:new Date(ae.date).toLocaleDateString("en-US",{month:"short"}),x:U(ae.date)})}return B},[j,U]);return i.jsx("div",{className:`w-full ${d}`,children:i.jsxs("svg",{width:c,height:f,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.3"}),i.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.05"})]}),i.jsxs("filter",{id:"glow",children:[i.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsxs("g",{transform:`translate(${m.left}, ${m.top})`,children:[p.map((R,$)=>i.jsx("line",{x1:0,y1:R.y,x2:A,y2:R.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},$)),i.jsx(K.path,{d:v,fill:"url(#xpGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),i.jsx(K.path,{d:T,fill:"none",stroke:"#14b8a6",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),j.map((R,$)=>i.jsx(K.circle,{cx:U(R.date),cy:E(R.cumulative),r:"4",fill:"#14b8a6",stroke:"#ffffff",strokeWidth:"2",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:.1*$},className:"cursor-pointer hover:r-6 transition-all",children:i.jsx("title",{children:`${new Date(R.date).toLocaleDateString()}: ${R.cumulative.toLocaleString()} XP`})},$)),i.jsx("line",{x1:0,y1:0,x2:0,y2:x,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),i.jsx("line",{x1:0,y1:x,x2:A,y2:x,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),p.map((R,$)=>i.jsx("text",{x:-10,y:R.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.value.toLocaleString()},$)),w.map((R,$)=>i.jsx("text",{x:R.x,y:x+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.label},$)),i.jsx("text",{x:A/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"XP Progress Over Time"}),i.jsx("text",{x:-40,y:x/2,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",transform:`rotate(-90, -40, ${x/2})`,children:"Experience Points"})]})]})})},Vp=({passedProjects:u=15,failedProjects:c=3,size:f=200,className:d=""})=>{const m=u+c,A=f/2-20,x=f/2,{passedPath:j,failedPath:U}=W.useMemo(()=>{if(m===0)return{passedAngle:0,failedAngle:0,passedPath:"",failedPath:""};const v=u/m*360,p=c/m*360,w=(B,C,ae,se)=>{const Se=E(se,se,ae,C),Ee=E(se,se,ae,B),Qe=C-B<=180?"0":"1";return["M",se,se,"L",Se.x,Se.y,"A",ae,ae,0,Qe,0,Ee.x,Ee.y,"Z"].join(" ")},R=w(0,v,A,x),$=w(v,v+p,A,x);return{passedAngle:v,failedAngle:p,passedPath:R,failedPath:$}},[u,c,m,A,x]);function E(v,p,w,R){const $=(R-90)*Math.PI/180;return{x:v+w*Math.cos($),y:p+w*Math.sin($)}}const I=m>0?Math.round(u/m*100):0,T=m>0?Math.round(c/m*100):0;return m===0?i.jsx("div",{className:`flex items-center justify-center ${d}`,style:{width:f,height:f},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"w-16 h-16 border-4 border-surface-600 rounded-full mx-auto mb-2"}),i.jsx("p",{className:"text-sm",children:"No project data"})]})}):i.jsxs("div",{className:`relative ${d}`,style:{width:f,height:f},children:[i.jsxs("svg",{width:f,height:f,className:"transform -rotate-90",children:[i.jsx("defs",{children:i.jsxs("filter",{id:"pieGlow",children:[i.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),i.jsx(K.path,{d:j,fill:"#10b981",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.2},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`Passed: ${u} projects (${I}%)`})}),i.jsx(K.path,{d:U,fill:"#ef4444",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`Failed: ${c} projects (${T}%)`})}),i.jsx("circle",{cx:x,cy:x,r:A*.6,fill:"rgba(15, 23, 42, 0.9)",stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"})]}),i.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center text-center",children:[i.jsxs("div",{className:"text-2xl font-bold text-white",children:[I,"%"]}),i.jsx("div",{className:"text-xs text-surface-300 mt-1",children:"Success Rate"})]}),i.jsxs("div",{className:"absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 text-xs",children:[i.jsxs("div",{className:"flex items-center space-x-1",children:[i.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"}),i.jsxs("span",{className:"text-surface-300",children:["Passed (",u,")"]})]}),i.jsxs("div",{className:"flex items-center space-x-1",children:[i.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),i.jsxs("span",{className:"text-surface-300",children:["Failed (",c,")"]})]})]})]})},kp=({auditsGiven:u=24,auditsReceived:c=12,width:f=400,height:d=250,className:m=""})=>{const A={top:20,right:30,bottom:60,left:60},x=f-A.left-A.right,j=d-A.top-A.bottom,U=[{label:"Audits Given",value:u,color:"#14b8a6"},{label:"Audits Received",value:c,color:"#d946ef"}],E=Math.max(...U.map(R=>R.value)),I=x/U.length*.6,T=x/U.length,v=W.useCallback(R=>j-R/E*j,[j,E]),p=W.useMemo(()=>{const $=[];for(let B=0;B<=5;B++){const C=Math.round(E/5*B);$.push({value:C,y:v(C)})}return $},[E,v]),w=c>0?(u/c).toFixed(1):"∞";return i.jsx("div",{className:`w-full ${m}`,children:i.jsxs("svg",{width:f,height:d,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"givenGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.4"})]}),i.jsxs("linearGradient",{id:"receivedGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#d946ef",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"#d946ef",stopOpacity:"0.4"})]}),i.jsxs("filter",{id:"barGlow",children:[i.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsxs("g",{transform:`translate(${A.left}, ${A.top})`,children:[p.map((R,$)=>i.jsx("line",{x1:0,y1:R.y,x2:x,y2:R.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},$)),U.map((R,$)=>{const B=$*T+(T-I)/2,C=j-v(R.value),ae=$===0?"givenGradient":"receivedGradient";return i.jsxs("g",{children:[i.jsx(K.rect,{x:B,y:v(R.value),width:I,height:C,fill:`url(#${ae})`,stroke:R.color,strokeWidth:"2",rx:"4",filter:"url(#barGlow)",initial:{height:0,y:j},animate:{height:C,y:v(R.value)},transition:{duration:1,delay:$*.2,ease:"easeOut"},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`${R.label}: ${R.value}`})}),i.jsx(K.text,{x:B+I/2,y:v(R.value)-8,textAnchor:"middle",fill:"white",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:$*.2+.5},children:R.value}),i.jsx("text",{x:B+I/2,y:j+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.label.split(" ")[0]}),i.jsx("text",{x:B+I/2,y:j+35,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.label.split(" ")[1]})]},$)}),i.jsx("line",{x1:0,y1:0,x2:0,y2:j,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),i.jsx("line",{x1:0,y1:j,x2:x,y2:j,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),p.map((R,$)=>i.jsx("text",{x:-10,y:R.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:R.value},$)),i.jsx("text",{x:x/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"Audit Statistics"}),i.jsxs("g",{transform:`translate(${x-80}, 20)`,children:[i.jsx("rect",{x:0,y:0,width:80,height:40,fill:"rgba(255, 255, 255, 0.1)",stroke:"rgba(255, 255, 255, 0.2)",strokeWidth:"1",rx:"4"}),i.jsx("text",{x:40,y:15,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"10",fontFamily:"Inter, sans-serif",children:"Ratio"}),i.jsx("text",{x:40,y:32,textAnchor:"middle",fill:"#14b8a6",fontSize:"16",fontWeight:"700",fontFamily:"Inter, sans-serif",children:w})]})]})]})})},Kp=({data:u=[],width:c=600,height:f=400,maxBars:d=15,className:m=""})=>{const A=W.useMemo(()=>{if(!u||u.length===0)return[];const T=u.slice(0,d),v=Math.max(...T.map(p=>p.totalXP));return T.map((p,w)=>({...p,percentage:p.totalXP/v*100,index:w}))},[u,d]),x={top:20,right:80,bottom:40,left:200},j=c-x.left-x.right,U=f-x.top-x.bottom,E=Math.max(20,U/Math.max(A.length,1)-4),I=(T,v=25)=>T?T.length>v?`${T.substring(0,v)}...`:T:"Unknown Project";return A.length?i.jsx("div",{className:m,children:i.jsxs("svg",{width:c,height:f,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpBarGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(147, 51, 234)",stopOpacity:"0.9"})]}),i.jsx("filter",{id:"barShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:i.jsx("feDropShadow",{dx:"2",dy:"2",stdDeviation:"3",floodOpacity:"0.3"})})]}),i.jsxs("text",{x:c/2,y:15,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:["XP Earned by Project (Top ",A.length,")"]}),i.jsxs("g",{transform:`translate(${x.left}, ${x.top})`,children:[[0,25,50,75,100].map(T=>i.jsxs("g",{children:[i.jsx("line",{x1:T/100*j,y1:0,x2:T/100*j,y2:U,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsxs("text",{x:T/100*j,y:U+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:[T,"%"]})]},T)),A.map((T,v)=>{const p=v*(E+4),w=T.percentage/100*j;return i.jsxs("g",{children:[i.jsx("text",{x:-10,y:p+E/2,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-200 text-xs font-medium",children:I(T.name)}),i.jsx("rect",{x:0,y:p,width:j,height:E,fill:"rgb(30, 41, 59)",rx:"4"}),i.jsx(K.rect,{x:0,y:p,width:w,height:E,fill:"url(#xpBarGradient)",filter:"url(#barShadow)",rx:"4",initial:{width:0},animate:{width:w},transition:{duration:.8,delay:v*.1,ease:"easeOut"}}),i.jsxs(K.text,{x:w+8,y:p+E/2,dominantBaseline:"middle",className:"fill-surface-100 text-xs font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:v*.1+.3},children:[ii(T.totalXP)," XP"]}),i.jsx(K.rect,{x:0,y:p,width:j,height:E,fill:"transparent",className:"cursor-pointer",whileHover:{fill:"rgba(59, 130, 246, 0.1)"},transition:{duration:.2}})]},T.path||v)}),i.jsx("text",{x:-180,y:U/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -180, ${U/2})`,className:"fill-surface-300 text-sm font-medium",children:"Projects"}),i.jsx("text",{x:j/2,y:U+35,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Relative XP Distribution (%)"})]}),i.jsxs("g",{transform:`translate(${c-70}, 30)`,children:[i.jsx("rect",{x:0,y:0,width:12,height:8,fill:"url(#xpBarGradient)",rx:"2"}),i.jsx("text",{x:18,y:6,dominantBaseline:"middle",className:"fill-surface-300 text-xs",children:"XP Earned"})]})]})}):i.jsx("div",{className:`flex items-center justify-center ${m}`,style:{width:c,height:f},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"📊"}),i.jsx("div",{children:"No project data available"})]})})},Jp=({data:u=[],width:c=700,height:f=400,className:d=""})=>{const m=W.useMemo(()=>{if(!u||u.length===0)return{points:[],maxXP:0,dateRange:null};const p=[...u].sort((B,C)=>new Date(B.date)-new Date(C.date)),w=Math.max(...p.map(B=>B.cumulativeXP)),R=new Date(p[0].date),$=new Date(p[p.length-1].date);return{points:p,maxXP:w,dateRange:{min:R,max:$}}},[u]),A={top:30,right:60,bottom:60,left:80},x=c-A.left-A.right,j=f-A.top-A.bottom,U=p=>qu(p,{month:"short",day:"numeric",year:"2-digit"}),E=p=>p.length===0?"":p.map((R,$)=>{const B=(new Date(R.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*x,C=j-R.cumulativeXP/m.maxXP*j;return $===0?`M ${B} ${C}`:`L ${B} ${C}`}).join(" "),I=p=>{if(p.length===0)return"";const w=E(p),R=p[p.length-1],$=(new Date(R.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*x;return`${w} L ${$} ${j} L 0 ${j} Z`};if(!m.points.length)return i.jsx("div",{className:`flex items-center justify-center ${d}`,style:{width:c,height:f},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"📈"}),i.jsx("div",{children:"No timeline data available"})]})});const T=E(m.points),v=I(m.points);return i.jsx("div",{className:d,children:i.jsxs("svg",{width:c,height:f,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpTimelineGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.3"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.05"})]}),i.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)"}),i.jsx("stop",{offset:"50%",stopColor:"rgb(147, 51, 234)"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(236, 72, 153)"})]}),i.jsxs("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[i.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsx("text",{x:c/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"XP Progression Over Time"}),i.jsxs("g",{transform:`translate(${A.left}, ${A.top})`,children:[[0,.25,.5,.75,1].map(p=>{const w=j-p*j,R=p*m.maxXP;return i.jsxs("g",{children:[i.jsx("line",{x1:0,y1:w,x2:x,y2:w,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsx("text",{x:-10,y:w,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-400 text-xs",children:ii(R)})]},p)}),m.dateRange&&[0,.25,.5,.75,1].map(p=>{const w=p*x,R=new Date(m.dateRange.min.getTime()+p*(m.dateRange.max.getTime()-m.dateRange.min.getTime()));return i.jsxs("g",{children:[i.jsx("line",{x1:w,y1:0,x2:w,y2:j,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsx("text",{x:w,y:j+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:U(R)})]},p)}),i.jsx(K.path,{d:v,fill:"url(#xpTimelineGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),i.jsx(K.path,{d:T,fill:"none",stroke:"url(#lineGradient)",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),m.points.map((p,w)=>{const R=(new Date(p.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*x,$=j-p.cumulativeXP/m.maxXP*j;return i.jsxs(K.g,{children:[i.jsx(K.circle,{cx:R,cy:$,r:"4",fill:"rgb(59, 130, 246)",stroke:"white",strokeWidth:"2",className:"cursor-pointer",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:w/m.points.length*2+.5},whileHover:{scale:1.5}}),i.jsxs(K.g,{initial:{opacity:0},whileHover:{opacity:1},transition:{duration:.2},children:[i.jsx("rect",{x:R-60,y:$-40,width:"120",height:"30",fill:"rgb(30, 41, 59)",stroke:"rgb(71, 85, 105)",rx:"4",className:"pointer-events-none"}),i.jsxs("text",{x:R,y:$-30,textAnchor:"middle",className:"fill-surface-100 text-xs font-medium pointer-events-none",children:[ii(p.cumulativeXP)," XP"]}),i.jsx("text",{x:R,y:$-18,textAnchor:"middle",className:"fill-surface-400 text-xs pointer-events-none",children:U(p.date)})]})]},w)}),i.jsx("text",{x:-50,y:j/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -50, ${j/2})`,className:"fill-surface-300 text-sm font-medium",children:"Cumulative XP"}),i.jsx("text",{x:x/2,y:j+45,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Timeline"})]}),i.jsxs("g",{transform:`translate(${c-150}, 40)`,children:[i.jsx("rect",{x:0,y:0,width:"140",height:"60",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsxs("text",{x:10,y:18,className:"fill-surface-200 text-xs font-medium",children:["Total XP: ",ii(m.maxXP)]}),i.jsxs("text",{x:10,y:32,className:"fill-surface-400 text-xs",children:["Projects: ",m.points.length]}),i.jsxs("text",{x:10,y:46,className:"fill-surface-400 text-xs",children:["Duration: ",Math.ceil((m.dateRange.max-m.dateRange.min)/(1e3*60*60*24))," days"]})]})]})})},Pp=({data:u={},width:c=500,height:f=400,className:d=""})=>{const m=W.useMemo(()=>{const{jsStats:T={},goStats:v={},overall:p={}}=u,w=[];p.passed>0&&w.push({label:"Passed",value:p.passed,percentage:p.passed/p.total*100,color:"rgb(34, 197, 94)",hoverColor:"rgb(22, 163, 74)"}),p.failed>0&&w.push({label:"Failed",value:p.failed,percentage:p.failed/p.total*100,color:"rgb(239, 68, 68)",hoverColor:"rgb(220, 38, 38)"});let R=-90;return{segments:w.map(B=>{const C=B.percentage/100*360,ae={...B,startAngle:R,endAngle:R+C,angle:C};return R+=C,ae}),jsStats:T,goStats:v,overall:p}},[u]),A=c/2,x=f/2,j=Math.min(c,f)/3,U=j*.4,E=(T,v,p,w)=>{const R=(w-90)*Math.PI/180;return{x:T+p*Math.cos(R),y:v+p*Math.sin(R)}},I=(T,v,p,w,R,$=0)=>{const B=E(T,v,p,R),C=E(T,v,p,w),ae=R-w<=180?"0":"1";if($>0){const se=E(T,v,$,R),Se=E(T,v,$,w);return["M",B.x,B.y,"A",p,p,0,ae,0,C.x,C.y,"L",Se.x,Se.y,"A",$,$,0,ae,1,se.x,se.y,"Z"].join(" ")}else return["M",T,v,"L",B.x,B.y,"A",p,p,0,ae,0,C.x,C.y,"Z"].join(" ")};return!m.segments.length||m.overall.total===0?i.jsx("div",{className:`flex items-center justify-center ${d}`,style:{width:c,height:f},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"🥧"}),i.jsx("div",{children:"No piscine data available"})]})}):i.jsx("div",{className:d,children:i.jsxs("svg",{width:c,height:f,className:"overflow-visible",children:[i.jsx("defs",{children:i.jsx("filter",{id:"pieShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:i.jsx("feDropShadow",{dx:"2",dy:"4",stdDeviation:"4",floodOpacity:"0.3"})})}),i.jsx("text",{x:c/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"Piscine Performance Overview"}),m.segments.map((T,v)=>{const p=I(A,x,j,T.startAngle,T.endAngle,U),w=(T.startAngle+T.endAngle)/2,R=j+30,$=E(A,x,R,w);return i.jsxs("g",{children:[i.jsx(K.path,{d:p,fill:T.color,filter:"url(#pieShadow)",className:"cursor-pointer",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.6,delay:v*.2,ease:"easeOut"},whileHover:{fill:T.hoverColor,scale:1.05}}),i.jsxs(K.text,{x:$.x,y:$.y,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-100 text-sm font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:v*.2+.3},children:[T.percentage.toFixed(1),"%"]}),i.jsxs(K.text,{x:$.x,y:$.y+15,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-400 text-xs",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:v*.2+.4},children:["(",T.value," ",T.label.toLowerCase(),")"]})]},T.label)}),i.jsxs("g",{children:[i.jsx("text",{x:A,y:x-10,textAnchor:"middle",className:"fill-surface-100 text-lg font-bold",children:m.overall.total}),i.jsx("text",{x:A,y:x+8,textAnchor:"middle",className:"fill-surface-400 text-sm",children:"Total Attempts"})]}),i.jsx("g",{transform:`translate(20, ${f-100})`,children:m.segments.map((T,v)=>i.jsxs("g",{transform:`translate(0, ${v*20})`,children:[i.jsx("rect",{x:0,y:0,width:12,height:12,fill:T.color,rx:"2"}),i.jsxs("text",{x:18,y:9,dominantBaseline:"middle",className:"fill-surface-200 text-sm",children:[T.label,": ",T.value]})]},T.label))}),i.jsxs("g",{transform:`translate(${c-180}, 50)`,children:[i.jsx("rect",{x:0,y:0,width:"170",height:"120",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Breakdown by Track"}),i.jsx("text",{x:10,y:38,className:"fill-surface-300 text-xs font-medium",children:"JavaScript Piscine:"}),i.jsxs("text",{x:15,y:52,className:"fill-surface-400 text-xs",children:["Passed: ",m.jsStats.passed||0]}),i.jsxs("text",{x:15,y:64,className:"fill-surface-400 text-xs",children:["Failed: ",m.jsStats.failed||0]}),i.jsx("text",{x:10,y:84,className:"fill-surface-300 text-xs font-medium",children:"Go Piscine:"}),i.jsxs("text",{x:15,y:98,className:"fill-surface-400 text-xs",children:["Passed: ",m.goStats.passed||0]}),i.jsxs("text",{x:15,y:110,className:"fill-surface-400 text-xs",children:["Failed: ",m.goStats.failed||0]})]}),i.jsxs("g",{transform:`translate(${c-180}, 180)`,children:[i.jsx("rect",{x:0,y:0,width:"170",height:"40",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Success Rate"}),i.jsxs("text",{x:10,y:32,className:"fill-primary-400 text-lg font-bold",children:[m.overall.passRate?.toFixed(1)||0,"%"]})]})]})})},Wp=()=>{const{xpProgression:u,loading:c}=Zu(),{passedProjects:f,failedProjects:d,loading:m}=Vu(),{auditsGiven:A,auditsReceived:x,loading:j}=ku(),{xpByProject:U,loading:E}=jp(),{xpTimeline:I,loading:T}=Ap(),{piscineStats:v,loading:p}=Sp();return c||m||j||E||T||p?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsx(dt,{}),i.jsx(dt,{}),i.jsx(dt,{}),i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsx(dt,{})}),i.jsx("div",{className:"lg:col-span-2",children:i.jsx(dt,{})}),i.jsx(dt,{})]}):i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(fi,{className:"w-5 h-5 mr-2"}),"XP Progression Timeline"]}),i.jsx(G.Description,{children:"Your cumulative experience points growth over time"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Jp,{data:I,width:900,height:400})})})]})}),i.jsx("div",{className:"lg:col-span-2",children:i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(ag,{className:"w-5 h-5 mr-2"}),"XP by Project"]}),i.jsx(G.Description,{children:"Top projects ranked by experience points earned"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Kp,{data:U,width:700,height:500,maxBars:15})})})]})}),i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Fd,{className:"w-5 h-5 mr-2"}),"Piscine Performance"]}),i.jsx(G.Description,{children:"JavaScript and Go piscine statistics"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Pp,{data:v,width:400,height:350})})})]}),i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Xs,{className:"w-5 h-5 mr-2"}),"XP Progress Overview"]}),i.jsx(G.Description,{children:"Your experience points progression summary"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Zp,{data:u,width:400,height:300})})})]}),i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(g0,{className:"w-5 h-5 mr-2"}),"Project Success Rate"]}),i.jsx(G.Description,{children:"Pass/Fail ratio for your projects"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center py-8",children:i.jsx(Vp,{passedProjects:f,failedProjects:d,size:250})})})]}),i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(m0,{className:"w-5 h-5 mr-2"}),"Audit Performance Analytics"]}),i.jsx(G.Description,{children:"Comprehensive audit statistics and performance metrics"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(kp,{auditsGiven:A,auditsReceived:x,width:900,height:400})})})]})})]})},Fp=()=>{const[u,c]=W.useState(""),[f,d]=W.useState("all"),[m,A]=W.useState("date"),x=[{id:1,user:"mohamedmoo",project:"mini-framework",result:"Pass",status:"pass",date:"2024-01-15",grade:1.2},{id:2,user:"musabd",project:"social-network",result:"Pass",status:"pass",date:"2024-01-14",grade:1},{id:3,user:"hadieif",project:"social-network",result:"Fail",status:"fail",date:"2024-01-13",grade:.8},{id:4,user:"aalmadhoo",project:"real-time-forum",result:"Pass",status:"pass",date:"2024-01-12",grade:1.5},{id:5,user:"hussainali2",project:"graphql",result:"Pass",status:"pass",date:"2024-01-11",grade:1.1},{id:6,user:"aabdulhu",project:"mini-framework",result:"Fail",status:"fail",date:"2024-01-10",grade:.6},{id:7,user:"yoowad",project:"graphql",result:"Pass",status:"pass",date:"2024-01-09",grade:1.3},{id:8,user:"musabd",project:"real-time-forum",result:"Pass",status:"pass",date:"2024-01-08",grade:1},{id:9,user:"mohamedmoo",project:"make-your-game",result:"Pass",status:"pass",date:"2024-01-07",grade:1.4}],j=x.filter(T=>{const v=T.user.toLowerCase().includes(u.toLowerCase())||T.project.toLowerCase().includes(u.toLowerCase()),p=f==="all"||T.status===f;return v&&p}).sort((T,v)=>{switch(m){case"date":return new Date(v.date)-new Date(T.date);case"user":return T.user.localeCompare(v.user);case"project":return T.project.localeCompare(v.project);default:return 0}}),U=x.filter(T=>T.status==="pass").length,E=x.filter(T=>T.status==="fail").length,I=x.reduce((T,v)=>T+v.grade,0)/x.length;return i.jsxs("div",{className:"space-y-6",children:[i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[i.jsx(G,{children:i.jsxs(G.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-green-500/20 rounded-lg",children:i.jsx(Mu,{className:"w-6 h-6 text-green-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:U}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Passed Audits"})]})]})}),i.jsx(G,{children:i.jsxs(G.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-red-500/20 rounded-lg",children:i.jsx(h0,{className:"w-6 h-6 text-red-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:E}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Failed Audits"})]})]})}),i.jsx(G,{children:i.jsxs(G.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-primary-500/20 rounded-lg",children:i.jsx(Ou,{className:"w-6 h-6 text-primary-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:I.toFixed(1)}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Average Grade"})]})]})})]}),i.jsx(G,{children:i.jsx(G.Content,{children:i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[i.jsxs("div",{className:"flex-1 relative",children:[i.jsx(Nt,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",placeholder:"Search audits...",value:u,onChange:T=>c(T.target.value),className:"material-input pl-10 w-full"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Hs,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:f,onChange:T=>d(T.target.value),className:"material-input",children:[i.jsx("option",{value:"all",children:"All Status"}),i.jsx("option",{value:"pass",children:"Passed"}),i.jsx("option",{value:"fail",children:"Failed"})]})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Wd,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:m,onChange:T=>A(T.target.value),className:"material-input",children:[i.jsx("option",{value:"date",children:"Sort by Date"}),i.jsx("option",{value:"user",children:"Sort by User"}),i.jsx("option",{value:"project",children:"Sort by Project"})]})]})]})})}),i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center justify-between",children:[i.jsxs("div",{className:"flex items-center",children:[i.jsx(Ou,{className:"w-5 h-5 mr-2"}),"Audits (",j.length,")"]}),i.jsxs(Ra,{variant:"primary",size:"sm",children:[(U/x.length*100).toFixed(0),"% Pass Rate"]})]}),i.jsx(G.Description,{children:"Your recent audit history"})]}),i.jsxs(G.Content,{children:[i.jsx("div",{className:"overflow-x-auto",children:i.jsxs("table",{className:"w-full",children:[i.jsx("thead",{children:i.jsxs("tr",{className:"border-b border-white/10",children:[i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"User"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Project"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Grade"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Date"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Result"})]})}),i.jsx("tbody",{children:j.map((T,v)=>i.jsxs(K.tr,{className:"border-b border-white/5 hover:bg-white/5 transition-colors",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2,delay:v*.05},children:[i.jsx("td",{className:"py-3 px-4 text-white font-medium",children:T.user}),i.jsx("td",{className:"py-3 px-4 text-surface-300",children:T.project}),i.jsx("td",{className:"py-3 px-4",children:i.jsx("span",{className:`font-semibold ${T.grade>=1?"text-green-400":"text-red-400"}`,children:T.grade.toFixed(1)})}),i.jsx("td",{className:"py-3 px-4 text-surface-400 text-sm",children:new Date(T.date).toLocaleDateString()}),i.jsx("td",{className:"py-3 px-4",children:i.jsx($p,{status:T.status})})]},T.id))})]})}),j.length===0&&i.jsxs("div",{className:"text-center py-8 text-surface-400",children:[i.jsx(Nt,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),i.jsx("p",{children:"No audits found matching your criteria"})]})]})]})]})},ey=()=>{const[u,c]=W.useState(""),[f,d]=W.useState("xp"),{skills:m,loading:A}=xp(),x=[{name:"JavaScript",totalXP:2500,projects:8,type:"language",level:"Advanced"},{name:"Go",totalXP:1800,projects:5,type:"language",level:"Intermediate"},{name:"React",totalXP:1500,projects:6,type:"framework",level:"Intermediate"},{name:"Docker",totalXP:1200,projects:4,type:"tool",level:"Intermediate"},{name:"PostgreSQL",totalXP:1e3,projects:3,type:"database",level:"Beginner"},{name:"GraphQL",totalXP:800,projects:2,type:"api",level:"Beginner"},{name:"Node.js",totalXP:1400,projects:5,type:"runtime",level:"Intermediate"},{name:"Git",totalXP:2e3,projects:10,type:"tool",level:"Advanced"}],j=m.length>0?m:x,U=j.filter(v=>v.name.toLowerCase().includes(u.toLowerCase())).sort((v,p)=>{switch(f){case"xp":return p.totalXP-v.totalXP;case"projects":return p.projects-v.projects;case"name":return v.name.localeCompare(p.name);default:return 0}}),E=v=>{switch(v){case"language":return i.jsx(v0,{className:"w-4 h-4"});case"database":return i.jsx(x0,{className:"w-4 h-4"});case"framework":case"api":return i.jsx(y0,{className:"w-4 h-4"});default:return i.jsx(p0,{className:"w-4 h-4"})}},I=v=>{switch(v){case"Advanced":return"success";case"Intermediate":return"primary";case"Beginner":return"warning";default:return"secondary"}},T=Math.max(...j.map(v=>v.totalXP));return A?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[i.jsx(dt,{}),i.jsx(dt,{})]}):i.jsxs("div",{className:"space-y-6",children:[i.jsx(G,{children:i.jsx(G.Content,{children:i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[i.jsxs("div",{className:"flex-1 relative",children:[i.jsx(Nt,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",placeholder:"Search technologies...",value:u,onChange:v=>c(v.target.value),className:"material-input pl-10 w-full"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Hs,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:f,onChange:v=>d(v.target.value),className:"material-input",children:[i.jsx("option",{value:"xp",children:"Sort by XP"}),i.jsx("option",{value:"projects",children:"Sort by Projects"}),i.jsx("option",{value:"name",children:"Sort by Name"})]})]})]})})}),i.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:U.map((v,p)=>i.jsx(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:p*.1},children:i.jsx(G,{hover:!0,className:"h-full",children:i.jsxs(G.Content,{children:[i.jsxs("div",{className:"flex items-start justify-between mb-3",children:[i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("div",{className:"p-2 bg-primary-500/20 rounded-lg text-primary-400",children:E(v.type)}),i.jsxs("div",{children:[i.jsx("h3",{className:"font-semibold text-white",children:v.name}),i.jsx("p",{className:"text-xs text-surface-400 capitalize",children:v.type})]})]}),i.jsx(Ra,{variant:I(v.level||"Beginner"),size:"sm",children:v.level||"Beginner"})]}),i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{children:[i.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[i.jsx("span",{className:"text-surface-300",children:"Experience"}),i.jsxs("span",{className:"text-primary-300",children:[v.totalXP.toLocaleString()," XP"]})]}),i.jsx(Ip,{value:v.totalXP,max:T,size:"sm",color:"primary",showValue:!1})]}),i.jsxs("div",{className:"flex justify-between text-sm",children:[i.jsx("span",{className:"text-surface-300",children:"Projects"}),i.jsx("span",{className:"text-accent-300 font-medium",children:v.projects})]})]})]})})},v.name))}),U.length===0&&i.jsx(G,{children:i.jsx(G.Content,{children:i.jsxs("div",{className:"text-center py-8 text-surface-400",children:[i.jsx(Nt,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),i.jsxs("p",{children:['No technologies found matching "',u,'"']})]})})})]})},ty=()=>{const[u,c]=W.useState("profile"),[f,d]=W.useState(!1),{logout:m,user:A}=at(),{profile:x,totalXP:j,loading:U,error:E}=vp();W.useEffect(()=>{d(!1)},[u]);const I=[{id:"profile",label:"Profile & Data",icon:ri},{id:"search",label:"Search Queries",icon:Nt},{id:"stats",label:"Statistics",icon:ag},{id:"audits",label:"Audits",icon:Ou},{id:"technologies",label:"Technologies",icon:Eu}],T=()=>{m()};return U?i.jsx("div",{className:"min-h-screen flex items-center justify-center",children:i.jsx(ui,{size:"lg",text:"Loading your dashboard..."})}):E?(console.error("Dashboard error:",E),i.jsx("div",{className:"min-h-screen flex items-center justify-center p-4",children:i.jsxs(G,{className:"max-w-md text-center",children:[i.jsxs(G.Header,{children:[i.jsx(G.Title,{className:"text-red-400",children:"Error Loading Dashboard"}),i.jsx(G.Description,{children:E.message||"Failed to load dashboard data"})]}),i.jsx(G.Content,{children:i.jsxs("div",{className:"space-y-3",children:[i.jsx(Gt,{onClick:()=>window.location.reload(),className:"w-full",children:"Reload Page"}),!1]})})]})})):i.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 pb-20 md:pb-0",children:[i.jsx("header",{className:"sticky top-0 z-40 bg-surface-900/80 backdrop-blur-md border-b border-white/10",children:i.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[i.jsxs("div",{className:"flex items-center justify-between h-16",children:[i.jsxs("div",{className:"flex items-center",children:[i.jsx(K.div,{initial:{scale:0},animate:{scale:1},className:"w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-400 rounded-lg flex items-center justify-center mr-3",children:i.jsx(ri,{className:"w-5 h-5 text-white"})}),i.jsx("h1",{className:"text-lg md:text-xl font-bold gradient-text",children:"Profile Dashboard"})]}),i.jsxs("div",{className:"hidden md:flex items-center space-x-4",children:[i.jsxs("div",{className:"text-right",children:[i.jsx("p",{className:"text-sm font-medium text-white",children:ci(x)||A?.username}),i.jsxs("p",{className:"text-xs text-surface-400",children:[Kd(j)," XP"]})]}),i.jsx(Gt,{variant:"ghost",size:"sm",onClick:T,className:"text-surface-300 hover:text-red-400",children:i.jsx(Yd,{className:"w-4 h-4"})})]}),i.jsx("div",{className:"md:hidden",children:i.jsx(Gt,{variant:"ghost",size:"sm",onClick:()=>d(!f),className:"text-surface-300",children:f?i.jsx(b0,{className:"w-5 h-5"}):i.jsx(j0,{className:"w-5 h-5"})})})]}),f&&i.jsx(K.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"md:hidden border-t border-white/10 py-4",children:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-sm font-medium text-white",children:ci(x)||A?.username}),i.jsxs("p",{className:"text-xs text-surface-400",children:[Kd(j)," XP"]})]}),i.jsxs(Gt,{variant:"ghost",size:"sm",onClick:T,className:"text-surface-300 hover:text-red-400",children:[i.jsx(Yd,{className:"w-4 h-4 mr-2"}),"Logout"]})]})})]})}),i.jsx("nav",{className:"sticky top-16 z-30 bg-surface-800/80 backdrop-blur-md border-b border-white/10 hidden md:block",children:i.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:i.jsx("div",{className:"flex space-x-8 overflow-x-auto",children:I.map(v=>{const p=v.icon,w=u===v.id;return i.jsxs(K.button,{onClick:()=>c(v.id),className:`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap relative ${w?"border-primary-400 text-primary-300":"border-transparent text-surface-400 hover:text-surface-200"}`,whileHover:{y:-2},whileTap:{y:0},children:[i.jsx(p,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm font-medium",children:v.label}),w&&i.jsx(K.div,{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400",layoutId:"activeTabIndicator",transition:{type:"spring",stiffness:500,damping:30}})]},v.id)})})})}),i.jsx(qp,{tabs:I,activeTab:u,onTabChange:c}),i.jsx("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:i.jsxs(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[u==="profile"&&i.jsx(Lp,{}),u==="search"&&i.jsx(Qp,{}),u==="stats"&&i.jsx(Wp,{}),u==="audits"&&i.jsx(Fp,{}),u==="technologies"&&i.jsx(ey,{})]},u)})]})};class ay extends W.Component{constructor(c){super(c),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(c,f){this.setState({error:c,errorInfo:f})}handleRetry=()=>{this.setState({hasError:!1,error:null,errorInfo:null})};handleReload=()=>{window.location.reload()};render(){return this.state.hasError?i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 flex items-center justify-center p-4",children:i.jsx(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"max-w-md w-full",children:i.jsx(G,{className:"text-center",children:i.jsxs(G.Content,{children:[i.jsx(K.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4",children:i.jsx(A0,{className:"w-8 h-8 text-red-400"})}),i.jsx("h1",{className:"text-2xl font-bold text-white mb-2",children:"Oops! Something went wrong"}),i.jsx("p",{className:"text-surface-300 mb-6",children:"We encountered an unexpected error. This has been logged and we'll look into it."}),!1,i.jsxs("div",{className:"flex flex-col sm:flex-row gap-3",children:[i.jsxs(Gt,{onClick:this.handleRetry,className:"flex-1",variant:"primary",children:[i.jsx(S0,{className:"w-4 h-4 mr-2"}),"Try Again"]}),i.jsxs(Gt,{onClick:this.handleReload,className:"flex-1",variant:"secondary",children:[i.jsx(_0,{className:"w-4 h-4 mr-2"}),"Reload Page"]})]})]})})})}):this.props.children}}const ly=()=>{const{isAuthenticated:u,isInitialized:c}=at();return c?u?i.jsx(ty,{}):i.jsx(hp,{}):i.jsx(ui,{fullScreen:!0,size:"lg",text:"Initializing..."})};function sy(){return i.jsx(ay,{children:i.jsx(r0,{client:wg,children:i.jsx(Y0,{children:i.jsx(ly,{})})})})}U0.createRoot(document.getElementById("root")).render(i.jsx(W.StrictMode,{children:i.jsx(sy,{})}));
