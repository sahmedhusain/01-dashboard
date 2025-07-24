import{r as G,j as e,m as s}from"./animation-vendor-CTGg7XC5.js";import{L as F,c as O,C as i,g as V,f as S,X as U,A as X,S as B}from"./index-CtirGXoP.js";import{d as R,m as M,g as y,k,t as Q,j as w,l as A,A as $,n as H,G as E,T as I,r as Y,u as z,e as T,f as K,v as Z,B as J,Z as W,F as ee}from"./ui-vendor-CQLODBKU.js";import{d as N,e as v}from"./apollo-vendor-Dxrk3Lr4.js";import"./react-vendor-Csw2ODfV.js";const te=v`
  query GetAllUserProgress($userId: Int!) {
    progress(
      where: { userId: { _eq: $userId } }
      order_by: { createdAt: desc }
    ) {
      id
      grade
      isDone
      path
      version
      createdAt
      updatedAt
      groupId
      eventId
      objectId
      campus
    }

    progress_aggregate(where: { userId: { _eq: $userId } }) {
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
`,se=v`
  query GetProgressByPathView($userId: Int!) {
    progress_by_path_view(where: { userId: { _eq: $userId } }) {
      path
      userId
      createdAt
    }
  }
`,ae=v`
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
      groupId
      eventId
      objectId
      campus
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
      limit: 10
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
`,re=({user:d})=>{const[l,o]=G.useState("projects"),{data:a,loading:g,error:f}=N(ae,{variables:{userId:d.id},errorPolicy:"all"}),{data:p,loading:_}=N(te,{variables:{userId:d.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:r}=N(se,{variables:{userId:d.id},errorPolicy:"all",fetchPolicy:"cache-first"});if(g&&!a)return e.jsx(F,{});if(f)return e.jsx("div",{className:"text-red-400",children:"Error loading project progress"});const x=a?.progress||[],u=a?.recent_completions||[],n=O(x),m=p?.progress||[],j=p?.progress_aggregate?.aggregate,D=r?.progress_by_path_view||[],c={totalProgress:j?.count||0,averageGrade:j?.avg?.grade||0,maxGrade:j?.max?.grade||0,minGrade:j?.min?.grade||0,completedCount:m.filter(t=>t.isDone).length,inProgressCount:m.filter(t=>!t.isDone).length,pathCount:D.length},P=x.slice(0,10),C=x.slice(10,20),L=P.length>0?P.filter(t=>t.isDone&&t.grade>=1).length/P.length*100:0,q=C.length>0?C.filter(t=>t.isDone&&t.grade>=1).length/C.length*100:0,b=L-q;return e.jsxs("div",{className:"space-y-6",children:[e.jsxs(s.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h3",{className:"text-2xl font-bold text-white mb-2",children:"Comprehensive Progress Tracker"}),e.jsxs("p",{className:"text-white/60",children:["Your complete learning progress analytics with ",c.totalProgress," total records"]})]}),e.jsx(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"flex justify-center",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsxs("button",{onClick:()=>o("projects"),className:`px-4 py-2 rounded-md transition-all ${l==="projects"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["Projects (",n.total,")"]}),e.jsxs("button",{onClick:()=>o("all-progress"),className:`px-4 py-2 rounded-md transition-all ${l==="all-progress"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["All Progress (",c.totalProgress,")"]}),e.jsxs("button",{onClick:()=>o("completed"),className:`px-4 py-2 rounded-md transition-all ${l==="completed"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["Completed (",c.completedCount,")"]})]})}),e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",children:[e.jsx(i,{className:"p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Total Progress"}),e.jsx("p",{className:"text-2xl font-bold text-blue-400",children:c.totalProgress}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"All learning records"})]}),e.jsx("div",{className:"w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center",children:e.jsx(R,{className:"w-5 h-5 text-blue-400"})})]})}),e.jsx(i,{className:"p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Average Grade"}),e.jsxs("p",{className:"text-2xl font-bold text-green-400",children:[c.averageGrade.toFixed(1),"%"]}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"Overall performance"})]}),e.jsx("div",{className:"w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center",children:e.jsx(M,{className:"w-5 h-5 text-green-400"})})]})}),e.jsx(i,{className:"p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Completed"}),e.jsx("p",{className:"text-2xl font-bold text-purple-400",children:c.completedCount}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"Finished tasks"})]}),e.jsx("div",{className:"w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center",children:e.jsx(y,{className:"w-5 h-5 text-purple-400"})})]})}),e.jsx(i,{className:"p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"In Progress"}),e.jsx("p",{className:"text-2xl font-bold text-orange-400",children:c.inProgressCount}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"Active learning"})]}),e.jsx("div",{className:"w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center",children:e.jsx(k,{className:"w-5 h-5 text-orange-400"})})]})})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsx(i,{className:"p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Projects Passed"}),e.jsx("p",{className:"text-3xl font-bold text-green-400",children:n.passed}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"Successfully completed"})]}),e.jsx("div",{className:"w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center",children:e.jsx(y,{className:"w-6 h-6 text-green-400"})})]})}),e.jsx(i,{className:"p-6 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Projects Failed"}),e.jsx("p",{className:"text-3xl font-bold text-red-400",children:n.failed}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"Need retry or improvement"})]}),e.jsx("div",{className:"w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center",children:e.jsx(Q,{className:"w-6 h-6 text-red-400"})})]})}),e.jsx(i,{className:"p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Success Rate"}),e.jsxs("p",{className:"text-3xl font-bold text-blue-400",children:[n.passRate,"%"]}),e.jsxs("div",{className:"flex items-center mt-1",children:[e.jsx(w,{className:`w-3 h-3 mr-1 ${b>=0?"text-green-400":"text-red-400"}`}),e.jsxs("p",{className:`text-xs ${b>=0?"text-green-400":"text-red-400"}`,children:[b>=0?"+":"",b.toFixed(1),"% trend"]})]})]}),e.jsx("div",{className:"w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center",children:e.jsx(A,{className:"w-6 h-6 text-blue-400"})})]})}),e.jsx(i,{className:"p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-white/60 text-sm font-medium",children:"Total Projects"}),e.jsx("p",{className:"text-3xl font-bold text-purple-400",children:n.total}),e.jsx("p",{className:"text-white/50 text-xs mt-1",children:"Attempted so far"})]}),e.jsx("div",{className:"w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center",children:e.jsx($,{className:"w-6 h-6 text-purple-400"})})]})})]}),e.jsxs(i,{className:"p-6",children:[e.jsxs("h4",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(A,{className:"w-5 h-5 mr-2 text-primary-400"}),"Success Rate Visualization"]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsxs("span",{className:"text-white/70",children:["Failed (",n.failed,")"]}),e.jsxs("span",{className:"text-white/70",children:["Passed (",n.passed,")"]})]}),e.jsx("div",{className:"relative",children:e.jsx("div",{className:"w-full bg-red-500/20 rounded-full h-6",children:e.jsx(s.div,{className:"bg-gradient-to-r from-green-500 to-green-600 h-6 rounded-full flex items-center justify-center",initial:{width:0},animate:{width:`${n.passRate}%`},transition:{duration:1.5,ease:"easeOut"},children:e.jsxs("span",{className:"text-xs font-bold text-white",children:[n.passRate,"%"]})})})}),e.jsx("div",{className:"text-center",children:e.jsxs("p",{className:"text-white/60 text-sm",children:[n.passed," out of ",n.total," projects completed successfully"]})})]})]}),e.jsxs(i,{className:"p-6",children:[e.jsxs("h4",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(y,{className:"w-5 h-5 mr-2 text-primary-400"}),"Recent Project Completions"]}),e.jsxs("div",{className:"space-y-3",children:[u.map((t,h)=>e.jsxs(s.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:h*.1},className:"flex items-center justify-between p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:t.object?.name||"Unknown Project"}),e.jsxs("p",{className:"text-white/60 text-sm",children:["🎯 Grade: ",t.grade," • ",V(t.updatedAt)]})]})]}),e.jsx("div",{className:"text-right",children:e.jsx("div",{className:"px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium",children:"Completed"})})]},t.id)),u.length===0&&e.jsxs("div",{className:"text-center text-white/60 py-8",children:[e.jsx("div",{className:"w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3",children:e.jsx(H,{className:"w-8 h-8 text-white/40"})}),e.jsx("p",{children:"No recent project completions"}),e.jsx("p",{className:"text-sm text-white/40 mt-1",children:"Complete projects to see your achievements here"})]})]})]}),l==="all-progress"&&e.jsx(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e.jsxs(i,{className:"p-6",children:[e.jsxs("h4",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(E,{className:"w-5 h-5 mr-2 text-primary-400"}),"All Progress Records (",m.length,")"]}),e.jsxs("div",{className:"space-y-2 max-h-96 overflow-y-auto",children:[m.slice(0,20).map((t,h)=>e.jsxs(s.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:h*.02},className:"flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-3 h-3 rounded-full ${t.isDone?"bg-gradient-to-r from-green-400 to-green-500":"bg-gradient-to-r from-yellow-400 to-orange-500"}`}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-white font-medium text-sm truncate",children:t.path}),e.jsxs("div",{className:"flex items-center space-x-4 text-xs text-white/60",children:[e.jsxs("span",{children:["Grade: ",t.grade,"%"]}),e.jsxs("span",{children:["Version: ",t.version]}),e.jsx("span",{children:S(t.createdAt)}),t.campus&&e.jsxs("span",{children:["Campus: ",t.campus]})]})]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[t.groupId&&e.jsx("div",{className:"px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs",children:"Group"}),e.jsx("div",{className:`px-2 py-1 rounded text-xs font-medium ${t.isDone?"bg-green-500/20 text-green-400":"bg-yellow-500/20 text-yellow-400"}`,children:t.isDone?"Complete":"In Progress"})]})]},t.id)),m.length>20&&e.jsx("div",{className:"text-center py-4",children:e.jsxs("p",{className:"text-white/60 text-sm",children:["Showing 20 of ",m.length," progress records"]})})]})]})}),l==="completed"&&e.jsx(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e.jsxs(i,{className:"p-6",children:[e.jsxs("h4",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(I,{className:"w-5 h-5 mr-2 text-primary-400"}),"Completed Progress (",c.completedCount,")"]}),e.jsxs("div",{className:"space-y-2 max-h-96 overflow-y-auto",children:[m.filter(t=>t.isDone).slice(0,15).map((t,h)=>e.jsxs(s.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:h*.03},className:"flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(y,{className:"w-4 h-4 text-green-400"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-white font-medium text-sm truncate",children:t.path}),e.jsxs("div",{className:"flex items-center space-x-4 text-xs text-white/60",children:[e.jsxs("span",{children:["Grade: ",t.grade,"%"]}),e.jsxs("span",{children:["Completed: ",S(t.updatedAt||t.createdAt)]}),t.campus&&e.jsxs("span",{children:["Campus: ",t.campus]})]})]})]}),e.jsx("div",{className:"text-right",children:e.jsxs("div",{className:"px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium",children:[t.grade,"%"]})})]},t.id)),c.completedCount===0&&e.jsxs("div",{className:"text-center py-8",children:[e.jsx(I,{className:"w-12 h-12 text-white/30 mx-auto mb-3"}),e.jsx("p",{className:"text-white/60",children:"No completed progress yet"}),e.jsx("p",{className:"text-white/40 text-sm",children:"Keep learning to see your achievements here!"})]})]})]})}),_&&e.jsx(i,{className:"p-6",children:e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-white/70",children:"Loading comprehensive progress data..."})]})})]})},ie=v`
  query GetComprehensiveStatistics {
    # User statistics
    user_aggregate {
      aggregate {
        count
      }
    }

    # Event statistics
    event_user_view_aggregate {
      aggregate {
        count
      }
    }

    # Group statistics
    group_aggregate {
      aggregate {
        count
      }
    }

    group_user_aggregate {
      aggregate {
        count
      }
    }

    # Object and learning material statistics
    object_aggregate {
      aggregate {
        count
      }
    }

    object_availability_aggregate {
      aggregate {
        count
      }
    }

    object_child_aggregate {
      aggregate {
        count
      }
    }

    # Progress and results statistics
    progress_aggregate {
      aggregate {
        count
      }
    }

    result_aggregate {
      aggregate {
        count
      }
    }

    # Transaction and XP statistics
    transaction_aggregate {
      aggregate {
        count
        sum {
          amount
        }
      }
    }

    xp_transactions: transaction_aggregate(where: {type: {_eq: "xp"}}) {
      aggregate {
        count
        sum {
          amount
        }
      }
    }

    # Audit statistics
    audit_aggregate {
      aggregate {
        count
      }
    }

    # Registration statistics
    registration_aggregate {
      aggregate {
        count
      }
    }

    registration_user_view_aggregate {
      aggregate {
        count
      }
    }

    # Path and curriculum statistics
    path_aggregate {
      aggregate {
        count
      }
    }

    path_archive_aggregate {
      aggregate {
        count
      }
    }

    # Additional system statistics
    role_aggregate {
      aggregate {
        count
      }
    }

    object_type_aggregate {
      aggregate {
        count
      }
    }

    transaction_type_aggregate {
      aggregate {
        count
      }
    }

    record_type_aggregate {
      aggregate {
        count
      }
    }

    label_aggregate {
      aggregate {
        count
      }
    }

    markdown_aggregate {
      aggregate {
        count
      }
    }
  }
`,xe=({user:d})=>{const[l,o]=G.useState("overview"),{data:a,loading:g,error:f}=N(ie,{errorPolicy:"all",fetchPolicy:"cache-first"}),p=()=>a?[{title:"Total Users",value:a.user_aggregate?.aggregate?.count||0,icon:T,color:"from-blue-500 to-blue-600",description:"Active platform users"},{title:"Event Participations",value:a.event_user_view_aggregate?.aggregate?.count||0,icon:K,color:"from-green-500 to-green-600",description:"Event user records"},{title:"Active Groups",value:a.group_aggregate?.aggregate?.count||0,icon:T,color:"from-purple-500 to-purple-600",description:"Collaboration teams"},{title:"Group Members",value:a.group_user_aggregate?.aggregate?.count||0,icon:Z,color:"from-indigo-500 to-indigo-600",description:"Total group memberships"},{title:"Learning Objects",value:a.object_aggregate?.aggregate?.count||0,icon:J,color:"from-orange-500 to-orange-600",description:"Curriculum materials"},{title:"Object Availability",value:a.object_availability_aggregate?.aggregate?.count||0,icon:A,color:"from-teal-500 to-teal-600",description:"Resource availability records"},{title:"Progress Records",value:a.progress_aggregate?.aggregate?.count||0,icon:w,color:"from-emerald-500 to-emerald-600",description:"Learning progress entries"},{title:"Results",value:a.result_aggregate?.aggregate?.count||0,icon:$,color:"from-yellow-500 to-yellow-600",description:"Assessment results"},{title:"Transactions",value:a.transaction_aggregate?.aggregate?.count||0,icon:W,color:"from-red-500 to-red-600",description:"XP and skill transactions"},{title:"Total XP",value:a.transaction_aggregate?.aggregate?.sum?.amount||0,icon:k,color:"from-pink-500 to-pink-600",description:"Experience points earned",format:"number"},{title:"Audits",value:a.audit_aggregate?.aggregate?.count||0,icon:ee,color:"from-cyan-500 to-cyan-600",description:"Peer review records"},{title:"Learning Paths",value:a.path_aggregate?.aggregate?.count||0,icon:E,color:"from-violet-500 to-violet-600",description:"Available learning paths"}]:[],_=(r,x)=>x==="number"&&r>1e6?`${(r/1e6).toFixed(1)}M`:r>1e3?`${(r/1e3).toFixed(1)}K`:r.toLocaleString();return e.jsxs("div",{className:"space-y-8",children:[e.jsxs(s.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Statistics & Analytics Dashboard"}),e.jsx("p",{className:"text-white/70 text-lg",children:"Comprehensive data insights and analytics from real-time GraphQL queries"}),e.jsx("div",{className:"flex justify-center mt-6",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsxs("button",{onClick:()=>o("overview"),className:`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${l==="overview"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:[e.jsx(R,{className:"w-4 h-4"}),"Statistics Overview"]}),e.jsxs("button",{onClick:()=>o("analytics"),className:`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${l==="analytics"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:[e.jsx(Y,{className:"w-4 h-4"}),"Advanced Analytics"]}),e.jsxs("button",{onClick:()=>o("trends"),className:`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${l==="trends"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:[e.jsx(w,{className:"w-4 h-4"}),"Trends & Insights"]})]})})]}),l==="overview"&&e.jsxs(e.Fragment,{children:[e.jsx(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",children:p().map((r,x)=>{const u=r.icon;return e.jsxs(s.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:x*.05},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:`p-3 rounded-lg bg-gradient-to-r ${r.color}`,children:e.jsx(u,{className:"w-6 h-6 text-white"})}),g&&e.jsx("div",{className:"animate-pulse w-8 h-8 bg-white/20 rounded"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-white/90 font-medium text-sm",children:r.title}),e.jsx("p",{className:"text-2xl font-bold text-white",children:g?"...":_(r.value,r.format)}),e.jsx("p",{className:"text-white/60 text-xs",children:r.description})]})]},r.title)})}),f&&e.jsx(s.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-4",children:e.jsx("p",{className:"text-red-200 text-sm",children:"Some statistics may be unavailable. Using cached data where possible."})})]}),l==="analytics"&&e.jsx(e.Fragment,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8",children:[e.jsx(s.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.5,delay:.1},children:e.jsx(U,{user:d})}),e.jsx(s.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{duration:.5,delay:.2},children:e.jsx(X,{user:d})})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8",children:[e.jsx(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},children:e.jsx(B,{user:d})}),e.jsx(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e.jsx(re,{user:d})})]})]})}),l==="trends"&&e.jsx(e.Fragment,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(w,{className:"w-6 h-6 text-primary-400"}),e.jsx("h2",{className:"text-xl font-semibold text-white",children:"Performance Trends"})]}),e.jsx("p",{className:"text-white/70 mb-4",children:"Analyze your learning progress and performance trends over time."}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 border border-white/10",children:[e.jsx("h3",{className:"text-white font-medium mb-2",children:"XP Growth Trend"}),e.jsx("p",{className:"text-white/60 text-sm",children:"Track your XP accumulation over time"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 border border-white/10",children:[e.jsx("h3",{className:"text-white font-medium mb-2",children:"Audit Performance"}),e.jsx("p",{className:"text-white/60 text-sm",children:"Monitor your audit success rate"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 border border-white/10",children:[e.jsx("h3",{className:"text-white font-medium mb-2",children:"Project Completion"}),e.jsx("p",{className:"text-white/60 text-sm",children:"View project completion patterns"})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-4 border border-white/10",children:[e.jsx("h3",{className:"text-white font-medium mb-2",children:"Learning Velocity"}),e.jsx("p",{className:"text-white/60 text-sm",children:"Measure your learning speed"})]})]})]})})}),e.jsx(s.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.5},className:"bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(z,{className:"w-5 h-5 text-primary-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium text-sm",children:"Data Source"}),e.jsx("p",{className:"text-white/60 text-xs",children:"Real-time data from 113 comprehensive GraphQL queries"})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"text-white/90 text-sm font-medium",children:g?"Loading...":"Live Data"}),e.jsxs("p",{className:"text-white/60 text-xs",children:["Last updated: ",new Date().toLocaleTimeString()]})]})]})})]})};export{xe as default};
