function createSVG(a){return'<svg viewBox="0 0 1000 800">'+a.map(function(c){return'<polygon points="'+c[0]+'" style="'+c[1]+'"/>'}).join('')+'</svg>'}var active=null,delta,start,translate=rotate='',m=window.m=function(a){var c=a.type,d=a.pageX,e=a.pageY,g=1;return'polygon'==a.target.tagName&&c.match(/r|w/)?(active=a.target,void(start=[d,e])):void(active&&(c.match(/v/)&&(delta=[d-start[0],e-start[1]],translate='translate('+delta[0]+','+delta[1]+')'),c.match(/p|nd/)&&(delta?(translate='',active.setAttribute('points',active.getAttribute('points').replace(/([\d.]+)/g,function(h){return+h+delta[g?g=0:g=1]})),delta=start=0):console.log('click')),a.preventDefault(),active.setAttribute('transform',translate+''+rotate),start||(active=0)))},SCALE=2.5,tangram=[['0,0 0,100 50,50','fill: #001f3f'],['0,100 100,100 50,50','fill: #0074D9'],['100,100 100,50 75,75','fill: #7FDBFF'],['100,50 100,0 50,0','fill: #39CCCC'],['50,50 75,25 100,50 75,75','fill: #3D9970'],['50,50 75,25 25,25','fill: #2ECC40'],['0,0 50,0 75,25 25,25','fill: #01FF70']].map(function(a){return a[0]=a[0].replace(/(\d+)/g,function(c){return c*SCALE}),a});function add(a,c,d){var e=document.createElement(a);return e.innerHTML=c,d.prepend(e),e}var elmSvg=add('div',createSVG(tangram),b);'mousedown mousemove mouseup touchstart touchend touchmove'.replace(/\w+/g,function(a){elmSvg.addEventListener(a,m)});
