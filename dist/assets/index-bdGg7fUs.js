import{r as F,j as i,m as J,R as Wt}from"./animation-vendor-Ixux-_Rc.js";import{r as o0,a as d0}from"./react-vendor-DJG_os-6.js";import{A as bc,_ as h0,O as wd,g as m0,P as g0,a as x0,I as y0,c as p0,b as v0,f as b0,d as xe,u as Pt,e as ti,h as j0}from"./apollo-vendor-D9MnWLwe.js";import{L as Ad,M as zd,U as Fs,a as S0,E as A0,b as N0,c as _0,C as Od,d as ai,T as Cn,A as T0,e as Md,S as At,f as yc,F as Gn,g as Ud,h as Rd,i as jc,j as qd,k as D0,l as E0,m as w0,n as pc,o as z0,G as O0,D as M0,p as U0,q as Nd,X as R0,r as q0,s as B0,R as C0,H as G0}from"./ui-vendor-DiO1C7IC.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))f(m);new MutationObserver(m=>{for(const S of m)if(S.type==="childList")for(const p of S.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&f(p)}).observe(document,{childList:!0,subtree:!0});function d(m){const S={};return m.integrity&&(S.integrity=m.integrity),m.referrerPolicy&&(S.referrerPolicy=m.referrerPolicy),m.crossOrigin==="use-credentials"?S.credentials="include":m.crossOrigin==="anonymous"?S.credentials="omit":S.credentials="same-origin",S}function f(m){if(m.ep)return;m.ep=!0;const S=d(m);fetch(m.href,S)}})();var mc={exports:{}},Rn={},gc={exports:{}},xc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _d;function X0(){return _d||(_d=1,function(r){function o(M,H){var V=M.length;M.push(H);e:for(;0<V;){var oe=V-1>>>1,ce=M[oe];if(0<m(ce,H))M[oe]=H,M[V]=ce,V=oe;else break e}}function d(M){return M.length===0?null:M[0]}function f(M){if(M.length===0)return null;var H=M[0],V=M.pop();if(V!==H){M[0]=V;e:for(var oe=0,ce=M.length,Xe=ce>>>1;oe<Xe;){var pe=2*(oe+1)-1,ue=M[pe],we=pe+1,ht=M[we];if(0>m(ue,V))we<ce&&0>m(ht,ue)?(M[oe]=ht,M[we]=V,oe=we):(M[oe]=ue,M[pe]=V,oe=pe);else if(we<ce&&0>m(ht,V))M[oe]=ht,M[we]=V,oe=we;else break e}}return H}function m(M,H){var V=M.sortIndex-H.sortIndex;return V!==0?V:M.id-H.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var S=performance;r.unstable_now=function(){return S.now()}}else{var p=Date,b=p.now();r.unstable_now=function(){return p.now()-b}}var E=[],z=[],R=1,O=null,x=3,A=!1,N=!1,D=!1,B=!1,G=typeof setTimeout=="function"?setTimeout:null,X=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function le(M){for(var H=d(z);H!==null;){if(H.callback===null)f(z);else if(H.startTime<=M)f(z),H.sortIndex=H.expirationTime,o(E,H);else break;H=d(z)}}function je(M){if(D=!1,le(M),!N)if(d(E)!==null)N=!0,Ee||(Ee=!0,Ze());else{var H=d(z);H!==null&&dt(je,H.startTime-M)}}var Ee=!1,Qe=-1,k=5,ne=-1;function Ne(){return B?!0:!(r.unstable_now()-ne<k)}function ot(){if(B=!1,Ee){var M=r.unstable_now();ne=M;var H=!0;try{e:{N=!1,D&&(D=!1,X(Qe),Qe=-1),A=!0;var V=x;try{t:{for(le(M),O=d(E);O!==null&&!(O.expirationTime>M&&Ne());){var oe=O.callback;if(typeof oe=="function"){O.callback=null,x=O.priorityLevel;var ce=oe(O.expirationTime<=M);if(M=r.unstable_now(),typeof ce=="function"){O.callback=ce,le(M),H=!0;break t}O===d(E)&&f(E),le(M)}else f(E);O=d(E)}if(O!==null)H=!0;else{var Xe=d(z);Xe!==null&&dt(je,Xe.startTime-M),H=!1}}break e}finally{O=null,x=V,A=!1}H=void 0}}finally{H?Ze():Ee=!1}}}var Ze;if(typeof I=="function")Ze=function(){I(ot)};else if(typeof MessageChannel<"u"){var $a=new MessageChannel,_a=$a.port2;$a.port1.onmessage=ot,Ze=function(){_a.postMessage(null)}}else Ze=function(){G(ot,0)};function dt(M,H){Qe=G(function(){M(r.unstable_now())},H)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(M){M.callback=null},r.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):k=0<M?Math.floor(1e3/M):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(M){switch(x){case 1:case 2:case 3:var H=3;break;default:H=x}var V=x;x=H;try{return M()}finally{x=V}},r.unstable_requestPaint=function(){B=!0},r.unstable_runWithPriority=function(M,H){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var V=x;x=M;try{return H()}finally{x=V}},r.unstable_scheduleCallback=function(M,H,V){var oe=r.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?oe+V:oe):V=oe,M){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=V+ce,M={id:R++,callback:H,priorityLevel:M,startTime:V,expirationTime:ce,sortIndex:-1},V>oe?(M.sortIndex=V,o(z,M),d(E)===null&&M===d(z)&&(D?(X(Qe),Qe=-1):D=!0,dt(je,V-oe))):(M.sortIndex=ce,o(E,M),N||A||(N=!0,Ee||(Ee=!0,Ze()))),M},r.unstable_shouldYield=Ne,r.unstable_wrapCallback=function(M){var H=x;return function(){var V=x;x=H;try{return M.apply(this,arguments)}finally{x=V}}}}(xc)),xc}var Td;function H0(){return Td||(Td=1,gc.exports=X0()),gc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dd;function L0(){if(Dd)return Rn;Dd=1;var r=H0(),o=o0(),d=d0();function f(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function m(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function S(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function p(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function b(e){if(S(e)!==e)throw Error(f(188))}function E(e){var t=e.alternate;if(!t){if(t=S(e),t===null)throw Error(f(188));return t!==e?null:e}for(var a=e,l=t;;){var n=a.return;if(n===null)break;var s=n.alternate;if(s===null){if(l=n.return,l!==null){a=l;continue}break}if(n.child===s.child){for(s=n.child;s;){if(s===a)return b(n),e;if(s===l)return b(n),t;s=s.sibling}throw Error(f(188))}if(a.return!==l.return)a=n,l=s;else{for(var u=!1,c=n.child;c;){if(c===a){u=!0,a=n,l=s;break}if(c===l){u=!0,l=n,a=s;break}c=c.sibling}if(!u){for(c=s.child;c;){if(c===a){u=!0,a=s,l=n;break}if(c===l){u=!0,l=s,a=n;break}c=c.sibling}if(!u)throw Error(f(189))}}if(a.alternate!==l)throw Error(f(190))}if(a.tag!==3)throw Error(f(188));return a.stateNode.current===a?e:t}function z(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=z(e),t!==null)return t;e=e.sibling}return null}var R=Object.assign,O=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),A=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),D=Symbol.for("react.strict_mode"),B=Symbol.for("react.profiler"),G=Symbol.for("react.provider"),X=Symbol.for("react.consumer"),I=Symbol.for("react.context"),le=Symbol.for("react.forward_ref"),je=Symbol.for("react.suspense"),Ee=Symbol.for("react.suspense_list"),Qe=Symbol.for("react.memo"),k=Symbol.for("react.lazy"),ne=Symbol.for("react.activity"),Ne=Symbol.for("react.memo_cache_sentinel"),ot=Symbol.iterator;function Ze(e){return e===null||typeof e!="object"?null:(e=ot&&e[ot]||e["@@iterator"],typeof e=="function"?e:null)}var $a=Symbol.for("react.client.reference");function _a(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===$a?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case B:return"Profiler";case D:return"StrictMode";case je:return"Suspense";case Ee:return"SuspenseList";case ne:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case A:return"Portal";case I:return(e.displayName||"Context")+".Provider";case X:return(e._context.displayName||"Context")+".Consumer";case le:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Qe:return t=e.displayName||null,t!==null?t:_a(e.type)||"Memo";case k:t=e._payload,e=e._init;try{return _a(e(t))}catch{}}return null}var dt=Array.isArray,M=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V={pending:!1,data:null,method:null,action:null},oe=[],ce=-1;function Xe(e){return{current:e}}function pe(e){0>ce||(e.current=oe[ce],oe[ce]=null,ce--)}function ue(e,t){ce++,oe[ce]=e.current,e.current=t}var we=Xe(null),ht=Xe(null),Dt=Xe(null),Va=Xe(null);function Ka(e,t){switch(ue(Dt,t),ue(ht,e),ue(we,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Wo(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Wo(t),e=Po(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}pe(we),ue(we,e)}function Et(){pe(we),pe(ht),pe(Dt)}function Ft(e){e.memoizedState!==null&&ue(Va,e);var t=we.current,a=Po(t,e.type);t!==a&&(ue(ht,e),ue(we,a))}function ka(e){ht.current===e&&(pe(we),pe(ht)),Va.current===e&&(pe(Va),wn._currentValue=V)}var Y=Object.prototype.hasOwnProperty,_e=r.unstable_scheduleCallback,Ja=r.unstable_cancelCallback,ql=r.unstable_shouldYield,Zd=r.unstable_requestPaint,wt=r.unstable_now,$d=r.unstable_getCurrentPriorityLevel,wc=r.unstable_ImmediatePriority,zc=r.unstable_UserBlockingPriority,Xn=r.unstable_NormalPriority,Vd=r.unstable_LowPriority,Oc=r.unstable_IdlePriority,Kd=r.log,kd=r.unstable_setDisableYieldValue,Bl=null,tt=null;function ea(e){if(typeof Kd=="function"&&kd(e),tt&&typeof tt.setStrictMode=="function")try{tt.setStrictMode(Bl,e)}catch{}}var at=Math.clz32?Math.clz32:Wd,Jd=Math.log,Id=Math.LN2;function Wd(e){return e>>>=0,e===0?32:31-(Jd(e)/Id|0)|0}var Hn=256,Ln=4194304;function Ta(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Yn(e,t,a){var l=e.pendingLanes;if(l===0)return 0;var n=0,s=e.suspendedLanes,u=e.pingedLanes;e=e.warmLanes;var c=l&134217727;return c!==0?(l=c&~s,l!==0?n=Ta(l):(u&=c,u!==0?n=Ta(u):a||(a=c&~e,a!==0&&(n=Ta(a))))):(c=l&~s,c!==0?n=Ta(c):u!==0?n=Ta(u):a||(a=l&~e,a!==0&&(n=Ta(a)))),n===0?0:t!==0&&t!==n&&(t&s)===0&&(s=n&-n,a=t&-t,s>=a||s===32&&(a&4194048)!==0)?t:n}function Cl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Pd(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Mc(){var e=Hn;return Hn<<=1,(Hn&4194048)===0&&(Hn=256),e}function Uc(){var e=Ln;return Ln<<=1,(Ln&62914560)===0&&(Ln=4194304),e}function li(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Gl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fd(e,t,a,l,n,s){var u=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var c=e.entanglements,h=e.expirationTimes,j=e.hiddenUpdates;for(a=u&~a;0<a;){var w=31-at(a),q=1<<w;c[w]=0,h[w]=-1;var _=j[w];if(_!==null)for(j[w]=null,w=0;w<_.length;w++){var T=_[w];T!==null&&(T.lane&=-536870913)}a&=~q}l!==0&&Rc(e,l,0),s!==0&&n===0&&e.tag!==0&&(e.suspendedLanes|=s&~(u&~t))}function Rc(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-at(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|a&4194090}function qc(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var l=31-at(a),n=1<<l;n&t|e[l]&t&&(e[l]|=t),a&=~n}}function ni(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function si(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Bc(){var e=H.p;return e!==0?e:(e=window.event,e===void 0?32:yd(e.type))}function eh(e,t){var a=H.p;try{return H.p=e,t()}finally{H.p=a}}var ta=Math.random().toString(36).slice(2),$e="__reactFiber$"+ta,ke="__reactProps$"+ta,Ia="__reactContainer$"+ta,ii="__reactEvents$"+ta,th="__reactListeners$"+ta,ah="__reactHandles$"+ta,Cc="__reactResources$"+ta,Xl="__reactMarker$"+ta;function ui(e){delete e[$e],delete e[ke],delete e[ii],delete e[th],delete e[ah]}function Wa(e){var t=e[$e];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Ia]||a[$e]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=ad(e);e!==null;){if(a=e[$e])return a;e=ad(e)}return t}e=a,a=e.parentNode}return null}function Pa(e){if(e=e[$e]||e[Ia]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function Hl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(f(33))}function Fa(e){var t=e[Cc];return t||(t=e[Cc]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Re(e){e[Xl]=!0}var Gc=new Set,Xc={};function Da(e,t){el(e,t),el(e+"Capture",t)}function el(e,t){for(Xc[e]=t,e=0;e<t.length;e++)Gc.add(t[e])}var lh=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Hc={},Lc={};function nh(e){return Y.call(Lc,e)?!0:Y.call(Hc,e)?!1:lh.test(e)?Lc[e]=!0:(Hc[e]=!0,!1)}function Qn(e,t,a){if(nh(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function Zn(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Bt(e,t,a,l){if(l===null)e.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+l)}}var ci,Yc;function tl(e){if(ci===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);ci=t&&t[1]||"",Yc=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ci+e+Yc}var ri=!1;function fi(e,t){if(!e||ri)return"";ri=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var q=function(){throw Error()};if(Object.defineProperty(q.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(q,[])}catch(T){var _=T}Reflect.construct(e,[],q)}else{try{q.call()}catch(T){_=T}e.call(q.prototype)}}else{try{throw Error()}catch(T){_=T}(q=e())&&typeof q.catch=="function"&&q.catch(function(){})}}catch(T){if(T&&_&&typeof T.stack=="string")return[T.stack,_.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=l.DetermineComponentFrameRoot(),u=s[0],c=s[1];if(u&&c){var h=u.split(`
`),j=c.split(`
`);for(n=l=0;l<h.length&&!h[l].includes("DetermineComponentFrameRoot");)l++;for(;n<j.length&&!j[n].includes("DetermineComponentFrameRoot");)n++;if(l===h.length||n===j.length)for(l=h.length-1,n=j.length-1;1<=l&&0<=n&&h[l]!==j[n];)n--;for(;1<=l&&0<=n;l--,n--)if(h[l]!==j[n]){if(l!==1||n!==1)do if(l--,n--,0>n||h[l]!==j[n]){var w=`
`+h[l].replace(" at new "," at ");return e.displayName&&w.includes("<anonymous>")&&(w=w.replace("<anonymous>",e.displayName)),w}while(1<=l&&0<=n);break}}}finally{ri=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?tl(a):""}function sh(e){switch(e.tag){case 26:case 27:case 5:return tl(e.type);case 16:return tl("Lazy");case 13:return tl("Suspense");case 19:return tl("SuspenseList");case 0:case 15:return fi(e.type,!1);case 11:return fi(e.type.render,!1);case 1:return fi(e.type,!0);case 31:return tl("Activity");default:return""}}function Qc(e){try{var t="";do t+=sh(e),e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function mt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Zc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ih(e){var t=Zc(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),l=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var n=a.get,s=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return n.call(this)},set:function(u){l=""+u,s.call(this,u)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return l},setValue:function(u){l=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $n(e){e._valueTracker||(e._valueTracker=ih(e))}function $c(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),l="";return e&&(l=Zc(e)?e.checked?"true":"false":e.value),e=l,e!==a?(t.setValue(e),!0):!1}function Vn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var uh=/[\n"\\]/g;function gt(e){return e.replace(uh,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function oi(e,t,a,l,n,s,u,c){e.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.type=u:e.removeAttribute("type"),t!=null?u==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+mt(t)):e.value!==""+mt(t)&&(e.value=""+mt(t)):u!=="submit"&&u!=="reset"||e.removeAttribute("value"),t!=null?di(e,u,mt(t)):a!=null?di(e,u,mt(a)):l!=null&&e.removeAttribute("value"),n==null&&s!=null&&(e.defaultChecked=!!s),n!=null&&(e.checked=n&&typeof n!="function"&&typeof n!="symbol"),c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?e.name=""+mt(c):e.removeAttribute("name")}function Vc(e,t,a,l,n,s,u,c){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||a!=null){if(!(s!=="submit"&&s!=="reset"||t!=null))return;a=a!=null?""+mt(a):"",t=t!=null?""+mt(t):a,c||t===e.value||(e.value=t),e.defaultValue=t}l=l??n,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=c?e.checked:!!l,e.defaultChecked=!!l,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.name=u)}function di(e,t,a){t==="number"&&Vn(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function al(e,t,a,l){if(e=e.options,t){t={};for(var n=0;n<a.length;n++)t["$"+a[n]]=!0;for(a=0;a<e.length;a++)n=t.hasOwnProperty("$"+e[a].value),e[a].selected!==n&&(e[a].selected=n),n&&l&&(e[a].defaultSelected=!0)}else{for(a=""+mt(a),t=null,n=0;n<e.length;n++){if(e[n].value===a){e[n].selected=!0,l&&(e[n].defaultSelected=!0);return}t!==null||e[n].disabled||(t=e[n])}t!==null&&(t.selected=!0)}}function Kc(e,t,a){if(t!=null&&(t=""+mt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+mt(a):""}function kc(e,t,a,l){if(t==null){if(l!=null){if(a!=null)throw Error(f(92));if(dt(l)){if(1<l.length)throw Error(f(93));l=l[0]}a=l}a==null&&(a=""),t=a}a=mt(t),e.defaultValue=a,l=e.textContent,l===a&&l!==""&&l!==null&&(e.value=l)}function ll(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var ch=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Jc(e,t,a){var l=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,a):typeof a!="number"||a===0||ch.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Ic(e,t,a){if(t!=null&&typeof t!="object")throw Error(f(62));if(e=e.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var n in t)l=t[n],t.hasOwnProperty(n)&&a[n]!==l&&Jc(e,n,l)}else for(var s in t)t.hasOwnProperty(s)&&Jc(e,s,t[s])}function hi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var rh=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),fh=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Kn(e){return fh.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var mi=null;function gi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var nl=null,sl=null;function Wc(e){var t=Pa(e);if(t&&(e=t.stateNode)){var a=e[ke]||null;e:switch(e=t.stateNode,t.type){case"input":if(oi(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+gt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var l=a[t];if(l!==e&&l.form===e.form){var n=l[ke]||null;if(!n)throw Error(f(90));oi(l,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<a.length;t++)l=a[t],l.form===e.form&&$c(l)}break e;case"textarea":Kc(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&al(e,!!a.multiple,t,!1)}}}var xi=!1;function Pc(e,t,a){if(xi)return e(t,a);xi=!0;try{var l=e(t);return l}finally{if(xi=!1,(nl!==null||sl!==null)&&(Ms(),nl&&(t=nl,e=sl,sl=nl=null,Wc(t),e)))for(t=0;t<e.length;t++)Wc(e[t])}}function Ll(e,t){var a=e.stateNode;if(a===null)return null;var l=a[ke]||null;if(l===null)return null;a=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(f(231,t,typeof a));return a}var Ct=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),yi=!1;if(Ct)try{var Yl={};Object.defineProperty(Yl,"passive",{get:function(){yi=!0}}),window.addEventListener("test",Yl,Yl),window.removeEventListener("test",Yl,Yl)}catch{yi=!1}var aa=null,pi=null,kn=null;function Fc(){if(kn)return kn;var e,t=pi,a=t.length,l,n="value"in aa?aa.value:aa.textContent,s=n.length;for(e=0;e<a&&t[e]===n[e];e++);var u=a-e;for(l=1;l<=u&&t[a-l]===n[s-l];l++);return kn=n.slice(e,1<l?1-l:void 0)}function Jn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function In(){return!0}function er(){return!1}function Je(e){function t(a,l,n,s,u){this._reactName=a,this._targetInst=n,this.type=l,this.nativeEvent=s,this.target=u,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(a=e[c],this[c]=a?a(s):s[c]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?In:er,this.isPropagationStopped=er,this}return R(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=In)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=In)},persist:function(){},isPersistent:In}),t}var Ea={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wn=Je(Ea),Ql=R({},Ea,{view:0,detail:0}),oh=Je(Ql),vi,bi,Zl,Pn=R({},Ql,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Si,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Zl&&(Zl&&e.type==="mousemove"?(vi=e.screenX-Zl.screenX,bi=e.screenY-Zl.screenY):bi=vi=0,Zl=e),vi)},movementY:function(e){return"movementY"in e?e.movementY:bi}}),tr=Je(Pn),dh=R({},Pn,{dataTransfer:0}),hh=Je(dh),mh=R({},Ql,{relatedTarget:0}),ji=Je(mh),gh=R({},Ea,{animationName:0,elapsedTime:0,pseudoElement:0}),xh=Je(gh),yh=R({},Ea,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ph=Je(yh),vh=R({},Ea,{data:0}),ar=Je(vh),bh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Sh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ah(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Sh[e])?!!t[e]:!1}function Si(){return Ah}var Nh=R({},Ql,{key:function(e){if(e.key){var t=bh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Jn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?jh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Si,charCode:function(e){return e.type==="keypress"?Jn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Jn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),_h=Je(Nh),Th=R({},Pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lr=Je(Th),Dh=R({},Ql,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Si}),Eh=Je(Dh),wh=R({},Ea,{propertyName:0,elapsedTime:0,pseudoElement:0}),zh=Je(wh),Oh=R({},Pn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Mh=Je(Oh),Uh=R({},Ea,{newState:0,oldState:0}),Rh=Je(Uh),qh=[9,13,27,32],Ai=Ct&&"CompositionEvent"in window,$l=null;Ct&&"documentMode"in document&&($l=document.documentMode);var Bh=Ct&&"TextEvent"in window&&!$l,nr=Ct&&(!Ai||$l&&8<$l&&11>=$l),sr=" ",ir=!1;function ur(e,t){switch(e){case"keyup":return qh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function cr(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var il=!1;function Ch(e,t){switch(e){case"compositionend":return cr(t);case"keypress":return t.which!==32?null:(ir=!0,sr);case"textInput":return e=t.data,e===sr&&ir?null:e;default:return null}}function Gh(e,t){if(il)return e==="compositionend"||!Ai&&ur(e,t)?(e=Fc(),kn=pi=aa=null,il=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return nr&&t.locale!=="ko"?null:t.data;default:return null}}var Xh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Xh[e.type]:t==="textarea"}function fr(e,t,a,l){nl?sl?sl.push(l):sl=[l]:nl=l,t=Gs(t,"onChange"),0<t.length&&(a=new Wn("onChange","change",null,a,l),e.push({event:a,listeners:t}))}var Vl=null,Kl=null;function Hh(e){Vo(e,0)}function Fn(e){var t=Hl(e);if($c(t))return e}function or(e,t){if(e==="change")return t}var dr=!1;if(Ct){var Ni;if(Ct){var _i="oninput"in document;if(!_i){var hr=document.createElement("div");hr.setAttribute("oninput","return;"),_i=typeof hr.oninput=="function"}Ni=_i}else Ni=!1;dr=Ni&&(!document.documentMode||9<document.documentMode)}function mr(){Vl&&(Vl.detachEvent("onpropertychange",gr),Kl=Vl=null)}function gr(e){if(e.propertyName==="value"&&Fn(Kl)){var t=[];fr(t,Kl,e,gi(e)),Pc(Hh,t)}}function Lh(e,t,a){e==="focusin"?(mr(),Vl=t,Kl=a,Vl.attachEvent("onpropertychange",gr)):e==="focusout"&&mr()}function Yh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Fn(Kl)}function Qh(e,t){if(e==="click")return Fn(t)}function Zh(e,t){if(e==="input"||e==="change")return Fn(t)}function $h(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var lt=typeof Object.is=="function"?Object.is:$h;function kl(e,t){if(lt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),l=Object.keys(t);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var n=a[l];if(!Y.call(t,n)||!lt(e[n],t[n]))return!1}return!0}function xr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function yr(e,t){var a=xr(e);e=0;for(var l;a;){if(a.nodeType===3){if(l=e+a.textContent.length,e<=t&&l>=t)return{node:a,offset:t-e};e=l}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=xr(a)}}function pr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?pr(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function vr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Vn(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Vn(e.document)}return t}function Ti(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Vh=Ct&&"documentMode"in document&&11>=document.documentMode,ul=null,Di=null,Jl=null,Ei=!1;function br(e,t,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ei||ul==null||ul!==Vn(l)||(l=ul,"selectionStart"in l&&Ti(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Jl&&kl(Jl,l)||(Jl=l,l=Gs(Di,"onSelect"),0<l.length&&(t=new Wn("onSelect","select",null,t,a),e.push({event:t,listeners:l}),t.target=ul)))}function wa(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var cl={animationend:wa("Animation","AnimationEnd"),animationiteration:wa("Animation","AnimationIteration"),animationstart:wa("Animation","AnimationStart"),transitionrun:wa("Transition","TransitionRun"),transitionstart:wa("Transition","TransitionStart"),transitioncancel:wa("Transition","TransitionCancel"),transitionend:wa("Transition","TransitionEnd")},wi={},jr={};Ct&&(jr=document.createElement("div").style,"AnimationEvent"in window||(delete cl.animationend.animation,delete cl.animationiteration.animation,delete cl.animationstart.animation),"TransitionEvent"in window||delete cl.transitionend.transition);function za(e){if(wi[e])return wi[e];if(!cl[e])return e;var t=cl[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in jr)return wi[e]=t[a];return e}var Sr=za("animationend"),Ar=za("animationiteration"),Nr=za("animationstart"),Kh=za("transitionrun"),kh=za("transitionstart"),Jh=za("transitioncancel"),_r=za("transitionend"),Tr=new Map,zi="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");zi.push("scrollEnd");function Nt(e,t){Tr.set(e,t),Da(t,[e])}var Dr=new WeakMap;function xt(e,t){if(typeof e=="object"&&e!==null){var a=Dr.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Qc(t)},Dr.set(e,t),t)}return{value:e,source:t,stack:Qc(t)}}var yt=[],rl=0,Oi=0;function es(){for(var e=rl,t=Oi=rl=0;t<e;){var a=yt[t];yt[t++]=null;var l=yt[t];yt[t++]=null;var n=yt[t];yt[t++]=null;var s=yt[t];if(yt[t++]=null,l!==null&&n!==null){var u=l.pending;u===null?n.next=n:(n.next=u.next,u.next=n),l.pending=n}s!==0&&Er(a,n,s)}}function ts(e,t,a,l){yt[rl++]=e,yt[rl++]=t,yt[rl++]=a,yt[rl++]=l,Oi|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Mi(e,t,a,l){return ts(e,t,a,l),as(e)}function fl(e,t){return ts(e,null,null,t),as(e)}function Er(e,t,a){e.lanes|=a;var l=e.alternate;l!==null&&(l.lanes|=a);for(var n=!1,s=e.return;s!==null;)s.childLanes|=a,l=s.alternate,l!==null&&(l.childLanes|=a),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(n=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,n&&t!==null&&(n=31-at(a),e=s.hiddenUpdates,l=e[n],l===null?e[n]=[t]:l.push(t),t.lane=a|536870912),s):null}function as(e){if(50<jn)throw jn=0,Gu=null,Error(f(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ol={};function Ih(e,t,a,l){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function nt(e,t,a,l){return new Ih(e,t,a,l)}function Ui(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Gt(e,t){var a=e.alternate;return a===null?(a=nt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function wr(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ls(e,t,a,l,n,s){var u=0;if(l=e,typeof e=="function")Ui(e)&&(u=1);else if(typeof e=="string")u=Pm(e,a,we.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case ne:return e=nt(31,a,t,n),e.elementType=ne,e.lanes=s,e;case N:return Oa(a.children,n,s,t);case D:u=8,n|=24;break;case B:return e=nt(12,a,t,n|2),e.elementType=B,e.lanes=s,e;case je:return e=nt(13,a,t,n),e.elementType=je,e.lanes=s,e;case Ee:return e=nt(19,a,t,n),e.elementType=Ee,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case G:case I:u=10;break e;case X:u=9;break e;case le:u=11;break e;case Qe:u=14;break e;case k:u=16,l=null;break e}u=29,a=Error(f(130,e===null?"null":typeof e,"")),l=null}return t=nt(u,a,t,n),t.elementType=e,t.type=l,t.lanes=s,t}function Oa(e,t,a,l){return e=nt(7,e,l,t),e.lanes=a,e}function Ri(e,t,a){return e=nt(6,e,null,t),e.lanes=a,e}function qi(e,t,a){return t=nt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var dl=[],hl=0,ns=null,ss=0,pt=[],vt=0,Ma=null,Xt=1,Ht="";function Ua(e,t){dl[hl++]=ss,dl[hl++]=ns,ns=e,ss=t}function zr(e,t,a){pt[vt++]=Xt,pt[vt++]=Ht,pt[vt++]=Ma,Ma=e;var l=Xt;e=Ht;var n=32-at(l)-1;l&=~(1<<n),a+=1;var s=32-at(t)+n;if(30<s){var u=n-n%5;s=(l&(1<<u)-1).toString(32),l>>=u,n-=u,Xt=1<<32-at(t)+n|a<<n|l,Ht=s+e}else Xt=1<<s|a<<n|l,Ht=e}function Bi(e){e.return!==null&&(Ua(e,1),zr(e,1,0))}function Ci(e){for(;e===ns;)ns=dl[--hl],dl[hl]=null,ss=dl[--hl],dl[hl]=null;for(;e===Ma;)Ma=pt[--vt],pt[vt]=null,Ht=pt[--vt],pt[vt]=null,Xt=pt[--vt],pt[vt]=null}var Ke=null,Se=null,ie=!1,Ra=null,zt=!1,Gi=Error(f(519));function qa(e){var t=Error(f(418,""));throw Pl(xt(t,e)),Gi}function Or(e){var t=e.stateNode,a=e.type,l=e.memoizedProps;switch(t[$e]=e,t[ke]=l,a){case"dialog":te("cancel",t),te("close",t);break;case"iframe":case"object":case"embed":te("load",t);break;case"video":case"audio":for(a=0;a<An.length;a++)te(An[a],t);break;case"source":te("error",t);break;case"img":case"image":case"link":te("error",t),te("load",t);break;case"details":te("toggle",t);break;case"input":te("invalid",t),Vc(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0),$n(t);break;case"select":te("invalid",t);break;case"textarea":te("invalid",t),kc(t,l.value,l.defaultValue,l.children),$n(t)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||l.suppressHydrationWarning===!0||Io(t.textContent,a)?(l.popover!=null&&(te("beforetoggle",t),te("toggle",t)),l.onScroll!=null&&te("scroll",t),l.onScrollEnd!=null&&te("scrollend",t),l.onClick!=null&&(t.onclick=Xs),t=!0):t=!1,t||qa(e)}function Mr(e){for(Ke=e.return;Ke;)switch(Ke.tag){case 5:case 13:zt=!1;return;case 27:case 3:zt=!0;return;default:Ke=Ke.return}}function Il(e){if(e!==Ke)return!1;if(!ie)return Mr(e),ie=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||ec(e.type,e.memoizedProps)),a=!a),a&&Se&&qa(e),Mr(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(f(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(t===0){Se=Tt(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++;e=e.nextSibling}Se=null}}else t===27?(t=Se,pa(e.type)?(e=nc,nc=null,Se=e):Se=t):Se=Ke?Tt(e.stateNode.nextSibling):null;return!0}function Wl(){Se=Ke=null,ie=!1}function Ur(){var e=Ra;return e!==null&&(Pe===null?Pe=e:Pe.push.apply(Pe,e),Ra=null),e}function Pl(e){Ra===null?Ra=[e]:Ra.push(e)}var Xi=Xe(null),Ba=null,Lt=null;function la(e,t,a){ue(Xi,t._currentValue),t._currentValue=a}function Yt(e){e._currentValue=Xi.current,pe(Xi)}function Hi(e,t,a){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===a)break;e=e.return}}function Li(e,t,a,l){var n=e.child;for(n!==null&&(n.return=e);n!==null;){var s=n.dependencies;if(s!==null){var u=n.child;s=s.firstContext;e:for(;s!==null;){var c=s;s=n;for(var h=0;h<t.length;h++)if(c.context===t[h]){s.lanes|=a,c=s.alternate,c!==null&&(c.lanes|=a),Hi(s.return,a,e),l||(u=null);break e}s=c.next}}else if(n.tag===18){if(u=n.return,u===null)throw Error(f(341));u.lanes|=a,s=u.alternate,s!==null&&(s.lanes|=a),Hi(u,a,e),u=null}else u=n.child;if(u!==null)u.return=n;else for(u=n;u!==null;){if(u===e){u=null;break}if(n=u.sibling,n!==null){n.return=u.return,u=n;break}u=u.return}n=u}}function Fl(e,t,a,l){e=null;for(var n=t,s=!1;n!==null;){if(!s){if((n.flags&524288)!==0)s=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var u=n.alternate;if(u===null)throw Error(f(387));if(u=u.memoizedProps,u!==null){var c=n.type;lt(n.pendingProps.value,u.value)||(e!==null?e.push(c):e=[c])}}else if(n===Va.current){if(u=n.alternate,u===null)throw Error(f(387));u.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(e!==null?e.push(wn):e=[wn])}n=n.return}e!==null&&Li(t,e,a,l),t.flags|=262144}function is(e){for(e=e.firstContext;e!==null;){if(!lt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ca(e){Ba=e,Lt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ve(e){return Rr(Ba,e)}function us(e,t){return Ba===null&&Ca(e),Rr(e,t)}function Rr(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Lt===null){if(e===null)throw Error(f(308));Lt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Lt=Lt.next=t;return a}var Wh=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},Ph=r.unstable_scheduleCallback,Fh=r.unstable_NormalPriority,Me={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Yi(){return{controller:new Wh,data:new Map,refCount:0}}function en(e){e.refCount--,e.refCount===0&&Ph(Fh,function(){e.controller.abort()})}var tn=null,Qi=0,ml=0,gl=null;function em(e,t){if(tn===null){var a=tn=[];Qi=0,ml=$u(),gl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return Qi++,t.then(qr,qr),t}function qr(){if(--Qi===0&&tn!==null){gl!==null&&(gl.status="fulfilled");var e=tn;tn=null,ml=0,gl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function tm(e,t){var a=[],l={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var n=0;n<a.length;n++)(0,a[n])(t)},function(n){for(l.status="rejected",l.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),l}var Br=M.S;M.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&em(e,t),Br!==null&&Br(e,t)};var Ga=Xe(null);function Zi(){var e=Ga.current;return e!==null?e:ye.pooledCache}function cs(e,t){t===null?ue(Ga,Ga.current):ue(Ga,t.pool)}function Cr(){var e=Zi();return e===null?null:{parent:Me._currentValue,pool:e}}var an=Error(f(460)),Gr=Error(f(474)),rs=Error(f(542)),$i={then:function(){}};function Xr(e){return e=e.status,e==="fulfilled"||e==="rejected"}function fs(){}function Hr(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(fs,fs),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Yr(e),e;default:if(typeof t.status=="string")t.then(fs,fs);else{if(e=ye,e!==null&&100<e.shellSuspendCounter)throw Error(f(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=l}},function(l){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Yr(e),e}throw ln=t,an}}var ln=null;function Lr(){if(ln===null)throw Error(f(459));var e=ln;return ln=null,e}function Yr(e){if(e===an||e===rs)throw Error(f(483))}var na=!1;function Vi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ki(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function sa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ia(e,t,a){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(re&2)!==0){var n=l.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),l.pending=t,t=as(e),Er(e,null,a),t}return ts(e,l,t,a),as(e)}function nn(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,qc(e,a)}}function ki(e,t){var a=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var n=null,s=null;if(a=a.firstBaseUpdate,a!==null){do{var u={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};s===null?n=s=u:s=s.next=u,a=a.next}while(a!==null);s===null?n=s=t:s=s.next=t}else n=s=t;a={baseState:l.baseState,firstBaseUpdate:n,lastBaseUpdate:s,shared:l.shared,callbacks:l.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Ji=!1;function sn(){if(Ji){var e=gl;if(e!==null)throw e}}function un(e,t,a,l){Ji=!1;var n=e.updateQueue;na=!1;var s=n.firstBaseUpdate,u=n.lastBaseUpdate,c=n.shared.pending;if(c!==null){n.shared.pending=null;var h=c,j=h.next;h.next=null,u===null?s=j:u.next=j,u=h;var w=e.alternate;w!==null&&(w=w.updateQueue,c=w.lastBaseUpdate,c!==u&&(c===null?w.firstBaseUpdate=j:c.next=j,w.lastBaseUpdate=h))}if(s!==null){var q=n.baseState;u=0,w=j=h=null,c=s;do{var _=c.lane&-536870913,T=_!==c.lane;if(T?(ae&_)===_:(l&_)===_){_!==0&&_===ml&&(Ji=!0),w!==null&&(w=w.next={lane:0,tag:c.tag,payload:c.payload,callback:null,next:null});e:{var K=e,Z=c;_=t;var me=a;switch(Z.tag){case 1:if(K=Z.payload,typeof K=="function"){q=K.call(me,q,_);break e}q=K;break e;case 3:K.flags=K.flags&-65537|128;case 0:if(K=Z.payload,_=typeof K=="function"?K.call(me,q,_):K,_==null)break e;q=R({},q,_);break e;case 2:na=!0}}_=c.callback,_!==null&&(e.flags|=64,T&&(e.flags|=8192),T=n.callbacks,T===null?n.callbacks=[_]:T.push(_))}else T={lane:_,tag:c.tag,payload:c.payload,callback:c.callback,next:null},w===null?(j=w=T,h=q):w=w.next=T,u|=_;if(c=c.next,c===null){if(c=n.shared.pending,c===null)break;T=c,c=T.next,T.next=null,n.lastBaseUpdate=T,n.shared.pending=null}}while(!0);w===null&&(h=q),n.baseState=h,n.firstBaseUpdate=j,n.lastBaseUpdate=w,s===null&&(n.shared.lanes=0),ma|=u,e.lanes=u,e.memoizedState=q}}function Qr(e,t){if(typeof e!="function")throw Error(f(191,e));e.call(t)}function Zr(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Qr(a[e],t)}var xl=Xe(null),os=Xe(0);function $r(e,t){e=Jt,ue(os,e),ue(xl,t),Jt=e|t.baseLanes}function Ii(){ue(os,Jt),ue(xl,xl.current)}function Wi(){Jt=os.current,pe(xl),pe(os)}var ua=0,W=null,de=null,ze=null,ds=!1,yl=!1,Xa=!1,hs=0,cn=0,pl=null,am=0;function Te(){throw Error(f(321))}function Pi(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!lt(e[a],t[a]))return!1;return!0}function Fi(e,t,a,l,n,s){return ua=s,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,M.H=e===null||e.memoizedState===null?wf:zf,Xa=!1,s=a(l,n),Xa=!1,yl&&(s=Kr(t,a,l,n)),Vr(e),s}function Vr(e){M.H=vs;var t=de!==null&&de.next!==null;if(ua=0,ze=de=W=null,ds=!1,cn=0,pl=null,t)throw Error(f(300));e===null||qe||(e=e.dependencies,e!==null&&is(e)&&(qe=!0))}function Kr(e,t,a,l){W=e;var n=0;do{if(yl&&(pl=null),cn=0,yl=!1,25<=n)throw Error(f(301));if(n+=1,ze=de=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}M.H=rm,s=t(a,l)}while(yl);return s}function lm(){var e=M.H,t=e.useState()[0];return t=typeof t.then=="function"?rn(t):t,e=e.useState()[0],(de!==null?de.memoizedState:null)!==e&&(W.flags|=1024),t}function eu(){var e=hs!==0;return hs=0,e}function tu(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function au(e){if(ds){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ds=!1}ua=0,ze=de=W=null,yl=!1,cn=hs=0,pl=null}function Ie(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ze===null?W.memoizedState=ze=e:ze=ze.next=e,ze}function Oe(){if(de===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=de.next;var t=ze===null?W.memoizedState:ze.next;if(t!==null)ze=t,de=e;else{if(e===null)throw W.alternate===null?Error(f(467)):Error(f(310));de=e,e={memoizedState:de.memoizedState,baseState:de.baseState,baseQueue:de.baseQueue,queue:de.queue,next:null},ze===null?W.memoizedState=ze=e:ze=ze.next=e}return ze}function lu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function rn(e){var t=cn;return cn+=1,pl===null&&(pl=[]),e=Hr(pl,e,t),t=W,(ze===null?t.memoizedState:ze.next)===null&&(t=t.alternate,M.H=t===null||t.memoizedState===null?wf:zf),e}function ms(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return rn(e);if(e.$$typeof===I)return Ve(e)}throw Error(f(438,String(e)))}function nu(e){var t=null,a=W.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var l=W.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=lu(),W.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),l=0;l<e;l++)a[l]=Ne;return t.index++,a}function Qt(e,t){return typeof t=="function"?t(e):t}function gs(e){var t=Oe();return su(t,de,e)}function su(e,t,a){var l=e.queue;if(l===null)throw Error(f(311));l.lastRenderedReducer=a;var n=e.baseQueue,s=l.pending;if(s!==null){if(n!==null){var u=n.next;n.next=s.next,s.next=u}t.baseQueue=n=s,l.pending=null}if(s=e.baseState,n===null)e.memoizedState=s;else{t=n.next;var c=u=null,h=null,j=t,w=!1;do{var q=j.lane&-536870913;if(q!==j.lane?(ae&q)===q:(ua&q)===q){var _=j.revertLane;if(_===0)h!==null&&(h=h.next={lane:0,revertLane:0,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null}),q===ml&&(w=!0);else if((ua&_)===_){j=j.next,_===ml&&(w=!0);continue}else q={lane:0,revertLane:j.revertLane,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},h===null?(c=h=q,u=s):h=h.next=q,W.lanes|=_,ma|=_;q=j.action,Xa&&a(s,q),s=j.hasEagerState?j.eagerState:a(s,q)}else _={lane:q,revertLane:j.revertLane,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},h===null?(c=h=_,u=s):h=h.next=_,W.lanes|=q,ma|=q;j=j.next}while(j!==null&&j!==t);if(h===null?u=s:h.next=c,!lt(s,e.memoizedState)&&(qe=!0,w&&(a=gl,a!==null)))throw a;e.memoizedState=s,e.baseState=u,e.baseQueue=h,l.lastRenderedState=s}return n===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function iu(e){var t=Oe(),a=t.queue;if(a===null)throw Error(f(311));a.lastRenderedReducer=e;var l=a.dispatch,n=a.pending,s=t.memoizedState;if(n!==null){a.pending=null;var u=n=n.next;do s=e(s,u.action),u=u.next;while(u!==n);lt(s,t.memoizedState)||(qe=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),a.lastRenderedState=s}return[s,l]}function kr(e,t,a){var l=W,n=Oe(),s=ie;if(s){if(a===void 0)throw Error(f(407));a=a()}else a=t();var u=!lt((de||n).memoizedState,a);u&&(n.memoizedState=a,qe=!0),n=n.queue;var c=Wr.bind(null,l,n,e);if(fn(2048,8,c,[e]),n.getSnapshot!==t||u||ze!==null&&ze.memoizedState.tag&1){if(l.flags|=2048,vl(9,xs(),Ir.bind(null,l,n,a,t),null),ye===null)throw Error(f(349));s||(ua&124)!==0||Jr(l,t,a)}return a}function Jr(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=W.updateQueue,t===null?(t=lu(),W.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Ir(e,t,a,l){t.value=a,t.getSnapshot=l,Pr(t)&&Fr(e)}function Wr(e,t,a){return a(function(){Pr(t)&&Fr(e)})}function Pr(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!lt(e,a)}catch{return!0}}function Fr(e){var t=fl(e,2);t!==null&&rt(t,e,2)}function uu(e){var t=Ie();if(typeof e=="function"){var a=e;if(e=a(),Xa){ea(!0);try{a()}finally{ea(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qt,lastRenderedState:e},t}function ef(e,t,a,l){return e.baseState=a,su(e,de,typeof l=="function"?l:Qt)}function nm(e,t,a,l,n){if(ps(e))throw Error(f(485));if(e=t.action,e!==null){var s={payload:n,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){s.listeners.push(u)}};M.T!==null?a(!0):s.isTransition=!1,l(s),a=t.pending,a===null?(s.next=t.pending=s,tf(t,s)):(s.next=a.next,t.pending=a.next=s)}}function tf(e,t){var a=t.action,l=t.payload,n=e.state;if(t.isTransition){var s=M.T,u={};M.T=u;try{var c=a(n,l),h=M.S;h!==null&&h(u,c),af(e,t,c)}catch(j){cu(e,t,j)}finally{M.T=s}}else try{s=a(n,l),af(e,t,s)}catch(j){cu(e,t,j)}}function af(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){lf(e,t,l)},function(l){return cu(e,t,l)}):lf(e,t,a)}function lf(e,t,a){t.status="fulfilled",t.value=a,nf(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,tf(e,a)))}function cu(e,t,a){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=a,nf(t),t=t.next;while(t!==l)}e.action=null}function nf(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function sf(e,t){return t}function uf(e,t){if(ie){var a=ye.formState;if(a!==null){e:{var l=W;if(ie){if(Se){t:{for(var n=Se,s=zt;n.nodeType!==8;){if(!s){n=null;break t}if(n=Tt(n.nextSibling),n===null){n=null;break t}}s=n.data,n=s==="F!"||s==="F"?n:null}if(n){Se=Tt(n.nextSibling),l=n.data==="F!";break e}}qa(l)}l=!1}l&&(t=a[0])}}return a=Ie(),a.memoizedState=a.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:sf,lastRenderedState:t},a.queue=l,a=Tf.bind(null,W,l),l.dispatch=a,l=uu(!1),s=hu.bind(null,W,!1,l.queue),l=Ie(),n={state:t,dispatch:null,action:e,pending:null},l.queue=n,a=nm.bind(null,W,n,s,a),n.dispatch=a,l.memoizedState=e,[t,a,!1]}function cf(e){var t=Oe();return rf(t,de,e)}function rf(e,t,a){if(t=su(e,t,sf)[0],e=gs(Qt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=rn(t)}catch(u){throw u===an?rs:u}else l=t;t=Oe();var n=t.queue,s=n.dispatch;return a!==t.memoizedState&&(W.flags|=2048,vl(9,xs(),sm.bind(null,n,a),null)),[l,s,e]}function sm(e,t){e.action=t}function ff(e){var t=Oe(),a=de;if(a!==null)return rf(t,a,e);Oe(),t=t.memoizedState,a=Oe();var l=a.queue.dispatch;return a.memoizedState=e,[t,l,!1]}function vl(e,t,a,l){return e={tag:e,create:a,deps:l,inst:t,next:null},t=W.updateQueue,t===null&&(t=lu(),W.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(l=a.next,a.next=e,e.next=l,t.lastEffect=e),e}function xs(){return{destroy:void 0,resource:void 0}}function of(){return Oe().memoizedState}function ys(e,t,a,l){var n=Ie();l=l===void 0?null:l,W.flags|=e,n.memoizedState=vl(1|t,xs(),a,l)}function fn(e,t,a,l){var n=Oe();l=l===void 0?null:l;var s=n.memoizedState.inst;de!==null&&l!==null&&Pi(l,de.memoizedState.deps)?n.memoizedState=vl(t,s,a,l):(W.flags|=e,n.memoizedState=vl(1|t,s,a,l))}function df(e,t){ys(8390656,8,e,t)}function hf(e,t){fn(2048,8,e,t)}function mf(e,t){return fn(4,2,e,t)}function gf(e,t){return fn(4,4,e,t)}function xf(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function yf(e,t,a){a=a!=null?a.concat([e]):null,fn(4,4,xf.bind(null,t,e),a)}function ru(){}function pf(e,t){var a=Oe();t=t===void 0?null:t;var l=a.memoizedState;return t!==null&&Pi(t,l[1])?l[0]:(a.memoizedState=[e,t],e)}function vf(e,t){var a=Oe();t=t===void 0?null:t;var l=a.memoizedState;if(t!==null&&Pi(t,l[1]))return l[0];if(l=e(),Xa){ea(!0);try{e()}finally{ea(!1)}}return a.memoizedState=[l,t],l}function fu(e,t,a){return a===void 0||(ua&1073741824)!==0?e.memoizedState=t:(e.memoizedState=a,e=Ao(),W.lanes|=e,ma|=e,a)}function bf(e,t,a,l){return lt(a,t)?a:xl.current!==null?(e=fu(e,a,l),lt(e,t)||(qe=!0),e):(ua&42)===0?(qe=!0,e.memoizedState=a):(e=Ao(),W.lanes|=e,ma|=e,t)}function jf(e,t,a,l,n){var s=H.p;H.p=s!==0&&8>s?s:8;var u=M.T,c={};M.T=c,hu(e,!1,t,a);try{var h=n(),j=M.S;if(j!==null&&j(c,h),h!==null&&typeof h=="object"&&typeof h.then=="function"){var w=tm(h,l);on(e,t,w,ct(e))}else on(e,t,l,ct(e))}catch(q){on(e,t,{then:function(){},status:"rejected",reason:q},ct())}finally{H.p=s,M.T=u}}function im(){}function ou(e,t,a,l){if(e.tag!==5)throw Error(f(476));var n=Sf(e).queue;jf(e,n,t,V,a===null?im:function(){return Af(e),a(l)})}function Sf(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:V,baseState:V,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qt,lastRenderedState:V},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Af(e){var t=Sf(e).next.queue;on(e,t,{},ct())}function du(){return Ve(wn)}function Nf(){return Oe().memoizedState}function _f(){return Oe().memoizedState}function um(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=ct();e=sa(a);var l=ia(t,e,a);l!==null&&(rt(l,t,a),nn(l,t,a)),t={cache:Yi()},e.payload=t;return}t=t.return}}function cm(e,t,a){var l=ct();a={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},ps(e)?Df(t,a):(a=Mi(e,t,a,l),a!==null&&(rt(a,e,l),Ef(a,t,l)))}function Tf(e,t,a){var l=ct();on(e,t,a,l)}function on(e,t,a,l){var n={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(ps(e))Df(t,n);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var u=t.lastRenderedState,c=s(u,a);if(n.hasEagerState=!0,n.eagerState=c,lt(c,u))return ts(e,t,n,0),ye===null&&es(),!1}catch{}finally{}if(a=Mi(e,t,n,l),a!==null)return rt(a,e,l),Ef(a,t,l),!0}return!1}function hu(e,t,a,l){if(l={lane:2,revertLane:$u(),action:l,hasEagerState:!1,eagerState:null,next:null},ps(e)){if(t)throw Error(f(479))}else t=Mi(e,a,l,2),t!==null&&rt(t,e,2)}function ps(e){var t=e.alternate;return e===W||t!==null&&t===W}function Df(e,t){yl=ds=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Ef(e,t,a){if((a&4194048)!==0){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,qc(e,a)}}var vs={readContext:Ve,use:ms,useCallback:Te,useContext:Te,useEffect:Te,useImperativeHandle:Te,useLayoutEffect:Te,useInsertionEffect:Te,useMemo:Te,useReducer:Te,useRef:Te,useState:Te,useDebugValue:Te,useDeferredValue:Te,useTransition:Te,useSyncExternalStore:Te,useId:Te,useHostTransitionStatus:Te,useFormState:Te,useActionState:Te,useOptimistic:Te,useMemoCache:Te,useCacheRefresh:Te},wf={readContext:Ve,use:ms,useCallback:function(e,t){return Ie().memoizedState=[e,t===void 0?null:t],e},useContext:Ve,useEffect:df,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,ys(4194308,4,xf.bind(null,t,e),a)},useLayoutEffect:function(e,t){return ys(4194308,4,e,t)},useInsertionEffect:function(e,t){ys(4,2,e,t)},useMemo:function(e,t){var a=Ie();t=t===void 0?null:t;var l=e();if(Xa){ea(!0);try{e()}finally{ea(!1)}}return a.memoizedState=[l,t],l},useReducer:function(e,t,a){var l=Ie();if(a!==void 0){var n=a(t);if(Xa){ea(!0);try{a(t)}finally{ea(!1)}}}else n=t;return l.memoizedState=l.baseState=n,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},l.queue=e,e=e.dispatch=cm.bind(null,W,e),[l.memoizedState,e]},useRef:function(e){var t=Ie();return e={current:e},t.memoizedState=e},useState:function(e){e=uu(e);var t=e.queue,a=Tf.bind(null,W,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:ru,useDeferredValue:function(e,t){var a=Ie();return fu(a,e,t)},useTransition:function(){var e=uu(!1);return e=jf.bind(null,W,e.queue,!0,!1),Ie().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var l=W,n=Ie();if(ie){if(a===void 0)throw Error(f(407));a=a()}else{if(a=t(),ye===null)throw Error(f(349));(ae&124)!==0||Jr(l,t,a)}n.memoizedState=a;var s={value:a,getSnapshot:t};return n.queue=s,df(Wr.bind(null,l,s,e),[e]),l.flags|=2048,vl(9,xs(),Ir.bind(null,l,s,a,t),null),a},useId:function(){var e=Ie(),t=ye.identifierPrefix;if(ie){var a=Ht,l=Xt;a=(l&~(1<<32-at(l)-1)).toString(32)+a,t="«"+t+"R"+a,a=hs++,0<a&&(t+="H"+a.toString(32)),t+="»"}else a=am++,t="«"+t+"r"+a.toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:du,useFormState:uf,useActionState:uf,useOptimistic:function(e){var t=Ie();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=hu.bind(null,W,!0,a),a.dispatch=t,[e,t]},useMemoCache:nu,useCacheRefresh:function(){return Ie().memoizedState=um.bind(null,W)}},zf={readContext:Ve,use:ms,useCallback:pf,useContext:Ve,useEffect:hf,useImperativeHandle:yf,useInsertionEffect:mf,useLayoutEffect:gf,useMemo:vf,useReducer:gs,useRef:of,useState:function(){return gs(Qt)},useDebugValue:ru,useDeferredValue:function(e,t){var a=Oe();return bf(a,de.memoizedState,e,t)},useTransition:function(){var e=gs(Qt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:rn(e),t]},useSyncExternalStore:kr,useId:Nf,useHostTransitionStatus:du,useFormState:cf,useActionState:cf,useOptimistic:function(e,t){var a=Oe();return ef(a,de,e,t)},useMemoCache:nu,useCacheRefresh:_f},rm={readContext:Ve,use:ms,useCallback:pf,useContext:Ve,useEffect:hf,useImperativeHandle:yf,useInsertionEffect:mf,useLayoutEffect:gf,useMemo:vf,useReducer:iu,useRef:of,useState:function(){return iu(Qt)},useDebugValue:ru,useDeferredValue:function(e,t){var a=Oe();return de===null?fu(a,e,t):bf(a,de.memoizedState,e,t)},useTransition:function(){var e=iu(Qt)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:rn(e),t]},useSyncExternalStore:kr,useId:Nf,useHostTransitionStatus:du,useFormState:ff,useActionState:ff,useOptimistic:function(e,t){var a=Oe();return de!==null?ef(a,de,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:nu,useCacheRefresh:_f},bl=null,dn=0;function bs(e){var t=dn;return dn+=1,bl===null&&(bl=[]),Hr(bl,e,t)}function hn(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function js(e,t){throw t.$$typeof===O?Error(f(525)):(e=Object.prototype.toString.call(t),Error(f(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Of(e){var t=e._init;return t(e._payload)}function Mf(e){function t(y,g){if(e){var v=y.deletions;v===null?(y.deletions=[g],y.flags|=16):v.push(g)}}function a(y,g){if(!e)return null;for(;g!==null;)t(y,g),g=g.sibling;return null}function l(y){for(var g=new Map;y!==null;)y.key!==null?g.set(y.key,y):g.set(y.index,y),y=y.sibling;return g}function n(y,g){return y=Gt(y,g),y.index=0,y.sibling=null,y}function s(y,g,v){return y.index=v,e?(v=y.alternate,v!==null?(v=v.index,v<g?(y.flags|=67108866,g):v):(y.flags|=67108866,g)):(y.flags|=1048576,g)}function u(y){return e&&y.alternate===null&&(y.flags|=67108866),y}function c(y,g,v,U){return g===null||g.tag!==6?(g=Ri(v,y.mode,U),g.return=y,g):(g=n(g,v),g.return=y,g)}function h(y,g,v,U){var L=v.type;return L===N?w(y,g,v.props.children,U,v.key):g!==null&&(g.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===k&&Of(L)===g.type)?(g=n(g,v.props),hn(g,v),g.return=y,g):(g=ls(v.type,v.key,v.props,null,y.mode,U),hn(g,v),g.return=y,g)}function j(y,g,v,U){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=qi(v,y.mode,U),g.return=y,g):(g=n(g,v.children||[]),g.return=y,g)}function w(y,g,v,U,L){return g===null||g.tag!==7?(g=Oa(v,y.mode,U,L),g.return=y,g):(g=n(g,v),g.return=y,g)}function q(y,g,v){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=Ri(""+g,y.mode,v),g.return=y,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case x:return v=ls(g.type,g.key,g.props,null,y.mode,v),hn(v,g),v.return=y,v;case A:return g=qi(g,y.mode,v),g.return=y,g;case k:var U=g._init;return g=U(g._payload),q(y,g,v)}if(dt(g)||Ze(g))return g=Oa(g,y.mode,v,null),g.return=y,g;if(typeof g.then=="function")return q(y,bs(g),v);if(g.$$typeof===I)return q(y,us(y,g),v);js(y,g)}return null}function _(y,g,v,U){var L=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return L!==null?null:c(y,g,""+v,U);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case x:return v.key===L?h(y,g,v,U):null;case A:return v.key===L?j(y,g,v,U):null;case k:return L=v._init,v=L(v._payload),_(y,g,v,U)}if(dt(v)||Ze(v))return L!==null?null:w(y,g,v,U,null);if(typeof v.then=="function")return _(y,g,bs(v),U);if(v.$$typeof===I)return _(y,g,us(y,v),U);js(y,v)}return null}function T(y,g,v,U,L){if(typeof U=="string"&&U!==""||typeof U=="number"||typeof U=="bigint")return y=y.get(v)||null,c(g,y,""+U,L);if(typeof U=="object"&&U!==null){switch(U.$$typeof){case x:return y=y.get(U.key===null?v:U.key)||null,h(g,y,U,L);case A:return y=y.get(U.key===null?v:U.key)||null,j(g,y,U,L);case k:var P=U._init;return U=P(U._payload),T(y,g,v,U,L)}if(dt(U)||Ze(U))return y=y.get(v)||null,w(g,y,U,L,null);if(typeof U.then=="function")return T(y,g,v,bs(U),L);if(U.$$typeof===I)return T(y,g,v,us(g,U),L);js(g,U)}return null}function K(y,g,v,U){for(var L=null,P=null,Q=g,$=g=0,Ce=null;Q!==null&&$<v.length;$++){Q.index>$?(Ce=Q,Q=null):Ce=Q.sibling;var se=_(y,Q,v[$],U);if(se===null){Q===null&&(Q=Ce);break}e&&Q&&se.alternate===null&&t(y,Q),g=s(se,g,$),P===null?L=se:P.sibling=se,P=se,Q=Ce}if($===v.length)return a(y,Q),ie&&Ua(y,$),L;if(Q===null){for(;$<v.length;$++)Q=q(y,v[$],U),Q!==null&&(g=s(Q,g,$),P===null?L=Q:P.sibling=Q,P=Q);return ie&&Ua(y,$),L}for(Q=l(Q);$<v.length;$++)Ce=T(Q,y,$,v[$],U),Ce!==null&&(e&&Ce.alternate!==null&&Q.delete(Ce.key===null?$:Ce.key),g=s(Ce,g,$),P===null?L=Ce:P.sibling=Ce,P=Ce);return e&&Q.forEach(function(Aa){return t(y,Aa)}),ie&&Ua(y,$),L}function Z(y,g,v,U){if(v==null)throw Error(f(151));for(var L=null,P=null,Q=g,$=g=0,Ce=null,se=v.next();Q!==null&&!se.done;$++,se=v.next()){Q.index>$?(Ce=Q,Q=null):Ce=Q.sibling;var Aa=_(y,Q,se.value,U);if(Aa===null){Q===null&&(Q=Ce);break}e&&Q&&Aa.alternate===null&&t(y,Q),g=s(Aa,g,$),P===null?L=Aa:P.sibling=Aa,P=Aa,Q=Ce}if(se.done)return a(y,Q),ie&&Ua(y,$),L;if(Q===null){for(;!se.done;$++,se=v.next())se=q(y,se.value,U),se!==null&&(g=s(se,g,$),P===null?L=se:P.sibling=se,P=se);return ie&&Ua(y,$),L}for(Q=l(Q);!se.done;$++,se=v.next())se=T(Q,y,$,se.value,U),se!==null&&(e&&se.alternate!==null&&Q.delete(se.key===null?$:se.key),g=s(se,g,$),P===null?L=se:P.sibling=se,P=se);return e&&Q.forEach(function(f0){return t(y,f0)}),ie&&Ua(y,$),L}function me(y,g,v,U){if(typeof v=="object"&&v!==null&&v.type===N&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case x:e:{for(var L=v.key;g!==null;){if(g.key===L){if(L=v.type,L===N){if(g.tag===7){a(y,g.sibling),U=n(g,v.props.children),U.return=y,y=U;break e}}else if(g.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===k&&Of(L)===g.type){a(y,g.sibling),U=n(g,v.props),hn(U,v),U.return=y,y=U;break e}a(y,g);break}else t(y,g);g=g.sibling}v.type===N?(U=Oa(v.props.children,y.mode,U,v.key),U.return=y,y=U):(U=ls(v.type,v.key,v.props,null,y.mode,U),hn(U,v),U.return=y,y=U)}return u(y);case A:e:{for(L=v.key;g!==null;){if(g.key===L)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){a(y,g.sibling),U=n(g,v.children||[]),U.return=y,y=U;break e}else{a(y,g);break}else t(y,g);g=g.sibling}U=qi(v,y.mode,U),U.return=y,y=U}return u(y);case k:return L=v._init,v=L(v._payload),me(y,g,v,U)}if(dt(v))return K(y,g,v,U);if(Ze(v)){if(L=Ze(v),typeof L!="function")throw Error(f(150));return v=L.call(v),Z(y,g,v,U)}if(typeof v.then=="function")return me(y,g,bs(v),U);if(v.$$typeof===I)return me(y,g,us(y,v),U);js(y,v)}return typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint"?(v=""+v,g!==null&&g.tag===6?(a(y,g.sibling),U=n(g,v),U.return=y,y=U):(a(y,g),U=Ri(v,y.mode,U),U.return=y,y=U),u(y)):a(y,g)}return function(y,g,v,U){try{dn=0;var L=me(y,g,v,U);return bl=null,L}catch(Q){if(Q===an||Q===rs)throw Q;var P=nt(29,Q,null,y.mode);return P.lanes=U,P.return=y,P}finally{}}}var jl=Mf(!0),Uf=Mf(!1),bt=Xe(null),Ot=null;function ca(e){var t=e.alternate;ue(Ue,Ue.current&1),ue(bt,e),Ot===null&&(t===null||xl.current!==null||t.memoizedState!==null)&&(Ot=e)}function Rf(e){if(e.tag===22){if(ue(Ue,Ue.current),ue(bt,e),Ot===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Ot=e)}}else ra()}function ra(){ue(Ue,Ue.current),ue(bt,bt.current)}function Zt(e){pe(bt),Ot===e&&(Ot=null),pe(Ue)}var Ue=Xe(0);function Ss(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||lc(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function mu(e,t,a,l){t=e.memoizedState,a=a(l,t),a=a==null?t:R({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var gu={enqueueSetState:function(e,t,a){e=e._reactInternals;var l=ct(),n=sa(l);n.payload=t,a!=null&&(n.callback=a),t=ia(e,n,l),t!==null&&(rt(t,e,l),nn(t,e,l))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var l=ct(),n=sa(l);n.tag=1,n.payload=t,a!=null&&(n.callback=a),t=ia(e,n,l),t!==null&&(rt(t,e,l),nn(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=ct(),l=sa(a);l.tag=2,t!=null&&(l.callback=t),t=ia(e,l,a),t!==null&&(rt(t,e,a),nn(t,e,a))}};function qf(e,t,a,l,n,s,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,s,u):t.prototype&&t.prototype.isPureReactComponent?!kl(a,l)||!kl(n,s):!0}function Bf(e,t,a,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,l),t.state!==e&&gu.enqueueReplaceState(t,t.state,null)}function Ha(e,t){var a=t;if("ref"in t){a={};for(var l in t)l!=="ref"&&(a[l]=t[l])}if(e=e.defaultProps){a===t&&(a=R({},a));for(var n in e)a[n]===void 0&&(a[n]=e[n])}return a}var As=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Cf(e){As(e)}function Gf(e){console.error(e)}function Xf(e){As(e)}function Ns(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function Hf(e,t,a){try{var l=e.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function xu(e,t,a){return a=sa(a),a.tag=3,a.payload={element:null},a.callback=function(){Ns(e,t)},a}function Lf(e){return e=sa(e),e.tag=3,e}function Yf(e,t,a,l){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var s=l.value;e.payload=function(){return n(s)},e.callback=function(){Hf(t,a,l)}}var u=a.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(e.callback=function(){Hf(t,a,l),typeof n!="function"&&(ga===null?ga=new Set([this]):ga.add(this));var c=l.stack;this.componentDidCatch(l.value,{componentStack:c!==null?c:""})})}function fm(e,t,a,l,n){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=a.alternate,t!==null&&Fl(t,a,n,!0),a=bt.current,a!==null){switch(a.tag){case 13:return Ot===null?Hu():a.alternate===null&&Ae===0&&(Ae=3),a.flags&=-257,a.flags|=65536,a.lanes=n,l===$i?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([l]):t.add(l),Yu(e,l,n)),!1;case 22:return a.flags|=65536,l===$i?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([l]):a.add(l)),Yu(e,l,n)),!1}throw Error(f(435,a.tag))}return Yu(e,l,n),Hu(),!1}if(ie)return t=bt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=n,l!==Gi&&(e=Error(f(422),{cause:l}),Pl(xt(e,a)))):(l!==Gi&&(t=Error(f(423),{cause:l}),Pl(xt(t,a))),e=e.current.alternate,e.flags|=65536,n&=-n,e.lanes|=n,l=xt(l,a),n=xu(e.stateNode,l,n),ki(e,n),Ae!==4&&(Ae=2)),!1;var s=Error(f(520),{cause:l});if(s=xt(s,a),bn===null?bn=[s]:bn.push(s),Ae!==4&&(Ae=2),t===null)return!0;l=xt(l,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=n&-n,a.lanes|=e,e=xu(a.stateNode,l,e),ki(a,e),!1;case 1:if(t=a.type,s=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(ga===null||!ga.has(s))))return a.flags|=65536,n&=-n,a.lanes|=n,n=Lf(n),Yf(n,e,a,l),ki(a,n),!1}a=a.return}while(a!==null);return!1}var Qf=Error(f(461)),qe=!1;function He(e,t,a,l){t.child=e===null?Uf(t,null,a,l):jl(t,e.child,a,l)}function Zf(e,t,a,l,n){a=a.render;var s=t.ref;if("ref"in l){var u={};for(var c in l)c!=="ref"&&(u[c]=l[c])}else u=l;return Ca(t),l=Fi(e,t,a,u,s,n),c=eu(),e!==null&&!qe?(tu(e,t,n),$t(e,t,n)):(ie&&c&&Bi(t),t.flags|=1,He(e,t,l,n),t.child)}function $f(e,t,a,l,n){if(e===null){var s=a.type;return typeof s=="function"&&!Ui(s)&&s.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=s,Vf(e,t,s,l,n)):(e=ls(a.type,null,l,t,t.mode,n),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!Nu(e,n)){var u=s.memoizedProps;if(a=a.compare,a=a!==null?a:kl,a(u,l)&&e.ref===t.ref)return $t(e,t,n)}return t.flags|=1,e=Gt(s,l),e.ref=t.ref,e.return=t,t.child=e}function Vf(e,t,a,l,n){if(e!==null){var s=e.memoizedProps;if(kl(s,l)&&e.ref===t.ref)if(qe=!1,t.pendingProps=l=s,Nu(e,n))(e.flags&131072)!==0&&(qe=!0);else return t.lanes=e.lanes,$t(e,t,n)}return yu(e,t,a,l,n)}function Kf(e,t,a){var l=t.pendingProps,n=l.children,s=e!==null?e.memoizedState:null;if(l.mode==="hidden"){if((t.flags&128)!==0){if(l=s!==null?s.baseLanes|a:a,e!==null){for(n=t.child=e.child,s=0;n!==null;)s=s|n.lanes|n.childLanes,n=n.sibling;t.childLanes=s&~l}else t.childLanes=0,t.child=null;return kf(e,t,l,a)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&cs(t,s!==null?s.cachePool:null),s!==null?$r(t,s):Ii(),Rf(t);else return t.lanes=t.childLanes=536870912,kf(e,t,s!==null?s.baseLanes|a:a,a)}else s!==null?(cs(t,s.cachePool),$r(t,s),ra(),t.memoizedState=null):(e!==null&&cs(t,null),Ii(),ra());return He(e,t,n,a),t.child}function kf(e,t,a,l){var n=Zi();return n=n===null?null:{parent:Me._currentValue,pool:n},t.memoizedState={baseLanes:a,cachePool:n},e!==null&&cs(t,null),Ii(),Rf(t),e!==null&&Fl(e,t,l,!0),null}function _s(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(f(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function yu(e,t,a,l,n){return Ca(t),a=Fi(e,t,a,l,void 0,n),l=eu(),e!==null&&!qe?(tu(e,t,n),$t(e,t,n)):(ie&&l&&Bi(t),t.flags|=1,He(e,t,a,n),t.child)}function Jf(e,t,a,l,n,s){return Ca(t),t.updateQueue=null,a=Kr(t,l,a,n),Vr(e),l=eu(),e!==null&&!qe?(tu(e,t,s),$t(e,t,s)):(ie&&l&&Bi(t),t.flags|=1,He(e,t,a,s),t.child)}function If(e,t,a,l,n){if(Ca(t),t.stateNode===null){var s=ol,u=a.contextType;typeof u=="object"&&u!==null&&(s=Ve(u)),s=new a(l,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=gu,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=l,s.state=t.memoizedState,s.refs={},Vi(t),u=a.contextType,s.context=typeof u=="object"&&u!==null?Ve(u):ol,s.state=t.memoizedState,u=a.getDerivedStateFromProps,typeof u=="function"&&(mu(t,a,u,l),s.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(u=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),u!==s.state&&gu.enqueueReplaceState(s,s.state,null),un(t,l,s,n),sn(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){s=t.stateNode;var c=t.memoizedProps,h=Ha(a,c);s.props=h;var j=s.context,w=a.contextType;u=ol,typeof w=="object"&&w!==null&&(u=Ve(w));var q=a.getDerivedStateFromProps;w=typeof q=="function"||typeof s.getSnapshotBeforeUpdate=="function",c=t.pendingProps!==c,w||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(c||j!==u)&&Bf(t,s,l,u),na=!1;var _=t.memoizedState;s.state=_,un(t,l,s,n),sn(),j=t.memoizedState,c||_!==j||na?(typeof q=="function"&&(mu(t,a,q,l),j=t.memoizedState),(h=na||qf(t,a,h,l,_,j,u))?(w||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=j),s.props=l,s.state=j,s.context=u,l=h):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{s=t.stateNode,Ki(e,t),u=t.memoizedProps,w=Ha(a,u),s.props=w,q=t.pendingProps,_=s.context,j=a.contextType,h=ol,typeof j=="object"&&j!==null&&(h=Ve(j)),c=a.getDerivedStateFromProps,(j=typeof c=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(u!==q||_!==h)&&Bf(t,s,l,h),na=!1,_=t.memoizedState,s.state=_,un(t,l,s,n),sn();var T=t.memoizedState;u!==q||_!==T||na||e!==null&&e.dependencies!==null&&is(e.dependencies)?(typeof c=="function"&&(mu(t,a,c,l),T=t.memoizedState),(w=na||qf(t,a,w,l,_,T,h)||e!==null&&e.dependencies!==null&&is(e.dependencies))?(j||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(l,T,h),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(l,T,h)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||u===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=T),s.props=l,s.state=T,s.context=h,l=w):(typeof s.componentDidUpdate!="function"||u===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),l=!1)}return s=l,_s(e,t),l=(t.flags&128)!==0,s||l?(s=t.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&l?(t.child=jl(t,e.child,null,n),t.child=jl(t,null,a,n)):He(e,t,a,n),t.memoizedState=s.state,e=t.child):e=$t(e,t,n),e}function Wf(e,t,a,l){return Wl(),t.flags|=256,He(e,t,a,l),t.child}var pu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vu(e){return{baseLanes:e,cachePool:Cr()}}function bu(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=jt),e}function Pf(e,t,a){var l=t.pendingProps,n=!1,s=(t.flags&128)!==0,u;if((u=s)||(u=e!==null&&e.memoizedState===null?!1:(Ue.current&2)!==0),u&&(n=!0,t.flags&=-129),u=(t.flags&32)!==0,t.flags&=-33,e===null){if(ie){if(n?ca(t):ra(),ie){var c=Se,h;if(h=c){e:{for(h=c,c=zt;h.nodeType!==8;){if(!c){c=null;break e}if(h=Tt(h.nextSibling),h===null){c=null;break e}}c=h}c!==null?(t.memoizedState={dehydrated:c,treeContext:Ma!==null?{id:Xt,overflow:Ht}:null,retryLane:536870912,hydrationErrors:null},h=nt(18,null,null,0),h.stateNode=c,h.return=t,t.child=h,Ke=t,Se=null,h=!0):h=!1}h||qa(t)}if(c=t.memoizedState,c!==null&&(c=c.dehydrated,c!==null))return lc(c)?t.lanes=32:t.lanes=536870912,null;Zt(t)}return c=l.children,l=l.fallback,n?(ra(),n=t.mode,c=Ts({mode:"hidden",children:c},n),l=Oa(l,n,a,null),c.return=t,l.return=t,c.sibling=l,t.child=c,n=t.child,n.memoizedState=vu(a),n.childLanes=bu(e,u,a),t.memoizedState=pu,l):(ca(t),ju(t,c))}if(h=e.memoizedState,h!==null&&(c=h.dehydrated,c!==null)){if(s)t.flags&256?(ca(t),t.flags&=-257,t=Su(e,t,a)):t.memoizedState!==null?(ra(),t.child=e.child,t.flags|=128,t=null):(ra(),n=l.fallback,c=t.mode,l=Ts({mode:"visible",children:l.children},c),n=Oa(n,c,a,null),n.flags|=2,l.return=t,n.return=t,l.sibling=n,t.child=l,jl(t,e.child,null,a),l=t.child,l.memoizedState=vu(a),l.childLanes=bu(e,u,a),t.memoizedState=pu,t=n);else if(ca(t),lc(c)){if(u=c.nextSibling&&c.nextSibling.dataset,u)var j=u.dgst;u=j,l=Error(f(419)),l.stack="",l.digest=u,Pl({value:l,source:null,stack:null}),t=Su(e,t,a)}else if(qe||Fl(e,t,a,!1),u=(a&e.childLanes)!==0,qe||u){if(u=ye,u!==null&&(l=a&-a,l=(l&42)!==0?1:ni(l),l=(l&(u.suspendedLanes|a))!==0?0:l,l!==0&&l!==h.retryLane))throw h.retryLane=l,fl(e,l),rt(u,e,l),Qf;c.data==="$?"||Hu(),t=Su(e,t,a)}else c.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=h.treeContext,Se=Tt(c.nextSibling),Ke=t,ie=!0,Ra=null,zt=!1,e!==null&&(pt[vt++]=Xt,pt[vt++]=Ht,pt[vt++]=Ma,Xt=e.id,Ht=e.overflow,Ma=t),t=ju(t,l.children),t.flags|=4096);return t}return n?(ra(),n=l.fallback,c=t.mode,h=e.child,j=h.sibling,l=Gt(h,{mode:"hidden",children:l.children}),l.subtreeFlags=h.subtreeFlags&65011712,j!==null?n=Gt(j,n):(n=Oa(n,c,a,null),n.flags|=2),n.return=t,l.return=t,l.sibling=n,t.child=l,l=n,n=t.child,c=e.child.memoizedState,c===null?c=vu(a):(h=c.cachePool,h!==null?(j=Me._currentValue,h=h.parent!==j?{parent:j,pool:j}:h):h=Cr(),c={baseLanes:c.baseLanes|a,cachePool:h}),n.memoizedState=c,n.childLanes=bu(e,u,a),t.memoizedState=pu,l):(ca(t),a=e.child,e=a.sibling,a=Gt(a,{mode:"visible",children:l.children}),a.return=t,a.sibling=null,e!==null&&(u=t.deletions,u===null?(t.deletions=[e],t.flags|=16):u.push(e)),t.child=a,t.memoizedState=null,a)}function ju(e,t){return t=Ts({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Ts(e,t){return e=nt(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Su(e,t,a){return jl(t,e.child,null,a),e=ju(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ff(e,t,a){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),Hi(e.return,t,a)}function Au(e,t,a,l,n){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:n}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=l,s.tail=a,s.tailMode=n)}function eo(e,t,a){var l=t.pendingProps,n=l.revealOrder,s=l.tail;if(He(e,t,l.children,a),l=Ue.current,(l&2)!==0)l=l&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ff(e,a,t);else if(e.tag===19)Ff(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}switch(ue(Ue,l),n){case"forwards":for(a=t.child,n=null;a!==null;)e=a.alternate,e!==null&&Ss(e)===null&&(n=a),a=a.sibling;a=n,a===null?(n=t.child,t.child=null):(n=a.sibling,a.sibling=null),Au(t,!1,n,a,s);break;case"backwards":for(a=null,n=t.child,t.child=null;n!==null;){if(e=n.alternate,e!==null&&Ss(e)===null){t.child=n;break}e=n.sibling,n.sibling=a,a=n,n=e}Au(t,!0,a,null,s);break;case"together":Au(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function $t(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),ma|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(Fl(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(f(153));if(t.child!==null){for(e=t.child,a=Gt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Gt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Nu(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&is(e)))}function om(e,t,a){switch(t.tag){case 3:Ka(t,t.stateNode.containerInfo),la(t,Me,e.memoizedState.cache),Wl();break;case 27:case 5:Ft(t);break;case 4:Ka(t,t.stateNode.containerInfo);break;case 10:la(t,t.type,t.memoizedProps.value);break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(ca(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Pf(e,t,a):(ca(t),e=$t(e,t,a),e!==null?e.sibling:null);ca(t);break;case 19:var n=(e.flags&128)!==0;if(l=(a&t.childLanes)!==0,l||(Fl(e,t,a,!1),l=(a&t.childLanes)!==0),n){if(l)return eo(e,t,a);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),ue(Ue,Ue.current),l)break;return null;case 22:case 23:return t.lanes=0,Kf(e,t,a);case 24:la(t,Me,e.memoizedState.cache)}return $t(e,t,a)}function to(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)qe=!0;else{if(!Nu(e,a)&&(t.flags&128)===0)return qe=!1,om(e,t,a);qe=(e.flags&131072)!==0}else qe=!1,ie&&(t.flags&1048576)!==0&&zr(t,ss,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var l=t.elementType,n=l._init;if(l=n(l._payload),t.type=l,typeof l=="function")Ui(l)?(e=Ha(l,e),t.tag=1,t=If(null,t,l,e,a)):(t.tag=0,t=yu(null,t,l,e,a));else{if(l!=null){if(n=l.$$typeof,n===le){t.tag=11,t=Zf(null,t,l,e,a);break e}else if(n===Qe){t.tag=14,t=$f(null,t,l,e,a);break e}}throw t=_a(l)||l,Error(f(306,t,""))}}return t;case 0:return yu(e,t,t.type,t.pendingProps,a);case 1:return l=t.type,n=Ha(l,t.pendingProps),If(e,t,l,n,a);case 3:e:{if(Ka(t,t.stateNode.containerInfo),e===null)throw Error(f(387));l=t.pendingProps;var s=t.memoizedState;n=s.element,Ki(e,t),un(t,l,null,a);var u=t.memoizedState;if(l=u.cache,la(t,Me,l),l!==s.cache&&Li(t,[Me],a,!0),sn(),l=u.element,s.isDehydrated)if(s={element:l,isDehydrated:!1,cache:u.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=Wf(e,t,l,a);break e}else if(l!==n){n=xt(Error(f(424)),t),Pl(n),t=Wf(e,t,l,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Se=Tt(e.firstChild),Ke=t,ie=!0,Ra=null,zt=!0,a=Uf(t,null,l,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Wl(),l===n){t=$t(e,t,a);break e}He(e,t,l,a)}t=t.child}return t;case 26:return _s(e,t),e===null?(a=id(t.type,null,t.pendingProps,null))?t.memoizedState=a:ie||(a=t.type,e=t.pendingProps,l=Hs(Dt.current).createElement(a),l[$e]=t,l[ke]=e,Ye(l,a,e),Re(l),t.stateNode=l):t.memoizedState=id(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ft(t),e===null&&ie&&(l=t.stateNode=ld(t.type,t.pendingProps,Dt.current),Ke=t,zt=!0,n=Se,pa(t.type)?(nc=n,Se=Tt(l.firstChild)):Se=n),He(e,t,t.pendingProps.children,a),_s(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ie&&((n=l=Se)&&(l=Xm(l,t.type,t.pendingProps,zt),l!==null?(t.stateNode=l,Ke=t,Se=Tt(l.firstChild),zt=!1,n=!0):n=!1),n||qa(t)),Ft(t),n=t.type,s=t.pendingProps,u=e!==null?e.memoizedProps:null,l=s.children,ec(n,s)?l=null:u!==null&&ec(n,u)&&(t.flags|=32),t.memoizedState!==null&&(n=Fi(e,t,lm,null,null,a),wn._currentValue=n),_s(e,t),He(e,t,l,a),t.child;case 6:return e===null&&ie&&((e=a=Se)&&(a=Hm(a,t.pendingProps,zt),a!==null?(t.stateNode=a,Ke=t,Se=null,e=!0):e=!1),e||qa(t)),null;case 13:return Pf(e,t,a);case 4:return Ka(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=jl(t,null,l,a):He(e,t,l,a),t.child;case 11:return Zf(e,t,t.type,t.pendingProps,a);case 7:return He(e,t,t.pendingProps,a),t.child;case 8:return He(e,t,t.pendingProps.children,a),t.child;case 12:return He(e,t,t.pendingProps.children,a),t.child;case 10:return l=t.pendingProps,la(t,t.type,l.value),He(e,t,l.children,a),t.child;case 9:return n=t.type._context,l=t.pendingProps.children,Ca(t),n=Ve(n),l=l(n),t.flags|=1,He(e,t,l,a),t.child;case 14:return $f(e,t,t.type,t.pendingProps,a);case 15:return Vf(e,t,t.type,t.pendingProps,a);case 19:return eo(e,t,a);case 31:return l=t.pendingProps,a=t.mode,l={mode:l.mode,children:l.children},e===null?(a=Ts(l,a),a.ref=t.ref,t.child=a,a.return=t,t=a):(a=Gt(e.child,l),a.ref=t.ref,t.child=a,a.return=t,t=a),t;case 22:return Kf(e,t,a);case 24:return Ca(t),l=Ve(Me),e===null?(n=Zi(),n===null&&(n=ye,s=Yi(),n.pooledCache=s,s.refCount++,s!==null&&(n.pooledCacheLanes|=a),n=s),t.memoizedState={parent:l,cache:n},Vi(t),la(t,Me,n)):((e.lanes&a)!==0&&(Ki(e,t),un(t,null,null,a),sn()),n=e.memoizedState,s=t.memoizedState,n.parent!==l?(n={parent:l,cache:l},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),la(t,Me,l)):(l=s.cache,la(t,Me,l),l!==n.cache&&Li(t,[Me],a,!0))),He(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(f(156,t.tag))}function Vt(e){e.flags|=4}function ao(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!od(t)){if(t=bt.current,t!==null&&((ae&4194048)===ae?Ot!==null:(ae&62914560)!==ae&&(ae&536870912)===0||t!==Ot))throw ln=$i,Gr;e.flags|=8192}}function Ds(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Uc():536870912,e.lanes|=t,_l|=t)}function mn(e,t){if(!ie)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function be(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,l=0;if(t)for(var n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags&65011712,l|=n.flags&65011712,n.return=e,n=n.sibling;else for(n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags,l|=n.flags,n.return=e,n=n.sibling;return e.subtreeFlags|=l,e.childLanes=a,t}function dm(e,t,a){var l=t.pendingProps;switch(Ci(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return be(t),null;case 1:return be(t),null;case 3:return a=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Yt(Me),Et(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Il(t)?Vt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Ur())),be(t),null;case 26:return a=t.memoizedState,e===null?(Vt(t),a!==null?(be(t),ao(t,a)):(be(t),t.flags&=-16777217)):a?a!==e.memoizedState?(Vt(t),be(t),ao(t,a)):(be(t),t.flags&=-16777217):(e.memoizedProps!==l&&Vt(t),be(t),t.flags&=-16777217),null;case 27:ka(t),a=Dt.current;var n=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Vt(t);else{if(!l){if(t.stateNode===null)throw Error(f(166));return be(t),null}e=we.current,Il(t)?Or(t):(e=ld(n,l,a),t.stateNode=e,Vt(t))}return be(t),null;case 5:if(ka(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Vt(t);else{if(!l){if(t.stateNode===null)throw Error(f(166));return be(t),null}if(e=we.current,Il(t))Or(t);else{switch(n=Hs(Dt.current),e){case 1:e=n.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=n.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=n.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=n.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=n.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof l.is=="string"?n.createElement("select",{is:l.is}):n.createElement("select"),l.multiple?e.multiple=!0:l.size&&(e.size=l.size);break;default:e=typeof l.is=="string"?n.createElement(a,{is:l.is}):n.createElement(a)}}e[$e]=t,e[ke]=l;e:for(n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.tag!==27&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}t.stateNode=e;e:switch(Ye(e,a,l),a){case"button":case"input":case"select":case"textarea":e=!!l.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&Vt(t)}}return be(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&Vt(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(f(166));if(e=Dt.current,Il(t)){if(e=t.stateNode,a=t.memoizedProps,l=null,n=Ke,n!==null)switch(n.tag){case 27:case 5:l=n.memoizedProps}e[$e]=t,e=!!(e.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||Io(e.nodeValue,a)),e||qa(t)}else e=Hs(e).createTextNode(l),e[$e]=t,t.stateNode=e}return be(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(n=Il(t),l!==null&&l.dehydrated!==null){if(e===null){if(!n)throw Error(f(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(f(317));n[$e]=t}else Wl(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;be(t),n=!1}else n=Ur(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(Zt(t),t):(Zt(t),null)}if(Zt(t),(t.flags&128)!==0)return t.lanes=a,t;if(a=l!==null,e=e!==null&&e.memoizedState!==null,a){l=t.child,n=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(n=l.alternate.memoizedState.cachePool.pool);var s=null;l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(s=l.memoizedState.cachePool.pool),s!==n&&(l.flags|=2048)}return a!==e&&a&&(t.child.flags|=8192),Ds(t,t.updateQueue),be(t),null;case 4:return Et(),e===null&&Ju(t.stateNode.containerInfo),be(t),null;case 10:return Yt(t.type),be(t),null;case 19:if(pe(Ue),n=t.memoizedState,n===null)return be(t),null;if(l=(t.flags&128)!==0,s=n.rendering,s===null)if(l)mn(n,!1);else{if(Ae!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=Ss(e),s!==null){for(t.flags|=128,mn(n,!1),e=s.updateQueue,t.updateQueue=e,Ds(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)wr(a,e),a=a.sibling;return ue(Ue,Ue.current&1|2),t.child}e=e.sibling}n.tail!==null&&wt()>zs&&(t.flags|=128,l=!0,mn(n,!1),t.lanes=4194304)}else{if(!l)if(e=Ss(s),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Ds(t,e),mn(n,!0),n.tail===null&&n.tailMode==="hidden"&&!s.alternate&&!ie)return be(t),null}else 2*wt()-n.renderingStartTime>zs&&a!==536870912&&(t.flags|=128,l=!0,mn(n,!1),t.lanes=4194304);n.isBackwards?(s.sibling=t.child,t.child=s):(e=n.last,e!==null?e.sibling=s:t.child=s,n.last=s)}return n.tail!==null?(t=n.tail,n.rendering=t,n.tail=t.sibling,n.renderingStartTime=wt(),t.sibling=null,e=Ue.current,ue(Ue,l?e&1|2:e&1),t):(be(t),null);case 22:case 23:return Zt(t),Wi(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?(a&536870912)!==0&&(t.flags&128)===0&&(be(t),t.subtreeFlags&6&&(t.flags|=8192)):be(t),a=t.updateQueue,a!==null&&Ds(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(t.flags|=2048),e!==null&&pe(Ga),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Yt(Me),be(t),null;case 25:return null;case 30:return null}throw Error(f(156,t.tag))}function hm(e,t){switch(Ci(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Yt(Me),Et(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ka(t),null;case 13:if(Zt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(f(340));Wl()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(Ue),null;case 4:return Et(),null;case 10:return Yt(t.type),null;case 22:case 23:return Zt(t),Wi(),e!==null&&pe(Ga),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Yt(Me),null;case 25:return null;default:return null}}function lo(e,t){switch(Ci(t),t.tag){case 3:Yt(Me),Et();break;case 26:case 27:case 5:ka(t);break;case 4:Et();break;case 13:Zt(t);break;case 19:pe(Ue);break;case 10:Yt(t.type);break;case 22:case 23:Zt(t),Wi(),e!==null&&pe(Ga);break;case 24:Yt(Me)}}function gn(e,t){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var n=l.next;a=n;do{if((a.tag&e)===e){l=void 0;var s=a.create,u=a.inst;l=s(),u.destroy=l}a=a.next}while(a!==n)}}catch(c){ge(t,t.return,c)}}function fa(e,t,a){try{var l=t.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var s=n.next;l=s;do{if((l.tag&e)===e){var u=l.inst,c=u.destroy;if(c!==void 0){u.destroy=void 0,n=t;var h=a,j=c;try{j()}catch(w){ge(n,h,w)}}}l=l.next}while(l!==s)}}catch(w){ge(t,t.return,w)}}function no(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Zr(t,a)}catch(l){ge(e,e.return,l)}}}function so(e,t,a){a.props=Ha(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(l){ge(e,t,l)}}function xn(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof a=="function"?e.refCleanup=a(l):a.current=l}}catch(n){ge(e,t,n)}}function Mt(e,t){var a=e.ref,l=e.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(n){ge(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){ge(e,t,n)}else a.current=null}function io(e){var t=e.type,a=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break e;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(n){ge(e,e.return,n)}}function _u(e,t,a){try{var l=e.stateNode;Rm(l,e.type,a,t),l[ke]=t}catch(n){ge(e,e.return,n)}}function uo(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&pa(e.type)||e.tag===4}function Tu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||uo(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&pa(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Du(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Xs));else if(l!==4&&(l===27&&pa(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Du(e,t,a),e=e.sibling;e!==null;)Du(e,t,a),e=e.sibling}function Es(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(l!==4&&(l===27&&pa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Es(e,t,a),e=e.sibling;e!==null;)Es(e,t,a),e=e.sibling}function co(e){var t=e.stateNode,a=e.memoizedProps;try{for(var l=e.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Ye(t,l,a),t[$e]=e,t[ke]=a}catch(s){ge(e,e.return,s)}}var Kt=!1,De=!1,Eu=!1,ro=typeof WeakSet=="function"?WeakSet:Set,Be=null;function mm(e,t){if(e=e.containerInfo,Pu=Vs,e=vr(e),Ti(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var n=l.anchorOffset,s=l.focusNode;l=l.focusOffset;try{a.nodeType,s.nodeType}catch{a=null;break e}var u=0,c=-1,h=-1,j=0,w=0,q=e,_=null;t:for(;;){for(var T;q!==a||n!==0&&q.nodeType!==3||(c=u+n),q!==s||l!==0&&q.nodeType!==3||(h=u+l),q.nodeType===3&&(u+=q.nodeValue.length),(T=q.firstChild)!==null;)_=q,q=T;for(;;){if(q===e)break t;if(_===a&&++j===n&&(c=u),_===s&&++w===l&&(h=u),(T=q.nextSibling)!==null)break;q=_,_=q.parentNode}q=T}a=c===-1||h===-1?null:{start:c,end:h}}else a=null}a=a||{start:0,end:0}}else a=null;for(Fu={focusedElem:e,selectionRange:a},Vs=!1,Be=t;Be!==null;)if(t=Be,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,Be=e;else for(;Be!==null;){switch(t=Be,s=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&s!==null){e=void 0,a=t,n=s.memoizedProps,s=s.memoizedState,l=a.stateNode;try{var K=Ha(a.type,n,a.elementType===a.type);e=l.getSnapshotBeforeUpdate(K,s),l.__reactInternalSnapshotBeforeUpdate=e}catch(Z){ge(a,a.return,Z)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)ac(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":ac(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(f(163))}if(e=t.sibling,e!==null){e.return=t.return,Be=e;break}Be=t.return}}function fo(e,t,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:oa(e,a),l&4&&gn(5,a);break;case 1:if(oa(e,a),l&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(u){ge(a,a.return,u)}else{var n=Ha(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(n,t,e.__reactInternalSnapshotBeforeUpdate)}catch(u){ge(a,a.return,u)}}l&64&&no(a),l&512&&xn(a,a.return);break;case 3:if(oa(e,a),l&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Zr(e,t)}catch(u){ge(a,a.return,u)}}break;case 27:t===null&&l&4&&co(a);case 26:case 5:oa(e,a),t===null&&l&4&&io(a),l&512&&xn(a,a.return);break;case 12:oa(e,a);break;case 13:oa(e,a),l&4&&mo(e,a),l&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Am.bind(null,a),Lm(e,a))));break;case 22:if(l=a.memoizedState!==null||Kt,!l){t=t!==null&&t.memoizedState!==null||De,n=Kt;var s=De;Kt=l,(De=t)&&!s?da(e,a,(a.subtreeFlags&8772)!==0):oa(e,a),Kt=n,De=s}break;case 30:break;default:oa(e,a)}}function oo(e){var t=e.alternate;t!==null&&(e.alternate=null,oo(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ui(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ve=null,We=!1;function kt(e,t,a){for(a=a.child;a!==null;)ho(e,t,a),a=a.sibling}function ho(e,t,a){if(tt&&typeof tt.onCommitFiberUnmount=="function")try{tt.onCommitFiberUnmount(Bl,a)}catch{}switch(a.tag){case 26:De||Mt(a,t),kt(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:De||Mt(a,t);var l=ve,n=We;pa(a.type)&&(ve=a.stateNode,We=!1),kt(e,t,a),_n(a.stateNode),ve=l,We=n;break;case 5:De||Mt(a,t);case 6:if(l=ve,n=We,ve=null,kt(e,t,a),ve=l,We=n,ve!==null)if(We)try{(ve.nodeType===9?ve.body:ve.nodeName==="HTML"?ve.ownerDocument.body:ve).removeChild(a.stateNode)}catch(s){ge(a,t,s)}else try{ve.removeChild(a.stateNode)}catch(s){ge(a,t,s)}break;case 18:ve!==null&&(We?(e=ve,td(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Un(e)):td(ve,a.stateNode));break;case 4:l=ve,n=We,ve=a.stateNode.containerInfo,We=!0,kt(e,t,a),ve=l,We=n;break;case 0:case 11:case 14:case 15:De||fa(2,a,t),De||fa(4,a,t),kt(e,t,a);break;case 1:De||(Mt(a,t),l=a.stateNode,typeof l.componentWillUnmount=="function"&&so(a,t,l)),kt(e,t,a);break;case 21:kt(e,t,a);break;case 22:De=(l=De)||a.memoizedState!==null,kt(e,t,a),De=l;break;default:kt(e,t,a)}}function mo(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Un(e)}catch(a){ge(t,t.return,a)}}function gm(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ro),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ro),t;default:throw Error(f(435,e.tag))}}function wu(e,t){var a=gm(e);t.forEach(function(l){var n=Nm.bind(null,e,l);a.has(l)||(a.add(l),l.then(n,n))})}function st(e,t){var a=t.deletions;if(a!==null)for(var l=0;l<a.length;l++){var n=a[l],s=e,u=t,c=u;e:for(;c!==null;){switch(c.tag){case 27:if(pa(c.type)){ve=c.stateNode,We=!1;break e}break;case 5:ve=c.stateNode,We=!1;break e;case 3:case 4:ve=c.stateNode.containerInfo,We=!0;break e}c=c.return}if(ve===null)throw Error(f(160));ho(s,u,n),ve=null,We=!1,s=n.alternate,s!==null&&(s.return=null),n.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)go(t,e),t=t.sibling}var _t=null;function go(e,t){var a=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:st(t,e),it(e),l&4&&(fa(3,e,e.return),gn(3,e),fa(5,e,e.return));break;case 1:st(t,e),it(e),l&512&&(De||a===null||Mt(a,a.return)),l&64&&Kt&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var n=_t;if(st(t,e),it(e),l&512&&(De||a===null||Mt(a,a.return)),l&4){var s=a!==null?a.memoizedState:null;if(l=e.memoizedState,a===null)if(l===null)if(e.stateNode===null){e:{l=e.type,a=e.memoizedProps,n=n.ownerDocument||n;t:switch(l){case"title":s=n.getElementsByTagName("title")[0],(!s||s[Xl]||s[$e]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=n.createElement(l),n.head.insertBefore(s,n.querySelector("head > title"))),Ye(s,l,a),s[$e]=e,Re(s),l=s;break e;case"link":var u=rd("link","href",n).get(l+(a.href||""));if(u){for(var c=0;c<u.length;c++)if(s=u[c],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){u.splice(c,1);break t}}s=n.createElement(l),Ye(s,l,a),n.head.appendChild(s);break;case"meta":if(u=rd("meta","content",n).get(l+(a.content||""))){for(c=0;c<u.length;c++)if(s=u[c],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){u.splice(c,1);break t}}s=n.createElement(l),Ye(s,l,a),n.head.appendChild(s);break;default:throw Error(f(468,l))}s[$e]=e,Re(s),l=s}e.stateNode=l}else fd(n,e.type,e.stateNode);else e.stateNode=cd(n,l,e.memoizedProps);else s!==l?(s===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):s.count--,l===null?fd(n,e.type,e.stateNode):cd(n,l,e.memoizedProps)):l===null&&e.stateNode!==null&&_u(e,e.memoizedProps,a.memoizedProps)}break;case 27:st(t,e),it(e),l&512&&(De||a===null||Mt(a,a.return)),a!==null&&l&4&&_u(e,e.memoizedProps,a.memoizedProps);break;case 5:if(st(t,e),it(e),l&512&&(De||a===null||Mt(a,a.return)),e.flags&32){n=e.stateNode;try{ll(n,"")}catch(T){ge(e,e.return,T)}}l&4&&e.stateNode!=null&&(n=e.memoizedProps,_u(e,n,a!==null?a.memoizedProps:n)),l&1024&&(Eu=!0);break;case 6:if(st(t,e),it(e),l&4){if(e.stateNode===null)throw Error(f(162));l=e.memoizedProps,a=e.stateNode;try{a.nodeValue=l}catch(T){ge(e,e.return,T)}}break;case 3:if(Qs=null,n=_t,_t=Ls(t.containerInfo),st(t,e),_t=n,it(e),l&4&&a!==null&&a.memoizedState.isDehydrated)try{Un(t.containerInfo)}catch(T){ge(e,e.return,T)}Eu&&(Eu=!1,xo(e));break;case 4:l=_t,_t=Ls(e.stateNode.containerInfo),st(t,e),it(e),_t=l;break;case 12:st(t,e),it(e);break;case 13:st(t,e),it(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(qu=wt()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,wu(e,l)));break;case 22:n=e.memoizedState!==null;var h=a!==null&&a.memoizedState!==null,j=Kt,w=De;if(Kt=j||n,De=w||h,st(t,e),De=w,Kt=j,it(e),l&8192)e:for(t=e.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(a===null||h||Kt||De||La(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){h=a=t;try{if(s=h.stateNode,n)u=s.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{c=h.stateNode;var q=h.memoizedProps.style,_=q!=null&&q.hasOwnProperty("display")?q.display:null;c.style.display=_==null||typeof _=="boolean"?"":(""+_).trim()}}catch(T){ge(h,h.return,T)}}}else if(t.tag===6){if(a===null){h=t;try{h.stateNode.nodeValue=n?"":h.memoizedProps}catch(T){ge(h,h.return,T)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,wu(e,a))));break;case 19:st(t,e),it(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,wu(e,l)));break;case 30:break;case 21:break;default:st(t,e),it(e)}}function it(e){var t=e.flags;if(t&2){try{for(var a,l=e.return;l!==null;){if(uo(l)){a=l;break}l=l.return}if(a==null)throw Error(f(160));switch(a.tag){case 27:var n=a.stateNode,s=Tu(e);Es(e,s,n);break;case 5:var u=a.stateNode;a.flags&32&&(ll(u,""),a.flags&=-33);var c=Tu(e);Es(e,c,u);break;case 3:case 4:var h=a.stateNode.containerInfo,j=Tu(e);Du(e,j,h);break;default:throw Error(f(161))}}catch(w){ge(e,e.return,w)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function xo(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;xo(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function oa(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)fo(e,t.alternate,t),t=t.sibling}function La(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:fa(4,t,t.return),La(t);break;case 1:Mt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&so(t,t.return,a),La(t);break;case 27:_n(t.stateNode);case 26:case 5:Mt(t,t.return),La(t);break;case 22:t.memoizedState===null&&La(t);break;case 30:La(t);break;default:La(t)}e=e.sibling}}function da(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,n=e,s=t,u=s.flags;switch(s.tag){case 0:case 11:case 15:da(n,s,a),gn(4,s);break;case 1:if(da(n,s,a),l=s,n=l.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(j){ge(l,l.return,j)}if(l=s,n=l.updateQueue,n!==null){var c=l.stateNode;try{var h=n.shared.hiddenCallbacks;if(h!==null)for(n.shared.hiddenCallbacks=null,n=0;n<h.length;n++)Qr(h[n],c)}catch(j){ge(l,l.return,j)}}a&&u&64&&no(s),xn(s,s.return);break;case 27:co(s);case 26:case 5:da(n,s,a),a&&l===null&&u&4&&io(s),xn(s,s.return);break;case 12:da(n,s,a);break;case 13:da(n,s,a),a&&u&4&&mo(n,s);break;case 22:s.memoizedState===null&&da(n,s,a),xn(s,s.return);break;case 30:break;default:da(n,s,a)}t=t.sibling}}function zu(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&en(a))}function Ou(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&en(e))}function Ut(e,t,a,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)yo(e,t,a,l),t=t.sibling}function yo(e,t,a,l){var n=t.flags;switch(t.tag){case 0:case 11:case 15:Ut(e,t,a,l),n&2048&&gn(9,t);break;case 1:Ut(e,t,a,l);break;case 3:Ut(e,t,a,l),n&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&en(e)));break;case 12:if(n&2048){Ut(e,t,a,l),e=t.stateNode;try{var s=t.memoizedProps,u=s.id,c=s.onPostCommit;typeof c=="function"&&c(u,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(h){ge(t,t.return,h)}}else Ut(e,t,a,l);break;case 13:Ut(e,t,a,l);break;case 23:break;case 22:s=t.stateNode,u=t.alternate,t.memoizedState!==null?s._visibility&2?Ut(e,t,a,l):yn(e,t):s._visibility&2?Ut(e,t,a,l):(s._visibility|=2,Sl(e,t,a,l,(t.subtreeFlags&10256)!==0)),n&2048&&zu(u,t);break;case 24:Ut(e,t,a,l),n&2048&&Ou(t.alternate,t);break;default:Ut(e,t,a,l)}}function Sl(e,t,a,l,n){for(n=n&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var s=e,u=t,c=a,h=l,j=u.flags;switch(u.tag){case 0:case 11:case 15:Sl(s,u,c,h,n),gn(8,u);break;case 23:break;case 22:var w=u.stateNode;u.memoizedState!==null?w._visibility&2?Sl(s,u,c,h,n):yn(s,u):(w._visibility|=2,Sl(s,u,c,h,n)),n&&j&2048&&zu(u.alternate,u);break;case 24:Sl(s,u,c,h,n),n&&j&2048&&Ou(u.alternate,u);break;default:Sl(s,u,c,h,n)}t=t.sibling}}function yn(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,l=t,n=l.flags;switch(l.tag){case 22:yn(a,l),n&2048&&zu(l.alternate,l);break;case 24:yn(a,l),n&2048&&Ou(l.alternate,l);break;default:yn(a,l)}t=t.sibling}}var pn=8192;function Al(e){if(e.subtreeFlags&pn)for(e=e.child;e!==null;)po(e),e=e.sibling}function po(e){switch(e.tag){case 26:Al(e),e.flags&pn&&e.memoizedState!==null&&e0(_t,e.memoizedState,e.memoizedProps);break;case 5:Al(e);break;case 3:case 4:var t=_t;_t=Ls(e.stateNode.containerInfo),Al(e),_t=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=pn,pn=16777216,Al(e),pn=t):Al(e));break;default:Al(e)}}function vo(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function vn(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Be=l,jo(l,e)}vo(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)bo(e),e=e.sibling}function bo(e){switch(e.tag){case 0:case 11:case 15:vn(e),e.flags&2048&&fa(9,e,e.return);break;case 3:vn(e);break;case 12:vn(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ws(e)):vn(e);break;default:vn(e)}}function ws(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Be=l,jo(l,e)}vo(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:fa(8,t,t.return),ws(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,ws(t));break;default:ws(t)}e=e.sibling}}function jo(e,t){for(;Be!==null;){var a=Be;switch(a.tag){case 0:case 11:case 15:fa(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:en(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,Be=l;else e:for(a=e;Be!==null;){l=Be;var n=l.sibling,s=l.return;if(oo(l),l===a){Be=null;break e}if(n!==null){n.return=s,Be=n;break e}Be=s}}}var xm={getCacheForType:function(e){var t=Ve(Me),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a}},ym=typeof WeakMap=="function"?WeakMap:Map,re=0,ye=null,ee=null,ae=0,fe=0,ut=null,ha=!1,Nl=!1,Mu=!1,Jt=0,Ae=0,ma=0,Ya=0,Uu=0,jt=0,_l=0,bn=null,Pe=null,Ru=!1,qu=0,zs=1/0,Os=null,ga=null,Le=0,xa=null,Tl=null,Dl=0,Bu=0,Cu=null,So=null,jn=0,Gu=null;function ct(){if((re&2)!==0&&ae!==0)return ae&-ae;if(M.T!==null){var e=ml;return e!==0?e:$u()}return Bc()}function Ao(){jt===0&&(jt=(ae&536870912)===0||ie?Mc():536870912);var e=bt.current;return e!==null&&(e.flags|=32),jt}function rt(e,t,a){(e===ye&&(fe===2||fe===9)||e.cancelPendingCommit!==null)&&(El(e,0),ya(e,ae,jt,!1)),Gl(e,a),((re&2)===0||e!==ye)&&(e===ye&&((re&2)===0&&(Ya|=a),Ae===4&&ya(e,ae,jt,!1)),Rt(e))}function No(e,t,a){if((re&6)!==0)throw Error(f(327));var l=!a&&(t&124)===0&&(t&e.expiredLanes)===0||Cl(e,t),n=l?bm(e,t):Lu(e,t,!0),s=l;do{if(n===0){Nl&&!l&&ya(e,t,0,!1);break}else{if(a=e.current.alternate,s&&!pm(a)){n=Lu(e,t,!1),s=!1;continue}if(n===2){if(s=t,e.errorRecoveryDisabledLanes&s)var u=0;else u=e.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){t=u;e:{var c=e;n=bn;var h=c.current.memoizedState.isDehydrated;if(h&&(El(c,u).flags|=256),u=Lu(c,u,!1),u!==2){if(Mu&&!h){c.errorRecoveryDisabledLanes|=s,Ya|=s,n=4;break e}s=Pe,Pe=n,s!==null&&(Pe===null?Pe=s:Pe.push.apply(Pe,s))}n=u}if(s=!1,n!==2)continue}}if(n===1){El(e,0),ya(e,t,0,!0);break}e:{switch(l=e,s=n,s){case 0:case 1:throw Error(f(345));case 4:if((t&4194048)!==t)break;case 6:ya(l,t,jt,!ha);break e;case 2:Pe=null;break;case 3:case 5:break;default:throw Error(f(329))}if((t&62914560)===t&&(n=qu+300-wt(),10<n)){if(ya(l,t,jt,!ha),Yn(l,0,!0)!==0)break e;l.timeoutHandle=Fo(_o.bind(null,l,a,Pe,Os,Ru,t,jt,Ya,_l,ha,s,2,-0,0),n);break e}_o(l,a,Pe,Os,Ru,t,jt,Ya,_l,ha,s,0,-0,0)}}break}while(!0);Rt(e)}function _o(e,t,a,l,n,s,u,c,h,j,w,q,_,T){if(e.timeoutHandle=-1,q=t.subtreeFlags,(q&8192||(q&16785408)===16785408)&&(En={stylesheets:null,count:0,unsuspend:Fm},po(t),q=t0(),q!==null)){e.cancelPendingCommit=q(Mo.bind(null,e,t,s,a,l,n,u,c,h,w,1,_,T)),ya(e,s,u,!j);return}Mo(e,t,s,a,l,n,u,c,h)}function pm(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var n=a[l],s=n.getSnapshot;n=n.value;try{if(!lt(s(),n))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ya(e,t,a,l){t&=~Uu,t&=~Ya,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var n=t;0<n;){var s=31-at(n),u=1<<s;l[s]=-1,n&=~u}a!==0&&Rc(e,a,t)}function Ms(){return(re&6)===0?(Sn(0),!1):!0}function Xu(){if(ee!==null){if(fe===0)var e=ee.return;else e=ee,Lt=Ba=null,au(e),bl=null,dn=0,e=ee;for(;e!==null;)lo(e.alternate,e),e=e.return;ee=null}}function El(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Bm(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Xu(),ye=e,ee=a=Gt(e.current,null),ae=t,fe=0,ut=null,ha=!1,Nl=Cl(e,t),Mu=!1,_l=jt=Uu=Ya=ma=Ae=0,Pe=bn=null,Ru=!1,(t&8)!==0&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var n=31-at(l),s=1<<n;t|=e[n],l&=~s}return Jt=t,es(),a}function To(e,t){W=null,M.H=vs,t===an||t===rs?(t=Lr(),fe=3):t===Gr?(t=Lr(),fe=4):fe=t===Qf?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ut=t,ee===null&&(Ae=1,Ns(e,xt(t,e.current)))}function Do(){var e=M.H;return M.H=vs,e===null?vs:e}function Eo(){var e=M.A;return M.A=xm,e}function Hu(){Ae=4,ha||(ae&4194048)!==ae&&bt.current!==null||(Nl=!0),(ma&134217727)===0&&(Ya&134217727)===0||ye===null||ya(ye,ae,jt,!1)}function Lu(e,t,a){var l=re;re|=2;var n=Do(),s=Eo();(ye!==e||ae!==t)&&(Os=null,El(e,t)),t=!1;var u=Ae;e:do try{if(fe!==0&&ee!==null){var c=ee,h=ut;switch(fe){case 8:Xu(),u=6;break e;case 3:case 2:case 9:case 6:bt.current===null&&(t=!0);var j=fe;if(fe=0,ut=null,wl(e,c,h,j),a&&Nl){u=0;break e}break;default:j=fe,fe=0,ut=null,wl(e,c,h,j)}}vm(),u=Ae;break}catch(w){To(e,w)}while(!0);return t&&e.shellSuspendCounter++,Lt=Ba=null,re=l,M.H=n,M.A=s,ee===null&&(ye=null,ae=0,es()),u}function vm(){for(;ee!==null;)wo(ee)}function bm(e,t){var a=re;re|=2;var l=Do(),n=Eo();ye!==e||ae!==t?(Os=null,zs=wt()+500,El(e,t)):Nl=Cl(e,t);e:do try{if(fe!==0&&ee!==null){t=ee;var s=ut;t:switch(fe){case 1:fe=0,ut=null,wl(e,t,s,1);break;case 2:case 9:if(Xr(s)){fe=0,ut=null,zo(t);break}t=function(){fe!==2&&fe!==9||ye!==e||(fe=7),Rt(e)},s.then(t,t);break e;case 3:fe=7;break e;case 4:fe=5;break e;case 7:Xr(s)?(fe=0,ut=null,zo(t)):(fe=0,ut=null,wl(e,t,s,7));break;case 5:var u=null;switch(ee.tag){case 26:u=ee.memoizedState;case 5:case 27:var c=ee;if(!u||od(u)){fe=0,ut=null;var h=c.sibling;if(h!==null)ee=h;else{var j=c.return;j!==null?(ee=j,Us(j)):ee=null}break t}}fe=0,ut=null,wl(e,t,s,5);break;case 6:fe=0,ut=null,wl(e,t,s,6);break;case 8:Xu(),Ae=6;break e;default:throw Error(f(462))}}jm();break}catch(w){To(e,w)}while(!0);return Lt=Ba=null,M.H=l,M.A=n,re=a,ee!==null?0:(ye=null,ae=0,es(),Ae)}function jm(){for(;ee!==null&&!ql();)wo(ee)}function wo(e){var t=to(e.alternate,e,Jt);e.memoizedProps=e.pendingProps,t===null?Us(e):ee=t}function zo(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Jf(a,t,t.pendingProps,t.type,void 0,ae);break;case 11:t=Jf(a,t,t.pendingProps,t.type.render,t.ref,ae);break;case 5:au(t);default:lo(a,t),t=ee=wr(t,Jt),t=to(a,t,Jt)}e.memoizedProps=e.pendingProps,t===null?Us(e):ee=t}function wl(e,t,a,l){Lt=Ba=null,au(t),bl=null,dn=0;var n=t.return;try{if(fm(e,n,t,a,ae)){Ae=1,Ns(e,xt(a,e.current)),ee=null;return}}catch(s){if(n!==null)throw ee=n,s;Ae=1,Ns(e,xt(a,e.current)),ee=null;return}t.flags&32768?(ie||l===1?e=!0:Nl||(ae&536870912)!==0?e=!1:(ha=e=!0,(l===2||l===9||l===3||l===6)&&(l=bt.current,l!==null&&l.tag===13&&(l.flags|=16384))),Oo(t,e)):Us(t)}function Us(e){var t=e;do{if((t.flags&32768)!==0){Oo(t,ha);return}e=t.return;var a=dm(t.alternate,t,Jt);if(a!==null){ee=a;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);Ae===0&&(Ae=5)}function Oo(e,t){do{var a=hm(e.alternate,e);if(a!==null){a.flags&=32767,ee=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){ee=e;return}ee=e=a}while(e!==null);Ae=6,ee=null}function Mo(e,t,a,l,n,s,u,c,h){e.cancelPendingCommit=null;do Rs();while(Le!==0);if((re&6)!==0)throw Error(f(327));if(t!==null){if(t===e.current)throw Error(f(177));if(s=t.lanes|t.childLanes,s|=Oi,Fd(e,a,s,u,c,h),e===ye&&(ee=ye=null,ae=0),Tl=t,xa=e,Dl=a,Bu=s,Cu=n,So=l,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,_m(Xn,function(){return Co(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||l){l=M.T,M.T=null,n=H.p,H.p=2,u=re,re|=4;try{mm(e,t,a)}finally{re=u,H.p=n,M.T=l}}Le=1,Uo(),Ro(),qo()}}function Uo(){if(Le===1){Le=0;var e=xa,t=Tl,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=M.T,M.T=null;var l=H.p;H.p=2;var n=re;re|=4;try{go(t,e);var s=Fu,u=vr(e.containerInfo),c=s.focusedElem,h=s.selectionRange;if(u!==c&&c&&c.ownerDocument&&pr(c.ownerDocument.documentElement,c)){if(h!==null&&Ti(c)){var j=h.start,w=h.end;if(w===void 0&&(w=j),"selectionStart"in c)c.selectionStart=j,c.selectionEnd=Math.min(w,c.value.length);else{var q=c.ownerDocument||document,_=q&&q.defaultView||window;if(_.getSelection){var T=_.getSelection(),K=c.textContent.length,Z=Math.min(h.start,K),me=h.end===void 0?Z:Math.min(h.end,K);!T.extend&&Z>me&&(u=me,me=Z,Z=u);var y=yr(c,Z),g=yr(c,me);if(y&&g&&(T.rangeCount!==1||T.anchorNode!==y.node||T.anchorOffset!==y.offset||T.focusNode!==g.node||T.focusOffset!==g.offset)){var v=q.createRange();v.setStart(y.node,y.offset),T.removeAllRanges(),Z>me?(T.addRange(v),T.extend(g.node,g.offset)):(v.setEnd(g.node,g.offset),T.addRange(v))}}}}for(q=[],T=c;T=T.parentNode;)T.nodeType===1&&q.push({element:T,left:T.scrollLeft,top:T.scrollTop});for(typeof c.focus=="function"&&c.focus(),c=0;c<q.length;c++){var U=q[c];U.element.scrollLeft=U.left,U.element.scrollTop=U.top}}Vs=!!Pu,Fu=Pu=null}finally{re=n,H.p=l,M.T=a}}e.current=t,Le=2}}function Ro(){if(Le===2){Le=0;var e=xa,t=Tl,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=M.T,M.T=null;var l=H.p;H.p=2;var n=re;re|=4;try{fo(e,t.alternate,t)}finally{re=n,H.p=l,M.T=a}}Le=3}}function qo(){if(Le===4||Le===3){Le=0,Zd();var e=xa,t=Tl,a=Dl,l=So;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Le=5:(Le=0,Tl=xa=null,Bo(e,e.pendingLanes));var n=e.pendingLanes;if(n===0&&(ga=null),si(a),t=t.stateNode,tt&&typeof tt.onCommitFiberRoot=="function")try{tt.onCommitFiberRoot(Bl,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=M.T,n=H.p,H.p=2,M.T=null;try{for(var s=e.onRecoverableError,u=0;u<l.length;u++){var c=l[u];s(c.value,{componentStack:c.stack})}}finally{M.T=t,H.p=n}}(Dl&3)!==0&&Rs(),Rt(e),n=e.pendingLanes,(a&4194090)!==0&&(n&42)!==0?e===Gu?jn++:(jn=0,Gu=e):jn=0,Sn(0)}}function Bo(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,en(t)))}function Rs(e){return Uo(),Ro(),qo(),Co()}function Co(){if(Le!==5)return!1;var e=xa,t=Bu;Bu=0;var a=si(Dl),l=M.T,n=H.p;try{H.p=32>a?32:a,M.T=null,a=Cu,Cu=null;var s=xa,u=Dl;if(Le=0,Tl=xa=null,Dl=0,(re&6)!==0)throw Error(f(331));var c=re;if(re|=4,bo(s.current),yo(s,s.current,u,a),re=c,Sn(0,!1),tt&&typeof tt.onPostCommitFiberRoot=="function")try{tt.onPostCommitFiberRoot(Bl,s)}catch{}return!0}finally{H.p=n,M.T=l,Bo(e,t)}}function Go(e,t,a){t=xt(a,t),t=xu(e.stateNode,t,2),e=ia(e,t,2),e!==null&&(Gl(e,2),Rt(e))}function ge(e,t,a){if(e.tag===3)Go(e,e,a);else for(;t!==null;){if(t.tag===3){Go(t,e,a);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(ga===null||!ga.has(l))){e=xt(a,e),a=Lf(2),l=ia(t,a,2),l!==null&&(Yf(a,l,t,e),Gl(l,2),Rt(l));break}}t=t.return}}function Yu(e,t,a){var l=e.pingCache;if(l===null){l=e.pingCache=new ym;var n=new Set;l.set(t,n)}else n=l.get(t),n===void 0&&(n=new Set,l.set(t,n));n.has(a)||(Mu=!0,n.add(a),e=Sm.bind(null,e,t,a),t.then(e,e))}function Sm(e,t,a){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,ye===e&&(ae&a)===a&&(Ae===4||Ae===3&&(ae&62914560)===ae&&300>wt()-qu?(re&2)===0&&El(e,0):Uu|=a,_l===ae&&(_l=0)),Rt(e)}function Xo(e,t){t===0&&(t=Uc()),e=fl(e,t),e!==null&&(Gl(e,t),Rt(e))}function Am(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Xo(e,a)}function Nm(e,t){var a=0;switch(e.tag){case 13:var l=e.stateNode,n=e.memoizedState;n!==null&&(a=n.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(f(314))}l!==null&&l.delete(t),Xo(e,a)}function _m(e,t){return _e(e,t)}var qs=null,zl=null,Qu=!1,Bs=!1,Zu=!1,Qa=0;function Rt(e){e!==zl&&e.next===null&&(zl===null?qs=zl=e:zl=zl.next=e),Bs=!0,Qu||(Qu=!0,Dm())}function Sn(e,t){if(!Zu&&Bs){Zu=!0;do for(var a=!1,l=qs;l!==null;){if(e!==0){var n=l.pendingLanes;if(n===0)var s=0;else{var u=l.suspendedLanes,c=l.pingedLanes;s=(1<<31-at(42|e)+1)-1,s&=n&~(u&~c),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(a=!0,Qo(l,s))}else s=ae,s=Yn(l,l===ye?s:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(s&3)===0||Cl(l,s)||(a=!0,Qo(l,s));l=l.next}while(a);Zu=!1}}function Tm(){Ho()}function Ho(){Bs=Qu=!1;var e=0;Qa!==0&&(qm()&&(e=Qa),Qa=0);for(var t=wt(),a=null,l=qs;l!==null;){var n=l.next,s=Lo(l,t);s===0?(l.next=null,a===null?qs=n:a.next=n,n===null&&(zl=a)):(a=l,(e!==0||(s&3)!==0)&&(Bs=!0)),l=n}Sn(e)}function Lo(e,t){for(var a=e.suspendedLanes,l=e.pingedLanes,n=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var u=31-at(s),c=1<<u,h=n[u];h===-1?((c&a)===0||(c&l)!==0)&&(n[u]=Pd(c,t)):h<=t&&(e.expiredLanes|=c),s&=~c}if(t=ye,a=ae,a=Yn(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,a===0||e===t&&(fe===2||fe===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Ja(l),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Cl(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(l!==null&&Ja(l),si(a)){case 2:case 8:a=zc;break;case 32:a=Xn;break;case 268435456:a=Oc;break;default:a=Xn}return l=Yo.bind(null,e),a=_e(a,l),e.callbackPriority=t,e.callbackNode=a,t}return l!==null&&l!==null&&Ja(l),e.callbackPriority=2,e.callbackNode=null,2}function Yo(e,t){if(Le!==0&&Le!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Rs()&&e.callbackNode!==a)return null;var l=ae;return l=Yn(e,e===ye?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(No(e,l,t),Lo(e,wt()),e.callbackNode!=null&&e.callbackNode===a?Yo.bind(null,e):null)}function Qo(e,t){if(Rs())return null;No(e,t,!0)}function Dm(){Cm(function(){(re&6)!==0?_e(wc,Tm):Ho()})}function $u(){return Qa===0&&(Qa=Mc()),Qa}function Zo(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Kn(""+e)}function $o(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function Em(e,t,a,l,n){if(t==="submit"&&a&&a.stateNode===n){var s=Zo((n[ke]||null).action),u=l.submitter;u&&(t=(t=u[ke]||null)?Zo(t.formAction):u.getAttribute("formAction"),t!==null&&(s=t,u=null));var c=new Wn("action","action",null,l,n);e.push({event:c,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Qa!==0){var h=u?$o(n,u):new FormData(n);ou(a,{pending:!0,data:h,method:n.method,action:s},null,h)}}else typeof s=="function"&&(c.preventDefault(),h=u?$o(n,u):new FormData(n),ou(a,{pending:!0,data:h,method:n.method,action:s},s,h))},currentTarget:n}]})}}for(var Vu=0;Vu<zi.length;Vu++){var Ku=zi[Vu],wm=Ku.toLowerCase(),zm=Ku[0].toUpperCase()+Ku.slice(1);Nt(wm,"on"+zm)}Nt(Sr,"onAnimationEnd"),Nt(Ar,"onAnimationIteration"),Nt(Nr,"onAnimationStart"),Nt("dblclick","onDoubleClick"),Nt("focusin","onFocus"),Nt("focusout","onBlur"),Nt(Kh,"onTransitionRun"),Nt(kh,"onTransitionStart"),Nt(Jh,"onTransitionCancel"),Nt(_r,"onTransitionEnd"),el("onMouseEnter",["mouseout","mouseover"]),el("onMouseLeave",["mouseout","mouseover"]),el("onPointerEnter",["pointerout","pointerover"]),el("onPointerLeave",["pointerout","pointerover"]),Da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Da("onBeforeInput",["compositionend","keypress","textInput","paste"]),Da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var An="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Om=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(An));function Vo(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var l=e[a],n=l.event;l=l.listeners;e:{var s=void 0;if(t)for(var u=l.length-1;0<=u;u--){var c=l[u],h=c.instance,j=c.currentTarget;if(c=c.listener,h!==s&&n.isPropagationStopped())break e;s=c,n.currentTarget=j;try{s(n)}catch(w){As(w)}n.currentTarget=null,s=h}else for(u=0;u<l.length;u++){if(c=l[u],h=c.instance,j=c.currentTarget,c=c.listener,h!==s&&n.isPropagationStopped())break e;s=c,n.currentTarget=j;try{s(n)}catch(w){As(w)}n.currentTarget=null,s=h}}}}function te(e,t){var a=t[ii];a===void 0&&(a=t[ii]=new Set);var l=e+"__bubble";a.has(l)||(Ko(t,e,2,!1),a.add(l))}function ku(e,t,a){var l=0;t&&(l|=4),Ko(a,e,l,t)}var Cs="_reactListening"+Math.random().toString(36).slice(2);function Ju(e){if(!e[Cs]){e[Cs]=!0,Gc.forEach(function(a){a!=="selectionchange"&&(Om.has(a)||ku(a,!1,e),ku(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Cs]||(t[Cs]=!0,ku("selectionchange",!1,t))}}function Ko(e,t,a,l){switch(yd(t)){case 2:var n=n0;break;case 8:n=s0;break;default:n=rc}a=n.bind(null,t,a,e),n=void 0,!yi||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),l?n!==void 0?e.addEventListener(t,a,{capture:!0,passive:n}):e.addEventListener(t,a,!0):n!==void 0?e.addEventListener(t,a,{passive:n}):e.addEventListener(t,a,!1)}function Iu(e,t,a,l,n){var s=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var u=l.tag;if(u===3||u===4){var c=l.stateNode.containerInfo;if(c===n)break;if(u===4)for(u=l.return;u!==null;){var h=u.tag;if((h===3||h===4)&&u.stateNode.containerInfo===n)return;u=u.return}for(;c!==null;){if(u=Wa(c),u===null)return;if(h=u.tag,h===5||h===6||h===26||h===27){l=s=u;continue e}c=c.parentNode}}l=l.return}Pc(function(){var j=s,w=gi(a),q=[];e:{var _=Tr.get(e);if(_!==void 0){var T=Wn,K=e;switch(e){case"keypress":if(Jn(a)===0)break e;case"keydown":case"keyup":T=_h;break;case"focusin":K="focus",T=ji;break;case"focusout":K="blur",T=ji;break;case"beforeblur":case"afterblur":T=ji;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":T=tr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":T=hh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":T=Eh;break;case Sr:case Ar:case Nr:T=xh;break;case _r:T=zh;break;case"scroll":case"scrollend":T=oh;break;case"wheel":T=Mh;break;case"copy":case"cut":case"paste":T=ph;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":T=lr;break;case"toggle":case"beforetoggle":T=Rh}var Z=(t&4)!==0,me=!Z&&(e==="scroll"||e==="scrollend"),y=Z?_!==null?_+"Capture":null:_;Z=[];for(var g=j,v;g!==null;){var U=g;if(v=U.stateNode,U=U.tag,U!==5&&U!==26&&U!==27||v===null||y===null||(U=Ll(g,y),U!=null&&Z.push(Nn(g,U,v))),me)break;g=g.return}0<Z.length&&(_=new T(_,K,null,a,w),q.push({event:_,listeners:Z}))}}if((t&7)===0){e:{if(_=e==="mouseover"||e==="pointerover",T=e==="mouseout"||e==="pointerout",_&&a!==mi&&(K=a.relatedTarget||a.fromElement)&&(Wa(K)||K[Ia]))break e;if((T||_)&&(_=w.window===w?w:(_=w.ownerDocument)?_.defaultView||_.parentWindow:window,T?(K=a.relatedTarget||a.toElement,T=j,K=K?Wa(K):null,K!==null&&(me=S(K),Z=K.tag,K!==me||Z!==5&&Z!==27&&Z!==6)&&(K=null)):(T=null,K=j),T!==K)){if(Z=tr,U="onMouseLeave",y="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(Z=lr,U="onPointerLeave",y="onPointerEnter",g="pointer"),me=T==null?_:Hl(T),v=K==null?_:Hl(K),_=new Z(U,g+"leave",T,a,w),_.target=me,_.relatedTarget=v,U=null,Wa(w)===j&&(Z=new Z(y,g+"enter",K,a,w),Z.target=v,Z.relatedTarget=me,U=Z),me=U,T&&K)t:{for(Z=T,y=K,g=0,v=Z;v;v=Ol(v))g++;for(v=0,U=y;U;U=Ol(U))v++;for(;0<g-v;)Z=Ol(Z),g--;for(;0<v-g;)y=Ol(y),v--;for(;g--;){if(Z===y||y!==null&&Z===y.alternate)break t;Z=Ol(Z),y=Ol(y)}Z=null}else Z=null;T!==null&&ko(q,_,T,Z,!1),K!==null&&me!==null&&ko(q,me,K,Z,!0)}}e:{if(_=j?Hl(j):window,T=_.nodeName&&_.nodeName.toLowerCase(),T==="select"||T==="input"&&_.type==="file")var L=or;else if(rr(_))if(dr)L=Zh;else{L=Yh;var P=Lh}else T=_.nodeName,!T||T.toLowerCase()!=="input"||_.type!=="checkbox"&&_.type!=="radio"?j&&hi(j.elementType)&&(L=or):L=Qh;if(L&&(L=L(e,j))){fr(q,L,a,w);break e}P&&P(e,_,j),e==="focusout"&&j&&_.type==="number"&&j.memoizedProps.value!=null&&di(_,"number",_.value)}switch(P=j?Hl(j):window,e){case"focusin":(rr(P)||P.contentEditable==="true")&&(ul=P,Di=j,Jl=null);break;case"focusout":Jl=Di=ul=null;break;case"mousedown":Ei=!0;break;case"contextmenu":case"mouseup":case"dragend":Ei=!1,br(q,a,w);break;case"selectionchange":if(Vh)break;case"keydown":case"keyup":br(q,a,w)}var Q;if(Ai)e:{switch(e){case"compositionstart":var $="onCompositionStart";break e;case"compositionend":$="onCompositionEnd";break e;case"compositionupdate":$="onCompositionUpdate";break e}$=void 0}else il?ur(e,a)&&($="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&($="onCompositionStart");$&&(nr&&a.locale!=="ko"&&(il||$!=="onCompositionStart"?$==="onCompositionEnd"&&il&&(Q=Fc()):(aa=w,pi="value"in aa?aa.value:aa.textContent,il=!0)),P=Gs(j,$),0<P.length&&($=new ar($,e,null,a,w),q.push({event:$,listeners:P}),Q?$.data=Q:(Q=cr(a),Q!==null&&($.data=Q)))),(Q=Bh?Ch(e,a):Gh(e,a))&&($=Gs(j,"onBeforeInput"),0<$.length&&(P=new ar("onBeforeInput","beforeinput",null,a,w),q.push({event:P,listeners:$}),P.data=Q)),Em(q,e,j,a,w)}Vo(q,t)})}function Nn(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Gs(e,t){for(var a=t+"Capture",l=[];e!==null;){var n=e,s=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||s===null||(n=Ll(e,a),n!=null&&l.unshift(Nn(e,n,s)),n=Ll(e,t),n!=null&&l.push(Nn(e,n,s))),e.tag===3)return l;e=e.return}return[]}function Ol(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ko(e,t,a,l,n){for(var s=t._reactName,u=[];a!==null&&a!==l;){var c=a,h=c.alternate,j=c.stateNode;if(c=c.tag,h!==null&&h===l)break;c!==5&&c!==26&&c!==27||j===null||(h=j,n?(j=Ll(a,s),j!=null&&u.unshift(Nn(a,j,h))):n||(j=Ll(a,s),j!=null&&u.push(Nn(a,j,h)))),a=a.return}u.length!==0&&e.push({event:t,listeners:u})}var Mm=/\r\n?/g,Um=/\u0000|\uFFFD/g;function Jo(e){return(typeof e=="string"?e:""+e).replace(Mm,`
`).replace(Um,"")}function Io(e,t){return t=Jo(t),Jo(e)===t}function Xs(){}function he(e,t,a,l,n,s){switch(a){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||ll(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&ll(e,""+l);break;case"className":Zn(e,"class",l);break;case"tabIndex":Zn(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Zn(e,a,l);break;case"style":Ic(e,l,s);break;case"data":if(t!=="object"){Zn(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Kn(""+l),e.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(a==="formAction"?(t!=="input"&&he(e,t,"name",n.name,n,null),he(e,t,"formEncType",n.formEncType,n,null),he(e,t,"formMethod",n.formMethod,n,null),he(e,t,"formTarget",n.formTarget,n,null)):(he(e,t,"encType",n.encType,n,null),he(e,t,"method",n.method,n,null),he(e,t,"target",n.target,n,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Kn(""+l),e.setAttribute(a,l);break;case"onClick":l!=null&&(e.onclick=Xs);break;case"onScroll":l!=null&&te("scroll",e);break;case"onScrollEnd":l!=null&&te("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(f(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(f(60));e.innerHTML=a}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}a=Kn(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""+l):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":l===!0?e.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,l):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(a,l):e.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(a):e.setAttribute(a,l);break;case"popover":te("beforetoggle",e),te("toggle",e),Qn(e,"popover",l);break;case"xlinkActuate":Bt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Bt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Bt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Bt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Bt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Bt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Bt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Qn(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=rh.get(a)||a,Qn(e,a,l))}}function Wu(e,t,a,l,n,s){switch(a){case"style":Ic(e,l,s);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(f(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(f(60));e.innerHTML=a}}break;case"children":typeof l=="string"?ll(e,l):(typeof l=="number"||typeof l=="bigint")&&ll(e,""+l);break;case"onScroll":l!=null&&te("scroll",e);break;case"onScrollEnd":l!=null&&te("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Xs);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Xc.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),t=a.slice(2,n?a.length-7:void 0),s=e[ke]||null,s=s!=null?s[a]:null,typeof s=="function"&&e.removeEventListener(t,s,n),typeof l=="function")){typeof s!="function"&&s!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,l,n);break e}a in e?e[a]=l:l===!0?e.setAttribute(a,""):Qn(e,a,l)}}}function Ye(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":te("error",e),te("load",e);var l=!1,n=!1,s;for(s in a)if(a.hasOwnProperty(s)){var u=a[s];if(u!=null)switch(s){case"src":l=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(f(137,t));default:he(e,t,s,u,a,null)}}n&&he(e,t,"srcSet",a.srcSet,a,null),l&&he(e,t,"src",a.src,a,null);return;case"input":te("invalid",e);var c=s=u=n=null,h=null,j=null;for(l in a)if(a.hasOwnProperty(l)){var w=a[l];if(w!=null)switch(l){case"name":n=w;break;case"type":u=w;break;case"checked":h=w;break;case"defaultChecked":j=w;break;case"value":s=w;break;case"defaultValue":c=w;break;case"children":case"dangerouslySetInnerHTML":if(w!=null)throw Error(f(137,t));break;default:he(e,t,l,w,a,null)}}Vc(e,s,c,h,j,u,n,!1),$n(e);return;case"select":te("invalid",e),l=u=s=null;for(n in a)if(a.hasOwnProperty(n)&&(c=a[n],c!=null))switch(n){case"value":s=c;break;case"defaultValue":u=c;break;case"multiple":l=c;default:he(e,t,n,c,a,null)}t=s,a=u,e.multiple=!!l,t!=null?al(e,!!l,t,!1):a!=null&&al(e,!!l,a,!0);return;case"textarea":te("invalid",e),s=n=l=null;for(u in a)if(a.hasOwnProperty(u)&&(c=a[u],c!=null))switch(u){case"value":l=c;break;case"defaultValue":n=c;break;case"children":s=c;break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(f(91));break;default:he(e,t,u,c,a,null)}kc(e,l,n,s),$n(e);return;case"option":for(h in a)if(a.hasOwnProperty(h)&&(l=a[h],l!=null))switch(h){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:he(e,t,h,l,a,null)}return;case"dialog":te("beforetoggle",e),te("toggle",e),te("cancel",e),te("close",e);break;case"iframe":case"object":te("load",e);break;case"video":case"audio":for(l=0;l<An.length;l++)te(An[l],e);break;case"image":te("error",e),te("load",e);break;case"details":te("toggle",e);break;case"embed":case"source":case"link":te("error",e),te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(j in a)if(a.hasOwnProperty(j)&&(l=a[j],l!=null))switch(j){case"children":case"dangerouslySetInnerHTML":throw Error(f(137,t));default:he(e,t,j,l,a,null)}return;default:if(hi(t)){for(w in a)a.hasOwnProperty(w)&&(l=a[w],l!==void 0&&Wu(e,t,w,l,a,void 0));return}}for(c in a)a.hasOwnProperty(c)&&(l=a[c],l!=null&&he(e,t,c,l,a,null))}function Rm(e,t,a,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,s=null,u=null,c=null,h=null,j=null,w=null;for(T in a){var q=a[T];if(a.hasOwnProperty(T)&&q!=null)switch(T){case"checked":break;case"value":break;case"defaultValue":h=q;default:l.hasOwnProperty(T)||he(e,t,T,null,l,q)}}for(var _ in l){var T=l[_];if(q=a[_],l.hasOwnProperty(_)&&(T!=null||q!=null))switch(_){case"type":s=T;break;case"name":n=T;break;case"checked":j=T;break;case"defaultChecked":w=T;break;case"value":u=T;break;case"defaultValue":c=T;break;case"children":case"dangerouslySetInnerHTML":if(T!=null)throw Error(f(137,t));break;default:T!==q&&he(e,t,_,T,l,q)}}oi(e,u,c,h,j,w,s,n);return;case"select":T=u=c=_=null;for(s in a)if(h=a[s],a.hasOwnProperty(s)&&h!=null)switch(s){case"value":break;case"multiple":T=h;default:l.hasOwnProperty(s)||he(e,t,s,null,l,h)}for(n in l)if(s=l[n],h=a[n],l.hasOwnProperty(n)&&(s!=null||h!=null))switch(n){case"value":_=s;break;case"defaultValue":c=s;break;case"multiple":u=s;default:s!==h&&he(e,t,n,s,l,h)}t=c,a=u,l=T,_!=null?al(e,!!a,_,!1):!!l!=!!a&&(t!=null?al(e,!!a,t,!0):al(e,!!a,a?[]:"",!1));return;case"textarea":T=_=null;for(c in a)if(n=a[c],a.hasOwnProperty(c)&&n!=null&&!l.hasOwnProperty(c))switch(c){case"value":break;case"children":break;default:he(e,t,c,null,l,n)}for(u in l)if(n=l[u],s=a[u],l.hasOwnProperty(u)&&(n!=null||s!=null))switch(u){case"value":_=n;break;case"defaultValue":T=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(f(91));break;default:n!==s&&he(e,t,u,n,l,s)}Kc(e,_,T);return;case"option":for(var K in a)if(_=a[K],a.hasOwnProperty(K)&&_!=null&&!l.hasOwnProperty(K))switch(K){case"selected":e.selected=!1;break;default:he(e,t,K,null,l,_)}for(h in l)if(_=l[h],T=a[h],l.hasOwnProperty(h)&&_!==T&&(_!=null||T!=null))switch(h){case"selected":e.selected=_&&typeof _!="function"&&typeof _!="symbol";break;default:he(e,t,h,_,l,T)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Z in a)_=a[Z],a.hasOwnProperty(Z)&&_!=null&&!l.hasOwnProperty(Z)&&he(e,t,Z,null,l,_);for(j in l)if(_=l[j],T=a[j],l.hasOwnProperty(j)&&_!==T&&(_!=null||T!=null))switch(j){case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(f(137,t));break;default:he(e,t,j,_,l,T)}return;default:if(hi(t)){for(var me in a)_=a[me],a.hasOwnProperty(me)&&_!==void 0&&!l.hasOwnProperty(me)&&Wu(e,t,me,void 0,l,_);for(w in l)_=l[w],T=a[w],!l.hasOwnProperty(w)||_===T||_===void 0&&T===void 0||Wu(e,t,w,_,l,T);return}}for(var y in a)_=a[y],a.hasOwnProperty(y)&&_!=null&&!l.hasOwnProperty(y)&&he(e,t,y,null,l,_);for(q in l)_=l[q],T=a[q],!l.hasOwnProperty(q)||_===T||_==null&&T==null||he(e,t,q,_,l,T)}var Pu=null,Fu=null;function Hs(e){return e.nodeType===9?e:e.ownerDocument}function Wo(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Po(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function ec(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var tc=null;function qm(){var e=window.event;return e&&e.type==="popstate"?e===tc?!1:(tc=e,!0):(tc=null,!1)}var Fo=typeof setTimeout=="function"?setTimeout:void 0,Bm=typeof clearTimeout=="function"?clearTimeout:void 0,ed=typeof Promise=="function"?Promise:void 0,Cm=typeof queueMicrotask=="function"?queueMicrotask:typeof ed<"u"?function(e){return ed.resolve(null).then(e).catch(Gm)}:Fo;function Gm(e){setTimeout(function(){throw e})}function pa(e){return e==="head"}function td(e,t){var a=t,l=0,n=0;do{var s=a.nextSibling;if(e.removeChild(a),s&&s.nodeType===8)if(a=s.data,a==="/$"){if(0<l&&8>l){a=l;var u=e.ownerDocument;if(a&1&&_n(u.documentElement),a&2&&_n(u.body),a&4)for(a=u.head,_n(a),u=a.firstChild;u;){var c=u.nextSibling,h=u.nodeName;u[Xl]||h==="SCRIPT"||h==="STYLE"||h==="LINK"&&u.rel.toLowerCase()==="stylesheet"||a.removeChild(u),u=c}}if(n===0){e.removeChild(s),Un(t);return}n--}else a==="$"||a==="$?"||a==="$!"?n++:l=a.charCodeAt(0)-48;else l=0;a=s}while(a);Un(t)}function ac(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":ac(a),ui(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Xm(e,t,a,l){for(;e.nodeType===1;){var n=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Xl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==n.rel||e.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||e.getAttribute("title")!==(n.title==null?null:n.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(n.src==null?null:n.src)||e.getAttribute("type")!==(n.type==null?null:n.type)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=n.name==null?null:""+n.name;if(n.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=Tt(e.nextSibling),e===null)break}return null}function Hm(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Tt(e.nextSibling),e===null))return null;return e}function lc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function Lm(e,t){var a=e.ownerDocument;if(e.data!=="$?"||a.readyState==="complete")t();else{var l=function(){t(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Tt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var nc=null;function ad(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}function ld(e,t,a){switch(t=Hs(a),e){case"html":if(e=t.documentElement,!e)throw Error(f(452));return e;case"head":if(e=t.head,!e)throw Error(f(453));return e;case"body":if(e=t.body,!e)throw Error(f(454));return e;default:throw Error(f(451))}}function _n(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ui(e)}var St=new Map,nd=new Set;function Ls(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var It=H.d;H.d={f:Ym,r:Qm,D:Zm,C:$m,L:Vm,m:Km,X:Jm,S:km,M:Im};function Ym(){var e=It.f(),t=Ms();return e||t}function Qm(e){var t=Pa(e);t!==null&&t.tag===5&&t.type==="form"?Af(t):It.r(e)}var Ml=typeof document>"u"?null:document;function sd(e,t,a){var l=Ml;if(l&&typeof t=="string"&&t){var n=gt(t);n='link[rel="'+e+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),nd.has(n)||(nd.add(n),e={rel:e,crossOrigin:a,href:t},l.querySelector(n)===null&&(t=l.createElement("link"),Ye(t,"link",e),Re(t),l.head.appendChild(t)))}}function Zm(e){It.D(e),sd("dns-prefetch",e,null)}function $m(e,t){It.C(e,t),sd("preconnect",e,t)}function Vm(e,t,a){It.L(e,t,a);var l=Ml;if(l&&e&&t){var n='link[rel="preload"][as="'+gt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+gt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+gt(a.imageSizes)+'"]')):n+='[href="'+gt(e)+'"]';var s=n;switch(t){case"style":s=Ul(e);break;case"script":s=Rl(e)}St.has(s)||(e=R({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),St.set(s,e),l.querySelector(n)!==null||t==="style"&&l.querySelector(Tn(s))||t==="script"&&l.querySelector(Dn(s))||(t=l.createElement("link"),Ye(t,"link",e),Re(t),l.head.appendChild(t)))}}function Km(e,t){It.m(e,t);var a=Ml;if(a&&e){var l=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+gt(l)+'"][href="'+gt(e)+'"]',s=n;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Rl(e)}if(!St.has(s)&&(e=R({rel:"modulepreload",href:e},t),St.set(s,e),a.querySelector(n)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Dn(s)))return}l=a.createElement("link"),Ye(l,"link",e),Re(l),a.head.appendChild(l)}}}function km(e,t,a){It.S(e,t,a);var l=Ml;if(l&&e){var n=Fa(l).hoistableStyles,s=Ul(e);t=t||"default";var u=n.get(s);if(!u){var c={loading:0,preload:null};if(u=l.querySelector(Tn(s)))c.loading=5;else{e=R({rel:"stylesheet",href:e,"data-precedence":t},a),(a=St.get(s))&&sc(e,a);var h=u=l.createElement("link");Re(h),Ye(h,"link",e),h._p=new Promise(function(j,w){h.onload=j,h.onerror=w}),h.addEventListener("load",function(){c.loading|=1}),h.addEventListener("error",function(){c.loading|=2}),c.loading|=4,Ys(u,t,l)}u={type:"stylesheet",instance:u,count:1,state:c},n.set(s,u)}}}function Jm(e,t){It.X(e,t);var a=Ml;if(a&&e){var l=Fa(a).hoistableScripts,n=Rl(e),s=l.get(n);s||(s=a.querySelector(Dn(n)),s||(e=R({src:e,async:!0},t),(t=St.get(n))&&ic(e,t),s=a.createElement("script"),Re(s),Ye(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},l.set(n,s))}}function Im(e,t){It.M(e,t);var a=Ml;if(a&&e){var l=Fa(a).hoistableScripts,n=Rl(e),s=l.get(n);s||(s=a.querySelector(Dn(n)),s||(e=R({src:e,async:!0,type:"module"},t),(t=St.get(n))&&ic(e,t),s=a.createElement("script"),Re(s),Ye(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},l.set(n,s))}}function id(e,t,a,l){var n=(n=Dt.current)?Ls(n):null;if(!n)throw Error(f(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Ul(a.href),a=Fa(n).hoistableStyles,l=a.get(t),l||(l={type:"style",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Ul(a.href);var s=Fa(n).hoistableStyles,u=s.get(e);if(u||(n=n.ownerDocument||n,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,u),(s=n.querySelector(Tn(e)))&&!s._p&&(u.instance=s,u.state.loading=5),St.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},St.set(e,a),s||Wm(n,e,a,u.state))),t&&l===null)throw Error(f(528,""));return u}if(t&&l!==null)throw Error(f(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Rl(a),a=Fa(n).hoistableScripts,l=a.get(t),l||(l={type:"script",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(f(444,e))}}function Ul(e){return'href="'+gt(e)+'"'}function Tn(e){return'link[rel="stylesheet"]['+e+"]"}function ud(e){return R({},e,{"data-precedence":e.precedence,precedence:null})}function Wm(e,t,a,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),Ye(t,"link",a),Re(t),e.head.appendChild(t))}function Rl(e){return'[src="'+gt(e)+'"]'}function Dn(e){return"script[async]"+e}function cd(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+gt(a.href)+'"]');if(l)return t.instance=l,Re(l),l;var n=R({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),Re(l),Ye(l,"style",n),Ys(l,a.precedence,e),t.instance=l;case"stylesheet":n=Ul(a.href);var s=e.querySelector(Tn(n));if(s)return t.state.loading|=4,t.instance=s,Re(s),s;l=ud(a),(n=St.get(n))&&sc(l,n),s=(e.ownerDocument||e).createElement("link"),Re(s);var u=s;return u._p=new Promise(function(c,h){u.onload=c,u.onerror=h}),Ye(s,"link",l),t.state.loading|=4,Ys(s,a.precedence,e),t.instance=s;case"script":return s=Rl(a.src),(n=e.querySelector(Dn(s)))?(t.instance=n,Re(n),n):(l=a,(n=St.get(s))&&(l=R({},a),ic(l,n)),e=e.ownerDocument||e,n=e.createElement("script"),Re(n),Ye(n,"link",l),e.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(f(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(l=t.instance,t.state.loading|=4,Ys(l,a.precedence,e));return t.instance}function Ys(e,t,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=l.length?l[l.length-1]:null,s=n,u=0;u<l.length;u++){var c=l[u];if(c.dataset.precedence===t)s=c;else if(s!==n)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function sc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function ic(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Qs=null;function rd(e,t,a){if(Qs===null){var l=new Map,n=Qs=new Map;n.set(a,l)}else n=Qs,l=n.get(a),l||(l=new Map,n.set(a,l));if(l.has(e))return l;for(l.set(e,null),a=a.getElementsByTagName(e),n=0;n<a.length;n++){var s=a[n];if(!(s[Xl]||s[$e]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var u=s.getAttribute(t)||"";u=e+u;var c=l.get(u);c?c.push(s):l.set(u,[s])}}return l}function fd(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function Pm(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function od(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var En=null;function Fm(){}function e0(e,t,a){if(En===null)throw Error(f(475));var l=En;if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var n=Ul(a.href),s=e.querySelector(Tn(n));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(l.count++,l=Zs.bind(l),e.then(l,l)),t.state.loading|=4,t.instance=s,Re(s);return}s=e.ownerDocument||e,a=ud(a),(n=St.get(n))&&sc(a,n),s=s.createElement("link"),Re(s);var u=s;u._p=new Promise(function(c,h){u.onload=c,u.onerror=h}),Ye(s,"link",a),t.instance=s}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(l.count++,t=Zs.bind(l),e.addEventListener("load",t),e.addEventListener("error",t))}}function t0(){if(En===null)throw Error(f(475));var e=En;return e.stylesheets&&e.count===0&&uc(e,e.stylesheets),0<e.count?function(t){var a=setTimeout(function(){if(e.stylesheets&&uc(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a)}}:null}function Zs(){if(this.count--,this.count===0){if(this.stylesheets)uc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var $s=null;function uc(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,$s=new Map,t.forEach(a0,e),$s=null,Zs.call(e))}function a0(e,t){if(!(t.state.loading&4)){var a=$s.get(e);if(a)var l=a.get(null);else{a=new Map,$s.set(e,a);for(var n=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<n.length;s++){var u=n[s];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(a.set(u.dataset.precedence,u),l=u)}l&&a.set(null,l)}n=t.instance,u=n.getAttribute("data-precedence"),s=a.get(u)||l,s===l&&a.set(null,n),a.set(u,n),this.count++,l=Zs.bind(this),n.addEventListener("load",l),n.addEventListener("error",l),s?s.parentNode.insertBefore(n,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(n,e.firstChild)),t.state.loading|=4}}var wn={$$typeof:I,Provider:null,Consumer:null,_currentValue:V,_currentValue2:V,_threadCount:0};function l0(e,t,a,l,n,s,u,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=li(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=li(0),this.hiddenUpdates=li(null),this.identifierPrefix=l,this.onUncaughtError=n,this.onCaughtError=s,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function dd(e,t,a,l,n,s,u,c,h,j,w,q){return e=new l0(e,t,a,u,c,h,j,q),t=1,s===!0&&(t|=24),s=nt(3,null,null,t),e.current=s,s.stateNode=e,t=Yi(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:l,isDehydrated:a,cache:t},Vi(s),e}function hd(e){return e?(e=ol,e):ol}function md(e,t,a,l,n,s){n=hd(n),l.context===null?l.context=n:l.pendingContext=n,l=sa(t),l.payload={element:a},s=s===void 0?null:s,s!==null&&(l.callback=s),a=ia(e,l,t),a!==null&&(rt(a,e,t),nn(a,e,t))}function gd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function cc(e,t){gd(e,t),(e=e.alternate)&&gd(e,t)}function xd(e){if(e.tag===13){var t=fl(e,67108864);t!==null&&rt(t,e,67108864),cc(e,67108864)}}var Vs=!0;function n0(e,t,a,l){var n=M.T;M.T=null;var s=H.p;try{H.p=2,rc(e,t,a,l)}finally{H.p=s,M.T=n}}function s0(e,t,a,l){var n=M.T;M.T=null;var s=H.p;try{H.p=8,rc(e,t,a,l)}finally{H.p=s,M.T=n}}function rc(e,t,a,l){if(Vs){var n=fc(l);if(n===null)Iu(e,t,l,Ks,a),pd(e,l);else if(u0(n,e,t,a,l))l.stopPropagation();else if(pd(e,l),t&4&&-1<i0.indexOf(e)){for(;n!==null;){var s=Pa(n);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var u=Ta(s.pendingLanes);if(u!==0){var c=s;for(c.pendingLanes|=2,c.entangledLanes|=2;u;){var h=1<<31-at(u);c.entanglements[1]|=h,u&=~h}Rt(s),(re&6)===0&&(zs=wt()+500,Sn(0))}}break;case 13:c=fl(s,2),c!==null&&rt(c,s,2),Ms(),cc(s,2)}if(s=fc(l),s===null&&Iu(e,t,l,Ks,a),s===n)break;n=s}n!==null&&l.stopPropagation()}else Iu(e,t,l,null,a)}}function fc(e){return e=gi(e),oc(e)}var Ks=null;function oc(e){if(Ks=null,e=Wa(e),e!==null){var t=S(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=p(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ks=e,null}function yd(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch($d()){case wc:return 2;case zc:return 8;case Xn:case Vd:return 32;case Oc:return 268435456;default:return 32}default:return 32}}var dc=!1,va=null,ba=null,ja=null,zn=new Map,On=new Map,Sa=[],i0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function pd(e,t){switch(e){case"focusin":case"focusout":va=null;break;case"dragenter":case"dragleave":ba=null;break;case"mouseover":case"mouseout":ja=null;break;case"pointerover":case"pointerout":zn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":On.delete(t.pointerId)}}function Mn(e,t,a,l,n,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:a,eventSystemFlags:l,nativeEvent:s,targetContainers:[n]},t!==null&&(t=Pa(t),t!==null&&xd(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),e)}function u0(e,t,a,l,n){switch(t){case"focusin":return va=Mn(va,e,t,a,l,n),!0;case"dragenter":return ba=Mn(ba,e,t,a,l,n),!0;case"mouseover":return ja=Mn(ja,e,t,a,l,n),!0;case"pointerover":var s=n.pointerId;return zn.set(s,Mn(zn.get(s)||null,e,t,a,l,n)),!0;case"gotpointercapture":return s=n.pointerId,On.set(s,Mn(On.get(s)||null,e,t,a,l,n)),!0}return!1}function vd(e){var t=Wa(e.target);if(t!==null){var a=S(t);if(a!==null){if(t=a.tag,t===13){if(t=p(a),t!==null){e.blockedOn=t,eh(e.priority,function(){if(a.tag===13){var l=ct();l=ni(l);var n=fl(a,l);n!==null&&rt(n,a,l),cc(a,l)}});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ks(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=fc(e.nativeEvent);if(a===null){a=e.nativeEvent;var l=new a.constructor(a.type,a);mi=l,a.target.dispatchEvent(l),mi=null}else return t=Pa(a),t!==null&&xd(t),e.blockedOn=a,!1;t.shift()}return!0}function bd(e,t,a){ks(e)&&a.delete(t)}function c0(){dc=!1,va!==null&&ks(va)&&(va=null),ba!==null&&ks(ba)&&(ba=null),ja!==null&&ks(ja)&&(ja=null),zn.forEach(bd),On.forEach(bd)}function Js(e,t){e.blockedOn===t&&(e.blockedOn=null,dc||(dc=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,c0)))}var Is=null;function jd(e){Is!==e&&(Is=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Is===e&&(Is=null);for(var t=0;t<e.length;t+=3){var a=e[t],l=e[t+1],n=e[t+2];if(typeof l!="function"){if(oc(l||a)===null)continue;break}var s=Pa(a);s!==null&&(e.splice(t,3),t-=3,ou(s,{pending:!0,data:n,method:a.method,action:l},l,n))}}))}function Un(e){function t(h){return Js(h,e)}va!==null&&Js(va,e),ba!==null&&Js(ba,e),ja!==null&&Js(ja,e),zn.forEach(t),On.forEach(t);for(var a=0;a<Sa.length;a++){var l=Sa[a];l.blockedOn===e&&(l.blockedOn=null)}for(;0<Sa.length&&(a=Sa[0],a.blockedOn===null);)vd(a),a.blockedOn===null&&Sa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var n=a[l],s=a[l+1],u=n[ke]||null;if(typeof s=="function")u||jd(a);else if(u){var c=null;if(s&&s.hasAttribute("formAction")){if(n=s,u=s[ke]||null)c=u.formAction;else if(oc(n)!==null)continue}else c=u.action;typeof c=="function"?a[l+1]=c:(a.splice(l,3),l-=3),jd(a)}}}function hc(e){this._internalRoot=e}Ws.prototype.render=hc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(f(409));var a=t.current,l=ct();md(a,l,e,t,null,null)},Ws.prototype.unmount=hc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;md(e.current,2,null,e,null,null),Ms(),t[Ia]=null}};function Ws(e){this._internalRoot=e}Ws.prototype.unstable_scheduleHydration=function(e){if(e){var t=Bc();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Sa.length&&t!==0&&t<Sa[a].priority;a++);Sa.splice(a,0,e),a===0&&vd(e)}};var Sd=o.version;if(Sd!=="19.1.0")throw Error(f(527,Sd,"19.1.0"));H.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(f(188)):(e=Object.keys(e).join(","),Error(f(268,e)));return e=E(t),e=e!==null?z(e):null,e=e===null?null:e.stateNode,e};var r0={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:M,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ps=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ps.isDisabled&&Ps.supportsFiber)try{Bl=Ps.inject(r0),tt=Ps}catch{}}return Rn.createRoot=function(e,t){if(!m(e))throw Error(f(299));var a=!1,l="",n=Cf,s=Gf,u=Xf,c=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(u=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(c=t.unstable_transitionCallbacks)),t=dd(e,1,!1,null,null,a,l,n,s,u,c,null),e[Ia]=t.current,Ju(e),new hc(t)},Rn.hydrateRoot=function(e,t,a){if(!m(e))throw Error(f(299));var l=!1,n="",s=Cf,u=Gf,c=Xf,h=null,j=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(s=a.onUncaughtError),a.onCaughtError!==void 0&&(u=a.onCaughtError),a.onRecoverableError!==void 0&&(c=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(h=a.unstable_transitionCallbacks),a.formState!==void 0&&(j=a.formState)),t=dd(e,1,!0,t,a??null,l,n,s,u,c,h,j),t.context=hd(null),a=t.current,l=ct(),l=ni(l),n=sa(l),n.callback=null,ia(a,n,l),a=l,t.current.lanes=a,Gl(t,a),Rt(t),e[Ia]=t.current,Ju(e),new Ws(t)},Rn.version="19.1.0",Rn}var Ed;function Y0(){if(Ed)return mc.exports;Ed=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(o){console.error(o)}}return r(),mc.exports=L0(),mc.exports}var Q0=Y0();class Bn extends Error{}Bn.prototype.name="InvalidTokenError";function Z0(r){return decodeURIComponent(atob(r).replace(/(.)/g,(o,d)=>{let f=d.charCodeAt(0).toString(16).toUpperCase();return f.length<2&&(f="0"+f),"%"+f}))}function $0(r){let o=r.replace(/-/g,"+").replace(/_/g,"/");switch(o.length%4){case 0:break;case 2:o+="==";break;case 3:o+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return Z0(o)}catch{return atob(o)}}function Bd(r,o){if(typeof r!="string")throw new Bn("Invalid token specified: must be a string");o||(o={});const d=o.header===!0?0:1,f=r.split(".")[d];if(typeof f!="string")throw new Bn(`Invalid token specified: missing part #${d+1}`);let m;try{m=$0(f)}catch(S){throw new Bn(`Invalid token specified: invalid base64 for part #${d+1} (${S.message})`)}try{return JSON.parse(m)}catch(S){throw new Bn(`Invalid token specified: invalid json for part #${d+1} (${S.message})`)}}const Cd="https://learn.reboot01.com/api",V0=`${Cd}/auth/signin`,K0=`${Cd}/graphql-engine/v1/graphql`,Sc="reboot01_jwt_token",Ac="reboot01_user_data",k0=(r,o)=>{const d=`${r}:${o}`;return btoa(d)},J0=async(r,o)=>{try{const d=k0(r,o),f=await fetch(V0,{method:"POST",headers:{Authorization:`Basic ${d}`,"Content-Type":"application/json"}});if(!f.ok)throw f.status===401?new Error("Invalid credentials. Please check your username/email and password."):f.status===403?new Error("Access forbidden. Please contact support."):f.status>=500?new Error("Server error. Please try again later."):new Error(`Authentication failed: ${f.statusText}`);const m=await f.text();if(!m||m.trim()==="")throw new Error("No token received from server");const S=m.trim().replace(/^["']|["']$/g,"");if(!S.includes(".")||S.split(".").length!==3)throw console.error("Invalid token format. Token:",S.substring(0,50)+"..."),new Error("Invalid token format received from server");if(!_c(S))throw console.error("Token failed format validation"),new Error("Token format validation failed");const p=Bd(S),b={id:p.sub,username:p.username||r,email:p.email,exp:p.exp,iat:p.iat};return{token:S,user:b}}catch(d){throw d.name==="InvalidTokenError"?new Error("Invalid token received from server"):d}},I0=(r,o)=>{localStorage.setItem(Sc,r),localStorage.setItem(Ac,JSON.stringify(o))},Nc=()=>localStorage.getItem(Sc),W0=()=>{const r=localStorage.getItem(Ac);return r?JSON.parse(r):null},_c=r=>{if(!r||typeof r!="string")return!1;const o=r.split(".");if(o.length!==3)return!1;try{return o.forEach(d=>{if(!d)throw new Error("Empty part");if(!/^[A-Za-z0-9_-]+$/.test(d))throw new Error("Invalid characters")}),!0}catch{return!1}},Gd=r=>{try{if(!_c(r))return!0;const o=Bd(r),d=Date.now()/1e3;return o.exp<d}catch(o){return console.warn("Token validation error:",o.message),!0}},P0=()=>{const r=Nc();return r?!Gd(r):!1},Za=()=>{localStorage.removeItem(Sc),localStorage.removeItem(Ac)},F0=()=>{const r=Nc();return!r||!_c(r)||Gd(r)?(r&&(console.warn("Clearing invalid or expired token"),Za()),{}):{Authorization:`Bearer ${r}`}},eg=r=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r),tg=r=>eg(r)?"email":"username",Fe={LOGIN_START:"LOGIN_START",LOGIN_SUCCESS:"LOGIN_SUCCESS",LOGIN_FAILURE:"LOGIN_FAILURE",LOGOUT:"LOGOUT",RESTORE_SESSION:"RESTORE_SESSION",CLEAR_ERROR:"CLEAR_ERROR"},ag={user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!1},lg=(r,o)=>{switch(o.type){case Fe.LOGIN_START:return{...r,isLoading:!0,error:null};case Fe.LOGIN_SUCCESS:return{...r,user:o.payload.user,token:o.payload.token,isAuthenticated:!0,isLoading:!1,error:null,isInitialized:!0};case Fe.LOGIN_FAILURE:return{...r,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:o.payload.error,isInitialized:!0};case Fe.LOGOUT:return{...r,user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null,isInitialized:!0};case Fe.RESTORE_SESSION:return{...r,user:o.payload.user,token:o.payload.token,isAuthenticated:o.payload.isAuthenticated,isInitialized:!0};case Fe.CLEAR_ERROR:return{...r,error:null};default:return r}},Xd=F.createContext(null),ng=({children:r})=>{const[o,d]=F.useReducer(lg,ag);F.useEffect(()=>{(()=>{try{const E=Nc(),z=W0();E&&z&&P0()?d({type:Fe.RESTORE_SESSION,payload:{user:z,token:E,isAuthenticated:!0}}):(Za(),d({type:Fe.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}}))}catch(E){console.warn("Session restoration error:",E.message),Za(),d({type:Fe.RESTORE_SESSION,payload:{user:null,token:null,isAuthenticated:!1}})}})()},[]);const f=async(b,E)=>{d({type:Fe.LOGIN_START});try{const{token:z,user:R}=await J0(b,E);return I0(z,R),d({type:Fe.LOGIN_SUCCESS,payload:{user:R,token:z}}),{success:!0}}catch(z){return d({type:Fe.LOGIN_FAILURE,payload:{error:z.message}}),{success:!1,error:z.message}}},m=()=>{Za(),d({type:Fe.LOGOUT})},S=()=>{d({type:Fe.CLEAR_ERROR})},p={user:o.user,token:o.token,isAuthenticated:o.isAuthenticated,isLoading:o.isLoading,error:o.error,isInitialized:o.isInitialized,login:f,logout:m,clearError:S};return i.jsx(Xd.Provider,{value:p,children:r})},et=()=>{const r=F.useContext(Xd);if(!r)throw new Error("useAuth must be used within an AuthProvider");return r};function Hd(r){return new bc(function(o,d){var f=h0(o,[]);return new wd(function(m){var S,p=!1;return Promise.resolve(f).then(function(b){return r(b,o.getContext())}).then(o.setContext).then(function(){p||(S=d(o).subscribe({next:m.next.bind(m),error:m.error.bind(m),complete:m.complete.bind(m)}))}).catch(m.error.bind(m)),function(){p=!0,S&&S.unsubscribe()}})})}function Ld(r){return new bc(function(o,d){return new wd(function(f){var m,S,p;try{m=d(o).subscribe({next:function(b){if(b.errors?p=r({graphQLErrors:b.errors,response:b,operation:o,forward:d}):m0(b)&&(p=r({protocolErrors:b.extensions[g0],response:b,operation:o,forward:d})),p){S=p.subscribe({next:f.next.bind(f),error:f.error.bind(f),complete:f.complete.bind(f)});return}f.next(b)},error:function(b){if(p=r({operation:o,networkError:b,graphQLErrors:b&&b.result&&b.result.errors||void 0,forward:d}),p){S=p.subscribe({next:f.next.bind(f),error:f.error.bind(f),complete:f.complete.bind(f)});return}f.error(b)},complete:function(){p||f.complete.bind(f)()}})}catch(b){r({networkError:b,operation:o,forward:d}),f.error(b)}return function(){m&&m.unsubscribe(),S&&m.unsubscribe()}})})}(function(r){x0(o,r);function o(d){var f=r.call(this)||this;return f.link=Ld(d),f}return o.prototype.request=function(d,f){return this.link.request(d,f)},o})(bc);const sg=()=>new y0({typePolicies:{Query:{fields:{user:{merge(r,o){return o}},transaction:{keyArgs:["where","order_by"],merge(r=[],o,{args:d}){return d?.offset&&d.offset>0?[...r,...o]:o}},progress:{keyArgs:["where","order_by"],merge(r=[],o,{args:d}){return d?.offset&&d.offset>0?[...r,...o]:o}},result:{keyArgs:["where","order_by"],merge(r=[],o,{args:d}){return d?.offset&&d.offset>0?[...r,...o]:o}},audit:{keyArgs:["where","order_by"],merge(r=[],o,{args:d}){return d?.offset&&d.offset>0?[...r,...o]:o}},event:{keyArgs:["where","order_by"],merge(r=[],o,{args:d}){return d?.offset&&d.offset>0?[...r,...o]:o}},group:{keyArgs:["where","order_by"],merge(r=[],o,{args:d}){return d?.offset&&d.offset>0?[...r,...o]:o}}}},User:{fields:{transactions:{merge(r,o){return o}},results:{merge(r,o){return o}},progresses:{merge(r,o){return o}}}},transaction_aggregate:{merge:!0},result_aggregate:{merge:!0},progress_aggregate:{merge:!0},audit_aggregate:{merge:!0}},possibleTypes:{},dataIdFromObject:r=>{switch(r.__typename){case"User":return`User:${r.id}`;case"Transaction":return`Transaction:${r.id}`;case"Result":return`Result:${r.id}`;case"Progress":return`Progress:${r.id}`;case"Audit":return`Audit:${r.id}`;case"Event":return`Event:${r.id}`;case"Group":return`Group:${r.id}`;case"Object":return`Object:${r.id}`;default:return null}}});class ig{constructor(){this.metrics=new Map,this.slowQueryThreshold=1e3}startQuery(o,d){const f=`${o}_${Date.now()}_${Math.random()}`;return this.metrics.set(f,{queryName:o,variables:d,startTime:performance.now(),endTime:null,duration:null,error:null}),f}endQuery(o,d=null){const f=this.metrics.get(o);if(f&&(f.endTime=performance.now(),f.duration=f.endTime-f.startTime,f.error=d,f.duration>this.slowQueryThreshold&&console.warn("Slow GraphQL query detected:",{queryName:f.queryName,duration:`${f.duration.toFixed(2)}ms`,variables:f.variables}),this.metrics.size>100)){const m=this.metrics.keys().next().value;this.metrics.delete(m)}}getStats(){const o=Array.from(this.metrics.values()).filter(m=>m.duration!==null);if(o.length===0)return{totalQueries:0,averageDuration:0,slowQueries:0};const d=o.reduce((m,S)=>m+S.duration,0),f=o.filter(m=>m.duration>this.slowQueryThreshold).length;return{totalQueries:o.length,averageDuration:d/o.length,slowQueries:f,slowQueryPercentage:f/o.length*100}}}const vc=new ig,ug=p0({uri:K0}),cg=Hd((r,{headers:o})=>{const d=F0();return{headers:{...o,...d,"Content-Type":"application/json"}}}),rg=Hd((r,{headers:o})=>{const d=vc.startQuery("GraphQL Query",{});return{headers:o,queryId:d}}),fg=Ld(({graphQLErrors:r,networkError:o,operation:d})=>{const f=d.getContext().queryId;if(r&&r.forEach(({message:m,locations:S,path:p,extensions:b})=>{if(console.error(`[GraphQL error]: Message: ${m}, Location: ${S}, Path: ${p}`),f&&vc.endQuery(f,m),m.includes("JWT")||m.includes("JWS")||m.includes("verify")){console.warn("JWT verification error detected, clearing auth data"),Za();return}if(b?.code==="UNAUTHENTICATED"||b?.code==="FORBIDDEN"){console.warn("Authentication error detected, clearing auth data"),Za();return}}),o&&(console.error(`[Network error]: ${o}`),f&&vc.endQuery(f,o.message),o.statusCode===401||o.statusCode===403)){console.warn("Network authentication error, clearing auth data"),Za();return}}),Yd=new v0({link:b0([fg,rg,cg,ug]),cache:sg(),defaultOptions:{watchQuery:{errorPolicy:"all",fetchPolicy:"cache-first",notifyOnNetworkStatusChange:!0},query:{errorPolicy:"all",fetchPolicy:"cache-first"},mutate:{errorPolicy:"all"}}});Yd.clearStore().catch(console.warn);const og=()=>{const[r,o]=F.useState({identifier:"",password:""}),[d,f]=F.useState(!1),[m,S]=F.useState("username"),{login:p,isLoading:b,error:E,clearError:z}=et();F.useEffect(()=>{r.identifier&&S(tg(r.identifier))},[r.identifier]),F.useEffect(()=>{E&&z()},[r.identifier,r.password,E,z]);const R=A=>{const{name:N,value:D}=A.target;o(B=>({...B,[N]:D}))},O=async A=>{A.preventDefault(),!(!r.identifier.trim()||!r.password.trim())&&await p(r.identifier.trim(),r.password)},x=()=>{f(!d)};return i.jsxs("div",{className:"min-h-screen flex items-center justify-center p-4",children:[i.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900"}),i.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[i.jsx(J.div,{className:"absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl",animate:{scale:[1,1.2,1],opacity:[.3,.5,.3]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),i.jsx(J.div,{className:"absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl",animate:{scale:[1.2,1,1.2],opacity:[.5,.3,.5]},transition:{duration:10,repeat:1/0,ease:"easeInOut"}})]}),i.jsx(J.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"relative z-10 w-full max-w-md",children:i.jsxs("div",{className:"glass-card p-8",children:[i.jsxs("div",{className:"text-center mb-8",children:[i.jsx(J.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center mx-auto mb-4",children:i.jsx(Ad,{className:"w-8 h-8 text-white"})}),i.jsx("h1",{className:"text-3xl font-bold gradient-text mb-2",children:"Welcome Back"}),i.jsx("p",{className:"text-surface-300",children:"Sign in to access your profile dashboard"})]}),E&&i.jsx(J.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg",children:i.jsx("p",{className:"text-red-300 text-sm",children:E})}),i.jsxs("form",{onSubmit:O,className:"space-y-6",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Username or Email"}),i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:m==="email"?i.jsx(zd,{className:"h-5 w-5 text-surface-400"}):i.jsx(Fs,{className:"h-5 w-5 text-surface-400"})}),i.jsx("input",{type:"text",name:"identifier",value:r.identifier,onChange:R,className:"material-input pl-10 w-full",placeholder:"Enter your username or email",autoComplete:"username",required:!0,disabled:b})]})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Password"}),i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:i.jsx(S0,{className:"h-5 w-5 text-surface-400"})}),i.jsx("input",{type:d?"text":"password",name:"password",value:r.password,onChange:R,className:"material-input pl-10 pr-10 w-full",placeholder:"Enter your password",autoComplete:"current-password",required:!0,disabled:b}),i.jsx("button",{type:"button",onClick:x,className:"absolute inset-y-0 right-0 pr-3 flex items-center",disabled:b,children:d?i.jsx(A0,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"}):i.jsx(N0,{className:"h-5 w-5 text-surface-400 hover:text-surface-200 transition-colors"})})]})]}),i.jsx(J.button,{type:"submit",disabled:b||!r.identifier.trim()||!r.password.trim(),className:"w-full glass-button py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed",whileHover:{scale:1.02},whileTap:{scale:.98},children:b?i.jsxs("div",{className:"flex items-center justify-center",children:[i.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"}),"Signing in..."]}):i.jsxs("div",{className:"flex items-center justify-center",children:[i.jsx(Ad,{className:"w-5 h-5 mr-2"}),"Sign In"]})})]}),i.jsx("div",{className:"mt-8 text-center",children:i.jsx("p",{className:"text-surface-400 text-sm",children:"Use your reboot01 platform credentials"})})]})})]})},dg=xe`
  query GetUserProfile($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      id
      login
      profile
      attrs
      createdAt
      updatedAt
      campus
      # User roles and permissions - DISABLED: field not available in schema
      # userRoles {
      #   role {
      #     id
      #     slug
      #     name
      #     description
      #   }
      # }
      # User records (bans, warnings, etc.)
      records {
        id
        message
        # banEndAt - DISABLED: field not available in schema
        createdAt
        author {
          id
          login
        }
      }
    }
  }
