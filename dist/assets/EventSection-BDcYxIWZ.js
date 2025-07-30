import{r as u,j as e,m as a}from"./animation-vendor-BWQ_wUI_.js";import{L as k}from"./index-DIwVma_V.js";import{f as v,l as C,s as D,r as T,w as L,B as U,h as $,v as N,a0 as R,e as q}from"./ui-vendor-BusGUpMC.js";import{d as h,e as l}from"./apollo-vendor-8AJvV5pX.js";import"./react-vendor-DJG_os-6.js";const V=l`
  query GetAllEvents($limit: Int = 50, $offset: Int = 0) {
    event(limit: $limit, offset: $offset, order_by: {createdAt: desc}) {
      id
      createdAt
      endAt
      objectId
      parentId
      path
      campus
    }
    
    event_aggregate {
      aggregate {
        count
      }
    }
  }
`,G=l`
  query GetEventParticipants($eventId: Int!) {
    event_user(where: {eventId: {_eq: $eventId}}) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`,Q=l`
  query GetUserEventParticipation($userId: Int!) {
    event_user(where: {userId: {_eq: $userId}}) {
      id
      eventId
      level
      createdAt
    }
  }
`;l`
  query GetEventsWithParticipants {
    event {
      id
      path
      campus
      createdAt
      endAt
      objectId
    }
  }
`;const M=l`
  query GetEventUserView {
    event_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`,H=({user:b})=>{const[c,m]=u.useState("all"),[d,E]=u.useState(""),[n,_]=u.useState(null),{data:i,loading:g,error:I}=h(V,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:p,loading:Y}=h(Q,{variables:{userId:b.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:w}=h(M,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:o,loading:A}=h(G,{variables:{eventId:n||0},skip:!n,errorPolicy:"all",fetchPolicy:"cache-first"}),j=()=>{let t=[];switch(c){case"all":t=i?.event||[];break;case"my-events":const r=p?.event_user?.map(s=>s.eventId)||[];t=i?.event?.filter(s=>r.includes(s.id))||[];break;case"active":const x=new Date;t=i?.event?.filter(s=>s.endAt&&new Date(s.endAt)>x)||[];break;default:t=i?.event||[]}return d&&(t=t.filter(r=>r.path?.toLowerCase().includes(d.toLowerCase())||r.campus?.toLowerCase().includes(d.toLowerCase()))),t},y=t=>t?new Date(t)>new Date:!1,f=t=>new Date(t).toLocaleDateString(),S=t=>new Date(t).toLocaleString(),P=t=>t.endAt?y(t.endAt)?{status:"active",color:"text-green-400 bg-green-400/20"}:{status:"completed",color:"text-gray-400 bg-gray-400/20"}:{status:"ongoing",color:"text-blue-400 bg-blue-400/20"};return g&&!i?e.jsx(k,{}):e.jsxs("div",{className:"space-y-6",children:[e.jsxs(a.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Event Management Dashboard"}),e.jsxs("p",{className:"text-white/70 text-lg",children:["Explore ",i?.event_aggregate?.aggregate?.count||0," events with ",w?.event_user_view_aggregate?.aggregate?.count||0," total participations"]})]}),e.jsxs(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(v,{className:"w-8 h-8 text-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total Events"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:i?.event_aggregate?.aggregate?.count||0})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(C,{className:"w-8 h-8 text-green-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total Participations"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:w?.event_user_view_aggregate?.aggregate?.count||0})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(D,{className:"w-8 h-8 text-purple-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"My Events"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:p?.event_user?.length||0})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(T,{className:"w-8 h-8 text-orange-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Active Events"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:i?.event?.filter(t=>y(t.endAt)).length||0})]})]})})]}),e.jsx(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex justify-center",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("button",{onClick:()=>m("all"),className:`px-4 py-2 rounded-md transition-all ${c==="all"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:"All Events"}),e.jsxs("button",{onClick:()=>m("my-events"),className:`px-4 py-2 rounded-md transition-all ${c==="my-events"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["My Events (",p?.event_user?.length||0,")"]}),e.jsx("button",{onClick:()=>m("active"),className:`px-4 py-2 rounded-md transition-all ${c==="active"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:"Active Events"})]})}),e.jsx(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(L,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search events by path or campus...",value:d,onChange:t=>E(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]})}),e.jsx(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:j().map((t,r)=>{const x=P(t);return e.jsxs(a.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:r*.05},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer",onClick:()=>_(n===t.id?null:t.id),children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(v,{className:"w-5 h-5 text-primary-400"}),e.jsxs("span",{className:"text-white font-medium",children:["Event #",t.id]})]}),e.jsx("div",{className:`px-2 py-1 rounded-full text-xs font-medium ${x.color}`,children:x.status})]}),e.jsxs("div",{className:"space-y-3",children:[t.path&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(U,{className:"w-4 h-4 text-white/60"}),e.jsx("span",{className:"text-white/80 truncate",children:t.path})]}),t.campus&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx($,{className:"w-4 h-4 text-white/60"}),e.jsx("span",{className:"text-white/80",children:t.campus})]}),e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(N,{className:"w-4 h-4 text-white/60"}),e.jsxs("span",{className:"text-white/80",children:["Created: ",f(t.createdAt)]})]}),t.endAt&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(N,{className:"w-4 h-4 text-white/60"}),e.jsxs("span",{className:"text-white/80",children:["Ends: ",S(t.endAt)]})]})]}),e.jsxs("div",{className:"flex items-center justify-between mt-4 pt-4 border-t border-white/10",children:[e.jsxs("span",{className:"text-white/60 text-sm",children:["Object ID: ",t.objectId]}),e.jsx(R,{className:`w-4 h-4 text-white/60 transition-transform ${n===t.id?"rotate-90":""}`})]}),n===t.id&&e.jsx(a.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 pt-4 border-t border-white/10",children:A?e.jsx("div",{className:"flex items-center justify-center py-4",children:e.jsx("div",{className:"animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"})}):e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(q,{className:"w-4 h-4 text-primary-400"}),e.jsxs("span",{className:"text-white font-medium text-sm",children:["Participants (",o?.event_user?.length||0,")"]})]}),o?.event_user?.slice(0,5).map(s=>e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsxs("span",{className:"text-white/80",children:["User #",s.userId]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsxs("span",{className:"text-white/60",children:["Level ",s.level]}),e.jsx("span",{className:"text-white/60",children:f(s.createdAt)})]})]},s.id)),(o?.event_user?.length||0)>5&&e.jsxs("p",{className:"text-white/60 text-xs",children:["+",(o?.event_user?.length||0)-5," more participants"]})]})})]},t.id)})}),I&&e.jsx(a.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-4",children:e.jsx("p",{className:"text-red-200 text-sm",children:"Some event data may be unavailable. Using cached data where possible."})}),j().length===0&&!g&&e.jsxs(a.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(v,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No events found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})};export{H as default};
