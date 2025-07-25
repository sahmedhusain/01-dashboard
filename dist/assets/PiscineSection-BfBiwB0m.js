import{j as e,m}from"./animation-vendor-BWQ_wUI_.js";import{C as p}from"./Card-7ZsQEDVb.js";import{f as u,L as P,d as w,g as v}from"./index-ChUwEoWz.js";import{B as y,A as b,i as $,l as N}from"./ui-vendor-BBc5DWUb.js";import{d as g,e as j}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const I=({piscineType:l,totalXP:t,projectStats:i})=>{const n=[{label:`Piscine ${l.toUpperCase()} XP`,value:u(t),icon:y,color:"primary"},{label:"Projects Passed",value:i.passed,icon:b,color:"green"},{label:"Projects Failed",value:i.failed,icon:$,color:"red"},{label:"Success Rate",value:`${i.passRate}%`,icon:N,color:"blue"}],c={primary:"text-primary-400",green:"text-green-400",red:"text-red-400",blue:"text-blue-400"},d={primary:"bg-primary-500/20",green:"bg-green-500/20",red:"bg-red-500/20",blue:"bg-blue-500/20"};return e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:n.map((s,o)=>e.jsx(m.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:o*.1},children:e.jsx(p,{className:"p-6 h-full bg-white/5",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm",children:s.label}),e.jsx("p",{className:`text-3xl font-bold ${c[s.color]}`,children:s.value})]}),e.jsx("div",{className:`w-12 h-12 ${d[s.color]} rounded-lg flex items-center justify-center`,children:e.jsx(s.icon,{className:`w-6 h-6 ${c[s.color]}`})})]})})},s.label))})},q=({user:l,piscineType:t})=>{const{data:i,loading:n}=g(j`
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
  `,{variables:{userId:l.id,piscinePattern:`piscine-${t}`},errorPolicy:"all"}),{data:c,loading:d}=g(j`
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
  `,{variables:{userId:l.id,piscinePattern:`piscine-${t}`},errorPolicy:"all"});if(n||d)return e.jsx(P,{});const s=i?.transaction||[],o=c?.progress||[],f=s.reduce((a,x)=>a+(x.amount||0),0),r=w(o),h=s.slice(0,10);return e.jsxs("div",{className:"space-y-6",children:[e.jsx(I,{piscineType:t,totalXP:f,projectStats:r}),e.jsxs(p,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(N,{className:"w-5 h-5 mr-2 text-primary-400"}),"Recent Piscine ",t.toUpperCase()," XP Gains"]}),e.jsxs("div",{className:"space-y-3",children:[h.map((a,x)=>e.jsxs(m.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:x*.1},className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:a.object?.name||"Unknown Project"}),e.jsxs("p",{className:"text-white/60 text-sm",children:["Piscine ",t.toUpperCase()," • ",v(a.createdAt)]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("p",{className:"text-primary-400 font-bold",children:["+",u(a.amount)]}),e.jsx("p",{className:"text-white/50 text-xs",children:a.object?.type||"project"})]})]},a.id)),h.length===0&&e.jsx("div",{className:"text-center text-white/60 py-4",children:e.jsxs("p",{children:["No recent Piscine ",t.toUpperCase()," XP gains"]})})]})]}),e.jsxs(p,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(b,{className:"w-5 h-5 mr-2 text-primary-400"}),"Piscine ",t.toUpperCase()," Project Progress"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",children:[e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-white",children:r.total}),e.jsx("p",{className:"text-white/60 text-sm",children:"Total Projects"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-green-400",children:r.passed}),e.jsx("p",{className:"text-white/60 text-sm",children:"Passed"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-red-400",children:r.failed}),e.jsx("p",{className:"text-white/60 text-sm",children:"Failed"})]})]}),e.jsx("div",{className:"w-full bg-white/10 rounded-full h-3",children:e.jsx(m.div,{className:"bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full",initial:{width:0},animate:{width:`${r.passRate}%`},transition:{duration:1,ease:"easeOut"}})}),e.jsxs("div",{className:"text-center text-white/60 text-sm mt-2",children:[r.passRate,"% Success Rate"]})]})]})};export{q as default};
