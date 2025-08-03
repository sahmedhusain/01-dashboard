import{r as p,j as e,m as r}from"./animation-vendor-BWQ_wUI_.js";import{L as R,b as Z}from"./index-klJbW4i3.js";import{U as n,a1 as $,t as ee,e as E,a7 as D,x as te,O as se,X as ae,V as re,a3 as ie,a4 as le}from"./ui-vendor-bEJ0_QxH.js";import{d as C,e as k}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const oe=k`
  query GetAllGroups($limit: Int = 50, $offset: Int = 0) {
    group(limit: $limit, offset: $offset, order_by: {createdAt: desc}) {
      id
      objectId
      eventId
      captainId
      createdAt
      updatedAt
      status
      path
      campus
      captain {
        id
        login
        firstName
        lastName
      }
    }

    group_aggregate {
      aggregate {
        count
      }
    }
  }
`,ne=k`
  query GetGroupMembers($groupId: Int!) {
    group_user(where: {groupId: {_eq: $groupId}}) {
      id
      userId
      groupId
      createdAt
      updatedAt
      user {
        id
        login
        firstName
        lastName
      }
    }
  }
`,de=k`
  query GetUserGroups($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`,ce=k`
  query GetMyGroups($userId: Int!) {
    # Groups where user is a captain
    captainGroups: group(where: {captainId: {_eq: $userId}}) {
      id
      objectId
      eventId
      captainId
      createdAt
      updatedAt
      status
      path
      campus
      captain {
        id
        login
        firstName
        lastName
      }
    }

    # Get user's group memberships to find member groups
    group_user(where: {userId: {_eq: $userId}}) {
      groupId
      group {
        id
        objectId
        eventId
        captainId
        createdAt
        updatedAt
        status
        path
        campus
        captain {
          id
          login
          firstName
          lastName
        }
      }
    }
  }
`,ge=({user:d})=>{const[c,j]=p.useState("all"),[x,y]=p.useState(""),[l,P]=p.useState("all"),[h,T]=p.useState(null),[v,V]=p.useState(50),[w,N]=p.useState(1);p.useEffect(()=>{N(1)},[c,x,l]);const{data:u,loading:S,error:Y}=C(oe,{variables:{limit:v,offset:(w-1)*v},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:M}=C(de,{variables:{userId:d.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:m,loading:F}=C(ce,{variables:{userId:d.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:_,loading:O}=C(ne,{variables:{groupId:h||0},skip:!h,errorPolicy:"all",fetchPolicy:"cache-first"}),o=()=>{let t=[];switch(c){case"all":t=u?.group||[];break;case"my-groups":{if(m){const a=m.captainGroups||[],s=m.group_user?.map(i=>i.group).filter(Boolean)||[];t=[...a,...s].filter((i,f,G)=>f===G.findIndex(I=>I.id===i.id))}else{const a=M?.group_user?.map(s=>s.groupId)||[];t=u?.group?.filter(s=>a.includes(s.id)||s.captainId===d.id)||[]}break}default:t=u?.group||[]}return x&&(t=t.filter(a=>a.path?.toLowerCase().includes(x.toLowerCase()))),l!=="all"&&(t=t.filter(a=>a.status===l)),t},Q=t=>{switch(t){case"finished":return"text-green-400 bg-green-400/20";case"completed":return"text-green-400 bg-green-400/20";case"working":return"text-blue-400 bg-blue-400/20";case"setup":return"text-purple-400 bg-purple-400/20";case"audit":return"text-orange-400 bg-orange-400/20";default:return"text-gray-400 bg-gray-400/20"}},q=Z,z=t=>{if(!t)return"Unknown Project";const a=t.split("/");return a[a.length-1]||"Unknown Project"},B=t=>t.captain?.login?t.captain.login:`User #${t.captainId}`,L=()=>{if(m){const i=m.captainGroups||[],f=m.group_user?.map(U=>U.group).filter(Boolean)||[];return[...i,...f].filter((U,W,X)=>W===X.findIndex(K=>K.id===U.id)).length}const t=M?.group_user?.map(i=>i.groupId)||[],a=u?.group?.filter(i=>i.captainId===d.id)||[];return[...u?.group?.filter(i=>t.includes(i.id))||[],...a].filter((i,f,G)=>f===G.findIndex(I=>I.id===i.id)).length},b=u?.group_aggregate?.aggregate?.count||0,A=Math.ceil(b/v);return S&&!u?e.jsx(R,{}):c==="my-groups"&&F&&!m?e.jsx(R,{}):e.jsxs("div",{className:"bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 min-h-full relative",children:[e.jsxs("div",{className:"fixed inset-0 opacity-30 pointer-events-none z-0",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"}),e.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)",backgroundSize:"80px 80px"}})]}),e.jsx("div",{className:"relative z-10 overflow-hidden",children:e.jsxs("div",{className:"relative space-y-8 p-6",children:[e.jsxs(r.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center space-y-4",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4",children:e.jsx(n,{className:"w-10 h-10 text-emerald-400"})}),e.jsx("h1",{className:"text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent",children:"Groups Dashboard"}),e.jsxs("p",{className:"text-xl text-white/70 max-w-2xl mx-auto",children:["Collaborate and excel with ",e.jsx("span",{className:"text-emerald-400 font-semibold",children:b})," dynamic project teams"]})]}),e.jsxs(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6",children:[e.jsx(g,{icon:n,title:"Total Groups",value:b,color:"bg-gradient-to-r from-blue-500/30 to-cyan-500/30",bgGradient:"bg-gradient-to-br from-blue-900/20 to-cyan-900/20",subValue:"All collaborative groups"}),e.jsx(g,{icon:$,title:"My Groups",value:L(),color:"bg-gradient-to-r from-yellow-500/30 to-amber-500/30",bgGradient:"bg-gradient-to-br from-yellow-900/20 to-amber-900/20",subValue:"Your active participation"}),e.jsx(g,{icon:ee,title:"Active Groups",value:o().filter(t=>t.status==="working"||t.status==="audit").length,color:"bg-gradient-to-r from-green-500/30 to-emerald-500/30",bgGradient:"bg-gradient-to-br from-green-900/20 to-emerald-900/20",subValue:"Currently working",trend:o().filter(t=>t.status==="working"||t.status==="audit").length>b*.6?{value:15,isPositive:!0}:void 0}),e.jsx(g,{icon:E,title:"Completed",value:o().filter(t=>t.status==="finished").length,color:"bg-gradient-to-r from-purple-500/30 to-violet-500/30",bgGradient:"bg-gradient-to-br from-purple-900/20 to-violet-900/20",subValue:"Successfully finished"}),e.jsx(g,{icon:D,title:"As Captain",value:o().filter(t=>t.captainId===d.id).length,color:"bg-gradient-to-r from-red-500/30 to-rose-500/30",bgGradient:"bg-gradient-to-br from-red-900/20 to-rose-900/20",subValue:"Leadership roles"}),e.jsx(g,{icon:n,title:"As Member",value:L()-o().filter(t=>t.captainId===d.id).length,color:"bg-gradient-to-r from-indigo-500/30 to-blue-500/30",bgGradient:"bg-gradient-to-br from-indigo-900/20 to-blue-900/20",subValue:"Team collaborations"})]}),e.jsx(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},className:"flex justify-center",children:e.jsxs("div",{className:"bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl",children:[e.jsx(r.button,{whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},onClick:()=>j("all"),className:`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${c==="all"?"bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30":"text-white/70 hover:text-white hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(n,{className:"w-5 h-5"}),e.jsx("span",{children:"All Groups"})]})}),e.jsx(r.button,{whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},onClick:()=>j("my-groups"),className:`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${c==="my-groups"?"bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30":"text-white/70 hover:text-white hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx($,{className:"w-5 h-5"}),e.jsx("span",{children:"My Groups"})]})})]})}),e.jsxs(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(te,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search groups by project...",value:x,onChange:t=>y(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(se,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:l,onChange:t=>P(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"audit",children:"Audit"}),e.jsx("option",{value:"setup",children:"Setup"}),e.jsx("option",{value:"working",children:"Working"}),e.jsx("option",{value:"finished",children:"Finished"})]})]})]}),e.jsx(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:o().map((t,a)=>e.jsxs(r.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:a*.05},className:"bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 shadow-lg",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center",children:e.jsx(n,{className:"w-5 h-5 text-primary-400"})}),e.jsx("div",{children:e.jsxs("span",{className:"text-white font-semibold text-lg",children:["#",z(t.path)]})})]}),e.jsx("div",{className:`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${Q(t.status)}`,children:t.status})]}),e.jsxs("div",{className:"space-y-4",children:[t.captainId&&e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center",children:e.jsx($,{className:"w-4 h-4 text-yellow-400"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:B(t)}),e.jsx("div",{className:"text-slate-400 text-sm",children:"Captain"})]})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center",children:e.jsx(E,{className:"w-4 h-4 text-purple-400"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:q(t.createdAt)}),e.jsx("div",{className:"text-slate-400 text-sm",children:"Created"})]})]})]}),e.jsxs("div",{className:"flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50 cursor-pointer hover:bg-slate-700/30 rounded-lg p-3 transition-colors",onClick:()=>T(h===t.id?null:t.id),children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center",children:e.jsx(n,{className:"w-4 h-4 text-primary-400"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:"Group Members"}),e.jsx("div",{className:"text-slate-400 text-sm",children:h===t.id?"Click to hide members":"Click to view members"})]})]}),e.jsx("div",{className:"transition-transform duration-200",children:h===t.id?e.jsx(ae,{className:"w-5 h-5 text-slate-400"}):e.jsx(re,{className:"w-5 h-5 text-slate-400"})})]}),h===t.id&&e.jsx(r.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30",children:O?e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-slate-400",children:"Loading members..."})]}):e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-4 pb-2 border-b border-slate-700/50",children:[e.jsx(D,{className:"w-5 h-5 text-primary-400"}),e.jsxs("span",{className:"text-white font-semibold",children:["Group Members (",_?.group_user?.length||0,")"]})]}),e.jsx("div",{className:"max-h-48 overflow-y-auto space-y-2 custom-scrollbar",children:_?.group_user?.map(s=>e.jsxs("div",{className:"flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20",children:e.jsx("span",{className:"text-primary-300 text-sm font-semibold",children:s.user?.firstName?.[0]||s.user?.login?.[0]||"U"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:s.user?.login||`User #${s.userId}`}),s.user?.firstName&&s.user?.lastName&&e.jsxs("div",{className:"text-slate-400 text-sm",children:[s.user.firstName," ",s.user.lastName]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-slate-400 text-xs",children:"Joined"}),e.jsx("div",{className:"text-slate-300 text-sm",children:q(s.createdAt)})]})]},s.id))}),(_?.group_user?.length||0)===0&&e.jsxs("div",{className:"text-center py-8",children:[e.jsx(n,{className:"w-12 h-12 text-slate-600 mx-auto mb-3"}),e.jsx("p",{className:"text-slate-400 text-sm",children:"No members found in this group"})]})]})})]},t.id))}),e.jsxs(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"flex items-center justify-between text-white",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-sm",children:"Items per page:"}),e.jsxs("select",{value:v,onChange:t=>{V(Number(t.target.value)),N(1)},className:"bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:20,children:"20"}),e.jsx("option",{value:50,children:"50"}),e.jsx("option",{value:100,children:"100"})]})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("span",{className:"text-sm",children:["Showing ",o().length," of ",b," groups (Page ",w," of ",A,")"]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{onClick:()=>N(t=>Math.max(t-1,1)),disabled:w===1,className:"p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",children:e.jsx(ie,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>N(t=>Math.min(t+1,A)),disabled:w===A,className:"p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",children:e.jsx(le,{className:"w-4 h-4"})})]})]})]}),o().length===0&&!S&&e.jsxs(r.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(n,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]}),Y&&e.jsx(r.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-4",children:e.jsx("p",{className:"text-red-200 text-sm",children:"Some group data may be unavailable. Using cached data where possible."})}),o().length===0&&!S&&e.jsxs(r.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(n,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})})]})},g=({icon:d,title:c,value:j,color:x,subValue:y,trend:l,bgGradient:P})=>e.jsxs(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:`${P||"bg-gradient-to-br from-slate-800/50 to-slate-900/50"} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:`p-3 rounded-xl ${x} backdrop-blur-sm`,children:e.jsx(d,{className:"w-8 h-8 text-white drop-shadow-lg"})}),l&&e.jsxs("div",{className:`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${l.isPositive?"bg-green-500/20 text-green-400":"bg-red-500/20 text-red-400"}`,children:[l.isPositive?"↗":"↘"," ",Math.abs(l.value),"%"]})]}),e.jsx("h3",{className:"text-3xl font-bold text-white mb-2 tracking-tight",children:j}),e.jsx("p",{className:"text-white/70 text-sm font-medium",children:c}),y&&e.jsx("p",{className:"text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1",children:y})]});export{ge as default};
