var t=!1,e,r,n=window.m=function(n){var i=n.type,a=n.pageX,o=n.pageY,u=1,l=t?t.getAttribute("transform")||"rotate(0) translate(0,0)":"";return"polygon"==n.target.tagName&&i.match(/r|w/)?(t=n.target,void(r=[a,o])):void(t&&(n.preventDefault(),i.match(/v/)&&(e=[a-r[0],o-r[1]],l=l.replace(/tr[^)]+\)/g,function(){return"translate("+e[0]+","+e[1]+")"})),i.match(/p|nd/)&&(e?(l=l.replace(/tr[^)]+\)/g,"translate(0,0)"),t.setAttribute("points",t.getAttribute("points").replace(/([\d.-]+)/g,function(t){return+t+e[u=u?0:1]}))):t.setAttribute("points",t.getAttribute("points").replace(/([\d.-]+),([\d.-]+)/g,function(t,e,r){var n=45,i=Math.PI/180*n,u=Math.cos(i),l=Math.sin(i);return(0|100*(u*(e-a)+l*(r-o)+a))/100+","+(0|100*(u*(r-o)-l*(e-a)+o))/100})),e=r=!1),t.setAttribute("transform",l),r||(t=!1)))},i=2.5,a=[["0,0 0,100 50,50","fill:#001f3f"],["0,100 100,100 50,50","fill:#0074D9"],["100,100 100,50 75,75","fill:#7FDBFF"],["100,50 100,0 50,0","fill:#39CCCC"],["50,50 75,25 100,50 75,75","fill:#3D9970"],["50,50 75,25 25,25","fill:#2ECC40"],["0,0 50,0 75,25 25,25","fill:#01FF70"]].map(function(t){return t[0]=t[0].replace(/(\d+)/g,function(t){return t*i}),t}),o=document.createElement("div");o.innerHTML='<svg viewBox="0 0 1000 800"><filter id="a"><feGaussianBlur in="SourceGraphic" stdDeviation="3"/></filter>'+a.map(function(t){return'<polygon points="'+t[0]+'" style="'+t[1]+';filter:url(#a)"/>'}).join("")+"</svg>",b.prepend(o),"mousedown mousemove mouseup touchstart touchend touchmove".replace(/\w+/g,function(t){o.addEventListener(t,n)});