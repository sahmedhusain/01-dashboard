import{r as w,j as e,m as i}from"./animation-vendor-CTGg7XC5.js";import{L as D,C as A,d as g,e as Y}from"./index-CtirGXoP.js";import{e as Z,Z as z,l as M,k as Q,h as H,w as J,T as _,A as K,x as V,y as W}from"./ui-vendor-CQLODBKU.js";import{d as m,e as h}from"./apollo-vendor-Dxrk3Lr4.js";import"./react-vendor-Csw2ODfV.js";const ee=h`
  query GetXPLeaderboard {
    user(
      order_by: { totalUp: desc }
      where: { totalUp: { _gt: 0 } }
    ) {
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
`,te=h`
  query GetAuditLeaderboard {
    user(
      order_by: { auditRatio: desc }
      where: { auditRatio: { _gt: 0 } }
    ) {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      createdAt
    }
  }
`,ae=h`
  query GetProgressLeaderboard {
    progress_aggregate(
      group_by: [userId]
      order_by: { count: desc }
    ) {
      aggregate {
        count
        avg {
          grade
        }
        max {
          grade
        }
      }
      nodes {
        userId
        user {
          login
          firstName
          lastName
          campus
          auditRatio
          totalUp
        }
      }
    }
  }
`,se=h`
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
`,ce=({user:n})=>{const[a,c]=w.useState("xp"),[l,C]=w.useState(""),[p,T]=w.useState("all"),{data:y,loading:u,error:N}=m(ee,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:U,loading:k}=m(te,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:E,loading:S}=m(ae,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:G,loading:X}=m(se,{errorPolicy:"all",fetchPolicy:"cache-first"});if(u&&!y)return e.jsx(D,{});if(N)return e.jsx(A,{className:"p-6",children:e.jsxs("div",{className:"text-center text-red-400",children:[e.jsx("p",{children:"Error loading leaderboard data"}),e.jsx("p",{className:"text-sm text-white/60 mt-2",children:N.message})]})});const o=y?.user||[],f=U?.user||[],v=E?.progress_aggregate||[],r=G||{},L=r.user_aggregate?.aggregate?.count||0,F=r.user_aggregate?.aggregate?.avg?.auditRatio||0;r.user_aggregate?.aggregate?.avg?.totalUp,r.user_aggregate?.aggregate?.max?.totalUp;const q=r.progress_aggregate?.aggregate?.count||0;r.progress_aggregate?.aggregate?.avg?.grade;const O=r.transaction_aggregate?.aggregate?.count||0,$=r.transaction_aggregate?.aggregate?.sum?.amount||0,b=()=>{switch(a){case"xp":return o;case"audit":return f;case"progress":return v.map(t=>({...t.nodes[0]?.user,progressCount:t.aggregate.count,avgGrade:t.aggregate.avg?.grade||0,maxGrade:t.aggregate.max?.grade||0}));case"overall":return o.slice(0,20);default:return o}},d=()=>{let t=b();return l&&(t=t.filter(s=>s.login?.toLowerCase().includes(l.toLowerCase())||s.firstName?.toLowerCase().includes(l.toLowerCase())||s.lastName?.toLowerCase().includes(l.toLowerCase()))),p!=="all"&&(t=t.filter(s=>s.campus===p)),t},I=[...new Set(o.map(t=>t.campus).filter(Boolean))],j=(()=>{const s=b().findIndex(x=>x.id===n.id);return s>=0?s+1:null})(),R=t=>{switch(t){case 1:return e.jsx(W,{className:"w-5 h-5 text-yellow-400"});case 2:return e.jsx(V,{className:"w-5 h-5 text-gray-300"});case 3:return e.jsx(K,{className:"w-5 h-5 text-amber-600"});default:return e.jsxs("span",{className:"text-white/60 font-bold",children:["#",t]})}},B=t=>{switch(t){case 1:return"bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";case 2:return"bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";case 3:return"bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30";default:return"bg-white/5 border-white/10"}};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs(i.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Comprehensive Leaderboard"}),e.jsxs("p",{className:"text-white/70 text-lg",children:["Rankings across ",L," users with ",O," XP transactions"]})]}),e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(Z,{className:"w-8 h-8 text-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total Users"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:L})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(z,{className:"w-8 h-8 text-green-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total XP"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:g($)})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(M,{className:"w-8 h-8 text-purple-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Avg Audit Ratio"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:F.toFixed(2)})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(Q,{className:"w-8 h-8 text-orange-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Progress Records"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:q})]})]})})]}),e.jsx(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex justify-center",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsxs("button",{onClick:()=>c("xp"),className:`px-4 py-2 rounded-md transition-all ${a==="xp"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["XP Leaders (",o.length,")"]}),e.jsxs("button",{onClick:()=>c("audit"),className:`px-4 py-2 rounded-md transition-all ${a==="audit"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["Audit Leaders (",f.length,")"]}),e.jsxs("button",{onClick:()=>c("progress"),className:`px-4 py-2 rounded-md transition-all ${a==="progress"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["Progress Leaders (",v.length,")"]}),e.jsx("button",{onClick:()=>c("overall"),className:`px-4 py-2 rounded-md transition-all ${a==="overall"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:"Overall Top 20"})]})}),e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(H,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search users by login or name...",value:l,onChange:t=>C(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(J,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:p,onChange:t=>T(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Campuses"}),I.map(t=>e.jsx("option",{value:t,children:t},t))]})]})]}),j&&e.jsx(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e.jsx(A,{className:"p-4 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"mr-3",children:R(j)}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Your Position"}),e.jsxs("p",{className:"text-white/60 text-sm",children:[a==="xp"&&`${g(n.totalUp||0)} XP`,a==="audit"&&`${(n.auditRatio||0).toFixed(2)} audit ratio`,a==="progress"&&"Progress leader"]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("p",{className:"text-2xl font-bold text-primary-400",children:["#",j]}),e.jsxs("p",{className:"text-white/60 text-sm",children:["of ",b().length]})]})]})})}),e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(_,{className:"w-5 h-5 mr-2 text-primary-400"}),a==="xp"&&"XP Leaderboard",a==="audit"&&"Audit Ratio Leaderboard",a==="progress"&&"Progress Leaderboard",a==="overall"&&"Overall Top Performers","(",d().length,")"]}),e.jsxs("div",{className:"space-y-2 max-h-96 overflow-y-auto",children:[d().slice(0,50).map((t,s)=>{const x=s+1,P=t.id===n.id;return e.jsxs(i.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:s*.02},className:`flex items-center justify-between p-3 rounded-lg border transition-all ${P?"bg-primary-500/20 border-primary-500/30":B(x)}`,children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"flex items-center justify-center w-8 h-8",children:R(x)}),e.jsx(Y,{user:t,size:"sm",className:"w-8 h-8"}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("h4",{className:"text-white font-medium",children:t.login}),P&&e.jsx("span",{className:"px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs",children:"You"})]}),e.jsxs("div",{className:"flex items-center space-x-4 text-xs text-white/60",children:[e.jsxs("span",{children:[t.firstName," ",t.lastName]}),t.campus&&e.jsxs("span",{children:["Campus: ",t.campus]}),a==="progress"&&t.progressCount&&e.jsxs("span",{children:["Progress: ",t.progressCount]})]})]})]}),e.jsxs("div",{className:"text-right",children:[a==="xp"&&e.jsxs("div",{children:[e.jsx("div",{className:"text-lg font-bold text-white",children:g(t.totalUp||0)}),e.jsx("div",{className:"text-xs text-white/60",children:"XP"})]}),a==="audit"&&e.jsxs("div",{children:[e.jsx("div",{className:"text-lg font-bold text-white",children:(t.auditRatio||0).toFixed(2)}),e.jsx("div",{className:"text-xs text-white/60",children:"Audit Ratio"})]}),a==="progress"&&e.jsxs("div",{children:[e.jsxs("div",{className:"text-lg font-bold text-white",children:[t.avgGrade?.toFixed(1)||"0.0","%"]}),e.jsx("div",{className:"text-xs text-white/60",children:"Avg Grade"})]}),a==="overall"&&e.jsxs("div",{children:[e.jsx("div",{className:"text-lg font-bold text-white",children:g(t.totalUp||0)}),e.jsxs("div",{className:"text-xs text-white/60",children:[(t.auditRatio||0).toFixed(2)," ratio"]})]})]})]},t.id)}),d().length>50&&e.jsx("div",{className:"text-center py-4",children:e.jsxs("p",{className:"text-white/60 text-sm",children:["Showing 50 of ",d().length," users"]})})]})]}),(u||k||S||X)&&e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-white/70",children:"Loading leaderboard data..."})]})}),d().length===0&&!u&&e.jsxs(i.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(_,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No users found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})};export{ce as default};
