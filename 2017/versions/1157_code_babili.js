var elm=document.createElement('div'),html,active,startX,startY,getPolygon,deltaX,deltaY,getPair=/([\d.-]+),([\d.-]+)/g;function magic(a){a.preventDefault();var c=a.type,d=a.pageX,e=a.pageY;'polygon'==a.target.tagName&&c.match(/r|w/)?(active=a.target.outerHTML.match(/s="([^"]+)/)[1],getPolygon=new RegExp(active+'[^/]+'),startX=d,startY=e,deltaX=deltaY=0):active&&(c.match(/v/)?(deltaX=d-startX,deltaY=e-startY,html=html.replace(getPolygon,function(f){return f.replace(/la[^"]*/,function(g){return g.replace(getPair,deltaX+','+deltaY)})})):c.match(/p|nd/)&&deltaX?(i=1,html=html.replace(getPolygon,function(f){return f.replace(/^[^"]+/g,function(g){return g.replace(/([\d.-]+)/g,function(h){return+h+[deltaX,deltaY][i?i=0:i=1]})}).replace(/la[^"]*/,'late(0,0)')}),active=''):(html=html.replace(getPolygon,function(f){return f.replace(/^[^"]+/g,function(g){return g.replace(getPair,function(h,j,k){return nx=.71*(j-d)+.7*(k-e)+d,ny=.71*(k-e)-.7*(j-d)+e,(0|100*nx)/100+','+(0|100*ny)/100})})}),active=''),elm.innerHTML=html)}var SCALE=3,tangram='0,0 0,100 50,50|0,100 100,100 50,50|100,100 100,50 75,75|100,50 100,0 50,0|50,50 75,25 100,50 75,75|50,50 75,25 25,25|0,0 50,0 75,25 25,25'.replace(/(\d+)/g,function(a){return 3*a});elm.innerHTML=html='<svg viewBox="0 0 1000 800"><filter color-interpolation-filters="sRGB" id="a"><feTurbulence type="turbulence" baseFrequency="0.01 0.1" numOctaves="2" seed="2" /><feColorMatrix result="r" values="0" type="saturate"/><feBlend in="SourceGraphic" in2="r" mode="darken" result="t"/><feComposite in2="SourceAlpha" operator="in"/></filter>'+tangram.replace(/([^|]+)/g,function(a){return'<polygon points="'+a+'" transform="rotate(0) translate(0,0)" style="fill:#927C60;filter:url(#a)"/>'})+'</svg>',b.prepend(elm),'mousedown mousemove mouseup touchstart touchend touchmove'.replace(/\w+/g,function(a){elm.addEventListener(a,magic)});
