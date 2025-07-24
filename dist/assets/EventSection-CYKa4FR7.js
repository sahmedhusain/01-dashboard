import{r as h,j as e,m as i}from"./animation-vendor-BWQ_wUI_.js";import{L as D}from"./index-DVb5-10c.js";import{f as g,J as L,l as T,j as U,t as $,F as R,B as q,h as V,m as b,K as F,e as G}from"./ui-vendor-DEyZM_km.js";import{d as m,e as l}from"./apollo-vendor-NpLSqJf6.js";import"./react-vendor-DJG_os-6.js";const Q=l`
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
`,M=l`
  query GetEventParticipants($eventId: Int!) {
    event_user(where: {eventId: {_eq: $eventId}}) {
      id
      userId
      eventId
      level
      createdAt
    }
  }
`,Y=l`
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
`;const B=l`
  query GetEventUserView {
    event_user_view_aggregate {
      aggregate {
        count
      }
    }
  }
`,X=({user:E})=>{const[c,p]=h.useState("all"),[d,_]=h.useState(""),[u,A]=h.useState("all"),[n,I]=h.useState(null),{data:r,loading:w,error:S}=m(Q,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:v,loading:O}=m(Y,{variables:{userId:E.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:j}=m(B,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:o,loading:C}=m(M,{variables:{eventId:n||0},skip:!n,errorPolicy:"all",fetchPolicy:"cache-first"}),f=()=>{let t=[];switch(c){case"all":t=r?.event||[];break;case"my-events":const a=v?.event_user?.map(s=>s.eventId)||[];t=r?.event?.filter(s=>a.includes(s.id))||[];break;case"active":const x=new Date;t=r?.event?.filter(s=>s.endAt&&new Date(s.endAt)>x)||[];break;default:t=r?.event||[]}return d&&(t=t.filter(a=>a.path?.toLowerCase().includes(d.toLowerCase())||a.campus?.toLowerCase().includes(d.toLowerCase()))),u!=="all"&&(t=t.filter(a=>a.campus===u)),t},y=t=>t?new Date(t)>new Date:!1,N=t=>new Date(t).toLocaleDateString(),P=t=>new Date(t).toLocaleString(),k=t=>t.endAt?y(t.endAt)?{status:"active",color:"text-green-400 bg-green-400/20"}:{status:"completed",color:"text-gray-400 bg-gray-400/20"}:{status:"ongoing",color:"text-blue-400 bg-blue-400/20"};return w&&!r?e.jsx(D,{}):e.jsxs("div",{className:"space-y-6",children:[e.jsxs(i.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Event Management Dashboard"}),e.jsxs("p",{className:"text-white/70 text-lg",children:["Explore ",r?.event_aggregate?.aggregate?.count||0," events with ",j?.event_user_view_aggregate?.aggregate?.count||0," total participations"]})]}),e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(g,{className:"w-8 h-8 text-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total Events"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:r?.event_aggregate?.aggregate?.count||0})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(L,{className:"w-8 h-8 text-green-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total Participations"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:j?.event_user_view_aggregate?.aggregate?.count||0})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(T,{className:"w-8 h-8 text-purple-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"My Events"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:v?.event_user?.length||0})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(U,{className:"w-8 h-8 text-orange-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Active Events"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:r?.event?.filter(t=>y(t.endAt)).length||0})]})]})})]}),e.jsx(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex justify-center",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsx("button",{onClick:()=>p("all"),className:`px-4 py-2 rounded-md transition-all ${c==="all"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:"All Events"}),e.jsxs("button",{onClick:()=>p("my-events"),className:`px-4 py-2 rounded-md transition-all ${c==="my-events"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["My Events (",v?.event_user?.length||0,")"]}),e.jsx("button",{onClick:()=>p("active"),className:`px-4 py-2 rounded-md transition-all ${c==="active"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:"Active Events"})]})}),e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx($,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search events by path or campus...",value:d,onChange:t=>_(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(R,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:u,onChange:t=>A(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Campuses"}),e.jsx("option",{value:"bahrain",children:"Bahrain"}),e.jsx("option",{value:"london",children:"London"}),e.jsx("option",{value:"paris",children:"Paris"})]})]})]}),e.jsx(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:f().map((t,a)=>{const x=k(t);return e.jsxs(i.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:a*.05},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer",onClick:()=>I(n===t.id?null:t.id),children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(g,{className:"w-5 h-5 text-primary-400"}),e.jsxs("span",{className:"text-white font-medium",children:["Event #",t.id]})]}),e.jsx("div",{className:`px-2 py-1 rounded-full text-xs font-medium ${x.color}`,children:x.status})]}),e.jsxs("div",{className:"space-y-3",children:[t.path&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(q,{className:"w-4 h-4 text-white/60"}),e.jsx("span",{className:"text-white/80 truncate",children:t.path})]}),t.campus&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(V,{className:"w-4 h-4 text-white/60"}),e.jsx("span",{className:"text-white/80",children:t.campus})]}),e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(b,{className:"w-4 h-4 text-white/60"}),e.jsxs("span",{className:"text-white/80",children:["Created: ",N(t.createdAt)]})]}),t.endAt&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(b,{className:"w-4 h-4 text-white/60"}),e.jsxs("span",{className:"text-white/80",children:["Ends: ",P(t.endAt)]})]})]}),e.jsxs("div",{className:"flex items-center justify-between mt-4 pt-4 border-t border-white/10",children:[e.jsxs("span",{className:"text-white/60 text-sm",children:["Object ID: ",t.objectId]}),e.jsx(F,{className:`w-4 h-4 text-white/60 transition-transform ${n===t.id?"rotate-90":""}`})]}),n===t.id&&e.jsx(i.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-4 pt-4 border-t border-white/10",children:C?e.jsx("div",{className:"flex items-center justify-center py-4",children:e.jsx("div",{className:"animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"})}):e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(G,{className:"w-4 h-4 text-primary-400"}),e.jsxs("span",{className:"text-white font-medium text-sm",children:["Participants (",o?.event_user?.length||0,")"]})]}),o?.event_user?.slice(0,5).map(s=>e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsxs("span",{className:"text-white/80",children:["User #",s.userId]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsxs("span",{className:"text-white/60",children:["Level ",s.level]}),e.jsx("span",{className:"text-white/60",children:N(s.createdAt)})]})]},s.id)),(o?.event_user?.length||0)>5&&e.jsxs("p",{className:"text-white/60 text-xs",children:["+",(o?.event_user?.length||0)-5," more participants"]})]})})]},t.id)})}),S&&e.jsx(i.div,{initial:{opacity:0},animate:{opacity:1},className:"bg-red-500/20 border border-red-500/30 rounded-lg p-4",children:e.jsx("p",{className:"text-red-200 text-sm",children:"Some event data may be unavailable. Using cached data where possible."})}),f().length===0&&!w&&e.jsxs(i.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(g,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No events found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})};export{X as default};
