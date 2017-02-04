function createSVG(polygons) {
  var polys = '';

  // For Loop: actual: 257 bytes, compressed file: 749 bytes
  // for(var i=0; i < polygons.length; i++) {
  //   polys += '<polygon points="'+polygons[i][0]+'" style="'+polygons[i][1]+'"'+
  //   ['down','move','up','out'].reduce(function(acc, curr) {
  //     return acc+'onMouse'+curr+'="m(event)" ';
  //   }, '')
  //   +'/>';
  // }

  // While Loop: actual: 256 bytes, compressed file: 746 bytes
  var i = polygons.length;
  while(i--) {
    polys += '<polygon points="'+polygons[i][0]+'" style="'+polygons[i][1]+'"'+
    ['down','move','up','out'].reduce(function(acc, curr) {
      return acc+'onMouse'+curr+'="m(event)" ';
    }, '')
    +'/>';
  }

  return '<svg viewBox="0 0 100 100">'+polys+'</svg>';
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

var t = add('div', createSVG([
  ['60,47 60,72 85,72, 85,47', 'fill: #2ECC40;'],
  ['18,19 18,44 43,44, 43,19', 'fill: #2ECC40;'],
  ['25,25 75,25 75,75, 25,75', 'fill: #2ECC40;'],
  ['40,50 60,50 60,100 40,100', 'fill: brown;'],
]), b);
add('style', 'svg {height:300px; width:300px;}svg polygon {stroke: #001f3f;}', t);
