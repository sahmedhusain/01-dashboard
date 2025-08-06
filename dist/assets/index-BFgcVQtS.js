const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PiscinesDashboard-D1uPbb8_.js","assets/animation-vendor-w_1g82yL.js","assets/react-vendor-DJG_os-6.js","assets/ui-vendor-DSeQx4uF.js","assets/apollo-vendor-8AJvV5pX.js","assets/LeaderboardSection-DYt1N68b.js","assets/Card-Dh5KB05c.js","assets/PiscineSection-DsIn_IpP.js","assets/CheckpointDashboard-BbTzW7R4.js","assets/AuditSection-U0fUZcO_.js","assets/SubjectsSection-DukqH9pQ.js","assets/GroupSection-nu4XUvPu.js","assets/EventSection-_x0lDCKZ.js","assets/UserPreferences-tnINNNo7.js"])))=>i.map(i=>d[i]);
import{r as j,R as ot,j as n,m as V}from"./animation-vendor-w_1g82yL.js";import{r as cx,a as ux,g as dx}from"./react-vendor-DJG_os-6.js";import{A as Ws,_ as fx,O as Lc,g as mx,P as hx,a as px,c as xx,I as gx,b as vx,f as bx,u as yx,d as er,e as q,h as uh}from"./apollo-vendor-8AJvV5pX.js";import{L as Bm,C as jx,M as dh,a as wx,E as Nx,b as Ax,c as fh,B as mh,T as ml,U as dn,H as Sx,d as Ps,e as wi,f as _x,g as hl,S as Ex,h as Tx,i as Ni,A as Zs,P as qm,j as Hm,k as Im,l as Vm,m as Rx,n as Xm,o as Ym,p as Dx,q as cn,r as fn,s as Va,t as $m,u as pl,v as Ai,w as Tc,Z as Js,x as Rc,y as hh,z as Dc,D as Mx,F as Ux,G as Mc,I as ph,R as Cx}from"./ui-vendor-DSeQx4uF.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))u(m);new MutationObserver(m=>{for(const f of m)if(f.type==="childList")for(const p of f.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&u(p)}).observe(document,{childList:!0,subtree:!0});function c(m){const f={};return m.integrity&&(f.integrity=m.integrity),m.referrerPolicy&&(f.referrerPolicy=m.referrerPolicy),m.crossOrigin==="use-credentials"?f.credentials="include":m.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function u(m){if(m.ep)return;m.ep=!0;const f=c(m);fetch(m.href,f)}})();var jc={exports:{}},vi={},wc={exports:{}},Nc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zm;function Ox(){return Zm||(Zm=1,function(i){function o(M,Q){var P=M.length;M.push(Q);e:for(;0<P;){var de=P-1>>>1,ie=M[de];if(0<m(ie,Q))M[de]=Q,M[P]=ie,P=de;else break e}}function c(M){return M.length===0?null:M[0]}function u(M){if(M.length===0)return null;var Q=M[0],P=M.pop();if(P!==Q){M[0]=P;e:for(var de=0,ie=M.length,Ie=ie>>>1;de<Ie;){var we=2*(de+1)-1,fe=M[we],Ee=we+1,wt=M[Ee];if(0>m(fe,P))Ee<ie&&0>m(wt,fe)?(M[de]=wt,M[Ee]=P,de=Ee):(M[de]=fe,M[we]=P,de=we);else if(Ee<ie&&0>m(wt,P))M[de]=wt,M[Ee]=P,de=Ee;else break e}}return Q}function m(M,Q){var P=M.sortIndex-Q.sortIndex;return P!==0?P:M.id-Q.id}if(i.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;i.unstable_now=function(){return f.now()}}else{var p=Date,x=p.now();i.unstable_now=function(){return p.now()-x}}var v=[],y=[],g=1,E=null,A=3,Z=!1,k=!1,z=!1,N=!1,T=typeof setTimeout=="function"?setTimeout:null,O=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function S(M){for(var Q=c(y);Q!==null;){if(Q.callback===null)u(y);else if(Q.startTime<=M)u(y),Q.sortIndex=Q.expirationTime,o(v,Q);else break;Q=c(y)}}function L(M){if(z=!1,S(M),!k)if(c(v)!==null)k=!0,G||(G=!0,ve());else{var Q=c(y);Q!==null&&Be(L,Q.startTime-M)}}var G=!1,B=-1,X=5,K=-1;function te(){return N?!0:!(i.unstable_now()-K<X)}function he(){if(N=!1,G){var M=i.unstable_now();K=M;var Q=!0;try{e:{k=!1,z&&(z=!1,O(B),B=-1),Z=!0;var P=A;try{t:{for(S(M),E=c(v);E!==null&&!(E.expirationTime>M&&te());){var de=E.callback;if(typeof de=="function"){E.callback=null,A=E.priorityLevel;var ie=de(E.expirationTime<=M);if(M=i.unstable_now(),typeof ie=="function"){E.callback=ie,S(M),Q=!0;break t}E===c(v)&&u(v),S(M)}else u(v);E=c(v)}if(E!==null)Q=!0;else{var Ie=c(y);Ie!==null&&Be(L,Ie.startTime-M),Q=!1}}break e}finally{E=null,A=P,Z=!1}Q=void 0}}finally{Q?ve():G=!1}}}var ve;if(typeof I=="function")ve=function(){I(he)};else if(typeof MessageChannel<"u"){var Me=new MessageChannel,Je=Me.port2;Me.port1.onmessage=he,ve=function(){Je.postMessage(null)}}else ve=function(){T(he,0)};function Be(M,Q){B=T(function(){M(i.unstable_now())},Q)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(M){M.callback=null},i.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):X=0<M?Math.floor(1e3/M):5},i.unstable_getCurrentPriorityLevel=function(){return A},i.unstable_next=function(M){switch(A){case 1:case 2:case 3:var Q=3;break;default:Q=A}var P=A;A=Q;try{return M()}finally{A=P}},i.unstable_requestPaint=function(){N=!0},i.unstable_runWithPriority=function(M,Q){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var P=A;A=M;try{return Q()}finally{A=P}},i.unstable_scheduleCallback=function(M,Q,P){var de=i.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?de+P:de):P=de,M){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=P+ie,M={id:g++,callback:Q,priorityLevel:M,startTime:P,expirationTime:ie,sortIndex:-1},P>de?(M.sortIndex=P,o(y,M),c(v)===null&&M===c(y)&&(z?(O(B),B=-1):z=!0,Be(L,P-de))):(M.sortIndex=ie,o(v,M),k||Z||(k=!0,G||(G=!0,ve()))),M},i.unstable_shouldYield=te,i.unstable_wrapCallback=function(M){var Q=A;return function(){var P=A;A=Q;try{return M.apply(this,arguments)}finally{A=P}}}}(Nc)),Nc}var Qm;function zx(){return Qm||(Qm=1,wc.exports=Ox()),wc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Km;function Gx(){if(Km)return vi;Km=1;var i=zx(),o=cx(),c=ux();function u(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function m(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function f(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function p(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function x(e){if(f(e)!==e)throw Error(u(188))}function v(e){var t=e.alternate;if(!t){if(t=f(e),t===null)throw Error(u(188));return t!==e?null:e}for(var a=e,l=t;;){var s=a.return;if(s===null)break;var r=s.alternate;if(r===null){if(l=s.return,l!==null){a=l;continue}break}if(s.child===r.child){for(r=s.child;r;){if(r===a)return x(s),e;if(r===l)return x(s),t;r=r.sibling}throw Error(u(188))}if(a.return!==l.return)a=s,l=r;else{for(var d=!1,h=s.child;h;){if(h===a){d=!0,a=s,l=r;break}if(h===l){d=!0,l=s,a=r;break}h=h.sibling}if(!d){for(h=r.child;h;){if(h===a){d=!0,a=r,l=s;break}if(h===l){d=!0,l=r,a=s;break}h=h.sibling}if(!d)throw Error(u(189))}}if(a.alternate!==l)throw Error(u(190))}if(a.tag!==3)throw Error(u(188));return a.stateNode.current===a?e:t}function y(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=y(e),t!==null)return t;e=e.sibling}return null}var g=Object.assign,E=Symbol.for("react.element"),A=Symbol.for("react.transitional.element"),Z=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),z=Symbol.for("react.strict_mode"),N=Symbol.for("react.profiler"),T=Symbol.for("react.provider"),O=Symbol.for("react.consumer"),I=Symbol.for("react.context"),S=Symbol.for("react.forward_ref"),L=Symbol.for("react.suspense"),G=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),X=Symbol.for("react.lazy"),K=Symbol.for("react.activity"),te=Symbol.for("react.memo_cache_sentinel"),he=Symbol.iterator;function ve(e){return e===null||typeof e!="object"?null:(e=he&&e[he]||e["@@iterator"],typeof e=="function"?e:null)}var Me=Symbol.for("react.client.reference");function Je(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Me?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case k:return"Fragment";case N:return"Profiler";case z:return"StrictMode";case L:return"Suspense";case G:return"SuspenseList";case K:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Z:return"Portal";case I:return(e.displayName||"Context")+".Provider";case O:return(e._context.displayName||"Context")+".Consumer";case S:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case B:return t=e.displayName||null,t!==null?t:Je(e.type)||"Memo";case X:t=e._payload,e=e._init;try{return Je(e(t))}catch{}}return null}var Be=Array.isArray,M=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P={pending:!1,data:null,method:null,action:null},de=[],ie=-1;function Ie(e){return{current:e}}function we(e){0>ie||(e.current=de[ie],de[ie]=null,ie--)}function fe(e,t){ie++,de[ie]=e.current,e.current=t}var Ee=Ie(null),wt=Ie(null),Ct=Ie(null),Ya=Ie(null);function Ot(e,t){switch(fe(Ct,t),fe(wt,e),fe(Ee,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?mm(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=mm(t),e=hm(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}we(Ee),fe(Ee,e)}function Nt(){we(Ee),we(wt),we(Ct)}function xl(e){e.memoizedState!==null&&fe(Ya,e);var t=Ee.current,a=hm(t,e.type);t!==a&&(fe(wt,e),fe(Ee,a))}function gl(e){wt.current===e&&(we(Ee),we(wt)),Ya.current===e&&(we(Ya),mi._currentValue=P)}var vl=Object.prototype.hasOwnProperty,vn=i.unstable_scheduleCallback,$e=i.unstable_cancelCallback,zt=i.unstable_shouldYield,bl=i.unstable_requestPaint,nt=i.unstable_now,$a=i.unstable_getCurrentPriorityLevel,bn=i.unstable_ImmediatePriority,Di=i.unstable_UserBlockingPriority,yl=i.unstable_NormalPriority,yn=i.unstable_LowPriority,jn=i.unstable_IdlePriority,Mi=i.log,Ui=i.unstable_setDisableYieldValue,Za=null,tt=null;function Gt(e){if(typeof Mi=="function"&&Ui(e),tt&&typeof tt.setStrictMode=="function")try{tt.setStrictMode(Za,e)}catch{}}var it=Math.clz32?Math.clz32:Ci,rr=Math.log,or=Math.LN2;function Ci(e){return e>>>=0,e===0?32:31-(rr(e)/or|0)|0}var Jt=256,J=4194304;function Se(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ft(e,t,a){var l=e.pendingLanes;if(l===0)return 0;var s=0,r=e.suspendedLanes,d=e.pingedLanes;e=e.warmLanes;var h=l&134217727;return h!==0?(l=h&~r,l!==0?s=Se(l):(d&=h,d!==0?s=Se(d):a||(a=h&~e,a!==0&&(s=Se(a))))):(h=l&~r,h!==0?s=Se(h):d!==0?s=Se(d):a||(a=l&~e,a!==0&&(s=Se(a)))),s===0?0:t!==0&&t!==s&&(t&r)===0&&(r=s&-s,a=t&-t,r>=a||r===32&&(a&4194048)!==0)?t:s}function Qa(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function cr(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wn(){var e=Jt;return Jt<<=1,(Jt&4194048)===0&&(Jt=256),e}function Nn(){var e=J;return J<<=1,(J&62914560)===0&&(J=4194304),e}function ct(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Ve(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Jh(e,t,a,l,s,r){var d=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var h=e.entanglements,b=e.expirationTimes,D=e.hiddenUpdates;for(a=d&~a;0<a;){var H=31-it(a),$=1<<H;h[H]=0,b[H]=-1;var U=D[H];if(U!==null)for(D[H]=null,H=0;H<U.length;H++){var C=U[H];C!==null&&(C.lane&=-536870913)}a&=~$}l!==0&&Jc(e,l,0),r!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=r&~(d&~t))}function Jc(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-it(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|a&4194090}function Fc(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var l=31-it(a),s=1<<l;s&t|e[l]&t&&(e[l]|=t),a&=~s}}function ur(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function dr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Wc(){var e=Q.p;return e!==0?e:(e=window.event,e===void 0?32:Cm(e.type))}function Fh(e,t){var a=Q.p;try{return Q.p=e,t()}finally{Q.p=a}}var ba=Math.random().toString(36).slice(2),at="__reactFiber$"+ba,ut="__reactProps$"+ba,jl="__reactContainer$"+ba,fr="__reactEvents$"+ba,Wh="__reactListeners$"+ba,e0="__reactHandles$"+ba,eu="__reactResources$"+ba,An="__reactMarker$"+ba;function mr(e){delete e[at],delete e[ut],delete e[fr],delete e[Wh],delete e[e0]}function wl(e){var t=e[at];if(t)return t;for(var a=e.parentNode;a;){if(t=a[jl]||a[at]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=vm(e);e!==null;){if(a=e[at])return a;e=vm(e)}return t}e=a,a=e.parentNode}return null}function Nl(e){if(e=e[at]||e[jl]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function Sn(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(u(33))}function Al(e){var t=e[eu];return t||(t=e[eu]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ze(e){e[An]=!0}var tu=new Set,au={};function Ka(e,t){Sl(e,t),Sl(e+"Capture",t)}function Sl(e,t){for(au[e]=t,e=0;e<t.length;e++)tu.add(t[e])}var t0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),lu={},nu={};function a0(e){return vl.call(nu,e)?!0:vl.call(lu,e)?!1:t0.test(e)?nu[e]=!0:(lu[e]=!0,!1)}function Oi(e,t,a){if(a0(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function zi(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Wt(e,t,a,l){if(l===null)e.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+l)}}var hr,iu;function _l(e){if(hr===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);hr=t&&t[1]||"",iu=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+hr+e+iu}var pr=!1;function xr(e,t){if(!e||pr)return"";pr=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var $=function(){throw Error()};if(Object.defineProperty($.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct($,[])}catch(C){var U=C}Reflect.construct(e,[],$)}else{try{$.call()}catch(C){U=C}e.call($.prototype)}}else{try{throw Error()}catch(C){U=C}($=e())&&typeof $.catch=="function"&&$.catch(function(){})}}catch(C){if(C&&U&&typeof C.stack=="string")return[C.stack,U.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=l.DetermineComponentFrameRoot(),d=r[0],h=r[1];if(d&&h){var b=d.split(`
`),D=h.split(`
`);for(s=l=0;l<b.length&&!b[l].includes("DetermineComponentFrameRoot");)l++;for(;s<D.length&&!D[s].includes("DetermineComponentFrameRoot");)s++;if(l===b.length||s===D.length)for(l=b.length-1,s=D.length-1;1<=l&&0<=s&&b[l]!==D[s];)s--;for(;1<=l&&0<=s;l--,s--)if(b[l]!==D[s]){if(l!==1||s!==1)do if(l--,s--,0>s||b[l]!==D[s]){var H=`
`+b[l].replace(" at new "," at ");return e.displayName&&H.includes("<anonymous>")&&(H=H.replace("<anonymous>",e.displayName)),H}while(1<=l&&0<=s);break}}}finally{pr=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?_l(a):""}function l0(e){switch(e.tag){case 26:case 27:case 5:return _l(e.type);case 16:return _l("Lazy");case 13:return _l("Suspense");case 19:return _l("SuspenseList");case 0:case 15:return xr(e.type,!1);case 11:return xr(e.type.render,!1);case 1:return xr(e.type,!0);case 31:return _l("Activity");default:return""}}function su(e){try{var t="";do t+=l0(e),e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function At(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ru(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function n0(e){var t=ru(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),l=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var s=a.get,r=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(d){l=""+d,r.call(this,d)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return l},setValue:function(d){l=""+d},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Gi(e){e._valueTracker||(e._valueTracker=n0(e))}function ou(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),l="";return e&&(l=ru(e)?e.checked?"true":"false":e.value),e=l,e!==a?(t.setValue(e),!0):!1}function ki(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var i0=/[\n"\\]/g;function St(e){return e.replace(i0,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function gr(e,t,a,l,s,r,d,h){e.name="",d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?e.type=d:e.removeAttribute("type"),t!=null?d==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+At(t)):e.value!==""+At(t)&&(e.value=""+At(t)):d!=="submit"&&d!=="reset"||e.removeAttribute("value"),t!=null?vr(e,d,At(t)):a!=null?vr(e,d,At(a)):l!=null&&e.removeAttribute("value"),s==null&&r!=null&&(e.defaultChecked=!!r),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"?e.name=""+At(h):e.removeAttribute("name")}function cu(e,t,a,l,s,r,d,h){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.type=r),t!=null||a!=null){if(!(r!=="submit"&&r!=="reset"||t!=null))return;a=a!=null?""+At(a):"",t=t!=null?""+At(t):a,h||t===e.value||(e.value=t),e.defaultValue=t}l=l??s,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=h?e.checked:!!l,e.defaultChecked=!!l,d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.name=d)}function vr(e,t,a){t==="number"&&ki(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function El(e,t,a,l){if(e=e.options,t){t={};for(var s=0;s<a.length;s++)t["$"+a[s]]=!0;for(a=0;a<e.length;a++)s=t.hasOwnProperty("$"+e[a].value),e[a].selected!==s&&(e[a].selected=s),s&&l&&(e[a].defaultSelected=!0)}else{for(a=""+At(a),t=null,s=0;s<e.length;s++){if(e[s].value===a){e[s].selected=!0,l&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function uu(e,t,a){if(t!=null&&(t=""+At(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+At(a):""}function du(e,t,a,l){if(t==null){if(l!=null){if(a!=null)throw Error(u(92));if(Be(l)){if(1<l.length)throw Error(u(93));l=l[0]}a=l}a==null&&(a=""),t=a}a=At(t),e.defaultValue=a,l=e.textContent,l===a&&l!==""&&l!==null&&(e.value=l)}function Tl(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var s0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function fu(e,t,a){var l=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,a):typeof a!="number"||a===0||s0.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function mu(e,t,a){if(t!=null&&typeof t!="object")throw Error(u(62));if(e=e.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var s in t)l=t[s],t.hasOwnProperty(s)&&a[s]!==l&&fu(e,s,l)}else for(var r in t)t.hasOwnProperty(r)&&fu(e,r,t[r])}function br(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var r0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),o0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Li(e){return o0.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var yr=null;function jr(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Rl=null,Dl=null;function hu(e){var t=Nl(e);if(t&&(e=t.stateNode)){var a=e[ut]||null;e:switch(e=t.stateNode,t.type){case"input":if(gr(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+St(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var l=a[t];if(l!==e&&l.form===e.form){var s=l[ut]||null;if(!s)throw Error(u(90));gr(l,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<a.length;t++)l=a[t],l.form===e.form&&ou(l)}break e;case"textarea":uu(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&El(e,!!a.multiple,t,!1)}}}var wr=!1;function pu(e,t,a){if(wr)return e(t,a);wr=!0;try{var l=e(t);return l}finally{if(wr=!1,(Rl!==null||Dl!==null)&&(Ns(),Rl&&(t=Rl,e=Dl,Dl=Rl=null,hu(t),e)))for(t=0;t<e.length;t++)hu(e[t])}}function _n(e,t){var a=e.stateNode;if(a===null)return null;var l=a[ut]||null;if(l===null)return null;a=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(u(231,t,typeof a));return a}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Nr=!1;if(ea)try{var En={};Object.defineProperty(En,"passive",{get:function(){Nr=!0}}),window.addEventListener("test",En,En),window.removeEventListener("test",En,En)}catch{Nr=!1}var ya=null,Ar=null,Bi=null;function xu(){if(Bi)return Bi;var e,t=Ar,a=t.length,l,s="value"in ya?ya.value:ya.textContent,r=s.length;for(e=0;e<a&&t[e]===s[e];e++);var d=a-e;for(l=1;l<=d&&t[a-l]===s[r-l];l++);return Bi=s.slice(e,1<l?1-l:void 0)}function qi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Hi(){return!0}function gu(){return!1}function dt(e){function t(a,l,s,r,d){this._reactName=a,this._targetInst=s,this.type=l,this.nativeEvent=r,this.target=d,this.currentTarget=null;for(var h in e)e.hasOwnProperty(h)&&(a=e[h],this[h]=a?a(r):r[h]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?Hi:gu,this.isPropagationStopped=gu,this}return g(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Hi)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Hi)},persist:function(){},isPersistent:Hi}),t}var Pa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ii=dt(Pa),Tn=g({},Pa,{view:0,detail:0}),c0=dt(Tn),Sr,_r,Rn,Vi=g({},Tn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Rn&&(Rn&&e.type==="mousemove"?(Sr=e.screenX-Rn.screenX,_r=e.screenY-Rn.screenY):_r=Sr=0,Rn=e),Sr)},movementY:function(e){return"movementY"in e?e.movementY:_r}}),vu=dt(Vi),u0=g({},Vi,{dataTransfer:0}),d0=dt(u0),f0=g({},Tn,{relatedTarget:0}),Er=dt(f0),m0=g({},Pa,{animationName:0,elapsedTime:0,pseudoElement:0}),h0=dt(m0),p0=g({},Pa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),x0=dt(p0),g0=g({},Pa,{data:0}),bu=dt(g0),v0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},b0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},y0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function j0(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=y0[e])?!!t[e]:!1}function Tr(){return j0}var w0=g({},Tn,{key:function(e){if(e.key){var t=v0[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=qi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?b0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tr,charCode:function(e){return e.type==="keypress"?qi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),N0=dt(w0),A0=g({},Vi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),yu=dt(A0),S0=g({},Tn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tr}),_0=dt(S0),E0=g({},Pa,{propertyName:0,elapsedTime:0,pseudoElement:0}),T0=dt(E0),R0=g({},Vi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),D0=dt(R0),M0=g({},Pa,{newState:0,oldState:0}),U0=dt(M0),C0=[9,13,27,32],Rr=ea&&"CompositionEvent"in window,Dn=null;ea&&"documentMode"in document&&(Dn=document.documentMode);var O0=ea&&"TextEvent"in window&&!Dn,ju=ea&&(!Rr||Dn&&8<Dn&&11>=Dn),wu=" ",Nu=!1;function Au(e,t){switch(e){case"keyup":return C0.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Su(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ml=!1;function z0(e,t){switch(e){case"compositionend":return Su(t);case"keypress":return t.which!==32?null:(Nu=!0,wu);case"textInput":return e=t.data,e===wu&&Nu?null:e;default:return null}}function G0(e,t){if(Ml)return e==="compositionend"||!Rr&&Au(e,t)?(e=xu(),Bi=Ar=ya=null,Ml=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ju&&t.locale!=="ko"?null:t.data;default:return null}}var k0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _u(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!k0[e.type]:t==="textarea"}function Eu(e,t,a,l){Rl?Dl?Dl.push(l):Dl=[l]:Rl=l,t=Rs(t,"onChange"),0<t.length&&(a=new Ii("onChange","change",null,a,l),e.push({event:a,listeners:t}))}var Mn=null,Un=null;function L0(e){om(e,0)}function Xi(e){var t=Sn(e);if(ou(t))return e}function Tu(e,t){if(e==="change")return t}var Ru=!1;if(ea){var Dr;if(ea){var Mr="oninput"in document;if(!Mr){var Du=document.createElement("div");Du.setAttribute("oninput","return;"),Mr=typeof Du.oninput=="function"}Dr=Mr}else Dr=!1;Ru=Dr&&(!document.documentMode||9<document.documentMode)}function Mu(){Mn&&(Mn.detachEvent("onpropertychange",Uu),Un=Mn=null)}function Uu(e){if(e.propertyName==="value"&&Xi(Un)){var t=[];Eu(t,Un,e,jr(e)),pu(L0,t)}}function B0(e,t,a){e==="focusin"?(Mu(),Mn=t,Un=a,Mn.attachEvent("onpropertychange",Uu)):e==="focusout"&&Mu()}function q0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Xi(Un)}function H0(e,t){if(e==="click")return Xi(t)}function I0(e,t){if(e==="input"||e==="change")return Xi(t)}function V0(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var pt=typeof Object.is=="function"?Object.is:V0;function Cn(e,t){if(pt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),l=Object.keys(t);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var s=a[l];if(!vl.call(t,s)||!pt(e[s],t[s]))return!1}return!0}function Cu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ou(e,t){var a=Cu(e);e=0;for(var l;a;){if(a.nodeType===3){if(l=e+a.textContent.length,e<=t&&l>=t)return{node:a,offset:t-e};e=l}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Cu(a)}}function zu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?zu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gu(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ki(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=ki(e.document)}return t}function Ur(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var X0=ea&&"documentMode"in document&&11>=document.documentMode,Ul=null,Cr=null,On=null,Or=!1;function ku(e,t,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Or||Ul==null||Ul!==ki(l)||(l=Ul,"selectionStart"in l&&Ur(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),On&&Cn(On,l)||(On=l,l=Rs(Cr,"onSelect"),0<l.length&&(t=new Ii("onSelect","select",null,t,a),e.push({event:t,listeners:l}),t.target=Ul)))}function Ja(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var Cl={animationend:Ja("Animation","AnimationEnd"),animationiteration:Ja("Animation","AnimationIteration"),animationstart:Ja("Animation","AnimationStart"),transitionrun:Ja("Transition","TransitionRun"),transitionstart:Ja("Transition","TransitionStart"),transitioncancel:Ja("Transition","TransitionCancel"),transitionend:Ja("Transition","TransitionEnd")},zr={},Lu={};ea&&(Lu=document.createElement("div").style,"AnimationEvent"in window||(delete Cl.animationend.animation,delete Cl.animationiteration.animation,delete Cl.animationstart.animation),"TransitionEvent"in window||delete Cl.transitionend.transition);function Fa(e){if(zr[e])return zr[e];if(!Cl[e])return e;var t=Cl[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Lu)return zr[e]=t[a];return e}var Bu=Fa("animationend"),qu=Fa("animationiteration"),Hu=Fa("animationstart"),Y0=Fa("transitionrun"),$0=Fa("transitionstart"),Z0=Fa("transitioncancel"),Iu=Fa("transitionend"),Vu=new Map,Gr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Gr.push("scrollEnd");function kt(e,t){Vu.set(e,t),Ka(t,[e])}var Xu=new WeakMap;function _t(e,t){if(typeof e=="object"&&e!==null){var a=Xu.get(e);return a!==void 0?a:(t={value:e,source:t,stack:su(t)},Xu.set(e,t),t)}return{value:e,source:t,stack:su(t)}}var Et=[],Ol=0,kr=0;function Yi(){for(var e=Ol,t=kr=Ol=0;t<e;){var a=Et[t];Et[t++]=null;var l=Et[t];Et[t++]=null;var s=Et[t];Et[t++]=null;var r=Et[t];if(Et[t++]=null,l!==null&&s!==null){var d=l.pending;d===null?s.next=s:(s.next=d.next,d.next=s),l.pending=s}r!==0&&Yu(a,s,r)}}function $i(e,t,a,l){Et[Ol++]=e,Et[Ol++]=t,Et[Ol++]=a,Et[Ol++]=l,kr|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Lr(e,t,a,l){return $i(e,t,a,l),Zi(e)}function zl(e,t){return $i(e,null,null,t),Zi(e)}function Yu(e,t,a){e.lanes|=a;var l=e.alternate;l!==null&&(l.lanes|=a);for(var s=!1,r=e.return;r!==null;)r.childLanes|=a,l=r.alternate,l!==null&&(l.childLanes|=a),r.tag===22&&(e=r.stateNode,e===null||e._visibility&1||(s=!0)),e=r,r=r.return;return e.tag===3?(r=e.stateNode,s&&t!==null&&(s=31-it(a),e=r.hiddenUpdates,l=e[s],l===null?e[s]=[t]:l.push(t),t.lane=a|536870912),r):null}function Zi(e){if(50<ii)throw ii=0,Yo=null,Error(u(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Gl={};function Q0(e,t,a,l){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function xt(e,t,a,l){return new Q0(e,t,a,l)}function Br(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ta(e,t){var a=e.alternate;return a===null?(a=xt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function $u(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Qi(e,t,a,l,s,r){var d=0;if(l=e,typeof e=="function")Br(e)&&(d=1);else if(typeof e=="string")d=Pp(e,a,Ee.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case K:return e=xt(31,a,t,s),e.elementType=K,e.lanes=r,e;case k:return Wa(a.children,s,r,t);case z:d=8,s|=24;break;case N:return e=xt(12,a,t,s|2),e.elementType=N,e.lanes=r,e;case L:return e=xt(13,a,t,s),e.elementType=L,e.lanes=r,e;case G:return e=xt(19,a,t,s),e.elementType=G,e.lanes=r,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case T:case I:d=10;break e;case O:d=9;break e;case S:d=11;break e;case B:d=14;break e;case X:d=16,l=null;break e}d=29,a=Error(u(130,e===null?"null":typeof e,"")),l=null}return t=xt(d,a,t,s),t.elementType=e,t.type=l,t.lanes=r,t}function Wa(e,t,a,l){return e=xt(7,e,l,t),e.lanes=a,e}function qr(e,t,a){return e=xt(6,e,null,t),e.lanes=a,e}function Hr(e,t,a){return t=xt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var kl=[],Ll=0,Ki=null,Pi=0,Tt=[],Rt=0,el=null,aa=1,la="";function tl(e,t){kl[Ll++]=Pi,kl[Ll++]=Ki,Ki=e,Pi=t}function Zu(e,t,a){Tt[Rt++]=aa,Tt[Rt++]=la,Tt[Rt++]=el,el=e;var l=aa;e=la;var s=32-it(l)-1;l&=~(1<<s),a+=1;var r=32-it(t)+s;if(30<r){var d=s-s%5;r=(l&(1<<d)-1).toString(32),l>>=d,s-=d,aa=1<<32-it(t)+s|a<<s|l,la=r+e}else aa=1<<r|a<<s|l,la=e}function Ir(e){e.return!==null&&(tl(e,1),Zu(e,1,0))}function Vr(e){for(;e===Ki;)Ki=kl[--Ll],kl[Ll]=null,Pi=kl[--Ll],kl[Ll]=null;for(;e===el;)el=Tt[--Rt],Tt[Rt]=null,la=Tt[--Rt],Tt[Rt]=null,aa=Tt[--Rt],Tt[Rt]=null}var st=null,Oe=null,pe=!1,al=null,Vt=!1,Xr=Error(u(519));function ll(e){var t=Error(u(418,""));throw kn(_t(t,e)),Xr}function Qu(e){var t=e.stateNode,a=e.type,l=e.memoizedProps;switch(t[at]=e,t[ut]=l,a){case"dialog":ce("cancel",t),ce("close",t);break;case"iframe":case"object":case"embed":ce("load",t);break;case"video":case"audio":for(a=0;a<ri.length;a++)ce(ri[a],t);break;case"source":ce("error",t);break;case"img":case"image":case"link":ce("error",t),ce("load",t);break;case"details":ce("toggle",t);break;case"input":ce("invalid",t),cu(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0),Gi(t);break;case"select":ce("invalid",t);break;case"textarea":ce("invalid",t),du(t,l.value,l.defaultValue,l.children),Gi(t)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||l.suppressHydrationWarning===!0||fm(t.textContent,a)?(l.popover!=null&&(ce("beforetoggle",t),ce("toggle",t)),l.onScroll!=null&&ce("scroll",t),l.onScrollEnd!=null&&ce("scrollend",t),l.onClick!=null&&(t.onclick=Ds),t=!0):t=!1,t||ll(e)}function Ku(e){for(st=e.return;st;)switch(st.tag){case 5:case 13:Vt=!1;return;case 27:case 3:Vt=!0;return;default:st=st.return}}function zn(e){if(e!==st)return!1;if(!pe)return Ku(e),pe=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||rc(e.type,e.memoizedProps)),a=!a),a&&Oe&&ll(e),Ku(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(t===0){Oe=Bt(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++;e=e.nextSibling}Oe=null}}else t===27?(t=Oe,Ga(e.type)?(e=dc,dc=null,Oe=e):Oe=t):Oe=st?Bt(e.stateNode.nextSibling):null;return!0}function Gn(){Oe=st=null,pe=!1}function Pu(){var e=al;return e!==null&&(ht===null?ht=e:ht.push.apply(ht,e),al=null),e}function kn(e){al===null?al=[e]:al.push(e)}var Yr=Ie(null),nl=null,na=null;function ja(e,t,a){fe(Yr,t._currentValue),t._currentValue=a}function ia(e){e._currentValue=Yr.current,we(Yr)}function $r(e,t,a){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===a)break;e=e.return}}function Zr(e,t,a,l){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var r=s.dependencies;if(r!==null){var d=s.child;r=r.firstContext;e:for(;r!==null;){var h=r;r=s;for(var b=0;b<t.length;b++)if(h.context===t[b]){r.lanes|=a,h=r.alternate,h!==null&&(h.lanes|=a),$r(r.return,a,e),l||(d=null);break e}r=h.next}}else if(s.tag===18){if(d=s.return,d===null)throw Error(u(341));d.lanes|=a,r=d.alternate,r!==null&&(r.lanes|=a),$r(d,a,e),d=null}else d=s.child;if(d!==null)d.return=s;else for(d=s;d!==null;){if(d===e){d=null;break}if(s=d.sibling,s!==null){s.return=d.return,d=s;break}d=d.return}s=d}}function Ln(e,t,a,l){e=null;for(var s=t,r=!1;s!==null;){if(!r){if((s.flags&524288)!==0)r=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var d=s.alternate;if(d===null)throw Error(u(387));if(d=d.memoizedProps,d!==null){var h=s.type;pt(s.pendingProps.value,d.value)||(e!==null?e.push(h):e=[h])}}else if(s===Ya.current){if(d=s.alternate,d===null)throw Error(u(387));d.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(mi):e=[mi])}s=s.return}e!==null&&Zr(t,e,a,l),t.flags|=262144}function Ji(e){for(e=e.firstContext;e!==null;){if(!pt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function il(e){nl=e,na=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function lt(e){return Ju(nl,e)}function Fi(e,t){return nl===null&&il(e),Ju(e,t)}function Ju(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},na===null){if(e===null)throw Error(u(308));na=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else na=na.next=t;return a}var K0=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},P0=i.unstable_scheduleCallback,J0=i.unstable_NormalPriority,Xe={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Qr(){return{controller:new K0,data:new Map,refCount:0}}function Bn(e){e.refCount--,e.refCount===0&&P0(J0,function(){e.controller.abort()})}var qn=null,Kr=0,Bl=0,ql=null;function F0(e,t){if(qn===null){var a=qn=[];Kr=0,Bl=Fo(),ql={status:"pending",value:void 0,then:function(l){a.push(l)}}}return Kr++,t.then(Fu,Fu),t}function Fu(){if(--Kr===0&&qn!==null){ql!==null&&(ql.status="fulfilled");var e=qn;qn=null,Bl=0,ql=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function W0(e,t){var a=[],l={status:"pending",value:null,reason:null,then:function(s){a.push(s)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var s=0;s<a.length;s++)(0,a[s])(t)},function(s){for(l.status="rejected",l.reason=s,s=0;s<a.length;s++)(0,a[s])(void 0)}),l}var Wu=M.S;M.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&F0(e,t),Wu!==null&&Wu(e,t)};var sl=Ie(null);function Pr(){var e=sl.current;return e!==null?e:Ae.pooledCache}function Wi(e,t){t===null?fe(sl,sl.current):fe(sl,t.pool)}function ed(){var e=Pr();return e===null?null:{parent:Xe._currentValue,pool:e}}var Hn=Error(u(460)),td=Error(u(474)),es=Error(u(542)),Jr={then:function(){}};function ad(e){return e=e.status,e==="fulfilled"||e==="rejected"}function ts(){}function ld(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(ts,ts),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,id(e),e;default:if(typeof t.status=="string")t.then(ts,ts);else{if(e=Ae,e!==null&&100<e.shellSuspendCounter)throw Error(u(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=l}},function(l){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,id(e),e}throw In=t,Hn}}var In=null;function nd(){if(In===null)throw Error(u(459));var e=In;return In=null,e}function id(e){if(e===Hn||e===es)throw Error(u(483))}var wa=!1;function Fr(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Wr(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Na(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Aa(e,t,a){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(xe&2)!==0){var s=l.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),l.pending=t,t=Zi(e),Yu(e,null,a),t}return $i(e,l,t,a),Zi(e)}function Vn(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Fc(e,a)}}function eo(e,t){var a=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var s=null,r=null;if(a=a.firstBaseUpdate,a!==null){do{var d={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};r===null?s=r=d:r=r.next=d,a=a.next}while(a!==null);r===null?s=r=t:r=r.next=t}else s=r=t;a={baseState:l.baseState,firstBaseUpdate:s,lastBaseUpdate:r,shared:l.shared,callbacks:l.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var to=!1;function Xn(){if(to){var e=ql;if(e!==null)throw e}}function Yn(e,t,a,l){to=!1;var s=e.updateQueue;wa=!1;var r=s.firstBaseUpdate,d=s.lastBaseUpdate,h=s.shared.pending;if(h!==null){s.shared.pending=null;var b=h,D=b.next;b.next=null,d===null?r=D:d.next=D,d=b;var H=e.alternate;H!==null&&(H=H.updateQueue,h=H.lastBaseUpdate,h!==d&&(h===null?H.firstBaseUpdate=D:h.next=D,H.lastBaseUpdate=b))}if(r!==null){var $=s.baseState;d=0,H=D=b=null,h=r;do{var U=h.lane&-536870913,C=U!==h.lane;if(C?(ue&U)===U:(l&U)===U){U!==0&&U===Bl&&(to=!0),H!==null&&(H=H.next={lane:0,tag:h.tag,payload:h.payload,callback:null,next:null});e:{var ne=e,ae=h;U=t;var je=a;switch(ae.tag){case 1:if(ne=ae.payload,typeof ne=="function"){$=ne.call(je,$,U);break e}$=ne;break e;case 3:ne.flags=ne.flags&-65537|128;case 0:if(ne=ae.payload,U=typeof ne=="function"?ne.call(je,$,U):ne,U==null)break e;$=g({},$,U);break e;case 2:wa=!0}}U=h.callback,U!==null&&(e.flags|=64,C&&(e.flags|=8192),C=s.callbacks,C===null?s.callbacks=[U]:C.push(U))}else C={lane:U,tag:h.tag,payload:h.payload,callback:h.callback,next:null},H===null?(D=H=C,b=$):H=H.next=C,d|=U;if(h=h.next,h===null){if(h=s.shared.pending,h===null)break;C=h,h=C.next,C.next=null,s.lastBaseUpdate=C,s.shared.pending=null}}while(!0);H===null&&(b=$),s.baseState=b,s.firstBaseUpdate=D,s.lastBaseUpdate=H,r===null&&(s.shared.lanes=0),Ua|=d,e.lanes=d,e.memoizedState=$}}function sd(e,t){if(typeof e!="function")throw Error(u(191,e));e.call(t)}function rd(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)sd(a[e],t)}var Hl=Ie(null),as=Ie(0);function od(e,t){e=fa,fe(as,e),fe(Hl,t),fa=e|t.baseLanes}function ao(){fe(as,fa),fe(Hl,Hl.current)}function lo(){fa=as.current,we(Hl),we(as)}var Sa=0,se=null,be=null,qe=null,ls=!1,Il=!1,rl=!1,ns=0,$n=0,Vl=null,ep=0;function Ge(){throw Error(u(321))}function no(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!pt(e[a],t[a]))return!1;return!0}function io(e,t,a,l,s,r){return Sa=r,se=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,M.H=e===null||e.memoizedState===null?Yd:$d,rl=!1,r=a(l,s),rl=!1,Il&&(r=ud(t,a,l,s)),cd(e),r}function cd(e){M.H=us;var t=be!==null&&be.next!==null;if(Sa=0,qe=be=se=null,ls=!1,$n=0,Vl=null,t)throw Error(u(300));e===null||Qe||(e=e.dependencies,e!==null&&Ji(e)&&(Qe=!0))}function ud(e,t,a,l){se=e;var s=0;do{if(Il&&(Vl=null),$n=0,Il=!1,25<=s)throw Error(u(301));if(s+=1,qe=be=null,e.updateQueue!=null){var r=e.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}M.H=rp,r=t(a,l)}while(Il);return r}function tp(){var e=M.H,t=e.useState()[0];return t=typeof t.then=="function"?Zn(t):t,e=e.useState()[0],(be!==null?be.memoizedState:null)!==e&&(se.flags|=1024),t}function so(){var e=ns!==0;return ns=0,e}function ro(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function oo(e){if(ls){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ls=!1}Sa=0,qe=be=se=null,Il=!1,$n=ns=0,Vl=null}function ft(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qe===null?se.memoizedState=qe=e:qe=qe.next=e,qe}function He(){if(be===null){var e=se.alternate;e=e!==null?e.memoizedState:null}else e=be.next;var t=qe===null?se.memoizedState:qe.next;if(t!==null)qe=t,be=e;else{if(e===null)throw se.alternate===null?Error(u(467)):Error(u(310));be=e,e={memoizedState:be.memoizedState,baseState:be.baseState,baseQueue:be.baseQueue,queue:be.queue,next:null},qe===null?se.memoizedState=qe=e:qe=qe.next=e}return qe}function co(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Zn(e){var t=$n;return $n+=1,Vl===null&&(Vl=[]),e=ld(Vl,e,t),t=se,(qe===null?t.memoizedState:qe.next)===null&&(t=t.alternate,M.H=t===null||t.memoizedState===null?Yd:$d),e}function is(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Zn(e);if(e.$$typeof===I)return lt(e)}throw Error(u(438,String(e)))}function uo(e){var t=null,a=se.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var l=se.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=co(),se.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),l=0;l<e;l++)a[l]=te;return t.index++,a}function sa(e,t){return typeof t=="function"?t(e):t}function ss(e){var t=He();return fo(t,be,e)}function fo(e,t,a){var l=e.queue;if(l===null)throw Error(u(311));l.lastRenderedReducer=a;var s=e.baseQueue,r=l.pending;if(r!==null){if(s!==null){var d=s.next;s.next=r.next,r.next=d}t.baseQueue=s=r,l.pending=null}if(r=e.baseState,s===null)e.memoizedState=r;else{t=s.next;var h=d=null,b=null,D=t,H=!1;do{var $=D.lane&-536870913;if($!==D.lane?(ue&$)===$:(Sa&$)===$){var U=D.revertLane;if(U===0)b!==null&&(b=b.next={lane:0,revertLane:0,action:D.action,hasEagerState:D.hasEagerState,eagerState:D.eagerState,next:null}),$===Bl&&(H=!0);else if((Sa&U)===U){D=D.next,U===Bl&&(H=!0);continue}else $={lane:0,revertLane:D.revertLane,action:D.action,hasEagerState:D.hasEagerState,eagerState:D.eagerState,next:null},b===null?(h=b=$,d=r):b=b.next=$,se.lanes|=U,Ua|=U;$=D.action,rl&&a(r,$),r=D.hasEagerState?D.eagerState:a(r,$)}else U={lane:$,revertLane:D.revertLane,action:D.action,hasEagerState:D.hasEagerState,eagerState:D.eagerState,next:null},b===null?(h=b=U,d=r):b=b.next=U,se.lanes|=$,Ua|=$;D=D.next}while(D!==null&&D!==t);if(b===null?d=r:b.next=h,!pt(r,e.memoizedState)&&(Qe=!0,H&&(a=ql,a!==null)))throw a;e.memoizedState=r,e.baseState=d,e.baseQueue=b,l.lastRenderedState=r}return s===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function mo(e){var t=He(),a=t.queue;if(a===null)throw Error(u(311));a.lastRenderedReducer=e;var l=a.dispatch,s=a.pending,r=t.memoizedState;if(s!==null){a.pending=null;var d=s=s.next;do r=e(r,d.action),d=d.next;while(d!==s);pt(r,t.memoizedState)||(Qe=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),a.lastRenderedState=r}return[r,l]}function dd(e,t,a){var l=se,s=He(),r=pe;if(r){if(a===void 0)throw Error(u(407));a=a()}else a=t();var d=!pt((be||s).memoizedState,a);d&&(s.memoizedState=a,Qe=!0),s=s.queue;var h=hd.bind(null,l,s,e);if(Qn(2048,8,h,[e]),s.getSnapshot!==t||d||qe!==null&&qe.memoizedState.tag&1){if(l.flags|=2048,Xl(9,rs(),md.bind(null,l,s,a,t),null),Ae===null)throw Error(u(349));r||(Sa&124)!==0||fd(l,t,a)}return a}function fd(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=se.updateQueue,t===null?(t=co(),se.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function md(e,t,a,l){t.value=a,t.getSnapshot=l,pd(t)&&xd(e)}function hd(e,t,a){return a(function(){pd(t)&&xd(e)})}function pd(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!pt(e,a)}catch{return!0}}function xd(e){var t=zl(e,2);t!==null&&jt(t,e,2)}function ho(e){var t=ft();if(typeof e=="function"){var a=e;if(e=a(),rl){Gt(!0);try{a()}finally{Gt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:sa,lastRenderedState:e},t}function gd(e,t,a,l){return e.baseState=a,fo(e,be,typeof l=="function"?l:sa)}function ap(e,t,a,l,s){if(cs(e))throw Error(u(485));if(e=t.action,e!==null){var r={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(d){r.listeners.push(d)}};M.T!==null?a(!0):r.isTransition=!1,l(r),a=t.pending,a===null?(r.next=t.pending=r,vd(t,r)):(r.next=a.next,t.pending=a.next=r)}}function vd(e,t){var a=t.action,l=t.payload,s=e.state;if(t.isTransition){var r=M.T,d={};M.T=d;try{var h=a(s,l),b=M.S;b!==null&&b(d,h),bd(e,t,h)}catch(D){po(e,t,D)}finally{M.T=r}}else try{r=a(s,l),bd(e,t,r)}catch(D){po(e,t,D)}}function bd(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){yd(e,t,l)},function(l){return po(e,t,l)}):yd(e,t,a)}function yd(e,t,a){t.status="fulfilled",t.value=a,jd(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,vd(e,a)))}function po(e,t,a){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=a,jd(t),t=t.next;while(t!==l)}e.action=null}function jd(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function wd(e,t){return t}function Nd(e,t){if(pe){var a=Ae.formState;if(a!==null){e:{var l=se;if(pe){if(Oe){t:{for(var s=Oe,r=Vt;s.nodeType!==8;){if(!r){s=null;break t}if(s=Bt(s.nextSibling),s===null){s=null;break t}}r=s.data,s=r==="F!"||r==="F"?s:null}if(s){Oe=Bt(s.nextSibling),l=s.data==="F!";break e}}ll(l)}l=!1}l&&(t=a[0])}}return a=ft(),a.memoizedState=a.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:wd,lastRenderedState:t},a.queue=l,a=Id.bind(null,se,l),l.dispatch=a,l=ho(!1),r=yo.bind(null,se,!1,l.queue),l=ft(),s={state:t,dispatch:null,action:e,pending:null},l.queue=s,a=ap.bind(null,se,s,r,a),s.dispatch=a,l.memoizedState=e,[t,a,!1]}function Ad(e){var t=He();return Sd(t,be,e)}function Sd(e,t,a){if(t=fo(e,t,wd)[0],e=ss(sa)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=Zn(t)}catch(d){throw d===Hn?es:d}else l=t;t=He();var s=t.queue,r=s.dispatch;return a!==t.memoizedState&&(se.flags|=2048,Xl(9,rs(),lp.bind(null,s,a),null)),[l,r,e]}function lp(e,t){e.action=t}function _d(e){var t=He(),a=be;if(a!==null)return Sd(t,a,e);He(),t=t.memoizedState,a=He();var l=a.queue.dispatch;return a.memoizedState=e,[t,l,!1]}function Xl(e,t,a,l){return e={tag:e,create:a,deps:l,inst:t,next:null},t=se.updateQueue,t===null&&(t=co(),se.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(l=a.next,a.next=e,e.next=l,t.lastEffect=e),e}function rs(){return{destroy:void 0,resource:void 0}}function Ed(){return He().memoizedState}function os(e,t,a,l){var s=ft();l=l===void 0?null:l,se.flags|=e,s.memoizedState=Xl(1|t,rs(),a,l)}function Qn(e,t,a,l){var s=He();l=l===void 0?null:l;var r=s.memoizedState.inst;be!==null&&l!==null&&no(l,be.memoizedState.deps)?s.memoizedState=Xl(t,r,a,l):(se.flags|=e,s.memoizedState=Xl(1|t,r,a,l))}function Td(e,t){os(8390656,8,e,t)}function Rd(e,t){Qn(2048,8,e,t)}function Dd(e,t){return Qn(4,2,e,t)}function Md(e,t){return Qn(4,4,e,t)}function Ud(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Cd(e,t,a){a=a!=null?a.concat([e]):null,Qn(4,4,Ud.bind(null,t,e),a)}function xo(){}function Od(e,t){var a=He();t=t===void 0?null:t;var l=a.memoizedState;return t!==null&&no(t,l[1])?l[0]:(a.memoizedState=[e,t],e)}function zd(e,t){var a=He();t=t===void 0?null:t;var l=a.memoizedState;if(t!==null&&no(t,l[1]))return l[0];if(l=e(),rl){Gt(!0);try{e()}finally{Gt(!1)}}return a.memoizedState=[l,t],l}function go(e,t,a){return a===void 0||(Sa&1073741824)!==0?e.memoizedState=t:(e.memoizedState=a,e=Bf(),se.lanes|=e,Ua|=e,a)}function Gd(e,t,a,l){return pt(a,t)?a:Hl.current!==null?(e=go(e,a,l),pt(e,t)||(Qe=!0),e):(Sa&42)===0?(Qe=!0,e.memoizedState=a):(e=Bf(),se.lanes|=e,Ua|=e,t)}function kd(e,t,a,l,s){var r=Q.p;Q.p=r!==0&&8>r?r:8;var d=M.T,h={};M.T=h,yo(e,!1,t,a);try{var b=s(),D=M.S;if(D!==null&&D(h,b),b!==null&&typeof b=="object"&&typeof b.then=="function"){var H=W0(b,l);Kn(e,t,H,yt(e))}else Kn(e,t,l,yt(e))}catch($){Kn(e,t,{then:function(){},status:"rejected",reason:$},yt())}finally{Q.p=r,M.T=d}}function np(){}function vo(e,t,a,l){if(e.tag!==5)throw Error(u(476));var s=Ld(e).queue;kd(e,s,t,P,a===null?np:function(){return Bd(e),a(l)})}function Ld(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:P,baseState:P,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:sa,lastRenderedState:P},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:sa,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Bd(e){var t=Ld(e).next.queue;Kn(e,t,{},yt())}function bo(){return lt(mi)}function qd(){return He().memoizedState}function Hd(){return He().memoizedState}function ip(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=yt();e=Na(a);var l=Aa(t,e,a);l!==null&&(jt(l,t,a),Vn(l,t,a)),t={cache:Qr()},e.payload=t;return}t=t.return}}function sp(e,t,a){var l=yt();a={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},cs(e)?Vd(t,a):(a=Lr(e,t,a,l),a!==null&&(jt(a,e,l),Xd(a,t,l)))}function Id(e,t,a){var l=yt();Kn(e,t,a,l)}function Kn(e,t,a,l){var s={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(cs(e))Vd(t,s);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var d=t.lastRenderedState,h=r(d,a);if(s.hasEagerState=!0,s.eagerState=h,pt(h,d))return $i(e,t,s,0),Ae===null&&Yi(),!1}catch{}finally{}if(a=Lr(e,t,s,l),a!==null)return jt(a,e,l),Xd(a,t,l),!0}return!1}function yo(e,t,a,l){if(l={lane:2,revertLane:Fo(),action:l,hasEagerState:!1,eagerState:null,next:null},cs(e)){if(t)throw Error(u(479))}else t=Lr(e,a,l,2),t!==null&&jt(t,e,2)}function cs(e){var t=e.alternate;return e===se||t!==null&&t===se}function Vd(e,t){Il=ls=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Xd(e,t,a){if((a&4194048)!==0){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Fc(e,a)}}var us={readContext:lt,use:is,useCallback:Ge,useContext:Ge,useEffect:Ge,useImperativeHandle:Ge,useLayoutEffect:Ge,useInsertionEffect:Ge,useMemo:Ge,useReducer:Ge,useRef:Ge,useState:Ge,useDebugValue:Ge,useDeferredValue:Ge,useTransition:Ge,useSyncExternalStore:Ge,useId:Ge,useHostTransitionStatus:Ge,useFormState:Ge,useActionState:Ge,useOptimistic:Ge,useMemoCache:Ge,useCacheRefresh:Ge},Yd={readContext:lt,use:is,useCallback:function(e,t){return ft().memoizedState=[e,t===void 0?null:t],e},useContext:lt,useEffect:Td,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,os(4194308,4,Ud.bind(null,t,e),a)},useLayoutEffect:function(e,t){return os(4194308,4,e,t)},useInsertionEffect:function(e,t){os(4,2,e,t)},useMemo:function(e,t){var a=ft();t=t===void 0?null:t;var l=e();if(rl){Gt(!0);try{e()}finally{Gt(!1)}}return a.memoizedState=[l,t],l},useReducer:function(e,t,a){var l=ft();if(a!==void 0){var s=a(t);if(rl){Gt(!0);try{a(t)}finally{Gt(!1)}}}else s=t;return l.memoizedState=l.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},l.queue=e,e=e.dispatch=sp.bind(null,se,e),[l.memoizedState,e]},useRef:function(e){var t=ft();return e={current:e},t.memoizedState=e},useState:function(e){e=ho(e);var t=e.queue,a=Id.bind(null,se,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:xo,useDeferredValue:function(e,t){var a=ft();return go(a,e,t)},useTransition:function(){var e=ho(!1);return e=kd.bind(null,se,e.queue,!0,!1),ft().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var l=se,s=ft();if(pe){if(a===void 0)throw Error(u(407));a=a()}else{if(a=t(),Ae===null)throw Error(u(349));(ue&124)!==0||fd(l,t,a)}s.memoizedState=a;var r={value:a,getSnapshot:t};return s.queue=r,Td(hd.bind(null,l,r,e),[e]),l.flags|=2048,Xl(9,rs(),md.bind(null,l,r,a,t),null),a},useId:function(){var e=ft(),t=Ae.identifierPrefix;if(pe){var a=la,l=aa;a=(l&~(1<<32-it(l)-1)).toString(32)+a,t="«"+t+"R"+a,a=ns++,0<a&&(t+="H"+a.toString(32)),t+="»"}else a=ep++,t="«"+t+"r"+a.toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:bo,useFormState:Nd,useActionState:Nd,useOptimistic:function(e){var t=ft();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=yo.bind(null,se,!0,a),a.dispatch=t,[e,t]},useMemoCache:uo,useCacheRefresh:function(){return ft().memoizedState=ip.bind(null,se)}},$d={readContext:lt,use:is,useCallback:Od,useContext:lt,useEffect:Rd,useImperativeHandle:Cd,useInsertionEffect:Dd,useLayoutEffect:Md,useMemo:zd,useReducer:ss,useRef:Ed,useState:function(){return ss(sa)},useDebugValue:xo,useDeferredValue:function(e,t){var a=He();return Gd(a,be.memoizedState,e,t)},useTransition:function(){var e=ss(sa)[0],t=He().memoizedState;return[typeof e=="boolean"?e:Zn(e),t]},useSyncExternalStore:dd,useId:qd,useHostTransitionStatus:bo,useFormState:Ad,useActionState:Ad,useOptimistic:function(e,t){var a=He();return gd(a,be,e,t)},useMemoCache:uo,useCacheRefresh:Hd},rp={readContext:lt,use:is,useCallback:Od,useContext:lt,useEffect:Rd,useImperativeHandle:Cd,useInsertionEffect:Dd,useLayoutEffect:Md,useMemo:zd,useReducer:mo,useRef:Ed,useState:function(){return mo(sa)},useDebugValue:xo,useDeferredValue:function(e,t){var a=He();return be===null?go(a,e,t):Gd(a,be.memoizedState,e,t)},useTransition:function(){var e=mo(sa)[0],t=He().memoizedState;return[typeof e=="boolean"?e:Zn(e),t]},useSyncExternalStore:dd,useId:qd,useHostTransitionStatus:bo,useFormState:_d,useActionState:_d,useOptimistic:function(e,t){var a=He();return be!==null?gd(a,be,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:uo,useCacheRefresh:Hd},Yl=null,Pn=0;function ds(e){var t=Pn;return Pn+=1,Yl===null&&(Yl=[]),ld(Yl,e,t)}function Jn(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function fs(e,t){throw t.$$typeof===E?Error(u(525)):(e=Object.prototype.toString.call(t),Error(u(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Zd(e){var t=e._init;return t(e._payload)}function Qd(e){function t(_,w){if(e){var R=_.deletions;R===null?(_.deletions=[w],_.flags|=16):R.push(w)}}function a(_,w){if(!e)return null;for(;w!==null;)t(_,w),w=w.sibling;return null}function l(_){for(var w=new Map;_!==null;)_.key!==null?w.set(_.key,_):w.set(_.index,_),_=_.sibling;return w}function s(_,w){return _=ta(_,w),_.index=0,_.sibling=null,_}function r(_,w,R){return _.index=R,e?(R=_.alternate,R!==null?(R=R.index,R<w?(_.flags|=67108866,w):R):(_.flags|=67108866,w)):(_.flags|=1048576,w)}function d(_){return e&&_.alternate===null&&(_.flags|=67108866),_}function h(_,w,R,Y){return w===null||w.tag!==6?(w=qr(R,_.mode,Y),w.return=_,w):(w=s(w,R),w.return=_,w)}function b(_,w,R,Y){var F=R.type;return F===k?H(_,w,R.props.children,Y,R.key):w!==null&&(w.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===X&&Zd(F)===w.type)?(w=s(w,R.props),Jn(w,R),w.return=_,w):(w=Qi(R.type,R.key,R.props,null,_.mode,Y),Jn(w,R),w.return=_,w)}function D(_,w,R,Y){return w===null||w.tag!==4||w.stateNode.containerInfo!==R.containerInfo||w.stateNode.implementation!==R.implementation?(w=Hr(R,_.mode,Y),w.return=_,w):(w=s(w,R.children||[]),w.return=_,w)}function H(_,w,R,Y,F){return w===null||w.tag!==7?(w=Wa(R,_.mode,Y,F),w.return=_,w):(w=s(w,R),w.return=_,w)}function $(_,w,R){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return w=qr(""+w,_.mode,R),w.return=_,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case A:return R=Qi(w.type,w.key,w.props,null,_.mode,R),Jn(R,w),R.return=_,R;case Z:return w=Hr(w,_.mode,R),w.return=_,w;case X:var Y=w._init;return w=Y(w._payload),$(_,w,R)}if(Be(w)||ve(w))return w=Wa(w,_.mode,R,null),w.return=_,w;if(typeof w.then=="function")return $(_,ds(w),R);if(w.$$typeof===I)return $(_,Fi(_,w),R);fs(_,w)}return null}function U(_,w,R,Y){var F=w!==null?w.key:null;if(typeof R=="string"&&R!==""||typeof R=="number"||typeof R=="bigint")return F!==null?null:h(_,w,""+R,Y);if(typeof R=="object"&&R!==null){switch(R.$$typeof){case A:return R.key===F?b(_,w,R,Y):null;case Z:return R.key===F?D(_,w,R,Y):null;case X:return F=R._init,R=F(R._payload),U(_,w,R,Y)}if(Be(R)||ve(R))return F!==null?null:H(_,w,R,Y,null);if(typeof R.then=="function")return U(_,w,ds(R),Y);if(R.$$typeof===I)return U(_,w,Fi(_,R),Y);fs(_,R)}return null}function C(_,w,R,Y,F){if(typeof Y=="string"&&Y!==""||typeof Y=="number"||typeof Y=="bigint")return _=_.get(R)||null,h(w,_,""+Y,F);if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case A:return _=_.get(Y.key===null?R:Y.key)||null,b(w,_,Y,F);case Z:return _=_.get(Y.key===null?R:Y.key)||null,D(w,_,Y,F);case X:var re=Y._init;return Y=re(Y._payload),C(_,w,R,Y,F)}if(Be(Y)||ve(Y))return _=_.get(R)||null,H(w,_,Y,F,null);if(typeof Y.then=="function")return C(_,w,R,ds(Y),F);if(Y.$$typeof===I)return C(_,w,R,Fi(w,Y),F);fs(w,Y)}return null}function ne(_,w,R,Y){for(var F=null,re=null,W=w,le=w=0,Pe=null;W!==null&&le<R.length;le++){W.index>le?(Pe=W,W=null):Pe=W.sibling;var me=U(_,W,R[le],Y);if(me===null){W===null&&(W=Pe);break}e&&W&&me.alternate===null&&t(_,W),w=r(me,w,le),re===null?F=me:re.sibling=me,re=me,W=Pe}if(le===R.length)return a(_,W),pe&&tl(_,le),F;if(W===null){for(;le<R.length;le++)W=$(_,R[le],Y),W!==null&&(w=r(W,w,le),re===null?F=W:re.sibling=W,re=W);return pe&&tl(_,le),F}for(W=l(W);le<R.length;le++)Pe=C(W,_,le,R[le],Y),Pe!==null&&(e&&Pe.alternate!==null&&W.delete(Pe.key===null?le:Pe.key),w=r(Pe,w,le),re===null?F=Pe:re.sibling=Pe,re=Pe);return e&&W.forEach(function(Ha){return t(_,Ha)}),pe&&tl(_,le),F}function ae(_,w,R,Y){if(R==null)throw Error(u(151));for(var F=null,re=null,W=w,le=w=0,Pe=null,me=R.next();W!==null&&!me.done;le++,me=R.next()){W.index>le?(Pe=W,W=null):Pe=W.sibling;var Ha=U(_,W,me.value,Y);if(Ha===null){W===null&&(W=Pe);break}e&&W&&Ha.alternate===null&&t(_,W),w=r(Ha,w,le),re===null?F=Ha:re.sibling=Ha,re=Ha,W=Pe}if(me.done)return a(_,W),pe&&tl(_,le),F;if(W===null){for(;!me.done;le++,me=R.next())me=$(_,me.value,Y),me!==null&&(w=r(me,w,le),re===null?F=me:re.sibling=me,re=me);return pe&&tl(_,le),F}for(W=l(W);!me.done;le++,me=R.next())me=C(W,_,le,me.value,Y),me!==null&&(e&&me.alternate!==null&&W.delete(me.key===null?le:me.key),w=r(me,w,le),re===null?F=me:re.sibling=me,re=me);return e&&W.forEach(function(ox){return t(_,ox)}),pe&&tl(_,le),F}function je(_,w,R,Y){if(typeof R=="object"&&R!==null&&R.type===k&&R.key===null&&(R=R.props.children),typeof R=="object"&&R!==null){switch(R.$$typeof){case A:e:{for(var F=R.key;w!==null;){if(w.key===F){if(F=R.type,F===k){if(w.tag===7){a(_,w.sibling),Y=s(w,R.props.children),Y.return=_,_=Y;break e}}else if(w.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===X&&Zd(F)===w.type){a(_,w.sibling),Y=s(w,R.props),Jn(Y,R),Y.return=_,_=Y;break e}a(_,w);break}else t(_,w);w=w.sibling}R.type===k?(Y=Wa(R.props.children,_.mode,Y,R.key),Y.return=_,_=Y):(Y=Qi(R.type,R.key,R.props,null,_.mode,Y),Jn(Y,R),Y.return=_,_=Y)}return d(_);case Z:e:{for(F=R.key;w!==null;){if(w.key===F)if(w.tag===4&&w.stateNode.containerInfo===R.containerInfo&&w.stateNode.implementation===R.implementation){a(_,w.sibling),Y=s(w,R.children||[]),Y.return=_,_=Y;break e}else{a(_,w);break}else t(_,w);w=w.sibling}Y=Hr(R,_.mode,Y),Y.return=_,_=Y}return d(_);case X:return F=R._init,R=F(R._payload),je(_,w,R,Y)}if(Be(R))return ne(_,w,R,Y);if(ve(R)){if(F=ve(R),typeof F!="function")throw Error(u(150));return R=F.call(R),ae(_,w,R,Y)}if(typeof R.then=="function")return je(_,w,ds(R),Y);if(R.$$typeof===I)return je(_,w,Fi(_,R),Y);fs(_,R)}return typeof R=="string"&&R!==""||typeof R=="number"||typeof R=="bigint"?(R=""+R,w!==null&&w.tag===6?(a(_,w.sibling),Y=s(w,R),Y.return=_,_=Y):(a(_,w),Y=qr(R,_.mode,Y),Y.return=_,_=Y),d(_)):a(_,w)}return function(_,w,R,Y){try{Pn=0;var F=je(_,w,R,Y);return Yl=null,F}catch(W){if(W===Hn||W===es)throw W;var re=xt(29,W,null,_.mode);return re.lanes=Y,re.return=_,re}finally{}}}var $l=Qd(!0),Kd=Qd(!1),Dt=Ie(null),Xt=null;function _a(e){var t=e.alternate;fe(Ye,Ye.current&1),fe(Dt,e),Xt===null&&(t===null||Hl.current!==null||t.memoizedState!==null)&&(Xt=e)}function Pd(e){if(e.tag===22){if(fe(Ye,Ye.current),fe(Dt,e),Xt===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Xt=e)}}else Ea()}function Ea(){fe(Ye,Ye.current),fe(Dt,Dt.current)}function ra(e){we(Dt),Xt===e&&(Xt=null),we(Ye)}var Ye=Ie(0);function ms(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||uc(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function jo(e,t,a,l){t=e.memoizedState,a=a(l,t),a=a==null?t:g({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var wo={enqueueSetState:function(e,t,a){e=e._reactInternals;var l=yt(),s=Na(l);s.payload=t,a!=null&&(s.callback=a),t=Aa(e,s,l),t!==null&&(jt(t,e,l),Vn(t,e,l))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var l=yt(),s=Na(l);s.tag=1,s.payload=t,a!=null&&(s.callback=a),t=Aa(e,s,l),t!==null&&(jt(t,e,l),Vn(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=yt(),l=Na(a);l.tag=2,t!=null&&(l.callback=t),t=Aa(e,l,a),t!==null&&(jt(t,e,a),Vn(t,e,a))}};function Jd(e,t,a,l,s,r,d){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,r,d):t.prototype&&t.prototype.isPureReactComponent?!Cn(a,l)||!Cn(s,r):!0}function Fd(e,t,a,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,l),t.state!==e&&wo.enqueueReplaceState(t,t.state,null)}function ol(e,t){var a=t;if("ref"in t){a={};for(var l in t)l!=="ref"&&(a[l]=t[l])}if(e=e.defaultProps){a===t&&(a=g({},a));for(var s in e)a[s]===void 0&&(a[s]=e[s])}return a}var hs=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Wd(e){hs(e)}function ef(e){console.error(e)}function tf(e){hs(e)}function ps(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function af(e,t,a){try{var l=e.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function No(e,t,a){return a=Na(a),a.tag=3,a.payload={element:null},a.callback=function(){ps(e,t)},a}function lf(e){return e=Na(e),e.tag=3,e}function nf(e,t,a,l){var s=a.type.getDerivedStateFromError;if(typeof s=="function"){var r=l.value;e.payload=function(){return s(r)},e.callback=function(){af(t,a,l)}}var d=a.stateNode;d!==null&&typeof d.componentDidCatch=="function"&&(e.callback=function(){af(t,a,l),typeof s!="function"&&(Ca===null?Ca=new Set([this]):Ca.add(this));var h=l.stack;this.componentDidCatch(l.value,{componentStack:h!==null?h:""})})}function op(e,t,a,l,s){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=a.alternate,t!==null&&Ln(t,a,s,!0),a=Dt.current,a!==null){switch(a.tag){case 13:return Xt===null?Zo():a.alternate===null&&ze===0&&(ze=3),a.flags&=-257,a.flags|=65536,a.lanes=s,l===Jr?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([l]):t.add(l),Ko(e,l,s)),!1;case 22:return a.flags|=65536,l===Jr?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([l]):a.add(l)),Ko(e,l,s)),!1}throw Error(u(435,a.tag))}return Ko(e,l,s),Zo(),!1}if(pe)return t=Dt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,l!==Xr&&(e=Error(u(422),{cause:l}),kn(_t(e,a)))):(l!==Xr&&(t=Error(u(423),{cause:l}),kn(_t(t,a))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,l=_t(l,a),s=No(e.stateNode,l,s),eo(e,s),ze!==4&&(ze=2)),!1;var r=Error(u(520),{cause:l});if(r=_t(r,a),ni===null?ni=[r]:ni.push(r),ze!==4&&(ze=2),t===null)return!0;l=_t(l,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=s&-s,a.lanes|=e,e=No(a.stateNode,l,e),eo(a,e),!1;case 1:if(t=a.type,r=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(Ca===null||!Ca.has(r))))return a.flags|=65536,s&=-s,a.lanes|=s,s=lf(s),nf(s,e,a,l),eo(a,s),!1}a=a.return}while(a!==null);return!1}var sf=Error(u(461)),Qe=!1;function Fe(e,t,a,l){t.child=e===null?Kd(t,null,a,l):$l(t,e.child,a,l)}function rf(e,t,a,l,s){a=a.render;var r=t.ref;if("ref"in l){var d={};for(var h in l)h!=="ref"&&(d[h]=l[h])}else d=l;return il(t),l=io(e,t,a,d,r,s),h=so(),e!==null&&!Qe?(ro(e,t,s),oa(e,t,s)):(pe&&h&&Ir(t),t.flags|=1,Fe(e,t,l,s),t.child)}function of(e,t,a,l,s){if(e===null){var r=a.type;return typeof r=="function"&&!Br(r)&&r.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=r,cf(e,t,r,l,s)):(e=Qi(a.type,null,l,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!Mo(e,s)){var d=r.memoizedProps;if(a=a.compare,a=a!==null?a:Cn,a(d,l)&&e.ref===t.ref)return oa(e,t,s)}return t.flags|=1,e=ta(r,l),e.ref=t.ref,e.return=t,t.child=e}function cf(e,t,a,l,s){if(e!==null){var r=e.memoizedProps;if(Cn(r,l)&&e.ref===t.ref)if(Qe=!1,t.pendingProps=l=r,Mo(e,s))(e.flags&131072)!==0&&(Qe=!0);else return t.lanes=e.lanes,oa(e,t,s)}return Ao(e,t,a,l,s)}function uf(e,t,a){var l=t.pendingProps,s=l.children,r=e!==null?e.memoizedState:null;if(l.mode==="hidden"){if((t.flags&128)!==0){if(l=r!==null?r.baseLanes|a:a,e!==null){for(s=t.child=e.child,r=0;s!==null;)r=r|s.lanes|s.childLanes,s=s.sibling;t.childLanes=r&~l}else t.childLanes=0,t.child=null;return df(e,t,l,a)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Wi(t,r!==null?r.cachePool:null),r!==null?od(t,r):ao(),Pd(t);else return t.lanes=t.childLanes=536870912,df(e,t,r!==null?r.baseLanes|a:a,a)}else r!==null?(Wi(t,r.cachePool),od(t,r),Ea(),t.memoizedState=null):(e!==null&&Wi(t,null),ao(),Ea());return Fe(e,t,s,a),t.child}function df(e,t,a,l){var s=Pr();return s=s===null?null:{parent:Xe._currentValue,pool:s},t.memoizedState={baseLanes:a,cachePool:s},e!==null&&Wi(t,null),ao(),Pd(t),e!==null&&Ln(e,t,l,!0),null}function xs(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(u(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Ao(e,t,a,l,s){return il(t),a=io(e,t,a,l,void 0,s),l=so(),e!==null&&!Qe?(ro(e,t,s),oa(e,t,s)):(pe&&l&&Ir(t),t.flags|=1,Fe(e,t,a,s),t.child)}function ff(e,t,a,l,s,r){return il(t),t.updateQueue=null,a=ud(t,l,a,s),cd(e),l=so(),e!==null&&!Qe?(ro(e,t,r),oa(e,t,r)):(pe&&l&&Ir(t),t.flags|=1,Fe(e,t,a,r),t.child)}function mf(e,t,a,l,s){if(il(t),t.stateNode===null){var r=Gl,d=a.contextType;typeof d=="object"&&d!==null&&(r=lt(d)),r=new a(l,r),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=wo,t.stateNode=r,r._reactInternals=t,r=t.stateNode,r.props=l,r.state=t.memoizedState,r.refs={},Fr(t),d=a.contextType,r.context=typeof d=="object"&&d!==null?lt(d):Gl,r.state=t.memoizedState,d=a.getDerivedStateFromProps,typeof d=="function"&&(jo(t,a,d,l),r.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(d=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),d!==r.state&&wo.enqueueReplaceState(r,r.state,null),Yn(t,l,r,s),Xn(),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){r=t.stateNode;var h=t.memoizedProps,b=ol(a,h);r.props=b;var D=r.context,H=a.contextType;d=Gl,typeof H=="object"&&H!==null&&(d=lt(H));var $=a.getDerivedStateFromProps;H=typeof $=="function"||typeof r.getSnapshotBeforeUpdate=="function",h=t.pendingProps!==h,H||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(h||D!==d)&&Fd(t,r,l,d),wa=!1;var U=t.memoizedState;r.state=U,Yn(t,l,r,s),Xn(),D=t.memoizedState,h||U!==D||wa?(typeof $=="function"&&(jo(t,a,$,l),D=t.memoizedState),(b=wa||Jd(t,a,b,l,U,D,d))?(H||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(t.flags|=4194308)):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=D),r.props=l,r.state=D,r.context=d,l=b):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{r=t.stateNode,Wr(e,t),d=t.memoizedProps,H=ol(a,d),r.props=H,$=t.pendingProps,U=r.context,D=a.contextType,b=Gl,typeof D=="object"&&D!==null&&(b=lt(D)),h=a.getDerivedStateFromProps,(D=typeof h=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(d!==$||U!==b)&&Fd(t,r,l,b),wa=!1,U=t.memoizedState,r.state=U,Yn(t,l,r,s),Xn();var C=t.memoizedState;d!==$||U!==C||wa||e!==null&&e.dependencies!==null&&Ji(e.dependencies)?(typeof h=="function"&&(jo(t,a,h,l),C=t.memoizedState),(H=wa||Jd(t,a,H,l,U,C,b)||e!==null&&e.dependencies!==null&&Ji(e.dependencies))?(D||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(l,C,b),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(l,C,b)),typeof r.componentDidUpdate=="function"&&(t.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof r.componentDidUpdate!="function"||d===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||d===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=C),r.props=l,r.state=C,r.context=b,l=H):(typeof r.componentDidUpdate!="function"||d===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||d===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),l=!1)}return r=l,xs(e,t),l=(t.flags&128)!==0,r||l?(r=t.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:r.render(),t.flags|=1,e!==null&&l?(t.child=$l(t,e.child,null,s),t.child=$l(t,null,a,s)):Fe(e,t,a,s),t.memoizedState=r.state,e=t.child):e=oa(e,t,s),e}function hf(e,t,a,l){return Gn(),t.flags|=256,Fe(e,t,a,l),t.child}var So={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function _o(e){return{baseLanes:e,cachePool:ed()}}function Eo(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=Mt),e}function pf(e,t,a){var l=t.pendingProps,s=!1,r=(t.flags&128)!==0,d;if((d=r)||(d=e!==null&&e.memoizedState===null?!1:(Ye.current&2)!==0),d&&(s=!0,t.flags&=-129),d=(t.flags&32)!==0,t.flags&=-33,e===null){if(pe){if(s?_a(t):Ea(),pe){var h=Oe,b;if(b=h){e:{for(b=h,h=Vt;b.nodeType!==8;){if(!h){h=null;break e}if(b=Bt(b.nextSibling),b===null){h=null;break e}}h=b}h!==null?(t.memoizedState={dehydrated:h,treeContext:el!==null?{id:aa,overflow:la}:null,retryLane:536870912,hydrationErrors:null},b=xt(18,null,null,0),b.stateNode=h,b.return=t,t.child=b,st=t,Oe=null,b=!0):b=!1}b||ll(t)}if(h=t.memoizedState,h!==null&&(h=h.dehydrated,h!==null))return uc(h)?t.lanes=32:t.lanes=536870912,null;ra(t)}return h=l.children,l=l.fallback,s?(Ea(),s=t.mode,h=gs({mode:"hidden",children:h},s),l=Wa(l,s,a,null),h.return=t,l.return=t,h.sibling=l,t.child=h,s=t.child,s.memoizedState=_o(a),s.childLanes=Eo(e,d,a),t.memoizedState=So,l):(_a(t),To(t,h))}if(b=e.memoizedState,b!==null&&(h=b.dehydrated,h!==null)){if(r)t.flags&256?(_a(t),t.flags&=-257,t=Ro(e,t,a)):t.memoizedState!==null?(Ea(),t.child=e.child,t.flags|=128,t=null):(Ea(),s=l.fallback,h=t.mode,l=gs({mode:"visible",children:l.children},h),s=Wa(s,h,a,null),s.flags|=2,l.return=t,s.return=t,l.sibling=s,t.child=l,$l(t,e.child,null,a),l=t.child,l.memoizedState=_o(a),l.childLanes=Eo(e,d,a),t.memoizedState=So,t=s);else if(_a(t),uc(h)){if(d=h.nextSibling&&h.nextSibling.dataset,d)var D=d.dgst;d=D,l=Error(u(419)),l.stack="",l.digest=d,kn({value:l,source:null,stack:null}),t=Ro(e,t,a)}else if(Qe||Ln(e,t,a,!1),d=(a&e.childLanes)!==0,Qe||d){if(d=Ae,d!==null&&(l=a&-a,l=(l&42)!==0?1:ur(l),l=(l&(d.suspendedLanes|a))!==0?0:l,l!==0&&l!==b.retryLane))throw b.retryLane=l,zl(e,l),jt(d,e,l),sf;h.data==="$?"||Zo(),t=Ro(e,t,a)}else h.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=b.treeContext,Oe=Bt(h.nextSibling),st=t,pe=!0,al=null,Vt=!1,e!==null&&(Tt[Rt++]=aa,Tt[Rt++]=la,Tt[Rt++]=el,aa=e.id,la=e.overflow,el=t),t=To(t,l.children),t.flags|=4096);return t}return s?(Ea(),s=l.fallback,h=t.mode,b=e.child,D=b.sibling,l=ta(b,{mode:"hidden",children:l.children}),l.subtreeFlags=b.subtreeFlags&65011712,D!==null?s=ta(D,s):(s=Wa(s,h,a,null),s.flags|=2),s.return=t,l.return=t,l.sibling=s,t.child=l,l=s,s=t.child,h=e.child.memoizedState,h===null?h=_o(a):(b=h.cachePool,b!==null?(D=Xe._currentValue,b=b.parent!==D?{parent:D,pool:D}:b):b=ed(),h={baseLanes:h.baseLanes|a,cachePool:b}),s.memoizedState=h,s.childLanes=Eo(e,d,a),t.memoizedState=So,l):(_a(t),a=e.child,e=a.sibling,a=ta(a,{mode:"visible",children:l.children}),a.return=t,a.sibling=null,e!==null&&(d=t.deletions,d===null?(t.deletions=[e],t.flags|=16):d.push(e)),t.child=a,t.memoizedState=null,a)}function To(e,t){return t=gs({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function gs(e,t){return e=xt(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Ro(e,t,a){return $l(t,e.child,null,a),e=To(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xf(e,t,a){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),$r(e.return,t,a)}function Do(e,t,a,l,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=l,r.tail=a,r.tailMode=s)}function gf(e,t,a){var l=t.pendingProps,s=l.revealOrder,r=l.tail;if(Fe(e,t,l.children,a),l=Ye.current,(l&2)!==0)l=l&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&xf(e,a,t);else if(e.tag===19)xf(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}switch(fe(Ye,l),s){case"forwards":for(a=t.child,s=null;a!==null;)e=a.alternate,e!==null&&ms(e)===null&&(s=a),a=a.sibling;a=s,a===null?(s=t.child,t.child=null):(s=a.sibling,a.sibling=null),Do(t,!1,s,a,r);break;case"backwards":for(a=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&ms(e)===null){t.child=s;break}e=s.sibling,s.sibling=a,a=s,s=e}Do(t,!0,a,null,r);break;case"together":Do(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function oa(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Ua|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(Ln(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(u(153));if(t.child!==null){for(e=t.child,a=ta(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=ta(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Mo(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ji(e)))}function cp(e,t,a){switch(t.tag){case 3:Ot(t,t.stateNode.containerInfo),ja(t,Xe,e.memoizedState.cache),Gn();break;case 27:case 5:xl(t);break;case 4:Ot(t,t.stateNode.containerInfo);break;case 10:ja(t,t.type,t.memoizedProps.value);break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(_a(t),t.flags|=128,null):(a&t.child.childLanes)!==0?pf(e,t,a):(_a(t),e=oa(e,t,a),e!==null?e.sibling:null);_a(t);break;case 19:var s=(e.flags&128)!==0;if(l=(a&t.childLanes)!==0,l||(Ln(e,t,a,!1),l=(a&t.childLanes)!==0),s){if(l)return gf(e,t,a);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),fe(Ye,Ye.current),l)break;return null;case 22:case 23:return t.lanes=0,uf(e,t,a);case 24:ja(t,Xe,e.memoizedState.cache)}return oa(e,t,a)}function vf(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Qe=!0;else{if(!Mo(e,a)&&(t.flags&128)===0)return Qe=!1,cp(e,t,a);Qe=(e.flags&131072)!==0}else Qe=!1,pe&&(t.flags&1048576)!==0&&Zu(t,Pi,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var l=t.elementType,s=l._init;if(l=s(l._payload),t.type=l,typeof l=="function")Br(l)?(e=ol(l,e),t.tag=1,t=mf(null,t,l,e,a)):(t.tag=0,t=Ao(null,t,l,e,a));else{if(l!=null){if(s=l.$$typeof,s===S){t.tag=11,t=rf(null,t,l,e,a);break e}else if(s===B){t.tag=14,t=of(null,t,l,e,a);break e}}throw t=Je(l)||l,Error(u(306,t,""))}}return t;case 0:return Ao(e,t,t.type,t.pendingProps,a);case 1:return l=t.type,s=ol(l,t.pendingProps),mf(e,t,l,s,a);case 3:e:{if(Ot(t,t.stateNode.containerInfo),e===null)throw Error(u(387));l=t.pendingProps;var r=t.memoizedState;s=r.element,Wr(e,t),Yn(t,l,null,a);var d=t.memoizedState;if(l=d.cache,ja(t,Xe,l),l!==r.cache&&Zr(t,[Xe],a,!0),Xn(),l=d.element,r.isDehydrated)if(r={element:l,isDehydrated:!1,cache:d.cache},t.updateQueue.baseState=r,t.memoizedState=r,t.flags&256){t=hf(e,t,l,a);break e}else if(l!==s){s=_t(Error(u(424)),t),kn(s),t=hf(e,t,l,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Oe=Bt(e.firstChild),st=t,pe=!0,al=null,Vt=!0,a=Kd(t,null,l,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Gn(),l===s){t=oa(e,t,a);break e}Fe(e,t,l,a)}t=t.child}return t;case 26:return xs(e,t),e===null?(a=wm(t.type,null,t.pendingProps,null))?t.memoizedState=a:pe||(a=t.type,e=t.pendingProps,l=Ms(Ct.current).createElement(a),l[at]=t,l[ut]=e,et(l,a,e),Ze(l),t.stateNode=l):t.memoizedState=wm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return xl(t),e===null&&pe&&(l=t.stateNode=bm(t.type,t.pendingProps,Ct.current),st=t,Vt=!0,s=Oe,Ga(t.type)?(dc=s,Oe=Bt(l.firstChild)):Oe=s),Fe(e,t,t.pendingProps.children,a),xs(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&pe&&((s=l=Oe)&&(l=kp(l,t.type,t.pendingProps,Vt),l!==null?(t.stateNode=l,st=t,Oe=Bt(l.firstChild),Vt=!1,s=!0):s=!1),s||ll(t)),xl(t),s=t.type,r=t.pendingProps,d=e!==null?e.memoizedProps:null,l=r.children,rc(s,r)?l=null:d!==null&&rc(s,d)&&(t.flags|=32),t.memoizedState!==null&&(s=io(e,t,tp,null,null,a),mi._currentValue=s),xs(e,t),Fe(e,t,l,a),t.child;case 6:return e===null&&pe&&((e=a=Oe)&&(a=Lp(a,t.pendingProps,Vt),a!==null?(t.stateNode=a,st=t,Oe=null,e=!0):e=!1),e||ll(t)),null;case 13:return pf(e,t,a);case 4:return Ot(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=$l(t,null,l,a):Fe(e,t,l,a),t.child;case 11:return rf(e,t,t.type,t.pendingProps,a);case 7:return Fe(e,t,t.pendingProps,a),t.child;case 8:return Fe(e,t,t.pendingProps.children,a),t.child;case 12:return Fe(e,t,t.pendingProps.children,a),t.child;case 10:return l=t.pendingProps,ja(t,t.type,l.value),Fe(e,t,l.children,a),t.child;case 9:return s=t.type._context,l=t.pendingProps.children,il(t),s=lt(s),l=l(s),t.flags|=1,Fe(e,t,l,a),t.child;case 14:return of(e,t,t.type,t.pendingProps,a);case 15:return cf(e,t,t.type,t.pendingProps,a);case 19:return gf(e,t,a);case 31:return l=t.pendingProps,a=t.mode,l={mode:l.mode,children:l.children},e===null?(a=gs(l,a),a.ref=t.ref,t.child=a,a.return=t,t=a):(a=ta(e.child,l),a.ref=t.ref,t.child=a,a.return=t,t=a),t;case 22:return uf(e,t,a);case 24:return il(t),l=lt(Xe),e===null?(s=Pr(),s===null&&(s=Ae,r=Qr(),s.pooledCache=r,r.refCount++,r!==null&&(s.pooledCacheLanes|=a),s=r),t.memoizedState={parent:l,cache:s},Fr(t),ja(t,Xe,s)):((e.lanes&a)!==0&&(Wr(e,t),Yn(t,null,null,a),Xn()),s=e.memoizedState,r=t.memoizedState,s.parent!==l?(s={parent:l,cache:l},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),ja(t,Xe,l)):(l=r.cache,ja(t,Xe,l),l!==s.cache&&Zr(t,[Xe],a,!0))),Fe(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(u(156,t.tag))}function ca(e){e.flags|=4}function bf(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Em(t)){if(t=Dt.current,t!==null&&((ue&4194048)===ue?Xt!==null:(ue&62914560)!==ue&&(ue&536870912)===0||t!==Xt))throw In=Jr,td;e.flags|=8192}}function vs(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Nn():536870912,e.lanes|=t,Pl|=t)}function Fn(e,t){if(!pe)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function Ue(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,l=0;if(t)for(var s=e.child;s!==null;)a|=s.lanes|s.childLanes,l|=s.subtreeFlags&65011712,l|=s.flags&65011712,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)a|=s.lanes|s.childLanes,l|=s.subtreeFlags,l|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=l,e.childLanes=a,t}function up(e,t,a){var l=t.pendingProps;switch(Vr(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ue(t),null;case 1:return Ue(t),null;case 3:return a=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),ia(Xe),Nt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(zn(t)?ca(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Pu())),Ue(t),null;case 26:return a=t.memoizedState,e===null?(ca(t),a!==null?(Ue(t),bf(t,a)):(Ue(t),t.flags&=-16777217)):a?a!==e.memoizedState?(ca(t),Ue(t),bf(t,a)):(Ue(t),t.flags&=-16777217):(e.memoizedProps!==l&&ca(t),Ue(t),t.flags&=-16777217),null;case 27:gl(t),a=Ct.current;var s=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==l&&ca(t);else{if(!l){if(t.stateNode===null)throw Error(u(166));return Ue(t),null}e=Ee.current,zn(t)?Qu(t):(e=bm(s,l,a),t.stateNode=e,ca(t))}return Ue(t),null;case 5:if(gl(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&ca(t);else{if(!l){if(t.stateNode===null)throw Error(u(166));return Ue(t),null}if(e=Ee.current,zn(t))Qu(t);else{switch(s=Ms(Ct.current),e){case 1:e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof l.is=="string"?s.createElement("select",{is:l.is}):s.createElement("select"),l.multiple?e.multiple=!0:l.size&&(e.size=l.size);break;default:e=typeof l.is=="string"?s.createElement(a,{is:l.is}):s.createElement(a)}}e[at]=t,e[ut]=l;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)e.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=e;e:switch(et(e,a,l),a){case"button":case"input":case"select":case"textarea":e=!!l.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&ca(t)}}return Ue(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&ca(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(u(166));if(e=Ct.current,zn(t)){if(e=t.stateNode,a=t.memoizedProps,l=null,s=st,s!==null)switch(s.tag){case 27:case 5:l=s.memoizedProps}e[at]=t,e=!!(e.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||fm(e.nodeValue,a)),e||ll(t)}else e=Ms(e).createTextNode(l),e[at]=t,t.stateNode=e}return Ue(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=zn(t),l!==null&&l.dehydrated!==null){if(e===null){if(!s)throw Error(u(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(u(317));s[at]=t}else Gn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ue(t),s=!1}else s=Pu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(ra(t),t):(ra(t),null)}if(ra(t),(t.flags&128)!==0)return t.lanes=a,t;if(a=l!==null,e=e!==null&&e.memoizedState!==null,a){l=t.child,s=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(s=l.alternate.memoizedState.cachePool.pool);var r=null;l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(r=l.memoizedState.cachePool.pool),r!==s&&(l.flags|=2048)}return a!==e&&a&&(t.child.flags|=8192),vs(t,t.updateQueue),Ue(t),null;case 4:return Nt(),e===null&&ac(t.stateNode.containerInfo),Ue(t),null;case 10:return ia(t.type),Ue(t),null;case 19:if(we(Ye),s=t.memoizedState,s===null)return Ue(t),null;if(l=(t.flags&128)!==0,r=s.rendering,r===null)if(l)Fn(s,!1);else{if(ze!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(r=ms(e),r!==null){for(t.flags|=128,Fn(s,!1),e=r.updateQueue,t.updateQueue=e,vs(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)$u(a,e),a=a.sibling;return fe(Ye,Ye.current&1|2),t.child}e=e.sibling}s.tail!==null&&nt()>js&&(t.flags|=128,l=!0,Fn(s,!1),t.lanes=4194304)}else{if(!l)if(e=ms(r),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,vs(t,e),Fn(s,!0),s.tail===null&&s.tailMode==="hidden"&&!r.alternate&&!pe)return Ue(t),null}else 2*nt()-s.renderingStartTime>js&&a!==536870912&&(t.flags|=128,l=!0,Fn(s,!1),t.lanes=4194304);s.isBackwards?(r.sibling=t.child,t.child=r):(e=s.last,e!==null?e.sibling=r:t.child=r,s.last=r)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=nt(),t.sibling=null,e=Ye.current,fe(Ye,l?e&1|2:e&1),t):(Ue(t),null);case 22:case 23:return ra(t),lo(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?(a&536870912)!==0&&(t.flags&128)===0&&(Ue(t),t.subtreeFlags&6&&(t.flags|=8192)):Ue(t),a=t.updateQueue,a!==null&&vs(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(t.flags|=2048),e!==null&&we(sl),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),ia(Xe),Ue(t),null;case 25:return null;case 30:return null}throw Error(u(156,t.tag))}function dp(e,t){switch(Vr(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ia(Xe),Nt(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return gl(t),null;case 13:if(ra(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(u(340));Gn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return we(Ye),null;case 4:return Nt(),null;case 10:return ia(t.type),null;case 22:case 23:return ra(t),lo(),e!==null&&we(sl),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ia(Xe),null;case 25:return null;default:return null}}function yf(e,t){switch(Vr(t),t.tag){case 3:ia(Xe),Nt();break;case 26:case 27:case 5:gl(t);break;case 4:Nt();break;case 13:ra(t);break;case 19:we(Ye);break;case 10:ia(t.type);break;case 22:case 23:ra(t),lo(),e!==null&&we(sl);break;case 24:ia(Xe)}}function Wn(e,t){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var s=l.next;a=s;do{if((a.tag&e)===e){l=void 0;var r=a.create,d=a.inst;l=r(),d.destroy=l}a=a.next}while(a!==s)}}catch(h){Ne(t,t.return,h)}}function Ta(e,t,a){try{var l=t.updateQueue,s=l!==null?l.lastEffect:null;if(s!==null){var r=s.next;l=r;do{if((l.tag&e)===e){var d=l.inst,h=d.destroy;if(h!==void 0){d.destroy=void 0,s=t;var b=a,D=h;try{D()}catch(H){Ne(s,b,H)}}}l=l.next}while(l!==r)}}catch(H){Ne(t,t.return,H)}}function jf(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{rd(t,a)}catch(l){Ne(e,e.return,l)}}}function wf(e,t,a){a.props=ol(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(l){Ne(e,t,l)}}function ei(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof a=="function"?e.refCleanup=a(l):a.current=l}}catch(s){Ne(e,t,s)}}function Yt(e,t){var a=e.ref,l=e.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(s){Ne(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(s){Ne(e,t,s)}else a.current=null}function Nf(e){var t=e.type,a=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break e;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(s){Ne(e,e.return,s)}}function Uo(e,t,a){try{var l=e.stateNode;Up(l,e.type,a,t),l[ut]=t}catch(s){Ne(e,e.return,s)}}function Af(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ga(e.type)||e.tag===4}function Co(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Af(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ga(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Oo(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Ds));else if(l!==4&&(l===27&&Ga(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Oo(e,t,a),e=e.sibling;e!==null;)Oo(e,t,a),e=e.sibling}function bs(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(l!==4&&(l===27&&Ga(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(bs(e,t,a),e=e.sibling;e!==null;)bs(e,t,a),e=e.sibling}function Sf(e){var t=e.stateNode,a=e.memoizedProps;try{for(var l=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);et(t,l,a),t[at]=e,t[ut]=a}catch(r){Ne(e,e.return,r)}}var ua=!1,ke=!1,zo=!1,_f=typeof WeakSet=="function"?WeakSet:Set,Ke=null;function fp(e,t){if(e=e.containerInfo,ic=ks,e=Gu(e),Ur(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var s=l.anchorOffset,r=l.focusNode;l=l.focusOffset;try{a.nodeType,r.nodeType}catch{a=null;break e}var d=0,h=-1,b=-1,D=0,H=0,$=e,U=null;t:for(;;){for(var C;$!==a||s!==0&&$.nodeType!==3||(h=d+s),$!==r||l!==0&&$.nodeType!==3||(b=d+l),$.nodeType===3&&(d+=$.nodeValue.length),(C=$.firstChild)!==null;)U=$,$=C;for(;;){if($===e)break t;if(U===a&&++D===s&&(h=d),U===r&&++H===l&&(b=d),(C=$.nextSibling)!==null)break;$=U,U=$.parentNode}$=C}a=h===-1||b===-1?null:{start:h,end:b}}else a=null}a=a||{start:0,end:0}}else a=null;for(sc={focusedElem:e,selectionRange:a},ks=!1,Ke=t;Ke!==null;)if(t=Ke,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,Ke=e;else for(;Ke!==null;){switch(t=Ke,r=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&r!==null){e=void 0,a=t,s=r.memoizedProps,r=r.memoizedState,l=a.stateNode;try{var ne=ol(a.type,s,a.elementType===a.type);e=l.getSnapshotBeforeUpdate(ne,r),l.__reactInternalSnapshotBeforeUpdate=e}catch(ae){Ne(a,a.return,ae)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)cc(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":cc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(u(163))}if(e=t.sibling,e!==null){e.return=t.return,Ke=e;break}Ke=t.return}}function Ef(e,t,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:Ra(e,a),l&4&&Wn(5,a);break;case 1:if(Ra(e,a),l&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(d){Ne(a,a.return,d)}else{var s=ol(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(d){Ne(a,a.return,d)}}l&64&&jf(a),l&512&&ei(a,a.return);break;case 3:if(Ra(e,a),l&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{rd(e,t)}catch(d){Ne(a,a.return,d)}}break;case 27:t===null&&l&4&&Sf(a);case 26:case 5:Ra(e,a),t===null&&l&4&&Nf(a),l&512&&ei(a,a.return);break;case 12:Ra(e,a);break;case 13:Ra(e,a),l&4&&Df(e,a),l&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=jp.bind(null,a),Bp(e,a))));break;case 22:if(l=a.memoizedState!==null||ua,!l){t=t!==null&&t.memoizedState!==null||ke,s=ua;var r=ke;ua=l,(ke=t)&&!r?Da(e,a,(a.subtreeFlags&8772)!==0):Ra(e,a),ua=s,ke=r}break;case 30:break;default:Ra(e,a)}}function Tf(e){var t=e.alternate;t!==null&&(e.alternate=null,Tf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&mr(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Te=null,mt=!1;function da(e,t,a){for(a=a.child;a!==null;)Rf(e,t,a),a=a.sibling}function Rf(e,t,a){if(tt&&typeof tt.onCommitFiberUnmount=="function")try{tt.onCommitFiberUnmount(Za,a)}catch{}switch(a.tag){case 26:ke||Yt(a,t),da(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:ke||Yt(a,t);var l=Te,s=mt;Ga(a.type)&&(Te=a.stateNode,mt=!1),da(e,t,a),ci(a.stateNode),Te=l,mt=s;break;case 5:ke||Yt(a,t);case 6:if(l=Te,s=mt,Te=null,da(e,t,a),Te=l,mt=s,Te!==null)if(mt)try{(Te.nodeType===9?Te.body:Te.nodeName==="HTML"?Te.ownerDocument.body:Te).removeChild(a.stateNode)}catch(r){Ne(a,t,r)}else try{Te.removeChild(a.stateNode)}catch(r){Ne(a,t,r)}break;case 18:Te!==null&&(mt?(e=Te,gm(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),gi(e)):gm(Te,a.stateNode));break;case 4:l=Te,s=mt,Te=a.stateNode.containerInfo,mt=!0,da(e,t,a),Te=l,mt=s;break;case 0:case 11:case 14:case 15:ke||Ta(2,a,t),ke||Ta(4,a,t),da(e,t,a);break;case 1:ke||(Yt(a,t),l=a.stateNode,typeof l.componentWillUnmount=="function"&&wf(a,t,l)),da(e,t,a);break;case 21:da(e,t,a);break;case 22:ke=(l=ke)||a.memoizedState!==null,da(e,t,a),ke=l;break;default:da(e,t,a)}}function Df(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{gi(e)}catch(a){Ne(t,t.return,a)}}function mp(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new _f),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new _f),t;default:throw Error(u(435,e.tag))}}function Go(e,t){var a=mp(e);t.forEach(function(l){var s=wp.bind(null,e,l);a.has(l)||(a.add(l),l.then(s,s))})}function gt(e,t){var a=t.deletions;if(a!==null)for(var l=0;l<a.length;l++){var s=a[l],r=e,d=t,h=d;e:for(;h!==null;){switch(h.tag){case 27:if(Ga(h.type)){Te=h.stateNode,mt=!1;break e}break;case 5:Te=h.stateNode,mt=!1;break e;case 3:case 4:Te=h.stateNode.containerInfo,mt=!0;break e}h=h.return}if(Te===null)throw Error(u(160));Rf(r,d,s),Te=null,mt=!1,r=s.alternate,r!==null&&(r.return=null),s.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)Mf(t,e),t=t.sibling}var Lt=null;function Mf(e,t){var a=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:gt(t,e),vt(e),l&4&&(Ta(3,e,e.return),Wn(3,e),Ta(5,e,e.return));break;case 1:gt(t,e),vt(e),l&512&&(ke||a===null||Yt(a,a.return)),l&64&&ua&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var s=Lt;if(gt(t,e),vt(e),l&512&&(ke||a===null||Yt(a,a.return)),l&4){var r=a!==null?a.memoizedState:null;if(l=e.memoizedState,a===null)if(l===null)if(e.stateNode===null){e:{l=e.type,a=e.memoizedProps,s=s.ownerDocument||s;t:switch(l){case"title":r=s.getElementsByTagName("title")[0],(!r||r[An]||r[at]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=s.createElement(l),s.head.insertBefore(r,s.querySelector("head > title"))),et(r,l,a),r[at]=e,Ze(r),l=r;break e;case"link":var d=Sm("link","href",s).get(l+(a.href||""));if(d){for(var h=0;h<d.length;h++)if(r=d[h],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){d.splice(h,1);break t}}r=s.createElement(l),et(r,l,a),s.head.appendChild(r);break;case"meta":if(d=Sm("meta","content",s).get(l+(a.content||""))){for(h=0;h<d.length;h++)if(r=d[h],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){d.splice(h,1);break t}}r=s.createElement(l),et(r,l,a),s.head.appendChild(r);break;default:throw Error(u(468,l))}r[at]=e,Ze(r),l=r}e.stateNode=l}else _m(s,e.type,e.stateNode);else e.stateNode=Am(s,l,e.memoizedProps);else r!==l?(r===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):r.count--,l===null?_m(s,e.type,e.stateNode):Am(s,l,e.memoizedProps)):l===null&&e.stateNode!==null&&Uo(e,e.memoizedProps,a.memoizedProps)}break;case 27:gt(t,e),vt(e),l&512&&(ke||a===null||Yt(a,a.return)),a!==null&&l&4&&Uo(e,e.memoizedProps,a.memoizedProps);break;case 5:if(gt(t,e),vt(e),l&512&&(ke||a===null||Yt(a,a.return)),e.flags&32){s=e.stateNode;try{Tl(s,"")}catch(C){Ne(e,e.return,C)}}l&4&&e.stateNode!=null&&(s=e.memoizedProps,Uo(e,s,a!==null?a.memoizedProps:s)),l&1024&&(zo=!0);break;case 6:if(gt(t,e),vt(e),l&4){if(e.stateNode===null)throw Error(u(162));l=e.memoizedProps,a=e.stateNode;try{a.nodeValue=l}catch(C){Ne(e,e.return,C)}}break;case 3:if(Os=null,s=Lt,Lt=Us(t.containerInfo),gt(t,e),Lt=s,vt(e),l&4&&a!==null&&a.memoizedState.isDehydrated)try{gi(t.containerInfo)}catch(C){Ne(e,e.return,C)}zo&&(zo=!1,Uf(e));break;case 4:l=Lt,Lt=Us(e.stateNode.containerInfo),gt(t,e),vt(e),Lt=l;break;case 12:gt(t,e),vt(e);break;case 13:gt(t,e),vt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Io=nt()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Go(e,l)));break;case 22:s=e.memoizedState!==null;var b=a!==null&&a.memoizedState!==null,D=ua,H=ke;if(ua=D||s,ke=H||b,gt(t,e),ke=H,ua=D,vt(e),l&8192)e:for(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,s&&(a===null||b||ua||ke||cl(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){b=a=t;try{if(r=b.stateNode,s)d=r.style,typeof d.setProperty=="function"?d.setProperty("display","none","important"):d.display="none";else{h=b.stateNode;var $=b.memoizedProps.style,U=$!=null&&$.hasOwnProperty("display")?$.display:null;h.style.display=U==null||typeof U=="boolean"?"":(""+U).trim()}}catch(C){Ne(b,b.return,C)}}}else if(t.tag===6){if(a===null){b=t;try{b.stateNode.nodeValue=s?"":b.memoizedProps}catch(C){Ne(b,b.return,C)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,Go(e,a))));break;case 19:gt(t,e),vt(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Go(e,l)));break;case 30:break;case 21:break;default:gt(t,e),vt(e)}}function vt(e){var t=e.flags;if(t&2){try{for(var a,l=e.return;l!==null;){if(Af(l)){a=l;break}l=l.return}if(a==null)throw Error(u(160));switch(a.tag){case 27:var s=a.stateNode,r=Co(e);bs(e,r,s);break;case 5:var d=a.stateNode;a.flags&32&&(Tl(d,""),a.flags&=-33);var h=Co(e);bs(e,h,d);break;case 3:case 4:var b=a.stateNode.containerInfo,D=Co(e);Oo(e,D,b);break;default:throw Error(u(161))}}catch(H){Ne(e,e.return,H)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Uf(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Uf(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Ra(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Ef(e,t.alternate,t),t=t.sibling}function cl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ta(4,t,t.return),cl(t);break;case 1:Yt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&wf(t,t.return,a),cl(t);break;case 27:ci(t.stateNode);case 26:case 5:Yt(t,t.return),cl(t);break;case 22:t.memoizedState===null&&cl(t);break;case 30:cl(t);break;default:cl(t)}e=e.sibling}}function Da(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,s=e,r=t,d=r.flags;switch(r.tag){case 0:case 11:case 15:Da(s,r,a),Wn(4,r);break;case 1:if(Da(s,r,a),l=r,s=l.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(D){Ne(l,l.return,D)}if(l=r,s=l.updateQueue,s!==null){var h=l.stateNode;try{var b=s.shared.hiddenCallbacks;if(b!==null)for(s.shared.hiddenCallbacks=null,s=0;s<b.length;s++)sd(b[s],h)}catch(D){Ne(l,l.return,D)}}a&&d&64&&jf(r),ei(r,r.return);break;case 27:Sf(r);case 26:case 5:Da(s,r,a),a&&l===null&&d&4&&Nf(r),ei(r,r.return);break;case 12:Da(s,r,a);break;case 13:Da(s,r,a),a&&d&4&&Df(s,r);break;case 22:r.memoizedState===null&&Da(s,r,a),ei(r,r.return);break;case 30:break;default:Da(s,r,a)}t=t.sibling}}function ko(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Bn(a))}function Lo(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Bn(e))}function $t(e,t,a,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Cf(e,t,a,l),t=t.sibling}function Cf(e,t,a,l){var s=t.flags;switch(t.tag){case 0:case 11:case 15:$t(e,t,a,l),s&2048&&Wn(9,t);break;case 1:$t(e,t,a,l);break;case 3:$t(e,t,a,l),s&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Bn(e)));break;case 12:if(s&2048){$t(e,t,a,l),e=t.stateNode;try{var r=t.memoizedProps,d=r.id,h=r.onPostCommit;typeof h=="function"&&h(d,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(b){Ne(t,t.return,b)}}else $t(e,t,a,l);break;case 13:$t(e,t,a,l);break;case 23:break;case 22:r=t.stateNode,d=t.alternate,t.memoizedState!==null?r._visibility&2?$t(e,t,a,l):ti(e,t):r._visibility&2?$t(e,t,a,l):(r._visibility|=2,Zl(e,t,a,l,(t.subtreeFlags&10256)!==0)),s&2048&&ko(d,t);break;case 24:$t(e,t,a,l),s&2048&&Lo(t.alternate,t);break;default:$t(e,t,a,l)}}function Zl(e,t,a,l,s){for(s=s&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var r=e,d=t,h=a,b=l,D=d.flags;switch(d.tag){case 0:case 11:case 15:Zl(r,d,h,b,s),Wn(8,d);break;case 23:break;case 22:var H=d.stateNode;d.memoizedState!==null?H._visibility&2?Zl(r,d,h,b,s):ti(r,d):(H._visibility|=2,Zl(r,d,h,b,s)),s&&D&2048&&ko(d.alternate,d);break;case 24:Zl(r,d,h,b,s),s&&D&2048&&Lo(d.alternate,d);break;default:Zl(r,d,h,b,s)}t=t.sibling}}function ti(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,l=t,s=l.flags;switch(l.tag){case 22:ti(a,l),s&2048&&ko(l.alternate,l);break;case 24:ti(a,l),s&2048&&Lo(l.alternate,l);break;default:ti(a,l)}t=t.sibling}}var ai=8192;function Ql(e){if(e.subtreeFlags&ai)for(e=e.child;e!==null;)Of(e),e=e.sibling}function Of(e){switch(e.tag){case 26:Ql(e),e.flags&ai&&e.memoizedState!==null&&Fp(Lt,e.memoizedState,e.memoizedProps);break;case 5:Ql(e);break;case 3:case 4:var t=Lt;Lt=Us(e.stateNode.containerInfo),Ql(e),Lt=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=ai,ai=16777216,Ql(e),ai=t):Ql(e));break;default:Ql(e)}}function zf(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function li(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ke=l,kf(l,e)}zf(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Gf(e),e=e.sibling}function Gf(e){switch(e.tag){case 0:case 11:case 15:li(e),e.flags&2048&&Ta(9,e,e.return);break;case 3:li(e);break;case 12:li(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ys(e)):li(e);break;default:li(e)}}function ys(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ke=l,kf(l,e)}zf(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ta(8,t,t.return),ys(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,ys(t));break;default:ys(t)}e=e.sibling}}function kf(e,t){for(;Ke!==null;){var a=Ke;switch(a.tag){case 0:case 11:case 15:Ta(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:Bn(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,Ke=l;else e:for(a=e;Ke!==null;){l=Ke;var s=l.sibling,r=l.return;if(Tf(l),l===a){Ke=null;break e}if(s!==null){s.return=r,Ke=s;break e}Ke=r}}}var hp={getCacheForType:function(e){var t=lt(Xe),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a}},pp=typeof WeakMap=="function"?WeakMap:Map,xe=0,Ae=null,oe=null,ue=0,ge=0,bt=null,Ma=!1,Kl=!1,Bo=!1,fa=0,ze=0,Ua=0,ul=0,qo=0,Mt=0,Pl=0,ni=null,ht=null,Ho=!1,Io=0,js=1/0,ws=null,Ca=null,We=0,Oa=null,Jl=null,Fl=0,Vo=0,Xo=null,Lf=null,ii=0,Yo=null;function yt(){if((xe&2)!==0&&ue!==0)return ue&-ue;if(M.T!==null){var e=Bl;return e!==0?e:Fo()}return Wc()}function Bf(){Mt===0&&(Mt=(ue&536870912)===0||pe?wn():536870912);var e=Dt.current;return e!==null&&(e.flags|=32),Mt}function jt(e,t,a){(e===Ae&&(ge===2||ge===9)||e.cancelPendingCommit!==null)&&(Wl(e,0),za(e,ue,Mt,!1)),Ve(e,a),((xe&2)===0||e!==Ae)&&(e===Ae&&((xe&2)===0&&(ul|=a),ze===4&&za(e,ue,Mt,!1)),Zt(e))}function qf(e,t,a){if((xe&6)!==0)throw Error(u(327));var l=!a&&(t&124)===0&&(t&e.expiredLanes)===0||Qa(e,t),s=l?vp(e,t):Qo(e,t,!0),r=l;do{if(s===0){Kl&&!l&&za(e,t,0,!1);break}else{if(a=e.current.alternate,r&&!xp(a)){s=Qo(e,t,!1),r=!1;continue}if(s===2){if(r=t,e.errorRecoveryDisabledLanes&r)var d=0;else d=e.pendingLanes&-536870913,d=d!==0?d:d&536870912?536870912:0;if(d!==0){t=d;e:{var h=e;s=ni;var b=h.current.memoizedState.isDehydrated;if(b&&(Wl(h,d).flags|=256),d=Qo(h,d,!1),d!==2){if(Bo&&!b){h.errorRecoveryDisabledLanes|=r,ul|=r,s=4;break e}r=ht,ht=s,r!==null&&(ht===null?ht=r:ht.push.apply(ht,r))}s=d}if(r=!1,s!==2)continue}}if(s===1){Wl(e,0),za(e,t,0,!0);break}e:{switch(l=e,r=s,r){case 0:case 1:throw Error(u(345));case 4:if((t&4194048)!==t)break;case 6:za(l,t,Mt,!Ma);break e;case 2:ht=null;break;case 3:case 5:break;default:throw Error(u(329))}if((t&62914560)===t&&(s=Io+300-nt(),10<s)){if(za(l,t,Mt,!Ma),Ft(l,0,!0)!==0)break e;l.timeoutHandle=pm(Hf.bind(null,l,a,ht,ws,Ho,t,Mt,ul,Pl,Ma,r,2,-0,0),s);break e}Hf(l,a,ht,ws,Ho,t,Mt,ul,Pl,Ma,r,0,-0,0)}}break}while(!0);Zt(e)}function Hf(e,t,a,l,s,r,d,h,b,D,H,$,U,C){if(e.timeoutHandle=-1,$=t.subtreeFlags,($&8192||($&16785408)===16785408)&&(fi={stylesheets:null,count:0,unsuspend:Jp},Of(t),$=Wp(),$!==null)){e.cancelPendingCommit=$(Qf.bind(null,e,t,r,a,l,s,d,h,b,H,1,U,C)),za(e,r,d,!D);return}Qf(e,t,r,a,l,s,d,h,b)}function xp(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var s=a[l],r=s.getSnapshot;s=s.value;try{if(!pt(r(),s))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function za(e,t,a,l){t&=~qo,t&=~ul,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var s=t;0<s;){var r=31-it(s),d=1<<r;l[r]=-1,s&=~d}a!==0&&Jc(e,a,t)}function Ns(){return(xe&6)===0?(si(0),!1):!0}function $o(){if(oe!==null){if(ge===0)var e=oe.return;else e=oe,na=nl=null,oo(e),Yl=null,Pn=0,e=oe;for(;e!==null;)yf(e.alternate,e),e=e.return;oe=null}}function Wl(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Op(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),$o(),Ae=e,oe=a=ta(e.current,null),ue=t,ge=0,bt=null,Ma=!1,Kl=Qa(e,t),Bo=!1,Pl=Mt=qo=ul=Ua=ze=0,ht=ni=null,Ho=!1,(t&8)!==0&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var s=31-it(l),r=1<<s;t|=e[s],l&=~r}return fa=t,Yi(),a}function If(e,t){se=null,M.H=us,t===Hn||t===es?(t=nd(),ge=3):t===td?(t=nd(),ge=4):ge=t===sf?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,bt=t,oe===null&&(ze=1,ps(e,_t(t,e.current)))}function Vf(){var e=M.H;return M.H=us,e===null?us:e}function Xf(){var e=M.A;return M.A=hp,e}function Zo(){ze=4,Ma||(ue&4194048)!==ue&&Dt.current!==null||(Kl=!0),(Ua&134217727)===0&&(ul&134217727)===0||Ae===null||za(Ae,ue,Mt,!1)}function Qo(e,t,a){var l=xe;xe|=2;var s=Vf(),r=Xf();(Ae!==e||ue!==t)&&(ws=null,Wl(e,t)),t=!1;var d=ze;e:do try{if(ge!==0&&oe!==null){var h=oe,b=bt;switch(ge){case 8:$o(),d=6;break e;case 3:case 2:case 9:case 6:Dt.current===null&&(t=!0);var D=ge;if(ge=0,bt=null,en(e,h,b,D),a&&Kl){d=0;break e}break;default:D=ge,ge=0,bt=null,en(e,h,b,D)}}gp(),d=ze;break}catch(H){If(e,H)}while(!0);return t&&e.shellSuspendCounter++,na=nl=null,xe=l,M.H=s,M.A=r,oe===null&&(Ae=null,ue=0,Yi()),d}function gp(){for(;oe!==null;)Yf(oe)}function vp(e,t){var a=xe;xe|=2;var l=Vf(),s=Xf();Ae!==e||ue!==t?(ws=null,js=nt()+500,Wl(e,t)):Kl=Qa(e,t);e:do try{if(ge!==0&&oe!==null){t=oe;var r=bt;t:switch(ge){case 1:ge=0,bt=null,en(e,t,r,1);break;case 2:case 9:if(ad(r)){ge=0,bt=null,$f(t);break}t=function(){ge!==2&&ge!==9||Ae!==e||(ge=7),Zt(e)},r.then(t,t);break e;case 3:ge=7;break e;case 4:ge=5;break e;case 7:ad(r)?(ge=0,bt=null,$f(t)):(ge=0,bt=null,en(e,t,r,7));break;case 5:var d=null;switch(oe.tag){case 26:d=oe.memoizedState;case 5:case 27:var h=oe;if(!d||Em(d)){ge=0,bt=null;var b=h.sibling;if(b!==null)oe=b;else{var D=h.return;D!==null?(oe=D,As(D)):oe=null}break t}}ge=0,bt=null,en(e,t,r,5);break;case 6:ge=0,bt=null,en(e,t,r,6);break;case 8:$o(),ze=6;break e;default:throw Error(u(462))}}bp();break}catch(H){If(e,H)}while(!0);return na=nl=null,M.H=l,M.A=s,xe=a,oe!==null?0:(Ae=null,ue=0,Yi(),ze)}function bp(){for(;oe!==null&&!zt();)Yf(oe)}function Yf(e){var t=vf(e.alternate,e,fa);e.memoizedProps=e.pendingProps,t===null?As(e):oe=t}function $f(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=ff(a,t,t.pendingProps,t.type,void 0,ue);break;case 11:t=ff(a,t,t.pendingProps,t.type.render,t.ref,ue);break;case 5:oo(t);default:yf(a,t),t=oe=$u(t,fa),t=vf(a,t,fa)}e.memoizedProps=e.pendingProps,t===null?As(e):oe=t}function en(e,t,a,l){na=nl=null,oo(t),Yl=null,Pn=0;var s=t.return;try{if(op(e,s,t,a,ue)){ze=1,ps(e,_t(a,e.current)),oe=null;return}}catch(r){if(s!==null)throw oe=s,r;ze=1,ps(e,_t(a,e.current)),oe=null;return}t.flags&32768?(pe||l===1?e=!0:Kl||(ue&536870912)!==0?e=!1:(Ma=e=!0,(l===2||l===9||l===3||l===6)&&(l=Dt.current,l!==null&&l.tag===13&&(l.flags|=16384))),Zf(t,e)):As(t)}function As(e){var t=e;do{if((t.flags&32768)!==0){Zf(t,Ma);return}e=t.return;var a=up(t.alternate,t,fa);if(a!==null){oe=a;return}if(t=t.sibling,t!==null){oe=t;return}oe=t=e}while(t!==null);ze===0&&(ze=5)}function Zf(e,t){do{var a=dp(e.alternate,e);if(a!==null){a.flags&=32767,oe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){oe=e;return}oe=e=a}while(e!==null);ze=6,oe=null}function Qf(e,t,a,l,s,r,d,h,b){e.cancelPendingCommit=null;do Ss();while(We!==0);if((xe&6)!==0)throw Error(u(327));if(t!==null){if(t===e.current)throw Error(u(177));if(r=t.lanes|t.childLanes,r|=kr,Jh(e,a,r,d,h,b),e===Ae&&(oe=Ae=null,ue=0),Jl=t,Oa=e,Fl=a,Vo=r,Xo=s,Lf=l,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Np(yl,function(){return Wf(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||l){l=M.T,M.T=null,s=Q.p,Q.p=2,d=xe,xe|=4;try{fp(e,t,a)}finally{xe=d,Q.p=s,M.T=l}}We=1,Kf(),Pf(),Jf()}}function Kf(){if(We===1){We=0;var e=Oa,t=Jl,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=M.T,M.T=null;var l=Q.p;Q.p=2;var s=xe;xe|=4;try{Mf(t,e);var r=sc,d=Gu(e.containerInfo),h=r.focusedElem,b=r.selectionRange;if(d!==h&&h&&h.ownerDocument&&zu(h.ownerDocument.documentElement,h)){if(b!==null&&Ur(h)){var D=b.start,H=b.end;if(H===void 0&&(H=D),"selectionStart"in h)h.selectionStart=D,h.selectionEnd=Math.min(H,h.value.length);else{var $=h.ownerDocument||document,U=$&&$.defaultView||window;if(U.getSelection){var C=U.getSelection(),ne=h.textContent.length,ae=Math.min(b.start,ne),je=b.end===void 0?ae:Math.min(b.end,ne);!C.extend&&ae>je&&(d=je,je=ae,ae=d);var _=Ou(h,ae),w=Ou(h,je);if(_&&w&&(C.rangeCount!==1||C.anchorNode!==_.node||C.anchorOffset!==_.offset||C.focusNode!==w.node||C.focusOffset!==w.offset)){var R=$.createRange();R.setStart(_.node,_.offset),C.removeAllRanges(),ae>je?(C.addRange(R),C.extend(w.node,w.offset)):(R.setEnd(w.node,w.offset),C.addRange(R))}}}}for($=[],C=h;C=C.parentNode;)C.nodeType===1&&$.push({element:C,left:C.scrollLeft,top:C.scrollTop});for(typeof h.focus=="function"&&h.focus(),h=0;h<$.length;h++){var Y=$[h];Y.element.scrollLeft=Y.left,Y.element.scrollTop=Y.top}}ks=!!ic,sc=ic=null}finally{xe=s,Q.p=l,M.T=a}}e.current=t,We=2}}function Pf(){if(We===2){We=0;var e=Oa,t=Jl,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=M.T,M.T=null;var l=Q.p;Q.p=2;var s=xe;xe|=4;try{Ef(e,t.alternate,t)}finally{xe=s,Q.p=l,M.T=a}}We=3}}function Jf(){if(We===4||We===3){We=0,bl();var e=Oa,t=Jl,a=Fl,l=Lf;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?We=5:(We=0,Jl=Oa=null,Ff(e,e.pendingLanes));var s=e.pendingLanes;if(s===0&&(Ca=null),dr(a),t=t.stateNode,tt&&typeof tt.onCommitFiberRoot=="function")try{tt.onCommitFiberRoot(Za,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=M.T,s=Q.p,Q.p=2,M.T=null;try{for(var r=e.onRecoverableError,d=0;d<l.length;d++){var h=l[d];r(h.value,{componentStack:h.stack})}}finally{M.T=t,Q.p=s}}(Fl&3)!==0&&Ss(),Zt(e),s=e.pendingLanes,(a&4194090)!==0&&(s&42)!==0?e===Yo?ii++:(ii=0,Yo=e):ii=0,si(0)}}function Ff(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Bn(t)))}function Ss(e){return Kf(),Pf(),Jf(),Wf()}function Wf(){if(We!==5)return!1;var e=Oa,t=Vo;Vo=0;var a=dr(Fl),l=M.T,s=Q.p;try{Q.p=32>a?32:a,M.T=null,a=Xo,Xo=null;var r=Oa,d=Fl;if(We=0,Jl=Oa=null,Fl=0,(xe&6)!==0)throw Error(u(331));var h=xe;if(xe|=4,Gf(r.current),Cf(r,r.current,d,a),xe=h,si(0,!1),tt&&typeof tt.onPostCommitFiberRoot=="function")try{tt.onPostCommitFiberRoot(Za,r)}catch{}return!0}finally{Q.p=s,M.T=l,Ff(e,t)}}function em(e,t,a){t=_t(a,t),t=No(e.stateNode,t,2),e=Aa(e,t,2),e!==null&&(Ve(e,2),Zt(e))}function Ne(e,t,a){if(e.tag===3)em(e,e,a);else for(;t!==null;){if(t.tag===3){em(t,e,a);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Ca===null||!Ca.has(l))){e=_t(a,e),a=lf(2),l=Aa(t,a,2),l!==null&&(nf(a,l,t,e),Ve(l,2),Zt(l));break}}t=t.return}}function Ko(e,t,a){var l=e.pingCache;if(l===null){l=e.pingCache=new pp;var s=new Set;l.set(t,s)}else s=l.get(t),s===void 0&&(s=new Set,l.set(t,s));s.has(a)||(Bo=!0,s.add(a),e=yp.bind(null,e,t,a),t.then(e,e))}function yp(e,t,a){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ae===e&&(ue&a)===a&&(ze===4||ze===3&&(ue&62914560)===ue&&300>nt()-Io?(xe&2)===0&&Wl(e,0):qo|=a,Pl===ue&&(Pl=0)),Zt(e)}function tm(e,t){t===0&&(t=Nn()),e=zl(e,t),e!==null&&(Ve(e,t),Zt(e))}function jp(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),tm(e,a)}function wp(e,t){var a=0;switch(e.tag){case 13:var l=e.stateNode,s=e.memoizedState;s!==null&&(a=s.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(u(314))}l!==null&&l.delete(t),tm(e,a)}function Np(e,t){return vn(e,t)}var _s=null,tn=null,Po=!1,Es=!1,Jo=!1,dl=0;function Zt(e){e!==tn&&e.next===null&&(tn===null?_s=tn=e:tn=tn.next=e),Es=!0,Po||(Po=!0,Sp())}function si(e,t){if(!Jo&&Es){Jo=!0;do for(var a=!1,l=_s;l!==null;){if(e!==0){var s=l.pendingLanes;if(s===0)var r=0;else{var d=l.suspendedLanes,h=l.pingedLanes;r=(1<<31-it(42|e)+1)-1,r&=s&~(d&~h),r=r&201326741?r&201326741|1:r?r|2:0}r!==0&&(a=!0,im(l,r))}else r=ue,r=Ft(l,l===Ae?r:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(r&3)===0||Qa(l,r)||(a=!0,im(l,r));l=l.next}while(a);Jo=!1}}function Ap(){am()}function am(){Es=Po=!1;var e=0;dl!==0&&(Cp()&&(e=dl),dl=0);for(var t=nt(),a=null,l=_s;l!==null;){var s=l.next,r=lm(l,t);r===0?(l.next=null,a===null?_s=s:a.next=s,s===null&&(tn=a)):(a=l,(e!==0||(r&3)!==0)&&(Es=!0)),l=s}si(e)}function lm(e,t){for(var a=e.suspendedLanes,l=e.pingedLanes,s=e.expirationTimes,r=e.pendingLanes&-62914561;0<r;){var d=31-it(r),h=1<<d,b=s[d];b===-1?((h&a)===0||(h&l)!==0)&&(s[d]=cr(h,t)):b<=t&&(e.expiredLanes|=h),r&=~h}if(t=Ae,a=ue,a=Ft(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,a===0||e===t&&(ge===2||ge===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&$e(l),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Qa(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(l!==null&&$e(l),dr(a)){case 2:case 8:a=Di;break;case 32:a=yl;break;case 268435456:a=jn;break;default:a=yl}return l=nm.bind(null,e),a=vn(a,l),e.callbackPriority=t,e.callbackNode=a,t}return l!==null&&l!==null&&$e(l),e.callbackPriority=2,e.callbackNode=null,2}function nm(e,t){if(We!==0&&We!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Ss()&&e.callbackNode!==a)return null;var l=ue;return l=Ft(e,e===Ae?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(qf(e,l,t),lm(e,nt()),e.callbackNode!=null&&e.callbackNode===a?nm.bind(null,e):null)}function im(e,t){if(Ss())return null;qf(e,t,!0)}function Sp(){zp(function(){(xe&6)!==0?vn(bn,Ap):am()})}function Fo(){return dl===0&&(dl=wn()),dl}function sm(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Li(""+e)}function rm(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function _p(e,t,a,l,s){if(t==="submit"&&a&&a.stateNode===s){var r=sm((s[ut]||null).action),d=l.submitter;d&&(t=(t=d[ut]||null)?sm(t.formAction):d.getAttribute("formAction"),t!==null&&(r=t,d=null));var h=new Ii("action","action",null,l,s);e.push({event:h,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(dl!==0){var b=d?rm(s,d):new FormData(s);vo(a,{pending:!0,data:b,method:s.method,action:r},null,b)}}else typeof r=="function"&&(h.preventDefault(),b=d?rm(s,d):new FormData(s),vo(a,{pending:!0,data:b,method:s.method,action:r},r,b))},currentTarget:s}]})}}for(var Wo=0;Wo<Gr.length;Wo++){var ec=Gr[Wo],Ep=ec.toLowerCase(),Tp=ec[0].toUpperCase()+ec.slice(1);kt(Ep,"on"+Tp)}kt(Bu,"onAnimationEnd"),kt(qu,"onAnimationIteration"),kt(Hu,"onAnimationStart"),kt("dblclick","onDoubleClick"),kt("focusin","onFocus"),kt("focusout","onBlur"),kt(Y0,"onTransitionRun"),kt($0,"onTransitionStart"),kt(Z0,"onTransitionCancel"),kt(Iu,"onTransitionEnd"),Sl("onMouseEnter",["mouseout","mouseover"]),Sl("onMouseLeave",["mouseout","mouseover"]),Sl("onPointerEnter",["pointerout","pointerover"]),Sl("onPointerLeave",["pointerout","pointerover"]),Ka("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ka("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ka("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ka("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ka("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ka("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Rp=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ri));function om(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var l=e[a],s=l.event;l=l.listeners;e:{var r=void 0;if(t)for(var d=l.length-1;0<=d;d--){var h=l[d],b=h.instance,D=h.currentTarget;if(h=h.listener,b!==r&&s.isPropagationStopped())break e;r=h,s.currentTarget=D;try{r(s)}catch(H){hs(H)}s.currentTarget=null,r=b}else for(d=0;d<l.length;d++){if(h=l[d],b=h.instance,D=h.currentTarget,h=h.listener,b!==r&&s.isPropagationStopped())break e;r=h,s.currentTarget=D;try{r(s)}catch(H){hs(H)}s.currentTarget=null,r=b}}}}function ce(e,t){var a=t[fr];a===void 0&&(a=t[fr]=new Set);var l=e+"__bubble";a.has(l)||(cm(t,e,2,!1),a.add(l))}function tc(e,t,a){var l=0;t&&(l|=4),cm(a,e,l,t)}var Ts="_reactListening"+Math.random().toString(36).slice(2);function ac(e){if(!e[Ts]){e[Ts]=!0,tu.forEach(function(a){a!=="selectionchange"&&(Rp.has(a)||tc(a,!1,e),tc(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ts]||(t[Ts]=!0,tc("selectionchange",!1,t))}}function cm(e,t,a,l){switch(Cm(t)){case 2:var s=ax;break;case 8:s=lx;break;default:s=xc}a=s.bind(null,t,a,e),s=void 0,!Nr||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),l?s!==void 0?e.addEventListener(t,a,{capture:!0,passive:s}):e.addEventListener(t,a,!0):s!==void 0?e.addEventListener(t,a,{passive:s}):e.addEventListener(t,a,!1)}function lc(e,t,a,l,s){var r=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var d=l.tag;if(d===3||d===4){var h=l.stateNode.containerInfo;if(h===s)break;if(d===4)for(d=l.return;d!==null;){var b=d.tag;if((b===3||b===4)&&d.stateNode.containerInfo===s)return;d=d.return}for(;h!==null;){if(d=wl(h),d===null)return;if(b=d.tag,b===5||b===6||b===26||b===27){l=r=d;continue e}h=h.parentNode}}l=l.return}pu(function(){var D=r,H=jr(a),$=[];e:{var U=Vu.get(e);if(U!==void 0){var C=Ii,ne=e;switch(e){case"keypress":if(qi(a)===0)break e;case"keydown":case"keyup":C=N0;break;case"focusin":ne="focus",C=Er;break;case"focusout":ne="blur",C=Er;break;case"beforeblur":case"afterblur":C=Er;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=vu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=d0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=_0;break;case Bu:case qu:case Hu:C=h0;break;case Iu:C=T0;break;case"scroll":case"scrollend":C=c0;break;case"wheel":C=D0;break;case"copy":case"cut":case"paste":C=x0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=yu;break;case"toggle":case"beforetoggle":C=U0}var ae=(t&4)!==0,je=!ae&&(e==="scroll"||e==="scrollend"),_=ae?U!==null?U+"Capture":null:U;ae=[];for(var w=D,R;w!==null;){var Y=w;if(R=Y.stateNode,Y=Y.tag,Y!==5&&Y!==26&&Y!==27||R===null||_===null||(Y=_n(w,_),Y!=null&&ae.push(oi(w,Y,R))),je)break;w=w.return}0<ae.length&&(U=new C(U,ne,null,a,H),$.push({event:U,listeners:ae}))}}if((t&7)===0){e:{if(U=e==="mouseover"||e==="pointerover",C=e==="mouseout"||e==="pointerout",U&&a!==yr&&(ne=a.relatedTarget||a.fromElement)&&(wl(ne)||ne[jl]))break e;if((C||U)&&(U=H.window===H?H:(U=H.ownerDocument)?U.defaultView||U.parentWindow:window,C?(ne=a.relatedTarget||a.toElement,C=D,ne=ne?wl(ne):null,ne!==null&&(je=f(ne),ae=ne.tag,ne!==je||ae!==5&&ae!==27&&ae!==6)&&(ne=null)):(C=null,ne=D),C!==ne)){if(ae=vu,Y="onMouseLeave",_="onMouseEnter",w="mouse",(e==="pointerout"||e==="pointerover")&&(ae=yu,Y="onPointerLeave",_="onPointerEnter",w="pointer"),je=C==null?U:Sn(C),R=ne==null?U:Sn(ne),U=new ae(Y,w+"leave",C,a,H),U.target=je,U.relatedTarget=R,Y=null,wl(H)===D&&(ae=new ae(_,w+"enter",ne,a,H),ae.target=R,ae.relatedTarget=je,Y=ae),je=Y,C&&ne)t:{for(ae=C,_=ne,w=0,R=ae;R;R=an(R))w++;for(R=0,Y=_;Y;Y=an(Y))R++;for(;0<w-R;)ae=an(ae),w--;for(;0<R-w;)_=an(_),R--;for(;w--;){if(ae===_||_!==null&&ae===_.alternate)break t;ae=an(ae),_=an(_)}ae=null}else ae=null;C!==null&&um($,U,C,ae,!1),ne!==null&&je!==null&&um($,je,ne,ae,!0)}}e:{if(U=D?Sn(D):window,C=U.nodeName&&U.nodeName.toLowerCase(),C==="select"||C==="input"&&U.type==="file")var F=Tu;else if(_u(U))if(Ru)F=I0;else{F=q0;var re=B0}else C=U.nodeName,!C||C.toLowerCase()!=="input"||U.type!=="checkbox"&&U.type!=="radio"?D&&br(D.elementType)&&(F=Tu):F=H0;if(F&&(F=F(e,D))){Eu($,F,a,H);break e}re&&re(e,U,D),e==="focusout"&&D&&U.type==="number"&&D.memoizedProps.value!=null&&vr(U,"number",U.value)}switch(re=D?Sn(D):window,e){case"focusin":(_u(re)||re.contentEditable==="true")&&(Ul=re,Cr=D,On=null);break;case"focusout":On=Cr=Ul=null;break;case"mousedown":Or=!0;break;case"contextmenu":case"mouseup":case"dragend":Or=!1,ku($,a,H);break;case"selectionchange":if(X0)break;case"keydown":case"keyup":ku($,a,H)}var W;if(Rr)e:{switch(e){case"compositionstart":var le="onCompositionStart";break e;case"compositionend":le="onCompositionEnd";break e;case"compositionupdate":le="onCompositionUpdate";break e}le=void 0}else Ml?Au(e,a)&&(le="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(le="onCompositionStart");le&&(ju&&a.locale!=="ko"&&(Ml||le!=="onCompositionStart"?le==="onCompositionEnd"&&Ml&&(W=xu()):(ya=H,Ar="value"in ya?ya.value:ya.textContent,Ml=!0)),re=Rs(D,le),0<re.length&&(le=new bu(le,e,null,a,H),$.push({event:le,listeners:re}),W?le.data=W:(W=Su(a),W!==null&&(le.data=W)))),(W=O0?z0(e,a):G0(e,a))&&(le=Rs(D,"onBeforeInput"),0<le.length&&(re=new bu("onBeforeInput","beforeinput",null,a,H),$.push({event:re,listeners:le}),re.data=W)),_p($,e,D,a,H)}om($,t)})}function oi(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Rs(e,t){for(var a=t+"Capture",l=[];e!==null;){var s=e,r=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||r===null||(s=_n(e,a),s!=null&&l.unshift(oi(e,s,r)),s=_n(e,t),s!=null&&l.push(oi(e,s,r))),e.tag===3)return l;e=e.return}return[]}function an(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function um(e,t,a,l,s){for(var r=t._reactName,d=[];a!==null&&a!==l;){var h=a,b=h.alternate,D=h.stateNode;if(h=h.tag,b!==null&&b===l)break;h!==5&&h!==26&&h!==27||D===null||(b=D,s?(D=_n(a,r),D!=null&&d.unshift(oi(a,D,b))):s||(D=_n(a,r),D!=null&&d.push(oi(a,D,b)))),a=a.return}d.length!==0&&e.push({event:t,listeners:d})}var Dp=/\r\n?/g,Mp=/\u0000|\uFFFD/g;function dm(e){return(typeof e=="string"?e:""+e).replace(Dp,`
`).replace(Mp,"")}function fm(e,t){return t=dm(t),dm(e)===t}function Ds(){}function ye(e,t,a,l,s,r){switch(a){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||Tl(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&Tl(e,""+l);break;case"className":zi(e,"class",l);break;case"tabIndex":zi(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":zi(e,a,l);break;case"style":mu(e,l,r);break;case"data":if(t!=="object"){zi(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Li(""+l),e.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(a==="formAction"?(t!=="input"&&ye(e,t,"name",s.name,s,null),ye(e,t,"formEncType",s.formEncType,s,null),ye(e,t,"formMethod",s.formMethod,s,null),ye(e,t,"formTarget",s.formTarget,s,null)):(ye(e,t,"encType",s.encType,s,null),ye(e,t,"method",s.method,s,null),ye(e,t,"target",s.target,s,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Li(""+l),e.setAttribute(a,l);break;case"onClick":l!=null&&(e.onclick=Ds);break;case"onScroll":l!=null&&ce("scroll",e);break;case"onScrollEnd":l!=null&&ce("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(u(61));if(a=l.__html,a!=null){if(s.children!=null)throw Error(u(60));e.innerHTML=a}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}a=Li(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""+l):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":l===!0?e.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,l):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(a,l):e.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(a):e.setAttribute(a,l);break;case"popover":ce("beforetoggle",e),ce("toggle",e),Oi(e,"popover",l);break;case"xlinkActuate":Wt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Wt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Wt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Wt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Wt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Wt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Wt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Wt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Wt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Oi(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=r0.get(a)||a,Oi(e,a,l))}}function nc(e,t,a,l,s,r){switch(a){case"style":mu(e,l,r);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(u(61));if(a=l.__html,a!=null){if(s.children!=null)throw Error(u(60));e.innerHTML=a}}break;case"children":typeof l=="string"?Tl(e,l):(typeof l=="number"||typeof l=="bigint")&&Tl(e,""+l);break;case"onScroll":l!=null&&ce("scroll",e);break;case"onScrollEnd":l!=null&&ce("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Ds);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!au.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(s=a.endsWith("Capture"),t=a.slice(2,s?a.length-7:void 0),r=e[ut]||null,r=r!=null?r[a]:null,typeof r=="function"&&e.removeEventListener(t,r,s),typeof l=="function")){typeof r!="function"&&r!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,l,s);break e}a in e?e[a]=l:l===!0?e.setAttribute(a,""):Oi(e,a,l)}}}function et(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ce("error",e),ce("load",e);var l=!1,s=!1,r;for(r in a)if(a.hasOwnProperty(r)){var d=a[r];if(d!=null)switch(r){case"src":l=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:ye(e,t,r,d,a,null)}}s&&ye(e,t,"srcSet",a.srcSet,a,null),l&&ye(e,t,"src",a.src,a,null);return;case"input":ce("invalid",e);var h=r=d=s=null,b=null,D=null;for(l in a)if(a.hasOwnProperty(l)){var H=a[l];if(H!=null)switch(l){case"name":s=H;break;case"type":d=H;break;case"checked":b=H;break;case"defaultChecked":D=H;break;case"value":r=H;break;case"defaultValue":h=H;break;case"children":case"dangerouslySetInnerHTML":if(H!=null)throw Error(u(137,t));break;default:ye(e,t,l,H,a,null)}}cu(e,r,h,b,D,d,s,!1),Gi(e);return;case"select":ce("invalid",e),l=d=r=null;for(s in a)if(a.hasOwnProperty(s)&&(h=a[s],h!=null))switch(s){case"value":r=h;break;case"defaultValue":d=h;break;case"multiple":l=h;default:ye(e,t,s,h,a,null)}t=r,a=d,e.multiple=!!l,t!=null?El(e,!!l,t,!1):a!=null&&El(e,!!l,a,!0);return;case"textarea":ce("invalid",e),r=s=l=null;for(d in a)if(a.hasOwnProperty(d)&&(h=a[d],h!=null))switch(d){case"value":l=h;break;case"defaultValue":s=h;break;case"children":r=h;break;case"dangerouslySetInnerHTML":if(h!=null)throw Error(u(91));break;default:ye(e,t,d,h,a,null)}du(e,l,s,r),Gi(e);return;case"option":for(b in a)if(a.hasOwnProperty(b)&&(l=a[b],l!=null))switch(b){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:ye(e,t,b,l,a,null)}return;case"dialog":ce("beforetoggle",e),ce("toggle",e),ce("cancel",e),ce("close",e);break;case"iframe":case"object":ce("load",e);break;case"video":case"audio":for(l=0;l<ri.length;l++)ce(ri[l],e);break;case"image":ce("error",e),ce("load",e);break;case"details":ce("toggle",e);break;case"embed":case"source":case"link":ce("error",e),ce("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(D in a)if(a.hasOwnProperty(D)&&(l=a[D],l!=null))switch(D){case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:ye(e,t,D,l,a,null)}return;default:if(br(t)){for(H in a)a.hasOwnProperty(H)&&(l=a[H],l!==void 0&&nc(e,t,H,l,a,void 0));return}}for(h in a)a.hasOwnProperty(h)&&(l=a[h],l!=null&&ye(e,t,h,l,a,null))}function Up(e,t,a,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,r=null,d=null,h=null,b=null,D=null,H=null;for(C in a){var $=a[C];if(a.hasOwnProperty(C)&&$!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":b=$;default:l.hasOwnProperty(C)||ye(e,t,C,null,l,$)}}for(var U in l){var C=l[U];if($=a[U],l.hasOwnProperty(U)&&(C!=null||$!=null))switch(U){case"type":r=C;break;case"name":s=C;break;case"checked":D=C;break;case"defaultChecked":H=C;break;case"value":d=C;break;case"defaultValue":h=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(u(137,t));break;default:C!==$&&ye(e,t,U,C,l,$)}}gr(e,d,h,b,D,H,r,s);return;case"select":C=d=h=U=null;for(r in a)if(b=a[r],a.hasOwnProperty(r)&&b!=null)switch(r){case"value":break;case"multiple":C=b;default:l.hasOwnProperty(r)||ye(e,t,r,null,l,b)}for(s in l)if(r=l[s],b=a[s],l.hasOwnProperty(s)&&(r!=null||b!=null))switch(s){case"value":U=r;break;case"defaultValue":h=r;break;case"multiple":d=r;default:r!==b&&ye(e,t,s,r,l,b)}t=h,a=d,l=C,U!=null?El(e,!!a,U,!1):!!l!=!!a&&(t!=null?El(e,!!a,t,!0):El(e,!!a,a?[]:"",!1));return;case"textarea":C=U=null;for(h in a)if(s=a[h],a.hasOwnProperty(h)&&s!=null&&!l.hasOwnProperty(h))switch(h){case"value":break;case"children":break;default:ye(e,t,h,null,l,s)}for(d in l)if(s=l[d],r=a[d],l.hasOwnProperty(d)&&(s!=null||r!=null))switch(d){case"value":U=s;break;case"defaultValue":C=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(u(91));break;default:s!==r&&ye(e,t,d,s,l,r)}uu(e,U,C);return;case"option":for(var ne in a)if(U=a[ne],a.hasOwnProperty(ne)&&U!=null&&!l.hasOwnProperty(ne))switch(ne){case"selected":e.selected=!1;break;default:ye(e,t,ne,null,l,U)}for(b in l)if(U=l[b],C=a[b],l.hasOwnProperty(b)&&U!==C&&(U!=null||C!=null))switch(b){case"selected":e.selected=U&&typeof U!="function"&&typeof U!="symbol";break;default:ye(e,t,b,U,l,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ae in a)U=a[ae],a.hasOwnProperty(ae)&&U!=null&&!l.hasOwnProperty(ae)&&ye(e,t,ae,null,l,U);for(D in l)if(U=l[D],C=a[D],l.hasOwnProperty(D)&&U!==C&&(U!=null||C!=null))switch(D){case"children":case"dangerouslySetInnerHTML":if(U!=null)throw Error(u(137,t));break;default:ye(e,t,D,U,l,C)}return;default:if(br(t)){for(var je in a)U=a[je],a.hasOwnProperty(je)&&U!==void 0&&!l.hasOwnProperty(je)&&nc(e,t,je,void 0,l,U);for(H in l)U=l[H],C=a[H],!l.hasOwnProperty(H)||U===C||U===void 0&&C===void 0||nc(e,t,H,U,l,C);return}}for(var _ in a)U=a[_],a.hasOwnProperty(_)&&U!=null&&!l.hasOwnProperty(_)&&ye(e,t,_,null,l,U);for($ in l)U=l[$],C=a[$],!l.hasOwnProperty($)||U===C||U==null&&C==null||ye(e,t,$,U,l,C)}var ic=null,sc=null;function Ms(e){return e.nodeType===9?e:e.ownerDocument}function mm(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function hm(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function rc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var oc=null;function Cp(){var e=window.event;return e&&e.type==="popstate"?e===oc?!1:(oc=e,!0):(oc=null,!1)}var pm=typeof setTimeout=="function"?setTimeout:void 0,Op=typeof clearTimeout=="function"?clearTimeout:void 0,xm=typeof Promise=="function"?Promise:void 0,zp=typeof queueMicrotask=="function"?queueMicrotask:typeof xm<"u"?function(e){return xm.resolve(null).then(e).catch(Gp)}:pm;function Gp(e){setTimeout(function(){throw e})}function Ga(e){return e==="head"}function gm(e,t){var a=t,l=0,s=0;do{var r=a.nextSibling;if(e.removeChild(a),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(0<l&&8>l){a=l;var d=e.ownerDocument;if(a&1&&ci(d.documentElement),a&2&&ci(d.body),a&4)for(a=d.head,ci(a),d=a.firstChild;d;){var h=d.nextSibling,b=d.nodeName;d[An]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=h}}if(s===0){e.removeChild(r),gi(t);return}s--}else a==="$"||a==="$?"||a==="$!"?s++:l=a.charCodeAt(0)-48;else l=0;a=r}while(a);gi(t)}function cc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":cc(a),mr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function kp(e,t,a,l){for(;e.nodeType===1;){var s=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[An])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(r=e.getAttribute("rel"),r==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(r!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(r=e.getAttribute("src"),(r!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&r&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var r=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===r)return e}else return e;if(e=Bt(e.nextSibling),e===null)break}return null}function Lp(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Bt(e.nextSibling),e===null))return null;return e}function uc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function Bp(e,t){var a=e.ownerDocument;if(e.data!=="$?"||a.readyState==="complete")t();else{var l=function(){t(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Bt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var dc=null;function vm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}function bm(e,t,a){switch(t=Ms(a),e){case"html":if(e=t.documentElement,!e)throw Error(u(452));return e;case"head":if(e=t.head,!e)throw Error(u(453));return e;case"body":if(e=t.body,!e)throw Error(u(454));return e;default:throw Error(u(451))}}function ci(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);mr(e)}var Ut=new Map,ym=new Set;function Us(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ma=Q.d;Q.d={f:qp,r:Hp,D:Ip,C:Vp,L:Xp,m:Yp,X:Zp,S:$p,M:Qp};function qp(){var e=ma.f(),t=Ns();return e||t}function Hp(e){var t=Nl(e);t!==null&&t.tag===5&&t.type==="form"?Bd(t):ma.r(e)}var ln=typeof document>"u"?null:document;function jm(e,t,a){var l=ln;if(l&&typeof t=="string"&&t){var s=St(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof a=="string"&&(s+='[crossorigin="'+a+'"]'),ym.has(s)||(ym.add(s),e={rel:e,crossOrigin:a,href:t},l.querySelector(s)===null&&(t=l.createElement("link"),et(t,"link",e),Ze(t),l.head.appendChild(t)))}}function Ip(e){ma.D(e),jm("dns-prefetch",e,null)}function Vp(e,t){ma.C(e,t),jm("preconnect",e,t)}function Xp(e,t,a){ma.L(e,t,a);var l=ln;if(l&&e&&t){var s='link[rel="preload"][as="'+St(t)+'"]';t==="image"&&a&&a.imageSrcSet?(s+='[imagesrcset="'+St(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(s+='[imagesizes="'+St(a.imageSizes)+'"]')):s+='[href="'+St(e)+'"]';var r=s;switch(t){case"style":r=nn(e);break;case"script":r=sn(e)}Ut.has(r)||(e=g({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Ut.set(r,e),l.querySelector(s)!==null||t==="style"&&l.querySelector(ui(r))||t==="script"&&l.querySelector(di(r))||(t=l.createElement("link"),et(t,"link",e),Ze(t),l.head.appendChild(t)))}}function Yp(e,t){ma.m(e,t);var a=ln;if(a&&e){var l=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+St(l)+'"][href="'+St(e)+'"]',r=s;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=sn(e)}if(!Ut.has(r)&&(e=g({rel:"modulepreload",href:e},t),Ut.set(r,e),a.querySelector(s)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(di(r)))return}l=a.createElement("link"),et(l,"link",e),Ze(l),a.head.appendChild(l)}}}function $p(e,t,a){ma.S(e,t,a);var l=ln;if(l&&e){var s=Al(l).hoistableStyles,r=nn(e);t=t||"default";var d=s.get(r);if(!d){var h={loading:0,preload:null};if(d=l.querySelector(ui(r)))h.loading=5;else{e=g({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Ut.get(r))&&fc(e,a);var b=d=l.createElement("link");Ze(b),et(b,"link",e),b._p=new Promise(function(D,H){b.onload=D,b.onerror=H}),b.addEventListener("load",function(){h.loading|=1}),b.addEventListener("error",function(){h.loading|=2}),h.loading|=4,Cs(d,t,l)}d={type:"stylesheet",instance:d,count:1,state:h},s.set(r,d)}}}function Zp(e,t){ma.X(e,t);var a=ln;if(a&&e){var l=Al(a).hoistableScripts,s=sn(e),r=l.get(s);r||(r=a.querySelector(di(s)),r||(e=g({src:e,async:!0},t),(t=Ut.get(s))&&mc(e,t),r=a.createElement("script"),Ze(r),et(r,"link",e),a.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},l.set(s,r))}}function Qp(e,t){ma.M(e,t);var a=ln;if(a&&e){var l=Al(a).hoistableScripts,s=sn(e),r=l.get(s);r||(r=a.querySelector(di(s)),r||(e=g({src:e,async:!0,type:"module"},t),(t=Ut.get(s))&&mc(e,t),r=a.createElement("script"),Ze(r),et(r,"link",e),a.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},l.set(s,r))}}function wm(e,t,a,l){var s=(s=Ct.current)?Us(s):null;if(!s)throw Error(u(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=nn(a.href),a=Al(s).hoistableStyles,l=a.get(t),l||(l={type:"style",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=nn(a.href);var r=Al(s).hoistableStyles,d=r.get(e);if(d||(s=s.ownerDocument||s,d={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(e,d),(r=s.querySelector(ui(e)))&&!r._p&&(d.instance=r,d.state.loading=5),Ut.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ut.set(e,a),r||Kp(s,e,a,d.state))),t&&l===null)throw Error(u(528,""));return d}if(t&&l!==null)throw Error(u(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=sn(a),a=Al(s).hoistableScripts,l=a.get(t),l||(l={type:"script",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(u(444,e))}}function nn(e){return'href="'+St(e)+'"'}function ui(e){return'link[rel="stylesheet"]['+e+"]"}function Nm(e){return g({},e,{"data-precedence":e.precedence,precedence:null})}function Kp(e,t,a,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),et(t,"link",a),Ze(t),e.head.appendChild(t))}function sn(e){return'[src="'+St(e)+'"]'}function di(e){return"script[async]"+e}function Am(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+St(a.href)+'"]');if(l)return t.instance=l,Ze(l),l;var s=g({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),Ze(l),et(l,"style",s),Cs(l,a.precedence,e),t.instance=l;case"stylesheet":s=nn(a.href);var r=e.querySelector(ui(s));if(r)return t.state.loading|=4,t.instance=r,Ze(r),r;l=Nm(a),(s=Ut.get(s))&&fc(l,s),r=(e.ownerDocument||e).createElement("link"),Ze(r);var d=r;return d._p=new Promise(function(h,b){d.onload=h,d.onerror=b}),et(r,"link",l),t.state.loading|=4,Cs(r,a.precedence,e),t.instance=r;case"script":return r=sn(a.src),(s=e.querySelector(di(r)))?(t.instance=s,Ze(s),s):(l=a,(s=Ut.get(r))&&(l=g({},a),mc(l,s)),e=e.ownerDocument||e,s=e.createElement("script"),Ze(s),et(s,"link",l),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(u(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(l=t.instance,t.state.loading|=4,Cs(l,a.precedence,e));return t.instance}function Cs(e,t,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=l.length?l[l.length-1]:null,r=s,d=0;d<l.length;d++){var h=l[d];if(h.dataset.precedence===t)r=h;else if(r!==s)break}r?r.parentNode.insertBefore(e,r.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function fc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function mc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Os=null;function Sm(e,t,a){if(Os===null){var l=new Map,s=Os=new Map;s.set(a,l)}else s=Os,l=s.get(a),l||(l=new Map,s.set(a,l));if(l.has(e))return l;for(l.set(e,null),a=a.getElementsByTagName(e),s=0;s<a.length;s++){var r=a[s];if(!(r[An]||r[at]||e==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var d=r.getAttribute(t)||"";d=e+d;var h=l.get(d);h?h.push(r):l.set(d,[r])}}return l}function _m(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function Pp(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Em(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var fi=null;function Jp(){}function Fp(e,t,a){if(fi===null)throw Error(u(475));var l=fi;if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var s=nn(a.href),r=e.querySelector(ui(s));if(r){e=r._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(l.count++,l=zs.bind(l),e.then(l,l)),t.state.loading|=4,t.instance=r,Ze(r);return}r=e.ownerDocument||e,a=Nm(a),(s=Ut.get(s))&&fc(a,s),r=r.createElement("link"),Ze(r);var d=r;d._p=new Promise(function(h,b){d.onload=h,d.onerror=b}),et(r,"link",a),t.instance=r}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(l.count++,t=zs.bind(l),e.addEventListener("load",t),e.addEventListener("error",t))}}function Wp(){if(fi===null)throw Error(u(475));var e=fi;return e.stylesheets&&e.count===0&&hc(e,e.stylesheets),0<e.count?function(t){var a=setTimeout(function(){if(e.stylesheets&&hc(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a)}}:null}function zs(){if(this.count--,this.count===0){if(this.stylesheets)hc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Gs=null;function hc(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Gs=new Map,t.forEach(ex,e),Gs=null,zs.call(e))}function ex(e,t){if(!(t.state.loading&4)){var a=Gs.get(e);if(a)var l=a.get(null);else{a=new Map,Gs.set(e,a);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<s.length;r++){var d=s[r];(d.nodeName==="LINK"||d.getAttribute("media")!=="not all")&&(a.set(d.dataset.precedence,d),l=d)}l&&a.set(null,l)}s=t.instance,d=s.getAttribute("data-precedence"),r=a.get(d)||l,r===l&&a.set(null,s),a.set(d,s),this.count++,l=zs.bind(this),s.addEventListener("load",l),s.addEventListener("error",l),r?r.parentNode.insertBefore(s,r.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var mi={$$typeof:I,Provider:null,Consumer:null,_currentValue:P,_currentValue2:P,_threadCount:0};function tx(e,t,a,l,s,r,d,h){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ct(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ct(0),this.hiddenUpdates=ct(null),this.identifierPrefix=l,this.onUncaughtError=s,this.onCaughtError=r,this.onRecoverableError=d,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=h,this.incompleteTransitions=new Map}function Tm(e,t,a,l,s,r,d,h,b,D,H,$){return e=new tx(e,t,a,d,h,b,D,$),t=1,r===!0&&(t|=24),r=xt(3,null,null,t),e.current=r,r.stateNode=e,t=Qr(),t.refCount++,e.pooledCache=t,t.refCount++,r.memoizedState={element:l,isDehydrated:a,cache:t},Fr(r),e}function Rm(e){return e?(e=Gl,e):Gl}function Dm(e,t,a,l,s,r){s=Rm(s),l.context===null?l.context=s:l.pendingContext=s,l=Na(t),l.payload={element:a},r=r===void 0?null:r,r!==null&&(l.callback=r),a=Aa(e,l,t),a!==null&&(jt(a,e,t),Vn(a,e,t))}function Mm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function pc(e,t){Mm(e,t),(e=e.alternate)&&Mm(e,t)}function Um(e){if(e.tag===13){var t=zl(e,67108864);t!==null&&jt(t,e,67108864),pc(e,67108864)}}var ks=!0;function ax(e,t,a,l){var s=M.T;M.T=null;var r=Q.p;try{Q.p=2,xc(e,t,a,l)}finally{Q.p=r,M.T=s}}function lx(e,t,a,l){var s=M.T;M.T=null;var r=Q.p;try{Q.p=8,xc(e,t,a,l)}finally{Q.p=r,M.T=s}}function xc(e,t,a,l){if(ks){var s=gc(l);if(s===null)lc(e,t,l,Ls,a),Om(e,l);else if(ix(s,e,t,a,l))l.stopPropagation();else if(Om(e,l),t&4&&-1<nx.indexOf(e)){for(;s!==null;){var r=Nl(s);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var d=Se(r.pendingLanes);if(d!==0){var h=r;for(h.pendingLanes|=2,h.entangledLanes|=2;d;){var b=1<<31-it(d);h.entanglements[1]|=b,d&=~b}Zt(r),(xe&6)===0&&(js=nt()+500,si(0))}}break;case 13:h=zl(r,2),h!==null&&jt(h,r,2),Ns(),pc(r,2)}if(r=gc(l),r===null&&lc(e,t,l,Ls,a),r===s)break;s=r}s!==null&&l.stopPropagation()}else lc(e,t,l,null,a)}}function gc(e){return e=jr(e),vc(e)}var Ls=null;function vc(e){if(Ls=null,e=wl(e),e!==null){var t=f(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=p(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ls=e,null}function Cm(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch($a()){case bn:return 2;case Di:return 8;case yl:case yn:return 32;case jn:return 268435456;default:return 32}default:return 32}}var bc=!1,ka=null,La=null,Ba=null,hi=new Map,pi=new Map,qa=[],nx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Om(e,t){switch(e){case"focusin":case"focusout":ka=null;break;case"dragenter":case"dragleave":La=null;break;case"mouseover":case"mouseout":Ba=null;break;case"pointerover":case"pointerout":hi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":pi.delete(t.pointerId)}}function xi(e,t,a,l,s,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:a,eventSystemFlags:l,nativeEvent:r,targetContainers:[s]},t!==null&&(t=Nl(t),t!==null&&Um(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function ix(e,t,a,l,s){switch(t){case"focusin":return ka=xi(ka,e,t,a,l,s),!0;case"dragenter":return La=xi(La,e,t,a,l,s),!0;case"mouseover":return Ba=xi(Ba,e,t,a,l,s),!0;case"pointerover":var r=s.pointerId;return hi.set(r,xi(hi.get(r)||null,e,t,a,l,s)),!0;case"gotpointercapture":return r=s.pointerId,pi.set(r,xi(pi.get(r)||null,e,t,a,l,s)),!0}return!1}function zm(e){var t=wl(e.target);if(t!==null){var a=f(t);if(a!==null){if(t=a.tag,t===13){if(t=p(a),t!==null){e.blockedOn=t,Fh(e.priority,function(){if(a.tag===13){var l=yt();l=ur(l);var s=zl(a,l);s!==null&&jt(s,a,l),pc(a,l)}});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Bs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=gc(e.nativeEvent);if(a===null){a=e.nativeEvent;var l=new a.constructor(a.type,a);yr=l,a.target.dispatchEvent(l),yr=null}else return t=Nl(a),t!==null&&Um(t),e.blockedOn=a,!1;t.shift()}return!0}function Gm(e,t,a){Bs(e)&&a.delete(t)}function sx(){bc=!1,ka!==null&&Bs(ka)&&(ka=null),La!==null&&Bs(La)&&(La=null),Ba!==null&&Bs(Ba)&&(Ba=null),hi.forEach(Gm),pi.forEach(Gm)}function qs(e,t){e.blockedOn===t&&(e.blockedOn=null,bc||(bc=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,sx)))}var Hs=null;function km(e){Hs!==e&&(Hs=e,i.unstable_scheduleCallback(i.unstable_NormalPriority,function(){Hs===e&&(Hs=null);for(var t=0;t<e.length;t+=3){var a=e[t],l=e[t+1],s=e[t+2];if(typeof l!="function"){if(vc(l||a)===null)continue;break}var r=Nl(a);r!==null&&(e.splice(t,3),t-=3,vo(r,{pending:!0,data:s,method:a.method,action:l},l,s))}}))}function gi(e){function t(b){return qs(b,e)}ka!==null&&qs(ka,e),La!==null&&qs(La,e),Ba!==null&&qs(Ba,e),hi.forEach(t),pi.forEach(t);for(var a=0;a<qa.length;a++){var l=qa[a];l.blockedOn===e&&(l.blockedOn=null)}for(;0<qa.length&&(a=qa[0],a.blockedOn===null);)zm(a),a.blockedOn===null&&qa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var s=a[l],r=a[l+1],d=s[ut]||null;if(typeof r=="function")d||km(a);else if(d){var h=null;if(r&&r.hasAttribute("formAction")){if(s=r,d=r[ut]||null)h=d.formAction;else if(vc(s)!==null)continue}else h=d.action;typeof h=="function"?a[l+1]=h:(a.splice(l,3),l-=3),km(a)}}}function yc(e){this._internalRoot=e}Is.prototype.render=yc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(u(409));var a=t.current,l=yt();Dm(a,l,e,t,null,null)},Is.prototype.unmount=yc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Dm(e.current,2,null,e,null,null),Ns(),t[jl]=null}};function Is(e){this._internalRoot=e}Is.prototype.unstable_scheduleHydration=function(e){if(e){var t=Wc();e={blockedOn:null,target:e,priority:t};for(var a=0;a<qa.length&&t!==0&&t<qa[a].priority;a++);qa.splice(a,0,e),a===0&&zm(e)}};var Lm=o.version;if(Lm!=="19.1.0")throw Error(u(527,Lm,"19.1.0"));Q.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(u(188)):(e=Object.keys(e).join(","),Error(u(268,e)));return e=v(t),e=e!==null?y(e):null,e=e===null?null:e.stateNode,e};var rx={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:M,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Vs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Vs.isDisabled&&Vs.supportsFiber)try{Za=Vs.inject(rx),tt=Vs}catch{}}return vi.createRoot=function(e,t){if(!m(e))throw Error(u(299));var a=!1,l="",s=Wd,r=ef,d=tf,h=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(d=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(h=t.unstable_transitionCallbacks)),t=Tm(e,1,!1,null,null,a,l,s,r,d,h,null),e[jl]=t.current,ac(e),new yc(t)},vi.hydrateRoot=function(e,t,a){if(!m(e))throw Error(u(299));var l=!1,s="",r=Wd,d=ef,h=tf,b=null,D=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(s=a.identifierPrefix),a.onUncaughtError!==void 0&&(r=a.onUncaughtError),a.onCaughtError!==void 0&&(d=a.onCaughtError),a.onRecoverableError!==void 0&&(h=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(b=a.unstable_transitionCallbacks),a.formState!==void 0&&(D=a.formState)),t=Tm(e,1,!0,t,a??null,l,s,r,d,h,b,D),t.context=Rm(null),a=t.current,l=yt(),l=ur(l),s=Na(l),s.callback=null,Aa(a,s,l),a=l,t.current.lanes=a,Ve(t,a),Zt(t),e[jl]=t.current,ac(e),new Is(t)},vi.version="19.1.0",vi}var Pm;function kx(){if(Pm)return jc.exports;Pm=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(o){console.error(o)}}return i(),jc.exports=Gx(),jc.exports}var Lx=kx();const Bx=dx(Lx);/**
 * react-router v7.7.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Jm="popstate";function qx(i={}){function o(u,m){let{pathname:f,search:p,hash:x}=u.location;return Uc("",{pathname:f,search:p,hash:x},m.state&&m.state.usr||null,m.state&&m.state.key||"default")}function c(u,m){return typeof m=="string"?m:Si(m)}return Ix(o,c,null,i)}function De(i,o){if(i===!1||i===null||typeof i>"u")throw new Error(o)}function qt(i,o){if(!i){typeof console<"u"&&console.warn(o);try{throw new Error(o)}catch{}}}function Hx(){return Math.random().toString(36).substring(2,10)}function Fm(i,o){return{usr:i.state,key:i.key,idx:o}}function Uc(i,o,c=null,u){return{pathname:typeof i=="string"?i:i.pathname,search:"",hash:"",...typeof o=="string"?pn(o):o,state:c,key:o&&o.key||u||Hx()}}function Si({pathname:i="/",search:o="",hash:c=""}){return o&&o!=="?"&&(i+=o.charAt(0)==="?"?o:"?"+o),c&&c!=="#"&&(i+=c.charAt(0)==="#"?c:"#"+c),i}function pn(i){let o={};if(i){let c=i.indexOf("#");c>=0&&(o.hash=i.substring(c),i=i.substring(0,c));let u=i.indexOf("?");u>=0&&(o.search=i.substring(u),i=i.substring(0,u)),i&&(o.pathname=i)}return o}function Ix(i,o,c,u={}){let{window:m=document.defaultView,v5Compat:f=!1}=u,p=m.history,x="POP",v=null,y=g();y==null&&(y=0,p.replaceState({...p.state,idx:y},""));function g(){return(p.state||{idx:null}).idx}function E(){x="POP";let N=g(),T=N==null?null:N-y;y=N,v&&v({action:x,location:z.location,delta:T})}function A(N,T){x="PUSH";let O=Uc(z.location,N,T);y=g()+1;let I=Fm(O,y),S=z.createHref(O);try{p.pushState(I,"",S)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;m.location.assign(S)}f&&v&&v({action:x,location:z.location,delta:1})}function Z(N,T){x="REPLACE";let O=Uc(z.location,N,T);y=g();let I=Fm(O,y),S=z.createHref(O);p.replaceState(I,"",S),f&&v&&v({action:x,location:z.location,delta:0})}function k(N){return Vx(N)}let z={get action(){return x},get location(){return i(m,p)},listen(N){if(v)throw new Error("A history only accepts one active listener");return m.addEventListener(Jm,E),v=N,()=>{m.removeEventListener(Jm,E),v=null}},createHref(N){return o(m,N)},createURL:k,encodeLocation(N){let T=k(N);return{pathname:T.pathname,search:T.search,hash:T.hash}},push:A,replace:Z,go(N){return p.go(N)}};return z}function Vx(i,o=!1){let c="http://localhost";typeof window<"u"&&(c=window.location.origin!=="null"?window.location.origin:window.location.href),De(c,"No window.location.(origin|href) available to create URL");let u=typeof i=="string"?i:Si(i);return u=u.replace(/ $/,"%20"),!o&&u.startsWith("//")&&(u=c+u),new URL(u,c)}function xh(i,o,c="/"){return Xx(i,o,c,!1)}function Xx(i,o,c,u){let m=typeof o=="string"?pn(o):o,f=xa(m.pathname||"/",c);if(f==null)return null;let p=gh(i);Yx(p);let x=null;for(let v=0;x==null&&v<p.length;++v){let y=ag(f);x=eg(p[v],y,u)}return x}function gh(i,o=[],c=[],u=""){let m=(f,p,x)=>{let v={relativePath:x===void 0?f.path||"":x,caseSensitive:f.caseSensitive===!0,childrenIndex:p,route:f};v.relativePath.startsWith("/")&&(De(v.relativePath.startsWith(u),`Absolute route path "${v.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),v.relativePath=v.relativePath.slice(u.length));let y=pa([u,v.relativePath]),g=c.concat(v);f.children&&f.children.length>0&&(De(f.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${y}".`),gh(f.children,o,g,y)),!(f.path==null&&!f.index)&&o.push({path:y,score:Fx(y,f.index),routesMeta:g})};return i.forEach((f,p)=>{if(f.path===""||!f.path?.includes("?"))m(f,p);else for(let x of vh(f.path))m(f,p,x)}),o}function vh(i){let o=i.split("/");if(o.length===0)return[];let[c,...u]=o,m=c.endsWith("?"),f=c.replace(/\?$/,"");if(u.length===0)return m?[f,""]:[f];let p=vh(u.join("/")),x=[];return x.push(...p.map(v=>v===""?f:[f,v].join("/"))),m&&x.push(...p),x.map(v=>i.startsWith("/")&&v===""?"/":v)}function Yx(i){i.sort((o,c)=>o.score!==c.score?c.score-o.score:Wx(o.routesMeta.map(u=>u.childrenIndex),c.routesMeta.map(u=>u.childrenIndex)))}var $x=/^:[\w-]+$/,Zx=3,Qx=2,Kx=1,Px=10,Jx=-2,Wm=i=>i==="*";function Fx(i,o){let c=i.split("/"),u=c.length;return c.some(Wm)&&(u+=Jx),o&&(u+=Qx),c.filter(m=>!Wm(m)).reduce((m,f)=>m+($x.test(f)?Zx:f===""?Kx:Px),u)}function Wx(i,o){return i.length===o.length&&i.slice(0,-1).every((u,m)=>u===o[m])?i[i.length-1]-o[o.length-1]:0}function eg(i,o,c=!1){let{routesMeta:u}=i,m={},f="/",p=[];for(let x=0;x<u.length;++x){let v=u[x],y=x===u.length-1,g=f==="/"?o:o.slice(f.length)||"/",E=Fs({path:v.relativePath,caseSensitive:v.caseSensitive,end:y},g),A=v.route;if(!E&&y&&c&&!u[u.length-1].route.index&&(E=Fs({path:v.relativePath,caseSensitive:v.caseSensitive,end:!1},g)),!E)return null;Object.assign(m,E.params),p.push({params:m,pathname:pa([f,E.pathname]),pathnameBase:sg(pa([f,E.pathnameBase])),route:A}),E.pathnameBase!=="/"&&(f=pa([f,E.pathnameBase]))}return p}function Fs(i,o){typeof i=="string"&&(i={path:i,caseSensitive:!1,end:!0});let[c,u]=tg(i.path,i.caseSensitive,i.end),m=o.match(c);if(!m)return null;let f=m[0],p=f.replace(/(.)\/+$/,"$1"),x=m.slice(1);return{params:u.reduce((y,{paramName:g,isOptional:E},A)=>{if(g==="*"){let k=x[A]||"";p=f.slice(0,f.length-k.length).replace(/(.)\/+$/,"$1")}const Z=x[A];return E&&!Z?y[g]=void 0:y[g]=(Z||"").replace(/%2F/g,"/"),y},{}),pathname:f,pathnameBase:p,pattern:i}}function tg(i,o=!1,c=!0){qt(i==="*"||!i.endsWith("*")||i.endsWith("/*"),`Route path "${i}" will be treated as if it were "${i.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${i.replace(/\*$/,"/*")}".`);let u=[],m="^"+i.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(p,x,v)=>(u.push({paramName:x,isOptional:v!=null}),v?"/?([^\\/]+)?":"/([^\\/]+)"));return i.endsWith("*")?(u.push({paramName:"*"}),m+=i==="*"||i==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):c?m+="\\/*$":i!==""&&i!=="/"&&(m+="(?:(?=\\/|$))"),[new RegExp(m,o?void 0:"i"),u]}function ag(i){try{return i.split("/").map(o=>decodeURIComponent(o).replace(/\//g,"%2F")).join("/")}catch(o){return qt(!1,`The URL path "${i}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${o}).`),i}}function xa(i,o){if(o==="/")return i;if(!i.toLowerCase().startsWith(o.toLowerCase()))return null;let c=o.endsWith("/")?o.length-1:o.length,u=i.charAt(c);return u&&u!=="/"?null:i.slice(c)||"/"}function lg(i,o="/"){let{pathname:c,search:u="",hash:m=""}=typeof i=="string"?pn(i):i;return{pathname:c?c.startsWith("/")?c:ng(c,o):o,search:rg(u),hash:og(m)}}function ng(i,o){let c=o.replace(/\/+$/,"").split("/");return i.split("/").forEach(m=>{m===".."?c.length>1&&c.pop():m!=="."&&c.push(m)}),c.length>1?c.join("/"):"/"}function Ac(i,o,c,u){return`Cannot include a '${i}' character in a manually specified \`to.${o}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${c}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ig(i){return i.filter((o,c)=>c===0||o.route.path&&o.route.path.length>0)}function Bc(i){let o=ig(i);return o.map((c,u)=>u===o.length-1?c.pathname:c.pathnameBase)}function qc(i,o,c,u=!1){let m;typeof i=="string"?m=pn(i):(m={...i},De(!m.pathname||!m.pathname.includes("?"),Ac("?","pathname","search",m)),De(!m.pathname||!m.pathname.includes("#"),Ac("#","pathname","hash",m)),De(!m.search||!m.search.includes("#"),Ac("#","search","hash",m)));let f=i===""||m.pathname==="",p=f?"/":m.pathname,x;if(p==null)x=c;else{let E=o.length-1;if(!u&&p.startsWith("..")){let A=p.split("/");for(;A[0]==="..";)A.shift(),E-=1;m.pathname=A.join("/")}x=E>=0?o[E]:"/"}let v=lg(m,x),y=p&&p!=="/"&&p.endsWith("/"),g=(f||p===".")&&c.endsWith("/");return!v.pathname.endsWith("/")&&(y||g)&&(v.pathname+="/"),v}var pa=i=>i.join("/").replace(/\/\/+/g,"/"),sg=i=>i.replace(/\/+$/,"").replace(/^\/*/,"/"),rg=i=>!i||i==="?"?"":i.startsWith("?")?i:"?"+i,og=i=>!i||i==="#"?"":i.startsWith("#")?i:"#"+i;function cg(i){return i!=null&&typeof i.status=="number"&&typeof i.statusText=="string"&&typeof i.internal=="boolean"&&"data"in i}var bh=["POST","PUT","PATCH","DELETE"];new Set(bh);var ug=["GET",...bh];new Set(ug);var xn=j.createContext(null);xn.displayName="DataRouter";var tr=j.createContext(null);tr.displayName="DataRouterState";j.createContext(!1);var yh=j.createContext({isTransitioning:!1});yh.displayName="ViewTransition";var dg=j.createContext(new Map);dg.displayName="Fetchers";var fg=j.createContext(null);fg.displayName="Await";var Ht=j.createContext(null);Ht.displayName="Navigation";var Ei=j.createContext(null);Ei.displayName="Location";var It=j.createContext({outlet:null,matches:[],isDataRoute:!1});It.displayName="Route";var Hc=j.createContext(null);Hc.displayName="RouteError";function mg(i,{relative:o}={}){De(gn(),"useHref() may be used only in the context of a <Router> component.");let{basename:c,navigator:u}=j.useContext(Ht),{hash:m,pathname:f,search:p}=Ti(i,{relative:o}),x=f;return c!=="/"&&(x=f==="/"?c:pa([c,f])),u.createHref({pathname:x,search:p,hash:m})}function gn(){return j.useContext(Ei)!=null}function va(){return De(gn(),"useLocation() may be used only in the context of a <Router> component."),j.useContext(Ei).location}var jh="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function wh(i){j.useContext(Ht).static||j.useLayoutEffect(i)}function Ic(){let{isDataRoute:i}=j.useContext(It);return i?_g():hg()}function hg(){De(gn(),"useNavigate() may be used only in the context of a <Router> component.");let i=j.useContext(xn),{basename:o,navigator:c}=j.useContext(Ht),{matches:u}=j.useContext(It),{pathname:m}=va(),f=JSON.stringify(Bc(u)),p=j.useRef(!1);return wh(()=>{p.current=!0}),j.useCallback((v,y={})=>{if(qt(p.current,jh),!p.current)return;if(typeof v=="number"){c.go(v);return}let g=qc(v,JSON.parse(f),m,y.relative==="path");i==null&&o!=="/"&&(g.pathname=g.pathname==="/"?o:pa([o,g.pathname])),(y.replace?c.replace:c.push)(g,y.state,y)},[o,c,f,m,i])}j.createContext(null);function Nh(){let{matches:i}=j.useContext(It),o=i[i.length-1];return o?o.params:{}}function Ti(i,{relative:o}={}){let{matches:c}=j.useContext(It),{pathname:u}=va(),m=JSON.stringify(Bc(c));return j.useMemo(()=>qc(i,JSON.parse(m),u,o==="path"),[i,m,u,o])}function pg(i,o){return Ah(i,o)}function Ah(i,o,c,u){De(gn(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:m}=j.useContext(Ht),{matches:f}=j.useContext(It),p=f[f.length-1],x=p?p.params:{},v=p?p.pathname:"/",y=p?p.pathnameBase:"/",g=p&&p.route;{let T=g&&g.path||"";Sh(v,!g||T.endsWith("*")||T.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${v}" (under <Route path="${T}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${T}"> to <Route path="${T==="/"?"*":`${T}/*`}">.`)}let E=va(),A;if(o){let T=typeof o=="string"?pn(o):o;De(y==="/"||T.pathname?.startsWith(y),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${y}" but pathname "${T.pathname}" was given in the \`location\` prop.`),A=T}else A=E;let Z=A.pathname||"/",k=Z;if(y!=="/"){let T=y.replace(/^\//,"").split("/");k="/"+Z.replace(/^\//,"").split("/").slice(T.length).join("/")}let z=xh(i,{pathname:k});qt(g||z!=null,`No routes matched location "${A.pathname}${A.search}${A.hash}" `),qt(z==null||z[z.length-1].route.element!==void 0||z[z.length-1].route.Component!==void 0||z[z.length-1].route.lazy!==void 0,`Matched leaf route at location "${A.pathname}${A.search}${A.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let N=yg(z&&z.map(T=>Object.assign({},T,{params:Object.assign({},x,T.params),pathname:pa([y,m.encodeLocation?m.encodeLocation(T.pathname).pathname:T.pathname]),pathnameBase:T.pathnameBase==="/"?y:pa([y,m.encodeLocation?m.encodeLocation(T.pathnameBase).pathname:T.pathnameBase])})),f,c,u);return o&&N?j.createElement(Ei.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...A},navigationType:"POP"}},N):N}function xg(){let i=Sg(),o=cg(i)?`${i.status} ${i.statusText}`:i instanceof Error?i.message:JSON.stringify(i),c=i instanceof Error?i.stack:null,u="rgba(200,200,200, 0.5)",m={padding:"0.5rem",backgroundColor:u},f={padding:"2px 4px",backgroundColor:u},p=null;return console.error("Error handled by React Router default ErrorBoundary:",i),p=j.createElement(j.Fragment,null,j.createElement("p",null,"💿 Hey developer 👋"),j.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",j.createElement("code",{style:f},"ErrorBoundary")," or"," ",j.createElement("code",{style:f},"errorElement")," prop on your route.")),j.createElement(j.Fragment,null,j.createElement("h2",null,"Unexpected Application Error!"),j.createElement("h3",{style:{fontStyle:"italic"}},o),c?j.createElement("pre",{style:m},c):null,p)}var gg=j.createElement(xg,null),vg=class extends j.Component{constructor(i){super(i),this.state={location:i.location,revalidation:i.revalidation,error:i.error}}static getDerivedStateFromError(i){return{error:i}}static getDerivedStateFromProps(i,o){return o.location!==i.location||o.revalidation!=="idle"&&i.revalidation==="idle"?{error:i.error,location:i.location,revalidation:i.revalidation}:{error:i.error!==void 0?i.error:o.error,location:o.location,revalidation:i.revalidation||o.revalidation}}componentDidCatch(i,o){console.error("React Router caught the following error during render",i,o)}render(){return this.state.error!==void 0?j.createElement(It.Provider,{value:this.props.routeContext},j.createElement(Hc.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function bg({routeContext:i,match:o,children:c}){let u=j.useContext(xn);return u&&u.static&&u.staticContext&&(o.route.errorElement||o.route.ErrorBoundary)&&(u.staticContext._deepestRenderedBoundaryId=o.route.id),j.createElement(It.Provider,{value:i},c)}function yg(i,o=[],c=null,u=null){if(i==null){if(!c)return null;if(c.errors)i=c.matches;else if(o.length===0&&!c.initialized&&c.matches.length>0)i=c.matches;else return null}let m=i,f=c?.errors;if(f!=null){let v=m.findIndex(y=>y.route.id&&f?.[y.route.id]!==void 0);De(v>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(f).join(",")}`),m=m.slice(0,Math.min(m.length,v+1))}let p=!1,x=-1;if(c)for(let v=0;v<m.length;v++){let y=m[v];if((y.route.HydrateFallback||y.route.hydrateFallbackElement)&&(x=v),y.route.id){let{loaderData:g,errors:E}=c,A=y.route.loader&&!g.hasOwnProperty(y.route.id)&&(!E||E[y.route.id]===void 0);if(y.route.lazy||A){p=!0,x>=0?m=m.slice(0,x+1):m=[m[0]];break}}}return m.reduceRight((v,y,g)=>{let E,A=!1,Z=null,k=null;c&&(E=f&&y.route.id?f[y.route.id]:void 0,Z=y.route.errorElement||gg,p&&(x<0&&g===0?(Sh("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),A=!0,k=null):x===g&&(A=!0,k=y.route.hydrateFallbackElement||null)));let z=o.concat(m.slice(0,g+1)),N=()=>{let T;return E?T=Z:A?T=k:y.route.Component?T=j.createElement(y.route.Component,null):y.route.element?T=y.route.element:T=v,j.createElement(bg,{match:y,routeContext:{outlet:v,matches:z,isDataRoute:c!=null},children:T})};return c&&(y.route.ErrorBoundary||y.route.errorElement||g===0)?j.createElement(vg,{location:c.location,revalidation:c.revalidation,component:Z,error:E,children:N(),routeContext:{outlet:null,matches:z,isDataRoute:!0}}):N()},null)}function Vc(i){return`${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function jg(i){let o=j.useContext(xn);return De(o,Vc(i)),o}function wg(i){let o=j.useContext(tr);return De(o,Vc(i)),o}function Ng(i){let o=j.useContext(It);return De(o,Vc(i)),o}function Xc(i){let o=Ng(i),c=o.matches[o.matches.length-1];return De(c.route.id,`${i} can only be used on routes that contain a unique "id"`),c.route.id}function Ag(){return Xc("useRouteId")}function Sg(){let i=j.useContext(Hc),o=wg("useRouteError"),c=Xc("useRouteError");return i!==void 0?i:o.errors?.[c]}function _g(){let{router:i}=jg("useNavigate"),o=Xc("useNavigate"),c=j.useRef(!1);return wh(()=>{c.current=!0}),j.useCallback(async(m,f={})=>{qt(c.current,jh),c.current&&(typeof m=="number"?i.navigate(m):await i.navigate(m,{fromRouteId:o,...f}))},[i,o])}var eh={};function Sh(i,o,c){!o&&!eh[i]&&(eh[i]=!0,qt(!1,c))}j.memo(Eg);function Eg({routes:i,future:o,state:c}){return Ah(i,void 0,c,o)}function mn({to:i,replace:o,state:c,relative:u}){De(gn(),"<Navigate> may be used only in the context of a <Router> component.");let{static:m}=j.useContext(Ht);qt(!m,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:f}=j.useContext(It),{pathname:p}=va(),x=Ic(),v=qc(i,Bc(f),p,u==="path"),y=JSON.stringify(v);return j.useEffect(()=>{x(JSON.parse(y),{replace:o,state:c,relative:u})},[x,y,u,o,c]),null}function rt(i){De(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Tg({basename:i="/",children:o=null,location:c,navigationType:u="POP",navigator:m,static:f=!1}){De(!gn(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let p=i.replace(/^\/*/,"/"),x=j.useMemo(()=>({basename:p,navigator:m,static:f,future:{}}),[p,m,f]);typeof c=="string"&&(c=pn(c));let{pathname:v="/",search:y="",hash:g="",state:E=null,key:A="default"}=c,Z=j.useMemo(()=>{let k=xa(v,p);return k==null?null:{location:{pathname:k,search:y,hash:g,state:E,key:A},navigationType:u}},[p,v,y,g,E,A,u]);return qt(Z!=null,`<Router basename="${p}"> is not able to match the URL "${v}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`),Z==null?null:j.createElement(Ht.Provider,{value:x},j.createElement(Ei.Provider,{children:o,value:Z}))}function Rg({children:i,location:o}){return pg(Cc(i),o)}function Cc(i,o=[]){let c=[];return j.Children.forEach(i,(u,m)=>{if(!j.isValidElement(u))return;let f=[...o,m];if(u.type===j.Fragment){c.push.apply(c,Cc(u.props.children,f));return}De(u.type===rt,`[${typeof u.type=="string"?u.type:u.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),De(!u.props.index||!u.props.children,"An index route cannot have child routes.");let p={id:u.props.id||f.join("-"),caseSensitive:u.props.caseSensitive,element:u.props.element,Component:u.props.Component,index:u.props.index,path:u.props.path,loader:u.props.loader,action:u.props.action,hydrateFallbackElement:u.props.hydrateFallbackElement,HydrateFallback:u.props.HydrateFallback,errorElement:u.props.errorElement,ErrorBoundary:u.props.ErrorBoundary,hasErrorBoundary:u.props.hasErrorBoundary===!0||u.props.ErrorBoundary!=null||u.props.errorElement!=null,shouldRevalidate:u.props.shouldRevalidate,handle:u.props.handle,lazy:u.props.lazy};u.props.children&&(p.children=Cc(u.props.children,f)),c.push(p)}),c}var Qs="get",Ks="application/x-www-form-urlencoded";function ar(i){return i!=null&&typeof i.tagName=="string"}function Dg(i){return ar(i)&&i.tagName.toLowerCase()==="button"}function Mg(i){return ar(i)&&i.tagName.toLowerCase()==="form"}function Ug(i){return ar(i)&&i.tagName.toLowerCase()==="input"}function Cg(i){return!!(i.metaKey||i.altKey||i.ctrlKey||i.shiftKey)}function Og(i,o){return i.button===0&&(!o||o==="_self")&&!Cg(i)}var Xs=null;function zg(){if(Xs===null)try{new FormData(document.createElement("form"),0),Xs=!1}catch{Xs=!0}return Xs}var Gg=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Sc(i){return i!=null&&!Gg.has(i)?(qt(!1,`"${i}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ks}"`),null):i}function kg(i,o){let c,u,m,f,p;if(Mg(i)){let x=i.getAttribute("action");u=x?xa(x,o):null,c=i.getAttribute("method")||Qs,m=Sc(i.getAttribute("enctype"))||Ks,f=new FormData(i)}else if(Dg(i)||Ug(i)&&(i.type==="submit"||i.type==="image")){let x=i.form;if(x==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let v=i.getAttribute("formaction")||x.getAttribute("action");if(u=v?xa(v,o):null,c=i.getAttribute("formmethod")||x.getAttribute("method")||Qs,m=Sc(i.getAttribute("formenctype"))||Sc(x.getAttribute("enctype"))||Ks,f=new FormData(x,i),!zg()){let{name:y,type:g,value:E}=i;if(g==="image"){let A=y?`${y}.`:"";f.append(`${A}x`,"0"),f.append(`${A}y`,"0")}else y&&f.append(y,E)}}else{if(ar(i))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');c=Qs,u=null,m=Ks,p=i}return f&&m==="text/plain"&&(p=f,f=void 0),{action:u,method:c.toLowerCase(),encType:m,formData:f,body:p}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Yc(i,o){if(i===!1||i===null||typeof i>"u")throw new Error(o)}function Lg(i,o,c){let u=typeof i=="string"?new URL(i,typeof window>"u"?"server://singlefetch/":window.location.origin):i;return u.pathname==="/"?u.pathname=`_root.${c}`:o&&xa(u.pathname,o)==="/"?u.pathname=`${o.replace(/\/$/,"")}/_root.${c}`:u.pathname=`${u.pathname.replace(/\/$/,"")}.${c}`,u}async function Bg(i,o){if(i.id in o)return o[i.id];try{let c=await import(i.module);return o[i.id]=c,c}catch(c){return console.error(`Error loading route module \`${i.module}\`, reloading page...`),console.error(c),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function qg(i){return i==null?!1:i.href==null?i.rel==="preload"&&typeof i.imageSrcSet=="string"&&typeof i.imageSizes=="string":typeof i.rel=="string"&&typeof i.href=="string"}async function Hg(i,o,c){let u=await Promise.all(i.map(async m=>{let f=o.routes[m.route.id];if(f){let p=await Bg(f,c);return p.links?p.links():[]}return[]}));return Yg(u.flat(1).filter(qg).filter(m=>m.rel==="stylesheet"||m.rel==="preload").map(m=>m.rel==="stylesheet"?{...m,rel:"prefetch",as:"style"}:{...m,rel:"prefetch"}))}function th(i,o,c,u,m,f){let p=(v,y)=>c[y]?v.route.id!==c[y].route.id:!0,x=(v,y)=>c[y].pathname!==v.pathname||c[y].route.path?.endsWith("*")&&c[y].params["*"]!==v.params["*"];return f==="assets"?o.filter((v,y)=>p(v,y)||x(v,y)):f==="data"?o.filter((v,y)=>{let g=u.routes[v.route.id];if(!g||!g.hasLoader)return!1;if(p(v,y)||x(v,y))return!0;if(v.route.shouldRevalidate){let E=v.route.shouldRevalidate({currentUrl:new URL(m.pathname+m.search+m.hash,window.origin),currentParams:c[0]?.params||{},nextUrl:new URL(i,window.origin),nextParams:v.params,defaultShouldRevalidate:!0});if(typeof E=="boolean")return E}return!0}):[]}function Ig(i,o,{includeHydrateFallback:c}={}){return Vg(i.map(u=>{let m=o.routes[u.route.id];if(!m)return[];let f=[m.module];return m.clientActionModule&&(f=f.concat(m.clientActionModule)),m.clientLoaderModule&&(f=f.concat(m.clientLoaderModule)),c&&m.hydrateFallbackModule&&(f=f.concat(m.hydrateFallbackModule)),m.imports&&(f=f.concat(m.imports)),f}).flat(1))}function Vg(i){return[...new Set(i)]}function Xg(i){let o={},c=Object.keys(i).sort();for(let u of c)o[u]=i[u];return o}function Yg(i,o){let c=new Set;return new Set(o),i.reduce((u,m)=>{let f=JSON.stringify(Xg(m));return c.has(f)||(c.add(f),u.push({key:f,link:m})),u},[])}function _h(){let i=j.useContext(xn);return Yc(i,"You must render this element inside a <DataRouterContext.Provider> element"),i}function $g(){let i=j.useContext(tr);return Yc(i,"You must render this element inside a <DataRouterStateContext.Provider> element"),i}var $c=j.createContext(void 0);$c.displayName="FrameworkContext";function Eh(){let i=j.useContext($c);return Yc(i,"You must render this element inside a <HydratedRouter> element"),i}function Zg(i,o){let c=j.useContext($c),[u,m]=j.useState(!1),[f,p]=j.useState(!1),{onFocus:x,onBlur:v,onMouseEnter:y,onMouseLeave:g,onTouchStart:E}=o,A=j.useRef(null);j.useEffect(()=>{if(i==="render"&&p(!0),i==="viewport"){let z=T=>{T.forEach(O=>{p(O.isIntersecting)})},N=new IntersectionObserver(z,{threshold:.5});return A.current&&N.observe(A.current),()=>{N.disconnect()}}},[i]),j.useEffect(()=>{if(u){let z=setTimeout(()=>{p(!0)},100);return()=>{clearTimeout(z)}}},[u]);let Z=()=>{m(!0)},k=()=>{m(!1),p(!1)};return c?i!=="intent"?[f,A,{}]:[f,A,{onFocus:bi(x,Z),onBlur:bi(v,k),onMouseEnter:bi(y,Z),onMouseLeave:bi(g,k),onTouchStart:bi(E,Z)}]:[!1,A,{}]}function bi(i,o){return c=>{i&&i(c),c.defaultPrevented||o(c)}}function Qg({page:i,...o}){let{router:c}=_h(),u=j.useMemo(()=>xh(c.routes,i,c.basename),[c.routes,i,c.basename]);return u?j.createElement(Pg,{page:i,matches:u,...o}):null}function Kg(i){let{manifest:o,routeModules:c}=Eh(),[u,m]=j.useState([]);return j.useEffect(()=>{let f=!1;return Hg(i,o,c).then(p=>{f||m(p)}),()=>{f=!0}},[i,o,c]),u}function Pg({page:i,matches:o,...c}){let u=va(),{manifest:m,routeModules:f}=Eh(),{basename:p}=_h(),{loaderData:x,matches:v}=$g(),y=j.useMemo(()=>th(i,o,v,m,u,"data"),[i,o,v,m,u]),g=j.useMemo(()=>th(i,o,v,m,u,"assets"),[i,o,v,m,u]),E=j.useMemo(()=>{if(i===u.pathname+u.search+u.hash)return[];let k=new Set,z=!1;if(o.forEach(T=>{let O=m.routes[T.route.id];!O||!O.hasLoader||(!y.some(I=>I.route.id===T.route.id)&&T.route.id in x&&f[T.route.id]?.shouldRevalidate||O.hasClientLoader?z=!0:k.add(T.route.id))}),k.size===0)return[];let N=Lg(i,p,"data");return z&&k.size>0&&N.searchParams.set("_routes",o.filter(T=>k.has(T.route.id)).map(T=>T.route.id).join(",")),[N.pathname+N.search]},[p,x,u,m,y,o,i,f]),A=j.useMemo(()=>Ig(g,m),[g,m]),Z=Kg(g);return j.createElement(j.Fragment,null,E.map(k=>j.createElement("link",{key:k,rel:"prefetch",as:"fetch",href:k,...c})),A.map(k=>j.createElement("link",{key:k,rel:"modulepreload",href:k,...c})),Z.map(({key:k,link:z})=>j.createElement("link",{key:k,...z})))}function Jg(...i){return o=>{i.forEach(c=>{typeof c=="function"?c(o):c!=null&&(c.current=o)})}}var Th=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Th&&(window.__reactRouterVersion="7.7.0")}catch{}function Fg({basename:i,children:o,window:c}){let u=j.useRef();u.current==null&&(u.current=qx({window:c,v5Compat:!0}));let m=u.current,[f,p]=j.useState({action:m.action,location:m.location}),x=j.useCallback(v=>{j.startTransition(()=>p(v))},[p]);return j.useLayoutEffect(()=>m.listen(x),[m,x]),j.createElement(Tg,{basename:i,children:o,location:f.location,navigationType:f.action,navigator:m})}var Rh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,un=j.forwardRef(function({onClick:o,discover:c="render",prefetch:u="none",relative:m,reloadDocument:f,replace:p,state:x,target:v,to:y,preventScrollReset:g,viewTransition:E,...A},Z){let{basename:k}=j.useContext(Ht),z=typeof y=="string"&&Rh.test(y),N,T=!1;if(typeof y=="string"&&z&&(N=y,Th))try{let K=new URL(window.location.href),te=y.startsWith("//")?new URL(K.protocol+y):new URL(y),he=xa(te.pathname,k);te.origin===K.origin&&he!=null?y=he+te.search+te.hash:T=!0}catch{qt(!1,`<Link to="${y}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let O=mg(y,{relative:m}),[I,S,L]=Zg(u,A),G=av(y,{replace:p,state:x,target:v,preventScrollReset:g,relative:m,viewTransition:E});function B(K){o&&o(K),K.defaultPrevented||G(K)}let X=j.createElement("a",{...A,...L,href:N||O,onClick:T||f?o:B,ref:Jg(Z,S),target:v,"data-discover":!z&&c==="render"?"true":void 0});return I&&!z?j.createElement(j.Fragment,null,X,j.createElement(Qg,{page:O})):X});un.displayName="Link";var Wg=j.forwardRef(function({"aria-current":o="page",caseSensitive:c=!1,className:u="",end:m=!1,style:f,to:p,viewTransition:x,children:v,...y},g){let E=Ti(p,{relative:y.relative}),A=va(),Z=j.useContext(tr),{navigator:k,basename:z}=j.useContext(Ht),N=Z!=null&&rv(E)&&x===!0,T=k.encodeLocation?k.encodeLocation(E).pathname:E.pathname,O=A.pathname,I=Z&&Z.navigation&&Z.navigation.location?Z.navigation.location.pathname:null;c||(O=O.toLowerCase(),I=I?I.toLowerCase():null,T=T.toLowerCase()),I&&z&&(I=xa(I,z)||I);const S=T!=="/"&&T.endsWith("/")?T.length-1:T.length;let L=O===T||!m&&O.startsWith(T)&&O.charAt(S)==="/",G=I!=null&&(I===T||!m&&I.startsWith(T)&&I.charAt(T.length)==="/"),B={isActive:L,isPending:G,isTransitioning:N},X=L?o:void 0,K;typeof u=="function"?K=u(B):K=[u,L?"active":null,G?"pending":null,N?"transitioning":null].filter(Boolean).join(" ");let te=typeof f=="function"?f(B):f;return j.createElement(un,{...y,"aria-current":X,className:K,ref:g,style:te,to:p,viewTransition:x},typeof v=="function"?v(B):v)});Wg.displayName="NavLink";var ev=j.forwardRef(({discover:i="render",fetcherKey:o,navigate:c,reloadDocument:u,replace:m,state:f,method:p=Qs,action:x,onSubmit:v,relative:y,preventScrollReset:g,viewTransition:E,...A},Z)=>{let k=iv(),z=sv(x,{relative:y}),N=p.toLowerCase()==="get"?"get":"post",T=typeof x=="string"&&Rh.test(x),O=I=>{if(v&&v(I),I.defaultPrevented)return;I.preventDefault();let S=I.nativeEvent.submitter,L=S?.getAttribute("formmethod")||p;k(S||I.currentTarget,{fetcherKey:o,method:L,navigate:c,replace:m,state:f,relative:y,preventScrollReset:g,viewTransition:E})};return j.createElement("form",{ref:Z,method:N,action:z,onSubmit:u?v:O,...A,"data-discover":!T&&i==="render"?"true":void 0})});ev.displayName="Form";function tv(i){return`${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Dh(i){let o=j.useContext(xn);return De(o,tv(i)),o}function av(i,{target:o,replace:c,state:u,preventScrollReset:m,relative:f,viewTransition:p}={}){let x=Ic(),v=va(),y=Ti(i,{relative:f});return j.useCallback(g=>{if(Og(g,o)){g.preventDefault();let E=c!==void 0?c:Si(v)===Si(y);x(i,{replace:E,state:u,preventScrollReset:m,relative:f,viewTransition:p})}},[v,x,y,c,u,o,i,m,f,p])}var lv=0,nv=()=>`__${String(++lv)}__`;function iv(){let{router:i}=Dh("useSubmit"),{basename:o}=j.useContext(Ht),c=Ag();return j.useCallback(async(u,m={})=>{let{action:f,method:p,encType:x,formData:v,body:y}=kg(u,o);if(m.navigate===!1){let g=m.fetcherKey||nv();await i.fetch(g,c,m.action||f,{preventScrollReset:m.preventScrollReset,formData:v,body:y,formMethod:m.method||p,formEncType:m.encType||x,flushSync:m.flushSync})}else await i.navigate(m.action||f,{preventScrollReset:m.preventScrollReset,formData:v,body:y,formMethod:m.method||p,formEncType:m.encType||x,replace:m.replace,state:m.state,fromRouteId:c,flushSync:m.flushSync,viewTransition:m.viewTransition})},[i,o,c])}function sv(i,{relative:o}={}){let{basename:c}=j.useContext(Ht),u=j.useContext(It);De(u,"useFormAction must be used inside a RouteContext");let[m]=u.matches.slice(-1),f={...Ti(i||".",{relative:o})},p=va();if(i==null){f.search=p.search;let x=new URLSearchParams(f.search),v=x.getAll("index");if(v.some(g=>g==="")){x.delete("index"),v.filter(E=>E).forEach(E=>x.append("index",E));let g=x.toString();f.search=g?`?${g}`:""}}return(!i||i===".")&&m.route.index&&(f.search=f.search?f.search.replace(/^\?/,"?index&"):"?index"),c!=="/"&&(f.pathname=f.pathname==="/"?c:pa([c,f.pathname])),Si(f)}function rv(i,o={}){let c=j.useContext(yh);De(c!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:u}=Dh("useViewTransitionState"),m=Ti(i,{relative:o.relative});if(!c.isTransitioning)return!1;let f=xa(c.currentLocation.pathname,u)||c.currentLocation.pathname,p=xa(c.nextLocation.pathname,u)||c.nextLocation.pathname;return Fs(m.pathname,p)!=null||Fs(m.pathname,f)!=null}function ov(i){return new Ws(function(o,c){var u=fx(o,[]);return new Lc(function(m){var f,p=!1;return Promise.resolve(u).then(function(x){return i(x,o.getContext())}).then(o.setContext).then(function(){p||(f=c(o).subscribe({next:m.next.bind(m),error:m.error.bind(m),complete:m.complete.bind(m)}))}).catch(m.error.bind(m)),function(){p=!0,f&&f.unsubscribe()}})})}function Mh(i){return new Ws(function(o,c){return new Lc(function(u){var m,f,p;try{m=c(o).subscribe({next:function(x){if(x.errors?p=i({graphQLErrors:x.errors,response:x,operation:o,forward:c}):mx(x)&&(p=i({protocolErrors:x.extensions[hx],response:x,operation:o,forward:c})),p){f=p.subscribe({next:u.next.bind(u),error:u.error.bind(u),complete:u.complete.bind(u)});return}u.next(x)},error:function(x){if(p=i({operation:o,networkError:x,graphQLErrors:x&&x.result&&x.result.errors||void 0,forward:c}),p){f=p.subscribe({next:u.next.bind(u),error:u.error.bind(u),complete:u.complete.bind(u)});return}u.error(x)},complete:function(){p||u.complete.bind(u)()}})}catch(x){i({networkError:x,operation:o,forward:c}),u.error(x)}return function(){m&&m.unsubscribe(),f&&m.unsubscribe()}})})}(function(i){px(o,i);function o(c){var u=i.call(this)||this;return u.link=Mh(c),u}return o.prototype.request=function(c,u){return this.link.request(c,u)},o})(Ws);class yi extends Error{}yi.prototype.name="InvalidTokenError";function cv(i){return decodeURIComponent(atob(i).replace(/(.)/g,(o,c)=>{let u=c.charCodeAt(0).toString(16).toUpperCase();return u.length<2&&(u="0"+u),"%"+u}))}function uv(i){let o=i.replace(/-/g,"+").replace(/_/g,"/");switch(o.length%4){case 0:break;case 2:o+="==";break;case 3:o+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return cv(o)}catch{return atob(o)}}function Uh(i,o){if(typeof i!="string")throw new yi("Invalid token specified: must be a string");o||(o={});const c=o.header===!0?0:1,u=i.split(".")[c];if(typeof u!="string")throw new yi(`Invalid token specified: missing part #${c+1}`);let m;try{m=uv(u)}catch(f){throw new yi(`Invalid token specified: invalid base64 for part #${c+1} (${f.message})`)}try{return JSON.parse(m)}catch(f){throw new yi(`Invalid token specified: invalid json for part #${c+1} (${f.message})`)}}const Zc={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_DEBUG_MODE:"true",VITE_SHOW_DEV_TOOLS:"true",VITE_USE_TEST_AUTH:"true"},ee=(i,o="")=>Zc[i]||o,Le=(i,o)=>{const c=Zc[i];return c?parseInt(c,10):o},Ce=(i,o)=>{const c=Zc[i];return c?c.toLowerCase()==="true":o},dv={baseURL:ee("VITE_API_BASE_URL","https://learn.reboot01.com"),graphqlEndpoint:ee("VITE_GRAPHQL_ENDPOINT","https://learn.reboot01.com/api/graphql-engine/v1/graphql"),authEndpoint:ee("VITE_AUTH_ENDPOINT","https://learn.reboot01.com/api/auth/signin"),timeout:Le("VITE_API_TIMEOUT",3e4),retryAttempts:Le("VITE_API_RETRY_ATTEMPTS",3),retryDelay:Le("VITE_API_RETRY_DELAY",1e3),defaultHeaders:{"Content-Type":"application/json",Accept:"application/json"}},fv={tokenKey:ee("VITE_AUTH_TOKEN_KEY","auth_token"),userKey:ee("VITE_AUTH_USER_KEY","auth_user"),refreshTokenKey:ee("VITE_AUTH_REFRESH_TOKEN_KEY","refresh_token"),tokenExpiry:Le("VITE_AUTH_TOKEN_EXPIRY",24*60*60*1e3),autoRefresh:Ce("VITE_AUTH_AUTO_REFRESH",!0),sessionTimeout:Le("VITE_AUTH_SESSION_TIMEOUT",30*60*1e3),rememberMeDuration:Le("VITE_AUTH_REMEMBER_DURATION",30*24*60*60*1e3)},mv={enabled:Ce("VITE_CACHE_ENABLED",!0),durations:{userData:Le("VITE_CACHE_USER_DATA",5*60*1e3),statistics:Le("VITE_CACHE_STATISTICS",10*60*1e3),analytics:Le("VITE_CACHE_ANALYTICS",15*60*1e3),charts:Le("VITE_CACHE_CHARTS",20*60*1e3),achievements:Le("VITE_CACHE_ACHIEVEMENTS",30*60*1e3)},maxEntries:Le("VITE_CACHE_MAX_ENTRIES",100),maxMemoryMB:Le("VITE_CACHE_MAX_MEMORY_MB",50),getKey:(i,o)=>{const c=o?`_${o}`:"";return`${i}${c}`}},hv={theme:{primary:ee("VITE_THEME_PRIMARY","#14b8a6"),secondary:ee("VITE_THEME_SECONDARY","#64748b"),accent:ee("VITE_THEME_ACCENT","#d946ef"),background:ee("VITE_THEME_BACKGROUND","#0f172a"),surface:ee("VITE_THEME_SURFACE","#1e293b")},sizes:{avatar:{xs:ee("VITE_SIZE_AVATAR_XS","w-6 h-6"),sm:ee("VITE_SIZE_AVATAR_SM","w-8 h-8"),md:ee("VITE_SIZE_AVATAR_MD","w-12 h-12"),lg:ee("VITE_SIZE_AVATAR_LG","w-16 h-16"),xl:ee("VITE_SIZE_AVATAR_XL","w-24 h-24"),"2xl":ee("VITE_SIZE_AVATAR_2XL","w-32 h-32")},avatarIcon:{xs:ee("VITE_SIZE_AVATAR_ICON_XS","w-3 h-3"),sm:ee("VITE_SIZE_AVATAR_ICON_SM","w-4 h-4"),md:ee("VITE_SIZE_AVATAR_ICON_MD","w-6 h-6"),lg:ee("VITE_SIZE_AVATAR_ICON_LG","w-8 h-8"),xl:ee("VITE_SIZE_AVATAR_ICON_XL","w-12 h-12"),"2xl":ee("VITE_SIZE_AVATAR_ICON_2XL","w-16 h-16")},avatarStatus:{xs:ee("VITE_SIZE_AVATAR_STATUS_XS","w-2 h-2"),sm:ee("VITE_SIZE_AVATAR_STATUS_SM","w-2 h-2"),md:ee("VITE_SIZE_AVATAR_STATUS_MD","w-3 h-3"),lg:ee("VITE_SIZE_AVATAR_STATUS_LG","w-4 h-4"),xl:ee("VITE_SIZE_AVATAR_STATUS_XL","w-5 h-5"),"2xl":ee("VITE_SIZE_AVATAR_STATUS_2XL","w-6 h-6")},button:{sm:ee("VITE_SIZE_BUTTON_SM","px-3 py-1.5 text-sm rounded-md"),md:ee("VITE_SIZE_BUTTON_MD","px-4 py-2 text-sm rounded-lg"),lg:ee("VITE_SIZE_BUTTON_LG","px-6 py-3 text-base rounded-lg"),xl:ee("VITE_SIZE_BUTTON_XL","px-8 py-4 text-lg rounded-xl")}},animations:{enabled:Ce("VITE_ANIMATIONS_ENABLED",!0),duration:Le("VITE_ANIMATION_DURATION",200),easing:ee("VITE_ANIMATION_EASING","ease-out")},layout:{maxWidth:ee("VITE_LAYOUT_MAX_WIDTH","1200px"),sidebarWidth:ee("VITE_LAYOUT_SIDEBAR_WIDTH","280px"),headerHeight:ee("VITE_LAYOUT_HEADER_HEIGHT","64px")}},pv={chunkSizeWarning:Le("VITE_CHUNK_SIZE_WARNING",5e5),bundleSizeWarning:Le("VITE_BUNDLE_SIZE_WARNING",2e6),enableLazyLoading:Ce("VITE_LAZY_LOADING",!0),enableServiceWorker:Ce("VITE_SERVICE_WORKER",!0),enableCompression:Ce("VITE_COMPRESSION",!0),defaultPageSize:Le("VITE_DEFAULT_PAGE_SIZE",20),maxPageSize:Le("VITE_MAX_PAGE_SIZE",100),queryTimeout:Le("VITE_QUERY_TIMEOUT",1e4)},xv={enableAdvancedCharts:Ce("VITE_FEATURE_ADVANCED_CHARTS",!0),enableRealTimeUpdates:Ce("VITE_FEATURE_REALTIME_UPDATES",!1),enableOfflineMode:Ce("VITE_FEATURE_OFFLINE_MODE",!1),enablePWA:Ce("VITE_FEATURE_PWA",!0),enableAnalytics:Ce("VITE_FEATURE_ANALYTICS",!0),enableDarkMode:Ce("VITE_FEATURE_DARK_MODE",!0),enableAnimations:Ce("VITE_FEATURE_ANIMATIONS",!0),enableKeyboardShortcuts:Ce("VITE_FEATURE_KEYBOARD_SHORTCUTS",!0)},gv={enableCSP:Ce("VITE_SECURITY_CSP",!0),enableHTTPS:Ce("VITE_SECURITY_HTTPS",!0),enableHSTS:Ce("VITE_SECURITY_HSTS",!0),enableXSSProtection:Ce("VITE_SECURITY_XSS_PROTECTION",!0),cspDirectives:{defaultSrc:ee("VITE_CSP_DEFAULT_SRC","'self'"),scriptSrc:ee("VITE_CSP_SCRIPT_SRC","'self' 'unsafe-inline' 'unsafe-eval'"),styleSrc:ee("VITE_CSP_STYLE_SRC","'self' 'unsafe-inline'"),imgSrc:ee("VITE_CSP_IMG_SRC","'self' data: https:"),connectSrc:ee("VITE_CSP_CONNECT_SRC","'self' https://learn.reboot01.com")}},vv={name:ee("VITE_APP_NAME","Student Dashboard"),shortName:ee("VITE_APP_SHORT_NAME","Dashboard"),description:ee("VITE_APP_DESCRIPTION","Professional student analytics dashboard"),version:ee("VITE_APP_VERSION","1.0.0"),startUrl:ee("VITE_APP_START_URL","/"),display:ee("VITE_APP_DISPLAY","standalone"),backgroundColor:ee("VITE_APP_BACKGROUND_COLOR","#0f172a"),themeColor:ee("VITE_APP_THEME_COLOR","#14b8a6"),supportEmail:ee("VITE_SUPPORT_EMAIL","support@example.com"),documentationUrl:ee("VITE_DOCS_URL","https://docs.example.com")},bv={providers:{backblaze:{baseUrl:ee("VITE_AVATAR_BACKBLAZE_URL","https://f005.backblazeb2.com"),apiUrl:ee("VITE_AVATAR_BACKBLAZE_API","https://api005.backblazeb2.com")},github:{baseUrl:ee("VITE_AVATAR_GITHUB_URL","https://avatars.githubusercontent.com"),size:Le("VITE_AVATAR_GITHUB_SIZE",128)},gravatar:{baseUrl:ee("VITE_AVATAR_GRAVATAR_URL","https://www.gravatar.com/avatar"),defaultImage:ee("VITE_AVATAR_GRAVATAR_DEFAULT","identicon")}},enableFallbacks:Ce("VITE_AVATAR_FALLBACKS",!0),fallbackToInitials:Ce("VITE_AVATAR_FALLBACK_INITIALS",!0),fallbackToGithub:Ce("VITE_AVATAR_FALLBACK_GITHUB",!0)},yv={enableMockData:Ce("VITE_MOCK_DATA",!1),mockDelay:Le("VITE_MOCK_DELAY",1e3),enableHotReload:Ce("VITE_HOT_RELOAD",!1)},jv=()=>{const i="production";return{environment:i,isDevelopment:i==="development",isProduction:i==="production",isStaging:i==="staging",api:dv,auth:fv,cache:mv,ui:hv,performance:pv,features:xv,security:gv,app:vv,avatar:bv,dev:yv}},lr=jv(),wv=`
  query GetUserById($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      campus
      profile
      attrs
      createdAt
      updatedAt
    }
  }
`,Nv=lr.api.authEndpoint,Ch=lr.api.graphqlEndpoint,nr=lr.auth.tokenKey,Oh=lr.auth.userKey,Av=(i,o)=>{const c=`${i}:${o}`;return btoa(c)},Sv=async(i,o)=>{try{const c=Av(i,o),u=await fetch(Nv,{method:"POST",headers:{Authorization:`Basic ${c}`,"Content-Type":"application/json"}});if(!u.ok)throw u.status===401?new Error("Invalid credentials. Please check your username/email and password."):u.status===403?new Error("Access forbidden. Please contact support."):u.status>=500?new Error("Server error. Please try again later."):new Error(`Authentication failed: ${u.statusText}`);const m=await u.text();if(!m||m.trim()==="")throw new Error("No token received from server");const f=m.trim().replace(/^["']|["']$/g,"");if(!f.includes(".")||f.split(".").length!==3)throw new Error("Invalid token format received from server");if(!Qc(f))throw new Error("Token format validation failed");const p=Uh(f),v={id:parseInt(p.sub,10),exp:p.exp,iat:p.iat};return{success:!0,token:f,user:v}}catch(c){throw c.name==="InvalidTokenError"?new Error("Invalid token received from server"):c}},_v=async(i,o)=>{try{const c=await Sv(i,o),u=await zh(c.user.id,c.token);return{success:!0,token:c.token,user:u}}catch(c){throw c}},zh=async(i,o)=>{try{const c=await fetch(Ch,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:wv,variables:{userId:i}})});if(!c.ok)throw new Error(`GraphQL request failed: ${c.statusText}`);const u=await c.json();if(u.errors)throw new Error(`GraphQL errors: ${u.errors.map(m=>m.message).join(", ")}`);if(!u.data?.user||u.data.user.length===0)throw new Error("User not found");return u.data.user[0]}catch(c){throw c}},Gh=()=>{try{const i=localStorage.getItem(nr);return i&&!i.startsWith("{")?i:i?JSON.parse(i).state?.token??null:null}catch{return null}},Ev=()=>{try{const i=localStorage.getItem(Oh);if(i)return JSON.parse(i);const o=localStorage.getItem(nr);return o&&o.startsWith("{")?JSON.parse(o).state?.user??null:null}catch{return null}},Tv=()=>({token:Gh(),user:Ev()}),Qc=i=>{if(!i||typeof i!="string")return!1;const o=i.split(".");if(o.length!==3)return!1;try{return o.forEach(c=>{if(!c)throw new Error("Empty part");if(!/^[A-Za-z0-9_-]+$/.test(c))throw new Error("Invalid characters")}),!0}catch{return!1}},Rv=i=>{try{if(!Qc(i))return!0;const o=Uh(i),c=Date.now()/1e3;return o.exp<c}catch{return!0}},ji=()=>{localStorage.removeItem(nr),localStorage.removeItem(Oh),localStorage.removeItem("auth-storage"),localStorage.removeItem("dashboard-preferences")},kh=()=>{const i=Gh();return i?Qc(i)?Rv(i)?(ji(),{}):{Authorization:`Bearer ${i}`}:(ji(),{}):{}},Ys=i=>({id:i,login:"sayedahmed",firstName:"Sayed",lastName:"Ahmed",campus:"bahrain",auditRatio:1.2,totalUp:28e5,totalDown:15e5,profile:JSON.stringify({bio:"Test user for development",location:"Bahrain"}),attrs:{country:"Bahrain",degree:"Computer Science",personal:{email:"sayedahmed97.sad@gmail.com",phone:"+973-12345678"}},createdAt:"2023-01-01T00:00:00Z",updatedAt:new Date().toISOString()}),Dv=new Ws((i,o)=>kh().Authorization?.includes("mock-dev-token")?new Lc(m=>{setTimeout(()=>{const f=i.variables;let p={};const x=i.operationName;x==="GetUserById"||x==="GET_USER_BY_PK"?p={user_by_pk:Ys(f.userId||f.id||1599)}:x?.includes("USER")?p={user_by_pk:Ys(1599),user_public_view:[Ys(1599)]}:p={user_by_pk:Ys(1599)},m.next({data:p}),m.complete()},500)}):o(i)),Mv=xx({uri:Ch}),Uv=ov((i,{headers:o})=>{const c=kh();return{headers:{...o,...c,"Content-Type":"application/json"}}}),Cv=Mh(({graphQLErrors:i,networkError:o})=>{if(i&&i.forEach(({message:c,extensions:u})=>{if(c.includes("JWT")||c.includes("JWS")||c.includes("verify")){ji();return}if(u?.code==="UNAUTHENTICATED"||u?.code==="FORBIDDEN"){ji();return}}),o){const c=o?.statusCode;if(c===401||c===403){ji();return}}}),Ov=new gx({typePolicies:{Query:{fields:{user:{merge(i,o){return o}},user_public_view:{merge(i,o){return o}},user_by_pk:{merge(i,o){return o}},transaction:{merge(i,o){return o}},xp_view:{merge(i,o){return o}},audit:{merge(i,o){return o}},audit_private:{merge(i,o){return o}},progress:{merge(i,o){return o}},progress_by_path_view:{merge(i,o){return o}},result:{merge(i,o){return o}},group:{merge(i,o){return o}},group_user:{merge(i,o){return o}},event:{merge(i,o){return o}},event_user:{merge(i,o){return o}},event_user_view:{merge(i,o){return o}},object:{merge(i,o){return o}},object_child:{merge(i,o){return o}},object_availability:{merge(i,o){return o}},registration:{merge(i,o){return o}},registration_user:{merge(i,o){return o}},registration_user_view:{merge(i,o){return o}},path:{merge(i,o){return o}},path_archive:{merge(i,o){return o}},role:{merge(i,o){return o}},user_role:{merge(i,o){return o}},label:{merge(i,o){return o}},markdown:{merge(i,o){return o}}}},User:{fields:{login:{read(i){return i}}}},Group:{keyFields:["id"]},Event:{keyFields:["id"]},Object:{keyFields:["id"]},Progress:{keyFields:["id"]},Result:{keyFields:["id"]},Transaction:{keyFields:["id"]},Audit:{keyFields:["id"]}},resultCaching:!0,dataIdFromObject:i=>i.__typename&&i.id?`${i.__typename}:${i.id}`:i.__typename&&i.login?`${i.__typename}:${i.login}`:i.__typename==="Path"&&i.path?`Path:${i.path}`:i.__typename&&i.type&&!i.id?`${i.__typename}:${i.type}`:i.__typename&&i.name&&!i.id?`${i.__typename}:${i.name}`:null}),Lh=new vx({link:bx([Cv,Uv,Dv,Mv]),cache:Ov,defaultOptions:{watchQuery:{errorPolicy:"all",fetchPolicy:"cache-first",notifyOnNetworkStatusChange:!0,returnPartialData:!0},query:{errorPolicy:"all",fetchPolicy:"cache-first",returnPartialData:!0},mutate:{errorPolicy:"all"}},connectToDevTools:!1,queryDeduplication:!0,defaultContext:{timeout:3e4}}),ah=i=>{let o;const c=new Set,u=(y,g)=>{const E=typeof y=="function"?y(o):y;if(!Object.is(E,o)){const A=o;o=g??(typeof E!="object"||E===null)?E:Object.assign({},o,E),c.forEach(Z=>Z(o,A))}},m=()=>o,x={setState:u,getState:m,getInitialState:()=>v,subscribe:y=>(c.add(y),()=>c.delete(y))},v=o=i(u,m,x);return x},zv=i=>i?ah(i):ah,Gv=i=>i;function kv(i,o=Gv){const c=ot.useSyncExternalStore(i.subscribe,()=>o(i.getState()),()=>o(i.getInitialState()));return ot.useDebugValue(c),c}const Lv=i=>{const o=zv(i),c=u=>kv(o,u);return Object.assign(c,o),c},Kc=i=>Lv,lh={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_DEBUG_MODE:"true",VITE_SHOW_DEV_TOOLS:"true",VITE_USE_TEST_AUTH:"true"},_i=new Map,$s=i=>{const o=_i.get(i);return o?Object.fromEntries(Object.entries(o.stores).map(([c,u])=>[c,u.getState()])):{}},Bv=(i,o,c)=>{if(i===void 0)return{type:"untracked",connection:o.connect(c)};const u=_i.get(c.name);if(u)return{type:"tracked",store:i,...u};const m={connection:o.connect(c),stores:{}};return _i.set(c.name,m),{type:"tracked",store:i,...m}},qv=(i,o)=>{if(o===void 0)return;const c=_i.get(i);c&&(delete c.stores[o],Object.keys(c.stores).length===0&&_i.delete(i))},Hv=i=>{var o,c;if(!i)return;const u=i.split(`
`),m=u.findIndex(p=>p.includes("api.setState"));if(m<0)return;const f=((o=u[m+1])==null?void 0:o.trim())||"";return(c=/.+ (.+) .+/.exec(f))==null?void 0:c[1]},Iv=(i,o={})=>(c,u,m)=>{const{enabled:f,anonymousActionType:p,store:x,...v}=o;let y;try{y=(f??(lh?"production":void 0)!=="production")&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!y)return i(c,u,m);const{connection:g,...E}=Bv(x,y,v);let A=!0;m.setState=(z,N,T)=>{const O=c(z,N);if(!A)return O;const I=T===void 0?{type:p||Hv(new Error().stack)||"anonymous"}:typeof T=="string"?{type:T}:T;return x===void 0?(g?.send(I,u()),O):(g?.send({...I,type:`${x}/${I.type}`},{...$s(v.name),[x]:m.getState()}),O)},m.devtools={cleanup:()=>{g&&typeof g.unsubscribe=="function"&&g.unsubscribe(),qv(v.name,x)}};const Z=(...z)=>{const N=A;A=!1,c(...z),A=N},k=i(m.setState,u,m);if(E.type==="untracked"?g?.init(k):(E.stores[E.store]=m,g?.init(Object.fromEntries(Object.entries(E.stores).map(([z,N])=>[z,z===E.store?k:N.getState()])))),m.dispatchFromDevtools&&typeof m.dispatch=="function"){let z=!1;const N=m.dispatch;m.dispatch=(...T)=>{(lh?"production":void 0)!=="production"&&T[0].type==="__setState"&&!z&&(console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'),z=!0),N(...T)}}return g.subscribe(z=>{var N;switch(z.type){case"ACTION":if(typeof z.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return _c(z.payload,T=>{if(T.type==="__setState"){if(x===void 0){Z(T.state);return}Object.keys(T.state).length!==1&&console.error(`
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);const O=T.state[x];if(O==null)return;JSON.stringify(m.getState())!==JSON.stringify(O)&&Z(O);return}m.dispatchFromDevtools&&typeof m.dispatch=="function"&&m.dispatch(T)});case"DISPATCH":switch(z.payload.type){case"RESET":return Z(k),x===void 0?g?.init(m.getState()):g?.init($s(v.name));case"COMMIT":if(x===void 0){g?.init(m.getState());return}return g?.init($s(v.name));case"ROLLBACK":return _c(z.state,T=>{if(x===void 0){Z(T),g?.init(m.getState());return}Z(T[x]),g?.init($s(v.name))});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return _c(z.state,T=>{if(x===void 0){Z(T);return}JSON.stringify(m.getState())!==JSON.stringify(T[x])&&Z(T[x])});case"IMPORT_STATE":{const{nextLiftedState:T}=z.payload,O=(N=T.computedStates.slice(-1)[0])==null?void 0:N.state;if(!O)return;Z(x===void 0?O:O[x]),g?.send(null,T);return}case"PAUSE_RECORDING":return A=!A}return}}),k},Bh=Iv,_c=(i,o)=>{let c;try{c=JSON.parse(i)}catch(u){console.error("[zustand devtools middleware] Could not parse the received json",u)}c!==void 0&&o(c)};function qh(i,o){let c;try{c=i()}catch{return}return{getItem:m=>{var f;const p=v=>v===null?null:JSON.parse(v,void 0),x=(f=c.getItem(m))!=null?f:null;return x instanceof Promise?x.then(p):p(x)},setItem:(m,f)=>c.setItem(m,JSON.stringify(f,void 0)),removeItem:m=>c.removeItem(m)}}const Oc=i=>o=>{try{const c=i(o);return c instanceof Promise?c:{then(u){return Oc(u)(c)},catch(u){return this}}}catch(c){return{then(u){return this},catch(u){return Oc(u)(c)}}}},Vv=(i,o)=>(c,u,m)=>{let f={storage:qh(()=>localStorage),partialize:z=>z,version:0,merge:(z,N)=>({...N,...z}),...o},p=!1;const x=new Set,v=new Set;let y=f.storage;if(!y)return i((...z)=>{console.warn(`[zustand persist middleware] Unable to update item '${f.name}', the given storage is currently unavailable.`),c(...z)},u,m);const g=()=>{const z=f.partialize({...u()});return y.setItem(f.name,{state:z,version:f.version})},E=m.setState;m.setState=(z,N)=>{E(z,N),g()};const A=i((...z)=>{c(...z),g()},u,m);m.getInitialState=()=>A;let Z;const k=()=>{var z,N;if(!y)return;p=!1,x.forEach(O=>{var I;return O((I=u())!=null?I:A)});const T=((N=f.onRehydrateStorage)==null?void 0:N.call(f,(z=u())!=null?z:A))||void 0;return Oc(y.getItem.bind(y))(f.name).then(O=>{if(O)if(typeof O.version=="number"&&O.version!==f.version){if(f.migrate){const I=f.migrate(O.state,O.version);return I instanceof Promise?I.then(S=>[!0,S]):[!0,I]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,O.state];return[!1,void 0]}).then(O=>{var I;const[S,L]=O;if(Z=f.merge(L,(I=u())!=null?I:A),c(Z,!0),S)return g()}).then(()=>{T?.(Z,void 0),Z=u(),p=!0,v.forEach(O=>O(Z))}).catch(O=>{T?.(void 0,O)})};return m.persist={setOptions:z=>{f={...f,...z},z.storage&&(y=z.storage)},clearStorage:()=>{y?.removeItem(f.name)},getOptions:()=>f,rehydrate:()=>k(),hasHydrated:()=>p,onHydrate:z=>(x.add(z),()=>{x.delete(z)}),onFinishHydration:z=>(v.add(z),()=>{v.delete(z)})},f.skipHydration||k(),Z||A},Xv=Vv,Kt=Kc()(Xv((i,o)=>({user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,login:(c,u)=>{i({user:c,token:u,isAuthenticated:!0,error:null,isLoading:!1})},logout:()=>{i({user:null,token:null,isAuthenticated:!1,error:null,isLoading:!1})},setLoading:c=>{i({isLoading:c})},setError:c=>{i({error:c,isLoading:!1})},clearError:()=>{i({error:null})},updateUser:c=>{const u=o().user;u&&i({user:{...u,...c}})}}),{name:nr,storage:qh(()=>localStorage),partialize:i=>({user:i.user,token:i.token,isAuthenticated:i.isAuthenticated})})),Hh=()=>Kt(i=>i.user),Yv=()=>Kt(i=>i.token),ir=()=>Kt(i=>i.isAuthenticated),$v=()=>Kt(i=>i.isLoading),Zv=()=>Kt(i=>i.error),Ih=()=>Kt(i=>i.login),Qv=()=>Kt(i=>i.logout),Vh=()=>Kt(i=>i.setLoading),Kv=()=>Kt(i=>i.setError),Pv=()=>Kt(i=>i.clearError),Jv={xpTransactions:[],progress:[],audits:[],skills:[],leaderboard:[],lastUpdated:null},Fv={theme:"dark",compactMode:!1,showAnimations:!0,defaultTab:"profile"},nh=Kc()(Bh((i,o)=>({data:Jv,activeTab:"profile",isLoading:!1,error:null,preferences:Fv,setData:c=>{i(u=>({data:{...u.data,...c,lastUpdated:new Date},error:null}))},setActiveTab:c=>{i({activeTab:c})},setLoading:c=>{i({isLoading:c})},setError:c=>{i({error:c,isLoading:!1})},clearError:()=>{i({error:null})},updatePreferences:c=>{i(m=>({preferences:{...m.preferences,...c}}));const u={...o().preferences,...c};localStorage.setItem("dashboard-preferences",JSON.stringify(u))},refreshData:()=>{i({isLoading:!0,error:null})}}),{name:"dashboard-store"}));if(typeof window<"u"){const i=localStorage.getItem("dashboard-preferences");if(i)try{const o=JSON.parse(i),c=nh.getState();nh.setState({preferences:{...c.preferences,...o}})}catch{}}const Wv={user:null,xpTransactions:[],progress:[],audits:[],skills:[],stats:null};Kc()(Bh((i,o)=>({profiles:new Map,currentProfileId:null,isLoading:!1,error:null,setProfile:(c,u)=>{i(m=>{const f=new Map(m.profiles),p=f.get(c)||{...Wv};return f.set(c,{...p,...u}),{profiles:f,error:null}})},setCurrentProfile:c=>{i({currentProfileId:c})},setLoading:c=>{i({isLoading:c})},setError:c=>{i({error:c,isLoading:!1})},clearError:()=>{i({error:null})},clearProfile:c=>{i(u=>{const m=new Map(u.profiles);return m.delete(c),{profiles:m,currentProfileId:u.currentProfileId===c?null:u.currentProfileId}})},clearAllProfiles:()=>{i({profiles:new Map,currentProfileId:null,error:null})}}),{name:"user-profile-store"}));const Xh=j.createContext({user:null}),eb=({children:i})=>{const o=Hh();return n.jsx(Xh.Provider,{value:{user:o},children:i})},_y=()=>j.useContext(Xh);let tb={data:""},ab=i=>typeof window=="object"?((i?i.querySelector("#_goober"):window._goober)||Object.assign((i||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:i||tb,lb=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,nb=/\/\*[^]*?\*\/|  +/g,ih=/\n+/g,Ia=(i,o)=>{let c="",u="",m="";for(let f in i){let p=i[f];f[0]=="@"?f[1]=="i"?c=f+" "+p+";":u+=f[1]=="f"?Ia(p,f):f+"{"+Ia(p,f[1]=="k"?"":o)+"}":typeof p=="object"?u+=Ia(p,o?o.replace(/([^,])+/g,x=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,v=>/&/.test(v)?v.replace(/&/g,x):x?x+" "+v:v)):f):p!=null&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),m+=Ia.p?Ia.p(f,p):f+":"+p+";")}return c+(o&&m?o+"{"+m+"}":m)+u},ha={},Yh=i=>{if(typeof i=="object"){let o="";for(let c in i)o+=c+Yh(i[c]);return o}return i},ib=(i,o,c,u,m)=>{let f=Yh(i),p=ha[f]||(ha[f]=(v=>{let y=0,g=11;for(;y<v.length;)g=101*g+v.charCodeAt(y++)>>>0;return"go"+g})(f));if(!ha[p]){let v=f!==i?i:(y=>{let g,E,A=[{}];for(;g=lb.exec(y.replace(nb,""));)g[4]?A.shift():g[3]?(E=g[3].replace(ih," ").trim(),A.unshift(A[0][E]=A[0][E]||{})):A[0][g[1]]=g[2].replace(ih," ").trim();return A[0]})(i);ha[p]=Ia(m?{["@keyframes "+p]:v}:v,c?"":"."+p)}let x=c&&ha.g?ha.g:null;return c&&(ha.g=ha[p]),((v,y,g,E)=>{E?y.data=y.data.replace(E,v):y.data.indexOf(v)===-1&&(y.data=g?v+y.data:y.data+v)})(ha[p],o,u,x),p},sb=(i,o,c)=>i.reduce((u,m,f)=>{let p=o[f];if(p&&p.call){let x=p(c),v=x&&x.props&&x.props.className||/^go/.test(x)&&x;p=v?"."+v:x&&typeof x=="object"?x.props?"":Ia(x,""):x===!1?"":x}return u+m+(p??"")},"");function sr(i){let o=this||{},c=i.call?i(o.p):i;return ib(c.unshift?c.raw?sb(c,[].slice.call(arguments,1),o.p):c.reduce((u,m)=>Object.assign(u,m&&m.call?m(o.p):m),{}):c,ab(o.target),o.g,o.o,o.k)}let $h,zc,Gc;sr.bind({g:1});let ga=sr.bind({k:1});function rb(i,o,c,u){Ia.p=o,$h=i,zc=c,Gc=u}function Xa(i,o){let c=this||{};return function(){let u=arguments;function m(f,p){let x=Object.assign({},f),v=x.className||m.className;c.p=Object.assign({theme:zc&&zc()},x),c.o=/ *go\d+/.test(v),x.className=sr.apply(c,u)+(v?" "+v:"");let y=i;return i[0]&&(y=x.as||i,delete x.as),Gc&&y[0]&&Gc(x),$h(y,x)}return m}}var ob=i=>typeof i=="function",kc=(i,o)=>ob(i)?i(o):i,cb=(()=>{let i=0;return()=>(++i).toString()})(),ub=(()=>{let i;return()=>{if(i===void 0&&typeof window<"u"){let o=matchMedia("(prefers-reduced-motion: reduce)");i=!o||o.matches}return i}})(),db=20,Zh=(i,o)=>{switch(o.type){case 0:return{...i,toasts:[o.toast,...i.toasts].slice(0,db)};case 1:return{...i,toasts:i.toasts.map(f=>f.id===o.toast.id?{...f,...o.toast}:f)};case 2:let{toast:c}=o;return Zh(i,{type:i.toasts.find(f=>f.id===c.id)?1:0,toast:c});case 3:let{toastId:u}=o;return{...i,toasts:i.toasts.map(f=>f.id===u||u===void 0?{...f,dismissed:!0,visible:!1}:f)};case 4:return o.toastId===void 0?{...i,toasts:[]}:{...i,toasts:i.toasts.filter(f=>f.id!==o.toastId)};case 5:return{...i,pausedAt:o.time};case 6:let m=o.time-(i.pausedAt||0);return{...i,pausedAt:void 0,toasts:i.toasts.map(f=>({...f,pauseDuration:f.pauseDuration+m}))}}},fb=[],Ec={toasts:[],pausedAt:void 0},Pc=i=>{Ec=Zh(Ec,i),fb.forEach(o=>{o(Ec)})},mb=(i,o="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:o,ariaProps:{role:"status","aria-live":"polite"},message:i,pauseDuration:0,...c,id:c?.id||cb()}),Ri=i=>(o,c)=>{let u=mb(o,i,c);return Pc({type:2,toast:u}),u.id},Re=(i,o)=>Ri("blank")(i,o);Re.error=Ri("error");Re.success=Ri("success");Re.loading=Ri("loading");Re.custom=Ri("custom");Re.dismiss=i=>{Pc({type:3,toastId:i})};Re.remove=i=>Pc({type:4,toastId:i});Re.promise=(i,o,c)=>{let u=Re.loading(o.loading,{...c,...c?.loading});return typeof i=="function"&&(i=i()),i.then(m=>{let f=o.success?kc(o.success,m):void 0;return f?Re.success(f,{id:u,...c,...c?.success}):Re.dismiss(u),m}).catch(m=>{let f=o.error?kc(o.error,m):void 0;f?Re.error(f,{id:u,...c,...c?.error}):Re.dismiss(u)}),i};var hb=ga`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,pb=ga`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,xb=ga`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,gb=Xa("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${i=>i.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${hb} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${pb} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${i=>i.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${xb} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,vb=ga`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,bb=Xa("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${i=>i.secondary||"#e0e0e0"};
  border-right-color: ${i=>i.primary||"#616161"};
  animation: ${vb} 1s linear infinite;
`,yb=ga`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,jb=ga`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,wb=Xa("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${i=>i.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${yb} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${jb} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${i=>i.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Nb=Xa("div")`
  position: absolute;
`,Ab=Xa("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Sb=ga`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_b=Xa("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Sb} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Eb=({toast:i})=>{let{icon:o,type:c,iconTheme:u}=i;return o!==void 0?typeof o=="string"?j.createElement(_b,null,o):o:c==="blank"?null:j.createElement(Ab,null,j.createElement(bb,{...u}),c!=="loading"&&j.createElement(Nb,null,c==="error"?j.createElement(gb,{...u}):j.createElement(wb,{...u})))},Tb=i=>`
0% {transform: translate3d(0,${i*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Rb=i=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${i*-150}%,-1px) scale(.6); opacity:0;}
`,Db="0%{opacity:0;} 100%{opacity:1;}",Mb="0%{opacity:1;} 100%{opacity:0;}",Ub=Xa("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Cb=Xa("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ob=(i,o)=>{let c=i.includes("top")?1:-1,[u,m]=ub()?[Db,Mb]:[Tb(c),Rb(c)];return{animation:o?`${ga(u)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${ga(m)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};j.memo(({toast:i,position:o,style:c,children:u})=>{let m=i.height?Ob(i.position||o||"top-center",i.visible):{opacity:0},f=j.createElement(Eb,{toast:i}),p=j.createElement(Cb,{...i.ariaProps},kc(i.message,i));return j.createElement(Ub,{className:i.className,style:{...m,...c,...i.style}},typeof u=="function"?u({icon:f,message:p}):j.createElement(j.Fragment,null,f,p))});rb(j.createElement);sr`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;const zb=j.createContext(void 0),Gb=({children:i,defaultAutoRefreshInterval:o=6e4,enableNetworkDetection:c=!0,showRefreshNotifications:u=!0})=>{const m=yx(),f=j.useRef(null),p=j.useRef(new Map),x=j.useRef([]),[v,y]=j.useState(!1),[g,E]=j.useState(!1),[A,Z]=j.useState(o),[k,z]=j.useState(navigator.onLine),[N,T]=j.useState(null),[O,I]=j.useState({totalRefreshes:0,lastRefreshTime:null,averageRefreshTime:0,failedRefreshes:0,successfulRefreshes:0}),S=j.useCallback((M,Q)=>{I(P=>{const de=P.totalRefreshes+1,ie=M?P.successfulRefreshes+1:P.successfulRefreshes,Ie=M?P.failedRefreshes:P.failedRefreshes+1;x.current.push(Q),x.current.length>10&&x.current.shift();const we=x.current.reduce((fe,Ee)=>fe+Ee,0)/x.current.length;return{totalRefreshes:de,lastRefreshTime:new Date,averageRefreshTime:we,failedRefreshes:Ie,successfulRefreshes:ie}})},[]),L=j.useCallback(async()=>{if(v)return;y(!0);const M=Date.now();try{await m.refetchQueries({include:"active",updateCache:P=>{P.evict({fieldName:"user"}),P.evict({fieldName:"transaction"}),P.evict({fieldName:"progress"}),P.evict({fieldName:"audit"}),P.gc()}});const Q=Date.now()-M;S(!0,Q),u&&Re.success("Data refreshed successfully",{duration:2e3,position:"bottom-right"})}catch{const P=Date.now()-M;S(!1,P),u&&Re.error("Failed to refresh data",{duration:3e3,position:"bottom-right"})}finally{y(!1)}},[m,v,S,u]),G=j.useCallback(async M=>{if(M.length===0)return;const Q=Date.now();try{await Promise.all(M.map(de=>m.refetchQueries({include:[de],updateCache:ie=>{ie.evict({fieldName:"user"}),ie.evict({fieldName:"transaction"}),ie.evict({fieldName:"progress"}),ie.evict({fieldName:"audit"}),ie.gc()}})));const P=Date.now()-Q;S(!0,P),u&&Re.success(`Refreshed ${M.length} queries`,{duration:2e3,position:"bottom-right"})}catch{const de=Date.now()-Q;S(!1,de),u&&Re.error("Failed to refresh specific data",{duration:3e3,position:"bottom-right"})}},[m,S,u]),B=j.useCallback(async()=>{if(v)return;y(!0);const M=Date.now();try{await m.clearStore(),await m.refetchQueries({include:"active",updateCache:P=>{P.evict({fieldName:"user"}),P.evict({fieldName:"transaction"}),P.evict({fieldName:"progress"}),P.evict({fieldName:"audit"}),P.gc()}});const Q=Date.now()-M;S(!0,Q),u&&Re.success("Cache cleared and data refreshed",{duration:3e3,position:"bottom-right"})}catch{const P=Date.now()-M;S(!1,P),u&&Re.error("Failed to perform hard refresh",{duration:3e3,position:"bottom-right"})}finally{y(!1)}},[m,v,S,u]),X=j.useCallback(M=>{const Q=M||A;f.current&&clearInterval(f.current),f.current=setInterval(()=>{k&&!v&&L()},Q),E(!0),Z(Q),u&&Re.success(`Auto-refresh enabled (${Math.round(Q/1e3)}s interval)`,{duration:2e3,position:"bottom-right"})},[A,k,v,L,u]),K=j.useCallback(()=>{f.current&&(clearInterval(f.current),f.current=null),E(!1),u&&Re.success("Auto-refresh disabled",{duration:2e3,position:"bottom-right"})},[u]),te=j.useCallback((M,Q)=>{p.current.set(M,Q)},[]),he=j.useCallback(M=>{p.current.delete(M)},[]),ve=j.useCallback(async M=>{const Q=p.current.get(M);Q&&await G(Q)},[G]),Me=j.useCallback(async()=>{try{await m.clearStore(),u&&Re.success("Cache cleared successfully",{duration:2e3,position:"bottom-right"})}catch{u&&Re.error("Failed to clear cache",{duration:3e3,position:"bottom-right"})}},[m,u]),Je=j.useCallback(()=>{try{const M=m.cache.extract();return Object.keys(M).length}catch{return 0}},[m]);j.useEffect(()=>{if(!c)return;const M=()=>{z(!0),T(new Date),u&&Re.success("Connection restored - refreshing data",{duration:2e3,position:"bottom-right"}),L()},Q=()=>{z(!1),u&&Re.error("Connection lost - working offline",{duration:3e3,position:"bottom-right"})};return window.addEventListener("online",M),window.addEventListener("offline",Q),()=>{window.removeEventListener("online",M),window.removeEventListener("offline",Q)}},[c,u,L]),j.useEffect(()=>()=>{f.current&&clearInterval(f.current)},[]);const Be={isGlobalRefreshing:v,refreshStats:O,refreshAll:L,refreshSpecific:G,hardRefresh:B,enableAutoRefresh:X,disableAutoRefresh:K,isAutoRefreshEnabled:g,autoRefreshInterval:A,registerComponent:te,unregisterComponent:he,refreshComponent:ve,clearCache:Me,getCacheSize:Je,isOnline:k,lastOnlineTime:N};return n.jsx(zb.Provider,{value:Be,children:i})},Qh=j.createContext(void 0),Ey=()=>{const i=j.useContext(Qh);if(!i)throw new Error("useTheme must be used within a ThemeProvider");return i},kb=({children:i,defaultTheme:o="dark",storageKey:c="app-theme"})=>{const[u,m]=j.useState(o),[f,p]=j.useState("dark");j.useEffect(()=>{const g=localStorage.getItem(c);g&&["dark","light","auto"].includes(g)&&m(g)},[c]),j.useEffect(()=>{const g=()=>{if(u==="auto"){const E=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";p(E)}else p(u)};if(g(),u==="auto"){const E=window.matchMedia("(prefers-color-scheme: dark)"),A=()=>g();return E.addListener(A),()=>E.removeListener(A)}},[u]),j.useEffect(()=>{const g=document.documentElement;g.classList.remove("light","dark"),g.classList.add(f);const E=document.querySelector('meta[name="theme-color"]');E&&E.setAttribute("content",f==="dark"?"#0f172a":"#ffffff"),document.body.style.setProperty("background-color",f==="dark"?"rgb(15, 23, 42)":"rgb(248, 250, 252)")},[f]);const x=g=>{m(g),localStorage.setItem(c,g)},y={theme:u,resolvedTheme:f,setTheme:x,toggleTheme:()=>{x(f==="dark"?"light":"dark")}};return n.jsx(Qh.Provider,{value:y,children:i})},Lb=()=>{const[i,o]=j.useState(""),[c,u]=j.useState(""),[m,f]=j.useState(!1),p=ir(),x=Ih(),v=Vh(),y=Kv(),g=Pv(),E=$v(),A=Zv();if(p)return n.jsx(mn,{to:"/dashboard",replace:!0});const Z=i.includes("@"),k=async()=>{g(),v(!0);try{const N={id:1599,login:"sayedahmed",firstName:"Sayed",lastName:"Ahmed",campus:"bahrain",auditRatio:1.2,totalUp:28e5,totalDown:15e5,profile:JSON.stringify({bio:"Test user for development",location:"Bahrain"}),attrs:{country:"Bahrain",degree:"Computer Science",personal:{email:"sayedahmed97.sad@gmail.com",phone:"+973-12345678"}},createdAt:"2023-01-01T00:00:00Z",updatedAt:new Date().toISOString()},T="mock-dev-token-"+Date.now();x(N,T)}catch(N){y(N instanceof Error?N.message:"Test authentication failed")}finally{v(!1)}},z=async N=>{if(N.preventDefault(),!i.trim()||!c.trim()){y("Please fill in all fields");return}g(),v(!0);try{const T=await _v(i,c);if(T.success&&T.user&&T.token)x(T.user,T.token);else throw new Error("Failed to fetch user data")}catch(T){y(T instanceof Error?T.message:"Authentication failed. Please check your credentials.")}finally{v(!1)}};return n.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 flex items-center justify-center p-4 sm:p-6 lg:p-8",children:n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"w-full max-w-md mx-auto",children:[n.jsxs("div",{className:"text-center mb-6 sm:mb-8",children:[n.jsx(V.div,{initial:{scale:0},animate:{scale:1},transition:{type:"spring",stiffness:200,delay:.1},className:"w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg",children:n.jsx(Bm,{className:"w-8 h-8 sm:w-10 sm:h-10 text-white"})}),n.jsx("h1",{className:"text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2",children:"Welcome Back"}),n.jsx("p",{className:"text-white/70 text-sm sm:text-base",children:"Sign in to your Reboot01 account"})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20",children:[n.jsxs("form",{onSubmit:z,className:"space-y-4 sm:space-y-6",children:[A&&n.jsxs(V.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-3 sm:p-4 flex items-center space-x-3",children:[n.jsx(jx,{className:"w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0"}),n.jsx("p",{className:"text-red-200 text-xs sm:text-sm",children:A})]}),n.jsxs("div",{className:"space-y-2",children:[n.jsx("label",{htmlFor:"identifier",className:"block text-xs sm:text-sm font-medium text-white/80",children:Z?"Email Address":"Login"}),n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:n.jsx(dh,{className:"h-4 w-4 sm:h-5 sm:w-5 text-white/40"})}),n.jsx("input",{id:"identifier",type:"text",value:i,onChange:N=>o(N.target.value),className:"w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base",placeholder:"Enter your email or login",disabled:E})]})]}),n.jsxs("div",{className:"space-y-2",children:[n.jsx("label",{htmlFor:"password",className:"block text-xs sm:text-sm font-medium text-white/80",children:"Password"}),n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:n.jsx(wx,{className:"h-4 w-4 sm:h-5 sm:w-5 text-white/40"})}),n.jsx("input",{id:"password",type:m?"text":"password",value:c,onChange:N=>u(N.target.value),className:"w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base",placeholder:"Enter your password",disabled:E}),n.jsx("button",{type:"button",onClick:()=>f(!m),className:"absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors",disabled:E,children:m?n.jsx(Nx,{className:"h-4 w-4 sm:h-5 sm:w-5"}):n.jsx(Ax,{className:"h-4 w-4 sm:h-5 sm:w-5"})})]})]}),n.jsx(V.button,{type:"submit",disabled:E,whileHover:{scale:E?1:1.02},whileTap:{scale:E?1:.98},className:"w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base",children:E?n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("div",{className:"w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"}),n.jsx("span",{children:"Signing in..."})]}):n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(Bm,{className:"w-4 h-4 sm:w-5 sm:h-5"}),n.jsx("span",{children:"Sign In"})]})})]}),n.jsxs(V.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.3},className:"mt-4 pt-4 border-t border-white/20",children:[n.jsx("button",{type:"button",onClick:k,disabled:E,className:"w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed",children:"🧪 Test Login (Development)"}),n.jsx("p",{className:"text-xs text-white/50 mt-2 text-center",children:"Uses test credentials for development"})]})]}),n.jsx(V.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.4},className:"text-center mt-6 sm:mt-8",children:n.jsx("p",{className:"text-white/50 text-xs sm:text-sm",children:"Reboot01 Student Dashboard"})})]})})},Bb="modulepreload",qb=function(i){return"/"+i},sh={},Pt=function(o,c,u){let m=Promise.resolve();if(c&&c.length>0){let v=function(y){return Promise.all(y.map(g=>Promise.resolve(g).then(E=>({status:"fulfilled",value:E}),E=>({status:"rejected",reason:E}))))};document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),x=p?.nonce||p?.getAttribute("nonce");m=v(c.map(y=>{if(y=qb(y),y in sh)return;sh[y]=!0;const g=y.endsWith(".css"),E=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${E}`))return;const A=document.createElement("link");if(A.rel=g?"stylesheet":Bb,g||(A.as="script"),A.crossOrigin="",A.href=y,x&&A.setAttribute("nonce",x),document.head.appendChild(A),g)return new Promise((Z,k)=>{A.addEventListener("load",Z),A.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${y}`)))})}))}function f(p){const x=new Event("vite:preloadError",{cancelable:!0});if(x.payload=p,window.dispatchEvent(x),!x.defaultPrevented)throw p}return m.then(p=>{for(const x of p||[])x.status==="rejected"&&f(x.reason);return o().catch(f)})},hn=({size:i="md",className:o="",text:c="Loading...",variant:u="default",color:m="emerald",fullScreen:f=!1})=>{const p={sm:"w-6 h-6 sm:w-8 sm:h-8",md:"w-8 h-8 sm:w-10 sm:h-10",lg:"w-12 h-12 sm:w-16 sm:h-16"},x={sm:"text-xs sm:text-sm",md:"text-sm sm:text-base",lg:"text-base sm:text-lg lg:text-xl"},v={sm:"w-2 h-2 sm:w-3 sm:h-3",md:"w-3 h-3 sm:w-4 sm:h-4",lg:"w-5 h-5 sm:w-6 sm:h-6"},g={emerald:{primary:"emerald-400",secondary:"teal-400",light:"emerald-500/20",shadow:"emerald-500/25"},blue:{primary:"blue-400",secondary:"cyan-400",light:"blue-500/20",shadow:"blue-500/25"},purple:{primary:"purple-400",secondary:"violet-400",light:"purple-500/20",shadow:"purple-500/25"},orange:{primary:"orange-400",secondary:"amber-400",light:"orange-500/20",shadow:"orange-500/25"}}[m],E=f?"fixed inset-0 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center":`flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 ${o}`;return u==="minimal"?n.jsxs("div",{className:E,children:[n.jsx(V.div,{className:`${p[i]} border-2 border-transparent border-t-${g.primary} rounded-full`,animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),c&&n.jsx(V.p,{initial:{opacity:0},animate:{opacity:1},className:`mt-3 text-white/80 dark:text-white/80 light:text-slate-600 ${x[i]}`,children:c})]}):u==="pulse"?n.jsxs("div",{className:E,children:[n.jsx(V.div,{className:`${p[i]} bg-gradient-to-r from-${g.primary} to-${g.secondary} rounded-full`,animate:{scale:[1,1.2,1],opacity:[.6,1,.6]},transition:{duration:1.5,repeat:1/0,ease:"easeInOut"}}),c&&n.jsx(V.p,{initial:{opacity:0},animate:{opacity:1},className:`mt-3 text-white/80 dark:text-white/80 light:text-slate-600 ${x[i]}`,children:c})]}):u==="dots"?n.jsxs("div",{className:E,children:[n.jsx("div",{className:"flex space-x-2",children:[0,1,2].map(A=>n.jsx(V.div,{className:`w-3 h-3 bg-gradient-to-r from-${g.primary} to-${g.secondary} rounded-full`,animate:{scale:[1,1.5,1],opacity:[.4,1,.4]},transition:{duration:1.5,repeat:1/0,delay:A*.3,ease:"easeInOut"}},A))}),c&&n.jsx(V.p,{initial:{opacity:0},animate:{opacity:1},className:`mt-3 text-white/80 dark:text-white/80 light:text-slate-600 ${x[i]}`,children:c})]}):n.jsxs("div",{className:E,children:[n.jsxs("div",{className:"relative",children:[n.jsx(V.div,{className:`${p[i]} border-2 sm:border-4 border-emerald-500/20 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm`,animate:{rotate:360},transition:{duration:3,repeat:1/0,ease:"linear"}}),n.jsx(V.div,{className:`absolute inset-0 ${p[i]} border-2 sm:border-4 border-transparent border-t-emerald-400 border-r-teal-400 rounded-full shadow-lg shadow-emerald-500/25`,animate:{rotate:360},transition:{duration:1.2,repeat:1/0,ease:"linear"}}),n.jsx(V.div,{className:`absolute ${i==="lg"?"inset-3 sm:inset-4":i==="md"?"inset-2 sm:inset-3":"inset-1 sm:inset-2"} ${v[i]} bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg`,animate:{scale:[1,1.3,1],opacity:[.6,1,.6],boxShadow:["0 0 10px rgba(52, 211, 153, 0.3)","0 0 20px rgba(52, 211, 153, 0.6)","0 0 10px rgba(52, 211, 153, 0.3)"]},transition:{duration:2,repeat:1/0,ease:"easeInOut"}}),[0,1,2].map(A=>n.jsx(V.div,{className:"absolute w-1 h-1 bg-emerald-300 rounded-full",style:{top:"50%",left:"50%",transformOrigin:i==="lg"?"0 -28px":i==="md"?"0 -20px":"0 -14px"},animate:{rotate:360},transition:{duration:2+A*.5,repeat:1/0,ease:"linear",delay:A*.3}},A))]}),c&&n.jsx(V.p,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.2},className:`mt-4 sm:mt-6 text-white/80 font-semibold ${x[i]} text-center px-4 bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent`,children:c}),n.jsx(V.div,{className:"mt-3 flex space-x-2",initial:{opacity:0},animate:{opacity:1},transition:{delay:.4},children:[0,1,2].map(A=>n.jsx(V.div,{className:"w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg",animate:{scale:[1,1.5,1],opacity:[.4,1,.4],boxShadow:["0 0 5px rgba(52, 211, 153, 0.3)","0 0 15px rgba(52, 211, 153, 0.8)","0 0 5px rgba(52, 211, 153, 0.3)"]},transition:{duration:1.5,repeat:1/0,delay:A*.3,ease:"easeInOut"}},A))})]})},Hb=()=>{const i=Ic(),o=va(),c=Nh(),u=j.useCallback(()=>{const g=o.pathname;if(g==="/dashboard")return"dashboard";if(g.startsWith("/dashboard/piscines/"))return`piscine-${c.piscineType||g.split("/").pop()}`;const E=g.split("/");return E.length>=3&&E[1]==="dashboard"?E[2]:"dashboard"},[o.pathname,c.piscineType]),m=j.useCallback(g=>{if(g.startsWith("piscine-")){const E=g.replace("piscine-","");i(`/dashboard/piscines/${E}`)}else i(g==="dashboard"?"/dashboard":`/dashboard/${g}`)},[i]),f=j.useCallback(()=>{const g=new URLSearchParams(o.search),E={};return g.forEach((A,Z)=>{E[Z]=A}),E},[o]),p=j.useCallback(g=>{const E=new URLSearchParams(o.search);Object.entries(g).forEach(([A,Z])=>{E.set(A,Z)}),i(`${o.pathname}?${E.toString()}`,{replace:!0})},[i,o]),x=j.useCallback((g,E)=>{const A=new URLSearchParams(o.search);A.set(g,E),i(`${o.pathname}?${A.toString()}`,{replace:!0})},[i,o]),v=j.useCallback(()=>{i(o.pathname,{replace:!0})},[i,o]),y=j.useCallback(()=>{const g=u(),E=[{label:"Dashboard",path:"/dashboard"}];if(g!=="dashboard")if(g.startsWith("piscine-")){const A=g.replace("piscine-","");E.push({label:"Piscines",path:"/dashboard/piscines"}),E.push({label:A.charAt(0).toUpperCase()+A.slice(1),path:`/dashboard/piscines/${A}`})}else E.push({label:g.charAt(0).toUpperCase()+g.slice(1),path:`/dashboard/${g}`});return E},[u]);return{getCurrentTab:u,navigateToTab:m,getQueryParams:f,updateQueryParams:p,updateQueryParam:x,clearQueryParams:v,getBreadcrumbs:y,setTab:m,getTab:u}},rh=j.lazy(()=>Pt(()=>Promise.resolve().then(()=>py),[])),Ib=j.lazy(()=>Pt(()=>import("./PiscinesDashboard-D1uPbb8_.js"),__vite__mapDeps([0,1,2,3,4]))),Vb=j.lazy(()=>Pt(()=>import("./LeaderboardSection-DYt1N68b.js"),__vite__mapDeps([5,1,2,6,3,4]))),Xb=j.lazy(()=>Pt(()=>import("./PiscineSection-DsIn_IpP.js"),__vite__mapDeps([7,1,2,6,3,4]))),Yb=j.lazy(()=>Pt(()=>import("./CheckpointDashboard-BbTzW7R4.js"),__vite__mapDeps([8,1,2,3,4]))),$b=j.lazy(()=>Pt(()=>import("./AuditSection-U0fUZcO_.js"),__vite__mapDeps([9,1,2,3,4]))),Zb=j.lazy(()=>Pt(()=>import("./SubjectsSection-DukqH9pQ.js"),__vite__mapDeps([10,1,2,3,4]))),Qb=j.lazy(()=>Pt(()=>import("./GroupSection-nu4XUvPu.js"),__vite__mapDeps([11,1,2,3,4]))),Kb=j.lazy(()=>Pt(()=>import("./EventSection-_x0lDCKZ.js"),__vite__mapDeps([12,1,2,3,4]))),Pb=j.lazy(()=>Pt(()=>import("./UserPreferences-tnINNNo7.js"),__vite__mapDeps([13,1,2,6,3,4]))),Jb=()=>{const i=Hh(),o=Qv(),{getCurrentTab:c,navigateToTab:u}=Hb(),[m,f]=j.useState([]),[p,x]=j.useState(!1),[v,y]=j.useState(null),[g,E]=j.useState(!1),A=c(),Z=u,k=A;ot.useEffect(()=>{if(v&&!g){E(!0);const G=sessionStorage.getItem("userNavigatedToDashboard");v?.dashboard?.defaultTab&&v.dashboard.defaultTab!=="dashboard"&&window.location.pathname==="/dashboard"&&A==="dashboard"&&!G&&u(v.dashboard.defaultTab),sessionStorage.removeItem("userNavigatedToDashboard")}},[v,g,A,u]);const z=ot.useCallback(G=>{G==="dashboard"&&sessionStorage.setItem("userNavigatedToDashboard","true"),Z(G)},[Z]);if(!i)return null;const{data:N}=er(q`
    query GetUserPiscineTypes($userId: Int!) {
      # Standard piscines: /bahrain/bh-module/piscine-{{name}}/
      standard_piscines: transaction(
        where: {
          userId: { _eq: $userId }
          path: { _regex: "bh-module/piscine-" }
        }
        distinct_on: path
      ) {
        path
      }
      # Go piscine: /bahrain/bh-piscine/
      go_piscine: transaction(
        where: {
          userId: { _eq: $userId }
          path: { _regex: "bh-piscine/" }
        }
        limit: 1
      ) {
        path
      }
    }
  `,{variables:{userId:i.id},errorPolicy:"all"});j.useEffect(()=>{const G=()=>{const B=localStorage.getItem(`user-preferences-${i.id}`);if(B)try{const X=JSON.parse(B);y(X)}catch{y(null)}};i?.id&&G()},[i?.id]),j.useEffect(()=>{if(N){const G=new Set;N.standard_piscines&&N.standard_piscines.forEach(B=>{const X=B.path?.match(/piscine-(\w+)/);X&&G.add(X[1])}),N.go_piscine&&N.go_piscine.length>0&&G.add("go"),f(Array.from(G))}},[N]);const T=j.useCallback(()=>{o()},[o]),O=j.useCallback(()=>{const G=localStorage.getItem(`user-preferences-${i.id}`);if(G)try{const B=JSON.parse(G);y(B)}catch{}},[i.id]),I=[{id:"dashboard",label:"Dashboard",icon:fh},{id:"piscines",label:"Piscines",icon:mh},{id:"leaderboard",label:"Leaderboard",icon:ml},{id:"groups",label:"Groups",icon:dn},{id:"audits",label:"Audits",icon:Sx},{id:"checkpoints",label:"Checkpoints",icon:Ps},{id:"events",label:"Events",icon:wi},{id:"subjects",label:"Subjects",icon:_x}],S=ot.useMemo(()=>{if(v?.dashboard?.tabOrder&&Array.isArray(v.dashboard.tabOrder)){const G=[],B=new Map(I.map(X=>[X.id,X]));for(const X of v.dashboard.tabOrder){const K=B.get(X);K&&(G.push(K),B.delete(X))}return G.push(...Array.from(B.values())),G}return I},[v]),L=()=>{if(k.startsWith("piscine-")){const G=k.replace("piscine-","");return n.jsx(Xb,{user:i,piscineType:G})}switch(k){case"dashboard":return n.jsx(rh,{user:i});case"groups":return n.jsx(Qb,{user:i});case"events":return n.jsx(Kb,{user:i});case"piscines":return n.jsx(Ib,{user:i});case"checkpoints":return n.jsx(Yb,{user:i});case"leaderboard":return n.jsx(Vb,{user:i});case"subjects":return n.jsx(Zb,{analytics:null});case"audits":return n.jsx($b,{user:i});default:return n.jsx(rh,{user:i})}};return n.jsxs("div",{className:"h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex flex-col relative overflow-hidden",children:[n.jsxs("div",{className:"fixed inset-0 opacity-30 pointer-events-none z-0",children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"}),n.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)",backgroundSize:"80px 80px"}})]}),n.jsx("header",{className:"flex-shrink-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border-b border-white/20 shadow-2xl relative z-10",children:n.jsx("div",{className:"container-responsive",children:n.jsxs("div",{className:"flex items-center justify-between h-14 sm:h-16 lg:h-20",children:[n.jsxs("div",{className:"flex items-center min-w-0 flex-1",children:[n.jsxs(V.div,{initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{type:"spring",stiffness:200,damping:15},className:"w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-2 sm:mr-3 lg:mr-4 flex-shrink-0 shadow-lg shadow-emerald-500/25 border border-white/20 relative overflow-hidden",children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-pulse"}),n.jsx(hl,{className:"w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white drop-shadow-lg relative z-10"})]}),n.jsxs("div",{className:"min-w-0 flex-1",children:[n.jsxs(V.h1,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.2},className:"text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent truncate",children:[n.jsx("span",{className:"hidden sm:inline",children:"Student Dashboard"}),n.jsx("span",{className:"sm:hidden",children:"Dashboard"})]}),n.jsxs(V.p,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.3},className:"text-xs sm:text-sm lg:text-base text-white/70 truncate",children:[n.jsx("span",{className:"hidden xs:inline",children:"Welcome, "}),n.jsx("span",{className:"text-emerald-400 font-semibold",children:i.login})]})]})]}),n.jsxs("div",{className:"flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0",children:[n.jsx(V.button,{onClick:()=>x(!0),whileHover:{scale:1.05,rotate:90},whileTap:{scale:.95},initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:.4},className:"p-2 sm:p-2.5 lg:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20","aria-label":"Open preferences",title:"Preferences",children:n.jsx(Ex,{className:"w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"})}),n.jsxs(V.button,{onClick:T,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:.5},className:"flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-200 rounded-xl transition-all duration-300 backdrop-blur-sm border border-red-500/20 hover:border-red-500/30 shadow-lg hover:shadow-red-500/25","aria-label":"Logout from dashboard",title:"Logout",children:[n.jsx(Tx,{className:"w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2"}),n.jsx("span",{className:"hidden sm:inline font-semibold text-xs sm:text-sm",children:"Logout"})]})]})]})})}),n.jsx("nav",{className:"flex-shrink-0 bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-lg border-b border-white/10 shadow-xl relative z-10",role:"navigation","aria-label":"Dashboard navigation",children:n.jsx("div",{className:"container-responsive",children:n.jsx("div",{className:"flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide py-2 sm:py-3",role:"tablist",children:S.map((G,B)=>{const X=G.icon,K=k===G.id;return n.jsxs(V.button,{onClick:()=>z(G.id),whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1+B*.05},className:`flex items-center justify-center lg:justify-start px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl transition-all duration-300 whitespace-nowrap min-w-0 shadow-lg touch-target relative overflow-hidden ${K?"bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/30 border border-white/20":"bg-white/10 text-white/70 hover:text-white hover:bg-white/20 border border-white/10 hover:border-white/20"}`,"aria-label":`Switch to ${G.label} tab`,"aria-current":K?"page":void 0,role:"tab",tabIndex:0,title:G.label,children:[K&&n.jsx(V.div,{className:"absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl",initial:{opacity:0},animate:{opacity:1},transition:{duration:.3}}),n.jsx(X,{className:`w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 flex-shrink-0 lg:mr-2 relative z-10 ${K?"drop-shadow-lg":""}`}),n.jsx("span",{className:"hidden lg:inline relative z-10",children:G.label}),!K&&n.jsx(V.div,{className:"absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"})]},G.id)})})})}),n.jsx("main",{className:"flex-1 overflow-y-auto custom-scrollbar",role:"main","aria-label":"Dashboard content",children:n.jsx(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},className:"h-full",children:n.jsx(j.Suspense,{fallback:n.jsx("div",{className:"flex items-center justify-center min-h-[50vh]",children:n.jsx(hn,{size:"lg"})}),children:L()})},k)}),p&&n.jsx(j.Suspense,{fallback:null,children:n.jsx(Pb,{userId:i.id,onClose:()=>{x(!1),O()},defaultTabs:I})})]})},Qt=()=>ir()?n.jsx(j.Suspense,{fallback:n.jsx(hn,{}),children:n.jsx(Jb,{})}):n.jsx(mn,{to:"/login",replace:!0}),_e=i=>i==null||isNaN(i)?"0 B":i<1e3?`${i} B`:i<1e6?`${(i/1e3).toFixed(2)} kB`:`${(i/1e6).toFixed(2)} MB`,Fb=i=>i==null||isNaN(i)?"0.0":i.toFixed(1),Wb=i=>{if(!i||i.length===0)return{skills:[],totalSkills:0};const o={};i.forEach(u=>{const m=u.type?.replace("skill_","")||"unknown";o[m]||(o[m]=[]),o[m].push(u)});const c=Object.keys(o).map(u=>{const m=o[u].sort((g,E)=>new Date(g.createdAt).getTime()-new Date(E.createdAt).getTime()),f=m[m.length-1],p=m.length>1?m[m.length-2]:null,x=f.amount||0,v=p?.amount||0,y=x-v;return{name:ty(u),rawName:u,currentAmount:x,previousAmount:v,progress:y,percentage:x,latestDate:f.createdAt,transactions:m}});return c.sort((u,m)=>m.currentAmount-u.currentAmount),{skills:c,totalSkills:c.length}},Ty=(i,o=1)=>{if(i==null||isNaN(i))return"0.0%";const c=i*100;return c<=100?`${c.toFixed(o)}%`:`100% + ${(c-100).toFixed(o)}%`},on=(i,o)=>{if(!i)return"";try{const c=new Date(i);if(isNaN(c.getTime()))return"";const u={year:"numeric",month:"long",day:"numeric"};return c.toLocaleDateString("en-US",o||u)}catch{return""}},Ry=i=>{if(!i)return"";try{const o=new Date(i);if(isNaN(o.getTime()))return"";const c={year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1};return o.toLocaleString("en-US",c)}catch{return""}},Dy=i=>{if(!i)return"";try{const o=new Date(i);if(isNaN(o.getTime()))return"";const c={year:"numeric",month:"long",day:"numeric"},u={hour:"2-digit",minute:"2-digit",hour12:!1},m=o.toLocaleDateString("en-US",c),f=o.toLocaleTimeString("en-US",u);return`${m} ${f}`}catch{return""}},My=i=>{if(!i)return"";try{const o=new Date(i),u=new Date().getTime()-o.getTime(),m=Math.floor(u/(1e3*60*60*24));return m===0?"Today":m===1?"Yesterday":m<7?`${m} days ago`:m<30?`${Math.floor(m/7)} weeks ago`:m<365?`${Math.floor(m/30)} months ago`:`${Math.floor(m/365)} years ago`}catch{return""}},fl=i=>{if(!i||!Array.isArray(i))return{mainModule:[],piscines:{},checkpoints:[],allPiscines:[],all:[]};const o=[],c={},u=[],m=[];return i.forEach(f=>{if(!f.path){o.push(f);return}if(f.path.includes("piscine-")||f.path.includes("/bh-piscine/")){let p="unknown";if(f.path.includes("/bh-piscine/"))p="go";else{const x=f.path.match(/piscine-(\w+)/);x&&(p=x[1])}c[p]||(c[p]=[]),c[p].push(f),m.push(f);return}if(f.path.includes("checkpoint")){u.push(f);return}o.push(f)}),{mainModule:o,piscines:c,checkpoints:u,allPiscines:m,all:i}},ey=i=>{if(!i||!Array.isArray(i))return{total:0,passed:0,failed:0,passRate:0,bhModule:{total:0,passed:0,failed:0,passRate:0},piscines:{total:0,passed:0,failed:0,passRate:0},checkpoints:{total:0,passed:0,failed:0,passRate:0}};const o=fl(i),c=x=>{const v={};x.forEach(A=>{v[A.path]||(v[A.path]=[]),v[A.path].push(A)});let y=0,g=0,E=0;return Object.keys(v).forEach(A=>{const k=v[A].reduce((z,N)=>new Date(N.createdAt)>new Date(z.createdAt)?N:z);y++,k.isDone&&k.grade>=1?g++:k.isDone&&E++}),{total:y,passed:g,failed:E,passRate:y>0?Math.round(g/y*100):0}},u=c(o.mainModule),m=c(o.allPiscines),f=c(o.checkpoints);return{...c(i),bhModule:u,piscines:m,checkpoints:f}},Kh=i=>i>=60?{notation:"Full-Stack developer",badge:"🏆"}:i>=55?{notation:"Confirmed developer",badge:"⭐"}:i>=50?{notation:"Junior developer",badge:"🚀"}:i>=40?{notation:"Basic developer",badge:"✨"}:i>=30?{notation:"Assistant developer",badge:"📈"}:i>=20?{notation:"Apprentice developer",badge:"🛠️"}:i>=10?{notation:"Beginner developer",badge:"🌱"}:{notation:"Aspiring developer",badge:"💡"},ty=i=>i?i.replace(/_/g," ").replace(/\b\w/g,o=>o.toUpperCase()):"Unknown Skill",ay=i=>i?{dateOfBirth:i.dateOfBirth||i.dob||i.birthDate,placeOfBirth:i.placeOfBirth,countryOfBirth:i.countryOfBirth,nationality:i.nationality||i.country,nationalId:i.nationalId||i.idNumber||i.civilId,cprNumber:i.CPRnumber||i.cprNumber||i.cpr||i.civilId,studentId:i.studentId||i.id,gender:i.gender||i.genders,email:i.email||i.emailAddress,phone:i.Phone||i.PhoneNumber||i.phone||i.phoneNumber||i.mobile,alternativePhone:i.alternativePhone||i.altPhone,emergencyContact:{name:`${i.emergencyFirstName||""} ${i.emergencyLastName||""}`.trim()||i.emergencyContactName||i.emergencyName||i.nextOfKinName,phone:i.emergencyTel||i.emergencyContactPhone||i.emergencyPhone||i.nextOfKinPhone,relationship:i.emergencyAffiliation||i.emergencyContactRelationship||i.emergencyRelation||i.nextOfKinRelation,address:i.emergencyContactAddress||i.emergencyAddress},address:{street:i.addressStreet||i.street||i.address,complementStreet:i.addressComplementStreet,city:i.addressCity||i.city,country:i.addressCountry||i.country||"Bahrain",postalCode:i.addressPostalCode||i.postalCode||i.zipCode,area:i.addressArea||i.area||i.district},cohort:i.cohort||i.cohortName||ly(i.path),cohortNumber:i.cohortNumber||i.batch||ny(i.cohort),academicLevel:i.academicLevel||i.educationLevel,degree:i.Degree||i.degree||i.qualification,qualification:i.qualification||i.qualifica,schoolAndDegree:i.schoolanddegree,graduationDate:i.graddate,howDidYouHear:i.howdidyou,employment:i.employment,jobTitle:i.jobtitle||i.jobTitle||i.position,currentEmployer:i.currentEmployer||i.employer,otherEmployer:i.otheremp,workExperience:i.workExperience||i.experience,profilePicture:i["pro-picUploadId"]||i.profilePic||i.avatar,idCardUpload:i["id-cardUploadId"],linkedIn:i.linkedIn||i.linkedin,github:i.github||i.githubUsername,personalWebsite:i.website||i.personalSite,medicalInfo:i.medicalInfo,allergies:i.allergies||i.medicalAllergies,medicalConditions:i.medicalConditions||i.healthConditions,bloodType:i.bloodType||i.bloodGroup,other:i.other,ifOther:i.ifother,otherEq:i.othereq,generalConditionsAccepted:i["general-conditionsAccepted"]}:{},ly=i=>{if(!i)return null;const o=i.match(/\/bahrain\/bh-([^/]+)\//);if(o)return o[1];const c=i.match(/\/bahrain\/([^/]+)\//);return c?c[1]:null},ny=i=>{if(!i)return null;const o=i.match(/(\d+)/);return o?o[1]:null},oh=i=>{if(!i)return"";const o=i.replace(/\D/g,"");return o.startsWith("973")?`+973 ${o.slice(3,7)} ${o.slice(7)}`:o.length>10?`+${o}`:o.length===8?`${o.slice(0,4)} ${o.slice(4)}`:i},iy=(i,o)=>{if(!i||!Array.isArray(i)||o<1)return null;const c=i.filter(k=>k.type==="xp").sort((k,z)=>new Date(k.createdAt).getTime()-new Date(z.createdAt).getTime()),u=Math.pow(o-1,2)*1e3,m=Math.pow(o,2)*1e3;let f=0,p=null,x=0,v=[];for(let k=0;k<c.length;k++){const z=c[k],N=f;f+=z.amount||0,Math.floor(Math.sqrt(f/1e3))+1>=o&&!p&&(p=z.createdAt,x=N),p&&new Date(z.createdAt)>new Date(p)&&v.push(z)}const y=v.reduce((k,z)=>k+(z.amount||0),0),g=Math.pow(o+1,2)*1e3,E=x+y,A=g-E;return{currentLevel:o,levelStartXP:u/1e3,levelEndXP:m/1e3,nextLevelXP:g/1e3,levelAchievedAt:p,xpAtLevelAchievement:x/1e3,xpEarnedSinceLevel:y/1e3,currentTotalXP:E/1e3,remainingXP:A/1e3,transactionsAfterLevel:v.length,transactionDetails:v.map(k=>({date:k.createdAt,amount:k.amount,path:k.path,type:k.type}))}},sy=(i,o)=>{const[c,u]=j.useState(null),[m,f]=j.useState(!1);return j.useEffect(()=>{if(!i||!o||!i.includes("learn.reboot01.com")){u(i);return}return(async()=>{f(!0);try{const x=await fetch(i,{headers:{Authorization:`Bearer ${o}`}});if(x.ok){const v=await x.blob(),y=URL.createObjectURL(v);u(y)}else u(null)}catch(x){console.error("Failed to fetch authenticated avatar:",x),u(null)}finally{f(!1)}})(),()=>{}},[i,o]),j.useEffect(()=>()=>{c&&c.startsWith("blob:")&&URL.revokeObjectURL(c)},[c]),{authenticatedUrl:c,loading:m}},ry=({user:i,size:o="md",className:c="",showBorder:u=!1,animate:m=!0,onClick:f,...p})=>{const[x,v]=j.useState(!1),y={xs:"w-6 h-6",sm:"w-8 h-8",md:"w-12 h-12",lg:"w-16 h-16",xl:"w-24 h-24","2xl":"w-32 h-32"},g={xs:"w-3 h-3",sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8",xl:"w-12 h-12","2xl":"w-16 h-16"},E=G=>{if(!G)return null;const B=G.attrs||{};if(B.avatar&&typeof B.avatar=="string"){if(B.avatar.startsWith("data:image/")||B.avatar.startsWith("http"))return B.avatar;if(B.avatar.length>100&&!B.avatar.includes(" "))return`data:image/jpeg;base64,${B.avatar}`}return B.avatarUrl&&typeof B.avatarUrl=="string"?B.avatarUrl.startsWith("http")?B.avatarUrl:null:B.picture&&typeof B.picture=="string"?B.picture.startsWith("http")?B.picture:null:B.image&&typeof B.image=="string"?B.image.startsWith("http")?B.image:null:G.profile&&typeof G.profile=="string"&&(G.profile.startsWith("data:image/")||G.profile.startsWith("http"))?G.profile:G.login&&typeof G.login=="string"?typeof window<"u"&&localStorage.getItem("reboot_token")||null?`https://learn.reboot01.com/git/${G.login}.png`:`https://learn.reboot01.com/git/${G.login}.png`:null},A=G=>{if(!G)return"U";const B=G.attrs||{},X=G.firstName||B.firstName||B.first_name,K=G.lastName||B.lastName||B.last_name;return X&&K?`${X[0].toUpperCase()}${K[0].toUpperCase()}`:X?X[0].toUpperCase():K?K[0].toUpperCase():B.displayName?B.displayName[0].toUpperCase():B.fullName?B.fullName[0].toUpperCase():B.name?B.name[0].toUpperCase():G.login?G.login[0].toUpperCase():"U"},Z=E(i),k=A(i),z=typeof window<"u"&&localStorage.getItem("reboot_token")||null,{authenticatedUrl:N}=sy(Z,z),T=N&&!x,I=((G="default")=>{const B=["from-emerald-500 to-teal-600","from-teal-500 to-cyan-600","from-green-500 to-emerald-600","from-cyan-500 to-blue-600","from-blue-500 to-indigo-600","from-indigo-500 to-purple-600","from-emerald-400 to-teal-500","from-teal-400 to-cyan-500"],X=G.split("").reduce((K,te)=>(K=(K<<5)-K+te.charCodeAt(0),K&K),0);return B[Math.abs(X)%B.length]})(i?.login),S=`
    ${y[o]}
    rounded-full
    flex items-center justify-center
    overflow-hidden
    relative
    ${u?"ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-900 shadow-lg shadow-emerald-500/25":""}
    ${f?"cursor-pointer hover:ring-2 hover:ring-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300":""}
    ${c}
  `,L=n.jsx("div",{className:S,onClick:f,...p,children:T?n.jsx("img",{src:N||Z,alt:`${i?.login||"User"} avatar`,className:"w-full h-full object-cover",onError:()=>v(!0)}):n.jsx("div",{className:`w-full h-full bg-gradient-to-br ${I} flex items-center justify-center`,children:k.length>1?n.jsx("span",{className:`font-semibold text-white ${o==="xs"?"text-xs":o==="sm"?"text-sm":o==="md"?"text-base":o==="lg"?"text-lg":o==="xl"?"text-2xl":"text-3xl"}`,children:k}):n.jsx(hl,{className:`${g[o]} text-white`})})});return m?n.jsx(V.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},whileHover:{scale:1.1,y:-2},whileTap:{scale:.95},transition:{type:"spring",stiffness:300,damping:20},children:L}):L},ch=({user:i,analytics:o})=>{const c=o.user,u=Yv(),m=()=>{const g=c.attrs?.["pro-picUploadId"];return u&&g?`https://learn.reboot01.com/api/storage?token=${u}&fileId=${g}`:null},f=ay(c.attrs||{}),p=ot.useMemo(()=>{if(!o?.rawData?.events)return null;const g=o.rawData.events.find(A=>A.event?.path==="/bahrain/bh-module"||A.event?.path?.includes("bh-module"));if(g)return{date:g.createdAt,label:"Date Joined",description:"Started main curriculum"};const E=o.rawData.events.filter(A=>A.createdAt).sort((A,Z)=>new Date(A.createdAt).getTime()-new Date(Z.createdAt).getTime())[0];return E?{date:E.createdAt,label:"Date Joined Program",description:"Started learning journey"}:null},[o]),x=(Math.floor(o.level.current/10)+1)*10,v=x-o.level.current,y=Kh(x);return n.jsxs("div",{className:"space-y-8 relative pt-0",children:[n.jsxs("div",{className:"fixed inset-0 opacity-20 pointer-events-none z-0",children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-teal-500/5"}),n.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 25px 25px, rgba(52, 211, 153, 0.08) 2px, transparent 0)",backgroundSize:"50px 50px"}})]}),n.jsxs("div",{className:"relative z-10 space-y-8",children:[n.jsxs(V.div,{initial:{opacity:0,y:30,scale:.95},animate:{opacity:1,y:0,scale:1},transition:{duration:.7,type:"spring",stiffness:100},className:"bg-gradient-to-br from-slate-900/60 via-emerald-900/10 to-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 relative overflow-hidden hover:shadow-3xl hover:shadow-emerald-500/20 transition-all duration-700 hover:border-emerald-400/30 group",children:[n.jsxs("div",{className:"absolute inset-0 opacity-10",children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-teal-500/20 group-hover:from-emerald-400/30 group-hover:to-teal-400/30 transition-all duration-700"}),n.jsx("div",{className:"absolute inset-0 animate-pulse",style:{backgroundImage:"radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.15) 2px, transparent 0)",backgroundSize:"80px 80px"}})]}),n.jsx("div",{className:"absolute top-4 right-4 w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"}),n.jsx("div",{className:"absolute top-12 right-12 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping"}),n.jsx("div",{className:"absolute bottom-8 left-6 w-1.5 h-1.5 bg-teal-400/35 rounded-full animate-pulse"}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8 items-start",children:[n.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[n.jsxs("div",{className:"flex items-center space-x-8 relative z-10",children:[n.jsxs("div",{className:"relative",children:[n.jsxs(V.div,{initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{type:"spring",stiffness:200,damping:15},className:"relative",children:[n.jsx(ry,{user:{...c,attrs:{...c.attrs,avatarUrl:m()}},size:"2xl",className:"ring-4 ring-emerald-500/30 shadow-2xl shadow-emerald-500/20"}),n.jsx("div",{className:"absolute inset-0 ring-4 ring-emerald-400/20 rounded-full animate-pulse"})]}),o.performance&&n.jsx(V.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.3,type:"spring"},className:"absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-2 border-2 border-white/20 shadow-lg",children:n.jsx("span",{className:"text-lg",children:o.performance.badge})})]}),n.jsxs("div",{className:"flex-1 space-y-4",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx(V.h2,{initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{delay:.2,type:"spring",stiffness:150},className:"text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-2 drop-shadow-lg",children:c.attrs?.displayName||`${c.firstName||""} ${c.lastName||""}`.trim()||i.login}),o.rawData?.userRoles?.some(g=>g.role.name.toLowerCase().includes("admin"))&&n.jsx(V.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.4,type:"spring",stiffness:200},className:"bg-gradient-to-r from-red-500/20 to-orange-500/20 px-3 py-1 rounded-lg border border-red-500/30 backdrop-blur-sm shadow-lg shadow-red-500/20",children:n.jsxs("div",{className:"flex items-center space-x-1",children:[n.jsx("span",{className:"text-lg",children:"⚡"}),n.jsx("span",{className:"text-red-300 text-sm font-medium",children:"Admin"})]})})]}),n.jsxs(V.div,{initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{delay:.3,type:"spring",stiffness:150},className:"flex items-center gap-3 mb-6",children:[n.jsxs("span",{className:"text-white/90 text-lg font-medium",children:["@",i.login]}),n.jsx("div",{className:"bg-gradient-to-r from-purple-500/20 to-violet-500/20 px-3 py-1 rounded-lg border border-purple-500/30 backdrop-blur-sm",children:n.jsxs("span",{className:"text-purple-300 text-sm font-medium",children:["ID: ",c.id]})})]}),o.performance&&n.jsxs(V.div,{initial:{opacity:0,y:15},animate:{opacity:1,y:0},transition:{delay:.4,type:"spring",stiffness:120},className:"space-y-3",children:[n.jsxs("div",{className:"flex items-center gap-4",children:[n.jsx("div",{className:"bg-gradient-to-br from-emerald-500/20 to-teal-500/20 px-4 py-2 rounded-xl border border-emerald-400/30 backdrop-blur-sm",children:n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(ml,{className:"w-4 h-4 text-emerald-300"}),n.jsx("span",{className:"text-emerald-200 font-bold text-sm",children:o.performance.notation})]})}),n.jsx("div",{className:"bg-gradient-to-br from-blue-500/20 to-purple-500/20 px-4 py-2 rounded-xl border border-blue-400/30 backdrop-blur-sm",children:n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(Ni,{className:"w-4 h-4 text-blue-300"}),n.jsxs("span",{className:"text-blue-200 font-bold text-sm",children:[_e(o.xp.total)," Total XP"]})]})})]}),o.rawData?.userLabels&&o.rawData.userLabels.length>0&&n.jsxs("div",{className:"mt-6",children:[n.jsxs(V.h4,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.5},className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-lg mr-3",children:n.jsx(Zs,{className:"w-5 h-5 text-cyan-300"})}),"Labels"]}),n.jsx("div",{className:"flex flex-wrap gap-3",children:o.rawData.userLabels.map((g,E)=>n.jsxs(V.div,{initial:{opacity:0,scale:.8,y:10},animate:{opacity:1,scale:1,y:0},transition:{delay:.6+E*.1,type:"spring",stiffness:200},className:"bg-gradient-to-br from-cyan-500/20 to-blue-500/20 px-6 py-3 rounded-2xl border border-cyan-400/30 backdrop-blur-lg hover:from-cyan-400/30 hover:to-blue-400/30 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 shadow-lg shadow-cyan-500/10 group relative overflow-hidden",title:g.label.description,children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),n.jsxs("div",{className:"relative z-10 flex items-center space-x-2",children:[n.jsx("div",{className:"w-2 h-2 bg-cyan-400 rounded-full animate-pulse"}),n.jsx("span",{className:"text-cyan-200 font-semibold text-sm group-hover:text-white transition-colors",children:g.label.name})]})]},g.id))})]})]})]})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6},className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[n.jsxs("div",{className:"space-y-4",children:[n.jsxs(V.h3,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.7},className:"text-xl font-bold text-white mb-4 flex items-center",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg mr-3",children:n.jsx(qm,{className:"w-5 h-5 text-blue-300"})}),"Contact Information"]}),f.email&&n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.8},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 backdrop-blur-lg hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg group-hover:from-blue-400/40 group-hover:to-cyan-400/40 transition-all duration-300",children:n.jsx(dh,{className:"h-5 w-5 text-blue-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-blue-200/80 font-medium",children:"Email Address"}),n.jsx("div",{className:"text-sm text-white font-semibold",children:f.email})]})]}),f.phone&&n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.9},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 backdrop-blur-lg hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg group-hover:from-green-400/40 group-hover:to-emerald-400/40 transition-all duration-300",children:n.jsx(qm,{className:"h-5 w-5 text-green-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-green-200/80 font-medium",children:"Mobile Number"}),n.jsx("div",{className:"text-sm text-white font-semibold",children:oh(f.phone)})]})]}),(f.address?.street||f.address?.city)&&n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:1},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20 backdrop-blur-lg hover:from-purple-500/20 hover:to-violet-500/20 hover:border-purple-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-lg group-hover:from-purple-400/40 group-hover:to-violet-400/40 transition-all duration-300",children:n.jsx(Hm,{className:"h-5 w-5 text-purple-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-purple-200/80 font-medium",children:"Home Address"}),n.jsxs("div",{className:"text-sm text-white font-semibold",children:[f.address?.street&&f.address?.complementStreet&&`${f.address.street}, Building ${f.address.complementStreet}`,f.address?.street&&!f.address?.complementStreet&&f.address.street,f.address?.city&&`, ${f.address.city}`,f.address?.postalCode&&` ${f.address.postalCode}`,`, ${f.address?.country||"Bahrain"}`]})]})]}),n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:1.1},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 backdrop-blur-lg hover:from-orange-500/20 hover:to-amber-500/20 hover:border-orange-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-lg group-hover:from-orange-400/40 group-hover:to-amber-400/40 transition-all duration-300",children:n.jsx(wi,{className:"h-5 w-5 text-orange-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-orange-200/80 font-medium",children:"Date Registered"}),n.jsx("div",{className:"text-sm text-white font-semibold",children:on(c.createdAt)}),n.jsx("div",{className:"text-xs text-orange-200/60 mt-1",children:"Account creation date"})]})]}),p&&n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:1.2},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-xl border border-teal-500/20 backdrop-blur-lg hover:from-teal-500/20 hover:to-cyan-500/20 hover:border-teal-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-lg group-hover:from-teal-400/40 group-hover:to-cyan-400/40 transition-all duration-300",children:n.jsx(Im,{className:"h-5 w-5 text-teal-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-teal-200/80 font-medium",children:p.label}),n.jsx("div",{className:"text-sm text-white font-semibold",children:on(p.date)}),n.jsx("div",{className:"text-xs text-teal-200/60 mt-1",children:p.description}),p.date===c.createdAt&&n.jsx("div",{className:"text-xs text-yellow-400 mt-1 font-medium",children:"Same as registration date"})]})]})]}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs(V.h3,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.7},className:"text-xl font-bold text-white mb-4 flex items-center",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg mr-3",children:n.jsx(Vm,{className:"w-5 h-5 text-green-300"})}),"Identity Information"]}),f.cprNumber&&n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.8},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20 backdrop-blur-lg hover:from-blue-500/20 hover:to-indigo-500/20 hover:border-blue-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-lg group-hover:from-blue-400/40 group-hover:to-indigo-400/40 transition-all duration-300",children:n.jsx(Vm,{className:"h-5 w-5 text-blue-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-blue-200/80 font-medium",children:"CPR Number"}),n.jsx("div",{className:"text-sm text-white font-mono font-semibold",children:f.cprNumber})]})]}),f.dateOfBirth&&n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.9},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 backdrop-blur-lg hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg group-hover:from-purple-400/40 group-hover:to-pink-400/40 transition-all duration-300",children:n.jsx(wi,{className:"h-5 w-5 text-purple-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-purple-200/80 font-medium",children:"Date of Birth"}),n.jsx("div",{className:"text-sm text-white font-semibold",children:on(f.dateOfBirth)})]})]}),f.nationality&&n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:1},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20 backdrop-blur-lg hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg group-hover:from-orange-400/40 group-hover:to-red-400/40 transition-all duration-300",children:n.jsx(Rx,{className:"h-5 w-5 text-orange-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-orange-200/80 font-medium",children:"Nationality"}),n.jsx("div",{className:"text-sm text-white font-semibold",children:f.nationality})]})]}),f.placeOfBirth&&n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:1.1},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl border border-pink-500/20 backdrop-blur-lg hover:from-pink-500/20 hover:to-rose-500/20 hover:border-pink-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-lg group-hover:from-pink-400/40 group-hover:to-rose-400/40 transition-all duration-300",children:n.jsx(Hm,{className:"h-5 w-5 text-pink-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-pink-200/80 font-medium",children:"Place of Birth"}),n.jsxs("div",{className:"text-sm text-white font-semibold",children:[f.placeOfBirth,", ",f.countryOfBirth||"Bahrain"]})]})]}),f.gender&&n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:1.2},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-xl border border-indigo-500/20 backdrop-blur-lg hover:from-indigo-500/20 hover:to-violet-500/20 hover:border-indigo-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-indigo-500/30 to-violet-500/30 rounded-lg group-hover:from-indigo-400/40 group-hover:to-violet-400/40 transition-all duration-300",children:n.jsx(hl,{className:"h-5 w-5 text-indigo-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-indigo-200/80 font-medium",children:"Gender"}),n.jsx("div",{className:"text-sm text-white font-semibold",children:f.gender})]})]})]})]}),(f.currentEmployer||f.jobTitle||f.workExperience||f.employment)&&n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:1.3},className:"bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30",children:[n.jsxs(V.h3,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:1.4},className:"text-xl font-bold text-white mb-6 flex items-center",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg mr-3",children:n.jsx(Xm,{className:"w-5 h-5 text-blue-300"})}),"Professional Information"]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[f.jobTitle&&n.jsxs(V.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:1.5},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 backdrop-blur-lg hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg group-hover:from-green-400/40 group-hover:to-emerald-400/40 transition-all duration-300",children:n.jsx(Im,{className:"h-5 w-5 text-green-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-green-200/80 font-medium",children:"Job Title"}),n.jsx("div",{className:"text-sm text-white font-semibold",children:f.jobTitle})]})]}),f.employment&&n.jsxs(V.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:1.6},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 backdrop-blur-lg hover:from-orange-500/20 hover:to-amber-500/20 hover:border-orange-400/30 transition-all duration-300 group",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-lg group-hover:from-orange-400/40 group-hover:to-amber-400/40 transition-all duration-300",children:n.jsx(Xm,{className:"h-5 w-5 text-orange-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-orange-200/80 font-medium",children:"Employment Status"}),n.jsx("div",{className:"text-sm text-white font-semibold",children:f.employment})]})]}),f.currentEmployer&&n.jsxs(V.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:1.7},className:"flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20 backdrop-blur-lg hover:from-purple-500/20 hover:to-violet-500/20 hover:border-purple-400/30 transition-all duration-300 group md:col-span-2",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-lg group-hover:from-purple-400/40 group-hover:to-violet-400/40 transition-all duration-300",children:n.jsx(Ym,{className:"h-5 w-5 text-purple-300"})}),n.jsxs("div",{className:"flex-1",children:[n.jsx("span",{className:"text-xs text-purple-200/80 font-medium",children:"Current Employer"}),n.jsx("div",{className:"text-sm text-white font-semibold",children:f.currentEmployer})]})]})]})]}),o.rawData?.userRoles&&o.rawData.userRoles.length>0&&n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:1.8},className:"bg-gradient-to-br from-yellow-500/15 to-amber-500/15 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 shadow-lg shadow-yellow-500/10",children:[n.jsxs(V.h3,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:1.9},className:"text-xl font-bold text-white mb-4 flex items-center",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-lg mr-3",children:n.jsx(Ym,{className:"w-5 h-5 text-yellow-300"})}),"User Roles"]}),n.jsx("div",{className:"flex flex-wrap gap-3",children:o.rawData.userRoles.map((g,E)=>n.jsx(V.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:2+E*.1},className:"bg-gradient-to-r from-yellow-500/25 to-amber-500/25 px-4 py-2 rounded-xl border border-yellow-400/40 backdrop-blur-sm hover:from-yellow-400/35 hover:to-amber-400/35 hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/10",title:g.role.description,children:n.jsx("span",{className:"text-yellow-200 font-semibold text-sm",children:g.role.name})},g.id))})]}),f.emergencyContact?.name&&n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:1.3},className:"bg-gradient-to-br from-red-500/15 to-rose-500/15 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-400/40 transition-all duration-300",children:[n.jsxs(V.h3,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:1.4},className:"text-xl font-bold text-white mb-4 flex items-center",children:[n.jsx("div",{className:"p-2 bg-gradient-to-r from-red-500/30 to-rose-500/30 rounded-lg mr-3",children:n.jsx(Dx,{className:"w-5 h-5 text-red-300"})}),"Emergency Contact"]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[n.jsxs(V.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:1.5},className:"bg-white/10 rounded-xl p-4 border border-red-400/20",children:[n.jsx("span",{className:"text-xs text-red-200/80 font-medium",children:"Name"}),n.jsx("div",{className:"text-sm text-white font-semibold mt-1",children:f.emergencyContact.name})]}),f.emergencyContact.phone&&n.jsxs(V.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:1.6},className:"bg-white/10 rounded-xl p-4 border border-red-400/20",children:[n.jsx("span",{className:"text-xs text-red-200/80 font-medium",children:"Phone"}),n.jsx("div",{className:"text-sm text-white font-mono font-semibold mt-1",children:oh(f.emergencyContact.phone)})]}),f.emergencyContact.relationship&&n.jsxs(V.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:1.7},className:"bg-white/10 rounded-xl p-4 border border-red-400/20 md:col-span-2",children:[n.jsx("span",{className:"text-xs text-red-200/80 font-medium",children:"Relationship"}),n.jsx("div",{className:"text-sm text-white font-semibold mt-1",children:f.emergencyContact.relationship})]})]})]})]}),n.jsx("div",{className:"lg:col-span-1",children:n.jsxs(V.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{delay:.3,duration:.5},className:"bg-gradient-to-br from-emerald-500/20 to-teal-600/30 dark:from-emerald-500/20 dark:to-teal-600/30 light:from-emerald-500/30 light:to-teal-600/40 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/30 dark:border-emerald-500/30 light:border-emerald-500/50 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden",children:[n.jsx("div",{className:"absolute inset-0 opacity-10",children:n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-pulse"})}),n.jsxs("div",{className:"text-center mb-6 relative z-10",children:[n.jsx(V.div,{initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{delay:.5,type:"spring",stiffness:200},className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full mb-4 border border-emerald-400/30 shadow-lg",children:n.jsx(ml,{className:"w-10 h-10 text-emerald-400 drop-shadow-lg"})}),n.jsx(V.h3,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.6},className:"text-lg font-semibold text-white mb-2",children:"Current Level"}),n.jsx(V.div,{initial:{opacity:0,scale:.5},animate:{opacity:1,scale:1},transition:{delay:.7,type:"spring"},className:"text-6xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg",children:o.level.current}),n.jsx(V.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.8},className:"text-sm text-emerald-200 font-medium",children:o.performance?.notation||"Student"})]}),n.jsx("div",{className:"flex justify-center mb-6",children:n.jsxs("div",{className:"relative w-40 h-40",children:[n.jsxs("svg",{className:"w-full h-full transform -rotate-90",viewBox:"0 0 160 160",children:[n.jsx("circle",{cx:"80",cy:"80",r:"70",fill:"none",stroke:"rgba(255,255,255,0.1)",strokeWidth:"12"}),n.jsx("circle",{cx:"80",cy:"80",r:"70",fill:"none",stroke:"url(#progressGradient)",strokeWidth:"12",strokeLinecap:"round",strokeDasharray:`${2*Math.PI*70}`,strokeDashoffset:`${2*Math.PI*70*(1-o.level.progress/100)}`,className:"transition-all duration-1000 ease-out"}),n.jsx("defs",{children:n.jsxs("linearGradient",{id:"progressGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[n.jsx("stop",{offset:"0%",stopColor:"#3B82F6"}),n.jsx("stop",{offset:"100%",stopColor:"#1D4ED8"})]})})]}),n.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:[n.jsxs("div",{className:"text-2xl font-bold text-white mb-1",children:[o.level.progress.toFixed(1),"%"]}),n.jsxs("div",{className:"text-xs text-white/60 text-center",children:["Progress to",n.jsx("br",{}),"Level ",o.level.current+1]})]})]})}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"bg-white/10 rounded-lg p-4",children:[n.jsxs("div",{className:"flex items-center justify-between mb-2",children:[n.jsx("span",{className:"text-white/80 text-sm",children:"Current Progress"}),n.jsxs("span",{className:"text-primary-400 font-bold",children:[o.level.progressInKB?.toFixed(1)||"0.0"," kB"]})]}),n.jsx("div",{className:"w-full bg-white/20 rounded-full h-2",children:n.jsx("div",{className:"bg-gradient-to-r from-primary-400 to-primary-500 h-2 rounded-full transition-all duration-1000",style:{width:`${o.level.progress}%`}})})]}),n.jsx("div",{className:"bg-white/10 rounded-lg p-4",children:n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("span",{className:"text-white/80 text-sm",children:"Remaining to Next Level"}),n.jsxs("span",{className:"text-orange-400 font-bold",children:[o.level.remainingInKB?.toFixed(1)||"100.0"," kB"]})]})}),n.jsx("div",{className:"bg-white/10 rounded-lg p-4",children:n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("span",{className:"text-white/80 text-sm",children:"Main Module XP"}),n.jsx("span",{className:"text-green-400 font-bold",children:_e(o.xp.bhModule)})]})})]}),n.jsx("div",{className:"mt-6 pt-4 border-t border-white/20",children:n.jsxs("div",{className:"text-center",children:[n.jsxs("div",{className:"text-white/60 text-xs mb-2",children:["You are ",n.jsx("span",{className:"font-bold text-white",children:v})," level(s) away from the next rank!"]}),n.jsx("div",{className:"text-sm text-white font-medium",children:y.notation}),n.jsx("div",{className:"text-2xl mt-2",children:y.badge})]})})]})})]})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden",children:[n.jsx("div",{className:"absolute inset-0 opacity-5",children:n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"})}),n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(ml,{className:"w-5 h-5 mr-2 text-yellow-400"}),"Academic Achievements"]}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Zs,{className:"w-5 h-5 text-blue-400"}),n.jsx("span",{className:"text-white text-sm",children:"Total XP"})]}),n.jsx("span",{className:"text-blue-400 font-bold",children:_e(o.xp.total)})]}),o.projects.lastFinished&&n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(cn,{className:"w-5 h-5 text-pink-400"}),n.jsx("span",{className:"text-white text-sm",children:"Last Finished Project"})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("span",{className:"text-pink-400 font-bold block",children:o.projects.lastFinished.name}),n.jsx("span",{className:"text-white/70 text-xs",children:on(o.projects.lastFinished.completedAt)})]})]}),n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(fn,{className:"w-5 h-5 text-green-400"}),n.jsx("span",{className:"text-white text-sm",children:"Audit Ratio"})]}),n.jsx("span",{className:"text-green-400 font-bold",children:Fb(o.audits.ratio)})]}),n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Ni,{className:"w-5 h-5 text-purple-400"}),n.jsx("span",{className:"text-white text-sm",children:"Projects Completed"})]}),n.jsx("span",{className:"text-purple-400 font-bold",children:o.projects.bhModule.completed})]}),n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(cn,{className:"w-5 h-5 text-orange-400"}),n.jsx("span",{className:"text-white text-sm",children:"Skills Mastered"})]}),n.jsx("span",{className:"text-orange-400 font-bold",children:o.skills.total})]})]})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden",children:[n.jsx("div",{className:"absolute inset-0 opacity-5",children:n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"})}),n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(dn,{className:"w-5 h-5 mr-2 text-green-400"}),"Community Involvement"]}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(hl,{className:"w-5 h-5 text-blue-400"}),n.jsx("span",{className:"text-white text-sm",children:"Completed Audits Given"})]}),n.jsx("span",{className:"text-blue-400 font-bold",children:o.audits.given})]}),n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(hl,{className:"w-5 h-5 text-cyan-400"}),n.jsx("span",{className:"text-white text-sm",children:"Completed Audits Received"})]}),n.jsx("span",{className:"text-cyan-400 font-bold",children:o.audits.received})]}),n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Va,{className:"w-5 h-5 text-green-400"}),n.jsx("span",{className:"text-white text-sm",children:"Total Up (Audit Points)"})]}),n.jsx("span",{className:"text-green-400 font-bold",children:_e(o.audits.totalUp)})]}),n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Va,{className:"w-5 h-5 text-red-400 rotate-180"}),n.jsx("span",{className:"text-white text-sm",children:"Total Down (Audit Points)"})]}),n.jsx("span",{className:"text-red-400 font-bold",children:_e(o.audits.totalDown)})]}),n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Zs,{className:"w-5 h-5 text-yellow-400"}),n.jsx("span",{className:"text-white text-sm",children:"Groups Led"})]}),n.jsx("span",{className:"text-yellow-400 font-bold",children:o.groups.captained})]}),n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(dn,{className:"w-5 h-5 text-green-400"}),n.jsx("span",{className:"text-white text-sm",children:"Group Participations"})]}),n.jsx("span",{className:"text-green-400 font-bold",children:o.groups.total})]}),n.jsxs("div",{className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(fn,{className:"w-5 h-5 text-purple-400"}),n.jsx("span",{className:"text-white text-sm",children:"Success Rate"})]}),n.jsxs("span",{className:"text-purple-400 font-bold",children:[o.projects.bhModule.passRate,"%"]})]})]})]})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(ml,{className:"w-5 h-5 mr-2 text-blue-400"}),"Learning Journey Overview"]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[n.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[n.jsxs("div",{className:"flex items-center justify-between mb-3",children:[n.jsx("h4",{className:"text-white font-medium",children:"BH Module (Main Curriculum)"}),n.jsx("span",{className:"text-blue-400 font-bold",children:_e(o.xp.bhModule)})]}),n.jsxs("div",{className:"space-y-2 text-sm",children:[n.jsxs("div",{className:"flex justify-between text-white/70",children:[n.jsx("span",{children:"Projects:"}),n.jsx("span",{children:o.projects.bhModule?.total||o.projects.bhModule||0})]}),n.jsxs("div",{className:"flex justify-between text-white/70",children:[n.jsx("span",{children:"Current Level:"}),n.jsx("span",{children:o.level.current})]}),n.jsx("div",{className:"w-full bg-white/10 rounded-full h-2 mt-3",children:n.jsx("div",{className:"bg-blue-400 h-2 rounded-full",style:{width:`${o.xp.bhModule/(o.xp.bhModule+o.xp.piscines)*100}%`}})})]})]}),n.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[n.jsxs("div",{className:"flex items-center justify-between mb-3",children:[n.jsx("h4",{className:"text-white font-medium",children:"Piscines (Intensive Training)"}),n.jsx("span",{className:"text-green-400 font-bold",children:_e(o.xp.piscines)})]}),n.jsxs("div",{className:"space-y-2 text-sm",children:[n.jsxs("div",{className:"flex justify-between text-white/70",children:[n.jsx("span",{children:"Projects:"}),n.jsx("span",{children:o.projects.piscines?.total||o.projects.piscines||0})]}),n.jsxs("div",{className:"flex justify-between text-white/70",children:[n.jsx("span",{children:"Modules:"}),n.jsx("span",{children:o.moduleData?.piscines||0})]}),n.jsx("div",{className:"w-full bg-white/10 rounded-full h-2 mt-3",children:n.jsx("div",{className:"bg-green-400 h-2 rounded-full",style:{width:`${o.xp.piscines/(o.xp.bhModule+o.xp.piscines)*100}%`}})})]})]})]})]})]})]})};q`
  query GetAllAudits {
    audit {
      id
      groupId
      auditorId
      attrs
      grade
      createdAt
      updatedAt
      resultId
      version
      endAt
    }
  }
`;q`
  query GetAuditAggregates {
    audit_aggregate {
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
`;q`
  query GetAuditByPk($id: Int!) {
    audit_by_pk(id: $id) {
      id
      groupId
      auditorId
      grade
      createdAt
      updatedAt
    }
  }
`;q`
  query GetAuditPrivate {
    audit_private {
      grade
      createdAt
      updatedAt
    }
  }
`;q`
  query GetAllEvents {
    event {
      id
      createdAt
      endAt
      objectId
      parentId
      path
      campus
    }
  }
`;q`
  query GetEventAggregates {
    event_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetEventByPk($id: Int!) {
    event_by_pk(id: $id) {
      id
      createdAt
      endAt
      objectId
      path
      campus
    }
  }
`;q`
  query GetAllEventUsers {
    event_user {
      id
      createdAt
      userId
      eventId
      level
    }
  }
`;q`
  query GetEventUserAggregates {
    event_user_aggregate {
      aggregate {
        count
        avg {
          level
        }
        max {
          level
        }
        min {
          level
        }
      }
    }
  }
`;q`
  query GetEventUserByPk($id: Int!) {
    event_user_by_pk(id: $id) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`;q`
  query GetEventUserView {
    event_user_view {
      id
      eventId
    }
  }
`;q`
  query GetEventUserViewAggregates {
    event_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetAllObjects {
    object {
      id
      name
      type
      attrs
      createdAt
      updatedAt
      campus
      authorId
    }
  }
`;q`
  query GetObjectAggregates {
    object_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetObjectByPk($id: Int!) {
    object_by_pk(id: $id) {
      id
      name
      type
      attrs
      createdAt
      updatedAt
      campus
      authorId
    }
  }
`;q`
  query GetObjectAvailability {
    object_availability {
      id
      userId
    }
  }
`;q`
  query GetObjectAvailabilityAggregates {
    object_availability_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetObjectAvailabilityByPk($id: Int!) {
    object_availability_by_pk(id: $id) {
      id
      userId
    }
  }
`;q`
  query GetAllObjectChildren {
    object_child {
      id
      parentId
      childId
      attrs
      key
      index
    }
  }
`;q`
  query GetObjectChildAggregates {
    object_child_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetObjectChildByPk($id: Int!) {
    object_child_by_pk(id: $id) {
      id
      parentId
      childId
      attrs
      key
      index
    }
  }
`;q`
  query GetObjectTypes {
    object_type {
      type
    }
  }
`;q`
  query GetObjectTypeAggregates {
    object_type_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetObjectTypeByPk($type: String!) {
    object_type_by_pk(type: $type) {
      type
    }
  }
`;q`
  query GetAllPaths {
    path {
      path
      updatedAt
    }
  }
`;q`
  query GetPathAggregates {
    path_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetPathByPk($path: String!) {
    path_by_pk(path: $path) {
      path
      updatedAt
    }
  }
`;q`
  query GetPathArchive {
    path_archive {
      id
      path
      createdAt
      updatedAt
    }
  }
`;q`
  query GetPathArchiveAggregates {
    path_archive_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetPathArchiveByPk($id: Int!) {
    path_archive_by_pk(id: $id) {
      id
      path
      createdAt
      updatedAt
    }
  }
`;q`
  query GetAllProgress {
    progress {
      id
      createdAt
      updatedAt
      userId
      groupId
      eventId
      version
      grade
      isDone
      path
      campus
      objectId
    }
  }
`;q`
  query GetProgressAggregates {
    progress_aggregate {
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
`;q`
  query GetProgressByPk($id: bigint!) {
    progress_by_pk(id: $id) {
      id
      userId
      grade
      isDone
      path
      createdAt
      updatedAt
    }
  }
`;q`
  query GetProgressByPathView {
    progress_by_path_view {
      path
      userId
      createdAt
    }
  }
`;q`
  query GetProgressByPathViewAggregates {
    progress_by_path_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetAllRecords {
    record {
      id
      message
      createdAt
      authorId
      userId
    }
  }
`;q`
  query GetRecordByPk($id: Int!) {
    record_by_pk(id: $id) {
      id
      message
      createdAt
      authorId
      userId
    }
  }
`;q`
  query GetRecordPublicView {
    record_public_view {
      authorLogin
      userLogin
    }
  }
`;q`
  query GetRecordPublicViewAggregates {
    record_public_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetRecordTypes {
    record_type {
      type
      description
    }
  }
`;q`
  query GetRecordTypeByPk($type: String!) {
    record_type_by_pk(type: $type) {
      type
      description
    }
  }
`;q`
  query GetAllRegistrations {
    registration {
      id
      createdAt
      startAt
      endAt
      objectId
      path
      campus
    }
  }
`;q`
  query GetRegistrationAggregates {
    registration_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetRegistrationByPk($id: Int!) {
    registration_by_pk(id: $id) {
      id
      createdAt
      startAt
      endAt
      objectId
      path
      campus
    }
  }
`;q`
  query GetAllRegistrationUsers {
    registration_user {
      id
      createdAt
      registrationId
      userId
    }
  }
`;q`
  query GetRegistrationUserAggregates {
    registration_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetRegistrationUserByPk($id: Int!) {
    registration_user_by_pk(id: $id) {
      id
      createdAt
      registrationId
      userId
    }
  }
`;q`
  query GetRegistrationUserView {
    registration_user_view {
      id
      registrationId
    }
  }
`;q`
  query GetRegistrationUserViewAggregates {
    registration_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetAllResults {
    result {
      id
      createdAt
      updatedAt
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
    }
  }
`;q`
  query GetResultAggregates {
    result_aggregate {
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
`;q`
  query GetResultByPk($id: Int!) {
    result_by_pk(id: $id) {
      id
      grade
      type
      userId
      path
      createdAt
      updatedAt
    }
  }
`;q`
  query GetAllRoles {
    role {
      id
      slug
      name
      description
      createdAt
      updatedAt
      user_roles {
        id
        userId
        roleId
      }
    }
  }
`;q`
  query GetRoleAggregates {
    role_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetRoleByPk($id: Int!) {
    role_by_pk(id: $id) {
      id
      slug
      name
      description
      createdAt
      updatedAt
    }
  }
`;q`
  query GetAllTasks {
    task {
      id
      name
      createdAt
      updatedAt
    }
  }
`;q`
  query GetTaskByPk($id: Int!) {
    task_by_pk(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;q`
  query GetAllTiming {
    timing {
      updatedAt
    }
  }
`;q`
  query GetAllTransactions {
    transaction {
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
  }
`;q`
  query GetTransactionAggregates {
    transaction_aggregate {
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
`;q`
  query GetTransactionByPk($id: Int!) {
    transaction_by_pk(id: $id) {
      id
      type
      amount
      userId
      createdAt
      path
    }
  }
`;q`
  query GetTransactionTypes {
    transaction_type {
      type
    }
  }
`;q`
  query GetTransactionTypeAggregates {
    transaction_type_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetTransactionTypeByPk($type: String!) {
    transaction_type_by_pk(type: $type) {
      type
    }
  }
`;q`
  query GetAllUsers {
    user {
      id
      login
      firstName
      lastName
      profile
      attrs
      createdAt
      updatedAt
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;q`
  query GetUserAggregates {
    user_aggregate {
      aggregate {
        count
        avg {
          auditRatio
          totalUp
          totalDown
        }
        max {
          auditRatio
          totalUp
          totalDown
        }
        min {
          auditRatio
          totalUp
          totalDown
        }
        sum {
          totalUp
          totalDown
        }
      }
    }
  }
`;const Uy=q`
  query GetUserByPk($id: Int!) {
    user_by_pk(id: $id) {
      id
      login
      firstName
      lastName
      profile
      attrs
      createdAt
      updatedAt
      campus
      auditRatio
      totalUp
      totalDown
    }
  }
`;q`
  query GetUserPublicView {
    user_public_view {
      id
      login
      firstName
      lastName
      profile
      campus
    }
  }
`;q`
  query GetAllUserRoles {
    user_role {
      id
      userId
      roleId
    }
  }
`;q`
  query GetUserRoleAggregates {
    user_role_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetUserRoleByPk($id: Int!) {
    user_role_by_pk(id: $id) {
      id
      userId
      roleId
    }
  }
`;q`
  query GetUserRolesView {
    user_roles_view {
      id
    }
  }
`;q`
  query GetUserRolesViewAggregates {
    user_roles_view_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetXPView {
    xp_view {
      userId
    }
  }
`;q`
  query GetAllGroups {
    group {
      id
      objectId
      eventId
      captainId
      createdAt
      updatedAt
      status
      path
      campus
    }
  }
`;q`
  query GetGroupAggregates {
    group_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetGroupByPk($id: Int!) {
    group_by_pk(id: $id) {
      id
      objectId
      eventId
      captainId
      status
      path
      campus
      createdAt
    }
  }
`;q`
  query GetAllGroupUsers {
    group_user {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`;q`
  query GetGroupUserAggregates {
    group_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetGroupUserByPk($id: Int!) {
    group_user_by_pk(id: $id) {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`;q`
  query GetLabelAggregates {
    label_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetLabelByPk($id: Int!) {
    label_by_pk(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;const Cy=q`
  query GetAllLabelUsers {
    label_user {
      id
      labelId
      userId
      label {
        id
        name
        description
      }
    }
  }
`;q`
  query GetLabelUserAggregates {
    label_user_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetLabelUserByPk($id: Int!) {
    label_user_by_pk(id: $id) {
      id
      labelId
      userId
      createdAt
    }
  }
`;q`
  query GetAllMarkdown {
    markdown {
      name
      content
      createdAt
      updatedAt
    }
  }
`;q`
  query GetMarkdownByPk($name: String!) {
    markdown_by_pk(name: $name) {
      name
      content
      createdAt
      updatedAt
    }
  }
`;q`
  query GetAllMatches {
    match {
      id
      createdAt
      updatedAt
      attrs
      status
      type
    }
  }
`;q`
  query GetMatchAggregates {
    match_aggregate {
      aggregate {
        count
      }
    }
  }
`;q`
  query GetMatchByPk($id: Int!) {
    match_by_pk(id: $id) {
      id
      createdAt
      updatedAt
      attrs
      status
      type
    }
  }
`;q`
  query GetGroupsWithMembers {
    group {
      id
      objectId
      eventId
      captainId
      status
      path
      campus
      createdAt
      updatedAt
    }
  }
`;q`
  query GetGroupMembersByGroupId($groupId: Int!) {
    group_user(where: {groupId: {_eq: $groupId}}) {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`;q`
  query GetUserGroupsByUserId($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`;q`
  query GetGroupCaptains {
    group(where: {captainId: {_is_null: false}}) {
      id
      captainId
      status
      path
      campus
      objectId
      eventId
    }
  }
`;q`
  query GetActiveGroupsWithMembers {
    group {
      id
      status
      path
      campus
      captainId
      createdAt
    }
  }
`;q`
  query GetEventsWithParticipants {
    event {
      id
      path
      campus
      createdAt
      endAt
      objectId
    }
  }
`;q`
  query GetEventParticipantsByEventId($eventId: Int!) {
    event_user(where: {eventId: {_eq: $eventId}}) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`;q`
  query GetUserEventParticipation($userId: Int!) {
    event_user(where: {userId: {_eq: $userId}}) {
      id
      eventId
      level
      createdAt
    }
  }
`;q`
  query GetAuditsWithDetails {
    audit {
      id
      groupId
      auditorId
      grade
      createdAt
      updatedAt
      resultId
      version
      endAt
      attrs
    }
  }
`;q`
  query GetAuditsByAuditor($auditorId: Int!) {
    audit(where: {auditorId: {_eq: $auditorId}}) {
      id
      groupId
      grade
      createdAt
      attrs
      version
    }
  }
`;q`
  query GetAuditsByGroup($groupId: Int!) {
    audit(where: {groupId: {_eq: $groupId}}) {
      id
      auditorId
      grade
      createdAt
      updatedAt
      version
      endAt
    }
  }
`;q`
  query GetProgressWithDetails {
    progress {
      id
      userId
      groupId
      eventId
      objectId
      grade
      isDone
      path
      campus
      createdAt
      updatedAt
      version
    }
  }
`;q`
  query GetUserProgressDetailed($userId: Int!) {
    progress(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      grade
      isDone
      path
      createdAt
      updatedAt
      version
    }
  }
`;q`
  query GetProgressByPath {
    progress(where: {path: {_like: "%bahrain%"}}) {
      id
      userId
      grade
      isDone
      createdAt
      path
    }
  }
`;q`
  query GetResultsWithDetails {
    result {
      id
      userId
      groupId
      objectId
      eventId
      grade
      type
      path
      campus
      createdAt
      updatedAt
      version
      isLast
      attrs
    }
  }
`;q`
  query GetUserResultsDetailed($userId: Int!) {
    result(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      grade
      type
      path
      createdAt
      isLast
    }
  }
`;q`
  query GetResultsByObject($objectId: Int!) {
    result(where: {objectId: {_eq: $objectId}}) {
      id
      userId
      groupId
      grade
      type
      createdAt
    }
  }
`;q`
  query GetTransactionsWithDetails {
    transaction {
      id
      type
      amount
      userId
      objectId
      eventId
      path
      campus
      createdAt
      attrs
    }
  }
`;q`
  query GetUserTransactionsDetailed($userId: Int!) {
    transaction(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      type
      amount
      path
      createdAt
      attrs
    }
  }
`;q`
  query GetUserTransactions($userId: Int!) {
    transaction(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      type
      amount
      userId
      attrs
      createdAt
      path
      objectId
    }
  }
`;q`
  query GetXPTransactionsDetailed {
    transaction(where: {type: {_eq: "xp"}}, order_by: {amount: desc}) {
      id
      amount
      userId
      path
      createdAt
    }
  }
`;q`
  query GetObjectsWithChildren {
    object {
      id
      name
      type
      attrs
      campus
      createdAt
      updatedAt
      authorId
    }
  }
`;q`
  query GetObjectHierarchy($objectId: Int!) {
    object_by_pk(id: $objectId) {
      id
      name
      type
      attrs
    }
  }
`;q`
  query GetAuditTransactions($userId: Int!) {
    transaction(where: {userId: {_eq: $userId}, type: {_eq: "xp"}, _or: [{path: {_like: "%/auditor"}}, {path: {_like: "%/auditee"}}]}) {
      amount
      path
      createdAt
    }
  }
`;q`
  query GetTotalXPByModule($userId: Int!) {
    # Total XP for BH Module
    bhModuleXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    # Total XP for all modules/events
    totalXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    # Total XP for piscines
    piscineXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _like: "%piscine%" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    # Total XP for checkpoints
    checkpointXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _like: "%checkpoint%" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;q`
  query GetBasicEventUsers {
    event_user(
      where: {
        event: {
          path: { _eq: "/bahrain/bh-module" }
        }
      }
      order_by: { level: desc }
    ) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`;q`
  query GetDetailedEventUsersView {
    event_user_view(
      where: {
        event: {
          path: { _eq: "/bahrain/bh-module" }
        }
      }
    ) {
      userId
      userLogin
      userName
      userAuditRatio
      totalUp
      totalDown
      xp {
        amount
      }
    }
  }
`;q`
  query GetBhModuleStats {
    event_user_aggregate(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
  }
`;const Oy=q`
  query GetAllLabels {
    label(
      order_by: { name: asc }
    ) {
      id
      name
      description
    }
  }
`;q`
  query GetUserLabels {
    label_user {
      id
      userId
      labelId
      label {
        id
        name
        description
      }
    }
  }
`;q`
  query GetLeaderboardByCohort($pathFilter: String!, $limit: Int = 100) {
    cohortUsers: event_user(
      where: { 
        event: { 
          path: { _like: $pathFilter }
        }
      }
      order_by: { level: desc }
      limit: $limit
    ) {
      id
      userId
      level
      createdAt
      event {
        id
        path
        createdAt
      }
      user {
        id
        login
        firstName
        lastName
        profile
        attrs
        auditRatio
        totalUp
        totalDown
        createdAt
        updatedAt
      }
    }
    
    # Get XP totals for these users
    cohortXP: transaction_aggregate(
      where: { 
        type: { _eq: "xp" }
        event: { path: { _like: $pathFilter } }
      }
    ) {
      nodes {
        userId
        amount
        path
      }
      aggregate {
        sum {
          amount
        }
        avg {
          amount
        }
        count
      }
    }
  }
`;q`
  query GetLeaderboardStatistics {
    # Total users across all events
    totalEventUsers: event_user_aggregate {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    # BH Module specific stats
    bhModuleStats: event_user_aggregate(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    # Cohort breakdown
    cohort1Stats: event_user_aggregate(
      where: {
        event: { path: { _like: "%cohort-1%" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    cohort2Stats: event_user_aggregate(
      where: {
        event: { path: { _like: "%cohort-2%" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    # XP statistics
    totalXPStats: transaction_aggregate(
      where: { type: { _eq: "xp" } }
    ) {
      aggregate {
        sum {
          amount
        }
        avg {
          amount
        }
        max {
          amount
        }
        count
      }
    }
    
    # Audit statistics
    auditStats: user_aggregate {
      aggregate {
        avg {
          auditRatio
          totalUp
          totalDown
        }
        max {
          auditRatio
          totalUp
          totalDown
        }
        count
      }
    }
  }
`;q`
  query GetLevelLeaderboard($minLevel: Int = 1, $pathFilter: String = "%", $limit: Int = 100) {
    levelLeaderboard: event_user(
      where: { 
        level: { _gte: $minLevel }
        event: { path: { _like: $pathFilter } }
      }
      order_by: { level: desc }
      limit: $limit
    ) {
      id
      userId
      level
      createdAt
      event {
        id
        path
        createdAt
      }
      user {
        id
        login
        firstName
        lastName
        profile
        attrs
        auditRatio
        totalUp
        totalDown
        createdAt
        updatedAt
      }
    }
  }
`;const oy=q`
  query GetComprehensiveLeaderboardData {
    # Get BH Module event users with audit ratios and user logins
    bhModuleUsers: event_user(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
      order_by: { level: desc }
    ) {
      id
      userId
      eventId
      level
      createdAt
      userLogin
      userAuditRatio
      userName
      event {
        id
        path
        campus
      }
    }
    
    # Get ALL users for basic information
    allUsersWithEvents: user {
      id
      login
      firstName
      lastName
      profile
      attrs
      auditRatio
      totalUp
      totalDown
      createdAt
      updatedAt
    }
    
    # Get ALL event_user relationships for dynamic cohort mapping
    allEventUsers: event_user {
      id
      userId
      eventId
      level
      createdAt
      event {
        id
        path
        campus
      }
    }
    
    # Fallback: Get public user data (names and logins)
    publicUsers: user_public_view {
      id
      login
      firstName
      lastName
      profile
      campus
    }
    
    # BH Module statistics
    bhModuleStats: event_user_aggregate(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        count
        max {
          level
        }
        avg {
          level
        }
      }
    }
    
    # Get ALL user label assignments (from label_user table)
    userLabels: label_user(
      order_by: { id: asc }
    ) {
      id
      userId
      labelId
      createdAt
      label {
        id
        name
        description
        createdAt
      }
    }
  }
`,cy=({analytics:i,user:o})=>{const[c,u]=j.useState(null),[m,f]=j.useState(!1),p=j.useRef(null),x=j.useCallback(()=>{c&&m&&(p.current&&clearTimeout(p.current),p.current=setTimeout(()=>{f(!1),u(null)},100))},[c,m]),v=k=>{p.current&&clearTimeout(p.current),u(k),f(!0)};j.useEffect(()=>{const k=()=>x();return m&&document.addEventListener("mousemove",k),()=>{document.removeEventListener("mousemove",k)}},[m,x]),j.useEffect(()=>()=>{p.current&&clearTimeout(p.current)},[]);const y=({data:k})=>{const z=Math.max(...k.map(S=>S.xp),1e3),N=800,T=400,O=60,I=k.map((S,L)=>{const G=O+L/(k.length-1)*(N-2*O),B=T-O-S.xp/z*(T-2*O);return{x:G,y:B,...S}});return n.jsx("div",{className:"w-full",children:n.jsxs("svg",{viewBox:`0 0 ${N} ${T}`,className:"w-full h-80",children:[[0,1,2,3,4].map(S=>n.jsx("line",{x1:O,y1:O+S*((T-2*O)/4),x2:N-O,y2:O+S*((T-2*O)/4),stroke:"rgba(255,255,255,0.1)",strokeWidth:"1"},S)),[0,1,2,3,4].map(S=>n.jsx("text",{x:O-10,y:T-O-S*((T-2*O)/4)+5,textAnchor:"end",className:"fill-white/60 text-xs",children:_e(z/4*S)},S)),n.jsx("path",{d:`M ${O} ${T-O} ${I.map(S=>`L ${S.x} ${S.y}`).join(" ")} L ${I[I.length-1]?.x||O} ${T-O} Z`,fill:"url(#xpGradient)",opacity:"0.3"}),n.jsx("path",{d:`M ${I.map(S=>`${S.x} ${S.y}`).join(" L ")}`,fill:"none",stroke:"#3B82F6",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"}),I.map((S,L)=>n.jsxs("g",{children:[n.jsx("circle",{cx:S.x,cy:S.y,r:"4",fill:"#3B82F6",stroke:"white",strokeWidth:"2"}),n.jsx("circle",{cx:S.x,cy:S.y,r:"8",fill:"transparent",className:"hover:fill-emerald-500/20 cursor-pointer transition-all duration-200",onClick:G=>{G.stopPropagation(),v({type:"xp",data:{month:S.month,xp:S.xp,growth:L>0?S.xp-I[L-1].xp:0,projects:S.projects||0},x:G.clientX,y:G.clientY})}}),n.jsx("circle",{cx:S.x,cy:S.y,r:"6",fill:"#3B82F6",className:"opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none",style:{filter:"drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))"}})]},L)),I.map((S,L)=>n.jsx("text",{x:S.x,y:T-O+20,textAnchor:"middle",className:"fill-white/60 text-xs",children:S.month},L)),n.jsx("defs",{children:n.jsxs("linearGradient",{id:"xpGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:"#3B82F6",stopOpacity:"0.3"}),n.jsx("stop",{offset:"100%",stopColor:"#3B82F6",stopOpacity:"0.05"})]})})]})})},g=({skills:k})=>{const O=Math.max(...k.map(L=>L.points),100),I=(L,G)=>{const B=150+Math.cos(L-Math.PI/2)*G,X=150+Math.sin(L-Math.PI/2)*G;return{x:B,y:X}},S=k.slice(0,8);return n.jsx("div",{className:"flex justify-center",children:n.jsxs("svg",{width:300,height:300,className:"drop-shadow-lg",children:[[.2,.4,.6,.8,1].map((L,G)=>n.jsx("circle",{cx:150,cy:150,r:100*L,fill:"none",stroke:"rgba(255,255,255,0.1)",strokeWidth:"1"},G)),S.map((L,G)=>{const B=2*Math.PI*G/S.length,X=I(B,100);return n.jsx("line",{x1:150,y1:150,x2:X.x,y2:X.y,stroke:"rgba(255,255,255,0.15)",strokeWidth:"1"},G)}),n.jsx("path",{d:S.map((L,G)=>{const B=2*Math.PI*G/S.length,X=L.points/O*100,K=I(B,X);return`${G===0?"M":"L"} ${K.x} ${K.y}`}).join(" ")+" Z",fill:"rgba(59, 130, 246, 0.2)",stroke:"#3B82F6",strokeWidth:"2"}),S.map((L,G)=>{const B=2*Math.PI*G/S.length,X=L.points/O*100,K=I(B,X);return n.jsxs("g",{children:[n.jsx("circle",{cx:K.x,cy:K.y,r:"4",fill:"#3B82F6",stroke:"white",strokeWidth:"2"}),n.jsx("circle",{cx:K.x,cy:K.y,r:"10",fill:"transparent",className:"hover:fill-blue-500/20 cursor-pointer transition-all duration-200",onClick:te=>{te.stopPropagation(),v({type:"skill",data:{name:L.name,points:L.points,level:Math.floor(L.points/100)+1,progress:L.points%100},x:te.clientX,y:te.clientY})}})]},G)}),S.map((L,G)=>{const B=2*Math.PI*G/S.length,K=I(B,130);return n.jsx("text",{x:K.x,y:K.y,textAnchor:"middle",dominantBaseline:"middle",className:"fill-white/80 text-xs font-medium",children:L.name.length>8?L.name.substring(0,8)+"...":L.name},G)})]})})},E=()=>{const k=i.projects.bhModule.total||1,z=i.projects.bhModule.passed,N=i.projects.bhModule.failed,T=i.projects.bhModule.inProgress,O=[{label:"Passed",value:z,color:"#10B981",percentage:z/k*100},{label:"Failed",value:N,color:"#EF4444",percentage:N/k*100},{label:"In Progress",value:T,color:"#F59E0B",percentage:T/k*100}];let I=0;const S=80,L=100;return n.jsx("div",{className:"flex justify-center",children:n.jsxs("svg",{width:200,height:200,children:[O.map((G,B)=>{const X=I/100*2*Math.PI,K=(I+G.percentage)/100*2*Math.PI,te=L+S*Math.cos(X),he=L+S*Math.sin(X),ve=L+S*Math.cos(K),Me=L+S*Math.sin(K),Je=G.percentage>50?1:0,Be=[`M ${L} ${L}`,`L ${te} ${he}`,`A ${S} ${S} 0 ${Je} 1 ${ve} ${Me}`,"Z"].join(" ");return I+=G.percentage,n.jsx("path",{d:Be,fill:G.color,stroke:"white",strokeWidth:"2",className:"hover:opacity-80 cursor-pointer transition-all duration-200",onClick:M=>{M.stopPropagation(),v({type:"project",data:{label:G.label,value:G.value,percentage:G.percentage,total:k},x:M.clientX,y:M.clientY})}},B)}),n.jsx("circle",{cx:L,cy:L,r:40,fill:"rgba(0,0,0,0.8)",stroke:"rgba(255,255,255,0.2)",strokeWidth:"1"}),n.jsx("text",{x:L,y:L-5,textAnchor:"middle",className:"fill-white text-lg font-bold",children:k}),n.jsx("text",{x:L,y:L+15,textAnchor:"middle",className:"fill-white/60 text-xs",children:"Projects"})]})})},A=()=>{const k=B=>B.filter(X=>X.path?!X.path.includes("piscine-")&&!X.path.includes("/bh-piscine/")&&!X.path.includes("checkpoint"):!0);let z={};i.rawData?.transactions&&(z=k(i.rawData.transactions).filter(X=>X.type==="xp"&&X.object?.name&&X.amount>0).reduce((X,K)=>{const te=K.object.name;return X[te]||(X[te]={name:te,xp:0,count:0}),X[te].xp+=K.amount,X[te].count+=1,X},{})),Object.keys(z).length===0&&i.rawData?.progress&&(z=k(i.rawData.progress).filter(X=>X.object?.name&&X.grade>0).reduce((X,K)=>{const te=K.object.name,he=Math.floor(K.grade*100);return X[te]||(X[te]={name:te,xp:0,count:0}),X[te].xp+=he,X[te].count+=1,X},{})),Object.keys(z).length===0&&(z={"ascii-art":{name:"ascii-art",xp:1200,count:1},forum:{name:"forum",xp:1500,count:1},"net-cat":{name:"net-cat",xp:600,count:1},"groupie-tracker":{name:"groupie-tracker",xp:1e3,count:1},"make-your-game":{name:"make-your-game",xp:900,count:1},"real-time-forum":{name:"real-time-forum",xp:1100,count:1},"social-network":{name:"social-network",xp:1300,count:1},"lem-in":{name:"lem-in",xp:800,count:1}});const N=Object.values(z).sort((B,X)=>X.xp-B.xp),T=N.reduce((B,X)=>B+(X.xp||0),0);if(N.length===0)return n.jsx("div",{className:"flex justify-center items-center h-64",children:n.jsxs("div",{className:"text-white/60 text-center",children:[n.jsx("div",{className:"text-lg mb-2",children:"No Project XP Data"}),n.jsx("div",{className:"text-sm",children:"Project XP information will appear here"})]})});let O=0;const I=90,S=110,L=["#3B82F6","#10B981","#F59E0B","#EF4444","#8B5CF6","#06B6D4","#F97316","#EC4899","#6366F1","#84CC16","#F87171","#60A5FA","#A78BFA","#34D399","#FBBF24","#FB7185"],G=N.map((B,X)=>L[X%L.length]);return n.jsxs("div",{children:[n.jsx("div",{className:"flex justify-center",children:n.jsxs("svg",{width:220,height:220,children:[N.map((B,X)=>{const K=T>0?B.xp/T*100:0,te=O/100*2*Math.PI,he=(O+K)/100*2*Math.PI,ve=S+I*Math.cos(te),Me=S+I*Math.sin(te),Je=S+I*Math.cos(he),Be=S+I*Math.sin(he),M=K>50?1:0,Q=[`M ${S} ${S}`,`L ${ve} ${Me}`,`A ${I} ${I} 0 ${M} 1 ${Je} ${Be}`,"Z"].join(" ");return O+=K,n.jsx("path",{d:Q,fill:G[X%G.length],stroke:"white",strokeWidth:"2",className:"hover:opacity-80 cursor-pointer transition-all duration-200",onClick:P=>{P.stopPropagation(),v({type:"project-xp",data:{name:B.name,xp:B.xp,percentage:K,totalXP:T,count:B.count,avgXP:Math.round(B.xp/B.count)},x:P.clientX,y:P.clientY})}},X)}),n.jsx("circle",{cx:S,cy:S,r:45,fill:"rgba(0,0,0,0.8)",stroke:"rgba(255,255,255,0.2)",strokeWidth:"1"}),n.jsx("text",{x:S,y:S-8,textAnchor:"middle",className:"fill-white text-lg font-bold",children:N.length}),n.jsx("text",{x:S,y:S+12,textAnchor:"middle",className:"fill-white/60 text-xs",children:"Projects"})]})}),n.jsx("div",{className:"mt-4 max-h-48 overflow-y-auto custom-scrollbar",children:n.jsxs("div",{className:"space-y-1",children:[N.map((B,X)=>n.jsxs("div",{className:"flex items-center space-x-2 text-xs",children:[n.jsx("div",{className:"w-3 h-3 rounded flex-shrink-0",style:{backgroundColor:G[X]}}),n.jsx("span",{className:"text-white/80 flex-1",title:B.name,children:B.name}),n.jsx("span",{className:"text-white/60 flex-shrink-0",children:_e(B.xp)})]},X)),N.length===0&&n.jsx("div",{className:"text-center text-white/60 text-xs py-2",children:"No BH-module projects found"})]})})]})},Z=({data:k})=>{const z=Math.max(...k.map(L=>L.audits||L.given||0),5),N=Math.max(...k.map(L=>L.received||Math.floor((L.audits||0)*.8)),3),T=Math.max(z,N),O=600,I=200,S=40;return n.jsx("div",{className:"w-full",children:n.jsxs("svg",{viewBox:`0 0 ${O} ${I}`,className:"w-full h-48",children:[[0,1,2,3,4].map(L=>n.jsx("line",{x1:S,y1:S+L*((I-2*S)/4),x2:O-S,y2:S+L*((I-2*S)/4),stroke:"rgba(255,255,255,0.1)",strokeWidth:"1"},L)),k.map((L,G)=>{const B=(O-2*S)/k.length*.35,X=S+(G+.1)*((O-2*S)/k.length),K=X+B+2,te=L.audits||L.given||0,he=L.received||Math.floor(te*.7)+Math.floor(Math.random()*3),ve=te/T*(I-2*S),Me=he/T*(I-2*S),Je=I-S-ve,Be=I-S-Me;return n.jsxs("g",{children:[n.jsx("rect",{x:X,y:Je,width:B,height:ve,fill:"url(#auditGivenGradient)",rx:"3",className:"hover:opacity-80 cursor-pointer transition-all duration-200",onClick:M=>{M.stopPropagation(),v({type:"audit-given",data:{month:L.month,auditsGiven:te,auditsReceived:he,ratio:(te/Math.max(he,1)).toFixed(2)},x:M.clientX,y:M.clientY})}}),n.jsx("rect",{x:K,y:Be,width:B,height:Me,fill:"url(#auditReceivedGradient)",rx:"3",className:"hover:opacity-80 cursor-pointer transition-all duration-200",onClick:M=>{M.stopPropagation(),v({type:"audit-received",data:{month:L.month,auditsGiven:te,auditsReceived:he,ratio:(te/Math.max(he,1)).toFixed(2)},x:M.clientX,y:M.clientY})}}),n.jsx("text",{x:X+B,y:I-S+15,textAnchor:"middle",className:"fill-white/60 text-xs",children:L.month})]},G)}),[0,1,2,3,4].map(L=>n.jsx("text",{x:S-10,y:I-S-L*((I-2*S)/4)+3,textAnchor:"end",className:"fill-white/60 text-xs",children:Math.round(T/4*L)},L)),n.jsxs("defs",{children:[n.jsxs("linearGradient",{id:"auditGivenGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:"#10B981",stopOpacity:"0.8"}),n.jsx("stop",{offset:"100%",stopColor:"#10B981",stopOpacity:"0.3"})]}),n.jsxs("linearGradient",{id:"auditReceivedGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:"#EF4444",stopOpacity:"0.8"}),n.jsx("stop",{offset:"100%",stopColor:"#EF4444",stopOpacity:"0.3"})]})]})]})})};return n.jsxs("div",{className:"space-y-6",children:[n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[n.jsx("h2",{className:"text-2xl font-bold text-white mb-2",children:"Visual Data Analytics"}),n.jsx("p",{className:"text-white/70",children:"Interactive charts and graphs showing your learning progression"})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"lg:col-span-2 bg-white/10 dark:bg-white/10 light:bg-slate-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-white/20 light:border-slate-800/20 hover:shadow-lg transition-all duration-300",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(Va,{className:"w-5 h-5 mr-2 text-blue-400"}),"XP Progression Over Time"]}),n.jsx("p",{className:"text-white/60 text-sm mb-6",children:"Track your experience points growth over the last 12 months"}),n.jsx(y,{data:i.xp.monthlyData})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.15},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx($m,{className:"w-5 h-5 mr-2 text-purple-400"}),"Projects XP Distribution"]}),n.jsx("p",{className:"text-white/60 text-sm mb-6",children:"XP earned from your top projects"}),n.jsx(A,{})]})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(pl,{className:"w-5 h-5 mr-2 text-orange-400"}),"Skills Proficiency Radar"]}),n.jsx("p",{className:"text-white/60 text-sm mb-6",children:"Visual representation of your top skills and competencies"}),n.jsx(g,{skills:i.skills.top.map(k=>({name:k.name,points:k.currentAmount}))})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx($m,{className:"w-5 h-5 mr-2 text-green-400"}),"Project Success Rate"]}),n.jsx("p",{className:"text-white/60 text-sm mb-6",children:"Distribution of Project outcomes"}),n.jsx(E,{}),n.jsxs("div",{className:"mt-4 space-y-2",children:[n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("div",{className:"w-3 h-3 bg-green-500 rounded"}),n.jsxs("span",{className:"text-white/80 text-sm",children:["Passed: ",i.projects.bhModule.passed]})]}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("div",{className:"w-3 h-3 bg-red-500 rounded"}),n.jsxs("span",{className:"text-white/80 text-sm",children:["Failed: ",i.projects.bhModule.failed]})]}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("div",{className:"w-3 h-3 bg-yellow-500 rounded"}),n.jsxs("span",{className:"text-white/80 text-sm",children:["In Progress: ",i.projects.bhModule.inProgress]})]})]})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(fn,{className:"w-5 h-5 mr-2 text-green-400"}),"Audit Activity Timeline"]}),n.jsx("p",{className:"text-white/60 text-sm mb-6",children:"Monthly audit activity comparison - given vs received"}),n.jsx(Z,{data:i.audits.monthlyData}),n.jsxs("div",{className:"mt-4 flex justify-center space-x-6",children:[n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("div",{className:"w-3 h-3 bg-green-500 rounded"}),n.jsxs("span",{className:"text-white/80 text-sm",children:["Given: ",i.audits.given]})]}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("div",{className:"w-3 h-3 bg-red-500 rounded"}),n.jsxs("span",{className:"text-white/80 text-sm",children:["Received: ",i.audits.received||Math.floor(i.audits.given*.8)]})]})]})]})]}),n.jsx(uy,{handleElementClick:v,user:o}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(Ai,{className:"w-5 h-5 mr-2 text-purple-400"}),"Key Performance Insights"]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[n.jsxs("div",{className:"text-center",children:[n.jsx("div",{className:"text-3xl font-bold text-blue-400 mb-2",children:_e(i.xp.total)}),n.jsx("div",{className:"text-white/70 text-sm",children:"Total XP Earned"}),n.jsxs("div",{className:"text-white/50 text-xs mt-1",children:[i.xp.bhModule>i.xp.piscines?"Module-focused":"Piscine-heavy"," learning path"]})]}),n.jsxs("div",{className:"text-center",children:[n.jsxs("div",{className:"text-3xl font-bold text-green-400 mb-2",children:[i.projects.bhModule.passRate.toFixed(1),"%"]}),n.jsx("div",{className:"text-white/70 text-sm",children:"BH-Module Success Rate"}),n.jsxs("div",{className:"text-white/50 text-xs mt-1",children:[i.projects.bhModule.passRate>80?"Excellent":i.projects.bhModule.passRate>60?"Good":"Needs improvement"," performance"]})]}),n.jsxs("div",{className:"text-center",children:[n.jsx("div",{className:"text-3xl font-bold text-orange-400 mb-2",children:i.audits.ratio.toFixed(2)}),n.jsx("div",{className:"text-white/70 text-sm",children:"Audit Ratio"}),n.jsxs("div",{className:"text-white/50 text-xs mt-1",children:[i.audits.ratio>1?"Positive":i.audits.ratio>.8?"Balanced":"Focus needed"," contribution"]})]}),n.jsxs("div",{className:"text-center",children:[n.jsx("div",{className:"text-3xl font-bold text-purple-400 mb-2",children:_e(i.audits.totalUp)}),n.jsx("div",{className:"text-white/70 text-sm",children:"Total Up Points"}),n.jsx("div",{className:"text-white/50 text-xs mt-1",children:"From peer reviews"})]})]})]}),c&&m&&n.jsxs(V.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},className:"fixed z-50 bg-black/90 backdrop-blur-lg rounded-lg p-4 border border-white/20 shadow-xl max-w-xs pointer-events-none",style:{left:`${Math.min(c.x+10,window.innerWidth-320)}px`,top:`${Math.max(c.y-100,10)}px`},children:[c.type==="xp"&&n.jsxs("div",{className:"text-white",children:[n.jsxs("h4",{className:"font-semibold text-blue-400 mb-2",children:[c.data.month," XP Details"]}),n.jsxs("div",{className:"space-y-1 text-sm",children:[n.jsxs("div",{children:["Total XP: ",n.jsx("span",{className:"text-blue-300",children:_e(c.data.xp)})]}),c.data.growth!==0&&n.jsxs("div",{children:["Growth: ",n.jsxs("span",{className:c.data.growth>0?"text-green-400":"text-red-400",children:[c.data.growth>0?"+":"",_e(c.data.growth)]})]}),n.jsxs("div",{children:["Level: ",n.jsx("span",{className:"text-yellow-400",children:Math.floor(c.data.xp/1e3)+1})]})]})]}),c.type==="skill"&&n.jsxs("div",{className:"text-white",children:[n.jsx("h4",{className:"font-semibold text-orange-400 mb-2",children:c.data.name}),n.jsxs("div",{className:"space-y-1 text-sm",children:[n.jsxs("div",{children:["Points: ",n.jsx("span",{className:"text-orange-300",children:c.data.points})]}),n.jsxs("div",{children:["Level: ",n.jsx("span",{className:"text-yellow-400",children:c.data.level})]}),n.jsxs("div",{children:["Progress: ",n.jsxs("span",{className:"text-blue-400",children:[c.data.progress,"%"]})," to next level"]})]})]}),c.type==="project"&&n.jsxs("div",{className:"text-white",children:[n.jsxs("h4",{className:"font-semibold text-green-400 mb-2",children:["Project ",c.data.label]}),n.jsxs("div",{className:"space-y-1 text-sm",children:[n.jsxs("div",{children:["Count: ",n.jsx("span",{className:"text-white",children:c.data.value})]}),n.jsxs("div",{children:["Percentage: ",n.jsxs("span",{className:"text-blue-400",children:[c.data.percentage.toFixed(1),"%"]})]}),n.jsxs("div",{children:["Total Projects: ",n.jsx("span",{className:"text-gray-400",children:c.data.total})]})]})]}),(c.type==="audit-given"||c.type==="audit-received")&&n.jsxs("div",{className:"text-white",children:[n.jsx("h4",{className:"font-semibold mb-2",children:n.jsxs("span",{className:c.type==="audit-given"?"text-green-400":"text-red-400",children:[c.data.month," Audit Details"]})}),n.jsxs("div",{className:"space-y-1 text-sm",children:[n.jsxs("div",{children:["Given: ",n.jsx("span",{className:"text-green-400",children:c.data.auditsGiven})]}),n.jsxs("div",{children:["Received: ",n.jsx("span",{className:"text-red-400",children:c.data.auditsReceived})]}),n.jsxs("div",{children:["Ratio: ",n.jsx("span",{className:"text-blue-400",children:c.data.ratio})]}),n.jsx("div",{className:"text-xs text-gray-400 mt-2",children:c.type==="audit-given"?"Audits you completed":"Audits you received from peers"})]})]}),c.type==="project-xp"&&n.jsxs("div",{className:"text-white",children:[n.jsx("h4",{className:"font-semibold text-purple-400 mb-2",children:c.data.name}),n.jsxs("div",{className:"space-y-1 text-sm",children:[n.jsxs("div",{children:["Total XP: ",n.jsx("span",{className:"text-purple-300",children:_e(c.data.xp)})]}),n.jsxs("div",{children:["Percentage: ",n.jsxs("span",{className:"text-blue-400",children:[c.data.percentage.toFixed(1),"%"]})]}),n.jsxs("div",{children:["Instances: ",n.jsx("span",{className:"text-green-400",children:c.data.count})]}),n.jsxs("div",{children:["Avg XP: ",n.jsx("span",{className:"text-yellow-400",children:_e(c.data.avgXP)})]}),n.jsx("div",{className:"text-xs text-gray-400 mt-2",children:"XP earned from this project"})]})]}),c.type==="distribution"&&n.jsxs("div",{className:"text-white",children:[n.jsxs("h4",{className:"font-semibold text-blue-400 mb-2 flex items-center",children:[n.jsx(Ai,{className:"w-4 h-4 mr-1"}),c.data.distributionType==="level"?"Level":"Audit Ratio"," Range: ",c.data.range,c.data.isCurrentUserRange&&n.jsx("span",{className:"ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold",children:"YOUR RANGE"})]}),n.jsxs("div",{className:"space-y-1 text-sm",children:[n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(dn,{className:"w-3 h-3 text-blue-400"}),n.jsx("span",{children:"User Count: "}),n.jsx("span",{className:"text-blue-300 font-bold",children:c.data.count})]}),n.jsxs("div",{children:["Percentage: ",n.jsxs("span",{className:"text-green-400",children:[c.data.percentage,"%"]})," of total users"]}),n.jsxs("div",{children:["Range: ",n.jsxs("span",{className:"text-purple-300",children:[c.data.rangeMin," - ",c.data.rangeMax]})]}),n.jsxs("div",{children:["Population: ",n.jsx("span",{className:"text-orange-400",children:c.data.cohortFilter==="all"?"All Students":"Your Cohort"})]}),n.jsxs("div",{children:["Total Users: ",n.jsx("span",{className:"text-cyan-400",children:c.data.totalUsers})]}),c.data.isCurrentUserRange&&n.jsxs("div",{className:"border-t border-emerald-600 pt-2 mt-2",children:[n.jsx(Tc,{className:"w-3 h-3 inline text-emerald-400 mr-1"}),n.jsx("span",{className:"text-emerald-400 font-semibold",children:"You are in this range!"})]}),n.jsxs("div",{className:"text-xs text-gray-400 mt-2 border-t border-gray-600 pt-2",children:["Distribution of users by ",c.data.distributionType==="level"?"level progression":"audit contribution ratio"]})]})]})]})]})},uy=({handleElementClick:i,user:o})=>{const[c,u]=j.useState("level"),[m,f]=j.useState("all"),{data:p,loading:x}=er(oy,{errorPolicy:"all",fetchPolicy:"cache-and-network"}),v=ot.useMemo(()=>p?.bhModuleUsers?p.bhModuleUsers.map(S=>({id:S.userId,level:S.level||0,auditRatio:Number(S.userAuditRatio)||0,login:S.userLogin,cohort:"BH Module",eventUser:S})):[],[p]),y=ot.useMemo(()=>{if(!o||!v.length)return null;const S=v.find(G=>G.id===o.id);if(S)return S;const L=p?.allUsersWithEvents?.find(G=>G.id===o.id);return L?{id:L.id,level:0,auditRatio:Number(L.auditRatio)||0,login:L.login,cohort:"Unknown"}:null},[o,v,p]),g=ot.useMemo(()=>{const S=new Map;return p?.userLabels&&p.userLabels.forEach(L=>{if(L.label?.name?.toLowerCase().includes("cohort")){const G=L.userId;S.has(G)||S.set(G,[]);const B=L.label,X=B.name.toLowerCase();let K=B.name;X.includes("cohort4")||X.includes("cohort-4")?K="Cohort 4":X.includes("cohort1")?K="Cohort 1":X.includes("cohort2")?K="Cohort 2":X.includes("cohort3")&&(K="Cohort 3"),S.get(G).push({...B,name:K})}}),v.forEach(L=>{S.has(L.id)||S.set(L.id,[{id:0,name:"BH Module",description:"Default BH Module cohort"}])}),S},[p,v]),E=ot.useMemo(()=>{if(!y||!g.has(y.id))return"BH Module";const S=g.get(y.id)||[];return S.length>0?S[0].name:"BH Module"},[y,g]),A=ot.useMemo(()=>{let S=[...v];return m==="cohort"&&E&&(S=S.filter(L=>(g.get(L.id)||[]).some(B=>B.name===E))),S},[v,m,E,g]),Z=ot.useMemo(()=>{if(A.length===0)return[];const S=[];return c==="level"?[{label:"0-4",min:0,max:4,color:"#EF4444"},{label:"5-9",min:5,max:9,color:"#F97316"},{label:"10-14",min:10,max:14,color:"#EAB308"},{label:"15-19",min:15,max:19,color:"#84CC16"},{label:"20-29",min:20,max:29,color:"#22C55E"},{label:"30-39",min:30,max:39,color:"#06B6D4"},{label:"40-49",min:40,max:49,color:"#3B82F6"},{label:"50+",min:50,max:999,color:"#8B5CF6"}].forEach(G=>{const B=A.filter(X=>X.level>=G.min&&X.level<=G.max).length;B>0&&S.push({...G,count:B})}):[{label:"0-0.5",min:0,max:.5,color:"#EF4444"},{label:"0.5-1.0",min:.5,max:1,color:"#F97316"},{label:"1.0-1.5",min:1,max:1.5,color:"#EAB308"},{label:"1.5-2.0",min:1.5,max:2,color:"#84CC16"},{label:"2.0-3.0",min:2,max:3,color:"#22C55E"},{label:"3.0+",min:3,max:999,color:"#06B6D4"}].forEach(G=>{const B=A.filter(X=>X.auditRatio>=G.min&&X.auditRatio<G.max).length;B>0&&S.push({...G,count:B})}),S},[A,c]),k=ot.useMemo(()=>{if(!y)return null;const S=c==="level"?y.level:y.auditRatio;return c==="level"?[{label:"0-4",min:0,max:4},{label:"5-9",min:5,max:9},{label:"10-14",min:10,max:14},{label:"15-19",min:15,max:19},{label:"20-29",min:20,max:29},{label:"30-39",min:30,max:39},{label:"40-49",min:40,max:49},{label:"50+",min:50,max:999}].find(G=>S>=G.min&&S<=G.max):[{label:"0-0.5",min:0,max:.5},{label:"0.5-1.0",min:.5,max:1},{label:"1.0-1.5",min:1,max:1.5},{label:"1.5-2.0",min:1.5,max:2},{label:"2.0-3.0",min:2,max:3},{label:"3.0+",min:3,max:999}].find(G=>S>=G.min&&S<G.max)},[y,c]),z=800,N=400,T={top:20,right:30,bottom:60,left:60},O=z-T.left-T.right,I=N-T.top-T.bottom;return x?n.jsx(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:n.jsxs("div",{className:"flex items-center justify-center h-64",children:[n.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"}),n.jsx("span",{className:"ml-3 text-white/70",children:"Loading user distribution..."})]})}):n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("div",{className:"flex justify-between items-center mb-6",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx("div",{className:"w-8 h-8 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg flex items-center justify-center",children:n.jsx(Ai,{className:"w-4 h-4 text-blue-400"})}),n.jsxs("div",{children:[n.jsxs("h3",{className:"text-lg font-semibold text-white",children:["Distribution of Users by ",c==="level"?"Level":"Audit Ratio"]}),n.jsxs("p",{className:"text-white/60 text-sm",children:["User count distribution across ",c==="level"?"level":"audit ratio"," ranges"]})]})]}),n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsxs("div",{className:"flex bg-white/10 rounded-lg p-1 border border-white/20",children:[n.jsxs("button",{onClick:()=>u("level"),className:`px-3 py-1 rounded-md text-sm font-medium transition-all ${c==="level"?"bg-blue-500 text-white shadow-lg":"text-white/70 hover:text-white hover:bg-white/10"}`,children:[n.jsx(Va,{className:"w-3 h-3 inline mr-1"}),"Level"]}),n.jsxs("button",{onClick:()=>u("audit"),className:`px-3 py-1 rounded-md text-sm font-medium transition-all ${c==="audit"?"bg-green-500 text-white shadow-lg":"text-white/70 hover:text-white hover:bg-white/10"}`,children:[n.jsx(fn,{className:"w-3 h-3 inline mr-1"}),"Audit Ratio"]})]}),n.jsxs("div",{className:"flex bg-white/10 rounded-lg p-1 border border-white/20",children:[n.jsxs("button",{onClick:()=>f("all"),className:`px-3 py-1 rounded-md text-sm font-medium transition-all ${m==="all"?"bg-purple-500 text-white shadow-lg":"text-white/70 hover:text-white hover:bg-white/10"}`,children:[n.jsx(dn,{className:"w-3 h-3 inline mr-1"}),"All Students"]}),n.jsxs("button",{onClick:()=>f("cohort"),className:`px-3 py-1 rounded-md text-sm font-medium transition-all ${m==="cohort"?"bg-purple-500 text-white shadow-lg":"text-white/70 hover:text-white hover:bg-white/10"}`,title:`Filter by ${E}`,children:[n.jsx(Tc,{className:"w-3 h-3 inline mr-1"}),E]})]})]})]}),n.jsx("div",{className:"mb-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg p-4 border border-emerald-500/30",children:n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Tc,{className:"w-5 h-5 text-emerald-400"}),n.jsxs("div",{children:[n.jsx("h4",{className:"text-white font-semibold",children:"Your Position"}),n.jsxs("p",{className:"text-white/70 text-sm",children:["Current ",c==="level"?"level":"audit ratio"," and range"]})]})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"text-2xl font-bold text-emerald-400",children:y?c==="level"?`Level ${y.level}`:y.auditRatio.toFixed(2):"No Data"}),n.jsxs("div",{className:"text-emerald-300 text-sm",children:["Range: ",k?.label||"Unknown"]})]})]})}),n.jsxs("div",{className:"grid grid-cols-3 gap-4 mb-6",children:[n.jsxs("div",{className:"bg-white/5 rounded-lg p-3 text-center",children:[n.jsx("div",{className:"text-2xl font-bold text-blue-400",children:A.length}),n.jsx("div",{className:"text-white/70 text-sm",children:"Total Users"})]}),n.jsxs("div",{className:"bg-white/5 rounded-lg p-3 text-center",children:[n.jsx("div",{className:"text-2xl font-bold text-green-400",children:Z.length}),n.jsx("div",{className:"text-white/70 text-sm",children:"Active Ranges"})]}),n.jsxs("div",{className:"bg-white/5 rounded-lg p-3 text-center",children:[n.jsx("div",{className:"text-2xl font-bold text-purple-400",children:Z.length>0?Math.max(...Z.map(S=>S.count)):0}),n.jsx("div",{className:"text-white/70 text-sm",children:"Max in Range"})]}),m==="cohort"&&n.jsxs("div",{className:"bg-white/5 rounded-lg p-3 text-center",children:[n.jsx("div",{className:"text-2xl font-bold text-cyan-400",children:E}),n.jsx("div",{className:"text-white/70 text-sm",children:"Your Cohort"})]})]}),n.jsx("div",{className:"flex justify-center",children:n.jsxs("svg",{viewBox:`0 0 ${z} ${N}`,className:"w-full max-w-4xl h-80",children:[n.jsxs("defs",{children:[n.jsxs("linearGradient",{id:"distributionGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:c==="level"?"#3B82F6":"#10B981",stopOpacity:"0.8"}),n.jsx("stop",{offset:"100%",stopColor:c==="level"?"#1D4ED8":"#059669",stopOpacity:"0.3"})]}),n.jsxs("filter",{id:"glow",children:[n.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),n.jsxs("feMerge",{children:[n.jsx("feMergeNode",{in:"coloredBlur"}),n.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),Z.length>0&&[0,1,2,3,4].map(S=>{const L=Math.max(...Z.map(X=>X.count)),G=T.top+I*S/4,B=Math.round(L*(4-S)/4);return n.jsxs("g",{children:[n.jsx("line",{x1:T.left,y1:G,x2:z-T.right,y2:G,stroke:"rgba(255,255,255,0.1)",strokeWidth:"1"}),n.jsx("text",{x:T.left-10,y:G+4,textAnchor:"end",fontSize:"10",fill:"white/60",children:B})]},S)}),Z.map((S,L)=>{const G=Math.max(...Z.map(ve=>ve.count)),B=S.count/G*I,X=Math.max(40,O/Z.length-15),K=T.left+L*(O/Z.length)+10,te=T.top+I-B,he=k?.label===S.label;return n.jsxs("g",{children:[n.jsx("rect",{x:K,y:te,width:X,height:B,fill:S.color,opacity:"0.3",rx:"4",filter:"url(#glow)"}),n.jsx("rect",{x:K,y:te,width:X,height:B,fill:S.color,rx:"4",className:"transition-all duration-300 hover:opacity-80 cursor-pointer",stroke:he?"#10B981":"none",strokeWidth:he?"3":"0",onClick:ve=>{const Me=ve.currentTarget.getBoundingClientRect();i({type:"distribution",data:{range:S.label,count:S.count,percentage:(S.count/A.length*100).toFixed(1),distributionType:c,cohortFilter:m,totalUsers:A.length,rangeMin:S.min,rangeMax:S.max===999?"∞":S.max,isCurrentUserRange:he},x:Me.left+Me.width/2,y:Me.top})}}),he&&n.jsxs("g",{children:[n.jsx("text",{x:K+X/2,y:te-35,textAnchor:"middle",fontSize:"10",fill:"#10B981",fontWeight:"bold",children:"YOU ARE HERE"}),n.jsx("circle",{cx:K+X/2,cy:te-45,r:"3",fill:"#10B981"})]}),n.jsx("text",{x:K+X/2,y:te-5,textAnchor:"middle",fontSize:"12",fill:"white",fontWeight:"bold",children:S.count}),n.jsxs("text",{x:K+X/2,y:te-20,textAnchor:"middle",fontSize:"10",fill:"white/80",children:[(S.count/A.length*100).toFixed(1),"%"]}),n.jsx("text",{x:K+X/2,y:N-35,textAnchor:"middle",fontSize:"11",fill:"white",fontWeight:"medium",children:S.label})]},`${S.label}-${L}`)}),n.jsx("text",{x:15,y:N/2,textAnchor:"middle",fontSize:"12",fill:"white/70",transform:`rotate(-90 15 ${N/2})`,children:"Number of Users"}),n.jsx("text",{x:z/2,y:N-5,textAnchor:"middle",fontSize:"12",fill:"white/70",children:c==="level"?"Level Ranges":"Audit Ratio Ranges"})]})})]})},dy=({analytics:i})=>{const o=i.xp.monthlyData.reduce((f,p)=>f+p.xp,0)/12,c=i.xp.monthlyData.reduce((f,p)=>p.xp>f.xp?p:f,{month:"N/A",xp:0}),u=i.xp.monthlyData.slice(-3).reduce((f,p)=>f+p.xp,0)/3,m=u>o?"improving":"declining";return n.jsxs("div",{className:"space-y-6 relative pt-0",children:[n.jsxs("div",{className:"fixed inset-0 opacity-15 pointer-events-none z-0",children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-green-500/3 to-cyan-500/3"}),n.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 40px 40px, rgba(34, 197, 94, 0.06) 2px, transparent 0)",backgroundSize:"80px 80px"}})]}),n.jsxs("div",{className:"relative z-10",children:[n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center pb-4",children:[n.jsx("h2",{className:"text-2xl font-bold text-white mb-2",children:"Performance Statistics"}),n.jsx("p",{className:"text-white/70",children:"Complete metrics and key performance indicators"})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8",children:[n.jsx(rn,{icon:Js,title:"Total XP (Main Module)",value:_e(i.xp.bhModule),color:"bg-gradient-to-r from-blue-500/30 to-cyan-500/30",bgGradient:"bg-gradient-to-br from-blue-900/20 to-cyan-900/20",subValue:`Level ${i.level.current} (${i.level.progress.toFixed(1)}% to next)`,trend:i.level.progress>50?{value:Math.round(i.level.progress-40),isPositive:!0}:void 0}),n.jsx(rn,{icon:fn,title:"Audit Ratio",value:i.audits.ratio.toFixed(1),color:"bg-gradient-to-r from-green-500/30 to-emerald-500/30",bgGradient:"bg-gradient-to-br from-green-900/20 to-emerald-900/20",subValue:`${i.audits.given} audits completed`,trend:i.audits.ratio>1?{value:Math.round((i.audits.ratio-1)*100),isPositive:!0}:void 0}),n.jsx(rn,{icon:ml,title:"Success Rate",value:`${i.projects.bhModule.passRate.toFixed(1)}%`,color:"bg-gradient-to-r from-yellow-500/30 to-amber-500/30",bgGradient:"bg-gradient-to-br from-yellow-900/20 to-amber-900/20",subValue:`${i.projects.bhModule.passed}/${i.projects.bhModule.total} projects`,trend:i.projects.bhModule.passRate>75?{value:Math.round(i.projects.bhModule.passRate-60),isPositive:!0}:void 0}),n.jsx(rn,{icon:cn,title:"Skills Mastered",value:i.skills.total,color:"bg-gradient-to-r from-purple-500/30 to-violet-500/30",bgGradient:"bg-gradient-to-br from-purple-900/20 to-violet-900/20",subValue:`${i.skills.top[0]?.name||"None"} leading skill`}),n.jsx(rn,{icon:pl,title:"Monthly Average XP",value:_e(o),color:"bg-gradient-to-r from-indigo-500/30 to-purple-500/30",bgGradient:"bg-gradient-to-br from-indigo-900/20 to-purple-900/20",subValue:`${c.month} was peak month`,trend:m==="improving"?{value:15,isPositive:!0}:{value:10,isPositive:!1}}),n.jsx(rn,{icon:wi,title:"Recent Trend",value:m==="improving"?"📈 Rising":"📉 Stable",color:"bg-gradient-to-r from-rose-500/30 to-pink-500/30",bgGradient:"bg-gradient-to-br from-rose-900/20 to-pink-900/20",subValue:`${_e(u)} avg (3 months)`})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 my-4",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(mh,{className:"w-5 h-5 mr-2 text-blue-400"}),"Learning Progress Statistics"]}),n.jsxs("div",{className:"space-y-5",children:[n.jsxs("div",{className:"flex items-center justify-between p-4 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Ps,{className:"w-5 h-5 text-green-400"}),n.jsx("span",{className:"text-white text-sm",children:"Completed  Projects"})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"text-green-400 font-bold",children:i.projects.bhModule.completed}),n.jsxs("div",{className:"text-white/60 text-xs",children:[(i.projects.bhModule.completed/i.projects.bhModule.total*100).toFixed(0),"%"]})]})]}),n.jsxs("div",{className:"flex items-center justify-between p-4 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Rc,{className:"w-5 h-5 text-yellow-400"}),n.jsx("span",{className:"text-white text-sm",children:"In Progress"})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"text-yellow-400 font-bold",children:i.projects.bhModule.inProgress}),n.jsx("div",{className:"text-white/60 text-xs",children:"Active projects"})]})]}),n.jsxs("div",{className:"flex items-center justify-between p-4 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Ai,{className:"w-5 h-5 text-purple-400"}),n.jsx("span",{className:"text-white text-sm",children:"Average Grade"})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"text-purple-400 font-bold",children:i.projects.avgGrade.toFixed(2)}),n.jsx("div",{className:"text-white/60 text-xs",children:"Project average"})]})]}),n.jsxs("div",{className:"flex items-center justify-between p-4 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Js,{className:"w-5 h-5 text-blue-400"}),n.jsx("span",{className:"text-white text-sm",children:"XP per Project"})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"text-blue-400 font-bold",children:_e(i.xp.average)}),n.jsx("div",{className:"text-white/60 text-xs",children:"Average earning"})]})]})]})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 my-4",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(pl,{className:"w-5 h-5 mr-2 text-green-400"}),"Activity & Engagement"]}),n.jsxs("div",{className:"space-y-5",children:[n.jsxs("div",{className:"flex items-center justify-between p-4 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(fn,{className:"w-5 h-5 text-green-400"}),n.jsx("span",{className:"text-white text-sm",children:"Audits Completed"})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"text-green-400 font-bold",children:i.audits.completed}),n.jsxs("div",{className:"text-white/60 text-xs",children:[(i.audits.completed/i.audits.given*100).toFixed(1),"% completion rate"]})]})]}),n.jsxs("div",{className:"flex items-center justify-between p-4 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(dn,{className:"w-5 h-5 text-blue-400"}),n.jsx("span",{className:"text-white text-sm",children:"Group Leadership"})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"text-blue-400 font-bold",children:i.groups.captained}),n.jsx("div",{className:"text-white/60 text-xs",children:"Groups led"})]})]}),n.jsxs("div",{className:"flex items-center justify-between p-4 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(wi,{className:"w-5 h-5 text-purple-400"}),n.jsx("span",{className:"text-white text-sm",children:"Recent Activity"})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"text-purple-400 font-bold",children:i.activity.recent}),n.jsx("div",{className:"text-white/60 text-xs",children:"Last 30 days"})]})]}),n.jsxs("div",{className:"flex items-center justify-between p-4 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(Ni,{className:"w-5 h-5 text-yellow-400"}),n.jsx("span",{className:"text-white text-sm",children:"Monthly Average XP"})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"text-yellow-400 font-bold",children:_e(o)}),n.jsxs("div",{className:"text-white/60 text-xs",children:[m==="improving"?"↗":"↘"," ",m]})]})]})]})]})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 my-6",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(Va,{className:"w-5 h-5 mr-2 text-orange-400"}),"Module Comparison Statistics"]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[n.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[n.jsxs("h4",{className:"text-white font-medium mb-3 flex items-center",children:[n.jsx(Zs,{className:"w-4 h-4 mr-2 text-blue-400"}),"BH Module (Main Curriculum)"]}),n.jsxs("div",{className:"space-y-3",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-white/70 text-sm",children:"XP Earned"}),n.jsx("span",{className:"text-blue-400 font-bold",children:_e(i.xp.bhModule)})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-white/70 text-sm",children:"Projects"}),n.jsx("span",{className:"text-white font-bold",children:i.projects.bhModule.total})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-white/70 text-sm",children:"vs Piscines"}),n.jsxs("span",{className:"text-white font-bold",children:[(i.xp.bhModule/(i.xp.bhModule+i.xp.piscines)*100).toFixed(1),"%"]})]}),n.jsx("div",{className:"w-full bg-white/10 rounded-full h-2 mt-2",children:n.jsx("div",{className:"bg-blue-400 h-2 rounded-full transition-all duration-1000",style:{width:`${i.xp.bhModule/(i.xp.bhModule+i.xp.piscines)*100}%`}})})]})]}),n.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[n.jsxs("h4",{className:"text-white font-medium mb-3 flex items-center",children:[n.jsx(cn,{className:"w-4 h-4 mr-2 text-green-400"}),"Piscines (Intensive Training)"]}),n.jsxs("div",{className:"space-y-3",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-white/70 text-sm",children:"XP Earned"}),n.jsx("span",{className:"text-green-400 font-bold",children:_e(i.xp.piscines)})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-white/70 text-sm",children:"Projects"}),n.jsx("span",{className:"text-white font-bold",children:i.projects.piscines.total})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-white/70 text-sm",children:"Modules Completed"}),n.jsx("span",{className:"text-white font-bold",children:i.moduleData.piscines})]}),n.jsx("div",{className:"w-full bg-white/10 rounded-full h-2 mt-2",children:n.jsx("div",{className:"bg-green-400 h-2 rounded-full transition-all duration-1000",style:{width:`${i.xp.piscines/(i.xp.bhModule+i.xp.piscines)*100}%`}})})]})]})]})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(cn,{className:"w-5 h-5 mr-2 text-purple-400"}),"Skills Development Statistics"]}),n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:i.skills.skillData.map((f,p)=>n.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[n.jsxs("div",{className:"flex items-center justify-between mb-2",children:[n.jsx("span",{className:"text-white/80 text-sm font-medium capitalize",children:f.name.replace(/-/g," ")}),n.jsxs("span",{className:"text-purple-400 font-bold text-sm",children:["#",p+1]})]}),n.jsxs("div",{className:"text-2xl font-bold text-white mb-1",children:[f.percentage,"%"]}),n.jsx("div",{className:"text-white/60 text-xs",children:"Skill percentage"}),n.jsx("div",{className:"w-full bg-white/10 rounded-full h-2 mt-3",children:n.jsx("div",{className:"bg-purple-400 h-2 rounded-full transition-all duration-1000",style:{width:`${Math.min(100,f.percentage)}%`}})})]},f.name))})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.6},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mt-8",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(Ni,{className:"w-5 h-5 mr-2 text-yellow-400"}),"Performance Insights"]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[n.jsxs("div",{className:"text-center p-4 bg-white/5 rounded-lg",children:[n.jsx("div",{className:"text-2xl font-bold text-blue-400 mb-2",children:c.month}),n.jsx("div",{className:"text-white/70 text-sm mb-1",children:"Most Active Month"}),n.jsxs("div",{className:"text-blue-400 text-xs",children:[_e(c.xp)," XP earned"]})]}),n.jsxs("div",{className:"text-center p-4 bg-white/5 rounded-lg",children:[n.jsx("div",{className:"text-2xl font-bold text-green-400 mb-2",children:i.audits.avgGrade.toFixed(2)}),n.jsx("div",{className:"text-white/70 text-sm mb-1",children:"Avg Audit Grade"}),n.jsx("div",{className:"text-green-400 text-xs",children:"Given to others"})]}),n.jsxs("div",{className:"text-center p-4 bg-white/5 rounded-lg",children:[n.jsxs("div",{className:"text-2xl font-bold text-purple-400 mb-2",children:[(i.groups.total/(i.projects.total||1)*100).toFixed(0),"%"]}),n.jsx("div",{className:"text-white/70 text-sm mb-1",children:"Collaboration Rate"}),n.jsx("div",{className:"text-purple-400 text-xs",children:"Projects in groups"})]})]})]})]})]})},rn=({icon:i,title:o,value:c,color:u,subValue:m,trend:f,bgGradient:p})=>n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:`${p||"bg-gradient-to-br from-slate-800/50 to-slate-900/50 dark:from-slate-800/50 dark:to-slate-900/50 light:from-white/80 light:to-slate-50/80"} backdrop-blur-lg rounded-2xl p-6 border border-white/10 dark:border-white/10 light:border-slate-300/30 hover:border-white/20 dark:hover:border-white/20 light:hover:border-slate-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl group`,children:[n.jsxs("div",{className:"flex items-center justify-between mb-4",children:[n.jsx("div",{className:`p-3 rounded-xl ${u} backdrop-blur-sm`,children:n.jsx(i,{className:"w-8 h-8 text-white drop-shadow-lg"})}),f&&n.jsxs("div",{className:`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${f.isPositive?"bg-green-500/20 text-green-400":"bg-red-500/20 text-red-400"}`,children:[f.isPositive?"↗":"↘"," ",Math.abs(f.value),"%"]})]}),n.jsx("h3",{className:"text-3xl font-bold text-white dark:text-white light:text-slate-900 mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300",children:c}),n.jsx("p",{className:"text-white/70 dark:text-white/70 light:text-slate-700 text-sm font-medium",children:o}),m&&n.jsx("p",{className:"text-white/50 dark:text-white/50 light:text-slate-600 text-xs mt-2 bg-white/5 dark:bg-white/5 light:bg-slate-800/10 rounded-lg px-2 py-1",children:m})]}),fy=i=>{const o=i.filter(u=>u.isDone&&u.grade!==void 0&&u.grade!==null);return o.length===0?null:o.reduce((u,m)=>u+m.grade,0)/o.length},my=({analytics:i})=>{const[o,c]=j.useState("all"),[u,m]=j.useState("all"),[f,p]=j.useState(""),[x,v]=j.useState(!1),y=(N,T)=>{const O=N.type,I=new Date(N.createdAt),S=T.filter(L=>L.type===O&&new Date(L.createdAt)<I).sort((L,G)=>new Date(G.createdAt).getTime()-new Date(L.createdAt).getTime())[0];return S?N.amount-S.amount:N.amount},g=j.useMemo(()=>{let N=i.rawData.transactions;if(x&&(N=N.filter(O=>O.path&&O.path.includes("/bahrain/bh-module"))),o!=="all"&&(o==="skill"?N=N.filter(O=>O.type?.startsWith("skill_")):N=N.filter(O=>O.type===o)),u!=="all"){const O=new Date;let I=new Date;switch(u){case"week":I.setDate(O.getDate()-7);break;case"month":I.setMonth(O.getMonth()-1);break;case"quarter":I.setMonth(O.getMonth()-3);break;case"year":I.setFullYear(O.getFullYear()-1);break}N=N.filter(S=>new Date(S.createdAt)>=I)}return f&&(N=N.filter(O=>O.path?.toLowerCase().includes(f.toLowerCase())||O.type?.toLowerCase().includes(f.toLowerCase()))),N.map(O=>{if(O.type?.startsWith("skill_")){const I=y(O,i.rawData.transactions);return{...O,skillProgress:I}}return O})},[i.rawData.transactions,o,u,f,x]),E=j.useMemo(()=>fy(i.rawData.progress),[i.rawData.progress]),A=j.useMemo(()=>{let N=i.rawData.progress;if(x&&(N=N.filter(T=>T.path&&T.path.includes("/bahrain/bh-module"))),u!=="all"){const T=new Date;let O=new Date;switch(u){case"week":O.setDate(T.getDate()-7);break;case"month":O.setMonth(T.getMonth()-1);break;case"quarter":O.setMonth(T.getMonth()-3);break;case"year":O.setFullYear(T.getFullYear()-1);break}N=N.filter(I=>new Date(I.updatedAt)>=O)}return f&&(N=N.filter(T=>T.path?.toLowerCase().includes(f.toLowerCase()))),N},[i.rawData.progress,u,f,x]),Z=N=>{switch(N){case"xp":return n.jsx(Js,{className:"h-4 w-4 text-blue-400"});case"level":return n.jsx(ml,{className:"h-4 w-4 text-yellow-400"});case"up":return n.jsx(Ux,{className:"h-4 w-4 text-green-400"});case"down":return n.jsx(Mx,{className:"h-4 w-4 text-red-400"});default:return N?.startsWith("skill_")?n.jsx(cn,{className:"h-4 w-4 text-purple-400"}):n.jsx(pl,{className:"h-4 w-4 text-white/60"})}},k=N=>{switch(N){case"xp":return"text-blue-400";case"level":return"text-yellow-400";case"up":return"text-green-400";case"down":return"text-red-400";default:return N?.startsWith("skill_")?"text-purple-400":"text-white/60"}},z=(N,T,O)=>{switch(N){case"xp":case"up":return`+${_e(T)}`;case"down":return`-${_e(T)}`;case"level":return`Level ${T}`;default:return N?.startsWith("skill_")?O&&O.skillProgress!==void 0?O.skillProgress>0?`+${O.skillProgress}%`:`${O.skillProgress}%`:`${T}%`:`${T}`}};return n.jsxs("div",{className:"space-y-6",children:[n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[n.jsx("h2",{className:"text-2xl font-bold text-white mb-2",children:"Transaction History"}),n.jsx("p",{className:"text-white/70",children:"Detailed activity log and progress records"})]}),n.jsx(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-4 gap-4 items-end",children:[n.jsxs("div",{children:[n.jsx("label",{className:"text-white/70 text-sm mb-2 block",children:"Search"}),n.jsxs("div",{className:"relative",children:[n.jsx(hh,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),n.jsx("input",{type:"text",placeholder:"Search transactions...",value:f,onChange:N=>p(N.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"text-white/70 text-sm mb-2 block",children:"Type"}),n.jsxs("select",{value:o,onChange:N=>c(N.target.value),className:"w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[n.jsx("option",{value:"all",children:"All Types"}),n.jsx("option",{value:"xp",children:"XP Transactions"}),n.jsx("option",{value:"level",children:"Level Ups"}),n.jsx("option",{value:"skill",children:"Skills"}),n.jsx("option",{value:"up",children:"Audit Given"}),n.jsx("option",{value:"down",children:"Audit Received"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"text-white/70 text-sm mb-2 block",children:"Time Period"}),n.jsxs("select",{value:u,onChange:N=>m(N.target.value),className:"w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[n.jsx("option",{value:"all",children:"All Time"}),n.jsx("option",{value:"week",children:"Last Week"}),n.jsx("option",{value:"month",children:"Last Month"}),n.jsx("option",{value:"quarter",children:"Last Quarter"}),n.jsx("option",{value:"year",children:"Last Year"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"text-white/70 text-sm mb-2 block",children:"Module"}),n.jsx("button",{onClick:()=>v(!x),className:`w-full px-4 py-2 rounded-lg font-medium text-sm transition-all ${x?"bg-primary-500 text-white":"bg-white/10 text-white/70 hover:bg-white/20"}`,children:x?"Main Module":"All Modules"})]})]})}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4",children:[n.jsxs(V.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5,delay:.3},className:"bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl",children:[n.jsx("div",{className:"flex items-center justify-between mb-4",children:n.jsx("div",{className:"p-3 rounded-xl bg-gradient-to-r from-blue-500/30 to-cyan-500/30 backdrop-blur-sm",children:n.jsx(pl,{className:"w-8 h-8 text-blue-400"})})}),n.jsx("div",{className:"text-3xl font-bold text-white mb-2",children:g.length.toLocaleString()}),n.jsx("div",{className:"text-white/70 text-sm",children:"Total Transactions"}),n.jsx("div",{className:"text-blue-300/60 text-xs mt-1",children:"All activity records"})]}),n.jsxs(V.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5,delay:.4},className:"bg-gradient-to-br from-emerald-900/20 to-green-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl",children:[n.jsx("div",{className:"flex items-center justify-between mb-4",children:n.jsx("div",{className:"p-3 rounded-xl bg-gradient-to-r from-emerald-500/30 to-green-500/30 backdrop-blur-sm",children:n.jsx(Ps,{className:"w-8 h-8 text-emerald-400"})})}),n.jsx("div",{className:"text-3xl font-bold text-white mb-2",children:A.filter(N=>N.isDone&&N.grade>=1).length}),n.jsx("div",{className:"text-white/70 text-sm",children:"Tasks Completed"}),n.jsx("div",{className:"text-emerald-300/60 text-xs mt-1",children:"Successfully finished"})]}),n.jsxs(V.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5,delay:.5},className:"bg-gradient-to-br from-red-900/20 to-rose-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl",children:[n.jsx("div",{className:"flex items-center justify-between mb-4",children:n.jsx("div",{className:"p-3 rounded-xl bg-gradient-to-r from-red-500/30 to-rose-500/30 backdrop-blur-sm",children:n.jsx(Dc,{className:"w-8 h-8 text-red-400"})})}),n.jsx("div",{className:"text-3xl font-bold text-white mb-2",children:A.filter(N=>N.isDone&&N.grade<1).length}),n.jsx("div",{className:"text-white/70 text-sm",children:"Tasks Failed"}),n.jsx("div",{className:"text-red-300/60 text-xs mt-1",children:"Need retry or review"})]}),n.jsxs(V.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5,delay:.6},className:"bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl",children:[n.jsx("div",{className:"flex items-center justify-between mb-4",children:n.jsx("div",{className:"p-3 rounded-xl bg-gradient-to-r from-yellow-500/30 to-amber-500/30 backdrop-blur-sm",children:n.jsx(Rc,{className:"w-8 h-8 text-yellow-400"})})}),n.jsx("div",{className:"text-3xl font-bold text-white mb-2",children:A.filter(N=>!N.isDone).length}),n.jsx("div",{className:"text-white/70 text-sm",children:"Tasks In Progress"}),n.jsx("div",{className:"text-yellow-300/60 text-xs mt-1",children:"Currently working on"})]}),n.jsxs(V.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5,delay:.7},className:"bg-gradient-to-br from-purple-900/20 to-violet-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl",children:[n.jsx("div",{className:"flex items-center justify-between mb-4",children:n.jsx("div",{className:"p-3 rounded-xl bg-gradient-to-r from-purple-500/30 to-violet-500/30 backdrop-blur-sm",children:n.jsx(Ni,{className:"w-8 h-8 text-purple-400"})})}),n.jsx("div",{className:"text-3xl font-bold text-white mb-2",children:E!==null?`${(E*100).toFixed(1)}%`:"N/A"}),n.jsx("div",{className:"text-white/70 text-sm",children:"Average Grade"}),n.jsx("div",{className:"text-purple-300/60 text-xs mt-1",children:E!==null?E>=.8?"Excellent performance":E>=.6?"Good performance":"Room for improvement":"No completed tasks"})]})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(Js,{className:"w-5 h-5 mr-2 text-blue-400"}),"Recent Transactions (",g.length,")"]}),n.jsxs("div",{className:"space-y-3 max-h-96 overflow-y-auto",children:[g.map(N=>n.jsxs(V.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},className:"flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx("div",{className:"p-2 rounded-full bg-white/10",children:Z(N.type)}),n.jsxs("div",{children:[n.jsx("div",{className:"text-white font-medium text-sm capitalize",children:N.type?.startsWith("skill_")?`Skill: ${N.type.replace("skill_","").replace(/-/g," ")}`:N.type==="up"?"Audit Given":N.type==="down"?"Audit Received":N.type?.replace("_"," ")||"Unknown"}),n.jsx("div",{className:"text-white/60 text-xs",children:N.path?.split("/").pop()||"System"}),n.jsx("div",{className:"text-white/40 text-xs",children:on(N.createdAt)})]})]}),n.jsx("div",{className:`text-right font-bold ${k(N.type)}`,children:z(N.type,N.amount,N)})]},N.id)),g.length===0&&n.jsxs("div",{className:"text-center py-8",children:[n.jsx(pl,{className:"w-12 h-12 text-white/30 mx-auto mb-3"}),n.jsx("p",{className:"text-white/60 text-sm",children:"No transactions found matching filters"})]})]})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[n.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[n.jsx(Va,{className:"w-5 h-5 mr-2 text-green-400"}),"Project Progress (",A.length,")"]}),n.jsxs("div",{className:"space-y-3 max-h-96 overflow-y-auto",children:[A.map(N=>n.jsxs(V.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},className:"flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all",children:[n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx("div",{className:"p-2 rounded-full bg-white/10",children:N.isDone?N.grade===0?n.jsx(Dc,{className:"h-4 w-4 text-red-400"}):n.jsx(Ps,{className:"h-4 w-4 text-green-400"}):n.jsx(Rc,{className:"h-4 w-4 text-yellow-400"})}),n.jsxs("div",{children:[n.jsx("div",{className:"text-white font-medium text-sm",children:N.path?.split("/").pop()||"Project"}),n.jsx("div",{className:"text-white/60 text-xs",children:N.isDone?N.grade===0?"Failed":"Completed":"In Progress"}),n.jsx("div",{className:"text-white/40 text-xs",children:on(N.updatedAt)})]})]}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:`font-bold ${N.isDone?N.grade>=1?"text-green-400":"text-red-400":"text-yellow-400"}`,children:N.isDone?`${(N.grade*100).toFixed(1)}%`:"Pending"}),n.jsx("div",{className:"text-white/60 text-xs",children:"Grade"})]})]},N.id)),A.length===0&&n.jsxs("div",{className:"text-center py-8",children:[n.jsx(Va,{className:"w-12 h-12 text-white/30 mx-auto mb-3"}),n.jsx("p",{className:"text-white/60 text-sm",children:"No progress records found"})]})]})]})]})]})},hy=q`
  query GetEnhancedDashboard($userId: Int!, $login: String!) {
    # User information with all attributes including avatar
    user(where: { login: { _eq: $login } }) {
      id
      login
      firstName
      lastName
      profile
      attrs
      createdAt
      updatedAt
      campus
      auditRatio
      totalUp
      totalDown
    }
    
    # Total XP aggregates by module
    bhModuleXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _eq: "/bahrain/bh-module" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    totalXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    piscineXP: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        event: { path: { _like: "%piscine%" } }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    
    # User transactions with full details
    userTransactions: transaction(where: { userId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      type
      amount
      path
      createdAt
      attrs
      objectId
      eventId
      campus
    }
    
    # User progress with full details
    userProgress: progress(where: { userId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      grade
      isDone
      path
      createdAt
      updatedAt
      version
      objectId
      groupId
      eventId
      campus
      object {
        id
        name
        type
      }
    }
    
    # User results with full details
    userResults: result(where: { userId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      grade
      type
      path
      createdAt
      isLast
      version
      objectId
      groupId
      eventId
      attrs
      campus
    }
    
    # Audits given by user
    auditsGiven: audit(where: { auditorId: { _eq: $userId } }, order_by: { createdAt: desc }) {
      id
      groupId
      grade
      createdAt
      updatedAt
      version
      endAt
      attrs
      resultId
      group {
        id
        path
        campus
        objectId
      }
    }
    
    # All audits (we'll filter for received audits in JavaScript)
    allAudits: audit(order_by: { createdAt: desc }) {
      id
      groupId
      auditorId
      grade
      createdAt
      updatedAt
      version
      endAt
      attrs
      resultId
      group {
        id
        path
        campus
        objectId
      }
    }
    
    # Groups where user is member or captain
    userGroups: group_user(where: { userId: { _eq: $userId } }) {
      id
      groupId
      createdAt
      updatedAt
      group {
        id
        captainId
        status
        path
        campus
        objectId
        eventId
        createdAt
        updatedAt
      }
    }
    
    # User event participation
    userEvents: event_user(where: { userId: { _eq: $userId } }) {
      id
      eventId
      level
      createdAt
      event {
        id
        path
        campus
        createdAt
        endAt
        objectId
      }
    }

    # Objects for project/exercise details
    objects: object(where: { id: { _in: [] } }) {
      id
      name
      type
      attrs
      createdAt
      updatedAt
    }

    # User roles
    userRoles: user_role(where: { userId: { _eq: $userId } }) {
      id
      roleId
      role {
        id
        slug
        name
        description
      }
    }

    # User labels
    userLabels: label_user(where: { userId: { _eq: $userId } }) {
      id
      labelId
      createdAt
      label {
        id
        name
        description
      }
    }
  }
`,Ph=({user:i})=>{const[o,c]=j.useState("profile"),{data:u,loading:m,error:f}=er(hy,{variables:{login:i.login,userId:i.id},fetchPolicy:"cache-and-network"}),p=u?.user?.[0],x=j.useMemo(()=>u?.userTransactions||[],[u]),v=j.useMemo(()=>u?.userProgress||[],[u]),y=j.useMemo(()=>u?.userResults||[],[u]),g=j.useMemo(()=>u?.auditsGiven||[],[u]),E=j.useMemo(()=>u?.allAudits||[],[u]),A=j.useMemo(()=>{if(!u?.allAudits||!u?.userGroups)return[];const O=u.userGroups.map(I=>I.groupId);return u.allAudits.filter(I=>O.includes(I.groupId)&&I.auditorId!==i.id)},[u,i.id]),Z=j.useMemo(()=>u?.userGroups||[],[u]),k=j.useMemo(()=>u?.userEvents||[],[u]),z=j.useMemo(()=>{if(!p)return null;const O=fl(x),I=fl(v);fl(y),fl(g),fl(A),fl(Z.map(J=>({...J.group,userId:J.userId})));const S=O.mainModule,L=I.mainModule,G=u?.totalXP?.aggregate?.sum?.amount||0,B=u?.bhModuleXP?.aggregate?.sum?.amount||0,X=u?.piscineXP?.aggregate?.sum?.amount||0,K=G-B-X,te=x.filter(J=>J.type==="xp"),he=te.length>0?Math.round(G/te.length):0,ve=x.filter(J=>J.type==="level"),Me=ve.length>0?ve.sort((J,Se)=>new Date(Se.createdAt).getTime()-new Date(J.createdAt).getTime())[0]:null,Je=Me?Me.amount:1,Be=Me?Me.createdAt:null,M=x.filter(J=>J.type==="xp"&&Be&&new Date(J.createdAt)>new Date(Be)&&J.path&&J.path.includes("bh-module")&&!J.path.includes("piscine")&&!J.path.includes("checkpoint")&&!(J.attrs&&(JSON.stringify(J.attrs).toLowerCase().includes("audit")||JSON.stringify(J.attrs).toLowerCase().includes("review")||JSON.stringify(J.attrs).toLowerCase().includes("corrector")))&&!(J.path&&(J.path.includes("audit")||J.path.includes("review")))),Q=M.reduce((J,Se)=>J+(Se.amount||0),0),P=1e5-Q,de=Q/1e5*100,ie={progress:Math.max(0,Math.min(100,de)),remainingXP:P,nextLevelXP:1e5,progressInKB:Q/1e3,remainingInKB:P/1e3},Ie=ie.progress,we=iy(x,Je),fe=x.filter(J=>J.type?.startsWith("skill_")),Ee=Wb(fe),wt=Ee.skills.slice(0,10).map(J=>({name:J.name,currentAmount:J.currentAmount,percentage:J.percentage,progress:J.progress,latestDate:J.latestDate})),Ct=g.length,Ya=A.length,Ot=g.filter(J=>J.grade!==null).length,Nt=A.filter(J=>J.grade!==null).length,xl=Ct-Ot,gl=Ya-Nt,vl=Ot>0?g.filter(J=>J.grade!==null).reduce((J,Se)=>J+(Se.grade||0),0)/Ot:0,vn=Nt>0?A.filter(J=>J.grade!==null).reduce((J,Se)=>J+(Se.grade||0),0)/Nt:0,$e=ey(v),zt=$e.bhModule,bl=v.filter(J=>J.isDone&&J.object?.type==="project").sort((J,Se)=>new Date(Se.createdAt).getTime()-new Date(J.createdAt).getTime())[0],nt=$e.total,$a=$e.passed+$e.failed,bn=$e.passed,Di=$e.failed,yl=nt-$a,yn=y.length,jn=yn>0?y.reduce((J,Se)=>J+(Se.grade||0),0)/yn:0,Mi=Z.length,Ui=Z.filter(J=>J.group?.captainId===i.id).length,Za=Mi-Ui,tt=p?.totalUp||0,Gt=p?.totalDown||0,it=p?.auditRatio||0,rr=Kh(Je),or=new Date(Date.now()-30*24*60*60*1e3),Ci=S.filter(J=>new Date(J.createdAt)>or).length,Jt=[];for(let J=11;J>=0;J--){const Se=new Date(Date.now()-(J+1)*30*24*60*60*1e3),Ft=new Date(Date.now()-J*30*24*60*60*1e3),Qa=te.filter(ct=>{const Ve=new Date(ct.createdAt);return Ve>=Se&&Ve<Ft}).reduce((ct,Ve)=>ct+(Ve.amount||0),0),cr=L.filter(ct=>{const Ve=new Date(ct.createdAt);return Ve>=Se&&Ve<Ft&&ct.isDone}).length,wn=g.filter(ct=>{const Ve=new Date(ct.createdAt);return Ve>=Se&&Ve<Ft}).length,Nn=A.filter(ct=>{const Ve=new Date(ct.createdAt);return Ve>=Se&&Ve<Ft}).length;Jt.push({month:Se.toLocaleDateString("en",{month:"short",year:"2-digit"}),xp:Qa,projects:cr,auditsGiven:wn,auditsReceived:Nn,audits:wn+Nn})}return{user:p,xp:{total:G,bhModule:B,piscines:X,other:K,earnedAfterLevel:Q,allTime:G,average:he,recent:Ci,upTotal:tt,downTotal:Gt,monthlyData:Jt},level:{current:Je,progress:Ie,nextLevelXP:ie.nextLevelXP,remainingXP:ie.remainingXP,progressInKB:ie.progressInKB,remainingInKB:ie.remainingInKB,levelTransaction:Me,xpAfterLevelCount:M.length,progression:we},skills:{top:wt,total:Ee.totalSkills,transactions:fe,skillData:Ee.skills},projects:{lastFinished:bl?{name:bl.object?.name,completedAt:bl.createdAt,grade:bl.grade}:null,completed:$a,total:nt,passed:bn,failed:Di,inProgress:yl,avgGrade:jn,completionRate:nt>0?$a/nt*100:0,passRate:$a>0?bn/$a*100:0,bhModule:{total:zt.total,passed:zt.passed,failed:zt.failed,passRate:zt.passRate,completed:zt.passed+zt.failed,inProgress:zt.total-(zt.passed+zt.failed)},piscines:{total:$e.piscines.total,passed:$e.piscines.passed,failed:$e.piscines.failed,passRate:$e.piscines.passRate},checkpoints:{total:$e.checkpoints.total,passed:$e.checkpoints.passed,failed:$e.checkpoints.failed,passRate:$e.checkpoints.passRate}},audits:{given:Ot,received:Nt,totalGiven:Ct,totalReceived:Ya,completedGiven:Ot,completedReceived:Nt,pendingGiven:xl,pendingReceived:gl,avgGradeGiven:vl,avgGradeReceived:vn,completed:Ot,pending:xl,avgGrade:vl,ratio:it,totalUp:tt,totalDown:Gt,monthlyData:Jt.map(J=>({month:J.month,audits:J.audits,auditsGiven:J.auditsGiven,auditsReceived:J.auditsReceived}))},groups:{total:Mi,captained:Ui,member:Za},results:{total:yn,avgGrade:jn},activity:{recent:Ci,monthlyData:Jt},performance:rr,moduleData:{bhModule:O.mainModule.length,piscines:Object.keys(O.piscines).length,totalPiscineTransactions:O.allPiscines.length},rawData:{transactions:x,progress:v,results:y,auditsGiven:g,auditsReceived:A,allAudits:E,groups:Z,events:k,userEvents:k,userRoles:u?.userRoles||[],userLabels:u?.userLabels||[]}}},[p,x,v,y,g,A,E,Z,k,i.id,u?.userRoles,u?.userLabels,u?.totalXP?.aggregate?.sum?.amount,u?.bhModuleXP?.aggregate?.sum?.amount,u?.piscineXP?.aggregate?.sum?.amount]);if(m)return n.jsx(hn,{});if(f||!p)return n.jsxs("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center",children:[n.jsx("p",{className:"text-white/70",children:"Unable to load dashboard data"}),f&&n.jsx("p",{className:"text-red-400 text-sm mt-2",children:f.message})]});const N=[{id:"profile",label:"Profile Info",icon:hl,description:"Personal information and achievements"},{id:"analytics",label:"Analytics",icon:Ai,description:"Visual data analysis and trends"},{id:"statistics",label:"Statistics",icon:Va,description:"Key metrics and performance indicators"},{id:"transactions",label:"Transactions",icon:pl,description:"Detailed activity history and records"}],T=()=>{if(!z)return null;switch(o){case"profile":return n.jsx(ch,{user:i,analytics:z});case"analytics":return n.jsx(cy,{analytics:z,user:i});case"statistics":return n.jsx(dy,{analytics:z});case"transactions":return n.jsx(my,{analytics:z});default:return n.jsx(ch,{user:i,analytics:z})}};return n.jsx("div",{className:"bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 h-full w-full relative",children:n.jsx("div",{className:"relative z-10 h-full w-full overflow-y-auto custom-scrollbar",children:n.jsxs("div",{className:"relative space-y-8 p-6",children:[n.jsxs(V.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center space-y-6",children:[n.jsxs(V.div,{initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{type:"spring",stiffness:200,damping:15},className:"inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-xl border border-emerald-400/30 mb-6 shadow-2xl shadow-emerald-500/20 relative overflow-hidden",children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 animate-pulse"}),n.jsx(fh,{className:"w-12 h-12 text-emerald-400 drop-shadow-lg relative z-10"})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3,duration:.6},children:[n.jsx("h1",{className:"text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-4",children:"Dashboard Overview"}),n.jsxs("p",{className:"text-xl text-white/70 max-w-2xl mx-auto",children:["Your complete ",n.jsx("span",{className:"text-emerald-400 font-semibold",children:"learning journey"})," and analytics hub"]})]})]}),n.jsx(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},className:"flex justify-center",children:n.jsx("div",{className:"bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-3 shadow-2xl",children:n.jsx("nav",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:N.map((O,I)=>{const S=O.icon,L=o===O.id;return n.jsxs(V.button,{onClick:()=>c(O.id),whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.1+I*.05},className:`relative overflow-hidden flex flex-col items-center space-y-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${L?"bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 border border-white/20":"text-white/70 hover:text-white hover:bg-white/10 hover:border-emerald-400/30 border border-transparent"}`,children:[L&&n.jsx(V.div,{className:"absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-2xl",initial:{opacity:0},animate:{opacity:1},transition:{duration:.3}}),n.jsx(S,{className:`w-6 h-6 relative z-10 ${L?"text-white drop-shadow-lg":"text-white/70"}`}),n.jsxs("div",{className:"text-center relative z-10",children:[n.jsx("div",{className:"font-semibold",children:O.label}),n.jsx("div",{className:"text-xs opacity-80 hidden lg:block mt-1",children:O.description})]}),!L&&n.jsx(V.div,{className:"absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"})]},O.id)})})})}),n.jsx(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},className:"min-h-[600px]",children:T()},o)]})})})},py=Object.freeze(Object.defineProperty({__proto__:null,default:Ph},Symbol.toStringTag,{value:"Module"})),xy=q`
  query GetUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      firstName
      lastName
      attrs
    }
  }
`,gy=()=>{const{userId:i}=Nh(),o=ir(),c=i?parseInt(i,10):null,{data:u,loading:m,error:f}=er(xy,{variables:{userId:c},skip:!c});if(!o)return n.jsx(mn,{to:"/login",replace:!0});if(!i||isNaN(Number(i)))return n.jsx(mn,{to:"/dashboard",replace:!0});if(m)return n.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 flex items-center justify-center p-4",children:n.jsx("div",{className:"w-full max-w-md mx-auto",children:n.jsx(hn,{size:"lg"})})});const p=u?.user?.[0];return f||!p?n.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900",children:n.jsxs("div",{className:"container-responsive container-section",children:[n.jsx("div",{className:"mb-6 sm:mb-8",children:n.jsxs(un,{to:"/dashboard",className:"inline-flex items-center text-white/70 hover:text-white transition-colors",children:[n.jsx(Mc,{className:"w-4 h-4 sm:w-5 sm:h-5 mr-2"}),n.jsx("span",{className:"text-sm sm:text-base",children:"Back to Dashboard"})]})}),n.jsxs("div",{className:"text-center py-12 sm:py-16",children:[n.jsx("div",{className:"w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6",children:n.jsx(hl,{className:"w-10 h-10 sm:w-12 sm:h-12 text-white/40"})}),n.jsx("h1",{className:"text-xl sm:text-2xl font-bold text-white mb-4",children:"User Profile Not Found"}),n.jsx("p",{className:"text-white/60 mb-6 sm:mb-8 text-sm sm:text-base px-4",children:f?f.message:"The requested user profile could not be loaded."}),n.jsx(un,{to:"/dashboard",className:"inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm sm:text-base",children:"Return to Dashboard"})]})]})}):n.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900",children:n.jsxs("div",{className:"container-responsive container-section",children:[n.jsx(V.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"mb-6 sm:mb-8",children:n.jsxs(un,{to:"/dashboard",className:"inline-flex items-center text-white/70 hover:text-white transition-colors mb-4",children:[n.jsx(Mc,{className:"w-4 h-4 sm:w-5 sm:h-5 mr-2"}),n.jsx("span",{className:"text-sm sm:text-base",children:"Back to Dashboard"})]})}),n.jsx(j.Suspense,{fallback:n.jsx("div",{className:"flex items-center justify-center min-h-[50vh]",children:n.jsx(hn,{size:"lg"})}),children:n.jsx(Ph,{user:p})})]})})},vy=()=>n.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 flex items-center justify-center p-4 sm:p-6 lg:p-8",children:n.jsxs("div",{className:"text-center max-w-sm sm:max-w-md mx-auto",children:[n.jsxs(V.div,{initial:{opacity:0,scale:.5},animate:{opacity:1,scale:1},transition:{duration:.5,type:"spring",stiffness:200},className:"mb-6 sm:mb-8",children:[n.jsx("div",{className:"text-6xl sm:text-7xl lg:text-8xl font-bold text-primary-500 mb-4",children:"404"}),n.jsx("div",{className:"w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6",children:n.jsx(hh,{className:"w-10 h-10 sm:w-12 sm:h-12 text-white/40"})})]}),n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},children:[n.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-white mb-4",children:"Page Not Found"}),n.jsx("p",{className:"text-white/70 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-2",children:"The page you're looking for doesn't exist or has been moved. Let's get you back on track."}),n.jsxs("div",{className:"space-y-3 sm:space-y-4",children:[n.jsxs(un,{to:"/dashboard",className:"inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors w-full justify-center text-sm sm:text-base",children:[n.jsx(ph,{className:"w-4 h-4 sm:w-5 sm:h-5 mr-2"}),"Go to Dashboard"]}),n.jsxs("button",{onClick:()=>window.history.back(),className:"inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors w-full justify-center text-sm sm:text-base",children:[n.jsx(Mc,{className:"w-4 h-4 sm:w-5 sm:h-5 mr-2"}),"Go Back"]})]})]}),n.jsx(V.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.4},className:"mt-8 sm:mt-12",children:n.jsx("p",{className:"text-white/50 text-xs sm:text-sm",children:"Reboot01 Student Dashboard"})})]})});class by extends j.Component{constructor(o){super(o),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(o){return{hasError:!0,error:o,errorInfo:null}}componentDidCatch(o,c){this.setState({error:o,errorInfo:c}),this.props.onError&&this.props.onError(o,c)}handleRetry=()=>{this.setState({hasError:!1,error:null,errorInfo:null})};handleGoHome=()=>{window.location.href="/"};render(){return this.state.hasError?this.props.fallback?this.props.fallback:n.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 flex items-center justify-center p-4",children:n.jsxs(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center",children:[n.jsx(V.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6",children:n.jsx(Dc,{className:"w-8 h-8 text-red-400"})}),n.jsx("h1",{className:"text-2xl font-bold text-white mb-4",children:"Oops! Something went wrong"}),n.jsx("p",{className:"text-white/70 mb-6",children:"We encountered an unexpected error. This has been logged and we'll look into it."}),!1,n.jsxs("div",{className:"flex flex-col sm:flex-row gap-3",children:[n.jsxs(V.button,{onClick:this.handleRetry,whileHover:{scale:1.02},whileTap:{scale:.98},className:"flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center",children:[n.jsx(Cx,{className:"w-4 h-4 mr-2"}),"Try Again"]}),n.jsxs(V.button,{onClick:this.handleGoHome,whileHover:{scale:1.02},whileTap:{scale:.98},className:"flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center border border-white/20",children:[n.jsx(ph,{className:"w-4 h-4 mr-2"}),"Go Home"]})]})]})}):this.props.children}}const yy=()=>{const i=ir(),o=Ih(),c=Vh(),[u,m]=ot.useState(!0);return j.useEffect(()=>{(async()=>{c(!0);try{const p=Tv();if(p.user&&p.token)if(p.user.login)o(p.user,p.token);else if(p.user.id&&!p.token.startsWith("mock-dev-token"))try{const x=await zh(p.user.id,p.token);o(x,p.token)}catch{localStorage.clear()}else p.token.startsWith("mock-dev-token")&&o(p.user,p.token)}catch{}finally{c(!1),m(!1)}})()},[o,c]),u?n.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden",children:[n.jsxs("div",{className:"absolute inset-0 opacity-30",children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"}),n.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)",backgroundSize:"80px 80px",animation:"float 20s ease-in-out infinite"}})]}),n.jsx("div",{className:"w-full max-w-md mx-auto relative z-10",children:n.jsxs("div",{className:"text-center space-y-8",children:[n.jsx("div",{className:"inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-8 animate-pulse",children:n.jsx("div",{className:"w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"})}),n.jsxs("div",{className:"space-y-2",children:[n.jsx("h1",{className:"text-4xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent",children:"Student Dashboard"}),n.jsx("p",{className:"text-xl text-white/70",children:"Initializing your learning journey..."})]}),n.jsxs("div",{className:"relative",children:[n.jsx(hn,{size:"lg"}),n.jsx("div",{className:"mt-4 text-white/50 text-sm animate-pulse",children:"Loading your data securely"})]})]})}),n.jsx("style",{children:`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `})]}):n.jsx(Fg,{children:n.jsxs(Rg,{children:[n.jsx(rt,{path:"/",element:i?n.jsx(mn,{to:"/dashboard",replace:!0}):n.jsx(mn,{to:"/login",replace:!0})}),n.jsx(rt,{path:"/login",element:n.jsx(Lb,{})}),n.jsx(rt,{path:"/dashboard",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/dashboard/groups",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/dashboard/events",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/dashboard/piscines",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/dashboard/piscines/:piscineType",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/dashboard/checkpoints",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/dashboard/leaderboard",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/dashboard/subjects",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/dashboard/export",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/dashboard/audits",element:n.jsx(Qt,{})}),n.jsx(rt,{path:"/profile/:userId",element:n.jsx(gy,{})}),n.jsx(rt,{path:"*",element:n.jsx(vy,{})})]})})},jy=()=>n.jsx(by,{children:n.jsx(uh,{client:Lh,children:n.jsx(kb,{defaultTheme:"dark",storageKey:"app-theme",children:n.jsx(Gb,{defaultAutoRefreshInterval:6e4,enableNetworkDetection:!0,showRefreshNotifications:!0,children:n.jsx(eb,{children:n.jsx(yy,{})})})})})});Bx.createRoot(document.getElementById("root")).render(n.jsx(ot.StrictMode,{children:n.jsx(uh,{client:Lh,children:n.jsx(jy,{})})}));export{ry as A,oy as G,hn as L,zb as R,Ry as a,on as b,Cy as c,Oy as d,ey as e,_e as f,My as g,Ty as h,Uy as i,Dy as j,Ey as k,_y as u};
