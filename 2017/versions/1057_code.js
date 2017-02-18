var elm = document.createElement('div');
var html, active, startX, startY, deltaX, deltaY;
var getPoints = /s="[^"]+/;
var getPair = /([\d.-]+),([\d.-]+)/g
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
      html = active.replace(/la[^"]*/, function(translate) {
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
      .replace(/la[^"]*/, 'late(0,0)')
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
          // nx = (.7 * (pX - startX)) + (.7 * (pY - startY)) + startX,
          // ny = (.7 * (pY - startY)) - (.7 * (pX - startX)) + startY;
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

// better on desktop
// elm.innerHTML = '<svg viewBox="0 0 '+ screen.availWidth +' '+ screen.availHeight +'">'
// better on iPhone
elm.innerHTML = html = '<svg viewBox="0 0 1000 800">'
+'<filter id="a">'
  +'<feTurbulence type="turbulence" baseFrequency="0.1" numOctaves="2"/>'
  +'<feColorMatrix result="r" values="0" type="saturate"/>'
  +'<feBlend in="SourceGraphic" in2="r" mode="lighten" />'
  +'<feComposite in2="SourceAlpha" operator="in"/>'
+'</filter>'
//TODO: find a way to remove the | between <polygon />s
+'0,0 0,300 150,150|0,300 300,300 150,150|300,300 300,150 225,225|300,150 300,0 150,0|150,150 225,75 300,150 225,225|150,150 225,75 75,75|0,0 150,0 225,75 75,75'
  .replace(/([^|]+)/g, function(polygon) {
    return '<polygon points="'+polygon+'" transform="rotate(0) translate(0,0)" style="fill:#111;filter:url(#a)"'+'/>';
  })
+'</svg>';
b.prepend(elm);
// listen to events on the svg
'mousedown mousemove mouseup touchstart touchend touchmove'.replace(/\w+/g, function(eventName) {
  elm.addEventListener(eventName, magic);
});
