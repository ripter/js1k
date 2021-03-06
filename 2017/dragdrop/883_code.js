function createSVG(polygons) {
  return '<svg viewBox="0 0 1000 800">'
    +polygons.map(function(polygon) {
      return '<polygon points="'+polygon[0]+'" style="'+polygon[1]+'"'
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


var active = null;
window.m = function magic(evt) {
  var target = evt.target;
  var deltaX, deltaY, points;

  switch (evt.type) {
    case 'mousedown':
      if (active) { return; }
      if (target.tagName == 'svg') { return; }
      active = target;
      active.start = [evt.x, evt.y];
      break;
    case 'mousemove':
      if (!active) { return; }
      active.deltaX = evt.x - active.start[0];
      active.deltaY = evt.y - active.start[1];
      active.setAttribute('transform', 'translate('+active.deltaX+', '+active.deltaY+')');
      break;
    case 'mouseup':
      if (!active) { return; }
      points = active.getAttribute('points');
      points = points.replace(/([\d.]+),([\d.]+)/g, function(pair, x, y) {
        var newX = +x+active.deltaX;
        var newY = +y+active.deltaY;
        return ''+newX+','+newY;
      });

      active.setAttribute('points', points);
      active.removeAttribute('transform');
      active = null;
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

var SCALE = 2.5;
tangram = tangram.map(function(polygon) {
  // polygon[0] = polygon[0].replace(/(\d+)/g, (x) => x*SCALE);
  polygon[0] = polygon[0].replace(/(\d+)/g, function(x) {
    return x*SCALE
  });
  return polygon;
});

var elmSvg = add('div', createSVG(tangram), b);
// add('style', 'svg {height:300px; width:300px;}svg polygon {stroke: #001f3f;}', elmSvg);

['down','move','up','out'].forEach(function(eventName) {
  elmSvg.addEventListener('mouse'+eventName, window.m);
});
