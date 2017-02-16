// Create the SVG and prepend it to body
var elm = document.createElement('div');
var html, active, startX, startY, getPolygon, deltaX, deltaY;
var getPoints = /^[^"]+/g
var getDelta = /\(([\d.-]+),([\d.-]+)\)/
var getPointsDelta = /(^[^"]+)[^/]+\(([\d.-]+),([\d.-]+)\)/
function magic(evt) {
  evt.preventDefault();
  var type = evt.type;
  var x = evt.pageX;
  var y = evt.pageY;

  // Touch a polygon to start the drag
  // touchstart, mousedown
  if (evt.target.tagName == 'polygon' && type.match(/r|w/)){
    // get the points of the polygon
    active = evt.target.outerHTML.match(/s="([^"]+)/)[1];
    getPolygon = new RegExp(active+'[^/]+');
    // save the mouse pos so we can translate
    startX = x;
    startY = y;
    deltaX = deltaY = 0;
  }
  // make sure we have a polygon
  else if (active) {
    // Drag
    // touchmove, mousemove
    if (type.match(/v/)) {
      deltaX = x - startX;
      deltaY = y - startY;
      html = html.replace(getPolygon, function(polygon) {
        return polygon
          .replace(getDelta, '('+deltaX+','+deltaY +')')
      });

    }
    // Drop or Click
    // touchend, mouseup
    else if (type.match(/p|nd/) && deltaX) {
      i = 1;
      html = html.replace(getPolygon, function(polygon) {
        // var delta = polygon.match(getDelta);
        var delta = [deltaX, deltaY]
        return polygon
          // Drop
          .replace(getPoints, function(points) {
            return points.replace(/([\d.-]+)/g, function(point) {
              return +point+delta[i?i=0:i=1];
            });
          })
          .replace(getDelta, '(0,0)')
      });
      active = '';
    }
    //
    // Click
    else {
      html = html.replace(getPolygon, function(polygon) {
        return polygon
          .replace(getPoints, function(points) {
            return points.replace(/([\d.-]+),([\d.-]+)/g, function(_, pX, pY) {
              var angle = 45;
              var radians = (Math.PI / 180) * angle,
              cos = Math.cos(radians),
              sin = Math.sin(radians),
              nx = (cos * (pX - x)) + (sin * (pY - y)) + x,
              ny = (cos * (pY - y)) - (sin * (pX - x)) + y;
              return (0|(nx*100))/100 +','+ (0|(ny*100))/100
            });
          })
      });
      active = '';
    }

    elm.innerHTML = html;
  }
}

// Create a polygon for each tangram piece
var SCALE = 3;
var tangram = '0,0 0,100 50,50|0,100 100,100 50,50|100,100 100,50 75,75|100,50 100,0 50,0|50,50 75,25 100,50 75,75|50,50 75,25 25,25|0,0 50,0 75,25 25,25'
  .replace(/(\d+)/g, function(x) {
    return x*3
  })

// better on desktop
// elm.innerHTML = '<svg viewBox="0 0 '+ screen.availWidth +' '+ screen.availHeight +'">'
// better on iPhone
elm.innerHTML = html = '<svg viewBox="0 0 1000 800">'
+'<filter color-interpolation-filters="sRGB" id="a">'
  +'<feTurbulence type="turbulence" baseFrequency="0.01 0.1" numOctaves="2" seed="2" />'
  +'<feColorMatrix result="r" values="0" type="saturate"/>'
  +'<feBlend in="SourceGraphic" in2="r" mode="darken" result="t"/>'
  +'<feComposite in2="SourceAlpha" operator="in"/>'
+'</filter>'
//TODO: find a way to remove the | between <polygon />s
+tangram.replace(/([^|]+)/g, function(polygon) {
  return '<polygon points="'+polygon+'" transform="rotate(0) translate(0,0)" style="fill:#927C60;filter:url(#a)"'+'/>';
})
+'</svg>';
b.prepend(elm);
// listen to events on the svg
'mousedown mousemove mouseup touchstart touchend touchmove'.replace(/\w+/g, function(eventName) {
  elm.addEventListener(eventName, magic);
});
