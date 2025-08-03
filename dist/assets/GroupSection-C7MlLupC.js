import{r as g,j as e,m as l}from"./animation-vendor-w_1g82yL.js";import{L as Y,b as se}from"./index-CQX0gRRp.js";import{U as m,a0 as P,t as re,e as Q,a6 as O,x as ie,N as le,W as oe,Q as ne,a1 as ce,a2 as de}from"./ui-vendor-CAUkr1F8.js";import{d as j,e as v}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const ue=v`
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
`,me=v`
  query GetGroupStats($userId: Int!) {
    # All groups for general stats
    all_groups: group {
      id
      status
      captainId
    }

    # Total groups count
    group_aggregate {
      aggregate {
        count
      }
    }

    # User's captain groups count
    captain_groups_aggregate: group_aggregate(where: {captainId: {_eq: $userId}}) {
      aggregate {
        count
      }
    }

    # User's member groups count  
    member_groups_aggregate: group_user_aggregate(where: {userId: {_eq: $userId}}) {
      aggregate {
        count
      }
    }
  }
`,pe=v`
  query GetAllGroupsWithMembers($searchTerm: String!) {
    # Search groups by member names
    group_user(
      where: {
        _or: [
          { user: { login: { _ilike: $searchTerm } } },
          { user: { firstName: { _ilike: $searchTerm } } },
          { user: { lastName: { _ilike: $searchTerm } } }
        ]
      }
      distinct_on: groupId
    ) {
      groupId
      user {
        login
        firstName
        lastName
      }
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
`,xe=v`
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
`,ge=v`
  query GetUserGroups($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`,he=v`
  query GetMyGroups($userId: Int!) {
    # Groups where user is a captain
    captainGroups: group(where: {captainId: {_eq: $userId}}, order_by: {createdAt: desc}) {
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
`,Ge=({user:c})=>{const[x,w]=g.useState("all"),[d,G]=g.useState(""),[u,k]=g.useState("all"),[h,V]=g.useState(null),[I,F]=g.useState(50),[_,$]=g.useState(1);g.useEffect(()=>{$(1)},[x,d,u]);const{data:N,loading:M,error:B}=j(ue,{variables:{limit:I,offset:(_-1)*I},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:U}=j(ge,{variables:{userId:c.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:C,loading:W}=j(he,{variables:{userId:c.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:S}=j(me,{variables:{userId:c.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:T,loading:z}=j(xe,{variables:{groupId:h||0},skip:!h,errorPolicy:"all",fetchPolicy:"cache-first"}),{data:H,loading:be}=j(pe,{variables:{searchTerm:`%${d}%`},skip:!d||d.length<2,errorPolicy:"all",fetchPolicy:"cache-first"}),E=t=>{if(!t)return"";const s=t.split("/");return(s[s.length-1]||"").replace(/-/g," ")},J=t=>[],K=t=>{if(!t.captain)return"";const s=[];return t.captain.login&&s.push(t.captain.login),t.captain.firstName&&s.push(t.captain.firstName),t.captain.lastName&&s.push(t.captain.lastName),s.join(" ")},X=(t,s)=>{if(!s)return!0;const a=s.toLowerCase();return!!(E(t.path).toLowerCase().includes(a)||t.path?.toLowerCase().includes(a)||K(t).toLowerCase().includes(a)||J().some(n=>n.toLowerCase().includes(a)))},A=()=>{let t=[];switch(x){case"all":t=N?.group||[];break;case"my-groups":{if(C){const s=C.captainGroups||[],a=C.group_user?.map(o=>o.group).filter(Boolean)||[];t=[...s,...a].filter((o,n,b)=>n===b.findIndex(q=>q.id===o.id)).sort((o,n)=>new Date(n.createdAt).getTime()-new Date(o.createdAt).getTime())}else{const s=U?.group_user?.map(i=>i.groupId)||[];t=(N?.group?.filter(i=>s.includes(i.id)||i.captainId===c.id)||[]).sort((i,r)=>new Date(r.createdAt).getTime()-new Date(i.createdAt).getTime())}break}default:t=N?.group||[]}if(d){const s=t.filter(r=>X(r,d)),a=H?.group_user?.map(r=>r.group).filter(Boolean)||[];t=[...s,...a].filter((r,o,n)=>o===n.findIndex(b=>b.id===r.id))}return u!=="all"&&(t=t.filter(s=>s.status===u)),t},Z=t=>{switch(t){case"finished":return"text-green-400 bg-green-400/20";case"completed":return"text-green-400 bg-green-400/20";case"working":return"text-blue-400 bg-blue-400/20";case"setup":return"text-purple-400 bg-purple-400/20";case"audit":return"text-orange-400 bg-orange-400/20";default:return"text-gray-400 bg-gray-400/20"}},D=se,ee=t=>t.captain?.login?t.captain.login:`User #${t.captainId}`,te=t=>t.captainId===c.id?!0:(U?.group_user?.map(a=>a.groupId)||[]).includes(t.id),ae=t=>t.captainId===c.id?"Captain":(U?.group_user?.map(a=>a.groupId)||[]).includes(t.id)?"Member":"",p=(()=>{const t=S?.all_groups||[],s=S?.group_aggregate?.aggregate?.count||0,a=S?.captain_groups_aggregate?.aggregate?.count||0,i=S?.member_groups_aggregate?.aggregate?.count||0,r=t.filter(f=>f.status==="working"||f.status==="audit").length,o=t.filter(f=>f.status==="finished").length,n=t.filter(f=>f.captainId===c.id).length,b=Math.max(a,i,a+i-a),q=Math.max(0,b-n);return{total:s,active:r,completed:o,userTotal:b,userAsCaptain:n,userAsMember:q}})(),R=N?.group_aggregate?.aggregate?.count||0,L=Math.ceil(R/I);return M&&!N?e.jsx(Y,{}):x==="my-groups"&&W&&!C?e.jsx(Y,{}):e.jsxs("div",{className:"bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 h-full w-full relative",children:[e.jsxs("div",{className:"fixed inset-0 opacity-30 pointer-events-none z-0",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"}),e.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)",backgroundSize:"80px 80px"}})]}),e.jsx("div",{className:"relative z-10 h-full w-full overflow-y-auto",children:e.jsxs("div",{className:"relative space-y-8 p-6",children:[e.jsxs(l.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center space-y-4",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4",children:e.jsx(m,{className:"w-10 h-10 text-emerald-400"})}),e.jsx("h1",{className:"text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent",children:"Groups Dashboard"}),e.jsxs("p",{className:"text-xl text-white/70 max-w-2xl mx-auto",children:["Collaborate and excel with ",e.jsx("span",{className:"text-emerald-400 font-semibold",children:R})," dynamic project teams"]})]}),e.jsxs(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6",children:[e.jsx(y,{icon:m,title:"Total Groups",value:p.total,color:"bg-gradient-to-r from-blue-500/30 to-cyan-500/30",bgGradient:"bg-gradient-to-br from-blue-900/20 to-cyan-900/20",subValue:"All collaborative groups"}),e.jsx(y,{icon:P,title:"My Groups",value:p.userTotal,color:"bg-gradient-to-r from-yellow-500/30 to-amber-500/30",bgGradient:"bg-gradient-to-br from-yellow-900/20 to-amber-900/20",subValue:"Your active participation"}),e.jsx(y,{icon:re,title:"Active Groups",value:p.active,color:"bg-gradient-to-r from-green-500/30 to-emerald-500/30",bgGradient:"bg-gradient-to-br from-green-900/20 to-emerald-900/20",subValue:"Currently working",trend:p.active>p.total*.6?{value:15,isPositive:!0}:void 0}),e.jsx(y,{icon:Q,title:"Completed",value:p.completed,color:"bg-gradient-to-r from-purple-500/30 to-violet-500/30",bgGradient:"bg-gradient-to-br from-purple-900/20 to-violet-900/20",subValue:"Successfully finished"}),e.jsx(y,{icon:O,title:"As Captain",value:p.userAsCaptain,color:"bg-gradient-to-r from-red-500/30 to-rose-500/30",bgGradient:"bg-gradient-to-br from-red-900/20 to-rose-900/20",subValue:"Leadership roles"}),e.jsx(y,{icon:m,title:"As Member",value:p.userAsMember,color:"bg-gradient-to-r from-indigo-500/30 to-blue-500/30",bgGradient:"bg-gradient-to-br from-indigo-900/20 to-blue-900/20",subValue:"Team collaborations"})]}),e.jsx(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},className:"flex justify-center",children:e.jsxs("div",{className:"bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl",children:[e.jsx(l.button,{whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},onClick:()=>w("all"),className:`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${x==="all"?"bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30":"text-white/70 hover:text-white hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(m,{className:"w-5 h-5"}),e.jsx("span",{children:"All Groups"})]})}),e.jsx(l.button,{whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},onClick:()=>w("my-groups"),className:`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${x==="my-groups"?"bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30":"text-white/70 hover:text-white hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(P,{className:"w-5 h-5"}),e.jsx("span",{children:"My Groups"})]})})]})}),e.jsxs(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(ie,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search by project, members, or captain...",value:d,onChange:t=>G(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(le,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:u,onChange:t=>k(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"audit",children:"Audit"}),e.jsx("option",{value:"setup",children:"Setup"}),e.jsx("option",{value:"working",children:"Working"}),e.jsx("option",{value:"finished",children:"Finished"})]})]})]}),e.jsx(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:A().map((t,s)=>{const a=te(t),i=ae(t);return e.jsxs(l.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:s*.05},className:`backdrop-blur-lg rounded-xl p-6 transition-all duration-300 shadow-lg relative ${a?"bg-emerald-900/30 border-2 border-emerald-500/50 hover:bg-emerald-900/40 hover:border-emerald-400/60 shadow-emerald-500/20":"bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50"}`,children:[a&&e.jsx("div",{className:"absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx(P,{className:"w-3 h-3"}),e.jsxs("span",{children:["Your Group (",i,")"]})]})}),e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-10 h-10 rounded-lg flex items-center justify-center ${a?"bg-emerald-500/20":"bg-primary-500/20"}`,children:e.jsx(m,{className:`w-5 h-5 ${a?"text-emerald-400":"text-primary-400"}`})}),e.jsx("div",{children:e.jsxs("span",{className:`font-semibold text-lg ${a?"text-emerald-100":"text-white"}`,children:["#",E(t.path)]})})]}),e.jsx("div",{className:`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${Z(t.status)}`,children:t.status})]}),e.jsxs("div",{className:"space-y-4",children:[t.captainId&&e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${a?"bg-emerald-500/20":"bg-yellow-500/20"}`,children:e.jsx(P,{className:`w-4 h-4 ${a?"text-emerald-400":"text-yellow-400"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:`font-medium ${a?"text-emerald-100":"text-white"}`,children:ee(t)}),e.jsx("div",{className:`text-sm ${a?"text-emerald-300":"text-slate-400"}`,children:"Captain"})]})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${a?"bg-emerald-500/20":"bg-purple-500/20"}`,children:e.jsx(Q,{className:`w-4 h-4 ${a?"text-emerald-400":"text-purple-400"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:`font-medium ${a?"text-emerald-100":"text-white"}`,children:D(t.createdAt)}),e.jsx("div",{className:`text-sm ${a?"text-emerald-300":"text-slate-400"}`,children:"Created"})]})]})]}),e.jsxs("div",{className:`flex items-center justify-between mt-6 pt-4 border-t transition-colors cursor-pointer rounded-lg p-3 ${a?"border-emerald-700/50 hover:bg-emerald-700/30":"border-slate-700/50 hover:bg-slate-700/30"}`,onClick:()=>V(h===t.id?null:t.id),children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${a?"bg-emerald-500/20":"bg-primary-500/20"}`,children:e.jsx(m,{className:`w-4 h-4 ${a?"text-emerald-400":"text-primary-400"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:`font-medium ${a?"text-emerald-100":"text-white"}`,children:"Group Members"}),e.jsx("div",{className:`text-sm ${a?"text-emerald-300":"text-slate-400"}`,children:h===t.id?"Click to hide members":"Click to view members"})]})]}),e.jsx("div",{className:"transition-transform duration-200",children:h===t.id?e.jsx(oe,{className:`w-5 h-5 ${a?"text-emerald-400":"text-slate-400"}`}):e.jsx(ne,{className:`w-5 h-5 ${a?"text-emerald-400":"text-slate-400"}`})})]}),h===t.id&&e.jsx(l.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30",children:z?e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-slate-400",children:"Loading members..."})]}):e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-4 pb-2 border-b border-slate-700/50",children:[e.jsx(O,{className:"w-5 h-5 text-primary-400"}),e.jsxs("span",{className:"text-white font-semibold",children:["Group Members (",T?.group_user?.length||0,")"]})]}),e.jsx("div",{className:"max-h-48 overflow-y-auto space-y-2 custom-scrollbar",children:T?.group_user?.map(r=>e.jsxs("div",{className:"flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20",children:e.jsx("span",{className:"text-primary-300 text-sm font-semibold",children:r.user?.firstName?.[0]||r.user?.login?.[0]||"U"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:r.user?.login||`User #${r.userId}`}),r.user?.firstName&&r.user?.lastName&&e.jsxs("div",{className:"text-slate-400 text-sm",children:[r.user.firstName," ",r.user.lastName]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-slate-400 text-xs",children:"Joined"}),e.jsx("div",{className:"text-slate-300 text-sm",children:D(r.createdAt)})]})]},r.id))}),(T?.group_user?.length||0)===0&&e.jsxs("div",{className:"text-center py-8",children:[e.jsx(m,{className:"w-12 h-12 text-slate-600 mx-auto mb-3"}),e.jsx("p",{className:"text-slate-400 text-sm",children:"No members found in this group"})]})]})})]},t.id)})}),e.jsxs(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"flex items-center justify-between text-white",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-sm",children:"Items per page:"}),e.jsxs("select",{value:I,onChange:t=>{F(Number(t.target.value)),$(1)},className:"bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:20,children:"20"}),e.jsx("option",{value:50,children:"50"}),e.jsx("option",{value:100,children:"100"})]})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("span",{className:"text-sm",children:["Showing ",A().length," of ",R," groups (Page ",_," of ",L,")"]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{onClick:()=>$(t=>Math.max(t-1,1)),disabled:_===1,className:"p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",children:e.jsx(ce,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>$(t=>Math.min(t+1,L)),disabled:_===L,className:"p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",children:e.jsx(de,{className:"w-4 h-4"})})]})]})]}),A().length===0&&!M&&e.jsxs(l.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(m,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]}),B&&e.jsx(l.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-4",children:e.jsx("p",{className:"text-red-200 text-sm",children:"Some group data may be unavailable. Using cached data where possible."})}),A().length===0&&!M&&e.jsxs(l.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(m,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})})]})},y=({icon:c,title:x,value:w,color:d,subValue:G,trend:u,bgGradient:k})=>e.jsxs(l.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:`${k||"bg-gradient-to-br from-slate-800/50 to-slate-900/50"} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:`p-3 rounded-xl ${d} backdrop-blur-sm`,children:e.jsx(c,{className:"w-8 h-8 text-white drop-shadow-lg"})}),u&&e.jsxs("div",{className:`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${u.isPositive?"bg-green-500/20 text-green-400":"bg-red-500/20 text-red-400"}`,children:[u.isPositive?"↗":"↘"," ",Math.abs(u.value),"%"]})]}),e.jsx("h3",{className:"text-3xl font-bold text-white mb-2 tracking-tight",children:w}),e.jsx("p",{className:"text-white/70 text-sm font-medium",children:x}),G&&e.jsx("p",{className:"text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1",children:G})]});export{Ge as default};
