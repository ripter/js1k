const b = document.body;

function createSVG(elm, polygons) {
  const div = document.createElement('div');
  const renderedPolygons = polygons.map((polygon) => {
    return `<polygon points="${polygon[0]}" style="${polygon[1]}" onMousedown="magic(event)" onMousemove="magic(event)" onMouseup="magic(event)" onMouseout="magic(event)"/>`;
  }).join('');

  div.innerHTML = `<svg viewBox="0 0 100 100">${renderedPolygons}</svg>`;
  elm.append(div);
  return div;
}

function createCSS(elm) {
  const style = document.createElement('style');
  style.innerHTML = `
  svg {
    height: 300px;
    width: 300px;
  }
  svg polygon {
    stroke: #001f3f;
  }
  `;
  elm.append(style);
  return style;
}

function createJS(elm) {
  const script = document.createElement('script');
  script.innerHTML = `
  window.magic = function magic(evt) {
    console.log(evt.x, evt.y);
  }`;
  elm.append(script);
  return script;
}

window.active = null;
window.magic = function magic(evt) {
  // console.log('magic', evt.type);

  switch (evt.type) {
    case 'mousedown':
      window.active = [evt.x, evt.y];
      console.log('active', active);
      break;
    case 'mousemove':
      if (!window.active) { return; }
      const deltaX = evt.x - active[0];
      const deltaY = evt.y - active[1];
      console.log(deltaX, deltaY, evt.type, evt);
      console.log('active', active);
      console.log('client', evt.clientX, evt.clientY);
      console.log('x,y', evt.x, evt.y);
      console.log('delta', deltaX, deltaY);
      evt.target.setAttribute('transform', `translate(${deltaX}, ${deltaY})`);
      break;
    case 'mouseup':
    case 'mouseout':
      window.active = null;
      console.log('active', active);
  }
};

let svg = createSVG(b, [
  ['40,50,60,50 60,100 40,100', 'fill: brown;'],
  ['25,25 75,25 75,75, 25,75', 'fill: #2ECC40;'],
  ['0,0 0,25 25,25, 25,0', 'fill: #2ECC40;'],
  ['25,25 25,50 50,50, 50,25', 'fill: #2ECC40;'],
]);
// createJS(svg);
createCSS(svg);
console.log(svg);