`;xe`
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
        # status - DISABLED: field not available in schema
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
`;xe`
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
        # status - DISABLED: field not available in schema
      }
      group {
        id
        status
        captainId
        createdAt
        # members: groupUsers - DISABLED: field not available in schema
        # {
        #   user {
        #     id
        #     login
        #   }
        #   confirmed
        # }
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
`;xe`
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
        # status - DISABLED: field not available in schema
      }
      group {
        id
        status
        # members: groupUsers - DISABLED: field not available in schema
        # {
        #   user {
        #     id
        #     login
        #   }
        # }
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
`;xe`
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
        # members: groupUsers - DISABLED: field not available in schema
        # {
        #   user {
        #     id
        #     login
        #   }
        #   confirmed
        # }
      }
      result {
        id
        grade
        type
        createdAt
      }
    }

    # Audits where user's group was audited - DISABLED: groupUsers field not available
    # audits_received: audit(
    #   where: {
    #     group: {
    #       groupUsers: {
    #         userId: { _eq: $userId }
    #         confirmed: { _eq: true }
    #       }
    #     }
    #   }
    #   order_by: { createdAt: desc }
    #   limit: $limit
    #   offset: $offset
    # ) {
    #   id
    #   grade
    #   attrs
    #   version
    #   endAt
    #   createdAt
    #   updatedAt
    #   auditor {
    #     id
    #     login
    #     profile
    #   }
    #   group {
    #     id
    #     path
    #     status
    #     object {
    #       id
    #       name
    #       type
    #     }
    #   }
    #   result {
    #     id
    #     grade
    #     type
    #     createdAt
    #   }
    # }

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

    # audit_stats_received: audit_aggregate - DISABLED: groupUsers field not available
    # (
    #   where: {
    #     group: {
    #       groupUsers: {
    #         userId: { _eq: $userId }
    #         confirmed: { _eq: true }
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
`;const hg=xe`
  query GetXPStatistics($userId: Int!) {
    # Total XP statistics
    xp_total: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
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
        max {
          amount
        }
        min {
          amount
        }
      }
    }

    # XP transactions with detailed information
    xp_transactions: transaction(
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
      attrs
      campus
      object {
        id
        name
        type
        attrs
        # Object hierarchy for better categorization - DISABLED: field not available in schema
        # children {
        #   child {
        #     name
        #     type
        #   }
        # }
      }
      event {
        id
        path
        createdAt
        endAt
        object {
          name
          type
        }
      }
    }

    # XP by object type
    xp_by_type: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
      distinct_on: [objectId]
    ) {
      nodes {
        object {
          id
          name
          type
        }
        amount
      }
    }

    # Up/Down transactions (audit rewards)
    audit_rewards: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _in: ["up", "down"] }
      }
      order_by: { createdAt: desc }
    ) {
      id
      type
      amount
      createdAt
      path
      object {
        name
        type
      }
    }

    # Audit rewards statistics
    audit_rewards_stats: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _in: ["up", "down"] }
      }
    ) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
  }
