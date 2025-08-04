import{r as h,j as e,m as n}from"./animation-vendor-w_1g82yL.js";import{L as V,b as oe}from"./index--kU9C6Xr.js";import{U as g,a0 as T,a6 as B,t as ne,e as F,x as ce,N as de,W as ue,Q as me,a1 as pe,a2 as ge}from"./ui-vendor-DhSas2Kz.js";import{d as b,e as f}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const xe=f`
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
`,he=f`
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
`,be=f`
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
`,fe=f`
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
`,je=f`
  query GetUserGroups($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`,ye=f`
  query GetCoMembers($groupIds: [Int!]) {
    group_user(where: {groupId: {_in: $groupIds}}) {
      userId
      user {
        id
        login
        firstName
        lastName
      }
      groupId
    }
  }
`,ve=f`
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
`,Se=({user:c})=>{const[s,I]=h.useState("all"),[m,G]=h.useState(""),[p,U]=h.useState("all"),[j,W]=h.useState(null),[_,z]=h.useState(50),[C,$]=h.useState(1);h.useEffect(()=>{$(1)},[s,m,p]);const{data:N,loading:R,error:H}=b(xe,{variables:{limit:_,offset:(C-1)*_},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:S}=b(je,{variables:{userId:c.id},errorPolicy:"all",fetchPolicy:"cache-first"}),Q=S?.group_user?.map(t=>t.groupId)||[],{data:J}=b(ye,{variables:{groupIds:Q},skip:Q.length===0,errorPolicy:"all",fetchPolicy:"cache-first"}),{data:A,loading:K}=b(ve,{variables:{userId:c.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:P}=b(he,{variables:{userId:c.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:E,loading:X}=b(fe,{variables:{groupId:j||0},skip:!j,errorPolicy:"all",fetchPolicy:"cache-first"}),{data:Z,loading:Ne}=b(be,{variables:{searchTerm:`%${m}%`},skip:!m||m.length<2,errorPolicy:"all",fetchPolicy:"cache-first"}),Y=t=>{if(!t)return"";const r=t.split("/");return(r[r.length-1]||"").replace(/-/g," ")},ee=t=>[],te=t=>{if(!t.captain)return"";const r=[];return t.captain.login&&r.push(t.captain.login),t.captain.firstName&&r.push(t.captain.firstName),t.captain.lastName&&r.push(t.captain.lastName),r.join(" ")},ae=(t,r)=>{if(!r)return!0;const a=r.toLowerCase();return!!(Y(t.path).toLowerCase().includes(a)||t.path?.toLowerCase().includes(a)||te(t).toLowerCase().includes(a)||ee().some(u=>u.toLowerCase().includes(a)))},M=()=>{let t=[];switch(s){case"all":t=N?.group||[];break;case"my-groups":{if(A){const r=A.captainGroups||[],a=A.group_user?.map(d=>d.group).filter(Boolean)||[];t=[...r,...a].filter((d,u,y)=>u===y.findIndex(D=>D.id===d.id)).sort((d,u)=>new Date(u.createdAt).getTime()-new Date(d.createdAt).getTime())}else{const r=S?.group_user?.map(o=>o.groupId)||[];t=(N?.group?.filter(o=>r.includes(o.id)||o.captainId===c.id)||[]).sort((o,i)=>new Date(i.createdAt).getTime()-new Date(o.createdAt).getTime())}break}default:t=N?.group||[]}if(m){const r=t.filter(i=>ae(i,m)),a=Z?.group_user?.map(i=>i.group).filter(Boolean)||[];t=[...r,...a].filter((i,d,u)=>d===u.findIndex(y=>y.id===i.id))}return p!=="all"&&(t=t.filter(r=>r.status===p)),t},se=t=>{switch(t){case"finished":return"text-green-400 bg-green-400/20";case"completed":return"text-green-400 bg-green-400/20";case"working":return"text-blue-400 bg-blue-400/20";case"setup":return"text-purple-400 bg-purple-400/20";case"audit":return"text-orange-400 bg-orange-400/20";default:return"text-gray-400 bg-gray-400/20"}},O=oe,re=t=>t.captain?.login?t.captain.login:`User #${t.captainId}`,ie=t=>t.captainId===c.id?!0:(S?.group_user?.map(a=>a.groupId)||[]).includes(t.id),le=t=>t.captainId===c.id?"Captain":(S?.group_user?.map(a=>a.groupId)||[]).includes(t.id)?"Member":"",x=(()=>{const t=P?.all_groups||[],r=P?.group_aggregate?.aggregate?.count||0,a=P?.captain_groups_aggregate?.aggregate?.count||0,o=P?.member_groups_aggregate?.aggregate?.count||0,i=t.filter(l=>l.status==="working"||l.status==="audit").length,d=t.filter(l=>l.status==="finished").length,u=t.filter(l=>l.captainId===c.id).length,y=Math.max(a,o,a+o-a),D=Math.max(0,y-u),v={};J?.group_user?.forEach(l=>{l.userId!==c.id&&(v[l.userId]||(v[l.userId]={count:0,user:l.user}),v[l.userId].count++)});let k=null;for(const l in v)(!k||v[l].count>k.count)&&(k=v[l]);return{total:r,active:i,completed:d,userTotal:y,userAsCaptain:u,userAsMember:D,bestColleague:k}})(),L=N?.group_aggregate?.aggregate?.count||0,q=Math.ceil(L/_);return R&&!N?e.jsx(V,{}):s==="my-groups"&&K&&!A?e.jsx(V,{}):e.jsxs("div",{className:"bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 h-full w-full relative",children:[e.jsxs("div",{className:"fixed inset-0 opacity-30 pointer-events-none z-0",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"}),e.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 40px 40px, rgba(52, 211, 153, 0.1) 2px, transparent 0)",backgroundSize:"80px 80px"}})]}),e.jsx("div",{className:"relative z-10 h-full w-full overflow-y-auto",children:e.jsxs("div",{className:"relative space-y-8 p-6",children:[e.jsxs(n.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center space-y-4",children:[e.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full backdrop-blur-sm border border-white/10 mb-4",children:e.jsx(g,{className:"w-10 h-10 text-emerald-400"})}),e.jsx("h1",{className:"text-5xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent",children:"Groups Dashboard"}),e.jsxs("p",{className:"text-xl text-white/70 max-w-2xl mx-auto",children:["Collaborate and excel with ",e.jsx("span",{className:"text-emerald-400 font-semibold",children:L})," dynamic project teams"]})]}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6",children:[e.jsx(w,{icon:g,title:"Total Groups",value:x.total,color:"bg-gradient-to-r from-blue-500/30 to-cyan-500/30",bgGradient:"bg-gradient-to-br from-blue-900/20 to-cyan-900/20",subValue:"All collaborative groups"}),e.jsx(w,{icon:T,title:"My Groups",value:x.userTotal,color:"bg-gradient-to-r from-yellow-500/30 to-amber-500/30",bgGradient:"bg-gradient-to-br from-yellow-900/20 to-amber-900/20",subValue:"Total groups you are part of"}),e.jsx(w,{icon:B,title:"As Captain",value:x.userAsCaptain,color:"bg-gradient-to-r from-red-500/30 to-rose-500/30",bgGradient:"bg-gradient-to-br from-red-900/20 to-rose-900/20",subValue:"Leadership roles"}),e.jsx(w,{icon:ne,title:"Active Groups",value:x.active,color:"bg-gradient-to-r from-green-500/30 to-emerald-500/30",bgGradient:"bg-gradient-to-br from-green-900/20 to-emerald-900/20",subValue:"Currently working",trend:x.active>x.total*.6?{value:15,isPositive:!0}:void 0}),e.jsx(w,{icon:F,title:"Completed",value:x.completed,color:"bg-gradient-to-r from-purple-500/30 to-violet-500/30",bgGradient:"bg-gradient-to-br from-purple-900/20 to-violet-900/20",subValue:"Successfully finished"})]}),e.jsx(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},className:"flex justify-center",children:e.jsxs("div",{className:"bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl",children:[e.jsx(n.button,{whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},onClick:()=>I("all"),className:`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${s==="all"?"bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30":"text-white/70 hover:text-white hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(g,{className:"w-5 h-5"}),e.jsx("span",{children:"All Groups"})]})}),e.jsx(n.button,{whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},onClick:()=>I("my-groups"),className:`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${s==="my-groups"?"bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30":"text-white/70 hover:text-white hover:bg-white/10"}`,children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(T,{className:"w-5 h-5"}),e.jsx("span",{children:"My Groups"})]})})]})}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(ce,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search by project, members, or captain...",value:m,onChange:t=>G(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(de,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:p,onChange:t=>U(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"audit",children:"Audit"}),e.jsx("option",{value:"setup",children:"Setup"}),e.jsx("option",{value:"working",children:"Working"}),e.jsx("option",{value:"finished",children:"Finished"})]})]})]}),e.jsx(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:M().map((t,r)=>{const a=ie(t),o=le(t);return e.jsxs(n.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:r*.05},className:`backdrop-blur-lg rounded-xl p-6 transition-all duration-300 shadow-lg relative ${a&&s==="all"?"bg-emerald-900/30 border-2 border-emerald-500/50 hover:bg-emerald-900/40 hover:border-emerald-400/60 shadow-emerald-500/20":"bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50"}`,children:[a&&s==="all"&&e.jsx("div",{className:"absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx(T,{className:"w-3 h-3"}),e.jsxs("span",{children:["Your Group (",o,")"]})]})}),e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-10 h-10 rounded-lg flex items-center justify-center ${a&&s==="all"?"bg-emerald-500/20":"bg-primary-500/20"}`,children:e.jsx(g,{className:`w-5 h-5 ${a&&s==="all"?"text-emerald-400":"text-primary-400"}`})}),e.jsx("div",{children:e.jsxs("span",{className:`font-semibold text-lg ${a&&s==="all"?"text-emerald-100":"text-white"}`,children:["#",Y(t.path)]})})]}),e.jsx("div",{className:`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${se(t.status)}`,children:t.status})]}),e.jsxs("div",{className:"space-y-4",children:[t.captainId&&e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${a&&s==="all"?"bg-emerald-500/20":"bg-yellow-500/20"}`,children:e.jsx(T,{className:`w-4 h-4 ${a&&s==="all"?"text-emerald-400":"text-yellow-400"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:`font-medium ${a&&s==="all"?"text-emerald-100":"text-white"}`,children:re(t)}),e.jsx("div",{className:`text-sm ${a&&s==="all"?"text-emerald-300":"text-slate-400"}`,children:"Captain"})]})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${a&&s==="all"?"bg-emerald-500/20":"bg-purple-500/20"}`,children:e.jsx(F,{className:`w-4 h-4 ${a&&s==="all"?"text-emerald-400":"text-purple-400"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:`font-medium ${a&&s==="all"?"text-emerald-100":"text-white"}`,children:O(t.createdAt)}),e.jsx("div",{className:`text-sm ${a&&s==="all"?"text-emerald-300":"text-slate-400"}`,children:"Created"})]})]})]}),e.jsxs("div",{className:`flex items-center justify-between mt-6 pt-4 border-t transition-colors cursor-pointer rounded-lg p-3 ${a&&s==="all"?"border-emerald-700/50 hover:bg-emerald-700/30":"border-slate-700/50 hover:bg-slate-700/30"}`,onClick:()=>W(j===t.id?null:t.id),children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-lg flex items-center justify-center ${a&&s==="all"?"bg-emerald-500/20":"bg-primary-500/20"}`,children:e.jsx(g,{className:`w-4 h-4 ${a&&s==="all"?"text-emerald-400":"text-primary-400"}`})}),e.jsxs("div",{children:[e.jsx("div",{className:`font-medium ${a&&s==="all"?"text-emerald-100":"text-white"}`,children:"Group Members"}),e.jsx("div",{className:`text-sm ${a&&s==="all"?"text-emerald-300":"text-slate-400"}`,children:j===t.id?"Click to hide members":"Click to view members"})]})]}),e.jsx("div",{className:"transition-transform duration-200",children:j===t.id?e.jsx(ue,{className:`w-5 h-5 ${a&&s==="all"?"text-emerald-400":"text-slate-400"}`}):e.jsx(me,{className:`w-5 h-5 ${a&&s==="all"?"text-emerald-400":"text-slate-400"}`})})]}),j===t.id&&e.jsx(n.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700/30",children:X?e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-slate-400",children:"Loading members..."})]}):e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center space-x-2 mb-4 pb-2 border-b border-slate-700/50",children:[e.jsx(B,{className:"w-5 h-5 text-primary-400"}),e.jsxs("span",{className:"text-white font-semibold",children:["Group Members (",E?.group_user?.length||0,")"]})]}),e.jsx("div",{className:"max-h-48 overflow-y-auto space-y-2 custom-scrollbar",children:E?.group_user?.map(i=>e.jsxs("div",{className:"flex items-center justify-between bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/70 transition-colors",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/20",children:e.jsx("span",{className:"text-primary-300 text-sm font-semibold",children:i.user?.firstName?.[0]||i.user?.login?.[0]||"U"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-white font-medium",children:i.user?.login||`User #${i.userId}`}),i.user?.firstName&&i.user?.lastName&&e.jsxs("div",{className:"text-slate-400 text-sm",children:[i.user.firstName," ",i.user.lastName]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-slate-400 text-xs",children:"Joined"}),e.jsx("div",{className:"text-slate-300 text-sm",children:O(i.createdAt)})]})]},i.id))}),(E?.group_user?.length||0)===0&&e.jsxs("div",{className:"text-center py-8",children:[e.jsx(g,{className:"w-12 h-12 text-slate-600 mx-auto mb-3"}),e.jsx("p",{className:"text-slate-400 text-sm",children:"No members found in this group"})]})]})})]},t.id)})}),e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"flex items-center justify-between text-white",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-sm",children:"Items per page:"}),e.jsxs("select",{value:_,onChange:t=>{z(Number(t.target.value)),$(1)},className:"bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:20,children:"20"}),e.jsx("option",{value:50,children:"50"}),e.jsx("option",{value:100,children:"100"})]})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("span",{className:"text-sm",children:["Showing ",M().length," of ",L," groups (Page ",C," of ",q,")"]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{onClick:()=>$(t=>Math.max(t-1,1)),disabled:C===1,className:"p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",children:e.jsx(pe,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>$(t=>Math.min(t+1,q)),disabled:C===q,className:"p-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors",children:e.jsx(ge,{className:"w-4 h-4"})})]})]})]}),M().length===0&&!R&&e.jsxs(n.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(g,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]}),H&&e.jsx(n.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-4",children:e.jsx("p",{className:"text-red-200 text-sm",children:"Some group data may be unavailable. Using cached data where possible."})}),M().length===0&&!R&&e.jsxs(n.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(g,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})})]})},w=({icon:c,title:s,value:I,color:m,subValue:G,trend:p,bgGradient:U})=>e.jsxs(n.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:`${U||"bg-gradient-to-br from-slate-800/50 to-slate-900/50"} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:`p-3 rounded-xl ${m} backdrop-blur-sm`,children:e.jsx(c,{className:"w-8 h-8 text-white drop-shadow-lg"})}),p&&e.jsxs("div",{className:`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${p.isPositive?"bg-green-500/20 text-green-400":"bg-red-500/20 text-red-400"}`,children:[p.isPositive?"↗":"↘"," ",Math.abs(p.value),"%"]})]}),e.jsx("h3",{className:"text-3xl font-bold text-white mb-2 tracking-tight",children:I}),e.jsx("p",{className:"text-white/70 text-sm font-medium",children:s}),G&&e.jsx("p",{className:"text-white/50 text-xs mt-2 bg-white/5 rounded-lg px-2 py-1",children:G})]});export{Se as default};
