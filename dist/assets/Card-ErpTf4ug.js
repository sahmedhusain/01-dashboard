import{j as s,m as h}from"./animation-vendor-w_1g82yL.js";const c=({children:a,className:i="",hover:t=!1,animate:d=!0,onClick:o,gradient:n=!1,glowing:l=!1,size:m="md",responsive:r=!0})=>{const p=`
    ${n?"bg-gradient-to-br from-white/10 to-white/5":"bg-white/10"}
    backdrop-blur-lg 
    ${r?"rounded-xl sm:rounded-2xl":"rounded-2xl"}
    border 
    ${l?"border-primary-500/50 shadow-lg shadow-primary-500/25":"border-white/20"}
    ${t?"hover:bg-white/15 hover:border-white/30 hover:shadow-xl transition-all duration-300":""}
    ${o?"cursor-pointer touch-target":""}
    ${{sm:r?"p-3 sm:p-4":"p-3",md:r?"p-4 sm:p-6":"p-6",lg:r?"p-6 sm:p-8":"p-8"}[m]}
    ${i}
  `,e=s.jsx("div",{className:p,onClick:o,children:a});return d?s.jsx(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},whileHover:t?{y:-2}:void 0,children:e}):e};export{c as C};
