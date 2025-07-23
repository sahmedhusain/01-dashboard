import{r as y,j as e,m as v}from"./animation-vendor-CTGg7XC5.js";import{L as $,C as l,b as x,d as R}from"./index-5epzrz73.js";import{T as h,k as L,m as _,A as P,s as k,t as A}from"./ui-vendor-g4Irxhbg.js";import{u as p,d as u}from"./apollo-vendor-CuB5uN0C.js";import"./react-vendor-Csw2ODfV.js";const I=({user:n})=>{const[i,d]=y.useState("xp"),{data:g,loading:j}=p(u`
    query GetLeaderboard($campus: String!, $limit: Int!) {
      user(
        where: { campus: { _eq: $campus } }
        order_by: { totalUp: desc }
        limit: $limit
      ) {
        id
        login
        firstName
        lastName
        campus
        auditRatio
        totalUp
        totalDown
        xp_total: transactions_aggregate(
          where: { type: { _eq: "xp" } }
        ) {
          aggregate {
            sum {
              amount
            }
          }
        }
      }
    }
  `,{variables:{campus:n.campus||"london",limit:50},errorPolicy:"all"}),{data:N,loading:b}=p(u`
    query GetAuditRatioLeaderboard($campus: String!, $limit: Int!) {
      user(
        where: {
          campus: { _eq: $campus }
          auditRatio: { _is_null: false }
        }
        order_by: { auditRatio: desc }
        limit: $limit
      ) {
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
  `,{variables:{campus:n.campus||"london",limit:50},errorPolicy:"all"}),w=i==="xp"?j:b,s=i==="xp"?g?.user:N?.user,a=s?.findIndex(t=>t.login===n.login)+1||0,o=t=>{switch(t){case 1:return e.jsx(A,{className:"w-5 h-5 text-yellow-400"});case 2:return e.jsx(k,{className:"w-5 h-5 text-gray-300"});case 3:return e.jsx(P,{className:"w-5 h-5 text-amber-600"});default:return e.jsxs("span",{className:"text-white/60 font-bold",children:["#",t]})}},f=t=>{switch(t){case 1:return"bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";case 2:return"bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";case 3:return"bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30";default:return"bg-white/5 border-white/10"}};return w?e.jsx($,{}):e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("h2",{className:"text-2xl font-bold text-white flex items-center",children:[e.jsx(h,{className:"w-6 h-6 mr-2 text-primary-400"}),"Campus Leaderboard"]}),e.jsxs("div",{className:"flex bg-white/10 rounded-lg p-1",children:[e.jsxs("button",{onClick:()=>d("xp"),className:`px-4 py-2 rounded-md text-sm font-medium transition-all ${i==="xp"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:[e.jsx(L,{className:"w-4 h-4 mr-1 inline"}),"XP Rankings"]}),e.jsxs("button",{onClick:()=>d("audit"),className:`px-4 py-2 rounded-md text-sm font-medium transition-all ${i==="audit"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:[e.jsx(_,{className:"w-4 h-4 mr-1 inline"}),"Audit Ratio"]})]})]}),a>0&&e.jsx(l,{className:"p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"mr-3",children:o(a)}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Your Position"}),e.jsx("p",{className:"text-white/60 text-sm",children:a===1?"🎉 You're #1!":`Rank #${a} out of ${s?.length||0}`})]})]}),e.jsx("div",{className:"text-right",children:i==="xp"?e.jsxs("div",{children:[e.jsx("p",{className:"text-primary-400 font-bold",children:x(s?.[a-1]?.xp_total?.aggregate?.sum?.amount||0)}),e.jsx("p",{className:"text-white/60 text-sm",children:"Total XP"})]}):e.jsxs("div",{children:[e.jsx("p",{className:"text-primary-400 font-bold",children:s?.[a-1]?.auditRatio?.toFixed(2)||"0.00"}),e.jsx("p",{className:"text-white/60 text-sm",children:"Audit Ratio"})]})})]})}),e.jsxs(l,{className:"p-6",children:[e.jsx("div",{className:"space-y-3",children:s?.slice(0,20).map((t,c)=>{const m=c+1,r=t.login===n.login;return e.jsxs(v.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:c*.05},className:`flex items-center justify-between p-4 rounded-lg border transition-all ${r?"bg-primary-500/20 border-primary-500/30 ring-1 ring-primary-500/50":f(m)} ${r?"scale-105":"hover:scale-102"}`,children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("div",{className:"w-8 flex justify-center",children:o(m)}),e.jsx(R,{user:t,size:"sm"}),e.jsxs("div",{children:[e.jsxs("p",{className:`font-medium ${r?"text-primary-200":"text-white"}`,children:[t.firstName&&t.lastName?`${t.firstName} ${t.lastName}`:t.login,r&&e.jsx("span",{className:"ml-2 text-primary-300",children:"(You)"})]}),e.jsxs("p",{className:"text-white/60 text-sm",children:["@",t.login]})]})]}),e.jsx("div",{className:"text-right",children:i==="xp"?e.jsxs("div",{children:[e.jsx("p",{className:`font-bold ${r?"text-primary-200":"text-primary-400"}`,children:x(t.xp_total?.aggregate?.sum?.amount||0)}),e.jsx("p",{className:"text-white/60 text-sm",children:"XP"})]}):e.jsxs("div",{children:[e.jsx("p",{className:`font-bold ${r?"text-primary-200":"text-primary-400"}`,children:t.auditRatio?.toFixed(2)||"0.00"}),e.jsx("p",{className:"text-white/60 text-sm",children:"Ratio"})]})})]},t.id)})}),(!s||s.length===0)&&e.jsxs("div",{className:"text-center text-white/60 py-8",children:[e.jsx(h,{className:"w-12 h-12 mx-auto mb-4 text-white/30"}),e.jsx("p",{children:"No leaderboard data available"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs(l,{className:"p-4 text-center",children:[e.jsx("div",{className:"text-2xl font-bold text-primary-400",children:s?.length||0}),e.jsx("div",{className:"text-white/60 text-sm",children:"Total Students"})]}),e.jsxs(l,{className:"p-4 text-center",children:[e.jsx("div",{className:"text-2xl font-bold text-green-400",children:a||"N/A"}),e.jsx("div",{className:"text-white/60 text-sm",children:"Your Rank"})]}),e.jsxs(l,{className:"p-4 text-center",children:[e.jsxs("div",{className:"text-2xl font-bold text-blue-400",children:[a>0?Math.round((s?.length-a+1)/s?.length*100):0,"%"]}),e.jsx("div",{className:"text-white/60 text-sm",children:"Percentile"})]})]})]})};export{I as default};
