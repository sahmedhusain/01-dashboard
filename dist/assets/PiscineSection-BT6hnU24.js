import{j as e,m as d}from"./animation-vendor-CTGg7XC5.js";import{L as b,c as v,C as i,b as x,g as P}from"./index-CtirGXoP.js";import{B as y,A as m,l as $,j as o}from"./ui-vendor-CQLODBKU.js";import{d as h,e as j}from"./apollo-vendor-Dxrk3Lr4.js";import"./react-vendor-Csw2ODfV.js";const U=({user:l,piscineType:t})=>{const{data:p,loading:g}=h(j`
    query GetPiscineXPTransactions($userId: Int!, $piscinePattern: String!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
          path: { _regex: $piscinePattern }
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
  `,{variables:{userId:l.id,piscinePattern:`piscine-${t}`},errorPolicy:"all"}),{data:N,loading:u}=h(j`
    query GetPiscineProgress($userId: Int!, $piscinePattern: String!) {
      progress(
        where: {
          userId: { _eq: $userId }
          path: { _regex: $piscinePattern }
        }
        order_by: { createdAt: desc }
      ) {
        id
        grade
        isDone
        path
        version
        createdAt
        updatedAt
        object {
          name
          type
        }
      }
    }
  `,{variables:{userId:l.id,piscinePattern:`piscine-${t}`},errorPolicy:"all"});if(g||u)return e.jsx(b,{});const c=p?.transaction||[],f=N?.progress||[],w=c.reduce((a,r)=>a+(r.amount||0),0),s=v(f),n=c.slice(0,10);return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6",children:[e.jsx(i,{className:"p-6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"text-white/60 text-sm",children:["Piscine ",t.toUpperCase()," XP"]}),e.jsx("p",{className:"text-3xl font-bold text-primary-400",children:x(w)})]}),e.jsx("div",{className:"w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center",children:e.jsx(y,{className:"w-6 h-6 text-primary-400"})})]})}),e.jsx(i,{className:"p-6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm",children:"Projects Passed"}),e.jsx("p",{className:"text-3xl font-bold text-green-400",children:s.passed})]}),e.jsx("div",{className:"w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center",children:e.jsx(m,{className:"w-6 h-6 text-green-400"})})]})}),e.jsx(i,{className:"p-6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm",children:"Projects Failed"}),e.jsx("p",{className:"text-3xl font-bold text-red-400",children:s.failed})]}),e.jsx("div",{className:"w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center",children:e.jsx($,{className:"w-6 h-6 text-red-400"})})]})}),e.jsx(i,{className:"p-6",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm",children:"Success Rate"}),e.jsxs("p",{className:"text-3xl font-bold text-blue-400",children:[s.passRate,"%"]})]}),e.jsx("div",{className:"w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center",children:e.jsx(o,{className:"w-6 h-6 text-blue-400"})})]})})]}),e.jsxs(i,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(o,{className:"w-5 h-5 mr-2 text-primary-400"}),"Recent Piscine ",t.toUpperCase()," XP Gains"]}),e.jsxs("div",{className:"space-y-3",children:[n.map((a,r)=>e.jsxs(d.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:r*.1},className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:a.object?.name||"Unknown Project"}),e.jsxs("p",{className:"text-white/60 text-sm",children:["Piscine ",t.toUpperCase()," • ",P(a.createdAt)]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("p",{className:"text-primary-400 font-bold",children:["+",x(a.amount)]}),e.jsx("p",{className:"text-white/50 text-xs",children:a.object?.type||"project"})]})]},a.id)),n.length===0&&e.jsx("div",{className:"text-center text-white/60 py-4",children:e.jsxs("p",{children:["No recent Piscine ",t.toUpperCase()," XP gains"]})})]})]}),e.jsxs(i,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(m,{className:"w-5 h-5 mr-2 text-primary-400"}),"Piscine ",t.toUpperCase()," Project Progress"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",children:[e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-white",children:s.total}),e.jsx("p",{className:"text-white/60 text-sm",children:"Total Projects"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-green-400",children:s.passed}),e.jsx("p",{className:"text-white/60 text-sm",children:"Passed"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-red-400",children:s.failed}),e.jsx("p",{className:"text-white/60 text-sm",children:"Failed"})]})]}),e.jsx("div",{className:"w-full bg-white/10 rounded-full h-3",children:e.jsx(d.div,{className:"bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full",initial:{width:0},animate:{width:`${s.passRate}%`},transition:{duration:1,ease:"easeOut"}})}),e.jsxs("div",{className:"text-center text-white/60 text-sm mt-2",children:[s.passRate,"% Success Rate"]})]})]})};export{U as default};
