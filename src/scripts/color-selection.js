import { rgbToHex } from './helpers';

const defaultColor = '#008000';
const selectColor = document.getElementById('select-color-canvas');
const prevColor = document.getElementById('color-prev');
const redColor = document.getElementById('color-red');
const blueColor = document.getElementById('color-blue');

prevColor.style.backgroundColor = defaultColor;
selectColor.style.backgroundColor = defaultColor;
selectColor.onchange = changeColor;

prevColor.addEventListener('click', () => {
  selectColor.value = rgbToHex(prevColor.style.backgroundColor);
  selectColor.style.backgroundColor = prevColor.style.backgroundColor;
});

redColor.addEventListener('click', () => {
  selectColor.value = '#ff0000';
  changeColor();
});

blueColor.addEventListener('click', () => {
  selectColor.value = '#0000ff';
  changeColor();
});

function changeToSaveColor(color) {
  prevColor.style.backgroundColor = selectColor.style.backgroundColor;
  selectColor.value = color;
  selectColor.style.backgroundColor = color;
}

function getSelectColorValue() {
  return selectColor.value;
}

function changeColor() {
  prevColor.style.backgroundColor = selectColor.style.backgroundColor;
  selectColor.style.backgroundColor = selectColor.value;
}

export {
  changeToSaveColor,
  getSelectColorValue,
};
