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

/**
 * Creates tag with html prepend to the parent.
 */
function add(tag, innerHTML, parent) {
  var elm = document.createElement(tag);
  elm.innerHTML = innerHTML;
  parent.prepend(elm);
  return elm;
}


window.active = null;
window.m = function magic(evt) {
  var target = evt.target;

  switch (evt.type) {
    case 'mousedown':
      window.active = [evt.x, evt.y];
      target.deltaX = evt.x;
      target.deltaY = evt.y;
      break;
    case 'mousemove':
      if (!window.active) { return; }
      // const deltaX = evt.x - active[0];
      // const deltaY = evt.y - active[1];
      var deltaX = evt.x - target.deltaX;
      var deltaY = evt.y - target.deltaY;
      evt.target.setAttribute('transform', 'translate('+deltaX+', '+deltaY+')');
      break;
    case 'mouseup':
    case 'mouseout':
      window.active = null;
  }
};

var tangram = [
  ['0,0 0,100 50,50', 'fill: #001f3f'],
  ['0,100 100,100 50,50', 'fill: #0074D9'],
  ['100,100 100,50 75,75', 'fill: #7FDBFF'],
  ['100,50 100,0 50,0', 'fill: #39CCCC'],
  ['50,50 75,25 100,50 75,75', 'fill: #3D9970'],
  ['50,50 75,25 25,25', 'fill: #2ECC40'],
  ['0,0 50,0 75,25 25,25', 'fill: #01FF70'],
];

var SCALE = 0.25;
tangram = tangram.map(function(polygon) {
  polygon[0] = polygon[0].replace(/(\d+),(\d+)/g, function(point, x, y) {
    return ''+ x*SCALE +','+ y*SCALE;
  });
  // polygon[0] = polygon[0].replace(/(\d+)/g, (x) => x*SCALE);
  return polygon;
});

var elmSvg = add('div', createSVG(tangram), b);
// add('style', 'svg {height:300px; width:300px;}svg polygon {stroke: #001f3f;}', elmSvg);
