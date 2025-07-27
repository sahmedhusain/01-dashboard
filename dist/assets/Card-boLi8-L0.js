import{j as e,m as h}from"./animation-vendor-BWQ_wUI_.js";const m=({children:i,className:a="",hover:r=!1,animate:s=!0,onClick:o,gradient:n=!1,glowing:d=!1})=>{const l=`
    ${n?"bg-gradient-to-br from-white/10 to-white/5":"bg-white/10"}
    backdrop-blur-lg 
    rounded-2xl 
    border 
    ${d?"border-primary-500/50 shadow-lg shadow-primary-500/25":"border-white/20"}
    ${r?"hover:bg-white/15 hover:border-white/30 hover:shadow-xl transition-all duration-300":""}
    ${o?"cursor-pointer":""}
    ${a}
  `,t=e.jsx("div",{className:l,onClick:o,children:i});return s?e.jsx(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},whileHover:r?{y:-2}:void 0,children:t}):t};export{m as C};
