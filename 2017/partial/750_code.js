function createSVG(polygons) {
  return '<svg viewBox="0 0 100 100">'
    +polygons.map(function(polygon) {
      return '<polygon points="'+polygon[0]+'" style="'+polygon[1]+'"'+
        ['down','move','up','out'].reduce(function(acc, curr) {
          return acc+'onMouse'+curr+'="m(event)" ';
        }, '')
      +'/>';
    }).join('')
    +'</svg>';
}

function add(tag, innerHTML, parent) {
  var elm = document.createElement(tag);
  elm.innerHTML = innerHTML;
  parent.prepend(elm);
  return elm;
}

window.active = null;
window.m = function magic(evt) {
  switch (evt.type) {
    case 'mousedown':
      window.active = [evt.x, evt.y];
      break;
    case 'mousemove':
      if (!window.active) { return; }
      const deltaX = evt.x - active[0];
      const deltaY = evt.y - active[1];
      evt.target.setAttribute('transform', 'translate('+deltaX+', '+deltaY+')');
      break;
    case 'mouseup':
    case 'mouseout':
      window.active = null;
  }
};

var elmSvg = add('div', createSVG([
  ['0,0 0,100 50,50', 'fill: #001f3f'],
  ['0,100 100,100 50,50', 'fill: #0074D9'],
  ['100,100 100,50 75,75', 'fill: #7FDBFF'],
  ['100,50 100,0 50,0', 'fill: #39CCCC'],
  ['50,50 75,25 100,50 75,75', 'fill: #3D9970'],
  ['50,50 75,25 25,25', 'fill: #2ECC40'],
  ['0,0 50,0 75,25 25,25', 'fill: #01FF70'],
]), b);
add('style', 'svg {height:300px; width:300px;}svg polygon {stroke: #001f3f;}', elmSvg);
