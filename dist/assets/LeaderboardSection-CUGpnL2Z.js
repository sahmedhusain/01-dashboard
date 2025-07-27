import{r as g,j as e,m as n,A as me}from"./animation-vendor-BWQ_wUI_.js";import{C as Q}from"./Card-boLi8-L0.js";import{L as ge,S as ue,f as w,b as pe,A as je,g as be,e as fe}from"./index-DMnkRdXi.js";import{T as E,I as we,e as V,Z as ve,n as Y,r as Ne,J as ye,K as Ce,N as Ae,O as Re,A as Se,Q as Pe,V as Ge}from"./ui-vendor-9qjsAl_q.js";import{d as p,e as j}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const Ue=j`
  query GetAllUsersLeaderboard {
    user_public_view {
      id
      login
      firstName
      lastName
      profile
    }
  }
`,ke=j`
  query GetUserStatistics {
    user {
      id
      login
      firstName
      lastName
      auditRatio
      totalUp
      totalDown
      createdAt
      updatedAt
      attrs
      profile
    }
  }
`,_e=j`
  query GetProgressLeaderboard {
    progress(order_by: { grade: desc }) {
      id
      userId
      grade
      isDone
      path
      createdAt
      updatedAt
    }
    
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
`,Le=j`
  query GetCohortData {
    event {
      id
      path
      createdAt
      objectId
    }
    event_user {
      eventId
      userId
      level
      createdAt
    }
  }
`,Ie=j`
  query GetGroupSearchData {
    group {
      id
      objectId
      eventId
      captainId
      status
      path
      createdAt
    }
    group_user {
      groupId
      userId
      createdAt
    }
    object {
      id
      name
      type
    }
  }
`,Ee=j`
  query GetLeaderboardStats {
    user_aggregate {
      aggregate {
        count
        avg {
          auditRatio
          totalUp
        }
        max {
          auditRatio
          totalUp
        }
      }
    }

    progress_aggregate {
      aggregate {
        count
        avg {
          grade
        }
      }
    }

    transaction_aggregate(where: { type: { _eq: "xp" } }) {
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
`,He=({user:v})=>{const[i,y]=g.useState("xp"),[b,Z]=g.useState(""),[d,T]=g.useState("all"),[h,F]=g.useState("global"),[C,J]=g.useState(!1),[A,W]=g.useState(""),[R,ee]=g.useState("all"),{data:$,loading:S,error:O}=p(Ue,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:te,loading:Te}=p(ke,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:D,loading:se}=p(_e,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:ae,loading:re}=p(Ee,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:X,loading:ie}=p(Le,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:P,loading:oe}=p(Ie,{errorPolicy:"all",fetchPolicy:"cache-first"}),le=$?.user_public_view||[];te?.user?.[0];const M=D?.progress||[];D?.progress_aggregate;const x=ae||{},N=X?.event||[],G=X?.event_user||[],q=P?.group||[],ce=P?.group_user||[],H=P?.object||[],c=le.map(t=>({...t,auditRatio:0,totalUp:0,totalDown:0,createdAt:null,updatedAt:null,attrs:{}})),U=g.useMemo(()=>{const t={};return N.forEach(s=>{const r=s.path?.includes("cohort-1")?"cohort1":s.path?.includes("cohort-2")?"cohort2":s.path?.includes("cohort-3")?"cohort3":"unknown";if(r!=="unknown"){const o=G.filter(l=>l.eventId===s.id).map(l=>l.userId),m=c.filter(l=>o.includes(l.id));t[r]={cohort:r,memberCount:m.length,avgXP:m.reduce((l,I)=>l+(I.totalUp||0),0)/m.length||0,avgAuditRatio:m.reduce((l,I)=>l+(I.auditRatio||0),0)/m.length||0}}}),t},[N,G,c]),k=t=>{const s=G.filter(r=>r.userId===t);for(const r of s){const a=N.find(o=>o.id===r.eventId);if(a?.path?.includes("cohort-1"))return"cohort1";if(a?.path?.includes("cohort-2"))return"cohort2";if(a?.path?.includes("cohort-3"))return"cohort3"}return"unknown"};if(S&&!$)return e.jsx(ge,{});if(O)return e.jsx(Q,{className:"p-6",children:e.jsxs("div",{className:"text-center text-red-400",children:[e.jsx("p",{children:"Error loading leaderboard data"}),e.jsx("p",{className:"text-sm text-white/60 mt-2",children:O?.message})]})});const K=x.user_aggregate?.aggregate?.count||c.length,ne=x.user_aggregate?.aggregate?.avg?.auditRatio||0;x.user_aggregate?.aggregate?.avg?.totalUp,x.user_aggregate?.aggregate?.max?.totalUp;const de=x.progress_aggregate?.aggregate?.count||0;x.progress_aggregate?.aggregate?.avg?.grade,x.transaction_aggregate?.aggregate?.count;const he=x.transaction_aggregate?.aggregate?.sum?.amount||0,_=()=>{let t=[];switch(i){case"xp":case"cohort-xp":t=c.slice().sort((r,a)=>(a.totalUp||0)-(r.totalUp||0));break;case"audit":case"cohort-audit":t=c.slice().sort((r,a)=>(a.auditRatio||0)-(r.auditRatio||0));break;case"progress":const s=new Map;M.forEach(r=>{const a=r.userId;if(!s.has(a)){const m=c.find(l=>l.id===a);m&&s.set(a,{...m,progressCount:0,totalGrade:0,maxGrade:0,avgGrade:0})}const o=s.get(a);o&&(o.progressCount++,o.totalGrade+=r.grade||0,o.maxGrade=Math.max(o.maxGrade,r.grade||0),o.avgGrade=o.totalGrade/o.progressCount)}),t=Array.from(s.values()).sort((r,a)=>a.avgGrade-r.avgGrade);break;case"overall":t=c.slice().sort((r,a)=>(a.totalUp||0)-(r.totalUp||0)).slice(0,20);break;default:t=c.slice().sort((r,a)=>(a.totalUp||0)-(r.totalUp||0))}return d!=="all"&&(t=t.filter(s=>k(s.id)===d)),t},f=()=>{let t=_();if(b&&(t=t.filter(s=>s.login?.toLowerCase().includes(b.toLowerCase())||s.firstName?.toLowerCase().includes(b.toLowerCase())||s.lastName?.toLowerCase().includes(b.toLowerCase()))),R!=="all"&&i==="progress"){const s=parseInt(R);t=t.filter(r=>(r.avgGrade||0)>=s)}return t},u=Object.keys(U).filter(t=>U[t].memberCount>0),B=()=>{let t=q;if(d!=="all"&&(t=t.filter(s=>N.find(a=>a.id===s.eventId)?.path?.includes(d.replace("cohort","cohort-")))),A){const r=H.filter(a=>a.name?.toLowerCase().includes(A.toLowerCase())).map(a=>a.id);t=t.filter(a=>r.includes(a.objectId))}return t},L=(()=>{const s=_().findIndex(r=>r.id===v.id);return s>=0?s+1:null})(),z=t=>{switch(t){case 1:return e.jsx(Ge,{className:"w-5 h-5 text-yellow-400"});case 2:return e.jsx(Pe,{className:"w-5 h-5 text-gray-300"});case 3:return e.jsx(Se,{className:"w-5 h-5 text-amber-600"});default:return e.jsxs("span",{className:"text-white/60 font-bold",children:["#",t]})}},xe=t=>{switch(t){case 1:return"bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";case 2:return"bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";case 3:return"bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30";default:return"bg-white/5 border-white/10"}};return e.jsxs("div",{className:"space-y-6",children:[e.jsx(ue,{title:"Advanced Leaderboard System",subtitle:`Complete rankings across ${K} users • ${u.length} active cohorts • ${q.length} project groups`,icon:E}),u.length>0&&e.jsx(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.05},className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",children:u.map(t=>{const s=U[t];return e.jsxs("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("h3",{className:"text-white font-semibold capitalize",children:t.replace("cohort","Cohort ")}),e.jsx(we,{className:"w-5 h-5 text-blue-400"})]}),e.jsxs("div",{className:"space-y-1 text-sm",children:[e.jsxs("div",{className:"flex justify-between text-white/70",children:[e.jsx("span",{children:"Members:"}),e.jsx("span",{className:"text-white font-medium",children:s.memberCount})]}),e.jsxs("div",{className:"flex justify-between text-white/70",children:[e.jsx("span",{children:"Avg XP:"}),e.jsx("span",{className:"text-white font-medium",children:w(s.avgXP)})]}),e.jsxs("div",{className:"flex justify-between text-white/70",children:[e.jsx("span",{children:"Avg Audit:"}),e.jsx("span",{className:"text-white font-medium",children:s.avgAuditRatio.toFixed(2)})]})]})]},t)})}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(V,{className:"w-8 h-8 text-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total Users"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:K})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(ve,{className:"w-8 h-8 text-green-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total XP"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:w(he)})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(Y,{className:"w-8 h-8 text-purple-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Avg Audit Ratio"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:ne.toFixed(2)})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(Ne,{className:"w-8 h-8 text-orange-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Progress Records"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:de})]})]})})]}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"space-y-4",children:[e.jsx("div",{className:"flex justify-center",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("button",{onClick:()=>F("global"),className:`px-4 py-2 rounded-md transition-all ${h==="global"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:"🌍 Global Rankings"}),e.jsx("button",{onClick:()=>F("cohort"),className:`px-4 py-2 rounded-md transition-all ${h==="cohort"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:"👥 Cohort Rankings"})]})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-2",children:[e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("h4",{className:"text-white/60 text-xs font-medium px-2 mb-1",children:"XP RANKINGS"}),e.jsxs("button",{onClick:()=>y(h==="cohort"?"cohort-xp":"xp"),className:`w-full px-3 py-2 rounded-md transition-all text-sm ${i==="xp"||i==="cohort-xp"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["🚀 XP Projects (",c.length,")"]})]}),e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("h4",{className:"text-white/60 text-xs font-medium px-2 mb-1",children:"AUDIT RANKINGS"}),e.jsxs("button",{onClick:()=>y(h==="cohort"?"cohort-audit":"audit"),className:`w-full px-3 py-2 rounded-md transition-all text-sm ${i==="audit"||i==="cohort-audit"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["⚖️ Audit Ratio (",c.length,")"]})]}),e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("h4",{className:"text-white/60 text-xs font-medium px-2 mb-1",children:"OTHER RANKINGS"}),e.jsxs("button",{onClick:()=>y("progress"),className:`w-full px-3 py-2 rounded-md transition-all text-sm ${i==="progress"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["📈 Progress (",M.length,")"]})]})]})]}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"space-y-4",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(ye,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search users by login, name...",value:b,onChange:t=>Z(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[u.length>0&&e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(Ce,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:d,onChange:t=>T(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Cohorts"}),u.map(t=>e.jsx("option",{value:t,children:t.replace("cohort","Cohort ")},t))]})]}),i==="progress"&&e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(Y,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:R,onChange:t=>ee(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Levels"}),e.jsx("option",{value:"50",children:"50%+ Grade"}),e.jsx("option",{value:"75",children:"75%+ Grade"}),e.jsx("option",{value:"90",children:"90%+ Grade"})]})]})]})]}),e.jsx("div",{className:"flex justify-center",children:e.jsxs("button",{onClick:()=>J(!C),className:"flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all",children:[e.jsx(Ae,{className:"w-4 h-4"}),e.jsx("span",{children:"Group Search"}),e.jsx(Re,{className:`w-4 h-4 transition-transform ${C?"rotate-180":""}`})]})}),e.jsx(me,{children:C&&e.jsxs(n.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.3},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(V,{className:"w-5 h-5 mr-2 text-primary-400"}),"Group Search"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-white/70 text-sm font-medium mb-2",children:"Select Cohort"}),e.jsxs("select",{value:d,onChange:t=>T(t.target.value),className:"w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Cohorts"}),u.map(t=>e.jsx("option",{value:t,children:t.replace("cohort","Cohort ")},t))]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-white/70 text-sm font-medium mb-2",children:"Project Name"}),e.jsx("input",{type:"text",placeholder:"Search project paths...",value:A,onChange:t=>W(t.target.value),className:"w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]})]}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("h4",{className:"text-white/80 font-medium mb-2",children:["Found ",B().length," groups"]}),e.jsx("div",{className:"max-h-40 overflow-y-auto space-y-2",children:B().slice(0,10).map(t=>{const s=ce.filter(a=>a.groupId===t.id).length,r=H.find(a=>a.id===t.objectId);return e.jsx("div",{className:"bg-white/5 rounded-lg p-3 border border-white/10",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:r?.name||`Group ${t.id}`}),e.jsxs("p",{className:"text-white/60 text-sm",children:[s," members • ",t.status]})]}),e.jsx("div",{className:"text-white/60 text-sm",children:pe(t.createdAt)})]})},t.id)})})]})]})})]}),L&&e.jsx(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e.jsx(Q,{className:"p-4 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"mr-3",children:z(L)}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Your Position"}),e.jsxs("p",{className:"text-white/60 text-sm",children:[(i==="xp"||i==="cohort-xp")&&`${w(v.totalUp||0)} XP`,(i==="audit"||i==="cohort-audit")&&`${(v.auditRatio||0).toFixed(2)} audit ratio`,i==="progress"&&"Progress leader"]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("p",{className:"text-2xl font-bold text-primary-400",children:["#",L]}),e.jsxs("p",{className:"text-white/60 text-sm",children:["of ",_().length]})]})]})})}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(E,{className:"w-5 h-5 mr-2 text-primary-400"}),(i==="xp"||i==="cohort-xp")&&`${h==="cohort"?"Cohort ":""}XP Projects Ranking`,(i==="audit"||i==="cohort-audit")&&`${h==="cohort"?"Cohort ":""}Audit Ratio Ranking`,i==="progress"&&"Progress Leaders Ranking",i==="overall"&&"Overall Top Performers",d!=="all"&&` - ${d.replace("cohort","Cohort ")}`,e.jsxs("span",{className:"ml-2 text-primary-400",children:["(",f().length,")"]})]}),e.jsxs("div",{className:"space-y-2 max-h-96 overflow-y-auto",children:[f().slice(0,50).map((t,s)=>{const r=s+1,a=t.id===v.id;return e.jsxs(n.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:s*.02},className:`flex items-center justify-between p-3 rounded-lg border transition-all ${a?"bg-primary-500/20 border-primary-500/30":xe(r)}`,children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"flex items-center justify-center w-8 h-8",children:z(r)}),e.jsx(je,{user:t,size:"sm",className:"w-8 h-8"}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("h4",{className:"text-white font-medium",children:t.login}),a&&e.jsx("span",{className:"px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs",children:"You"})]}),e.jsxs("div",{className:"flex items-center space-x-4 text-xs text-white/60",children:[e.jsxs("span",{children:[t.firstName," ",t.lastName]}),e.jsx("span",{children:be(fe(t.attrs||{}).cohort||"module")}),i==="progress"&&t.progressCount&&e.jsxs("span",{children:["Progress: ",t.progressCount]})]})]})]}),e.jsxs("div",{className:"text-right",children:[(i==="xp"||i==="cohort-xp")&&e.jsxs("div",{children:[e.jsx("div",{className:"text-lg font-bold text-white",children:w(t.totalUp||0)}),e.jsx("div",{className:"text-xs text-white/60",children:"XP"}),h==="cohort"&&e.jsx("div",{className:"text-xs text-blue-400",children:k(t.id).replace("cohort","C")})]}),(i==="audit"||i==="cohort-audit")&&e.jsxs("div",{children:[e.jsx("div",{className:"text-lg font-bold text-white",children:(t.auditRatio||0).toFixed(2)}),e.jsx("div",{className:"text-xs text-white/60",children:"Audit Ratio"}),h==="cohort"&&e.jsx("div",{className:"text-xs text-blue-400",children:k(t.id).replace("cohort","C")})]}),i==="progress"&&e.jsxs("div",{children:[e.jsxs("div",{className:"text-lg font-bold text-white",children:[t.avgGrade?.toFixed(1)||"0.0","%"]}),e.jsx("div",{className:"text-xs text-white/60",children:"Avg Grade"}),e.jsxs("div",{className:"text-xs text-green-400",children:[t.progressCount||0," projects"]})]}),i==="overall"&&e.jsxs("div",{children:[e.jsx("div",{className:"text-lg font-bold text-white",children:w(t.totalUp||0)}),e.jsxs("div",{className:"text-xs text-white/60",children:[(t.auditRatio||0).toFixed(2)," ratio"]})]})]})]},t.id)}),f().length>50&&e.jsx("div",{className:"text-center py-4",children:e.jsxs("p",{className:"text-white/60 text-sm",children:["Showing 50 of ",f().length," users"]})})]})]}),(S||se||re||ie||oe)&&e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-white/70",children:"Loading comprehensive leaderboard data..."})]})}),f().length===0&&!S&&e.jsxs(n.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(E,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No users found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})};export{He as default};
