import{j as e,m as r}from"./animation-vendor-CTGg7XC5.js";import{L as N,c as b,C as a,g as y,X as w,A as v,S as P}from"./index-5epzrz73.js";import{e as m,q as S,k as R,j as h,A as _,r as A}from"./ui-vendor-g4Irxhbg.js";import{u as C,d as T}from"./apollo-vendor-CuB5uN0C.js";import"./react-vendor-Csw2ODfV.js";const I=T`
  query GetProjectProgress($userId: Int!) {
    # BH Module progress only (no piscines)
    progress(
      where: { 
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
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
    
    # Recent project completions
    recent_completions: progress(
      where: { 
        userId: { _eq: $userId }
        path: { _nregex: "piscine" }
        isDone: { _eq: true }
        grade: { _gte: 1 }
      }
      order_by: { updatedAt: desc }
      limit: 5
    ) {
      id
      grade
      path
      updatedAt
      object {
        name
        type
      }
    }
  }
`,k=({user:i})=>{const{data:o,loading:j,error:p}=C(I,{variables:{userId:i.id},errorPolicy:"all"});if(j)return e.jsx(N,{});if(p)return e.jsx("div",{className:"text-red-400",children:"Error loading project progress"});const c=o?.progress||[],x=o?.recent_completions||[],t=b(c),n=c.slice(0,10),d=c.slice(10,20),g=n.length>0?n.filter(s=>s.isDone&&s.grade>=1).length/n.length*100:0,u=d.length>0?d.filter(s=>s.isDone&&s.grade>=1).length/d.length*100:0,l=g-u;return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-2xl font-bold text-white mb-2",children:"Project Progress Tracker"}),e.jsx("p",{className:"text-white/60",children:"Your BH Module project completion analytics"})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsx(a,{className:"p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Projects Passed"}),e.jsx("p",{className:"text-3xl font-bold text-green-400",children:t.passed}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"Successfully completed"})]}),e.jsx("div",{className:"w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center",children:e.jsx(m,{className:"w-6 h-6 text-green-400"})})]})}),e.jsx(a,{className:"p-6 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Projects Failed"}),e.jsx("p",{className:"text-3xl font-bold text-red-400",children:t.failed}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"Need retry or improvement"})]}),e.jsx("div",{className:"w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center",children:e.jsx(S,{className:"w-6 h-6 text-red-400"})})]})}),e.jsx(a,{className:"p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Success Rate"}),e.jsxs("p",{className:"text-3xl font-bold text-blue-400",children:[t.passRate,"%"]}),e.jsxs("div",{className:"flex items-center mt-1",children:[e.jsx(R,{className:`w-3 h-3 mr-1 ${l>=0?"text-green-400":"text-red-400"}`}),e.jsxs("p",{className:`text-xs ${l>=0?"text-green-400":"text-red-400"}`,children:[l>=0?"+":"",l.toFixed(1),"% trend"]})]})]}),e.jsx("div",{className:"w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center",children:e.jsx(h,{className:"w-6 h-6 text-blue-400"})})]})}),e.jsx(a,{className:"p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Total Projects"}),e.jsx("p",{className:"text-3xl font-bold text-purple-400",children:t.total}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"Attempted so far"})]}),e.jsx("div",{className:"w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center",children:e.jsx(_,{className:"w-6 h-6 text-purple-400"})})]})})]}),e.jsxs(a,{className:"p-6",children:[e.jsxs("h4",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(h,{className:"w-5 h-5 mr-2 text-primary-400"}),"Success Rate Visualization"]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsxs("span",{className:"text-white/70",children:["Failed (",t.failed,")"]}),e.jsxs("span",{className:"text-white/70",children:["Passed (",t.passed,")"]})]}),e.jsx("div",{className:"relative",children:e.jsx("div",{className:"w-full bg-red-500/20 rounded-full h-6",children:e.jsx(r.div,{className:"bg-gradient-to-r from-green-500 to-green-600 h-6 rounded-full flex items-center justify-center",initial:{width:0},animate:{width:`${t.passRate}%`},transition:{duration:1.5,ease:"easeOut"},children:e.jsxs("span",{className:"text-xs font-bold text-white",children:[t.passRate,"%"]})})})}),e.jsx("div",{className:"text-center",children:e.jsxs("p",{className:"text-white/60 text-sm",children:[t.passed," out of ",t.total," projects completed successfully"]})})]})]}),e.jsxs(a,{className:"p-6",children:[e.jsxs("h4",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(m,{className:"w-5 h-5 mr-2 text-primary-400"}),"Recent Project Completions"]}),e.jsxs("div",{className:"space-y-3",children:[x.map((s,f)=>e.jsxs(r.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:f*.1},className:"flex items-center justify-between p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:s.object?.name||"Unknown Project"}),e.jsxs("p",{className:"text-white/60 text-sm",children:["🎯 Grade: ",s.grade," • ",y(s.updatedAt)]})]})]}),e.jsx("div",{className:"text-right",children:e.jsx("div",{className:"px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium",children:"Completed"})})]},s.id)),x.length===0&&e.jsxs("div",{className:"text-center text-white/60 py-8",children:[e.jsx("div",{className:"w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3",children:e.jsx(A,{className:"w-8 h-8 text-white/40"})}),e.jsx("p",{children:"No recent project completions"}),e.jsx("p",{className:"text-sm text-white/40 mt-1",children:"Complete projects to see your achievements here"})]})]})]})]})},B=({user:i})=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs(r.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Statistics Dashboard"}),e.jsx("p",{className:"text-white/70 text-lg",children:"Your comprehensive learning analytics and progress"})]}),e.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8",children:[e.jsx(r.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.5,delay:.1},children:e.jsx(w,{user:i})}),e.jsx(r.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{duration:.5,delay:.2},children:e.jsx(v,{user:i})})]}),e.jsx(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},children:e.jsx(k,{user:i})}),e.jsx(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e.jsx(P,{user:i})})]});export{B as default};
