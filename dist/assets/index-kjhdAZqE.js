import{r as W,j as n,m as K,R as ra}from"./animation-vendor-Ixux-_Rc.js";import{r as o0,a as f0}from"./react-vendor-DJG_os-6.js";import{g as C,A as d0,u as m0,a as kc,_ as h0,O as cm,b as g0,P as p0,c as y0,I as x0,d as v0,e as b0,f as j0,h as Qc,i as A0}from"./apollo-vendor-BfOfohIE.js";import{L as Fd,M as um,U as mr,a as S0,E as _0,b as N0,T as T0,R as w0,H as R0,c as E0,C as om,d as yr,e as Fa,A as hr,f as Xl,S as na,g as gr,F as Qs,h as fm,i as dm,j as Zc,k as mm,Z as Cc,l as U0,m as D0,n as O0,o as Bc,p as I0,G as M0,D as q0,q as Wd,r as em,X as $0,s as G0}from"./ui-vendor-BVKAYv04.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))f(m);new MutationObserver(m=>{for(const p of m)if(p.type==="childList")for(const v of p.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&f(v)}).observe(document,{childList:!0,subtree:!0});function u(m){const p={};return m.integrity&&(p.integrity=m.integrity),m.referrerPolicy&&(p.referrerPolicy=m.referrerPolicy),m.crossOrigin==="use-credentials"?p.credentials="include":m.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function f(m){if(m.ep)return;m.ep=!0;const p=u(m);fetch(m.href,p)}})();var $c={exports:{}},Ls={},Gc={exports:{}},zc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tm;function z0(){return tm||(tm=1,function(i){function c(U,H){var J=U.length;U.push(H);e:for(;0<J;){var xe=J-1>>>1,fe=U[xe];if(0<m(fe,H))U[xe]=H,U[J]=fe,J=xe;else break e}}function u(U){return U.length===0?null:U[0]}function f(U){if(U.length===0)return null;var H=U[0],J=U.pop();if(J!==H){U[0]=J;e:for(var xe=0,fe=U.length,Xe=fe>>>1;xe<Xe;){var _e=2*(xe+1)-1,re=U[_e],Re=_e+1,xt=U[Re];if(0>m(re,J))Re<fe&&0>m(xt,re)?(U[xe]=xt,U[Re]=J,xe=Re):(U[xe]=re,U[_e]=J,xe=_e);else if(Re<fe&&0>m(xt,J))U[xe]=xt,U[Re]=J,xe=Re;else break e}}return H}function m(U,H){var J=U.sortIndex-H.sortIndex;return J!==0?J:U.id-H.id}if(i.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var p=performance;i.unstable_now=function(){return p.now()}}else{var v=Date,y=v.now();i.unstable_now=function(){return v.now()-y}}var O=[],D=[],I=1,g=null,b=3,x=!1,_=!1,A=!1,q=!1,B=typeof setTimeout=="function"?setTimeout:null,M=typeof clearTimeout=="function"?clearTimeout:null,X=typeof setImmediate<"u"?setImmediate:null;function V(U){for(var H=u(D);H!==null;){if(H.callback===null)f(D);else if(H.startTime<=U)f(D),H.sortIndex=H.expirationTime,c(O,H);else break;H=u(D)}}function ne(U){if(A=!1,V(U),!_)if(u(O)!==null)_=!0,Ue||(Ue=!0,Ke());else{var H=u(D);H!==null&&Qe(ne,H.startTime-U)}}var Ue=!1,De=-1,Q=5,Te=-1;function ze(){return q?!0:!(i.unstable_now()-Te<Q)}function Mt(){if(q=!1,Ue){var U=i.unstable_now();Te=U;var H=!0;try{e:{_=!1,A&&(A=!1,M(De),De=-1),x=!0;var J=b;try{t:{for(V(U),g=u(O);g!==null&&!(g.expirationTime>U&&ze());){var xe=g.callback;if(typeof xe=="function"){g.callback=null,b=g.priorityLevel;var fe=xe(g.expirationTime<=U);if(U=i.unstable_now(),typeof fe=="function"){g.callback=fe,V(U),H=!0;break t}g===u(O)&&f(O),V(U)}else f(O);g=u(O)}if(g!==null)H=!0;else{var Xe=u(D);Xe!==null&&Qe(ne,Xe.startTime-U),H=!1}}break e}finally{g=null,b=J,x=!1}H=void 0}}finally{H?Ke():Ue=!1}}}var Ke;if(typeof X=="function")Ke=function(){X(Mt)};else if(typeof MessageChannel<"u"){var oe=new MessageChannel,we=oe.port2;oe.port1.onmessage=Mt,Ke=function(){we.postMessage(null)}}else Ke=function(){B(Mt,0)};function Qe(U,H){De=B(function(){U(i.unstable_now())},H)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(U){U.callback=null},i.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<U?Math.floor(1e3/U):5},i.unstable_getCurrentPriorityLevel=function(){return b},i.unstable_next=function(U){switch(b){case 1:case 2:case 3:var H=3;break;default:H=b}var J=b;b=H;try{return U()}finally{b=J}},i.unstable_requestPaint=function(){q=!0},i.unstable_runWithPriority=function(U,H){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var J=b;b=U;try{return H()}finally{b=J}},i.unstable_scheduleCallback=function(U,H,J){var xe=i.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?xe+J:xe):J=xe,U){case 1:var fe=-1;break;case 2:fe=250;break;case 5:fe=1073741823;break;case 4:fe=1e4;break;default:fe=5e3}return fe=J+fe,U={id:I++,callback:H,priorityLevel:U,startTime:J,expirationTime:fe,sortIndex:-1},J>xe?(U.sortIndex=J,c(D,U),u(O)===null&&U===u(D)&&(A?(M(De),De=-1):A=!0,Qe(ne,J-xe))):(U.sortIndex=fe,c(O,U),_||x||(_=!0,Ue||(Ue=!0,Ke()))),U},i.unstable_shouldYield=ze,i.unstable_wrapCallback=function(U){var H=b;return function(){var J=b;b=H;try{return U.apply(this,arguments)}finally{b=J}}}}(zc)),zc}var am;function C0(){return am||(am=1,Gc.exports=z0()),Gc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lm;function B0(){if(lm)return Ls;lm=1;var i=C0(),c=o0(),u=f0();function f(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function m(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function p(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function v(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function y(e){if(p(e)!==e)throw Error(f(188))}function O(e){var t=e.alternate;if(!t){if(t=p(e),t===null)throw Error(f(188));return t!==e?null:e}for(var a=e,l=t;;){var s=a.return;if(s===null)break;var r=s.alternate;if(r===null){if(l=s.return,l!==null){a=l;continue}break}if(s.child===r.child){for(r=s.child;r;){if(r===a)return y(s),e;if(r===l)return y(s),t;r=r.sibling}throw Error(f(188))}if(a.return!==l.return)a=s,l=r;else{for(var o=!1,d=s.child;d;){if(d===a){o=!0,a=s,l=r;break}if(d===l){o=!0,l=s,a=r;break}d=d.sibling}if(!o){for(d=r.child;d;){if(d===a){o=!0,a=r,l=s;break}if(d===l){o=!0,l=r,a=s;break}d=d.sibling}if(!o)throw Error(f(189))}}if(a.alternate!==l)throw Error(f(190))}if(a.tag!==3)throw Error(f(188));return a.stateNode.current===a?e:t}function D(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=D(e),t!==null)return t;e=e.sibling}return null}var I=Object.assign,g=Symbol.for("react.element"),b=Symbol.for("react.transitional.element"),x=Symbol.for("react.portal"),_=Symbol.for("react.fragment"),A=Symbol.for("react.strict_mode"),q=Symbol.for("react.profiler"),B=Symbol.for("react.provider"),M=Symbol.for("react.consumer"),X=Symbol.for("react.context"),V=Symbol.for("react.forward_ref"),ne=Symbol.for("react.suspense"),Ue=Symbol.for("react.suspense_list"),De=Symbol.for("react.memo"),Q=Symbol.for("react.lazy"),Te=Symbol.for("react.activity"),ze=Symbol.for("react.memo_cache_sentinel"),Mt=Symbol.iterator;function Ke(e){return e===null||typeof e!="object"?null:(e=Mt&&e[Mt]||e["@@iterator"],typeof e=="function"?e:null)}var oe=Symbol.for("react.client.reference");function we(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===oe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case _:return"Fragment";case q:return"Profiler";case A:return"StrictMode";case ne:return"Suspense";case Ue:return"SuspenseList";case Te:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case x:return"Portal";case X:return(e.displayName||"Context")+".Provider";case M:return(e._context.displayName||"Context")+".Consumer";case V:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case De:return t=e.displayName||null,t!==null?t:we(e.type)||"Memo";case Q:t=e._payload,e=e._init;try{return we(e(t))}catch{}}return null}var Qe=Array.isArray,U=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,J={pending:!1,data:null,method:null,action:null},xe=[],fe=-1;function Xe(e){return{current:e}}function _e(e){0>fe||(e.current=xe[fe],xe[fe]=null,fe--)}function re(e,t){fe++,xe[fe]=e.current,e.current=t}var Re=Xe(null),xt=Xe(null),k=Xe(null),Je=Xe(null);function Lt(e,t){switch(re(k,t),re(xt,e),re(Re,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Td(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Td(t),e=wd(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}_e(Re),re(Re,e)}function vt(){_e(Re),_e(xt),_e(k)}function jr(e){e.memoizedState!==null&&re(Je,e);var t=Re.current,a=wd(t,e.type);t!==a&&(re(xt,e),re(Re,a))}function Js(e){xt.current===e&&(_e(Re),_e(xt)),Je.current===e&&(_e(Je),zs._currentValue=J)}var Ar=Object.prototype.hasOwnProperty,Sr=i.unstable_scheduleCallback,_r=i.unstable_cancelCallback,Hm=i.unstable_shouldYield,Lm=i.unstable_requestPaint,qt=i.unstable_now,Ym=i.unstable_getCurrentPriorityLevel,su=i.unstable_ImmediatePriority,nu=i.unstable_UserBlockingPriority,Fs=i.unstable_NormalPriority,km=i.unstable_LowPriority,ru=i.unstable_IdlePriority,Qm=i.log,Zm=i.unstable_setDisableYieldValue,Ql=null,ct=null;function ca(e){if(typeof Qm=="function"&&Zm(e),ct&&typeof ct.setStrictMode=="function")try{ct.setStrictMode(Ql,e)}catch{}}var ut=Math.clz32?Math.clz32:Km,Vm=Math.log,Pm=Math.LN2;function Km(e){return e>>>=0,e===0?32:31-(Vm(e)/Pm|0)|0}var Ws=256,en=4194304;function Ia(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function tn(e,t,a){var l=e.pendingLanes;if(l===0)return 0;var s=0,r=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var d=l&134217727;return d!==0?(l=d&~r,l!==0?s=Ia(l):(o&=d,o!==0?s=Ia(o):a||(a=d&~e,a!==0&&(s=Ia(a))))):(d=l&~r,d!==0?s=Ia(d):o!==0?s=Ia(o):a||(a=l&~e,a!==0&&(s=Ia(a)))),s===0?0:t!==0&&t!==s&&(t&r)===0&&(r=s&-s,a=t&-t,r>=a||r===32&&(a&4194048)!==0)?t:s}function Zl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Jm(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function iu(){var e=Ws;return Ws<<=1,(Ws&4194048)===0&&(Ws=256),e}function cu(){var e=en;return en<<=1,(en&62914560)===0&&(en=4194304),e}function Nr(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Vl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fm(e,t,a,l,s,r){var o=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var d=e.entanglements,h=e.expirationTimes,T=e.hiddenUpdates;for(a=o&~a;0<a;){var $=31-ut(a),z=1<<$;d[$]=0,h[$]=-1;var w=T[$];if(w!==null)for(T[$]=null,$=0;$<w.length;$++){var R=w[$];R!==null&&(R.lane&=-536870913)}a&=~z}l!==0&&uu(e,l,0),r!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=r&~(o&~t))}function uu(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-ut(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|a&4194090}function ou(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var l=31-ut(a),s=1<<l;s&t|e[l]&t&&(e[l]|=t),a&=~s}}function Tr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function wr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function fu(){var e=H.p;return e!==0?e:(e=window.event,e===void 0?32:Qd(e.type))}function Wm(e,t){var a=H.p;try{return H.p=e,t()}finally{H.p=a}}var ua=Math.random().toString(36).slice(2),Fe="__reactFiber$"+ua,at="__reactProps$"+ua,al="__reactContainer$"+ua,Rr="__reactEvents$"+ua,eh="__reactListeners$"+ua,th="__reactHandles$"+ua,du="__reactResources$"+ua,Pl="__reactMarker$"+ua;function Er(e){delete e[Fe],delete e[at],delete e[Rr],delete e[eh],delete e[th]}function ll(e){var t=e[Fe];if(t)return t;for(var a=e.parentNode;a;){if(t=a[al]||a[Fe]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Dd(e);e!==null;){if(a=e[Fe])return a;e=Dd(e)}return t}e=a,a=e.parentNode}return null}function sl(e){if(e=e[Fe]||e[al]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function Kl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(f(33))}function nl(e){var t=e[du];return t||(t=e[du]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function He(e){e[Pl]=!0}var mu=new Set,hu={};function Ma(e,t){rl(e,t),rl(e+"Capture",t)}function rl(e,t){for(hu[e]=t,e=0;e<t.length;e++)mu.add(t[e])}var ah=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),gu={},pu={};function lh(e){return Ar.call(pu,e)?!0:Ar.call(gu,e)?!1:ah.test(e)?pu[e]=!0:(gu[e]=!0,!1)}function an(e,t,a){if(lh(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function ln(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Yt(e,t,a,l){if(l===null)e.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+l)}}var Ur,yu;function il(e){if(Ur===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Ur=t&&t[1]||"",yu=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ur+e+yu}var Dr=!1;function Or(e,t){if(!e||Dr)return"";Dr=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var z=function(){throw Error()};if(Object.defineProperty(z.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(z,[])}catch(R){var w=R}Reflect.construct(e,[],z)}else{try{z.call()}catch(R){w=R}e.call(z.prototype)}}else{try{throw Error()}catch(R){w=R}(z=e())&&typeof z.catch=="function"&&z.catch(function(){})}}catch(R){if(R&&w&&typeof R.stack=="string")return[R.stack,w.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=l.DetermineComponentFrameRoot(),o=r[0],d=r[1];if(o&&d){var h=o.split(`
`),T=d.split(`
`);for(s=l=0;l<h.length&&!h[l].includes("DetermineComponentFrameRoot");)l++;for(;s<T.length&&!T[s].includes("DetermineComponentFrameRoot");)s++;if(l===h.length||s===T.length)for(l=h.length-1,s=T.length-1;1<=l&&0<=s&&h[l]!==T[s];)s--;for(;1<=l&&0<=s;l--,s--)if(h[l]!==T[s]){if(l!==1||s!==1)do if(l--,s--,0>s||h[l]!==T[s]){var $=`
`+h[l].replace(" at new "," at ");return e.displayName&&$.includes("<anonymous>")&&($=$.replace("<anonymous>",e.displayName)),$}while(1<=l&&0<=s);break}}}finally{Dr=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?il(a):""}function sh(e){switch(e.tag){case 26:case 27:case 5:return il(e.type);case 16:return il("Lazy");case 13:return il("Suspense");case 19:return il("SuspenseList");case 0:case 15:return Or(e.type,!1);case 11:return Or(e.type.render,!1);case 1:return Or(e.type,!0);case 31:return il("Activity");default:return""}}function xu(e){try{var t="";do t+=sh(e),e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function bt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function vu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function nh(e){var t=vu(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),l=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var s=a.get,r=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(o){l=""+o,r.call(this,o)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return l},setValue:function(o){l=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function sn(e){e._valueTracker||(e._valueTracker=nh(e))}function bu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),l="";return e&&(l=vu(e)?e.checked?"true":"false":e.value),e=l,e!==a?(t.setValue(e),!0):!1}function nn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var rh=/[\n"\\]/g;function jt(e){return e.replace(rh,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Ir(e,t,a,l,s,r,o,d){e.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.type=o:e.removeAttribute("type"),t!=null?o==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+bt(t)):e.value!==""+bt(t)&&(e.value=""+bt(t)):o!=="submit"&&o!=="reset"||e.removeAttribute("value"),t!=null?Mr(e,o,bt(t)):a!=null?Mr(e,o,bt(a)):l!=null&&e.removeAttribute("value"),s==null&&r!=null&&(e.defaultChecked=!!r),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?e.name=""+bt(d):e.removeAttribute("name")}function ju(e,t,a,l,s,r,o,d){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.type=r),t!=null||a!=null){if(!(r!=="submit"&&r!=="reset"||t!=null))return;a=a!=null?""+bt(a):"",t=t!=null?""+bt(t):a,d||t===e.value||(e.value=t),e.defaultValue=t}l=l??s,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=d?e.checked:!!l,e.defaultChecked=!!l,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.name=o)}function Mr(e,t,a){t==="number"&&nn(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function cl(e,t,a,l){if(e=e.options,t){t={};for(var s=0;s<a.length;s++)t["$"+a[s]]=!0;for(a=0;a<e.length;a++)s=t.hasOwnProperty("$"+e[a].value),e[a].selected!==s&&(e[a].selected=s),s&&l&&(e[a].defaultSelected=!0)}else{for(a=""+bt(a),t=null,s=0;s<e.length;s++){if(e[s].value===a){e[s].selected=!0,l&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Au(e,t,a){if(t!=null&&(t=""+bt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+bt(a):""}function Su(e,t,a,l){if(t==null){if(l!=null){if(a!=null)throw Error(f(92));if(Qe(l)){if(1<l.length)throw Error(f(93));l=l[0]}a=l}a==null&&(a=""),t=a}a=bt(t),e.defaultValue=a,l=e.textContent,l===a&&l!==""&&l!==null&&(e.value=l)}function ul(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var ih=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function _u(e,t,a){var l=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,a):typeof a!="number"||a===0||ih.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Nu(e,t,a){if(t!=null&&typeof t!="object")throw Error(f(62));if(e=e.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var s in t)l=t[s],t.hasOwnProperty(s)&&a[s]!==l&&_u(e,s,l)}else for(var r in t)t.hasOwnProperty(r)&&_u(e,r,t[r])}function qr(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ch=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),uh=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function rn(e){return uh.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var $r=null;function Gr(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ol=null,fl=null;function Tu(e){var t=sl(e);if(t&&(e=t.stateNode)){var a=e[at]||null;e:switch(e=t.stateNode,t.type){case"input":if(Ir(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+jt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var l=a[t];if(l!==e&&l.form===e.form){var s=l[at]||null;if(!s)throw Error(f(90));Ir(l,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<a.length;t++)l=a[t],l.form===e.form&&bu(l)}break e;case"textarea":Au(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&cl(e,!!a.multiple,t,!1)}}}var zr=!1;function wu(e,t,a){if(zr)return e(t,a);zr=!0;try{var l=e(t);return l}finally{if(zr=!1,(ol!==null||fl!==null)&&(Qn(),ol&&(t=ol,e=fl,fl=ol=null,Tu(t),e)))for(t=0;t<e.length;t++)Tu(e[t])}}function Jl(e,t){var a=e.stateNode;if(a===null)return null;var l=a[at]||null;if(l===null)return null;a=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(f(231,t,typeof a));return a}var kt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Cr=!1;if(kt)try{var Fl={};Object.defineProperty(Fl,"passive",{get:function(){Cr=!0}}),window.addEventListener("test",Fl,Fl),window.removeEventListener("test",Fl,Fl)}catch{Cr=!1}var oa=null,Br=null,cn=null;function Ru(){if(cn)return cn;var e,t=Br,a=t.length,l,s="value"in oa?oa.value:oa.textContent,r=s.length;for(e=0;e<a&&t[e]===s[e];e++);var o=a-e;for(l=1;l<=o&&t[a-l]===s[r-l];l++);return cn=s.slice(e,1<l?1-l:void 0)}function un(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function on(){return!0}function Eu(){return!1}function lt(e){function t(a,l,s,r,o){this._reactName=a,this._targetInst=s,this.type=l,this.nativeEvent=r,this.target=o,this.currentTarget=null;for(var d in e)e.hasOwnProperty(d)&&(a=e[d],this[d]=a?a(r):r[d]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?on:Eu,this.isPropagationStopped=Eu,this}return I(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=on)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=on)},persist:function(){},isPersistent:on}),t}var qa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fn=lt(qa),Wl=I({},qa,{view:0,detail:0}),oh=lt(Wl),Xr,Hr,es,dn=I({},Wl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Yr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==es&&(es&&e.type==="mousemove"?(Xr=e.screenX-es.screenX,Hr=e.screenY-es.screenY):Hr=Xr=0,es=e),Xr)},movementY:function(e){return"movementY"in e?e.movementY:Hr}}),Uu=lt(dn),fh=I({},dn,{dataTransfer:0}),dh=lt(fh),mh=I({},Wl,{relatedTarget:0}),Lr=lt(mh),hh=I({},qa,{animationName:0,elapsedTime:0,pseudoElement:0}),gh=lt(hh),ph=I({},qa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),yh=lt(ph),xh=I({},qa,{data:0}),Du=lt(xh),vh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},bh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ah(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=jh[e])?!!t[e]:!1}function Yr(){return Ah}var Sh=I({},Wl,{key:function(e){if(e.key){var t=vh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=un(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?bh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Yr,charCode:function(e){return e.type==="keypress"?un(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?un(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),_h=lt(Sh),Nh=I({},dn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ou=lt(Nh),Th=I({},Wl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Yr}),wh=lt(Th),Rh=I({},qa,{propertyName:0,elapsedTime:0,pseudoElement:0}),Eh=lt(Rh),Uh=I({},dn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dh=lt(Uh),Oh=I({},qa,{newState:0,oldState:0}),Ih=lt(Oh),Mh=[9,13,27,32],kr=kt&&"CompositionEvent"in window,ts=null;kt&&"documentMode"in document&&(ts=document.documentMode);var qh=kt&&"TextEvent"in window&&!ts,Iu=kt&&(!kr||ts&&8<ts&&11>=ts),Mu=" ",qu=!1;function $u(e,t){switch(e){case"keyup":return Mh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Gu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var dl=!1;function $h(e,t){switch(e){case"compositionend":return Gu(t);case"keypress":return t.which!==32?null:(qu=!0,Mu);case"textInput":return e=t.data,e===Mu&&qu?null:e;default:return null}}function Gh(e,t){if(dl)return e==="compositionend"||!kr&&$u(e,t)?(e=Ru(),cn=Br=oa=null,dl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Iu&&t.locale!=="ko"?null:t.data;default:return null}}var zh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!zh[e.type]:t==="textarea"}function Cu(e,t,a,l){ol?fl?fl.push(l):fl=[l]:ol=l,t=Fn(t,"onChange"),0<t.length&&(a=new fn("onChange","change",null,a,l),e.push({event:a,listeners:t}))}var as=null,ls=null;function Ch(e){jd(e,0)}function mn(e){var t=Kl(e);if(bu(t))return e}function Bu(e,t){if(e==="change")return t}var Xu=!1;if(kt){var Qr;if(kt){var Zr="oninput"in document;if(!Zr){var Hu=document.createElement("div");Hu.setAttribute("oninput","return;"),Zr=typeof Hu.oninput=="function"}Qr=Zr}else Qr=!1;Xu=Qr&&(!document.documentMode||9<document.documentMode)}function Lu(){as&&(as.detachEvent("onpropertychange",Yu),ls=as=null)}function Yu(e){if(e.propertyName==="value"&&mn(ls)){var t=[];Cu(t,ls,e,Gr(e)),wu(Ch,t)}}function Bh(e,t,a){e==="focusin"?(Lu(),as=t,ls=a,as.attachEvent("onpropertychange",Yu)):e==="focusout"&&Lu()}function Xh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return mn(ls)}function Hh(e,t){if(e==="click")return mn(t)}function Lh(e,t){if(e==="input"||e==="change")return mn(t)}function Yh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ot=typeof Object.is=="function"?Object.is:Yh;function ss(e,t){if(ot(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),l=Object.keys(t);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var s=a[l];if(!Ar.call(t,s)||!ot(e[s],t[s]))return!1}return!0}function ku(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Qu(e,t){var a=ku(e);e=0;for(var l;a;){if(a.nodeType===3){if(l=e+a.textContent.length,e<=t&&l>=t)return{node:a,offset:t-e};e=l}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=ku(a)}}function Zu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Zu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Vu(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=nn(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=nn(e.document)}return t}function Vr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var kh=kt&&"documentMode"in document&&11>=document.documentMode,ml=null,Pr=null,ns=null,Kr=!1;function Pu(e,t,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Kr||ml==null||ml!==nn(l)||(l=ml,"selectionStart"in l&&Vr(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),ns&&ss(ns,l)||(ns=l,l=Fn(Pr,"onSelect"),0<l.length&&(t=new fn("onSelect","select",null,t,a),e.push({event:t,listeners:l}),t.target=ml)))}function $a(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var hl={animationend:$a("Animation","AnimationEnd"),animationiteration:$a("Animation","AnimationIteration"),animationstart:$a("Animation","AnimationStart"),transitionrun:$a("Transition","TransitionRun"),transitionstart:$a("Transition","TransitionStart"),transitioncancel:$a("Transition","TransitionCancel"),transitionend:$a("Transition","TransitionEnd")},Jr={},Ku={};kt&&(Ku=document.createElement("div").style,"AnimationEvent"in window||(delete hl.animationend.animation,delete hl.animationiteration.animation,delete hl.animationstart.animation),"TransitionEvent"in window||delete hl.transitionend.transition);function Ga(e){if(Jr[e])return Jr[e];if(!hl[e])return e;var t=hl[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Ku)return Jr[e]=t[a];return e}var Ju=Ga("animationend"),Fu=Ga("animationiteration"),Wu=Ga("animationstart"),Qh=Ga("transitionrun"),Zh=Ga("transitionstart"),Vh=Ga("transitioncancel"),eo=Ga("transitionend"),to=new Map,Fr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Fr.push("scrollEnd");function Ut(e,t){to.set(e,t),Ma(t,[e])}var ao=new WeakMap;function At(e,t){if(typeof e=="object"&&e!==null){var a=ao.get(e);return a!==void 0?a:(t={value:e,source:t,stack:xu(t)},ao.set(e,t),t)}return{value:e,source:t,stack:xu(t)}}var St=[],gl=0,Wr=0;function hn(){for(var e=gl,t=Wr=gl=0;t<e;){var a=St[t];St[t++]=null;var l=St[t];St[t++]=null;var s=St[t];St[t++]=null;var r=St[t];if(St[t++]=null,l!==null&&s!==null){var o=l.pending;o===null?s.next=s:(s.next=o.next,o.next=s),l.pending=s}r!==0&&lo(a,s,r)}}function gn(e,t,a,l){St[gl++]=e,St[gl++]=t,St[gl++]=a,St[gl++]=l,Wr|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function ei(e,t,a,l){return gn(e,t,a,l),pn(e)}function pl(e,t){return gn(e,null,null,t),pn(e)}function lo(e,t,a){e.lanes|=a;var l=e.alternate;l!==null&&(l.lanes|=a);for(var s=!1,r=e.return;r!==null;)r.childLanes|=a,l=r.alternate,l!==null&&(l.childLanes|=a),r.tag===22&&(e=r.stateNode,e===null||e._visibility&1||(s=!0)),e=r,r=r.return;return e.tag===3?(r=e.stateNode,s&&t!==null&&(s=31-ut(a),e=r.hiddenUpdates,l=e[s],l===null?e[s]=[t]:l.push(t),t.lane=a|536870912),r):null}function pn(e){if(50<Us)throw Us=0,rc=null,Error(f(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var yl={};function Ph(e,t,a,l){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ft(e,t,a,l){return new Ph(e,t,a,l)}function ti(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Qt(e,t){var a=e.alternate;return a===null?(a=ft(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function so(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function yn(e,t,a,l,s,r){var o=0;if(l=e,typeof e=="function")ti(e)&&(o=1);else if(typeof e=="string")o=Jg(e,a,Re.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Te:return e=ft(31,a,t,s),e.elementType=Te,e.lanes=r,e;case _:return za(a.children,s,r,t);case A:o=8,s|=24;break;case q:return e=ft(12,a,t,s|2),e.elementType=q,e.lanes=r,e;case ne:return e=ft(13,a,t,s),e.elementType=ne,e.lanes=r,e;case Ue:return e=ft(19,a,t,s),e.elementType=Ue,e.lanes=r,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case B:case X:o=10;break e;case M:o=9;break e;case V:o=11;break e;case De:o=14;break e;case Q:o=16,l=null;break e}o=29,a=Error(f(130,e===null?"null":typeof e,"")),l=null}return t=ft(o,a,t,s),t.elementType=e,t.type=l,t.lanes=r,t}function za(e,t,a,l){return e=ft(7,e,l,t),e.lanes=a,e}function ai(e,t,a){return e=ft(6,e,null,t),e.lanes=a,e}function li(e,t,a){return t=ft(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var xl=[],vl=0,xn=null,vn=0,_t=[],Nt=0,Ca=null,Zt=1,Vt="";function Ba(e,t){xl[vl++]=vn,xl[vl++]=xn,xn=e,vn=t}function no(e,t,a){_t[Nt++]=Zt,_t[Nt++]=Vt,_t[Nt++]=Ca,Ca=e;var l=Zt;e=Vt;var s=32-ut(l)-1;l&=~(1<<s),a+=1;var r=32-ut(t)+s;if(30<r){var o=s-s%5;r=(l&(1<<o)-1).toString(32),l>>=o,s-=o,Zt=1<<32-ut(t)+s|a<<s|l,Vt=r+e}else Zt=1<<r|a<<s|l,Vt=e}function si(e){e.return!==null&&(Ba(e,1),no(e,1,0))}function ni(e){for(;e===xn;)xn=xl[--vl],xl[vl]=null,vn=xl[--vl],xl[vl]=null;for(;e===Ca;)Ca=_t[--Nt],_t[Nt]=null,Vt=_t[--Nt],_t[Nt]=null,Zt=_t[--Nt],_t[Nt]=null}var et=null,Oe=null,ue=!1,Xa=null,$t=!1,ri=Error(f(519));function Ha(e){var t=Error(f(418,""));throw cs(At(t,e)),ri}function ro(e){var t=e.stateNode,a=e.type,l=e.memoizedProps;switch(t[Fe]=e,t[at]=l,a){case"dialog":le("cancel",t),le("close",t);break;case"iframe":case"object":case"embed":le("load",t);break;case"video":case"audio":for(a=0;a<Os.length;a++)le(Os[a],t);break;case"source":le("error",t);break;case"img":case"image":case"link":le("error",t),le("load",t);break;case"details":le("toggle",t);break;case"input":le("invalid",t),ju(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0),sn(t);break;case"select":le("invalid",t);break;case"textarea":le("invalid",t),Su(t,l.value,l.defaultValue,l.children),sn(t)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||l.suppressHydrationWarning===!0||Nd(t.textContent,a)?(l.popover!=null&&(le("beforetoggle",t),le("toggle",t)),l.onScroll!=null&&le("scroll",t),l.onScrollEnd!=null&&le("scrollend",t),l.onClick!=null&&(t.onclick=Wn),t=!0):t=!1,t||Ha(e)}function io(e){for(et=e.return;et;)switch(et.tag){case 5:case 13:$t=!1;return;case 27:case 3:$t=!0;return;default:et=et.return}}function rs(e){if(e!==et)return!1;if(!ue)return io(e),ue=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Ac(e.type,e.memoizedProps)),a=!a),a&&Oe&&Ha(e),io(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(f(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(t===0){Oe=Ot(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++;e=e.nextSibling}Oe=null}}else t===27?(t=Oe,Ta(e.type)?(e=Tc,Tc=null,Oe=e):Oe=t):Oe=et?Ot(e.stateNode.nextSibling):null;return!0}function is(){Oe=et=null,ue=!1}function co(){var e=Xa;return e!==null&&(rt===null?rt=e:rt.push.apply(rt,e),Xa=null),e}function cs(e){Xa===null?Xa=[e]:Xa.push(e)}var ii=Xe(null),La=null,Pt=null;function fa(e,t,a){re(ii,t._currentValue),t._currentValue=a}function Kt(e){e._currentValue=ii.current,_e(ii)}function ci(e,t,a){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===a)break;e=e.return}}function ui(e,t,a,l){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var r=s.dependencies;if(r!==null){var o=s.child;r=r.firstContext;e:for(;r!==null;){var d=r;r=s;for(var h=0;h<t.length;h++)if(d.context===t[h]){r.lanes|=a,d=r.alternate,d!==null&&(d.lanes|=a),ci(r.return,a,e),l||(o=null);break e}r=d.next}}else if(s.tag===18){if(o=s.return,o===null)throw Error(f(341));o.lanes|=a,r=o.alternate,r!==null&&(r.lanes|=a),ci(o,a,e),o=null}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}}function us(e,t,a,l){e=null;for(var s=t,r=!1;s!==null;){if(!r){if((s.flags&524288)!==0)r=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var o=s.alternate;if(o===null)throw Error(f(387));if(o=o.memoizedProps,o!==null){var d=s.type;ot(s.pendingProps.value,o.value)||(e!==null?e.push(d):e=[d])}}else if(s===Je.current){if(o=s.alternate,o===null)throw Error(f(387));o.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(zs):e=[zs])}s=s.return}e!==null&&ui(t,e,a,l),t.flags|=262144}function bn(e){for(e=e.firstContext;e!==null;){if(!ot(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ya(e){La=e,Pt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function We(e){return uo(La,e)}function jn(e,t){return La===null&&Ya(e),uo(e,t)}function uo(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Pt===null){if(e===null)throw Error(f(308));Pt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Pt=Pt.next=t;return a}var Kh=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},Jh=i.unstable_scheduleCallback,Fh=i.unstable_NormalPriority,Ce={$$typeof:X,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function oi(){return{controller:new Kh,data:new Map,refCount:0}}function os(e){e.refCount--,e.refCount===0&&Jh(Fh,function(){e.controller.abort()})}var fs=null,fi=0,bl=0,jl=null;function Wh(e,t){if(fs===null){var a=fs=[];fi=0,bl=mc(),jl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return fi++,t.then(oo,oo),t}function oo(){if(--fi===0&&fs!==null){jl!==null&&(jl.status="fulfilled");var e=fs;fs=null,bl=0,jl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function eg(e,t){var a=[],l={status:"pending",value:null,reason:null,then:function(s){a.push(s)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var s=0;s<a.length;s++)(0,a[s])(t)},function(s){for(l.status="rejected",l.reason=s,s=0;s<a.length;s++)(0,a[s])(void 0)}),l}var fo=U.S;U.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&Wh(e,t),fo!==null&&fo(e,t)};var ka=Xe(null);function di(){var e=ka.current;return e!==null?e:Ae.pooledCache}function An(e,t){t===null?re(ka,ka.current):re(ka,t.pool)}function mo(){var e=di();return e===null?null:{parent:Ce._currentValue,pool:e}}var ds=Error(f(460)),ho=Error(f(474)),Sn=Error(f(542)),mi={then:function(){}};function go(e){return e=e.status,e==="fulfilled"||e==="rejected"}function _n(){}function po(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(_n,_n),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,xo(e),e;default:if(typeof t.status=="string")t.then(_n,_n);else{if(e=Ae,e!==null&&100<e.shellSuspendCounter)throw Error(f(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=l}},function(l){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,xo(e),e}throw ms=t,ds}}var ms=null;function yo(){if(ms===null)throw Error(f(459));var e=ms;return ms=null,e}function xo(e){if(e===ds||e===Sn)throw Error(f(483))}var da=!1;function hi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function gi(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ma(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ha(e,t,a){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(me&2)!==0){var s=l.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),l.pending=t,t=pn(e),lo(e,null,a),t}return gn(e,l,t,a),pn(e)}function hs(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,ou(e,a)}}function pi(e,t){var a=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var s=null,r=null;if(a=a.firstBaseUpdate,a!==null){do{var o={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};r===null?s=r=o:r=r.next=o,a=a.next}while(a!==null);r===null?s=r=t:r=r.next=t}else s=r=t;a={baseState:l.baseState,firstBaseUpdate:s,lastBaseUpdate:r,shared:l.shared,callbacks:l.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var yi=!1;function gs(){if(yi){var e=jl;if(e!==null)throw e}}function ps(e,t,a,l){yi=!1;var s=e.updateQueue;da=!1;var r=s.firstBaseUpdate,o=s.lastBaseUpdate,d=s.shared.pending;if(d!==null){s.shared.pending=null;var h=d,T=h.next;h.next=null,o===null?r=T:o.next=T,o=h;var $=e.alternate;$!==null&&($=$.updateQueue,d=$.lastBaseUpdate,d!==o&&(d===null?$.firstBaseUpdate=T:d.next=T,$.lastBaseUpdate=h))}if(r!==null){var z=s.baseState;o=0,$=T=h=null,d=r;do{var w=d.lane&-536870913,R=w!==d.lane;if(R?(se&w)===w:(l&w)===w){w!==0&&w===bl&&(yi=!0),$!==null&&($=$.next={lane:0,tag:d.tag,payload:d.payload,callback:null,next:null});e:{var F=e,Z=d;w=t;var ye=a;switch(Z.tag){case 1:if(F=Z.payload,typeof F=="function"){z=F.call(ye,z,w);break e}z=F;break e;case 3:F.flags=F.flags&-65537|128;case 0:if(F=Z.payload,w=typeof F=="function"?F.call(ye,z,w):F,w==null)break e;z=I({},z,w);break e;case 2:da=!0}}w=d.callback,w!==null&&(e.flags|=64,R&&(e.flags|=8192),R=s.callbacks,R===null?s.callbacks=[w]:R.push(w))}else R={lane:w,tag:d.tag,payload:d.payload,callback:d.callback,next:null},$===null?(T=$=R,h=z):$=$.next=R,o|=w;if(d=d.next,d===null){if(d=s.shared.pending,d===null)break;R=d,d=R.next,R.next=null,s.lastBaseUpdate=R,s.shared.pending=null}}while(!0);$===null&&(h=z),s.baseState=h,s.firstBaseUpdate=T,s.lastBaseUpdate=$,r===null&&(s.shared.lanes=0),Aa|=o,e.lanes=o,e.memoizedState=z}}function vo(e,t){if(typeof e!="function")throw Error(f(191,e));e.call(t)}function bo(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)vo(a[e],t)}var Al=Xe(null),Nn=Xe(0);function jo(e,t){e=la,re(Nn,e),re(Al,t),la=e|t.baseLanes}function xi(){re(Nn,la),re(Al,Al.current)}function vi(){la=Nn.current,_e(Al),_e(Nn)}var ga=0,ee=null,ge=null,$e=null,Tn=!1,Sl=!1,Qa=!1,wn=0,ys=0,_l=null,tg=0;function Me(){throw Error(f(321))}function bi(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!ot(e[a],t[a]))return!1;return!0}function ji(e,t,a,l,s,r){return ga=r,ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,U.H=e===null||e.memoizedState===null?sf:nf,Qa=!1,r=a(l,s),Qa=!1,Sl&&(r=So(t,a,l,s)),Ao(e),r}function Ao(e){U.H=In;var t=ge!==null&&ge.next!==null;if(ga=0,$e=ge=ee=null,Tn=!1,ys=0,_l=null,t)throw Error(f(300));e===null||Le||(e=e.dependencies,e!==null&&bn(e)&&(Le=!0))}function So(e,t,a,l){ee=e;var s=0;do{if(Sl&&(_l=null),ys=0,Sl=!1,25<=s)throw Error(f(301));if(s+=1,$e=ge=null,e.updateQueue!=null){var r=e.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}U.H=cg,r=t(a,l)}while(Sl);return r}function ag(){var e=U.H,t=e.useState()[0];return t=typeof t.then=="function"?xs(t):t,e=e.useState()[0],(ge!==null?ge.memoizedState:null)!==e&&(ee.flags|=1024),t}function Ai(){var e=wn!==0;return wn=0,e}function Si(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function _i(e){if(Tn){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Tn=!1}ga=0,$e=ge=ee=null,Sl=!1,ys=wn=0,_l=null}function st(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return $e===null?ee.memoizedState=$e=e:$e=$e.next=e,$e}function Ge(){if(ge===null){var e=ee.alternate;e=e!==null?e.memoizedState:null}else e=ge.next;var t=$e===null?ee.memoizedState:$e.next;if(t!==null)$e=t,ge=e;else{if(e===null)throw ee.alternate===null?Error(f(467)):Error(f(310));ge=e,e={memoizedState:ge.memoizedState,baseState:ge.baseState,baseQueue:ge.baseQueue,queue:ge.queue,next:null},$e===null?ee.memoizedState=$e=e:$e=$e.next=e}return $e}function Ni(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xs(e){var t=ys;return ys+=1,_l===null&&(_l=[]),e=po(_l,e,t),t=ee,($e===null?t.memoizedState:$e.next)===null&&(t=t.alternate,U.H=t===null||t.memoizedState===null?sf:nf),e}function Rn(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xs(e);if(e.$$typeof===X)return We(e)}throw Error(f(438,String(e)))}function Ti(e){var t=null,a=ee.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var l=ee.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=Ni(),ee.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),l=0;l<e;l++)a[l]=ze;return t.index++,a}function Jt(e,t){return typeof t=="function"?t(e):t}function En(e){var t=Ge();return wi(t,ge,e)}function wi(e,t,a){var l=e.queue;if(l===null)throw Error(f(311));l.lastRenderedReducer=a;var s=e.baseQueue,r=l.pending;if(r!==null){if(s!==null){var o=s.next;s.next=r.next,r.next=o}t.baseQueue=s=r,l.pending=null}if(r=e.baseState,s===null)e.memoizedState=r;else{t=s.next;var d=o=null,h=null,T=t,$=!1;do{var z=T.lane&-536870913;if(z!==T.lane?(se&z)===z:(ga&z)===z){var w=T.revertLane;if(w===0)h!==null&&(h=h.next={lane:0,revertLane:0,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null}),z===bl&&($=!0);else if((ga&w)===w){T=T.next,w===bl&&($=!0);continue}else z={lane:0,revertLane:T.revertLane,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},h===null?(d=h=z,o=r):h=h.next=z,ee.lanes|=w,Aa|=w;z=T.action,Qa&&a(r,z),r=T.hasEagerState?T.eagerState:a(r,z)}else w={lane:z,revertLane:T.revertLane,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},h===null?(d=h=w,o=r):h=h.next=w,ee.lanes|=z,Aa|=z;T=T.next}while(T!==null&&T!==t);if(h===null?o=r:h.next=d,!ot(r,e.memoizedState)&&(Le=!0,$&&(a=jl,a!==null)))throw a;e.memoizedState=r,e.baseState=o,e.baseQueue=h,l.lastRenderedState=r}return s===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function Ri(e){var t=Ge(),a=t.queue;if(a===null)throw Error(f(311));a.lastRenderedReducer=e;var l=a.dispatch,s=a.pending,r=t.memoizedState;if(s!==null){a.pending=null;var o=s=s.next;do r=e(r,o.action),o=o.next;while(o!==s);ot(r,t.memoizedState)||(Le=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),a.lastRenderedState=r}return[r,l]}function _o(e,t,a){var l=ee,s=Ge(),r=ue;if(r){if(a===void 0)throw Error(f(407));a=a()}else a=t();var o=!ot((ge||s).memoizedState,a);o&&(s.memoizedState=a,Le=!0),s=s.queue;var d=wo.bind(null,l,s,e);if(vs(2048,8,d,[e]),s.getSnapshot!==t||o||$e!==null&&$e.memoizedState.tag&1){if(l.flags|=2048,Nl(9,Un(),To.bind(null,l,s,a,t),null),Ae===null)throw Error(f(349));r||(ga&124)!==0||No(l,t,a)}return a}function No(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=ee.updateQueue,t===null?(t=Ni(),ee.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function To(e,t,a,l){t.value=a,t.getSnapshot=l,Ro(t)&&Eo(e)}function wo(e,t,a){return a(function(){Ro(t)&&Eo(e)})}function Ro(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!ot(e,a)}catch{return!0}}function Eo(e){var t=pl(e,2);t!==null&&pt(t,e,2)}function Ei(e){var t=st();if(typeof e=="function"){var a=e;if(e=a(),Qa){ca(!0);try{a()}finally{ca(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Jt,lastRenderedState:e},t}function Uo(e,t,a,l){return e.baseState=a,wi(e,ge,typeof l=="function"?l:Jt)}function lg(e,t,a,l,s){if(On(e))throw Error(f(485));if(e=t.action,e!==null){var r={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){r.listeners.push(o)}};U.T!==null?a(!0):r.isTransition=!1,l(r),a=t.pending,a===null?(r.next=t.pending=r,Do(t,r)):(r.next=a.next,t.pending=a.next=r)}}function Do(e,t){var a=t.action,l=t.payload,s=e.state;if(t.isTransition){var r=U.T,o={};U.T=o;try{var d=a(s,l),h=U.S;h!==null&&h(o,d),Oo(e,t,d)}catch(T){Ui(e,t,T)}finally{U.T=r}}else try{r=a(s,l),Oo(e,t,r)}catch(T){Ui(e,t,T)}}function Oo(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){Io(e,t,l)},function(l){return Ui(e,t,l)}):Io(e,t,a)}function Io(e,t,a){t.status="fulfilled",t.value=a,Mo(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Do(e,a)))}function Ui(e,t,a){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=a,Mo(t),t=t.next;while(t!==l)}e.action=null}function Mo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function qo(e,t){return t}function $o(e,t){if(ue){var a=Ae.formState;if(a!==null){e:{var l=ee;if(ue){if(Oe){t:{for(var s=Oe,r=$t;s.nodeType!==8;){if(!r){s=null;break t}if(s=Ot(s.nextSibling),s===null){s=null;break t}}r=s.data,s=r==="F!"||r==="F"?s:null}if(s){Oe=Ot(s.nextSibling),l=s.data==="F!";break e}}Ha(l)}l=!1}l&&(t=a[0])}}return a=st(),a.memoizedState=a.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qo,lastRenderedState:t},a.queue=l,a=tf.bind(null,ee,l),l.dispatch=a,l=Ei(!1),r=qi.bind(null,ee,!1,l.queue),l=st(),s={state:t,dispatch:null,action:e,pending:null},l.queue=s,a=lg.bind(null,ee,s,r,a),s.dispatch=a,l.memoizedState=e,[t,a,!1]}function Go(e){var t=Ge();return zo(t,ge,e)}function zo(e,t,a){if(t=wi(e,t,qo)[0],e=En(Jt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=xs(t)}catch(o){throw o===ds?Sn:o}else l=t;t=Ge();var s=t.queue,r=s.dispatch;return a!==t.memoizedState&&(ee.flags|=2048,Nl(9,Un(),sg.bind(null,s,a),null)),[l,r,e]}function sg(e,t){e.action=t}function Co(e){var t=Ge(),a=ge;if(a!==null)return zo(t,a,e);Ge(),t=t.memoizedState,a=Ge();var l=a.queue.dispatch;return a.memoizedState=e,[t,l,!1]}function Nl(e,t,a,l){return e={tag:e,create:a,deps:l,inst:t,next:null},t=ee.updateQueue,t===null&&(t=Ni(),ee.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(l=a.next,a.next=e,e.next=l,t.lastEffect=e),e}function Un(){return{destroy:void 0,resource:void 0}}function Bo(){return Ge().memoizedState}function Dn(e,t,a,l){var s=st();l=l===void 0?null:l,ee.flags|=e,s.memoizedState=Nl(1|t,Un(),a,l)}function vs(e,t,a,l){var s=Ge();l=l===void 0?null:l;var r=s.memoizedState.inst;ge!==null&&l!==null&&bi(l,ge.memoizedState.deps)?s.memoizedState=Nl(t,r,a,l):(ee.flags|=e,s.memoizedState=Nl(1|t,r,a,l))}function Xo(e,t){Dn(8390656,8,e,t)}function Ho(e,t){vs(2048,8,e,t)}function Lo(e,t){return vs(4,2,e,t)}function Yo(e,t){return vs(4,4,e,t)}function ko(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Qo(e,t,a){a=a!=null?a.concat([e]):null,vs(4,4,ko.bind(null,t,e),a)}function Di(){}function Zo(e,t){var a=Ge();t=t===void 0?null:t;var l=a.memoizedState;return t!==null&&bi(t,l[1])?l[0]:(a.memoizedState=[e,t],e)}function Vo(e,t){var a=Ge();t=t===void 0?null:t;var l=a.memoizedState;if(t!==null&&bi(t,l[1]))return l[0];if(l=e(),Qa){ca(!0);try{e()}finally{ca(!1)}}return a.memoizedState=[l,t],l}function Oi(e,t,a){return a===void 0||(ga&1073741824)!==0?e.memoizedState=t:(e.memoizedState=a,e=Ff(),ee.lanes|=e,Aa|=e,a)}function Po(e,t,a,l){return ot(a,t)?a:Al.current!==null?(e=Oi(e,a,l),ot(e,t)||(Le=!0),e):(ga&42)===0?(Le=!0,e.memoizedState=a):(e=Ff(),ee.lanes|=e,Aa|=e,t)}function Ko(e,t,a,l,s){var r=H.p;H.p=r!==0&&8>r?r:8;var o=U.T,d={};U.T=d,qi(e,!1,t,a);try{var h=s(),T=U.S;if(T!==null&&T(d,h),h!==null&&typeof h=="object"&&typeof h.then=="function"){var $=eg(h,l);bs(e,t,$,gt(e))}else bs(e,t,l,gt(e))}catch(z){bs(e,t,{then:function(){},status:"rejected",reason:z},gt())}finally{H.p=r,U.T=o}}function ng(){}function Ii(e,t,a,l){if(e.tag!==5)throw Error(f(476));var s=Jo(e).queue;Ko(e,s,t,J,a===null?ng:function(){return Fo(e),a(l)})}function Jo(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:J,baseState:J,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Jt,lastRenderedState:J},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Jt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Fo(e){var t=Jo(e).next.queue;bs(e,t,{},gt())}function Mi(){return We(zs)}function Wo(){return Ge().memoizedState}function ef(){return Ge().memoizedState}function rg(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=gt();e=ma(a);var l=ha(t,e,a);l!==null&&(pt(l,t,a),hs(l,t,a)),t={cache:oi()},e.payload=t;return}t=t.return}}function ig(e,t,a){var l=gt();a={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},On(e)?af(t,a):(a=ei(e,t,a,l),a!==null&&(pt(a,e,l),lf(a,t,l)))}function tf(e,t,a){var l=gt();bs(e,t,a,l)}function bs(e,t,a,l){var s={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(On(e))af(t,s);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var o=t.lastRenderedState,d=r(o,a);if(s.hasEagerState=!0,s.eagerState=d,ot(d,o))return gn(e,t,s,0),Ae===null&&hn(),!1}catch{}finally{}if(a=ei(e,t,s,l),a!==null)return pt(a,e,l),lf(a,t,l),!0}return!1}function qi(e,t,a,l){if(l={lane:2,revertLane:mc(),action:l,hasEagerState:!1,eagerState:null,next:null},On(e)){if(t)throw Error(f(479))}else t=ei(e,a,l,2),t!==null&&pt(t,e,2)}function On(e){var t=e.alternate;return e===ee||t!==null&&t===ee}function af(e,t){Sl=Tn=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function lf(e,t,a){if((a&4194048)!==0){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,ou(e,a)}}var In={readContext:We,use:Rn,useCallback:Me,useContext:Me,useEffect:Me,useImperativeHandle:Me,useLayoutEffect:Me,useInsertionEffect:Me,useMemo:Me,useReducer:Me,useRef:Me,useState:Me,useDebugValue:Me,useDeferredValue:Me,useTransition:Me,useSyncExternalStore:Me,useId:Me,useHostTransitionStatus:Me,useFormState:Me,useActionState:Me,useOptimistic:Me,useMemoCache:Me,useCacheRefresh:Me},sf={readContext:We,use:Rn,useCallback:function(e,t){return st().memoizedState=[e,t===void 0?null:t],e},useContext:We,useEffect:Xo,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,Dn(4194308,4,ko.bind(null,t,e),a)},useLayoutEffect:function(e,t){return Dn(4194308,4,e,t)},useInsertionEffect:function(e,t){Dn(4,2,e,t)},useMemo:function(e,t){var a=st();t=t===void 0?null:t;var l=e();if(Qa){ca(!0);try{e()}finally{ca(!1)}}return a.memoizedState=[l,t],l},useReducer:function(e,t,a){var l=st();if(a!==void 0){var s=a(t);if(Qa){ca(!0);try{a(t)}finally{ca(!1)}}}else s=t;return l.memoizedState=l.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},l.queue=e,e=e.dispatch=ig.bind(null,ee,e),[l.memoizedState,e]},useRef:function(e){var t=st();return e={current:e},t.memoizedState=e},useState:function(e){e=Ei(e);var t=e.queue,a=tf.bind(null,ee,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Di,useDeferredValue:function(e,t){var a=st();return Oi(a,e,t)},useTransition:function(){var e=Ei(!1);return e=Ko.bind(null,ee,e.queue,!0,!1),st().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var l=ee,s=st();if(ue){if(a===void 0)throw Error(f(407));a=a()}else{if(a=t(),Ae===null)throw Error(f(349));(se&124)!==0||No(l,t,a)}s.memoizedState=a;var r={value:a,getSnapshot:t};return s.queue=r,Xo(wo.bind(null,l,r,e),[e]),l.flags|=2048,Nl(9,Un(),To.bind(null,l,r,a,t),null),a},useId:function(){var e=st(),t=Ae.identifierPrefix;if(ue){var a=Vt,l=Zt;a=(l&~(1<<32-ut(l)-1)).toString(32)+a,t="«"+t+"R"+a,a=wn++,0<a&&(t+="H"+a.toString(32)),t+="»"}else a=tg++,t="«"+t+"r"+a.toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:Mi,useFormState:$o,useActionState:$o,useOptimistic:function(e){var t=st();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=qi.bind(null,ee,!0,a),a.dispatch=t,[e,t]},useMemoCache:Ti,useCacheRefresh:function(){return st().memoizedState=rg.bind(null,ee)}},nf={readContext:We,use:Rn,useCallback:Zo,useContext:We,useEffect:Ho,useImperativeHandle:Qo,useInsertionEffect:Lo,useLayoutEffect:Yo,useMemo:Vo,useReducer:En,useRef:Bo,useState:function(){return En(Jt)},useDebugValue:Di,useDeferredValue:function(e,t){var a=Ge();return Po(a,ge.memoizedState,e,t)},useTransition:function(){var e=En(Jt)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:xs(e),t]},useSyncExternalStore:_o,useId:Wo,useHostTransitionStatus:Mi,useFormState:Go,useActionState:Go,useOptimistic:function(e,t){var a=Ge();return Uo(a,ge,e,t)},useMemoCache:Ti,useCacheRefresh:ef},cg={readContext:We,use:Rn,useCallback:Zo,useContext:We,useEffect:Ho,useImperativeHandle:Qo,useInsertionEffect:Lo,useLayoutEffect:Yo,useMemo:Vo,useReducer:Ri,useRef:Bo,useState:function(){return Ri(Jt)},useDebugValue:Di,useDeferredValue:function(e,t){var a=Ge();return ge===null?Oi(a,e,t):Po(a,ge.memoizedState,e,t)},useTransition:function(){var e=Ri(Jt)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:xs(e),t]},useSyncExternalStore:_o,useId:Wo,useHostTransitionStatus:Mi,useFormState:Co,useActionState:Co,useOptimistic:function(e,t){var a=Ge();return ge!==null?Uo(a,ge,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Ti,useCacheRefresh:ef},Tl=null,js=0;function Mn(e){var t=js;return js+=1,Tl===null&&(Tl=[]),po(Tl,e,t)}function As(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function qn(e,t){throw t.$$typeof===g?Error(f(525)):(e=Object.prototype.toString.call(t),Error(f(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function rf(e){var t=e._init;return t(e._payload)}function cf(e){function t(S,j){if(e){var N=S.deletions;N===null?(S.deletions=[j],S.flags|=16):N.push(j)}}function a(S,j){if(!e)return null;for(;j!==null;)t(S,j),j=j.sibling;return null}function l(S){for(var j=new Map;S!==null;)S.key!==null?j.set(S.key,S):j.set(S.index,S),S=S.sibling;return j}function s(S,j){return S=Qt(S,j),S.index=0,S.sibling=null,S}function r(S,j,N){return S.index=N,e?(N=S.alternate,N!==null?(N=N.index,N<j?(S.flags|=67108866,j):N):(S.flags|=67108866,j)):(S.flags|=1048576,j)}function o(S){return e&&S.alternate===null&&(S.flags|=67108866),S}function d(S,j,N,G){return j===null||j.tag!==6?(j=ai(N,S.mode,G),j.return=S,j):(j=s(j,N),j.return=S,j)}function h(S,j,N,G){var L=N.type;return L===_?$(S,j,N.props.children,G,N.key):j!==null&&(j.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Q&&rf(L)===j.type)?(j=s(j,N.props),As(j,N),j.return=S,j):(j=yn(N.type,N.key,N.props,null,S.mode,G),As(j,N),j.return=S,j)}function T(S,j,N,G){return j===null||j.tag!==4||j.stateNode.containerInfo!==N.containerInfo||j.stateNode.implementation!==N.implementation?(j=li(N,S.mode,G),j.return=S,j):(j=s(j,N.children||[]),j.return=S,j)}function $(S,j,N,G,L){return j===null||j.tag!==7?(j=za(N,S.mode,G,L),j.return=S,j):(j=s(j,N),j.return=S,j)}function z(S,j,N){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=ai(""+j,S.mode,N),j.return=S,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case b:return N=yn(j.type,j.key,j.props,null,S.mode,N),As(N,j),N.return=S,N;case x:return j=li(j,S.mode,N),j.return=S,j;case Q:var G=j._init;return j=G(j._payload),z(S,j,N)}if(Qe(j)||Ke(j))return j=za(j,S.mode,N,null),j.return=S,j;if(typeof j.then=="function")return z(S,Mn(j),N);if(j.$$typeof===X)return z(S,jn(S,j),N);qn(S,j)}return null}function w(S,j,N,G){var L=j!==null?j.key:null;if(typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint")return L!==null?null:d(S,j,""+N,G);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case b:return N.key===L?h(S,j,N,G):null;case x:return N.key===L?T(S,j,N,G):null;case Q:return L=N._init,N=L(N._payload),w(S,j,N,G)}if(Qe(N)||Ke(N))return L!==null?null:$(S,j,N,G,null);if(typeof N.then=="function")return w(S,j,Mn(N),G);if(N.$$typeof===X)return w(S,j,jn(S,N),G);qn(S,N)}return null}function R(S,j,N,G,L){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return S=S.get(N)||null,d(j,S,""+G,L);if(typeof G=="object"&&G!==null){switch(G.$$typeof){case b:return S=S.get(G.key===null?N:G.key)||null,h(j,S,G,L);case x:return S=S.get(G.key===null?N:G.key)||null,T(j,S,G,L);case Q:var te=G._init;return G=te(G._payload),R(S,j,N,G,L)}if(Qe(G)||Ke(G))return S=S.get(N)||null,$(j,S,G,L,null);if(typeof G.then=="function")return R(S,j,N,Mn(G),L);if(G.$$typeof===X)return R(S,j,N,jn(j,G),L);qn(j,G)}return null}function F(S,j,N,G){for(var L=null,te=null,Y=j,P=j=0,ke=null;Y!==null&&P<N.length;P++){Y.index>P?(ke=Y,Y=null):ke=Y.sibling;var ie=w(S,Y,N[P],G);if(ie===null){Y===null&&(Y=ke);break}e&&Y&&ie.alternate===null&&t(S,Y),j=r(ie,j,P),te===null?L=ie:te.sibling=ie,te=ie,Y=ke}if(P===N.length)return a(S,Y),ue&&Ba(S,P),L;if(Y===null){for(;P<N.length;P++)Y=z(S,N[P],G),Y!==null&&(j=r(Y,j,P),te===null?L=Y:te.sibling=Y,te=Y);return ue&&Ba(S,P),L}for(Y=l(Y);P<N.length;P++)ke=R(Y,S,P,N[P],G),ke!==null&&(e&&ke.alternate!==null&&Y.delete(ke.key===null?P:ke.key),j=r(ke,j,P),te===null?L=ke:te.sibling=ke,te=ke);return e&&Y.forEach(function(Da){return t(S,Da)}),ue&&Ba(S,P),L}function Z(S,j,N,G){if(N==null)throw Error(f(151));for(var L=null,te=null,Y=j,P=j=0,ke=null,ie=N.next();Y!==null&&!ie.done;P++,ie=N.next()){Y.index>P?(ke=Y,Y=null):ke=Y.sibling;var Da=w(S,Y,ie.value,G);if(Da===null){Y===null&&(Y=ke);break}e&&Y&&Da.alternate===null&&t(S,Y),j=r(Da,j,P),te===null?L=Da:te.sibling=Da,te=Da,Y=ke}if(ie.done)return a(S,Y),ue&&Ba(S,P),L;if(Y===null){for(;!ie.done;P++,ie=N.next())ie=z(S,ie.value,G),ie!==null&&(j=r(ie,j,P),te===null?L=ie:te.sibling=ie,te=ie);return ue&&Ba(S,P),L}for(Y=l(Y);!ie.done;P++,ie=N.next())ie=R(Y,S,P,ie.value,G),ie!==null&&(e&&ie.alternate!==null&&Y.delete(ie.key===null?P:ie.key),j=r(ie,j,P),te===null?L=ie:te.sibling=ie,te=ie);return e&&Y.forEach(function(u0){return t(S,u0)}),ue&&Ba(S,P),L}function ye(S,j,N,G){if(typeof N=="object"&&N!==null&&N.type===_&&N.key===null&&(N=N.props.children),typeof N=="object"&&N!==null){switch(N.$$typeof){case b:e:{for(var L=N.key;j!==null;){if(j.key===L){if(L=N.type,L===_){if(j.tag===7){a(S,j.sibling),G=s(j,N.props.children),G.return=S,S=G;break e}}else if(j.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Q&&rf(L)===j.type){a(S,j.sibling),G=s(j,N.props),As(G,N),G.return=S,S=G;break e}a(S,j);break}else t(S,j);j=j.sibling}N.type===_?(G=za(N.props.children,S.mode,G,N.key),G.return=S,S=G):(G=yn(N.type,N.key,N.props,null,S.mode,G),As(G,N),G.return=S,S=G)}return o(S);case x:e:{for(L=N.key;j!==null;){if(j.key===L)if(j.tag===4&&j.stateNode.containerInfo===N.containerInfo&&j.stateNode.implementation===N.implementation){a(S,j.sibling),G=s(j,N.children||[]),G.return=S,S=G;break e}else{a(S,j);break}else t(S,j);j=j.sibling}G=li(N,S.mode,G),G.return=S,S=G}return o(S);case Q:return L=N._init,N=L(N._payload),ye(S,j,N,G)}if(Qe(N))return F(S,j,N,G);if(Ke(N)){if(L=Ke(N),typeof L!="function")throw Error(f(150));return N=L.call(N),Z(S,j,N,G)}if(typeof N.then=="function")return ye(S,j,Mn(N),G);if(N.$$typeof===X)return ye(S,j,jn(S,N),G);qn(S,N)}return typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint"?(N=""+N,j!==null&&j.tag===6?(a(S,j.sibling),G=s(j,N),G.return=S,S=G):(a(S,j),G=ai(N,S.mode,G),G.return=S,S=G),o(S)):a(S,j)}return function(S,j,N,G){try{js=0;var L=ye(S,j,N,G);return Tl=null,L}catch(Y){if(Y===ds||Y===Sn)throw Y;var te=ft(29,Y,null,S.mode);return te.lanes=G,te.return=S,te}finally{}}}var wl=cf(!0),uf=cf(!1),Tt=Xe(null),Gt=null;function pa(e){var t=e.alternate;re(Be,Be.current&1),re(Tt,e),Gt===null&&(t===null||Al.current!==null||t.memoizedState!==null)&&(Gt=e)}function of(e){if(e.tag===22){if(re(Be,Be.current),re(Tt,e),Gt===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Gt=e)}}else ya()}function ya(){re(Be,Be.current),re(Tt,Tt.current)}function Ft(e){_e(Tt),Gt===e&&(Gt=null),_e(Be)}var Be=Xe(0);function $n(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||Nc(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function $i(e,t,a,l){t=e.memoizedState,a=a(l,t),a=a==null?t:I({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Gi={enqueueSetState:function(e,t,a){e=e._reactInternals;var l=gt(),s=ma(l);s.payload=t,a!=null&&(s.callback=a),t=ha(e,s,l),t!==null&&(pt(t,e,l),hs(t,e,l))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var l=gt(),s=ma(l);s.tag=1,s.payload=t,a!=null&&(s.callback=a),t=ha(e,s,l),t!==null&&(pt(t,e,l),hs(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=gt(),l=ma(a);l.tag=2,t!=null&&(l.callback=t),t=ha(e,l,a),t!==null&&(pt(t,e,a),hs(t,e,a))}};function ff(e,t,a,l,s,r,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,r,o):t.prototype&&t.prototype.isPureReactComponent?!ss(a,l)||!ss(s,r):!0}function df(e,t,a,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,l),t.state!==e&&Gi.enqueueReplaceState(t,t.state,null)}function Za(e,t){var a=t;if("ref"in t){a={};for(var l in t)l!=="ref"&&(a[l]=t[l])}if(e=e.defaultProps){a===t&&(a=I({},a));for(var s in e)a[s]===void 0&&(a[s]=e[s])}return a}var Gn=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function mf(e){Gn(e)}function hf(e){console.error(e)}function gf(e){Gn(e)}function zn(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function pf(e,t,a){try{var l=e.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function zi(e,t,a){return a=ma(a),a.tag=3,a.payload={element:null},a.callback=function(){zn(e,t)},a}function yf(e){return e=ma(e),e.tag=3,e}function xf(e,t,a,l){var s=a.type.getDerivedStateFromError;if(typeof s=="function"){var r=l.value;e.payload=function(){return s(r)},e.callback=function(){pf(t,a,l)}}var o=a.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(e.callback=function(){pf(t,a,l),typeof s!="function"&&(Sa===null?Sa=new Set([this]):Sa.add(this));var d=l.stack;this.componentDidCatch(l.value,{componentStack:d!==null?d:""})})}function ug(e,t,a,l,s){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=a.alternate,t!==null&&us(t,a,s,!0),a=Tt.current,a!==null){switch(a.tag){case 13:return Gt===null?cc():a.alternate===null&&Ie===0&&(Ie=3),a.flags&=-257,a.flags|=65536,a.lanes=s,l===mi?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([l]):t.add(l),oc(e,l,s)),!1;case 22:return a.flags|=65536,l===mi?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([l]):a.add(l)),oc(e,l,s)),!1}throw Error(f(435,a.tag))}return oc(e,l,s),cc(),!1}if(ue)return t=Tt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,l!==ri&&(e=Error(f(422),{cause:l}),cs(At(e,a)))):(l!==ri&&(t=Error(f(423),{cause:l}),cs(At(t,a))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,l=At(l,a),s=zi(e.stateNode,l,s),pi(e,s),Ie!==4&&(Ie=2)),!1;var r=Error(f(520),{cause:l});if(r=At(r,a),Es===null?Es=[r]:Es.push(r),Ie!==4&&(Ie=2),t===null)return!0;l=At(l,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=s&-s,a.lanes|=e,e=zi(a.stateNode,l,e),pi(a,e),!1;case 1:if(t=a.type,r=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(Sa===null||!Sa.has(r))))return a.flags|=65536,s&=-s,a.lanes|=s,s=yf(s),xf(s,e,a,l),pi(a,s),!1}a=a.return}while(a!==null);return!1}var vf=Error(f(461)),Le=!1;function Ze(e,t,a,l){t.child=e===null?uf(t,null,a,l):wl(t,e.child,a,l)}function bf(e,t,a,l,s){a=a.render;var r=t.ref;if("ref"in l){var o={};for(var d in l)d!=="ref"&&(o[d]=l[d])}else o=l;return Ya(t),l=ji(e,t,a,o,r,s),d=Ai(),e!==null&&!Le?(Si(e,t,s),Wt(e,t,s)):(ue&&d&&si(t),t.flags|=1,Ze(e,t,l,s),t.child)}function jf(e,t,a,l,s){if(e===null){var r=a.type;return typeof r=="function"&&!ti(r)&&r.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=r,Af(e,t,r,l,s)):(e=yn(a.type,null,l,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!Qi(e,s)){var o=r.memoizedProps;if(a=a.compare,a=a!==null?a:ss,a(o,l)&&e.ref===t.ref)return Wt(e,t,s)}return t.flags|=1,e=Qt(r,l),e.ref=t.ref,e.return=t,t.child=e}function Af(e,t,a,l,s){if(e!==null){var r=e.memoizedProps;if(ss(r,l)&&e.ref===t.ref)if(Le=!1,t.pendingProps=l=r,Qi(e,s))(e.flags&131072)!==0&&(Le=!0);else return t.lanes=e.lanes,Wt(e,t,s)}return Ci(e,t,a,l,s)}function Sf(e,t,a){var l=t.pendingProps,s=l.children,r=e!==null?e.memoizedState:null;if(l.mode==="hidden"){if((t.flags&128)!==0){if(l=r!==null?r.baseLanes|a:a,e!==null){for(s=t.child=e.child,r=0;s!==null;)r=r|s.lanes|s.childLanes,s=s.sibling;t.childLanes=r&~l}else t.childLanes=0,t.child=null;return _f(e,t,l,a)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&An(t,r!==null?r.cachePool:null),r!==null?jo(t,r):xi(),of(t);else return t.lanes=t.childLanes=536870912,_f(e,t,r!==null?r.baseLanes|a:a,a)}else r!==null?(An(t,r.cachePool),jo(t,r),ya(),t.memoizedState=null):(e!==null&&An(t,null),xi(),ya());return Ze(e,t,s,a),t.child}function _f(e,t,a,l){var s=di();return s=s===null?null:{parent:Ce._currentValue,pool:s},t.memoizedState={baseLanes:a,cachePool:s},e!==null&&An(t,null),xi(),of(t),e!==null&&us(e,t,l,!0),null}function Cn(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(f(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Ci(e,t,a,l,s){return Ya(t),a=ji(e,t,a,l,void 0,s),l=Ai(),e!==null&&!Le?(Si(e,t,s),Wt(e,t,s)):(ue&&l&&si(t),t.flags|=1,Ze(e,t,a,s),t.child)}function Nf(e,t,a,l,s,r){return Ya(t),t.updateQueue=null,a=So(t,l,a,s),Ao(e),l=Ai(),e!==null&&!Le?(Si(e,t,r),Wt(e,t,r)):(ue&&l&&si(t),t.flags|=1,Ze(e,t,a,r),t.child)}function Tf(e,t,a,l,s){if(Ya(t),t.stateNode===null){var r=yl,o=a.contextType;typeof o=="object"&&o!==null&&(r=We(o)),r=new a(l,r),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Gi,t.stateNode=r,r._reactInternals=t,r=t.stateNode,r.props=l,r.state=t.memoizedState,r.refs={},hi(t),o=a.contextType,r.context=typeof o=="object"&&o!==null?We(o):yl,r.state=t.memoizedState,o=a.getDerivedStateFromProps,typeof o=="function"&&($i(t,a,o,l),r.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(o=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),o!==r.state&&Gi.enqueueReplaceState(r,r.state,null),ps(t,l,r,s),gs(),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){r=t.stateNode;var d=t.memoizedProps,h=Za(a,d);r.props=h;var T=r.context,$=a.contextType;o=yl,typeof $=="object"&&$!==null&&(o=We($));var z=a.getDerivedStateFromProps;$=typeof z=="function"||typeof r.getSnapshotBeforeUpdate=="function",d=t.pendingProps!==d,$||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(d||T!==o)&&df(t,r,l,o),da=!1;var w=t.memoizedState;r.state=w,ps(t,l,r,s),gs(),T=t.memoizedState,d||w!==T||da?(typeof z=="function"&&($i(t,a,z,l),T=t.memoizedState),(h=da||ff(t,a,h,l,w,T,o))?($||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(t.flags|=4194308)):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=T),r.props=l,r.state=T,r.context=o,l=h):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{r=t.stateNode,gi(e,t),o=t.memoizedProps,$=Za(a,o),r.props=$,z=t.pendingProps,w=r.context,T=a.contextType,h=yl,typeof T=="object"&&T!==null&&(h=We(T)),d=a.getDerivedStateFromProps,(T=typeof d=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(o!==z||w!==h)&&df(t,r,l,h),da=!1,w=t.memoizedState,r.state=w,ps(t,l,r,s),gs();var R=t.memoizedState;o!==z||w!==R||da||e!==null&&e.dependencies!==null&&bn(e.dependencies)?(typeof d=="function"&&($i(t,a,d,l),R=t.memoizedState),($=da||ff(t,a,$,l,w,R,h)||e!==null&&e.dependencies!==null&&bn(e.dependencies))?(T||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(l,R,h),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(l,R,h)),typeof r.componentDidUpdate=="function"&&(t.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof r.componentDidUpdate!="function"||o===e.memoizedProps&&w===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&w===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=R),r.props=l,r.state=R,r.context=h,l=$):(typeof r.componentDidUpdate!="function"||o===e.memoizedProps&&w===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&w===e.memoizedState||(t.flags|=1024),l=!1)}return r=l,Cn(e,t),l=(t.flags&128)!==0,r||l?(r=t.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:r.render(),t.flags|=1,e!==null&&l?(t.child=wl(t,e.child,null,s),t.child=wl(t,null,a,s)):Ze(e,t,a,s),t.memoizedState=r.state,e=t.child):e=Wt(e,t,s),e}function wf(e,t,a,l){return is(),t.flags|=256,Ze(e,t,a,l),t.child}var Bi={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Xi(e){return{baseLanes:e,cachePool:mo()}}function Hi(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=wt),e}function Rf(e,t,a){var l=t.pendingProps,s=!1,r=(t.flags&128)!==0,o;if((o=r)||(o=e!==null&&e.memoizedState===null?!1:(Be.current&2)!==0),o&&(s=!0,t.flags&=-129),o=(t.flags&32)!==0,t.flags&=-33,e===null){if(ue){if(s?pa(t):ya(),ue){var d=Oe,h;if(h=d){e:{for(h=d,d=$t;h.nodeType!==8;){if(!d){d=null;break e}if(h=Ot(h.nextSibling),h===null){d=null;break e}}d=h}d!==null?(t.memoizedState={dehydrated:d,treeContext:Ca!==null?{id:Zt,overflow:Vt}:null,retryLane:536870912,hydrationErrors:null},h=ft(18,null,null,0),h.stateNode=d,h.return=t,t.child=h,et=t,Oe=null,h=!0):h=!1}h||Ha(t)}if(d=t.memoizedState,d!==null&&(d=d.dehydrated,d!==null))return Nc(d)?t.lanes=32:t.lanes=536870912,null;Ft(t)}return d=l.children,l=l.fallback,s?(ya(),s=t.mode,d=Bn({mode:"hidden",children:d},s),l=za(l,s,a,null),d.return=t,l.return=t,d.sibling=l,t.child=d,s=t.child,s.memoizedState=Xi(a),s.childLanes=Hi(e,o,a),t.memoizedState=Bi,l):(pa(t),Li(t,d))}if(h=e.memoizedState,h!==null&&(d=h.dehydrated,d!==null)){if(r)t.flags&256?(pa(t),t.flags&=-257,t=Yi(e,t,a)):t.memoizedState!==null?(ya(),t.child=e.child,t.flags|=128,t=null):(ya(),s=l.fallback,d=t.mode,l=Bn({mode:"visible",children:l.children},d),s=za(s,d,a,null),s.flags|=2,l.return=t,s.return=t,l.sibling=s,t.child=l,wl(t,e.child,null,a),l=t.child,l.memoizedState=Xi(a),l.childLanes=Hi(e,o,a),t.memoizedState=Bi,t=s);else if(pa(t),Nc(d)){if(o=d.nextSibling&&d.nextSibling.dataset,o)var T=o.dgst;o=T,l=Error(f(419)),l.stack="",l.digest=o,cs({value:l,source:null,stack:null}),t=Yi(e,t,a)}else if(Le||us(e,t,a,!1),o=(a&e.childLanes)!==0,Le||o){if(o=Ae,o!==null&&(l=a&-a,l=(l&42)!==0?1:Tr(l),l=(l&(o.suspendedLanes|a))!==0?0:l,l!==0&&l!==h.retryLane))throw h.retryLane=l,pl(e,l),pt(o,e,l),vf;d.data==="$?"||cc(),t=Yi(e,t,a)}else d.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=h.treeContext,Oe=Ot(d.nextSibling),et=t,ue=!0,Xa=null,$t=!1,e!==null&&(_t[Nt++]=Zt,_t[Nt++]=Vt,_t[Nt++]=Ca,Zt=e.id,Vt=e.overflow,Ca=t),t=Li(t,l.children),t.flags|=4096);return t}return s?(ya(),s=l.fallback,d=t.mode,h=e.child,T=h.sibling,l=Qt(h,{mode:"hidden",children:l.children}),l.subtreeFlags=h.subtreeFlags&65011712,T!==null?s=Qt(T,s):(s=za(s,d,a,null),s.flags|=2),s.return=t,l.return=t,l.sibling=s,t.child=l,l=s,s=t.child,d=e.child.memoizedState,d===null?d=Xi(a):(h=d.cachePool,h!==null?(T=Ce._currentValue,h=h.parent!==T?{parent:T,pool:T}:h):h=mo(),d={baseLanes:d.baseLanes|a,cachePool:h}),s.memoizedState=d,s.childLanes=Hi(e,o,a),t.memoizedState=Bi,l):(pa(t),a=e.child,e=a.sibling,a=Qt(a,{mode:"visible",children:l.children}),a.return=t,a.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=a,t.memoizedState=null,a)}function Li(e,t){return t=Bn({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Bn(e,t){return e=ft(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Yi(e,t,a){return wl(t,e.child,null,a),e=Li(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ef(e,t,a){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),ci(e.return,t,a)}function ki(e,t,a,l,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=l,r.tail=a,r.tailMode=s)}function Uf(e,t,a){var l=t.pendingProps,s=l.revealOrder,r=l.tail;if(Ze(e,t,l.children,a),l=Be.current,(l&2)!==0)l=l&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ef(e,a,t);else if(e.tag===19)Ef(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}switch(re(Be,l),s){case"forwards":for(a=t.child,s=null;a!==null;)e=a.alternate,e!==null&&$n(e)===null&&(s=a),a=a.sibling;a=s,a===null?(s=t.child,t.child=null):(s=a.sibling,a.sibling=null),ki(t,!1,s,a,r);break;case"backwards":for(a=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&$n(e)===null){t.child=s;break}e=s.sibling,s.sibling=a,a=s,s=e}ki(t,!0,a,null,r);break;case"together":ki(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Wt(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Aa|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(us(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(f(153));if(t.child!==null){for(e=t.child,a=Qt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Qt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Qi(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&bn(e)))}function og(e,t,a){switch(t.tag){case 3:Lt(t,t.stateNode.containerInfo),fa(t,Ce,e.memoizedState.cache),is();break;case 27:case 5:jr(t);break;case 4:Lt(t,t.stateNode.containerInfo);break;case 10:fa(t,t.type,t.memoizedProps.value);break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(pa(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Rf(e,t,a):(pa(t),e=Wt(e,t,a),e!==null?e.sibling:null);pa(t);break;case 19:var s=(e.flags&128)!==0;if(l=(a&t.childLanes)!==0,l||(us(e,t,a,!1),l=(a&t.childLanes)!==0),s){if(l)return Uf(e,t,a);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),re(Be,Be.current),l)break;return null;case 22:case 23:return t.lanes=0,Sf(e,t,a);case 24:fa(t,Ce,e.memoizedState.cache)}return Wt(e,t,a)}function Df(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Le=!0;else{if(!Qi(e,a)&&(t.flags&128)===0)return Le=!1,og(e,t,a);Le=(e.flags&131072)!==0}else Le=!1,ue&&(t.flags&1048576)!==0&&no(t,vn,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var l=t.elementType,s=l._init;if(l=s(l._payload),t.type=l,typeof l=="function")ti(l)?(e=Za(l,e),t.tag=1,t=Tf(null,t,l,e,a)):(t.tag=0,t=Ci(null,t,l,e,a));else{if(l!=null){if(s=l.$$typeof,s===V){t.tag=11,t=bf(null,t,l,e,a);break e}else if(s===De){t.tag=14,t=jf(null,t,l,e,a);break e}}throw t=we(l)||l,Error(f(306,t,""))}}return t;case 0:return Ci(e,t,t.type,t.pendingProps,a);case 1:return l=t.type,s=Za(l,t.pendingProps),Tf(e,t,l,s,a);case 3:e:{if(Lt(t,t.stateNode.containerInfo),e===null)throw Error(f(387));l=t.pendingProps;var r=t.memoizedState;s=r.element,gi(e,t),ps(t,l,null,a);var o=t.memoizedState;if(l=o.cache,fa(t,Ce,l),l!==r.cache&&ui(t,[Ce],a,!0),gs(),l=o.element,r.isDehydrated)if(r={element:l,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=r,t.memoizedState=r,t.flags&256){t=wf(e,t,l,a);break e}else if(l!==s){s=At(Error(f(424)),t),cs(s),t=wf(e,t,l,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Oe=Ot(e.firstChild),et=t,ue=!0,Xa=null,$t=!0,a=uf(t,null,l,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(is(),l===s){t=Wt(e,t,a);break e}Ze(e,t,l,a)}t=t.child}return t;case 26:return Cn(e,t),e===null?(a=qd(t.type,null,t.pendingProps,null))?t.memoizedState=a:ue||(a=t.type,e=t.pendingProps,l=er(k.current).createElement(a),l[Fe]=t,l[at]=e,Pe(l,a,e),He(l),t.stateNode=l):t.memoizedState=qd(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return jr(t),e===null&&ue&&(l=t.stateNode=Od(t.type,t.pendingProps,k.current),et=t,$t=!0,s=Oe,Ta(t.type)?(Tc=s,Oe=Ot(l.firstChild)):Oe=s),Ze(e,t,t.pendingProps.children,a),Cn(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ue&&((s=l=Oe)&&(l=zg(l,t.type,t.pendingProps,$t),l!==null?(t.stateNode=l,et=t,Oe=Ot(l.firstChild),$t=!1,s=!0):s=!1),s||Ha(t)),jr(t),s=t.type,r=t.pendingProps,o=e!==null?e.memoizedProps:null,l=r.children,Ac(s,r)?l=null:o!==null&&Ac(s,o)&&(t.flags|=32),t.memoizedState!==null&&(s=ji(e,t,ag,null,null,a),zs._currentValue=s),Cn(e,t),Ze(e,t,l,a),t.child;case 6:return e===null&&ue&&((e=a=Oe)&&(a=Cg(a,t.pendingProps,$t),a!==null?(t.stateNode=a,et=t,Oe=null,e=!0):e=!1),e||Ha(t)),null;case 13:return Rf(e,t,a);case 4:return Lt(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=wl(t,null,l,a):Ze(e,t,l,a),t.child;case 11:return bf(e,t,t.type,t.pendingProps,a);case 7:return Ze(e,t,t.pendingProps,a),t.child;case 8:return Ze(e,t,t.pendingProps.children,a),t.child;case 12:return Ze(e,t,t.pendingProps.children,a),t.child;case 10:return l=t.pendingProps,fa(t,t.type,l.value),Ze(e,t,l.children,a),t.child;case 9:return s=t.type._context,l=t.pendingProps.children,Ya(t),s=We(s),l=l(s),t.flags|=1,Ze(e,t,l,a),t.child;case 14:return jf(e,t,t.type,t.pendingProps,a);case 15:return Af(e,t,t.type,t.pendingProps,a);case 19:return Uf(e,t,a);case 31:return l=t.pendingProps,a=t.mode,l={mode:l.mode,children:l.children},e===null?(a=Bn(l,a),a.ref=t.ref,t.child=a,a.return=t,t=a):(a=Qt(e.child,l),a.ref=t.ref,t.child=a,a.return=t,t=a),t;case 22:return Sf(e,t,a);case 24:return Ya(t),l=We(Ce),e===null?(s=di(),s===null&&(s=Ae,r=oi(),s.pooledCache=r,r.refCount++,r!==null&&(s.pooledCacheLanes|=a),s=r),t.memoizedState={parent:l,cache:s},hi(t),fa(t,Ce,s)):((e.lanes&a)!==0&&(gi(e,t),ps(t,null,null,a),gs()),s=e.memoizedState,r=t.memoizedState,s.parent!==l?(s={parent:l,cache:l},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),fa(t,Ce,l)):(l=r.cache,fa(t,Ce,l),l!==s.cache&&ui(t,[Ce],a,!0))),Ze(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(f(156,t.tag))}function ea(e){e.flags|=4}function Of(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Bd(t)){if(t=Tt.current,t!==null&&((se&4194048)===se?Gt!==null:(se&62914560)!==se&&(se&536870912)===0||t!==Gt))throw ms=mi,ho;e.flags|=8192}}function Xn(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?cu():536870912,e.lanes|=t,Dl|=t)}function Ss(e,t){if(!ue)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function Ee(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,l=0;if(t)for(var s=e.child;s!==null;)a|=s.lanes|s.childLanes,l|=s.subtreeFlags&65011712,l|=s.flags&65011712,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)a|=s.lanes|s.childLanes,l|=s.subtreeFlags,l|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=l,e.childLanes=a,t}function fg(e,t,a){var l=t.pendingProps;switch(ni(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ee(t),null;case 1:return Ee(t),null;case 3:return a=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Kt(Ce),vt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(rs(t)?ea(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,co())),Ee(t),null;case 26:return a=t.memoizedState,e===null?(ea(t),a!==null?(Ee(t),Of(t,a)):(Ee(t),t.flags&=-16777217)):a?a!==e.memoizedState?(ea(t),Ee(t),Of(t,a)):(Ee(t),t.flags&=-16777217):(e.memoizedProps!==l&&ea(t),Ee(t),t.flags&=-16777217),null;case 27:Js(t),a=k.current;var s=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==l&&ea(t);else{if(!l){if(t.stateNode===null)throw Error(f(166));return Ee(t),null}e=Re.current,rs(t)?ro(t):(e=Od(s,l,a),t.stateNode=e,ea(t))}return Ee(t),null;case 5:if(Js(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&ea(t);else{if(!l){if(t.stateNode===null)throw Error(f(166));return Ee(t),null}if(e=Re.current,rs(t))ro(t);else{switch(s=er(k.current),e){case 1:e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof l.is=="string"?s.createElement("select",{is:l.is}):s.createElement("select"),l.multiple?e.multiple=!0:l.size&&(e.size=l.size);break;default:e=typeof l.is=="string"?s.createElement(a,{is:l.is}):s.createElement(a)}}e[Fe]=t,e[at]=l;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)e.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=e;e:switch(Pe(e,a,l),a){case"button":case"input":case"select":case"textarea":e=!!l.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&ea(t)}}return Ee(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&ea(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(f(166));if(e=k.current,rs(t)){if(e=t.stateNode,a=t.memoizedProps,l=null,s=et,s!==null)switch(s.tag){case 27:case 5:l=s.memoizedProps}e[Fe]=t,e=!!(e.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||Nd(e.nodeValue,a)),e||Ha(t)}else e=er(e).createTextNode(l),e[Fe]=t,t.stateNode=e}return Ee(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=rs(t),l!==null&&l.dehydrated!==null){if(e===null){if(!s)throw Error(f(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(f(317));s[Fe]=t}else is(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),s=!1}else s=co(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(Ft(t),t):(Ft(t),null)}if(Ft(t),(t.flags&128)!==0)return t.lanes=a,t;if(a=l!==null,e=e!==null&&e.memoizedState!==null,a){l=t.child,s=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(s=l.alternate.memoizedState.cachePool.pool);var r=null;l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(r=l.memoizedState.cachePool.pool),r!==s&&(l.flags|=2048)}return a!==e&&a&&(t.child.flags|=8192),Xn(t,t.updateQueue),Ee(t),null;case 4:return vt(),e===null&&yc(t.stateNode.containerInfo),Ee(t),null;case 10:return Kt(t.type),Ee(t),null;case 19:if(_e(Be),s=t.memoizedState,s===null)return Ee(t),null;if(l=(t.flags&128)!==0,r=s.rendering,r===null)if(l)Ss(s,!1);else{if(Ie!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(r=$n(e),r!==null){for(t.flags|=128,Ss(s,!1),e=r.updateQueue,t.updateQueue=e,Xn(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)so(a,e),a=a.sibling;return re(Be,Be.current&1|2),t.child}e=e.sibling}s.tail!==null&&qt()>Yn&&(t.flags|=128,l=!0,Ss(s,!1),t.lanes=4194304)}else{if(!l)if(e=$n(r),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Xn(t,e),Ss(s,!0),s.tail===null&&s.tailMode==="hidden"&&!r.alternate&&!ue)return Ee(t),null}else 2*qt()-s.renderingStartTime>Yn&&a!==536870912&&(t.flags|=128,l=!0,Ss(s,!1),t.lanes=4194304);s.isBackwards?(r.sibling=t.child,t.child=r):(e=s.last,e!==null?e.sibling=r:t.child=r,s.last=r)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=qt(),t.sibling=null,e=Be.current,re(Be,l?e&1|2:e&1),t):(Ee(t),null);case 22:case 23:return Ft(t),vi(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?(a&536870912)!==0&&(t.flags&128)===0&&(Ee(t),t.subtreeFlags&6&&(t.flags|=8192)):Ee(t),a=t.updateQueue,a!==null&&Xn(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(t.flags|=2048),e!==null&&_e(ka),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Kt(Ce),Ee(t),null;case 25:return null;case 30:return null}throw Error(f(156,t.tag))}function dg(e,t){switch(ni(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Kt(Ce),vt(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Js(t),null;case 13:if(Ft(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(f(340));is()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return _e(Be),null;case 4:return vt(),null;case 10:return Kt(t.type),null;case 22:case 23:return Ft(t),vi(),e!==null&&_e(ka),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Kt(Ce),null;case 25:return null;default:return null}}function If(e,t){switch(ni(t),t.tag){case 3:Kt(Ce),vt();break;case 26:case 27:case 5:Js(t);break;case 4:vt();break;case 13:Ft(t);break;case 19:_e(Be);break;case 10:Kt(t.type);break;case 22:case 23:Ft(t),vi(),e!==null&&_e(ka);break;case 24:Kt(Ce)}}function _s(e,t){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var s=l.next;a=s;do{if((a.tag&e)===e){l=void 0;var r=a.create,o=a.inst;l=r(),o.destroy=l}a=a.next}while(a!==s)}}catch(d){ve(t,t.return,d)}}function xa(e,t,a){try{var l=t.updateQueue,s=l!==null?l.lastEffect:null;if(s!==null){var r=s.next;l=r;do{if((l.tag&e)===e){var o=l.inst,d=o.destroy;if(d!==void 0){o.destroy=void 0,s=t;var h=a,T=d;try{T()}catch($){ve(s,h,$)}}}l=l.next}while(l!==r)}}catch($){ve(t,t.return,$)}}function Mf(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{bo(t,a)}catch(l){ve(e,e.return,l)}}}function qf(e,t,a){a.props=Za(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(l){ve(e,t,l)}}function Ns(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof a=="function"?e.refCleanup=a(l):a.current=l}}catch(s){ve(e,t,s)}}function zt(e,t){var a=e.ref,l=e.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(s){ve(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(s){ve(e,t,s)}else a.current=null}function $f(e){var t=e.type,a=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break e;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(s){ve(e,e.return,s)}}function Zi(e,t,a){try{var l=e.stateNode;Ig(l,e.type,a,t),l[at]=t}catch(s){ve(e,e.return,s)}}function Gf(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ta(e.type)||e.tag===4}function Vi(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Gf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ta(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Pi(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Wn));else if(l!==4&&(l===27&&Ta(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Pi(e,t,a),e=e.sibling;e!==null;)Pi(e,t,a),e=e.sibling}function Hn(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(l!==4&&(l===27&&Ta(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Hn(e,t,a),e=e.sibling;e!==null;)Hn(e,t,a),e=e.sibling}function zf(e){var t=e.stateNode,a=e.memoizedProps;try{for(var l=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);Pe(t,l,a),t[Fe]=e,t[at]=a}catch(r){ve(e,e.return,r)}}var ta=!1,qe=!1,Ki=!1,Cf=typeof WeakSet=="function"?WeakSet:Set,Ye=null;function mg(e,t){if(e=e.containerInfo,bc=rr,e=Vu(e),Vr(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var s=l.anchorOffset,r=l.focusNode;l=l.focusOffset;try{a.nodeType,r.nodeType}catch{a=null;break e}var o=0,d=-1,h=-1,T=0,$=0,z=e,w=null;t:for(;;){for(var R;z!==a||s!==0&&z.nodeType!==3||(d=o+s),z!==r||l!==0&&z.nodeType!==3||(h=o+l),z.nodeType===3&&(o+=z.nodeValue.length),(R=z.firstChild)!==null;)w=z,z=R;for(;;){if(z===e)break t;if(w===a&&++T===s&&(d=o),w===r&&++$===l&&(h=o),(R=z.nextSibling)!==null)break;z=w,w=z.parentNode}z=R}a=d===-1||h===-1?null:{start:d,end:h}}else a=null}a=a||{start:0,end:0}}else a=null;for(jc={focusedElem:e,selectionRange:a},rr=!1,Ye=t;Ye!==null;)if(t=Ye,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,Ye=e;else for(;Ye!==null;){switch(t=Ye,r=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&r!==null){e=void 0,a=t,s=r.memoizedProps,r=r.memoizedState,l=a.stateNode;try{var F=Za(a.type,s,a.elementType===a.type);e=l.getSnapshotBeforeUpdate(F,r),l.__reactInternalSnapshotBeforeUpdate=e}catch(Z){ve(a,a.return,Z)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)_c(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":_c(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(f(163))}if(e=t.sibling,e!==null){e.return=t.return,Ye=e;break}Ye=t.return}}function Bf(e,t,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:va(e,a),l&4&&_s(5,a);break;case 1:if(va(e,a),l&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(o){ve(a,a.return,o)}else{var s=Za(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){ve(a,a.return,o)}}l&64&&Mf(a),l&512&&Ns(a,a.return);break;case 3:if(va(e,a),l&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{bo(e,t)}catch(o){ve(a,a.return,o)}}break;case 27:t===null&&l&4&&zf(a);case 26:case 5:va(e,a),t===null&&l&4&&$f(a),l&512&&Ns(a,a.return);break;case 12:va(e,a);break;case 13:va(e,a),l&4&&Lf(e,a),l&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Ag.bind(null,a),Bg(e,a))));break;case 22:if(l=a.memoizedState!==null||ta,!l){t=t!==null&&t.memoizedState!==null||qe,s=ta;var r=qe;ta=l,(qe=t)&&!r?ba(e,a,(a.subtreeFlags&8772)!==0):va(e,a),ta=s,qe=r}break;case 30:break;default:va(e,a)}}function Xf(e){var t=e.alternate;t!==null&&(e.alternate=null,Xf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Er(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ne=null,nt=!1;function aa(e,t,a){for(a=a.child;a!==null;)Hf(e,t,a),a=a.sibling}function Hf(e,t,a){if(ct&&typeof ct.onCommitFiberUnmount=="function")try{ct.onCommitFiberUnmount(Ql,a)}catch{}switch(a.tag){case 26:qe||zt(a,t),aa(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:qe||zt(a,t);var l=Ne,s=nt;Ta(a.type)&&(Ne=a.stateNode,nt=!1),aa(e,t,a),Ms(a.stateNode),Ne=l,nt=s;break;case 5:qe||zt(a,t);case 6:if(l=Ne,s=nt,Ne=null,aa(e,t,a),Ne=l,nt=s,Ne!==null)if(nt)try{(Ne.nodeType===9?Ne.body:Ne.nodeName==="HTML"?Ne.ownerDocument.body:Ne).removeChild(a.stateNode)}catch(r){ve(a,t,r)}else try{Ne.removeChild(a.stateNode)}catch(r){ve(a,t,r)}break;case 18:Ne!==null&&(nt?(e=Ne,Ud(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Hs(e)):Ud(Ne,a.stateNode));break;case 4:l=Ne,s=nt,Ne=a.stateNode.containerInfo,nt=!0,aa(e,t,a),Ne=l,nt=s;break;case 0:case 11:case 14:case 15:qe||xa(2,a,t),qe||xa(4,a,t),aa(e,t,a);break;case 1:qe||(zt(a,t),l=a.stateNode,typeof l.componentWillUnmount=="function"&&qf(a,t,l)),aa(e,t,a);break;case 21:aa(e,t,a);break;case 22:qe=(l=qe)||a.memoizedState!==null,aa(e,t,a),qe=l;break;default:aa(e,t,a)}}function Lf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hs(e)}catch(a){ve(t,t.return,a)}}function hg(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Cf),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Cf),t;default:throw Error(f(435,e.tag))}}function Ji(e,t){var a=hg(e);t.forEach(function(l){var s=Sg.bind(null,e,l);a.has(l)||(a.add(l),l.then(s,s))})}function dt(e,t){var a=t.deletions;if(a!==null)for(var l=0;l<a.length;l++){var s=a[l],r=e,o=t,d=o;e:for(;d!==null;){switch(d.tag){case 27:if(Ta(d.type)){Ne=d.stateNode,nt=!1;break e}break;case 5:Ne=d.stateNode,nt=!1;break e;case 3:case 4:Ne=d.stateNode.containerInfo,nt=!0;break e}d=d.return}if(Ne===null)throw Error(f(160));Hf(r,o,s),Ne=null,nt=!1,r=s.alternate,r!==null&&(r.return=null),s.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)Yf(t,e),t=t.sibling}var Dt=null;function Yf(e,t){var a=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:dt(t,e),mt(e),l&4&&(xa(3,e,e.return),_s(3,e),xa(5,e,e.return));break;case 1:dt(t,e),mt(e),l&512&&(qe||a===null||zt(a,a.return)),l&64&&ta&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var s=Dt;if(dt(t,e),mt(e),l&512&&(qe||a===null||zt(a,a.return)),l&4){var r=a!==null?a.memoizedState:null;if(l=e.memoizedState,a===null)if(l===null)if(e.stateNode===null){e:{l=e.type,a=e.memoizedProps,s=s.ownerDocument||s;t:switch(l){case"title":r=s.getElementsByTagName("title")[0],(!r||r[Pl]||r[Fe]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=s.createElement(l),s.head.insertBefore(r,s.querySelector("head > title"))),Pe(r,l,a),r[Fe]=e,He(r),l=r;break e;case"link":var o=zd("link","href",s).get(l+(a.href||""));if(o){for(var d=0;d<o.length;d++)if(r=o[d],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){o.splice(d,1);break t}}r=s.createElement(l),Pe(r,l,a),s.head.appendChild(r);break;case"meta":if(o=zd("meta","content",s).get(l+(a.content||""))){for(d=0;d<o.length;d++)if(r=o[d],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){o.splice(d,1);break t}}r=s.createElement(l),Pe(r,l,a),s.head.appendChild(r);break;default:throw Error(f(468,l))}r[Fe]=e,He(r),l=r}e.stateNode=l}else Cd(s,e.type,e.stateNode);else e.stateNode=Gd(s,l,e.memoizedProps);else r!==l?(r===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):r.count--,l===null?Cd(s,e.type,e.stateNode):Gd(s,l,e.memoizedProps)):l===null&&e.stateNode!==null&&Zi(e,e.memoizedProps,a.memoizedProps)}break;case 27:dt(t,e),mt(e),l&512&&(qe||a===null||zt(a,a.return)),a!==null&&l&4&&Zi(e,e.memoizedProps,a.memoizedProps);break;case 5:if(dt(t,e),mt(e),l&512&&(qe||a===null||zt(a,a.return)),e.flags&32){s=e.stateNode;try{ul(s,"")}catch(R){ve(e,e.return,R)}}l&4&&e.stateNode!=null&&(s=e.memoizedProps,Zi(e,s,a!==null?a.memoizedProps:s)),l&1024&&(Ki=!0);break;case 6:if(dt(t,e),mt(e),l&4){if(e.stateNode===null)throw Error(f(162));l=e.memoizedProps,a=e.stateNode;try{a.nodeValue=l}catch(R){ve(e,e.return,R)}}break;case 3:if(lr=null,s=Dt,Dt=tr(t.containerInfo),dt(t,e),Dt=s,mt(e),l&4&&a!==null&&a.memoizedState.isDehydrated)try{Hs(t.containerInfo)}catch(R){ve(e,e.return,R)}Ki&&(Ki=!1,kf(e));break;case 4:l=Dt,Dt=tr(e.stateNode.containerInfo),dt(t,e),mt(e),Dt=l;break;case 12:dt(t,e),mt(e);break;case 13:dt(t,e),mt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(lc=qt()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Ji(e,l)));break;case 22:s=e.memoizedState!==null;var h=a!==null&&a.memoizedState!==null,T=ta,$=qe;if(ta=T||s,qe=$||h,dt(t,e),qe=$,ta=T,mt(e),l&8192)e:for(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,s&&(a===null||h||ta||qe||Va(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){h=a=t;try{if(r=h.stateNode,s)o=r.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{d=h.stateNode;var z=h.memoizedProps.style,w=z!=null&&z.hasOwnProperty("display")?z.display:null;d.style.display=w==null||typeof w=="boolean"?"":(""+w).trim()}}catch(R){ve(h,h.return,R)}}}else if(t.tag===6){if(a===null){h=t;try{h.stateNode.nodeValue=s?"":h.memoizedProps}catch(R){ve(h,h.return,R)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,Ji(e,a))));break;case 19:dt(t,e),mt(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Ji(e,l)));break;case 30:break;case 21:break;default:dt(t,e),mt(e)}}function mt(e){var t=e.flags;if(t&2){try{for(var a,l=e.return;l!==null;){if(Gf(l)){a=l;break}l=l.return}if(a==null)throw Error(f(160));switch(a.tag){case 27:var s=a.stateNode,r=Vi(e);Hn(e,r,s);break;case 5:var o=a.stateNode;a.flags&32&&(ul(o,""),a.flags&=-33);var d=Vi(e);Hn(e,d,o);break;case 3:case 4:var h=a.stateNode.containerInfo,T=Vi(e);Pi(e,T,h);break;default:throw Error(f(161))}}catch($){ve(e,e.return,$)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function kf(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;kf(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function va(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Bf(e,t.alternate,t),t=t.sibling}function Va(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:xa(4,t,t.return),Va(t);break;case 1:zt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&qf(t,t.return,a),Va(t);break;case 27:Ms(t.stateNode);case 26:case 5:zt(t,t.return),Va(t);break;case 22:t.memoizedState===null&&Va(t);break;case 30:Va(t);break;default:Va(t)}e=e.sibling}}function ba(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,s=e,r=t,o=r.flags;switch(r.tag){case 0:case 11:case 15:ba(s,r,a),_s(4,r);break;case 1:if(ba(s,r,a),l=r,s=l.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(T){ve(l,l.return,T)}if(l=r,s=l.updateQueue,s!==null){var d=l.stateNode;try{var h=s.shared.hiddenCallbacks;if(h!==null)for(s.shared.hiddenCallbacks=null,s=0;s<h.length;s++)vo(h[s],d)}catch(T){ve(l,l.return,T)}}a&&o&64&&Mf(r),Ns(r,r.return);break;case 27:zf(r);case 26:case 5:ba(s,r,a),a&&l===null&&o&4&&$f(r),Ns(r,r.return);break;case 12:ba(s,r,a);break;case 13:ba(s,r,a),a&&o&4&&Lf(s,r);break;case 22:r.memoizedState===null&&ba(s,r,a),Ns(r,r.return);break;case 30:break;default:ba(s,r,a)}t=t.sibling}}function Fi(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&os(a))}function Wi(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&os(e))}function Ct(e,t,a,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Qf(e,t,a,l),t=t.sibling}function Qf(e,t,a,l){var s=t.flags;switch(t.tag){case 0:case 11:case 15:Ct(e,t,a,l),s&2048&&_s(9,t);break;case 1:Ct(e,t,a,l);break;case 3:Ct(e,t,a,l),s&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&os(e)));break;case 12:if(s&2048){Ct(e,t,a,l),e=t.stateNode;try{var r=t.memoizedProps,o=r.id,d=r.onPostCommit;typeof d=="function"&&d(o,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(h){ve(t,t.return,h)}}else Ct(e,t,a,l);break;case 13:Ct(e,t,a,l);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?r._visibility&2?Ct(e,t,a,l):Ts(e,t):r._visibility&2?Ct(e,t,a,l):(r._visibility|=2,Rl(e,t,a,l,(t.subtreeFlags&10256)!==0)),s&2048&&Fi(o,t);break;case 24:Ct(e,t,a,l),s&2048&&Wi(t.alternate,t);break;default:Ct(e,t,a,l)}}function Rl(e,t,a,l,s){for(s=s&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var r=e,o=t,d=a,h=l,T=o.flags;switch(o.tag){case 0:case 11:case 15:Rl(r,o,d,h,s),_s(8,o);break;case 23:break;case 22:var $=o.stateNode;o.memoizedState!==null?$._visibility&2?Rl(r,o,d,h,s):Ts(r,o):($._visibility|=2,Rl(r,o,d,h,s)),s&&T&2048&&Fi(o.alternate,o);break;case 24:Rl(r,o,d,h,s),s&&T&2048&&Wi(o.alternate,o);break;default:Rl(r,o,d,h,s)}t=t.sibling}}function Ts(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,l=t,s=l.flags;switch(l.tag){case 22:Ts(a,l),s&2048&&Fi(l.alternate,l);break;case 24:Ts(a,l),s&2048&&Wi(l.alternate,l);break;default:Ts(a,l)}t=t.sibling}}var ws=8192;function El(e){if(e.subtreeFlags&ws)for(e=e.child;e!==null;)Zf(e),e=e.sibling}function Zf(e){switch(e.tag){case 26:El(e),e.flags&ws&&e.memoizedState!==null&&Wg(Dt,e.memoizedState,e.memoizedProps);break;case 5:El(e);break;case 3:case 4:var t=Dt;Dt=tr(e.stateNode.containerInfo),El(e),Dt=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=ws,ws=16777216,El(e),ws=t):El(e));break;default:El(e)}}function Vf(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Rs(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ye=l,Kf(l,e)}Vf(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pf(e),e=e.sibling}function Pf(e){switch(e.tag){case 0:case 11:case 15:Rs(e),e.flags&2048&&xa(9,e,e.return);break;case 3:Rs(e);break;case 12:Rs(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ln(e)):Rs(e);break;default:Rs(e)}}function Ln(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ye=l,Kf(l,e)}Vf(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:xa(8,t,t.return),Ln(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Ln(t));break;default:Ln(t)}e=e.sibling}}function Kf(e,t){for(;Ye!==null;){var a=Ye;switch(a.tag){case 0:case 11:case 15:xa(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:os(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,Ye=l;else e:for(a=e;Ye!==null;){l=Ye;var s=l.sibling,r=l.return;if(Xf(l),l===a){Ye=null;break e}if(s!==null){s.return=r,Ye=s;break e}Ye=r}}}var gg={getCacheForType:function(e){var t=We(Ce),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a}},pg=typeof WeakMap=="function"?WeakMap:Map,me=0,Ae=null,ae=null,se=0,he=0,ht=null,ja=!1,Ul=!1,ec=!1,la=0,Ie=0,Aa=0,Pa=0,tc=0,wt=0,Dl=0,Es=null,rt=null,ac=!1,lc=0,Yn=1/0,kn=null,Sa=null,Ve=0,_a=null,Ol=null,Il=0,sc=0,nc=null,Jf=null,Us=0,rc=null;function gt(){if((me&2)!==0&&se!==0)return se&-se;if(U.T!==null){var e=bl;return e!==0?e:mc()}return fu()}function Ff(){wt===0&&(wt=(se&536870912)===0||ue?iu():536870912);var e=Tt.current;return e!==null&&(e.flags|=32),wt}function pt(e,t,a){(e===Ae&&(he===2||he===9)||e.cancelPendingCommit!==null)&&(Ml(e,0),Na(e,se,wt,!1)),Vl(e,a),((me&2)===0||e!==Ae)&&(e===Ae&&((me&2)===0&&(Pa|=a),Ie===4&&Na(e,se,wt,!1)),Bt(e))}function Wf(e,t,a){if((me&6)!==0)throw Error(f(327));var l=!a&&(t&124)===0&&(t&e.expiredLanes)===0||Zl(e,t),s=l?vg(e,t):uc(e,t,!0),r=l;do{if(s===0){Ul&&!l&&Na(e,t,0,!1);break}else{if(a=e.current.alternate,r&&!yg(a)){s=uc(e,t,!1),r=!1;continue}if(s===2){if(r=t,e.errorRecoveryDisabledLanes&r)var o=0;else o=e.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){t=o;e:{var d=e;s=Es;var h=d.current.memoizedState.isDehydrated;if(h&&(Ml(d,o).flags|=256),o=uc(d,o,!1),o!==2){if(ec&&!h){d.errorRecoveryDisabledLanes|=r,Pa|=r,s=4;break e}r=rt,rt=s,r!==null&&(rt===null?rt=r:rt.push.apply(rt,r))}s=o}if(r=!1,s!==2)continue}}if(s===1){Ml(e,0),Na(e,t,0,!0);break}e:{switch(l=e,r=s,r){case 0:case 1:throw Error(f(345));case 4:if((t&4194048)!==t)break;case 6:Na(l,t,wt,!ja);break e;case 2:rt=null;break;case 3:case 5:break;default:throw Error(f(329))}if((t&62914560)===t&&(s=lc+300-qt(),10<s)){if(Na(l,t,wt,!ja),tn(l,0,!0)!==0)break e;l.timeoutHandle=Rd(ed.bind(null,l,a,rt,kn,ac,t,wt,Pa,Dl,ja,r,2,-0,0),s);break e}ed(l,a,rt,kn,ac,t,wt,Pa,Dl,ja,r,0,-0,0)}}break}while(!0);Bt(e)}function ed(e,t,a,l,s,r,o,d,h,T,$,z,w,R){if(e.timeoutHandle=-1,z=t.subtreeFlags,(z&8192||(z&16785408)===16785408)&&(Gs={stylesheets:null,count:0,unsuspend:Fg},Zf(t),z=e0(),z!==null)){e.cancelPendingCommit=z(id.bind(null,e,t,r,a,l,s,o,d,h,$,1,w,R)),Na(e,r,o,!T);return}id(e,t,r,a,l,s,o,d,h)}function yg(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var s=a[l],r=s.getSnapshot;s=s.value;try{if(!ot(r(),s))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Na(e,t,a,l){t&=~tc,t&=~Pa,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var s=t;0<s;){var r=31-ut(s),o=1<<r;l[r]=-1,s&=~o}a!==0&&uu(e,a,t)}function Qn(){return(me&6)===0?(Ds(0),!1):!0}function ic(){if(ae!==null){if(he===0)var e=ae.return;else e=ae,Pt=La=null,_i(e),Tl=null,js=0,e=ae;for(;e!==null;)If(e.alternate,e),e=e.return;ae=null}}function Ml(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,qg(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ic(),Ae=e,ae=a=Qt(e.current,null),se=t,he=0,ht=null,ja=!1,Ul=Zl(e,t),ec=!1,Dl=wt=tc=Pa=Aa=Ie=0,rt=Es=null,ac=!1,(t&8)!==0&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var s=31-ut(l),r=1<<s;t|=e[s],l&=~r}return la=t,hn(),a}function td(e,t){ee=null,U.H=In,t===ds||t===Sn?(t=yo(),he=3):t===ho?(t=yo(),he=4):he=t===vf?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ht=t,ae===null&&(Ie=1,zn(e,At(t,e.current)))}function ad(){var e=U.H;return U.H=In,e===null?In:e}function ld(){var e=U.A;return U.A=gg,e}function cc(){Ie=4,ja||(se&4194048)!==se&&Tt.current!==null||(Ul=!0),(Aa&134217727)===0&&(Pa&134217727)===0||Ae===null||Na(Ae,se,wt,!1)}function uc(e,t,a){var l=me;me|=2;var s=ad(),r=ld();(Ae!==e||se!==t)&&(kn=null,Ml(e,t)),t=!1;var o=Ie;e:do try{if(he!==0&&ae!==null){var d=ae,h=ht;switch(he){case 8:ic(),o=6;break e;case 3:case 2:case 9:case 6:Tt.current===null&&(t=!0);var T=he;if(he=0,ht=null,ql(e,d,h,T),a&&Ul){o=0;break e}break;default:T=he,he=0,ht=null,ql(e,d,h,T)}}xg(),o=Ie;break}catch($){td(e,$)}while(!0);return t&&e.shellSuspendCounter++,Pt=La=null,me=l,U.H=s,U.A=r,ae===null&&(Ae=null,se=0,hn()),o}function xg(){for(;ae!==null;)sd(ae)}function vg(e,t){var a=me;me|=2;var l=ad(),s=ld();Ae!==e||se!==t?(kn=null,Yn=qt()+500,Ml(e,t)):Ul=Zl(e,t);e:do try{if(he!==0&&ae!==null){t=ae;var r=ht;t:switch(he){case 1:he=0,ht=null,ql(e,t,r,1);break;case 2:case 9:if(go(r)){he=0,ht=null,nd(t);break}t=function(){he!==2&&he!==9||Ae!==e||(he=7),Bt(e)},r.then(t,t);break e;case 3:he=7;break e;case 4:he=5;break e;case 7:go(r)?(he=0,ht=null,nd(t)):(he=0,ht=null,ql(e,t,r,7));break;case 5:var o=null;switch(ae.tag){case 26:o=ae.memoizedState;case 5:case 27:var d=ae;if(!o||Bd(o)){he=0,ht=null;var h=d.sibling;if(h!==null)ae=h;else{var T=d.return;T!==null?(ae=T,Zn(T)):ae=null}break t}}he=0,ht=null,ql(e,t,r,5);break;case 6:he=0,ht=null,ql(e,t,r,6);break;case 8:ic(),Ie=6;break e;default:throw Error(f(462))}}bg();break}catch($){td(e,$)}while(!0);return Pt=La=null,U.H=l,U.A=s,me=a,ae!==null?0:(Ae=null,se=0,hn(),Ie)}function bg(){for(;ae!==null&&!Hm();)sd(ae)}function sd(e){var t=Df(e.alternate,e,la);e.memoizedProps=e.pendingProps,t===null?Zn(e):ae=t}function nd(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Nf(a,t,t.pendingProps,t.type,void 0,se);break;case 11:t=Nf(a,t,t.pendingProps,t.type.render,t.ref,se);break;case 5:_i(t);default:If(a,t),t=ae=so(t,la),t=Df(a,t,la)}e.memoizedProps=e.pendingProps,t===null?Zn(e):ae=t}function ql(e,t,a,l){Pt=La=null,_i(t),Tl=null,js=0;var s=t.return;try{if(ug(e,s,t,a,se)){Ie=1,zn(e,At(a,e.current)),ae=null;return}}catch(r){if(s!==null)throw ae=s,r;Ie=1,zn(e,At(a,e.current)),ae=null;return}t.flags&32768?(ue||l===1?e=!0:Ul||(se&536870912)!==0?e=!1:(ja=e=!0,(l===2||l===9||l===3||l===6)&&(l=Tt.current,l!==null&&l.tag===13&&(l.flags|=16384))),rd(t,e)):Zn(t)}function Zn(e){var t=e;do{if((t.flags&32768)!==0){rd(t,ja);return}e=t.return;var a=fg(t.alternate,t,la);if(a!==null){ae=a;return}if(t=t.sibling,t!==null){ae=t;return}ae=t=e}while(t!==null);Ie===0&&(Ie=5)}function rd(e,t){do{var a=dg(e.alternate,e);if(a!==null){a.flags&=32767,ae=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){ae=e;return}ae=e=a}while(e!==null);Ie=6,ae=null}function id(e,t,a,l,s,r,o,d,h){e.cancelPendingCommit=null;do Vn();while(Ve!==0);if((me&6)!==0)throw Error(f(327));if(t!==null){if(t===e.current)throw Error(f(177));if(r=t.lanes|t.childLanes,r|=Wr,Fm(e,a,r,o,d,h),e===Ae&&(ae=Ae=null,se=0),Ol=t,_a=e,Il=a,sc=r,nc=s,Jf=l,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,_g(Fs,function(){return dd(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||l){l=U.T,U.T=null,s=H.p,H.p=2,o=me,me|=4;try{mg(e,t,a)}finally{me=o,H.p=s,U.T=l}}Ve=1,cd(),ud(),od()}}function cd(){if(Ve===1){Ve=0;var e=_a,t=Ol,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=U.T,U.T=null;var l=H.p;H.p=2;var s=me;me|=4;try{Yf(t,e);var r=jc,o=Vu(e.containerInfo),d=r.focusedElem,h=r.selectionRange;if(o!==d&&d&&d.ownerDocument&&Zu(d.ownerDocument.documentElement,d)){if(h!==null&&Vr(d)){var T=h.start,$=h.end;if($===void 0&&($=T),"selectionStart"in d)d.selectionStart=T,d.selectionEnd=Math.min($,d.value.length);else{var z=d.ownerDocument||document,w=z&&z.defaultView||window;if(w.getSelection){var R=w.getSelection(),F=d.textContent.length,Z=Math.min(h.start,F),ye=h.end===void 0?Z:Math.min(h.end,F);!R.extend&&Z>ye&&(o=ye,ye=Z,Z=o);var S=Qu(d,Z),j=Qu(d,ye);if(S&&j&&(R.rangeCount!==1||R.anchorNode!==S.node||R.anchorOffset!==S.offset||R.focusNode!==j.node||R.focusOffset!==j.offset)){var N=z.createRange();N.setStart(S.node,S.offset),R.removeAllRanges(),Z>ye?(R.addRange(N),R.extend(j.node,j.offset)):(N.setEnd(j.node,j.offset),R.addRange(N))}}}}for(z=[],R=d;R=R.parentNode;)R.nodeType===1&&z.push({element:R,left:R.scrollLeft,top:R.scrollTop});for(typeof d.focus=="function"&&d.focus(),d=0;d<z.length;d++){var G=z[d];G.element.scrollLeft=G.left,G.element.scrollTop=G.top}}rr=!!bc,jc=bc=null}finally{me=s,H.p=l,U.T=a}}e.current=t,Ve=2}}function ud(){if(Ve===2){Ve=0;var e=_a,t=Ol,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=U.T,U.T=null;var l=H.p;H.p=2;var s=me;me|=4;try{Bf(e,t.alternate,t)}finally{me=s,H.p=l,U.T=a}}Ve=3}}function od(){if(Ve===4||Ve===3){Ve=0,Lm();var e=_a,t=Ol,a=Il,l=Jf;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ve=5:(Ve=0,Ol=_a=null,fd(e,e.pendingLanes));var s=e.pendingLanes;if(s===0&&(Sa=null),wr(a),t=t.stateNode,ct&&typeof ct.onCommitFiberRoot=="function")try{ct.onCommitFiberRoot(Ql,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=U.T,s=H.p,H.p=2,U.T=null;try{for(var r=e.onRecoverableError,o=0;o<l.length;o++){var d=l[o];r(d.value,{componentStack:d.stack})}}finally{U.T=t,H.p=s}}(Il&3)!==0&&Vn(),Bt(e),s=e.pendingLanes,(a&4194090)!==0&&(s&42)!==0?e===rc?Us++:(Us=0,rc=e):Us=0,Ds(0)}}function fd(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,os(t)))}function Vn(e){return cd(),ud(),od(),dd()}function dd(){if(Ve!==5)return!1;var e=_a,t=sc;sc=0;var a=wr(Il),l=U.T,s=H.p;try{H.p=32>a?32:a,U.T=null,a=nc,nc=null;var r=_a,o=Il;if(Ve=0,Ol=_a=null,Il=0,(me&6)!==0)throw Error(f(331));var d=me;if(me|=4,Pf(r.current),Qf(r,r.current,o,a),me=d,Ds(0,!1),ct&&typeof ct.onPostCommitFiberRoot=="function")try{ct.onPostCommitFiberRoot(Ql,r)}catch{}return!0}finally{H.p=s,U.T=l,fd(e,t)}}function md(e,t,a){t=At(a,t),t=zi(e.stateNode,t,2),e=ha(e,t,2),e!==null&&(Vl(e,2),Bt(e))}function ve(e,t,a){if(e.tag===3)md(e,e,a);else for(;t!==null;){if(t.tag===3){md(t,e,a);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Sa===null||!Sa.has(l))){e=At(a,e),a=yf(2),l=ha(t,a,2),l!==null&&(xf(a,l,t,e),Vl(l,2),Bt(l));break}}t=t.return}}function oc(e,t,a){var l=e.pingCache;if(l===null){l=e.pingCache=new pg;var s=new Set;l.set(t,s)}else s=l.get(t),s===void 0&&(s=new Set,l.set(t,s));s.has(a)||(ec=!0,s.add(a),e=jg.bind(null,e,t,a),t.then(e,e))}function jg(e,t,a){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ae===e&&(se&a)===a&&(Ie===4||Ie===3&&(se&62914560)===se&&300>qt()-lc?(me&2)===0&&Ml(e,0):tc|=a,Dl===se&&(Dl=0)),Bt(e)}function hd(e,t){t===0&&(t=cu()),e=pl(e,t),e!==null&&(Vl(e,t),Bt(e))}function Ag(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),hd(e,a)}function Sg(e,t){var a=0;switch(e.tag){case 13:var l=e.stateNode,s=e.memoizedState;s!==null&&(a=s.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(f(314))}l!==null&&l.delete(t),hd(e,a)}function _g(e,t){return Sr(e,t)}var Pn=null,$l=null,fc=!1,Kn=!1,dc=!1,Ka=0;function Bt(e){e!==$l&&e.next===null&&($l===null?Pn=$l=e:$l=$l.next=e),Kn=!0,fc||(fc=!0,Tg())}function Ds(e,t){if(!dc&&Kn){dc=!0;do for(var a=!1,l=Pn;l!==null;){if(e!==0){var s=l.pendingLanes;if(s===0)var r=0;else{var o=l.suspendedLanes,d=l.pingedLanes;r=(1<<31-ut(42|e)+1)-1,r&=s&~(o&~d),r=r&201326741?r&201326741|1:r?r|2:0}r!==0&&(a=!0,xd(l,r))}else r=se,r=tn(l,l===Ae?r:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(r&3)===0||Zl(l,r)||(a=!0,xd(l,r));l=l.next}while(a);dc=!1}}function Ng(){gd()}function gd(){Kn=fc=!1;var e=0;Ka!==0&&(Mg()&&(e=Ka),Ka=0);for(var t=qt(),a=null,l=Pn;l!==null;){var s=l.next,r=pd(l,t);r===0?(l.next=null,a===null?Pn=s:a.next=s,s===null&&($l=a)):(a=l,(e!==0||(r&3)!==0)&&(Kn=!0)),l=s}Ds(e)}function pd(e,t){for(var a=e.suspendedLanes,l=e.pingedLanes,s=e.expirationTimes,r=e.pendingLanes&-62914561;0<r;){var o=31-ut(r),d=1<<o,h=s[o];h===-1?((d&a)===0||(d&l)!==0)&&(s[o]=Jm(d,t)):h<=t&&(e.expiredLanes|=d),r&=~d}if(t=Ae,a=se,a=tn(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,a===0||e===t&&(he===2||he===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&_r(l),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Zl(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(l!==null&&_r(l),wr(a)){case 2:case 8:a=nu;break;case 32:a=Fs;break;case 268435456:a=ru;break;default:a=Fs}return l=yd.bind(null,e),a=Sr(a,l),e.callbackPriority=t,e.callbackNode=a,t}return l!==null&&l!==null&&_r(l),e.callbackPriority=2,e.callbackNode=null,2}function yd(e,t){if(Ve!==0&&Ve!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Vn()&&e.callbackNode!==a)return null;var l=se;return l=tn(e,e===Ae?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(Wf(e,l,t),pd(e,qt()),e.callbackNode!=null&&e.callbackNode===a?yd.bind(null,e):null)}function xd(e,t){if(Vn())return null;Wf(e,t,!0)}function Tg(){$g(function(){(me&6)!==0?Sr(su,Ng):gd()})}function mc(){return Ka===0&&(Ka=iu()),Ka}function vd(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:rn(""+e)}function bd(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function wg(e,t,a,l,s){if(t==="submit"&&a&&a.stateNode===s){var r=vd((s[at]||null).action),o=l.submitter;o&&(t=(t=o[at]||null)?vd(t.formAction):o.getAttribute("formAction"),t!==null&&(r=t,o=null));var d=new fn("action","action",null,l,s);e.push({event:d,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Ka!==0){var h=o?bd(s,o):new FormData(s);Ii(a,{pending:!0,data:h,method:s.method,action:r},null,h)}}else typeof r=="function"&&(d.preventDefault(),h=o?bd(s,o):new FormData(s),Ii(a,{pending:!0,data:h,method:s.method,action:r},r,h))},currentTarget:s}]})}}for(var hc=0;hc<Fr.length;hc++){var gc=Fr[hc],Rg=gc.toLowerCase(),Eg=gc[0].toUpperCase()+gc.slice(1);Ut(Rg,"on"+Eg)}Ut(Ju,"onAnimationEnd"),Ut(Fu,"onAnimationIteration"),Ut(Wu,"onAnimationStart"),Ut("dblclick","onDoubleClick"),Ut("focusin","onFocus"),Ut("focusout","onBlur"),Ut(Qh,"onTransitionRun"),Ut(Zh,"onTransitionStart"),Ut(Vh,"onTransitionCancel"),Ut(eo,"onTransitionEnd"),rl("onMouseEnter",["mouseout","mouseover"]),rl("onMouseLeave",["mouseout","mouseover"]),rl("onPointerEnter",["pointerout","pointerover"]),rl("onPointerLeave",["pointerout","pointerover"]),Ma("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ma("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ma("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ma("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ma("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ma("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Os="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ug=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Os));function jd(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var l=e[a],s=l.event;l=l.listeners;e:{var r=void 0;if(t)for(var o=l.length-1;0<=o;o--){var d=l[o],h=d.instance,T=d.currentTarget;if(d=d.listener,h!==r&&s.isPropagationStopped())break e;r=d,s.currentTarget=T;try{r(s)}catch($){Gn($)}s.currentTarget=null,r=h}else for(o=0;o<l.length;o++){if(d=l[o],h=d.instance,T=d.currentTarget,d=d.listener,h!==r&&s.isPropagationStopped())break e;r=d,s.currentTarget=T;try{r(s)}catch($){Gn($)}s.currentTarget=null,r=h}}}}function le(e,t){var a=t[Rr];a===void 0&&(a=t[Rr]=new Set);var l=e+"__bubble";a.has(l)||(Ad(t,e,2,!1),a.add(l))}function pc(e,t,a){var l=0;t&&(l|=4),Ad(a,e,l,t)}var Jn="_reactListening"+Math.random().toString(36).slice(2);function yc(e){if(!e[Jn]){e[Jn]=!0,mu.forEach(function(a){a!=="selectionchange"&&(Ug.has(a)||pc(a,!1,e),pc(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Jn]||(t[Jn]=!0,pc("selectionchange",!1,t))}}function Ad(e,t,a,l){switch(Qd(t)){case 2:var s=l0;break;case 8:s=s0;break;default:s=Dc}a=s.bind(null,t,a,e),s=void 0,!Cr||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),l?s!==void 0?e.addEventListener(t,a,{capture:!0,passive:s}):e.addEventListener(t,a,!0):s!==void 0?e.addEventListener(t,a,{passive:s}):e.addEventListener(t,a,!1)}function xc(e,t,a,l,s){var r=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var o=l.tag;if(o===3||o===4){var d=l.stateNode.containerInfo;if(d===s)break;if(o===4)for(o=l.return;o!==null;){var h=o.tag;if((h===3||h===4)&&o.stateNode.containerInfo===s)return;o=o.return}for(;d!==null;){if(o=ll(d),o===null)return;if(h=o.tag,h===5||h===6||h===26||h===27){l=r=o;continue e}d=d.parentNode}}l=l.return}wu(function(){var T=r,$=Gr(a),z=[];e:{var w=to.get(e);if(w!==void 0){var R=fn,F=e;switch(e){case"keypress":if(un(a)===0)break e;case"keydown":case"keyup":R=_h;break;case"focusin":F="focus",R=Lr;break;case"focusout":F="blur",R=Lr;break;case"beforeblur":case"afterblur":R=Lr;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":R=Uu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":R=dh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":R=wh;break;case Ju:case Fu:case Wu:R=gh;break;case eo:R=Eh;break;case"scroll":case"scrollend":R=oh;break;case"wheel":R=Dh;break;case"copy":case"cut":case"paste":R=yh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":R=Ou;break;case"toggle":case"beforetoggle":R=Ih}var Z=(t&4)!==0,ye=!Z&&(e==="scroll"||e==="scrollend"),S=Z?w!==null?w+"Capture":null:w;Z=[];for(var j=T,N;j!==null;){var G=j;if(N=G.stateNode,G=G.tag,G!==5&&G!==26&&G!==27||N===null||S===null||(G=Jl(j,S),G!=null&&Z.push(Is(j,G,N))),ye)break;j=j.return}0<Z.length&&(w=new R(w,F,null,a,$),z.push({event:w,listeners:Z}))}}if((t&7)===0){e:{if(w=e==="mouseover"||e==="pointerover",R=e==="mouseout"||e==="pointerout",w&&a!==$r&&(F=a.relatedTarget||a.fromElement)&&(ll(F)||F[al]))break e;if((R||w)&&(w=$.window===$?$:(w=$.ownerDocument)?w.defaultView||w.parentWindow:window,R?(F=a.relatedTarget||a.toElement,R=T,F=F?ll(F):null,F!==null&&(ye=p(F),Z=F.tag,F!==ye||Z!==5&&Z!==27&&Z!==6)&&(F=null)):(R=null,F=T),R!==F)){if(Z=Uu,G="onMouseLeave",S="onMouseEnter",j="mouse",(e==="pointerout"||e==="pointerover")&&(Z=Ou,G="onPointerLeave",S="onPointerEnter",j="pointer"),ye=R==null?w:Kl(R),N=F==null?w:Kl(F),w=new Z(G,j+"leave",R,a,$),w.target=ye,w.relatedTarget=N,G=null,ll($)===T&&(Z=new Z(S,j+"enter",F,a,$),Z.target=N,Z.relatedTarget=ye,G=Z),ye=G,R&&F)t:{for(Z=R,S=F,j=0,N=Z;N;N=Gl(N))j++;for(N=0,G=S;G;G=Gl(G))N++;for(;0<j-N;)Z=Gl(Z),j--;for(;0<N-j;)S=Gl(S),N--;for(;j--;){if(Z===S||S!==null&&Z===S.alternate)break t;Z=Gl(Z),S=Gl(S)}Z=null}else Z=null;R!==null&&Sd(z,w,R,Z,!1),F!==null&&ye!==null&&Sd(z,ye,F,Z,!0)}}e:{if(w=T?Kl(T):window,R=w.nodeName&&w.nodeName.toLowerCase(),R==="select"||R==="input"&&w.type==="file")var L=Bu;else if(zu(w))if(Xu)L=Lh;else{L=Xh;var te=Bh}else R=w.nodeName,!R||R.toLowerCase()!=="input"||w.type!=="checkbox"&&w.type!=="radio"?T&&qr(T.elementType)&&(L=Bu):L=Hh;if(L&&(L=L(e,T))){Cu(z,L,a,$);break e}te&&te(e,w,T),e==="focusout"&&T&&w.type==="number"&&T.memoizedProps.value!=null&&Mr(w,"number",w.value)}switch(te=T?Kl(T):window,e){case"focusin":(zu(te)||te.contentEditable==="true")&&(ml=te,Pr=T,ns=null);break;case"focusout":ns=Pr=ml=null;break;case"mousedown":Kr=!0;break;case"contextmenu":case"mouseup":case"dragend":Kr=!1,Pu(z,a,$);break;case"selectionchange":if(kh)break;case"keydown":case"keyup":Pu(z,a,$)}var Y;if(kr)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else dl?$u(e,a)&&(P="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(P="onCompositionStart");P&&(Iu&&a.locale!=="ko"&&(dl||P!=="onCompositionStart"?P==="onCompositionEnd"&&dl&&(Y=Ru()):(oa=$,Br="value"in oa?oa.value:oa.textContent,dl=!0)),te=Fn(T,P),0<te.length&&(P=new Du(P,e,null,a,$),z.push({event:P,listeners:te}),Y?P.data=Y:(Y=Gu(a),Y!==null&&(P.data=Y)))),(Y=qh?$h(e,a):Gh(e,a))&&(P=Fn(T,"onBeforeInput"),0<P.length&&(te=new Du("onBeforeInput","beforeinput",null,a,$),z.push({event:te,listeners:P}),te.data=Y)),wg(z,e,T,a,$)}jd(z,t)})}function Is(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Fn(e,t){for(var a=t+"Capture",l=[];e!==null;){var s=e,r=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||r===null||(s=Jl(e,a),s!=null&&l.unshift(Is(e,s,r)),s=Jl(e,t),s!=null&&l.push(Is(e,s,r))),e.tag===3)return l;e=e.return}return[]}function Gl(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Sd(e,t,a,l,s){for(var r=t._reactName,o=[];a!==null&&a!==l;){var d=a,h=d.alternate,T=d.stateNode;if(d=d.tag,h!==null&&h===l)break;d!==5&&d!==26&&d!==27||T===null||(h=T,s?(T=Jl(a,r),T!=null&&o.unshift(Is(a,T,h))):s||(T=Jl(a,r),T!=null&&o.push(Is(a,T,h)))),a=a.return}o.length!==0&&e.push({event:t,listeners:o})}var Dg=/\r\n?/g,Og=/\u0000|\uFFFD/g;function _d(e){return(typeof e=="string"?e:""+e).replace(Dg,`
`).replace(Og,"")}function Nd(e,t){return t=_d(t),_d(e)===t}function Wn(){}function pe(e,t,a,l,s,r){switch(a){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||ul(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&ul(e,""+l);break;case"className":ln(e,"class",l);break;case"tabIndex":ln(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":ln(e,a,l);break;case"style":Nu(e,l,r);break;case"data":if(t!=="object"){ln(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=rn(""+l),e.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(a==="formAction"?(t!=="input"&&pe(e,t,"name",s.name,s,null),pe(e,t,"formEncType",s.formEncType,s,null),pe(e,t,"formMethod",s.formMethod,s,null),pe(e,t,"formTarget",s.formTarget,s,null)):(pe(e,t,"encType",s.encType,s,null),pe(e,t,"method",s.method,s,null),pe(e,t,"target",s.target,s,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=rn(""+l),e.setAttribute(a,l);break;case"onClick":l!=null&&(e.onclick=Wn);break;case"onScroll":l!=null&&le("scroll",e);break;case"onScrollEnd":l!=null&&le("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(f(61));if(a=l.__html,a!=null){if(s.children!=null)throw Error(f(60));e.innerHTML=a}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}a=rn(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""+l):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":l===!0?e.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,l):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(a,l):e.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(a):e.setAttribute(a,l);break;case"popover":le("beforetoggle",e),le("toggle",e),an(e,"popover",l);break;case"xlinkActuate":Yt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Yt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Yt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Yt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Yt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Yt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Yt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Yt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Yt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":an(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=ch.get(a)||a,an(e,a,l))}}function vc(e,t,a,l,s,r){switch(a){case"style":Nu(e,l,r);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(f(61));if(a=l.__html,a!=null){if(s.children!=null)throw Error(f(60));e.innerHTML=a}}break;case"children":typeof l=="string"?ul(e,l):(typeof l=="number"||typeof l=="bigint")&&ul(e,""+l);break;case"onScroll":l!=null&&le("scroll",e);break;case"onScrollEnd":l!=null&&le("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Wn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!hu.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(s=a.endsWith("Capture"),t=a.slice(2,s?a.length-7:void 0),r=e[at]||null,r=r!=null?r[a]:null,typeof r=="function"&&e.removeEventListener(t,r,s),typeof l=="function")){typeof r!="function"&&r!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,l,s);break e}a in e?e[a]=l:l===!0?e.setAttribute(a,""):an(e,a,l)}}}function Pe(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":le("error",e),le("load",e);var l=!1,s=!1,r;for(r in a)if(a.hasOwnProperty(r)){var o=a[r];if(o!=null)switch(r){case"src":l=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(f(137,t));default:pe(e,t,r,o,a,null)}}s&&pe(e,t,"srcSet",a.srcSet,a,null),l&&pe(e,t,"src",a.src,a,null);return;case"input":le("invalid",e);var d=r=o=s=null,h=null,T=null;for(l in a)if(a.hasOwnProperty(l)){var $=a[l];if($!=null)switch(l){case"name":s=$;break;case"type":o=$;break;case"checked":h=$;break;case"defaultChecked":T=$;break;case"value":r=$;break;case"defaultValue":d=$;break;case"children":case"dangerouslySetInnerHTML":if($!=null)throw Error(f(137,t));break;default:pe(e,t,l,$,a,null)}}ju(e,r,d,h,T,o,s,!1),sn(e);return;case"select":le("invalid",e),l=o=r=null;for(s in a)if(a.hasOwnProperty(s)&&(d=a[s],d!=null))switch(s){case"value":r=d;break;case"defaultValue":o=d;break;case"multiple":l=d;default:pe(e,t,s,d,a,null)}t=r,a=o,e.multiple=!!l,t!=null?cl(e,!!l,t,!1):a!=null&&cl(e,!!l,a,!0);return;case"textarea":le("invalid",e),r=s=l=null;for(o in a)if(a.hasOwnProperty(o)&&(d=a[o],d!=null))switch(o){case"value":l=d;break;case"defaultValue":s=d;break;case"children":r=d;break;case"dangerouslySetInnerHTML":if(d!=null)throw Error(f(91));break;default:pe(e,t,o,d,a,null)}Su(e,l,s,r),sn(e);return;case"option":for(h in a)if(a.hasOwnProperty(h)&&(l=a[h],l!=null))switch(h){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:pe(e,t,h,l,a,null)}return;case"dialog":le("beforetoggle",e),le("toggle",e),le("cancel",e),le("close",e);break;case"iframe":case"object":le("load",e);break;case"video":case"audio":for(l=0;l<Os.length;l++)le(Os[l],e);break;case"image":le("error",e),le("load",e);break;case"details":le("toggle",e);break;case"embed":case"source":case"link":le("error",e),le("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(T in a)if(a.hasOwnProperty(T)&&(l=a[T],l!=null))switch(T){case"children":case"dangerouslySetInnerHTML":throw Error(f(137,t));default:pe(e,t,T,l,a,null)}return;default:if(qr(t)){for($ in a)a.hasOwnProperty($)&&(l=a[$],l!==void 0&&vc(e,t,$,l,a,void 0));return}}for(d in a)a.hasOwnProperty(d)&&(l=a[d],l!=null&&pe(e,t,d,l,a,null))}function Ig(e,t,a,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,r=null,o=null,d=null,h=null,T=null,$=null;for(R in a){var z=a[R];if(a.hasOwnProperty(R)&&z!=null)switch(R){case"checked":break;case"value":break;case"defaultValue":h=z;default:l.hasOwnProperty(R)||pe(e,t,R,null,l,z)}}for(var w in l){var R=l[w];if(z=a[w],l.hasOwnProperty(w)&&(R!=null||z!=null))switch(w){case"type":r=R;break;case"name":s=R;break;case"checked":T=R;break;case"defaultChecked":$=R;break;case"value":o=R;break;case"defaultValue":d=R;break;case"children":case"dangerouslySetInnerHTML":if(R!=null)throw Error(f(137,t));break;default:R!==z&&pe(e,t,w,R,l,z)}}Ir(e,o,d,h,T,$,r,s);return;case"select":R=o=d=w=null;for(r in a)if(h=a[r],a.hasOwnProperty(r)&&h!=null)switch(r){case"value":break;case"multiple":R=h;default:l.hasOwnProperty(r)||pe(e,t,r,null,l,h)}for(s in l)if(r=l[s],h=a[s],l.hasOwnProperty(s)&&(r!=null||h!=null))switch(s){case"value":w=r;break;case"defaultValue":d=r;break;case"multiple":o=r;default:r!==h&&pe(e,t,s,r,l,h)}t=d,a=o,l=R,w!=null?cl(e,!!a,w,!1):!!l!=!!a&&(t!=null?cl(e,!!a,t,!0):cl(e,!!a,a?[]:"",!1));return;case"textarea":R=w=null;for(d in a)if(s=a[d],a.hasOwnProperty(d)&&s!=null&&!l.hasOwnProperty(d))switch(d){case"value":break;case"children":break;default:pe(e,t,d,null,l,s)}for(o in l)if(s=l[o],r=a[o],l.hasOwnProperty(o)&&(s!=null||r!=null))switch(o){case"value":w=s;break;case"defaultValue":R=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(f(91));break;default:s!==r&&pe(e,t,o,s,l,r)}Au(e,w,R);return;case"option":for(var F in a)if(w=a[F],a.hasOwnProperty(F)&&w!=null&&!l.hasOwnProperty(F))switch(F){case"selected":e.selected=!1;break;default:pe(e,t,F,null,l,w)}for(h in l)if(w=l[h],R=a[h],l.hasOwnProperty(h)&&w!==R&&(w!=null||R!=null))switch(h){case"selected":e.selected=w&&typeof w!="function"&&typeof w!="symbol";break;default:pe(e,t,h,w,l,R)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Z in a)w=a[Z],a.hasOwnProperty(Z)&&w!=null&&!l.hasOwnProperty(Z)&&pe(e,t,Z,null,l,w);for(T in l)if(w=l[T],R=a[T],l.hasOwnProperty(T)&&w!==R&&(w!=null||R!=null))switch(T){case"children":case"dangerouslySetInnerHTML":if(w!=null)throw Error(f(137,t));break;default:pe(e,t,T,w,l,R)}return;default:if(qr(t)){for(var ye in a)w=a[ye],a.hasOwnProperty(ye)&&w!==void 0&&!l.hasOwnProperty(ye)&&vc(e,t,ye,void 0,l,w);for($ in l)w=l[$],R=a[$],!l.hasOwnProperty($)||w===R||w===void 0&&R===void 0||vc(e,t,$,w,l,R);return}}for(var S in a)w=a[S],a.hasOwnProperty(S)&&w!=null&&!l.hasOwnProperty(S)&&pe(e,t,S,null,l,w);for(z in l)w=l[z],R=a[z],!l.hasOwnProperty(z)||w===R||w==null&&R==null||pe(e,t,z,w,l,R)}var bc=null,jc=null;function er(e){return e.nodeType===9?e:e.ownerDocument}function Td(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function wd(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Ac(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Sc=null;function Mg(){var e=window.event;return e&&e.type==="popstate"?e===Sc?!1:(Sc=e,!0):(Sc=null,!1)}var Rd=typeof setTimeout=="function"?setTimeout:void 0,qg=typeof clearTimeout=="function"?clearTimeout:void 0,Ed=typeof Promise=="function"?Promise:void 0,$g=typeof queueMicrotask=="function"?queueMicrotask:typeof Ed<"u"?function(e){return Ed.resolve(null).then(e).catch(Gg)}:Rd;function Gg(e){setTimeout(function(){throw e})}function Ta(e){return e==="head"}function Ud(e,t){var a=t,l=0,s=0;do{var r=a.nextSibling;if(e.removeChild(a),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(0<l&&8>l){a=l;var o=e.ownerDocument;if(a&1&&Ms(o.documentElement),a&2&&Ms(o.body),a&4)for(a=o.head,Ms(a),o=a.firstChild;o;){var d=o.nextSibling,h=o.nodeName;o[Pl]||h==="SCRIPT"||h==="STYLE"||h==="LINK"&&o.rel.toLowerCase()==="stylesheet"||a.removeChild(o),o=d}}if(s===0){e.removeChild(r),Hs(t);return}s--}else a==="$"||a==="$?"||a==="$!"?s++:l=a.charCodeAt(0)-48;else l=0;a=r}while(a);Hs(t)}function _c(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":_c(a),Er(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function zg(e,t,a,l){for(;e.nodeType===1;){var s=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Pl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(r=e.getAttribute("rel"),r==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(r!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(r=e.getAttribute("src"),(r!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&r&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var r=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===r)return e}else return e;if(e=Ot(e.nextSibling),e===null)break}return null}function Cg(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Ot(e.nextSibling),e===null))return null;return e}function Nc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function Bg(e,t){var a=e.ownerDocument;if(e.data!=="$?"||a.readyState==="complete")t();else{var l=function(){t(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Ot(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var Tc=null;function Dd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}function Od(e,t,a){switch(t=er(a),e){case"html":if(e=t.documentElement,!e)throw Error(f(452));return e;case"head":if(e=t.head,!e)throw Error(f(453));return e;case"body":if(e=t.body,!e)throw Error(f(454));return e;default:throw Error(f(451))}}function Ms(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Er(e)}var Rt=new Map,Id=new Set;function tr(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var sa=H.d;H.d={f:Xg,r:Hg,D:Lg,C:Yg,L:kg,m:Qg,X:Vg,S:Zg,M:Pg};function Xg(){var e=sa.f(),t=Qn();return e||t}function Hg(e){var t=sl(e);t!==null&&t.tag===5&&t.type==="form"?Fo(t):sa.r(e)}var zl=typeof document>"u"?null:document;function Md(e,t,a){var l=zl;if(l&&typeof t=="string"&&t){var s=jt(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof a=="string"&&(s+='[crossorigin="'+a+'"]'),Id.has(s)||(Id.add(s),e={rel:e,crossOrigin:a,href:t},l.querySelector(s)===null&&(t=l.createElement("link"),Pe(t,"link",e),He(t),l.head.appendChild(t)))}}function Lg(e){sa.D(e),Md("dns-prefetch",e,null)}function Yg(e,t){sa.C(e,t),Md("preconnect",e,t)}function kg(e,t,a){sa.L(e,t,a);var l=zl;if(l&&e&&t){var s='link[rel="preload"][as="'+jt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(s+='[imagesrcset="'+jt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(s+='[imagesizes="'+jt(a.imageSizes)+'"]')):s+='[href="'+jt(e)+'"]';var r=s;switch(t){case"style":r=Cl(e);break;case"script":r=Bl(e)}Rt.has(r)||(e=I({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Rt.set(r,e),l.querySelector(s)!==null||t==="style"&&l.querySelector(qs(r))||t==="script"&&l.querySelector($s(r))||(t=l.createElement("link"),Pe(t,"link",e),He(t),l.head.appendChild(t)))}}function Qg(e,t){sa.m(e,t);var a=zl;if(a&&e){var l=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+jt(l)+'"][href="'+jt(e)+'"]',r=s;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=Bl(e)}if(!Rt.has(r)&&(e=I({rel:"modulepreload",href:e},t),Rt.set(r,e),a.querySelector(s)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector($s(r)))return}l=a.createElement("link"),Pe(l,"link",e),He(l),a.head.appendChild(l)}}}function Zg(e,t,a){sa.S(e,t,a);var l=zl;if(l&&e){var s=nl(l).hoistableStyles,r=Cl(e);t=t||"default";var o=s.get(r);if(!o){var d={loading:0,preload:null};if(o=l.querySelector(qs(r)))d.loading=5;else{e=I({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Rt.get(r))&&wc(e,a);var h=o=l.createElement("link");He(h),Pe(h,"link",e),h._p=new Promise(function(T,$){h.onload=T,h.onerror=$}),h.addEventListener("load",function(){d.loading|=1}),h.addEventListener("error",function(){d.loading|=2}),d.loading|=4,ar(o,t,l)}o={type:"stylesheet",instance:o,count:1,state:d},s.set(r,o)}}}function Vg(e,t){sa.X(e,t);var a=zl;if(a&&e){var l=nl(a).hoistableScripts,s=Bl(e),r=l.get(s);r||(r=a.querySelector($s(s)),r||(e=I({src:e,async:!0},t),(t=Rt.get(s))&&Rc(e,t),r=a.createElement("script"),He(r),Pe(r,"link",e),a.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},l.set(s,r))}}function Pg(e,t){sa.M(e,t);var a=zl;if(a&&e){var l=nl(a).hoistableScripts,s=Bl(e),r=l.get(s);r||(r=a.querySelector($s(s)),r||(e=I({src:e,async:!0,type:"module"},t),(t=Rt.get(s))&&Rc(e,t),r=a.createElement("script"),He(r),Pe(r,"link",e),a.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},l.set(s,r))}}function qd(e,t,a,l){var s=(s=k.current)?tr(s):null;if(!s)throw Error(f(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Cl(a.href),a=nl(s).hoistableStyles,l=a.get(t),l||(l={type:"style",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Cl(a.href);var r=nl(s).hoistableStyles,o=r.get(e);if(o||(s=s.ownerDocument||s,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(e,o),(r=s.querySelector(qs(e)))&&!r._p&&(o.instance=r,o.state.loading=5),Rt.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Rt.set(e,a),r||Kg(s,e,a,o.state))),t&&l===null)throw Error(f(528,""));return o}if(t&&l!==null)throw Error(f(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Bl(a),a=nl(s).hoistableScripts,l=a.get(t),l||(l={type:"script",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(f(444,e))}}function Cl(e){return'href="'+jt(e)+'"'}function qs(e){return'link[rel="stylesheet"]['+e+"]"}function $d(e){return I({},e,{"data-precedence":e.precedence,precedence:null})}function Kg(e,t,a,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),Pe(t,"link",a),He(t),e.head.appendChild(t))}function Bl(e){return'[src="'+jt(e)+'"]'}function $s(e){return"script[async]"+e}function Gd(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+jt(a.href)+'"]');if(l)return t.instance=l,He(l),l;var s=I({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),He(l),Pe(l,"style",s),ar(l,a.precedence,e),t.instance=l;case"stylesheet":s=Cl(a.href);var r=e.querySelector(qs(s));if(r)return t.state.loading|=4,t.instance=r,He(r),r;l=$d(a),(s=Rt.get(s))&&wc(l,s),r=(e.ownerDocument||e).createElement("link"),He(r);var o=r;return o._p=new Promise(function(d,h){o.onload=d,o.onerror=h}),Pe(r,"link",l),t.state.loading|=4,ar(r,a.precedence,e),t.instance=r;case"script":return r=Bl(a.src),(s=e.querySelector($s(r)))?(t.instance=s,He(s),s):(l=a,(s=Rt.get(r))&&(l=I({},a),Rc(l,s)),e=e.ownerDocument||e,s=e.createElement("script"),He(s),Pe(s,"link",l),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(f(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(l=t.instance,t.state.loading|=4,ar(l,a.precedence,e));return t.instance}function ar(e,t,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=l.length?l[l.length-1]:null,r=s,o=0;o<l.length;o++){var d=l[o];if(d.dataset.precedence===t)r=d;else if(r!==s)break}r?r.parentNode.insertBefore(e,r.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function wc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Rc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var lr=null;function zd(e,t,a){if(lr===null){var l=new Map,s=lr=new Map;s.set(a,l)}else s=lr,l=s.get(a),l||(l=new Map,s.set(a,l));if(l.has(e))return l;for(l.set(e,null),a=a.getElementsByTagName(e),s=0;s<a.length;s++){var r=a[s];if(!(r[Pl]||r[Fe]||e==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var o=r.getAttribute(t)||"";o=e+o;var d=l.get(o);d?d.push(r):l.set(o,[r])}}return l}function Cd(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function Jg(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Bd(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var Gs=null;function Fg(){}function Wg(e,t,a){if(Gs===null)throw Error(f(475));var l=Gs;if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var s=Cl(a.href),r=e.querySelector(qs(s));if(r){e=r._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(l.count++,l=sr.bind(l),e.then(l,l)),t.state.loading|=4,t.instance=r,He(r);return}r=e.ownerDocument||e,a=$d(a),(s=Rt.get(s))&&wc(a,s),r=r.createElement("link"),He(r);var o=r;o._p=new Promise(function(d,h){o.onload=d,o.onerror=h}),Pe(r,"link",a),t.instance=r}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(l.count++,t=sr.bind(l),e.addEventListener("load",t),e.addEventListener("error",t))}}function e0(){if(Gs===null)throw Error(f(475));var e=Gs;return e.stylesheets&&e.count===0&&Ec(e,e.stylesheets),0<e.count?function(t){var a=setTimeout(function(){if(e.stylesheets&&Ec(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a)}}:null}function sr(){if(this.count--,this.count===0){if(this.stylesheets)Ec(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var nr=null;function Ec(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,nr=new Map,t.forEach(t0,e),nr=null,sr.call(e))}function t0(e,t){if(!(t.state.loading&4)){var a=nr.get(e);if(a)var l=a.get(null);else{a=new Map,nr.set(e,a);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<s.length;r++){var o=s[r];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(a.set(o.dataset.precedence,o),l=o)}l&&a.set(null,l)}s=t.instance,o=s.getAttribute("data-precedence"),r=a.get(o)||l,r===l&&a.set(null,s),a.set(o,s),this.count++,l=sr.bind(this),s.addEventListener("load",l),s.addEventListener("error",l),r?r.parentNode.insertBefore(s,r.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var zs={$$typeof:X,Provider:null,Consumer:null,_currentValue:J,_currentValue2:J,_threadCount:0};function a0(e,t,a,l,s,r,o,d){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Nr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Nr(0),this.hiddenUpdates=Nr(null),this.identifierPrefix=l,this.onUncaughtError=s,this.onCaughtError=r,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=d,this.incompleteTransitions=new Map}function Xd(e,t,a,l,s,r,o,d,h,T,$,z){return e=new a0(e,t,a,o,d,h,T,z),t=1,r===!0&&(t|=24),r=ft(3,null,null,t),e.current=r,r.stateNode=e,t=oi(),t.refCount++,e.pooledCache=t,t.refCount++,r.memoizedState={element:l,isDehydrated:a,cache:t},hi(r),e}function Hd(e){return e?(e=yl,e):yl}function Ld(e,t,a,l,s,r){s=Hd(s),l.context===null?l.context=s:l.pendingContext=s,l=ma(t),l.payload={element:a},r=r===void 0?null:r,r!==null&&(l.callback=r),a=ha(e,l,t),a!==null&&(pt(a,e,t),hs(a,e,t))}function Yd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Uc(e,t){Yd(e,t),(e=e.alternate)&&Yd(e,t)}function kd(e){if(e.tag===13){var t=pl(e,67108864);t!==null&&pt(t,e,67108864),Uc(e,67108864)}}var rr=!0;function l0(e,t,a,l){var s=U.T;U.T=null;var r=H.p;try{H.p=2,Dc(e,t,a,l)}finally{H.p=r,U.T=s}}function s0(e,t,a,l){var s=U.T;U.T=null;var r=H.p;try{H.p=8,Dc(e,t,a,l)}finally{H.p=r,U.T=s}}function Dc(e,t,a,l){if(rr){var s=Oc(l);if(s===null)xc(e,t,l,ir,a),Zd(e,l);else if(r0(s,e,t,a,l))l.stopPropagation();else if(Zd(e,l),t&4&&-1<n0.indexOf(e)){for(;s!==null;){var r=sl(s);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var o=Ia(r.pendingLanes);if(o!==0){var d=r;for(d.pendingLanes|=2,d.entangledLanes|=2;o;){var h=1<<31-ut(o);d.entanglements[1]|=h,o&=~h}Bt(r),(me&6)===0&&(Yn=qt()+500,Ds(0))}}break;case 13:d=pl(r,2),d!==null&&pt(d,r,2),Qn(),Uc(r,2)}if(r=Oc(l),r===null&&xc(e,t,l,ir,a),r===s)break;s=r}s!==null&&l.stopPropagation()}else xc(e,t,l,null,a)}}function Oc(e){return e=Gr(e),Ic(e)}var ir=null;function Ic(e){if(ir=null,e=ll(e),e!==null){var t=p(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=v(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return ir=e,null}function Qd(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ym()){case su:return 2;case nu:return 8;case Fs:case km:return 32;case ru:return 268435456;default:return 32}default:return 32}}var Mc=!1,wa=null,Ra=null,Ea=null,Cs=new Map,Bs=new Map,Ua=[],n0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Zd(e,t){switch(e){case"focusin":case"focusout":wa=null;break;case"dragenter":case"dragleave":Ra=null;break;case"mouseover":case"mouseout":Ea=null;break;case"pointerover":case"pointerout":Cs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bs.delete(t.pointerId)}}function Xs(e,t,a,l,s,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:a,eventSystemFlags:l,nativeEvent:r,targetContainers:[s]},t!==null&&(t=sl(t),t!==null&&kd(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function r0(e,t,a,l,s){switch(t){case"focusin":return wa=Xs(wa,e,t,a,l,s),!0;case"dragenter":return Ra=Xs(Ra,e,t,a,l,s),!0;case"mouseover":return Ea=Xs(Ea,e,t,a,l,s),!0;case"pointerover":var r=s.pointerId;return Cs.set(r,Xs(Cs.get(r)||null,e,t,a,l,s)),!0;case"gotpointercapture":return r=s.pointerId,Bs.set(r,Xs(Bs.get(r)||null,e,t,a,l,s)),!0}return!1}function Vd(e){var t=ll(e.target);if(t!==null){var a=p(t);if(a!==null){if(t=a.tag,t===13){if(t=v(a),t!==null){e.blockedOn=t,Wm(e.priority,function(){if(a.tag===13){var l=gt();l=Tr(l);var s=pl(a,l);s!==null&&pt(s,a,l),Uc(a,l)}});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function cr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=Oc(e.nativeEvent);if(a===null){a=e.nativeEvent;var l=new a.constructor(a.type,a);$r=l,a.target.dispatchEvent(l),$r=null}else return t=sl(a),t!==null&&kd(t),e.blockedOn=a,!1;t.shift()}return!0}function Pd(e,t,a){cr(e)&&a.delete(t)}function i0(){Mc=!1,wa!==null&&cr(wa)&&(wa=null),Ra!==null&&cr(Ra)&&(Ra=null),Ea!==null&&cr(Ea)&&(Ea=null),Cs.forEach(Pd),Bs.forEach(Pd)}function ur(e,t){e.blockedOn===t&&(e.blockedOn=null,Mc||(Mc=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,i0)))}var or=null;function Kd(e){or!==e&&(or=e,i.unstable_scheduleCallback(i.unstable_NormalPriority,function(){or===e&&(or=null);for(var t=0;t<e.length;t+=3){var a=e[t],l=e[t+1],s=e[t+2];if(typeof l!="function"){if(Ic(l||a)===null)continue;break}var r=sl(a);r!==null&&(e.splice(t,3),t-=3,Ii(r,{pending:!0,data:s,method:a.method,action:l},l,s))}}))}function Hs(e){function t(h){return ur(h,e)}wa!==null&&ur(wa,e),Ra!==null&&ur(Ra,e),Ea!==null&&ur(Ea,e),Cs.forEach(t),Bs.forEach(t);for(var a=0;a<Ua.length;a++){var l=Ua[a];l.blockedOn===e&&(l.blockedOn=null)}for(;0<Ua.length&&(a=Ua[0],a.blockedOn===null);)Vd(a),a.blockedOn===null&&Ua.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var s=a[l],r=a[l+1],o=s[at]||null;if(typeof r=="function")o||Kd(a);else if(o){var d=null;if(r&&r.hasAttribute("formAction")){if(s=r,o=r[at]||null)d=o.formAction;else if(Ic(s)!==null)continue}else d=o.action;typeof d=="function"?a[l+1]=d:(a.splice(l,3),l-=3),Kd(a)}}}function qc(e){this._internalRoot=e}fr.prototype.render=qc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(f(409));var a=t.current,l=gt();Ld(a,l,e,t,null,null)},fr.prototype.unmount=qc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ld(e.current,2,null,e,null,null),Qn(),t[al]=null}};function fr(e){this._internalRoot=e}fr.prototype.unstable_scheduleHydration=function(e){if(e){var t=fu();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Ua.length&&t!==0&&t<Ua[a].priority;a++);Ua.splice(a,0,e),a===0&&Vd(e)}};var Jd=c.version;if(Jd!=="19.1.0")throw Error(f(527,Jd,"19.1.0"));H.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(f(188)):(e=Object.keys(e).join(","),Error(f(268,e)));return e=O(t),e=e!==null?D(e):null,e=e===null?null:e.stateNode,e};var c0={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:U,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var dr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!dr.isDisabled&&dr.supportsFiber)try{Ql=dr.inject(c0),ct=dr}catch{}}return Ls.createRoot=function(e,t){if(!m(e))throw Error(f(299));var a=!1,l="",s=mf,r=hf,o=gf,d=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(d=t.unstable_transitionCallbacks)),t=Xd(e,1,!1,null,null,a,l,s,r,o,d,null),e[al]=t.current,yc(e),new qc(t)},Ls.hydrateRoot=function(e,t,a){if(!m(e))throw Error(f(299));var l=!1,s="",r=mf,o=hf,d=gf,h=null,T=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(s=a.identifierPrefix),a.onUncaughtError!==void 0&&(r=a.onUncaughtError),a.onCaughtError!==void 0&&(o=a.onCaughtError),a.onRecoverableError!==void 0&&(d=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(h=a.unstable_transitionCallbacks),a.formState!==void 0&&(T=a.formState)),t=Xd(e,1,!0,t,a??null,l,s,r,o,d,h,T),t.context=Hd(null),a=t.current,l=gt(),l=Tr(l),s=ma(l),s.callback=null,ha(a,s,l),a=l,t.current.lanes=a,Vl(t,a),Bt(t),e[al]=t.current,yc(e),new fr(t)},Ls.version="19.1.0",Ls}var sm;function X0(){if(sm)return $c.exports;sm=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(c){console.error(c)}}return i(),$c.exports=B0(),$c.exports}var H0=X0();class ks extends Error{}ks.prototype.name="InvalidTokenError";function L0(i){return decodeURIComponent(atob(i).replace(/(.)/g,(c,u)=>{let f=u.charCodeAt(0).toString(16).toUpperCase();return f.length<2&&(f="0"+f),"%"+f}))}function Y0(i){let c=i.replace(/-/g,"+").replace(/_/g,"/");switch(c.length%4){case 0:break;case 2:c+="==";break;case 3:c+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return L0(c)}catch{return atob(c)}}function hm(i,c){if(typeof i!="string")throw new ks("Invalid token specified: must be a string");c||(c={});const u=c.header===!0?0:1,f=i.split(".")[u];if(typeof f!="string")throw new ks(`Invalid token specified: missing part #${u+1}`);let m;try{m=Y0(f)}catch(p){throw new ks(`Invalid token specified: invalid base64 for part #${u+1} (${p.message})`)}try{return JSON.parse(m)}catch(p){throw new ks(`Invalid token specified: invalid json for part #${u+1} (${p.message})`)}}const gm="https://learn.reboot01.com/api",k0=`${gm}/auth/signin`,Q0=`${gm}/graphql-engine/v1/graphql`,Vc="reboot01_jwt_token",pr="reboot01_user_data",Z0=(i,c)=>{const u=`${i}:${c}`;return btoa(u)},V0=async(i,c)=>{try{const u=Z0(i,c),f=await fetch(k0,{method:"POST",headers:{Authorization:`Basic ${u}`,"Content-Type":"application/json"}});if(!f.ok)throw f.status===401?new Error("Invalid credentials. Please check your username/email and password."):f.status===403?new Error("Access forbidden. Please contact support."):f.status>=500?new Error("Server error. Please try again later."):new Error(`Authentication failed: ${f.statusText}`);const m=await f.text();if(!m||m.trim()==="")throw new Error("No token received from server");const p=m.trim().replace(/^["']|["']$/g,"");if(!p.includes(".")||p.split(".").length!==3)throw console.error("Invalid token format. Token:",p.substring(0,50)+"..."),new Error("Invalid token format received from server");if(!Kc(p))throw console.error("Token failed format validation"),new Error("Token format validation failed");const v=hm(p),y={id:v.sub,username:v.username||i,email:v.email,exp:v.exp,iat:v.iat};return{token:p,user:y}}catch(u){throw u.name==="InvalidTokenError"?new Error("Invalid token received from server"):u}},P0=(i,c)=>{localStorage.setItem(Vc,i),localStorage.setItem(pr,JSON.stringify(c))},Pc=()=>localStorage.getItem(Vc),K0=()=>{const i=localStorage.getItem(pr);if(!i)return null;try{return JSON.parse(i)}catch(c){return console.warn("Error parsing stored user data:",c),localStorage.removeItem(pr),null}},Kc=i=>{if(!i||typeof i!="string")return!1;const c=i.split(".");if(c.length!==3)return!1;try{return c.forEach(u=>{if(!u)throw new Error("Empty part");if(!/^[A-Za-z0-9_-]+$/.test(u))throw new Error("Invalid characters")}),!0}catch{return!1}},pm=i=>{try{if(!Kc(i))return!0;const c=hm(i),u=Date.now()/1e3;return c.exp<u}catch(c){return console.warn("Token validation error:",c.message),!0}},J0=()=>{const i=Pc();return i?!pm(i):!1},Wa=()=>{localStorage.removeItem(Vc),localStorage.removeItem(pr)},F0=()=>{const i=Pc();return!i||!Kc(i)||pm(i)?(i&&(console.warn("Clearing invalid or expired token"),Wa()),{}):{Authorization:`Bearer ${i}`}},W0=i=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i),ep=i=>W0(i)?"email":"username",it={LOGIN_START:"LOGIN_START",LOGIN_SUCCESS:"LOGIN_SUCCESS",LOGIN_FAILURE:"LOGIN_FAILURE",LOGOUT:"LOGOUT",RESTORE_SESSION:"RESTORE_SESSION",CLEAR_ERROR:"CLEAR_ERROR"},tp={user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!1},ap=(i,c)=>{switch(c.type){case it.LOGIN_START:return{...i,isLoading:!0,error:null};case it.LOGIN_SUCCESS:return{...i,user:c.payload.user,token:c.payload.token,isAuthenticated:!0,isLoading:!1,error:null,isInitialized:!0};case it.LOGIN_FAILURE:return{...i,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:c.payload.error,isInitialized:!0};case it.LOGOUT:return{...i,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!0};case it.RESTORE_SESSION:return{...i,user:c.payload.user,token:c.payload.token,isAuthenticated:c.payload.isAuthenticated,isInitialized:!0};case it.CLEAR_ERROR:return{...i,error:null};default:return i}},ym=W.createContext(null),lp=({children:i})=>{const[c,u]=W.useReducer(ap,tp);W.useEffect(()=>{(()=>{try{const O=Pc(),D=K0();O&&D&&J0()?u({type:it.RESTORE_SESSION,payload:{user:D,token:O,isAuthenticated:!0}}):(Wa(),u({type:it.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}}))}catch(O){console.warn("Session restoration error:",O.message),Wa(),u({type:it.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}})}})()},[]);const f=async(y,O)=>{u({type:it.LOGIN_START});try{const{token:D,user:I}=await V0(y,O);return P0(D,I),u({type:it.LOGIN_SUCCESS,payload:{user:I,token:D}}),{success:!0}}catch(D){return u({type:it.LOGIN_FAILURE,payload:{error:D.message}}),{success:!1,error:D.message}}},m=()=>{Wa(),u({type:it.LOGOUT})},p=()=>{u({type:it.CLEAR_ERROR})},v={user:c.user,token:c.token,isAuthenticated:c.isAuthenticated,isLoading:c.isLoading,error:c.error,isInitialized:c.isInitialized,login:f,logout:m,clearError:p};return n.jsx(ym.Provider,{value:v,children:i})},Ll=()=>{const i=W.useContext(ym);if(!i)throw new Error("useAuth must be used within an AuthProvider");return i};C`
  fragment ErrorInfo on Error {
    message
    code
    path
  }
