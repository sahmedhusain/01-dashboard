import{r as W,j as i,m as k,R as Wt}from"./animation-vendor-Ixux-_Rc.js";import{r as xm,a as ym}from"./react-vendor-DJG_os-6.js";import{A as Ac,_ as pm,O as Md,g as vm,P as bm,a as jm,I as Sm,c as Am,b as Nm,f as _m,d as le,u as Pt,e as li,h as Tm}from"./apollo-vendor-D9MnWLwe.js";import{L as Td,M as Rd,U as ei,a as Em,E as wm,b as Dm,c as zm,C as qd,d as ni,T as Gn,A as Om,e as Cd,S as At,f as vc,F as Bn,g as Gd,h as Bd,i as Nc,j as Xd,k as Um,l as Mm,m as Rm,n as bc,o as qm,G as Cm,D as Gm,p as Bm,q as Ed,X as Xm,r as Hm,s as Lm,R as Qm,H as Ym}from"./ui-vendor-DiO1C7IC.js";(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))o(m);new MutationObserver(m=>{for(const S of m)if(S.type==="childList")for(const p of S.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function d(m){const S={};return m.integrity&&(S.integrity=m.integrity),m.referrerPolicy&&(S.referrerPolicy=m.referrerPolicy),m.crossOrigin==="use-credentials"?S.credentials="include":m.crossOrigin==="anonymous"?S.credentials="omit":S.credentials="same-origin",S}function o(m){if(m.ep)return;m.ep=!0;const S=d(m);fetch(m.href,S)}})();var xc={exports:{}},Rn={},yc={exports:{}},pc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wd;function Zm(){return wd||(wd=1,function(c){function f(U,H){var V=U.length;U.push(H);e:for(;0<V;){var de=V-1>>>1,re=U[de];if(0<m(re,H))U[de]=H,U[V]=re,V=de;else break e}}function d(U){return U.length===0?null:U[0]}function o(U){if(U.length===0)return null;var H=U[0],V=U.pop();if(V!==H){U[0]=V;e:for(var de=0,re=U.length,Xe=re>>>1;de<Xe;){var pe=2*(de+1)-1,ce=U[pe],De=pe+1,ht=U[De];if(0>m(ce,V))De<re&&0>m(ht,ce)?(U[de]=ht,U[De]=V,de=De):(U[de]=ce,U[pe]=V,de=pe);else if(De<re&&0>m(ht,V))U[de]=ht,U[De]=V,de=De;else break e}}return H}function m(U,H){var V=U.sortIndex-H.sortIndex;return V!==0?V:U.id-H.id}if(c.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var S=performance;c.unstable_now=function(){return S.now()}}else{var p=Date,j=p.now();c.unstable_now=function(){return p.now()-j}}var D=[],z=[],R=1,T=null,v=3,x=!1,E=!1,w=!1,C=!1,B=typeof setTimeout=="function"?setTimeout:null,X=typeof clearTimeout=="function"?clearTimeout:null,te=typeof setImmediate<"u"?setImmediate:null;function ne(U){for(var H=d(z);H!==null;){if(H.callback===null)o(z);else if(H.startTime<=U)o(z),H.sortIndex=H.expirationTime,f(D,H);else break;H=d(z)}}function je(U){if(w=!1,ne(U),!E)if(d(D)!==null)E=!0,we||(we=!0,Ze());else{var H=d(z);H!==null&&dt(je,H.startTime-U)}}var we=!1,Ye=-1,J=5,se=-1;function Ne(){return C?!0:!(c.unstable_now()-se<J)}function ot(){if(C=!1,we){var U=c.unstable_now();se=U;var H=!0;try{e:{E=!1,w&&(w=!1,X(Ye),Ye=-1),x=!0;var V=v;try{t:{for(ne(U),T=d(D);T!==null&&!(T.expirationTime>U&&Ne());){var de=T.callback;if(typeof de=="function"){T.callback=null,v=T.priorityLevel;var re=de(T.expirationTime<=U);if(U=c.unstable_now(),typeof re=="function"){T.callback=re,ne(U),H=!0;break t}T===d(D)&&o(D),ne(U)}else o(D);T=d(D)}if(T!==null)H=!0;else{var Xe=d(z);Xe!==null&&dt(je,Xe.startTime-U),H=!1}}break e}finally{T=null,v=V,x=!1}H=void 0}}finally{H?Ze():we=!1}}}var Ze;if(typeof te=="function")Ze=function(){te(ot)};else if(typeof MessageChannel<"u"){var $a=new MessageChannel,_a=$a.port2;$a.port1.onmessage=ot,Ze=function(){_a.postMessage(null)}}else Ze=function(){B(ot,0)};function dt(U,H){Ye=B(function(){U(c.unstable_now())},H)}c.unstable_IdlePriority=5,c.unstable_ImmediatePriority=1,c.unstable_LowPriority=4,c.unstable_NormalPriority=3,c.unstable_Profiling=null,c.unstable_UserBlockingPriority=2,c.unstable_cancelCallback=function(U){U.callback=null},c.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):J=0<U?Math.floor(1e3/U):5},c.unstable_getCurrentPriorityLevel=function(){return v},c.unstable_next=function(U){switch(v){case 1:case 2:case 3:var H=3;break;default:H=v}var V=v;v=H;try{return U()}finally{v=V}},c.unstable_requestPaint=function(){C=!0},c.unstable_runWithPriority=function(U,H){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var V=v;v=U;try{return H()}finally{v=V}},c.unstable_scheduleCallback=function(U,H,V){var de=c.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?de+V:de):V=de,U){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=V+re,U={id:R++,callback:H,priorityLevel:U,startTime:V,expirationTime:re,sortIndex:-1},V>de?(U.sortIndex=V,f(z,U),d(D)===null&&U===d(z)&&(w?(X(Ye),Ye=-1):w=!0,dt(je,V-de))):(U.sortIndex=re,f(D,U),E||x||(E=!0,we||(we=!0,Ze()))),U},c.unstable_shouldYield=Ne,c.unstable_wrapCallback=function(U){var H=v;return function(){var V=v;v=H;try{return U.apply(this,arguments)}finally{v=V}}}}(pc)),pc}var Dd;function $m(){return Dd||(Dd=1,yc.exports=Zm()),yc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zd;function Vm(){if(zd)return Rn;zd=1;var c=$m(),f=xm(),d=ym();function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function m(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function S(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function p(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function j(e){if(S(e)!==e)throw Error(o(188))}function D(e){var t=e.alternate;if(!t){if(t=S(e),t===null)throw Error(o(188));return t!==e?null:e}for(var a=e,l=t;;){var n=a.return;if(n===null)break;var s=n.alternate;if(s===null){if(l=n.return,l!==null){a=l;continue}break}if(n.child===s.child){for(s=n.child;s;){if(s===a)return j(n),e;if(s===l)return j(n),t;s=s.sibling}throw Error(o(188))}if(a.return!==l.return)a=n,l=s;else{for(var u=!1,r=n.child;r;){if(r===a){u=!0,a=n,l=s;break}if(r===l){u=!0,l=n,a=s;break}r=r.sibling}if(!u){for(r=s.child;r;){if(r===a){u=!0,a=s,l=n;break}if(r===l){u=!0,l=s,a=n;break}r=r.sibling}if(!u)throw Error(o(189))}}if(a.alternate!==l)throw Error(o(190))}if(a.tag!==3)throw Error(o(188));return a.stateNode.current===a?e:t}function z(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=z(e),t!==null)return t;e=e.sibling}return null}var R=Object.assign,T=Symbol.for("react.element"),v=Symbol.for("react.transitional.element"),x=Symbol.for("react.portal"),E=Symbol.for("react.fragment"),w=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),B=Symbol.for("react.provider"),X=Symbol.for("react.consumer"),te=Symbol.for("react.context"),ne=Symbol.for("react.forward_ref"),je=Symbol.for("react.suspense"),we=Symbol.for("react.suspense_list"),Ye=Symbol.for("react.memo"),J=Symbol.for("react.lazy"),se=Symbol.for("react.activity"),Ne=Symbol.for("react.memo_cache_sentinel"),ot=Symbol.iterator;function Ze(e){return e===null||typeof e!="object"?null:(e=ot&&e[ot]||e["@@iterator"],typeof e=="function"?e:null)}var $a=Symbol.for("react.client.reference");function _a(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===$a?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case E:return"Fragment";case C:return"Profiler";case w:return"StrictMode";case je:return"Suspense";case we:return"SuspenseList";case se:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case x:return"Portal";case te:return(e.displayName||"Context")+".Provider";case X:return(e._context.displayName||"Context")+".Consumer";case ne:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ye:return t=e.displayName||null,t!==null?t:_a(e.type)||"Memo";case J:t=e._payload,e=e._init;try{return _a(e(t))}catch{}}return null}var dt=Array.isArray,U=f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V={pending:!1,data:null,method:null,action:null},de=[],re=-1;function Xe(e){return{current:e}}function pe(e){0>re||(e.current=de[re],de[re]=null,re--)}function ce(e,t){re++,de[re]=e.current,e.current=t}var De=Xe(null),ht=Xe(null),Et=Xe(null),Va=Xe(null);function Ka(e,t){switch(ce(Et,t),ce(ht,e),ce(De,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?ed(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=ed(t),e=td(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}pe(De),ce(De,e)}function wt(){pe(De),pe(ht),pe(Et)}function Ft(e){e.memoizedState!==null&&ce(Va,e);var t=De.current,a=td(t,e.type);t!==a&&(ce(ht,e),ce(De,a))}function ka(e){ht.current===e&&(pe(De),pe(ht)),Va.current===e&&(pe(Va),Dn._currentValue=V)}var Q=Object.prototype.hasOwnProperty,_e=c.unstable_scheduleCallback,Ja=c.unstable_cancelCallback,ql=c.unstable_shouldYield,Jd=c.unstable_requestPaint,Dt=c.unstable_now,Id=c.unstable_getCurrentPriorityLevel,Uc=c.unstable_ImmediatePriority,Mc=c.unstable_UserBlockingPriority,Xn=c.unstable_NormalPriority,Wd=c.unstable_LowPriority,Rc=c.unstable_IdlePriority,Pd=c.log,Fd=c.unstable_setDisableYieldValue,Cl=null,tt=null;function ea(e){if(typeof Pd=="function"&&Fd(e),tt&&typeof tt.setStrictMode=="function")try{tt.setStrictMode(Cl,e)}catch{}}var at=Math.clz32?Math.clz32:ah,eh=Math.log,th=Math.LN2;function ah(e){return e>>>=0,e===0?32:31-(eh(e)/th|0)|0}var Hn=256,Ln=4194304;function Ta(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Qn(e,t,a){var l=e.pendingLanes;if(l===0)return 0;var n=0,s=e.suspendedLanes,u=e.pingedLanes;e=e.warmLanes;var r=l&134217727;return r!==0?(l=r&~s,l!==0?n=Ta(l):(u&=r,u!==0?n=Ta(u):a||(a=r&~e,a!==0&&(n=Ta(a))))):(r=l&~s,r!==0?n=Ta(r):u!==0?n=Ta(u):a||(a=l&~e,a!==0&&(n=Ta(a)))),n===0?0:t!==0&&t!==n&&(t&s)===0&&(s=n&-n,a=t&-t,s>=a||s===32&&(a&4194048)!==0)?t:n}function Gl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function lh(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function qc(){var e=Hn;return Hn<<=1,(Hn&4194048)===0&&(Hn=256),e}function Cc(){var e=Ln;return Ln<<=1,(Ln&62914560)===0&&(Ln=4194304),e}function si(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Bl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function nh(e,t,a,l,n,s){var u=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var r=e.entanglements,h=e.expirationTimes,A=e.hiddenUpdates;for(a=u&~a;0<a;){var O=31-at(a),q=1<<O;r[O]=0,h[O]=-1;var N=A[O];if(N!==null)for(A[O]=null,O=0;O<N.length;O++){var _=N[O];_!==null&&(_.lane&=-536870913)}a&=~q}l!==0&&Gc(e,l,0),s!==0&&n===0&&e.tag!==0&&(e.suspendedLanes|=s&~(u&~t))}function Gc(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-at(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|a&4194090}function Bc(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var l=31-at(a),n=1<<l;n&t|e[l]&t&&(e[l]|=t),a&=~n}}function ii(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ui(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Xc(){var e=H.p;return e!==0?e:(e=window.event,e===void 0?32:bd(e.type))}function sh(e,t){var a=H.p;try{return H.p=e,t()}finally{H.p=a}}var ta=Math.random().toString(36).slice(2),$e="__reactFiber$"+ta,ke="__reactProps$"+ta,Ia="__reactContainer$"+ta,ci="__reactEvents$"+ta,ih="__reactListeners$"+ta,uh="__reactHandles$"+ta,Hc="__reactResources$"+ta,Xl="__reactMarker$"+ta;function ri(e){delete e[$e],delete e[ke],delete e[ci],delete e[ih],delete e[uh]}function Wa(e){var t=e[$e];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Ia]||a[$e]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=sd(e);e!==null;){if(a=e[$e])return a;e=sd(e)}return t}e=a,a=e.parentNode}return null}function Pa(e){if(e=e[$e]||e[Ia]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function Hl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(o(33))}function Fa(e){var t=e[Hc];return t||(t=e[Hc]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function qe(e){e[Xl]=!0}var Lc=new Set,Qc={};function Ea(e,t){el(e,t),el(e+"Capture",t)}function el(e,t){for(Qc[e]=t,e=0;e<t.length;e++)Lc.add(t[e])}var ch=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Yc={},Zc={};function rh(e){return Q.call(Zc,e)?!0:Q.call(Yc,e)?!1:ch.test(e)?Zc[e]=!0:(Yc[e]=!0,!1)}function Yn(e,t,a){if(rh(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Zn(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Ct(e,t,a,l){if(l===null)e.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+l)}}var fi,$c;function tl(e){if(fi===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);fi=t&&t[1]||"",$c=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+fi+e+$c}var oi=!1;function di(e,t){if(!e||oi)return"";oi=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var q=function(){throw Error()};if(Object.defineProperty(q.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(q,[])}catch(_){var N=_}Reflect.construct(e,[],q)}else{try{q.call()}catch(_){N=_}e.call(q.prototype)}}else{try{throw Error()}catch(_){N=_}(q=e())&&typeof q.catch=="function"&&q.catch(function(){})}}catch(_){if(_&&N&&typeof _.stack=="string")return[_.stack,N.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=l.DetermineComponentFrameRoot(),u=s[0],r=s[1];if(u&&r){var h=u.split(`
`),A=r.split(`
`);for(n=l=0;l<h.length&&!h[l].includes("DetermineComponentFrameRoot");)l++;for(;n<A.length&&!A[n].includes("DetermineComponentFrameRoot");)n++;if(l===h.length||n===A.length)for(l=h.length-1,n=A.length-1;1<=l&&0<=n&&h[l]!==A[n];)n--;for(;1<=l&&0<=n;l--,n--)if(h[l]!==A[n]){if(l!==1||n!==1)do if(l--,n--,0>n||h[l]!==A[n]){var O=`
`+h[l].replace(" at new "," at ");return e.displayName&&O.includes("<anonymous>")&&(O=O.replace("<anonymous>",e.displayName)),O}while(1<=l&&0<=n);break}}}finally{oi=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?tl(a):""}function fh(e){switch(e.tag){case 26:case 27:case 5:return tl(e.type);case 16:return tl("Lazy");case 13:return tl("Suspense");case 19:return tl("SuspenseList");case 0:case 15:return di(e.type,!1);case 11:return di(e.type.render,!1);case 1:return di(e.type,!0);case 31:return tl("Activity");default:return""}}function Vc(e){try{var t="";do t+=fh(e),e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function mt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Kc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function oh(e){var t=Kc(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),l=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var n=a.get,s=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return n.call(this)},set:function(u){l=""+u,s.call(this,u)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return l},setValue:function(u){l=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $n(e){e._valueTracker||(e._valueTracker=oh(e))}function kc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),l="";return e&&(l=Kc(e)?e.checked?"true":"false":e.value),e=l,e!==a?(t.setValue(e),!0):!1}function Vn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var dh=/[\n"\\]/g;function gt(e){return e.replace(dh,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function hi(e,t,a,l,n,s,u,r){e.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.type=u:e.removeAttribute("type"),t!=null?u==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+mt(t)):e.value!==""+mt(t)&&(e.value=""+mt(t)):u!=="submit"&&u!=="reset"||e.removeAttribute("value"),t!=null?mi(e,u,mt(t)):a!=null?mi(e,u,mt(a)):l!=null&&e.removeAttribute("value"),n==null&&s!=null&&(e.defaultChecked=!!s),n!=null&&(e.checked=n&&typeof n!="function"&&typeof n!="symbol"),r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.name=""+mt(r):e.removeAttribute("name")}function Jc(e,t,a,l,n,s,u,r){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||a!=null){if(!(s!=="submit"&&s!=="reset"||t!=null))return;a=a!=null?""+mt(a):"",t=t!=null?""+mt(t):a,r||t===e.value||(e.value=t),e.defaultValue=t}l=l??n,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=r?e.checked:!!l,e.defaultChecked=!!l,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.name=u)}function mi(e,t,a){t==="number"&&Vn(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function al(e,t,a,l){if(e=e.options,t){t={};for(var n=0;n<a.length;n++)t["$"+a[n]]=!0;for(a=0;a<e.length;a++)n=t.hasOwnProperty("$"+e[a].value),e[a].selected!==n&&(e[a].selected=n),n&&l&&(e[a].defaultSelected=!0)}else{for(a=""+mt(a),t=null,n=0;n<e.length;n++){if(e[n].value===a){e[n].selected=!0,l&&(e[n].defaultSelected=!0);return}t!==null||e[n].disabled||(t=e[n])}t!==null&&(t.selected=!0)}}function Ic(e,t,a){if(t!=null&&(t=""+mt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+mt(a):""}function Wc(e,t,a,l){if(t==null){if(l!=null){if(a!=null)throw Error(o(92));if(dt(l)){if(1<l.length)throw Error(o(93));l=l[0]}a=l}a==null&&(a=""),t=a}a=mt(t),e.defaultValue=a,l=e.textContent,l===a&&l!==""&&l!==null&&(e.value=l)}function ll(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var hh=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Pc(e,t,a){var l=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,a):typeof a!="number"||a===0||hh.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Fc(e,t,a){if(t!=null&&typeof t!="object")throw Error(o(62));if(e=e.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var n in t)l=t[n],t.hasOwnProperty(n)&&a[n]!==l&&Pc(e,n,l)}else for(var s in t)t.hasOwnProperty(s)&&Pc(e,s,t[s])}function gi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var mh=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),gh=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Kn(e){return gh.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var xi=null;function yi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var nl=null,sl=null;function er(e){var t=Pa(e);if(t&&(e=t.stateNode)){var a=e[ke]||null;e:switch(e=t.stateNode,t.type){case"input":if(hi(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+gt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var l=a[t];if(l!==e&&l.form===e.form){var n=l[ke]||null;if(!n)throw Error(o(90));hi(l,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<a.length;t++)l=a[t],l.form===e.form&&kc(l)}break e;case"textarea":Ic(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&al(e,!!a.multiple,t,!1)}}}var pi=!1;function tr(e,t,a){if(pi)return e(t,a);pi=!0;try{var l=e(t);return l}finally{if(pi=!1,(nl!==null||sl!==null)&&(Us(),nl&&(t=nl,e=sl,sl=nl=null,er(t),e)))for(t=0;t<e.length;t++)er(e[t])}}function Ll(e,t){var a=e.stateNode;if(a===null)return null;var l=a[ke]||null;if(l===null)return null;a=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(o(231,t,typeof a));return a}var Gt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),vi=!1;if(Gt)try{var Ql={};Object.defineProperty(Ql,"passive",{get:function(){vi=!0}}),window.addEventListener("test",Ql,Ql),window.removeEventListener("test",Ql,Ql)}catch{vi=!1}var aa=null,bi=null,kn=null;function ar(){if(kn)return kn;var e,t=bi,a=t.length,l,n="value"in aa?aa.value:aa.textContent,s=n.length;for(e=0;e<a&&t[e]===n[e];e++);var u=a-e;for(l=1;l<=u&&t[a-l]===n[s-l];l++);return kn=n.slice(e,1<l?1-l:void 0)}function Jn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function In(){return!0}function lr(){return!1}function Je(e){function t(a,l,n,s,u){this._reactName=a,this._targetInst=n,this.type=l,this.nativeEvent=s,this.target=u,this.currentTarget=null;for(var r in e)e.hasOwnProperty(r)&&(a=e[r],this[r]=a?a(s):s[r]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?In:lr,this.isPropagationStopped=lr,this}return R(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=In)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=In)},persist:function(){},isPersistent:In}),t}var wa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wn=Je(wa),Yl=R({},wa,{view:0,detail:0}),xh=Je(Yl),ji,Si,Zl,Pn=R({},Yl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ni,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Zl&&(Zl&&e.type==="mousemove"?(ji=e.screenX-Zl.screenX,Si=e.screenY-Zl.screenY):Si=ji=0,Zl=e),ji)},movementY:function(e){return"movementY"in e?e.movementY:Si}}),nr=Je(Pn),yh=R({},Pn,{dataTransfer:0}),ph=Je(yh),vh=R({},Yl,{relatedTarget:0}),Ai=Je(vh),bh=R({},wa,{animationName:0,elapsedTime:0,pseudoElement:0}),jh=Je(bh),Sh=R({},wa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ah=Je(Sh),Nh=R({},wa,{data:0}),sr=Je(Nh),_h={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Th={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Eh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function wh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Eh[e])?!!t[e]:!1}function Ni(){return wh}var Dh=R({},Yl,{key:function(e){if(e.key){var t=_h[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Jn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Th[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ni,charCode:function(e){return e.type==="keypress"?Jn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Jn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),zh=Je(Dh),Oh=R({},Pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ir=Je(Oh),Uh=R({},Yl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ni}),Mh=Je(Uh),Rh=R({},wa,{propertyName:0,elapsedTime:0,pseudoElement:0}),qh=Je(Rh),Ch=R({},Pn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Gh=Je(Ch),Bh=R({},wa,{newState:0,oldState:0}),Xh=Je(Bh),Hh=[9,13,27,32],_i=Gt&&"CompositionEvent"in window,$l=null;Gt&&"documentMode"in document&&($l=document.documentMode);var Lh=Gt&&"TextEvent"in window&&!$l,ur=Gt&&(!_i||$l&&8<$l&&11>=$l),cr=" ",rr=!1;function fr(e,t){switch(e){case"keyup":return Hh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function or(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var il=!1;function Qh(e,t){switch(e){case"compositionend":return or(t);case"keypress":return t.which!==32?null:(rr=!0,cr);case"textInput":return e=t.data,e===cr&&rr?null:e;default:return null}}function Yh(e,t){if(il)return e==="compositionend"||!_i&&fr(e,t)?(e=ar(),kn=bi=aa=null,il=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ur&&t.locale!=="ko"?null:t.data;default:return null}}var Zh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Zh[e.type]:t==="textarea"}function hr(e,t,a,l){nl?sl?sl.push(l):sl=[l]:nl=l,t=Bs(t,"onChange"),0<t.length&&(a=new Wn("onChange","change",null,a,l),e.push({event:a,listeners:t}))}var Vl=null,Kl=null;function $h(e){Jo(e,0)}function Fn(e){var t=Hl(e);if(kc(t))return e}function mr(e,t){if(e==="change")return t}var gr=!1;if(Gt){var Ti;if(Gt){var Ei="oninput"in document;if(!Ei){var xr=document.createElement("div");xr.setAttribute("oninput","return;"),Ei=typeof xr.oninput=="function"}Ti=Ei}else Ti=!1;gr=Ti&&(!document.documentMode||9<document.documentMode)}function yr(){Vl&&(Vl.detachEvent("onpropertychange",pr),Kl=Vl=null)}function pr(e){if(e.propertyName==="value"&&Fn(Kl)){var t=[];hr(t,Kl,e,yi(e)),tr($h,t)}}function Vh(e,t,a){e==="focusin"?(yr(),Vl=t,Kl=a,Vl.attachEvent("onpropertychange",pr)):e==="focusout"&&yr()}function Kh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Fn(Kl)}function kh(e,t){if(e==="click")return Fn(t)}function Jh(e,t){if(e==="input"||e==="change")return Fn(t)}function Ih(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var lt=typeof Object.is=="function"?Object.is:Ih;function kl(e,t){if(lt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),l=Object.keys(t);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var n=a[l];if(!Q.call(t,n)||!lt(e[n],t[n]))return!1}return!0}function vr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function br(e,t){var a=vr(e);e=0;for(var l;a;){if(a.nodeType===3){if(l=e+a.textContent.length,e<=t&&l>=t)return{node:a,offset:t-e};e=l}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=vr(a)}}function jr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?jr(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Sr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Vn(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Vn(e.document)}return t}function wi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Wh=Gt&&"documentMode"in document&&11>=document.documentMode,ul=null,Di=null,Jl=null,zi=!1;function Ar(e,t,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;zi||ul==null||ul!==Vn(l)||(l=ul,"selectionStart"in l&&wi(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Jl&&kl(Jl,l)||(Jl=l,l=Bs(Di,"onSelect"),0<l.length&&(t=new Wn("onSelect","select",null,t,a),e.push({event:t,listeners:l}),t.target=ul)))}function Da(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var cl={animationend:Da("Animation","AnimationEnd"),animationiteration:Da("Animation","AnimationIteration"),animationstart:Da("Animation","AnimationStart"),transitionrun:Da("Transition","TransitionRun"),transitionstart:Da("Transition","TransitionStart"),transitioncancel:Da("Transition","TransitionCancel"),transitionend:Da("Transition","TransitionEnd")},Oi={},Nr={};Gt&&(Nr=document.createElement("div").style,"AnimationEvent"in window||(delete cl.animationend.animation,delete cl.animationiteration.animation,delete cl.animationstart.animation),"TransitionEvent"in window||delete cl.transitionend.transition);function za(e){if(Oi[e])return Oi[e];if(!cl[e])return e;var t=cl[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Nr)return Oi[e]=t[a];return e}var _r=za("animationend"),Tr=za("animationiteration"),Er=za("animationstart"),Ph=za("transitionrun"),Fh=za("transitionstart"),e0=za("transitioncancel"),wr=za("transitionend"),Dr=new Map,Ui="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ui.push("scrollEnd");function Nt(e,t){Dr.set(e,t),Ea(t,[e])}var zr=new WeakMap;function xt(e,t){if(typeof e=="object"&&e!==null){var a=zr.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Vc(t)},zr.set(e,t),t)}return{value:e,source:t,stack:Vc(t)}}var yt=[],rl=0,Mi=0;function es(){for(var e=rl,t=Mi=rl=0;t<e;){var a=yt[t];yt[t++]=null;var l=yt[t];yt[t++]=null;var n=yt[t];yt[t++]=null;var s=yt[t];if(yt[t++]=null,l!==null&&n!==null){var u=l.pending;u===null?n.next=n:(n.next=u.next,u.next=n),l.pending=n}s!==0&&Or(a,n,s)}}function ts(e,t,a,l){yt[rl++]=e,yt[rl++]=t,yt[rl++]=a,yt[rl++]=l,Mi|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Ri(e,t,a,l){return ts(e,t,a,l),as(e)}function fl(e,t){return ts(e,null,null,t),as(e)}function Or(e,t,a){e.lanes|=a;var l=e.alternate;l!==null&&(l.lanes|=a);for(var n=!1,s=e.return;s!==null;)s.childLanes|=a,l=s.alternate,l!==null&&(l.childLanes|=a),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(n=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,n&&t!==null&&(n=31-at(a),e=s.hiddenUpdates,l=e[n],l===null?e[n]=[t]:l.push(t),t.lane=a|536870912),s):null}function as(e){if(50<jn)throw jn=0,Hu=null,Error(o(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ol={};function t0(e,t,a,l){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function nt(e,t,a,l){return new t0(e,t,a,l)}function qi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Bt(e,t){var a=e.alternate;return a===null?(a=nt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Ur(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ls(e,t,a,l,n,s){var u=0;if(l=e,typeof e=="function")qi(e)&&(u=1);else if(typeof e=="string")u=lm(e,a,De.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case se:return e=nt(31,a,t,n),e.elementType=se,e.lanes=s,e;case E:return Oa(a.children,n,s,t);case w:u=8,n|=24;break;case C:return e=nt(12,a,t,n|2),e.elementType=C,e.lanes=s,e;case je:return e=nt(13,a,t,n),e.elementType=je,e.lanes=s,e;case we:return e=nt(19,a,t,n),e.elementType=we,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case B:case te:u=10;break e;case X:u=9;break e;case ne:u=11;break e;case Ye:u=14;break e;case J:u=16,l=null;break e}u=29,a=Error(o(130,e===null?"null":typeof e,"")),l=null}return t=nt(u,a,t,n),t.elementType=e,t.type=l,t.lanes=s,t}function Oa(e,t,a,l){return e=nt(7,e,l,t),e.lanes=a,e}function Ci(e,t,a){return e=nt(6,e,null,t),e.lanes=a,e}function Gi(e,t,a){return t=nt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var dl=[],hl=0,ns=null,ss=0,pt=[],vt=0,Ua=null,Xt=1,Ht="";function Ma(e,t){dl[hl++]=ss,dl[hl++]=ns,ns=e,ss=t}function Mr(e,t,a){pt[vt++]=Xt,pt[vt++]=Ht,pt[vt++]=Ua,Ua=e;var l=Xt;e=Ht;var n=32-at(l)-1;l&=~(1<<n),a+=1;var s=32-at(t)+n;if(30<s){var u=n-n%5;s=(l&(1<<u)-1).toString(32),l>>=u,n-=u,Xt=1<<32-at(t)+n|a<<n|l,Ht=s+e}else Xt=1<<s|a<<n|l,Ht=e}function Bi(e){e.return!==null&&(Ma(e,1),Mr(e,1,0))}function Xi(e){for(;e===ns;)ns=dl[--hl],dl[hl]=null,ss=dl[--hl],dl[hl]=null;for(;e===Ua;)Ua=pt[--vt],pt[vt]=null,Ht=pt[--vt],pt[vt]=null,Xt=pt[--vt],pt[vt]=null}var Ke=null,Se=null,ue=!1,Ra=null,zt=!1,Hi=Error(o(519));function qa(e){var t=Error(o(418,""));throw Pl(xt(t,e)),Hi}function Rr(e){var t=e.stateNode,a=e.type,l=e.memoizedProps;switch(t[$e]=e,t[ke]=l,a){case"dialog":ee("cancel",t),ee("close",t);break;case"iframe":case"object":case"embed":ee("load",t);break;case"video":case"audio":for(a=0;a<An.length;a++)ee(An[a],t);break;case"source":ee("error",t);break;case"img":case"image":case"link":ee("error",t),ee("load",t);break;case"details":ee("toggle",t);break;case"input":ee("invalid",t),Jc(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0),$n(t);break;case"select":ee("invalid",t);break;case"textarea":ee("invalid",t),Wc(t,l.value,l.defaultValue,l.children),$n(t)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||l.suppressHydrationWarning===!0||Fo(t.textContent,a)?(l.popover!=null&&(ee("beforetoggle",t),ee("toggle",t)),l.onScroll!=null&&ee("scroll",t),l.onScrollEnd!=null&&ee("scrollend",t),l.onClick!=null&&(t.onclick=Xs),t=!0):t=!1,t||qa(e)}function qr(e){for(Ke=e.return;Ke;)switch(Ke.tag){case 5:case 13:zt=!1;return;case 27:case 3:zt=!0;return;default:Ke=Ke.return}}function Il(e){if(e!==Ke)return!1;if(!ue)return qr(e),ue=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||ac(e.type,e.memoizedProps)),a=!a),a&&Se&&qa(e),qr(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(t===0){Se=Tt(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++;e=e.nextSibling}Se=null}}else t===27?(t=Se,pa(e.type)?(e=ic,ic=null,Se=e):Se=t):Se=Ke?Tt(e.stateNode.nextSibling):null;return!0}function Wl(){Se=Ke=null,ue=!1}function Cr(){var e=Ra;return e!==null&&(Pe===null?Pe=e:Pe.push.apply(Pe,e),Ra=null),e}function Pl(e){Ra===null?Ra=[e]:Ra.push(e)}var Li=Xe(null),Ca=null,Lt=null;function la(e,t,a){ce(Li,t._currentValue),t._currentValue=a}function Qt(e){e._currentValue=Li.current,pe(Li)}function Qi(e,t,a){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===a)break;e=e.return}}function Yi(e,t,a,l){var n=e.child;for(n!==null&&(n.return=e);n!==null;){var s=n.dependencies;if(s!==null){var u=n.child;s=s.firstContext;e:for(;s!==null;){var r=s;s=n;for(var h=0;h<t.length;h++)if(r.context===t[h]){s.lanes|=a,r=s.alternate,r!==null&&(r.lanes|=a),Qi(s.return,a,e),l||(u=null);break e}s=r.next}}else if(n.tag===18){if(u=n.return,u===null)throw Error(o(341));u.lanes|=a,s=u.alternate,s!==null&&(s.lanes|=a),Qi(u,a,e),u=null}else u=n.child;if(u!==null)u.return=n;else for(u=n;u!==null;){if(u===e){u=null;break}if(n=u.sibling,n!==null){n.return=u.return,u=n;break}u=u.return}n=u}}function Fl(e,t,a,l){e=null;for(var n=t,s=!1;n!==null;){if(!s){if((n.flags&524288)!==0)s=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var u=n.alternate;if(u===null)throw Error(o(387));if(u=u.memoizedProps,u!==null){var r=n.type;lt(n.pendingProps.value,u.value)||(e!==null?e.push(r):e=[r])}}else if(n===Va.current){if(u=n.alternate,u===null)throw Error(o(387));u.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(e!==null?e.push(Dn):e=[Dn])}n=n.return}e!==null&&Yi(t,e,a,l),t.flags|=262144}function is(e){for(e=e.firstContext;e!==null;){if(!lt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ga(e){Ca=e,Lt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ve(e){return Gr(Ca,e)}function us(e,t){return Ca===null&&Ga(e),Gr(e,t)}function Gr(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Lt===null){if(e===null)throw Error(o(308));Lt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Lt=Lt.next=t;return a}var a0=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},l0=c.unstable_scheduleCallback,n0=c.unstable_NormalPriority,Me={$$typeof:te,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zi(){return{controller:new a0,data:new Map,refCount:0}}function en(e){e.refCount--,e.refCount===0&&l0(n0,function(){e.controller.abort()})}var tn=null,$i=0,ml=0,gl=null;function s0(e,t){if(tn===null){var a=tn=[];$i=0,ml=Ku(),gl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return $i++,t.then(Br,Br),t}function Br(){if(--$i===0&&tn!==null){gl!==null&&(gl.status="fulfilled");var e=tn;tn=null,ml=0,gl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function i0(e,t){var a=[],l={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var n=0;n<a.length;n++)(0,a[n])(t)},function(n){for(l.status="rejected",l.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),l}var Xr=U.S;U.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&s0(e,t),Xr!==null&&Xr(e,t)};var Ba=Xe(null);function Vi(){var e=Ba.current;return e!==null?e:ye.pooledCache}function cs(e,t){t===null?ce(Ba,Ba.current):ce(Ba,t.pool)}function Hr(){var e=Vi();return e===null?null:{parent:Me._currentValue,pool:e}}var an=Error(o(460)),Lr=Error(o(474)),rs=Error(o(542)),Ki={then:function(){}};function Qr(e){return e=e.status,e==="fulfilled"||e==="rejected"}function fs(){}function Yr(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(fs,fs),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,$r(e),e;default:if(typeof t.status=="string")t.then(fs,fs);else{if(e=ye,e!==null&&100<e.shellSuspendCounter)throw Error(o(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=l}},function(l){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,$r(e),e}throw ln=t,an}}var ln=null;function Zr(){if(ln===null)throw Error(o(459));var e=ln;return ln=null,e}function $r(e){if(e===an||e===rs)throw Error(o(483))}var na=!1;function ki(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ji(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function sa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ia(e,t,a){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(fe&2)!==0){var n=l.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),l.pending=t,t=as(e),Or(e,null,a),t}return ts(e,l,t,a),as(e)}function nn(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Bc(e,a)}}function Ii(e,t){var a=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var n=null,s=null;if(a=a.firstBaseUpdate,a!==null){do{var u={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};s===null?n=s=u:s=s.next=u,a=a.next}while(a!==null);s===null?n=s=t:s=s.next=t}else n=s=t;a={baseState:l.baseState,firstBaseUpdate:n,lastBaseUpdate:s,shared:l.shared,callbacks:l.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Wi=!1;function sn(){if(Wi){var e=gl;if(e!==null)throw e}}function un(e,t,a,l){Wi=!1;var n=e.updateQueue;na=!1;var s=n.firstBaseUpdate,u=n.lastBaseUpdate,r=n.shared.pending;if(r!==null){n.shared.pending=null;var h=r,A=h.next;h.next=null,u===null?s=A:u.next=A,u=h;var O=e.alternate;O!==null&&(O=O.updateQueue,r=O.lastBaseUpdate,r!==u&&(r===null?O.firstBaseUpdate=A:r.next=A,O.lastBaseUpdate=h))}if(s!==null){var q=n.baseState;u=0,O=A=h=null,r=s;do{var N=r.lane&-536870913,_=N!==r.lane;if(_?(ae&N)===N:(l&N)===N){N!==0&&N===ml&&(Wi=!0),O!==null&&(O=O.next={lane:0,tag:r.tag,payload:r.payload,callback:null,next:null});e:{var K=e,Z=r;N=t;var ge=a;switch(Z.tag){case 1:if(K=Z.payload,typeof K=="function"){q=K.call(ge,q,N);break e}q=K;break e;case 3:K.flags=K.flags&-65537|128;case 0:if(K=Z.payload,N=typeof K=="function"?K.call(ge,q,N):K,N==null)break e;q=R({},q,N);break e;case 2:na=!0}}N=r.callback,N!==null&&(e.flags|=64,_&&(e.flags|=8192),_=n.callbacks,_===null?n.callbacks=[N]:_.push(N))}else _={lane:N,tag:r.tag,payload:r.payload,callback:r.callback,next:null},O===null?(A=O=_,h=q):O=O.next=_,u|=N;if(r=r.next,r===null){if(r=n.shared.pending,r===null)break;_=r,r=_.next,_.next=null,n.lastBaseUpdate=_,n.shared.pending=null}}while(!0);O===null&&(h=q),n.baseState=h,n.firstBaseUpdate=A,n.lastBaseUpdate=O,s===null&&(n.shared.lanes=0),ma|=u,e.lanes=u,e.memoizedState=q}}function Vr(e,t){if(typeof e!="function")throw Error(o(191,e));e.call(t)}function Kr(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Vr(a[e],t)}var xl=Xe(null),os=Xe(0);function kr(e,t){e=Jt,ce(os,e),ce(xl,t),Jt=e|t.baseLanes}function Pi(){ce(os,Jt),ce(xl,xl.current)}function Fi(){Jt=os.current,pe(xl),pe(os)}var ua=0,I=null,he=null,ze=null,ds=!1,yl=!1,Xa=!1,hs=0,cn=0,pl=null,u0=0;function Te(){throw Error(o(321))}function eu(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!lt(e[a],t[a]))return!1;return!0}function tu(e,t,a,l,n,s){return ua=s,I=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,U.H=e===null||e.memoizedState===null?Uf:Mf,Xa=!1,s=a(l,n),Xa=!1,yl&&(s=Ir(t,a,l,n)),Jr(e),s}function Jr(e){U.H=vs;var t=he!==null&&he.next!==null;if(ua=0,ze=he=I=null,ds=!1,cn=0,pl=null,t)throw Error(o(300));e===null||Ce||(e=e.dependencies,e!==null&&is(e)&&(Ce=!0))}function Ir(e,t,a,l){I=e;var n=0;do{if(yl&&(pl=null),cn=0,yl=!1,25<=n)throw Error(o(301));if(n+=1,ze=he=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}U.H=m0,s=t(a,l)}while(yl);return s}function c0(){var e=U.H,t=e.useState()[0];return t=typeof t.then=="function"?rn(t):t,e=e.useState()[0],(he!==null?he.memoizedState:null)!==e&&(I.flags|=1024),t}function au(){var e=hs!==0;return hs=0,e}function lu(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function nu(e){if(ds){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ds=!1}ua=0,ze=he=I=null,yl=!1,cn=hs=0,pl=null}function Ie(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ze===null?I.memoizedState=ze=e:ze=ze.next=e,ze}function Oe(){if(he===null){var e=I.alternate;e=e!==null?e.memoizedState:null}else e=he.next;var t=ze===null?I.memoizedState:ze.next;if(t!==null)ze=t,he=e;else{if(e===null)throw I.alternate===null?Error(o(467)):Error(o(310));he=e,e={memoizedState:he.memoizedState,baseState:he.baseState,baseQueue:he.baseQueue,queue:he.queue,next:null},ze===null?I.memoizedState=ze=e:ze=ze.next=e}return ze}function su(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function rn(e){var t=cn;return cn+=1,pl===null&&(pl=[]),e=Yr(pl,e,t),t=I,(ze===null?t.memoizedState:ze.next)===null&&(t=t.alternate,U.H=t===null||t.memoizedState===null?Uf:Mf),e}function ms(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return rn(e);if(e.$$typeof===te)return Ve(e)}throw Error(o(438,String(e)))}function iu(e){var t=null,a=I.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var l=I.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=su(),I.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),l=0;l<e;l++)a[l]=Ne;return t.index++,a}function Yt(e,t){return typeof t=="function"?t(e):t}function gs(e){var t=Oe();return uu(t,he,e)}function uu(e,t,a){var l=e.queue;if(l===null)throw Error(o(311));l.lastRenderedReducer=a;var n=e.baseQueue,s=l.pending;if(s!==null){if(n!==null){var u=n.next;n.next=s.next,s.next=u}t.baseQueue=n=s,l.pending=null}if(s=e.baseState,n===null)e.memoizedState=s;else{t=n.next;var r=u=null,h=null,A=t,O=!1;do{var q=A.lane&-536870913;if(q!==A.lane?(ae&q)===q:(ua&q)===q){var N=A.revertLane;if(N===0)h!==null&&(h=h.next={lane:0,revertLane:0,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null}),q===ml&&(O=!0);else if((ua&N)===N){A=A.next,N===ml&&(O=!0);continue}else q={lane:0,revertLane:A.revertLane,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null},h===null?(r=h=q,u=s):h=h.next=q,I.lanes|=N,ma|=N;q=A.action,Xa&&a(s,q),s=A.hasEagerState?A.eagerState:a(s,q)}else N={lane:q,revertLane:A.revertLane,action:A.action,hasEagerState:A.hasEagerState,eagerState:A.eagerState,next:null},h===null?(r=h=N,u=s):h=h.next=N,I.lanes|=q,ma|=q;A=A.next}while(A!==null&&A!==t);if(h===null?u=s:h.next=r,!lt(s,e.memoizedState)&&(Ce=!0,O&&(a=gl,a!==null)))throw a;e.memoizedState=s,e.baseState=u,e.baseQueue=h,l.lastRenderedState=s}return n===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function cu(e){var t=Oe(),a=t.queue;if(a===null)throw Error(o(311));a.lastRenderedReducer=e;var l=a.dispatch,n=a.pending,s=t.memoizedState;if(n!==null){a.pending=null;var u=n=n.next;do s=e(s,u.action),u=u.next;while(u!==n);lt(s,t.memoizedState)||(Ce=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),a.lastRenderedState=s}return[s,l]}function Wr(e,t,a){var l=I,n=Oe(),s=ue;if(s){if(a===void 0)throw Error(o(407));a=a()}else a=t();var u=!lt((he||n).memoizedState,a);u&&(n.memoizedState=a,Ce=!0),n=n.queue;var r=ef.bind(null,l,n,e);if(fn(2048,8,r,[e]),n.getSnapshot!==t||u||ze!==null&&ze.memoizedState.tag&1){if(l.flags|=2048,vl(9,xs(),Fr.bind(null,l,n,a,t),null),ye===null)throw Error(o(349));s||(ua&124)!==0||Pr(l,t,a)}return a}function Pr(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=I.updateQueue,t===null?(t=su(),I.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Fr(e,t,a,l){t.value=a,t.getSnapshot=l,tf(t)&&af(e)}function ef(e,t,a){return a(function(){tf(t)&&af(e)})}function tf(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!lt(e,a)}catch{return!0}}function af(e){var t=fl(e,2);t!==null&&rt(t,e,2)}function ru(e){var t=Ie();if(typeof e=="function"){var a=e;if(e=a(),Xa){ea(!0);try{a()}finally{ea(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yt,lastRenderedState:e},t}function lf(e,t,a,l){return e.baseState=a,uu(e,he,typeof l=="function"?l:Yt)}function r0(e,t,a,l,n){if(ps(e))throw Error(o(485));if(e=t.action,e!==null){var s={payload:n,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){s.listeners.push(u)}};U.T!==null?a(!0):s.isTransition=!1,l(s),a=t.pending,a===null?(s.next=t.pending=s,nf(t,s)):(s.next=a.next,t.pending=a.next=s)}}function nf(e,t){var a=t.action,l=t.payload,n=e.state;if(t.isTransition){var s=U.T,u={};U.T=u;try{var r=a(n,l),h=U.S;h!==null&&h(u,r),sf(e,t,r)}catch(A){fu(e,t,A)}finally{U.T=s}}else try{s=a(n,l),sf(e,t,s)}catch(A){fu(e,t,A)}}function sf(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){uf(e,t,l)},function(l){return fu(e,t,l)}):uf(e,t,a)}function uf(e,t,a){t.status="fulfilled",t.value=a,cf(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,nf(e,a)))}function fu(e,t,a){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=a,cf(t),t=t.next;while(t!==l)}e.action=null}function cf(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function rf(e,t){return t}function ff(e,t){if(ue){var a=ye.formState;if(a!==null){e:{var l=I;if(ue){if(Se){t:{for(var n=Se,s=zt;n.nodeType!==8;){if(!s){n=null;break t}if(n=Tt(n.nextSibling),n===null){n=null;break t}}s=n.data,n=s==="F!"||s==="F"?n:null}if(n){Se=Tt(n.nextSibling),l=n.data==="F!";break e}}qa(l)}l=!1}l&&(t=a[0])}}return a=Ie(),a.memoizedState=a.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rf,lastRenderedState:t},a.queue=l,a=Df.bind(null,I,l),l.dispatch=a,l=ru(!1),s=gu.bind(null,I,!1,l.queue),l=Ie(),n={state:t,dispatch:null,action:e,pending:null},l.queue=n,a=r0.bind(null,I,n,s,a),n.dispatch=a,l.memoizedState=e,[t,a,!1]}function of(e){var t=Oe();return df(t,he,e)}function df(e,t,a){if(t=uu(e,t,rf)[0],e=gs(Yt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=rn(t)}catch(u){throw u===an?rs:u}else l=t;t=Oe();var n=t.queue,s=n.dispatch;return a!==t.memoizedState&&(I.flags|=2048,vl(9,xs(),f0.bind(null,n,a),null)),[l,s,e]}function f0(e,t){e.action=t}function hf(e){var t=Oe(),a=he;if(a!==null)return df(t,a,e);Oe(),t=t.memoizedState,a=Oe();var l=a.queue.dispatch;return a.memoizedState=e,[t,l,!1]}function vl(e,t,a,l){return e={tag:e,create:a,deps:l,inst:t,next:null},t=I.updateQueue,t===null&&(t=su(),I.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(l=a.next,a.next=e,e.next=l,t.lastEffect=e),e}function xs(){return{destroy:void 0,resource:void 0}}function mf(){return Oe().memoizedState}function ys(e,t,a,l){var n=Ie();l=l===void 0?null:l,I.flags|=e,n.memoizedState=vl(1|t,xs(),a,l)}function fn(e,t,a,l){var n=Oe();l=l===void 0?null:l;var s=n.memoizedState.inst;he!==null&&l!==null&&eu(l,he.memoizedState.deps)?n.memoizedState=vl(t,s,a,l):(I.flags|=e,n.memoizedState=vl(1|t,s,a,l))}function gf(e,t){ys(8390656,8,e,t)}function xf(e,t){fn(2048,8,e,t)}function yf(e,t){return fn(4,2,e,t)}function pf(e,t){return fn(4,4,e,t)}function vf(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function bf(e,t,a){a=a!=null?a.concat([e]):null,fn(4,4,vf.bind(null,t,e),a)}function ou(){}function jf(e,t){var a=Oe();t=t===void 0?null:t;var l=a.memoizedState;return t!==null&&eu(t,l[1])?l[0]:(a.memoizedState=[e,t],e)}function Sf(e,t){var a=Oe();t=t===void 0?null:t;var l=a.memoizedState;if(t!==null&&eu(t,l[1]))return l[0];if(l=e(),Xa){ea(!0);try{e()}finally{ea(!1)}}return a.memoizedState=[l,t],l}function du(e,t,a){return a===void 0||(ua&1073741824)!==0?e.memoizedState=t:(e.memoizedState=a,e=To(),I.lanes|=e,ma|=e,a)}function Af(e,t,a,l){return lt(a,t)?a:xl.current!==null?(e=du(e,a,l),lt(e,t)||(Ce=!0),e):(ua&42)===0?(Ce=!0,e.memoizedState=a):(e=To(),I.lanes|=e,ma|=e,t)}function Nf(e,t,a,l,n){var s=H.p;H.p=s!==0&&8>s?s:8;var u=U.T,r={};U.T=r,gu(e,!1,t,a);try{var h=n(),A=U.S;if(A!==null&&A(r,h),h!==null&&typeof h=="object"&&typeof h.then=="function"){var O=i0(h,l);on(e,t,O,ct(e))}else on(e,t,l,ct(e))}catch(q){on(e,t,{then:function(){},status:"rejected",reason:q},ct())}finally{H.p=s,U.T=u}}function o0(){}function hu(e,t,a,l){if(e.tag!==5)throw Error(o(476));var n=_f(e).queue;Nf(e,n,t,V,a===null?o0:function(){return Tf(e),a(l)})}function _f(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:V,baseState:V,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yt,lastRenderedState:V},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Tf(e){var t=_f(e).next.queue;on(e,t,{},ct())}function mu(){return Ve(Dn)}function Ef(){return Oe().memoizedState}function wf(){return Oe().memoizedState}function d0(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=ct();e=sa(a);var l=ia(t,e,a);l!==null&&(rt(l,t,a),nn(l,t,a)),t={cache:Zi()},e.payload=t;return}t=t.return}}function h0(e,t,a){var l=ct();a={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},ps(e)?zf(t,a):(a=Ri(e,t,a,l),a!==null&&(rt(a,e,l),Of(a,t,l)))}function Df(e,t,a){var l=ct();on(e,t,a,l)}function on(e,t,a,l){var n={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(ps(e))zf(t,n);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var u=t.lastRenderedState,r=s(u,a);if(n.hasEagerState=!0,n.eagerState=r,lt(r,u))return ts(e,t,n,0),ye===null&&es(),!1}catch{}finally{}if(a=Ri(e,t,n,l),a!==null)return rt(a,e,l),Of(a,t,l),!0}return!1}function gu(e,t,a,l){if(l={lane:2,revertLane:Ku(),action:l,hasEagerState:!1,eagerState:null,next:null},ps(e)){if(t)throw Error(o(479))}else t=Ri(e,a,l,2),t!==null&&rt(t,e,2)}function ps(e){var t=e.alternate;return e===I||t!==null&&t===I}function zf(e,t){yl=ds=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Of(e,t,a){if((a&4194048)!==0){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Bc(e,a)}}var vs={readContext:Ve,use:ms,useCallback:Te,useContext:Te,useEffect:Te,useImperativeHandle:Te,useLayoutEffect:Te,useInsertionEffect:Te,useMemo:Te,useReducer:Te,useRef:Te,useState:Te,useDebugValue:Te,useDeferredValue:Te,useTransition:Te,useSyncExternalStore:Te,useId:Te,useHostTransitionStatus:Te,useFormState:Te,useActionState:Te,useOptimistic:Te,useMemoCache:Te,useCacheRefresh:Te},Uf={readContext:Ve,use:ms,useCallback:function(e,t){return Ie().memoizedState=[e,t===void 0?null:t],e},useContext:Ve,useEffect:gf,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,ys(4194308,4,vf.bind(null,t,e),a)},useLayoutEffect:function(e,t){return ys(4194308,4,e,t)},useInsertionEffect:function(e,t){ys(4,2,e,t)},useMemo:function(e,t){var a=Ie();t=t===void 0?null:t;var l=e();if(Xa){ea(!0);try{e()}finally{ea(!1)}}return a.memoizedState=[l,t],l},useReducer:function(e,t,a){var l=Ie();if(a!==void 0){var n=a(t);if(Xa){ea(!0);try{a(t)}finally{ea(!1)}}}else n=t;return l.memoizedState=l.baseState=n,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},l.queue=e,e=e.dispatch=h0.bind(null,I,e),[l.memoizedState,e]},useRef:function(e){var t=Ie();return e={current:e},t.memoizedState=e},useState:function(e){e=ru(e);var t=e.queue,a=Df.bind(null,I,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:ou,useDeferredValue:function(e,t){var a=Ie();return du(a,e,t)},useTransition:function(){var e=ru(!1);return e=Nf.bind(null,I,e.queue,!0,!1),Ie().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var l=I,n=Ie();if(ue){if(a===void 0)throw Error(o(407));a=a()}else{if(a=t(),ye===null)throw Error(o(349));(ae&124)!==0||Pr(l,t,a)}n.memoizedState=a;var s={value:a,getSnapshot:t};return n.queue=s,gf(ef.bind(null,l,s,e),[e]),l.flags|=2048,vl(9,xs(),Fr.bind(null,l,s,a,t),null),a},useId:function(){var e=Ie(),t=ye.identifierPrefix;if(ue){var a=Ht,l=Xt;a=(l&~(1<<32-at(l)-1)).toString(32)+a,t="«"+t+"R"+a,a=hs++,0<a&&(t+="H"+a.toString(32)),t+="»"}else a=u0++,t="«"+t+"r"+a.toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:mu,useFormState:ff,useActionState:ff,useOptimistic:function(e){var t=Ie();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=gu.bind(null,I,!0,a),a.dispatch=t,[e,t]},useMemoCache:iu,useCacheRefresh:function(){return Ie().memoizedState=d0.bind(null,I)}},Mf={readContext:Ve,use:ms,useCallback:jf,useContext:Ve,useEffect:xf,useImperativeHandle:bf,useInsertionEffect:yf,useLayoutEffect:pf,useMemo:Sf,useReducer:gs,useRef:mf,useState:function(){return gs(Yt)},useDebugValue:ou,useDeferredValue:function(e,t){var a=Oe();return Af(a,he.memoizedState,e,t)},useTransition:function(){var e=gs(Yt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:rn(e),t]},useSyncExternalStore:Wr,useId:Ef,useHostTransitionStatus:mu,useFormState:of,useActionState:of,useOptimistic:function(e,t){var a=Oe();return lf(a,he,e,t)},useMemoCache:iu,useCacheRefresh:wf},m0={readContext:Ve,use:ms,useCallback:jf,useContext:Ve,useEffect:xf,useImperativeHandle:bf,useInsertionEffect:yf,useLayoutEffect:pf,useMemo:Sf,useReducer:cu,useRef:mf,useState:function(){return cu(Yt)},useDebugValue:ou,useDeferredValue:function(e,t){var a=Oe();return he===null?du(a,e,t):Af(a,he.memoizedState,e,t)},useTransition:function(){var e=cu(Yt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:rn(e),t]},useSyncExternalStore:Wr,useId:Ef,useHostTransitionStatus:mu,useFormState:hf,useActionState:hf,useOptimistic:function(e,t){var a=Oe();return he!==null?lf(a,he,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:iu,useCacheRefresh:wf},bl=null,dn=0;function bs(e){var t=dn;return dn+=1,bl===null&&(bl=[]),Yr(bl,e,t)}function hn(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function js(e,t){throw t.$$typeof===T?Error(o(525)):(e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Rf(e){var t=e._init;return t(e._payload)}function qf(e){function t(y,g){if(e){var b=y.deletions;b===null?(y.deletions=[g],y.flags|=16):b.push(g)}}function a(y,g){if(!e)return null;for(;g!==null;)t(y,g),g=g.sibling;return null}function l(y){for(var g=new Map;y!==null;)y.key!==null?g.set(y.key,y):g.set(y.index,y),y=y.sibling;return g}function n(y,g){return y=Bt(y,g),y.index=0,y.sibling=null,y}function s(y,g,b){return y.index=b,e?(b=y.alternate,b!==null?(b=b.index,b<g?(y.flags|=67108866,g):b):(y.flags|=67108866,g)):(y.flags|=1048576,g)}function u(y){return e&&y.alternate===null&&(y.flags|=67108866),y}function r(y,g,b,M){return g===null||g.tag!==6?(g=Ci(b,y.mode,M),g.return=y,g):(g=n(g,b),g.return=y,g)}function h(y,g,b,M){var L=b.type;return L===E?O(y,g,b.props.children,M,b.key):g!==null&&(g.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===J&&Rf(L)===g.type)?(g=n(g,b.props),hn(g,b),g.return=y,g):(g=ls(b.type,b.key,b.props,null,y.mode,M),hn(g,b),g.return=y,g)}function A(y,g,b,M){return g===null||g.tag!==4||g.stateNode.containerInfo!==b.containerInfo||g.stateNode.implementation!==b.implementation?(g=Gi(b,y.mode,M),g.return=y,g):(g=n(g,b.children||[]),g.return=y,g)}function O(y,g,b,M,L){return g===null||g.tag!==7?(g=Oa(b,y.mode,M,L),g.return=y,g):(g=n(g,b),g.return=y,g)}function q(y,g,b){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=Ci(""+g,y.mode,b),g.return=y,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case v:return b=ls(g.type,g.key,g.props,null,y.mode,b),hn(b,g),b.return=y,b;case x:return g=Gi(g,y.mode,b),g.return=y,g;case J:var M=g._init;return g=M(g._payload),q(y,g,b)}if(dt(g)||Ze(g))return g=Oa(g,y.mode,b,null),g.return=y,g;if(typeof g.then=="function")return q(y,bs(g),b);if(g.$$typeof===te)return q(y,us(y,g),b);js(y,g)}return null}function N(y,g,b,M){var L=g!==null?g.key:null;if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return L!==null?null:r(y,g,""+b,M);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case v:return b.key===L?h(y,g,b,M):null;case x:return b.key===L?A(y,g,b,M):null;case J:return L=b._init,b=L(b._payload),N(y,g,b,M)}if(dt(b)||Ze(b))return L!==null?null:O(y,g,b,M,null);if(typeof b.then=="function")return N(y,g,bs(b),M);if(b.$$typeof===te)return N(y,g,us(y,b),M);js(y,b)}return null}function _(y,g,b,M,L){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return y=y.get(b)||null,r(g,y,""+M,L);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case v:return y=y.get(M.key===null?b:M.key)||null,h(g,y,M,L);case x:return y=y.get(M.key===null?b:M.key)||null,A(g,y,M,L);case J:var P=M._init;return M=P(M._payload),_(y,g,b,M,L)}if(dt(M)||Ze(M))return y=y.get(b)||null,O(g,y,M,L,null);if(typeof M.then=="function")return _(y,g,b,bs(M),L);if(M.$$typeof===te)return _(y,g,b,us(g,M),L);js(g,M)}return null}function K(y,g,b,M){for(var L=null,P=null,Y=g,$=g=0,Be=null;Y!==null&&$<b.length;$++){Y.index>$?(Be=Y,Y=null):Be=Y.sibling;var ie=N(y,Y,b[$],M);if(ie===null){Y===null&&(Y=Be);break}e&&Y&&ie.alternate===null&&t(y,Y),g=s(ie,g,$),P===null?L=ie:P.sibling=ie,P=ie,Y=Be}if($===b.length)return a(y,Y),ue&&Ma(y,$),L;if(Y===null){for(;$<b.length;$++)Y=q(y,b[$],M),Y!==null&&(g=s(Y,g,$),P===null?L=Y:P.sibling=Y,P=Y);return ue&&Ma(y,$),L}for(Y=l(Y);$<b.length;$++)Be=_(Y,y,$,b[$],M),Be!==null&&(e&&Be.alternate!==null&&Y.delete(Be.key===null?$:Be.key),g=s(Be,g,$),P===null?L=Be:P.sibling=Be,P=Be);return e&&Y.forEach(function(Aa){return t(y,Aa)}),ue&&Ma(y,$),L}function Z(y,g,b,M){if(b==null)throw Error(o(151));for(var L=null,P=null,Y=g,$=g=0,Be=null,ie=b.next();Y!==null&&!ie.done;$++,ie=b.next()){Y.index>$?(Be=Y,Y=null):Be=Y.sibling;var Aa=N(y,Y,ie.value,M);if(Aa===null){Y===null&&(Y=Be);break}e&&Y&&Aa.alternate===null&&t(y,Y),g=s(Aa,g,$),P===null?L=Aa:P.sibling=Aa,P=Aa,Y=Be}if(ie.done)return a(y,Y),ue&&Ma(y,$),L;if(Y===null){for(;!ie.done;$++,ie=b.next())ie=q(y,ie.value,M),ie!==null&&(g=s(ie,g,$),P===null?L=ie:P.sibling=ie,P=ie);return ue&&Ma(y,$),L}for(Y=l(Y);!ie.done;$++,ie=b.next())ie=_(Y,y,$,ie.value,M),ie!==null&&(e&&ie.alternate!==null&&Y.delete(ie.key===null?$:ie.key),g=s(ie,g,$),P===null?L=ie:P.sibling=ie,P=ie);return e&&Y.forEach(function(gm){return t(y,gm)}),ue&&Ma(y,$),L}function ge(y,g,b,M){if(typeof b=="object"&&b!==null&&b.type===E&&b.key===null&&(b=b.props.children),typeof b=="object"&&b!==null){switch(b.$$typeof){case v:e:{for(var L=b.key;g!==null;){if(g.key===L){if(L=b.type,L===E){if(g.tag===7){a(y,g.sibling),M=n(g,b.props.children),M.return=y,y=M;break e}}else if(g.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===J&&Rf(L)===g.type){a(y,g.sibling),M=n(g,b.props),hn(M,b),M.return=y,y=M;break e}a(y,g);break}else t(y,g);g=g.sibling}b.type===E?(M=Oa(b.props.children,y.mode,M,b.key),M.return=y,y=M):(M=ls(b.type,b.key,b.props,null,y.mode,M),hn(M,b),M.return=y,y=M)}return u(y);case x:e:{for(L=b.key;g!==null;){if(g.key===L)if(g.tag===4&&g.stateNode.containerInfo===b.containerInfo&&g.stateNode.implementation===b.implementation){a(y,g.sibling),M=n(g,b.children||[]),M.return=y,y=M;break e}else{a(y,g);break}else t(y,g);g=g.sibling}M=Gi(b,y.mode,M),M.return=y,y=M}return u(y);case J:return L=b._init,b=L(b._payload),ge(y,g,b,M)}if(dt(b))return K(y,g,b,M);if(Ze(b)){if(L=Ze(b),typeof L!="function")throw Error(o(150));return b=L.call(b),Z(y,g,b,M)}if(typeof b.then=="function")return ge(y,g,bs(b),M);if(b.$$typeof===te)return ge(y,g,us(y,b),M);js(y,b)}return typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint"?(b=""+b,g!==null&&g.tag===6?(a(y,g.sibling),M=n(g,b),M.return=y,y=M):(a(y,g),M=Ci(b,y.mode,M),M.return=y,y=M),u(y)):a(y,g)}return function(y,g,b,M){try{dn=0;var L=ge(y,g,b,M);return bl=null,L}catch(Y){if(Y===an||Y===rs)throw Y;var P=nt(29,Y,null,y.mode);return P.lanes=M,P.return=y,P}finally{}}}var jl=qf(!0),Cf=qf(!1),bt=Xe(null),Ot=null;function ca(e){var t=e.alternate;ce(Re,Re.current&1),ce(bt,e),Ot===null&&(t===null||xl.current!==null||t.memoizedState!==null)&&(Ot=e)}function Gf(e){if(e.tag===22){if(ce(Re,Re.current),ce(bt,e),Ot===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Ot=e)}}else ra()}function ra(){ce(Re,Re.current),ce(bt,bt.current)}function Zt(e){pe(bt),Ot===e&&(Ot=null),pe(Re)}var Re=Xe(0);function Ss(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||sc(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function xu(e,t,a,l){t=e.memoizedState,a=a(l,t),a=a==null?t:R({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var yu={enqueueSetState:function(e,t,a){e=e._reactInternals;var l=ct(),n=sa(l);n.payload=t,a!=null&&(n.callback=a),t=ia(e,n,l),t!==null&&(rt(t,e,l),nn(t,e,l))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var l=ct(),n=sa(l);n.tag=1,n.payload=t,a!=null&&(n.callback=a),t=ia(e,n,l),t!==null&&(rt(t,e,l),nn(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=ct(),l=sa(a);l.tag=2,t!=null&&(l.callback=t),t=ia(e,l,a),t!==null&&(rt(t,e,a),nn(t,e,a))}};function Bf(e,t,a,l,n,s,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,s,u):t.prototype&&t.prototype.isPureReactComponent?!kl(a,l)||!kl(n,s):!0}function Xf(e,t,a,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,l),t.state!==e&&yu.enqueueReplaceState(t,t.state,null)}function Ha(e,t){var a=t;if("ref"in t){a={};for(var l in t)l!=="ref"&&(a[l]=t[l])}if(e=e.defaultProps){a===t&&(a=R({},a));for(var n in e)a[n]===void 0&&(a[n]=e[n])}return a}var As=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Hf(e){As(e)}function Lf(e){console.error(e)}function Qf(e){As(e)}function Ns(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function Yf(e,t,a){try{var l=e.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function pu(e,t,a){return a=sa(a),a.tag=3,a.payload={element:null},a.callback=function(){Ns(e,t)},a}function Zf(e){return e=sa(e),e.tag=3,e}function $f(e,t,a,l){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var s=l.value;e.payload=function(){return n(s)},e.callback=function(){Yf(t,a,l)}}var u=a.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(e.callback=function(){Yf(t,a,l),typeof n!="function"&&(ga===null?ga=new Set([this]):ga.add(this));var r=l.stack;this.componentDidCatch(l.value,{componentStack:r!==null?r:""})})}function g0(e,t,a,l,n){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=a.alternate,t!==null&&Fl(t,a,n,!0),a=bt.current,a!==null){switch(a.tag){case 13:return Ot===null?Qu():a.alternate===null&&Ae===0&&(Ae=3),a.flags&=-257,a.flags|=65536,a.lanes=n,l===Ki?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([l]):t.add(l),Zu(e,l,n)),!1;case 22:return a.flags|=65536,l===Ki?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([l]):a.add(l)),Zu(e,l,n)),!1}throw Error(o(435,a.tag))}return Zu(e,l,n),Qu(),!1}if(ue)return t=bt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=n,l!==Hi&&(e=Error(o(422),{cause:l}),Pl(xt(e,a)))):(l!==Hi&&(t=Error(o(423),{cause:l}),Pl(xt(t,a))),e=e.current.alternate,e.flags|=65536,n&=-n,e.lanes|=n,l=xt(l,a),n=pu(e.stateNode,l,n),Ii(e,n),Ae!==4&&(Ae=2)),!1;var s=Error(o(520),{cause:l});if(s=xt(s,a),bn===null?bn=[s]:bn.push(s),Ae!==4&&(Ae=2),t===null)return!0;l=xt(l,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=n&-n,a.lanes|=e,e=pu(a.stateNode,l,e),Ii(a,e),!1;case 1:if(t=a.type,s=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(ga===null||!ga.has(s))))return a.flags|=65536,n&=-n,a.lanes|=n,n=Zf(n),$f(n,e,a,l),Ii(a,n),!1}a=a.return}while(a!==null);return!1}var Vf=Error(o(461)),Ce=!1;function He(e,t,a,l){t.child=e===null?Cf(t,null,a,l):jl(t,e.child,a,l)}function Kf(e,t,a,l,n){a=a.render;var s=t.ref;if("ref"in l){var u={};for(var r in l)r!=="ref"&&(u[r]=l[r])}else u=l;return Ga(t),l=tu(e,t,a,u,s,n),r=au(),e!==null&&!Ce?(lu(e,t,n),$t(e,t,n)):(ue&&r&&Bi(t),t.flags|=1,He(e,t,l,n),t.child)}function kf(e,t,a,l,n){if(e===null){var s=a.type;return typeof s=="function"&&!qi(s)&&s.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=s,Jf(e,t,s,l,n)):(e=ls(a.type,null,l,t,t.mode,n),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!Tu(e,n)){var u=s.memoizedProps;if(a=a.compare,a=a!==null?a:kl,a(u,l)&&e.ref===t.ref)return $t(e,t,n)}return t.flags|=1,e=Bt(s,l),e.ref=t.ref,e.return=t,t.child=e}function Jf(e,t,a,l,n){if(e!==null){var s=e.memoizedProps;if(kl(s,l)&&e.ref===t.ref)if(Ce=!1,t.pendingProps=l=s,Tu(e,n))(e.flags&131072)!==0&&(Ce=!0);else return t.lanes=e.lanes,$t(e,t,n)}return vu(e,t,a,l,n)}function If(e,t,a){var l=t.pendingProps,n=l.children,s=e!==null?e.memoizedState:null;if(l.mode==="hidden"){if((t.flags&128)!==0){if(l=s!==null?s.baseLanes|a:a,e!==null){for(n=t.child=e.child,s=0;n!==null;)s=s|n.lanes|n.childLanes,n=n.sibling;t.childLanes=s&~l}else t.childLanes=0,t.child=null;return Wf(e,t,l,a)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&cs(t,s!==null?s.cachePool:null),s!==null?kr(t,s):Pi(),Gf(t);else return t.lanes=t.childLanes=536870912,Wf(e,t,s!==null?s.baseLanes|a:a,a)}else s!==null?(cs(t,s.cachePool),kr(t,s),ra(),t.memoizedState=null):(e!==null&&cs(t,null),Pi(),ra());return He(e,t,n,a),t.child}function Wf(e,t,a,l){var n=Vi();return n=n===null?null:{parent:Me._currentValue,pool:n},t.memoizedState={baseLanes:a,cachePool:n},e!==null&&cs(t,null),Pi(),Gf(t),e!==null&&Fl(e,t,l,!0),null}function _s(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(o(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function vu(e,t,a,l,n){return Ga(t),a=tu(e,t,a,l,void 0,n),l=au(),e!==null&&!Ce?(lu(e,t,n),$t(e,t,n)):(ue&&l&&Bi(t),t.flags|=1,He(e,t,a,n),t.child)}function Pf(e,t,a,l,n,s){return Ga(t),t.updateQueue=null,a=Ir(t,l,a,n),Jr(e),l=au(),e!==null&&!Ce?(lu(e,t,s),$t(e,t,s)):(ue&&l&&Bi(t),t.flags|=1,He(e,t,a,s),t.child)}function Ff(e,t,a,l,n){if(Ga(t),t.stateNode===null){var s=ol,u=a.contextType;typeof u=="object"&&u!==null&&(s=Ve(u)),s=new a(l,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=yu,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=l,s.state=t.memoizedState,s.refs={},ki(t),u=a.contextType,s.context=typeof u=="object"&&u!==null?Ve(u):ol,s.state=t.memoizedState,u=a.getDerivedStateFromProps,typeof u=="function"&&(xu(t,a,u,l),s.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(u=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),u!==s.state&&yu.enqueueReplaceState(s,s.state,null),un(t,l,s,n),sn(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){s=t.stateNode;var r=t.memoizedProps,h=Ha(a,r);s.props=h;var A=s.context,O=a.contextType;u=ol,typeof O=="object"&&O!==null&&(u=Ve(O));var q=a.getDerivedStateFromProps;O=typeof q=="function"||typeof s.getSnapshotBeforeUpdate=="function",r=t.pendingProps!==r,O||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r||A!==u)&&Xf(t,s,l,u),na=!1;var N=t.memoizedState;s.state=N,un(t,l,s,n),sn(),A=t.memoizedState,r||N!==A||na?(typeof q=="function"&&(xu(t,a,q,l),A=t.memoizedState),(h=na||Bf(t,a,h,l,N,A,u))?(O||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=A),s.props=l,s.state=A,s.context=u,l=h):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{s=t.stateNode,Ji(e,t),u=t.memoizedProps,O=Ha(a,u),s.props=O,q=t.pendingProps,N=s.context,A=a.contextType,h=ol,typeof A=="object"&&A!==null&&(h=Ve(A)),r=a.getDerivedStateFromProps,(A=typeof r=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(u!==q||N!==h)&&Xf(t,s,l,h),na=!1,N=t.memoizedState,s.state=N,un(t,l,s,n),sn();var _=t.memoizedState;u!==q||N!==_||na||e!==null&&e.dependencies!==null&&is(e.dependencies)?(typeof r=="function"&&(xu(t,a,r,l),_=t.memoizedState),(O=na||Bf(t,a,O,l,N,_,h)||e!==null&&e.dependencies!==null&&is(e.dependencies))?(A||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(l,_,h),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(l,_,h)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||u===e.memoizedProps&&N===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&N===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=_),s.props=l,s.state=_,s.context=h,l=O):(typeof s.componentDidUpdate!="function"||u===e.memoizedProps&&N===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&N===e.memoizedState||(t.flags|=1024),l=!1)}return s=l,_s(e,t),l=(t.flags&128)!==0,s||l?(s=t.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&l?(t.child=jl(t,e.child,null,n),t.child=jl(t,null,a,n)):He(e,t,a,n),t.memoizedState=s.state,e=t.child):e=$t(e,t,n),e}function eo(e,t,a,l){return Wl(),t.flags|=256,He(e,t,a,l),t.child}var bu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ju(e){return{baseLanes:e,cachePool:Hr()}}function Su(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=jt),e}function to(e,t,a){var l=t.pendingProps,n=!1,s=(t.flags&128)!==0,u;if((u=s)||(u=e!==null&&e.memoizedState===null?!1:(Re.current&2)!==0),u&&(n=!0,t.flags&=-129),u=(t.flags&32)!==0,t.flags&=-33,e===null){if(ue){if(n?ca(t):ra(),ue){var r=Se,h;if(h=r){e:{for(h=r,r=zt;h.nodeType!==8;){if(!r){r=null;break e}if(h=Tt(h.nextSibling),h===null){r=null;break e}}r=h}r!==null?(t.memoizedState={dehydrated:r,treeContext:Ua!==null?{id:Xt,overflow:Ht}:null,retryLane:536870912,hydrationErrors:null},h=nt(18,null,null,0),h.stateNode=r,h.return=t,t.child=h,Ke=t,Se=null,h=!0):h=!1}h||qa(t)}if(r=t.memoizedState,r!==null&&(r=r.dehydrated,r!==null))return sc(r)?t.lanes=32:t.lanes=536870912,null;Zt(t)}return r=l.children,l=l.fallback,n?(ra(),n=t.mode,r=Ts({mode:"hidden",children:r},n),l=Oa(l,n,a,null),r.return=t,l.return=t,r.sibling=l,t.child=r,n=t.child,n.memoizedState=ju(a),n.childLanes=Su(e,u,a),t.memoizedState=bu,l):(ca(t),Au(t,r))}if(h=e.memoizedState,h!==null&&(r=h.dehydrated,r!==null)){if(s)t.flags&256?(ca(t),t.flags&=-257,t=Nu(e,t,a)):t.memoizedState!==null?(ra(),t.child=e.child,t.flags|=128,t=null):(ra(),n=l.fallback,r=t.mode,l=Ts({mode:"visible",children:l.children},r),n=Oa(n,r,a,null),n.flags|=2,l.return=t,n.return=t,l.sibling=n,t.child=l,jl(t,e.child,null,a),l=t.child,l.memoizedState=ju(a),l.childLanes=Su(e,u,a),t.memoizedState=bu,t=n);else if(ca(t),sc(r)){if(u=r.nextSibling&&r.nextSibling.dataset,u)var A=u.dgst;u=A,l=Error(o(419)),l.stack="",l.digest=u,Pl({value:l,source:null,stack:null}),t=Nu(e,t,a)}else if(Ce||Fl(e,t,a,!1),u=(a&e.childLanes)!==0,Ce||u){if(u=ye,u!==null&&(l=a&-a,l=(l&42)!==0?1:ii(l),l=(l&(u.suspendedLanes|a))!==0?0:l,l!==0&&l!==h.retryLane))throw h.retryLane=l,fl(e,l),rt(u,e,l),Vf;r.data==="$?"||Qu(),t=Nu(e,t,a)}else r.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=h.treeContext,Se=Tt(r.nextSibling),Ke=t,ue=!0,Ra=null,zt=!1,e!==null&&(pt[vt++]=Xt,pt[vt++]=Ht,pt[vt++]=Ua,Xt=e.id,Ht=e.overflow,Ua=t),t=Au(t,l.children),t.flags|=4096);return t}return n?(ra(),n=l.fallback,r=t.mode,h=e.child,A=h.sibling,l=Bt(h,{mode:"hidden",children:l.children}),l.subtreeFlags=h.subtreeFlags&65011712,A!==null?n=Bt(A,n):(n=Oa(n,r,a,null),n.flags|=2),n.return=t,l.return=t,l.sibling=n,t.child=l,l=n,n=t.child,r=e.child.memoizedState,r===null?r=ju(a):(h=r.cachePool,h!==null?(A=Me._currentValue,h=h.parent!==A?{parent:A,pool:A}:h):h=Hr(),r={baseLanes:r.baseLanes|a,cachePool:h}),n.memoizedState=r,n.childLanes=Su(e,u,a),t.memoizedState=bu,l):(ca(t),a=e.child,e=a.sibling,a=Bt(a,{mode:"visible",children:l.children}),a.return=t,a.sibling=null,e!==null&&(u=t.deletions,u===null?(t.deletions=[e],t.flags|=16):u.push(e)),t.child=a,t.memoizedState=null,a)}function Au(e,t){return t=Ts({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Ts(e,t){return e=nt(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Nu(e,t,a){return jl(t,e.child,null,a),e=Au(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ao(e,t,a){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),Qi(e.return,t,a)}function _u(e,t,a,l,n){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:n}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=l,s.tail=a,s.tailMode=n)}function lo(e,t,a){var l=t.pendingProps,n=l.revealOrder,s=l.tail;if(He(e,t,l.children,a),l=Re.current,(l&2)!==0)l=l&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ao(e,a,t);else if(e.tag===19)ao(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}switch(ce(Re,l),n){case"forwards":for(a=t.child,n=null;a!==null;)e=a.alternate,e!==null&&Ss(e)===null&&(n=a),a=a.sibling;a=n,a===null?(n=t.child,t.child=null):(n=a.sibling,a.sibling=null),_u(t,!1,n,a,s);break;case"backwards":for(a=null,n=t.child,t.child=null;n!==null;){if(e=n.alternate,e!==null&&Ss(e)===null){t.child=n;break}e=n.sibling,n.sibling=a,a=n,n=e}_u(t,!0,a,null,s);break;case"together":_u(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function $t(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),ma|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(Fl(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,a=Bt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Bt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Tu(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&is(e)))}function x0(e,t,a){switch(t.tag){case 3:Ka(t,t.stateNode.containerInfo),la(t,Me,e.memoizedState.cache),Wl();break;case 27:case 5:Ft(t);break;case 4:Ka(t,t.stateNode.containerInfo);break;case 10:la(t,t.type,t.memoizedProps.value);break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(ca(t),t.flags|=128,null):(a&t.child.childLanes)!==0?to(e,t,a):(ca(t),e=$t(e,t,a),e!==null?e.sibling:null);ca(t);break;case 19:var n=(e.flags&128)!==0;if(l=(a&t.childLanes)!==0,l||(Fl(e,t,a,!1),l=(a&t.childLanes)!==0),n){if(l)return lo(e,t,a);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),ce(Re,Re.current),l)break;return null;case 22:case 23:return t.lanes=0,If(e,t,a);case 24:la(t,Me,e.memoizedState.cache)}return $t(e,t,a)}function no(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ce=!0;else{if(!Tu(e,a)&&(t.flags&128)===0)return Ce=!1,x0(e,t,a);Ce=(e.flags&131072)!==0}else Ce=!1,ue&&(t.flags&1048576)!==0&&Mr(t,ss,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var l=t.elementType,n=l._init;if(l=n(l._payload),t.type=l,typeof l=="function")qi(l)?(e=Ha(l,e),t.tag=1,t=Ff(null,t,l,e,a)):(t.tag=0,t=vu(null,t,l,e,a));else{if(l!=null){if(n=l.$$typeof,n===ne){t.tag=11,t=Kf(null,t,l,e,a);break e}else if(n===Ye){t.tag=14,t=kf(null,t,l,e,a);break e}}throw t=_a(l)||l,Error(o(306,t,""))}}return t;case 0:return vu(e,t,t.type,t.pendingProps,a);case 1:return l=t.type,n=Ha(l,t.pendingProps),Ff(e,t,l,n,a);case 3:e:{if(Ka(t,t.stateNode.containerInfo),e===null)throw Error(o(387));l=t.pendingProps;var s=t.memoizedState;n=s.element,Ji(e,t),un(t,l,null,a);var u=t.memoizedState;if(l=u.cache,la(t,Me,l),l!==s.cache&&Yi(t,[Me],a,!0),sn(),l=u.element,s.isDehydrated)if(s={element:l,isDehydrated:!1,cache:u.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=eo(e,t,l,a);break e}else if(l!==n){n=xt(Error(o(424)),t),Pl(n),t=eo(e,t,l,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Se=Tt(e.firstChild),Ke=t,ue=!0,Ra=null,zt=!0,a=Cf(t,null,l,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Wl(),l===n){t=$t(e,t,a);break e}He(e,t,l,a)}t=t.child}return t;case 26:return _s(e,t),e===null?(a=rd(t.type,null,t.pendingProps,null))?t.memoizedState=a:ue||(a=t.type,e=t.pendingProps,l=Hs(Et.current).createElement(a),l[$e]=t,l[ke]=e,Qe(l,a,e),qe(l),t.stateNode=l):t.memoizedState=rd(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ft(t),e===null&&ue&&(l=t.stateNode=id(t.type,t.pendingProps,Et.current),Ke=t,zt=!0,n=Se,pa(t.type)?(ic=n,Se=Tt(l.firstChild)):Se=n),He(e,t,t.pendingProps.children,a),_s(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ue&&((n=l=Se)&&(l=Z0(l,t.type,t.pendingProps,zt),l!==null?(t.stateNode=l,Ke=t,Se=Tt(l.firstChild),zt=!1,n=!0):n=!1),n||qa(t)),Ft(t),n=t.type,s=t.pendingProps,u=e!==null?e.memoizedProps:null,l=s.children,ac(n,s)?l=null:u!==null&&ac(n,u)&&(t.flags|=32),t.memoizedState!==null&&(n=tu(e,t,c0,null,null,a),Dn._currentValue=n),_s(e,t),He(e,t,l,a),t.child;case 6:return e===null&&ue&&((e=a=Se)&&(a=$0(a,t.pendingProps,zt),a!==null?(t.stateNode=a,Ke=t,Se=null,e=!0):e=!1),e||qa(t)),null;case 13:return to(e,t,a);case 4:return Ka(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=jl(t,null,l,a):He(e,t,l,a),t.child;case 11:return Kf(e,t,t.type,t.pendingProps,a);case 7:return He(e,t,t.pendingProps,a),t.child;case 8:return He(e,t,t.pendingProps.children,a),t.child;case 12:return He(e,t,t.pendingProps.children,a),t.child;case 10:return l=t.pendingProps,la(t,t.type,l.value),He(e,t,l.children,a),t.child;case 9:return n=t.type._context,l=t.pendingProps.children,Ga(t),n=Ve(n),l=l(n),t.flags|=1,He(e,t,l,a),t.child;case 14:return kf(e,t,t.type,t.pendingProps,a);case 15:return Jf(e,t,t.type,t.pendingProps,a);case 19:return lo(e,t,a);case 31:return l=t.pendingProps,a=t.mode,l={mode:l.mode,children:l.children},e===null?(a=Ts(l,a),a.ref=t.ref,t.child=a,a.return=t,t=a):(a=Bt(e.child,l),a.ref=t.ref,t.child=a,a.return=t,t=a),t;case 22:return If(e,t,a);case 24:return Ga(t),l=Ve(Me),e===null?(n=Vi(),n===null&&(n=ye,s=Zi(),n.pooledCache=s,s.refCount++,s!==null&&(n.pooledCacheLanes|=a),n=s),t.memoizedState={parent:l,cache:n},ki(t),la(t,Me,n)):((e.lanes&a)!==0&&(Ji(e,t),un(t,null,null,a),sn()),n=e.memoizedState,s=t.memoizedState,n.parent!==l?(n={parent:l,cache:l},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),la(t,Me,l)):(l=s.cache,la(t,Me,l),l!==n.cache&&Yi(t,[Me],a,!0))),He(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function Vt(e){e.flags|=4}function so(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!md(t)){if(t=bt.current,t!==null&&((ae&4194048)===ae?Ot!==null:(ae&62914560)!==ae&&(ae&536870912)===0||t!==Ot))throw ln=Ki,Lr;e.flags|=8192}}function Es(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Cc():536870912,e.lanes|=t,_l|=t)}function mn(e,t){if(!ue)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function be(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,l=0;if(t)for(var n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags&65011712,l|=n.flags&65011712,n.return=e,n=n.sibling;else for(n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags,l|=n.flags,n.return=e,n=n.sibling;return e.subtreeFlags|=l,e.childLanes=a,t}function y0(e,t,a){var l=t.pendingProps;switch(Xi(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return be(t),null;case 1:return be(t),null;case 3:return a=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Qt(Me),wt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Il(t)?Vt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Cr())),be(t),null;case 26:return a=t.memoizedState,e===null?(Vt(t),a!==null?(be(t),so(t,a)):(be(t),t.flags&=-16777217)):a?a!==e.memoizedState?(Vt(t),be(t),so(t,a)):(be(t),t.flags&=-16777217):(e.memoizedProps!==l&&Vt(t),be(t),t.flags&=-16777217),null;case 27:ka(t),a=Et.current;var n=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Vt(t);else{if(!l){if(t.stateNode===null)throw Error(o(166));return be(t),null}e=De.current,Il(t)?Rr(t):(e=id(n,l,a),t.stateNode=e,Vt(t))}return be(t),null;case 5:if(ka(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Vt(t);else{if(!l){if(t.stateNode===null)throw Error(o(166));return be(t),null}if(e=De.current,Il(t))Rr(t);else{switch(n=Hs(Et.current),e){case 1:e=n.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=n.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=n.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=n.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=n.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof l.is=="string"?n.createElement("select",{is:l.is}):n.createElement("select"),l.multiple?e.multiple=!0:l.size&&(e.size=l.size);break;default:e=typeof l.is=="string"?n.createElement(a,{is:l.is}):n.createElement(a)}}e[$e]=t,e[ke]=l;e:for(n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.tag!==27&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}t.stateNode=e;e:switch(Qe(e,a,l),a){case"button":case"input":case"select":case"textarea":e=!!l.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&Vt(t)}}return be(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&Vt(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(o(166));if(e=Et.current,Il(t)){if(e=t.stateNode,a=t.memoizedProps,l=null,n=Ke,n!==null)switch(n.tag){case 27:case 5:l=n.memoizedProps}e[$e]=t,e=!!(e.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||Fo(e.nodeValue,a)),e||qa(t)}else e=Hs(e).createTextNode(l),e[$e]=t,t.stateNode=e}return be(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(n=Il(t),l!==null&&l.dehydrated!==null){if(e===null){if(!n)throw Error(o(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(o(317));n[$e]=t}else Wl(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;be(t),n=!1}else n=Cr(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(Zt(t),t):(Zt(t),null)}if(Zt(t),(t.flags&128)!==0)return t.lanes=a,t;if(a=l!==null,e=e!==null&&e.memoizedState!==null,a){l=t.child,n=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(n=l.alternate.memoizedState.cachePool.pool);var s=null;l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(s=l.memoizedState.cachePool.pool),s!==n&&(l.flags|=2048)}return a!==e&&a&&(t.child.flags|=8192),Es(t,t.updateQueue),be(t),null;case 4:return wt(),e===null&&Wu(t.stateNode.containerInfo),be(t),null;case 10:return Qt(t.type),be(t),null;case 19:if(pe(Re),n=t.memoizedState,n===null)return be(t),null;if(l=(t.flags&128)!==0,s=n.rendering,s===null)if(l)mn(n,!1);else{if(Ae!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=Ss(e),s!==null){for(t.flags|=128,mn(n,!1),e=s.updateQueue,t.updateQueue=e,Es(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Ur(a,e),a=a.sibling;return ce(Re,Re.current&1|2),t.child}e=e.sibling}n.tail!==null&&Dt()>zs&&(t.flags|=128,l=!0,mn(n,!1),t.lanes=4194304)}else{if(!l)if(e=Ss(s),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Es(t,e),mn(n,!0),n.tail===null&&n.tailMode==="hidden"&&!s.alternate&&!ue)return be(t),null}else 2*Dt()-n.renderingStartTime>zs&&a!==536870912&&(t.flags|=128,l=!0,mn(n,!1),t.lanes=4194304);n.isBackwards?(s.sibling=t.child,t.child=s):(e=n.last,e!==null?e.sibling=s:t.child=s,n.last=s)}return n.tail!==null?(t=n.tail,n.rendering=t,n.tail=t.sibling,n.renderingStartTime=Dt(),t.sibling=null,e=Re.current,ce(Re,l?e&1|2:e&1),t):(be(t),null);case 22:case 23:return Zt(t),Fi(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?(a&536870912)!==0&&(t.flags&128)===0&&(be(t),t.subtreeFlags&6&&(t.flags|=8192)):be(t),a=t.updateQueue,a!==null&&Es(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(t.flags|=2048),e!==null&&pe(Ba),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Qt(Me),be(t),null;case 25:return null;case 30:return null}throw Error(o(156,t.tag))}function p0(e,t){switch(Xi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Qt(Me),wt(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ka(t),null;case 13:if(Zt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));Wl()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(Re),null;case 4:return wt(),null;case 10:return Qt(t.type),null;case 22:case 23:return Zt(t),Fi(),e!==null&&pe(Ba),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Qt(Me),null;case 25:return null;default:return null}}function io(e,t){switch(Xi(t),t.tag){case 3:Qt(Me),wt();break;case 26:case 27:case 5:ka(t);break;case 4:wt();break;case 13:Zt(t);break;case 19:pe(Re);break;case 10:Qt(t.type);break;case 22:case 23:Zt(t),Fi(),e!==null&&pe(Ba);break;case 24:Qt(Me)}}function gn(e,t){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var n=l.next;a=n;do{if((a.tag&e)===e){l=void 0;var s=a.create,u=a.inst;l=s(),u.destroy=l}a=a.next}while(a!==n)}}catch(r){xe(t,t.return,r)}}function fa(e,t,a){try{var l=t.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var s=n.next;l=s;do{if((l.tag&e)===e){var u=l.inst,r=u.destroy;if(r!==void 0){u.destroy=void 0,n=t;var h=a,A=r;try{A()}catch(O){xe(n,h,O)}}}l=l.next}while(l!==s)}}catch(O){xe(t,t.return,O)}}function uo(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Kr(t,a)}catch(l){xe(e,e.return,l)}}}function co(e,t,a){a.props=Ha(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(l){xe(e,t,l)}}function xn(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof a=="function"?e.refCleanup=a(l):a.current=l}}catch(n){xe(e,t,n)}}function Ut(e,t){var a=e.ref,l=e.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(n){xe(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){xe(e,t,n)}else a.current=null}function ro(e){var t=e.type,a=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break e;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(n){xe(e,e.return,n)}}function Eu(e,t,a){try{var l=e.stateNode;X0(l,e.type,a,t),l[ke]=t}catch(n){xe(e,e.return,n)}}function fo(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&pa(e.type)||e.tag===4}function wu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||fo(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&pa(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Du(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Xs));else if(l!==4&&(l===27&&pa(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Du(e,t,a),e=e.sibling;e!==null;)Du(e,t,a),e=e.sibling}function ws(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(l!==4&&(l===27&&pa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(ws(e,t,a),e=e.sibling;e!==null;)ws(e,t,a),e=e.sibling}function oo(e){var t=e.stateNode,a=e.memoizedProps;try{for(var l=e.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Qe(t,l,a),t[$e]=e,t[ke]=a}catch(s){xe(e,e.return,s)}}var Kt=!1,Ee=!1,zu=!1,ho=typeof WeakSet=="function"?WeakSet:Set,Ge=null;function v0(e,t){if(e=e.containerInfo,ec=Vs,e=Sr(e),wi(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var n=l.anchorOffset,s=l.focusNode;l=l.focusOffset;try{a.nodeType,s.nodeType}catch{a=null;break e}var u=0,r=-1,h=-1,A=0,O=0,q=e,N=null;t:for(;;){for(var _;q!==a||n!==0&&q.nodeType!==3||(r=u+n),q!==s||l!==0&&q.nodeType!==3||(h=u+l),q.nodeType===3&&(u+=q.nodeValue.length),(_=q.firstChild)!==null;)N=q,q=_;for(;;){if(q===e)break t;if(N===a&&++A===n&&(r=u),N===s&&++O===l&&(h=u),(_=q.nextSibling)!==null)break;q=N,N=q.parentNode}q=_}a=r===-1||h===-1?null:{start:r,end:h}}else a=null}a=a||{start:0,end:0}}else a=null;for(tc={focusedElem:e,selectionRange:a},Vs=!1,Ge=t;Ge!==null;)if(t=Ge,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,Ge=e;else for(;Ge!==null;){switch(t=Ge,s=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&s!==null){e=void 0,a=t,n=s.memoizedProps,s=s.memoizedState,l=a.stateNode;try{var K=Ha(a.type,n,a.elementType===a.type);e=l.getSnapshotBeforeUpdate(K,s),l.__reactInternalSnapshotBeforeUpdate=e}catch(Z){xe(a,a.return,Z)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)nc(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":nc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(o(163))}if(e=t.sibling,e!==null){e.return=t.return,Ge=e;break}Ge=t.return}}function mo(e,t,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:oa(e,a),l&4&&gn(5,a);break;case 1:if(oa(e,a),l&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(u){xe(a,a.return,u)}else{var n=Ha(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(n,t,e.__reactInternalSnapshotBeforeUpdate)}catch(u){xe(a,a.return,u)}}l&64&&uo(a),l&512&&xn(a,a.return);break;case 3:if(oa(e,a),l&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Kr(e,t)}catch(u){xe(a,a.return,u)}}break;case 27:t===null&&l&4&&oo(a);case 26:case 5:oa(e,a),t===null&&l&4&&ro(a),l&512&&xn(a,a.return);break;case 12:oa(e,a);break;case 13:oa(e,a),l&4&&yo(e,a),l&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=w0.bind(null,a),V0(e,a))));break;case 22:if(l=a.memoizedState!==null||Kt,!l){t=t!==null&&t.memoizedState!==null||Ee,n=Kt;var s=Ee;Kt=l,(Ee=t)&&!s?da(e,a,(a.subtreeFlags&8772)!==0):oa(e,a),Kt=n,Ee=s}break;case 30:break;default:oa(e,a)}}function go(e){var t=e.alternate;t!==null&&(e.alternate=null,go(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ri(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ve=null,We=!1;function kt(e,t,a){for(a=a.child;a!==null;)xo(e,t,a),a=a.sibling}function xo(e,t,a){if(tt&&typeof tt.onCommitFiberUnmount=="function")try{tt.onCommitFiberUnmount(Cl,a)}catch{}switch(a.tag){case 26:Ee||Ut(a,t),kt(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Ee||Ut(a,t);var l=ve,n=We;pa(a.type)&&(ve=a.stateNode,We=!1),kt(e,t,a),_n(a.stateNode),ve=l,We=n;break;case 5:Ee||Ut(a,t);case 6:if(l=ve,n=We,ve=null,kt(e,t,a),ve=l,We=n,ve!==null)if(We)try{(ve.nodeType===9?ve.body:ve.nodeName==="HTML"?ve.ownerDocument.body:ve).removeChild(a.stateNode)}catch(s){xe(a,t,s)}else try{ve.removeChild(a.stateNode)}catch(s){xe(a,t,s)}break;case 18:ve!==null&&(We?(e=ve,nd(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Mn(e)):nd(ve,a.stateNode));break;case 4:l=ve,n=We,ve=a.stateNode.containerInfo,We=!0,kt(e,t,a),ve=l,We=n;break;case 0:case 11:case 14:case 15:Ee||fa(2,a,t),Ee||fa(4,a,t),kt(e,t,a);break;case 1:Ee||(Ut(a,t),l=a.stateNode,typeof l.componentWillUnmount=="function"&&co(a,t,l)),kt(e,t,a);break;case 21:kt(e,t,a);break;case 22:Ee=(l=Ee)||a.memoizedState!==null,kt(e,t,a),Ee=l;break;default:kt(e,t,a)}}function yo(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Mn(e)}catch(a){xe(t,t.return,a)}}function b0(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ho),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ho),t;default:throw Error(o(435,e.tag))}}function Ou(e,t){var a=b0(e);t.forEach(function(l){var n=D0.bind(null,e,l);a.has(l)||(a.add(l),l.then(n,n))})}function st(e,t){var a=t.deletions;if(a!==null)for(var l=0;l<a.length;l++){var n=a[l],s=e,u=t,r=u;e:for(;r!==null;){switch(r.tag){case 27:if(pa(r.type)){ve=r.stateNode,We=!1;break e}break;case 5:ve=r.stateNode,We=!1;break e;case 3:case 4:ve=r.stateNode.containerInfo,We=!0;break e}r=r.return}if(ve===null)throw Error(o(160));xo(s,u,n),ve=null,We=!1,s=n.alternate,s!==null&&(s.return=null),n.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)po(t,e),t=t.sibling}var _t=null;function po(e,t){var a=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:st(t,e),it(e),l&4&&(fa(3,e,e.return),gn(3,e),fa(5,e,e.return));break;case 1:st(t,e),it(e),l&512&&(Ee||a===null||Ut(a,a.return)),l&64&&Kt&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var n=_t;if(st(t,e),it(e),l&512&&(Ee||a===null||Ut(a,a.return)),l&4){var s=a!==null?a.memoizedState:null;if(l=e.memoizedState,a===null)if(l===null)if(e.stateNode===null){e:{l=e.type,a=e.memoizedProps,n=n.ownerDocument||n;t:switch(l){case"title":s=n.getElementsByTagName("title")[0],(!s||s[Xl]||s[$e]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=n.createElement(l),n.head.insertBefore(s,n.querySelector("head > title"))),Qe(s,l,a),s[$e]=e,qe(s),l=s;break e;case"link":var u=dd("link","href",n).get(l+(a.href||""));if(u){for(var r=0;r<u.length;r++)if(s=u[r],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){u.splice(r,1);break t}}s=n.createElement(l),Qe(s,l,a),n.head.appendChild(s);break;case"meta":if(u=dd("meta","content",n).get(l+(a.content||""))){for(r=0;r<u.length;r++)if(s=u[r],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){u.splice(r,1);break t}}s=n.createElement(l),Qe(s,l,a),n.head.appendChild(s);break;default:throw Error(o(468,l))}s[$e]=e,qe(s),l=s}e.stateNode=l}else hd(n,e.type,e.stateNode);else e.stateNode=od(n,l,e.memoizedProps);else s!==l?(s===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):s.count--,l===null?hd(n,e.type,e.stateNode):od(n,l,e.memoizedProps)):l===null&&e.stateNode!==null&&Eu(e,e.memoizedProps,a.memoizedProps)}break;case 27:st(t,e),it(e),l&512&&(Ee||a===null||Ut(a,a.return)),a!==null&&l&4&&Eu(e,e.memoizedProps,a.memoizedProps);break;case 5:if(st(t,e),it(e),l&512&&(Ee||a===null||Ut(a,a.return)),e.flags&32){n=e.stateNode;try{ll(n,"")}catch(_){xe(e,e.return,_)}}l&4&&e.stateNode!=null&&(n=e.memoizedProps,Eu(e,n,a!==null?a.memoizedProps:n)),l&1024&&(zu=!0);break;case 6:if(st(t,e),it(e),l&4){if(e.stateNode===null)throw Error(o(162));l=e.memoizedProps,a=e.stateNode;try{a.nodeValue=l}catch(_){xe(e,e.return,_)}}break;case 3:if(Ys=null,n=_t,_t=Ls(t.containerInfo),st(t,e),_t=n,it(e),l&4&&a!==null&&a.memoizedState.isDehydrated)try{Mn(t.containerInfo)}catch(_){xe(e,e.return,_)}zu&&(zu=!1,vo(e));break;case 4:l=_t,_t=Ls(e.stateNode.containerInfo),st(t,e),it(e),_t=l;break;case 12:st(t,e),it(e);break;case 13:st(t,e),it(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Gu=Dt()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Ou(e,l)));break;case 22:n=e.memoizedState!==null;var h=a!==null&&a.memoizedState!==null,A=Kt,O=Ee;if(Kt=A||n,Ee=O||h,st(t,e),Ee=O,Kt=A,it(e),l&8192)e:for(t=e.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(a===null||h||Kt||Ee||La(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){h=a=t;try{if(s=h.stateNode,n)u=s.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{r=h.stateNode;var q=h.memoizedProps.style,N=q!=null&&q.hasOwnProperty("display")?q.display:null;r.style.display=N==null||typeof N=="boolean"?"":(""+N).trim()}}catch(_){xe(h,h.return,_)}}}else if(t.tag===6){if(a===null){h=t;try{h.stateNode.nodeValue=n?"":h.memoizedProps}catch(_){xe(h,h.return,_)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,Ou(e,a))));break;case 19:st(t,e),it(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Ou(e,l)));break;case 30:break;case 21:break;default:st(t,e),it(e)}}function it(e){var t=e.flags;if(t&2){try{for(var a,l=e.return;l!==null;){if(fo(l)){a=l;break}l=l.return}if(a==null)throw Error(o(160));switch(a.tag){case 27:var n=a.stateNode,s=wu(e);ws(e,s,n);break;case 5:var u=a.stateNode;a.flags&32&&(ll(u,""),a.flags&=-33);var r=wu(e);ws(e,r,u);break;case 3:case 4:var h=a.stateNode.containerInfo,A=wu(e);Du(e,A,h);break;default:throw Error(o(161))}}catch(O){xe(e,e.return,O)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function vo(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;vo(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function oa(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)mo(e,t.alternate,t),t=t.sibling}function La(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:fa(4,t,t.return),La(t);break;case 1:Ut(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&co(t,t.return,a),La(t);break;case 27:_n(t.stateNode);case 26:case 5:Ut(t,t.return),La(t);break;case 22:t.memoizedState===null&&La(t);break;case 30:La(t);break;default:La(t)}e=e.sibling}}function da(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,n=e,s=t,u=s.flags;switch(s.tag){case 0:case 11:case 15:da(n,s,a),gn(4,s);break;case 1:if(da(n,s,a),l=s,n=l.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(A){xe(l,l.return,A)}if(l=s,n=l.updateQueue,n!==null){var r=l.stateNode;try{var h=n.shared.hiddenCallbacks;if(h!==null)for(n.shared.hiddenCallbacks=null,n=0;n<h.length;n++)Vr(h[n],r)}catch(A){xe(l,l.return,A)}}a&&u&64&&uo(s),xn(s,s.return);break;case 27:oo(s);case 26:case 5:da(n,s,a),a&&l===null&&u&4&&ro(s),xn(s,s.return);break;case 12:da(n,s,a);break;case 13:da(n,s,a),a&&u&4&&yo(n,s);break;case 22:s.memoizedState===null&&da(n,s,a),xn(s,s.return);break;case 30:break;default:da(n,s,a)}t=t.sibling}}function Uu(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&en(a))}function Mu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&en(e))}function Mt(e,t,a,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)bo(e,t,a,l),t=t.sibling}function bo(e,t,a,l){var n=t.flags;switch(t.tag){case 0:case 11:case 15:Mt(e,t,a,l),n&2048&&gn(9,t);break;case 1:Mt(e,t,a,l);break;case 3:Mt(e,t,a,l),n&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&en(e)));break;case 12:if(n&2048){Mt(e,t,a,l),e=t.stateNode;try{var s=t.memoizedProps,u=s.id,r=s.onPostCommit;typeof r=="function"&&r(u,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(h){xe(t,t.return,h)}}else Mt(e,t,a,l);break;case 13:Mt(e,t,a,l);break;case 23:break;case 22:s=t.stateNode,u=t.alternate,t.memoizedState!==null?s._visibility&2?Mt(e,t,a,l):yn(e,t):s._visibility&2?Mt(e,t,a,l):(s._visibility|=2,Sl(e,t,a,l,(t.subtreeFlags&10256)!==0)),n&2048&&Uu(u,t);break;case 24:Mt(e,t,a,l),n&2048&&Mu(t.alternate,t);break;default:Mt(e,t,a,l)}}function Sl(e,t,a,l,n){for(n=n&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var s=e,u=t,r=a,h=l,A=u.flags;switch(u.tag){case 0:case 11:case 15:Sl(s,u,r,h,n),gn(8,u);break;case 23:break;case 22:var O=u.stateNode;u.memoizedState!==null?O._visibility&2?Sl(s,u,r,h,n):yn(s,u):(O._visibility|=2,Sl(s,u,r,h,n)),n&&A&2048&&Uu(u.alternate,u);break;case 24:Sl(s,u,r,h,n),n&&A&2048&&Mu(u.alternate,u);break;default:Sl(s,u,r,h,n)}t=t.sibling}}function yn(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,l=t,n=l.flags;switch(l.tag){case 22:yn(a,l),n&2048&&Uu(l.alternate,l);break;case 24:yn(a,l),n&2048&&Mu(l.alternate,l);break;default:yn(a,l)}t=t.sibling}}var pn=8192;function Al(e){if(e.subtreeFlags&pn)for(e=e.child;e!==null;)jo(e),e=e.sibling}function jo(e){switch(e.tag){case 26:Al(e),e.flags&pn&&e.memoizedState!==null&&sm(_t,e.memoizedState,e.memoizedProps);break;case 5:Al(e);break;case 3:case 4:var t=_t;_t=Ls(e.stateNode.containerInfo),Al(e),_t=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=pn,pn=16777216,Al(e),pn=t):Al(e));break;default:Al(e)}}function So(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function vn(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ge=l,No(l,e)}So(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ao(e),e=e.sibling}function Ao(e){switch(e.tag){case 0:case 11:case 15:vn(e),e.flags&2048&&fa(9,e,e.return);break;case 3:vn(e);break;case 12:vn(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ds(e)):vn(e);break;default:vn(e)}}function Ds(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ge=l,No(l,e)}So(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:fa(8,t,t.return),Ds(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Ds(t));break;default:Ds(t)}e=e.sibling}}function No(e,t){for(;Ge!==null;){var a=Ge;switch(a.tag){case 0:case 11:case 15:fa(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:en(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,Ge=l;else e:for(a=e;Ge!==null;){l=Ge;var n=l.sibling,s=l.return;if(go(l),l===a){Ge=null;break e}if(n!==null){n.return=s,Ge=n;break e}Ge=s}}}var j0={getCacheForType:function(e){var t=Ve(Me),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a}},S0=typeof WeakMap=="function"?WeakMap:Map,fe=0,ye=null,F=null,ae=0,oe=0,ut=null,ha=!1,Nl=!1,Ru=!1,Jt=0,Ae=0,ma=0,Qa=0,qu=0,jt=0,_l=0,bn=null,Pe=null,Cu=!1,Gu=0,zs=1/0,Os=null,ga=null,Le=0,xa=null,Tl=null,El=0,Bu=0,Xu=null,_o=null,jn=0,Hu=null;function ct(){if((fe&2)!==0&&ae!==0)return ae&-ae;if(U.T!==null){var e=ml;return e!==0?e:Ku()}return Xc()}function To(){jt===0&&(jt=(ae&536870912)===0||ue?qc():536870912);var e=bt.current;return e!==null&&(e.flags|=32),jt}function rt(e,t,a){(e===ye&&(oe===2||oe===9)||e.cancelPendingCommit!==null)&&(wl(e,0),ya(e,ae,jt,!1)),Bl(e,a),((fe&2)===0||e!==ye)&&(e===ye&&((fe&2)===0&&(Qa|=a),Ae===4&&ya(e,ae,jt,!1)),Rt(e))}function Eo(e,t,a){if((fe&6)!==0)throw Error(o(327));var l=!a&&(t&124)===0&&(t&e.expiredLanes)===0||Gl(e,t),n=l?_0(e,t):Yu(e,t,!0),s=l;do{if(n===0){Nl&&!l&&ya(e,t,0,!1);break}else{if(a=e.current.alternate,s&&!A0(a)){n=Yu(e,t,!1),s=!1;continue}if(n===2){if(s=t,e.errorRecoveryDisabledLanes&s)var u=0;else u=e.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){t=u;e:{var r=e;n=bn;var h=r.current.memoizedState.isDehydrated;if(h&&(wl(r,u).flags|=256),u=Yu(r,u,!1),u!==2){if(Ru&&!h){r.errorRecoveryDisabledLanes|=s,Qa|=s,n=4;break e}s=Pe,Pe=n,s!==null&&(Pe===null?Pe=s:Pe.push.apply(Pe,s))}n=u}if(s=!1,n!==2)continue}}if(n===1){wl(e,0),ya(e,t,0,!0);break}e:{switch(l=e,s=n,s){case 0:case 1:throw Error(o(345));case 4:if((t&4194048)!==t)break;case 6:ya(l,t,jt,!ha);break e;case 2:Pe=null;break;case 3:case 5:break;default:throw Error(o(329))}if((t&62914560)===t&&(n=Gu+300-Dt(),10<n)){if(ya(l,t,jt,!ha),Qn(l,0,!0)!==0)break e;l.timeoutHandle=ad(wo.bind(null,l,a,Pe,Os,Cu,t,jt,Qa,_l,ha,s,2,-0,0),n);break e}wo(l,a,Pe,Os,Cu,t,jt,Qa,_l,ha,s,0,-0,0)}}break}while(!0);Rt(e)}function wo(e,t,a,l,n,s,u,r,h,A,O,q,N,_){if(e.timeoutHandle=-1,q=t.subtreeFlags,(q&8192||(q&16785408)===16785408)&&(wn={stylesheets:null,count:0,unsuspend:nm},jo(t),q=im(),q!==null)){e.cancelPendingCommit=q(qo.bind(null,e,t,s,a,l,n,u,r,h,O,1,N,_)),ya(e,s,u,!A);return}qo(e,t,s,a,l,n,u,r,h)}function A0(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var n=a[l],s=n.getSnapshot;n=n.value;try{if(!lt(s(),n))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ya(e,t,a,l){t&=~qu,t&=~Qa,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var n=t;0<n;){var s=31-at(n),u=1<<s;l[s]=-1,n&=~u}a!==0&&Gc(e,a,t)}function Us(){return(fe&6)===0?(Sn(0),!1):!0}function Lu(){if(F!==null){if(oe===0)var e=F.return;else e=F,Lt=Ca=null,nu(e),bl=null,dn=0,e=F;for(;e!==null;)io(e.alternate,e),e=e.return;F=null}}function wl(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,L0(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Lu(),ye=e,F=a=Bt(e.current,null),ae=t,oe=0,ut=null,ha=!1,Nl=Gl(e,t),Ru=!1,_l=jt=qu=Qa=ma=Ae=0,Pe=bn=null,Cu=!1,(t&8)!==0&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var n=31-at(l),s=1<<n;t|=e[n],l&=~s}return Jt=t,es(),a}function Do(e,t){I=null,U.H=vs,t===an||t===rs?(t=Zr(),oe=3):t===Lr?(t=Zr(),oe=4):oe=t===Vf?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ut=t,F===null&&(Ae=1,Ns(e,xt(t,e.current)))}function zo(){var e=U.H;return U.H=vs,e===null?vs:e}function Oo(){var e=U.A;return U.A=j0,e}function Qu(){Ae=4,ha||(ae&4194048)!==ae&&bt.current!==null||(Nl=!0),(ma&134217727)===0&&(Qa&134217727)===0||ye===null||ya(ye,ae,jt,!1)}function Yu(e,t,a){var l=fe;fe|=2;var n=zo(),s=Oo();(ye!==e||ae!==t)&&(Os=null,wl(e,t)),t=!1;var u=Ae;e:do try{if(oe!==0&&F!==null){var r=F,h=ut;switch(oe){case 8:Lu(),u=6;break e;case 3:case 2:case 9:case 6:bt.current===null&&(t=!0);var A=oe;if(oe=0,ut=null,Dl(e,r,h,A),a&&Nl){u=0;break e}break;default:A=oe,oe=0,ut=null,Dl(e,r,h,A)}}N0(),u=Ae;break}catch(O){Do(e,O)}while(!0);return t&&e.shellSuspendCounter++,Lt=Ca=null,fe=l,U.H=n,U.A=s,F===null&&(ye=null,ae=0,es()),u}function N0(){for(;F!==null;)Uo(F)}function _0(e,t){var a=fe;fe|=2;var l=zo(),n=Oo();ye!==e||ae!==t?(Os=null,zs=Dt()+500,wl(e,t)):Nl=Gl(e,t);e:do try{if(oe!==0&&F!==null){t=F;var s=ut;t:switch(oe){case 1:oe=0,ut=null,Dl(e,t,s,1);break;case 2:case 9:if(Qr(s)){oe=0,ut=null,Mo(t);break}t=function(){oe!==2&&oe!==9||ye!==e||(oe=7),Rt(e)},s.then(t,t);break e;case 3:oe=7;break e;case 4:oe=5;break e;case 7:Qr(s)?(oe=0,ut=null,Mo(t)):(oe=0,ut=null,Dl(e,t,s,7));break;case 5:var u=null;switch(F.tag){case 26:u=F.memoizedState;case 5:case 27:var r=F;if(!u||md(u)){oe=0,ut=null;var h=r.sibling;if(h!==null)F=h;else{var A=r.return;A!==null?(F=A,Ms(A)):F=null}break t}}oe=0,ut=null,Dl(e,t,s,5);break;case 6:oe=0,ut=null,Dl(e,t,s,6);break;case 8:Lu(),Ae=6;break e;default:throw Error(o(462))}}T0();break}catch(O){Do(e,O)}while(!0);return Lt=Ca=null,U.H=l,U.A=n,fe=a,F!==null?0:(ye=null,ae=0,es(),Ae)}function T0(){for(;F!==null&&!ql();)Uo(F)}function Uo(e){var t=no(e.alternate,e,Jt);e.memoizedProps=e.pendingProps,t===null?Ms(e):F=t}function Mo(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Pf(a,t,t.pendingProps,t.type,void 0,ae);break;case 11:t=Pf(a,t,t.pendingProps,t.type.render,t.ref,ae);break;case 5:nu(t);default:io(a,t),t=F=Ur(t,Jt),t=no(a,t,Jt)}e.memoizedProps=e.pendingProps,t===null?Ms(e):F=t}function Dl(e,t,a,l){Lt=Ca=null,nu(t),bl=null,dn=0;var n=t.return;try{if(g0(e,n,t,a,ae)){Ae=1,Ns(e,xt(a,e.current)),F=null;return}}catch(s){if(n!==null)throw F=n,s;Ae=1,Ns(e,xt(a,e.current)),F=null;return}t.flags&32768?(ue||l===1?e=!0:Nl||(ae&536870912)!==0?e=!1:(ha=e=!0,(l===2||l===9||l===3||l===6)&&(l=bt.current,l!==null&&l.tag===13&&(l.flags|=16384))),Ro(t,e)):Ms(t)}function Ms(e){var t=e;do{if((t.flags&32768)!==0){Ro(t,ha);return}e=t.return;var a=y0(t.alternate,t,Jt);if(a!==null){F=a;return}if(t=t.sibling,t!==null){F=t;return}F=t=e}while(t!==null);Ae===0&&(Ae=5)}function Ro(e,t){do{var a=p0(e.alternate,e);if(a!==null){a.flags&=32767,F=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){F=e;return}F=e=a}while(e!==null);Ae=6,F=null}function qo(e,t,a,l,n,s,u,r,h){e.cancelPendingCommit=null;do Rs();while(Le!==0);if((fe&6)!==0)throw Error(o(327));if(t!==null){if(t===e.current)throw Error(o(177));if(s=t.lanes|t.childLanes,s|=Mi,nh(e,a,s,u,r,h),e===ye&&(F=ye=null,ae=0),Tl=t,xa=e,El=a,Bu=s,Xu=n,_o=l,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,z0(Xn,function(){return Ho(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||l){l=U.T,U.T=null,n=H.p,H.p=2,u=fe,fe|=4;try{v0(e,t,a)}finally{fe=u,H.p=n,U.T=l}}Le=1,Co(),Go(),Bo()}}function Co(){if(Le===1){Le=0;var e=xa,t=Tl,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=U.T,U.T=null;var l=H.p;H.p=2;var n=fe;fe|=4;try{po(t,e);var s=tc,u=Sr(e.containerInfo),r=s.focusedElem,h=s.selectionRange;if(u!==r&&r&&r.ownerDocument&&jr(r.ownerDocument.documentElement,r)){if(h!==null&&wi(r)){var A=h.start,O=h.end;if(O===void 0&&(O=A),"selectionStart"in r)r.selectionStart=A,r.selectionEnd=Math.min(O,r.value.length);else{var q=r.ownerDocument||document,N=q&&q.defaultView||window;if(N.getSelection){var _=N.getSelection(),K=r.textContent.length,Z=Math.min(h.start,K),ge=h.end===void 0?Z:Math.min(h.end,K);!_.extend&&Z>ge&&(u=ge,ge=Z,Z=u);var y=br(r,Z),g=br(r,ge);if(y&&g&&(_.rangeCount!==1||_.anchorNode!==y.node||_.anchorOffset!==y.offset||_.focusNode!==g.node||_.focusOffset!==g.offset)){var b=q.createRange();b.setStart(y.node,y.offset),_.removeAllRanges(),Z>ge?(_.addRange(b),_.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),_.addRange(b))}}}}for(q=[],_=r;_=_.parentNode;)_.nodeType===1&&q.push({element:_,left:_.scrollLeft,top:_.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<q.length;r++){var M=q[r];M.element.scrollLeft=M.left,M.element.scrollTop=M.top}}Vs=!!ec,tc=ec=null}finally{fe=n,H.p=l,U.T=a}}e.current=t,Le=2}}function Go(){if(Le===2){Le=0;var e=xa,t=Tl,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=U.T,U.T=null;var l=H.p;H.p=2;var n=fe;fe|=4;try{mo(e,t.alternate,t)}finally{fe=n,H.p=l,U.T=a}}Le=3}}function Bo(){if(Le===4||Le===3){Le=0,Jd();var e=xa,t=Tl,a=El,l=_o;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Le=5:(Le=0,Tl=xa=null,Xo(e,e.pendingLanes));var n=e.pendingLanes;if(n===0&&(ga=null),ui(a),t=t.stateNode,tt&&typeof tt.onCommitFiberRoot=="function")try{tt.onCommitFiberRoot(Cl,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=U.T,n=H.p,H.p=2,U.T=null;try{for(var s=e.onRecoverableError,u=0;u<l.length;u++){var r=l[u];s(r.value,{componentStack:r.stack})}}finally{U.T=t,H.p=n}}(El&3)!==0&&Rs(),Rt(e),n=e.pendingLanes,(a&4194090)!==0&&(n&42)!==0?e===Hu?jn++:(jn=0,Hu=e):jn=0,Sn(0)}}function Xo(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,en(t)))}function Rs(e){return Co(),Go(),Bo(),Ho()}function Ho(){if(Le!==5)return!1;var e=xa,t=Bu;Bu=0;var a=ui(El),l=U.T,n=H.p;try{H.p=32>a?32:a,U.T=null,a=Xu,Xu=null;var s=xa,u=El;if(Le=0,Tl=xa=null,El=0,(fe&6)!==0)throw Error(o(331));var r=fe;if(fe|=4,Ao(s.current),bo(s,s.current,u,a),fe=r,Sn(0,!1),tt&&typeof tt.onPostCommitFiberRoot=="function")try{tt.onPostCommitFiberRoot(Cl,s)}catch{}return!0}finally{H.p=n,U.T=l,Xo(e,t)}}function Lo(e,t,a){t=xt(a,t),t=pu(e.stateNode,t,2),e=ia(e,t,2),e!==null&&(Bl(e,2),Rt(e))}function xe(e,t,a){if(e.tag===3)Lo(e,e,a);else for(;t!==null;){if(t.tag===3){Lo(t,e,a);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(ga===null||!ga.has(l))){e=xt(a,e),a=Zf(2),l=ia(t,a,2),l!==null&&($f(a,l,t,e),Bl(l,2),Rt(l));break}}t=t.return}}function Zu(e,t,a){var l=e.pingCache;if(l===null){l=e.pingCache=new S0;var n=new Set;l.set(t,n)}else n=l.get(t),n===void 0&&(n=new Set,l.set(t,n));n.has(a)||(Ru=!0,n.add(a),e=E0.bind(null,e,t,a),t.then(e,e))}function E0(e,t,a){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,ye===e&&(ae&a)===a&&(Ae===4||Ae===3&&(ae&62914560)===ae&&300>Dt()-Gu?(fe&2)===0&&wl(e,0):qu|=a,_l===ae&&(_l=0)),Rt(e)}function Qo(e,t){t===0&&(t=Cc()),e=fl(e,t),e!==null&&(Bl(e,t),Rt(e))}function w0(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Qo(e,a)}function D0(e,t){var a=0;switch(e.tag){case 13:var l=e.stateNode,n=e.memoizedState;n!==null&&(a=n.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(o(314))}l!==null&&l.delete(t),Qo(e,a)}function z0(e,t){return _e(e,t)}var qs=null,zl=null,$u=!1,Cs=!1,Vu=!1,Ya=0;function Rt(e){e!==zl&&e.next===null&&(zl===null?qs=zl=e:zl=zl.next=e),Cs=!0,$u||($u=!0,U0())}function Sn(e,t){if(!Vu&&Cs){Vu=!0;do for(var a=!1,l=qs;l!==null;){if(e!==0){var n=l.pendingLanes;if(n===0)var s=0;else{var u=l.suspendedLanes,r=l.pingedLanes;s=(1<<31-at(42|e)+1)-1,s&=n&~(u&~r),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(a=!0,Vo(l,s))}else s=ae,s=Qn(l,l===ye?s:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(s&3)===0||Gl(l,s)||(a=!0,Vo(l,s));l=l.next}while(a);Vu=!1}}function O0(){Yo()}function Yo(){Cs=$u=!1;var e=0;Ya!==0&&(H0()&&(e=Ya),Ya=0);for(var t=Dt(),a=null,l=qs;l!==null;){var n=l.next,s=Zo(l,t);s===0?(l.next=null,a===null?qs=n:a.next=n,n===null&&(zl=a)):(a=l,(e!==0||(s&3)!==0)&&(Cs=!0)),l=n}Sn(e)}function Zo(e,t){for(var a=e.suspendedLanes,l=e.pingedLanes,n=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var u=31-at(s),r=1<<u,h=n[u];h===-1?((r&a)===0||(r&l)!==0)&&(n[u]=lh(r,t)):h<=t&&(e.expiredLanes|=r),s&=~r}if(t=ye,a=ae,a=Qn(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,a===0||e===t&&(oe===2||oe===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Ja(l),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Gl(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(l!==null&&Ja(l),ui(a)){case 2:case 8:a=Mc;break;case 32:a=Xn;break;case 268435456:a=Rc;break;default:a=Xn}return l=$o.bind(null,e),a=_e(a,l),e.callbackPriority=t,e.callbackNode=a,t}return l!==null&&l!==null&&Ja(l),e.callbackPriority=2,e.callbackNode=null,2}function $o(e,t){if(Le!==0&&Le!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Rs()&&e.callbackNode!==a)return null;var l=ae;return l=Qn(e,e===ye?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(Eo(e,l,t),Zo(e,Dt()),e.callbackNode!=null&&e.callbackNode===a?$o.bind(null,e):null)}function Vo(e,t){if(Rs())return null;Eo(e,t,!0)}function U0(){Q0(function(){(fe&6)!==0?_e(Uc,O0):Yo()})}function Ku(){return Ya===0&&(Ya=qc()),Ya}function Ko(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Kn(""+e)}function ko(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function M0(e,t,a,l,n){if(t==="submit"&&a&&a.stateNode===n){var s=Ko((n[ke]||null).action),u=l.submitter;u&&(t=(t=u[ke]||null)?Ko(t.formAction):u.getAttribute("formAction"),t!==null&&(s=t,u=null));var r=new Wn("action","action",null,l,n);e.push({event:r,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Ya!==0){var h=u?ko(n,u):new FormData(n);hu(a,{pending:!0,data:h,method:n.method,action:s},null,h)}}else typeof s=="function"&&(r.preventDefault(),h=u?ko(n,u):new FormData(n),hu(a,{pending:!0,data:h,method:n.method,action:s},s,h))},currentTarget:n}]})}}for(var ku=0;ku<Ui.length;ku++){var Ju=Ui[ku],R0=Ju.toLowerCase(),q0=Ju[0].toUpperCase()+Ju.slice(1);Nt(R0,"on"+q0)}Nt(_r,"onAnimationEnd"),Nt(Tr,"onAnimationIteration"),Nt(Er,"onAnimationStart"),Nt("dblclick","onDoubleClick"),Nt("focusin","onFocus"),Nt("focusout","onBlur"),Nt(Ph,"onTransitionRun"),Nt(Fh,"onTransitionStart"),Nt(e0,"onTransitionCancel"),Nt(wr,"onTransitionEnd"),el("onMouseEnter",["mouseout","mouseover"]),el("onMouseLeave",["mouseout","mouseover"]),el("onPointerEnter",["pointerout","pointerover"]),el("onPointerLeave",["pointerout","pointerover"]),Ea("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ea("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ea("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ea("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ea("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ea("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var An="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),C0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(An));function Jo(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var l=e[a],n=l.event;l=l.listeners;e:{var s=void 0;if(t)for(var u=l.length-1;0<=u;u--){var r=l[u],h=r.instance,A=r.currentTarget;if(r=r.listener,h!==s&&n.isPropagationStopped())break e;s=r,n.currentTarget=A;try{s(n)}catch(O){As(O)}n.currentTarget=null,s=h}else for(u=0;u<l.length;u++){if(r=l[u],h=r.instance,A=r.currentTarget,r=r.listener,h!==s&&n.isPropagationStopped())break e;s=r,n.currentTarget=A;try{s(n)}catch(O){As(O)}n.currentTarget=null,s=h}}}}function ee(e,t){var a=t[ci];a===void 0&&(a=t[ci]=new Set);var l=e+"__bubble";a.has(l)||(Io(t,e,2,!1),a.add(l))}function Iu(e,t,a){var l=0;t&&(l|=4),Io(a,e,l,t)}var Gs="_reactListening"+Math.random().toString(36).slice(2);function Wu(e){if(!e[Gs]){e[Gs]=!0,Lc.forEach(function(a){a!=="selectionchange"&&(C0.has(a)||Iu(a,!1,e),Iu(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Gs]||(t[Gs]=!0,Iu("selectionchange",!1,t))}}function Io(e,t,a,l){switch(bd(t)){case 2:var n=rm;break;case 8:n=fm;break;default:n=oc}a=n.bind(null,t,a,e),n=void 0,!vi||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),l?n!==void 0?e.addEventListener(t,a,{capture:!0,passive:n}):e.addEventListener(t,a,!0):n!==void 0?e.addEventListener(t,a,{passive:n}):e.addEventListener(t,a,!1)}function Pu(e,t,a,l,n){var s=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var u=l.tag;if(u===3||u===4){var r=l.stateNode.containerInfo;if(r===n)break;if(u===4)for(u=l.return;u!==null;){var h=u.tag;if((h===3||h===4)&&u.stateNode.containerInfo===n)return;u=u.return}for(;r!==null;){if(u=Wa(r),u===null)return;if(h=u.tag,h===5||h===6||h===26||h===27){l=s=u;continue e}r=r.parentNode}}l=l.return}tr(function(){var A=s,O=yi(a),q=[];e:{var N=Dr.get(e);if(N!==void 0){var _=Wn,K=e;switch(e){case"keypress":if(Jn(a)===0)break e;case"keydown":case"keyup":_=zh;break;case"focusin":K="focus",_=Ai;break;case"focusout":K="blur",_=Ai;break;case"beforeblur":case"afterblur":_=Ai;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=nr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=ph;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=Mh;break;case _r:case Tr:case Er:_=jh;break;case wr:_=qh;break;case"scroll":case"scrollend":_=xh;break;case"wheel":_=Gh;break;case"copy":case"cut":case"paste":_=Ah;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=ir;break;case"toggle":case"beforetoggle":_=Xh}var Z=(t&4)!==0,ge=!Z&&(e==="scroll"||e==="scrollend"),y=Z?N!==null?N+"Capture":null:N;Z=[];for(var g=A,b;g!==null;){var M=g;if(b=M.stateNode,M=M.tag,M!==5&&M!==26&&M!==27||b===null||y===null||(M=Ll(g,y),M!=null&&Z.push(Nn(g,M,b))),ge)break;g=g.return}0<Z.length&&(N=new _(N,K,null,a,O),q.push({event:N,listeners:Z}))}}if((t&7)===0){e:{if(N=e==="mouseover"||e==="pointerover",_=e==="mouseout"||e==="pointerout",N&&a!==xi&&(K=a.relatedTarget||a.fromElement)&&(Wa(K)||K[Ia]))break e;if((_||N)&&(N=O.window===O?O:(N=O.ownerDocument)?N.defaultView||N.parentWindow:window,_?(K=a.relatedTarget||a.toElement,_=A,K=K?Wa(K):null,K!==null&&(ge=S(K),Z=K.tag,K!==ge||Z!==5&&Z!==27&&Z!==6)&&(K=null)):(_=null,K=A),_!==K)){if(Z=nr,M="onMouseLeave",y="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(Z=ir,M="onPointerLeave",y="onPointerEnter",g="pointer"),ge=_==null?N:Hl(_),b=K==null?N:Hl(K),N=new Z(M,g+"leave",_,a,O),N.target=ge,N.relatedTarget=b,M=null,Wa(O)===A&&(Z=new Z(y,g+"enter",K,a,O),Z.target=b,Z.relatedTarget=ge,M=Z),ge=M,_&&K)t:{for(Z=_,y=K,g=0,b=Z;b;b=Ol(b))g++;for(b=0,M=y;M;M=Ol(M))b++;for(;0<g-b;)Z=Ol(Z),g--;for(;0<b-g;)y=Ol(y),b--;for(;g--;){if(Z===y||y!==null&&Z===y.alternate)break t;Z=Ol(Z),y=Ol(y)}Z=null}else Z=null;_!==null&&Wo(q,N,_,Z,!1),K!==null&&ge!==null&&Wo(q,ge,K,Z,!0)}}e:{if(N=A?Hl(A):window,_=N.nodeName&&N.nodeName.toLowerCase(),_==="select"||_==="input"&&N.type==="file")var L=mr;else if(dr(N))if(gr)L=Jh;else{L=Kh;var P=Vh}else _=N.nodeName,!_||_.toLowerCase()!=="input"||N.type!=="checkbox"&&N.type!=="radio"?A&&gi(A.elementType)&&(L=mr):L=kh;if(L&&(L=L(e,A))){hr(q,L,a,O);break e}P&&P(e,N,A),e==="focusout"&&A&&N.type==="number"&&A.memoizedProps.value!=null&&mi(N,"number",N.value)}switch(P=A?Hl(A):window,e){case"focusin":(dr(P)||P.contentEditable==="true")&&(ul=P,Di=A,Jl=null);break;case"focusout":Jl=Di=ul=null;break;case"mousedown":zi=!0;break;case"contextmenu":case"mouseup":case"dragend":zi=!1,Ar(q,a,O);break;case"selectionchange":if(Wh)break;case"keydown":case"keyup":Ar(q,a,O)}var Y;if(_i)e:{switch(e){case"compositionstart":var $="onCompositionStart";break e;case"compositionend":$="onCompositionEnd";break e;case"compositionupdate":$="onCompositionUpdate";break e}$=void 0}else il?fr(e,a)&&($="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&($="onCompositionStart");$&&(ur&&a.locale!=="ko"&&(il||$!=="onCompositionStart"?$==="onCompositionEnd"&&il&&(Y=ar()):(aa=O,bi="value"in aa?aa.value:aa.textContent,il=!0)),P=Bs(A,$),0<P.length&&($=new sr($,e,null,a,O),q.push({event:$,listeners:P}),Y?$.data=Y:(Y=or(a),Y!==null&&($.data=Y)))),(Y=Lh?Qh(e,a):Yh(e,a))&&($=Bs(A,"onBeforeInput"),0<$.length&&(P=new sr("onBeforeInput","beforeinput",null,a,O),q.push({event:P,listeners:$}),P.data=Y)),M0(q,e,A,a,O)}Jo(q,t)})}function Nn(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Bs(e,t){for(var a=t+"Capture",l=[];e!==null;){var n=e,s=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||s===null||(n=Ll(e,a),n!=null&&l.unshift(Nn(e,n,s)),n=Ll(e,t),n!=null&&l.push(Nn(e,n,s))),e.tag===3)return l;e=e.return}return[]}function Ol(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Wo(e,t,a,l,n){for(var s=t._reactName,u=[];a!==null&&a!==l;){var r=a,h=r.alternate,A=r.stateNode;if(r=r.tag,h!==null&&h===l)break;r!==5&&r!==26&&r!==27||A===null||(h=A,n?(A=Ll(a,s),A!=null&&u.unshift(Nn(a,A,h))):n||(A=Ll(a,s),A!=null&&u.push(Nn(a,A,h)))),a=a.return}u.length!==0&&e.push({event:t,listeners:u})}var G0=/\r\n?/g,B0=/\u0000|\uFFFD/g;function Po(e){return(typeof e=="string"?e:""+e).replace(G0,`
`).replace(B0,"")}function Fo(e,t){return t=Po(t),Po(e)===t}function Xs(){}function me(e,t,a,l,n,s){switch(a){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||ll(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&ll(e,""+l);break;case"className":Zn(e,"class",l);break;case"tabIndex":Zn(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Zn(e,a,l);break;case"style":Fc(e,l,s);break;case"data":if(t!=="object"){Zn(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Kn(""+l),e.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(a==="formAction"?(t!=="input"&&me(e,t,"name",n.name,n,null),me(e,t,"formEncType",n.formEncType,n,null),me(e,t,"formMethod",n.formMethod,n,null),me(e,t,"formTarget",n.formTarget,n,null)):(me(e,t,"encType",n.encType,n,null),me(e,t,"method",n.method,n,null),me(e,t,"target",n.target,n,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Kn(""+l),e.setAttribute(a,l);break;case"onClick":l!=null&&(e.onclick=Xs);break;case"onScroll":l!=null&&ee("scroll",e);break;case"onScrollEnd":l!=null&&ee("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(o(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(o(60));e.innerHTML=a}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}a=Kn(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""+l):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":l===!0?e.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,l):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(a,l):e.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(a):e.setAttribute(a,l);break;case"popover":ee("beforetoggle",e),ee("toggle",e),Yn(e,"popover",l);break;case"xlinkActuate":Ct(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Ct(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Ct(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Ct(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Ct(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Ct(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Ct(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Ct(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Ct(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Yn(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=mh.get(a)||a,Yn(e,a,l))}}function Fu(e,t,a,l,n,s){switch(a){case"style":Fc(e,l,s);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(o(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(o(60));e.innerHTML=a}}break;case"children":typeof l=="string"?ll(e,l):(typeof l=="number"||typeof l=="bigint")&&ll(e,""+l);break;case"onScroll":l!=null&&ee("scroll",e);break;case"onScrollEnd":l!=null&&ee("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Xs);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Qc.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),t=a.slice(2,n?a.length-7:void 0),s=e[ke]||null,s=s!=null?s[a]:null,typeof s=="function"&&e.removeEventListener(t,s,n),typeof l=="function")){typeof s!="function"&&s!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,l,n);break e}a in e?e[a]=l:l===!0?e.setAttribute(a,""):Yn(e,a,l)}}}function Qe(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ee("error",e),ee("load",e);var l=!1,n=!1,s;for(s in a)if(a.hasOwnProperty(s)){var u=a[s];if(u!=null)switch(s){case"src":l=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:me(e,t,s,u,a,null)}}n&&me(e,t,"srcSet",a.srcSet,a,null),l&&me(e,t,"src",a.src,a,null);return;case"input":ee("invalid",e);var r=s=u=n=null,h=null,A=null;for(l in a)if(a.hasOwnProperty(l)){var O=a[l];if(O!=null)switch(l){case"name":n=O;break;case"type":u=O;break;case"checked":h=O;break;case"defaultChecked":A=O;break;case"value":s=O;break;case"defaultValue":r=O;break;case"children":case"dangerouslySetInnerHTML":if(O!=null)throw Error(o(137,t));break;default:me(e,t,l,O,a,null)}}Jc(e,s,r,h,A,u,n,!1),$n(e);return;case"select":ee("invalid",e),l=u=s=null;for(n in a)if(a.hasOwnProperty(n)&&(r=a[n],r!=null))switch(n){case"value":s=r;break;case"defaultValue":u=r;break;case"multiple":l=r;default:me(e,t,n,r,a,null)}t=s,a=u,e.multiple=!!l,t!=null?al(e,!!l,t,!1):a!=null&&al(e,!!l,a,!0);return;case"textarea":ee("invalid",e),s=n=l=null;for(u in a)if(a.hasOwnProperty(u)&&(r=a[u],r!=null))switch(u){case"value":l=r;break;case"defaultValue":n=r;break;case"children":s=r;break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(o(91));break;default:me(e,t,u,r,a,null)}Wc(e,l,n,s),$n(e);return;case"option":for(h in a)if(a.hasOwnProperty(h)&&(l=a[h],l!=null))switch(h){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:me(e,t,h,l,a,null)}return;case"dialog":ee("beforetoggle",e),ee("toggle",e),ee("cancel",e),ee("close",e);break;case"iframe":case"object":ee("load",e);break;case"video":case"audio":for(l=0;l<An.length;l++)ee(An[l],e);break;case"image":ee("error",e),ee("load",e);break;case"details":ee("toggle",e);break;case"embed":case"source":case"link":ee("error",e),ee("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(A in a)if(a.hasOwnProperty(A)&&(l=a[A],l!=null))switch(A){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:me(e,t,A,l,a,null)}return;default:if(gi(t)){for(O in a)a.hasOwnProperty(O)&&(l=a[O],l!==void 0&&Fu(e,t,O,l,a,void 0));return}}for(r in a)a.hasOwnProperty(r)&&(l=a[r],l!=null&&me(e,t,r,l,a,null))}function X0(e,t,a,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,s=null,u=null,r=null,h=null,A=null,O=null;for(_ in a){var q=a[_];if(a.hasOwnProperty(_)&&q!=null)switch(_){case"checked":break;case"value":break;case"defaultValue":h=q;default:l.hasOwnProperty(_)||me(e,t,_,null,l,q)}}for(var N in l){var _=l[N];if(q=a[N],l.hasOwnProperty(N)&&(_!=null||q!=null))switch(N){case"type":s=_;break;case"name":n=_;break;case"checked":A=_;break;case"defaultChecked":O=_;break;case"value":u=_;break;case"defaultValue":r=_;break;case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(o(137,t));break;default:_!==q&&me(e,t,N,_,l,q)}}hi(e,u,r,h,A,O,s,n);return;case"select":_=u=r=N=null;for(s in a)if(h=a[s],a.hasOwnProperty(s)&&h!=null)switch(s){case"value":break;case"multiple":_=h;default:l.hasOwnProperty(s)||me(e,t,s,null,l,h)}for(n in l)if(s=l[n],h=a[n],l.hasOwnProperty(n)&&(s!=null||h!=null))switch(n){case"value":N=s;break;case"defaultValue":r=s;break;case"multiple":u=s;default:s!==h&&me(e,t,n,s,l,h)}t=r,a=u,l=_,N!=null?al(e,!!a,N,!1):!!l!=!!a&&(t!=null?al(e,!!a,t,!0):al(e,!!a,a?[]:"",!1));return;case"textarea":_=N=null;for(r in a)if(n=a[r],a.hasOwnProperty(r)&&n!=null&&!l.hasOwnProperty(r))switch(r){case"value":break;case"children":break;default:me(e,t,r,null,l,n)}for(u in l)if(n=l[u],s=a[u],l.hasOwnProperty(u)&&(n!=null||s!=null))switch(u){case"value":N=n;break;case"defaultValue":_=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(o(91));break;default:n!==s&&me(e,t,u,n,l,s)}Ic(e,N,_);return;case"option":for(var K in a)if(N=a[K],a.hasOwnProperty(K)&&N!=null&&!l.hasOwnProperty(K))switch(K){case"selected":e.selected=!1;break;default:me(e,t,K,null,l,N)}for(h in l)if(N=l[h],_=a[h],l.hasOwnProperty(h)&&N!==_&&(N!=null||_!=null))switch(h){case"selected":e.selected=N&&typeof N!="function"&&typeof N!="symbol";break;default:me(e,t,h,N,l,_)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Z in a)N=a[Z],a.hasOwnProperty(Z)&&N!=null&&!l.hasOwnProperty(Z)&&me(e,t,Z,null,l,N);for(A in l)if(N=l[A],_=a[A],l.hasOwnProperty(A)&&N!==_&&(N!=null||_!=null))switch(A){case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(o(137,t));break;default:me(e,t,A,N,l,_)}return;default:if(gi(t)){for(var ge in a)N=a[ge],a.hasOwnProperty(ge)&&N!==void 0&&!l.hasOwnProperty(ge)&&Fu(e,t,ge,void 0,l,N);for(O in l)N=l[O],_=a[O],!l.hasOwnProperty(O)||N===_||N===void 0&&_===void 0||Fu(e,t,O,N,l,_);return}}for(var y in a)N=a[y],a.hasOwnProperty(y)&&N!=null&&!l.hasOwnProperty(y)&&me(e,t,y,null,l,N);for(q in l)N=l[q],_=a[q],!l.hasOwnProperty(q)||N===_||N==null&&_==null||me(e,t,q,N,l,_)}var ec=null,tc=null;function Hs(e){return e.nodeType===9?e:e.ownerDocument}function ed(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function td(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function ac(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var lc=null;function H0(){var e=window.event;return e&&e.type==="popstate"?e===lc?!1:(lc=e,!0):(lc=null,!1)}var ad=typeof setTimeout=="function"?setTimeout:void 0,L0=typeof clearTimeout=="function"?clearTimeout:void 0,ld=typeof Promise=="function"?Promise:void 0,Q0=typeof queueMicrotask=="function"?queueMicrotask:typeof ld<"u"?function(e){return ld.resolve(null).then(e).catch(Y0)}:ad;function Y0(e){setTimeout(function(){throw e})}function pa(e){return e==="head"}function nd(e,t){var a=t,l=0,n=0;do{var s=a.nextSibling;if(e.removeChild(a),s&&s.nodeType===8)if(a=s.data,a==="/$"){if(0<l&&8>l){a=l;var u=e.ownerDocument;if(a&1&&_n(u.documentElement),a&2&&_n(u.body),a&4)for(a=u.head,_n(a),u=a.firstChild;u;){var r=u.nextSibling,h=u.nodeName;u[Xl]||h==="SCRIPT"||h==="STYLE"||h==="LINK"&&u.rel.toLowerCase()==="stylesheet"||a.removeChild(u),u=r}}if(n===0){e.removeChild(s),Mn(t);return}n--}else a==="$"||a==="$?"||a==="$!"?n++:l=a.charCodeAt(0)-48;else l=0;a=s}while(a);Mn(t)}function nc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":nc(a),ri(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Z0(e,t,a,l){for(;e.nodeType===1;){var n=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Xl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==n.rel||e.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||e.getAttribute("title")!==(n.title==null?null:n.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(n.src==null?null:n.src)||e.getAttribute("type")!==(n.type==null?null:n.type)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=n.name==null?null:""+n.name;if(n.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=Tt(e.nextSibling),e===null)break}return null}function $0(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Tt(e.nextSibling),e===null))return null;return e}function sc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function V0(e,t){var a=e.ownerDocument;if(e.data!=="$?"||a.readyState==="complete")t();else{var l=function(){t(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Tt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var ic=null;function sd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}function id(e,t,a){switch(t=Hs(a),e){case"html":if(e=t.documentElement,!e)throw Error(o(452));return e;case"head":if(e=t.head,!e)throw Error(o(453));return e;case"body":if(e=t.body,!e)throw Error(o(454));return e;default:throw Error(o(451))}}function _n(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ri(e)}var St=new Map,ud=new Set;function Ls(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var It=H.d;H.d={f:K0,r:k0,D:J0,C:I0,L:W0,m:P0,X:em,S:F0,M:tm};function K0(){var e=It.f(),t=Us();return e||t}function k0(e){var t=Pa(e);t!==null&&t.tag===5&&t.type==="form"?Tf(t):It.r(e)}var Ul=typeof document>"u"?null:document;function cd(e,t,a){var l=Ul;if(l&&typeof t=="string"&&t){var n=gt(t);n='link[rel="'+e+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),ud.has(n)||(ud.add(n),e={rel:e,crossOrigin:a,href:t},l.querySelector(n)===null&&(t=l.createElement("link"),Qe(t,"link",e),qe(t),l.head.appendChild(t)))}}function J0(e){It.D(e),cd("dns-prefetch",e,null)}function I0(e,t){It.C(e,t),cd("preconnect",e,t)}function W0(e,t,a){It.L(e,t,a);var l=Ul;if(l&&e&&t){var n='link[rel="preload"][as="'+gt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+gt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+gt(a.imageSizes)+'"]')):n+='[href="'+gt(e)+'"]';var s=n;switch(t){case"style":s=Ml(e);break;case"script":s=Rl(e)}St.has(s)||(e=R({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),St.set(s,e),l.querySelector(n)!==null||t==="style"&&l.querySelector(Tn(s))||t==="script"&&l.querySelector(En(s))||(t=l.createElement("link"),Qe(t,"link",e),qe(t),l.head.appendChild(t)))}}function P0(e,t){It.m(e,t);var a=Ul;if(a&&e){var l=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+gt(l)+'"][href="'+gt(e)+'"]',s=n;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Rl(e)}if(!St.has(s)&&(e=R({rel:"modulepreload",href:e},t),St.set(s,e),a.querySelector(n)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(En(s)))return}l=a.createElement("link"),Qe(l,"link",e),qe(l),a.head.appendChild(l)}}}function F0(e,t,a){It.S(e,t,a);var l=Ul;if(l&&e){var n=Fa(l).hoistableStyles,s=Ml(e);t=t||"default";var u=n.get(s);if(!u){var r={loading:0,preload:null};if(u=l.querySelector(Tn(s)))r.loading=5;else{e=R({rel:"stylesheet",href:e,"data-precedence":t},a),(a=St.get(s))&&uc(e,a);var h=u=l.createElement("link");qe(h),Qe(h,"link",e),h._p=new Promise(function(A,O){h.onload=A,h.onerror=O}),h.addEventListener("load",function(){r.loading|=1}),h.addEventListener("error",function(){r.loading|=2}),r.loading|=4,Qs(u,t,l)}u={type:"stylesheet",instance:u,count:1,state:r},n.set(s,u)}}}function em(e,t){It.X(e,t);var a=Ul;if(a&&e){var l=Fa(a).hoistableScripts,n=Rl(e),s=l.get(n);s||(s=a.querySelector(En(n)),s||(e=R({src:e,async:!0},t),(t=St.get(n))&&cc(e,t),s=a.createElement("script"),qe(s),Qe(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},l.set(n,s))}}function tm(e,t){It.M(e,t);var a=Ul;if(a&&e){var l=Fa(a).hoistableScripts,n=Rl(e),s=l.get(n);s||(s=a.querySelector(En(n)),s||(e=R({src:e,async:!0,type:"module"},t),(t=St.get(n))&&cc(e,t),s=a.createElement("script"),qe(s),Qe(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},l.set(n,s))}}function rd(e,t,a,l){var n=(n=Et.current)?Ls(n):null;if(!n)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Ml(a.href),a=Fa(n).hoistableStyles,l=a.get(t),l||(l={type:"style",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Ml(a.href);var s=Fa(n).hoistableStyles,u=s.get(e);if(u||(n=n.ownerDocument||n,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,u),(s=n.querySelector(Tn(e)))&&!s._p&&(u.instance=s,u.state.loading=5),St.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},St.set(e,a),s||am(n,e,a,u.state))),t&&l===null)throw Error(o(528,""));return u}if(t&&l!==null)throw Error(o(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Rl(a),a=Fa(n).hoistableScripts,l=a.get(t),l||(l={type:"script",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function Ml(e){return'href="'+gt(e)+'"'}function Tn(e){return'link[rel="stylesheet"]['+e+"]"}function fd(e){return R({},e,{"data-precedence":e.precedence,precedence:null})}function am(e,t,a,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),Qe(t,"link",a),qe(t),e.head.appendChild(t))}function Rl(e){return'[src="'+gt(e)+'"]'}function En(e){return"script[async]"+e}function od(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+gt(a.href)+'"]');if(l)return t.instance=l,qe(l),l;var n=R({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),qe(l),Qe(l,"style",n),Qs(l,a.precedence,e),t.instance=l;case"stylesheet":n=Ml(a.href);var s=e.querySelector(Tn(n));if(s)return t.state.loading|=4,t.instance=s,qe(s),s;l=fd(a),(n=St.get(n))&&uc(l,n),s=(e.ownerDocument||e).createElement("link"),qe(s);var u=s;return u._p=new Promise(function(r,h){u.onload=r,u.onerror=h}),Qe(s,"link",l),t.state.loading|=4,Qs(s,a.precedence,e),t.instance=s;case"script":return s=Rl(a.src),(n=e.querySelector(En(s)))?(t.instance=n,qe(n),n):(l=a,(n=St.get(s))&&(l=R({},a),cc(l,n)),e=e.ownerDocument||e,n=e.createElement("script"),qe(n),Qe(n,"link",l),e.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(o(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(l=t.instance,t.state.loading|=4,Qs(l,a.precedence,e));return t.instance}function Qs(e,t,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=l.length?l[l.length-1]:null,s=n,u=0;u<l.length;u++){var r=l[u];if(r.dataset.precedence===t)s=r;else if(s!==n)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function uc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function cc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Ys=null;function dd(e,t,a){if(Ys===null){var l=new Map,n=Ys=new Map;n.set(a,l)}else n=Ys,l=n.get(a),l||(l=new Map,n.set(a,l));if(l.has(e))return l;for(l.set(e,null),a=a.getElementsByTagName(e),n=0;n<a.length;n++){var s=a[n];if(!(s[Xl]||s[$e]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var u=s.getAttribute(t)||"";u=e+u;var r=l.get(u);r?r.push(s):l.set(u,[s])}}return l}function hd(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function lm(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function md(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var wn=null;function nm(){}function sm(e,t,a){if(wn===null)throw Error(o(475));var l=wn;if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var n=Ml(a.href),s=e.querySelector(Tn(n));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(l.count++,l=Zs.bind(l),e.then(l,l)),t.state.loading|=4,t.instance=s,qe(s);return}s=e.ownerDocument||e,a=fd(a),(n=St.get(n))&&uc(a,n),s=s.createElement("link"),qe(s);var u=s;u._p=new Promise(function(r,h){u.onload=r,u.onerror=h}),Qe(s,"link",a),t.instance=s}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(l.count++,t=Zs.bind(l),e.addEventListener("load",t),e.addEventListener("error",t))}}function im(){if(wn===null)throw Error(o(475));var e=wn;return e.stylesheets&&e.count===0&&rc(e,e.stylesheets),0<e.count?function(t){var a=setTimeout(function(){if(e.stylesheets&&rc(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a)}}:null}function Zs(){if(this.count--,this.count===0){if(this.stylesheets)rc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var $s=null;function rc(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,$s=new Map,t.forEach(um,e),$s=null,Zs.call(e))}function um(e,t){if(!(t.state.loading&4)){var a=$s.get(e);if(a)var l=a.get(null);else{a=new Map,$s.set(e,a);for(var n=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<n.length;s++){var u=n[s];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(a.set(u.dataset.precedence,u),l=u)}l&&a.set(null,l)}n=t.instance,u=n.getAttribute("data-precedence"),s=a.get(u)||l,s===l&&a.set(null,n),a.set(u,n),this.count++,l=Zs.bind(this),n.addEventListener("load",l),n.addEventListener("error",l),s?s.parentNode.insertBefore(n,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(n,e.firstChild)),t.state.loading|=4}}var Dn={$$typeof:te,Provider:null,Consumer:null,_currentValue:V,_currentValue2:V,_threadCount:0};function cm(e,t,a,l,n,s,u,r){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=si(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=si(0),this.hiddenUpdates=si(null),this.identifierPrefix=l,this.onUncaughtError=n,this.onCaughtError=s,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=r,this.incompleteTransitions=new Map}function gd(e,t,a,l,n,s,u,r,h,A,O,q){return e=new cm(e,t,a,u,r,h,A,q),t=1,s===!0&&(t|=24),s=nt(3,null,null,t),e.current=s,s.stateNode=e,t=Zi(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:l,isDehydrated:a,cache:t},ki(s),e}function xd(e){return e?(e=ol,e):ol}function yd(e,t,a,l,n,s){n=xd(n),l.context===null?l.context=n:l.pendingContext=n,l=sa(t),l.payload={element:a},s=s===void 0?null:s,s!==null&&(l.callback=s),a=ia(e,l,t),a!==null&&(rt(a,e,t),nn(a,e,t))}function pd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function fc(e,t){pd(e,t),(e=e.alternate)&&pd(e,t)}function vd(e){if(e.tag===13){var t=fl(e,67108864);t!==null&&rt(t,e,67108864),fc(e,67108864)}}var Vs=!0;function rm(e,t,a,l){var n=U.T;U.T=null;var s=H.p;try{H.p=2,oc(e,t,a,l)}finally{H.p=s,U.T=n}}function fm(e,t,a,l){var n=U.T;U.T=null;var s=H.p;try{H.p=8,oc(e,t,a,l)}finally{H.p=s,U.T=n}}function oc(e,t,a,l){if(Vs){var n=dc(l);if(n===null)Pu(e,t,l,Ks,a),jd(e,l);else if(dm(n,e,t,a,l))l.stopPropagation();else if(jd(e,l),t&4&&-1<om.indexOf(e)){for(;n!==null;){var s=Pa(n);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var u=Ta(s.pendingLanes);if(u!==0){var r=s;for(r.pendingLanes|=2,r.entangledLanes|=2;u;){var h=1<<31-at(u);r.entanglements[1]|=h,u&=~h}Rt(s),(fe&6)===0&&(zs=Dt()+500,Sn(0))}}break;case 13:r=fl(s,2),r!==null&&rt(r,s,2),Us(),fc(s,2)}if(s=dc(l),s===null&&Pu(e,t,l,Ks,a),s===n)break;n=s}n!==null&&l.stopPropagation()}else Pu(e,t,l,null,a)}}function dc(e){return e=yi(e),hc(e)}var Ks=null;function hc(e){if(Ks=null,e=Wa(e),e!==null){var t=S(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=p(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ks=e,null}function bd(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Id()){case Uc:return 2;case Mc:return 8;case Xn:case Wd:return 32;case Rc:return 268435456;default:return 32}default:return 32}}var mc=!1,va=null,ba=null,ja=null,zn=new Map,On=new Map,Sa=[],om="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function jd(e,t){switch(e){case"focusin":case"focusout":va=null;break;case"dragenter":case"dragleave":ba=null;break;case"mouseover":case"mouseout":ja=null;break;case"pointerover":case"pointerout":zn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":On.delete(t.pointerId)}}function Un(e,t,a,l,n,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:a,eventSystemFlags:l,nativeEvent:s,targetContainers:[n]},t!==null&&(t=Pa(t),t!==null&&vd(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),e)}function dm(e,t,a,l,n){switch(t){case"focusin":return va=Un(va,e,t,a,l,n),!0;case"dragenter":return ba=Un(ba,e,t,a,l,n),!0;case"mouseover":return ja=Un(ja,e,t,a,l,n),!0;case"pointerover":var s=n.pointerId;return zn.set(s,Un(zn.get(s)||null,e,t,a,l,n)),!0;case"gotpointercapture":return s=n.pointerId,On.set(s,Un(On.get(s)||null,e,t,a,l,n)),!0}return!1}function Sd(e){var t=Wa(e.target);if(t!==null){var a=S(t);if(a!==null){if(t=a.tag,t===13){if(t=p(a),t!==null){e.blockedOn=t,sh(e.priority,function(){if(a.tag===13){var l=ct();l=ii(l);var n=fl(a,l);n!==null&&rt(n,a,l),fc(a,l)}});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ks(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=dc(e.nativeEvent);if(a===null){a=e.nativeEvent;var l=new a.constructor(a.type,a);xi=l,a.target.dispatchEvent(l),xi=null}else return t=Pa(a),t!==null&&vd(t),e.blockedOn=a,!1;t.shift()}return!0}function Ad(e,t,a){ks(e)&&a.delete(t)}function hm(){mc=!1,va!==null&&ks(va)&&(va=null),ba!==null&&ks(ba)&&(ba=null),ja!==null&&ks(ja)&&(ja=null),zn.forEach(Ad),On.forEach(Ad)}function Js(e,t){e.blockedOn===t&&(e.blockedOn=null,mc||(mc=!0,c.unstable_scheduleCallback(c.unstable_NormalPriority,hm)))}var Is=null;function Nd(e){Is!==e&&(Is=e,c.unstable_scheduleCallback(c.unstable_NormalPriority,function(){Is===e&&(Is=null);for(var t=0;t<e.length;t+=3){var a=e[t],l=e[t+1],n=e[t+2];if(typeof l!="function"){if(hc(l||a)===null)continue;break}var s=Pa(a);s!==null&&(e.splice(t,3),t-=3,hu(s,{pending:!0,data:n,method:a.method,action:l},l,n))}}))}function Mn(e){function t(h){return Js(h,e)}va!==null&&Js(va,e),ba!==null&&Js(ba,e),ja!==null&&Js(ja,e),zn.forEach(t),On.forEach(t);for(var a=0;a<Sa.length;a++){var l=Sa[a];l.blockedOn===e&&(l.blockedOn=null)}for(;0<Sa.length&&(a=Sa[0],a.blockedOn===null);)Sd(a),a.blockedOn===null&&Sa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var n=a[l],s=a[l+1],u=n[ke]||null;if(typeof s=="function")u||Nd(a);else if(u){var r=null;if(s&&s.hasAttribute("formAction")){if(n=s,u=s[ke]||null)r=u.formAction;else if(hc(n)!==null)continue}else r=u.action;typeof r=="function"?a[l+1]=r:(a.splice(l,3),l-=3),Nd(a)}}}function gc(e){this._internalRoot=e}Ws.prototype.render=gc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));var a=t.current,l=ct();yd(a,l,e,t,null,null)},Ws.prototype.unmount=gc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;yd(e.current,2,null,e,null,null),Us(),t[Ia]=null}};function Ws(e){this._internalRoot=e}Ws.prototype.unstable_scheduleHydration=function(e){if(e){var t=Xc();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Sa.length&&t!==0&&t<Sa[a].priority;a++);Sa.splice(a,0,e),a===0&&Sd(e)}};var _d=f.version;if(_d!=="19.1.0")throw Error(o(527,_d,"19.1.0"));H.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=D(t),e=e!==null?z(e):null,e=e===null?null:e.stateNode,e};var mm={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:U,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ps=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ps.isDisabled&&Ps.supportsFiber)try{Cl=Ps.inject(mm),tt=Ps}catch{}}return Rn.createRoot=function(e,t){if(!m(e))throw Error(o(299));var a=!1,l="",n=Hf,s=Lf,u=Qf,r=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(u=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(r=t.unstable_transitionCallbacks)),t=gd(e,1,!1,null,null,a,l,n,s,u,r,null),e[Ia]=t.current,Wu(e),new gc(t)},Rn.hydrateRoot=function(e,t,a){if(!m(e))throw Error(o(299));var l=!1,n="",s=Hf,u=Lf,r=Qf,h=null,A=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(s=a.onUncaughtError),a.onCaughtError!==void 0&&(u=a.onCaughtError),a.onRecoverableError!==void 0&&(r=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(h=a.unstable_transitionCallbacks),a.formState!==void 0&&(A=a.formState)),t=gd(e,1,!0,t,a??null,l,n,s,u,r,h,A),t.context=xd(null),a=t.current,l=ct(),l=ii(l),n=sa(l),n.callback=null,ia(a,n,l),a=l,t.current.lanes=a,Bl(t,a),Rt(t),e[Ia]=t.current,Wu(e),new Ws(t)},Rn.version="19.1.0",Rn}var Od;function Km(){if(Od)return xc.exports;Od=1;function c(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)}catch(f){console.error(f)}}return c(),xc.exports=Vm(),xc.exports}var km=Km();class Cn extends Error{}Cn.prototype.name="InvalidTokenError";function Jm(c){return decodeURIComponent(atob(c).replace(/(.)/g,(f,d)=>{let o=d.charCodeAt(0).toString(16).toUpperCase();return o.length<2&&(o="0"+o),"%"+o}))}function Im(c){let f=c.replace(/-/g,"+").replace(/_/g,"/");switch(f.length%4){case 0:break;case 2:f+="==";break;case 3:f+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return Jm(f)}catch{return atob(f)}}function Hd(c,f){if(typeof c!="string")throw new Cn("Invalid token specified: must be a string");f||(f={});const d=f.header===!0?0:1,o=c.split(".")[d];if(typeof o!="string")throw new Cn(`Invalid token specified: missing part #${d+1}`);let m;try{m=Im(o)}catch(S){throw new Cn(`Invalid token specified: invalid base64 for part #${d+1} (${S.message})`)}try{return JSON.parse(m)}catch(S){throw new Cn(`Invalid token specified: invalid json for part #${d+1} (${S.message})`)}}const Ld="https://learn.reboot01.com/api",Wm=`${Ld}/auth/signin`,Pm=`${Ld}/graphql-engine/v1/graphql`,_c="reboot01_jwt_token",Tc="reboot01_user_data",Fm=(c,f)=>{const d=`${c}:${f}`;return btoa(d)},eg=async(c,f)=>{try{const d=Fm(c,f),o=await fetch(Wm,{method:"POST",headers:{Authorization:`Basic ${d}`,"Content-Type":"application/json"}});if(!o.ok)throw o.status===401?new Error("Invalid credentials. Please check your username/email and password."):o.status===403?new Error("Access forbidden. Please contact support."):o.status>=500?new Error("Server error. Please try again later."):new Error(`Authentication failed: ${o.statusText}`);const m=await o.text();if(!m||m.trim()==="")throw new Error("No token received from server");const S=m.trim().replace(/^["']|["']$/g,"");if(!S.includes(".")||S.split(".").length!==3)throw console.error("Invalid token format. Token:",S.substring(0,50)+"..."),new Error("Invalid token format received from server");if(!wc(S))throw console.error("Token failed format validation"),new Error("Token format validation failed");const p=Hd(S),j={id:p.sub,username:p.username||c,email:p.email,exp:p.exp,iat:p.iat};return{token:S,user:j}}catch(d){throw d.name==="InvalidTokenError"?new Error("Invalid token received from server"):d}},tg=(c,f)=>{localStorage.setItem(_c,c),localStorage.setItem(Tc,JSON.stringify(f))},Ec=()=>localStorage.getItem(_c),ag=()=>{const c=localStorage.getItem(Tc);return c?JSON.parse(c):null},wc=c=>{if(!c||typeof c!="string")return!1;const f=c.split(".");if(f.length!==3)return!1;try{return f.forEach(d=>{if(!d)throw new Error("Empty part");if(!/^[A-Za-z0-9_-]+$/.test(d))throw new Error("Invalid characters")}),!0}catch{return!1}},Qd=c=>{try{if(!wc(c))return!0;const f=Hd(c),d=Date.now()/1e3;return f.exp<d}catch(f){return console.warn("Token validation error:",f.message),!0}},lg=()=>{const c=Ec();return c?!Qd(c):!1},Za=()=>{localStorage.removeItem(_c),localStorage.removeItem(Tc)},ng=()=>{const c=Ec();return!c||!wc(c)||Qd(c)?(c&&(console.warn("Clearing invalid or expired token"),Za()),{}):{Authorization:`Bearer ${c}`}},sg=c=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c),ig=c=>sg(c)?"email":"username",Fe={LOGIN_START:"LOGIN_START",LOGIN_SUCCESS:"LOGIN_SUCCESS",LOGIN_FAILURE:"LOGIN_FAILURE",LOGOUT:"LOGOUT",RESTORE_SESSION:"RESTORE_SESSION",CLEAR_ERROR:"CLEAR_ERROR"},ug={user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!1},cg=(c,f)=>{switch(f.type){case Fe.LOGIN_START:return{...c,isLoading:!0,error:null};case Fe.LOGIN_SUCCESS:return{...c,user:f.payload.user,token:f.payload.token,isAuthenticated:!0,isLoading:!1,error:null,isInitialized:!0};case Fe.LOGIN_FAILURE:return{...c,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:f.payload.error,isInitialized:!0};case Fe.LOGOUT:return{...c,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!0};case Fe.RESTORE_SESSION:return{...c,user:f.payload.user,token:f.payload.token,isAuthenticated:f.payload.isAuthenticated,isInitialized:!0};case Fe.CLEAR_ERROR:return{...c,error:null};default:return c}},Yd=W.createContext(null),rg=({children:c})=>{const[f,d]=W.useReducer(cg,ug);W.useEffect(()=>{(()=>{try{const D=Ec(),z=ag();D&&z&&lg()?d({type:Fe.RESTORE_SESSION,payload:{user:z,token:D,isAuthenticated:!0}}):(Za(),d({type:Fe.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}}))}catch(D){console.warn("Session restoration error:",D.message),Za(),d({type:Fe.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}})}})()},[]);const o=async(j,D)=>{d({type:Fe.LOGIN_START});try{const{token:z,user:R}=await eg(j,D);return tg(z,R),d({type:Fe.LOGIN_SUCCESS,payload:{user:R,token:z}}),{success:!0}}catch(z){return d({type:Fe.LOGIN_FAILURE,payload:{error:z.message}}),{success:!1,error:z.message}}},m=()=>{Za(),d({type:Fe.LOGOUT})},S=()=>{d({type:Fe.CLEAR_ERROR})},p={user:f.user,token:f.token,isAuthenticated:f.isAuthenticated,isLoading:f.isLoading,error:f.error,isInitialized:f.isInitialized,login:o,logout:m,clearError:S};return i.jsx(Yd.Provider,{value:p,children:c})},et=()=>{const c=W.useContext(Yd);if(!c)throw new Error("useAuth must be used within an AuthProvider");return c};function Zd(c){return new Ac(function(f,d){var o=pm(f,[]);return new Md(function(m){var S,p=!1;return Promise.resolve(o).then(function(j){return c(j,f.getContext())}).then(f.setContext).then(function(){p||(S=d(f).subscribe({next:m.next.bind(m),error:m.error.bind(m),complete:m.complete.bind(m)}))}).catch(m.error.bind(m)),function(){p=!0,S&&S.unsubscribe()}})})}function $d(c){return new Ac(function(f,d){return new Md(function(o){var m,S,p;try{m=d(f).subscribe({next:function(j){if(j.errors?p=c({graphQLErrors:j.errors,response:j,operation:f,forward:d}):vm(j)&&(p=c({protocolErrors:j.extensions[bm],response:j,operation:f,forward:d})),p){S=p.subscribe({next:o.next.bind(o),error:o.error.bind(o),complete:o.complete.bind(o)});return}o.next(j)},error:function(j){if(p=c({operation:f,networkError:j,graphQLErrors:j&&j.result&&j.result.errors||void 0,forward:d}),p){S=p.subscribe({next:o.next.bind(o),error:o.error.bind(o),complete:o.complete.bind(o)});return}o.error(j)},complete:function(){p||o.complete.bind(o)()}})}catch(j){c({networkError:j,operation:f,forward:d}),o.error(j)}return function(){m&&m.unsubscribe(),S&&m.unsubscribe()}})})}(function(c){jm(f,c);function f(d){var o=c.call(this)||this;return o.link=$d(d),o}return f.prototype.request=function(d,o){return this.link.request(d,o)},f})(Ac);const fg=()=>new Sm({typePolicies:{Query:{fields:{user:{merge(c,f){return f}},transaction:{keyArgs:["where","order_by"],merge(c=[],f,{args:d}){return d?.offset&&d.offset>0?[...c,...f]:f}},progress:{keyArgs:["where","order_by"],merge(c=[],f,{args:d}){return d?.offset&&d.offset>0?[...c,...f]:f}},result:{keyArgs:["where","order_by"],merge(c=[],f,{args:d}){return d?.offset&&d.offset>0?[...c,...f]:f}},audit:{keyArgs:["where","order_by"],merge(c=[],f,{args:d}){return d?.offset&&d.offset>0?[...c,...f]:f}},event:{keyArgs:["where","order_by"],merge(c=[],f,{args:d}){return d?.offset&&d.offset>0?[...c,...f]:f}},group:{keyArgs:["where","order_by"],merge(c=[],f,{args:d}){return d?.offset&&d.offset>0?[...c,...f]:f}}}},User:{fields:{transactions:{merge(c,f){return f}},results:{merge(c,f){return f}},progresses:{merge(c,f){return f}}}},transaction_aggregate:{merge:!0},result_aggregate:{merge:!0},progress_aggregate:{merge:!0},audit_aggregate:{merge:!0}},possibleTypes:{},dataIdFromObject:c=>{switch(c.__typename){case"User":return`User:${c.id}`;case"Transaction":return`Transaction:${c.id}`;case"Result":return`Result:${c.id}`;case"Progress":return`Progress:${c.id}`;case"Audit":return`Audit:${c.id}`;case"Event":return`Event:${c.id}`;case"Group":return`Group:${c.id}`;case"Object":return`Object:${c.id}`;default:return null}}});class og{constructor(){this.metrics=new Map,this.slowQueryThreshold=1e3}startQuery(f,d){const o=`${f}_${Date.now()}_${Math.random()}`;return this.metrics.set(o,{queryName:f,variables:d,startTime:performance.now(),endTime:null,duration:null,error:null}),o}endQuery(f,d=null){const o=this.metrics.get(f);if(o&&(o.endTime=performance.now(),o.duration=o.endTime-o.startTime,o.error=d,o.duration>this.slowQueryThreshold&&console.warn("Slow GraphQL query detected:",{queryName:o.queryName,duration:`${o.duration.toFixed(2)}ms`,variables:o.variables}),this.metrics.size>100)){const m=this.metrics.keys().next().value;this.metrics.delete(m)}}getStats(){const f=Array.from(this.metrics.values()).filter(m=>m.duration!==null);if(f.length===0)return{totalQueries:0,averageDuration:0,slowQueries:0};const d=f.reduce((m,S)=>m+S.duration,0),o=f.filter(m=>m.duration>this.slowQueryThreshold).length;return{totalQueries:f.length,averageDuration:d/f.length,slowQueries:o,slowQueryPercentage:o/f.length*100}}}const jc=new og,dg=Am({uri:Pm}),hg=Zd((c,{headers:f})=>{const d=ng();return{headers:{...f,...d,"Content-Type":"application/json"}}}),mg=Zd((c,{headers:f})=>{const d=jc.startQuery("GraphQL Query",{});return{headers:f,queryId:d}}),gg=$d(({graphQLErrors:c,networkError:f,operation:d})=>{const o=d.getContext().queryId;if(c&&c.forEach(({message:m,locations:S,path:p,extensions:j})=>{if(console.error(`[GraphQL error]: Message: ${m}, Location: ${S}, Path: ${p}`),o&&jc.endQuery(o,m),m.includes("JWT")||m.includes("JWS")||m.includes("verify")){console.warn("JWT verification error detected, clearing auth data"),Za();return}if(j?.code==="UNAUTHENTICATED"||j?.code==="FORBIDDEN"){console.warn("Authentication error detected, clearing auth data"),Za();return}}),f&&(console.error(`[Network error]: ${f}`),o&&jc.endQuery(o,f.message),f.statusCode===401||f.statusCode===403)){console.warn("Network authentication error, clearing auth data"),Za();return}}),Vd=new Nm({link:_m([gg,mg,hg,dg]),cache:fg(),defaultOptions:{watchQuery:{errorPolicy:"all",fetchPolicy:"cache-first",notifyOnNetworkStatusChange:!0},query:{errorPolicy:"all",fetchPolicy:"cache-first"},mutate:{errorPolicy:"all"}}});Vd.clearStore().catch(console.warn);const xg=()=>{const[c,f]=W.useState({identifier:"",password:""}),[d,o]=W.useState(!1),[m,S]=W.useState("username"),{login:p,isLoading:j,error:D,clearError:z}=et();W.useEffect(()=>{c.identifier&&S(ig(c.identifier))},[c.identifier]),W.useEffect(()=>{D&&z()},[c.identifier,c.password,D,z]);const R=x=>{const{name:E,value:w}=x.target;f(C=>({...C,[E]:w}))},T=async x=>{x.preventDefault(),!(!c.identifier.trim()||!c.password.trim())&&await p(c.identifier.trim(),c.password)},v=()=>{o(!d)};return i.jsxs("div",{className:"min-h-screen flex items-center justify-center p-4",children:[i.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900"}),i.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[i.jsx(k.div,{className:"absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl",animate:{scale:[1,1.2,1],opacity:[.3,.5,.3]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),i.jsx(k.div,{className:"absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl",animate:{scale:[1.2,1,1.2],opacity:[.5,.3,.5]},transition:{duration:10,repeat:1/0,ease:"easeInOut"}})]}),i.jsx(k.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"relative z-10 w-full max-w-md",children:i.jsxs("div",{className:"glass-card p-8",children:[i.jsxs("div",{className:"text-center mb-8",children:[i.jsx(k.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mx-auto mb-4",children:i.jsx(Td,{className:"w-8 h-8 text-white"})}),i.jsx("h1",{className:"text-3xl font-bold gradient-text mb-2",children:"Welcome Back"}),i.jsx("p",{className:"text-surface-300",children:"Sign in to access your profile dashboard"})]}),D&&i.jsx(k.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg",children:i.jsx("p",{className:"text-red-300 text-sm",children:D})}),i.jsxs("form",{onSubmit:T,className:"space-y-6",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Username or Email"}),i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:m==="email"?i.jsx(Rd,{className:"h-5 w-5 text-surface-400"}):i.jsx(ei,{className:"h-5 w-5 text-surface-400"})}),i.jsx("input",{type:"text",name:"identifier",value:c.identifier,onChange:R,className:"material-input pl-10 w-full",placeholder:"Enter your username or email",autoComplete:"username",required:!0,disabled:j})]})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Password"}),i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:i.jsx(Em,{className:"h-5 w-5 text-surface-400"})}),i.jsx("input",{type:d?"text":"password",name:"password",value:c.password,onChange:R,className:"material-input pl-10 pr-10 w-full",placeholder:"Enter your password",autoComplete:"current-password",required:!0,disabled:j}),i.jsx("button",{type:"button",onClick:v,className:"absolute inset-y-0 right-0 pr-3 flex items-center",disabled:j,children:d?i.jsx(wm,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"}):i.jsx(Dm,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"})})]})]}),i.jsx(k.button,{type:"submit",disabled:j||!c.identifier.trim()||!c.password.trim(),className:"w-full glass-button py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed",whileHover:{scale:1.02},whileTap:{scale:.98},children:j?i.jsxs("div",{className:"flex items-center justify-center",children:[i.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"}),"Signing in..."]}):i.jsxs("div",{className:"flex items-center justify-center",children:[i.jsx(Td,{className:"w-5 h-5 mr-2"}),"Sign In"]})})]}),i.jsx("div",{className:"mt-8 text-center",children:i.jsx("p",{className:"text-surface-400 text-sm",children:"Use your reboot01 platform credentials"})})]})})]})};le`
  query GetUserInfo {
    user {
      id
      attrs
      login
      campus
      profile
      createdAt
      updatedAt
    }
  }
`;const yg=le`
  query GetUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      profile
      attrs
      createdAt
      updatedAt
      campus

      # User records (bans, warnings, etc.)
      records {
        id
        message
        # banEndAt - field not available in GraphQL schema
        createdAt
        author {
          id
          login
          profile
        }
      }

      # User roles
      userRoles: user_roles {
        role {
          id
          slug
          name
          description
          createdAt
          updatedAt
        }
      }
    }
  }
`;le`
  query GetTopTransaction {
    transaction(
      order_by: { amount: desc }
      limit: 1
      where: {
        type: { _eq: "level" }
        path: { _like: "/bahrain/bh-module%" }
      }
    ) {
      amount
      type
      createdAt
      path
      object {
        name
        type
      }
    }
  }
`;le`
  query GetTotalXP($path: String = "/bahrain/bh-module") {
    transaction_aggregate(
      where: {
        event: { path: { _eq: $path } }
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
`;le`
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
`;le`
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
`;le`
  query GetAuditStatus {
    user {
      validAudits: audits_aggregate(where: { grade: { _gte: 1 } }) {
        nodes {
          group {
            captainLogin
            path
          }
        }
      }
      failedAudits: audits_aggregate(where: { grade: { _lt: 1 } }) {
        nodes {
          group {
            captainLogin
            path
          }
        }
      }
    }
  }
`;const pg=le`
  query GetXPStatistics($userId: Int!) {
    # Total XP
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

    # XP by project
    xpByProject: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: "project" } }
      }
      order_by: { amount: desc }
    ) {
      amount
      createdAt
      object {
        name
        type
      }
      path
    }

    # XP timeline
    xpTimeline: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      amount
      createdAt
      object {
        name
        type
      }
      path
    }
  }
`,vg=le`
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
`,bg=le`
  query GetAuditRatio($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      auditRatio
      totalUp
      totalDown

      # Audits given by user
      auditsGiven: audits_aggregate(
        where: { auditorId: { _eq: $userId } }
      ) {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      # Audits received by user (through groups) - simplified since group_users not available
      # auditsReceived: audits_aggregate(
      #   where: {
      #     group: {
      #       group_users: {
      #         userId: { _eq: $userId }
      #       }
      #     }
      #   }
      # ) {
      #   aggregate {
      #     count
      #     avg {
      #       grade
      #     }
      #   }
      # }
    }
  }
`;le`
  query GetUserTransactions($userId: Int!, $limit: Int = 100, $offset: Int = 0, $type: String = null) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
      }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      type
      amount
      createdAt
      path
      attrs
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
        createdAt
        endAt
        # status - field not available in GraphQL schema
        object {
          name
          type
        }
      }
    }

    # Transaction aggregates for statistics
    transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: $type }
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
`;le`
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
        createdAt
        endAt
        # status - field not available in GraphQL schema
      }
      group {
        id
        status
        captainId
        createdAt
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
`;le`
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
      id
      grade
      type
      attrs
      version
      isLast
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
        # status - field not available in GraphQL schema
      }
      group {
        id
        status
      }
      # Related audits for this result
      audits {
        id
        grade
        createdAt
        auditor {
          id
          login
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
`;le`
  query GetUserAudits($userId: Int!, $limit: Int = 50, $offset: Int = 0, $asAuditor: Boolean = null) {
    # Audits where user is the auditor
    audits_given: audit(
      where: {
        auditorId: { _eq: $userId }
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

    # Audit statistics
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

  }
`;le`
  query GetEvents($userId: Int!, $limit: Int = 50) {
    event(
      where: {
        # event_users: { userId: { _eq: $userId } } - relationship not available
        # Using basic event filtering instead
        campus: { _is_null: false }
      }
      order_by: { createdAt: desc }
      limit: $limit
    ) {
      id
      path
      createdAt
      endAt
      campus
      object {
        id
        name
        type
      }
      registration {
        id
        startAt
        endAt
        eventStartAt
      }
    }
  }
`;le`
  query GetUserGroups($userId: Int!) {
    group(
      where: {
        # group_users: { userId: { _eq: $userId } } - field not available
        captainId: { _eq: $userId }
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
      object {
        id
        name
        type
      }
      event {
        id
        path
        createdAt
        endAt
      }
      # group_users - field not available in GraphQL schema
      # {
      #   user {
      #     id
      #     login
      #     profile
      #   }
      #   confirmed
      #   createdAt
      # }
    }
  }
`;const jg=le`
  query GetUserSkills($userId: Int!) {
    transaction(
      where: { 
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      distinct_on: path
    ) {
      path
      amount
      object {
        name
        type
        attrs
      }
    }
  }
`,Sg=le`
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
      id
      login
      profile
      attrs
      createdAt
      campus
    }
  }
`;le`
  query GetUserEvents($userId: Int!, $limit: Int = 50, $offset: Int = 0, $status: String = null) {
    # Events user is registered for
    user_events: eventUser(
      where: { userId: { _eq: $userId } }
      order_by: { event: { createdAt: desc } }
      limit: $limit
      offset: $offset
    ) {
      id
      createdAt
      event {
        id
        path
        # status - field not available in GraphQL schema
        createdAt
        endAt
        code
        campus
        object {
          id
          name
          type
          attrs
        }
        parent {
          id
          path
          object {
            name
            type
          }
        }
        registration {
          id
          startAt
          endAt
          eventStartAt
          attrs
        }
      }
    }

    # User registrations
    user_registrations: registrationUser(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      createdAt
      registration {
        id
        startAt
        endAt
        eventStartAt
        path
        campus
        attrs
        object {
          id
          name
          type
          attrs
        }
        parent {
          id
          name
          type
        }
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
`;le`
  query GetUserMatches($userId: Int!, $limit: Int = 50, $offset: Int = 0) {
    # Matches where user is involved
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
        id
        login
        profile
      }
      # The matched user
      matchedUser: userByMatchId {
        id
        login
        profile
      }
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        createdAt
        endAt
        # status - field not available in GraphQL schema
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
`;le`
  query GetObjectDetails($objectId: Int!, $userId: Int = null) {
    object(where: { id: { _eq: $objectId } }) {
      id
      name
      type
      # status - field not available in GraphQL schema
      attrs
      childrenAttrs
      createdAt
      updatedAt
      externalRelationUrl
      campus
      referencedAt
      # Basic object information only
      # Reference relationships
      reference {
        id
        name
        type
        attrs
      }
      referencedBy: objectsByReferenceId {
        id
        name
        type
        campus
        referencedAt
      }
      # Author information
      author {
        id
        login
        profile
      }
      # Related events
      events {
        id
        path
        # status - field not available in GraphQL schema
        createdAt
        endAt
        campus
      }
      # User-specific data (if userId provided)
      userProgress: progresses(
        where: { userId: { _eq: $userId } }
        order_by: { updatedAt: desc }
        limit: 1
      ) {
        id
        grade
        isDone
        version
        createdAt
        updatedAt
      }
      userResults: results(
        where: { userId: { _eq: $userId } }
        order_by: { updatedAt: desc }
        limit: 5
      ) {
        id
        grade
        type
        createdAt
        updatedAt
      }
      userTransactions: transactions(
        where: { userId: { _eq: $userId } }
        order_by: { createdAt: desc }
      ) {
        id
        type
        amount
        createdAt
      }
    }
  }
`;le`
  query AdvancedSearch(
    $searchTerm: String!
    $searchType: String = "all"
    $limit: Int = 20
    $offset: Int = 0
    $userId: Int = null
  ) {
    # Search users
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
      id
      login
      profile
      attrs
      createdAt
      campus
      # User statistics
      totalXP: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }

    # Search objects/projects
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
      id
      name
      type
      attrs
      campus
      createdAt
      # User progress on this object (if userId provided)
      userProgress: progresses(
        where: { userId: { _eq: $userId } }
        limit: 1
      ) {
        grade
        isDone
        updatedAt
      }
    }

    # Search events
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
      # status - field not available in GraphQL schema
      createdAt
      endAt
      campus
      object {
        id
        name
        type
      }
      # User participation (if userId provided)
      userParticipation: eventUsers(
        where: { userId: { _eq: $userId } }
        limit: 1
      ) {
        createdAt
      }
    }
  }
`;le`
  query GetUserAnalytics($userId: Int!) {
    # Time-based performance metrics
    daily_xp: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      amount
      createdAt
      path
      object {
        name
        type
      }
    }

    # Skill progression over time
    skill_progression: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
    ) {
      amount
      createdAt
      path
      object {
        name
        type
        attrs
      }
    }

    # Project completion timeline
    project_timeline: result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _in: ["project", "exercise", "quest"] } }
        isLast: { _eq: true }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      type
      createdAt
      path
      object {
        name
        type
        attrs
      }
    }

    # Audit performance over time
    audit_timeline: audit(
      where: {
        # _or: [ - groupUsers field not available, using only auditorId
        # { auditorId: { _eq: $userId } }
        # { group: { groupUsers: { userId: { _eq: $userId } } } }
        # ]
        auditorId: { _eq: $userId }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      createdAt
      auditor {
        id
        login
      }
      group {
        object {
          name
          type
        }
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
`;le`
  query GetLeaderboard($limit: Int = 50, $campus: String = null, $objectType: String = null) {
    # XP Leaderboard
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
      id
      login
      profile
      campus
      createdAt
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
      auditsGiven: audits_aggregate {
        aggregate {
          count
        }
      }
    }

    # Project completion leaderboard
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
      id
      login
      profile
      campus
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
    }

    # Audit ratio leaderboard
    audit_leaderboard: user(
      where: {
        campus: { _eq: $campus }
        audits: { id: { _is_null: false } }
      }
      limit: $limit
    ) {
      id
      login
      profile
      campus
      auditsGiven: audits_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
      auditsReceived: auditsByGroupUserId_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }
    }
  }
`;le`
  query CompareUsers($userIds: [Int!]!) {
    users: user(where: { id: { _in: $userIds } }) {
      id
      login
      profile
      campus
      createdAt

      # XP Statistics
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

      # Project Statistics
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

      # Audit Statistics
      auditsGiven: audits_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      auditsReceived: auditsByGroupUserId_aggregate {
        aggregate {
          count
          avg {
            grade
          }
        }
      }

      # Activity Timeline
      recentActivity: transactions(
        order_by: { createdAt: desc }
        limit: 10
      ) {
        type
        amount
        createdAt
        object {
          name
          type
        }
      }
    }
  }
`;const Ag=le`
  query GetXPByProject($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { amount: desc }
    ) {
      id
      amount
      path
      createdAt
      object {
        id
        name
        type
        attrs
      }
    }
  }
`,Ng=le`
  query GetXPTimeline($userId: Int!) {
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      order_by: { createdAt: asc }
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
  }
`,_g=le`
  query GetPiscineStats($userId: Int!) {
    # Get all piscine results
    result(
      where: {
        userId: { _eq: $userId }
        path: { _like: "%piscine%" }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      type
      createdAt
      path
      object {
        name
        type
        attrs
      }
    }

    # Get piscine progress entries
    progress(
      where: {
        userId: { _eq: $userId }
        path: { _like: "%piscine%" }
      }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      createdAt
      path
      object {
        name
        type
        attrs
      }
    }
  }
`,Tg=le`
  query GetEnhancedProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      profile
      attrs
      createdAt
      updatedAt
      campus

      # Get user's first event to determine registration/start date
      events(
        order_by: { createdAt: asc }
        limit: 1
      ) {
        id
        createdAt
        path
        campus
      }

      # Get total project count
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
`;le`
  query GetProjectTimeline($userId: Int!) {
    result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: asc }
    ) {
      id
      grade
      type
      createdAt
      updatedAt
      path
      object {
        id
        name
        type
        attrs
      }
    }

    # Get corresponding XP transactions for projects
    transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: asc }
    ) {
      id
      amount
      createdAt
      path
      object {
        id
        name
        type
      }
    }
  }
`;le`
  query GetDetailedAuditStats($userId: Int!) {
    # Audits given by user
    audits_given: audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      createdAt
      endAt
      group {
        id
        path
        object {
          name
          type
        }
      }
    }

    # Audits received by user (through group membership)
    # Note: This is simplified since groupUsers field is not available
    audits_received: audit(
      where: { auditorId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: 100
    ) {
      id
      grade
      createdAt
      auditor {
        id
        login
      }
      group {
        id
        path
        object {
          name
          type
        }
      }
    }
  }
`;const Eg=le`
  query SearchProjectsByStatus(
    $userId: Int!
    $status: String!
    $searchTerm: String = ""
    $limit: Int = 20
    $offset: Int = 0
  ) {
    # Search user's projects/results by status
    results: result(
      where: {
        userId: { _eq: $userId }
        _and: [
          {
            _or: [
              { object: { name: { _ilike: $searchTerm } } }
              { path: { _ilike: $searchTerm } }
            ]
          }
          {
            # Status filtering logic
            _or: [
              # Working: grade = 0 and recent activity
              {
                _and: [
                  { grade: { _eq: 0 } }
                  { updatedAt: { _gte: "2024-01-01" } }
                ]
              }
              # Finished: grade >= 1 (passed)
              { grade: { _gte: 1 } }
              # Setup: very recent creation, no grade yet
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
      createdAt
      updatedAt
      path
      object {
        id
        name
        type
        attrs
      }
    }

    # Get corresponding progress entries
    progress: progress(
      where: {
        userId: { _eq: $userId }
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
      createdAt
      updatedAt
      path
      object {
        id
        name
        type
        attrs
      }
    }
  }
`,wg=le`
  query SearchAuditsByStatus(
    $userId: Int!
    $status: String!
    $searchTerm: String = ""
    $limit: Int = 20
    $offset: Int = 0
  ) {
    # Audits given by user
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
            # Status filtering for audits
            _or: [
              # Working: audit in progress (no end date or recent)
              { endAt: { _is_null: true } }
              # Finished: audit completed
              { endAt: { _is_null: false } }
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
      createdAt
      endAt
      updatedAt
      group {
        id
        path
        object {
          id
          name
          type
        }
      }
    }

    # Audits received (simplified since groupUsers not available)
    audits_received: audit(
      where: {
        auditorId: { _eq: $userId }
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
      createdAt
      endAt
      auditor {
        id
        login
      }
      group {
        id
        path
        object {
          id
          name
          type
        }
      }
    }
  }
`,Dg=le`
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
`,Kd=()=>{const{user:c,isAuthenticated:f}=et(),{data:d,loading:o,error:m,refetch:S}=Pt(yg,{variables:{userId:c?.id},skip:!f||!c?.id,errorPolicy:"all",notifyOnNetworkStatusChange:!0,fetchPolicy:"network-only"}),p=d?.user?.[0]||null;return{profile:p?{...p,registrationDate:p.events?.[0]?.createdAt,startCampus:p.events?.[0]?.campus,totalXP:p.totalXP?.aggregate?.sum?.amount||0,totalProjects:p.projectResults?.aggregate?.count||0,passedProjects:p.passedProjects?.aggregate?.count||0,passRate:p.projectResults?.aggregate?.count>0?p.passedProjects?.aggregate?.count/p.projectResults?.aggregate?.count*100:0}:null,userRoles:[],records:p?.records||[],loading:o,error:m,refetch:S}},Dc=(c={})=>{const{user:f,isAuthenticated:d}=et(),{skip:o=!1}=c,{data:m,loading:S,error:p,refetch:j}=Pt(pg,{variables:{userId:f?.id},skip:!d||!f?.id||o,errorPolicy:"all",fetchPolicy:"network-only"}),D=m?.xp_total?.aggregate||{},z=m?.xp_transactions||[],R=m?.xp_by_type?.nodes||[],T=m?.audit_rewards||[],v=m?.audit_rewards_stats?.aggregate||{},x=p?0:D.sum?.amount||0,E=D.count||0,w=D.avg?.amount||0,C=D.max?.amount||0,B=D.min?.amount||0,X=p?[]:z.reduce((J,se)=>{const Ne=new Date(se.createdAt).toISOString().split("T")[0],ot=J.find(Ze=>Ze.date===Ne);return ot?(ot.amount+=se.amount,ot.transactions.push(se)):J.push({date:Ne,amount:se.amount,cumulative:0,transactions:[se]}),J},[]);let te=0;X.sort((J,se)=>new Date(J.date)-new Date(se.date)),X.forEach(J=>{te+=J.amount,J.cumulative=te});const ne=R.reduce((J,se)=>{const Ne=se.object?.type||"unknown";return J[Ne]||(J[Ne]={type:Ne,totalXP:0,count:0}),J[Ne].totalXP+=se.amount,J[Ne].count+=1,J},{}),je=z.reduce((J,se)=>{const Ne=se.object?.name||se.path.split("/").pop()||"unknown";return J[Ne]||(J[Ne]={name:Ne,path:se.path,totalXP:0,type:se.object?.type||"unknown",transactions:[]}),J[Ne].totalXP+=se.amount,J[Ne].transactions.push(se),J},{}),we={totalRewards:v.sum?.amount||0,rewardCount:v.count||0,upRewards:T.filter(J=>J.type==="up"),downRewards:T.filter(J=>J.type==="down")},Ye={xpPerDay:X.length>0?x/X.length:0,mostProductiveDay:X.reduce((J,se)=>se.amount>(J?.amount||0)?se:J,null),consistencyScore:zg(X),growthRate:Og(X)};return{totalXP:x,transactionCount:E,averageXP:w,maxXP:C,minXP:B,xpProgression:X,xpTransactions:z,xpByObjectType:Object.values(ne).sort((J,se)=>se.totalXP-J.totalXP),xpByProject:Object.values(je).sort((J,se)=>se.totalXP-J.totalXP),auditRewards:T,auditRewardsAnalysis:we,performanceMetrics:Ye,loading:S,error:p,refetch:j}},zg=c=>{if(c.length<2)return 0;const f=c.map(p=>p.amount),d=f.reduce((p,j)=>p+j,0)/f.length,o=f.reduce((p,j)=>p+Math.pow(j-d,2),0)/f.length,m=Math.sqrt(o),S=d>0?m/d:1;return Math.max(0,Math.min(100,(1-S)*100))},Og=c=>{if(c.length<2)return 0;const f=c.slice(0,7),d=c.slice(-7),o=f.reduce((S,p)=>S+p.amount,0)/f.length,m=d.reduce((S,p)=>S+p.amount,0)/d.length;return o>0?(m-o)/o*100:0},zc=()=>{const{user:c,isAuthenticated:f}=et(),{data:d,loading:o,error:m,refetch:S}=Pt(vg,{variables:{userId:c?.id},skip:!f||!c?.id,errorPolicy:"all",fetchPolicy:"network-only"}),p=m?0:d?.total_projects?.aggregate?.count||0,j=m?0:d?.passed_projects?.aggregate?.count||0,D=m?[]:d?.result||[],z=p>0?j/p*100:0;return{totalProjects:p,passedProjects:j,failedProjects:p-j,passRate:z,projects:D,loading:o,error:m,refetch:S}},Oc=()=>{const{user:c,isAuthenticated:f}=et(),{data:d,loading:o,error:m,refetch:S}=Pt(bg,{variables:{userId:c?.id},skip:!f||!c?.id,errorPolicy:"all",fetchPolicy:"network-only"}),p=m?0:d?.audits_given?.aggregate?.count||0,j=m?0:d?.audits_received?.aggregate?.count||0,D=j>0?p/j:0;return{auditsGiven:p,auditsReceived:j,auditRatio:D,loading:o,error:m,refetch:S}},Ug=()=>{const{user:c,isAuthenticated:f}=et(),{data:d,loading:o,error:m,refetch:S}=Pt(jg,{variables:{userId:c?.id},skip:!f||!c?.id,errorPolicy:"all",fetchPolicy:"network-only"});return{skills:(d?.transaction||[]).map(D=>{const z=D.path.split("/");return{name:z[z.length-1]||"unknown",xp:D.amount,type:D.object?.type||"unknown",path:D.path}}).reduce((D,z)=>{const R=D.find(T=>T.name===z.name);return R?(R.totalXP+=z.xp,R.projects+=1):D.push({name:z.name,totalXP:z.xp,projects:1,type:z.type}),D},[]).sort((D,z)=>z.totalXP-D.totalXP),loading:o,error:m,refetch:S}},Mg=()=>{const{profile:c,loading:f,error:d}=Kd(),{totalXP:o,loading:m,error:S}=Dc(),{passedProjects:p,loading:j,error:D}=zc(),{auditsGiven:z,auditsReceived:R,auditRatio:T,loading:v,error:x}=Oc(),E=f||m||j||v;typeof window<"u"&&window.location?.hostname==="localhost"&&(d&&console.log("Profile error:",d.message),S&&console.log("XP error:",S.message),D&&console.log("Projects error:",D.message),x&&console.log("Audit error:",x.message),!E&&!d&&!S&&!D&&!x&&console.log("✅ Dashboard data loaded successfully:",{profile:!!c,totalXP:o,passedProjects:p,auditsGiven:z,auditsReceived:R,auditRatio:T}));const C=d&&(d.message?.includes("JWT")||d.message?.includes("authentication")||d.message?.includes("unauthorized"))?d:null;return{profile:c,totalXP:o,passedProjects:p,auditsGiven:z,auditsReceived:R,auditRatio:T,loading:E,error:C,refetch:()=>{window.location.reload()}}},Rg=()=>{const[c,{data:f,loading:d,error:o}]=li(Sg,{errorPolicy:"all"});return{searchUsers:S=>{S.trim()&&c({variables:{searchTerm:`%${S}%`}})},users:f?.user||[],loading:d,error:o}},qg=()=>{const{user:c,isAuthenticated:f}=et(),{data:d,loading:o,error:m,refetch:S}=Pt(Ag,{variables:{userId:c?.id},skip:!f||!c?.id,errorPolicy:"all"});return{xpByProject:(D=>{if(!D)return[];const z={};return D.forEach(R=>{const T=R.object?.name||R.path?.split("/").pop()||"Unknown",v=R.path;z[v]||(z[v]={name:T,path:v,totalXP:0,type:R.object?.type||"unknown",transactions:[]}),z[v].totalXP+=R.amount,z[v].transactions.push(R)}),Object.values(z).sort((R,T)=>T.totalXP-R.totalXP).slice(0,20)})(d?.transaction),loading:o,error:m,refetch:S}},Cg=()=>{const{user:c,isAuthenticated:f}=et(),{data:d,loading:o,error:m,refetch:S}=Pt(Ng,{variables:{userId:c?.id},skip:!f||!c?.id,errorPolicy:"all"});return{xpTimeline:(D=>{if(!D)return[];let z=0;return D.map(R=>(z+=R.amount,{date:new Date(R.createdAt),xp:R.amount,cumulativeXP:z,project:R.object?.name||R.path?.split("/").pop(),path:R.path}))})(d?.transaction),loading:o,error:m,refetch:S}},Gg=()=>{const{user:c,isAuthenticated:f}=et(),{data:d,loading:o,error:m,refetch:S}=Pt(_g,{variables:{userId:c?.id},skip:!f||!c?.id,errorPolicy:"all"});return{piscineStats:((D,z)=>{if(!D&&!z)return{jsStats:{},goStats:{},overall:{}};const R=[...D||[],...z||[]],T=R.filter(E=>E.path?.includes("piscine-js")||E.path?.includes("javascript")),v=R.filter(E=>E.path?.includes("piscine-go")||E.path?.includes("golang")),x=E=>{const w=E.filter(X=>X.grade>=1).length,C=E.filter(X=>X.grade<1).length,B=E.length;return{passed:w,failed:C,total:B,passRate:B>0?w/B*100:0}};return{jsStats:x(T),goStats:x(v),overall:x(R)}})(d?.result,d?.progress),loading:o,error:m,refetch:S}},Bg=()=>{const{user:c,isAuthenticated:f}=et(),{data:d,loading:o,error:m,refetch:S}=Pt(Tg,{variables:{userId:c?.id},skip:!f||!c?.id,errorPolicy:"all"}),p=d?.user?.[0],j=p?.events?.[0],D=p?.results_aggregate?.aggregate?.count||0,z=p?.passed_projects?.aggregate?.count||0;return{profile:p?{...p,registrationDate:j?.createdAt,startCampus:j?.campus,totalProjects:D,passedProjects:z,passRate:D>0?z/D*100:0}:null,loading:o,error:m,refetch:S}},Xg=()=>{const{user:c,isAuthenticated:f}=et(),[d,o]=Wt.useState([]),[m,S]=Wt.useState(!1),[p,j]=Wt.useState(null),[D]=li(Eg,{errorPolicy:"all",onCompleted:x=>{const E=z(x);o(E),S(!1)},onError:x=>{j(x),S(!1)}}),z=x=>{if(!x)return[];const E=x.results||[],w=x.progress||[];return[...E,...w].map(B=>{const X=R(B);return{...B,status:X,type:B.isDone!==void 0?"progress":"result"}}).sort((B,X)=>new Date(X.updatedAt)-new Date(B.updatedAt))},R=x=>{const E=new Date,w=new Date(x.updatedAt),C=new Date(x.createdAt),B=(E-w)/(1e3*60*60*24),X=(E-C)/(1e3*60*60*24);return x.grade>=1?"finished":X<=7&&x.grade===0?"setup":x.grade===0&&B<=3?"audit":(x.grade===0&&B<=30,"working")};return{searchResults:d,searchProjects:(x="",E="all",w={})=>{if(!f||!c?.id)return;S(!0),j(null);const{limit:C=20,offset:B=0}=w;D({variables:{userId:c.id,status:E,searchTerm:`%${x}%`,limit:C,offset:B}})},filterByStatus:x=>x==="all"?d:d.filter(E=>E.status===x),loading:m,error:p,statusCounts:{all:d.length,working:d.filter(x=>x.status==="working").length,audit:d.filter(x=>x.status==="audit").length,setup:d.filter(x=>x.status==="setup").length,finished:d.filter(x=>x.status==="finished").length}}},Hg=()=>{const{user:c,isAuthenticated:f}=et(),[d,o]=Wt.useState([]),[m,S]=Wt.useState(!1),[p,j]=Wt.useState(null),[D]=li(wg,{errorPolicy:"all",onCompleted:E=>{const w=z(E);o(w),S(!1)},onError:E=>{j(E),S(!1)}}),z=E=>{if(!E)return[];const w=(E.audits_given||[]).map(B=>({...B,type:"given",status:R(B)})),C=(E.audits_received||[]).map(B=>({...B,type:"received",status:R(B)}));return[...w,...C].sort((B,X)=>new Date(X.createdAt)-new Date(B.createdAt))},R=E=>{const w=new Date,C=new Date(E.createdAt),B=E.endAt?new Date(E.endAt):null,X=(w-C)/(1e3*60*60*24);return B?"finished":X<=1?"setup":!B&&X<=7?"working":"audit"};return{searchResults:d,searchAudits:(E="",w="all",C={})=>{if(!f||!c?.id)return;S(!0),j(null);const{limit:B=20,offset:X=0}=C;D({variables:{userId:c.id,status:w,searchTerm:`%${E}%`,limit:B,offset:X}})},filterByStatus:E=>E==="all"?d:d.filter(w=>w.status===E),filterByType:E=>E==="all"?d:d.filter(w=>w.type===E),loading:m,error:p,statusCounts:{all:d.length,working:d.filter(E=>E.status==="working").length,audit:d.filter(E=>E.status==="audit").length,setup:d.filter(E=>E.status==="setup").length,finished:d.filter(E=>E.status==="finished").length},typeCounts:{all:d.length,given:d.filter(E=>E.type==="given").length,received:d.filter(E=>E.type==="received").length}}},Lg=()=>{const[c,f]=Wt.useState([]),[d,o]=Wt.useState(!1),[m,S]=Wt.useState(null),[p]=li(Dg,{errorPolicy:"all",onCompleted:v=>{const x=j(v);f(x),o(!1)},onError:v=>{S(v),o(!1)}}),j=v=>v?.users?v.users.map(x=>{const E=D(x),w=x.recent_transactions?.reduce((B,X)=>B+X.amount,0)||0,C=x.recent_results?.length>0;return{...x,status:E,totalXP:w,recentActivity:C,lastActive:x.recent_results?.[0]?.updatedAt||x.updatedAt}}):[],D=v=>{const x=new Date,E=new Date(v.updatedAt),w=(x-E)/(1e3*60*60*24),C=v.recent_results||[];if(C.some(je=>{const we=new Date(je.updatedAt);return(x-we)/(1e3*60*60*24)<=7}))return"working";const X=new Date(v.createdAt);return(x-X)/(1e3*60*60*24)<=30&&C.length<=2?"setup":C.length>0&&w<=30?"audit":C.filter(je=>je.grade>=1).length>=3?"finished":"working"};return{searchResults:c,searchUsers:(v="",x="all",E="",w={})=>{o(!0),S(null);const{limit:C=20,offset:B=0}=w;p({variables:{searchTerm:`%${v}%`,status:x,campus:E?`%${E}%`:"%",limit:C,offset:B}})},filterByStatus:v=>v==="all"?c:c.filter(x=>x.status===v),filterByCampus:v=>!v||v==="all"?c:c.filter(x=>x.campus&&x.campus.toLowerCase().includes(v.toLowerCase())),loading:d,error:m,statusCounts:{all:c.length,working:c.filter(v=>v.status==="working").length,audit:c.filter(v=>v.status==="audit").length,setup:c.filter(v=>v.status==="setup").length,finished:c.filter(v=>v.status==="finished").length},campuses:[...new Set(c.map(v=>v.campus).filter(Boolean))]}},Ue=(...c)=>c.filter(Boolean).join(" "),G=({children:c,className:f="",hover:d=!1,animate:o=!0,onClick:m,...S})=>{const p="glass-card p-6",j=d?"card-hover cursor-pointer":"",D=o?k.div:"div",z=o?{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3}}:{};return i.jsx(D,{className:Ue(p,j,f),onClick:m,...z,...S,children:c})},Qg=({children:c,className:f=""})=>i.jsx("div",{className:Ue("mb-4",f),children:c}),Yg=({children:c,className:f=""})=>i.jsx("h3",{className:Ue("text-xl font-semibold text-white mb-2",f),children:c}),Zg=({children:c,className:f=""})=>i.jsx("p",{className:Ue("text-surface-300 text-sm",f),children:c}),$g=({children:c,className:f=""})=>i.jsx("div",{className:Ue("",f),children:c}),Vg=({children:c,className:f=""})=>i.jsx("div",{className:Ue("mt-4 pt-4 border-t border-white/10",f),children:c});G.Header=Qg;G.Title=Yg;G.Description=Zg;G.Content=$g;G.Footer=Vg;const qt=({children:c,variant:f="primary",size:d="md",disabled:o=!1,loading:m=!1,className:S="",onClick:p,type:j="button",...D})=>{const z="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",R={primary:"glass-button",secondary:"bg-surface-700 hover:bg-surface-600 text-white border border-surface-600",outline:"border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white",ghost:"text-surface-300 hover:text-white hover:bg-white/10",danger:"bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"},T={sm:"px-3 py-1.5 text-sm rounded-md",md:"px-4 py-2 text-sm rounded-lg",lg:"px-6 py-3 text-base rounded-lg",xl:"px-8 py-4 text-lg rounded-xl"},v=Ue(z,R[f],T[d],S);return i.jsxs(k.button,{type:j,className:v,disabled:o||m,onClick:p,whileHover:{scale:o||m?1:1.02,transition:{type:"spring",stiffness:400,damping:10}},whileTap:{scale:o||m?1:.98,transition:{type:"spring",stiffness:400,damping:10}},initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},...D,children:[m&&i.jsx(k.div,{className:"rounded-full h-4 w-4 border-b-2 border-current mr-2",animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),c]})},ti=({size:c="md",text:f="",className:d="",fullScreen:o=!1})=>{const m={sm:"h-4 w-4",md:"h-8 w-8",lg:"h-12 w-12",xl:"h-16 w-16"},S={sm:"text-sm",md:"text-base",lg:"text-lg",xl:"text-xl"},p=i.jsx("div",{className:Ue("animate-spin rounded-full border-b-2 border-primary-400",m[c])}),j=i.jsxs("div",{className:Ue("flex flex-col items-center justify-center space-y-4",d),children:[p,f&&i.jsx("p",{className:Ue("text-surface-300",S[c]),children:f})]});return o?i.jsx(k.div,{initial:{opacity:0},animate:{opacity:1},className:"fixed inset-0 bg-surface-900/50 backdrop-blur-sm flex items-center justify-center z-50",children:j}):j},qn=({className:c="",...f})=>i.jsx("div",{className:Ue("animate-pulse rounded-md bg-surface-700/50",c),...f}),ft=()=>i.jsxs("div",{className:"glass-card p-6 space-y-4",children:[i.jsx(qn,{className:"h-4 w-3/4"}),i.jsx(qn,{className:"h-4 w-1/2"}),i.jsxs("div",{className:"space-y-2",children:[i.jsx(qn,{className:"h-3 w-full"}),i.jsx(qn,{className:"h-3 w-5/6"}),i.jsx(qn,{className:"h-3 w-4/6"})]})]}),Kg=({tabs:c=[],activeTab:f,onTabChange:d,className:o=""})=>i.jsx("div",{className:Ue("fixed bottom-0 left-0 right-0 z-40 bg-surface-900/95 backdrop-blur-md border-t border-white/10 md:hidden",o),children:i.jsx("div",{className:"flex justify-around items-center py-2",children:c.map(m=>{const S=m.icon,p=f===m.id;return i.jsxs(k.button,{onClick:()=>d(m.id),className:Ue("flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative",p?"text-primary-300":"text-surface-400 hover:text-surface-200"),whileTap:{scale:.95},children:[p&&i.jsx(k.div,{className:"absolute -top-1 w-8 h-1 bg-primary-400 rounded-full",layoutId:"activeTab",transition:{type:"spring",stiffness:500,damping:30}}),i.jsx(S,{className:"w-5 h-5 mb-1"}),i.jsx("span",{className:"text-xs font-medium truncate max-w-16",children:m.label.split(" ")[0]})]},m.id)})})}),kg=({value:c=0,max:f=100,className:d="",showValue:o=!0,size:m="md",color:S="primary",animated:p=!0,label:j=""})=>{const D=Math.min(Math.max(c/f*100,0),100),z={sm:"h-2",md:"h-3",lg:"h-4",xl:"h-6"},R={primary:"bg-primary-500",secondary:"bg-surface-500",success:"bg-green-500",warning:"bg-yellow-500",danger:"bg-red-500",accent:"bg-accent-500"};return i.jsxs("div",{className:Ue("w-full",d),children:[(j||o)&&i.jsxs("div",{className:"flex justify-between items-center mb-2",children:[j&&i.jsx("span",{className:"text-sm font-medium text-surface-200",children:j}),o&&i.jsxs("span",{className:"text-sm text-surface-300",children:[Math.round(D),"%"]})]}),i.jsx("div",{className:Ue("w-full bg-surface-700/50 rounded-full overflow-hidden",z[m]),children:i.jsx(k.div,{className:Ue("h-full rounded-full",R[S]),initial:p?{width:0}:{width:`${D}%`},animate:{width:`${D}%`},transition:{duration:p?1:0,ease:"easeOut"}})})]})},Jg=({value:c=0,max:f=100,size:d=120,strokeWidth:o=8,className:m="",color:S="primary",showValue:p=!0,label:j=""})=>{const D=Math.min(Math.max(c/f*100,0),100),z=(d-o)/2,R=z*2*Math.PI,T=R,v=R-D/100*R,x={primary:"#14b8a6",secondary:"#64748b",success:"#10b981",warning:"#f59e0b",danger:"#ef4444",accent:"#d946ef"};return i.jsxs("div",{className:Ue("relative inline-flex items-center justify-center",m),children:[i.jsxs("svg",{width:d,height:d,className:"transform -rotate-90",children:[i.jsx("circle",{cx:d/2,cy:d/2,r:z,stroke:"rgba(100, 116, 139, 0.2)",strokeWidth:o,fill:"transparent"}),i.jsx(k.circle,{cx:d/2,cy:d/2,r:z,stroke:x[S],strokeWidth:o,fill:"transparent",strokeLinecap:"round",strokeDasharray:T,initial:{strokeDashoffset:R},animate:{strokeDashoffset:v},transition:{duration:1,ease:"easeOut"}})]}),i.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:[p&&i.jsx("span",{className:"text-2xl font-bold text-white",children:Math.round(D)}),j&&i.jsx("span",{className:"text-xs text-surface-300 mt-1",children:j})]})]})},Na=({children:c,variant:f="default",size:d="md",className:o="",animate:m=!1,...S})=>{const p="inline-flex items-center font-medium rounded-full",j={default:"bg-surface-700 text-surface-200",primary:"bg-primary-500/20 text-primary-300 border border-primary-500/30",secondary:"bg-surface-600 text-surface-200",success:"bg-green-500/20 text-green-300 border border-green-500/30",warning:"bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",danger:"bg-red-500/20 text-red-300 border border-red-500/30",accent:"bg-accent-500/20 text-accent-300 border border-accent-500/30",outline:"border border-surface-500 text-surface-300"},D={sm:"px-2 py-0.5 text-xs",md:"px-2.5 py-1 text-sm",lg:"px-3 py-1.5 text-base"},z=Ue(p,j[f],D[d],o),R=m?k.span:"span",T=m?{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{type:"spring",stiffness:500,damping:30}}:{};return i.jsx(R,{className:z,...T,...S,children:c})},Ig=({status:c,className:f=""})=>{const d=c==="pass"||c==="PASS"||c===!0||c>=1;return i.jsx(Na,{variant:d?"success":"danger",className:f,animate:!0,children:d?"Pass":"Fail"})},Wg=({level:c,className:f=""})=>i.jsxs(Na,{variant:"primary",className:f,animate:!0,children:["Level ",c]}),Pg=({xp:c,className:f=""})=>i.jsxs(Na,{variant:"accent",className:f,animate:!0,children:[c.toLocaleString()," XP"]}),Fs=c=>{if(!c||c===0)return"0";const f=Number(c);return isNaN(f)?"0":f>=1e6?`${(f/1e6).toFixed(1)}M`:f>=1e3?`${(f/1e3).toFixed(1)}K`:f.toString()},Fg=c=>{if(!c)return null;if(c.profile)try{const f=typeof c.profile=="string"?JSON.parse(c.profile):c.profile;if(f.avatar)return f.avatar;if(f.avatarUrl)return f.avatarUrl;if(f.picture)return f.picture}catch(f){console.warn("Error parsing user profile for avatar:",f)}if(c.attrs)try{const f=typeof c.attrs=="string"?JSON.parse(c.attrs):c.attrs;if(f.avatar)return f.avatar;if(f.avatarUrl)return f.avatarUrl;if(f.picture)return f.picture;if(f.image)return f.image}catch(f){console.warn("Error parsing user attrs for avatar:",f)}return null},ai=c=>{if(!c)return"Unknown User";if(c.profile)try{const f=typeof c.profile=="string"?JSON.parse(c.profile):c.profile;if(f.firstName&&f.lastName)return`${f.firstName} ${f.lastName}`;if(f.name)return f.name;if(f.displayName)return f.displayName}catch(f){console.warn("Error parsing user profile for display name:",f)}return c.login||c.username||"Unknown User"},ex=c=>{if(!c)return null;if(c.profile)try{const f=typeof c.profile=="string"?JSON.parse(c.profile):c.profile;if(f.email)return f.email}catch(f){console.warn("Error parsing user profile for email:",f)}if(c.attrs)try{const f=typeof c.attrs=="string"?JSON.parse(c.attrs):c.attrs;if(f.email)return f.email}catch(f){console.warn("Error parsing user attrs for email:",f)}return null},kd=c=>!c||c<=0?1:Math.floor(c/1e3)+1,tx=c=>{const f=kd(c),d=(f-1)*1e3,o=f*1e3,S=(c-d)/1e3*100,p=o-c;return{currentLevel:f,progressPercentage:Math.max(0,Math.min(100,S)),xpNeeded:Math.max(0,p),currentLevelXP:d,nextLevelXP:o}},Sc=(c,f={})=>{if(!c)return"Unknown";const d={year:"numeric",month:"short",day:"numeric"};try{return new Date(c).toLocaleDateString("en-US",{...d,...f})}catch(o){return console.warn("Error formatting date:",o),"Invalid Date"}},Ud=(c,f="en-US")=>c==null||isNaN(c)?"0":Number(c).toLocaleString(f),ax=({user:c,size:f="md",className:d="",showBorder:o=!1,animate:m=!0,onClick:S,...p})=>{const[j,D]=W.useState(!1),z=Fg(c),R=ai(c),T={xs:"w-6 h-6",sm:"w-8 h-8",md:"w-12 h-12",lg:"w-16 h-16",xl:"w-24 h-24","2xl":"w-32 h-32"},v={xs:"w-3 h-3",sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8",xl:"w-12 h-12","2xl":"w-16 h-16"},x=Ue("rounded-full flex items-center justify-center overflow-hidden",T[f],o&&"border-2 border-primary-400",S&&"cursor-pointer hover:opacity-80 transition-opacity",d),E=m?k.div:"div",w=m?{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.2},whileHover:S?{scale:1.05}:void 0,whileTap:S?{scale:.95}:void 0}:{},C=()=>{D(!0)};return i.jsx(E,{className:x,onClick:S,title:R,...w,...p,children:z&&!j?i.jsx("img",{src:z,alt:`${R}'s avatar`,className:"w-full h-full object-cover",onError:C,loading:"lazy"}):i.jsx("div",{className:"w-full h-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center",children:i.jsx(ei,{className:Ue("text-white",v[f])})})})},lx=()=>{const{profile:c,loading:f}=Kd(),{profile:d,loading:o}=Bg(),{totalXP:m,loading:S}=Dc(),{passedProjects:p,passRate:j,loading:D}=zc(),{auditRatio:z,auditsGiven:R,auditsReceived:T,loading:v}=Oc(),x=d||c,E=kd(m),w=tx(m),C=ai(x),B=ex(x);return f||o||S||D||v?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[i.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[i.jsx(ft,{}),i.jsx(ft,{})]}),i.jsxs("div",{className:"space-y-6",children:[i.jsx(ft,{}),i.jsx(ft,{}),i.jsx(ft,{})]})]}):i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[i.jsx("div",{className:"lg:col-span-2",children:i.jsxs(G,{className:"h-full",children:[i.jsx(G.Header,{children:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsx(G.Title,{children:"User Profile"}),i.jsx(Wg,{level:E})]})}),i.jsx(G.Content,{children:i.jsxs("div",{className:"flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8",children:[i.jsx("div",{className:"flex-shrink-0",children:i.jsx(ax,{user:x,size:"xl",showBorder:!0,animate:!0})}),i.jsxs("div",{className:"flex-1 space-y-4",children:[i.jsxs("div",{children:[i.jsx("h2",{className:"text-2xl font-bold text-white mb-1",children:C}),i.jsxs("p",{className:"text-surface-300",children:["@",x?.login||"username"]})]}),i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(Rd,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm",children:B||"No email"})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(zm,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm",children:x?.campus||x?.startCampus||"Campus not specified"})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(qd,{className:"w-4 h-4"}),i.jsxs("span",{className:"text-sm",children:["Joined ",Sc(x?.createdAt)]})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(ni,{className:"w-4 h-4"}),i.jsxs("span",{className:"text-sm",children:["Started ",Sc(x?.registrationDate)]})]})]}),i.jsxs("div",{className:"flex flex-wrap gap-2",children:[i.jsx(Pg,{xp:m}),i.jsxs(Na,{variant:"primary",children:[x?.passedProjects||p," / ",x?.totalProjects||"N/A"," Projects"]}),i.jsxs(Na,{variant:"accent",children:["Audit Ratio: ",z.toFixed(2)]}),x?.passRate&&i.jsxs(Na,{variant:"success",children:[x.passRate.toFixed(1),"% Success Rate"]})]})]})]})})]})}),i.jsxs("div",{className:"space-y-6",children:[i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Gn,{className:"w-5 h-5 mr-2"}),"User Level"]}),i.jsx(G.Description,{children:"Apprentice developer"})]}),i.jsxs(G.Content,{className:"flex flex-col items-center",children:[i.jsx(Jg,{value:w.progressPercentage,max:100,size:120,color:"primary",label:`Level ${E}`}),i.jsxs("p",{className:"text-sm text-surface-300 mt-4 text-center",children:[w.xpNeeded," XP to next level"]})]})]}),i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Om,{className:"w-5 h-5 mr-2"}),"Audits Ratio"]})}),i.jsx(G.Content,{children:i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Done"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[(R/1024*1e3).toFixed(0)," MB"]})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Received"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[(T/1024*1e3).toFixed(0)," MB"]})]}),i.jsxs("div",{className:"text-center pt-4 border-t border-white/10",children:[i.jsx("div",{className:"text-3xl font-bold text-primary-300",children:z.toFixed(1)}),i.jsx("p",{className:"text-sm text-surface-400",children:"Best ratio ever!"})]})]})})]}),i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Cd,{className:"w-5 h-5 mr-2"}),"Quick Stats"]})}),i.jsx(G.Content,{children:i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Total XP"}),i.jsx("span",{className:"text-white font-semibold",children:m.toLocaleString()})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Projects Passed"}),i.jsx("span",{className:"text-green-400 font-semibold",children:p})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Success Rate"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[j.toFixed(1),"%"]})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Audits Given"}),i.jsx("span",{className:"text-accent-300 font-semibold",children:R})]})]})})]})]})]})},nx=({result:c,type:f})=>{const d=p=>{switch(p){case"working":return"text-blue-400 bg-blue-400/10";case"audit":return"text-yellow-400 bg-yellow-400/10";case"setup":return"text-purple-400 bg-purple-400/10";case"finished":return"text-green-400 bg-green-400/10";default:return"text-surface-400 bg-surface-400/10"}},o=p=>{switch(p){case"working":return ni;case"audit":return Gd;case"setup":return Bd;case"finished":return Nc;default:return Bn}},m=p=>new Date(p).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"}),S=o(c.status);return i.jsxs(k.div,{className:"flex items-center justify-between p-4 bg-surface-800 rounded-lg hover:bg-surface-700 transition-colors duration-200",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},children:[i.jsx("div",{className:"flex-1",children:i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx(S,{className:`w-4 h-4 ${d(c.status).split(" ")[0]}`}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white",children:f==="users"?c.login:c.object?.name||c.path?.split("/").pop()||"Unknown"}),i.jsx("p",{className:"text-sm text-surface-400",children:f==="users"?c.campus||"No campus":c.path||"No path"})]})]})}),i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${d(c.status)}`,children:c.status}),f==="projects"&&i.jsxs("span",{className:"text-sm text-surface-300",children:["Grade: ",c.grade||0]}),f==="audits"&&i.jsx("span",{className:"text-sm text-surface-300",children:c.type==="given"?"Given":"Received"}),f==="users"&&c.totalXP&&i.jsxs("span",{className:"text-sm text-surface-300",children:[c.totalXP," XP"]}),i.jsx("span",{className:"text-xs text-surface-500",children:m(c.updatedAt||c.createdAt)})]})]})},sx=()=>{const[c,f]=W.useState("projects"),[d,o]=W.useState(""),[m,S]=W.useState("all"),[p,j]=W.useState(""),[D,z]=W.useState({cohort:"All Cohorts",status:"Working"}),[R,T]=W.useState({username:"",status:"Working"}),[v,x]=W.useState({cohort:"All Cohorts",limit:"0"}),{searchResults:E,searchProjects:w,filterByStatus:C,statusCounts:B,loading:X}=Xg(),{searchResults:te,searchAudits:ne,filterByStatus:je,statusCounts:we,loading:Ye}=Hg(),{searchResults:J,searchUsers:se,filterByStatus:Ne,statusCounts:ot,campuses:Ze,loading:$a}=Lg(),{searchUsers:_a,users:dt,loading:U}=Rg(),H=[{value:"all",label:"All Status",icon:Bn,color:"text-surface-400"},{value:"working",label:"Working",icon:ni,color:"text-blue-400"},{value:"audit",label:"In Audit",icon:Gd,color:"text-yellow-400"},{value:"setup",label:"Setup",icon:Bd,color:"text-purple-400"},{value:"finished",label:"Finished",icon:Nc,color:"text-green-400"}],V=[{value:"projects",label:"Projects",icon:Gn},{value:"audits",label:"Audits",icon:vc},{value:"users",label:"Users",icon:At}],de=["All Cohorts","Cohort 1","Cohort 2","Cohort 3","Cohort 4"],re=()=>{if(!(!d.trim()&&m==="all"))switch(c){case"projects":w(d,m);break;case"audits":ne(d,m);break;case"users":se(d,m,p);break}},Xe=Q=>{S(Q),setTimeout(()=>{re()},100)},pe=Q=>{f(Q),o(""),S("all")},ce=()=>{console.log("Group search - legacy")},De=()=>{d.trim()&&_a(d)},ht=()=>{console.log("Ranking search - legacy")},Et=()=>{switch(c){case"projects":return m==="all"?E:C(m);case"audits":return m==="all"?te:je(m);case"users":return m==="all"?J:Ne(m);default:return[]}},Va=()=>{switch(c){case"projects":return X;case"audits":return Ye;case"users":return $a;default:return!1}},Ka=()=>{switch(c){case"projects":return B;case"audits":return we;case"users":return ot;default:return{all:0,working:0,audit:0,setup:0,finished:0}}},wt=Et(),Ft=Va(),ka=Ka();return i.jsxs("div",{className:"space-y-6",children:[i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center text-primary-300",children:[i.jsx(At,{className:"w-5 h-5 mr-2"}),"Enhanced Search with Status Filtering"]}),i.jsx(G.Description,{children:"Search projects, audits, and users with selective status filtering: working, audit, setup, finished"})]}),i.jsxs(G.Content,{className:"space-y-6",children:[i.jsx("div",{className:"flex space-x-1 bg-surface-800 p-1 rounded-lg",children:V.map(Q=>{const _e=Q.icon;return i.jsxs("button",{onClick:()=>pe(Q.value),className:`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${c===Q.value?"bg-primary-500 text-white shadow-lg":"text-surface-300 hover:text-white hover:bg-surface-700"}`,children:[i.jsx(_e,{className:"w-4 h-4 mr-2"}),Q.label]},Q.value)})}),i.jsxs("div",{className:"flex space-x-4",children:[i.jsxs("div",{className:"flex-1",children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Search Term"}),i.jsxs("div",{className:"relative",children:[i.jsx(At,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",value:d,onChange:Q=>o(Q.target.value),onKeyDown:Q=>Q.key==="Enter"&&re(),placeholder:`Search ${c}...`,className:"material-input pl-10 w-full"})]})]}),c==="users"&&i.jsxs("div",{className:"w-48",children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Campus"}),i.jsxs("select",{value:p,onChange:Q=>j(Q.target.value),className:"material-input w-full",children:[i.jsx("option",{value:"",children:"All Campuses"}),Ze.map(Q=>i.jsx("option",{value:Q,children:Q},Q))]})]})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-3",children:"Filter by Status"}),i.jsx("div",{className:"flex flex-wrap gap-2",children:H.map(Q=>{const _e=Q.icon,Ja=ka[Q.value]||0,ql=m===Q.value;return i.jsxs(k.button,{onClick:()=>Xe(Q.value),className:`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${ql?"bg-primary-500 text-white shadow-lg":"bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-white"}`,whileHover:{scale:1.05},whileTap:{scale:.95},children:[i.jsx(_e,{className:`w-4 h-4 mr-2 ${ql?"text-white":Q.color}`}),Q.label,Ja>0&&i.jsx("span",{className:`ml-2 px-2 py-0.5 rounded-full text-xs ${ql?"bg-white/20":"bg-surface-600"}`,children:Ja})]},Q.value)})})]}),i.jsx("div",{className:"flex justify-end",children:i.jsx(qt,{onClick:re,disabled:Ft,className:"px-6",children:Ft?i.jsxs(i.Fragment,{children:[i.jsx(ti,{className:"w-4 h-4 mr-2"}),"Searching..."]}):i.jsxs(i.Fragment,{children:[i.jsx(At,{className:"w-4 h-4 mr-2"}),"Search ",c]})})})]})]}),(wt.length>0||Ft)&&i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center justify-between",children:[i.jsx("span",{children:"Search Results"}),i.jsxs("span",{className:"text-sm text-surface-400",children:[wt.length," ",c," found"]})]})}),i.jsx(G.Content,{children:Ft?i.jsxs("div",{className:"flex items-center justify-center py-8",children:[i.jsx(ti,{className:"w-6 h-6 mr-2"}),i.jsxs("span",{children:["Searching ",c,"..."]})]}):i.jsx("div",{className:"space-y-3 max-h-96 overflow-y-auto",children:wt.map((Q,_e)=>i.jsx(nx,{result:Q,type:c},Q.id||_e))})})]}),i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center text-primary-300",children:[i.jsx(vc,{className:"w-5 h-5 mr-2"}),"Group Search"]})}),i.jsxs(G.Content,{className:"space-y-4",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Select Cohort"}),i.jsx("div",{className:"relative",children:i.jsx("select",{value:D.cohort,onChange:Q=>z(_e=>({..._e,cohort:Q.target.value})),className:"material-input w-full appearance-none",children:de.map(Q=>i.jsx("option",{value:Q,className:"bg-surface-800",children:Q},Q))})})]}),i.jsx("div",{children:i.jsx("input",{type:"text",value:D.status,onChange:Q=>z(_e=>({..._e,status:Q.target.value})),className:"material-input w-full",placeholder:"Status"})}),i.jsxs(qt,{onClick:ce,className:"w-full",children:[i.jsx(At,{className:"w-4 h-4 mr-2"}),"Search"]})]})]}),i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center text-primary-300",children:[i.jsx(At,{className:"w-5 h-5 mr-2"}),"User Advance Search"]})}),i.jsxs(G.Content,{className:"space-y-4",children:[i.jsx("div",{children:i.jsx("input",{type:"text",value:R.username,onChange:Q=>T(_e=>({..._e,username:Q.target.value})),className:"material-input w-full",placeholder:"Username"})}),i.jsx("div",{children:i.jsx("input",{type:"text",value:R.status,onChange:Q=>T(_e=>({..._e,status:Q.target.value})),className:"material-input w-full",placeholder:"Status"})}),i.jsxs(qt,{onClick:De,className:"w-full",loading:U,children:[i.jsx(At,{className:"w-4 h-4 mr-2"}),"Search"]}),dt.length>0&&i.jsxs("div",{className:"mt-4 space-y-2",children:[i.jsx("h4",{className:"text-sm font-medium text-surface-200",children:"Results:"}),dt.map(Q=>i.jsxs(k.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"p-3 bg-surface-800/50 rounded-lg",children:[i.jsx("p",{className:"text-white font-medium",children:Q.login}),(Q.firstName||Q.lastName)&&i.jsxs("p",{className:"text-surface-300 text-sm",children:[Q.firstName," ",Q.lastName]})]},Q.id))]})]})]}),i.jsxs(G,{children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center text-primary-300",children:[i.jsx(Gn,{className:"w-5 h-5 mr-2"}),"Ranking Search"]})}),i.jsxs(G.Content,{className:"space-y-4",children:[i.jsx("div",{children:i.jsx("input",{type:"number",value:v.limit,onChange:Q=>x(_e=>({..._e,limit:Q.target.value})),className:"material-input w-full",placeholder:"0",min:"0"})}),i.jsx("div",{children:i.jsx("select",{value:v.cohort,onChange:Q=>x(_e=>({..._e,cohort:Q.target.value})),className:"material-input w-full appearance-none",children:de.map(Q=>i.jsx("option",{value:Q,className:"bg-surface-800",children:Q},Q))})}),i.jsxs(qt,{onClick:ht,className:"w-full",children:[i.jsx(Gn,{className:"w-4 h-4 mr-2"}),"Search Rankings"]})]})]}),i.jsxs(G,{className:"xl:col-span-3",children:[i.jsx(G.Header,{children:i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Bn,{className:"w-5 h-5 mr-2"}),"Search Tips"]})}),i.jsx(G.Content,{children:i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"Group Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Search for groups by cohort and status. Filter by working status to find active groups."})]}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"User Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Find specific users by username. Add status filters to narrow down results."})]}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"Ranking Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"View top performers by cohort. Set a limit to see top N users or leave as 0 for all."})]})]})})]})]})]})},ix=({data:c=[],width:f=600,height:d=300,className:o=""})=>{const m={top:20,right:30,bottom:40,left:60},S=f-m.left-m.right,p=d-m.top-m.bottom,j=W.useMemo(()=>{if(!c||c.length===0){const w=[];let C=0;for(let B=0;B<12;B++){const X=Math.floor(Math.random()*500)+100;C+=X,w.push({date:new Date(2024,B,1).toISOString().split("T")[0],amount:X,cumulative:C})}return w}return c},[c]),{xScale:D,yScale:z,maxY:R}=W.useMemo(()=>{if(j.length===0)return{xScale:()=>0,yScale:()=>0,maxY:0};const w=Math.max(...j.map(ne=>ne.cumulative)),C=new Date(Math.min(...j.map(ne=>new Date(ne.date)))),B=new Date(Math.max(...j.map(ne=>new Date(ne.date))));return{xScale:ne=>(new Date(ne)-C)/(B-C)*S,yScale:ne=>p-ne/w*p,maxY:w}},[j,S,p]),T=W.useMemo(()=>j.length===0?"":j.map((w,C)=>{const B=D(w.date),X=z(w.cumulative);return`${C===0?"M":"L"} ${B} ${X}`}).join(" "),[j,D,z]),v=W.useMemo(()=>{if(j.length===0)return"";const w=T,C=j[0],B=j[j.length-1];return`${w} L ${D(B.date)} ${p} L ${D(C.date)} ${p} Z`},[T,j,D,p]),x=W.useMemo(()=>{const C=[];for(let B=0;B<=5;B++){const X=R/5*B;C.push({value:Math.round(X),y:z(X)})}return C},[R,z]),E=W.useMemo(()=>{if(j.length===0)return[];const w=Math.min(6,j.length),C=Math.floor(j.length/w),B=[];for(let X=0;X<j.length;X+=C){const te=j[X];B.push({label:new Date(te.date).toLocaleDateString("en-US",{month:"short"}),x:D(te.date)})}return B},[j,D]);return i.jsx("div",{className:`w-full ${o}`,children:i.jsxs("svg",{width:f,height:d,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.3"}),i.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.05"})]}),i.jsxs("filter",{id:"glow",children:[i.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsxs("g",{transform:`translate(${m.left}, ${m.top})`,children:[x.map((w,C)=>i.jsx("line",{x1:0,y1:w.y,x2:S,y2:w.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},C)),i.jsx(k.path,{d:v,fill:"url(#xpGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),i.jsx(k.path,{d:T,fill:"none",stroke:"#14b8a6",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),j.map((w,C)=>i.jsx(k.circle,{cx:D(w.date),cy:z(w.cumulative),r:"4",fill:"#14b8a6",stroke:"#ffffff",strokeWidth:"2",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:.1*C},className:"cursor-pointer hover:r-6 transition-all",children:i.jsx("title",{children:`${new Date(w.date).toLocaleDateString()}: ${w.cumulative.toLocaleString()} XP`})},C)),i.jsx("line",{x1:0,y1:0,x2:0,y2:p,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),i.jsx("line",{x1:0,y1:p,x2:S,y2:p,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),x.map((w,C)=>i.jsx("text",{x:-10,y:w.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:w.value.toLocaleString()},C)),E.map((w,C)=>i.jsx("text",{x:w.x,y:p+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:w.label},C)),i.jsx("text",{x:S/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"XP Progress Over Time"}),i.jsx("text",{x:-40,y:p/2,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",transform:`rotate(-90, -40, ${p/2})`,children:"Experience Points"})]})]})})},ux=({passedProjects:c=15,failedProjects:f=3,size:d=200,className:o=""})=>{const m=c+f,S=d/2-20,p=d/2,{passedPath:j,failedPath:D}=W.useMemo(()=>{if(m===0)return{passedAngle:0,failedAngle:0,passedPath:"",failedPath:""};const v=c/m*360,x=f/m*360,E=(B,X,te,ne)=>{const je=z(ne,ne,te,X),we=z(ne,ne,te,B),Ye=X-B<=180?"0":"1";return["M",ne,ne,"L",je.x,je.y,"A",te,te,0,Ye,0,we.x,we.y,"Z"].join(" ")},w=E(0,v,S,p),C=E(v,v+x,S,p);return{passedAngle:v,failedAngle:x,passedPath:w,failedPath:C}},[c,f,m,S,p]);function z(v,x,E,w){const C=(w-90)*Math.PI/180;return{x:v+E*Math.cos(C),y:x+E*Math.sin(C)}}const R=m>0?Math.round(c/m*100):0,T=m>0?Math.round(f/m*100):0;return m===0?i.jsx("div",{className:`flex items-center justify-center ${o}`,style:{width:d,height:d},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"w-16 h-16 border-4 border-surface-600 rounded-full mx-auto mb-2"}),i.jsx("p",{className:"text-sm",children:"No project data"})]})}):i.jsxs("div",{className:`relative ${o}`,style:{width:d,height:d},children:[i.jsxs("svg",{width:d,height:d,className:"transform -rotate-90",children:[i.jsx("defs",{children:i.jsxs("filter",{id:"pieGlow",children:[i.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),i.jsx(k.path,{d:j,fill:"#10b981",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.2},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`Passed: ${c} projects (${R}%)`})}),i.jsx(k.path,{d:D,fill:"#ef4444",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`Failed: ${f} projects (${T}%)`})}),i.jsx("circle",{cx:p,cy:p,r:S*.6,fill:"rgba(15, 23, 42, 0.9)",stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"})]}),i.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center text-center",children:[i.jsxs("div",{className:"text-2xl font-bold text-white",children:[R,"%"]}),i.jsx("div",{className:"text-xs text-surface-300 mt-1",children:"Success Rate"})]}),i.jsxs("div",{className:"absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 text-xs",children:[i.jsxs("div",{className:"flex items-center space-x-1",children:[i.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"}),i.jsxs("span",{className:"text-surface-300",children:["Passed (",c,")"]})]}),i.jsxs("div",{className:"flex items-center space-x-1",children:[i.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),i.jsxs("span",{className:"text-surface-300",children:["Failed (",f,")"]})]})]})]})},cx=({auditsGiven:c=24,auditsReceived:f=12,width:d=400,height:o=250,className:m=""})=>{const S={top:20,right:30,bottom:60,left:60},p=d-S.left-S.right,j=o-S.top-S.bottom,D=[{label:"Audits Given",value:c,color:"#14b8a6"},{label:"Audits Received",value:f,color:"#d946ef"}],z=Math.max(...D.map(w=>w.value)),R=p/D.length*.6,T=p/D.length,v=W.useCallback(w=>j-w/z*j,[j,z]),x=W.useMemo(()=>{const C=[];for(let B=0;B<=5;B++){const X=Math.round(z/5*B);C.push({value:X,y:v(X)})}return C},[z,v]),E=f>0?(c/f).toFixed(1):"∞";return i.jsx("div",{className:`w-full ${m}`,children:i.jsxs("svg",{width:d,height:o,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"givenGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.4"})]}),i.jsxs("linearGradient",{id:"receivedGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#d946ef",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"#d946ef",stopOpacity:"0.4"})]}),i.jsxs("filter",{id:"barGlow",children:[i.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsxs("g",{transform:`translate(${S.left}, ${S.top})`,children:[x.map((w,C)=>i.jsx("line",{x1:0,y1:w.y,x2:p,y2:w.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},C)),D.map((w,C)=>{const B=C*T+(T-R)/2,X=j-v(w.value),te=C===0?"givenGradient":"receivedGradient";return i.jsxs("g",{children:[i.jsx(k.rect,{x:B,y:v(w.value),width:R,height:X,fill:`url(#${te})`,stroke:w.color,strokeWidth:"2",rx:"4",filter:"url(#barGlow)",initial:{height:0,y:j},animate:{height:X,y:v(w.value)},transition:{duration:1,delay:C*.2,ease:"easeOut"},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`${w.label}: ${w.value}`})}),i.jsx(k.text,{x:B+R/2,y:v(w.value)-8,textAnchor:"middle",fill:"white",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:C*.2+.5},children:w.value}),i.jsx("text",{x:B+R/2,y:j+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:w.label.split(" ")[0]}),i.jsx("text",{x:B+R/2,y:j+35,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:w.label.split(" ")[1]})]},C)}),i.jsx("line",{x1:0,y1:0,x2:0,y2:j,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),i.jsx("line",{x1:0,y1:j,x2:p,y2:j,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),x.map((w,C)=>i.jsx("text",{x:-10,y:w.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:w.value},C)),i.jsx("text",{x:p/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"Audit Statistics"}),i.jsxs("g",{transform:`translate(${p-80}, 20)`,children:[i.jsx("rect",{x:0,y:0,width:80,height:40,fill:"rgba(255, 255, 255, 0.1)",stroke:"rgba(255, 255, 255, 0.2)",strokeWidth:"1",rx:"4"}),i.jsx("text",{x:40,y:15,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"10",fontFamily:"Inter, sans-serif",children:"Ratio"}),i.jsx("text",{x:40,y:32,textAnchor:"middle",fill:"#14b8a6",fontSize:"16",fontWeight:"700",fontFamily:"Inter, sans-serif",children:E})]})]})]})})},rx=({data:c=[],width:f=600,height:d=400,maxBars:o=15,className:m=""})=>{const S=W.useMemo(()=>{if(!c||c.length===0)return[];const T=c.slice(0,o),v=Math.max(...T.map(x=>x.totalXP));return T.map((x,E)=>({...x,percentage:x.totalXP/v*100,index:E}))},[c,o]),p={top:20,right:80,bottom:40,left:200},j=f-p.left-p.right,D=d-p.top-p.bottom,z=Math.max(20,D/Math.max(S.length,1)-4),R=(T,v=25)=>T?T.length>v?`${T.substring(0,v)}...`:T:"Unknown Project";return S.length?i.jsx("div",{className:m,children:i.jsxs("svg",{width:f,height:d,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpBarGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(147, 51, 234)",stopOpacity:"0.9"})]}),i.jsx("filter",{id:"barShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:i.jsx("feDropShadow",{dx:"2",dy:"2",stdDeviation:"3",floodOpacity:"0.3"})})]}),i.jsxs("text",{x:f/2,y:15,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:["XP Earned by Project (Top ",S.length,")"]}),i.jsxs("g",{transform:`translate(${p.left}, ${p.top})`,children:[[0,25,50,75,100].map(T=>i.jsxs("g",{children:[i.jsx("line",{x1:T/100*j,y1:0,x2:T/100*j,y2:D,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsxs("text",{x:T/100*j,y:D+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:[T,"%"]})]},T)),S.map((T,v)=>{const x=v*(z+4),E=T.percentage/100*j;return i.jsxs("g",{children:[i.jsx("text",{x:-10,y:x+z/2,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-200 text-xs font-medium",children:R(T.name)}),i.jsx("rect",{x:0,y:x,width:j,height:z,fill:"rgb(30, 41, 59)",rx:"4"}),i.jsx(k.rect,{x:0,y:x,width:E,height:z,fill:"url(#xpBarGradient)",filter:"url(#barShadow)",rx:"4",initial:{width:0},animate:{width:E},transition:{duration:.8,delay:v*.1,ease:"easeOut"}}),i.jsxs(k.text,{x:E+8,y:x+z/2,dominantBaseline:"middle",className:"fill-surface-100 text-xs font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:v*.1+.3},children:[Fs(T.totalXP)," XP"]}),i.jsx(k.rect,{x:0,y:x,width:j,height:z,fill:"transparent",className:"cursor-pointer",whileHover:{fill:"rgba(59, 130, 246, 0.1)"},transition:{duration:.2}})]},T.path||v)}),i.jsx("text",{x:-180,y:D/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -180, ${D/2})`,className:"fill-surface-300 text-sm font-medium",children:"Projects"}),i.jsx("text",{x:j/2,y:D+35,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Relative XP Distribution (%)"})]}),i.jsxs("g",{transform:`translate(${f-70}, 30)`,children:[i.jsx("rect",{x:0,y:0,width:12,height:8,fill:"url(#xpBarGradient)",rx:"2"}),i.jsx("text",{x:18,y:6,dominantBaseline:"middle",className:"fill-surface-300 text-xs",children:"XP Earned"})]})]})}):i.jsx("div",{className:`flex items-center justify-center ${m}`,style:{width:f,height:d},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"📊"}),i.jsx("div",{children:"No project data available"})]})})},fx=({data:c=[],width:f=700,height:d=400,className:o=""})=>{const m=W.useMemo(()=>{if(!c||c.length===0)return{points:[],maxXP:0,dateRange:null};const x=[...c].sort((B,X)=>new Date(B.date)-new Date(X.date)),E=Math.max(...x.map(B=>B.cumulativeXP)),w=new Date(x[0].date),C=new Date(x[x.length-1].date);return{points:x,maxXP:E,dateRange:{min:w,max:C}}},[c]),S={top:30,right:60,bottom:60,left:80},p=f-S.left-S.right,j=d-S.top-S.bottom,D=x=>Sc(x,{month:"short",day:"numeric",year:"2-digit"}),z=x=>x.length===0?"":x.map((w,C)=>{const B=(new Date(w.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*p,X=j-w.cumulativeXP/m.maxXP*j;return C===0?`M ${B} ${X}`:`L ${B} ${X}`}).join(" "),R=x=>{if(x.length===0)return"";const E=z(x),w=x[x.length-1],C=(new Date(w.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*p;return`${E} L ${C} ${j} L 0 ${j} Z`};if(!m.points.length)return i.jsx("div",{className:`flex items-center justify-center ${o}`,style:{width:f,height:d},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"📈"}),i.jsx("div",{children:"No timeline data available"})]})});const T=z(m.points),v=R(m.points);return i.jsx("div",{className:o,children:i.jsxs("svg",{width:f,height:d,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpTimelineGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.3"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.05"})]}),i.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)"}),i.jsx("stop",{offset:"50%",stopColor:"rgb(147, 51, 234)"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(236, 72, 153)"})]}),i.jsxs("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[i.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsx("text",{x:f/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"XP Progression Over Time"}),i.jsxs("g",{transform:`translate(${S.left}, ${S.top})`,children:[[0,.25,.5,.75,1].map(x=>{const E=j-x*j,w=x*m.maxXP;return i.jsxs("g",{children:[i.jsx("line",{x1:0,y1:E,x2:p,y2:E,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsx("text",{x:-10,y:E,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-400 text-xs",children:Fs(w)})]},x)}),m.dateRange&&[0,.25,.5,.75,1].map(x=>{const E=x*p,w=new Date(m.dateRange.min.getTime()+x*(m.dateRange.max.getTime()-m.dateRange.min.getTime()));return i.jsxs("g",{children:[i.jsx("line",{x1:E,y1:0,x2:E,y2:j,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsx("text",{x:E,y:j+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:D(w)})]},x)}),i.jsx(k.path,{d:v,fill:"url(#xpTimelineGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),i.jsx(k.path,{d:T,fill:"none",stroke:"url(#lineGradient)",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),m.points.map((x,E)=>{const w=(new Date(x.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*p,C=j-x.cumulativeXP/m.maxXP*j;return i.jsxs(k.g,{children:[i.jsx(k.circle,{cx:w,cy:C,r:"4",fill:"rgb(59, 130, 246)",stroke:"white",strokeWidth:"2",className:"cursor-pointer",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:E/m.points.length*2+.5},whileHover:{scale:1.5}}),i.jsxs(k.g,{initial:{opacity:0},whileHover:{opacity:1},transition:{duration:.2},children:[i.jsx("rect",{x:w-60,y:C-40,width:"120",height:"30",fill:"rgb(30, 41, 59)",stroke:"rgb(71, 85, 105)",rx:"4",className:"pointer-events-none"}),i.jsxs("text",{x:w,y:C-30,textAnchor:"middle",className:"fill-surface-100 text-xs font-medium pointer-events-none",children:[Fs(x.cumulativeXP)," XP"]}),i.jsx("text",{x:w,y:C-18,textAnchor:"middle",className:"fill-surface-400 text-xs pointer-events-none",children:D(x.date)})]})]},E)}),i.jsx("text",{x:-50,y:j/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -50, ${j/2})`,className:"fill-surface-300 text-sm font-medium",children:"Cumulative XP"}),i.jsx("text",{x:p/2,y:j+45,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Timeline"})]}),i.jsxs("g",{transform:`translate(${f-150}, 40)`,children:[i.jsx("rect",{x:0,y:0,width:"140",height:"60",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsxs("text",{x:10,y:18,className:"fill-surface-200 text-xs font-medium",children:["Total XP: ",Fs(m.maxXP)]}),i.jsxs("text",{x:10,y:32,className:"fill-surface-400 text-xs",children:["Projects: ",m.points.length]}),i.jsxs("text",{x:10,y:46,className:"fill-surface-400 text-xs",children:["Duration: ",Math.ceil((m.dateRange.max-m.dateRange.min)/(1e3*60*60*24))," days"]})]})]})})},ox=({data:c={},width:f=500,height:d=400,className:o=""})=>{const m=W.useMemo(()=>{const{jsStats:T={},goStats:v={},overall:x={}}=c,E=[];x.passed>0&&E.push({label:"Passed",value:x.passed,percentage:x.passed/x.total*100,color:"rgb(34, 197, 94)",hoverColor:"rgb(22, 163, 74)"}),x.failed>0&&E.push({label:"Failed",value:x.failed,percentage:x.failed/x.total*100,color:"rgb(239, 68, 68)",hoverColor:"rgb(220, 38, 38)"});let w=-90;return{segments:E.map(B=>{const X=B.percentage/100*360,te={...B,startAngle:w,endAngle:w+X,angle:X};return w+=X,te}),jsStats:T,goStats:v,overall:x}},[c]),S=f/2,p=d/2,j=Math.min(f,d)/3,D=j*.4,z=(T,v,x,E)=>{const w=(E-90)*Math.PI/180;return{x:T+x*Math.cos(w),y:v+x*Math.sin(w)}},R=(T,v,x,E,w,C=0)=>{const B=z(T,v,x,w),X=z(T,v,x,E),te=w-E<=180?"0":"1";if(C>0){const ne=z(T,v,C,w),je=z(T,v,C,E);return["M",B.x,B.y,"A",x,x,0,te,0,X.x,X.y,"L",je.x,je.y,"A",C,C,0,te,1,ne.x,ne.y,"Z"].join(" ")}else return["M",T,v,"L",B.x,B.y,"A",x,x,0,te,0,X.x,X.y,"Z"].join(" ")};return!m.segments.length||m.overall.total===0?i.jsx("div",{className:`flex items-center justify-center ${o}`,style:{width:f,height:d},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"🥧"}),i.jsx("div",{children:"No piscine data available"})]})}):i.jsx("div",{className:o,children:i.jsxs("svg",{width:f,height:d,className:"overflow-visible",children:[i.jsx("defs",{children:i.jsx("filter",{id:"pieShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:i.jsx("feDropShadow",{dx:"2",dy:"4",stdDeviation:"4",floodOpacity:"0.3"})})}),i.jsx("text",{x:f/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"Piscine Performance Overview"}),m.segments.map((T,v)=>{const x=R(S,p,j,T.startAngle,T.endAngle,D),E=(T.startAngle+T.endAngle)/2,w=j+30,C=z(S,p,w,E);return i.jsxs("g",{children:[i.jsx(k.path,{d:x,fill:T.color,filter:"url(#pieShadow)",className:"cursor-pointer",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.6,delay:v*.2,ease:"easeOut"},whileHover:{fill:T.hoverColor,scale:1.05}}),i.jsxs(k.text,{x:C.x,y:C.y,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-100 text-sm font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:v*.2+.3},children:[T.percentage.toFixed(1),"%"]}),i.jsxs(k.text,{x:C.x,y:C.y+15,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-400 text-xs",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:v*.2+.4},children:["(",T.value," ",T.label.toLowerCase(),")"]})]},T.label)}),i.jsxs("g",{children:[i.jsx("text",{x:S,y:p-10,textAnchor:"middle",className:"fill-surface-100 text-lg font-bold",children:m.overall.total}),i.jsx("text",{x:S,y:p+8,textAnchor:"middle",className:"fill-surface-400 text-sm",children:"Total Attempts"})]}),i.jsx("g",{transform:`translate(20, ${d-100})`,children:m.segments.map((T,v)=>i.jsxs("g",{transform:`translate(0, ${v*20})`,children:[i.jsx("rect",{x:0,y:0,width:12,height:12,fill:T.color,rx:"2"}),i.jsxs("text",{x:18,y:9,dominantBaseline:"middle",className:"fill-surface-200 text-sm",children:[T.label,": ",T.value]})]},T.label))}),i.jsxs("g",{transform:`translate(${f-180}, 50)`,children:[i.jsx("rect",{x:0,y:0,width:"170",height:"120",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Breakdown by Track"}),i.jsx("text",{x:10,y:38,className:"fill-surface-300 text-xs font-medium",children:"JavaScript Piscine:"}),i.jsxs("text",{x:15,y:52,className:"fill-surface-400 text-xs",children:["Passed: ",m.jsStats.passed||0]}),i.jsxs("text",{x:15,y:64,className:"fill-surface-400 text-xs",children:["Failed: ",m.jsStats.failed||0]}),i.jsx("text",{x:10,y:84,className:"fill-surface-300 text-xs font-medium",children:"Go Piscine:"}),i.jsxs("text",{x:15,y:98,className:"fill-surface-400 text-xs",children:["Passed: ",m.goStats.passed||0]}),i.jsxs("text",{x:15,y:110,className:"fill-surface-400 text-xs",children:["Failed: ",m.goStats.failed||0]})]}),i.jsxs("g",{transform:`translate(${f-180}, 180)`,children:[i.jsx("rect",{x:0,y:0,width:"170",height:"40",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Success Rate"}),i.jsxs("text",{x:10,y:32,className:"fill-primary-400 text-lg font-bold",children:[m.overall.passRate?.toFixed(1)||0,"%"]})]})]})})},dx=()=>{const{xpProgression:c,loading:f}=Dc(),{passedProjects:d,failedProjects:o,loading:m}=zc(),{auditsGiven:S,auditsReceived:p,loading:j}=Oc(),{xpByProject:D,loading:z}=qg(),{xpTimeline:R,loading:T}=Cg(),{piscineStats:v,loading:x}=Gg();return f||m||j||z||T||x?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsx(ft,{}),i.jsx(ft,{}),i.jsx(ft,{}),i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsx(ft,{})}),i.jsx("div",{className:"lg:col-span-2",children:i.jsx(ft,{})}),i.jsx(ft,{})]}):i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(ni,{className:"w-5 h-5 mr-2"}),"XP Progression Timeline"]}),i.jsx(G.Description,{children:"Your cumulative experience points growth over time"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(fx,{data:R,width:900,height:400})})})]})}),i.jsx("div",{className:"lg:col-span-2",children:i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Xd,{className:"w-5 h-5 mr-2"}),"XP by Project"]}),i.jsx(G.Description,{children:"Top projects ranked by experience points earned"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(rx,{data:D,width:700,height:500,maxBars:15})})})]})}),i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Cd,{className:"w-5 h-5 mr-2"}),"Piscine Performance"]}),i.jsx(G.Description,{children:"JavaScript and Go piscine statistics"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(ox,{data:v,width:400,height:350})})})]}),i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Gn,{className:"w-5 h-5 mr-2"}),"XP Progress Overview"]}),i.jsx(G.Description,{children:"Your experience points progression summary"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(ix,{data:c,width:400,height:300})})})]}),i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Um,{className:"w-5 h-5 mr-2"}),"Project Success Rate"]}),i.jsx(G.Description,{children:"Pass/Fail ratio for your projects"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center py-8",children:i.jsx(ux,{passedProjects:d,failedProjects:o,size:250})})})]}),i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center",children:[i.jsx(Mm,{className:"w-5 h-5 mr-2"}),"Audit Performance Analytics"]}),i.jsx(G.Description,{children:"Comprehensive audit statistics and performance metrics"})]}),i.jsx(G.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(cx,{auditsGiven:S,auditsReceived:p,width:900,height:400})})})]})})]})},hx=()=>{const[c,f]=W.useState(""),[d,o]=W.useState("all"),[m,S]=W.useState("date"),p=[{id:1,user:"mohamedmoo",project:"mini-framework",result:"Pass",status:"pass",date:"2024-01-15",grade:1.2},{id:2,user:"musabd",project:"social-network",result:"Pass",status:"pass",date:"2024-01-14",grade:1},{id:3,user:"hadieif",project:"social-network",result:"Fail",status:"fail",date:"2024-01-13",grade:.8},{id:4,user:"aalmadhoo",project:"real-time-forum",result:"Pass",status:"pass",date:"2024-01-12",grade:1.5},{id:5,user:"hussainali2",project:"graphql",result:"Pass",status:"pass",date:"2024-01-11",grade:1.1},{id:6,user:"aabdulhu",project:"mini-framework",result:"Fail",status:"fail",date:"2024-01-10",grade:.6},{id:7,user:"yoowad",project:"graphql",result:"Pass",status:"pass",date:"2024-01-09",grade:1.3},{id:8,user:"musabd",project:"real-time-forum",result:"Pass",status:"pass",date:"2024-01-08",grade:1},{id:9,user:"mohamedmoo",project:"make-your-game",result:"Pass",status:"pass",date:"2024-01-07",grade:1.4}],j=p.filter(T=>{const v=T.user.toLowerCase().includes(c.toLowerCase())||T.project.toLowerCase().includes(c.toLowerCase()),x=d==="all"||T.status===d;return v&&x}).sort((T,v)=>{switch(m){case"date":return new Date(v.date)-new Date(T.date);case"user":return T.user.localeCompare(v.user);case"project":return T.project.localeCompare(v.project);default:return 0}}),D=p.filter(T=>T.status==="pass").length,z=p.filter(T=>T.status==="fail").length,R=p.reduce((T,v)=>T+v.grade,0)/p.length;return i.jsxs("div",{className:"space-y-6",children:[i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[i.jsx(G,{children:i.jsxs(G.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-green-500/20 rounded-lg",children:i.jsx(Nc,{className:"w-6 h-6 text-green-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:D}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Passed Audits"})]})]})}),i.jsx(G,{children:i.jsxs(G.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-red-500/20 rounded-lg",children:i.jsx(Rm,{className:"w-6 h-6 text-red-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:z}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Failed Audits"})]})]})}),i.jsx(G,{children:i.jsxs(G.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-primary-500/20 rounded-lg",children:i.jsx(bc,{className:"w-6 h-6 text-primary-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:R.toFixed(1)}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Average Grade"})]})]})})]}),i.jsx(G,{children:i.jsx(G.Content,{children:i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[i.jsxs("div",{className:"flex-1 relative",children:[i.jsx(At,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",placeholder:"Search audits...",value:c,onChange:T=>f(T.target.value),className:"material-input pl-10 w-full"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Bn,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:d,onChange:T=>o(T.target.value),className:"material-input",children:[i.jsx("option",{value:"all",children:"All Status"}),i.jsx("option",{value:"pass",children:"Passed"}),i.jsx("option",{value:"fail",children:"Failed"})]})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(qd,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:m,onChange:T=>S(T.target.value),className:"material-input",children:[i.jsx("option",{value:"date",children:"Sort by Date"}),i.jsx("option",{value:"user",children:"Sort by User"}),i.jsx("option",{value:"project",children:"Sort by Project"})]})]})]})})}),i.jsxs(G,{children:[i.jsxs(G.Header,{children:[i.jsxs(G.Title,{className:"flex items-center justify-between",children:[i.jsxs("div",{className:"flex items-center",children:[i.jsx(bc,{className:"w-5 h-5 mr-2"}),"Audits (",j.length,")"]}),i.jsxs(Na,{variant:"primary",size:"sm",children:[(D/p.length*100).toFixed(0),"% Pass Rate"]})]}),i.jsx(G.Description,{children:"Your recent audit history"})]}),i.jsxs(G.Content,{children:[i.jsx("div",{className:"overflow-x-auto",children:i.jsxs("table",{className:"w-full",children:[i.jsx("thead",{children:i.jsxs("tr",{className:"border-b border-white/10",children:[i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"User"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Project"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Grade"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Date"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Result"})]})}),i.jsx("tbody",{children:j.map((T,v)=>i.jsxs(k.tr,{className:"border-b border-white/5 hover:bg-white/5 transition-colors",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2,delay:v*.05},children:[i.jsx("td",{className:"py-3 px-4 text-white font-medium",children:T.user}),i.jsx("td",{className:"py-3 px-4 text-surface-300",children:T.project}),i.jsx("td",{className:"py-3 px-4",children:i.jsx("span",{className:`font-semibold ${T.grade>=1?"text-green-400":"text-red-400"}`,children:T.grade.toFixed(1)})}),i.jsx("td",{className:"py-3 px-4 text-surface-400 text-sm",children:new Date(T.date).toLocaleDateString()}),i.jsx("td",{className:"py-3 px-4",children:i.jsx(Ig,{status:T.status})})]},T.id))})]})}),j.length===0&&i.jsxs("div",{className:"text-center py-8 text-surface-400",children:[i.jsx(At,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),i.jsx("p",{children:"No audits found matching your criteria"})]})]})]})]})},mx=()=>{const[c,f]=W.useState(""),[d,o]=W.useState("xp"),{skills:m,loading:S}=Ug(),p=[{name:"JavaScript",totalXP:2500,projects:8,type:"language",level:"Advanced"},{name:"Go",totalXP:1800,projects:5,type:"language",level:"Intermediate"},{name:"React",totalXP:1500,projects:6,type:"framework",level:"Intermediate"},{name:"Docker",totalXP:1200,projects:4,type:"tool",level:"Intermediate"},{name:"PostgreSQL",totalXP:1e3,projects:3,type:"database",level:"Beginner"},{name:"GraphQL",totalXP:800,projects:2,type:"api",level:"Beginner"},{name:"Node.js",totalXP:1400,projects:5,type:"runtime",level:"Intermediate"},{name:"Git",totalXP:2e3,projects:10,type:"tool",level:"Advanced"}],j=m.length>0?m:p,D=j.filter(v=>v.name.toLowerCase().includes(c.toLowerCase())).sort((v,x)=>{switch(d){case"xp":return x.totalXP-v.totalXP;case"projects":return x.projects-v.projects;case"name":return v.name.localeCompare(x.name);default:return 0}}),z=v=>{switch(v){case"language":return i.jsx(Bm,{className:"w-4 h-4"});case"database":return i.jsx(Gm,{className:"w-4 h-4"});case"framework":case"api":return i.jsx(Cm,{className:"w-4 h-4"});default:return i.jsx(qm,{className:"w-4 h-4"})}},R=v=>{switch(v){case"Advanced":return"success";case"Intermediate":return"primary";case"Beginner":return"warning";default:return"secondary"}},T=Math.max(...j.map(v=>v.totalXP));return S?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[i.jsx(ft,{}),i.jsx(ft,{})]}):i.jsxs("div",{className:"space-y-6",children:[i.jsx(G,{children:i.jsx(G.Content,{children:i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[i.jsxs("div",{className:"flex-1 relative",children:[i.jsx(At,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",placeholder:"Search technologies...",value:c,onChange:v=>f(v.target.value),className:"material-input pl-10 w-full"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Bn,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:d,onChange:v=>o(v.target.value),className:"material-input",children:[i.jsx("option",{value:"xp",children:"Sort by XP"}),i.jsx("option",{value:"projects",children:"Sort by Projects"}),i.jsx("option",{value:"name",children:"Sort by Name"})]})]})]})})}),i.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:D.map((v,x)=>i.jsx(k.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:x*.1},children:i.jsx(G,{hover:!0,className:"h-full",children:i.jsxs(G.Content,{children:[i.jsxs("div",{className:"flex items-start justify-between mb-3",children:[i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("div",{className:"p-2 bg-primary-500/20 rounded-lg text-primary-400",children:z(v.type)}),i.jsxs("div",{children:[i.jsx("h3",{className:"font-semibold text-white",children:v.name}),i.jsx("p",{className:"text-xs text-surface-400 capitalize",children:v.type})]})]}),i.jsx(Na,{variant:R(v.level||"Beginner"),size:"sm",children:v.level||"Beginner"})]}),i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{children:[i.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[i.jsx("span",{className:"text-surface-300",children:"Experience"}),i.jsxs("span",{className:"text-primary-300",children:[v.totalXP.toLocaleString()," XP"]})]}),i.jsx(kg,{value:v.totalXP,max:T,size:"sm",color:"primary",showValue:!1})]}),i.jsxs("div",{className:"flex justify-between text-sm",children:[i.jsx("span",{className:"text-surface-300",children:"Projects"}),i.jsx("span",{className:"text-accent-300 font-medium",children:v.projects})]})]})]})})},v.name))}),D.length===0&&i.jsx(G,{children:i.jsx(G.Content,{children:i.jsxs("div",{className:"text-center py-8 text-surface-400",children:[i.jsx(At,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),i.jsxs("p",{children:['No technologies found matching "',c,'"']})]})})})]})},gx=()=>{const[c,f]=W.useState("profile"),[d,o]=W.useState(!1),{logout:m,user:S}=et(),{profile:p,totalXP:j,loading:D,error:z}=Mg();W.useEffect(()=>{o(!1)},[c]);const R=[{id:"profile",label:"Profile & Data",icon:ei},{id:"search",label:"Search Queries",icon:At},{id:"stats",label:"Statistics",icon:Xd},{id:"audits",label:"Audits",icon:bc},{id:"technologies",label:"Technologies",icon:vc}],T=()=>{m()};return D?i.jsx("div",{className:"min-h-screen flex items-center justify-center",children:i.jsx(ti,{size:"lg",text:"Loading your dashboard..."})}):z?(console.error("Dashboard error:",z),i.jsx("div",{className:"min-h-screen flex items-center justify-center p-4",children:i.jsxs(G,{className:"max-w-md text-center",children:[i.jsxs(G.Header,{children:[i.jsx(G.Title,{className:"text-red-400",children:"Error Loading Dashboard"}),i.jsx(G.Description,{children:z.message||"Failed to load dashboard data"})]}),i.jsx(G.Content,{children:i.jsxs("div",{className:"space-y-3",children:[i.jsx(qt,{onClick:()=>window.location.reload(),className:"w-full",children:"Reload Page"}),!1]})})]})})):i.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 pb-20 md:pb-0",children:[i.jsx("header",{className:"sticky top-0 z-40 bg-surface-900/80 backdrop-blur-md border-b border-white/10",children:i.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[i.jsxs("div",{className:"flex items-center justify-between h-16",children:[i.jsxs("div",{className:"flex items-center",children:[i.jsx(k.div,{initial:{scale:0},animate:{scale:1},className:"w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-400 rounded-lg flex items-center justify-center mr-3",children:i.jsx(ei,{className:"w-5 h-5 text-white"})}),i.jsx("h1",{className:"text-lg md:text-xl font-bold gradient-text",children:"Profile Dashboard"})]}),i.jsxs("div",{className:"hidden md:flex items-center space-x-4",children:[i.jsxs("div",{className:"text-right",children:[i.jsx("p",{className:"text-sm font-medium text-white",children:ai(p)||S?.username}),i.jsxs("p",{className:"text-xs text-surface-400",children:[Ud(j)," XP"]})]}),i.jsx(qt,{variant:"ghost",size:"sm",onClick:T,className:"text-surface-300 hover:text-red-400",children:i.jsx(Ed,{className:"w-4 h-4"})})]}),i.jsx("div",{className:"md:hidden",children:i.jsx(qt,{variant:"ghost",size:"sm",onClick:()=>o(!d),className:"text-surface-300",children:d?i.jsx(Xm,{className:"w-5 h-5"}):i.jsx(Hm,{className:"w-5 h-5"})})})]}),d&&i.jsx(k.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"md:hidden border-t border-white/10 py-4",children:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-sm font-medium text-white",children:ai(p)||S?.username}),i.jsxs("p",{className:"text-xs text-surface-400",children:[Ud(j)," XP"]})]}),i.jsxs(qt,{variant:"ghost",size:"sm",onClick:T,className:"text-surface-300 hover:text-red-400",children:[i.jsx(Ed,{className:"w-4 h-4 mr-2"}),"Logout"]})]})})]})}),i.jsx("nav",{className:"sticky top-16 z-30 bg-surface-800/80 backdrop-blur-md border-b border-white/10 hidden md:block",children:i.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:i.jsx("div",{className:"flex space-x-8 overflow-x-auto",children:R.map(v=>{const x=v.icon,E=c===v.id;return i.jsxs(k.button,{onClick:()=>f(v.id),className:`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap relative ${E?"border-primary-400 text-primary-300":"border-transparent text-surface-400 hover:text-surface-200"}`,whileHover:{y:-2},whileTap:{y:0},children:[i.jsx(x,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm font-medium",children:v.label}),E&&i.jsx(k.div,{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400",layoutId:"activeTabIndicator",transition:{type:"spring",stiffness:500,damping:30}})]},v.id)})})})}),i.jsx(Kg,{tabs:R,activeTab:c,onTabChange:f}),i.jsx("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:i.jsxs(k.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[c==="profile"&&i.jsx(lx,{}),c==="search"&&i.jsx(sx,{}),c==="stats"&&i.jsx(dx,{}),c==="audits"&&i.jsx(hx,{}),c==="technologies"&&i.jsx(mx,{})]},c)})]})};class xx extends W.Component{constructor(f){super(f),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(f,d){this.setState({error:f,errorInfo:d})}handleRetry=()=>{this.setState({hasError:!1,error:null,errorInfo:null})};handleReload=()=>{window.location.reload()};render(){return this.state.hasError?i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 flex items-center justify-center p-4",children:i.jsx(k.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"max-w-md w-full",children:i.jsx(G,{className:"text-center",children:i.jsxs(G.Content,{children:[i.jsx(k.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4",children:i.jsx(Lm,{className:"w-8 h-8 text-red-400"})}),i.jsx("h1",{className:"text-2xl font-bold text-white mb-2",children:"Oops! Something went wrong"}),i.jsx("p",{className:"text-surface-300 mb-6",children:"We encountered an unexpected error. This has been logged and we'll look into it."}),!1,i.jsxs("div",{className:"flex flex-col sm:flex-row gap-3",children:[i.jsxs(qt,{onClick:this.handleRetry,className:"flex-1",variant:"primary",children:[i.jsx(Qm,{className:"w-4 h-4 mr-2"}),"Try Again"]}),i.jsxs(qt,{onClick:this.handleReload,className:"flex-1",variant:"secondary",children:[i.jsx(Ym,{className:"w-4 h-4 mr-2"}),"Reload Page"]})]})]})})})}):this.props.children}}const yx=()=>{const{isAuthenticated:c,isInitialized:f}=et();return f?c?i.jsx(gx,{}):i.jsx(xg,{}):i.jsx(ti,{fullScreen:!0,size:"lg",text:"Initializing..."})};function px(){return i.jsx(xx,{children:i.jsx(Tm,{client:Vd,children:i.jsx(rg,{children:i.jsx(yx,{})})})})}km.createRoot(document.getElementById("root")).render(i.jsx(W.StrictMode,{children:i.jsx(px,{})}));
