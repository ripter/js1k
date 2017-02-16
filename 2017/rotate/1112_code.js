var active = false;
var delta, start;
var m = window.m = function(evt) {
  var type = evt.type;
  var x = evt.pageX;
  var y = evt.pageY;
  var i=1;
  var transform = active ? active.getAttribute('transform') || 'rotate(0) translate(0,0)' : '';

  // Touch a polygon to start the drag
  // touchstart, mousedown
  if (evt.target.tagName == 'polygon' && type.match(/r|w/)){
    active = evt.target;
    start = [x, y];
    return;
  }
  // make sure we have a polygon
  else if (active) {
    evt.preventDefault();
    // Drag
    // touchmove, mousemove
    if (type.match(/v/)) {
      delta = [x - start[0], y - start[1]];
      // pull out transform(,)
      transform = transform.replace(/tr[^)]+\)/g, function() {
        return 'translate('+delta[0]+','+delta[1]+')'
      });
    }
    // Drop or Click
    // touchend, mouseup
    if (type.match(/p|nd/)) {
      // Drop
      if (delta) {
        transform = transform.replace(/tr[^)]+\)/g, 'translate(0,0)');
        active.setAttribute('points', active.getAttribute('points').replace(/([\d.-]+)/g, function(point) {
          // add the delta to each point
          return +point+delta[i?i=0:i=1];
        }));
      }
      // Click
      else {
        active.setAttribute('points', active.getAttribute('points').replace(/([\d.-]+),([\d.-]+)/g, function(_, pX, pY) {
          var angle = 45;
          var radians = (Math.PI / 180) * angle,
              cos = Math.cos(radians),
              sin = Math.sin(radians),
              nx = (cos * (pX - x)) + (sin * (pY - y)) + x,
              ny = (cos * (pY - y)) - (sin * (pX - x)) + y;
          return (0|(nx*100))/100 +','+ (0|(ny*100))/100
        }));
      }
      // reset for the next active
      delta = start = false;
    }

    active.setAttribute('transform', transform);
    // reset active
    if (!start) {
      active = false;
    }
  }
};

// Create a polygon for each tangram piece
var SCALE = 2.5;
var tangram = [
  // viewBox 0,0 100,100 use to create
  ['0,0 0,100 50,50',           'fill:#001f3f'],
  ['0,100 100,100 50,50',       'fill:#0074D9'],
  ['100,100 100,50 75,75',      'fill:#7FDBFF'],
  ['100,50 100,0 50,0',         'fill:#39CCCC'],
  ['50,50 75,25 100,50 75,75',  'fill:#3D9970'],
  ['50,50 75,25 25,25',         'fill:#2ECC40'],
  ['0,0 50,0 75,25 25,25',      'fill:#01FF70'],
].map(function(polygon) {
  // scale it to size
  polygon[0] = polygon[0].replace(/(\d+)/g, function(x) {
    return x*SCALE
  });
  return polygon;
});

// Create the SVG and prepend it to body
var elm = document.createElement('div');
elm.innerHTML = '<svg viewBox="0 0 1000 800">'
  +'<filter id="a">'
  +'<feGaussianBlur in="SourceGraphic" stdDeviation="3"/>'

  // +'<feOffset dx="0" dy="0" in="SourceGraphic"></feOffset>'
  // +'<feOffset dx="0" dy="2" in="SourceGraphic" result="shadowOffsetOuter1"></feOffset>'
  // +'<feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>'
  // +'<feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>'

  // +'<feConvolveMatrix kernelMatrix="3 0 0  0 0 0  0 0 -3"/>'


  +'</filter>'
  +tangram.map(function(polygon) {
    return '<polygon points="'+polygon[0]+'" style="'+polygon[1]+';filter:url(#a)"'+'/>';
  }).join('')
  +'</svg>';
b.prepend(elm);
// listen to events on the svg
'mousedown mousemove mouseup touchstart touchend touchmove'.replace(/\w+/g, function(eventName) {
  elm.addEventListener(eventName, m);
});