`,mg=xe`
  query GetProjectStatistics($userId: Int!, $objectType: String = "project", $limit: Int = 100) {
    # Total projects by type
    total_projects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: $objectType } }
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

    # Passed projects
    passed_projects: result_aggregate(
      where: {
        userId: { _eq: $userId }
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

    # Failed projects
    failed_projects: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: $objectType } }
        grade: { _lt: 1 }
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

    # Detailed project results
    project_results: result(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: $objectType } }
        isLast: { _eq: true }
      }
      order_by: { updatedAt: desc }
      limit: $limit
    ) {
      id
      grade
      type
      attrs
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
        # status - DISABLED: field not available in schema
      }
      group {
        id
        status
        captainId
        # members: groupUsers - DISABLED: field not available in schema
        # {
        #   user {
        #     id
        #     login
        #   }
        #   confirmed
        # }
      }
      # Related audits
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

    # Project attempts (all results, not just final)
    project_attempts: result_aggregate(
      where: {
        userId: { _eq: $userId }
        object: { type: { _eq: $objectType } }
      }
    ) {
      aggregate {
        count
      }
    }

    # Projects by difficulty/XP earned
    project_xp: transaction(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
        object: { type: { _eq: $objectType } }
      }
      order_by: { amount: desc }
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
  }
