import{r as R,j as e,m as D}from"./animation-vendor-CTGg7XC5.js";import{G as T,L as E,C as f}from"./index-5epzrz73.js";import{u as S,k as C,A as $,d as A,v as I,D as v,e as b}from"./ui-vendor-g4Irxhbg.js";import{u as y,d as P}from"./apollo-vendor-CuB5uN0C.js";import"./react-vendor-Csw2ODfV.js";const L=(t,a)=>{const o={exportDate:new Date().toISOString(),user:{login:t.user.login,firstName:t.user.firstName,lastName:t.user.lastName,campus:t.user.campus,auditRatio:t.user.auditRatio,totalUp:t.user.totalUp,totalDown:t.user.totalDown,createdAt:t.user.createdAt},xpData:t.xpData,auditData:t.auditData,progressData:t.progressData,statsData:t.statsData},i=JSON.stringify(o,null,2),s=new Blob([i],{type:"application/json"}),c=URL.createObjectURL(s),n=document.createElement("a");n.href=c,n.download=a||`${t.user.login}_profile_data_${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(c)},N=(t,a,o)=>{if(!t||t.length===0){console.warn("No data to export");return}const i=[o.join(","),...t.map(d=>o.map(x=>{const p=F(d,x);return typeof p=="string"&&(p.includes(",")||p.includes('"'))?`"${p.replace(/"/g,'""')}"`:p||""}).join(","))].join(`
`),s=new Blob([i],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(s),n=document.createElement("a");n.href=c,n.download=a,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(c)},U=(t,a)=>{const o=["date","project","xp_amount","path","type"],i=t.map(s=>({date:new Date(s.createdAt).toLocaleDateString(),project:s.object?.name||"Unknown",xp_amount:s.amount,path:s.path,type:s.type}));N(i,`${a}_xp_data.csv`,o)},_=(t,a)=>{const o=["date","project","grade","status","team_members"],i=t.map(s=>({date:new Date(s.createdAt).toLocaleDateString(),project:s.group?.object?.name||"Unknown",grade:s.grade,status:s.grade>=1?"PASS":"FAIL",team_members:s.group?.group_users?.map(c=>c.user.login).join("; ")||""}));N(i,`${a}_audit_data.csv`,o)},k=(t,a)=>{const o=["date","project","grade","status","path","type"],i=t.map(s=>({date:new Date(s.createdAt).toLocaleDateString(),project:s.object?.name||"Unknown",grade:s.grade||"N/A",status:s.isDone?s.grade>=1?"PASSED":"FAILED":"IN PROGRESS",path:s.path,type:s.object?.type||"Unknown"}));N(i,`${a}_progress_data.csv`,o)},O=t=>{const{user:a,xpData:o,auditData:i,progressData:s}=t,c=o?.reduce((l,m)=>l+(m.amount||0),0)||0,n=s?.filter(l=>l.isDone&&l.grade>=1).length||0,d=s?.filter(l=>l.isDone&&l.grade<1).length||0,x=s?.filter(l=>!l.isDone).length||0,p=n+d>0?(n/(n+d)*100).toFixed(1):"0.0",g=`
STUDENT PROFILE REPORT
Generated: ${new Date().toLocaleString()}

=== BASIC INFORMATION ===
Name: ${a.firstName} ${a.lastName}
Login: ${a.login}
Campus: ${a.campus}
Join Date: ${new Date(a.createdAt).toLocaleDateString()}

=== XP STATISTICS ===
Total XP: ${Math.round(c/1e3)}kB
Total Transactions: ${o?.length||0}
Average XP per Project: ${o?.length>0?Math.round(c/o.length/1e3):0}kB
Current Level: ${Math.floor(c/1e3)}

=== PROJECT STATISTICS ===
Projects Completed: ${n}
Projects Failed: ${d}
Projects In Progress: ${x}
Success Rate: ${p}%

