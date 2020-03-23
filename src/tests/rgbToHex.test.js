const convertToHex = require('./rgbToHex');

test('adds [255, 0, 255] to equal #ff00ff', () => {
  expect(convertToHex([255, 0, 255])).toBe('#ff00ff');
});

test('adds [24, 32, 24] to equal #182018', () => {
  expect(convertToHex([24, 32, 24])).toBe('#182018');
});

test('adds [255, 241, 32] to equal #fff120', () => {
  expect(convertToHex([255, 241, 32])).toBe('#fff120');
});
