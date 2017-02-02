const b = document.body;

function createSVG(elm, polygons) {
  const div = document.createElement('div');
  const renderedPolygons = polygons.map((polygon) => {
    return `<polygon points="${polygon[0]}" style="${polygon[1]}"/>`;
  }).join('');

  div.innerHTML = `<svg viewBox="0 0 100 100">${renderedPolygons}</svg>`;
  elm.append(div);
}

function createCSS(elm) {
  const style = document.createElement('style');
  style.innerHTML = `
  svg {
    height: 300px;
    width: 300px;
  }
  `;
  elm.append(style);
}

createCSS(b);
createSVG(b, [
  ['40,50,60,50 60,100 40,100', 'fill: brown;'],
  ['25,25 75,25 75,75, 25,75', 'fill: #2ECC40;']
]);