=== AUDIT STATISTICS ===
Audit Ratio: ${a.auditRatio?.toFixed(2)||"0.00"}
Audits Given: ${a.totalUp||0}
Audits Received: ${a.totalDown||0}
Total Audits: ${i?.length||0}

=== PERFORMANCE INSIGHTS ===
${G(a,c,n,p)}

---
This report was generated from the reboot01 Student Dashboard.
  `.trim(),w=new Blob([g],{type:"text/plain;charset=utf-8;"}),j=URL.createObjectURL(w),r=document.createElement("a");r.href=j,r.download=`${a.login}_profile_report_${new Date().toISOString().split("T")[0]}.txt`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(j)},F=(t,a)=>a.split(".").reduce((o,i)=>o?.[i],t),G=(t,a,o,i)=>{const s=[];return t.auditRatio>=1.5?s.push("• Excellent audit ratio - you are actively contributing to peer reviews"):t.auditRatio<1&&s.push("• Consider participating in more peer reviews to improve your audit ratio"),a>5e4?s.push("• High XP achiever - great progress through the curriculum"):a<1e4&&s.push("• Early in your journey - keep pushing forward!"),parseFloat(i)>80?s.push("• Excellent success rate - you are mastering the projects well"):parseFloat(i)<60&&s.push("• Focus on understanding project requirements to improve success rate"),o>20&&s.push("• Experienced student with many completed projects"),s.length>0?s.join(`
