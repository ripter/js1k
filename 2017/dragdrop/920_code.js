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
  var deltaX, deltaY, points, i=1;

  switch (evt.type) {
    case 'touchstart':
    case 'mousedown':
      if (active) { return; }
      if (target.tagName == 'svg') { return; }
      active = target;
      active.start = [evt.pageX, evt.pageY];
      break;
    case 'touchmove':
    case 'mousemove':
      if (!active) { return; }
      evt.preventDefault();
      deltaX = evt.pageX - active.start[0];
      deltaY = evt.pageY - active.start[1];
      active.d = [deltaX, deltaY];
      active.setAttribute('transform', 'translate('+deltaX+', '+deltaY+')');
      break;
    case 'touchend':
    case 'mouseup':
      if (!active) { return; }
      points = active.getAttribute('points');

      // if (!active.d) {
      //   console.log('click')
      // } else {
        points = points.replace(/([\d.]+)/g, function(point) {
          return +point+active.d[i?i=0:i=1];
        });

        // points = points.replace(/([\d.]+),([\d.]+)/g, function(pair, x, y) {
        //   // console.log(arguments)
        //   var newX = +x+active.deltaX;
        //   var newY = +y+active.deltaY;
        //   return ''+newX+','+newY;
        // });
      // }
      // console.group('mouseup')
      // console.log('points', points)
      // points.replace(/([\d.]+)/g, function(pair, x, y) {
      //   console.log(arguments)
      // });
      // console.groupEnd();


      active.setAttribute('points', points);
      active.removeAttribute('transform');
      delete active.d;
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
'mousedown mousemove mouseup touchstart touchend touchmove'.replace(/\w+/g, function(eventName) {
  elmSvg.addEventListener(eventName, window.m);
});
