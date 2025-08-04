import{j as r,m as h}from"./animation-vendor-w_1g82yL.js";const v=({children:s,className:i="",hover:a=!1,animate:d=!0,onClick:t,gradient:l=!1,glowing:n=!1,size:m="md",responsive:e=!0})=>{const p=`
    ${l?"bg-gradient-to-br from-white/10 via-emerald-500/5 to-white/5":"bg-gradient-to-br from-white/8 to-white/4"}
    backdrop-blur-xl 
    ${e?"rounded-xl sm:rounded-2xl":"rounded-2xl"}
    border 
    ${n?"border-emerald-400/50 shadow-lg shadow-emerald-500/25":"border-white/20"}
    ${a?"hover:bg-gradient-to-br hover:from-white/15 hover:via-emerald-500/10 hover:to-white/10 hover:border-emerald-400/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300":""}
    ${t?"cursor-pointer":""}
    relative overflow-hidden group
    ${{sm:e?"p-3 sm:p-4":"p-3",md:e?"p-4 sm:p-6":"p-6",lg:e?"p-6 sm:p-8":"p-8"}[m]}
    ${i}
  `,o=r.jsxs("div",{className:p,onClick:t,children:[a&&r.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"}),r.jsx("div",{className:"relative z-10",children:s})]});return d?r.jsx(h.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},transition:{duration:.4,type:"spring",stiffness:100},whileHover:a?{y:-4,scale:1.02}:void 0,whileTap:t?{scale:.98}:void 0,children:o}):o};export{v as C};
