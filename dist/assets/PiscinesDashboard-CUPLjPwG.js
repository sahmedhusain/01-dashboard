import{j as e,m as v,r as O}from"./animation-vendor-BWQ_wUI_.js";import B from"./PiscineSection-D0XY-2u2.js";import{C as q}from"./Card-boLi8-L0.js";import{f as $,a as F,L as E,s as H,c as Y,S as z}from"./index-DIwVma_V.js";import{B as P}from"./ui-vendor-BusGUpMC.js";import{d as G,e as S}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const U=({piscineTypes:x,xpTotals:f,transactions:p,progressData:r,resultsData:k,analyzeProgressByPiscine:_,analyzeResultsByPiscine:A,onSelectPiscine:D})=>e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-white mb-6",children:"Piscines Overview"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:x.map(i=>{const u=f.piscines[i]||0,h=_(r,i),b=A(k,i);return e.jsx(v.div,{whileHover:{y:-5},className:"cursor-pointer",onClick:()=>D(i),children:e.jsx(q,{className:"p-6 h-full bg-white/5 hover:bg-white/10 transition-colors",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"text-white/60 text-sm font-medium",children:["Piscine ",i.toUpperCase()]}),e.jsx("p",{className:"text-3xl font-bold text-primary-400",children:$(u)})]}),e.jsx("div",{className:"w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center",children:e.jsx(P,{className:"w-6 h-6 text-primary-400"})})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 text-sm",children:[e.jsxs("div",{className:"bg-white/5 rounded-lg p-3",children:[e.jsx("div",{className:"text-white/60",children:"Progress"}),e.jsxs("div",{className:"text-white font-bold",children:[h.completed,"/",h.total]}),e.jsxs("div",{className:"text-xs text-green-400",children:[h.completionRate.toFixed(1),"%"]})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-3",children:[e.jsx("div",{className:"text-white/60",children:"Pass Rate"}),e.jsxs("div",{className:"text-white font-bold",children:[b.passed,"/",b.total]}),e.jsxs("div",{className:"text-xs text-blue-400",children:[b.passRate.toFixed(1),"%"]})]})]}),e.jsx("p",{className:"text-white/50 text-xs",children:"Click to view details"})]})})},i)})}),e.jsxs(q,{className:"p-6 bg-white/5",children:[e.jsx("h3",{className:"text-lg font-semibold text-white mb-4",children:"Total Piscine Statistics"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-green-400 mb-2",children:$(f.allPiscines)}),e.jsx("div",{className:"text-white/60 text-sm",children:"Total Piscine XP"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-blue-400 mb-2",children:x.length}),e.jsx("div",{className:"text-white/60 text-sm",children:"Piscines Started"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-purple-400 mb-2",children:r.filter(i=>i.isDone).length}),e.jsx("div",{className:"text-white/60 text-sm",children:"Projects Completed"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-yellow-400 mb-2",children:p.length}),e.jsx("div",{className:"text-white/60 text-sm",children:"XP Transactions"})]})]}),e.jsx("div",{className:"mt-6 pt-6 border-t border-white/10",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[e.jsx("div",{className:"text-white/60 text-sm mb-1",children:"Overall Completion"}),e.jsxs("div",{className:"text-2xl font-bold text-green-400",children:[r.length>0?(r.filter(i=>i.isDone).length/r.length*100).toFixed(1):0,"%"]})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[e.jsx("div",{className:"text-white/60 text-sm mb-1",children:"Average Grade"}),e.jsx("div",{className:"text-2xl font-bold text-blue-400",children:r.filter(i=>i.grade).length>0?F(r.filter(i=>i.grade).reduce((i,u)=>i+u.grade,0)/r.filter(i=>i.grade).length):"0%"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4",children:[e.jsx("div",{className:"text-white/60 text-sm mb-1",children:"Active Projects"}),e.jsx("div",{className:"text-2xl font-bold text-yellow-400",children:r.filter(i=>!i.isDone).length})]})]})})]})]}),se=({user:x,piscineTypes:f})=>{const[p,r]=O.useState(""),{data:k,loading:_}=G(S`
    query GetAllPiscineXP($userId: Int!) {
      transaction(
        where: {
          userId: { _eq: $userId }
          type: { _eq: "xp" }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
          _not: { 
            _or: [
              { path: { _like: "%checkpoint%" } }
              { type: { _eq: "exam" } }
            ]
          }
        }
        order_by: { createdAt: desc }
      ) {
        id
        amount
        path
        createdAt
        attrs
        object {
          name
          type
          attrs
        }
      }
    }
  `,{variables:{userId:x.id},errorPolicy:"all"}),{data:A,loading:D}=G(S`
    query GetPiscineProgress($userId: Int!) {
      progress(
        where: {
          userId: { _eq: $userId }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
          _not: { path: { _like: "%checkpoint%" } }
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
        object {
          name
          type
          attrs
        }
      }
    }
  `,{variables:{userId:x.id},errorPolicy:"all"}),{data:i,loading:u}=G(S`
    query GetPiscineResults($userId: Int!) {
      result(
        where: {
          userId: { _eq: $userId }
          _or: [
            { path: { _like: "/bahrain/bh-piscine/%" } }
            { path: { _like: "/bahrain/bh-module/piscine-%" } }
          ]
          _not: { path: { _like: "%checkpoint%" } }
        }
        order_by: { updatedAt: desc }
      ) {
        id
        grade
        path
        createdAt
        updatedAt
        type
        attrs
        object {
          name
          type
          attrs
        }
      }
    }
  `,{variables:{userId:x.id},errorPolicy:"all"});if(_||D||u)return e.jsx(E,{});const h=k?.transaction||[],b=A?.progress||[],M=i?.result||[];H(h);const X=Y(h),T=(c,n)=>{const a=c.filter(t=>n==="go"?t.path.includes("/bahrain/bh-piscine/")&&!t.path.includes("checkpoint"):t.path.includes(`/bahrain/bh-module/piscine-${n}/`)&&!t.path.includes("checkpoint")),l=a.filter(t=>t.isDone).length,m=a.filter(t=>t.isDone&&t.grade>=1).length,d=a.filter(t=>t.isDone&&t.grade<1).length,N=a.filter(t=>!t.isDone).length,j=a.length,o=a.filter(t=>t.grade!==null&&t.grade!==void 0),w=o.length>0?o.reduce((t,g)=>t+g.grade,0)/o.length:0,y=a.reduce((t,g)=>{const R=g.path.split("/").pop()||"unknown";return t[R]||(t[R]=[]),t[R].push(g),t},{}),s=Object.keys(y).sort();return{completed:l,passed:m,failed:d,inProgress:N,total:j,completionRate:j>0?l/j*100:0,passRate:l>0?m/l*100:0,averageGrade:isNaN(w)?0:w,recentActivity:a.sort((t,g)=>new Date(g.updatedAt).getTime()-new Date(t.updatedAt).getTime()).slice(0,8),projectGroups:y,uniqueProjects:s,projectsCount:s.length,bestGrade:o.length>0?Math.max(...o.map(t=>t.grade)):0,worstGrade:o.length>0?Math.min(...o.map(t=>t.grade)):0}},L=(c,n)=>{const a=c.filter(s=>n==="go"?s.path.includes("/bahrain/bh-piscine/")&&!s.path.includes("checkpoint"):s.path.includes(`/bahrain/bh-module/piscine-${n}/`)&&!s.path.includes("checkpoint")),l=a.filter(s=>s.grade>=1).length,m=a.filter(s=>s.grade<1).length,d=a.length,N=d>0?a.reduce((s,t)=>s+t.grade,0)/d:0,j=a.filter(s=>s.grade>=1.2).length,o=a.filter(s=>s.grade>=1&&s.grade<1.2).length,w=a.filter(s=>s.grade>=.8&&s.grade<1).length,y=a.filter(s=>s.grade<.8).length;return{passed:l,failed:m,total:d,passRate:d>0?l/d*100:0,averageGrade:isNaN(N)?0:N,recentResults:a.sort((s,t)=>new Date(t.updatedAt).getTime()-new Date(s.updatedAt).getTime()).slice(0,6),gradeDistribution:{excellent:j,good:o,acceptable:w,poor:y},bestGrade:d>0?Math.max(...a.map(s=>s.grade)):0,worstGrade:d>0?Math.min(...a.map(s=>s.grade)):0}},C=(c=>{const n=new Set;return c.forEach(a=>{const l=a.path;if(l.includes("checkpoint"))return;l.includes("/bahrain/bh-piscine/")&&n.add("go");const m=l.match(/\/bahrain\/bh-module\/piscine-([^\/]+)\//);m&&n.add(m[1])}),Array.from(n).sort()})(h),I=C.length>0?C:f;return I.length===0?e.jsxs("div",{className:"space-y-8",children:[e.jsxs(v.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Piscines Dashboard"}),e.jsx("p",{className:"text-white/70 text-lg",children:"Your piscine learning journey and achievements"})]}),e.jsx(q,{className:"p-8 text-center",children:e.jsxs("div",{className:"flex flex-col items-center space-y-4",children:[e.jsx(P,{className:"w-16 h-16 text-white/30"}),e.jsx("h3",{className:"text-xl font-semibold text-white",children:"No Piscines Found"}),e.jsx("p",{className:"text-white/60",children:"You haven't started any piscines yet. Piscines will appear here once you begin your learning journey."})]})})]}):e.jsxs("div",{className:"space-y-8",children:[e.jsx(z,{title:"Piscines Dashboard",subtitle:"Your piscine learning journey and achievements",icon:P}),e.jsx(v.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},children:e.jsx("nav",{className:"bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2",children:e.jsx("div",{className:"flex space-x-2 overflow-x-auto scrollbar-hide",children:I.map((c,n)=>e.jsxs(v.button,{onClick:()=>r(c),whileHover:{y:-2,scale:1.02},whileTap:{y:0},initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.1+n*.05},className:`flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${p===c?"bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25":"text-white/70 hover:text-white hover:bg-white/10 hover:shadow-md"}`,children:[e.jsx(P,{className:"w-5 h-5 mr-3"}),"Piscine ",c.toUpperCase()]},c))})})}),e.jsx(v.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:p?e.jsx(B,{user:x,piscineType:p}):e.jsx(U,{piscineTypes:I,xpTotals:X,transactions:h,progressData:b,resultsData:M,analyzeProgressByPiscine:T,analyzeResultsByPiscine:L,onSelectPiscine:r})},p)]})};export{se as default};
