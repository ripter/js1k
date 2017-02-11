var active = false;
var delta, start;
var translate = '';
// var m = window.m = function(evt) {
var m = window.m = (evt) => {
  var type = evt.type;
  var x = evt.pageX;
  var y = evt.pageY;
  var i=1;

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
      translate = 'translate('+delta[0]+','+delta[1]+')'
    }
    // Drop or Click
    // touchend, mouseup
    if (type.match(/p|nd/)) {
      // Drop
      if (delta) {
        translate = '';
        // es6
        active.setAttribute('points', active.getAttribute('points').replace(/([\d.]+)/g, point => +point+delta[i?i=0:i=1]))
        // es5
        // active.setAttribute('points', active.getAttribute('points').replace(/([\d.]+)/g, function(point) {
          // add the delta to each point
        //   return +point+delta[i?i=0:i=1];
        // }));
      }
      // Click
      else {
      }
      // reset for the next active
      delta = start = false;
    }

    active.setAttribute('transform', translate);
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
  ['0,0 0,100 50,50', 'fill: #001f3f'],
  ['0,100 100,100 50,50', 'fill: #0074D9'],
  ['100,100 100,50 75,75', 'fill: #7FDBFF'],
  ['100,50 100,0 50,0', 'fill: #39CCCC'],
  ['50,50 75,25 100,50 75,75', 'fill: #3D9970'],
  ['50,50 75,25 25,25', 'fill: #2ECC40'],
  ['0,0 50,0 75,25 25,25', 'fill: #01FF70'],
// ].map(function(polygon) {
].map((polygon) => {
  // scale it to size
  // es6
  polygon[0] = polygon[0].replace(/(\d+)/g, x => x*SCALE)
  // es5
  // polygon[0] = polygon[0].replace(/(\d+)/g, function(x) {
    // return x*SCALE
  // });
  return polygon;
});

// Create the SVG and prepend it to body
var elm = document.createElement('div');
// es6
elm.innerHTML = '<svg viewBox="0 0 1000 800">'+tangram.map(polygon => '<polygon points="'+polygon[0]+'" style="'+polygon[1]+'"'+'/>').join('')+'</svg>'
// es5
// elm.innerHTML = '<svg viewBox="0 0 1000 800">'+tangram.map(function(polygon) {
  // return '<polygon points="'+polygon[0]+'" style="'+polygon[1]+'"'+'/>';
// }).join('')+'</svg>';
b.prepend(elm);
// listen to events on the svg
'mousedown mousemove mouseup touchstart touchend touchmove'.replace(/\w+/g, (eventName) => {
  elm.addEventListener(eventName, m);
});
