import{r as b,j as e,m as o}from"./animation-vendor-BWQ_wUI_.js";import{L as X,b as ue}from"./index-BBg7uT05.js";import{U as x,w as xe,e as Q,y as w,k as he,D as pe,W as ge,ad as be,_ as fe,$ as Z,Y as ee,ag as te,aa as je,ab as Ne}from"./ui-vendor-B1oIOTiF.js";import{d as f,e as j}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const ye=j`
  query GetAllGroups($limit: Int = 50, $offset: Int = 0) {
    group(
      limit: $limit, 
      offset: $offset, 
      order_by: {createdAt: desc},
      where: {path: {_like: "%bh-module%"}}
    ) {
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

    group_aggregate(where: {path: {_like: "%bh-module%"}}) {
      aggregate {
        count
      }
    }
  }
`,we=j`
  query GetGroupStats($userId: Int!) {
    # All groups for general stats (bh-module only)
    all_groups: group(where: {path: {_like: "%bh-module%"}}) {
      id
      status
      captainId
    }

    # Total groups count (bh-module only)
    group_aggregate(where: {path: {_like: "%bh-module%"}}) {
      aggregate {
        count
      }
    }

    # User's captain groups count (bh-module only)
    captain_groups_aggregate: group_aggregate(
      where: {
        captainId: {_eq: $userId},
        path: {_like: "%bh-module%"}
      }
    ) {
      aggregate {
        count
      }
    }

    # User's member groups count (bh-module only)
    member_groups_aggregate: group_user_aggregate(
      where: {
        userId: {_eq: $userId},
        group: {path: {_like: "%bh-module%"}}
      }
    ) {
      aggregate {
        count
      }
    }

    # Get user's groups for finding co-members (bh-module only)
    user_groups: group_user(
      where: {
        userId: {_eq: $userId},
        group: {path: {_like: "%bh-module%"}}
      }
    ) {
      groupId
    }
  }
`,ve=j`
  query GetAllGroupsWithMembers($searchTerm: String!) {
    # Search groups by member names (bh-module only)
    group_user(
      where: {
        _and: [
          { group: { path: { _like: "%bh-module%" } } },
          {
            _or: [
              { user: { login: { _ilike: $searchTerm } } },
              { user: { firstName: { _ilike: $searchTerm } } },
              { user: { lastName: { _ilike: $searchTerm } } }
            ]
          }
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
`,Ie=j`
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
`,_e=j`
  query GetUserGroups($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`,Ge=j`
  query GetCoMembers($groupIds: [Int!]!, $userId: Int!) {
    group_user(
      where: {
        groupId: {_in: $groupIds},
        userId: {_neq: $userId}
      }
    ) {
      userId
      groupId
      user {
        id
        login
        firstName
        lastName
      }
    }
  }
`,$e=j`
  query GetMyGroups($userId: Int!) {
    # Groups where user is a captain (bh-module only)
    captainGroups: group(
      where: {
        captainId: {_eq: $userId},
        path: {_like: "%bh-module%"}
      }, 
      order_by: {createdAt: desc}
    ) {
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

    # Get user's group memberships to find member groups (bh-module only)
    group_user(
      where: {
        userId: {_eq: $userId},
        group: {path: {_like: "%bh-module%"}}
      }
    ) {
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
`,Te=({user:c})=>{const[a,$]=b.useState("all"),[h,C]=b.useState(""),[p,R]=b.useState("all"),[g,F]=b.useState(null),[v,V]=b.useState("boxes"),[k,se]=b.useState(50),[S,M]=b.useState(1);b.useEffect(()=>{M(1)},[a,h,p]);const{data:I,loading:L,error:ae}=f(ye,{variables:{limit:k,offset:(S-1)*k},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:q}=f(_e,{variables:{userId:c.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:A,loading:re}=f($e,{variables:{userId:c.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:_}=f(we,{variables:{userId:c.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:N,loading:B}=f(Ie,{variables:{groupId:g||0},skip:!g,errorPolicy:"all",fetchPolicy:"cache-first"}),{data:ie,loading:Ce}=f(ve,{variables:{searchTerm:`%${h}%`},skip:!h||h.length<2,errorPolicy:"all",fetchPolicy:"cache-first"}),H=_?.user_groups?.map(t=>t.groupId)||[],{data:W}=f(Ge,{variables:{groupIds:H,userId:c.id},skip:H.length===0,errorPolicy:"all",fetchPolicy:"cache-first"}),E=t=>{if(!t)return"";const i=t.split("/");return(i[i.length-1]||"").replace(/-/g," ").split(" ").map(l=>l.charAt(0).toUpperCase()+l.slice(1).toLowerCase()).join(" ")},le=t=>[],oe=t=>{if(!t.captain)return"";const i=[];return t.captain.login&&i.push(t.captain.login),t.captain.firstName&&i.push(t.captain.firstName),t.captain.lastName&&i.push(t.captain.lastName),i.join(" ")},ne=(t,i)=>{if(!i)return!0;const s=i.toLowerCase();return!!(E(t.path).toLowerCase().includes(s)||t.path?.toLowerCase().includes(s)||oe(t).toLowerCase().includes(s)||le().some(u=>u.toLowerCase().includes(s)))},P=()=>{let t=[];switch(a){case"all":t=I?.group||[];break;case"my-groups":{if(A){const i=A.captainGroups||[],s=A.group_user?.map(m=>m.group).filter(Boolean)||[];t=[...i,...s].filter((m,u,y)=>u===y.findIndex(O=>O.id===m.id)).sort((m,u)=>new Date(u.createdAt).getTime()-new Date(m.createdAt).getTime())}else{const i=q?.group_user?.map(l=>l.groupId)||[];t=(I?.group?.filter(l=>i.includes(l.id)||l.captainId===c.id)||[]).sort((l,r)=>new Date(r.createdAt).getTime()-new Date(l.createdAt).getTime())}break}default:t=I?.group||[]}if(h){const i=t.filter(r=>ne(r,h)),s=ie?.group_user?.map(r=>r.group).filter(Boolean)||[];t=[...i,...s].filter((r,m,u)=>m===u.findIndex(y=>y.id===r.id))}return p!=="all"&&(t=t.filter(i=>i.status===p)),t},z=t=>{switch(t){case"finished":return"text-green-400 bg-green-400/20";case"completed":return"text-green-400 bg-green-400/20";case"working":return"text-blue-400 bg-blue-400/20";case"setup":return"text-purple-400 bg-purple-400/20";case"audit":return"text-orange-400 bg-orange-400/20";default:return"text-gray-400 bg-gray-400/20"}},U=ue,J=t=>t.captain?.login?t.captain.login:`User #${t.captainId}`,de=t=>t.captainId===c.id?!0:(q?.group_user?.map(s=>s.groupId)||[]).includes(t.id),ce=t=>t.captainId===c.id?"Captain":(q?.group_user?.map(s=>s.groupId)||[]).includes(t.id)?"Member":"",d=(()=>{const t=_?.all_groups||[],i=_?.group_aggregate?.aggregate?.count||0,s=_?.captain_groups_aggregate?.aggregate?.count||0,l=_?.member_groups_aggregate?.aggregate?.count||0,r=t.filter(n=>n.status==="working"||n.status==="audit").length,m=t.filter(n=>n.status==="finished").length,u=t.filter(n=>n.captainId===c.id).length,y=Math.max(s,l,s+l-s),O=Math.max(0,y-u),T={};W?.group_user&&W.group_user.forEach(n=>{n.userId&&(T[n.userId]||(T[n.userId]={count:0,user:n.user}),T[n.userId].count++)});const me=Object.values(T).reduce((n,K)=>K.count>(n?.count||0)?K:n,null);return{total:i,active:r,completed:m,userTotal:y,userAsCaptain:u,userAsMember:O,bestCoMember:me}})(),D=I?.group_aggregate?.aggregate?.count||0,Y=Math.ceil(D/k);return L&&!I?e.jsx(X,{}):a==="my-groups"&&re&&!A?e.jsx(X,{}):e.jsxs("div",{className:"bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 h-full w-full relative",children:[e.jsxs("div",{className:"fixed inset-0 opacity-30 pointer-events-none z-0",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"}),e.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)",backgroundSize:"80px 80px"}})]}),e.jsx("div",{className:"relative z-10 h-full w-full overflow-y-auto",children:e.jsxs("div",{className:"relative space-y-8 p-6",children:[e.jsxs(o.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center space-y-4",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4",children:e.jsx(x,{className:"w-10 h-10 text-emerald-400"})}),e.jsx("h1",{className:"text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent",children:"Groups Dashboard"}),e.jsxs("p",{className:"text-xl text-white/70 max-w-2xl mx-auto",children:["Collaborate and excel with ",e.jsx("span",{className:"text-emerald-400 font-semibold",children:D})," dynamic project teams"]})]}),e.jsxs(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6",children:[e.jsx(G,{icon:x,title:"Total Groups",value:d.total,color:"bg-gradient-to-r from-blue-500/30 to-cyan-500/30",bgGradient:"bg-gradient-to-br from-blue-900/20 to-cyan-900/20",subValue:"All collaborative groups"}),e.jsx(G,{icon:xe,title:"Active Groups",value:d.active,color:"bg-gradient-to-r from-green-500/30 to-emerald-500/30",bgGradient:"bg-gradient-to-br from-green-900/20 to-emerald-900/20",subValue:"Currently working",trend:d.active>d.total*.6?{value:15,isPositive:!0}:void 0}),e.jsx(G,{icon:Q,title:"Completed",value:d.completed,color:"bg-gradient-to-r from-purple-500/30 to-violet-500/30",bgGradient:"bg-gradient-to-br from-purple-900/20 to-violet-900/20",subValue:"Successfully finished"}),e.jsx(G,{icon:w,title:"My Participation",value:`${d.userAsCaptain}/${d.userAsMember}`,color:"bg-gradient-to-r from-yellow-500/30 to-amber-500/30",bgGradient:"bg-gradient-to-br from-yellow-900/20 to-amber-900/20",subValue:"Captain / Member roles"}),e.jsx(G,{icon:he,title:"Best Co-Member",value:d.bestCoMember?d.bestCoMember.user?.login||d.bestCoMember.user?.firstName||"Unknown":"None",color:"bg-gradient-to-r from-pink-500/30 to-rose-500/30",bgGradient:"bg-gradient-to-br from-pink-900/20 to-rose-900/20",subValue:d.bestCoMember?`${d.bestCoMember.count} shared projects`:"No collaborations yet"})]}),e.jsx(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},className:"flex justify-center",children:e.jsxs("div",{className:"bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl",children:[e.jsx(o.button,{whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},onClick:()=>$("all"),className:`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${a==="all"?"bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30":"text-white/70 hover:text-white hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(x,{className:"w-5 h-5"}),e.jsx("span",{children:"All Groups"})]})}),e.jsx(o.button,{whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},onClick:()=>$("my-groups"),className:`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${a==="my-groups"?"bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30":"text-white/70 hover:text-white hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(w,{className:"w-5 h-5"}),e.jsx("span",{children:"My Groups"})]})})]})}),e.jsxs(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(pe,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search by project, members, or captain...",value:h,onChange:t=>C(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(ge,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:p,onChange:t=>R(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"audit",children:"Audit"}),e.jsx("option",{value:"setup",children:"Setup"}),e.jsx("option",{value:"working",children:"Working"}),e.jsx("option",{value:"finished",children:"Finished"})]})]}),e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx("button",{onClick:()=>V("boxes"),className:`p-2 rounded-lg border transition-all duration-200 ${v==="boxes"?"bg-white/10 border-white/20 text-white":"bg-transparent border-white/10 text-white/50 hover:text-white/70 hover:bg-white/5"}`,children:e.jsx(be,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>V("list"),className:`p-2 rounded-lg border transition-all duration-200 ${v==="list"?"bg-white/10 border-white/20 text-white":"bg-transparent border-white/10 text-white/50 hover:text-white/70 hover:bg-white/5"}`,children:e.jsx(fe,{className:"w-4 h-4"})})]})]})]}),e.jsx(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:v==="boxes"?"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6":"space-y-4",children:P().map((t,i)=>{const s=de(t),l=ce(t);return e.jsxs(o.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:i*.05},className:`backdrop-blur-lg rounded-xl transition-all duration-300 shadow-lg relative ${v==="boxes"?"p-6":"p-4"} ${s&&a==="all"?"bg-emerald-900/30 border-2 border-emerald-500/50 hover:bg-emerald-900/40 hover:border-emerald-400/60 shadow-emerald-500/20":"bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50"}`,children:[v==="list"?e.jsxs("div",{className:"flex items-center justify-between",children:[s&&a==="all"&&e.jsxs("div",{className:"absolute -top-1 -left-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-white/20",children:[e.jsx(w,{className:"w-3 h-3 inline mr-1"}),e.jsx("span",{children:l})]}),e.jsxs("div",{className:"flex items-center space-x-4 flex-1",children:[e.jsx("div",{className:`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${s&&a==="all"?"bg-emerald-500/20":"bg-primary-500/20"}`,children:e.jsx(x,{className:`w-5 h-5 ${s&&a==="all"?"text-emerald-400":"text-primary-400"}`})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center space-x-3 mb-1",children:[e.jsx("span",{className:`font-semibold text-lg truncate ${s&&a==="all"?"text-emerald-100":"text-white"}`,children:E(t.path)}),e.jsx("div",{className:`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${z(t.status)}`,children:t.status})]}),e.jsxs("div",{className:"flex items-center space-x-4 text-sm text-slate-400",children:[e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx(w,{className:"w-4 h-4"}),e.jsx("span",{children:J(t)})]}),e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx(Q,{className:"w-4 h-4"}),e.jsx("span",{children:U(t.createdAt)})]})]})]})]}),e.jsx("div",{className:"flex items-center space-x-2 flex-shrink-0",children:e.jsx(o.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>F(g===t.id?null:t.id),className:`p-2 rounded-lg hover:bg-opacity-30 transition-colors ${s&&a==="all"?"bg-emerald-500/20 hover:bg-emerald-500/30":"bg-primary-500/20 hover:bg-primary-500/30"}`,children:g===t.id?e.jsx(Z,{className:`w-4 h-4 ${s&&a==="all"?"text-emerald-400":"text-primary-400"}`}):e.jsx(ee,{className:`w-4 h-4 ${s&&a==="all"?"text-emerald-400":"text-primary-400"}`})})})]}):e.jsxs(e.Fragment,{children:[s&&a==="all"&&e.jsx("div",{className:"absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx(w,{className:"w-3 h-3"}),e.jsxs("span",{children:["Your Group (",l,")"]})]})}),e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-10 h-10 rounded-lg flex items-center justify-center ${s&&a==="all"?"bg-emerald-500/20":"bg-primary-500/20"}`,children:e.jsx(x,{className:`w-5 h-5 ${s&&a==="all"?"text-emerald-400":"text-primary-400"}`})}),e.jsx("div",{children:e.jsx("span",{className:`font-semibold text-lg ${s&&a==="all"?"text-emerald-100":"text-white"}`,children:E(t.path)})})]}),e.jsx("div",{className:`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${z(t.status)}`,children:t.status})]}),e.jsxs("div",{className:"space-y-4",children:[t.captainId&&e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${s&&a==="all"?"bg-emerald-500/20":"bg-yellow-500/20"}`,children:e.jsx(w,{className:`w-4 h-4 ${s&&a==="all"?"text-emerald-400":"text-yellow-400"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:`font-medium ${s&&a==="all"?"text-emerald-100":"text-white"}`,children:J(t)}),e.jsx("div",{className:`text-sm ${s&&a==="all"?"text-emerald-300":"text-slate-400"}`,children:"Captain"})]})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${s&&a==="all"?"bg-emerald-500/20":"bg-purple-500/20"}`,children:e.jsx(Q,{className:`w-4 h-4 ${s&&a==="all"?"text-emerald-400":"text-purple-400"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:`font-medium ${s&&a==="all"?"text-emerald-100":"text-white"}`,children:U(t.createdAt)}),e.jsx("div",{className:`text-sm ${s&&a==="all"?"text-emerald-300":"text-slate-400"}`,children:"Created"})]})]})]}),e.jsxs("div",{className:`flex items-center justify-between mt-6 pt-4 border-t transition-colors cursor-pointer rounded-lg p-3 ${s&&a==="all"?"border-emerald-700/50 hover:bg-emerald-700/30":"border-slate-700/50 hover:bg-slate-700/30"}`,onClick:()=>F(g===t.id?null:t.id),children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${s&&a==="all"?"bg-emerald-500/20":"bg-primary-500/20"}`,children:e.jsx(x,{className:`w-4 h-4 ${s&&a==="all"?"text-emerald-400":"text-primary-400"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:`font-medium ${s&&a==="all"?"text-emerald-100":"text-white"}`,children:"Group Members"}),e.jsx("div",{className:`text-sm ${s&&a==="all"?"text-emerald-300":"text-slate-400"}`,children:g===t.id?"Click to hide members":"Click to view members"})]})]}),e.jsx("div",{className:"transition-transform duration-200",children:g===t.id?e.jsx(Z,{className:`w-5 h-5 ${s&&a==="all"?"text-emerald-400":"text-slate-400"}`}):e.jsx(ee,{className:`w-5 h-5 ${s&&a==="all"?"text-emerald-400":"text-slate-400"}`})})]}),g===t.id&&e.jsx(o.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30",children:B?e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-slate-400",children:"Loading members..."})]}):e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-4 pb-2 border-b border-slate-700/50",children:[e.jsx(te,{className:"w-5 h-5 text-primary-400"}),e.jsxs("span",{className:"text-white font-semibold",children:["Group Members (",N?.group_user?.length||0,")"]})]}),e.jsx("div",{className:"max-h-48 overflow-y-auto space-y-2 custom-scrollbar",children:N?.group_user?.map(r=>e.jsxs("div",{className:"flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20",children:e.jsx("span",{className:"text-primary-300 text-sm font-semibold",children:r.user?.firstName?.[0]||r.user?.login?.[0]||"U"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:r.user?.login||`User #${r.userId}`}),r.user?.firstName&&r.user?.lastName&&e.jsxs("div",{className:"text-slate-400 text-sm",children:[r.user.firstName," ",r.user.lastName]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-slate-400 text-xs",children:"Joined"}),e.jsx("div",{className:"text-slate-300 text-sm",children:U(r.createdAt)})]})]},r.id))}),(N?.group_user?.length||0)===0&&e.jsxs("div",{className:"text-center py-8",children:[e.jsx(x,{className:"w-12 h-12 text-slate-600 mx-auto mb-3"}),e.jsx("p",{className:"text-slate-400 text-sm",children:"No members found in this group"})]})]})})]}),g===t.id&&e.jsx(o.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30",children:B?e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-slate-400",children:"Loading members..."})]}):e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-4 pb-2 border-b border-slate-700/50",children:[e.jsx(te,{className:"w-5 h-5 text-primary-400"}),e.jsxs("span",{className:"text-white font-semibold",children:["Group Members (",N?.group_user?.length||0,")"]})]}),e.jsx("div",{className:"max-h-48 overflow-y-auto space-y-2 custom-scrollbar",children:N?.group_user?.map(r=>e.jsxs("div",{className:"flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20",children:e.jsx("span",{className:"text-primary-300 text-sm font-semibold",children:r.user?.firstName?.[0]||r.user?.login?.[0]||"U"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:r.user?.login||`User #${r.userId}`}),r.user?.firstName&&r.user?.lastName&&e.jsxs("div",{className:"text-slate-400 text-sm",children:[r.user.firstName," ",r.user.lastName]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-slate-400 text-xs",children:"Joined"}),e.jsx("div",{className:"text-slate-300 text-sm",children:U(r.createdAt)})]})]},r.id))}),(N?.group_user?.length||0)===0&&e.jsxs("div",{className:"text-center py-8",children:[e.jsx(x,{className:"w-12 h-12 text-slate-600 mx-auto mb-3"}),e.jsx("p",{className:"text-slate-400 text-sm",children:"No members found in this group"})]})]})})]},t.id)})}),e.jsxs(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"flex items-center justify-between text-white",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-sm",children:"Items per page:"}),e.jsxs("select",{value:k,onChange:t=>{se(Number(t.target.value)),M(1)},className:"bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:20,children:"20"}),e.jsx("option",{value:50,children:"50"}),e.jsx("option",{value:100,children:"100"})]})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("span",{className:"text-sm",children:["Showing ",P().length," of ",D," groups (Page ",S," of ",Y,")"]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{onClick:()=>M(t=>Math.max(t-1,1)),disabled:S===1,className:"p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",children:e.jsx(je,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>M(t=>Math.min(t+1,Y)),disabled:S===Y,className:"p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",children:e.jsx(Ne,{className:"w-4 h-4"})})]})]})]}),P().length===0&&!L&&e.jsxs(o.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(x,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]}),ae&&e.jsx(o.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-4",children:e.jsx("p",{className:"text-red-200 text-sm",children:"Some group data may be unavailable. Using cached data where possible."})}),P().length===0&&!L&&e.jsxs(o.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(x,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})})]})},G=({icon:c,title:a,value:$,color:h,subValue:C,trend:p,bgGradient:R})=>e.jsxs(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:`${R||"bg-gradient-to-br from-slate-800/50 to-slate-900/50"} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:`p-3 rounded-xl ${h} backdrop-blur-sm`,children:e.jsx(c,{className:"w-8 h-8 text-white drop-shadow-lg"})}),p&&e.jsxs("div",{className:`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${p.isPositive?"bg-green-500/20 text-green-400":"bg-red-500/20 text-red-400"}`,children:[p.isPositive?"↗":"↘"," ",Math.abs(p.value),"%"]})]}),e.jsx("h3",{className:"text-3xl font-bold text-white mb-2 tracking-tight",children:$}),e.jsx("p",{className:"text-white/70 text-sm font-medium",children:a}),C&&e.jsx("p",{className:"text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1",children:C})]});export{Te as default};
