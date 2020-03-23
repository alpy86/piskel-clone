import './assets';
import createAuth from './auth';
import {
  getCurrentSizeCanvas,
  getCity,
  getCanvasImages,
  getIndexCurrentFrame,
  setCurrentSizeCanvas,
  setListCanvasImages,
  setCity,
  setIndexCurrentFrame,
} from './canvas';
import { changeToSaveColor, getSelectColorValue } from './color-selection';
import step from './helpers-anim';
import openPagePiskel from './landing';
import { checkCurrentTool } from './tools';

const saveCurrentIndexFrame = 'currentIndexFrame';
const saveAllCanvasFrame = 'allCanvasFrame';
const saveSizeCanvas = 'sizeCanvas';
const saveCurrentCity = 'currentCity';
const saveColor = 'currentColor';
const changeFps = document.getElementById('anim-fps');
const labelAnim = document.getElementById('label-anim');
let fps = 1;
let timerId = setInterval(() => step(getCanvasImages()), 1000 / fps);

loadFromLocalStorage();
openPagePiskel(localStorage.getItem(saveCurrentIndexFrame));
checkCurrentTool();
createAuth();

changeFps.addEventListener('input', () => {
  clearInterval(timerId);
  fps = changeFps.value;
  labelAnim.textContent = `${fps} fps`;
  timerId = setInterval(() => step(getCanvasImages()), 1000 / fps);
});

function loadFromLocalStorage() {
  if (localStorage.getItem(saveSizeCanvas)) {
    setCurrentSizeCanvas(localStorage.getItem(saveSizeCanvas));
  }

  if (localStorage.getItem(saveAllCanvasFrame)) {
    setListCanvasImages(JSON.parse(localStorage.getItem(saveAllCanvasFrame)));
  }

  if (localStorage.getItem(saveCurrentCity)) {
    setCity(localStorage.getItem(saveCurrentCity));
  }

  if (localStorage.getItem(saveColor)) {
    changeToSaveColor(localStorage.getItem(saveColor));
  }

  if (localStorage.getItem(saveCurrentIndexFrame)) {
    setIndexCurrentFrame(localStorage.getItem(saveCurrentIndexFrame));
  }
}

window.onbeforeunload = () => {
  localStorage.setItem(saveAllCanvasFrame, JSON.stringify(getCanvasImages()));
  localStorage.setItem(saveColor, getSelectColorValue());
  localStorage.setItem(saveCurrentIndexFrame, getIndexCurrentFrame());
  localStorage.setItem(saveCurrentCity, getCity());
  localStorage.setItem(saveSizeCanvas, getCurrentSizeCanvas());
};
