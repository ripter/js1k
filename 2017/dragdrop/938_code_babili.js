function createSVG(a){return'<svg viewBox="0 0 1000 800">'+a.map(function(c){return'<polygon points="'+c[0]+'" style="'+c[1]+'"/>'}).join('')+'</svg>'}function add(a,c,d){var e=document.createElement(a);return e.innerHTML=c,d.prepend(e),e}var active=null;window.m=function(c){var d=c.target,g;switch(c.type){case'touchstart':case'mousedown':if(active)return;if('svg'==d.tagName)return;active=d,active.start=[c.pageX,c.pageY];break;case'touchmove':case'mousemove':if(!active)return;c.preventDefault(),active.deltaX=c.pageX-active.start[0],active.deltaY=c.pageY-active.start[1],active.setAttribute('transform','translate('+active.deltaX+', '+active.deltaY+')');break;case'touchend':case'mouseup':if(!active)return;g=active.getAttribute('points'),g=g.replace(/([\d.]+),([\d.]+)/g,function(h,i,j){var k=+i+active.deltaX,l=+j+active.deltaY;return''+k+','+l}),active.setAttribute('points',g),active.removeAttribute('transform'),active=null;}};var tangram=[['0,0 0,100 50,50','fill: #001f3f'],['0,100 100,100 50,50','fill: #0074D9'],['100,100 100,50 75,75','fill: #7FDBFF'],['100,50 100,0 50,0','fill: #39CCCC'],['50,50 75,25 100,50 75,75','fill: #3D9970'],['50,50 75,25 25,25','fill: #2ECC40'],['0,0 50,0 75,25 25,25','fill: #01FF70']],SCALE=2.5;tangram=tangram.map(function(a){return a[0]=a[0].replace(/(\d+)/g,function(c){return c*SCALE}),a});var elmSvg=add('div',createSVG(tangram),b);['mousedown','mousemove','mouseup','touchstart','touchend','touchmove'].forEach(function(a){elmSvg.addEventListener(a,window.m)});