`;C`
  fragment PaginationInfo on Query {
    totalCount: aggregate {
      count
    }
  }
`;const de=C`
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
`,Ht=C`
  fragment UserBasicInfo on user {
    id
    login
    firstName
    lastName
    campus
    avatarUrl
  }
`;C`
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
`;const je=C`
  fragment ObjectInfo on object {
    id
    name
    type
    attrs
    campus
    createdAt
    updatedAt
  }
`,It=C`
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
`,ia=C`
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
`,Vs=C`
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
`,Yl=C`
  fragment AuditInfo on audit {
    id
    groupId
    auditorId
    attrs
    grade
    createdAt
    updatedAt
    resultId
  }
`,xr=C`
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
`,Ps=C`
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
`,sp=C`
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
`,vr=C`
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
`,np=C`
  fragment ObjectAggregateInfo on object_aggregate {
    aggregate {
      count
    }
  }
`,kl=C`
  fragment EventInfo on event {
    id
    path
    campus
    createdAt
  }
`,Jc=C`
  fragment EventUserInfo on event_user {
    id
    userId
    createdAt
  }
`,xm=C`
  fragment EventUserAggregateInfo on event_user_aggregate {
    aggregate {
      count
    }
  }
`,br=C`
  fragment GroupInfo on group {
    id
    path
    campus
    status
    createdAt
    updatedAt
  }
