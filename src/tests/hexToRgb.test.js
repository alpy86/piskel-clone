const convertToRgb = require('./hexToRgb');

test('adds #ff00ff to equal [255, 0, 255, 255]', () => {
  expect(convertToRgb('#ff00ff')).toStrictEqual([255, 0, 255, 255]);
});

test('adds #182018 to equal [24, 32, 24, 255]', () => {
  expect(convertToRgb('#182018')).toStrictEqual([24, 32, 24, 255]);
});

test('adds #fff120 to equal [255, 241, 32, 255]', () => {
  expect(convertToRgb('#fff120')).toStrictEqual([255, 241, 32, 255]);
});
