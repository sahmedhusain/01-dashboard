import{r as F,j as e,m as x}from"./animation-vendor-BWQ_wUI_.js";import{C as l}from"./Card-boLi8-L0.js";import{L as O,S as Y,f,a as z,h as H}from"./index-DIwVma_V.js";import{g as b,o as S,A as B}from"./ui-vendor-BusGUpMC.js";import{d as w,e as y}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const Z=({user:m})=>{const[o,D]=F.useState("main"),{data:T,loading:G,error:P}=w(y`
    query GetCheckpointExams($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "exam" }
          path: { _like: "%checkpoint%" }
        }
        order_by: { createdAt: desc }
      ) {
        id
        amount
        path
        createdAt
        type
        attrs
        object {
          name
          type
          attrs
        }
      }
    }
  `,{variables:{userId:m.id},errorPolicy:"all"}),{data:_,loading:E}=w(y`
    query GetCheckpointProgress($userId: Int!) {
      progress(
        where: {
          userId: { _eq: $userId }
          path: { _like: "%checkpoint%" }
        }
        order_by: { updatedAt: desc }
      ) {
        id
        grade
        isDone
        path
        createdAt
        updatedAt
        version
      }
    }
  `,{variables:{userId:m.id},errorPolicy:"all"}),{data:R,loading:$}=w(y`
    query GetCheckpointResults($userId: Int!) {
      result(
        where: {
          userId: { _eq: $userId }
          path: { _like: "%checkpoint%" }
        }
        order_by: { updatedAt: desc }
      ) {
        id
        grade
        path
        createdAt
        updatedAt
        type
        object {
          name
          type
        }
      }
    }
  `,{variables:{userId:m.id},errorPolicy:"all"});if(G||E||$)return e.jsx(O,{});if(P)return e.jsx(l,{className:"p-6",children:e.jsxs("div",{className:"text-center text-red-400",children:[e.jsx("p",{children:"Error loading checkpoint data"}),e.jsx("p",{className:"text-sm text-white/60 mt-2",children:P.message})]})});const q=T?.transaction||[],M=_?.progress||[],L=R?.result||[],p=s=>({main:s.filter(i=>i.path.includes("/bahrain/bh-module/")&&i.path.includes("/checkpoint/")&&!i.path.includes("/piscine-")),goPiscine:s.filter(i=>i.path.includes("/bahrain/bh-piscine/checkpoint-")),otherPiscines:s.filter(i=>i.path.includes("/bahrain/bh-module/piscine-")&&i.path.includes("/checkpoint/"))}),n=p(q),r=p(M);p(L);const g=s=>{const c=s.length,i=s.reduce((a,h)=>a+(h.amount||0),0),t=c>0?i/c:0;return{count:c,sum:{amount:i},avg:{amount:t}}},k=g(n.main),C=g(n.goPiscine),A=g(n.otherPiscines),u=s=>{const c=s.filter(a=>a.isDone).length,i=s.length,t=s.filter(a=>a.grade!==null).reduce((a,h)=>a+h.grade,0)/s.filter(a=>a.grade!==null).length||0;return{completed:c,total:i,completionRate:i>0?c/i*100:0,averageGrade:isNaN(t)?0:t}},j=u(r.main),N=u(r.goPiscine),v=u(r.otherPiscines),d=[];(n.main.length>0||r.main.length>0)&&d.push("main"),(n.goPiscine.length>0||r.goPiscine.length>0)&&d.push("go"),(n.otherPiscines.length>0||r.otherPiscines.length>0)&&d.push("piscines");const I=(s=>{const c=new Set;return s.forEach(i=>{const a=i.path.match(/\/bahrain\/bh-module\/piscine-([^\/]+)\/.*checkpoint/);a&&c.add(a[1])}),Array.from(c)})(n.otherPiscines);return d.length===0?e.jsxs("div",{className:"space-y-8",children:[e.jsxs(x.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Checkpoints Dashboard"}),e.jsx("p",{className:"text-white/70 text-lg",children:"Your checkpoint progress and achievements"})]}),e.jsx(l,{className:"p-8 text-center",children:e.jsxs("div",{className:"flex flex-col items-center space-y-4",children:[e.jsx(b,{className:"w-16 h-16 text-white/30"}),e.jsx("h3",{className:"text-xl font-semibold text-white",children:"No Checkpoints Found"}),e.jsx("p",{className:"text-white/60",children:"You haven't completed any checkpoints yet. Checkpoints will appear here once you start completing them."})]})})]}):e.jsxs("div",{className:"space-y-8",children:[e.jsx(Y,{title:"Checkpoints Dashboard",subtitle:"Your checkpoint progress and achievements",icon:S}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[(n.main.length>0||r.main.length>0)&&e.jsxs(l,{className:"p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(S,{className:"w-6 h-6 text-primary-400 mr-3"}),e.jsx("h3",{className:"text-lg font-semibold text-white",children:"Main Module"})]}),e.jsx("span",{className:"text-2xl font-bold text-primary-400",children:k?.count||0})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-white/60 text-sm",children:"Total Score"}),e.jsx("div",{className:"text-xl font-bold text-white",children:f(k?.sum?.amount||0)})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white/60 text-sm",children:"Progress"}),e.jsxs("div",{className:"text-xl font-bold text-green-400",children:[j.completed,"/",j.total]}),e.jsxs("div",{className:"text-xs text-white/60",children:[j.completionRate.toFixed(1),"% complete"]})]})]})]}),(n.goPiscine.length>0||r.goPiscine.length>0)&&e.jsxs(l,{className:"p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(b,{className:"w-6 h-6 text-green-400 mr-3"}),e.jsx("h3",{className:"text-lg font-semibold text-white",children:"Go Piscine"})]}),e.jsx("span",{className:"text-2xl font-bold text-green-400",children:C?.count||0})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-white/60 text-sm",children:"Total Score"}),e.jsx("div",{className:"text-xl font-bold text-white",children:f(C?.sum?.amount||0)})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white/60 text-sm",children:"Progress"}),e.jsxs("div",{className:"text-xl font-bold text-green-400",children:[N.completed,"/",N.total]}),e.jsxs("div",{className:"text-xs text-white/60",children:[N.completionRate.toFixed(1),"% complete"]})]})]})]}),(n.otherPiscines.length>0||r.otherPiscines.length>0)&&e.jsxs(l,{className:"p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(B,{className:"w-6 h-6 text-yellow-400 mr-3"}),e.jsx("h3",{className:"text-lg font-semibold text-white",children:"Other Piscines"})]}),e.jsx("span",{className:"text-2xl font-bold text-yellow-400",children:A?.count||0})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-white/60 text-sm",children:"Total Score"}),e.jsx("div",{className:"text-xl font-bold text-white",children:f(A?.sum?.amount||0)}),I.length>0&&e.jsxs("div",{className:"text-white/60 text-sm mt-1",children:["Types: ",I.join(", ")]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white/60 text-sm",children:"Progress"}),e.jsxs("div",{className:"text-xl font-bold text-yellow-400",children:[v.completed,"/",v.total]}),e.jsxs("div",{className:"text-xs text-white/60",children:[v.completionRate.toFixed(1),"% complete"]})]})]})]})]}),e.jsx(x.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},children:e.jsx("nav",{className:"bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2",children:e.jsx("div",{className:"flex space-x-2 overflow-x-auto scrollbar-hide",children:d.map(s=>e.jsxs(x.button,{onClick:()=>D(s),whileHover:{y:-2},whileTap:{y:0},className:`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${o===s?"bg-primary-500/20 text-primary-400 border border-primary-500/30":"text-white/70 hover:text-white hover:bg-white/10"}`,children:[e.jsx(b,{className:"w-4 h-4 mr-2"}),s==="main"?"Main Module":s==="go"?"Go Piscine":"Other Piscines"]},s))})})}),e.jsx(x.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:e.jsxs(l,{className:"p-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-white mb-6",children:o==="main"?"Main Module Checkpoints":o==="go"?"Go Piscine Checkpoints":"Other Piscine Checkpoints"}),e.jsx("div",{className:"space-y-4",children:(()=>{const s=o==="main"?n.main:o==="go"?n.goPiscine:n.otherPiscines,c=o==="main"?r.main:o==="go"?r.goPiscine:r.otherPiscines,i=s.map(t=>{const a=c.find(h=>h.path===t.path);return{...t,progress:a}});return c.forEach(t=>{i.find(a=>a.path===t.path)||i.push({progress:t,path:t.path,amount:0})}),i.map(t=>e.jsx("div",{className:"bg-white/5 rounded-lg p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("h4",{className:"font-medium text-white",children:t.object?.name||t.progress?.path?.split("/").pop()||"Checkpoint"}),t.progress&&e.jsx("span",{className:`px-2 py-1 text-xs rounded-full ${t.progress.isDone?"bg-green-500/20 text-green-400":"bg-yellow-500/20 text-yellow-400"}`,children:t.progress.isDone?"Completed":"In Progress"})]}),e.jsx("p",{className:"text-white/60 text-sm mt-1",children:t.path}),t.progress&&t.progress.grade&&e.jsxs("p",{className:"text-white/60 text-sm",children:["Grade: ",e.jsx("span",{className:"text-white font-medium",children:z(t.progress.grade)})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-lg font-bold text-primary-400",children:t.amount?`${t.amount} pts`:"No Score"}),e.jsx("div",{className:"text-white/60 text-sm",children:H(t.createdAt||t.progress?.updatedAt)})]})]})},t.id||t.progress?.id))})()})]})},o)]})};export{Z as default};
