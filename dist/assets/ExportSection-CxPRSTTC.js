import{r as k,j as e,m as d}from"./animation-vendor-BWQ_wUI_.js";import{L as de}from"./index-BujnE6GC.js";import{i as x,d as ge,e as g}from"./apollo-vendor-8AJvV5pX.js";import{D as J,U as G,K as R,e as Q,s as K,o as W,A as Y,r as Z,a2 as w,u as ee,d as me,R as ue,B as xe}from"./ui-vendor-bNeDgDN7.js";import"./react-vendor-DJG_os-6.js";const pe=g`
  query GetAllUsersExport {
    user(order_by: { totalUp: desc }) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      createdAt
      updatedAt
    }
  }
`,be=g`
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
`,he=g`
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
`,fe=g`
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
`,je=g`
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
`,we=g`
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
`,ye=g`
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
`,ve=g`
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
`,Le=({user:b})=>{const[l,y]=k.useState({}),[o,v]=k.useState("users"),[s,O]=k.useState("json"),[N,te]=k.useState(!0),[I]=x(pe,{errorPolicy:"all"}),[U]=x(be,{errorPolicy:"all"}),[F]=x(he,{errorPolicy:"all"}),[q]=x(fe,{errorPolicy:"all"}),[V]=x(je,{errorPolicy:"all"}),[X]=x(we,{errorPolicy:"all"}),[B]=x(ye,{errorPolicy:"all"}),[H]=x(ve,{errorPolicy:"all"}),{data:re,loading:ae}=ge(g`
    query GetExportStats {
      user_aggregate { aggregate { count } }
      object_aggregate { aggregate { count } }
      event_aggregate { aggregate { count } }
      group_aggregate { aggregate { count } }
      transaction_aggregate { aggregate { count } }
      progress_aggregate { aggregate { count } }
      audit_aggregate { aggregate { count } }
      result_aggregate { aggregate { count } }
    }
  `,{errorPolicy:"all",fetchPolicy:"cache-first"});if(ae)return e.jsx(de,{});const m=re||{},E=m.user_aggregate?.aggregate?.count||0,S=m.object_aggregate?.aggregate?.count||0,_=m.event_aggregate?.aggregate?.count||0,A=m.group_aggregate?.aggregate?.count||0,L=m.transaction_aggregate?.aggregate?.count||0,$=m.progress_aggregate?.aggregate?.count||0,C=m.audit_aggregate?.aggregate?.count||0,T=m.result_aggregate?.aggregate?.count||0,P=(t,a)=>{y(r=>({...r,[t]:a})),a==="success"&&setTimeout(()=>{y(r=>({...r,[t]:"idle"}))},3e3)},M=(t,a,r)=>{const h=new Blob([t],{type:r}),c=URL.createObjectURL(h),n=document.createElement("a");n.href=c,n.download=a,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(c)},z=(t,a,r)=>{const h=new Date().toISOString().split("T")[0],c=`${a}_export_${h}`;if(r==="json"){const n={...N&&{metadata:{exportDate:new Date().toISOString(),dataType:a,recordCount:t.length,exportedBy:b.login}},data:t};return{content:JSON.stringify(n,null,2),filename:`${c}.json`,type:"application/json"}}if(r==="csv"){if(t.length===0)return{content:"No data available",filename:`${c}.csv`,type:"text/csv"};const n=Object.keys(t[0]).join(","),f=t.map(j=>Object.values(j).map(u=>typeof u=="string"&&u.includes(",")?`"${u}"`:u).join(","));return{content:[...N?[`# Export Date: ${new Date().toISOString()}`,`# Data Type: ${a}`,`# Record Count: ${t.length}`,`# Exported By: ${b.login}`,""]:[],n,...f].join(`
`),filename:`${c}.csv`,type:"text/csv"}}return r==="txt"?{content:[...N?[`Export Date: ${new Date().toISOString()}`,`Data Type: ${a}`,`Record Count: ${t.length}`,`Exported By: ${b.login}`,"=".repeat(50),""]:[],...t.map((f,i)=>[`Record ${i+1}:`,...Object.entries(f).map(([j,u])=>`  ${j}: ${u}`),""].join(`
`))].join(`
`),filename:`${c}.txt`,type:"text/plain"}:{content:"",filename:"",type:""}},se=async t=>{const a=`${t}_${s}`;P(a,"loading");try{let r;switch(t){case"users":r=await I();break;case"objects":r=await U();break;case"events":r=await F();break;case"groups":r=await q();break;case"transactions":r=await V();break;case"progress":r=await X();break;case"audits":r=await B();break;case"results":r=await H();break;case"all":const i=await Promise.all([I(),U(),F(),q(),V(),X(),B(),H()]),j={users:i[0]?.data?.user||[],objects:i[1]?.data?.object||[],events:i[2]?.data?.event||[],groups:i[3]?.data?.group||[],transactions:i[4]?.data?.transaction||[],progress:i[5]?.data?.progress||[],audits:i[6]?.data?.audit||[],results:i[7]?.data?.result||[]},{content:u,filename:le,type:ce}=z([j],"all",s);M(u,le,ce),P(a,"success");return;default:throw new Error("Invalid data type")}if(r?.error)throw r.error;const h=r?.data?.[t]||[],{content:c,filename:n,type:f}=z(h,t,s);M(c,n,f),P(a,"success")}catch(r){console.error("Export error:",r),P(a,"error")}},D=[{id:"users",label:"Users",icon:G,count:E,description:"All platform users with profiles and statistics"},{id:"objects",label:"Learning Objects",icon:R,count:S,description:"Curriculum objects, projects, and learning materials"},{id:"events",label:"Events",icon:Q,count:_,description:"Platform events and activities"},{id:"groups",label:"Groups",icon:G,count:A,description:"User groups and team formations"},{id:"transactions",label:"Transactions",icon:K,count:L,description:"All platform transactions including XP, up/down votes"},{id:"progress",label:"Progress",icon:W,count:$,description:"User learning progress and completion records"},{id:"audits",label:"Audits",icon:Y,count:C,description:"Peer review and audit records"},{id:"results",label:"Results",icon:Z,count:T,description:"Assessment results and grades"},{id:"all",label:"Complete Dataset",icon:R,count:E+S+_+A+L+$+C+T,description:"Export all data types in a single file"}],oe=[{id:"json",label:"JSON",icon:w,description:"Structured data format, ideal for developers"},{id:"csv",label:"CSV",icon:ee,description:"Spreadsheet format, ideal for analysis"},{id:"txt",label:"Text",icon:w,description:"Human-readable format, ideal for reports"}];return e.jsxs("div",{className:"bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 min-h-full relative",children:[e.jsxs("div",{className:"fixed inset-0 opacity-30 pointer-events-none z-0",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"}),e.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 25px 25px, rgba(34, 197, 94, 0.1) 2px, transparent 0)",backgroundSize:"50px 50px"}})]}),e.jsx("div",{className:"relative z-10 overflow-hidden",children:e.jsxs("div",{className:"relative space-y-8 p-6",children:[e.jsxs(d.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center space-y-4",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4",children:e.jsx(J,{className:"w-10 h-10 text-green-400"})}),e.jsx("h1",{className:"text-5xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent",children:"Data Export Center"}),e.jsxs("p",{className:"text-xl text-white/70 max-w-2xl mx-auto",children:["Export comprehensive datasets from ",e.jsx("span",{className:"text-green-400 font-semibold",children:(E+S+_+A+L+$+C+T).toLocaleString()})," total records"]})]}),e.jsxs(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6",children:[e.jsx(p,{icon:G,title:"Users",value:E.toLocaleString(),color:"bg-gradient-to-r from-blue-500/30 to-cyan-500/30",bgGradient:"bg-gradient-to-br from-blue-900/20 to-cyan-900/20",subValue:"Student profiles"}),e.jsx(p,{icon:R,title:"Learning Objects",value:S.toLocaleString(),color:"bg-gradient-to-r from-purple-500/30 to-violet-500/30",bgGradient:"bg-gradient-to-br from-purple-900/20 to-violet-900/20",subValue:"Curriculum items"}),e.jsx(p,{icon:Q,title:"Events",value:_.toLocaleString(),color:"bg-gradient-to-r from-orange-500/30 to-red-500/30",bgGradient:"bg-gradient-to-br from-orange-900/20 to-red-900/20",subValue:"Platform activities"}),e.jsx(p,{icon:G,title:"Groups",value:A.toLocaleString(),color:"bg-gradient-to-r from-emerald-500/30 to-teal-500/30",bgGradient:"bg-gradient-to-br from-emerald-900/20 to-teal-900/20",subValue:"Team formations"}),e.jsx(p,{icon:K,title:"Transactions",value:L.toLocaleString(),color:"bg-gradient-to-r from-yellow-500/30 to-amber-500/30",bgGradient:"bg-gradient-to-br from-yellow-900/20 to-amber-900/20",subValue:"XP & interactions"}),e.jsx(p,{icon:W,title:"Progress Records",value:$.toLocaleString(),color:"bg-gradient-to-r from-pink-500/30 to-rose-500/30",bgGradient:"bg-gradient-to-br from-pink-900/20 to-rose-900/20",subValue:"Learning progress"}),e.jsx(p,{icon:Y,title:"Audits",value:C.toLocaleString(),color:"bg-gradient-to-r from-indigo-500/30 to-purple-500/30",bgGradient:"bg-gradient-to-br from-indigo-900/20 to-purple-900/20",subValue:"Peer reviews"}),e.jsx(p,{icon:Z,title:"Results",value:T.toLocaleString(),color:"bg-gradient-to-r from-green-500/30 to-emerald-500/30",bgGradient:"bg-gradient-to-br from-green-900/20 to-emerald-900/20",subValue:"Assessment data"})]}),e.jsxs(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-lg",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(R,{className:"w-5 h-5 mr-2 text-green-400"}),"Select Data Type"]}),e.jsx("div",{className:"space-y-3",children:D.map(t=>{const a=t.icon,r=o===t.id;return e.jsx(d.button,{onClick:()=>v(t.id),whileHover:{scale:1.02},whileTap:{scale:.98},className:`w-full p-4 rounded-xl border transition-all text-left ${r?"bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-white shadow-lg":"bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"}`,children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(a,{className:"w-5 h-5 text-green-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium",children:t.label}),e.jsx("p",{className:"text-sm text-white/60",children:t.description})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"text-lg font-bold text-green-400",children:t.count.toLocaleString()}),e.jsx("p",{className:"text-xs text-white/60",children:"records"})]})]})},t.id)})})]}),e.jsxs("div",{className:"bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-lg",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(w,{className:"w-5 h-5 mr-2 text-green-400"}),"Export Format"]}),e.jsx("div",{className:"space-y-3 mb-6",children:oe.map(t=>{const a=t.icon,r=s===t.id;return e.jsx(d.button,{onClick:()=>O(t.id),whileHover:{scale:1.02},whileTap:{scale:.98},className:`w-full p-4 rounded-xl border transition-all text-left ${r?"bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-white shadow-lg":"bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"}`,children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(a,{className:"w-5 h-5 text-green-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium",children:t.label}),e.jsx("p",{className:"text-sm text-white/60",children:t.description})]})]})},t.id)})}),e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("input",{type:"checkbox",id:"includeMetadata",checked:N,onChange:t=>te(t.target.checked),className:"w-4 h-4 text-primary-500 bg-white/10 border-white/20 rounded focus:ring-primary-500"}),e.jsx("label",{htmlFor:"includeMetadata",className:"text-white/80 text-sm",children:"Include export metadata (date, user, record count)"})]})})]})]}),e.jsx(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"text-center",children:e.jsx("div",{className:"bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-lg",children:e.jsxs("div",{className:"max-w-md mx-auto text-center",children:[e.jsxs("h3",{className:"text-2xl font-semibold text-white mb-4",children:["Ready to Export ",ne(o),"?"]}),e.jsxs("p",{className:"text-white/70 mb-6",children:["Export ",e.jsx("span",{className:"text-green-400 font-semibold",children:ie(o).toLocaleString()})," records in ",s.toUpperCase()," format"]}),e.jsx(d.button,{onClick:()=>se(o),disabled:l[`${o}_${s}`]==="loading",whileHover:{scale:1.05},whileTap:{scale:.95},className:`px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center mx-auto shadow-lg ${l[`${o}_${s}`]==="loading"?"bg-gradient-to-r from-blue-500 to-indigo-500 text-white cursor-wait":l[`${o}_${s}`]==="success"?"bg-gradient-to-r from-green-500 to-emerald-500 text-white":l[`${o}_${s}`]==="error"?"bg-gradient-to-r from-red-500 to-rose-500 text-white":"bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-500/25"}`,children:l[`${o}_${s}`]==="loading"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"}),"Exporting..."]}):l[`${o}_${s}`]==="success"?e.jsxs(e.Fragment,{children:[e.jsx(me,{className:"w-5 h-5 mr-3"}),"Export Complete!"]}):l[`${o}_${s}`]==="error"?e.jsxs(e.Fragment,{children:[e.jsx(ue,{className:"w-5 h-5 mr-3"}),"Retry Export"]}):e.jsxs(e.Fragment,{children:[e.jsx(J,{className:"w-5 h-5 mr-3"}),"Start Export"]})})]})})}),e.jsx(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e.jsxs("div",{className:"bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-lg",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(xe,{className:"w-5 h-5 mr-2 text-green-400"}),"Export Guide"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/70",children:[e.jsxs("div",{children:[e.jsxs("h4",{className:"font-medium text-white mb-2 flex items-center",children:[e.jsx(w,{className:"w-4 h-4 mr-2 text-blue-400"}),"JSON Format"]}),e.jsx("p",{children:"Structured data format perfect for developers, APIs, and data backup. Preserves all data types and relationships."})]}),e.jsxs("div",{children:[e.jsxs("h4",{className:"font-medium text-white mb-2 flex items-center",children:[e.jsx(ee,{className:"w-4 h-4 mr-2 text-green-400"}),"CSV Format"]}),e.jsx("p",{children:"Spreadsheet-compatible format ideal for data analysis, Excel, Google Sheets, and business intelligence tools."})]}),e.jsxs("div",{children:[e.jsxs("h4",{className:"font-medium text-white mb-2 flex items-center",children:[e.jsx(w,{className:"w-4 h-4 mr-2 text-purple-400"}),"Text Format"]}),e.jsx("p",{children:"Human-readable format perfect for reports, documentation, and sharing insights with stakeholders."})]})]})]})})]})})]});function ne(t){return D.find(a=>a.id===t)?.label||"Data"}function ie(t){return D.find(a=>a.id===t)?.count||0}},p=({icon:b,title:l,value:y,color:o,subValue:v,trend:s,bgGradient:O})=>e.jsxs(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:`${O||"bg-gradient-to-br from-slate-800/50 to-slate-900/50"} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:`p-3 rounded-xl ${o} backdrop-blur-sm`,children:e.jsx(b,{className:"w-8 h-8 text-white drop-shadow-lg"})}),s&&e.jsxs("div",{className:`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${s.isPositive?"bg-green-500/20 text-green-400":"bg-red-500/20 text-red-400"}`,children:[s.isPositive?"↗":"↘"," ",Math.abs(s.value),"%"]})]}),e.jsx("h3",{className:"text-3xl font-bold text-white mb-2 tracking-tight",children:y}),e.jsx("p",{className:"text-white/70 text-sm font-medium",children:l}),v&&e.jsx("p",{className:"text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1",children:v})]});export{Le as default};
