import{r as S,j as e,m}from"./animation-vendor-BWQ_wUI_.js";import{C as p}from"./Card-boLi8-L0.js";import{L as ne}from"./index-DMnkRdXi.js";import{i as g,d as ie,e as l}from"./apollo-vendor-8AJvV5pX.js";import{W as A,e as P,f as ce,r as M,n as Q,A as le,q as de,F as y,t as V,g as xe,R as me,D as pe,B as ge}from"./ui-vendor-9qjsAl_q.js";import"./react-vendor-DJG_os-6.js";const ue=l`
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
`,he=l`
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
`,be=l`
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
`,je=l`
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
`,ye=l`
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
`,we=l`
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
`,fe=l`
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
`,Ne=l`
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
`,Te=({user:C})=>{const[u,D]=S.useState({}),[n,z]=S.useState("users"),[r,K]=S.useState("json"),[w,W]=S.useState(!0),[I]=g(ue,{errorPolicy:"all"}),[G]=g(he,{errorPolicy:"all"}),[k]=g(be,{errorPolicy:"all"}),[U]=g(je,{errorPolicy:"all"}),[F]=g(ye,{errorPolicy:"all"}),[q]=g(we,{errorPolicy:"all"}),[X]=g(fe,{errorPolicy:"all"}),[B]=g(Ne,{errorPolicy:"all"}),{data:Y,loading:Z}=ie(l`
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
  `,{errorPolicy:"all",fetchPolicy:"cache-first"});if(Z)return e.jsx(ne,{});const d=Y||{},f=d.user_aggregate?.aggregate?.count||0,N=d.object_aggregate?.aggregate?.count||0,T=d.event_aggregate?.aggregate?.count||0,$=d.group_aggregate?.aggregate?.count||0,v=d.transaction_aggregate?.aggregate?.count||0,E=d.progress_aggregate?.aggregate?.count||0,L=d.audit_aggregate?.aggregate?.count||0,O=d.result_aggregate?.aggregate?.count||0,_=(t,a)=>{D(s=>({...s,[t]:a})),a==="success"&&setTimeout(()=>{D(s=>({...s,[t]:"idle"}))},3e3)},H=(t,a,s)=>{const h=new Blob([t],{type:s}),c=URL.createObjectURL(h),o=document.createElement("a");o.href=c,o.download=a,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(c)},J=(t,a,s)=>{const h=new Date().toISOString().split("T")[0],c=`${a}_export_${h}`;if(s==="json"){const o={...w&&{metadata:{exportDate:new Date().toISOString(),dataType:a,recordCount:t.length,exportedBy:C.login}},data:t};return{content:JSON.stringify(o,null,2),filename:`${c}.json`,type:"application/json"}}if(s==="csv"){if(t.length===0)return{content:"No data available",filename:`${c}.csv`,type:"text/csv"};const o=Object.keys(t[0]).join(","),b=t.map(j=>Object.values(j).map(x=>typeof x=="string"&&x.includes(",")?`"${x}"`:x).join(","));return{content:[...w?[`# Export Date: ${new Date().toISOString()}`,`# Data Type: ${a}`,`# Record Count: ${t.length}`,`# Exported By: ${C.login}`,""]:[],o,...b].join(`
`),filename:`${c}.csv`,type:"text/csv"}}return s==="txt"?{content:[...w?[`Export Date: ${new Date().toISOString()}`,`Data Type: ${a}`,`Record Count: ${t.length}`,`Exported By: ${C.login}`,"=".repeat(50),""]:[],...t.map((b,i)=>[`Record ${i+1}:`,...Object.entries(b).map(([j,x])=>`  ${j}: ${x}`),""].join(`
`))].join(`
`),filename:`${c}.txt`,type:"text/plain"}:{content:"",filename:"",type:""}},ee=async t=>{const a=`${t}_${r}`;_(a,"loading");try{let s;switch(t){case"users":s=await I();break;case"objects":s=await G();break;case"events":s=await k();break;case"groups":s=await U();break;case"transactions":s=await F();break;case"progress":s=await q();break;case"audits":s=await X();break;case"results":s=await B();break;case"all":const i=await Promise.all([I(),G(),k(),U(),F(),q(),X(),B()]),j={users:i[0]?.data?.user||[],objects:i[1]?.data?.object||[],events:i[2]?.data?.event||[],groups:i[3]?.data?.group||[],transactions:i[4]?.data?.transaction||[],progress:i[5]?.data?.progress||[],audits:i[6]?.data?.audit||[],results:i[7]?.data?.result||[]},{content:x,filename:re,type:oe}=J([j],"all",r);H(x,re,oe),_(a,"success");return;default:throw new Error("Invalid data type")}if(s?.error)throw s.error;const h=s?.data?.[t]||[],{content:c,filename:o,type:b}=J(h,t,r);H(c,o,b),_(a,"success")}catch(s){console.error("Export error:",s),_(a,"error")}},R=[{id:"users",label:"Users",icon:P,count:f,description:"All platform users with profiles and statistics"},{id:"objects",label:"Learning Objects",icon:A,count:N,description:"Curriculum objects, projects, and learning materials"},{id:"events",label:"Events",icon:ce,count:T,description:"Platform events and activities"},{id:"groups",label:"Groups",icon:P,count:$,description:"User groups and team formations"},{id:"transactions",label:"Transactions",icon:M,count:v,description:"All platform transactions including XP, up/down votes"},{id:"progress",label:"Progress",icon:Q,count:E,description:"User learning progress and completion records"},{id:"audits",label:"Audits",icon:le,count:L,description:"Peer review and audit records"},{id:"results",label:"Results",icon:de,count:O,description:"Assessment results and grades"},{id:"all",label:"Complete Dataset",icon:A,count:f+N+T+$+v+E+L+O,description:"Export all data types in a single file"}],te=[{id:"json",label:"JSON",icon:y,description:"Structured data format, ideal for developers"},{id:"csv",label:"CSV",icon:V,description:"Spreadsheet format, ideal for analysis"},{id:"txt",label:"Text",icon:y,description:"Human-readable format, ideal for reports"}];return e.jsxs("div",{className:"space-y-6",children:[e.jsxs(m.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Complete Data Export"}),e.jsxs("p",{className:"text-white/70 text-lg",children:["Export any dataset from our ",f+N+T+$+v+E+L+O," total records"]})]}),e.jsxs(m.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsxs(p,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(A,{className:"w-5 h-5 mr-2 text-primary-400"}),"Select Data Type"]}),e.jsx("div",{className:"space-y-3",children:R.map(t=>{const a=t.icon,s=n===t.id;return e.jsx(m.button,{onClick:()=>z(t.id),whileHover:{scale:1.02},whileTap:{scale:.98},className:`w-full p-4 rounded-lg border transition-all text-left ${s?"bg-primary-500/20 border-primary-500/30 text-white":"bg-white/5 border-white/10 text-white/80 hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(a,{className:"w-5 h-5 text-primary-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium",children:t.label}),e.jsx("p",{className:"text-sm text-white/60",children:t.description})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"text-lg font-bold text-primary-400",children:t.count.toLocaleString()}),e.jsx("p",{className:"text-xs text-white/60",children:"records"})]})]})},t.id)})})]}),e.jsxs(p,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(y,{className:"w-5 h-5 mr-2 text-primary-400"}),"Export Format"]}),e.jsx("div",{className:"space-y-3 mb-6",children:te.map(t=>{const a=t.icon,s=r===t.id;return e.jsx(m.button,{onClick:()=>K(t.id),whileHover:{scale:1.02},whileTap:{scale:.98},className:`w-full p-4 rounded-lg border transition-all text-left ${s?"bg-primary-500/20 border-primary-500/30 text-white":"bg-white/5 border-white/10 text-white/80 hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(a,{className:"w-5 h-5 text-primary-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium",children:t.label}),e.jsx("p",{className:"text-sm text-white/60",children:t.description})]})]})},t.id)})}),e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("input",{type:"checkbox",id:"includeMetadata",checked:w,onChange:t=>W(t.target.checked),className:"w-4 h-4 text-primary-500 bg-white/10 border-white/20 rounded focus:ring-primary-500"}),e.jsx("label",{htmlFor:"includeMetadata",className:"text-white/80 text-sm",children:"Include export metadata (date, user, record count)"})]})})]})]}),e.jsx(m.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"text-center",children:e.jsx(p,{className:"p-8",children:e.jsxs("div",{className:"max-w-md mx-auto",children:[e.jsxs("h3",{className:"text-xl font-semibold text-white mb-4",children:["Ready to Export ",se(n),"?"]}),e.jsxs("p",{className:"text-white/70 mb-6",children:["Export ",ae(n)," records in ",r.toUpperCase()," format"]}),e.jsx(m.button,{onClick:()=>ee(n),disabled:u[`${n}_${r}`]==="loading",whileHover:{scale:1.05},whileTap:{scale:.95},className:`px-8 py-4 rounded-lg font-medium transition-all flex items-center justify-center mx-auto ${u[`${n}_${r}`]==="loading"?"bg-primary-500 text-white cursor-wait":u[`${n}_${r}`]==="success"?"bg-green-500 text-white":u[`${n}_${r}`]==="error"?"bg-red-500 text-white":"bg-primary-500 text-white hover:bg-primary-600"}`,children:u[`${n}_${r}`]==="loading"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"}),"Exporting..."]}):u[`${n}_${r}`]==="success"?e.jsxs(e.Fragment,{children:[e.jsx(xe,{className:"w-5 h-5 mr-3"}),"Export Complete!"]}):u[`${n}_${r}`]==="error"?e.jsxs(e.Fragment,{children:[e.jsx(me,{className:"w-5 h-5 mr-3"}),"Retry Export"]}):e.jsxs(e.Fragment,{children:[e.jsx(pe,{className:"w-5 h-5 mr-3"}),"Start Export"]})})]})})}),e.jsxs(m.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[e.jsxs(p,{className:"p-4 text-center",children:[e.jsx(P,{className:"w-8 h-8 text-blue-400 mx-auto mb-2"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:f.toLocaleString()}),e.jsx("p",{className:"text-white/60 text-sm",children:"Users"})]}),e.jsxs(p,{className:"p-4 text-center",children:[e.jsx(A,{className:"w-8 h-8 text-green-400 mx-auto mb-2"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:N.toLocaleString()}),e.jsx("p",{className:"text-white/60 text-sm",children:"Objects"})]}),e.jsxs(p,{className:"p-4 text-center",children:[e.jsx(M,{className:"w-8 h-8 text-purple-400 mx-auto mb-2"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:v.toLocaleString()}),e.jsx("p",{className:"text-white/60 text-sm",children:"Transactions"})]}),e.jsxs(p,{className:"p-4 text-center",children:[e.jsx(Q,{className:"w-8 h-8 text-orange-400 mx-auto mb-2"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:E.toLocaleString()}),e.jsx("p",{className:"text-white/60 text-sm",children:"Progress"})]})]}),e.jsx(m.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e.jsxs(p,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(ge,{className:"w-5 h-5 mr-2 text-primary-400"}),"Export Guide"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/70",children:[e.jsxs("div",{children:[e.jsxs("h4",{className:"font-medium text-white mb-2 flex items-center",children:[e.jsx(y,{className:"w-4 h-4 mr-2 text-blue-400"}),"JSON Format"]}),e.jsx("p",{children:"Structured data format perfect for developers, APIs, and data backup. Preserves all data types and relationships."})]}),e.jsxs("div",{children:[e.jsxs("h4",{className:"font-medium text-white mb-2 flex items-center",children:[e.jsx(V,{className:"w-4 h-4 mr-2 text-green-400"}),"CSV Format"]}),e.jsx("p",{children:"Spreadsheet-compatible format ideal for data analysis, Excel, Google Sheets, and business intelligence tools."})]}),e.jsxs("div",{children:[e.jsxs("h4",{className:"font-medium text-white mb-2 flex items-center",children:[e.jsx(y,{className:"w-4 h-4 mr-2 text-purple-400"}),"Text Format"]}),e.jsx("p",{children:"Human-readable format perfect for reports, documentation, and sharing insights with stakeholders."})]})]})]})})]});function se(t){return R.find(a=>a.id===t)?.label||"Data"}function ae(t){return R.find(a=>a.id===t)?.count||0}};export{Te as default};