`,gg=xe`
  query GetAuditRatio($userId: Int!) {
    # Audits done by user
    audits_given: audit_aggregate(
      where: { auditorId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }

    # Audits received by user
    audits_received: audit_aggregate(
      where: {
        group: { members: { userId: { _eq: $userId } } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`,xg=xe`
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
`,yg=xe`
  query SearchUsers($searchTerm: String!) {
    user(
      where: {
        _or: [
          { login: { _ilike: $searchTerm } }
          { firstName: { _ilike: $searchTerm } }
          { lastName: { _ilike: $searchTerm } }
        ]
      }
      limit: 10
    ) {
      id
      login
      firstName
      lastName
    }
  }
`;xe`
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
        # status - DISABLED: field not available in schema
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
`;xe`
  query GetUserGroups($userId: Int!, $limit: Int = 50, $offset: Int = 0, $status: String = null) {
    # Groups user is member of
    user_groups: groupUser(
      where: {
        userId: { _eq: $userId }
        confirmed: { _eq: true }
      }
      order_by: { group: { createdAt: desc } }
      limit: $limit
      offset: $offset
    ) {
      id
      confirmed
      createdAt
      updatedAt
      group {
        id
        status
        path
        campus
        createdAt
        updatedAt
        captain {
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
          # status - DISABLED: field not available in schema
        }
        # members: groupUsers - DISABLED: field not available in schema
        # {
        #   user {
        #     id
        #     login
        #     profile
        #   }
        #   confirmed
        #   createdAt
        # }
        # Group progress and results
        progresses {
          id
          grade
          isDone
          createdAt
          updatedAt
        }
        results {
          id
          grade
          type
          createdAt
          updatedAt
        }
        # Group audits
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
    }

    # Groups where user is captain
    captain_groups: group(
      where: { captainId: { _eq: $userId } }
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      status
      path
      campus
      createdAt
      updatedAt
      object {
        id
        name
        type
        attrs
      }
      event {
        id
        path
        # status - DISABLED: field not available in schema
      }
      # members: groupUsers - DISABLED: field not available in schema
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

    # Group statistics
    group_stats: groupUser_aggregate(
      where: {
        userId: { _eq: $userId }
        confirmed: { _eq: true }
      }
    ) {
      aggregate {
        count
      }
    }

    captain_stats: group_aggregate(
      where: { captainId: { _eq: $userId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;xe`
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
        # status - DISABLED: field not available in schema
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
`;xe`
  query GetObjectDetails($objectId: Int!, $userId: Int = null) {
    object(where: { id: { _eq: $objectId } }) {
      id
      name
      type
      # status - DISABLED: field not available in schema
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
        # status - DISABLED: field not available in schema
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
`;xe`
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
      # status - DISABLED: field not available in schema
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
`;xe`
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
        # _or: [ - DISABLED: groupUsers field not available, using only auditorId
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
`;xe`
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
`;xe`
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
`;const pg=xe`
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
`,vg=xe`
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
`,bg=xe`
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
`,jg=xe`
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
`;xe`
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
`;xe`
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
`;const Sg=xe`
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
`,Ag=xe`
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
`,Ng=xe`
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
`,Qd=()=>{const{user:r,isAuthenticated:o}=et(),{data:d,loading:f,error:m,refetch:S}=Pt(dg,{variables:{userId:r?.id},skip:!o||!r?.id,errorPolicy:"all",notifyOnNetworkStatusChange:!0,fetchPolicy:"network-only"}),p=d?.user?.[0]||null;return{profile:p,userRoles:p?.userRoles||[],records:p?.records||[],loading:f,error:m,refetch:S}},Tc=(r={})=>{const{user:o,isAuthenticated:d}=et(),{skip:f=!1}=r,{data:m,loading:S,error:p,refetch:b}=Pt(hg,{variables:{userId:o?.id},skip:!d||!o?.id||f,errorPolicy:"all",fetchPolicy:"network-only"}),E=m?.xp_total?.aggregate||{},z=m?.xp_transactions||[],R=m?.xp_by_type?.nodes||[],O=m?.audit_rewards||[],x=m?.audit_rewards_stats?.aggregate||{},A=p?0:E.sum?.amount||0,N=E.count||0,D=E.avg?.amount||0,B=E.max?.amount||0,G=E.min?.amount||0,X=p?[]:z.reduce((k,ne)=>{const Ne=new Date(ne.createdAt).toISOString().split("T")[0],ot=k.find(Ze=>Ze.date===Ne);return ot?(ot.amount+=ne.amount,ot.transactions.push(ne)):k.push({date:Ne,amount:ne.amount,cumulative:0,transactions:[ne]}),k},[]);let I=0;X.sort((k,ne)=>new Date(k.date)-new Date(ne.date)),X.forEach(k=>{I+=k.amount,k.cumulative=I});const le=R.reduce((k,ne)=>{const Ne=ne.object?.type||"unknown";return k[Ne]||(k[Ne]={type:Ne,totalXP:0,count:0}),k[Ne].totalXP+=ne.amount,k[Ne].count+=1,k},{}),je=z.reduce((k,ne)=>{const Ne=ne.object?.name||ne.path.split("/").pop()||"unknown";return k[Ne]||(k[Ne]={name:Ne,path:ne.path,totalXP:0,type:ne.object?.type||"unknown",transactions:[]}),k[Ne].totalXP+=ne.amount,k[Ne].transactions.push(ne),k},{}),Ee={totalRewards:x.sum?.amount||0,rewardCount:x.count||0,upRewards:O.filter(k=>k.type==="up"),downRewards:O.filter(k=>k.type==="down")},Qe={xpPerDay:X.length>0?A/X.length:0,mostProductiveDay:X.reduce((k,ne)=>ne.amount>(k?.amount||0)?ne:k,null),consistencyScore:_g(X),growthRate:Tg(X)};return{totalXP:A,transactionCount:N,averageXP:D,maxXP:B,minXP:G,xpProgression:X,xpTransactions:z,xpByObjectType:Object.values(le).sort((k,ne)=>ne.totalXP-k.totalXP),xpByProject:Object.values(je).sort((k,ne)=>ne.totalXP-k.totalXP),auditRewards:O,auditRewardsAnalysis:Ee,performanceMetrics:Qe,loading:S,error:p,refetch:b}},_g=r=>{if(r.length<2)return 0;const o=r.map(p=>p.amount),d=o.reduce((p,b)=>p+b,0)/o.length,f=o.reduce((p,b)=>p+Math.pow(b-d,2),0)/o.length,m=Math.sqrt(f),S=d>0?m/d:1;return Math.max(0,Math.min(100,(1-S)*100))},Tg=r=>{if(r.length<2)return 0;const o=r.slice(0,7),d=r.slice(-7),f=o.reduce((S,p)=>S+p.amount,0)/o.length,m=d.reduce((S,p)=>S+p.amount,0)/d.length;return f>0?(m-f)/f*100:0},Dc=()=>{const{user:r,isAuthenticated:o}=et(),{data:d,loading:f,error:m,refetch:S}=Pt(mg,{variables:{userId:r?.id},skip:!o||!r?.id,errorPolicy:"all",fetchPolicy:"network-only"}),p=m?0:d?.total_projects?.aggregate?.count||0,b=m?0:d?.passed_projects?.aggregate?.count||0,E=m?[]:d?.result||[],z=p>0?b/p*100:0;return{totalProjects:p,passedProjects:b,failedProjects:p-b,passRate:z,projects:E,loading:f,error:m,refetch:S}},Ec=()=>{const{user:r,isAuthenticated:o}=et(),{data:d,loading:f,error:m,refetch:S}=Pt(gg,{variables:{userId:r?.id},skip:!o||!r?.id,errorPolicy:"all",fetchPolicy:"network-only"}),p=m?0:d?.audits_given?.aggregate?.count||0,b=m?0:d?.audits_received?.aggregate?.count||0,E=b>0?p/b:0;return{auditsGiven:p,auditsReceived:b,auditRatio:E,loading:f,error:m,refetch:S}},Dg=()=>{const{user:r,isAuthenticated:o}=et(),{data:d,loading:f,error:m,refetch:S}=Pt(xg,{variables:{userId:r?.id},skip:!o||!r?.id,errorPolicy:"all",fetchPolicy:"network-only"});return{skills:(d?.transaction||[]).map(E=>{const z=E.path.split("/");return{name:z[z.length-1]||"unknown",xp:E.amount,type:E.object?.type||"unknown",path:E.path}}).reduce((E,z)=>{const R=E.find(O=>O.name===z.name);return R?(R.totalXP+=z.xp,R.projects+=1):E.push({name:z.name,totalXP:z.xp,projects:1,type:z.type}),E},[]).sort((E,z)=>z.totalXP-E.totalXP),loading:f,error:m,refetch:S}},Eg=()=>{const{profile:r,loading:o,error:d}=Qd(),{totalXP:f,loading:m,error:S}=Tc(),{passedProjects:p,loading:b,error:E}=Dc(),{auditsGiven:z,auditsReceived:R,auditRatio:O,loading:x,error:A}=Ec(),N=o||m||b||x;typeof window<"u"&&window.location?.hostname==="localhost"&&(d&&console.log("Profile error:",d.message),S&&console.log("XP error:",S.message),E&&console.log("Projects error:",E.message),A&&console.log("Audit error:",A.message),!N&&!d&&!S&&!E&&!A&&console.log("✅ Dashboard data loaded successfully:",{profile:!!r,totalXP:f,passedProjects:p,auditsGiven:z,auditsReceived:R,auditRatio:O}));const B=d&&(d.message?.includes("JWT")||d.message?.includes("authentication")||d.message?.includes("unauthorized"))?d:null;return{profile:r,totalXP:f,passedProjects:p,auditsGiven:z,auditsReceived:R,auditRatio:O,loading:N,error:B,refetch:()=>{window.location.reload()}}},wg=()=>{const[r,{data:o,loading:d,error:f}]=ti(yg,{errorPolicy:"all"});return{searchUsers:S=>{S.trim()&&r({variables:{searchTerm:`%${S}%`}})},users:o?.user||[],loading:d,error:f}},zg=()=>{const{user:r,isAuthenticated:o}=et(),{data:d,loading:f,error:m,refetch:S}=Pt(pg,{variables:{userId:r?.id},skip:!o||!r?.id,errorPolicy:"all"});return{xpByProject:(E=>{if(!E)return[];const z={};return E.forEach(R=>{const O=R.object?.name||R.path?.split("/").pop()||"Unknown",x=R.path;z[x]||(z[x]={name:O,path:x,totalXP:0,type:R.object?.type||"unknown",transactions:[]}),z[x].totalXP+=R.amount,z[x].transactions.push(R)}),Object.values(z).sort((R,O)=>O.totalXP-R.totalXP).slice(0,20)})(d?.transaction),loading:f,error:m,refetch:S}},Og=()=>{const{user:r,isAuthenticated:o}=et(),{data:d,loading:f,error:m,refetch:S}=Pt(vg,{variables:{userId:r?.id},skip:!o||!r?.id,errorPolicy:"all"});return{xpTimeline:(E=>{if(!E)return[];let z=0;return E.map(R=>(z+=R.amount,{date:new Date(R.createdAt),xp:R.amount,cumulativeXP:z,project:R.object?.name||R.path?.split("/").pop(),path:R.path}))})(d?.transaction),loading:f,error:m,refetch:S}},Mg=()=>{const{user:r,isAuthenticated:o}=et(),{data:d,loading:f,error:m,refetch:S}=Pt(bg,{variables:{userId:r?.id},skip:!o||!r?.id,errorPolicy:"all"});return{piscineStats:((E,z)=>{if(!E&&!z)return{jsStats:{},goStats:{},overall:{}};const R=[...E||[],...z||[]],O=R.filter(N=>N.path?.includes("piscine-js")||N.path?.includes("javascript")),x=R.filter(N=>N.path?.includes("piscine-go")||N.path?.includes("golang")),A=N=>{const D=N.filter(X=>X.grade>=1).length,B=N.filter(X=>X.grade<1).length,G=N.length;return{passed:D,failed:B,total:G,passRate:G>0?D/G*100:0}};return{jsStats:A(O),goStats:A(x),overall:A(R)}})(d?.result,d?.progress),loading:f,error:m,refetch:S}},Ug=()=>{const{user:r,isAuthenticated:o}=et(),{data:d,loading:f,error:m,refetch:S}=Pt(jg,{variables:{userId:r?.id},skip:!o||!r?.id,errorPolicy:"all"}),p=d?.user?.[0],b=p?.events?.[0],E=p?.results_aggregate?.aggregate?.count||0,z=p?.passed_projects?.aggregate?.count||0;return{profile:p?{...p,registrationDate:b?.createdAt,startCampus:b?.campus,totalProjects:E,passedProjects:z,passRate:E>0?z/E*100:0}:null,loading:f,error:m,refetch:S}},Rg=()=>{const{user:r,isAuthenticated:o}=et(),[d,f]=Wt.useState([]),[m,S]=Wt.useState(!1),[p,b]=Wt.useState(null),[E]=ti(Sg,{errorPolicy:"all",onCompleted:A=>{const N=z(A);f(N),S(!1)},onError:A=>{b(A),S(!1)}}),z=A=>{if(!A)return[];const N=A.results||[],D=A.progress||[];return[...N,...D].map(G=>{const X=R(G);return{...G,status:X,type:G.isDone!==void 0?"progress":"result"}}).sort((G,X)=>new Date(X.updatedAt)-new Date(G.updatedAt))},R=A=>{const N=new Date,D=new Date(A.updatedAt),B=new Date(A.createdAt),G=(N-D)/(1e3*60*60*24),X=(N-B)/(1e3*60*60*24);return A.grade>=1?"finished":X<=7&&A.grade===0?"setup":A.grade===0&&G<=3?"audit":(A.grade===0&&G<=30,"working")};return{searchResults:d,searchProjects:(A="",N="all",D={})=>{if(!o||!r?.id)return;S(!0),b(null);const{limit:B=20,offset:G=0}=D;E({variables:{userId:r.id,status:N,searchTerm:`%${A}%`,limit:B,offset:G}})},filterByStatus:A=>A==="all"?d:d.filter(N=>N.status===A),loading:m,error:p,statusCounts:{all:d.length,working:d.filter(A=>A.status==="working").length,audit:d.filter(A=>A.status==="audit").length,setup:d.filter(A=>A.status==="setup").length,finished:d.filter(A=>A.status==="finished").length}}},qg=()=>{const{user:r,isAuthenticated:o}=et(),[d,f]=Wt.useState([]),[m,S]=Wt.useState(!1),[p,b]=Wt.useState(null),[E]=ti(Ag,{errorPolicy:"all",onCompleted:N=>{const D=z(N);f(D),S(!1)},onError:N=>{b(N),S(!1)}}),z=N=>{if(!N)return[];const D=(N.audits_given||[]).map(G=>({...G,type:"given",status:R(G)})),B=(N.audits_received||[]).map(G=>({...G,type:"received",status:R(G)}));return[...D,...B].sort((G,X)=>new Date(X.createdAt)-new Date(G.createdAt))},R=N=>{const D=new Date,B=new Date(N.createdAt),G=N.endAt?new Date(N.endAt):null,X=(D-B)/(1e3*60*60*24);return G?"finished":X<=1?"setup":!G&&X<=7?"working":"audit"};return{searchResults:d,searchAudits:(N="",D="all",B={})=>{if(!o||!r?.id)return;S(!0),b(null);const{limit:G=20,offset:X=0}=B;E({variables:{userId:r.id,status:D,searchTerm:`%${N}%`,limit:G,offset:X}})},filterByStatus:N=>N==="all"?d:d.filter(D=>D.status===N),filterByType:N=>N==="all"?d:d.filter(D=>D.type===N),loading:m,error:p,statusCounts:{all:d.length,working:d.filter(N=>N.status==="working").length,audit:d.filter(N=>N.status==="audit").length,setup:d.filter(N=>N.status==="setup").length,finished:d.filter(N=>N.status==="finished").length},typeCounts:{all:d.length,given:d.filter(N=>N.type==="given").length,received:d.filter(N=>N.type==="received").length}}},Bg=()=>{const[r,o]=Wt.useState([]),[d,f]=Wt.useState(!1),[m,S]=Wt.useState(null),[p]=ti(Ng,{errorPolicy:"all",onCompleted:x=>{const A=b(x);o(A),f(!1)},onError:x=>{S(x),f(!1)}}),b=x=>x?.users?x.users.map(A=>{const N=E(A),D=A.recent_transactions?.reduce((G,X)=>G+X.amount,0)||0,B=A.recent_results?.length>0;return{...A,status:N,totalXP:D,recentActivity:B,lastActive:A.recent_results?.[0]?.updatedAt||A.updatedAt}}):[],E=x=>{const A=new Date,N=new Date(x.updatedAt),D=(A-N)/(1e3*60*60*24),B=x.recent_results||[];if(B.some(je=>{const Ee=new Date(je.updatedAt);return(A-Ee)/(1e3*60*60*24)<=7}))return"working";const X=new Date(x.createdAt);return(A-X)/(1e3*60*60*24)<=30&&B.length<=2?"setup":B.length>0&&D<=30?"audit":B.filter(je=>je.grade>=1).length>=3?"finished":"working"};return{searchResults:r,searchUsers:(x="",A="all",N="",D={})=>{f(!0),S(null);const{limit:B=20,offset:G=0}=D;p({variables:{searchTerm:`%${x}%`,status:A,campus:N?`%${N}%`:"%",limit:B,offset:G}})},filterByStatus:x=>x==="all"?r:r.filter(A=>A.status===x),filterByCampus:x=>!x||x==="all"?r:r.filter(A=>A.campus&&A.campus.toLowerCase().includes(x.toLowerCase())),loading:d,error:m,statusCounts:{all:r.length,working:r.filter(x=>x.status==="working").length,audit:r.filter(x=>x.status==="audit").length,setup:r.filter(x=>x.status==="setup").length,finished:r.filter(x=>x.status==="finished").length},campuses:[...new Set(r.map(x=>x.campus).filter(Boolean))]}},Ge=(...r)=>r.filter(Boolean).join(" "),C=({children:r,className:o="",hover:d=!1,animate:f=!0,onClick:m,...S})=>{const p="glass-card p-6",b=d?"card-hover cursor-pointer":"",E=f?J.div:"div",z=f?{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3}}:{};return i.jsx(E,{className:Ge(p,b,o),onClick:m,...z,...S,children:r})},Cg=({children:r,className:o=""})=>i.jsx("div",{className:Ge("mb-4",o),children:r}),Gg=({children:r,className:o=""})=>i.jsx("h3",{className:Ge("text-xl font-semibold text-white mb-2",o),children:r}),Xg=({children:r,className:o=""})=>i.jsx("p",{className:Ge("text-surface-300 text-sm",o),children:r}),Hg=({children:r,className:o=""})=>i.jsx("div",{className:Ge("",o),children:r}),Lg=({children:r,className:o=""})=>i.jsx("div",{className:Ge("mt-4 pt-4 border-t border-white/10",o),children:r});C.Header=Cg;C.Title=Gg;C.Description=Xg;C.Content=Hg;C.Footer=Lg;const qt=({children:r,variant:o="primary",size:d="md",disabled:f=!1,loading:m=!1,className:S="",onClick:p,type:b="button",...E})=>{const z="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",R={primary:"glass-button",secondary:"bg-surface-700 hover:bg-surface-600 text-white border border-surface-600",outline:"border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white",ghost:"text-surface-300 hover:text-white hover:bg-white/10",danger:"bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"},O={sm:"px-3 py-1.5 text-sm rounded-md",md:"px-4 py-2 text-sm rounded-lg",lg:"px-6 py-3 text-base rounded-lg",xl:"px-8 py-4 text-lg rounded-xl"},x=Ge(z,R[o],O[d],S);return i.jsxs(J.button,{type:b,className:x,disabled:f||m,onClick:p,whileHover:{scale:f||m?1:1.02,transition:{type:"spring",stiffness:400,damping:10}},whileTap:{scale:f||m?1:.98,transition:{type:"spring",stiffness:400,damping:10}},initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},...E,children:[m&&i.jsx(J.div,{className:"rounded-full h-4 w-4 border-b-2 border-current mr-2",animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),r]})},ei=({size:r="md",text:o="",className:d="",fullScreen:f=!1})=>{const m={sm:"h-4 w-4",md:"h-8 w-8",lg:"h-12 w-12",xl:"h-16 w-16"},S={sm:"text-sm",md:"text-base",lg:"text-lg",xl:"text-xl"},p=i.jsx("div",{className:Ge("animate-spin rounded-full border-b-2 border-primary-400",m[r])}),b=i.jsxs("div",{className:Ge("flex flex-col items-center justify-center space-y-4",d),children:[p,o&&i.jsx("p",{className:Ge("text-surface-300",S[r]),children:o})]});return f?i.jsx(J.div,{initial:{opacity:0},animate:{opacity:1},className:"fixed inset-0 bg-surface-900/50 backdrop-blur-sm flex items-center justify-center z-50",children:b}):b},qn=({className:r="",...o})=>i.jsx("div",{className:Ge("animate-pulse rounded-md bg-surface-700/50",r),...o}),ft=()=>i.jsxs("div",{className:"glass-card p-6 space-y-4",children:[i.jsx(qn,{className:"h-4 w-3/4"}),i.jsx(qn,{className:"h-4 w-1/2"}),i.jsxs("div",{className:"space-y-2",children:[i.jsx(qn,{className:"h-3 w-full"}),i.jsx(qn,{className:"h-3 w-5/6"}),i.jsx(qn,{className:"h-3 w-4/6"})]})]}),Yg=({tabs:r=[],activeTab:o,onTabChange:d,className:f=""})=>i.jsx("div",{className:Ge("fixed bottom-0 left-0 right-0 z-40 bg-surface-900/95 backdrop-blur-md border-t border-white/10 md:hidden",f),children:i.jsx("div",{className:"flex justify-around items-center py-2",children:r.map(m=>{const S=m.icon,p=o===m.id;return i.jsxs(J.button,{onClick:()=>d(m.id),className:Ge("flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative",p?"text-primary-300":"text-surface-400 hover:text-surface-200"),whileTap:{scale:.95},children:[p&&i.jsx(J.div,{className:"absolute -top-1 w-8 h-1 bg-primary-400 rounded-full",layoutId:"activeTab",transition:{type:"spring",stiffness:500,damping:30}}),i.jsx(S,{className:"w-5 h-5 mb-1"}),i.jsx("span",{className:"text-xs font-medium truncate max-w-16",children:m.label.split(" ")[0]})]},m.id)})})}),Qg=({value:r=0,max:o=100,className:d="",showValue:f=!0,size:m="md",color:S="primary",animated:p=!0,label:b=""})=>{const E=Math.min(Math.max(r/o*100,0),100),z={sm:"h-2",md:"h-3",lg:"h-4",xl:"h-6"},R={primary:"bg-primary-500",secondary:"bg-surface-500",success:"bg-green-500",warning:"bg-yellow-500",danger:"bg-red-500",accent:"bg-accent-500"};return i.jsxs("div",{className:Ge("w-full",d),children:[(b||f)&&i.jsxs("div",{className:"flex justify-between items-center mb-2",children:[b&&i.jsx("span",{className:"text-sm font-medium text-surface-200",children:b}),f&&i.jsxs("span",{className:"text-sm text-surface-300",children:[Math.round(E),"%"]})]}),i.jsx("div",{className:Ge("w-full bg-surface-700/50 rounded-full overflow-hidden",z[m]),children:i.jsx(J.div,{className:Ge("h-full rounded-full",R[S]),initial:p?{width:0}:{width:`${E}%`},animate:{width:`${E}%`},transition:{duration:p?1:0,ease:"easeOut"}})})]})},Zg=({value:r=0,max:o=100,size:d=120,strokeWidth:f=8,className:m="",color:S="primary",showValue:p=!0,label:b=""})=>{const E=Math.min(Math.max(r/o*100,0),100),z=(d-f)/2,R=z*2*Math.PI,O=R,x=R-E/100*R,A={primary:"#14b8a6",secondary:"#64748b",success:"#10b981",warning:"#f59e0b",danger:"#ef4444",accent:"#d946ef"};return i.jsxs("div",{className:Ge("relative inline-flex items-center justify-center",m),children:[i.jsxs("svg",{width:d,height:d,className:"transform -rotate-90",children:[i.jsx("circle",{cx:d/2,cy:d/2,r:z,stroke:"rgba(100, 116, 139, 0.2)",strokeWidth:f,fill:"transparent"}),i.jsx(J.circle,{cx:d/2,cy:d/2,r:z,stroke:A[S],strokeWidth:f,fill:"transparent",strokeLinecap:"round",strokeDasharray:O,initial:{strokeDashoffset:R},animate:{strokeDashoffset:x},transition:{duration:1,ease:"easeOut"}})]}),i.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:[p&&i.jsx("span",{className:"text-2xl font-bold text-white",children:Math.round(E)}),b&&i.jsx("span",{className:"text-xs text-surface-300 mt-1",children:b})]})]})},Na=({children:r,variant:o="default",size:d="md",className:f="",animate:m=!1,...S})=>{const p="inline-flex items-center font-medium rounded-full",b={default:"bg-surface-700 text-surface-200",primary:"bg-primary-500/20 text-primary-300 border border-primary-500/30",secondary:"bg-surface-600 text-surface-200",success:"bg-green-500/20 text-green-300 border border-green-500/30",warning:"bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",danger:"bg-red-500/20 text-red-300 border border-red-500/30",accent:"bg-accent-500/20 text-accent-300 border border-accent-500/30",outline:"border border-surface-500 text-surface-300"},E={sm:"px-2 py-0.5 text-xs",md:"px-2.5 py-1 text-sm",lg:"px-3 py-1.5 text-base"},z=Ge(p,b[o],E[d],f),R=m?J.span:"span",O=m?{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{type:"spring",stiffness:500,damping:30}}:{};return i.jsx(R,{className:z,...O,...S,children:r})},$g=({status:r,className:o=""})=>{const d=r==="pass"||r==="PASS"||r===!0||r>=1;return i.jsx(Na,{variant:d?"success":"danger",className:o,animate:!0,children:d?"Pass":"Fail"})},Vg=({level:r,className:o=""})=>i.jsxs(Na,{variant:"primary",className:o,animate:!0,children:["Level ",r]}),Kg=({xp:r,className:o=""})=>i.jsxs(Na,{variant:"accent",className:o,animate:!0,children:[r.toLocaleString()," XP"]}),kg=()=>{const{profile:r,loading:o}=Qd(),{profile:d,loading:f}=Ug(),{totalXP:m,loading:S}=Tc(),{passedProjects:p,passRate:b,loading:E}=Dc(),{auditRatio:z,auditsGiven:R,auditsReceived:O,loading:x}=Ec(),A=d||r,D=(X=>Math.floor(X/1e3)+1)(m),B=D*1e3,G=m%1e3/1e3*100;return o||f||S||E||x?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[i.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[i.jsx(ft,{}),i.jsx(ft,{})]}),i.jsxs("div",{className:"space-y-6",children:[i.jsx(ft,{}),i.jsx(ft,{}),i.jsx(ft,{})]})]}):i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[i.jsx("div",{className:"lg:col-span-2",children:i.jsxs(C,{className:"h-full",children:[i.jsx(C.Header,{children:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsx(C.Title,{children:"User Profile"}),i.jsx(Vg,{level:D})]})}),i.jsx(C.Content,{children:i.jsxs("div",{className:"flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8",children:[i.jsx("div",{className:"flex-shrink-0",children:i.jsx("div",{className:"w-24 h-24 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full flex items-center justify-center",children:i.jsx(Fs,{className:"w-12 h-12 text-white"})})}),i.jsxs("div",{className:"flex-1 space-y-4",children:[i.jsxs("div",{children:[i.jsx("h2",{className:"text-2xl font-bold text-white mb-1",children:A?.firstName&&A?.lastName?`${A.firstName} ${A.lastName}`:A?.login||"User"}),i.jsxs("p",{className:"text-surface-300",children:["@",A?.login||"username"]})]}),i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(zd,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm",children:A?.email||"No email"})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(_0,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm",children:A?.campus||A?.startCampus||"Campus not specified"})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(Od,{className:"w-4 h-4"}),i.jsxs("span",{className:"text-sm",children:["Joined ",A?.createdAt?new Date(A.createdAt).toLocaleDateString():"Unknown"]})]}),i.jsxs("div",{className:"flex items-center space-x-2 text-surface-300",children:[i.jsx(ai,{className:"w-4 h-4"}),i.jsxs("span",{className:"text-sm",children:["Started ",A?.registrationDate?new Date(A.registrationDate).toLocaleDateString():"Unknown"]})]})]}),i.jsxs("div",{className:"flex flex-wrap gap-2",children:[i.jsx(Kg,{xp:m}),i.jsxs(Na,{variant:"primary",children:[A?.passedProjects||p," / ",A?.totalProjects||"N/A"," Projects"]}),i.jsxs(Na,{variant:"accent",children:["Audit Ratio: ",z.toFixed(2)]}),A?.passRate&&i.jsxs(Na,{variant:"success",children:[A.passRate.toFixed(1),"% Success Rate"]})]})]})]})})]})}),i.jsxs("div",{className:"space-y-6",children:[i.jsxs(C,{children:[i.jsxs(C.Header,{children:[i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(Cn,{className:"w-5 h-5 mr-2"}),"User Level"]}),i.jsx(C.Description,{children:"Apprentice developer"})]}),i.jsxs(C.Content,{className:"flex flex-col items-center",children:[i.jsx(Zg,{value:G,max:100,size:120,color:"primary",label:`Level ${D}`}),i.jsxs("p",{className:"text-sm text-surface-300 mt-4 text-center",children:["Next rank in ",Math.ceil((B-m)/100)," levels"]})]})]}),i.jsxs(C,{children:[i.jsx(C.Header,{children:i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(T0,{className:"w-5 h-5 mr-2"}),"Audits Ratio"]})}),i.jsx(C.Content,{children:i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Done"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[(R/1024*1e3).toFixed(0)," MB"]})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Received"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[(O/1024*1e3).toFixed(0)," MB"]})]}),i.jsxs("div",{className:"text-center pt-4 border-t border-white/10",children:[i.jsx("div",{className:"text-3xl font-bold text-primary-300",children:z.toFixed(1)}),i.jsx("p",{className:"text-sm text-surface-400",children:"Best ratio ever!"})]})]})})]}),i.jsxs(C,{children:[i.jsx(C.Header,{children:i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(Md,{className:"w-5 h-5 mr-2"}),"Quick Stats"]})}),i.jsx(C.Content,{children:i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Total XP"}),i.jsx("span",{className:"text-white font-semibold",children:m.toLocaleString()})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Projects Passed"}),i.jsx("span",{className:"text-green-400 font-semibold",children:p})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Success Rate"}),i.jsxs("span",{className:"text-primary-300 font-semibold",children:[b.toFixed(1),"%"]})]}),i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("span",{className:"text-surface-300",children:"Audits Given"}),i.jsx("span",{className:"text-accent-300 font-semibold",children:R})]})]})})]})]})]})},Jg=({result:r,type:o})=>{const d=p=>{switch(p){case"working":return"text-blue-400 bg-blue-400/10";case"audit":return"text-yellow-400 bg-yellow-400/10";case"setup":return"text-purple-400 bg-purple-400/10";case"finished":return"text-green-400 bg-green-400/10";default:return"text-surface-400 bg-surface-400/10"}},f=p=>{switch(p){case"working":return ai;case"audit":return Ud;case"setup":return Rd;case"finished":return jc;default:return Gn}},m=p=>new Date(p).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"}),S=f(r.status);return i.jsxs(J.div,{className:"flex items-center justify-between p-4 bg-surface-800 rounded-lg hover:bg-surface-700 transition-colors duration-200",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},children:[i.jsx("div",{className:"flex-1",children:i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx(S,{className:`w-4 h-4 ${d(r.status).split(" ")[0]}`}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white",children:o==="users"?r.login:r.object?.name||r.path?.split("/").pop()||"Unknown"}),i.jsx("p",{className:"text-sm text-surface-400",children:o==="users"?r.campus||"No campus":r.path||"No path"})]})]})}),i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${d(r.status)}`,children:r.status}),o==="projects"&&i.jsxs("span",{className:"text-sm text-surface-300",children:["Grade: ",r.grade||0]}),o==="audits"&&i.jsx("span",{className:"text-sm text-surface-300",children:r.type==="given"?"Given":"Received"}),o==="users"&&r.totalXP&&i.jsxs("span",{className:"text-sm text-surface-300",children:[r.totalXP," XP"]}),i.jsx("span",{className:"text-xs text-surface-500",children:m(r.updatedAt||r.createdAt)})]})]})},Ig=()=>{const[r,o]=F.useState("projects"),[d,f]=F.useState(""),[m,S]=F.useState("all"),[p,b]=F.useState(""),[E,z]=F.useState({cohort:"All Cohorts",status:"Working"}),[R,O]=F.useState({username:"",status:"Working"}),[x,A]=F.useState({cohort:"All Cohorts",limit:"0"}),{searchResults:N,searchProjects:D,filterByStatus:B,statusCounts:G,loading:X}=Rg(),{searchResults:I,searchAudits:le,filterByStatus:je,statusCounts:Ee,loading:Qe}=qg(),{searchResults:k,searchUsers:ne,filterByStatus:Ne,statusCounts:ot,campuses:Ze,loading:$a}=Bg(),{searchUsers:_a,users:dt,loading:M}=wg(),H=[{value:"all",label:"All Status",icon:Gn,color:"text-surface-400"},{value:"working",label:"Working",icon:ai,color:"text-blue-400"},{value:"audit",label:"In Audit",icon:Ud,color:"text-yellow-400"},{value:"setup",label:"Setup",icon:Rd,color:"text-purple-400"},{value:"finished",label:"Finished",icon:jc,color:"text-green-400"}],V=[{value:"projects",label:"Projects",icon:Cn},{value:"audits",label:"Audits",icon:yc},{value:"users",label:"Users",icon:At}],oe=["All Cohorts","Cohort 1","Cohort 2","Cohort 3","Cohort 4"],ce=()=>{if(!(!d.trim()&&m==="all"))switch(r){case"projects":D(d,m);break;case"audits":le(d,m);break;case"users":ne(d,m,p);break}},Xe=Y=>{S(Y),setTimeout(()=>{ce()},100)},pe=Y=>{o(Y),f(""),S("all")},ue=()=>{console.log("Group search - legacy")},we=()=>{d.trim()&&_a(d)},ht=()=>{console.log("Ranking search - legacy")},Dt=()=>{switch(r){case"projects":return m==="all"?N:B(m);case"audits":return m==="all"?I:je(m);case"users":return m==="all"?k:Ne(m);default:return[]}},Va=()=>{switch(r){case"projects":return X;case"audits":return Qe;case"users":return $a;default:return!1}},Ka=()=>{switch(r){case"projects":return G;case"audits":return Ee;case"users":return ot;default:return{all:0,working:0,audit:0,setup:0,finished:0}}},Et=Dt(),Ft=Va(),ka=Ka();return i.jsxs("div",{className:"space-y-6",children:[i.jsxs(C,{children:[i.jsxs(C.Header,{children:[i.jsxs(C.Title,{className:"flex items-center text-primary-300",children:[i.jsx(At,{className:"w-5 h-5 mr-2"}),"Enhanced Search with Status Filtering"]}),i.jsx(C.Description,{children:"Search projects, audits, and users with selective status filtering: working, audit, setup, finished"})]}),i.jsxs(C.Content,{className:"space-y-6",children:[i.jsx("div",{className:"flex space-x-1 bg-surface-800 p-1 rounded-lg",children:V.map(Y=>{const _e=Y.icon;return i.jsxs("button",{onClick:()=>pe(Y.value),className:`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${r===Y.value?"bg-primary-500 text-white shadow-lg":"text-surface-300 hover:text-white hover:bg-surface-700"}`,children:[i.jsx(_e,{className:"w-4 h-4 mr-2"}),Y.label]},Y.value)})}),i.jsxs("div",{className:"flex space-x-4",children:[i.jsxs("div",{className:"flex-1",children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Search Term"}),i.jsxs("div",{className:"relative",children:[i.jsx(At,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",value:d,onChange:Y=>f(Y.target.value),onKeyDown:Y=>Y.key==="Enter"&&ce(),placeholder:`Search ${r}...`,className:"material-input pl-10 w-full"})]})]}),r==="users"&&i.jsxs("div",{className:"w-48",children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Campus"}),i.jsxs("select",{value:p,onChange:Y=>b(Y.target.value),className:"material-input w-full",children:[i.jsx("option",{value:"",children:"All Campuses"}),Ze.map(Y=>i.jsx("option",{value:Y,children:Y},Y))]})]})]}),i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-3",children:"Filter by Status"}),i.jsx("div",{className:"flex flex-wrap gap-2",children:H.map(Y=>{const _e=Y.icon,Ja=ka[Y.value]||0,ql=m===Y.value;return i.jsxs(J.button,{onClick:()=>Xe(Y.value),className:`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${ql?"bg-primary-500 text-white shadow-lg":"bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-white"}`,whileHover:{scale:1.05},whileTap:{scale:.95},children:[i.jsx(_e,{className:`w-4 h-4 mr-2 ${ql?"text-white":Y.color}`}),Y.label,Ja>0&&i.jsx("span",{className:`ml-2 px-2 py-0.5 rounded-full text-xs ${ql?"bg-white/20":"bg-surface-600"}`,children:Ja})]},Y.value)})})]}),i.jsx("div",{className:"flex justify-end",children:i.jsx(qt,{onClick:ce,disabled:Ft,className:"px-6",children:Ft?i.jsxs(i.Fragment,{children:[i.jsx(ei,{className:"w-4 h-4 mr-2"}),"Searching..."]}):i.jsxs(i.Fragment,{children:[i.jsx(At,{className:"w-4 h-4 mr-2"}),"Search ",r]})})})]})]}),(Et.length>0||Ft)&&i.jsxs(C,{children:[i.jsx(C.Header,{children:i.jsxs(C.Title,{className:"flex items-center justify-between",children:[i.jsx("span",{children:"Search Results"}),i.jsxs("span",{className:"text-sm text-surface-400",children:[Et.length," ",r," found"]})]})}),i.jsx(C.Content,{children:Ft?i.jsxs("div",{className:"flex items-center justify-center py-8",children:[i.jsx(ei,{className:"w-6 h-6 mr-2"}),i.jsxs("span",{children:["Searching ",r,"..."]})]}):i.jsx("div",{className:"space-y-3 max-h-96 overflow-y-auto",children:Et.map((Y,_e)=>i.jsx(Jg,{result:Y,type:r},Y.id||_e))})})]}),i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsxs(C,{children:[i.jsx(C.Header,{children:i.jsxs(C.Title,{className:"flex items-center text-primary-300",children:[i.jsx(yc,{className:"w-5 h-5 mr-2"}),"Group Search"]})}),i.jsxs(C.Content,{className:"space-y-4",children:[i.jsxs("div",{children:[i.jsx("label",{className:"block text-sm font-medium text-surface-200 mb-2",children:"Select Cohort"}),i.jsx("div",{className:"relative",children:i.jsx("select",{value:E.cohort,onChange:Y=>z(_e=>({..._e,cohort:Y.target.value})),className:"material-input w-full appearance-none",children:oe.map(Y=>i.jsx("option",{value:Y,className:"bg-surface-800",children:Y},Y))})})]}),i.jsx("div",{children:i.jsx("input",{type:"text",value:E.status,onChange:Y=>z(_e=>({..._e,status:Y.target.value})),className:"material-input w-full",placeholder:"Status"})}),i.jsxs(qt,{onClick:ue,className:"w-full",children:[i.jsx(At,{className:"w-4 h-4 mr-2"}),"Search"]})]})]}),i.jsxs(C,{children:[i.jsx(C.Header,{children:i.jsxs(C.Title,{className:"flex items-center text-primary-300",children:[i.jsx(At,{className:"w-5 h-5 mr-2"}),"User Advance Search"]})}),i.jsxs(C.Content,{className:"space-y-4",children:[i.jsx("div",{children:i.jsx("input",{type:"text",value:R.username,onChange:Y=>O(_e=>({..._e,username:Y.target.value})),className:"material-input w-full",placeholder:"Username"})}),i.jsx("div",{children:i.jsx("input",{type:"text",value:R.status,onChange:Y=>O(_e=>({..._e,status:Y.target.value})),className:"material-input w-full",placeholder:"Status"})}),i.jsxs(qt,{onClick:we,className:"w-full",loading:M,children:[i.jsx(At,{className:"w-4 h-4 mr-2"}),"Search"]}),dt.length>0&&i.jsxs("div",{className:"mt-4 space-y-2",children:[i.jsx("h4",{className:"text-sm font-medium text-surface-200",children:"Results:"}),dt.map(Y=>i.jsxs(J.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"p-3 bg-surface-800/50 rounded-lg",children:[i.jsx("p",{className:"text-white font-medium",children:Y.login}),(Y.firstName||Y.lastName)&&i.jsxs("p",{className:"text-surface-300 text-sm",children:[Y.firstName," ",Y.lastName]})]},Y.id))]})]})]}),i.jsxs(C,{children:[i.jsx(C.Header,{children:i.jsxs(C.Title,{className:"flex items-center text-primary-300",children:[i.jsx(Cn,{className:"w-5 h-5 mr-2"}),"Ranking Search"]})}),i.jsxs(C.Content,{className:"space-y-4",children:[i.jsx("div",{children:i.jsx("input",{type:"number",value:x.limit,onChange:Y=>A(_e=>({..._e,limit:Y.target.value})),className:"material-input w-full",placeholder:"0",min:"0"})}),i.jsx("div",{children:i.jsx("select",{value:x.cohort,onChange:Y=>A(_e=>({..._e,cohort:Y.target.value})),className:"material-input w-full appearance-none",children:oe.map(Y=>i.jsx("option",{value:Y,className:"bg-surface-800",children:Y},Y))})}),i.jsxs(qt,{onClick:ht,className:"w-full",children:[i.jsx(Cn,{className:"w-4 h-4 mr-2"}),"Search Rankings"]})]})]}),i.jsxs(C,{className:"xl:col-span-3",children:[i.jsx(C.Header,{children:i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(Gn,{className:"w-5 h-5 mr-2"}),"Search Tips"]})}),i.jsx(C.Content,{children:i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"Group Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Search for groups by cohort and status. Filter by working status to find active groups."})]}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"User Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Find specific users by username. Add status filters to narrow down results."})]}),i.jsxs("div",{children:[i.jsx("h4",{className:"font-medium text-white mb-2",children:"Ranking Search"}),i.jsx("p",{className:"text-surface-300 text-sm",children:"View top performers by cohort. Set a limit to see top N users or leave as 0 for all."})]})]})})]})]})]})},Wg=({data:r=[],width:o=600,height:d=300,className:f=""})=>{const m={top:20,right:30,bottom:40,left:60},S=o-m.left-m.right,p=d-m.top-m.bottom,b=F.useMemo(()=>{if(!r||r.length===0){const D=[];let B=0;for(let G=0;G<12;G++){const X=Math.floor(Math.random()*500)+100;B+=X,D.push({date:new Date(2024,G,1).toISOString().split("T")[0],amount:X,cumulative:B})}return D}return r},[r]),{xScale:E,yScale:z,maxY:R}=F.useMemo(()=>{if(b.length===0)return{xScale:()=>0,yScale:()=>0,maxY:0};const D=Math.max(...b.map(le=>le.cumulative)),B=new Date(Math.min(...b.map(le=>new Date(le.date)))),G=new Date(Math.max(...b.map(le=>new Date(le.date))));return{xScale:le=>(new Date(le)-B)/(G-B)*S,yScale:le=>p-le/D*p,maxY:D}},[b,S,p]),O=F.useMemo(()=>b.length===0?"":b.map((D,B)=>{const G=E(D.date),X=z(D.cumulative);return`${B===0?"M":"L"} ${G} ${X}`}).join(" "),[b,E,z]),x=F.useMemo(()=>{if(b.length===0)return"";const D=O,B=b[0],G=b[b.length-1];return`${D} L ${E(G.date)} ${p} L ${E(B.date)} ${p} Z`},[O,b,E,p]),A=F.useMemo(()=>{const B=[];for(let G=0;G<=5;G++){const X=R/5*G;B.push({value:Math.round(X),y:z(X)})}return B},[R,z]),N=F.useMemo(()=>{if(b.length===0)return[];const D=Math.min(6,b.length),B=Math.floor(b.length/D),G=[];for(let X=0;X<b.length;X+=B){const I=b[X];G.push({label:new Date(I.date).toLocaleDateString("en-US",{month:"short"}),x:E(I.date)})}return G},[b,E]);return i.jsx("div",{className:`w-full ${f}`,children:i.jsxs("svg",{width:o,height:d,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.3"}),i.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.05"})]}),i.jsxs("filter",{id:"glow",children:[i.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsxs("g",{transform:`translate(${m.left}, ${m.top})`,children:[A.map((D,B)=>i.jsx("line",{x1:0,y1:D.y,x2:S,y2:D.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},B)),i.jsx(J.path,{d:x,fill:"url(#xpGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),i.jsx(J.path,{d:O,fill:"none",stroke:"#14b8a6",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),b.map((D,B)=>i.jsx(J.circle,{cx:E(D.date),cy:z(D.cumulative),r:"4",fill:"#14b8a6",stroke:"#ffffff",strokeWidth:"2",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:.1*B},className:"cursor-pointer hover:r-6 transition-all",children:i.jsx("title",{children:`${new Date(D.date).toLocaleDateString()}: ${D.cumulative.toLocaleString()} XP`})},B)),i.jsx("line",{x1:0,y1:0,x2:0,y2:p,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),i.jsx("line",{x1:0,y1:p,x2:S,y2:p,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),A.map((D,B)=>i.jsx("text",{x:-10,y:D.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:D.value.toLocaleString()},B)),N.map((D,B)=>i.jsx("text",{x:D.x,y:p+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:D.label},B)),i.jsx("text",{x:S/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"XP Progress Over Time"}),i.jsx("text",{x:-40,y:p/2,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",transform:`rotate(-90, -40, ${p/2})`,children:"Experience Points"})]})]})})},Pg=({passedProjects:r=15,failedProjects:o=3,size:d=200,className:f=""})=>{const m=r+o,S=d/2-20,p=d/2,{passedPath:b,failedPath:E}=F.useMemo(()=>{if(m===0)return{passedAngle:0,failedAngle:0,passedPath:"",failedPath:""};const x=r/m*360,A=o/m*360,N=(G,X,I,le)=>{const je=z(le,le,I,X),Ee=z(le,le,I,G),Qe=X-G<=180?"0":"1";return["M",le,le,"L",je.x,je.y,"A",I,I,0,Qe,0,Ee.x,Ee.y,"Z"].join(" ")},D=N(0,x,S,p),B=N(x,x+A,S,p);return{passedAngle:x,failedAngle:A,passedPath:D,failedPath:B}},[r,o,m,S,p]);function z(x,A,N,D){const B=(D-90)*Math.PI/180;return{x:x+N*Math.cos(B),y:A+N*Math.sin(B)}}const R=m>0?Math.round(r/m*100):0,O=m>0?Math.round(o/m*100):0;return m===0?i.jsx("div",{className:`flex items-center justify-center ${f}`,style:{width:d,height:d},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"w-16 h-16 border-4 border-surface-600 rounded-full mx-auto mb-2"}),i.jsx("p",{className:"text-sm",children:"No project data"})]})}):i.jsxs("div",{className:`relative ${f}`,style:{width:d,height:d},children:[i.jsxs("svg",{width:d,height:d,className:"transform -rotate-90",children:[i.jsx("defs",{children:i.jsxs("filter",{id:"pieGlow",children:[i.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),i.jsx(J.path,{d:b,fill:"#10b981",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.2},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`Passed: ${r} projects (${R}%)`})}),i.jsx(J.path,{d:E,fill:"#ef4444",stroke:"#ffffff",strokeWidth:"2",filter:"url(#pieGlow)",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`Failed: ${o} projects (${O}%)`})}),i.jsx("circle",{cx:p,cy:p,r:S*.6,fill:"rgba(15, 23, 42, 0.9)",stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"})]}),i.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center text-center",children:[i.jsxs("div",{className:"text-2xl font-bold text-white",children:[R,"%"]}),i.jsx("div",{className:"text-xs text-surface-300 mt-1",children:"Success Rate"})]}),i.jsxs("div",{className:"absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 text-xs",children:[i.jsxs("div",{className:"flex items-center space-x-1",children:[i.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"}),i.jsxs("span",{className:"text-surface-300",children:["Passed (",r,")"]})]}),i.jsxs("div",{className:"flex items-center space-x-1",children:[i.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),i.jsxs("span",{className:"text-surface-300",children:["Failed (",o,")"]})]})]})]})},Fg=({auditsGiven:r=24,auditsReceived:o=12,width:d=400,height:f=250,className:m=""})=>{const S={top:20,right:30,bottom:60,left:60},p=d-S.left-S.right,b=f-S.top-S.bottom,E=[{label:"Audits Given",value:r,color:"#14b8a6"},{label:"Audits Received",value:o,color:"#d946ef"}],z=Math.max(...E.map(D=>D.value)),R=p/E.length*.6,O=p/E.length,x=F.useCallback(D=>b-D/z*b,[b,z]),A=F.useMemo(()=>{const B=[];for(let G=0;G<=5;G++){const X=Math.round(z/5*G);B.push({value:X,y:x(X)})}return B},[z,x]),N=o>0?(r/o).toFixed(1):"∞";return i.jsx("div",{className:`w-full ${m}`,children:i.jsxs("svg",{width:d,height:f,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"givenGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#14b8a6",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"#14b8a6",stopOpacity:"0.4"})]}),i.jsxs("linearGradient",{id:"receivedGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"#d946ef",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"#d946ef",stopOpacity:"0.4"})]}),i.jsxs("filter",{id:"barGlow",children:[i.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsxs("g",{transform:`translate(${S.left}, ${S.top})`,children:[A.map((D,B)=>i.jsx("line",{x1:0,y1:D.y,x2:p,y2:D.y,stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"1"},B)),E.map((D,B)=>{const G=B*O+(O-R)/2,X=b-x(D.value),I=B===0?"givenGradient":"receivedGradient";return i.jsxs("g",{children:[i.jsx(J.rect,{x:G,y:x(D.value),width:R,height:X,fill:`url(#${I})`,stroke:D.color,strokeWidth:"2",rx:"4",filter:"url(#barGlow)",initial:{height:0,y:b},animate:{height:X,y:x(D.value)},transition:{duration:1,delay:B*.2,ease:"easeOut"},className:"hover:brightness-110 cursor-pointer",children:i.jsx("title",{children:`${D.label}: ${D.value}`})}),i.jsx(J.text,{x:G+R/2,y:x(D.value)-8,textAnchor:"middle",fill:"white",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:B*.2+.5},children:D.value}),i.jsx("text",{x:G+R/2,y:b+20,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:D.label.split(" ")[0]}),i.jsx("text",{x:G+R/2,y:b+35,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:D.label.split(" ")[1]})]},B)}),i.jsx("line",{x1:0,y1:0,x2:0,y2:b,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),i.jsx("line",{x1:0,y1:b,x2:p,y2:b,stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"2"}),A.map((D,B)=>i.jsx("text",{x:-10,y:D.y+4,textAnchor:"end",fill:"rgba(255, 255, 255, 0.7)",fontSize:"12",fontFamily:"Inter, sans-serif",children:D.value},B)),i.jsx("text",{x:p/2,y:-5,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.9)",fontSize:"14",fontWeight:"600",fontFamily:"Inter, sans-serif",children:"Audit Statistics"}),i.jsxs("g",{transform:`translate(${p-80}, 20)`,children:[i.jsx("rect",{x:0,y:0,width:80,height:40,fill:"rgba(255, 255, 255, 0.1)",stroke:"rgba(255, 255, 255, 0.2)",strokeWidth:"1",rx:"4"}),i.jsx("text",{x:40,y:15,textAnchor:"middle",fill:"rgba(255, 255, 255, 0.7)",fontSize:"10",fontFamily:"Inter, sans-serif",children:"Ratio"}),i.jsx("text",{x:40,y:32,textAnchor:"middle",fill:"#14b8a6",fontSize:"16",fontWeight:"700",fontFamily:"Inter, sans-serif",children:N})]})]})]})})},ex=({data:r=[],width:o=600,height:d=400,maxBars:f=15,className:m=""})=>{const S=F.useMemo(()=>{if(!r||r.length===0)return[];const x=r.slice(0,f),A=Math.max(...x.map(N=>N.totalXP));return x.map((N,D)=>({...N,percentage:N.totalXP/A*100,index:D}))},[r,f]),p={top:20,right:80,bottom:40,left:200},b=o-p.left-p.right,E=d-p.top-p.bottom,z=Math.max(20,E/Math.max(S.length,1)-4),R=x=>x>=1e6?`${(x/1e6).toFixed(1)}M`:x>=1e3?`${(x/1e3).toFixed(1)}K`:x.toString(),O=(x,A=25)=>x?x.length>A?`${x.substring(0,A)}...`:x:"Unknown Project";return S.length?i.jsx("div",{className:m,children:i.jsxs("svg",{width:o,height:d,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpBarGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.8"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(147, 51, 234)",stopOpacity:"0.9"})]}),i.jsx("filter",{id:"barShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:i.jsx("feDropShadow",{dx:"2",dy:"2",stdDeviation:"3",floodOpacity:"0.3"})})]}),i.jsxs("text",{x:o/2,y:15,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:["XP Earned by Project (Top ",S.length,")"]}),i.jsxs("g",{transform:`translate(${p.left}, ${p.top})`,children:[[0,25,50,75,100].map(x=>i.jsxs("g",{children:[i.jsx("line",{x1:x/100*b,y1:0,x2:x/100*b,y2:E,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsxs("text",{x:x/100*b,y:E+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:[x,"%"]})]},x)),S.map((x,A)=>{const N=A*(z+4),D=x.percentage/100*b;return i.jsxs("g",{children:[i.jsx("text",{x:-10,y:N+z/2,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-200 text-xs font-medium",children:O(x.name)}),i.jsx("rect",{x:0,y:N,width:b,height:z,fill:"rgb(30, 41, 59)",rx:"4"}),i.jsx(J.rect,{x:0,y:N,width:D,height:z,fill:"url(#xpBarGradient)",filter:"url(#barShadow)",rx:"4",initial:{width:0},animate:{width:D},transition:{duration:.8,delay:A*.1,ease:"easeOut"}}),i.jsxs(J.text,{x:D+8,y:N+z/2,dominantBaseline:"middle",className:"fill-surface-100 text-xs font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:A*.1+.3},children:[R(x.totalXP)," XP"]}),i.jsx(J.rect,{x:0,y:N,width:b,height:z,fill:"transparent",className:"cursor-pointer",whileHover:{fill:"rgba(59, 130, 246, 0.1)"},transition:{duration:.2}})]},x.path||A)}),i.jsx("text",{x:-180,y:E/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -180, ${E/2})`,className:"fill-surface-300 text-sm font-medium",children:"Projects"}),i.jsx("text",{x:b/2,y:E+35,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Relative XP Distribution (%)"})]}),i.jsxs("g",{transform:`translate(${o-70}, 30)`,children:[i.jsx("rect",{x:0,y:0,width:12,height:8,fill:"url(#xpBarGradient)",rx:"2"}),i.jsx("text",{x:18,y:6,dominantBaseline:"middle",className:"fill-surface-300 text-xs",children:"XP Earned"})]})]})}):i.jsx("div",{className:`flex items-center justify-center ${m}`,style:{width:o,height:d},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"📊"}),i.jsx("div",{children:"No project data available"})]})})},tx=({data:r=[],width:o=700,height:d=400,className:f=""})=>{const m=F.useMemo(()=>{if(!r||r.length===0)return{points:[],maxXP:0,dateRange:null};const N=[...r].sort((X,I)=>new Date(X.date)-new Date(I.date)),D=Math.max(...N.map(X=>X.cumulativeXP)),B=new Date(N[0].date),G=new Date(N[N.length-1].date);return{points:N,maxXP:D,dateRange:{min:B,max:G}}},[r]),S={top:30,right:60,bottom:60,left:80},p=o-S.left-S.right,b=d-S.top-S.bottom,E=N=>N>=1e6?`${(N/1e6).toFixed(1)}M`:N>=1e3?`${(N/1e3).toFixed(1)}K`:N.toString(),z=N=>new Date(N).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"}),R=N=>N.length===0?"":N.map((B,G)=>{const X=(new Date(B.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*p,I=b-B.cumulativeXP/m.maxXP*b;return G===0?`M ${X} ${I}`:`L ${X} ${I}`}).join(" "),O=N=>{if(N.length===0)return"";const D=R(N),B=N[N.length-1],G=(new Date(B.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*p;return`${D} L ${G} ${b} L 0 ${b} Z`};if(!m.points.length)return i.jsx("div",{className:`flex items-center justify-center ${f}`,style:{width:o,height:d},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"📈"}),i.jsx("div",{children:"No timeline data available"})]})});const x=R(m.points),A=O(m.points);return i.jsx("div",{className:f,children:i.jsxs("svg",{width:o,height:d,className:"overflow-visible",children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"xpTimelineGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.3"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(59, 130, 246)",stopOpacity:"0.05"})]}),i.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[i.jsx("stop",{offset:"0%",stopColor:"rgb(59, 130, 246)"}),i.jsx("stop",{offset:"50%",stopColor:"rgb(147, 51, 234)"}),i.jsx("stop",{offset:"100%",stopColor:"rgb(236, 72, 153)"})]}),i.jsxs("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[i.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsx("text",{x:o/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"XP Progression Over Time"}),i.jsxs("g",{transform:`translate(${S.left}, ${S.top})`,children:[[0,.25,.5,.75,1].map(N=>{const D=b-N*b,B=N*m.maxXP;return i.jsxs("g",{children:[i.jsx("line",{x1:0,y1:D,x2:p,y2:D,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsx("text",{x:-10,y:D,textAnchor:"end",dominantBaseline:"middle",className:"fill-surface-400 text-xs",children:E(B)})]},N)}),m.dateRange&&[0,.25,.5,.75,1].map(N=>{const D=N*p,B=new Date(m.dateRange.min.getTime()+N*(m.dateRange.max.getTime()-m.dateRange.min.getTime()));return i.jsxs("g",{children:[i.jsx("line",{x1:D,y1:0,x2:D,y2:b,stroke:"rgb(71, 85, 105)",strokeOpacity:"0.2",strokeDasharray:"2,2"}),i.jsx("text",{x:D,y:b+15,textAnchor:"middle",className:"fill-surface-400 text-xs",children:z(B)})]},N)}),i.jsx(J.path,{d:A,fill:"url(#xpTimelineGradient)",initial:{opacity:0},animate:{opacity:1},transition:{duration:1,delay:.5}}),i.jsx(J.path,{d:x,fill:"none",stroke:"url(#lineGradient)",strokeWidth:"3",filter:"url(#glow)",initial:{pathLength:0},animate:{pathLength:1},transition:{duration:2,ease:"easeInOut"}}),m.points.map((N,D)=>{const B=(new Date(N.date)-m.dateRange.min)/(m.dateRange.max-m.dateRange.min)*p,G=b-N.cumulativeXP/m.maxXP*b;return i.jsxs(J.g,{children:[i.jsx(J.circle,{cx:B,cy:G,r:"4",fill:"rgb(59, 130, 246)",stroke:"white",strokeWidth:"2",className:"cursor-pointer",initial:{scale:0},animate:{scale:1},transition:{duration:.3,delay:D/m.points.length*2+.5},whileHover:{scale:1.5}}),i.jsxs(J.g,{initial:{opacity:0},whileHover:{opacity:1},transition:{duration:.2},children:[i.jsx("rect",{x:B-60,y:G-40,width:"120",height:"30",fill:"rgb(30, 41, 59)",stroke:"rgb(71, 85, 105)",rx:"4",className:"pointer-events-none"}),i.jsxs("text",{x:B,y:G-30,textAnchor:"middle",className:"fill-surface-100 text-xs font-medium pointer-events-none",children:[E(N.cumulativeXP)," XP"]}),i.jsx("text",{x:B,y:G-18,textAnchor:"middle",className:"fill-surface-400 text-xs pointer-events-none",children:z(N.date)})]})]},D)}),i.jsx("text",{x:-50,y:b/2,textAnchor:"middle",dominantBaseline:"middle",transform:`rotate(-90, -50, ${b/2})`,className:"fill-surface-300 text-sm font-medium",children:"Cumulative XP"}),i.jsx("text",{x:p/2,y:b+45,textAnchor:"middle",className:"fill-surface-300 text-sm font-medium",children:"Timeline"})]}),i.jsxs("g",{transform:`translate(${o-150}, 40)`,children:[i.jsx("rect",{x:0,y:0,width:"140",height:"60",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsxs("text",{x:10,y:18,className:"fill-surface-200 text-xs font-medium",children:["Total XP: ",E(m.maxXP)]}),i.jsxs("text",{x:10,y:32,className:"fill-surface-400 text-xs",children:["Projects: ",m.points.length]}),i.jsxs("text",{x:10,y:46,className:"fill-surface-400 text-xs",children:["Duration: ",Math.ceil((m.dateRange.max-m.dateRange.min)/(1e3*60*60*24))," days"]})]})]})})},ax=({data:r={},width:o=500,height:d=400,className:f=""})=>{const m=F.useMemo(()=>{const{jsStats:O={},goStats:x={},overall:A={}}=r,N=[];A.passed>0&&N.push({label:"Passed",value:A.passed,percentage:A.passed/A.total*100,color:"rgb(34, 197, 94)",hoverColor:"rgb(22, 163, 74)"}),A.failed>0&&N.push({label:"Failed",value:A.failed,percentage:A.failed/A.total*100,color:"rgb(239, 68, 68)",hoverColor:"rgb(220, 38, 38)"});let D=-90;return{segments:N.map(G=>{const X=G.percentage/100*360,I={...G,startAngle:D,endAngle:D+X,angle:X};return D+=X,I}),jsStats:O,goStats:x,overall:A}},[r]),S=o/2,p=d/2,b=Math.min(o,d)/3,E=b*.4,z=(O,x,A,N)=>{const D=(N-90)*Math.PI/180;return{x:O+A*Math.cos(D),y:x+A*Math.sin(D)}},R=(O,x,A,N,D,B=0)=>{const G=z(O,x,A,D),X=z(O,x,A,N),I=D-N<=180?"0":"1";if(B>0){const le=z(O,x,B,D),je=z(O,x,B,N);return["M",G.x,G.y,"A",A,A,0,I,0,X.x,X.y,"L",je.x,je.y,"A",B,B,0,I,1,le.x,le.y,"Z"].join(" ")}else return["M",O,x,"L",G.x,G.y,"A",A,A,0,I,0,X.x,X.y,"Z"].join(" ")};return!m.segments.length||m.overall.total===0?i.jsx("div",{className:`flex items-center justify-center ${f}`,style:{width:o,height:d},children:i.jsxs("div",{className:"text-center text-surface-400",children:[i.jsx("div",{className:"text-lg mb-2",children:"🥧"}),i.jsx("div",{children:"No piscine data available"})]})}):i.jsx("div",{className:f,children:i.jsxs("svg",{width:o,height:d,className:"overflow-visible",children:[i.jsx("defs",{children:i.jsx("filter",{id:"pieShadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:i.jsx("feDropShadow",{dx:"2",dy:"4",stdDeviation:"4",floodOpacity:"0.3"})})}),i.jsx("text",{x:o/2,y:20,textAnchor:"middle",className:"fill-surface-100 text-sm font-semibold",children:"Piscine Performance Overview"}),m.segments.map((O,x)=>{const A=R(S,p,b,O.startAngle,O.endAngle,E),N=(O.startAngle+O.endAngle)/2,D=b+30,B=z(S,p,D,N);return i.jsxs("g",{children:[i.jsx(J.path,{d:A,fill:O.color,filter:"url(#pieShadow)",className:"cursor-pointer",initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{duration:.6,delay:x*.2,ease:"easeOut"},whileHover:{fill:O.hoverColor,scale:1.05}}),i.jsxs(J.text,{x:B.x,y:B.y,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-100 text-sm font-semibold",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:x*.2+.3},children:[O.percentage.toFixed(1),"%"]}),i.jsxs(J.text,{x:B.x,y:B.y+15,textAnchor:"middle",dominantBaseline:"middle",className:"fill-surface-400 text-xs",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:x*.2+.4},children:["(",O.value," ",O.label.toLowerCase(),")"]})]},O.label)}),i.jsxs("g",{children:[i.jsx("text",{x:S,y:p-10,textAnchor:"middle",className:"fill-surface-100 text-lg font-bold",children:m.overall.total}),i.jsx("text",{x:S,y:p+8,textAnchor:"middle",className:"fill-surface-400 text-sm",children:"Total Attempts"})]}),i.jsx("g",{transform:`translate(20, ${d-100})`,children:m.segments.map((O,x)=>i.jsxs("g",{transform:`translate(0, ${x*20})`,children:[i.jsx("rect",{x:0,y:0,width:12,height:12,fill:O.color,rx:"2"}),i.jsxs("text",{x:18,y:9,dominantBaseline:"middle",className:"fill-surface-200 text-sm",children:[O.label,": ",O.value]})]},O.label))}),i.jsxs("g",{transform:`translate(${o-180}, 50)`,children:[i.jsx("rect",{x:0,y:0,width:"170",height:"120",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Breakdown by Track"}),i.jsx("text",{x:10,y:38,className:"fill-surface-300 text-xs font-medium",children:"JavaScript Piscine:"}),i.jsxs("text",{x:15,y:52,className:"fill-surface-400 text-xs",children:["Passed: ",m.jsStats.passed||0]}),i.jsxs("text",{x:15,y:64,className:"fill-surface-400 text-xs",children:["Failed: ",m.jsStats.failed||0]}),i.jsx("text",{x:10,y:84,className:"fill-surface-300 text-xs font-medium",children:"Go Piscine:"}),i.jsxs("text",{x:15,y:98,className:"fill-surface-400 text-xs",children:["Passed: ",m.goStats.passed||0]}),i.jsxs("text",{x:15,y:110,className:"fill-surface-400 text-xs",children:["Failed: ",m.goStats.failed||0]})]}),i.jsxs("g",{transform:`translate(${o-180}, 180)`,children:[i.jsx("rect",{x:0,y:0,width:"170",height:"40",fill:"rgba(30, 41, 59, 0.8)",stroke:"rgb(71, 85, 105)",rx:"6"}),i.jsx("text",{x:10,y:18,className:"fill-surface-200 text-sm font-semibold",children:"Success Rate"}),i.jsxs("text",{x:10,y:32,className:"fill-primary-400 text-lg font-bold",children:[m.overall.passRate?.toFixed(1)||0,"%"]})]})]})})},lx=()=>{const{xpProgression:r,loading:o}=Tc(),{passedProjects:d,failedProjects:f,loading:m}=Dc(),{auditsGiven:S,auditsReceived:p,loading:b}=Ec(),{xpByProject:E,loading:z}=zg(),{xpTimeline:R,loading:O}=Og(),{piscineStats:x,loading:A}=Mg();return o||m||b||z||O||A?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsx(ft,{}),i.jsx(ft,{}),i.jsx(ft,{}),i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsx(ft,{})}),i.jsx("div",{className:"lg:col-span-2",children:i.jsx(ft,{})}),i.jsx(ft,{})]}):i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",children:[i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsxs(C,{children:[i.jsxs(C.Header,{children:[i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(ai,{className:"w-5 h-5 mr-2"}),"XP Progression Timeline"]}),i.jsx(C.Description,{children:"Your cumulative experience points growth over time"})]}),i.jsx(C.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(tx,{data:R,width:900,height:400})})})]})}),i.jsx("div",{className:"lg:col-span-2",children:i.jsxs(C,{children:[i.jsxs(C.Header,{children:[i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(qd,{className:"w-5 h-5 mr-2"}),"XP by Project"]}),i.jsx(C.Description,{children:"Top projects ranked by experience points earned"})]}),i.jsx(C.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(ex,{data:E,width:700,height:500,maxBars:15})})})]})}),i.jsxs(C,{children:[i.jsxs(C.Header,{children:[i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(Md,{className:"w-5 h-5 mr-2"}),"Piscine Performance"]}),i.jsx(C.Description,{children:"JavaScript and Go piscine statistics"})]}),i.jsx(C.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(ax,{data:x,width:400,height:350})})})]}),i.jsxs(C,{children:[i.jsxs(C.Header,{children:[i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(Cn,{className:"w-5 h-5 mr-2"}),"XP Progress Overview"]}),i.jsx(C.Description,{children:"Your experience points progression summary"})]}),i.jsx(C.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Wg,{data:r,width:400,height:300})})})]}),i.jsxs(C,{children:[i.jsxs(C.Header,{children:[i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(D0,{className:"w-5 h-5 mr-2"}),"Project Success Rate"]}),i.jsx(C.Description,{children:"Pass/Fail ratio for your projects"})]}),i.jsx(C.Content,{children:i.jsx("div",{className:"flex justify-center py-8",children:i.jsx(Pg,{passedProjects:d,failedProjects:f,size:250})})})]}),i.jsx("div",{className:"lg:col-span-2 xl:col-span-3",children:i.jsxs(C,{children:[i.jsxs(C.Header,{children:[i.jsxs(C.Title,{className:"flex items-center",children:[i.jsx(E0,{className:"w-5 h-5 mr-2"}),"Audit Performance Analytics"]}),i.jsx(C.Description,{children:"Comprehensive audit statistics and performance metrics"})]}),i.jsx(C.Content,{children:i.jsx("div",{className:"flex justify-center",children:i.jsx(Fg,{auditsGiven:S,auditsReceived:p,width:900,height:400})})})]})})]})},nx=()=>{const[r,o]=F.useState(""),[d,f]=F.useState("all"),[m,S]=F.useState("date"),p=[{id:1,user:"mohamedmoo",project:"mini-framework",result:"Pass",status:"pass",date:"2024-01-15",grade:1.2},{id:2,user:"musabd",project:"social-network",result:"Pass",status:"pass",date:"2024-01-14",grade:1},{id:3,user:"hadieif",project:"social-network",result:"Fail",status:"fail",date:"2024-01-13",grade:.8},{id:4,user:"aalmadhoo",project:"real-time-forum",result:"Pass",status:"pass",date:"2024-01-12",grade:1.5},{id:5,user:"hussainali2",project:"graphql",result:"Pass",status:"pass",date:"2024-01-11",grade:1.1},{id:6,user:"aabdulhu",project:"mini-framework",result:"Fail",status:"fail",date:"2024-01-10",grade:.6},{id:7,user:"yoowad",project:"graphql",result:"Pass",status:"pass",date:"2024-01-09",grade:1.3},{id:8,user:"musabd",project:"real-time-forum",result:"Pass",status:"pass",date:"2024-01-08",grade:1},{id:9,user:"mohamedmoo",project:"make-your-game",result:"Pass",status:"pass",date:"2024-01-07",grade:1.4}],b=p.filter(O=>{const x=O.user.toLowerCase().includes(r.toLowerCase())||O.project.toLowerCase().includes(r.toLowerCase()),A=d==="all"||O.status===d;return x&&A}).sort((O,x)=>{switch(m){case"date":return new Date(x.date)-new Date(O.date);case"user":return O.user.localeCompare(x.user);case"project":return O.project.localeCompare(x.project);default:return 0}}),E=p.filter(O=>O.status==="pass").length,z=p.filter(O=>O.status==="fail").length,R=p.reduce((O,x)=>O+x.grade,0)/p.length;return i.jsxs("div",{className:"space-y-6",children:[i.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[i.jsx(C,{children:i.jsxs(C.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-green-500/20 rounded-lg",children:i.jsx(jc,{className:"w-6 h-6 text-green-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:E}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Passed Audits"})]})]})}),i.jsx(C,{children:i.jsxs(C.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-red-500/20 rounded-lg",children:i.jsx(w0,{className:"w-6 h-6 text-red-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:z}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Failed Audits"})]})]})}),i.jsx(C,{children:i.jsxs(C.Content,{className:"flex items-center space-x-4",children:[i.jsx("div",{className:"p-3 bg-primary-500/20 rounded-lg",children:i.jsx(pc,{className:"w-6 h-6 text-primary-400"})}),i.jsxs("div",{children:[i.jsx("p",{className:"text-2xl font-bold text-white",children:R.toFixed(1)}),i.jsx("p",{className:"text-surface-300 text-sm",children:"Average Grade"})]})]})})]}),i.jsx(C,{children:i.jsx(C.Content,{children:i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[i.jsxs("div",{className:"flex-1 relative",children:[i.jsx(At,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",placeholder:"Search audits...",value:r,onChange:O=>o(O.target.value),className:"material-input pl-10 w-full"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Gn,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:d,onChange:O=>f(O.target.value),className:"material-input",children:[i.jsx("option",{value:"all",children:"All Status"}),i.jsx("option",{value:"pass",children:"Passed"}),i.jsx("option",{value:"fail",children:"Failed"})]})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Od,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:m,onChange:O=>S(O.target.value),className:"material-input",children:[i.jsx("option",{value:"date",children:"Sort by Date"}),i.jsx("option",{value:"user",children:"Sort by User"}),i.jsx("option",{value:"project",children:"Sort by Project"})]})]})]})})}),i.jsxs(C,{children:[i.jsxs(C.Header,{children:[i.jsxs(C.Title,{className:"flex items-center justify-between",children:[i.jsxs("div",{className:"flex items-center",children:[i.jsx(pc,{className:"w-5 h-5 mr-2"}),"Audits (",b.length,")"]}),i.jsxs(Na,{variant:"primary",size:"sm",children:[(E/p.length*100).toFixed(0),"% Pass Rate"]})]}),i.jsx(C.Description,{children:"Your recent audit history"})]}),i.jsxs(C.Content,{children:[i.jsx("div",{className:"overflow-x-auto",children:i.jsxs("table",{className:"w-full",children:[i.jsx("thead",{children:i.jsxs("tr",{className:"border-b border-white/10",children:[i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"User"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Project"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Grade"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Date"}),i.jsx("th",{className:"text-left py-3 px-4 text-surface-300 font-medium",children:"Result"})]})}),i.jsx("tbody",{children:b.map((O,x)=>i.jsxs(J.tr,{className:"border-b border-white/5 hover:bg-white/5 transition-colors",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2,delay:x*.05},children:[i.jsx("td",{className:"py-3 px-4 text-white font-medium",children:O.user}),i.jsx("td",{className:"py-3 px-4 text-surface-300",children:O.project}),i.jsx("td",{className:"py-3 px-4",children:i.jsx("span",{className:`font-semibold ${O.grade>=1?"text-green-400":"text-red-400"}`,children:O.grade.toFixed(1)})}),i.jsx("td",{className:"py-3 px-4 text-surface-400 text-sm",children:new Date(O.date).toLocaleDateString()}),i.jsx("td",{className:"py-3 px-4",children:i.jsx($g,{status:O.status})})]},O.id))})]})}),b.length===0&&i.jsxs("div",{className:"text-center py-8 text-surface-400",children:[i.jsx(At,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),i.jsx("p",{children:"No audits found matching your criteria"})]})]})]})]})},sx=()=>{const[r,o]=F.useState(""),[d,f]=F.useState("xp"),{skills:m,loading:S}=Dg(),p=[{name:"JavaScript",totalXP:2500,projects:8,type:"language",level:"Advanced"},{name:"Go",totalXP:1800,projects:5,type:"language",level:"Intermediate"},{name:"React",totalXP:1500,projects:6,type:"framework",level:"Intermediate"},{name:"Docker",totalXP:1200,projects:4,type:"tool",level:"Intermediate"},{name:"PostgreSQL",totalXP:1e3,projects:3,type:"database",level:"Beginner"},{name:"GraphQL",totalXP:800,projects:2,type:"api",level:"Beginner"},{name:"Node.js",totalXP:1400,projects:5,type:"runtime",level:"Intermediate"},{name:"Git",totalXP:2e3,projects:10,type:"tool",level:"Advanced"}],b=m.length>0?m:p,E=b.filter(x=>x.name.toLowerCase().includes(r.toLowerCase())).sort((x,A)=>{switch(d){case"xp":return A.totalXP-x.totalXP;case"projects":return A.projects-x.projects;case"name":return x.name.localeCompare(A.name);default:return 0}}),z=x=>{switch(x){case"language":return i.jsx(U0,{className:"w-4 h-4"});case"database":return i.jsx(M0,{className:"w-4 h-4"});case"framework":case"api":return i.jsx(O0,{className:"w-4 h-4"});default:return i.jsx(z0,{className:"w-4 h-4"})}},R=x=>{switch(x){case"Advanced":return"success";case"Intermediate":return"primary";case"Beginner":return"warning";default:return"secondary"}},O=Math.max(...b.map(x=>x.totalXP));return S?i.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[i.jsx(ft,{}),i.jsx(ft,{})]}):i.jsxs("div",{className:"space-y-6",children:[i.jsx(C,{children:i.jsx(C.Content,{children:i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4",children:[i.jsxs("div",{className:"flex-1 relative",children:[i.jsx(At,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400"}),i.jsx("input",{type:"text",placeholder:"Search technologies...",value:r,onChange:x=>o(x.target.value),className:"material-input pl-10 w-full"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx(Gn,{className:"w-4 h-4 text-surface-400"}),i.jsxs("select",{value:d,onChange:x=>f(x.target.value),className:"material-input",children:[i.jsx("option",{value:"xp",children:"Sort by XP"}),i.jsx("option",{value:"projects",children:"Sort by Projects"}),i.jsx("option",{value:"name",children:"Sort by Name"})]})]})]})})}),i.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:E.map((x,A)=>i.jsx(J.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:A*.1},children:i.jsx(C,{hover:!0,className:"h-full",children:i.jsxs(C.Content,{children:[i.jsxs("div",{className:"flex items-start justify-between mb-3",children:[i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("div",{className:"p-2 bg-primary-500/20 rounded-lg text-primary-400",children:z(x.type)}),i.jsxs("div",{children:[i.jsx("h3",{className:"font-semibold text-white",children:x.name}),i.jsx("p",{className:"text-xs text-surface-400 capitalize",children:x.type})]})]}),i.jsx(Na,{variant:R(x.level||"Beginner"),size:"sm",children:x.level||"Beginner"})]}),i.jsxs("div",{className:"space-y-3",children:[i.jsxs("div",{children:[i.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[i.jsx("span",{className:"text-surface-300",children:"Experience"}),i.jsxs("span",{className:"text-primary-300",children:[x.totalXP.toLocaleString()," XP"]})]}),i.jsx(Qg,{value:x.totalXP,max:O,size:"sm",color:"primary",showValue:!1})]}),i.jsxs("div",{className:"flex justify-between text-sm",children:[i.jsx("span",{className:"text-surface-300",children:"Projects"}),i.jsx("span",{className:"text-accent-300 font-medium",children:x.projects})]})]})]})})},x.name))}),E.length===0&&i.jsx(C,{children:i.jsx(C.Content,{children:i.jsxs("div",{className:"text-center py-8 text-surface-400",children:[i.jsx(At,{className:"w-12 h-12 mx-auto mb-2 opacity-50"}),i.jsxs("p",{children:['No technologies found matching "',r,'"']})]})})})]})},ix=()=>{const[r,o]=F.useState("profile"),[d,f]=F.useState(!1),{logout:m,user:S}=et(),{profile:p,totalXP:b,loading:E,error:z}=Eg();F.useEffect(()=>{f(!1)},[r]);const R=[{id:"profile",label:"Profile & Data",icon:Fs},{id:"search",label:"Search Queries",icon:At},{id:"stats",label:"Statistics",icon:qd},{id:"audits",label:"Audits",icon:pc},{id:"technologies",label:"Technologies",icon:yc}],O=()=>{m()};return E?i.jsx("div",{className:"min-h-screen flex items-center justify-center",children:i.jsx(ei,{size:"lg",text:"Loading your dashboard..."})}):z?(console.error("Dashboard error:",z),i.jsx("div",{className:"min-h-screen flex items-center justify-center p-4",children:i.jsxs(C,{className:"max-w-md text-center",children:[i.jsxs(C.Header,{children:[i.jsx(C.Title,{className:"text-red-400",children:"Error Loading Dashboard"}),i.jsx(C.Description,{children:z.message||"Failed to load dashboard data"})]}),i.jsx(C.Content,{children:i.jsxs("div",{className:"space-y-3",children:[i.jsx(qt,{onClick:()=>window.location.reload(),className:"w-full",children:"Reload Page"}),!1]})})]})})):i.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 pb-20 md:pb-0",children:[i.jsx("header",{className:"sticky top-0 z-40 bg-surface-900/80 backdrop-blur-md border-b border-white/10",children:i.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[i.jsxs("div",{className:"flex items-center justify-between h-16",children:[i.jsxs("div",{className:"flex items-center",children:[i.jsx(J.div,{initial:{scale:0},animate:{scale:1},className:"w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-400 rounded-lg flex items-center justify-center mr-3",children:i.jsx(Fs,{className:"w-5 h-5 text-white"})}),i.jsx("h1",{className:"text-lg md:text-xl font-bold gradient-text",children:"Profile Dashboard"})]}),i.jsxs("div",{className:"hidden md:flex items-center space-x-4",children:[i.jsxs("div",{className:"text-right",children:[i.jsx("p",{className:"text-sm font-medium text-white",children:p?.firstName||p?.login||S?.username}),i.jsxs("p",{className:"text-xs text-surface-400",children:[b.toLocaleString()," XP"]})]}),i.jsx(qt,{variant:"ghost",size:"sm",onClick:O,className:"text-surface-300 hover:text-red-400",children:i.jsx(Nd,{className:"w-4 h-4"})})]}),i.jsx("div",{className:"md:hidden",children:i.jsx(qt,{variant:"ghost",size:"sm",onClick:()=>f(!d),className:"text-surface-300",children:d?i.jsx(R0,{className:"w-5 h-5"}):i.jsx(q0,{className:"w-5 h-5"})})})]}),d&&i.jsx(J.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"md:hidden border-t border-white/10 py-4",children:i.jsxs("div",{className:"flex items-center justify-between",children:[i.jsxs("div",{children:[i.jsx("p",{className:"text-sm font-medium text-white",children:p?.firstName||p?.login||S?.username}),i.jsxs("p",{className:"text-xs text-surface-400",children:[b.toLocaleString()," XP"]})]}),i.jsxs(qt,{variant:"ghost",size:"sm",onClick:O,className:"text-surface-300 hover:text-red-400",children:[i.jsx(Nd,{className:"w-4 h-4 mr-2"}),"Logout"]})]})})]})}),i.jsx("nav",{className:"sticky top-16 z-30 bg-surface-800/80 backdrop-blur-md border-b border-white/10 hidden md:block",children:i.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:i.jsx("div",{className:"flex space-x-8 overflow-x-auto",children:R.map(x=>{const A=x.icon,N=r===x.id;return i.jsxs(J.button,{onClick:()=>o(x.id),className:`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap relative ${N?"border-primary-400 text-primary-300":"border-transparent text-surface-400 hover:text-surface-200"}`,whileHover:{y:-2},whileTap:{y:0},children:[i.jsx(A,{className:"w-4 h-4"}),i.jsx("span",{className:"text-sm font-medium",children:x.label}),N&&i.jsx(J.div,{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400",layoutId:"activeTabIndicator",transition:{type:"spring",stiffness:500,damping:30}})]},x.id)})})})}),i.jsx(Yg,{tabs:R,activeTab:r,onTabChange:o}),i.jsx("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:i.jsxs(J.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[r==="profile"&&i.jsx(kg,{}),r==="search"&&i.jsx(Ig,{}),r==="stats"&&i.jsx(lx,{}),r==="audits"&&i.jsx(nx,{}),r==="technologies"&&i.jsx(sx,{})]},r)})]})};class ux extends F.Component{constructor(o){super(o),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(o,d){this.setState({error:o,errorInfo:d})}handleRetry=()=>{this.setState({hasError:!1,error:null,errorInfo:null})};handleReload=()=>{window.location.reload()};render(){return this.state.hasError?i.jsx("div",{className:"min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-primary-900 flex items-center justify-center p-4",children:i.jsx(J.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"max-w-md w-full",children:i.jsx(C,{className:"text-center",children:i.jsxs(C.Content,{children:[i.jsx(J.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},className:"w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4",children:i.jsx(B0,{className:"w-8 h-8 text-red-400"})}),i.jsx("h1",{className:"text-2xl font-bold text-white mb-2",children:"Oops! Something went wrong"}),i.jsx("p",{className:"text-surface-300 mb-6",children:"We encountered an unexpected error. This has been logged and we'll look into it."}),!1,i.jsxs("div",{className:"flex flex-col sm:flex-row gap-3",children:[i.jsxs(qt,{onClick:this.handleRetry,className:"flex-1",variant:"primary",children:[i.jsx(C0,{className:"w-4 h-4 mr-2"}),"Try Again"]}),i.jsxs(qt,{onClick:this.handleReload,className:"flex-1",variant:"secondary",children:[i.jsx(G0,{className:"w-4 h-4 mr-2"}),"Reload Page"]})]})]})})})}):this.props.children}}const cx=()=>{const{isAuthenticated:r,isInitialized:o}=et();return o?r?i.jsx(ix,{}):i.jsx(og,{}):i.jsx(ei,{fullScreen:!0,size:"lg",text:"Initializing..."})};function rx(){return i.jsx(ux,{children:i.jsx(j0,{client:Yd,children:i.jsx(ng,{children:i.jsx(cx,{})})})})}Q0.createRoot(document.getElementById("root")).render(i.jsx(F.StrictMode,{children:i.jsx(rx,{})}));
