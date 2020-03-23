function rgbToHex(rgb) {
  let r = Number(rgb.match(/\d{1,3}/gi)[0]).toString(16);
  let g = Number(rgb.match(/\d{1,3}/gi)[1]).toString(16);
  let b = Number(rgb.match(/\d{1,3}/gi)[2]).toString(16);

  if (r.length === 1) {
    r = `0${r}`;
  }
  if (g.length === 1) {
    g = `0${g}`;
  }
  if (b.length === 1) {
    b = `0${b}`;
  }

  return `#${r}${g}${b}`;
}

function convertToHex(rgb) {
  let r = rgb[0].toString(16);
  let g = rgb[1].toString(16);
  let b = rgb[2].toString(16);

  if (r.length === 1) {
    r = `0${r}`;
  }
  if (g.length === 1) {
    g = `0${g}`;
  }
  if (b.length === 1) {
    b = `0${b}`;
  }

  return `#${r}${g}${b}`;
}

function hexToRgb(hex) {
  const rgbColor = [];

  if (hex.substring(0, 1) === '#') {
    const modifyHex = hex.substring(1);
    rgbColor.push(parseInt(modifyHex.substring(0, 2), 16));
    rgbColor.push(parseInt(modifyHex.substring(2, 4), 16));
    rgbColor.push(parseInt(modifyHex.substring(4), 16));
    rgbColor.push(255);
  }

  return rgbColor;
}

function colorsMatch(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

export {
  rgbToHex,
  convertToHex,
  hexToRgb,
  colorsMatch,
};
