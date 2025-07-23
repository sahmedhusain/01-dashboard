import{r as x,j as e,m as i}from"./animation-vendor-CTGg7XC5.js";import{L as Z,f as z,h as G}from"./index-B61jjRdg.js";import{d as D,T as g,k as Q,A as L,x as P,g as A,Z as X,h as Y,w as K,J as W,z as ee,p as te,l as se,U as ae,f as le,m as re,t as ie}from"./ui-vendor-EbFLDUo2.js";import{d as S,e as j}from"./apollo-vendor-Dxrk3Lr4.js";import"./react-vendor-Csw2ODfV.js";const ce=j`
  query GetAllResults {
    result(order_by: {createdAt: desc}) {
      id
      objectId
      userId
      grade
      progressId
      type
      createdAt
      updatedAt
      attrs
      groupId
      path
    }

    result_aggregate {
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
`,de=j`
  query GetUserResults($userId: Int!) {
    result(where: {userId: {_eq: $userId}}, order_by: {createdAt: desc}) {
      id
      objectId
      grade
      progressId
      type
      createdAt
      updatedAt
      attrs
      groupId
      path
    }
    
    result_aggregate(where: {userId: {_eq: $userId}}) {
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
`;j`
  query GetResultsByType($type: String!) {
    result(where: {type: {_eq: $type}}) {
      id
      objectId
      userId
      grade
      type
      createdAt
      path
    }
  }
`;const ne=j`
  query GetResultTypes {
    result_type {
      type
    }
    
    result_type_aggregate {
      aggregate {
        count
      }
    }
  }
`,ue=({user:E})=>{const[a,h]=x.useState("all-results"),[n,$]=x.useState(""),[y,F]=x.useState("all"),[b,q]=x.useState("all"),[w,U]=x.useState(null),{data:f,loading:N,error:C}=S(ce,{errorPolicy:"all",fetchPolicy:"cache-first"}),{data:T,loading:M}=S(de,{variables:{userId:E.id},errorPolicy:"all",fetchPolicy:"cache-first"}),{data:I,loading:B}=S(ne,{errorPolicy:"all",fetchPolicy:"cache-first"});if(N&&!f)return e.jsx(Z,{});if(C)return e.jsx("div",{className:"bg-red-500/20 border border-red-500/30 rounded-lg p-6",children:e.jsxs("p",{className:"text-red-200",children:["Error loading result data: ",C.message]})});const m=f?.result||[],p=f?.result_aggregate?.aggregate,d=T?.result||[],u=T?.result_aggregate?.aggregate;I?.result_type;const k=I?.result_type_aggregate?.aggregate?.count||0,v=p?.count||0;p?.avg?.grade,p?.max?.grade,p?.min?.grade;const l=u?.count||0,O=u?.avg?.grade||0;u?.max?.grade,u?.min?.grade;const r={totalCompleted:d.filter(t=>t.grade>=1).length,perfectScores:d.filter(t=>t.grade===100).length,highGrades:d.filter(t=>t.grade>=80).length,recentActivity:d.filter(t=>{const s=new Date(t.createdAt),c=new Date;return c.setDate(c.getDate()-7),s>=c}).length},o=()=>{let t=[];switch(a){case"all-results":t=m;break;case"my-results":t=d;break;case"by-type":t=m;break;case"achievements":t=d.filter(s=>s.grade>=80);break;default:t=m}if(n&&(t=t.filter(s=>s.path?.toLowerCase().includes(n.toLowerCase())||s.type?.toLowerCase().includes(n.toLowerCase())||s.id?.toString().includes(n))),y!=="all"&&(t=t.filter(s=>s.type===y)),b!=="all")switch(b){case"perfect":t=t.filter(s=>s.grade===100);break;case"high":t=t.filter(s=>s.grade>=80);break;case"pass":t=t.filter(s=>s.grade>=1);break;case"fail":t=t.filter(s=>s.grade<1);break}return t},H=t=>t===100?{status:"Perfect",color:"text-yellow-400 bg-yellow-400/20",icon:P}:t>=80?{status:"Excellent",color:"text-green-400 bg-green-400/20",icon:g}:t>=60?{status:"Good",color:"text-blue-400 bg-blue-400/20",icon:A}:t>=1?{status:"Pass",color:"text-purple-400 bg-purple-400/20",icon:A}:{status:"Fail",color:"text-red-400 bg-red-400/20",icon:ie},J=[...new Set(m.map(t=>t.type).filter(Boolean))];return e.jsxs("div",{className:"space-y-6",children:[e.jsxs(i.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold text-white mb-2",children:"Results & Achievements"}),e.jsxs("p",{className:"text-white/70 text-lg",children:["Track ",v," results across ",k," types with comprehensive achievement system"]})]}),e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(D,{className:"w-8 h-8 text-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Total Results"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:v})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(g,{className:"w-8 h-8 text-green-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"My Results"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:l})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(Q,{className:"w-8 h-8 text-purple-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"My Average"}),e.jsxs("p",{className:"text-2xl font-bold text-white",children:[O.toFixed(1),"%"]})]})]})}),e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(L,{className:"w-8 h-8 text-orange-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-white font-medium",children:"Achievements"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:r.totalCompleted})]})]})})]}),e.jsx(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"flex justify-center",children:e.jsxs("div",{className:"bg-white/10 rounded-lg p-1",children:[e.jsxs("button",{onClick:()=>h("all-results"),className:`px-4 py-2 rounded-md transition-all ${a==="all-results"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["All Results (",v,")"]}),e.jsxs("button",{onClick:()=>h("my-results"),className:`px-4 py-2 rounded-md transition-all ${a==="my-results"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["My Results (",l,")"]}),e.jsxs("button",{onClick:()=>h("by-type"),className:`px-4 py-2 rounded-md transition-all ${a==="by-type"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["By Type (",k,")"]}),e.jsxs("button",{onClick:()=>h("achievements"),className:`px-4 py-2 rounded-md transition-all ${a==="achievements"?"bg-primary-500 text-white":"text-white/70 hover:text-white"}`,children:["Achievements (",r.totalCompleted,")"]})]})}),a==="achievements"&&e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(L,{className:"w-5 h-5 mr-2 text-primary-400"}),"Achievement Dashboard"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",children:[e.jsx("div",{className:"bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(P,{className:"w-8 h-8 text-yellow-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-yellow-200 font-medium",children:"Perfect Scores"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:r.perfectScores})]})]})}),e.jsx("div",{className:"bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(g,{className:"w-8 h-8 text-green-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-green-200 font-medium",children:"High Grades (80+)"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:r.highGrades})]})]})}),e.jsx("div",{className:"bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(A,{className:"w-8 h-8 text-blue-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-blue-200 font-medium",children:"Total Completed"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:r.totalCompleted})]})]})}),e.jsx("div",{className:"bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(X,{className:"w-8 h-8 text-purple-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-purple-200 font-medium",children:"Recent Activity"}),e.jsx("p",{className:"text-2xl font-bold text-white",children:r.recentActivity})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"text-white font-medium",children:"Achievement Progress"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"bg-white/5 rounded-lg p-3",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("span",{className:"text-white/80 text-sm",children:"Completion Rate"}),e.jsxs("span",{className:"text-white font-medium",children:[l>0?(r.totalCompleted/l*100).toFixed(1):0,"%"]})]}),e.jsx("div",{className:"w-full bg-white/10 rounded-full h-2",children:e.jsx("div",{className:"bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000",style:{width:l>0?`${r.totalCompleted/l*100}%`:"0%"}})})]}),e.jsxs("div",{className:"bg-white/5 rounded-lg p-3",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("span",{className:"text-white/80 text-sm",children:"Excellence Rate (80+ grades)"}),e.jsxs("span",{className:"text-white font-medium",children:[l>0?(r.highGrades/l*100).toFixed(1):0,"%"]})]}),e.jsx("div",{className:"w-full bg-white/10 rounded-full h-2",children:e.jsx("div",{className:"bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000",style:{width:l>0?`${r.highGrades/l*100}%`:"0%"}})})]})]})]})]}),(a==="all-results"||a==="my-results"||a==="by-type")&&e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"flex flex-col sm:flex-row gap-4 items-center justify-between",children:[e.jsxs("div",{className:"relative flex-1 max-w-md",children:[e.jsx(Y,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4"}),e.jsx("input",{type:"text",placeholder:"Search results by path, type, or ID...",value:n,onChange:t=>$(t.target.value),className:"w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(K,{className:"w-4 h-4 text-white/70"}),e.jsxs("select",{value:y,onChange:t=>F(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Types"}),J.map(t=>e.jsx("option",{value:t,children:t},t))]})]}),e.jsxs("select",{value:b,onChange:t=>q(t.target.value),className:"bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500",children:[e.jsx("option",{value:"all",children:"All Grades"}),e.jsx("option",{value:"perfect",children:"Perfect (100)"}),e.jsx("option",{value:"high",children:"High (80+)"}),e.jsx("option",{value:"pass",children:"Pass (1+)"}),e.jsx("option",{value:"fail",children:"Fail (0)"})]})]})]}),(a==="all-results"||a==="my-results"||a==="achievements")&&e.jsxs(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:[e.jsxs("h3",{className:"text-lg font-semibold text-white mb-4 flex items-center",children:[e.jsx(D,{className:"w-5 h-5 mr-2 text-primary-400"}),a==="achievements"?"High Achievement Results":a==="my-results"?"My Results":"All Results"," (",o().length,")"]}),e.jsxs("div",{className:"space-y-2 max-h-96 overflow-y-auto",children:[o().slice(0,50).map((t,s)=>{const c=H(t.grade),V=c.icon;return e.jsxs(i.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:s*.02},className:"bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer",onClick:()=>U(w===t.id?null:t.id),children:[e.jsxs("div",{className:"flex items-center justify-between p-3",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:`p-2 rounded-lg ${c.color}`,children:e.jsx(V,{className:"w-4 h-4"})}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("h4",{className:"text-white font-medium",children:["Result #",t.id]}),e.jsxs("div",{className:"flex items-center space-x-4 text-xs text-white/60",children:[e.jsxs("span",{children:["Grade: ",t.grade,"%"]}),t.type&&e.jsxs("span",{children:["Type: ",t.type]}),t.path&&e.jsxs("span",{children:["Path: ",t.path]}),e.jsxs("span",{children:["Date: ",z(t.createdAt)]})]})]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsxs("div",{className:`px-3 py-1 rounded-full text-xs font-medium ${c.color}`,children:[t.grade,"%"]}),w===t.id?e.jsx(W,{className:"w-4 h-4 text-white/60"}):e.jsx(ee,{className:"w-4 h-4 text-white/60"})]})]}),w===t.id&&e.jsx(i.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"px-3 pb-3 border-t border-white/10",children:e.jsxs("div",{className:"pt-3 space-y-2",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[t.objectId&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(te,{className:"w-4 h-4 text-blue-400"}),e.jsxs("span",{className:"text-white/80",children:["Object ID: ",t.objectId]})]}),t.progressId&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(se,{className:"w-4 h-4 text-green-400"}),e.jsxs("span",{className:"text-white/80",children:["Progress ID: ",t.progressId]})]}),t.groupId&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(ae,{className:"w-4 h-4 text-purple-400"}),e.jsxs("span",{className:"text-white/80",children:["Group ID: ",t.groupId]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(le,{className:"w-4 h-4 text-orange-400"}),e.jsxs("span",{className:"text-white/80",children:["Created: ",G(t.createdAt)]})]}),t.updatedAt&&t.updatedAt!==t.createdAt&&e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx(re,{className:"w-4 h-4 text-yellow-400"}),e.jsxs("span",{className:"text-white/80",children:["Updated: ",G(t.updatedAt)]})]})]})]}),t.attrs&&Object.keys(t.attrs).length>0&&e.jsxs("div",{className:"mt-3",children:[e.jsx("h5",{className:"text-white/90 font-medium text-sm mb-2",children:"Attributes:"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2",children:Object.entries(t.attrs).slice(0,4).map(([_,R])=>e.jsxs("div",{className:"bg-white/5 rounded p-2",children:[e.jsxs("span",{className:"text-white/60 text-xs",children:[_,":"]}),e.jsx("span",{className:"text-white text-xs ml-2",children:typeof R=="object"?JSON.stringify(R):String(R)})]},_))})]})]})})]},t.id)}),o().length>50&&e.jsx("div",{className:"text-center py-4",children:e.jsxs("p",{className:"text-white/60 text-sm",children:["Showing 50 of ",o().length," results"]})})]})]}),(N||M||B)&&e.jsx("div",{className:"bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20",children:e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"}),e.jsx("span",{className:"ml-3 text-white/70",children:"Loading result data..."})]})}),o().length===0&&!N&&e.jsxs(i.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-12",children:[e.jsx(g,{className:"w-16 h-16 text-white/30 mx-auto mb-4"}),e.jsx("h3",{className:"text-white/70 text-lg font-medium mb-2",children:"No results found"}),e.jsx("p",{className:"text-white/50",children:"Try adjusting your search criteria or filters."})]})]})};export{ue as default};
