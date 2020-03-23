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

module.exports = hexToRgb;
