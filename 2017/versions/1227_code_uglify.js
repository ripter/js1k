function e(e){e.preventDefault();var f=e.type,d=e.pageX,g=e.pageY;"polygon"==e.target.tagName&&f.match(/r|w/)?(n=e.target.outerHTML.match(/s="([^"]+)/)[1],u=new RegExp(n+"[^/]+"),a=d,o=g,c=l=0):n&&(f.match(/v/)?(c=d-a,l=g-o,t=t.replace(u,function(e){return e.replace(s,"("+c+","+l+")")})):f.match(/p|nd/)&&c?(i=1,t=t.replace(u,function(e){var r=[c,l];return e.replace(p,function(e){return e.replace(/([\d.-]+)/g,function(e){return+e+r[i?i=0:i=1]})}).replace(s,"(0,0)")}),n=""):(t=t.replace(u,function(e){return e.replace(p,function(e){return e.replace(/([\d.-]+),([\d.-]+)/g,function(e,r,t){var n=45,a=Math.PI/180*n,o=Math.cos(a),u=Math.sin(a);return(0|100*(o*(r-d)+u*(t-g)+d))/100+","+(0|100*(o*(t-g)-u*(r-d)+g))/100})})}),n=""),r.innerHTML=t)}var r=document.createElement("div"),t,n,a,o,u,c,l,p=/^[^"]+/g,s=/\(([\d.-]+),([\d.-]+)\)/,f=/(^[^"]+)[^\/]+\(([\d.-]+),([\d.-]+)\)/,d=3;r.innerHTML=t='<svg viewBox="0 0 1000 800"><filter color-interpolation-filters="sRGB" id="a"><feTurbulence type="turbulence" baseFrequency="0.01 0.1" numOctaves="2" seed="2" /><feColorMatrix result="r" values="0" type="saturate"/><feBlend in="SourceGraphic" in2="r" mode="darken" result="t"/><feComposite in2="SourceAlpha" operator="in"/></filter>'+"0,0 0,100 50,50|0,100 100,100 50,50|100,100 100,50 75,75|100,50 100,0 50,0|50,50 75,25 100,50 75,75|50,50 75,25 25,25|0,0 50,0 75,25 25,25".replace(/(\d+)/g,function(e){return 3*e}).replace(/([^|]+)/g,function(e){return'<polygon points="'+e+'" transform="rotate(0) translate(0,0)" style="fill:#927C60;filter:url(#a)"/>'})+"</svg>",b.prepend(r),"mousedown mousemove mouseup touchstart touchend touchmove".replace(/\w+/g,function(t){r.addEventListener(t,e)});