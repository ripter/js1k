function createSVG(polygons) {
  return '<svg viewBox="0 0 100 100">'
    +polygons.map(function(polygon) {
      return '<polygon points="'+polygon[0]+'" style="'+polygon[1]+'"'
        // +['down','move','up','out'].reduce(function(acc, curr) {
        //   return acc+'onMouse'+curr+'="m(event)" ';
        // }, '')
        // +['down','move','up','out'].reduce((acc, curr) => acc+'onMouse'+curr+'="m(event)" ', '')
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


let active = null;
window.m = function magic(evt) {
  let target = evt.target;
  let deltaX, deltaY, points;

  switch (evt.type) {
    case 'mousedown':
      active = target;
      // if (!active.delta) {
      active.start = [evt.x, evt.y];
      // }
      console.log('down', active.delta, active);
      break;
    case 'mousemove':
      if (!active) { return; }
      active.deltaX = evt.x - active.start[0];
      active.deltaY = evt.y - active.start[1];
      target.setAttribute('transform', 'translate('+active.deltaX+', '+active.deltaY+')');
      break;
    case 'mouseup':
    case 'mouseout':
      if (!active) { return; }
      if (active == target) { return; }
      console.log('up', active);
      console.log('deltaX', active.deltaX, 'deltaY', active.deltaY)
      points = active.getAttribute('points');
      console.log('before', points);
      points = points.replace(/([\d.]+),([\d.]+)/g, function(pair, x, y) {
        let newX = +x+active.deltaX;
        let newY = +y+active.deltaY;
        console.log(pair, '(x,y)', x, y, '(newX, newY)', newX, newY);
        return ''+newX+','+newY;
      });
      console.log('after', points);

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

var SCALE = 0.25;
tangram = tangram.map(function(polygon) {
  // polygon[0] = polygon[0].replace(/(\d+),(\d+)/g, function(point, x, y) {
  //   return ''+ x*SCALE +','+ y*SCALE;
  // });
  polygon[0] = polygon[0].replace(/(\d+)/g, (x) => x*SCALE);
  return polygon;
});

var elmSvg = add('div', createSVG(tangram), b);
// add('style', 'svg {height:300px; width:300px;}svg polygon {stroke: #001f3f;}', elmSvg);

['down','move','up','out'].forEach(function(eventName) {
  elmSvg.addEventListener('mouse'+eventName, window.m);
});
