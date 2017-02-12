var active = null;
var delta, start;
var translate = rotate = '';
var m = window.m = function(evt) {
  var type = evt.type;
  var x = evt.pageX;
  var y = evt.pageY;
  var points, i=1;

  // Touch a polygon to start the drag
  // touchstart, mousedown
  if (evt.target.tagName == 'polygon' && type.match(/r|w/)){
    active = evt.target;
    start = [x, y];
    return;
  }
  // make sure we have a polygon
  else if (active) {
    // Drag
    // touchmove, mousemove
    if (type.match(/v/)) {
      delta = [x - start[0], y - start[1]];
      translate = 'translate('+delta[0]+','+delta[1]+')'
    }
    // Drop or Click
    // touchend, mouseup
    if (type.match(/p|nd/)) {
      // Drop
      if (delta) {
        translate = '';
        active.setAttribute('points', active.getAttribute('points').replace(/([\d.]+)/g, function(point) {
          // add the delta to each point
          return +point+delta[i?i=0:i=1];
        }));
        delta = start = 0;
      }
      // Click
      else {
        console.log('click');
      }
    }

    evt.preventDefault();
    active.setAttribute('transform', translate+''+rotate);
    if (!start) {
      active = 0;
    }
  }
};

var SCALE = 2.5;
var tangram = [
  ['0,0 0,100 50,50', 'fill: #001f3f'],
  ['0,100 100,100 50,50', 'fill: #0074D9'],
  ['100,100 100,50 75,75', 'fill: #7FDBFF'],
  ['100,50 100,0 50,0', 'fill: #39CCCC'],
  ['50,50 75,25 100,50 75,75', 'fill: #3D9970'],
  ['50,50 75,25 25,25', 'fill: #2ECC40'],
  ['0,0 50,0 75,25 25,25', 'fill: #01FF70'],
].map(function(polygon) {
  // polygon[0] = polygon[0].replace(/(\d+)/g, (x) => x*SCALE);
  polygon[0] = polygon[0].replace(/(\d+)/g, function(x) {
    return x*SCALE
  });
  return polygon;
});

var elm = document.createElement('div');
elm.innerHTML = '<svg viewBox="0 0 1000 800">'+tangram.map(function(polygon) {
  return '<polygon points="'+polygon[0]+'" style="'+polygon[1]+'"'+'/>';
}).join('')+'</svg>';
b.prepend(elm);
'mousedown mousemove mouseup touchstart touchend touchmove'.replace(/\w+/g, function(eventName) {
  elm.addEventListener(eventName, m);
});
