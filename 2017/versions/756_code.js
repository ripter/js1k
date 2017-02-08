var b = document.body;

function createSVG(polygons) {
  return [
    '<svg viewBox="0 0 100 100">',
    polygons.map(function(polygon){
      return [
      '<polygon points="', polygon[0], '" style="', polygon[1], '"',
        ['down','move','up','out'].reduce(function(acc, curr) {
          return acc+'onMouse'+curr+'="m(event)" ';
        }, ''),
      '/>',
      ].join('');
    }).join(''),
    '</svg>'
  ].join('');
}

function add(tag, innerHTML, parent) {
  var elm = document.createElement(tag);
  elm.innerHTML = innerHTML;
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

var tree = add('div', createSVG([
  ['40,50 60,50 60,100 40,100', 'fill: brown;'],
  ['25,25 75,25 75,75, 25,75', 'fill: #2ECC40;'],
  ['18,19 18,44 43,44, 43,19', 'fill: #2ECC40;'],
  ['60,47 60,72 85,72, 85,47', 'fill: #2ECC40;'],
]));
tree.append(add('style', 'svg {height:300px; width:300px;}svg polygon {stroke: #001f3f;}'));
b.prepend(tree);
