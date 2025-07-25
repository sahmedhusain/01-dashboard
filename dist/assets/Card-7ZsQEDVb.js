import{j as i,m as d}from"./animation-vendor-BWQ_wUI_.js";const u=({children:e,className:a="",hover:r=!1,animate:s=!0,onClick:t})=>{const n=`
    bg-white/10 
    backdrop-blur-lg 
    rounded-2xl 
    border 
    border-white/20 
    ${r?"hover:bg-white/15 hover:border-white/30 transition-all duration-200":""}
    ${t?"cursor-pointer":""}
    ${a}
  `,o=i.jsx("div",{className:n,onClick:t,children:e});return s?i.jsx(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},whileHover:r?{y:-2}:void 0,children:o}):o};export{u as C};
