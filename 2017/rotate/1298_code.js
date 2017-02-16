var active = false;
var delta, start;
var m = window.m = function(evt) {
  var type = evt.type;
  var x = evt.pageX;
  var y = evt.pageY;
  var i=1;
  var transform = active ? active.getAttribute('transform') || 'rotate(0) translate(0,0)' : '';
  evt.preventDefault();

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
  ['0,0 0,100 50,50',           'fill:#C8B89A'],
  ['0,100 100,100 50,50',       'fill:#90775A'],
  ['100,100 100,50 75,75',      'fill:#CBB99B'],
  ['100,50 100,0 50,0',         'fill:#C3AD8B'],
  ['50,50 75,25 100,50 75,75',  'fill:#927C60'],
  ['50,50 75,25 25,25',         'fill:#987F60'],
  ['0,0 50,0 75,25 25,25',      'fill:#957D5E']
].map(function(polygon) {
  // scale it to size
  polygon[0] = polygon[0].replace(/(\d+)/g, function(x) {
    return x*SCALE
  });
  return polygon;
});

// Create the SVG and prepend it to body
var elm = document.createElement('div');
// better on desktop
// elm.innerHTML = '<svg viewBox="0 0 '+ screen.availWidth +' '+ screen.availHeight +'">'
// better on iPhone
elm.innerHTML = '<svg viewBox="0 0 1000 800">'
+'<filter color-interpolation-filters="sRGB" id="a">'
  +'<feTurbulence type="turbulence" baseFrequency="0.01 0.1" numOctaves="2" seed="2" />'
  +'<feColorMatrix result="r" values="0" type="saturate"/>'
  +'<feBlend in="SourceGraphic" in2="r" mode="darken" result="t"/>'
  +'<feComposite in2="SourceAlpha" operator="in"/>'
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
