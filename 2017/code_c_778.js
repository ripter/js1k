function createSVG(e,n){const t=document.createElement("div"),o=n.map(function(e){return['<polygon points="',e[0],'" style="',e[1],'" onMousedown="magic(event)" onMousemove="magic(event)" onMouseup="magic(event)" onMouseout="magic(event)"/>'].join("")}).join("");return t.innerHTML=['<svg viewBox="0 0 100 100">',o,"</svg>"].join(""),e.append(t),t}function createCSS(e){const n=document.createElement("style");return n.innerHTML=["svg {height:300px; width:300px;}","svg polygon {stroke: #001f3f;}"].join(""),e.append(n),n}window.active=null,window.magic=function(e){switch(e.type){case"mousedown":window.active=[e.x,e.y];break;case"mousemove":if(!window.active)return;const n=e.x-active[0],t=e.y-active[1];e.target.setAttribute("transform","translate("+n+", "+t+")");break;case"mouseup":case"mouseout":window.active=null}};var tree=createSVG(document.body,[["40,50 60,50 60,100 40,100","fill: brown;"],["25,25 75,25 75,75, 25,75","fill: #2ECC40;"],["18,19 18,44 43,44, 43,19","fill: #2ECC40;"],["60,47 60,72 85,72, 85,47","fill: #2ECC40;"]]);createCSS(tree);