`,vm=C`
  fragment GroupUserInfo on group_user {
    id
    userId
    confirmed
    createdAt
    updatedAt
  }
`;C`
  fragment GroupAggregateInfo on group_aggregate {
    aggregate {
      count
    }
  }
`;C`
  fragment GroupUserAggregateInfo on group_user_aggregate {
    aggregate {
      count
    }
  }
`;const bm=C`
  fragment LabelInfo on label {
    id
    name
    description
    color
    createdAt
    updatedAt
  }
`,jm=C`
  fragment LabelUserInfo on label_user {
    id
    userId
    labelId
    createdAt
  }
`,rp=C`
  fragment LabelUserAggregateInfo on label_user_aggregate {
    aggregate {
      count
    }
  }
`,Fc=C`
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
`,ip=C`
  fragment MatchAggregateInfo on match_aggregate {
    aggregate {
      count
    }
  }
`,Am=C`
  fragment ObjectAvailabilityInfo on object_availability {
    id
    userId
    objectId
    available
    createdAt
    updatedAt
  }
`,cp=C`
  fragment ObjectAvailabilityAggregateInfo on object_availability_aggregate {
    aggregate {
      count
    }
  }
`,Sm=C`
  fragment ProgressByPathViewInfo on progress_by_path_view {
    id
    userId
    path
    grade
    isDone
    createdAt
    updatedAt
  }
