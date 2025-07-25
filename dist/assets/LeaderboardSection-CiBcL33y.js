import{r as g,j as e,m as n,A as me}from"./animation-vendor-BWQ_wUI_.js";import{C as K}from"./Card-7ZsQEDVb.js";import{L as ge,a as f,b as pe,A as ue}from"./index-ChUwEoWz.js";import{v as je,e as Y,Z as be,i as Z,m as we,w as fe,x as ve,F as Ne,y as ye,T as Q,A as Ce,z as Ae,G as Re}from"./ui-vendor-BBc5DWUb.js";import{d as u,e as j}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const Ge=j`
  query GetAllUsersLeaderboard {
    user_public_view {
      id
      login
      firstName
      lastName
      profile
      campus
    }
  }
`,Pe=j`
  query GetUserStatistics {
    user {
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
      attrs
      profile
    }
  }
`,Se=j`
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
`,_e=j`
  query GetCohortData {
    event(where: { campus: { _eq: "bahrain" } }) {
      id
      path
      campus
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
`,Ue=j`
  query GetGroupSearchData {
    group(where: { campus: { _eq: "bahrain" } }) {
      id
      objectId
      eventId
      captainId
      status
      path
      campus
      createdAt
    }
    group_user {
      groupId
      userId
      createdAt
    }
    object(where: { campus: { _eq: "bahrain" } }) {
      id
      name
      type
      campus
    }
  }
`,ke=j`
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
`,Xe=({user:v})=>{const[i,y]=g.useState("xp"),[b,J]=g.useState(""),[d,T]=g.useState("all"),[h,E]=g.useState("global"),[C,V]=g.useState(!1),[A,W]=g.useState(""),[R,ee]=g.useState("all"),{data:F,loading:G,error:O}=u(Ge,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:te,loading:Le}=u(Pe,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:$,loading:se}=u(Se,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:ae,loading:re}=u(ke,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:q,loading:ie}=u(_e,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:P,loading:oe}=u(Ue,{errorPolicy:"all",fetchPolicy:"cache-first"}),le=F?.user_public_view||[];te?.user?.[0];const X=$?.progress||[];$?.progress_aggregate;const x=ae||{},N=q?.event||[],S=q?.event_user||[],D=P?.group||[],ce=P?.group_user||[],M=P?.object||[],c=le.map(t=>({...t,auditRatio:0,totalUp:0,totalDown:0,createdAt:null,updatedAt:null,attrs:{}})).filter(t=>!t.campus||t.campus==="bahrain"),_=g.useMemo(()=>{const t={};return N.forEach(s=>{const r=s.path?.includes("cohort-1")?"cohort1":s.path?.includes("cohort-2")?"cohort2":s.path?.includes("cohort-3")?"cohort3":"unknown";if(r!=="unknown"){const o=S.filter(l=>l.eventId===s.id).map(l=>l.userId),m=c.filter(l=>o.includes(l.id));t[r]={cohort:r,memberCount:m.length,avgXP:m.reduce((l,I)=>l+(I.totalUp||0),0)/m.length||0,avgAuditRatio:m.reduce((l,I)=>l+(I.auditRatio||0),0)/m.length||0}}}),t},[N,S,c]),U=t=>{const s=S.filter(r=>r.userId===t);for(const r of s){const a=N.find(o=>o.id===r.eventId);if(a?.path?.includes("cohort-1"))return"cohort1";if(a?.path?.includes("cohort-2"))return"cohort2";if(a?.path?.includes("cohort-3"))return"cohort3"}return"unknown"};if(G&&!F)return e.jsx(ge,{});if(O)return e.jsx(K,{className:"p-6",children:e.jsxs("div",{className:"text-center text-red-400",children:[e.jsx("p",{children:"Error loading leaderboard data"}),e.jsx("p",{className:"text-sm text-white/60 mt-2",children:O?.message})]})});const H=x.user_aggregate?.aggregate?.count||c.length,ne=x.user_aggregate?.aggregate?.avg?.auditRatio||0;x.user_aggregate?.aggregate?.avg?.totalUp,x.user_aggregate?.aggregate?.max?.totalUp;const de=x.progress_aggregate?.aggregate?.count||0;x.progress_aggregate?.aggregate?.avg?.grade,x.transaction_aggregate?.aggregate?.count;const he=x.transaction_aggregate?.aggregate?.sum?.amount||0,k=()=>{let t=[];switch(i){case"xp":case"cohort-xp":t=c.slice().sort((r,a)=>(a.totalUp||0)-(r.totalUp||0));break;case"audit":case"cohort-audit":t=c.slice().sort((r,a)=>(a.auditRatio||0)-(r.auditRatio||0));break;case"progress":const s=new Map;X.forEach(r=>{const a=r.userId;if(!s.has(a)){const m=c.find(l=>l.id===a);m&&s.set(a,{...m,progressCount:0,totalGrade:0,maxGrade:0,avgGrade:0})}const o=s.get(a);o&&(o.progressCount++,o.totalGrade+=r.grade||0,o.maxGrade=Math.max(o.maxGrade,r.grade||0),o.avgGrade=o.totalGrade/o.progressCount)}),t=Array.from(s.values()).sort((r,a)=>a.avgGrade-r.avgGrade);break;case"overall":t=c.slice().sort((r,a)=>(a.totalUp||0)-(r.totalUp||0)).slice(0,20);break;default:t=c.slice().sort((r,a)=>(a.totalUp||0)-(r.totalUp||0))}return d!=="all"&&(t=t.filter(s=>U(s.id)===d)),t},w=()=>{let t=k();if(b&&(t=t.filter(s=>s.login?.toLowerCase().includes(b.toLowerCase())||s.firstName?.toLowerCase().includes(b.toLowerCase())||s.lastName?.toLowerCase().includes(b.toLowerCase()))),R!=="all"&&i==="progress"){const s=parseInt(R);t=t.filter(r=>(r.avgGrade||0)>=s)}return t},p=Object.keys(_).filter(t=>_[t].memberCount>0),z=()=>{let t=D;if(d!=="all"&&(t=t.filter(s=>N.find(a=>a.id===s.eventId)?.path?.includes(d.replace("cohort","cohort-")))),A){const r=M.filter(a=>a.name?.toLowerCase().includes(A.toLowerCase())).map(a=>a.id);t=t.filter(a=>r.includes(a.objectId))}return t},L=(()=>{const s=k().findIndex(r=>r.id===v.id);return s>=0?s+1:null})(),B=t=>{switch(t){case 1:return e.jsx(Re,{className:"w-5 h-5 text-yellow-400"});case 2:return e.jsx(Ae,{className:"w-5 h-5 text-gray-300"});case 3:return e.jsx(Ce,{className:"w-5 h-5 text-amber-600"});default:return e.jsxs("span",{className:"text-white/60 font-bold",children:["#",t]})}},xe=t=>{switch(t){case 1:return"bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";case 2:return"bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";case 3:return"bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30";default:return"bg-white/5 border-white/10"}};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs(n.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"🏆 Advanced Leaderboard System"}),e.jsxs("p",{className:"text-white/70 text-lg",children:["Comprehensive rankings across ",H," users • ",p.length," active cohorts • ",D.length," project groups"]})]}),p.length>0&&e.jsx(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.05},className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",children:p.map(t=>{const s=_[t];return e.jsxs("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("h3",{className:"text-white font-semibold capitalize",children:t.replace("cohort","Cohort ")}),e.jsx(je,{className:"w-5 h-5 text-blue-400"})]}),e.jsxs("div",{className:"space-y-1 text-sm",children:[e.jsxs("div",{className:"flex justify-between text-white/70",children:[e.jsx("span",{children:"Members:"}),e.jsx("span",{className:"text-white font-medium",children:s.memberCount})]}),e.jsxs("div",{className:"flex justify-between text-white/70",children:[e.jsx("span",{children:"Avg XP:"}),e.jsx("span",{className:"text-white font-medium",children:f(s.avgXP)})]}),e.jsxs("div",{className:"flex justify-between text-white/70",children:[e.jsx("span",{children:"Avg Audit:"}),e.jsx("span",{className:"text-white font-medium",children:s.avgAuditRatio.toFixed(2)})]})]})]},t)})}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(Y,{className:"w-8 h-8 text-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total Users"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:H})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(be,{className:"w-8 h-8 text-green-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total XP"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:f(he)})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(Z,{className:"w-8 h-8 text-purple-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Avg Audit Ratio"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:ne.toFixed(2)})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(we,{className:"w-8 h-8 text-orange-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Progress Records"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:de})]})]})})]}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"space-y-4",children:[e.jsx("div",{className:"flex justify-center",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("button",{onClick:()=>E("global"),className:`px-4 py-2 rounded-md transition-all ${h==="global"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:"🌍 Global Rankings"}),e.jsx("button",{onClick:()=>E("cohort"),className:`px-4 py-2 rounded-md transition-all ${h==="cohort"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:"👥 Cohort Rankings"})]})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-2",children:[e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("h4",{className:"text-white/60 text-xs font-medium px-2 mb-1",children:"XP RANKINGS"}),e.jsxs("button",{onClick:()=>y(h==="cohort"?"cohort-xp":"xp"),className:`w-full px-3 py-2 rounded-md transition-all text-sm ${i==="xp"||i==="cohort-xp"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["🚀 XP Projects (",c.length,")"]})]}),e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("h4",{className:"text-white/60 text-xs font-medium px-2 mb-1",children:"AUDIT RANKINGS"}),e.jsxs("button",{onClick:()=>y(h==="cohort"?"cohort-audit":"audit"),className:`w-full px-3 py-2 rounded-md transition-all text-sm ${i==="audit"||i==="cohort-audit"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["⚖️ Audit Ratio (",c.length,")"]})]}),e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("h4",{className:"text-white/60 text-xs font-medium px-2 mb-1",children:"OTHER RANKINGS"}),e.jsxs("button",{onClick:()=>y("progress"),className:`w-full px-3 py-2 rounded-md transition-all text-sm ${i==="progress"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["📈 Progress (",X.length,")"]})]})]})]}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"space-y-4",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(fe,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search users by login, name...",value:b,onChange:t=>J(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[p.length>0&&e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(ve,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:d,onChange:t=>T(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Cohorts"}),p.map(t=>e.jsx("option",{value:t,children:t.replace("cohort","Cohort ")},t))]})]}),i==="progress"&&e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(Z,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:R,onChange:t=>ee(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Levels"}),e.jsx("option",{value:"50",children:"50%+ Grade"}),e.jsx("option",{value:"75",children:"75%+ Grade"}),e.jsx("option",{value:"90",children:"90%+ Grade"})]})]})]})]}),e.jsx("div",{className:"flex justify-center",children:e.jsxs("button",{onClick:()=>V(!C),className:"flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all",children:[e.jsx(Ne,{className:"w-4 h-4"}),e.jsx("span",{children:"Group Search"}),e.jsx(ye,{className:`w-4 h-4 transition-transform ${C?"rotate-180":""}`})]})}),e.jsx(me,{children:C&&e.jsxs(n.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.3},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(Y,{className:"w-5 h-5 mr-2 text-primary-400"}),"Group Search"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-white/70 text-sm font-medium mb-2",children:"Select Cohort"}),e.jsxs("select",{value:d,onChange:t=>T(t.target.value),className:"w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Cohorts"}),p.map(t=>e.jsx("option",{value:t,children:t.replace("cohort","Cohort ")},t))]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-white/70 text-sm font-medium mb-2",children:"Project Name"}),e.jsx("input",{type:"text",placeholder:"Search project paths...",value:A,onChange:t=>W(t.target.value),className:"w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]})]}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("h4",{className:"text-white/80 font-medium mb-2",children:["Found ",z().length," groups"]}),e.jsx("div",{className:"max-h-40 overflow-y-auto space-y-2",children:z().slice(0,10).map(t=>{const s=ce.filter(a=>a.groupId===t.id).length,r=M.find(a=>a.id===t.objectId);return e.jsx("div",{className:"bg-white/5 rounded-lg p-3 border border-white/10",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:r?.name||`Group ${t.id}`}),e.jsxs("p",{className:"text-white/60 text-sm",children:[t.campus," • ",s," members • ",t.status]})]}),e.jsx("div",{className:"text-white/60 text-sm",children:pe(t.createdAt)})]})},t.id)})})]})]})})]}),L&&e.jsx(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e.jsx(K,{className:"p-4 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"mr-3",children:B(L)}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Your Position"}),e.jsxs("p",{className:"text-white/60 text-sm",children:[(i==="xp"||i==="cohort-xp")&&`${f(v.totalUp||0)} XP`,(i==="audit"||i==="cohort-audit")&&`${(v.auditRatio||0).toFixed(2)} audit ratio`,i==="progress"&&"Progress leader"]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("p",{className:"text-2xl font-bold text-primary-400",children:["#",L]}),e.jsxs("p",{className:"text-white/60 text-sm",children:["of ",k().length]})]})]})})}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(Q,{className:"w-5 h-5 mr-2 text-primary-400"}),(i==="xp"||i==="cohort-xp")&&`${h==="cohort"?"Cohort ":""}XP Projects Ranking`,(i==="audit"||i==="cohort-audit")&&`${h==="cohort"?"Cohort ":""}Audit Ratio Ranking`,i==="progress"&&"Progress Leaders Ranking",i==="overall"&&"Overall Top Performers",d!=="all"&&` - ${d.replace("cohort","Cohort ")}`,e.jsxs("span",{className:"ml-2 text-primary-400",children:["(",w().length,")"]})]}),e.jsxs("div",{className:"space-y-2 max-h-96 overflow-y-auto",children:[w().slice(0,50).map((t,s)=>{const r=s+1,a=t.id===v.id;return e.jsxs(n.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:s*.02},className:`flex items-center justify-between p-3 rounded-lg border transition-all ${a?"bg-primary-500/20 border-primary-500/30":xe(r)}`,children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"flex items-center justify-center w-8 h-8",children:B(r)}),e.jsx(ue,{user:t,size:"sm",className:"w-8 h-8"}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("h4",{className:"text-white font-medium",children:t.login}),a&&e.jsx("span",{className:"px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs",children:"You"})]}),e.jsxs("div",{className:"flex items-center space-x-4 text-xs text-white/60",children:[e.jsxs("span",{children:[t.firstName," ",t.lastName]}),t.campus&&e.jsxs("span",{children:["Campus: ",t.campus]}),i==="progress"&&t.progressCount&&e.jsxs("span",{children:["Progress: ",t.progressCount]})]})]})]}),e.jsxs("div",{className:"text-right",children:[(i==="xp"||i==="cohort-xp")&&e.jsxs("div",{children:[e.jsx("div",{className:"text-lg font-bold text-white",children:f(t.totalUp||0)}),e.jsx("div",{className:"text-xs text-white/60",children:"XP"}),h==="cohort"&&e.jsx("div",{className:"text-xs text-blue-400",children:U(t.id).replace("cohort","C")})]}),(i==="audit"||i==="cohort-audit")&&e.jsxs("div",{children:[e.jsx("div",{className:"text-lg font-bold text-white",children:(t.auditRatio||0).toFixed(2)}),e.jsx("div",{className:"text-xs text-white/60",children:"Audit Ratio"}),h==="cohort"&&e.jsx("div",{className:"text-xs text-blue-400",children:U(t.id).replace("cohort","C")})]}),i==="progress"&&e.jsxs("div",{children:[e.jsxs("div",{className:"text-lg font-bold text-white",children:[t.avgGrade?.toFixed(1)||"0.0","%"]}),e.jsx("div",{className:"text-xs text-white/60",children:"Avg Grade"}),e.jsxs("div",{className:"text-xs text-green-400",children:[t.progressCount||0," projects"]})]}),i==="overall"&&e.jsxs("div",{children:[e.jsx("div",{className:"text-lg font-bold text-white",children:f(t.totalUp||0)}),e.jsxs("div",{className:"text-xs text-white/60",children:[(t.auditRatio||0).toFixed(2)," ratio"]})]})]})]},t.id)}),w().length>50&&e.jsx("div",{className:"text-center py-4",children:e.jsxs("p",{className:"text-white/60 text-sm",children:["Showing 50 of ",w().length," users"]})})]})]}),(G||se||re||ie||oe)&&e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-white/70",children:"Loading comprehensive leaderboard data..."})]})}),w().length===0&&!G&&e.jsxs(n.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(Q,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No users found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})};export{Xe as default};
