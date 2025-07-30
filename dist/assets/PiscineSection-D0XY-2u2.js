import{j as e,m as h}from"./animation-vendor-BWQ_wUI_.js";import{C as m}from"./Card-boLi8-L0.js";import{f as u,L as D,d as I,h as j,a as b}from"./index-DIwVma_V.js";import{B as A,A as w,o as v,r as P}from"./ui-vendor-BusGUpMC.js";import{d as f,e as N}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const C=({piscineType:c,totalXP:i,projectStats:n})=>{const g=[{label:`Piscine ${c.toUpperCase()} XP`,value:u(i),icon:A,color:"primary"},{label:"Projects Passed",value:n.passed,icon:w,color:"green"},{label:"Projects Failed",value:n.failed,icon:v,color:"red"},{label:"Success Rate",value:`${n.passRate}%`,icon:P,color:"blue"}],o={primary:"text-primary-400",green:"text-green-400",red:"text-red-400",blue:"text-blue-400"},p={primary:"bg-primary-500/20",green:"bg-green-500/20",red:"bg-red-500/20",blue:"bg-blue-500/20"};return e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:g.map((l,d)=>e.jsx(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:d*.1},children:e.jsx(m,{className:"p-6 h-full bg-white/5",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm",children:l.label}),e.jsx("p",{className:`text-3xl font-bold ${o[l.color]}`,children:l.value})]}),e.jsx("div",{className:`w-12 h-12 ${p[l.color]} rounded-lg flex items-center justify-center`,children:e.jsx(l.icon,{className:`w-6 h-6 ${o[l.color]}`})})]})})},l.label))})},k=({user:c,piscineType:i})=>{const n=i==="go"?"/bahrain/bh-piscine/%":`/bahrain/bh-module/piscine-${i}/%`,{data:g,loading:o}=f(N`
    query GetPiscineXPTransactions($userId: Int!, $pathPattern: String!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
          path: { _like: $pathPattern }
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
  `,{variables:{userId:c.id,pathPattern:n},errorPolicy:"all"}),{data:p,loading:l}=f(N`
    query GetPiscineProgress($userId: Int!, $pathPattern: String!) {
      progress(
        where: {
          userId: { _eq: $userId }
          path: { _like: $pathPattern }
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
      }
    }
  `,{variables:{userId:c.id,pathPattern:n},errorPolicy:"all"});if(o||l)return e.jsx(D,{});const d=g?.transaction||[],r=p?.progress||[],y=d.reduce((t,a)=>t+(a.amount||0),0),$=I(r);d.slice(0,10),r.filter(t=>t.isDone).length,r.length,r.filter(t=>t.grade).reduce((t,a)=>t+a.grade,0)/r.filter(t=>t.grade).length,r.slice(0,5);const x=d.filter(t=>i==="go"?t.path.includes("/bahrain/bh-piscine/"):t.path.includes(`/bahrain/bh-module/piscine-${i}/`)),s=r.filter(t=>i==="go"?t.path.includes("/bahrain/bh-piscine/"):t.path.includes(`/bahrain/bh-module/piscine-${i}/`));return e.jsxs("div",{className:"space-y-6",children:[e.jsx(C,{piscineType:i,totalXP:y,projectStats:$}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs(m,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(P,{className:"w-5 h-5 mr-2 text-primary-400"}),"Recent XP Gains"]}),e.jsxs("div",{className:"space-y-3",children:[x.slice(0,5).map((t,a)=>e.jsxs(h.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:a*.1},className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium text-sm",children:t.object?.name||t.path.split("/").pop()||"Project"}),e.jsx("p",{className:"text-white/60 text-xs",children:j(t.createdAt)})]})]}),e.jsx("div",{className:"text-right",children:e.jsxs("p",{className:"text-primary-400 font-bold text-sm",children:["+",u(t.amount)]})})]},t.id)),x.length===0&&e.jsx("div",{className:"text-center text-white/60 py-4",children:e.jsx("p",{className:"text-sm",children:"No XP gains found for this piscine"})})]})]}),e.jsxs(m,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(v,{className:"w-5 h-5 mr-2 text-green-400"}),"Recent Progress"]}),e.jsxs("div",{className:"space-y-3",children:[s.slice(0,5).map((t,a)=>e.jsxs(h.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{delay:a*.1},className:"flex items-center justify-between p-3 bg-white/5 rounded-lg",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-2 h-2 rounded-full ${t.isDone?"bg-green-400":"bg-yellow-400"}`}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium text-sm",children:t.path.split("/").pop()||"Project"}),e.jsx("p",{className:"text-white/60 text-xs",children:j(t.updatedAt)})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("span",{className:`px-2 py-1 text-xs rounded-full ${t.isDone?"bg-green-500/20 text-green-400":"bg-yellow-500/20 text-yellow-400"}`,children:t.isDone?"Completed":"In Progress"}),t.grade&&e.jsxs("p",{className:"text-white/60 text-xs mt-1",children:["Grade: ",b(t.grade)]})]})]},t.id)),s.length===0&&e.jsx("div",{className:"text-center text-white/60 py-4",children:e.jsx("p",{className:"text-sm",children:"No progress found for this piscine"})})]})]})]}),e.jsxs(m,{className:"p-6",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(w,{className:"w-5 h-5 mr-2 text-primary-400"}),"Piscine ",i.toUpperCase()," Progress Overview"]}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",children:[e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-white",children:s.length}),e.jsx("p",{className:"text-white/60 text-sm",children:"Total Projects"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-green-400",children:s.filter(t=>t.isDone).length}),e.jsx("p",{className:"text-white/60 text-sm",children:"Completed"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-blue-400",children:u(x.reduce((t,a)=>t+a.amount,0))}),e.jsx("p",{className:"text-white/60 text-sm",children:"Total XP"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 text-center",children:[e.jsx("p",{className:"text-2xl font-bold text-yellow-400",children:s.filter(t=>t.grade).length>0?b(s.filter(t=>t.grade).reduce((t,a)=>t+a.grade,0)/s.filter(t=>t.grade).length):"0%"}),e.jsx("p",{className:"text-white/60 text-sm",children:"Avg Grade"})]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"flex justify-between text-sm text-white/60 mb-2",children:[e.jsx("span",{children:"Completion Progress"}),e.jsxs("span",{children:[s.length>0?(s.filter(t=>t.isDone).length/s.length*100).toFixed(1):0,"%"]})]}),e.jsx("div",{className:"w-full bg-white/10 rounded-full h-3",children:e.jsx(h.div,{className:"bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full",initial:{width:0},animate:{width:`${s.length>0?s.filter(t=>t.isDone).length/s.length*100:0}%`},transition:{duration:1,ease:"easeOut"}})})]}),e.jsxs("div",{className:"text-center text-white/60 text-sm",children:[x.length," XP transactions • ",s.length," projects tracked"]})]})]})};export{k as default};