`,up=C`
  fragment ProgressByPathViewAggregateInfo on progress_by_path_view_aggregate {
    aggregate {
      count
    }
  }
`,Wc=C`
  fragment RecordInfo on record {
    id
    userId
    authorId
    message
    banEndAt
    createdAt
    updatedAt
  }
`,eu=C`
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
`,_m=C`
  fragment RegistrationUserInfo on registration_user {
    id
    userId
    registrationId
    createdAt
  }
`,op=C`
  fragment RegistrationUserAggregateInfo on registration_user_aggregate {
    aggregate {
      count
    }
  }
`,tu=C`
  fragment RoleInfo on role {
    id
    slug
    name
    description
    createdAt
    updatedAt
  }
`,au=C`
  fragment UserRoleInfo on user_role {
    id
    userId
    roleId
    createdAt
    updatedAt
  }
`;C`
  fragment UserRoleAggregateInfo on user_role_aggregate {
    aggregate {
      count
    }
  }
`;const fp=C`
  fragment UserRolesViewInfo on user_roles_view {
    id
    userId
    roleId
    slug
    name
    description
  }
`;C`
  fragment UserRolesViewAggregateInfo on user_roles_view_aggregate {
    aggregate {
      count
    }
  }
`;const Nm=C`
  fragment ToadSessionInfo on toad_sessions {
    id
    userId
    sessionData
    createdAt
    updatedAt
    expiresAt
  }
