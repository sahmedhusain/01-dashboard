import{r as h,j as e,m as l}from"./animation-vendor-BWQ_wUI_.js";import{L as S}from"./index-DIwVma_V.js";import{w as Y,N as B,e as g,V as T,f as V,_ as J,O as W,$ as z}from"./ui-vendor-BusGUpMC.js";import{d as f,e as y}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const H=y`
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
`,K=y`
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
`,X=y`
  query GetUserGroups($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`,Z=y`
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
`,ie=({user:u})=>{const[p,v]=h.useState("all"),[j,U]=h.useState(""),[b,A]=h.useState("all"),[o,C]=h.useState(null),{data:i,loading:w,error:$}=f(H,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:G}=f(X,{variables:{userId:u.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:n,loading:P}=f(Z,{variables:{userId:u.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:c,loading:q}=f(K,{variables:{groupId:o||0},skip:!o,errorPolicy:"all",fetchPolicy:"cache-first"}),I=()=>{let t=[];switch(p){case"all":t=i?.group||[];break;case"my-groups":{if(n){const a=n.captainGroups||[],s=n.group_user?.map(r=>r.group).filter(Boolean)||[];t=[...a,...s].filter((r,d,m)=>d===m.findIndex(x=>x.id===r.id))}else{const a=G?.group_user?.map(s=>s.groupId)||[];t=i?.group?.filter(s=>a.includes(s.id)||s.captainId===u.id)||[]}break}default:t=i?.group||[]}return j&&(t=t.filter(a=>a.path?.toLowerCase().includes(j.toLowerCase()))),b!=="all"&&(t=t.filter(a=>a.status===b)),t},k=t=>{switch(t){case"finished":return"text-green-400 bg-green-400/20";case"completed":return"text-green-400 bg-green-400/20";case"working":return"text-blue-400 bg-blue-400/20";case"setup":return"text-purple-400 bg-purple-400/20";case"audit":return"text-orange-400 bg-orange-400/20";default:return"text-gray-400 bg-gray-400/20"}},_=t=>new Date(t).toLocaleDateString(),M=t=>{if(!t)return"Unknown Project";const a=t.split("/");return a[a.length-1]||"Unknown Project"},L=t=>t.captain?.login?t.captain.login:`User #${t.captainId}`,R=()=>{if(n){const r=n.captainGroups||[],d=n.group_user?.map(N=>N.group).filter(Boolean)||[];return[...r,...d].filter((N,F,O)=>F===O.findIndex(Q=>Q.id===N.id)).length}const t=G?.group_user?.map(r=>r.groupId)||[],a=i?.group?.filter(r=>r.captainId===u.id)||[];return[...i?.group?.filter(r=>t.includes(r.id))||[],...a].filter((r,d,m)=>d===m.findIndex(x=>x.id===r.id)).length};return w&&!i?e.jsx(S,{}):p==="my-groups"&&P&&!n?e.jsx(S,{}):e.jsxs("div",{className:"space-y-6",children:[e.jsxs(l.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Group Dashboard"}),e.jsxs("p",{className:"text-white/70 text-lg",children:["Manage and explore ",i?.group_aggregate?.aggregate?.count||0," collaboration groups"]})]}),e.jsx(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"flex justify-center",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsxs("button",{onClick:()=>v("all"),className:`px-4 py-2 rounded-md transition-all ${p==="all"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["All Groups (",i?.group_aggregate?.aggregate?.count||0,")"]}),e.jsxs("button",{onClick:()=>v("my-groups"),className:`px-4 py-2 rounded-md transition-all ${p==="my-groups"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["My Groups (",R(),")"]})]})}),e.jsxs(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(Y,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search groups by project...",value:j,onChange:t=>U(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(B,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:b,onChange:t=>A(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"audit",children:"Audit"}),e.jsx("option",{value:"setup",children:"Setup"}),e.jsx("option",{value:"working",children:"Working"}),e.jsx("option",{value:"finished",children:"Finished"})]})]})]}),e.jsx(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:I().map((t,a)=>e.jsxs(l.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:a*.05},className:"bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 shadow-lg",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center",children:e.jsx(g,{className:"w-5 h-5 text-primary-400"})}),e.jsx("div",{children:e.jsxs("span",{className:"text-white font-semibold text-lg",children:["#",M(t.path)]})})]}),e.jsx("div",{className:`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${k(t.status)}`,children:t.status})]}),e.jsxs("div",{className:"space-y-4",children:[t.captainId&&e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center",children:e.jsx(T,{className:"w-4 h-4 text-yellow-400"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:L(t)}),e.jsx("div",{className:"text-slate-400 text-sm",children:"Captain"})]})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center",children:e.jsx(V,{className:"w-4 h-4 text-purple-400"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:_(t.createdAt)}),e.jsx("div",{className:"text-slate-400 text-sm",children:"Created"})]})]})]}),e.jsxs("div",{className:"flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50 cursor-pointer hover:bg-slate-700/30 rounded-lg p-3 transition-colors",onClick:()=>C(o===t.id?null:t.id),children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center",children:e.jsx(g,{className:"w-4 h-4 text-primary-400"})}),e.jsxs("div",{children:[e.jsxs("div",{className:"text-white font-medium",children:["Members (",c&&o===t.id?c.group_user?.length||0:"...",")"]}),e.jsx("div",{className:"text-slate-400 text-sm",children:"Click to view members"})]})]}),e.jsx("div",{className:"transition-transform duration-200",children:o===t.id?e.jsx(J,{className:"w-5 h-5 text-slate-400"}):e.jsx(W,{className:"w-5 h-5 text-slate-400"})})]}),o===t.id&&e.jsx(l.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30",children:q?e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-slate-400",children:"Loading members..."})]}):e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-4 pb-2 border-b border-slate-700/50",children:[e.jsx(z,{className:"w-5 h-5 text-primary-400"}),e.jsxs("span",{className:"text-white font-semibold",children:["Group Members (",c?.group_user?.length||0,")"]})]}),e.jsx("div",{className:"max-h-48 overflow-y-auto space-y-2 custom-scrollbar",children:c?.group_user?.map(s=>e.jsxs("div",{className:"flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20",children:e.jsx("span",{className:"text-primary-300 text-sm font-semibold",children:s.user?.firstName?.[0]||s.user?.login?.[0]||"U"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:s.user?.login||`User #${s.userId}`}),s.user?.firstName&&s.user?.lastName&&e.jsxs("div",{className:"text-slate-400 text-sm",children:[s.user.firstName," ",s.user.lastName]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-slate-400 text-xs",children:"Joined"}),e.jsx("div",{className:"text-slate-300 text-sm",children:_(s.createdAt)})]})]},s.id))}),(c?.group_user?.length||0)===0&&e.jsxs("div",{className:"text-center py-8",children:[e.jsx(g,{className:"w-12 h-12 text-slate-600 mx-auto mb-3"}),e.jsx("p",{className:"text-slate-400 text-sm",children:"No members found in this group"})]})]})})]},t.id))}),$&&e.jsx(l.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-4",children:e.jsx("p",{className:"text-red-200 text-sm",children:"Some group data may be unavailable. Using cached data where possible."})}),I().length===0&&!w&&e.jsxs(l.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(g,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})};export{ie as default};
