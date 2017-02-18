var elm = document.createElement('div');
var html, active, startX, startY, deltaX, deltaY;
var getPoints = /s="[^"]+/;
var getPair = /([\d.-]+),([\d.-]+)/g
var getTranslate = /la[^"]*/
function magic(evt) {
  evt.preventDefault();
  var type = evt.type;
  var x = evt.pageX;
  var y = evt.pageY;

  // Touch a polygon to start the drag
  // touchstart, mousedown
  if (evt.target.tagName == 'polygon' && type.match(/r|w/)){
    html = active = evt.target.outerHTML;
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
      html = active.replace(getTranslate, function(translate) {
        return translate.replace(getPair, deltaX+','+deltaY)
      })
      // keep active
      i=1;
    }
    // Drop or Click
    // touchend, mouseup
    else if (type.match(/p|nd/) && deltaX) {
      i = 1;
      html = active.replace(getPoints, function(points) {
        return points.replace(getPair, function(_, pX, pY) {
          return +pX+deltaX+','+(+pY+deltaY)
        })
      })
      .replace(getTranslate, 'late(0,0)')
      // reset active
      i=0;
    }
    //
    // Click
    else {
      // first find just the points
      html = active.replace(getPoints, function(points) {
        // update each pair of points
        return points.replace(getPair, function(_, pX, pY) {
          nx = (.7 * (pX - x)) + (.7 * (pY - y)) + x,
          ny = (.7 * (pY - y)) - (.7 * (pX - x)) + y;
          return (0|(nx*100))/100 +','+ (0|(ny*100))/100
        });
      })
      // reset active
      i=0;
    }

    elm.innerHTML = elm.innerHTML.replace(active, html)
    // 0 = Drop/Click, 1 = Move
    active = i ? html : html = 0
  }
}

// Create a polygon for each tangram piece
var tangram = '0,0 0,100 50,50|0,100 100,100 50,50|100,100 100,50 75,75|100,50 100,0 50,0|50,50 75,25 100,50 75,75|50,50 75,25 25,25|0,0 50,0 75,25 25,25'
  .replace(/(\d+)/g, function(x) {
    return x*3
  })

// better on desktop
// elm.innerHTML = '<svg viewBox="0 0 '+ screen.availWidth +' '+ screen.availHeight +'">'
// better on iPhone
elm.innerHTML = html = '<svg viewBox="0 0 1000 800">'
+'<filter color-interpolation-filters="sRGB" id="a">'
  +'<feTurbulence type="turbulence" baseFrequency="0.1" numOctaves="2"/>'
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