`,dp=C`
  fragment ToadSessionsAggregateInfo on toad_sessions_aggregate {
    aggregate {
      count
    }
  }
`,Tm=C`
  fragment XPInfo on xp {
    id
    userId
    amount
    originEventId
    path
    createdAt
  }
`;C`
  fragment MarkdownInfo on markdown {
    id
    name
    content
    path
    createdAt
    updatedAt
  }
`;C`
  query GetUserInfo {
    user {
      ...UserInfo
    }
  }
  ${de}
`;C`
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
  ${de}
  ${Ht}
  ${Jc}
  ${xm}
  ${kl}
  ${je}
  ${eu}
  ${vm}
  ${br}
  ${jm}
  ${bm}
  ${Fc}
  ${Am}
  ${Sm}
  ${Wc}
  ${_m}
  ${au}
  ${tu}
  ${fp}
  ${Nm}
  ${Tm}
`;C`
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
  ${de}
  ${Ht}
  ${Wc}
  ${au}
  ${tu}
`;C`
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
  ${Jc}
  ${xm}
  ${kl}
  ${je}
  ${Ht}
  ${eu}
  ${_m}
  ${op}
`;C`
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
  ${jm}
  ${rp}
  ${bm}
`;C`
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
  ${Fc}
  ${ip}
  ${Ht}
  ${je}
  ${kl}
`;C`
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
  ${Am}
  ${cp}
  ${je}
  ${Ht}
`;const mp=C`
  query GetComprehensiveUserAnalytics($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      # Use fragment for consistent user data
      ...UserInfo

      # XP transactions - optimized with fragment and reduced limit
      transactions(
        where: { type: { _eq: "xp" } }
        order_by: { createdAt: desc }
        limit: 50
      ) {
        ...TransactionInfo
        object {
          ...ObjectInfo
        }
      }

      # Optimized transaction aggregates using fragments
      xpTransactions: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        ...TransactionAggregateInfo
      }

      upTransactions: transactions_aggregate(
        where: { type: { _eq: "up" } }
      ) {
        ...TransactionAggregateInfo
      }

      downTransactions: transactions_aggregate(
        where: { type: { _eq: "down" } }
      ) {
        ...TransactionAggregateInfo
      }

      # Optimized results with fragments and reduced limit
      results(
        where: { isLast: { _eq: true } }
        order_by: { createdAt: desc }
        limit: 30
      ) {
        ...ResultInfo
        object {
          ...ObjectInfo
        }
      }

      # Optimized results aggregates using fragments
      results_aggregate(where: { isLast: { _eq: true } }) {
        ...ResultAggregateInfo
      }

      passedResults: results_aggregate(
        where: {
          isLast: { _eq: true }
          grade: { _gte: 1 }
        }
      ) {
        ...ResultAggregateInfo
      }

      # Optimized audits with fragments and reduced limit
      audits(limit: 30, order_by: { createdAt: desc }) {
        ...AuditInfo
        group {
          ...GroupInfo
          object {
            ...ObjectInfo
          }
        }
      }

      # Optimized audits aggregate using fragments
      audits_aggregate {
        ...AuditAggregateInfo
      }

      # Optimized progress data with fragments and reduced limit
      progresses(
        where: { isDone: { _eq: true } }
        order_by: { createdAt: desc }
        limit: 30
      ) {
        ...ProgressInfo
        object {
          ...ObjectInfo
        }
      }

      # Optimized events with fragments and reduced limit
      events(limit: 5, order_by: { createdAt: asc }) {
        ...EventUserInfo
        event {
          ...EventInfo
        }
      }
    }
  }
  ${de}
  ${It}
  ${je}
  ${ia}
  ${Yl}
  ${br}
  ${Vs}
  ${Jc}
  ${kl}
  ${Ps}
  ${vr}
  ${xr}
