import{r as d,j as e,m as a}from"./animation-vendor-CTGg7XC5.js";import{L as C}from"./index-B61jjRdg.js";import{h as A,w as P,e as f,l as U,i as L,y as $,f as R,z as D,I as E}from"./ui-vendor-EbFLDUo2.js";import{d as p,e as u}from"./apollo-vendor-Dxrk3Lr4.js";import"./react-vendor-Csw2ODfV.js";const k=u`
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
    }
    
    group_aggregate {
      aggregate {
        count
      }
    }
  }
`,M=u`
  query GetGroupMembers($groupId: Int!) {
    group_user(where: {groupId: {_eq: $groupId}}) {
      id
      userId
      groupId
      createdAt
      updatedAt
    }
  }
`,q=u`
  query GetUserGroups($userId: Int!) {
    group_user(where: {userId: {_eq: $userId}}) {
      id
      groupId
      createdAt
      updatedAt
    }
  }
`,F=u`
  query GetGroupCaptains {
    group(where: {captainId: {_is_null: false}}) {
      id
      captainId
      status
      path
      campus
      objectId
      eventId
    }
  }
`,W=({user:b})=>{const[c,h]=d.useState("all"),[n,N]=d.useState(""),[x,v]=d.useState("all"),[l,I]=d.useState(null),{data:r,loading:m,error:_}=p(k,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:g,loading:O}=p(q,{variables:{userId:b.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:y,loading:Q}=p(F,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:o,loading:G}=p(M,{variables:{groupId:l||0},skip:!l,errorPolicy:"all",fetchPolicy:"cache-first"}),w=()=>{let t=[];switch(c){case"all":t=r?.group||[];break;case"my-groups":const s=g?.group_user?.map(i=>i.groupId)||[];t=r?.group?.filter(i=>s.includes(i.id))||[];break;case"captains":t=y?.group||[];break;default:t=r?.group||[]}return n&&(t=t.filter(s=>s.path?.toLowerCase().includes(n.toLowerCase())||s.campus?.toLowerCase().includes(n.toLowerCase()))),x!=="all"&&(t=t.filter(s=>s.status===x)),t},S=t=>{switch(t){case"finished":return"text-green-400 bg-green-400/20";case"active":return"text-blue-400 bg-blue-400/20";case"pending":return"text-yellow-400 bg-yellow-400/20";default:return"text-gray-400 bg-gray-400/20"}},j=t=>new Date(t).toLocaleDateString();return m&&!r?e.jsx(C,{}):e.jsxs("div",{className:"space-y-6",children:[e.jsxs(a.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Group Management Dashboard"}),e.jsxs("p",{className:"text-white/70 text-lg",children:["Manage and explore ",r?.group_aggregate?.aggregate?.count||0," collaboration groups"]})]}),e.jsx(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"flex justify-center",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsxs("button",{onClick:()=>h("all"),className:`px-4 py-2 rounded-md transition-all ${c==="all"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["All Groups (",r?.group_aggregate?.aggregate?.count||0,")"]}),e.jsxs("button",{onClick:()=>h("my-groups"),className:`px-4 py-2 rounded-md transition-all ${c==="my-groups"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["My Groups (",g?.group_user?.length||0,")"]}),e.jsxs("button",{onClick:()=>h("captains"),className:`px-4 py-2 rounded-md transition-all ${c==="captains"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["With Captains (",y?.group?.length||0,")"]})]})}),e.jsxs(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(A,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search groups by project or members...",value:n,onChange:t=>N(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(P,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:x,onChange:t=>v(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"finished",children:"Finished"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"pending",children:"Pending"})]})]})]}),e.jsx(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:w().map((t,s)=>e.jsxs(a.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:s*.05},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer",onClick:()=>I(l===t.id?null:t.id),children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(f,{className:"w-5 h-5 text-primary-400"}),e.jsxs("span",{className:"text-white font-medium",children:["Group #",t.id]})]}),e.jsx("div",{className:`px-2 py-1 rounded-full text-xs font-medium ${S(t.status)}`,children:t.status})]}),e.jsxs("div",{className:"space-y-3",children:[t.path&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(U,{className:"w-4 h-4 text-white/60"}),e.jsx("span",{className:"text-white/80 truncate",children:t.path})]}),t.campus&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(L,{className:"w-4 h-4 text-white/60"}),e.jsx("span",{className:"text-white/80",children:t.campus})]}),t.captainId&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx($,{className:"w-4 h-4 text-yellow-400"}),e.jsxs("span",{className:"text-white/80",children:["Captain ID: ",t.captainId]})]}),e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(R,{className:"w-4 h-4 text-white/60"}),e.jsxs("span",{className:"text-white/80",children:["Created: ",j(t.createdAt)]})]})]}),e.jsxs("div",{className:"flex items-center justify-between mt-4 pt-4 border-t border-white/10",children:[e.jsxs("span",{className:"text-white/60 text-sm",children:["Object ID: ",t.objectId]}),e.jsx(D,{className:`w-4 h-4 text-white/60 transition-transform ${l===t.id?"rotate-90":""}`})]}),l===t.id&&e.jsx(a.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 pt-4 border-t border-white/10",children:G?e.jsx("div",{className:"flex items-center justify-center py-4",children:e.jsx("div",{className:"animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"})}):e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(E,{className:"w-4 h-4 text-primary-400"}),e.jsxs("span",{className:"text-white font-medium text-sm",children:["Members (",o?.group_user?.length||0,")"]})]}),o?.group_user?.slice(0,5).map(i=>e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsxs("span",{className:"text-white/80",children:["User #",i.userId]}),e.jsx("span",{className:"text-white/60",children:j(i.createdAt)})]},i.id)),(o?.group_user?.length||0)>5&&e.jsxs("p",{className:"text-white/60 text-xs",children:["+",(o?.group_user?.length||0)-5," more members"]})]})})]},t.id))}),_&&e.jsx(a.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-4",children:e.jsx("p",{className:"text-red-200 text-sm",children:"Some group data may be unavailable. Using cached data where possible."})}),w().length===0&&!m&&e.jsxs(a.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(f,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No groups found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})};export{W as default};