`):"• Keep up the great work on your coding journey!"},M=({user:t})=>{const[a,o]=R.useState({}),{data:i,loading:s}=y(P`
    query GetUserXPTransactions($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
        }
        order_by: { createdAt: desc }
      ) {
        id
        amount
        path
        createdAt
        object {
          name
          type
        }
      }
    }
  `,{variables:{userId:t.id},errorPolicy:"all"}),{data:c,loading:n}=y(P`
    query GetUserAudits($userId: Int!) {
      audit(
        where: { auditorId: { _eq: $userId } }
        order_by: { createdAt: desc }
      ) {
        id
        grade
        createdAt
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
  `,{variables:{userId:t.id},errorPolicy:"all"}),{data:d,loading:x}=y(T,{variables:{userId:t.id},errorPolicy:"all"}),p=s||n||x,g=(r,l)=>{o(m=>({...m,[r]:l})),l==="success"&&setTimeout(()=>{o(m=>({...m,[r]:"idle"}))},3e3)},w=async(r,l)=>{g(r,"loading");try{await l(),g(r,"success")}catch(m){console.error(`Export failed for ${r}:`,m),g(r,"error")}},j=[{id:"complete-json",title:"Complete Profile Data",description:"Export all your profile data in JSON format",icon:S,color:"bg-blue-500/20 text-blue-400 border-blue-500/30",action:()=>L({user:t,xpData:i?.transaction,auditData:c?.audit,progressData:d?.progress})},{id:"xp-csv",title:"XP Transactions",description:"Export XP history as CSV spreadsheet",icon:C,color:"bg-green-500/20 text-green-400 border-green-500/30",action:()=>U(i?.transaction||[],t.login),disabled:!i?.transaction?.length},{id:"audit-csv",title:"Audit History",description:"Export audit records as CSV spreadsheet",icon:$,color:"bg-purple-500/20 text-purple-400 border-purple-500/30",action:()=>_(c?.audit||[],t.login),disabled:!c?.audit?.length},{id:"progress-csv",title:"Project Progress",description:"Export project completion data as CSV",icon:A,color:"bg-orange-500/20 text-orange-400 border-orange-500/30",action:()=>k(d?.progress||[],t.login),disabled:!d?.progress?.length},{id:"stats-report",title:"Performance Report",description:"Generate comprehensive text report",icon:I,color:"bg-teal-500/20 text-teal-400 border-teal-500/30",action:()=>O({user:t,xpData:i?.transaction,auditData:c?.audit,progressData:d?.progress})}];return p?e.jsx(E,{}):e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsxs("h2",{className:"text-2xl font-bold text-white flex items-center",children:[e.jsx(v,{className:"w-6 h-6 mr-2 text-primary-400"}),"Export Data"]})}),e.jsx(f,{className:"p-6",children:e.jsxs("div",{className:"flex items-start space-x-4",children:[e.jsx("div",{className:"w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0",children:e.jsx(S,{className:"w-6 h-6 text-primary-400"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-2",children:"Data Export Options"}),e.jsx("p",{className:"text-white/70 mb-4",children:"Export your profile data in various formats for backup, analysis, or sharing. All exports include only your personal data and maintain privacy standards."}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{className:"flex items-center text-white/60",children:[e.jsx(b,{className:"w-4 h-4 mr-2 text-green-400"}),"Privacy Protected"]}),e.jsxs("div",{className:"flex items-center text-white/60",children:[e.jsx(b,{className:"w-4 h-4 mr-2 text-green-400"}),"Multiple Formats"]}),e.jsxs("div",{className:"flex items-center text-white/60",children:[e.jsx(b,{className:"w-4 h-4 mr-2 text-green-400"}),"Instant Download"]})]})]})]})}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:j.map((r,l)=>{const m=r.icon,h=a[r.id]||"idle",u=r.disabled||p;return e.jsx(D.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:l*.1},children:e.jsx(f,{className:`p-6 border transition-all ${u?"opacity-50 cursor-not-allowed":"hover:border-white/30 cursor-pointer"} ${r.color}`,children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex items-start space-x-4 flex-1",children:[e.jsx("div",{className:"w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0",children:e.jsx(m,{className:"w-6 h-6"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-2",children:r.title}),e.jsx("p",{className:"text-white/70 text-sm mb-4",children:r.description}),r.id==="xp-csv"&&e.jsxs("p",{className:"text-xs text-white/50",children:[i?.transaction?.length||0," XP transactions available"]}),r.id==="audit-csv"&&e.jsxs("p",{className:"text-xs text-white/50",children:[c?.audit?.length||0," audit records available"]}),r.id==="progress-csv"&&e.jsxs("p",{className:"text-xs text-white/50",children:[d?.progress?.length||0," progress entries available"]})]})]}),e.jsx(D.button,{onClick:()=>!u&&w(r.id,r.action),disabled:u,whileHover:u?{}:{scale:1.05},whileTap:u?{}:{scale:.95},className:`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${u?"bg-white/10 text-white/50 cursor-not-allowed":h==="loading"?"bg-primary-500 text-white cursor-wait":h==="success"?"bg-green-500 text-white":h==="error"?"bg-red-500 text-white":"bg-white/20 text-white hover:bg-white/30"}`,children:h==="loading"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"}),"Exporting..."]}):h==="success"?e.jsxs(e.Fragment,{children:[e.jsx(b,{className:"w-4 h-4 mr-2"}),"Downloaded!"]}):h==="error"?e.jsxs(e.Fragment,{children:[e.jsx(v,{className:"w-4 h-4 mr-2"}),"Retry"]}):e.jsxs(e.Fragment,{children:[e.jsx(v,{className:"w-4 h-4 mr-2"}),"Export"]})})]})})},r.id)})}),e.jsxs(f,{className:"p-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-4",children:"Export Tips"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium text-white mb-2",children:"JSON Format"}),e.jsx("p",{children:"Best for developers and complete data backup. Can be imported into other tools."})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium text-white mb-2",children:"CSV Format"}),e.jsx("p",{children:"Perfect for spreadsheet analysis in Excel, Google Sheets, or data visualization tools."})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium text-white mb-2",children:"Text Report"}),e.jsx("p",{children:"Human-readable summary with insights and statistics. Great for sharing achievements."})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium text-white mb-2",children:"Privacy Note"}),e.jsx("p",{children:"All exports contain only your personal data. No sensitive information is included."})]})]})]})]})};export{M as default};