`;C`
  query GetBasicUserDashboard($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserBasicInfo

      # Essential XP data only
      xpTransactions: transactions_aggregate(
        where: { type: { _eq: "xp" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      # Essential project stats only
      results_aggregate(where: { isLast: { _eq: true } }) {
        aggregate {
          count
        }
      }

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

      # Essential audit data only
      upTransactions: transactions_aggregate(
        where: { type: { _eq: "up" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }

      downTransactions: transactions_aggregate(
        where: { type: { _eq: "down" } }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
  ${Ht}
`;C`
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
  ${de}
  ${Ps}
  ${vr}
  ${xr}
  ${sp}
`;C`
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
  ${de}
  ${Ps}
  ${vr}
`;C`
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
  ${de}
  ${Ht}
  ${vm}
  ${br}
  ${vr}
  ${xr}
  ${Yl}
  ${It}
  ${je}
  ${Fc}
`;C`
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
  ${Sm}
  ${up}
`;C`
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
  ${Nm}
  ${dp}
`;C`
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
  ${Tm}
`;C`
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
  ${je}
  ${np}
  ${Ht}
`;C`
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
`;C`
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
`;C`
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
`;C`
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
`;C`
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
`;C`
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
  ${de}
  ${Ht}
  ${It}
  ${Ps}
  ${je}
  ${kl}
  ${eu}
`;C`
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
`;C`
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
  ${de}
  ${Ht}
  ${Ps}
  ${xr}
  ${au}
  ${tu}
  ${Wc}
`;C`
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
  ${It}
  ${je}
  ${de}
`;C`
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
  ${Vs}
  ${je}
  ${de}
`;C`
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
  ${ia}
  ${je}
  ${de}
  ${Yl}
`;C`
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
  ${Yl}
  ${de}
  ${je}
  ${ia}
`;C`
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
  ${je}
  ${de}
`;C`
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
  ${je}
  ${de}
`;C`
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
  ${It}
  ${je}
  ${de}
`;C`
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
  ${de}
`;C`
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
  ${je}
  ${de}
`;C`
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
  ${de}
  ${je}
`;C`
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
  ${je}
  ${de}
  ${Vs}
  ${ia}
  ${It}
`;C`
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
  ${de}
  ${je}
  ${Vs}
`;C`
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
  ${It}
  ${je}
  ${de}
  ${ia}
  ${Yl}
`;C`
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
  ${de}
`;C`
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
  ${de}
  ${It}
  ${je}
`;C`
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
  ${It}
  ${je}
  ${de}
`;C`
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
  ${It}
  ${je}
  ${de}
`;C`
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
  ${ia}
  ${Vs}
  ${je}
  ${de}
`;C`
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
  ${de}
`;C`
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
  ${ia}
  ${It}
  ${je}
  ${de}
`;C`
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
  ${Yl}
  ${je}
  ${de}
  ${ia}
`;const hp=C`
  query SearchProjectsByStatus(
    $userId: Int!
    $status: [String!] = ["working", "audit", "setup", "finished"]
    $searchTerm: String = "%%"
    $limit: Int = 15
    $offset: Int = 0
    $campus: String = null
  ) {
    # Optimized search with fragments and reduced complexity
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
            # Simplified status filtering for better performance
            _or: [
              # Finished projects
              {
                grade: { _gte: 1 }
                isLast: { _eq: true }
              }
              # In-progress projects
              {
                grade: { _lt: 1 }
                updatedAt: { _gte: "2024-01-01" }
              }
            ]
          }
        ]
      }
      order_by: { updatedAt: desc }
      limit: $limit
      offset: $offset
    ) {
      ...ResultInfo
      object {
        ...ObjectInfo
      }
      event {
        ...EventInfo
      }
      group {
        ...GroupInfo
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
  ${ia}
  ${je}
  ${kl}
  ${br}
`,gp=C`
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
`;C`
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
`;C`
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
`;C`
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
`;C`
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
`;C`
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
`;const pp=C`
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
`;C`
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
`;C`
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
`;const Et={NETWORK:"NETWORK_ERROR",GRAPHQL:"GRAPHQL_ERROR",AUTHENTICATION:"AUTH_ERROR",AUTHORIZATION:"AUTHORIZATION_ERROR",VALIDATION:"VALIDATION_ERROR",RATE_LIMIT:"RATE_LIMIT_ERROR",SERVER:"SERVER_ERROR",CLIENT:"CLIENT_ERROR",UNKNOWN:"UNKNOWN_ERROR"},Xt={LOW:"low",MEDIUM:"medium",HIGH:"high"},nm=i=>{if(!i)return null;const c={type:Et.UNKNOWN,severity:Xt.MEDIUM,message:"An unexpected error occurred",userMessage:"Something went wrong. Please try again.",code:null,details:null,timestamp:new Date().toISOString(),retryable:!1,fallbackAction:null};return i instanceof d0?yp(i,c):i.networkError?wm(i.networkError,c):i.graphQLErrors&&i.graphQLErrors.length>0?Rm(i.graphQLErrors,c):(i.message&&(c.message=i.message,c.userMessage=lu(i.message)),c)},yp=(i,c)=>{const u={...c};return i.networkError?wm(i.networkError,u):i.graphQLErrors&&i.graphQLErrors.length>0?Rm(i.graphQLErrors,u):(u.message=i.message,u.userMessage=lu(i.message),u)},wm=(i,c)=>{const u={...c};if(u.type=Et.NETWORK,u.retryable=!0,i.statusCode)switch(i.statusCode){case 401:u.type=Et.AUTHENTICATION,u.severity=Xt.HIGH,u.userMessage="Please log in to continue",u.fallbackAction="redirect_to_login",u.retryable=!1;break;case 403:u.type=Et.AUTHORIZATION,u.severity=Xt.HIGH,u.userMessage="You do not have permission to access this resource",u.retryable=!1;break;case 429:u.type=Et.RATE_LIMIT,u.severity=Xt.MEDIUM,u.userMessage="Too many requests. Please wait a moment and try again",u.retryable=!0;break;case 500:case 502:case 503:case 504:u.type=Et.SERVER,u.severity=Xt.HIGH,u.userMessage="Server is temporarily unavailable. Please try again later",u.retryable=!0;break;default:u.userMessage=`Network error (${i.statusCode}). Please check your connection`}else u.userMessage="Network connection failed. Please check your internet connection";return u.message=i.message||"Network error occurred",u.details={statusCode:i.statusCode,statusText:i.statusText},u},Rm=(i,c)=>{const u={...c};u.type=Et.GRAPHQL;const f=i[0];if(f.extensions){const{code:m,exception:p}=f.extensions;switch(u.code=m,m){case"UNAUTHENTICATED":u.type=Et.AUTHENTICATION,u.severity=Xt.HIGH,u.userMessage="Authentication required. Please log in",u.fallbackAction="redirect_to_login";break;case"FORBIDDEN":u.type=Et.AUTHORIZATION,u.severity=Xt.HIGH,u.userMessage="Access denied. You do not have permission for this action";break;case"BAD_USER_INPUT":u.type=Et.VALIDATION,u.severity=Xt.LOW,u.userMessage="Invalid input. Please check your data and try again",u.retryable=!0;break;case"INTERNAL_ERROR":u.type=Et.SERVER,u.severity=Xt.HIGH,u.userMessage="Internal server error. Please try again later",u.retryable=!0;break;default:u.userMessage=lu(f.message)}p&&(u.details={stacktrace:p.stacktrace,code:p.code})}return u.message=f.message,u.graphQLErrors=i,u},lu=i=>{const c=i.toLowerCase(),u=[{pattern:/jwt|token|authentication/i,message:"Your session has expired. Please log in again"},{pattern:/network|connection|fetch/i,message:"Connection problem. Please check your internet and try again"},{pattern:/timeout/i,message:"Request timed out. Please try again"},{pattern:/not found|404/i,message:"The requested information could not be found"},{pattern:/permission|forbidden|unauthorized/i,message:"You do not have permission to perform this action"},{pattern:/validation|invalid|bad input/i,message:"Please check your input and try again"},{pattern:/server error|internal error|500/i,message:"Server error. Please try again later"},{pattern:/rate limit|too many requests/i,message:"Too many requests. Please wait a moment and try again"}];for(const{pattern:f,message:m}of u)if(f.test(c))return m;return"An unexpected error occurred. Please try again"},xp=(i,c={})=>{const u={fetchPolicy:"cache-first",errorPolicy:"all",notifyOnNetworkStatusChange:!0};switch(i){case"GET_BASIC_USER_DASHBOARD":return{...u,fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"};case"GET_COMPREHENSIVE_USER_ANALYTICS":return{...u,fetchPolicy:"cache-first",nextFetchPolicy:"cache-only"};case"SEARCH_PROJECTS_BY_STATUS":case"SEARCH_AUDITS_BY_STATUS":case"SEARCH_USERS_WITH_STATUS":return{...u,fetchPolicy:"cache-and-network",nextFetchPolicy:"network-only"};default:return u}},vp=1e3,tt=i=>{if(!i||i===0)return"0";const c=Number(i);return isNaN(c)?"0":c>=1e6?`${(c/1e6).toFixed(1)}M`:c>=1e3?`${(c/1e3).toFixed(1)}K`:c.toString()},el=i=>i==null||isNaN(i)?0:Number(i)/vp,Em=i=>{if(!i)return null;if(i.profile){const c=tl(i.profile,{});if(c.avatar)return c.avatar;if(c.avatarUrl)return c.avatarUrl;if(c.picture)return c.picture}if(i.attrs){const c=tl(i.attrs,{});if(c.avatar)return c.avatar;if(c.avatarUrl)return c.avatarUrl;if(c.picture)return c.picture;if(c.image)return c.image}return null},Zs=i=>{if(!i)return"Unknown User";if(i.firstName&&i.lastName)return`${i.firstName} ${i.lastName}`;if(i.firstName)return i.firstName;if(i.lastName)return i.lastName;if(i.profile){const c=tl(i.profile,{});if(c.firstName&&c.lastName)return`${c.firstName} ${c.lastName}`;if(c.name)return c.name;if(c.displayName)return c.displayName}return i.login||i.username||"Unknown User"},Um=i=>{if(!i)return null;if(i.email)return i.email;if(i.profile){const c=tl(i.profile,{});if(c.email)return c.email}if(i.attrs){const c=tl(i.attrs,{});if(c.email)return c.email}return null},Dm=i=>!i||i<=0?1:Math.floor(i/1e3)+1,bp=i=>{const c=Dm(i),u=(c-1)*1e3,f=c*1e3,p=(i-u)/1e3*100,v=f-i;return{currentLevel:c,progressPercentage:Math.max(0,Math.min(100,p)),xpNeeded:Math.max(0,v),currentLevelXP:u,nextLevelXP:f}},Xc=(i,c={})=>{if(!i)return"Unknown";const u={year:"numeric",month:"short",day:"numeric"};try{return new Date(i).toLocaleDateString("en-US",{...u,...c})}catch(f){return console.warn("Error formatting date:",f),"Invalid Date"}},Ja=(i,c=1)=>i==null||isNaN(i)?"0%":`${Number(i).toFixed(c)}%`,tl=(i,c={})=>{if(!i)return c;if(typeof i=="object"&&i!==null)return i;if(typeof i=="string")try{return JSON.parse(i)}catch(u){return console.warn("Error parsing JSON:",u),c}return c},jp=i=>{if(!i)return{auditRatio:0,totalUp:0,totalDown:0,auditsGiven:0,auditsReceived:0};const c=i.auditRatio||0,u=i.upTransactions?.aggregate?.sum?.amount||i.totalUp||0,f=i.downTransactions?.aggregate?.sum?.amount||i.totalDown||0,m=i.audits_aggregate?.aggregate?.count||i.auditsAssigned||0,p=i.auditsReceived?.aggregate?.count||0;return{auditRatio:c,totalUp:el(u),totalDown:el(Math.abs(f)),auditsGiven:m,auditsReceived:p}},Ap=i=>{const c=i?.totalProjects?.aggregate?.count||0,u=i?.passedProjects?.aggregate?.count||0,f=c-u,m=c>0?u/c*100:0;return{totalProjects:c,passedProjects:u,failedProjects:f,passRate:m}},Om=i=>{if(!Array.isArray(i))return{totalXP:0,xpByProject:[],timeline:[]};const c=i.filter(y=>y.type==="xp"),u=c.reduce((y,O)=>y+el(O.amount),0),f=c.reduce((y,O)=>{const D=O.object?.name||O.path?.split("/").pop()||"Unknown",I=`${D}_${O.objectId||"no_id"}`;return y[I]||(y[I]={name:D,path:O.path,objectId:O.objectId,totalXP:0,type:O.object?.type||"unknown",transactions:[]}),y[I].totalXP+=el(O.amount),y[I].transactions.push(O),y},{}),m=c.filter(y=>y.createdAt&&y.amount!=null).map(y=>({date:y.createdAt,amount:el(y.amount)||0,project:y.object?.name||y.path?.split("/").pop()||"Unknown",type:y.object?.type||"unknown"})).sort((y,O)=>new Date(y.date)-new Date(O.date));let p=0;const v=m.map(y=>{const O=isNaN(y.amount)?0:y.amount;return p+=O,{...y,amount:O,cumulativeXP:p}});return{totalXP:u,xpByProject:Object.values(f).sort((y,O)=>O.totalXP-y.totalXP),timeline:v}},Sp=i=>{if(!i)return"Unknown Campus";if(i.campus)return i.campus;if(i.events&&i.events.length>0){const c=i.events[0];if(c.event?.campus)return c.event.campus;if(c.campus)return c.campus}return"Unknown Campus"},_p=i=>{if(!i)return null;if(i.createdAt)return i.createdAt;if(i.events&&i.events.length>0){const c=i.events.sort((u,f)=>new Date(u.createdAt||u.event?.createdAt)-new Date(f.createdAt||f.event?.createdAt));return c[0].createdAt||c[0].event?.createdAt}return null},Hc=i=>{if(!Array.isArray(i))return[];const u=i.filter(f=>f.type&&f.type.includes("skill")).reduce((f,m)=>{const p=m.type;f[p]||(f[p]={name:p.replace("skill_","").replace(/_/g," "),type:p,totalXP:0,transactions:[],lastActivity:null}),f[p].totalXP+=el(m.amount),f[p].transactions.push(m);const v=new Date(m.createdAt);return(!f[p].lastActivity||v>new Date(f[p].lastActivity))&&(f[p].lastActivity=m.createdAt),f},{});return Object.values(u).sort((f,m)=>m.totalXP-f.totalXP)},Im=i=>{if(!Array.isArray(i))return{total:0,completed:0,inProgress:0,completionRate:0};const c=i.length,u=i.filter(p=>p.isDone).length,f=i.filter(p=>!p.isDone&&p.grade>0).length,m=c>0?u/c*100:0;return{total:c,completed:u,inProgress:f,completionRate:m,averageGrade:c>0?i.reduce((p,v)=>p+(v.grade||0),0)/c:0}},Np=(i=[],c=[])=>{const u=i.length,f=c.length,m=f>0?u/f:0,p=i.filter(g=>g.grade>=1).length,v=c.filter(g=>g.grade>=1).length,y=u>0?p/u*100:0,O=f>0?v/f*100:0,D=u>0?i.reduce((g,b)=>g+(b.grade||0),0)/u:0,I=f>0?c.reduce((g,b)=>g+(b.grade||0),0)/f:0;return{auditRatio:m,given:{count:u,passed:p,successRate:y,averageGrade:D},received:{count:f,passed:v,successRate:O,averageGrade:I}}},Mm=(i={},c={})=>{let u=0;const f=i.auditRatio||0;f>=1&&(u+=Math.min(30,f*15));const m=i.given?.successRate||0;u+=m/100*25;const p=c.totalGroups||0,v=c.leadershipRatio||0;u+=Math.min(15,p*2),u+=Math.min(10,v/100*10);const y=i.uniqueCollaborators||0;return u+=Math.min(20,y*2),Math.min(100,u)},Lc=i=>{if(!Array.isArray(i)||i.length<3)return{trend:"insufficient_data",slope:0,confidence:0};const c=i.filter(b=>b.createdAt&&b.grade!=null).sort((b,x)=>new Date(b.createdAt)-new Date(x.createdAt));if(c.length<3)return{trend:"insufficient_data",slope:0,confidence:0};const u=Math.min(3,c.length),f=[];for(let b=u-1;b<c.length;b++){const x=c.slice(b-u+1,b+1),_=x.reduce((A,q)=>A+q.grade,0)/x.length;f.push({date:c[b].createdAt,average:_,index:b})}if(f.length<2)return{trend:"stable",slope:0,confidence:0};const m=f.length,p=f.reduce((b,x,_)=>b+_,0),v=f.reduce((b,x)=>b+x.average,0),y=f.reduce((b,x,_)=>b+_*x.average,0),O=f.reduce((b,x,_)=>b+_*_,0),D=(m*y-p*v)/(m*O-p*p),I=Math.min(100,m/10*100);let g="stable";return D>.05?g="improving":D<-.05&&(g="declining"),{trend:g,slope:D*100,confidence:I,movingAverages:f,dataPoints:m}},Tp=i=>{if(!i)return null;const c=Array.isArray(i)?i[0]:i;if(!c)return null;const u=Zs(c),f=Um(c),m=Sp(c),p=_p(c),v=Om(c.transactions||[]),y=v.totalXP,O=Dm(y),D=bp(y),I=jp(c),g=Ap({totalProjects:c.results_aggregate,passedProjects:c.passedResults}),b=Im(c.progresses||[]),x=Hc(c.transactions||[]),_=Mm(I,{totalGroups:c.groups_aggregate?.aggregate?.count||0,leadershipRatio:0}),A=Lc(c.results||[]);return{id:c.id,login:c.login,displayName:u,email:f,campus:m,registrationDate:p,totalXP:y,userLevel:O,levelProgress:D,xpByProject:v.xpByProject,xpTimeline:v.timeline,...g,...b,...I,skills:x,collaborationScore:_,performanceTrend:A,rawData:c}},wp=i=>{if(!Array.isArray(i)||i.length===0)return{trend:"stable",score:0,progression:"unknown"};const c=i.filter(g=>g.createdAt&&g.grade!=null).sort((g,b)=>new Date(g.createdAt)-new Date(b.createdAt));if(c.length<3)return{trend:"stable",score:0,progression:"insufficient_data"};const u=Math.min(3,c.length),f=[];for(let g=u-1;g<c.length;g++){const b=c.slice(g-u+1,g+1),x=b.reduce((_,A)=>_+A.grade,0)/b.length;f.push(x)}if(f.length<2)return{trend:"stable",score:0,progression:"stable"};const m=f.slice(0,Math.floor(f.length/2)),p=f.slice(Math.floor(f.length/2)),v=m.reduce((g,b)=>g+b,0)/m.length,y=p.reduce((g,b)=>g+b,0)/p.length,O=y-v;let D="stable",I="maintaining";return O>.1?(D="improving",I="advancing"):O<-.1&&(D="declining",I="struggling"),{trend:D,score:O*100,progression:I,firstHalfAverage:v,secondHalfAverage:y,totalProjects:c.length}},Rp=i=>{if(!Array.isArray(i)||i.length<2)return{velocity:0,trend:"insufficient_data",projectsPerWeek:0};const c=i.filter(x=>x.createdAt).sort((x,_)=>new Date(x.createdAt)-new Date(_.createdAt));if(c.length<2)return{velocity:0,trend:"insufficient_data",projectsPerWeek:0};const u=new Date(c[0].createdAt),f=new Date(c[c.length-1].createdAt),m=(f-u)/(1e3*60*60*24);if(m<=0)return{velocity:0,trend:"single_day",projectsPerWeek:0};const p=c.length/m,v=p*7,y=Math.min(30,m/2),O=new Date(f.getTime()-y*24*60*60*1e3),I=c.filter(x=>new Date(x.createdAt)>=O).length/y,g=c.length/m;let b="stable";return I>g*1.2?b="accelerating":I<g*.8&&(b="decelerating"),{velocity:p,projectsPerWeek:Math.round(v*10)/10,trend:b,totalDays:Math.round(m),recentVelocity:I,overallVelocity:g}},Ep=(i=[],c=[])=>{const u=[...i.map(g=>({...g,type:"progress",date:g.updatedAt})),...c.map(g=>({...g,type:"result",date:g.createdAt}))].filter(g=>g.date);if(u.length===0)return{pattern:"no_data",peakHours:[],consistency:0,workingDays:0};const f={},m={};u.forEach(g=>{const b=new Date(g.date),x=b.getHours(),_=b.toISOString().split("T")[0];f[x]=(f[x]||0)+1,m[_]=(m[_]||0)+1});const p=Object.entries(f).sort(([,g],[,b])=>b-g).slice(0,3).map(([g,b])=>({hour:parseInt(g),count:b})),v=Object.values(m),y=v.reduce((g,b)=>g+b,0)/v.length,O=v.reduce((g,b)=>g+Math.pow(b-y,2),0)/v.length,D=Math.max(0,100-Math.sqrt(O)*10);let I="irregular";return D>70?I="consistent":D>40&&(I="moderate"),{pattern:I,peakHours:p,consistency:Math.round(D),workingDays:Object.keys(m).length,averageActivitiesPerDay:Math.round(y*10)/10,totalActivities:u.length}},qm=(i,c,u)=>{let f="Beginner",m=0;const p=Math.min(40,i/1e4*40),v=Math.min(30,c*3),y=(u||0)*30;return m=p+v+y,m>=80?f="Expert":m>=60?f="Advanced":m>=35?f="Intermediate":m>=15?f="Beginner":f="Novice",{level:f,score:Math.round(m),breakdown:{xpScore:Math.round(p),projectScore:Math.round(v),gradeScore:Math.round(y)},nextLevelThreshold:rm(f),pointsToNext:Math.max(0,rm(f)-m)}},rm=i=>{const c={Novice:15,Beginner:35,Intermediate:60,Advanced:80,Expert:100},u=Object.keys(c),f=u.indexOf(i);return f===-1||f===u.length-1?100:c[u[f+1]]},Up=i=>{if(!i)return{recommendations:[],focus:"unknown"};const{skills:c=[],performanceTrend:u={},collaborationScore:f=0,totalXP:m=0}=i,p=[];let v="skill_development";const y=c.map(I=>({name:I.name,proficiency:qm(I.totalXP||0,I.completedProjects||0,I.averageGrade||0)})),O=y.filter(I=>I.proficiency.level==="Beginner"||I.proficiency.level==="Novice"),D=y.filter(I=>I.proficiency.level==="Advanced"||I.proficiency.level==="Expert");return O.length>0&&p.push({type:"skill_focus",priority:"high",title:"Strengthen Foundation Skills",description:`Focus on improving ${O.slice(0,2).map(I=>I.name).join(" and ")} to build a stronger foundation.`,skills:O.slice(0,3).map(I=>I.name),estimatedTime:"2-4 weeks"}),u.trend==="declining"?(p.push({type:"performance_improvement",priority:"high",title:"Address Performance Decline",description:"Recent performance shows a declining trend. Consider reviewing fundamentals and seeking mentorship.",actionItems:["Review recent failed projects","Practice core concepts","Seek peer feedback"],estimatedTime:"1-2 weeks"}),v="performance_recovery"):u.trend==="improving"&&p.push({type:"skill_advancement",priority:"medium",title:"Advance to Next Level",description:"Your performance is improving! Consider tackling more challenging projects.",actionItems:["Take on advanced projects","Mentor other students","Explore new technologies"],estimatedTime:"3-6 weeks"}),f<30&&p.push({type:"collaboration",priority:"medium",title:"Improve Collaboration Skills",description:"Increase participation in peer reviews and group projects to build collaboration skills.",actionItems:["Participate in more audits","Join group projects","Provide constructive feedback"],estimatedTime:"Ongoing"}),m<5e4&&p.push({type:"xp_building",priority:"medium",title:"Build Experience Points",description:"Focus on completing projects to build your XP and advance your level.",actionItems:["Complete pending projects","Retry failed projects","Explore bonus challenges"],estimatedTime:"4-8 weeks"}),D.length>=2&&m>1e5&&(p.push({type:"specialization",priority:"low",title:"Consider Specialization",description:`You have strong skills in ${D.slice(0,2).map(I=>I.name).join(" and ")}. Consider specializing further.`,skills:D.slice(0,2).map(I=>I.name),estimatedTime:"8-12 weeks"}),v="specialization"),{recommendations:p.sort((I,g)=>{const b={high:3,medium:2,low:1};return b[g.priority]-b[I.priority]}),primaryFocus:v,skillAnalysis:y,overallReadiness:Dp(i)}},Dp=i=>{const{totalXP:c=0,skills:u=[],performanceTrend:f={},collaborationScore:m=0}=i;let p=0;p+=Math.min(25,c/2e5*25);const v=u.length;p+=Math.min(25,v*3),f.trend==="improving"?p+=25:f.trend==="stable"?p+=15:f.trend==="declining"&&(p+=5),p+=Math.min(25,m/100*25);let y="Not Ready";return p>=80?y="Highly Ready":p>=60?y="Ready":p>=40&&(y="Partially Ready"),{score:Math.round(p),level:y,breakdown:{xp:Math.min(25,c/2e5*25),skills:Math.min(25,v*3),performance:f.trend==="improving"?25:f.trend==="stable"?15:5,collaboration:Math.min(25,m/100*25)}}},Op=(i=[])=>{if(!Array.isArray(i)||i.length===0)return{frequency:0,pattern:"none",averageInterval:0};const c=i.filter(p=>p.createdAt).sort((p,v)=>new Date(p.createdAt)-new Date(v.createdAt));if(c.length<2)return{frequency:0,pattern:"single",averageInterval:0};const u=[];for(let p=1;p<c.length;p++){const v=new Date(c[p-1].createdAt),y=new Date(c[p].createdAt);u.push((y-v)/(1e3*60*60*24))}const f=u.reduce((p,v)=>p+v,0)/u.length;let m="rare";return f<=7?m="frequent":f<=30?m="regular":f<=90&&(m="occasional"),{frequency:Math.round(365/f*10)/10,pattern:m,averageInterval:Math.round(f),totalCollaborations:c.length,timeSpan:Math.round((new Date(c[c.length-1].createdAt)-new Date(c[0].createdAt))/(1e3*60*60*24))}},Ip=(i=[],c=[])=>{const u=new Set,f=new Map;i.forEach(g=>{g.members&&Array.isArray(g.members)&&g.members.forEach(b=>{b.id&&(u.add(b.id),g.members.forEach(x=>{if(x.id&&x.id!==b.id){const _=[b.id,x.id].sort().join("-");f.set(_,(f.get(_)||0)+1)}}))})}),c.forEach(g=>{if(g.auditorId&&g.auditeeId){u.add(g.auditorId),u.add(g.auditeeId);const b=[g.auditorId,g.auditeeId].sort().join("-");f.set(b,(f.get(b)||0)+1)}});const m=u.size,p=f.size,v=m>1?m*(m-1)/2:0,y=v>0?p/v*100:0,O=Array.from(f.values()),D=O.length>0?O.reduce((g,b)=>g+b,0)/O.length:0,I=Math.min(100,m*2+D*5+y*.5);return{uniqueCollaborators:m,totalConnections:p,networkDensity:Math.round(y*10)/10,averageConnectionStrength:Math.round(D*10)/10,influenceScore:Math.round(I),networkSize:m>10?"large":m>5?"medium":"small"}},Mp=(i=[],c)=>{if(!Array.isArray(i)||i.length===0)return{averageTeamGrade:0,teamSuccessRate:0,leadershipEffectiveness:0,teamDiversity:0};const u=i.filter(A=>A.captainId===c),f=i.filter(A=>A.captainId!==c),m=i.map(A=>A.grade||0).filter(A=>A>0),p=m.length>0?m.reduce((A,q)=>A+q,0)/m.length:0,v=i.filter(A=>(A.grade||0)>=1).length,y=i.length>0?v/i.length*100:0,O=u.map(A=>A.grade||0).filter(A=>A>0),D=f.map(A=>A.grade||0).filter(A=>A>0),I=O.length>0?O.reduce((A,q)=>A+q,0)/O.length:0,g=D.length>0?D.reduce((A,q)=>A+q,0)/D.length:0,b=g>0?I/g*100:100,x=new Set;i.forEach(A=>{A.members&&Array.isArray(A.members)&&A.members.forEach(q=>{q.id&&q.id!==c&&x.add(q.id)})});const _=Math.min(100,x.size*10);return{averageTeamGrade:Math.round(p*100)/100,teamSuccessRate:Math.round(y*10)/10,leadershipEffectiveness:Math.round(b),teamDiversity:Math.round(_),teamsLed:u.length,teamsParticipated:i.length,uniqueCollaborators:x.size}},qp=i=>{if(i<1e3)return 0;let c=0,u=0;for(;u<=i;)c++,u=c*(c+1)*500;return c-1},$p=i=>{const c=i+1;return c*(c+1)*500},Gp=(i,c)=>{const u=c*(c+1)*500,f=$p(c),m=i-u,p=f-u;return{current:m,required:p,percentage:p>0?m/p*100:0}},be={SET_LOADING:"SET_LOADING",SET_ERROR:"SET_ERROR",SET_USER_DATA:"SET_USER_DATA",SET_XP_DATA:"SET_XP_DATA",SET_PROJECT_DATA:"SET_PROJECT_DATA",SET_AUDIT_DATA:"SET_AUDIT_DATA",SET_PROGRESS_DATA:"SET_PROGRESS_DATA",SET_SKILL_DATA:"SET_SKILL_DATA",SET_PISCINE_DATA:"SET_PISCINE_DATA",CLEAR_DATA:"CLEAR_DATA",REFRESH_DATA:"REFRESH_DATA"},$m={loading:!1,error:null,user:null,userStatistics:null,totalXP:0,xpByProject:[],xpTimeline:[],xpStatistics:null,totalProjects:0,passedProjects:0,failedProjects:0,passRate:0,projectResults:[],auditRatio:0,auditsGiven:0,auditsReceived:0,auditStatistics:null,totalProgress:0,completedProgress:0,inProgressItems:0,completionRate:0,progressData:[],skills:[],skillStatistics:null,piscineStats:null,performanceTrend:null,difficultyProgression:null,progressVelocity:null,timeManagement:null,learningPathRecommendations:null,collaborationFrequency:null,networkMetrics:null,teamPerformance:null,userLevel:1,levelProgress:{currentLevel:1,progressPercentage:0,xpNeeded:1e3},lastUpdated:null,isStale:!1},zp=(i,c)=>{switch(c.type){case be.SET_LOADING:return{...i,loading:c.payload,error:c.payload?null:i.error};case be.SET_ERROR:return{...i,loading:!1,error:c.payload};case be.SET_USER_DATA:{const u=Tp(c.payload);return{...i,user:c.payload,userStatistics:u,totalXP:u?.totalXP||0,userLevel:u?.userLevel||1,levelProgress:u?.levelProgress||i.levelProgress,lastUpdated:new Date().toISOString(),isStale:!1}}case be.SET_XP_DATA:return{...i,xpStatistics:c.payload,totalXP:c.payload.totalXP||i.totalXP,xpByProject:c.payload.xpByProject||[],xpTimeline:c.payload.timeline||[]};case be.SET_PROJECT_DATA:return{...i,totalProjects:c.payload.totalProjects||0,passedProjects:c.payload.passedProjects||0,failedProjects:c.payload.failedProjects||0,passRate:c.payload.passRate||0,projectResults:c.payload.results||[]};case be.SET_AUDIT_DATA:return{...i,auditRatio:c.payload.auditRatio||0,auditsGiven:c.payload.given?.count||0,auditsReceived:c.payload.received?.count||0,auditStatistics:c.payload};case be.SET_PROGRESS_DATA:return{...i,totalProgress:c.payload.total||0,completedProgress:c.payload.completed||0,inProgressItems:c.payload.inProgress||0,completionRate:c.payload.completionRate||0,progressData:c.payload.data||[]};case be.SET_SKILL_DATA:return{...i,skills:c.payload.skills||[],skillStatistics:c.payload};case be.SET_PISCINE_DATA:return{...i,piscineStats:c.payload};case"SET_ADVANCED_ANALYTICS":return{...i,performanceTrend:c.payload.performanceTrend,difficultyProgression:c.payload.difficultyProgression,progressVelocity:c.payload.progressVelocity,timeManagement:c.payload.timeManagement};case"SET_COLLABORATION_ANALYTICS":return{...i,collaborationFrequency:c.payload.collaborationFrequency,networkMetrics:c.payload.networkMetrics,teamPerformance:c.payload.teamPerformance};case"SET_LEARNING_RECOMMENDATIONS":return{...i,learningPathRecommendations:c.payload};case be.CLEAR_DATA:return{...$m};case be.REFRESH_DATA:return{...i,isStale:!0};default:return i}},Gm=W.createContext(null),Cp=({children:i})=>{const[c,u]=W.useReducer(zp,$m),{user:f,isAuthenticated:m}=Ll(),{data:p,loading:v,error:y,refetch:O}=m0(mp,{variables:{userId:f?.id},skip:!m||!f?.id,...xp("GET_COMPREHENSIVE_USER_ANALYTICS"),onError:g=>{const b=nm(g);console.error("GraphQL Error in DataContext:",b),u({type:be.SET_ERROR,payload:b})}});W.useEffect(()=>{if(!m||!f?.id){u({type:be.CLEAR_DATA});return}if(u({type:be.SET_LOADING,payload:v}),y){u({type:be.SET_ERROR,payload:y});return}if(!v&&p?.user?.[0])try{const g=p.user[0],b=tl(g.profile,{}),x=tl(g.attrs,{}),_=g.xpTransactions?.aggregate?.sum?.amount||0,A=Math.round(el(_)),q=qp(A),B={id:g.id,login:g.login,campus:g.campus,createdAt:g.createdAt,updatedAt:g.updatedAt,profile:b,attrs:x,totalXP:A,level:q,rawData:g};if(u({type:be.SET_USER_DATA,payload:B}),g.transactions){const oe=Om(g.transactions);u({type:be.SET_XP_DATA,payload:{...oe,totalXP:A,level:q,transactions:g.transactions}})}if(g.transactions){const oe=Hc(g.transactions);u({type:be.SET_SKILL_DATA,payload:{skills:oe,totalSkills:oe.length,topSkills:oe.slice(0,5)}})}if(g.progresses){const oe=Im(g.progresses);u({type:be.SET_PROGRESS_DATA,payload:{...oe,data:g.progresses}})}const M=g.results_aggregate?.aggregate?.count||0,X=g.passedResults?.aggregate?.count||0;u({type:be.SET_PROJECT_DATA,payload:{totalProjects:M,passedProjects:X,failedProjects:M-X,passRate:M>0?X/M*100:0,results:g.results||[]}});const V=g.upTransactions?.aggregate?.count||0,ne=g.downTransactions?.aggregate?.count||0,Ue=ne>0?V/ne:V>0?V:0,De=g.audits||[],Te=Np(De,[]);u({type:be.SET_AUDIT_DATA,payload:{auditRatio:Math.round(Ue*100)/100,given:{count:g.audits_aggregate?.aggregate?.count||0,avgGrade:g.audits_aggregate?.aggregate?.avg?.grade||0,...Te.given},received:{count:ne,...Te.received},audits:g.audits||[],...Te}});const ze=g.results?.filter(oe=>oe.path&&(oe.path.includes("piscine")||oe.path.includes("js")||oe.path.includes("go")))||[];if(ze.length>0){const oe=ze.filter(U=>U.path.includes("js")||U.path.includes("javascript")),we=ze.filter(U=>U.path.includes("go")||U.path.includes("golang")),Qe={jsStats:{total:oe.length,passed:oe.filter(U=>U.grade>=1).length,failed:oe.filter(U=>U.grade<1).length,passRate:oe.length>0?oe.filter(U=>U.grade>=1).length/oe.length*100:0},goStats:{total:we.length,passed:we.filter(U=>U.grade>=1).length,failed:we.filter(U=>U.grade<1).length,passRate:we.length>0?we.filter(U=>U.grade>=1).length/we.length*100:0},overall:{total:ze.length,passed:ze.filter(U=>U.grade>=1).length,failed:ze.filter(U=>U.grade<1).length,passRate:ze.length>0?ze.filter(U=>U.grade>=1).length/ze.length*100:0}};u({type:be.SET_PISCINE_DATA,payload:Qe})}if(g.results&&g.results.length>0){const oe=Lc(g.results),we=wp(g.results),Qe=Rp(g.results),U=Ep(g.progresses||[],g.results||[]);u({type:"SET_ADVANCED_ANALYTICS",payload:{performanceTrend:oe,difficultyProgression:we,progressVelocity:Qe,timeManagement:U}})}if(g.groups||g.audits){const oe=Op(g.groups||[]),we=Ip(g.groups||[],g.audits||[]),Qe=Mp(g.groups||[],g.id);u({type:"SET_COLLABORATION_ANALYTICS",payload:{collaborationFrequency:oe,networkMetrics:we,teamPerformance:Qe}})}const Mt=Hc(g.transactions||[]),Ke=Up({skills:Mt,performanceTrend:Lc(g.results||[]),collaborationScore:Mm(Te,{totalGroups:g.groups?.length||0}),totalXP:A});u({type:"SET_LEARNING_RECOMMENDATIONS",payload:Ke})}catch(g){console.error("Error processing user data:",g),u({type:be.SET_ERROR,payload:{type:Et.CLIENT,severity:Xt.MEDIUM,message:"Failed to process user data",userMessage:"There was an issue processing your data. Some features may not work correctly.",originalError:g,timestamp:new Date().toISOString(),retryable:!0}})}},[m,f?.id,p,v,y]);const D=async()=>{u({type:be.SET_LOADING,payload:!0});try{await O()}catch(g){console.error("Error refetching data:",g);const b=nm(g);u({type:be.SET_ERROR,payload:{...b,userMessage:"Failed to refresh your data. Please check your connection and try again.",retryAction:D}})}},I={...c,loading:v,error:y,userData:c.user,xpData:{totalXP:c.totalXP,xpByProject:c.xpByProject,timeline:c.xpTimeline,transactions:c.user?.rawData?.transactions||[]},projectData:{totalProjects:c.totalProjects,passedProjects:c.passedProjects,failedProjects:c.failedProjects,passRate:c.passRate,results:c.projectResults},auditData:{auditRatio:c.auditRatio,given:{count:c.auditsGiven},received:{count:c.auditsReceived},audits:c.auditStatistics?.audits||[]},refetchAll:D,clearData:()=>u({type:be.CLEAR_DATA}),refreshData:()=>u({type:be.REFRESH_DATA})};return n.jsx(Gm.Provider,{value:I,children:i})};function zm(i){return new kc(function(c,u){var f=h0(c,[]);return new cm(function(m){var p,v=!1;return Promise.resolve(f).then(function(y){return i(y,c.getContext())}).then(c.setContext).then(function(){v||(p=u(c).subscribe({next:m.next.bind(m),error:m.error.bind(m),complete:m.complete.bind(m)}))}).catch(m.error.bind(m)),function(){v=!0,p&&p.unsubscribe()}})})}function Cm(i){return new kc(function(c,u){return new cm(function(f){var m,p,v;try{m=u(c).subscribe({next:function(y){if(y.errors?v=i({graphQLErrors:y.errors,response:y,operation:c,forward:u}):g0(y)&&(v=i({protocolErrors:y.extensions[p0],response:y,operation:c,forward:u})),v){p=v.subscribe({next:f.next.bind(f),error:f.error.bind(f),complete:f.complete.bind(f)});return}f.next(y)},error:function(y){if(v=i({operation:c,networkError:y,graphQLErrors:y&&y.result&&y.result.errors||void 0,forward:u}),v){p=v.subscribe({next:f.next.bind(f),error:f.error.bind(f),complete:f.complete.bind(f)});return}f.error(y)},complete:function(){v||f.complete.bind(f)()}})}catch(y){i({networkError:y,operation:c,forward:u}),f.error(y)}return function(){m&&m.unsubscribe(),p&&m.unsubscribe()}})})}(function(i){y0(c,i);function c(u){var f=i.call(this)||this;return f.link=Cm(u),f}return c.prototype.request=function(u,f){return this.link.request(u,f)},c})(kc);const Bp=()=>new x0({typePolicies:{Query:{fields:{user:{keyArgs:["where"],merge(i,c){return c}},transaction:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},progress:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},event:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},group:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},audit:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},result:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},object:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},eventUser:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},groupUser:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},labelUser:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},match:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},objectAvailability:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},progressByPathView:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},record:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},registration:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},registrationUser:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},userRole:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},toadSessions:{keyArgs:["where","order_by"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}}}},user:{keyFields:["id"],fields:{profile:{merge:!0},attrs:{merge:!0},events:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},groups:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},groupsByCaptainid:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},labels:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},matches:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},objectAvailabilities:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},objects:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},progressesByPath:{keyArgs:["where","limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},records:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},recordsByAuthorid:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},registrations:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},user_roles:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},roles:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},sessions:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},xps:{keyArgs:["limit","offset"],merge(i=[],c,{args:u}){return u?.offset&&u.offset>0?[...i,...c]:c}},transactions:{merge:!1},results:{merge:!1},progresses:{merge:!1},transactions_aggregate:{merge:!1},progresses_aggregate:{merge:!1},results_aggregate:{merge:!1},audits_aggregate:{merge:!1},events_aggregate:{merge:!1},groups_aggregate:{merge:!1},groupsByCaptainid_aggregate:{merge:!1},labels_aggregate:{merge:!1},matches_aggregate:{merge:!1},objectAvailabilities_aggregate:{merge:!1},objects_aggregate:{merge:!1},progressesByPath_aggregate:{merge:!1},registrations_aggregate:{merge:!1},user_roles_aggregate:{merge:!1},roles_aggregate:{merge:!1},sessions_aggregate:{merge:!1}}},transaction_aggregate:{merge:!0},result_aggregate:{merge:!0},progress_aggregate:{merge:!0},audit_aggregate:{merge:!0}},possibleTypes:{},dataIdFromObject:i=>{switch(i.__typename){case"User":return`User:${i.id}`;case"Transaction":return`Transaction:${i.id}`;case"Result":return`Result:${i.id}`;case"Progress":return`Progress:${i.id}`;case"Audit":return`Audit:${i.id}`;case"Event":return`Event:${i.id}`;case"Group":return`Group:${i.id}`;case"Object":return`Object:${i.id}`;default:return null}}});class Xp{constructor(){this.metrics=new Map,this.slowQueryThreshold=1e3}startQuery(c,u){const f=`${c}_${Date.now()}_${Math.random()}`;return this.metrics.set(f,{queryName:c,variables:u,startTime:performance.now(),endTime:null,duration:null,error:null}),f}endQuery(c,u=null){const f=this.metrics.get(c);if(f&&(f.endTime=performance.now(),f.duration=f.endTime-f.startTime,f.error=u,f.duration>this.slowQueryThreshold&&console.warn("Slow GraphQL query detected:",{queryName:f.queryName,duration:`${f.duration.toFixed(2)}ms`,variables:f.variables}),this.metrics.size>100)){const m=this.metrics.keys().next().value;this.metrics.delete(m)}}getStats(){const c=Array.from(this.metrics.values()).filter(m=>m.duration!==null);if(c.length===0)return{totalQueries:0,averageDuration:0,slowQueries:0};const u=c.reduce((m,p)=>m+p.duration,0),f=c.filter(m=>m.duration>this.slowQueryThreshold).length;return{totalQueries:c.length,averageDuration:u/c.length,slowQueries:f,slowQueryPercentage:f/c.length*100}}}const Yc=new Xp,Hp=v0({uri:Q0}),Lp=zm((i,{headers:c})=>{const u=F0();return{headers:{...c,...u,"Content-Type":"application/json"}}}),Yp=zm((i,{headers:c})=>{const u=Yc.startQuery("GraphQL Query",{});return{headers:c,queryId:u}}),kp=Cm(({graphQLErrors:i,networkError:c,operation:u})=>{const f=u.getContext().queryId;if(i&&i.forEach(({message:m,locations:p,path:v,extensions:y})=>{if(console.error(`[GraphQL error]: Message: ${m}, Location: ${p}, Path: ${v}`),f&&Yc.endQuery(f,m),m.includes("JWT")||m.includes("JWS")||m.includes("verify")){console.warn("JWT verification error detected, clearing auth data"),Wa();return}if(y?.code==="UNAUTHENTICATED"||y?.code==="FORBIDDEN"){console.warn("Authentication error detected, clearing auth data"),Wa();return}}),c&&(console.error(`[Network error]: ${c}`),f&&Yc.endQuery(f,c.message),c.statusCode===401||c.statusCode===403)){console.warn("Network authentication error, clearing auth data"),Wa();return}}),Bm=new b0({link:j0([kp,Yp,Lp,Hp]),cache:Bp(),defaultOptions:{watchQuery:{errorPolicy:"all",fetchPolicy:"cache-first",nextFetchPolicy:"cache-first",notifyOnNetworkStatusChange:!0},query:{errorPolicy:"all",fetchPolicy:"cache-first",nextFetchPolicy:"cache-only"},mutate:{errorPolicy:"all",fetchPolicy:"no-cache"}},queryDeduplication:!0,connectToDevTools:!1});Bm.clearStore().catch(console.warn);const Qp=()=>{const[i,c]=W.useState({identifier:"",password:""}),[u,f]=W.useState(!1),[m,p]=W.useState("username"),{login:v,isLoading:y,error:O,clearError:D}=Ll();W.useEffect(()=>{i.identifier&&p(ep(i.identifier))},[i.identifier]),W.useEffect(()=>{O&&D()},[i.identifier,i.password,O,D]);const I=x=>{const{name:_,value:A}=x.target;c(q=>({...q,[_]:A}))},g=async x=>{x.preventDefault(),!(!i.identifier.trim()||!i.password.trim())&&await v(i.identifier.trim(),i.password)},b=()=>{f(!u)};return n.jsxs("div",{className:"min-h-screen flex items-center justify-center p-4",children:[n.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900"}),n.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[n.jsx(K.div,{className:"absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl",animate:{scale:[1,1.2,1],opacity:[.3,.5,.3]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),n.jsx(K.div,{className:"absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl",animate:{scale:[1.2,1,1.2],opacity:[.5,.3,.5]},transition:{duration:10,repeat:1/0,ease:"easeInOut"}})]}),n.jsx(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"relative z-10 w-full max-w-md",children:n.jsxs("div",{className:"glass-card p-8",children:[n.jsxs("div",{className:"text-center mb-8",children:[n.jsx(K.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mx-auto mb-4",children:n.jsx(Fd,{className:"w-8 h-8 text-white"})}),n.jsx("h1",{className:"text-3xl font-bold gradient-text mb-2",children:"Welcome Back"}),n.jsx("p",{className:"text-surface-300",children:"Sign in to access your profile dashboard"})]}),O&&n.jsx(K.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg",children:n.jsx("p",{className:"text-red-300 text-sm",children:O})}),n.jsxs("form",{onSubmit:g,className:"space-y-6",children:[n.jsxs("div",{children:[n.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Username or Email"}),n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:m==="email"?n.jsx(um,{className:"h-5 w-5 text-surface-400"}):n.jsx(mr,{className:"h-5 w-5 text-surface-400"})}),n.jsx("input",{type:"text",name:"identifier",value:i.identifier,onChange:I,className:"material-input pl-10 w-full",placeholder:"Enter your username or email",autoComplete:"username",required:!0,disabled:y})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Password"}),n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:n.jsx(S0,{className:"h-5 w-5 text-surface-400"})}),n.jsx("input",{type:u?"text":"password",name:"password",value:i.password,onChange:I,className:"material-input pl-10 pr-10 w-full",placeholder:"Enter your password",autoComplete:"current-password",required:!0,disabled:y}),n.jsx("button",{type:"button",onClick:b,className:"absolute inset-y-0 right-0 pr-3 flex items-center",disabled:y,children:u?n.jsx(_0,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"}):n.jsx(N0,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"})})]})]}),n.jsx(K.button,{type:"submit",disabled:y||!i.identifier.trim()||!i.password.trim(),className:"w-full glass-button py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed",whileHover:{scale:1.02},whileTap:{scale:.98},children:y?n.jsxs("div",{className:"flex items-center justify-center",children:[n.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"}),"Signing in..."]}):n.jsxs("div",{className:"flex items-center justify-center",children:[n.jsx(Fd,{className:"w-5 h-5 mr-2"}),"Sign In"]})})]}),n.jsx("div",{className:"mt-8 text-center",children:n.jsx("p",{className:"text-surface-400 text-sm",children:"Use your reboot01 platform credentials"})})]})})]})},Ks=()=>{const i=W.useContext(Gm);if(!i)throw new Error("useData must be used within a DataProvider");return i},Se=(...i)=>i.filter(Boolean).join(" "),E=({children:i,className:c="",hover:u=!1,animate:f=!0,onClick:m,...p})=>{const v="glass-card p-6",y=u?"card-hover cursor-pointer":"",O=f?K.div:"div",D=f?{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3}}:{};return n.jsx(O,{className:Se(v,y,c),onClick:m,...D,...p,children:i})},Zp=({children:i,className:c=""})=>n.jsx("div",{className:Se("mb-4",c),children:i}),Vp=({children:i,className:c=""})=>n.jsx("h3",{className:Se("text-xl font-semibold text-white mb-2",c),children:i}),Pp=({children:i,className:c=""})=>n.jsx("p",{className:Se("text-surface-300 text-sm",c),children:i}),Kp=({children:i,className:c=""})=>n.jsx("div",{className:Se("",c),children:i}),Jp=({children:i,className:c=""})=>n.jsx("div",{className:Se("mt-4 pt-4 border-t border-white/10",c),children:i});E.Header=Zp;E.Title=Vp;E.Description=Pp;E.Content=Kp;E.Footer=Jp;const Oa=({children:i,variant:c="primary",size:u="md",disabled:f=!1,loading:m=!1,className:p="",onClick:v,type:y="button",...O})=>{const D="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",I={primary:"glass-button",secondary:"bg-surface-700 hover:bg-surface-600 text-white border border-surface-600",outline:"border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white",ghost:"text-surface-300 hover:text-white hover:bg-white/10",danger:"bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"},g={sm:"px-3 py-1.5 text-sm rounded-md",md:"px-4 py-2 text-sm rounded-lg",lg:"px-6 py-3 text-base rounded-lg",xl:"px-8 py-4 text-lg rounded-xl"},b=Se(D,I[c],g[u],p);return n.jsxs(K.button,{type:y,className:b,disabled:f||m,onClick:v,whileHover:{scale:f||m?1:1.02,transition:{type:"spring",stiffness:400,damping:10}},whileTap:{scale:f||m?1:.98,transition:{type:"spring",stiffness:400,damping:10}},initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},...O,children:[m&&n.jsx(K.div,{className:"rounded-full h-4 w-4 border-b-2 border-current mr-2",animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),i]})},Hl=({size:i="md",text:c="",className:u="",fullScreen:f=!1,variant:m="spinner",progress:p=null,error:v=null,retry:y=null})=>{const O={sm:"h-4 w-4",md:"h-8 w-8",lg:"h-12 w-12",xl:"h-16 w-16"},D={sm:"text-sm",md:"text-base",lg:"text-lg",xl:"text-xl"};if(v)return n.jsx("div",{className:Se("flex flex-col items-center justify-center space-y-4 p-6",u),children:n.jsxs("div",{className:"text-red-400 text-center",children:[n.jsx("div",{className:"text-2xl mb-2",children:"⚠️"}),n.jsx("p",{className:Se("text-red-300",D[i]),children:v.userMessage||"Something went wrong"}),y&&n.jsx("button",{onClick:y,className:"mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors",children:"Try Again"})]})});if(m==="progress"&&p!==null)return n.jsx("div",{className:Se("flex flex-col items-center justify-center space-y-4",u),children:n.jsxs("div",{className:"w-full max-w-xs",children:[n.jsxs("div",{className:"flex justify-between text-sm text-surface-300 mb-2",children:[n.jsx("span",{children:c||"Loading..."}),n.jsxs("span",{children:[Math.round(p),"%"]})]}),n.jsx("div",{className:"w-full bg-surface-700 rounded-full h-2",children:n.jsx(K.div,{className:"bg-primary-400 h-2 rounded-full",initial:{width:0},animate:{width:`${p}%`},transition:{duration:.3}})})]})});if(m==="dots")return n.jsxs("div",{className:Se("flex flex-col items-center justify-center space-y-4",u),children:[n.jsx("div",{className:"flex space-x-1",children:[0,1,2].map(b=>n.jsx(K.div,{className:Se("rounded-full bg-primary-400",O[i]),animate:{scale:[1,1.2,1],opacity:[.5,1,.5]},transition:{duration:1.5,repeat:1/0,delay:b*.2}},b))}),c&&n.jsx("p",{className:Se("text-surface-300",D[i]),children:c})]});const I=n.jsx(K.div,{className:Se("animate-spin rounded-full border-b-2 border-primary-400",O[i]),initial:{opacity:0},animate:{opacity:1},transition:{duration:.3}}),g=n.jsxs("div",{className:Se("flex flex-col items-center justify-center space-y-4",u),children:[I,c&&n.jsx(K.p,{className:Se("text-surface-300",D[i]),initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.2},children:c})]});return f?n.jsx(K.div,{initial:{opacity:0},animate:{opacity:1},className:"fixed inset-0 bg-surface-900/50 backdrop-blur-sm flex items-center justify-center z-50",children:g}):g},Ys=({className:i="",...c})=>n.jsx("div",{className:Se("animate-pulse rounded-md bg-surface-700/50",i),...c}),yt=()=>n.jsxs("div",{className:"glass-card p-6 space-y-4",children:[n.jsx(Ys,{className:"h-4 w-3/4"}),n.jsx(Ys,{className:"h-4 w-1/2"}),n.jsxs("div",{className:"space-y-2",children:[n.jsx(Ys,{className:"h-3 w-full"}),n.jsx(Ys,{className:"h-3 w-5/6"}),n.jsx(Ys,{className:"h-3 w-4/6"})]})]});class Xm extends W.Component{constructor(c){super(c),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(c,u){this.setState({error:c,errorInfo:u})}handleRetry=()=>{this.setState({hasError:!1,error:null,errorInfo:null})};handleReload=()=>{window.location.reload()};render(){return this.state.hasError?n.jsx("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 flex items-center justify-center p-4",children:n.jsx(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"max-w-md w-full",children:n.jsx(E,{className:"text-center",children:n.jsxs(E.Content,{children:[n.jsx(K.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4",children:n.jsx(T0,{className:"w-8 h-8 text-red-400"})}),n.jsx("h1",{className:"text-2xl font-bold text-white mb-2",children:"Oops! Something went wrong"}),n.jsx("p",{className:"text-surface-300 mb-6",children:"We encountered an unexpected error. This has been logged and we'll look into it."}),!1,n.jsxs("div",{className:"flex flex-col sm:flex-row gap-3",children:[n.jsxs(Oa,{onClick:this.handleRetry,className:"flex-1",variant:"primary",children:[n.jsx(w0,{className:"w-4 h-4 mr-2"}),"Try Again"]}),n.jsxs(Oa,{onClick:this.handleReload,className:"flex-1",variant:"secondary",children:[n.jsx(R0,{className:"w-4 h-4 mr-2"}),"Reload Page"]})]})]})})})}):this.props.children}}const Fp=({tabs:i=[],activeTab:c,onTabChange:u,className:f=""})=>n.jsx("div",{className:Se("fixed bottom-0 left-0 right-0 z-40 bg-surface-900/95 backdrop-blur-md border-t border-white/10 md:hidden",f),children:n.jsx("div",{className:"flex justify-around items-center py-2",children:i.map(m=>{const p=m.icon,v=c===m.id;return n.jsxs(K.button,{onClick:()=>u(m.id),className:Se("flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative",v?"text-primary-300":"text-surface-400 hover:text-surface-200"),whileTap:{scale:.95},children:[v&&n.jsx(K.div,{className:"absolute -top-1 w-8 h-1 bg-primary-400 rounded-full",layoutId:"activeTab",transition:{type:"spring",stiffness:500,damping:30}}),n.jsx(p,{className:"w-5 h-5 mb-1"}),n.jsx("span",{className:"text-xs font-medium truncate max-w-16",children:m.label.split(" ")[0]})]},m.id)})})}),im=({value:i=0,max:c=100,className:u="",showValue:f=!0,size:m="md",color:p="primary",animated:v=!0,label:y=""})=>{const O=Math.min(Math.max(i/c*100,0),100),D={sm:"h-2",md:"h-3",lg:"h-4",xl:"h-6"},I={primary:"bg-primary-500",secondary:"bg-surface-500",success:"bg-green-500",warning:"bg-yellow-500",danger:"bg-red-500",accent:"bg-accent-500"};return n.jsxs("div",{className:Se("w-full",u),children:[(y||f)&&n.jsxs("div",{className:"flex justify-between items-center mb-2",children:[y&&n.jsx("span",{className:"text-sm font-medium text-surface-200",children:y}),f&&n.jsxs("span",{className:"text-sm text-surface-300",children:[Math.round(O),"%"]})]}),n.jsx("div",{className:Se("w-full bg-surface-700/50 rounded-full overflow-hidden",D[m]),children:n.jsx(K.div,{className:Se("h-full rounded-full",I[p]),initial:v?{width:0}:{width:`${O}%`},animate:{width:`${O}%`},transition:{duration:v?1:0,ease:"easeOut"}})})]})},Wp=({value:i=0,max:c=100,size:u=120,strokeWidth:f=8,className:m="",color:p="primary",showValue:v=!0,label:y=""})=>{const O=Math.min(Math.max(i/c*100,0),100),D=(u-f)/2,I=D*2*Math.PI,g=I,b=I-O/100*I,x={primary:"#14b8a6",secondary:"#64748b",success:"#10b981",warning:"#f59e0b",danger:"#ef4444",accent:"#d946ef"};return n.jsxs("div",{className:Se("relative inline-flex items-center justify-center",m),children:[n.jsxs("svg",{width:u,height:u,className:"transform -rotate-90",children:[n.jsx("circle",{cx:u/2,cy:u/2,r:D,stroke:"rgba(100, 116, 139, 0.2)",strokeWidth:f,fill:"transparent"}),n.jsx(K.circle,{cx:u/2,cy:u/2,r:D,stroke:x[p],strokeWidth:f,fill:"transparent",strokeLinecap:"round",strokeDasharray:g,initial:{strokeDashoffset:I},animate:{strokeDashoffset:b},transition:{duration:1,ease:"easeOut"}})]}),n.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:[v&&n.jsx("span",{className:"text-2xl font-bold text-white",children:Math.round(O)}),y&&n.jsx("span",{className:"text-xs text-surface-300 mt-1",children:y})]})]})},ce=({children:i,variant:c="default",size:u="md",className:f="",animate:m=!1,...p})=>{const v="inline-flex items-center font-medium rounded-full",y={default:"bg-surface-700 text-surface-200",primary:"bg-primary-500/20 text-primary-300 border border-primary-500/30",secondary:"bg-surface-600 text-surface-200",success:"bg-green-500/20 text-green-300 border border-green-500/30",warning:"bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",danger:"bg-red-500/20 text-red-300 border border-red-500/30",accent:"bg-accent-500/20 text-accent-300 border border-accent-500/30",outline:"border border-surface-500 text-surface-300"},O={sm:"px-2 py-0.5 text-xs",md:"px-2.5 py-1 text-sm",lg:"px-3 py-1.5 text-base"},D=Se(v,y[c],O[u],f),I=m?K.span:"span",g=m?{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{type:"spring",stiffness:500,damping:30}}:{};return n.jsx(I,{className:D,...g,...p,children:i})},ey=({status:i,className:c=""})=>{const u=i==="pass"||i==="PASS"||i===!0||i>=1;return n.jsx(ce,{variant:u?"success":"danger",className:c,animate:!0,children:u?"Pass":"Fail"})},ty=({level:i,className:c=""})=>n.jsxs(ce,{variant:"primary",className:c,animate:!0,children:["Level ",i]}),ay=({xp:i,className:c=""})=>n.jsxs(ce,{variant:"accent",className:c,animate:!0,children:[i.toLocaleString()," XP"]}),ly=({user:i,size:c="md",className:u="",showBorder:f=!1,animate:m=!0,onClick:p,...v})=>{const[y,O]=W.useState(!1),D=Em(i),I=Zs(i),g={xs:"w-6 h-6",sm:"w-8 h-8",md:"w-12 h-12",lg:"w-16 h-16",xl:"w-24 h-24","2xl":"w-32 h-32"},b={xs:"w-3 h-3",sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8",xl:"w-12 h-12","2xl":"w-16 h-16"},x=Se("rounded-full flex items-center justify-center overflow-hidden",g[c],f&&"border-2 border-primary-400",p&&"cursor-pointer hover:opacity-80 transition-opacity",u),_=m?K.div:"div",A=m?{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.2},whileHover:p?{scale:1.05}:void 0,whileTap:p?{scale:.95}:void 0}:{},q=()=>{O(!0)};return n.jsx(_,{className:x,onClick:p,title:I,...A,...v,children:D&&!y?n.jsx("img",{src:D,alt:`${I}'s avatar`,className:"w-full h-full object-cover",onError:q,loading:"lazy"}):n.jsx("div",{className:"w-full h-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center",children:n.jsx(mr,{className:Se("text-white",b[c])})})})},sy=()=>{const{userData:i,projectData:c,auditData:u,skills:f,piscineStats:m,loading:p}=Ks(),v=Zs(i)||"Unknown User",y=Um(i)||"No email provided",O=i?.campus||"Unknown Campus",D=i?.createdAt,I=Em(i),g=i?.totalXP||0,b=i?.level||0,x=Gp(g,b),_=c?.passedProjects||0,A=c?.passRate||0,q=u?.auditRatio||0,B=u?.given?.count||0,M=u?.received?.count||0;return p?n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[n.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[n.jsx(yt,{}),n.jsx(yt,{})]}),n.jsxs("div",{className:"space-y-6",children:[n.jsx(yt,{}),n.jsx(yt,{}),n.jsx(yt,{})]})]}):n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[n.jsx("div",{className:"lg:col-span-2",children:n.jsxs(E,{className:"h-full",children:[n.jsx(E.Header,{children:n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx(E.Title,{children:"User Profile"}),n.jsx(ty,{level:b})]})}),n.jsx(E.Content,{children:n.jsxs("div",{className:"flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx(ly,{user:{...i,avatarUrl:I,displayName:v},size:"xl",showBorder:!0,animate:!0})}),n.jsxs("div",{className:"flex-1 space-y-4",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"text-2xl font-bold text-white mb-1",children:v}),n.jsxs("p",{className:"text-surface-300",children:["@",i?.login||"unknown"]})]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[n.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[n.jsx(um,{className:"w-4 h-4"}),n.jsx("span",{className:"text-sm",children:y})]}),n.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[n.jsx(E0,{className:"w-4 h-4"}),n.jsx("span",{className:"text-sm",children:O})]}),n.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[n.jsx(om,{className:"w-4 h-4"}),n.jsxs("span",{className:"text-sm",children:["Joined ",Xc(i?.createdAt)]})]}),n.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[n.jsx(yr,{className:"w-4 h-4"}),n.jsxs("span",{className:"text-sm",children:["Started ",Xc(D)]})]})]}),n.jsxs("div",{className:"flex flex-wrap gap-2",children:[n.jsx(ay,{xp:g}),n.jsxs(ce,{variant:"primary",children:[_," / ",c?.totalProjects||0," Projects"]}),n.jsxs(ce,{variant:"accent",children:["Audit Ratio: ",q.toFixed(2)]}),A>0&&n.jsxs(ce,{variant:"success",children:[Ja(A)," Success Rate"]})]})]})]})})]})}),n.jsxs("div",{className:"space-y-6",children:[n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Fa,{className:"w-5 h-5 mr-2"}),"User Level"]}),n.jsx(E.Description,{children:"Apprentice developer"})]}),n.jsxs(E.Content,{className:"flex flex-col items-center",children:[n.jsx(Wp,{value:x.percentage||0,max:100,size:120,color:"primary",label:`Level ${b}`}),n.jsxs("div",{className:"text-center mt-4 space-y-1",children:[n.jsxs("p",{className:"text-sm text-surface-300",children:[tt(x.required-x.current)," XP to next level"]}),n.jsxs("p",{className:"text-xs text-surface-400",children:[tt(x.current)," / ",tt(x.required)," XP"]})]})]})]}),n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(hr,{className:"w-5 h-5 mr-2"}),"Audits Ratio"]})}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Done"}),n.jsx("span",{className:"text-primary-300 font-semibold",children:B})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Received"}),n.jsx("span",{className:"text-primary-300 font-semibold",children:M})]}),n.jsxs("div",{className:"text-center pt-4 border-t border-white/10",children:[n.jsx("div",{className:"text-3xl font-bold text-primary-300",children:q.toFixed(1)}),n.jsx("p",{className:"text-sm text-surface-400",children:"Best ratio ever!"})]})]})})]}),n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Xl,{className:"w-5 h-5 mr-2"}),"Quick Stats"]})}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-3",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Total XP"}),n.jsx("span",{className:"text-white font-semibold",children:tt(g)})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Projects Passed"}),n.jsx("span",{className:"text-green-400 font-semibold",children:_})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Success Rate"}),n.jsx("span",{className:"text-primary-300 font-semibold",children:Ja(A)})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Audits Given"}),n.jsx("span",{className:"text-accent-300 font-semibold",children:B})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Current Level"}),n.jsxs("span",{className:"text-primary-300 font-semibold",children:["Level ",b]})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Campus"}),n.jsx("span",{className:"text-surface-200 font-medium",children:O})]})]})})]}),f&&f.length>0&&n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Xl,{className:"w-5 h-5 mr-2"}),"Top Skills"]})}),n.jsx(E.Content,{children:n.jsx("div",{className:"space-y-2",children:f.slice(0,5).map((X,V)=>n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300 text-sm",children:X.name}),n.jsx("span",{className:"text-primary-300 font-medium text-sm",children:tt(X.totalXP)})]},X.name||V))})})]}),m&&n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(hr,{className:"w-5 h-5 mr-2"}),"Piscine Performance"]})}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-3",children:[m.jsStats&&m.jsStats.total>0&&n.jsxs("div",{children:[n.jsxs("div",{className:"flex justify-between items-center mb-1",children:[n.jsx("span",{className:"text-surface-300 text-sm",children:"JavaScript"}),n.jsx("span",{className:"text-primary-300 font-medium text-sm",children:Ja(m.jsStats.passRate)})]}),n.jsxs("div",{className:"text-xs text-surface-400",children:[m.jsStats.passed,"/",m.jsStats.total," passed"]})]}),m.goStats&&m.goStats.total>0&&n.jsxs("div",{children:[n.jsxs("div",{className:"flex justify-between items-center mb-1",children:[n.jsx("span",{className:"text-surface-300 text-sm",children:"Go"}),n.jsx("span",{className:"text-primary-300 font-medium text-sm",children:Ja(m.goStats.passRate)})]}),n.jsxs("div",{className:"text-xs text-surface-400",children:[m.goStats.passed,"/",m.goStats.total," passed"]})]})]})})]})]})]})},ny=()=>{const{user:i,isAuthenticated:c}=Ll(),[u,f]=ra.useState([]),[m,p]=ra.useState(!1),[v,y]=ra.useState(null),O=x=>{if(!x)return[];const _=x.results||[],A=x.progress||[];return[..._,...A].map(B=>{const M=D(B);return{...B,status:M,type:B.isDone!==void 0?"progress":"result"}}).sort((B,M)=>new Date(M.updatedAt)-new Date(B.updatedAt))},D=x=>{const _=new Date,A=new Date(x.updatedAt),q=new Date(x.createdAt),B=(_-A)/(1e3*60*60*24),M=(_-q)/(1e3*60*60*24);return x.grade>=1?"finished":M<=7&&x.grade===0?"setup":x.grade===0&&B<=3?"audit":(x.grade===0&&B<=30,"working")},[I]=Qc(hp,{errorPolicy:"all",onCompleted:x=>{const _=O(x);f(_),p(!1)},onError:x=>{y(x),p(!1)}});return{searchResults:u,searchProjects:(x="",_="all",A={})=>{if(!c||!i?.id)return;p(!0),y(null);const{limit:q=20,offset:B=0}=A,M=x&&typeof x=="string"?x.trim():"",X=M?`%${M}%`:"%%",V=Array.isArray(_)?_:_==="all"?["working","audit","setup","finished"]:[_];I({variables:{userId:i.id,status:V,searchTerm:X,limit:q,offset:B,campus:"Bahrain"}})},filterByStatus:x=>x==="all"?u:u.filter(_=>_.status===x),loading:m,error:v,statusCounts:{all:u.length,working:u.filter(x=>x.status==="working").length,audit:u.filter(x=>x.status==="audit").length,setup:u.filter(x=>x.status==="setup").length,finished:u.filter(x=>x.status==="finished").length}}},ry=()=>{const{user:i,isAuthenticated:c}=Ll(),[u,f]=ra.useState([]),[m,p]=ra.useState(!1),[v,y]=ra.useState(null),O=_=>{if(!_)return[];const A=(_.audits_given||[]).map(B=>({...B,type:"given",status:D(B)})),q=(_.audits_received||[]).map(B=>({...B,type:"received",status:D(B)}));return[...A,...q].sort((B,M)=>new Date(M.createdAt)-new Date(B.createdAt))},D=_=>{const A=new Date,q=new Date(_.createdAt),B=_.endAt?new Date(_.endAt):null,M=(A-q)/(1e3*60*60*24);return B?"finished":M<=1?"setup":!B&&M<=7?"working":"audit"},[I]=Qc(gp,{errorPolicy:"all",onCompleted:_=>{const A=O(_);f(A),p(!1)},onError:_=>{y(_),p(!1)}});return{searchResults:u,searchAudits:(_="",A="all",q={})=>{if(!c||!i?.id)return;p(!0),y(null);const{limit:B=20,offset:M=0}=q,X=_&&typeof _=="string"?_.trim():"",V=X?`%${X}%`:"%%",ne=Array.isArray(A)?A:A==="all"?["working","audit","setup","finished"]:[A];I({variables:{userId:i.id,status:ne,searchTerm:V,limit:B,offset:M,campus:"Bahrain"}})},filterByStatus:_=>_==="all"?u:u.filter(A=>A.status===_),filterByType:_=>_==="all"?u:u.filter(A=>A.type===_),loading:m,error:v,statusCounts:{all:u.length,working:u.filter(_=>_.status==="working").length,audit:u.filter(_=>_.status==="audit").length,setup:u.filter(_=>_.status==="setup").length,finished:u.filter(_=>_.status==="finished").length},typeCounts:{all:u.length,given:u.filter(_=>_.type==="given").length,received:u.filter(_=>_.type==="received").length}}},iy=()=>{const[i,c]=ra.useState([]),[u,f]=ra.useState(!1),[m,p]=ra.useState(null),v=b=>b?.users?b.users.map(x=>{const _=y(x),A=x.recent_transactions?.reduce((B,M)=>B+M.amount,0)||0,q=x.recent_results?.length>0;return{...x,status:_,totalXP:A,recentActivity:q,lastActive:x.recent_results?.[0]?.updatedAt||x.updatedAt}}):[],y=b=>{const x=new Date,_=new Date(b.updatedAt),A=(x-_)/(1e3*60*60*24),q=b.recent_results||[];if(q.some(ne=>{const Ue=new Date(ne.updatedAt);return(x-Ue)/(1e3*60*60*24)<=7}))return"working";const M=new Date(b.createdAt);return(x-M)/(1e3*60*60*24)<=30&&q.length<=2?"setup":q.length>0&&A<=30?"audit":q.filter(ne=>ne.grade>=1).length>=3?"finished":"working"},[O]=Qc(pp,{errorPolicy:"all",onCompleted:b=>{const x=v(b);c(x),f(!1)},onError:b=>{p(b),f(!1)}});return{searchResults:i,searchUsers:(b="",x="all",_={})=>{f(!0),p(null);const{limit:A=20,offset:q=0}=_,B=b&&typeof b=="string"?b.trim():"",M=B?`%${B}%`:"%%";O({variables:{searchTerm:M,status:x,campus:"%Bahrain%",limit:A,offset:q}})},filterByStatus:b=>b==="all"?i:i.filter(x=>x.status===b),filterByCampus:b=>!b||b==="all"?i:i.filter(x=>x.campus&&x.campus.toLowerCase().includes(b.toLowerCase())),loading:u,error:m,statusCounts:{all:i.length,working:i.filter(b=>b.status==="working").length,audit:i.filter(b=>b.status==="audit").length,setup:i.filter(b=>b.status==="setup").length,finished:i.filter(b=>b.status==="finished").length},campuses:[...new Set(i.map(b=>b.campus).filter(Boolean))]}},cy=({result:i,type:c})=>{const u=v=>{switch(v){case"working":return"text-blue-400 bg-blue-400/10";case"audit":return"text-yellow-400 bg-yellow-400/10";case"setup":return"text-purple-400 bg-purple-400/10";case"finished":return"text-green-400 bg-green-400/10";default:return"text-surface-400 bg-surface-400/10"}},f=v=>{switch(v){case"working":return yr;case"audit":return fm;case"setup":return dm;case"finished":return Zc;default:return Qs}},m=v=>new Date(v).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"}),p=f(i.status);return n.jsxs(K.div,{className:"flex items-center justify-between p-4 bg-surface-800 rounded-lg hover:bg-surface-700 transition-colors duration-200",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},children:[n.jsx("div",{className:"flex-1",children:n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx(p,{className:`w-4 h-4 ${u(i.status).split(" ")[0]}`}),n.jsxs("div",{children:[n.jsx("h4",{className:"font-medium text-white",children:c==="users"?i.login:i.object?.name||i.path?.split("/").pop()||"Unknown"}),n.jsx("p",{className:"text-sm text-surface-400",children:c==="users"?i.campus||"No campus":i.path||"No path"})]})]})}),n.jsxs("div",{className:"flex items-center space-x-3",children:[n.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${u(i.status)}`,children:i.status}),c==="projects"&&n.jsxs("span",{className:"text-sm text-surface-300",children:["Grade: ",i.grade||0]}),c==="audits"&&n.jsx("span",{className:"text-sm text-surface-300",children:i.type==="given"?"Given":"Received"}),c==="users"&&i.totalXP&&n.jsxs("span",{className:"text-sm text-surface-300",children:[i.totalXP," XP"]}),n.jsx("span",{className:"text-xs text-surface-500",children:m(i.updatedAt||i.createdAt)})]})]})},uy=()=>{const[i,c]=W.useState("projects"),[u,f]=W.useState(""),[m,p]=W.useState(""),[v,y]=W.useState("all"),[O,D]=W.useState(""),{searchResults:I,searchProjects:g,filterByStatus:b,statusCounts:x,loading:_}=ny(),{searchResults:A,searchAudits:q,filterByStatus:B,statusCounts:M,loading:X}=ry(),{searchResults:V,searchUsers:ne,filterByStatus:Ue,statusCounts:De,campuses:Q,loading:Te}=iy(),ze=W.useRef({});ze.current={searchProjects:g,searchAudits:q,searchEnhancedUsers:ne};const Mt=[{value:"all",label:"All Status",icon:Qs,color:"text-surface-400"},{value:"working",label:"Working",icon:yr,color:"text-blue-400"},{value:"audit",label:"In Audit",icon:fm,color:"text-yellow-400"},{value:"setup",label:"Setup",icon:dm,color:"text-purple-400"},{value:"finished",label:"Finished",icon:Zc,color:"text-green-400"}],Ke=[{value:"projects",label:"Projects",icon:Fa},{value:"audits",label:"Audits",icon:gr},{value:"users",label:"Users",icon:na}],oe=["All Campuses",...Q||[]],we=W.useCallback(()=>{const k=m||u,{searchProjects:Je,searchAudits:Lt,searchEnhancedUsers:vt}=ze.current;switch(i){case"projects":Je(k,v==="all"?["working","audit","setup","finished"]:[v]);break;case"audits":Lt(k,v==="all"?["working","audit","setup","finished"]:[v]);break;case"users":vt(k,v);break}},[i,m,u,v]);W.useEffect(()=>{const k=setTimeout(()=>{p(u)},500);return()=>clearTimeout(k)},[u]),W.useEffect(()=>{(m.trim()||v!=="all")&&we()},[m,v,i,we]);const Qe=k=>{y(k),setTimeout(()=>{we()},100)},U=k=>{c(k),f(""),p(""),y("all"),D("")},H=()=>{f(""),p(""),y("all"),D("")},J=k=>{D(k==="All Campuses"?"":k),setTimeout(()=>{we()},100)},xe=()=>{const Je=fe().length;switch(i){case"projects":g(u,v,{offset:Je});break;case"audits":q(u,v,{offset:Je});break;case"users":ne(u,v,O,{offset:Je});break}},fe=()=>{switch(i){case"projects":return v==="all"?I:b(v);case"audits":return v==="all"?A:B(v);case"users":return v==="all"?V:Ue(v);default:return[]}},Xe=()=>{switch(i){case"projects":return _;case"audits":return X;case"users":return Te;default:return!1}},_e=()=>{switch(i){case"projects":return x;case"audits":return M;case"users":return De;default:return{all:0,working:0,audit:0,setup:0,finished:0}}},re=fe(),Re=Xe(),xt=_e();return n.jsxs("div",{className:"space-y-6",children:[n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center text-primary-300",children:[n.jsx(na,{className:"w-5 h-5 mr-2"}),"Enhanced Search with Status Filtering"]}),n.jsx(E.Description,{children:"Search projects, audits, and users with selective status filtering: working, audit, setup, finished"})]}),n.jsxs(E.Content,{className:"space-y-6",children:[n.jsx("div",{className:"flex space-x-1 bg-surface-800 p-1 rounded-lg",children:Ke.map(k=>{const Je=k.icon;return n.jsxs("button",{onClick:()=>U(k.value),className:`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${i===k.value?"bg-primary-500 text-white shadow-lg":"text-surface-300 hover:text-white hover:bg-surface-700"}`,children:[n.jsx(Je,{className:"w-4 h-4 mr-2"}),k.label]},k.value)})}),n.jsxs("div",{className:"flex space-x-4",children:[n.jsxs("div",{className:"flex-1",children:[n.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Search Term"}),n.jsxs("div",{className:"relative",children:[n.jsx(na,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),n.jsx("input",{type:"text",value:u,onChange:k=>f(k.target.value),onKeyDown:k=>k.key==="Enter"&&we(),placeholder:`Search ${i}... (auto-search enabled)`,className:"material-input pl-10 pr-10 w-full"}),u&&n.jsx("button",{onClick:H,className:"absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-200 transition-colors",children:"✕"})]})]}),i==="users"&&n.jsxs("div",{className:"w-48",children:[n.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Campus"}),n.jsxs("select",{value:O,onChange:k=>D(k.target.value),className:"material-input w-full",children:[n.jsx("option",{value:"",children:"All Campuses"}),Q.map(k=>n.jsx("option",{value:k,children:k},k))]})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-3",children:"Filter by Status"}),n.jsx("div",{className:"flex flex-wrap gap-2",children:Mt.map(k=>{const Je=k.icon,Lt=xt[k.value]||0,vt=v===k.value;return n.jsxs(K.button,{onClick:()=>Qe(k.value),className:`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${vt?"bg-primary-500 text-white shadow-lg":"bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-white"}`,whileHover:{scale:1.05},whileTap:{scale:.95},children:[n.jsx(Je,{className:`w-4 h-4 mr-2 ${vt?"text-white":k.color}`}),k.label,Lt>0&&n.jsx("span",{className:`ml-2 px-2 py-0.5 rounded-full text-xs ${vt?"bg-white/20":"bg-surface-600"}`,children:Lt})]},k.value)})})]}),n.jsx("div",{className:"flex justify-end",children:n.jsx(Oa,{onClick:we,disabled:Re,className:"px-6",children:Re?n.jsxs(n.Fragment,{children:[n.jsx(Hl,{className:"w-4 h-4 mr-2"}),"Searching..."]}):n.jsxs(n.Fragment,{children:[n.jsx(na,{className:"w-4 h-4 mr-2"}),"Search ",i]})})})]})]}),(re.length>0||Re)&&n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center justify-between",children:[n.jsx("span",{children:"Search Results"}),n.jsxs("span",{className:"text-sm text-surface-400",children:[re.length," ",i," found"]})]})}),n.jsx(E.Content,{children:Re?n.jsxs("div",{className:"flex items-center justify-center py-8",children:[n.jsx(Hl,{className:"w-6 h-6 mr-2"}),n.jsxs("span",{children:["Searching ",i,"..."]})]}):n.jsx("div",{className:"space-y-3 max-h-96 overflow-y-auto",children:re.map((k,Je)=>n.jsx(cy,{result:k,type:i},k.id||Je))})})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[i==="users"&&n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center text-primary-300",children:[n.jsx(gr,{className:"w-5 h-5 mr-2"}),"Campus Filter"]})}),n.jsx(E.Content,{className:"space-y-4",children:n.jsxs("div",{children:[n.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Select Campus"}),n.jsx("div",{className:"relative",children:n.jsx("select",{value:O||"All Campuses",onChange:k=>J(k.target.value),className:"material-input w-full appearance-none",children:oe.map(k=>n.jsx("option",{value:k,className:"bg-surface-800",children:k},k))})})]})})]}),fe().length>0&&n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center text-primary-300",children:[n.jsx(Fa,{className:"w-5 h-5 mr-2"}),"Load More Results"]})}),n.jsx(E.Content,{children:n.jsxs("div",{className:"text-center",children:[n.jsxs("p",{className:"text-surface-300 text-sm mb-4",children:["Showing ",fe().length," results. Load more to see additional items."]}),n.jsxs(Oa,{onClick:xe,className:"w-full",disabled:Xe(),children:[n.jsx(Fa,{className:"w-4 h-4 mr-2"}),"Load More"]})]})})]})]}),n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Qs,{className:"w-5 h-5 mr-2"}),"Search Tips"]})}),n.jsx(E.Content,{children:n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[n.jsxs("div",{children:[n.jsx("h4",{className:"font-medium text-white mb-2",children:"Project Search"}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Search your projects by name and filter by status (working, audit, setup, finished)."})]}),n.jsxs("div",{children:[n.jsx("h4",{className:"font-medium text-white mb-2",children:"Audit Search"}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Find audits you've given or received. Filter by status to see current audit activities."})]}),n.jsxs("div",{children:[n.jsx("h4",{className:"font-medium text-white mb-2",children:"User Search"}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Search for other users by login or name. Filter by campus to find local peers."})]})]})})]})]})},oy=({data:i=[],width:c=600,height:u=300,className:f=""})=>{const m={top:20,right:30,bottom:40,left:60},p=c-m.left-m.right,v=u-m.top-m.bottom,y=W.useMemo(()=>i||[],[i]),{xScale:O,yScale:D,maxY:I}=W.useMemo(()=>{if(y.length===0)return{xScale:()=>0,yScale:()=>0,maxY:0};const A=Math.max(...y.map(V=>V.cumulative)),q=new Date(Math.min(...y.map(V=>new Date(V.date)))),B=new Date(Math.max(...y.map(V=>new Date(V.date))));return{xScale:V=>(new Date(V)-q)/(B-q)*p,yScale:V=>v-V/A*v,maxY:A}},[y,p,v]),g=W.useMemo(()=>y.length===0?"":y.map((A,q)=>{const B=O(A.date),M=D(A.cumulative);return`${q===0?"M":"L"} ${B} ${M}`}).join(" "),[y,O,D]),b=W.useMemo(()=>{if(y.length===0)return"";const A=g,q=y[0],B=y[y.length-1];return`${A} L ${O(B.date)} ${v} L ${O(q.date)} ${v} Z`},[g,y,O,v]),x=W.useMemo(()=>{const q=[];for(let B=0;B<=5;B++){const M=I/5*B;q.push({value:Math.round(M),y:D(M)})}return q},[I,D]),_=W.useMemo(()=>{if(y.length===0)return[];const A=Math.min(6,y.length),q=Math.floor(y.length/A),B=[];for(let M=0;M<y.length;M+=q){const X=y[M];B.push({label:new Date(X.date).toLocaleDateString("en-US",{month:"short"}),x:O(X.date)})}return B},[y,O]);return n.jsx("div",{className:`w-full ${f}`,children:n.jsxs("svg",{width:c,height:u,className:"overflow-visible",children:[n.jsxs("defs",{children:[n.jsxs("linearGradient",{id:"xpGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.3"}),n.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.05"})]}),n.jsxs("filter",{id:"glow",children:[n.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),n.jsxs("feMerge",{children:[n.jsx("feMergeNode",{in:"coloredBlur"}),n.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),n.jsxs("g",{transform:`translate(${m.left}, ${m.top})`,children:[x.map((A,q)=>n.jsx("line",{x1:0,y1:A.y,x2:p,y2:A.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},q)),n.jsx(K.path,{d:b,fill:"url(#xpGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),n.jsx(K.path,{d:g,fill:"none",stroke:"#14b8a6",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),y.map((A,q)=>n.jsx(K.circle,{cx:O(A.date),cy:D(A.cumulative),r:"4",fill:"#14b8a6",stroke:"#ffffff",strokeWidth:"2",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:.1*q},className:"cursor-pointer hover:r-6 transition-all",children:n.jsx("title",{children:`${new Date(A.date).toLocaleDateString()}: ${(A.cumulative||0).toLocaleString()} XP`})},q)),n.jsx("line",{x1:0,y1:0,x2:0,y2:v,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),n.jsx("line",{x1:0,y1:v,x2:p,y2:v,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),x.map((A,q)=>n.jsx("text",{x:-10,y:A.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:(A.value||0).toLocaleString()},q)),_.map((A,q)=>n.jsx("text",{x:A.x,y:v+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:A.label},q)),n.jsx("text",{x:p/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"XP Progress Over Time"}),n.jsx("text",{x:-40,y:v/2,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",transform:`rotate(-90, -40, ${v/2})`,children:"Experience Points"})]})]})})},fy=({passedProjects:i=15,failedProjects:c=3,size:u=200,className:f=""})=>{const m=i+c,p=u/2-20,v=u/2,{passedPath:y,failedPath:O}=W.useMemo(()=>{if(m===0)return{passedAngle:0,failedAngle:0,passedPath:"",failedPath:""};const b=i/m*360,x=c/m*360,_=(B,M,X,V)=>{const ne=D(V,V,X,M),Ue=D(V,V,X,B),De=M-B<=180?"0":"1";return["M",V,V,"L",ne.x,ne.y,"A",X,X,0,De,0,Ue.x,Ue.y,"Z"].join(" ")},A=_(0,b,p,v),q=_(b,b+x,p,v);return{passedAngle:b,failedAngle:x,passedPath:A,failedPath:q}},[i,c,m,p,v]);function D(b,x,_,A){const q=(A-90)*Math.PI/180;return{x:b+_*Math.cos(q),y:x+_*Math.sin(q)}}const I=m>0?Math.round(i/m*100):0,g=m>0?Math.round(c/m*100):0;return m===0?n.jsx("div",{className:`flex items-center justify-center ${f}`,style:{width:u,height:u},children:n.jsxs("div",{className:"text-center text-surface-400",children:[n.jsx("div",{className:"w-16 h-16 border-4 border-surface-600 rounded-full mx-auto mb-2"}),n.jsx("p",{className:"text-sm",children:"No project data"})]})}):n.jsxs("div",{className:`relative ${f}`,style:{width:u,height:u},children:[n.jsxs("svg",{width:u,height:u,className:"transform -rotate-90",children:[n.jsx("defs",{children:n.jsxs("filter",{id:"pieGlow",children:[n.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),n.jsxs("feMerge",{children:[n.jsx("feMergeNode",{in:"coloredBlur"}),n.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),n.jsx(K.path,{d:y,fill:"#10b981",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.2},className:"hover:brightness-110 cursor-pointer",children:n.jsx("title",{children:`Passed: ${i} projects (${I}%)`})}),n.jsx(K.path,{d:O,fill:"#ef4444",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},className:"hover:brightness-110 cursor-pointer",children:n.jsx("title",{children:`Failed: ${c} projects (${g}%)`})}),n.jsx("circle",{cx:v,cy:v,r:p*.6,fill:"rgba(15, 23, 42, 0.9)",stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"})]}),n.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center text-center",children:[n.jsxs("div",{className:"text-2xl font-bold text-white",children:[I,"%"]}),n.jsx("div",{className:"text-xs text-surface-300 mt-1",children:"Success Rate"})]}),n.jsxs("div",{className:"absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 text-xs",children:[n.jsxs("div",{className:"flex items-center space-x-1",children:[n.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"}),n.jsxs("span",{className:"text-surface-300",children:["Passed (",i,")"]})]}),n.jsxs("div",{className:"flex items-center space-x-1",children:[n.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),n.jsxs("span",{className:"text-surface-300",children:["Failed (",c,")"]})]})]})]})},dy=({auditsGiven:i=0,auditsReceived:c=0,width:u=400,height:f=250,className:m=""})=>{const p={top:20,right:30,bottom:60,left:60},v=u-p.left-p.right,y=f-p.top-p.bottom,O=[{label:"Audits Given",value:i||0,color:"#14b8a6"},{label:"Audits Received",value:c||0,color:"#d946ef"}],D=Math.max(...O.map(A=>A.value),1),I=v/O.length*.6,g=v/O.length,b=W.useCallback(A=>D===0||isNaN(D)||isNaN(A)?y:y-A/D*y,[y,D]),x=W.useMemo(()=>{const q=[];for(let B=0;B<=5;B++){const M=Math.round(D/5*B);q.push({value:M,y:b(M)})}return q},[D,b]),_=c>0?(i/c).toFixed(1):"∞";return n.jsx("div",{className:`w-full ${m}`,children:n.jsxs("svg",{width:u,height:f,className:"overflow-visible",children:[n.jsxs("defs",{children:[n.jsxs("linearGradient",{id:"givenGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.8"}),n.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.4"})]}),n.jsxs("linearGradient",{id:"receivedGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:"#d946ef",stopOpacity:"0.8"}),n.jsx("stop",{offset:"100%",stopColor:"#d946ef",stopOpacity:"0.4"})]}),n.jsxs("filter",{id:"barGlow",children:[n.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),n.jsxs("feMerge",{children:[n.jsx("feMergeNode",{in:"coloredBlur"}),n.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),n.jsxs("g",{transform:`translate(${p.left}, ${p.top})`,children:[x.map((A,q)=>n.jsx("line",{x1:0,y1:A.y,x2:v,y2:A.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},q)),O.map((A,q)=>{const B=q*g+(g-I)/2,M=y-b(A.value),X=q===0?"givenGradient":"receivedGradient";return n.jsxs("g",{children:[n.jsx(K.rect,{x:B,y:b(A.value),width:I,height:M,fill:`url(#${X})`,stroke:A.color,strokeWidth:"2",rx:"4",filter:"url(#barGlow)",initial:{height:0,y},animate:{height:M,y:b(A.value)},transition:{duration:1,delay:q*.2,ease:"easeOut"},className:"hover:brightness-110 cursor-pointer",children:n.jsx("title",{children:`${A.label}: ${A.value}`})}),n.jsx(K.text,{x:B+I/2,y:b(A.value)-8,textAnchor:"middle",fill:"white",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:q*.2+.5},children:A.value}),n.jsx("text",{x:B+I/2,y:y+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:A.label.split(" ")[0]}),n.jsx("text",{x:B+I/2,y:y+35,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:A.label.split(" ")[1]})]},q)}),n.jsx("line",{x1:0,y1:0,x2:0,y2:y,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),n.jsx("line",{x1:0,y1:y,x2:v,y2:y,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),x.map((A,q)=>n.jsx("text",{x:-10,y:A.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:A.value},q)),n.jsx("text",{x:v/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"Audit Statistics"}),n.jsxs("g",{transform:`translate(${v-80}, 20)`,children:[n.jsx("rect",{x:0,y:0,width:80,height:40,fill:"rgba(255, 255, 255, 0.1)",stroke:"rgba(255, 255, 255, 0.2)",strokeWidth:"1",rx:"4"}),n.jsx("text",{x:40,y:15,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"10",fontFamily:"Inter, sans-serif",children:"Ratio"}),n.jsx("text",{x:40,y:32,textAnchor:"middle",fill:"#14b8a6",fontSize:"16",fontWeight:"700",fontFamily:"Inter, sans-serif",children:_})]})]})]})})},my=({data:i=[],width:c=600,height:u=400,maxBars:f=15,className:m=""})=>{const p=W.useMemo(()=>{if(!i||i.length===0)return[];try{const g=i.filter(_=>!(!_||_.totalXP==null||isNaN(_.totalXP)||_.totalXP<=0||!_.name&&!_.projectName&&!_.object?.name));if(g.length===0)return[];const b=g.slice(0,f),x=Math.max(...b.map(_=>_.totalXP));return x===0||isNaN(x)?[]:b.map((_,A)=>({..._,name:_.name||_.projectName||_.object?.name||"Unknown Project",percentage:_.totalXP/x*100,index:A}))}catch(g){return console.error("Error processing XP by project data:",g),[]}},[i,f]),v={top:20,right:80,bottom:40,left:200},y=c-v.left-v.right,O=u-v.top-v.bottom,D=Math.max(20,O/Math.max(p.length,1)-4),I=(g,b=25)=>g?g.length>b?`${g.substring(0,b)}...`:g:"Unknown Project";return p.length?n.jsx("div",{className:m,children:n.jsxs("svg",{width:c,height:u,className:"overflow-visible",children:[n.jsxs("defs",{children:[n.jsxs("linearGradient",{id:"xpBarGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[n.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.8"}),n.jsx("stop",{offset:"100%",stopColor:"rgb(147, 51, 234)",stopOpacity:"0.9"})]}),n.jsx("filter",{id:"barShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:n.jsx("feDropShadow",{dx:"2",dy:"2",stdDeviation:"3",floodOpacity:"0.3"})})]}),n.jsxs("text",{x:c/2,y:15,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:["XP Earned by Project (Top ",p.length,")"]}),n.jsxs("g",{transform:`translate(${v.left}, ${v.top})`,children:[[0,25,50,75,100].map(g=>n.jsxs("g",{children:[n.jsx("line",{x1:g/100*y,y1:0,x2:g/100*y,y2:O,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),n.jsxs("text",{x:g/100*y,y:O+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:[g,"%"]})]},g)),p.map((g,b)=>{const x=b*(D+4),_=g.percentage/100*y;return n.jsxs("g",{children:[n.jsx("text",{x:-10,y:x+D/2,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-200 text-xs font-medium",children:I(g.name)}),n.jsx("rect",{x:0,y:x,width:y,height:D,fill:"rgb(30, 41, 59)",rx:"4"}),n.jsx(K.rect,{x:0,y:x,width:_,height:D,fill:"url(#xpBarGradient)",filter:"url(#barShadow)",rx:"4",initial:{width:0},animate:{width:_},transition:{duration:.8,delay:b*.1,ease:"easeOut"}}),n.jsxs(K.text,{x:_+8,y:x+D/2,dominantBaseline:"middle",className:"fill-surface-100 text-xs font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:b*.1+.3},children:[tt(g.totalXP)," XP"]}),n.jsx(K.rect,{x:0,y:x,width:y,height:D,fill:"transparent",className:"cursor-pointer",whileHover:{fill:"rgba(59, 130, 246, 0.1)"},transition:{duration:.2}})]},g.path||b)}),n.jsx("text",{x:-180,y:O/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -180, ${O/2})`,className:"fill-surface-300 text-sm font-medium",children:"Projects"}),n.jsx("text",{x:y/2,y:O+35,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Relative XP Distribution (%)"})]}),n.jsxs("g",{transform:`translate(${c-70}, 30)`,children:[n.jsx("rect",{x:0,y:0,width:12,height:8,fill:"url(#xpBarGradient)",rx:"2"}),n.jsx("text",{x:18,y:6,dominantBaseline:"middle",className:"fill-surface-300 text-xs",children:"XP Earned"})]})]})}):n.jsx("div",{className:`flex items-center justify-center ${m}`,style:{width:c,height:u},children:n.jsxs("div",{className:"text-center text-surface-400",children:[n.jsx("div",{className:"text-lg mb-2",children:"📊"}),n.jsx("div",{children:"No project data available"})]})})},hy=({data:i=[],width:c=700,height:u=400,className:f=""})=>{const m=W.useMemo(()=>{if(!i||i.length===0)return{points:[],maxXP:0,dateRange:null};try{const x=i.filter(M=>{if(!M||!M.date)return!1;const X=new Date(M.date);return!(isNaN(X.getTime())||M.cumulativeXP==null||isNaN(M.cumulativeXP)||M.cumulativeXP<0)});if(x.length===0)return{points:[],maxXP:0,dateRange:null};const _=[...x].sort((M,X)=>new Date(M.date)-new Date(X.date)),A=Math.max(..._.map(M=>M.cumulativeXP)),q=new Date(_[0].date),B=new Date(_[_.length-1].date);return{points:_,maxXP:isNaN(A)||A<0?0:A,dateRange:{min:q,max:B}}}catch(x){return console.error("Error processing XP timeline data:",x),{points:[],maxXP:0,dateRange:null}}},[i]),p={top:30,right:60,bottom:60,left:80},v=c-p.left-p.right,y=u-p.top-p.bottom,O=x=>Xc(x,{month:"short",day:"numeric",year:"2-digit"}),D=x=>x.length===0||!m.dateRange||m.maxXP===0?"":x.map((A,q)=>{const B=m.dateRange.max-m.dateRange.min;if(B===0)return q===0?`M 0 ${y}`:`L 0 ${y}`;const M=(new Date(A.date)-m.dateRange.min)/B*v,X=y-A.cumulativeXP/m.maxXP*y,V=isNaN(M)?0:Math.max(0,Math.min(v,M)),ne=isNaN(X)?y:Math.max(0,Math.min(y,X));return q===0?`M ${V} ${ne}`:`L ${V} ${ne}`}).join(" "),I=x=>{if(x.length===0||!m.dateRange)return"";const _=D(x);if(!_)return"";const A=x[x.length-1],q=m.dateRange.max-m.dateRange.min;if(q===0)return`${_} L 0 ${y} L 0 ${y} Z`;const B=(new Date(A.date)-m.dateRange.min)/q*v,M=isNaN(B)?0:Math.max(0,Math.min(v,B));return`${_} L ${M} ${y} L 0 ${y} Z`};if(!m.points.length)return n.jsx("div",{className:`flex items-center justify-center ${f}`,style:{width:c,height:u},children:n.jsxs("div",{className:"text-center text-surface-400",children:[n.jsx("div",{className:"text-lg mb-2",children:"📈"}),n.jsx("div",{children:"No timeline data available"})]})});const g=D(m.points),b=I(m.points);return n.jsx("div",{className:f,children:n.jsxs("svg",{width:c,height:u,className:"overflow-visible",children:[n.jsxs("defs",{children:[n.jsxs("linearGradient",{id:"xpTimelineGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[n.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.3"}),n.jsx("stop",{offset:"100%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.05"})]}),n.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[n.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)"}),n.jsx("stop",{offset:"50%",stopColor:"rgb(147, 51, 234)"}),n.jsx("stop",{offset:"100%",stopColor:"rgb(236, 72, 153)"})]}),n.jsxs("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[n.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),n.jsxs("feMerge",{children:[n.jsx("feMergeNode",{in:"coloredBlur"}),n.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),n.jsx("text",{x:c/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"XP Progression Over Time"}),n.jsxs("g",{transform:`translate(${p.left}, ${p.top})`,children:[[0,.25,.5,.75,1].map(x=>{const _=y-x*y,A=x*m.maxXP;return n.jsxs("g",{children:[n.jsx("line",{x1:0,y1:_,x2:v,y2:_,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),n.jsx("text",{x:-10,y:_,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-400 text-xs",children:tt(A)})]},x)}),m.dateRange&&[0,.25,.5,.75,1].map(x=>{const _=x*v,A=new Date(m.dateRange.min.getTime()+x*(m.dateRange.max.getTime()-m.dateRange.min.getTime()));return n.jsxs("g",{children:[n.jsx("line",{x1:_,y1:0,x2:_,y2:y,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),n.jsx("text",{x:_,y:y+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:O(A)})]},x)}),n.jsx(K.path,{d:b,fill:"url(#xpTimelineGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),n.jsx(K.path,{d:g,fill:"none",stroke:"url(#lineGradient)",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),m.points.map((x,_)=>{const A=(new Date(x.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*v,q=y-x.cumulativeXP/m.maxXP*y;return n.jsxs(K.g,{children:[n.jsx(K.circle,{cx:A,cy:q,r:"4",fill:"rgb(59, 130, 246)",stroke:"white",strokeWidth:"2",className:"cursor-pointer",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:_/m.points.length*2+.5},whileHover:{scale:1.5}}),n.jsxs(K.g,{initial:{opacity:0},whileHover:{opacity:1},transition:{duration:.2},children:[n.jsx("rect",{x:A-60,y:q-40,width:"120",height:"30",fill:"rgb(30, 41, 59)",stroke:"rgb(71, 85, 105)",rx:"4",className:"pointer-events-none"}),n.jsxs("text",{x:A,y:q-30,textAnchor:"middle",className:"fill-surface-100 text-xs font-medium pointer-events-none",children:[tt(x.cumulativeXP)," XP"]}),n.jsx("text",{x:A,y:q-18,textAnchor:"middle",className:"fill-surface-400 text-xs pointer-events-none",children:O(x.date)})]})]},_)}),n.jsx("text",{x:-50,y:y/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -50, ${y/2})`,className:"fill-surface-300 text-sm font-medium",children:"Cumulative XP"}),n.jsx("text",{x:v/2,y:y+45,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Timeline"})]}),n.jsxs("g",{transform:`translate(${c-150}, 40)`,children:[n.jsx("rect",{x:0,y:0,width:"140",height:"60",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),n.jsxs("text",{x:10,y:18,className:"fill-surface-200 text-xs font-medium",children:["Total XP: ",tt(m.maxXP)]}),n.jsxs("text",{x:10,y:32,className:"fill-surface-400 text-xs",children:["Projects: ",m.points.length]}),n.jsxs("text",{x:10,y:46,className:"fill-surface-400 text-xs",children:["Duration: ",Math.ceil((m.dateRange.max-m.dateRange.min)/(1e3*60*60*24))," days"]})]})]})})},gy=({data:i={},width:c=500,height:u=400,className:f=""})=>{const m=W.useMemo(()=>{try{if(!i||typeof i!="object")return{segments:[],jsStats:{},goStats:{},overall:{}};const{jsStats:g={},goStats:b={},overall:x={}}=i;if(!x.total||x.total<=0)return{segments:[],jsStats:g,goStats:b,overall:x};const _=[];x.passed>0&&_.push({label:"Passed",value:x.passed,percentage:x.passed/x.total*100,color:"rgb(34, 197, 94)",hoverColor:"rgb(22, 163, 74)"}),x.failed>0&&_.push({label:"Failed",value:x.failed,percentage:x.failed/x.total*100,color:"rgb(239, 68, 68)",hoverColor:"rgb(220, 38, 38)"});let A=-90;return{segments:_.map(B=>{const M=B.percentage/100*360,X={...B,startAngle:A,endAngle:A+M,angle:M};return A+=M,X}),jsStats:g,goStats:b,overall:x}}catch(g){return console.error("Error processing piscine stats data:",g),{segments:[],jsStats:{},goStats:{},overall:{}}}},[i]),p=c/2,v=u/2,y=Math.min(c,u)/3,O=y*.4,D=(g,b,x,_)=>{const A=(_-90)*Math.PI/180;return{x:g+x*Math.cos(A),y:b+x*Math.sin(A)}},I=(g,b,x,_,A,q=0)=>{const B=D(g,b,x,A),M=D(g,b,x,_),X=A-_<=180?"0":"1";if(q>0){const V=D(g,b,q,A),ne=D(g,b,q,_);return["M",B.x,B.y,"A",x,x,0,X,0,M.x,M.y,"L",ne.x,ne.y,"A",q,q,0,X,1,V.x,V.y,"Z"].join(" ")}else return["M",g,b,"L",B.x,B.y,"A",x,x,0,X,0,M.x,M.y,"Z"].join(" ")};return!m.segments.length||m.overall.total===0?n.jsx("div",{className:`flex items-center justify-center ${f}`,style:{width:c,height:u},children:n.jsxs("div",{className:"text-center text-surface-400",children:[n.jsx("div",{className:"text-lg mb-2",children:"🥧"}),n.jsx("div",{children:"No piscine data available"})]})}):n.jsx("div",{className:f,children:n.jsxs("svg",{width:c,height:u,className:"overflow-visible",children:[n.jsx("defs",{children:n.jsx("filter",{id:"pieShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:n.jsx("feDropShadow",{dx:"2",dy:"4",stdDeviation:"4",floodOpacity:"0.3"})})}),n.jsx("text",{x:c/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"Piscine Performance Overview"}),m.segments.map((g,b)=>{const x=I(p,v,y,g.startAngle,g.endAngle,O),_=(g.startAngle+g.endAngle)/2,A=y+30,q=D(p,v,A,_);return n.jsxs("g",{children:[n.jsx(K.path,{d:x,fill:g.color,filter:"url(#pieShadow)",className:"cursor-pointer",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.6,delay:b*.2,ease:"easeOut"},whileHover:{fill:g.hoverColor,scale:1.05}}),n.jsxs(K.text,{x:q.x,y:q.y,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-100 text-sm font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:b*.2+.3},children:[(g.percentage||0).toFixed(1),"%"]}),n.jsxs(K.text,{x:q.x,y:q.y+15,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-400 text-xs",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:b*.2+.4},children:["(",g.value," ",g.label.toLowerCase(),")"]})]},g.label)}),n.jsxs("g",{children:[n.jsx("text",{x:p,y:v-10,textAnchor:"middle",className:"fill-surface-100 text-lg font-bold",children:m.overall.total}),n.jsx("text",{x:p,y:v+8,textAnchor:"middle",className:"fill-surface-400 text-sm",children:"Total Attempts"})]}),n.jsx("g",{transform:`translate(20, ${u-100})`,children:m.segments.map((g,b)=>n.jsxs("g",{transform:`translate(0, ${b*20})`,children:[n.jsx("rect",{x:0,y:0,width:12,height:12,fill:g.color,rx:"2"}),n.jsxs("text",{x:18,y:9,dominantBaseline:"middle",className:"fill-surface-200 text-sm",children:[g.label,": ",g.value]})]},g.label))}),n.jsxs("g",{transform:`translate(${c-180}, 50)`,children:[n.jsx("rect",{x:0,y:0,width:"170",height:"120",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),n.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Breakdown by Track"}),n.jsx("text",{x:10,y:38,className:"fill-surface-300 text-xs font-medium",children:"JavaScript Piscine:"}),n.jsxs("text",{x:15,y:52,className:"fill-surface-400 text-xs",children:["Passed: ",m.jsStats.passed||0]}),n.jsxs("text",{x:15,y:64,className:"fill-surface-400 text-xs",children:["Failed: ",m.jsStats.failed||0]}),n.jsx("text",{x:10,y:84,className:"fill-surface-300 text-xs font-medium",children:"Go Piscine:"}),n.jsxs("text",{x:15,y:98,className:"fill-surface-400 text-xs",children:["Passed: ",m.goStats.passed||0]}),n.jsxs("text",{x:15,y:110,className:"fill-surface-400 text-xs",children:["Failed: ",m.goStats.failed||0]})]}),n.jsxs("g",{transform:`translate(${c-180}, 180)`,children:[n.jsx("rect",{x:0,y:0,width:"170",height:"40",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),n.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Success Rate"}),n.jsxs("text",{x:10,y:32,className:"fill-primary-400 text-lg font-bold",children:[m.overall.passRate?.toFixed(1)||0,"%"]})]})]})})},py=()=>{const{userData:i,xpData:c,projectData:u,auditData:f,piscineStats:m,skills:p,loading:v}=Ks(),y=c?.timeline||[],O=c?.xpByProject||[],D=i?.totalXP||0,I=i?.level||0,g=u?.totalProjects||0,b=u?.passedProjects||0,x=u?.failedProjects||0,_=u?.passRate||0,A=f?.given?.count||0,q=f?.received?.count||0,B=f?.auditRatio||0;return v?n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[n.jsx(yt,{}),n.jsx(yt,{}),n.jsx(yt,{}),n.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:n.jsx(yt,{})}),n.jsx("div",{className:"lg:col-span-2",children:n.jsx(yt,{})}),n.jsx(yt,{})]}):n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Fa,{className:"w-5 h-5 mr-2"}),"XP Statistics"]})}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Total XP"}),n.jsx(ce,{variant:"primary",children:tt(D)})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Current Level"}),n.jsxs(ce,{variant:"accent",children:["Level ",I]})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Projects Completed"}),n.jsx(ce,{variant:"success",children:b})]})]})})]}),n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Xl,{className:"w-5 h-5 mr-2"}),"Performance Metrics"]})}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Success Rate"}),n.jsx(ce,{variant:"primary",children:Ja(_)})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Audit Ratio"}),n.jsx(ce,{variant:"accent",children:B.toFixed(2)})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Audits Given"}),n.jsx(ce,{variant:"success",children:A})]})]})})]}),n.jsxs(E,{children:[n.jsx(E.Header,{children:n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(hr,{className:"w-5 h-5 mr-2"}),"Achievement Summary"]})}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Total Projects"}),n.jsx(ce,{variant:"primary",children:g})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Failed Projects"}),n.jsx(ce,{variant:"error",children:x})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-300",children:"Audits Received"}),n.jsx(ce,{variant:"accent",children:q})]})]})})]}),n.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(yr,{className:"w-5 h-5 mr-2"}),"XP Progression Timeline"]}),n.jsx(E.Description,{children:"Your cumulative experience points growth over time"})]}),n.jsx(E.Content,{children:n.jsx("div",{className:"flex justify-center",children:n.jsx(hy,{data:y,width:900,height:400})})})]})}),n.jsx("div",{className:"lg:col-span-2",children:n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(mm,{className:"w-5 h-5 mr-2"}),"XP by Project"]}),n.jsx(E.Description,{children:"Top projects ranked by experience points earned"})]}),n.jsx(E.Content,{children:n.jsx("div",{className:"flex justify-center",children:n.jsx(my,{data:O,width:700,height:500,maxBars:15})})})]})}),n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Xl,{className:"w-5 h-5 mr-2"}),"Piscine Performance"]}),n.jsx(E.Description,{children:"JavaScript and Go piscine statistics"})]}),n.jsx(E.Content,{children:n.jsx("div",{className:"flex justify-center",children:n.jsx(gy,{data:m||{},width:400,height:350})})})]}),p&&p.length>0&&n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Cc,{className:"w-5 h-5 mr-2"}),"Skill Development"]}),n.jsx(E.Description,{children:"Top technologies and programming languages"})]}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-3",children:[p.slice(0,6).map((M,X)=>n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("div",{className:"w-2 h-2 rounded-full bg-primary-400"}),n.jsx("span",{className:"text-surface-200 text-sm capitalize",children:M.name?.replace(/_/g," ")||"Unknown Skill"})]}),n.jsx(ce,{variant:"primary",size:"sm",children:tt(M.totalXP)})]},M.name||X)),p.length===0&&n.jsxs("div",{className:"text-center text-surface-400 py-4",children:[n.jsx(Cc,{className:"w-8 h-8 mx-auto mb-2 opacity-50"}),n.jsx("p",{children:"No skill data available yet"})]})]})})]}),n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Fa,{className:"w-5 h-5 mr-2"}),"XP Progress Overview"]}),n.jsx(E.Description,{children:"Your experience points progression summary"})]}),n.jsx(E.Content,{children:n.jsx("div",{className:"flex justify-center",children:n.jsx(oy,{data:y||[],width:400,height:300})})})]}),n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(U0,{className:"w-5 h-5 mr-2"}),"Project Success Rate"]}),n.jsx(E.Description,{children:"Pass/Fail ratio for your projects"})]}),n.jsx(E.Content,{children:n.jsx("div",{className:"flex justify-center py-8",children:n.jsx(fy,{passedProjects:b,failedProjects:x,size:250})})})]}),n.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(D0,{className:"w-5 h-5 mr-2"}),"Audit Performance Analytics"]}),n.jsx(E.Description,{children:"Comprehensive audit statistics and performance metrics"})]}),n.jsx(E.Content,{children:n.jsx("div",{className:"flex justify-center",children:n.jsx(dy,{auditsGiven:A,auditsReceived:q,width:900,height:400})})})]})})]})},yy=()=>{const[i,c]=W.useState(""),[u,f]=W.useState("all"),[m,p]=W.useState("date"),{auditData:v,collaborationFrequency:y,networkMetrics:O,loading:D,error:I}=Ks();if(D)return n.jsx(Hl,{});I&&console.error("Error loading audit data:",I);const x=(v?.audits||[]).map(Q=>({id:Q.id,user:Q.group?.object?.name||"Unknown Project",project:Q.group?.path?.split("/").pop()||"Unknown",result:Q.grade>=1?"Pass":"Fail",status:Q.grade>=1?"pass":"fail",date:Q.createdAt,grade:Q.grade||0,attrs:Q.attrs||{}})),_=x.filter(Q=>{const Te=Q.user.toLowerCase().includes(i.toLowerCase())||Q.project.toLowerCase().includes(i.toLowerCase()),ze=u==="all"||Q.status===u;return Te&&ze}).sort((Q,Te)=>{switch(m){case"date":return new Date(Te.date)-new Date(Q.date);case"user":return Q.user.localeCompare(Te.user);case"project":return Q.project.localeCompare(Te.project);default:return 0}}),A=x.filter(Q=>Q.status==="pass").length,q=x.filter(Q=>Q.status==="fail").length,B=x.length,M=B>0?x.reduce((Q,Te)=>Q+Te.grade,0)/B:0,X=B>0?A/B*100:0,V=v?.auditRatio||0,ne=v?.given?.total||0,Ue=v?.received?.total||0,De=O?.influenceScore||0;return n.jsxs("div",{className:"space-y-6",children:[n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[n.jsx(E,{children:n.jsxs(E.Content,{className:"flex items-center space-x-4",children:[n.jsx("div",{className:"p-3 bg-green-500/20 rounded-lg",children:n.jsx(Zc,{className:"w-6 h-6 text-green-400"})}),n.jsxs("div",{children:[n.jsx("p",{className:"text-2xl font-bold text-white",children:A}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Passed Audits"}),n.jsx(ce,{variant:"success",size:"sm",className:"mt-1",children:Ja(X)})]})]})}),n.jsx(E,{children:n.jsxs(E.Content,{className:"flex items-center space-x-4",children:[n.jsx("div",{className:"p-3 bg-red-500/20 rounded-lg",children:n.jsx(O0,{className:"w-6 h-6 text-red-400"})}),n.jsxs("div",{children:[n.jsx("p",{className:"text-2xl font-bold text-white",children:q}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Failed Audits"}),n.jsx(ce,{variant:"error",size:"sm",className:"mt-1",children:Ja(100-X)})]})]})}),n.jsx(E,{children:n.jsxs(E.Content,{className:"flex items-center space-x-4",children:[n.jsx("div",{className:"p-3 bg-primary-500/20 rounded-lg",children:n.jsx(Bc,{className:"w-6 h-6 text-primary-400"})}),n.jsxs("div",{children:[n.jsx("p",{className:"text-2xl font-bold text-white",children:M.toFixed(1)}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Average Grade"}),n.jsx(ce,{variant:"primary",size:"sm",className:"mt-1",children:M>=1?"Excellent":"Needs Work"})]})]})}),n.jsx(E,{children:n.jsxs(E.Content,{className:"flex items-center space-x-4",children:[n.jsx("div",{className:"p-3 bg-blue-500/20 rounded-lg",children:n.jsx(gr,{className:"w-6 h-6 text-blue-400"})}),n.jsxs("div",{children:[n.jsx("p",{className:"text-2xl font-bold text-white",children:V.toFixed(1)}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Audit Ratio"}),n.jsx(ce,{variant:V>=1?"success":"warning",size:"sm",className:"mt-1",children:V>=1?"Good":"Low"})]})]})})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Fa,{className:"w-5 h-5 mr-2"}),"Audit Activity"]}),n.jsx(E.Description,{children:"Your audit giving and receiving statistics"})]}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-200",children:"Audits Given"}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("span",{className:"text-white font-semibold",children:ne}),n.jsx(ce,{variant:"primary",size:"sm",children:"Given"})]})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-200",children:"Audits Received"}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("span",{className:"text-white font-semibold",children:Ue}),n.jsx(ce,{variant:"accent",size:"sm",children:"Received"})]})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-200",children:"Collaboration Frequency"}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("span",{className:"text-white font-semibold",children:y?.pattern||"Unknown"}),n.jsxs(ce,{variant:y?.pattern==="frequent"?"success":y?.pattern==="regular"?"primary":"warning",size:"sm",children:[y?.frequency?.toFixed(1)||"0","/year"]})]})]})]})})]}),n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center",children:[n.jsx(Xl,{className:"w-5 h-5 mr-2"}),"Network Influence"]}),n.jsx(E.Description,{children:"Your collaboration network and influence metrics"})]}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-200",children:"Collaboration Score"}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("span",{className:"text-white font-semibold",children:De}),n.jsx(ce,{variant:De>=70?"success":De>=40?"primary":"warning",size:"sm",children:De>=70?"High":De>=40?"Medium":"Low"})]})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-200",children:"Unique Collaborators"}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("span",{className:"text-white font-semibold",children:O?.uniqueCollaborators||0}),n.jsx(ce,{variant:"accent",size:"sm",children:"People"})]})]}),n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("span",{className:"text-surface-200",children:"Network Size"}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("span",{className:"text-white font-semibold capitalize",children:O?.networkSize||"Small"}),n.jsx(ce,{variant:O?.networkSize==="large"?"success":O?.networkSize==="medium"?"primary":"warning",size:"sm",children:"Network"})]})]})]})})]})]}),n.jsx(E,{children:n.jsx(E.Content,{children:n.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[n.jsxs("div",{className:"flex-1 relative",children:[n.jsx(na,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),n.jsx("input",{type:"text",placeholder:"Search audits...",value:i,onChange:Q=>c(Q.target.value),className:"material-input pl-10 w-full"})]}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(Qs,{className:"w-4 h-4 text-surface-400"}),n.jsxs("select",{value:u,onChange:Q=>f(Q.target.value),className:"material-input",children:[n.jsx("option",{value:"all",children:"All Status"}),n.jsx("option",{value:"pass",children:"Passed"}),n.jsx("option",{value:"fail",children:"Failed"})]})]}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(om,{className:"w-4 h-4 text-surface-400"}),n.jsxs("select",{value:m,onChange:Q=>p(Q.target.value),className:"material-input",children:[n.jsx("option",{value:"date",children:"Sort by Date"}),n.jsx("option",{value:"user",children:"Sort by User"}),n.jsx("option",{value:"project",children:"Sort by Project"})]})]})]})})}),n.jsxs(E,{children:[n.jsxs(E.Header,{children:[n.jsxs(E.Title,{className:"flex items-center justify-between",children:[n.jsxs("div",{className:"flex items-center",children:[n.jsx(Bc,{className:"w-5 h-5 mr-2"}),"Audits (",_.length,")"]}),n.jsxs(ce,{variant:"primary",size:"sm",children:[x.length>0?(A/x.length*100).toFixed(0):0,"% Pass Rate"]})]}),n.jsx(E.Description,{children:"Your recent audit history"})]}),n.jsxs(E.Content,{children:[n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full",children:[n.jsx("thead",{children:n.jsxs("tr",{className:"border-b border-white/10",children:[n.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"User"}),n.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Project"}),n.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Grade"}),n.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Date"}),n.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Result"})]})}),n.jsx("tbody",{children:_.map((Q,Te)=>n.jsxs(K.tr,{className:"border-b border-white/5 hover:bg-white/5 transition-colors",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2,delay:Te*.05},children:[n.jsx("td",{className:"py-3 px-4 text-white font-medium",children:Q.user}),n.jsx("td",{className:"py-3 px-4 text-surface-300",children:Q.project}),n.jsx("td",{className:"py-3 px-4",children:n.jsx("span",{className:`font-semibold ${Q.grade>=1?"text-green-400":"text-red-400"}`,children:Q.grade.toFixed(1)})}),n.jsx("td",{className:"py-3 px-4 text-surface-400 text-sm",children:new Date(Q.date).toLocaleDateString()}),n.jsx("td",{className:"py-3 px-4",children:n.jsx(ey,{status:Q.status})})]},Q.id))})]})}),_.length===0&&n.jsxs("div",{className:"text-center py-8 text-surface-400",children:[n.jsx(na,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),n.jsx("p",{children:"No audits found matching your criteria"})]})]})]})]})},xy=i=>{const c=i.toLowerCase();return c.includes("javascript")||c.includes("go")||c.includes("python")||c.includes("java")||c.includes("c++")||c.includes("rust")?"language":c.includes("react")||c.includes("vue")||c.includes("angular")||c.includes("express")||c.includes("django")?"framework":c.includes("sql")||c.includes("database")||c.includes("mongodb")||c.includes("postgres")?"database":c.includes("docker")||c.includes("git")||c.includes("linux")||c.includes("bash")?"tool":c.includes("graphql")||c.includes("rest")||c.includes("api")?"api":"general"},vy=()=>{const[i,c]=W.useState(""),[u,f]=W.useState("xp"),[m,p]=W.useState("all"),{skills:v,loading:y}=Ks(),D=(v||[]).map(M=>{const X=qm(M.totalXP||0,M.completedProjects||0,M.averageGrade||0);return{...M,proficiency:X,type:xy(M.name),icon:A(M.name)}}),I=D.length,g=D.filter(M=>M.proficiency.level==="Advanced"||M.proficiency.level==="Expert").length,b=D.reduce((M,X)=>M+(X.totalXP||0),0),x=D.length>0?D.reduce((M,X)=>M+X.proficiency.score,0)/D.length:0,_=D.filter(M=>{const X=M.name.toLowerCase().includes(i.toLowerCase()),V=m==="all"||M.type===m;return X&&V}).sort((M,X)=>{switch(u){case"xp":return(X.totalXP||0)-(M.totalXP||0);case"projects":return(X.completedProjects||0)-(M.completedProjects||0);case"name":return M.name.localeCompare(X.name);default:return 0}}),A=M=>{switch(M){case"language":return n.jsx(Wd,{className:"w-4 h-4"});case"database":return n.jsx(q0,{className:"w-4 h-4"});case"framework":case"api":return n.jsx(M0,{className:"w-4 h-4"});default:return n.jsx(I0,{className:"w-4 h-4"})}},q=M=>{switch(M){case"Advanced":return"success";case"Intermediate":return"primary";case"Beginner":return"warning";default:return"secondary"}},B=D.length>0?Math.max(...D.map(M=>M.totalXP||0)):1;return y?n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[n.jsx(yt,{}),n.jsx(yt,{})]}):n.jsxs("div",{className:"space-y-6",children:[n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[n.jsx(E,{children:n.jsxs(E.Content,{className:"flex items-center space-x-4",children:[n.jsx("div",{className:"p-3 bg-blue-500/20 rounded-lg",children:n.jsx(Wd,{className:"w-6 h-6 text-blue-400"})}),n.jsxs("div",{children:[n.jsx("p",{className:"text-2xl font-bold text-white",children:I}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Technologies"}),n.jsx(ce,{variant:"primary",size:"sm",className:"mt-1",children:"Total Skills"})]})]})}),n.jsx(E,{children:n.jsxs(E.Content,{className:"flex items-center space-x-4",children:[n.jsx("div",{className:"p-3 bg-green-500/20 rounded-lg",children:n.jsx(hr,{className:"w-6 h-6 text-green-400"})}),n.jsxs("div",{children:[n.jsx("p",{className:"text-2xl font-bold text-white",children:g}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Advanced Skills"}),n.jsx(ce,{variant:"success",size:"sm",className:"mt-1",children:"Expert Level"})]})]})}),n.jsx(E,{children:n.jsxs(E.Content,{className:"flex items-center space-x-4",children:[n.jsx("div",{className:"p-3 bg-purple-500/20 rounded-lg",children:n.jsx(Cc,{className:"w-6 h-6 text-purple-400"})}),n.jsxs("div",{children:[n.jsx("p",{className:"text-2xl font-bold text-white",children:tt(b)}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Total Tech XP"}),n.jsx(ce,{variant:"accent",size:"sm",className:"mt-1",children:"Experience"})]})]})}),n.jsx(E,{children:n.jsxs(E.Content,{className:"flex items-center space-x-4",children:[n.jsx("div",{className:"p-3 bg-orange-500/20 rounded-lg",children:n.jsx(Xl,{className:"w-6 h-6 text-orange-400"})}),n.jsxs("div",{children:[n.jsx("p",{className:"text-2xl font-bold text-white",children:x.toFixed(0)}),n.jsx("p",{className:"text-surface-300 text-sm",children:"Avg Proficiency"}),n.jsx(ce,{variant:x>=70?"success":x>=40?"primary":"warning",size:"sm",className:"mt-1",children:x>=70?"High":x>=40?"Medium":"Low"})]})]})})]}),n.jsx(E,{children:n.jsx(E.Content,{children:n.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[n.jsxs("div",{className:"flex-1 relative",children:[n.jsx(na,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),n.jsx("input",{type:"text",placeholder:"Search technologies...",value:i,onChange:M=>c(M.target.value),className:"material-input pl-10 w-full"})]}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(Qs,{className:"w-4 h-4 text-surface-400"}),n.jsxs("select",{value:m,onChange:M=>p(M.target.value),className:"material-input",children:[n.jsx("option",{value:"all",children:"All Types"}),n.jsx("option",{value:"language",children:"Languages"}),n.jsx("option",{value:"framework",children:"Frameworks"}),n.jsx("option",{value:"database",children:"Databases"}),n.jsx("option",{value:"tool",children:"Tools"}),n.jsx("option",{value:"api",children:"APIs"})]})]}),n.jsx("div",{className:"flex items-center space-x-2",children:n.jsxs("select",{value:u,onChange:M=>f(M.target.value),className:"material-input",children:[n.jsx("option",{value:"xp",children:"Sort by XP"}),n.jsx("option",{value:"projects",children:"Sort by Projects"}),n.jsx("option",{value:"name",children:"Sort by Name"})]})})]})})}),n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:_.map((M,X)=>n.jsx(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:X*.1},children:n.jsx(E,{hover:!0,className:"h-full",children:n.jsxs(E.Content,{children:[n.jsxs("div",{className:"flex items-start justify-between mb-3",children:[n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx("div",{className:"p-2 bg-primary-500/20 rounded-lg text-primary-400",children:n.jsx(M.icon,{className:"w-4 h-4"})}),n.jsxs("div",{children:[n.jsx("h3",{className:"font-semibold text-white",children:M.name}),n.jsx("p",{className:"text-xs text-surface-400 capitalize",children:M.type})]})]}),n.jsx(ce,{variant:q(M.proficiency.level),size:"sm",children:M.proficiency.level})]}),n.jsxs("div",{className:"space-y-3",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[n.jsx("span",{className:"text-surface-300",children:"Experience"}),n.jsx("span",{className:"text-primary-300",children:tt(M.totalXP||0)})]}),n.jsx(im,{value:M.totalXP||0,max:B,size:"sm",color:"primary",showValue:!1})]}),n.jsxs("div",{children:[n.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[n.jsx("span",{className:"text-surface-300",children:"Proficiency"}),n.jsxs("span",{className:"text-accent-300",children:[M.proficiency.score,"/100"]})]}),n.jsx(im,{value:M.proficiency.score,max:100,size:"sm",color:"accent",showValue:!1})]}),n.jsxs("div",{className:"flex justify-between text-sm",children:[n.jsx("span",{className:"text-surface-300",children:"Projects"}),n.jsx("span",{className:"text-white font-medium",children:M.completedProjects||0})]}),M.proficiency.pointsToNext>0&&n.jsxs("div",{className:"text-xs text-surface-400",children:[M.proficiency.pointsToNext," points to next level"]})]})]})})},M.name))}),_.length===0&&n.jsx(E,{children:n.jsx(E.Content,{children:n.jsxs("div",{className:"text-center py-8 text-surface-400",children:[n.jsx(na,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),n.jsxs("p",{children:['No technologies found matching "',i,'"']})]})})})]})},by=()=>{const[i,c]=W.useState("profile"),[u,f]=W.useState(!1),{logout:m,user:p}=Ll(),{userStatistics:v,totalXP:y,loading:O,error:D,refetchAll:I}=Ks();W.useEffect(()=>{f(!1)},[i]);const g=[{id:"profile",label:"Profile & Data",icon:mr},{id:"search",label:"Search Queries",icon:na},{id:"stats",label:"Statistics",icon:mm},{id:"audits",label:"Audits",icon:Bc},{id:"technologies",label:"Technologies",icon:gr}],b=()=>{m()};return O?n.jsx("div",{className:"min-h-screen bg-surface-900 flex items-center justify-center",children:n.jsx(Hl,{size:"lg",text:"Loading your dashboard...",variant:"dots",error:D,retry:I})}):D&&!v?n.jsx("div",{className:"min-h-screen bg-surface-900 flex items-center justify-center",children:n.jsx(Hl,{error:D,retry:I,text:"Failed to load dashboard"})}):D?(console.error("Dashboard error:",D),n.jsx("div",{className:"min-h-screen flex items-center justify-center p-4",children:n.jsxs(E,{className:"max-w-md text-center",children:[n.jsxs(E.Header,{children:[n.jsx(E.Title,{className:"text-red-400",children:"Error Loading Dashboard"}),n.jsx(E.Description,{children:D.message||"Failed to load dashboard data"})]}),n.jsx(E.Content,{children:n.jsxs("div",{className:"space-y-3",children:[n.jsx(Oa,{onClick:()=>window.location.reload(),className:"w-full",children:"Reload Page"}),!1]})})]})})):n.jsx(Xm,{showDetails:!1,children:n.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 pb-20 md:pb-0",children:[n.jsx("header",{className:"sticky top-0 z-40 bg-surface-900/80 backdrop-blur-md border-b border-white/10",children:n.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[n.jsxs("div",{className:"flex items-center justify-between h-16",children:[n.jsxs("div",{className:"flex items-center",children:[n.jsx(K.div,{initial:{scale:0},animate:{scale:1},className:"w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-400 rounded-lg flex items-center justify-center mr-3",children:n.jsx(mr,{className:"w-5 h-5 text-white"})}),n.jsx("h1",{className:"text-lg md:text-xl font-bold gradient-text",children:"Profile Dashboard"})]}),n.jsxs("div",{className:"hidden md:flex items-center space-x-4",children:[n.jsxs("div",{className:"text-right",children:[n.jsx("p",{className:"text-sm font-medium text-white",children:Zs(v)||p?.username}),n.jsx("p",{className:"text-xs text-surface-400",children:tt(y)})]}),n.jsx(Oa,{variant:"ghost",size:"sm",onClick:b,className:"text-surface-300 hover:text-red-400",children:n.jsx(em,{className:"w-4 h-4"})})]}),n.jsx("div",{className:"md:hidden",children:n.jsx(Oa,{variant:"ghost",size:"sm",onClick:()=>f(!u),className:"text-surface-300",children:u?n.jsx($0,{className:"w-5 h-5"}):n.jsx(G0,{className:"w-5 h-5"})})})]}),u&&n.jsx(K.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"md:hidden border-t border-white/10 py-4",children:n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsxs("div",{children:[n.jsx("p",{className:"text-sm font-medium text-white",children:Zs(v)||p?.username}),n.jsx("p",{className:"text-xs text-surface-400",children:tt(y)})]}),n.jsxs(Oa,{variant:"ghost",size:"sm",onClick:b,className:"text-surface-300 hover:text-red-400",children:[n.jsx(em,{className:"w-4 h-4 mr-2"}),"Logout"]})]})})]})}),n.jsx("nav",{className:"sticky top-16 z-30 bg-surface-800/80 backdrop-blur-md border-b border-white/10 hidden md:block",children:n.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:n.jsx("div",{className:"flex space-x-8 overflow-x-auto",children:g.map(x=>{const _=x.icon,A=i===x.id;return n.jsxs(K.button,{onClick:()=>c(x.id),className:`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap relative ${A?"border-primary-400 text-primary-300":"border-transparent text-surface-400 hover:text-surface-200"}`,whileHover:{y:-2},whileTap:{y:0},children:[n.jsx(_,{className:"w-4 h-4"}),n.jsx("span",{className:"text-sm font-medium",children:x.label}),A&&n.jsx(K.div,{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400",layoutId:"activeTabIndicator",transition:{type:"spring",stiffness:500,damping:30}})]},x.id)})})})}),n.jsx(Fp,{tabs:g,activeTab:i,onTabChange:c}),n.jsx("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:n.jsxs(K.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[i==="profile"&&n.jsx(sy,{}),i==="search"&&n.jsx(uy,{}),i==="stats"&&n.jsx(py,{}),i==="audits"&&n.jsx(yy,{}),i==="technologies"&&n.jsx(vy,{})]},i)})]})})},jy=()=>{const{isAuthenticated:i,isInitialized:c}=Ll();return c?i?n.jsx(by,{}):n.jsx(Qp,{}):n.jsx(Hl,{fullScreen:!0,size:"lg",text:"Initializing..."})};function Ay(){return n.jsx(Xm,{children:n.jsx(A0,{client:Bm,children:n.jsx(lp,{children:n.jsx(Cp,{children:n.jsx(jy,{})})})})})}H0.createRoot(document.getElementById("root")).render(n.jsx(W.StrictMode,{children:n.jsx(Ay,{})}));
