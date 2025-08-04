import{r as w,j as e,m as N,A as je}from"./animation-vendor-w_1g82yL.js";import{R as fe,b as se,u as we,h as ve}from"./index-CDiERX6D.js";import{C as re}from"./Card-Dh5KB05c.js";import{ad as ae,ae as B,Z as le,R as q,S as V,K as ie,v as oe,t as de,d as Q,J as Ne,w as ye,af as Ae,ag as Se,ah as _e,ai as Ee,aj as Re,z as Ce,y as Te,U as ce,aa as K,e as $e,q as Oe,A as Pe,a as ne}from"./ui-vendor-DqcOv3sU.js";import{d as De,i as _,e as y}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const ke=()=>{const n=w.useContext(fe);if(n===void 0)throw new Error("useRefresh must be used within a RefreshProvider");return n},Le=({className:n="",showStats:E=!0,showAutoRefreshToggle:A=!0,compact:d=!1})=>{const{isGlobalRefreshing:c,refreshStats:x,refreshAll:b,hardRefresh:v,enableAutoRefresh:l,disableAutoRefresh:O,isAutoRefreshEnabled:S,autoRefreshInterval:h,clearCache:X,getCacheSize:m,isOnline:R,lastOnlineTime:C}=ke(),[P,T]=w.useState(!1),[D,M]=w.useState(Math.round(h/1e3)),W=()=>{S?O():l(D*1e3)},j=o=>{M(o),S&&l(o*1e3)},z=o=>o<1e3?`${o}ms`:o<6e4?`${(o/1e3).toFixed(1)}s`:`${(o/6e4).toFixed(1)}m`,k=o=>{const L=Math.round(o/1e3);if(L<60)return`${L}s`;const I=Math.round(L/60);return I<60?`${I}m`:`${Math.round(I/60)}h`};return d?e.jsxs("div",{className:`flex items-center space-x-2 ${n}`,children:[e.jsx("div",{className:"flex items-center",children:R?e.jsx(ae,{className:"w-4 h-4 text-green-400"}):e.jsx(B,{className:"w-4 h-4 text-red-400"})}),S&&e.jsxs("div",{className:"flex items-center text-xs text-primary-400",children:[e.jsx(le,{className:"w-3 h-3 mr-1"}),k(h)]}),e.jsx(N.button,{onClick:b,disabled:c,whileHover:{scale:1.05},whileTap:{scale:.95},className:`p-2 rounded-lg transition-all ${c?"bg-primary-500/20 text-primary-400 cursor-wait":"bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"}`,children:e.jsx(q,{className:`w-4 h-4 ${c?"animate-spin":""}`})})]}):e.jsxs("div",{className:`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 ${n}`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"p-2 rounded-lg bg-primary-500/20",children:e.jsx(q,{className:"w-5 h-5 text-primary-400"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-white font-medium",children:"Data Refresh"}),e.jsxs("p",{className:"text-white/60 text-sm",children:[R?"Online":"Offline"," •",S?` Auto: ${k(h)}`:" Manual"]})]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("div",{className:`p-2 rounded-lg ${R?"bg-green-500/20":"bg-red-500/20"}`,children:R?e.jsx(ae,{className:"w-4 h-4 text-green-400"}):e.jsx(B,{className:"w-4 h-4 text-red-400"})}),e.jsx(N.button,{onClick:()=>T(!P),whileHover:{scale:1.05},whileTap:{scale:.95},className:`p-2 rounded-lg transition-all ${P?"bg-primary-500/20 text-primary-400":"bg-white/10 text-white/70 hover:bg-white/20"}`,children:e.jsx(V,{className:"w-4 h-4"})})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-3 mb-4",children:[e.jsxs(N.button,{onClick:b,disabled:c,whileHover:{scale:1.02},whileTap:{scale:.98},className:`p-3 rounded-lg border transition-all text-left ${c?"bg-primary-500/20 border-primary-500/30 text-primary-400 cursor-wait":"bg-white/5 border-white/10 text-white hover:bg-white/10"}`,children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-1",children:[e.jsx(q,{className:`w-4 h-4 ${c?"animate-spin":""}`}),e.jsx("span",{className:"font-medium",children:"Refresh All"})]}),e.jsx("p",{className:"text-xs text-white/60",children:c?"Refreshing...":"Update all data"})]}),e.jsxs(N.button,{onClick:v,disabled:c,whileHover:{scale:1.02},whileTap:{scale:.98},className:"p-3 rounded-lg border bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all text-left disabled:opacity-50",children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-1",children:[e.jsx(ie,{className:"w-4 h-4"}),e.jsx("span",{className:"font-medium",children:"Hard Refresh"})]}),e.jsx("p",{className:"text-xs text-white/60",children:"Clear cache & refresh"})]}),A&&e.jsxs(N.button,{onClick:W,whileHover:{scale:1.02},whileTap:{scale:.98},className:`p-3 rounded-lg border transition-all text-left ${S?"bg-green-500/20 border-green-500/30 text-green-400":"bg-white/5 border-white/10 text-white hover:bg-white/10"}`,children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-1",children:[e.jsx(le,{className:"w-4 h-4"}),e.jsx("span",{className:"font-medium",children:"Auto Refresh"})]}),e.jsx("p",{className:"text-xs text-white/60",children:S?`Every ${k(h)}`:"Disabled"})]})]}),e.jsx(je,{children:P&&e.jsxs(N.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"border-t border-white/10 pt-4",children:[e.jsxs("h4",{className:"text-white font-medium mb-3 flex items-center",children:[e.jsx(V,{className:"w-4 h-4 mr-2"}),"Refresh Settings"]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-white/80 text-sm mb-2",children:"Auto-refresh Interval"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"range",min:"10",max:"300",step:"10",value:D,onChange:o=>j(Number(o.target.value)),className:"flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"}),e.jsxs("span",{className:"text-white/70 text-sm w-12",children:[D,"s"]})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/80 text-sm",children:"Cache Size"}),e.jsxs("p",{className:"text-white/60 text-xs",children:[m()," entries"]})]}),e.jsx(N.button,{onClick:X,whileHover:{scale:1.05},whileTap:{scale:.95},className:"px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-all",children:"Clear Cache"})]})]})}),E&&e.jsxs("div",{className:"border-t border-white/10 pt-4 mt-4",children:[e.jsxs("h4",{className:"text-white font-medium mb-3 flex items-center",children:[e.jsx(oe,{className:"w-4 h-4 mr-2"}),"Refresh Statistics"]}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"flex items-center justify-center mb-1",children:e.jsx(de,{className:"w-4 h-4 text-blue-400"})}),e.jsx("p",{className:"text-lg font-bold text-white",children:x.totalRefreshes}),e.jsx("p",{className:"text-xs text-white/60",children:"Total"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"flex items-center justify-center mb-1",children:e.jsx(Q,{className:"w-4 h-4 text-green-400"})}),e.jsx("p",{className:"text-lg font-bold text-white",children:x.successfulRefreshes}),e.jsx("p",{className:"text-xs text-white/60",children:"Success"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"flex items-center justify-center mb-1",children:e.jsx(Ne,{className:"w-4 h-4 text-red-400"})}),e.jsx("p",{className:"text-lg font-bold text-white",children:x.failedRefreshes}),e.jsx("p",{className:"text-xs text-white/60",children:"Failed"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"flex items-center justify-center mb-1",children:e.jsx(ye,{className:"w-4 h-4 text-purple-400"})}),e.jsx("p",{className:"text-lg font-bold text-white",children:z(x.averageRefreshTime)}),e.jsx("p",{className:"text-xs text-white/60",children:"Avg Time"})]})]}),x.lastRefreshTime&&e.jsx("div",{className:"mt-3 text-center",children:e.jsxs("p",{className:"text-white/60 text-xs",children:["Last refresh: ",se(x.lastRefreshTime)]})}),!R&&C&&e.jsx("div",{className:"mt-3 text-center",children:e.jsxs("p",{className:"text-red-400 text-xs flex items-center justify-center",children:[e.jsx(B,{className:"w-3 h-3 mr-1"}),"Last online: ",se(C)]})})]})]})},Ie=y`
  query Users {
    event_user(
      order_by: { createdAt: desc }
      where: { 
        event: { 
          path: { _like: "/bahrain%" }
        },
      }
    ) {
      userLogin
      userName
      createdAt
      userAuditRatio
      level
      event {
        campus
      }
    }
  }
`,Ue=y`
  query GetAllObjectsExport {
    object(order_by: { createdAt: desc }) {
      id
      name
      type
      attrs
      createdAt
      campus
      authorId
    }
  }
`,Ge=y`
  query GetAllEventsExport {
    event(order_by: { createdAt: desc }) {
      id
      path
      campus
      createdAt
      endAt
      objectId
    }
  }
`,Fe=y`
  query GetAllGroupsExport {
    group(order_by: { createdAt: desc }) {
      id
      path
      campus
      createdAt
      updatedAt
      objectId
      eventId
    }
  }
`,qe=y`
  query GetAllTransactionsExport {
    transaction(order_by: { createdAt: desc }) {
      id
      type
      amount
      createdAt
      path
      userId
      objectId
      eventId
      campus
    }
  }
`,Xe=y`
  query GetAllProgressExport {
    progress(order_by: { createdAt: desc }) {
      id
      userId
      objectId
      grade
      path
      campus
      createdAt
      isDone
    }
  }
`,Me=y`
  query GetAllAuditsExport {
    audit(order_by: { createdAt: desc }) {
      id
      auditorId
      groupId
      grade
      createdAt
      updatedAt
    }
  }
`,ze=y`
  query GetAllResultsExport {
    result(order_by: { createdAt: desc }) {
      id
      userId
      objectId
      grade
      type
      path
      createdAt
    }
  }
`,He=y`
  query GetExportStats {
    event_user_aggregate(
      where: { 
        event: { 
          path: { _like: "/bahrain%" }
        }
      }
    ) { aggregate { count } }
    object_aggregate { aggregate { count } }
    event_aggregate { aggregate { count } }
    group_aggregate { aggregate { count } }
    transaction_aggregate { aggregate { count } }
    progress_aggregate { aggregate { count } }
    audit_aggregate { aggregate { count } }
    result_aggregate { aggregate { count } }
  }
`,F={dashboard:{defaultTab:"dashboard",tabOrder:["dashboard","piscines","leaderboard","groups","audits","checkpoints","events","subjects"]}},Je=(n,E)=>{const A=new TextEncoder,d=A.encode(n),c=A.encode(E),x=new Uint8Array(d.length);for(let l=0;l<d.length;l++)x[l]=c[l%c.length];const b=new Uint8Array(d.length);for(let l=0;l<d.length;l++)b[l]=d[l]^x[l];let v="";for(let l=0;l<b.length;l++)v+=String.fromCharCode(b[l]);return btoa(v)},Be=(n,E,A,d)=>{const c=Je(n,E),x=new Date().toISOString();return JSON.stringify({_encrypted:!0,_format:A,_dataType:d,_timestamp:x,_instructions:{message:"This file is password protected. Use the decryption tool with your credentials.",decryption:"To decrypt: 1) Use your credential 2) Apply XOR decryption with base64 encoding 3) Parse the resulting content"},_encryptedData:c},null,2)},et=({userId:n,onClose:E,defaultTabs:A=[]})=>{const[d,c]=w.useState(F),[x,b]=w.useState(!1),[v,l]=w.useState("appearance"),[O,S]=w.useState({}),[h,X]=w.useState("users"),[m,R]=w.useState("json"),[C,P]=w.useState(!0),{user:T}=we(),{theme:D,setTheme:M,toggleTheme:W}=ve();w.useEffect(()=>{const t=localStorage.getItem(`user-preferences-${n}`);if(t)try{const s=JSON.parse(t);c({...F,...s})}catch{}},[n]);const{data:j}=De(He,{errorPolicy:"all",fetchPolicy:"cache-first"}),[z]=_(Ie,{errorPolicy:"all"}),[k]=_(Ue,{errorPolicy:"all"}),[o]=_(Ge,{errorPolicy:"all"}),[L]=_(Fe,{errorPolicy:"all"}),[I]=_(qe,{errorPolicy:"all"}),[Z]=_(Xe,{errorPolicy:"all"}),[xe]=_(Me,{errorPolicy:"all"}),[he]=_(ze,{errorPolicy:"all"}),H=(t,s,r)=>{c(a=>({...a,[t]:{...a[t],[s]:r}})),b(!0)},me=()=>{localStorage.setItem(`user-preferences-${n}`,JSON.stringify(d)),b(!1)},pe=()=>{c(F),b(!0)},Y=(t,s)=>{const r=[...d.dashboard.tabOrder],[a]=r.splice(t,1);r.splice(s,0,a),H("dashboard","tabOrder",r)},ue=()=>{H("dashboard","tabOrder",F.dashboard.tabOrder)},U=(t,s)=>{S(r=>({...r,[t]:s}))},ee=(t,s,r)=>{if(!t||t.length===0)return"";const a=C?{metadata:{exportedAt:new Date().toISOString(),dataType:s,format:r,recordCount:t.length,exportedBy:n},data:t}:t;switch(r){case"json":return JSON.stringify(a,null,2);case"csv":{if(t.length===0)return"";const i=Object.keys(t[0]).join(","),p=t.map(f=>Object.values(f).map(u=>typeof u=="string"&&u.includes(",")?`"${u.replace(/"/g,'""')}"`:u).join(","));return C?`# Exported on ${new Date().toISOString()}
# Data type: ${s}
# Records: ${t.length}
${i}
${p.join(`
`)}`:`${i}
${p.join(`
`)}`}case"txt":{const i=t.map(p=>Object.entries(p).map(([f,u])=>`${f}: ${u}`).join(`
`)).join(`
---
`);return C?`Export Date: ${new Date().toISOString()}
Data Type: ${s}
Total Records: ${t.length}
Exported By: User ${n}

---
${i}`:i}default:return JSON.stringify(a,null,2)}},te=(t,s,r,a)=>{if(!T?.login)return;const i=Be(t,T.login,r,a),p={json:"application/json",csv:"text/csv",txt:"text/plain"},f={json:"protected.json",csv:"protected.csv",txt:"protected.txt"},u=p[r],g=f[r],J=new Blob([i],{type:u}),G=URL.createObjectURL(J),$=document.createElement("a");$.href=G,$.download=`${s}.${g}`,document.body.appendChild($),$.click(),document.body.removeChild($),URL.revokeObjectURL(G)},ge=async t=>{const s=`${t}-${m}`;U(s,"loading");try{const r={users:z,objects:k,events:o,groups:L,transactions:I,progress:Z,audits:xe,results:he};if(t==="all"){const a=Object.entries(r).map(async([g,J])=>{const G=await J(),$=g==="users"?"event_user":g==="objects"?"object":g==="events"?"event":g==="groups"?"group":g==="transactions"?"transaction":g==="progress"?"progress":g==="audits"?"audit":"result";return{[g]:G.data?.[$]||[]}}),i=await Promise.all(a),p=Object.assign({},...i),f=ee([p],"all",m),u=new Date().toISOString().split("T")[0];te(f,`reboot01_all_data_${u}`,m,"all")}else{const a=r[t],i=await a(),p=t==="users"?"event_user":t==="objects"?"object":t==="events"?"event":t==="groups"?"group":t==="transactions"?"transaction":t==="progress"?"progress":t==="audits"?"audit":"result",f=i.data?.[p]||[],u=ee(f,t,m),g=new Date().toISOString().split("T")[0];te(u,`reboot01_${t}_${g}`,m,t)}U(s,"success"),setTimeout(()=>U(s,"idle"),3e3)}catch{U(s,"error"),setTimeout(()=>U(s,"idle"),5e3)}},be=[{id:"appearance",label:"Appearance",icon:Se},{id:"dashboard",label:"Dashboard",icon:V},{id:"data",label:"Data Refresh",icon:ie},{id:"export",label:"Data Export",icon:_e}];return e.jsx("div",{className:"fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",children:e.jsxs(N.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},className:"bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden",children:[e.jsx("div",{className:"p-6 border-b border-gray-700",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-white",children:"User Preferences"}),e.jsx("p",{className:"text-white/60 mt-1",children:"Customize your dashboard experience"})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[x&&e.jsxs(N.button,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},onClick:me,className:"flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors",children:[e.jsx(Ae,{className:"w-4 h-4 mr-2"}),"Save Changes"]}),e.jsx("button",{onClick:E,className:"text-white/60 hover:text-white transition-colors",children:"✕"})]})]})}),e.jsxs("div",{className:"flex h-[600px]",children:[e.jsxs("div",{className:"w-64 bg-gray-900/50 border-r border-gray-700 p-4",children:[e.jsx("nav",{className:"space-y-2",children:be.map(t=>{const s=t.icon,r=v===t.id;return e.jsxs("button",{onClick:()=>l(t.id),className:`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${r?"bg-primary-600 text-white":"text-white/70 hover:text-white hover:bg-white/10"}`,children:[e.jsx(s,{className:"w-5 h-5 mr-3"}),t.label]},t.id)})}),e.jsx("div",{className:"mt-8 pt-4 border-t border-gray-700",children:e.jsxs("button",{onClick:pe,className:"w-full flex items-center px-3 py-2 text-white/60 hover:text-white transition-colors",children:[e.jsx(Ee,{className:"w-4 h-4 mr-3"}),"Reset to Defaults"]})})]}),e.jsxs("div",{className:"flex-1 p-6 overflow-y-auto",children:[v==="appearance"&&e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-white",children:"Appearance Settings"}),e.jsxs(re,{className:"p-4",children:[e.jsx("label",{className:"block text-white font-medium mb-3",children:"Theme"}),e.jsx("div",{className:"space-y-2",children:["dark","light","auto"].map(t=>e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"radio",name:"theme",value:t,checked:D===t,onChange:s=>M(s.target.value),className:"mr-3"}),e.jsx("span",{className:"text-white/80 capitalize",children:t})]},t))})]})]}),v==="dashboard"&&e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-white",children:"Dashboard Settings"}),e.jsx(re,{className:"p-4",children:e.jsx("div",{className:"space-y-4",children:Object.entries(d.dashboard).map(([t,s])=>t==="defaultTab"?e.jsxs("div",{children:[e.jsx("label",{className:"block text-white/80 mb-2",children:"Default Tab"}),e.jsxs("select",{value:s,onChange:r=>H("dashboard",t,r.target.value),className:"w-full bg-gray-700 text-white rounded px-3 py-2",children:[e.jsx("option",{value:"dashboard",children:"Dashboard"}),e.jsx("option",{value:"piscines",children:"Piscines"}),e.jsx("option",{value:"leaderboard",children:"Leaderboard"}),e.jsx("option",{value:"groups",children:"Groups"}),e.jsx("option",{value:"audits",children:"Audits"}),e.jsx("option",{value:"checkpoints",children:"Checkpoints"}),e.jsx("option",{value:"events",children:"Events"}),e.jsx("option",{value:"subjects",children:"Subjects"})]})]},t):t==="tabOrder"?e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("label",{className:"block text-white/80",children:"Tab Order"}),e.jsx("button",{onClick:ue,className:"text-xs text-blue-400 hover:text-blue-300 transition-colors",children:"Reset to Default"})]}),e.jsx("div",{className:"space-y-2",children:s.map((r,a)=>{const i=A.find(f=>f.id===r);if(!i)return null;const p=i.icon;return e.jsxs("div",{className:"flex items-center bg-gray-700/50 rounded px-3 py-2",children:[e.jsx(Re,{className:"w-4 h-4 text-white/40 mr-2"}),e.jsx(p,{className:"w-4 h-4 text-white/60 mr-2"}),e.jsx("span",{className:"text-white/80 flex-1",children:i.label}),e.jsxs("div",{className:"flex space-x-1",children:[e.jsx("button",{onClick:()=>a>0&&Y(a,a-1),disabled:a===0,className:"p-1 text-white/40 hover:text-white/60 disabled:opacity-30 disabled:cursor-not-allowed",children:e.jsx(Ce,{className:"w-3 h-3"})}),e.jsx("button",{onClick:()=>a<s.length-1&&Y(a,a+1),disabled:a===s.length-1,className:"p-1 text-white/40 hover:text-white/60 disabled:opacity-30 disabled:cursor-not-allowed",children:e.jsx(Te,{className:"w-3 h-3"})})]})]},r)})})]},t):null)})})]}),v==="data"&&e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-white",children:"Data Refresh Settings"}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 border border-white/10",children:[e.jsx("p",{className:"text-white/70 text-sm mb-4",children:"Manage data refresh settings, cache, and synchronization options."}),e.jsx(Le,{showStats:!0,showAutoRefreshToggle:!0})]})]}),v==="export"&&e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-white",children:"Data Export"}),e.jsx("p",{className:"text-white/60",children:"Export comprehensive data from the platform in various formats"}),j&&e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",children:[{icon:ce,label:"Users",count:j.event_user_aggregate?.aggregate?.count||0,color:"bg-blue-500/20 text-blue-400"},{icon:K,label:"Objects",count:j.object_aggregate?.aggregate?.count||0,color:"bg-green-500/20 text-green-400"},{icon:$e,label:"Events",count:j.event_aggregate?.aggregate?.count||0,color:"bg-orange-500/20 text-orange-400"},{icon:ce,label:"Groups",count:j.group_aggregate?.aggregate?.count||0,color:"bg-purple-500/20 text-purple-400"},{icon:de,label:"Transactions",count:j.transaction_aggregate?.aggregate?.count||0,color:"bg-indigo-500/20 text-indigo-400"},{icon:Oe,label:"Progress",count:j.progress_aggregate?.aggregate?.count||0,color:"bg-pink-500/20 text-pink-400"},{icon:Q,label:"Audits",count:j.audit_aggregate?.aggregate?.count||0,color:"bg-yellow-500/20 text-yellow-400"},{icon:Pe,label:"Results",count:j.result_aggregate?.aggregate?.count||0,color:"bg-red-500/20 text-red-400"}].map(({icon:t,label:s,count:r,color:a})=>e.jsxs("div",{className:`${a} rounded-lg p-3 border border-current border-opacity-30`,children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(t,{className:"w-4 h-4"}),e.jsx("span",{className:"text-sm font-medium",children:s})]}),e.jsx("div",{className:"text-lg font-bold mt-1",children:r.toLocaleString()})]},s))}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-6 border border-white/10 space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("label",{className:"block text-white/80 font-medium",children:"Data Type"}),e.jsxs("select",{value:h,onChange:t=>X(t.target.value),className:"w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"users",children:"Users"}),e.jsx("option",{value:"objects",children:"Objects"}),e.jsx("option",{value:"events",children:"Events"}),e.jsx("option",{value:"groups",children:"Groups"}),e.jsx("option",{value:"transactions",children:"Transactions"}),e.jsx("option",{value:"progress",children:"Progress"}),e.jsx("option",{value:"audits",children:"Audits"}),e.jsx("option",{value:"results",children:"Results"}),e.jsx("option",{value:"all",children:"All Data (Combined)"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("label",{className:"block text-white/80 font-medium",children:"Export Format"}),e.jsx("div",{className:"flex space-x-4",children:[{value:"json",label:"JSON",icon:K},{value:"csv",label:"CSV",icon:oe},{value:"txt",label:"TXT",icon:K}].map(({value:t,label:s,icon:r})=>e.jsxs("button",{onClick:()=>R(t),className:`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${m===t?"bg-primary-500/20 border-primary-500/30 text-primary-300":"bg-gray-700/50 border-gray-600/50 text-white/70 hover:bg-gray-700 hover:border-gray-600"}`,children:[e.jsx(r,{className:"w-4 h-4"}),e.jsx("span",{children:s})]},t))})]}),e.jsx("div",{className:"space-y-3",children:e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"checkbox",checked:C,onChange:t=>P(t.target.checked),className:"rounded border-gray-600 bg-gray-700 text-primary-500 focus:ring-primary-500"}),e.jsx("span",{className:"text-white/80",children:"Include metadata (export date, record count, etc.)"})]})}),e.jsxs("div",{className:"flex justify-between items-center pt-4 border-t border-white/10",children:[e.jsxs("div",{className:"text-sm text-white/60",children:[h==="all"?"Export all data types":`Export ${h} data`," as ",m.toLowerCase()]}),e.jsx("button",{onClick:()=>ge(h),disabled:O[`${h}-${m}`]==="loading"||!T?.login,className:"flex items-center space-x-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors",title:T?.login?"Export data with password protection":"Export disabled: User login not available for password protection",children:O[`${h}-${m}`]==="loading"?e.jsxs(e.Fragment,{children:[e.jsx(q,{className:"w-4 h-4 animate-spin"}),e.jsx("span",{children:"Exporting..."})]}):O[`${h}-${m}`]==="success"?e.jsxs(e.Fragment,{children:[e.jsx(Q,{className:"w-4 h-4"}),e.jsx("span",{children:"Downloaded!"})]}):O[`${h}-${m}`]==="error"?e.jsx(e.Fragment,{children:e.jsx("span",{className:"text-red-300",children:"Export Failed"})}):e.jsxs(e.Fragment,{children:[e.jsx(ne,{className:"w-4 h-4"}),e.jsx("span",{children:"Export Secured"})]})})]})]}),e.jsx("div",{className:"bg-amber-500/10 border border-amber-500/20 rounded-lg p-4",children:e.jsxs("div",{className:"flex items-start space-x-3",children:[e.jsx("div",{className:"w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",children:e.jsx(ne,{className:"w-3 h-3 text-amber-400"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-amber-200 text-sm font-medium",children:"Security Protection"}),e.jsxs("div",{className:"text-amber-100/70 text-xs mt-2 space-y-1",children:[e.jsx("p",{children:"• All exported files are password-protected for security"}),e.jsxs("p",{children:["• Your login credential (",e.jsx("strong",{children:T?.login||"Not Available"}),") is used as the password"]}),e.jsx("p",{children:"• Files are encrypted and saved with .protected extension in your selected format"}),e.jsx("p",{children:"• Use decryption tools or contact support to access the data"})]})]})]})}),e.jsx("div",{className:"bg-blue-500/10 border border-blue-500/20 rounded-lg p-4",children:e.jsxs("div",{className:"flex items-start space-x-3",children:[e.jsx("div",{className:"w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",children:e.jsx("div",{className:"w-2 h-2 bg-blue-400 rounded-full"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-blue-200 text-sm font-medium",children:"Export Information"}),e.jsxs("div",{className:"text-blue-100/70 text-xs mt-2 space-y-1",children:[e.jsx("p",{children:"• Exports include all available fields and data for the selected type"}),e.jsx("p",{children:"• Large datasets may take some time to process"}),e.jsx("p",{children:"• All exports are generated fresh from the current database state"}),e.jsx("p",{children:"• Metadata includes export timestamp, record counts, and user information"})]})]})]})})]})]})]})]})})};export{et as default};
