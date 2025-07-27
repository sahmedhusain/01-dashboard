import{j as e,m as u,r as $}from"./animation-vendor-BWQ_wUI_.js";import q from"./PiscineSection-DHMBneiC.js";import{C as I}from"./Card-boLi8-L0.js";import{f as R,a as D,L as X,s as L,c as B,S as F}from"./index-DMnkRdXi.js";import{B as b}from"./ui-vendor-9qjsAl_q.js";import{d as P,e as _}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const O=({piscineTypes:o,xpTotals:g,transactions:h,progressData:a,resultsData:j,analyzeProgressByPiscine:v,analyzeResultsByPiscine:N,onSelectPiscine:w})=>e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-white mb-6",children:"Piscines Overview"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:o.map(t=>{const x=g.piscines[t]||0,c=v(a,t),m=N(j,t);return e.jsx(u.div,{whileHover:{y:-5},className:"cursor-pointer",onClick:()=>w(t),children:e.jsx(I,{className:"p-6 h-full bg-white/5 hover:bg-white/10 transition-colors",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"text-white/60 text-sm font-medium",children:["Piscine ",t.toUpperCase()]}),e.jsx("p",{className:"text-3xl font-bold text-primary-400",children:R(x)})]}),e.jsx("div",{className:"w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center",children:e.jsx(b,{className:"w-6 h-6 text-primary-400"})})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 text-sm",children:[e.jsxs("div",{className:"bg-white/5 rounded-lg p-3",children:[e.jsx("div",{className:"text-white/60",children:"Progress"}),e.jsxs("div",{className:"text-white font-bold",children:[c.completed,"/",c.total]}),e.jsxs("div",{className:"text-xs text-green-400",children:[c.completionRate.toFixed(1),"%"]})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-3",children:[e.jsx("div",{className:"text-white/60",children:"Pass Rate"}),e.jsxs("div",{className:"text-white font-bold",children:[m.passed,"/",m.total]}),e.jsxs("div",{className:"text-xs text-blue-400",children:[m.passRate.toFixed(1),"%"]})]})]}),e.jsx("p",{className:"text-white/50 text-xs",children:"Click to view details"})]})})},t)})}),e.jsxs(I,{className:"p-6 bg-white/5",children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-4",children:"Total Piscine Statistics"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-green-400 mb-2",children:R(g.allPiscines)}),e.jsx("div",{className:"text-white/60 text-sm",children:"Total Piscine XP"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-blue-400 mb-2",children:o.length}),e.jsx("div",{className:"text-white/60 text-sm",children:"Piscines Started"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-purple-400 mb-2",children:a.filter(t=>t.isDone).length}),e.jsx("div",{className:"text-white/60 text-sm",children:"Projects Completed"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-yellow-400 mb-2",children:h.length}),e.jsx("div",{className:"text-white/60 text-sm",children:"XP Transactions"})]})]}),e.jsx("div",{className:"mt-6 pt-6 border-t border-white/10",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[e.jsx("div",{className:"text-white/60 text-sm mb-1",children:"Overall Completion"}),e.jsxs("div",{className:"text-2xl font-bold text-green-400",children:[a.length>0?(a.filter(t=>t.isDone).length/a.length*100).toFixed(1):0,"%"]})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[e.jsx("div",{className:"text-white/60 text-sm mb-1",children:"Average Grade"}),e.jsx("div",{className:"text-2xl font-bold text-blue-400",children:a.filter(t=>t.grade).length>0?D(a.filter(t=>t.grade).reduce((t,x)=>t+x.grade,0)/a.filter(t=>t.grade).length):"0%"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[e.jsx("div",{className:"text-white/60 text-sm mb-1",children:"Active Projects"}),e.jsx("div",{className:"text-2xl font-bold text-yellow-400",children:a.filter(t=>!t.isDone).length})]})]})})]})]}),V=({user:o,piscineTypes:g})=>{const[h,a]=$.useState(""),{data:j,loading:v}=P(_`
    query GetAllPiscineXP($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
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
  `,{variables:{userId:o.id},errorPolicy:"all"}),{data:N,loading:w}=P(_`
    query GetPiscineProgress($userId: Int!) {
      progress(
        where: {
          userId: { _eq: $userId }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
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
  `,{variables:{userId:o.id},errorPolicy:"all"}),{data:t,loading:x}=P(_`
    query GetPiscineResults($userId: Int!) {
      result(
        where: {
          userId: { _eq: $userId }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
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
  `,{variables:{userId:o.id},errorPolicy:"all"});if(v||w||x)return e.jsx(X,{});const c=j?.transaction||[],m=N?.progress||[],S=t?.result||[];L(c);const k=B(c),C=(r,l)=>{const i=r.filter(s=>l==="go"?s.path.includes("/bahrain/bh-piscine/"):s.path.includes(`/bahrain/bh-module/piscine-${l}/`)),d=i.filter(s=>s.isDone).length,n=i.length,p=i.filter(s=>s.grade!==null).reduce((s,y)=>s+y.grade,0)/i.filter(s=>s.grade!==null).length||0;return{completed:d,total:n,completionRate:n>0?d/n*100:0,averageGrade:isNaN(p)?0:p,recentActivity:i.slice(0,5)}},G=(r,l)=>{const i=r.filter(s=>l==="go"?s.path.includes("/bahrain/bh-piscine/"):s.path.includes(`/bahrain/bh-module/piscine-${l}/`)),d=i.filter(s=>s.grade>=1).length,n=i.length,p=i.reduce((s,y)=>s+y.grade,0)/i.length||0;return{passed:d,total:n,passRate:n>0?d/n*100:0,averageGrade:isNaN(p)?0:p,recentResults:i.slice(0,5)}},A=(r=>{const l=new Set;return r.forEach(i=>{const d=i.path;d.includes("/bahrain/bh-piscine/")&&l.add("go");const n=d.match(/\/bahrain\/bh-module\/piscine-([^\/]+)\//);n&&l.add(n[1])}),Array.from(l)})(c),f=A.length>0?A:g;return f.length===0?e.jsxs("div",{className:"space-y-8",children:[e.jsxs(u.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Piscines Dashboard"}),e.jsx("p",{className:"text-white/70 text-lg",children:"Your piscine learning journey and achievements"})]}),e.jsx(I,{className:"p-8 text-center",children:e.jsxs("div",{className:"flex flex-col items-center space-y-4",children:[e.jsx(b,{className:"w-16 h-16 text-white/30"}),e.jsx("h3",{className:"text-xl font-semibold text-white",children:"No Piscines Found"}),e.jsx("p",{className:"text-white/60",children:"You haven't started any piscines yet. Piscines will appear here once you begin your learning journey."})]})})]}):e.jsxs("div",{className:"space-y-8",children:[e.jsx(F,{title:"Piscines Dashboard",subtitle:"Your piscine learning journey and achievements",icon:b}),e.jsx(u.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},children:e.jsx("nav",{className:"bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2",children:e.jsx("div",{className:"flex space-x-2 overflow-x-auto scrollbar-hide",children:f.map((r,l)=>e.jsxs(u.button,{onClick:()=>a(r),whileHover:{y:-2,scale:1.02},whileTap:{y:0},initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.1+l*.05},className:`flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${h===r?"bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25":"text-white/70 hover:text-white hover:bg-white/10 hover:shadow-md"}`,children:[e.jsx(b,{className:"w-5 h-5 mr-3"}),"Piscine ",r.toUpperCase()]},r))})})}),e.jsx(u.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:h?e.jsx(q,{user:o,piscineType:h}):e.jsx(O,{piscineTypes:f,xpTotals:k,transactions:c,progressData:m,resultsData:S,analyzeProgressByPiscine:C,analyzeResultsByPiscine:G,onSelectPiscine:a})},h)]})};export{V as default};
