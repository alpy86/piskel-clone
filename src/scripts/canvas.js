import { changeToSaveColor, getSelectColorValue } from './color-selection';
import {
  colorsMatch,
  convertToHex,
  hexToRgb,
} from './helpers';
/* eslint-disable */
import { getCoordBrezenheim, getTileWidth } from './helpers-draw';
/* eslint-enable */
import addFrameHTML from './template-frame';
import { addHotKeys, getCurrentTool } from './tools';

const clearColorCanvas = 'rgb(224, 224, 224)';
const fullSizeCanvas = 512;
const smallSizeCanvas = 100;

let brezenheim = [];
let currentFrameItem = 'none';
let currentSizeCanvas = '512';
let draw = false;
let indexFrame;
let listCanvasImages = [];
let newCity = 'Minsk';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageResizingText = document.getElementById('image-resizing-text');
const btnFrames = document.getElementById('btn-frames');
const listFrames = document.getElementById('list-frames');
const imageResizing = document.getElementById('image-resizing');
const selectCity = document.getElementById('select-location');

imageResizing.value = currentSizeCanvas;
selectCity.value = newCity;

selectCity.addEventListener('focus', () => {
  document.removeEventListener('keydown', addHotKeys);
});

selectCity.addEventListener('blur', () => {
  document.addEventListener('keydown', addHotKeys);
});

document.getElementById('clear-canvas').addEventListener('click', () => fillCanvas(clearColorCanvas));
document.getElementById('full-fill-canvas').addEventListener('click', () => fillCanvas(getSelectColorValue()));

imageResizing.addEventListener('input', () => {
  const saveCanvasCurrentImage = canvas.toDataURL();
  currentSizeCanvas = imageResizing.value;
  getCanvasSize(currentSizeCanvas);
  imageResizingText.textContent = `Image resizing ${currentSizeCanvas}px`;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = saveCanvasCurrentImage;
  img.onload = function drawImageOnCanvas() {
    let startX = 0;
    let startY = 0;
    let resultImageWidth = 0;
    let resultImageHeight = 0;

    if (this.naturalWidth >= this.naturalHeight) {
      resultImageHeight = (this.naturalHeight * canvas.width) / this.naturalWidth;
      startY = (canvas.height - resultImageHeight) / 2;
      resultImageWidth = canvas.width;
    }

    if (this.naturalHeight > this.naturalWidth) {
      resultImageWidth = (this.naturalWidth * canvas.height) / this.naturalHeight;
      startX = (canvas.width - resultImageWidth) / 2;
      resultImageHeight = canvas.height;
    }

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, startX, startY, resultImageWidth, resultImageHeight);

    currentStateCanvas();
  };
});

selectCity.addEventListener('input', () => {
  newCity = selectCity.value;
});

canvas.addEventListener('mousedown', (e) => {
  const currentTool = getCurrentTool();

  if (currentTool === 'pencil' || currentTool === 'eraser') {
    if (currentTool === 'pencil') {
      ctx.fillStyle = getSelectColorValue();
    }
    if (currentTool === 'eraser') {
      ctx.fillStyle = clearColorCanvas;
    }
    draw = true;
    ctx.beginPath();
    ctx.moveTo(getMouseX(e), getMouseY(e));
    ctx.fillRect(getMouseX(e), getMouseY(e), getTileWidth(), getTileWidth());
  }

  if (currentTool === 'line') {
    draw = true;
    ctx.beginPath();
    ctx.lineWidth = getTileWidth();
    ctx.strokeStyle = getSelectColorValue();
    ctx.moveTo(getMouseX(e), getMouseY(e));
  }
});

canvas.addEventListener('mousemove', (e) => {
  const currentTool = getCurrentTool();

  if ((currentTool === 'pencil' || currentTool === 'eraser') && draw === true) {
    brezenheim.push([e.clientX, e.clientY]);
    getCoordBrezenheim(brezenheim);
  }
});

canvas.addEventListener('mouseup', (e) => {
  const currentTool = getCurrentTool();

  if (currentTool === 'pencil' || currentTool === 'eraser') {
    brezenheim = [];
    ctx.closePath();
    draw = false;
  }

  if (currentTool === 'line') {
    ctx.lineTo(getMouseX(e), getMouseY(e));
    ctx.stroke();
    ctx.closePath();
    draw = false;
  }

  currentStateCanvas();
});

canvas.addEventListener('click', (e) => {
  const currentTool = getCurrentTool();

  if (currentTool === 'fill') {
    const rect = canvas.getBoundingClientRect();
    const mx = Math.floor((e.clientX - rect.left) / (fullSizeCanvas / currentSizeCanvas));
    const my = Math.floor((e.clientY - rect.top) / (fullSizeCanvas / currentSizeCanvas));
    const fillColor = hexToRgb(getSelectColorValue());
    const currentPixelColor = ctx.getImageData(mx, my, 1, 1);
    let steps = 0;

    for (let i = 0; i < fillColor.length; i += 1) {
      if (currentPixelColor.data[i] === fillColor[i]) {
        steps += 1;
        if (steps === 4) {
          return;
        }
      }
    }

    floodFill(mx, my, fillColor);
  }

  if (currentTool === 'choose') {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / (fullSizeCanvas / currentSizeCanvas);
    const my = (e.clientY - rect.top) / (fullSizeCanvas / currentSizeCanvas);
    const imgData = ctx.getImageData(mx, my, 1, 1);

    changeToSaveColor(convertToHex(imgData.data));
  }

  currentStateCanvas();
});

document.getElementById('load-img').addEventListener('click', async () => {
  const baseUrl = `https://api.unsplash.com/photos/random?query=town,${newCity}&client_id=`;
  const accessKey = '7ecf2c24d5d034741fef228be12d923381e2468cf13c79ee3b5236b81f3f5220';
  const url = baseUrl + accessKey;
  let data;

  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    throw new Error(e);
  }

  fillCanvas(clearColorCanvas);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = data.urls.small;
  img.onload = function drawImageOnCanvas() {
    let startX = 0;
    let startY = 0;
    let resultImageWidth = 0;
    let resultImageHeight = 0;

    if (this.naturalWidth >= this.naturalHeight) {
      resultImageHeight = (this.naturalHeight * canvas.width) / this.naturalWidth;
      startY = (canvas.height - resultImageHeight) / 2;
      resultImageWidth = canvas.width;
    }

    if (this.naturalHeight > this.naturalWidth) {
      resultImageWidth = (this.naturalWidth * canvas.height) / this.naturalHeight;
      startX = (canvas.width - resultImageWidth) / 2;
      resultImageHeight = canvas.height;
    }

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, startX, startY, resultImageWidth, resultImageHeight);

    currentStateCanvas();
  };
});

document.getElementById('bw-img').addEventListener('click', () => {
  const iDataSrc = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const iDataTrg = ctx.createImageData(canvas.width, canvas.height);
  const dataSrc = iDataSrc.data;
  const dataTrg = iDataTrg.data;
  const ratioRed = 0.2126;
  const ratioGreen = 0.7152;
  const ratioBlue = 0.0722;
  const img = new Image();
  let luma;

  for (let i = 0; i < dataSrc.length; i += 4) {
    luma = dataSrc[i] * ratioRed + dataSrc[i + 1] * ratioGreen + dataSrc[i + 2] * ratioBlue;
    dataTrg[i] = luma;
    dataTrg[i + 1] = luma;
    dataTrg[i + 2] = luma;
    dataTrg[i + 3] = dataSrc[i + 3];
  }

  img.crossOrigin = 'anonymous';
  ctx.putImageData(iDataTrg, 0, 0);
  img.src = canvas.toDataURL();
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  currentStateCanvas();
});

btnFrames.addEventListener('click', (e) => {
  e.preventDefault();

  currentFrameItem.classList.remove('active-frame');
  addFrameHTML(listFrames);
  currentFrameItem = listFrames.lastElementChild;
  currentFrameItem.classList.add('active-frame');

  ctx.fillStyle = clearColorCanvas;
  ctx.fillRect(0, 0, fullSizeCanvas, fullSizeCanvas);

  listCanvasImages.splice(listCanvasImages.length, 0, canvas.toDataURL());
});

listFrames.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.closest('button[class*=delete]')) {
    const indexItemFrame = Array.from(listFrames.children).findIndex((el) => el === e.target.closest('li'));
    e.target.closest('li').remove();
    listCanvasImages.splice(indexItemFrame, 1);
  } else if (e.target.closest('button[class*=clone]')) {
    currentFrameItem.classList.remove('active-frame');
    currentFrameItem = e.target.closest('li');
    currentFrameItem.classList.add('active-frame');

    const indexItemFrame = Array.from(listFrames.children).findIndex((el) => el.classList.contains('active-frame'));
    listFrames.insertBefore(e.target.closest('li').cloneNode(true), e.target.closest('li').nextElementSibling);

    const afterCurrentFrameItem = currentFrameItem.nextElementSibling;
    currentFrameItem.classList.remove('active-frame');

    const smallCtx = afterCurrentFrameItem.children[0].getContext('2d');

    const img = new Image();
    img.src = listCanvasImages[indexItemFrame];
    img.onload = () => {
      smallCtx.drawImage(img, 0, 0, smallSizeCanvas, smallSizeCanvas);
      ctx.drawImage(img, 0, 0);
      listCanvasImages.splice(indexItemFrame, 0, canvas.toDataURL());
    };

    currentFrameItem = afterCurrentFrameItem;
  } else {
    currentFrameItem.classList.remove('active-frame');
    currentFrameItem = e.target.closest('li');
    currentFrameItem.classList.add('active-frame');

    const indexItemFrame = Array.from(listFrames.children).findIndex((el) => el.classList.contains('active-frame'));

    if (listCanvasImages[indexItemFrame]) {
      const img = new Image();
      img.src = listCanvasImages[indexItemFrame];
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }
  }
});

export function setCurrentSizeCanvas(size) {
  currentSizeCanvas = size;
  getCanvasSize(currentSizeCanvas);
  imageResizing.value = currentSizeCanvas;
  imageResizingText.textContent = `Image resizing ${currentSizeCanvas}px`;
}

export function setListCanvasImages(images) {
  listCanvasImages = images;
}

export function setIndexCurrentFrame(index) {
  indexFrame = index;

  if (!listCanvasImages.length) {
    addFrameHTML(listFrames);
    currentFrameItem = listFrames.firstElementChild;
    currentFrameItem.classList.add('active-frame');

    ctx.fillStyle = clearColorCanvas;
    ctx.fillRect(0, 0, fullSizeCanvas, fullSizeCanvas);
  }

  for (let i = 0; i < listCanvasImages.length; i += 1) {
    addFrameHTML(listFrames);

    if (listFrames.children[i]) {
      const smallCtx = listFrames.children[i].children[0].getContext('2d');
      const img = new Image();
      img.src = listCanvasImages[i];
      img.onload = () => smallCtx.drawImage(img, 0, 0, smallSizeCanvas, smallSizeCanvas);
    }
  }

  if (indexFrame >= 0) {
    currentFrameItem = listFrames.children[indexFrame];
  } else {
    currentFrameItem = listFrames.firstElementChild;
  }

  currentFrameItem.classList.add('active-frame');

  let searchIndexFrame = 0;

  if (indexFrame > 0) {
    searchIndexFrame = indexFrame;
  }

  if (listCanvasImages[searchIndexFrame]) {
    const dataURL = listCanvasImages[searchIndexFrame];
    const img = new Image();

    img.src = dataURL;
    img.onload = () => ctx.drawImage(img, 0, 0);
  }
}

export function setCity(city) {
  newCity = city;
  selectCity.value = city;
}

export function getCurrentSizeCanvas() {
  return currentSizeCanvas;
}

export function getCanvasImages() {
  return listCanvasImages;
}

export function getIndexCurrentFrame() {
  const index = Array.from(listFrames.children).findIndex((el) => el.classList.contains('active-frame'));
  return index;
}

export function getCity() {
  return newCity;
}

export function drawMouseMove(currentX, currentY) {
  const mouse = {
    x: 0,
    y: 0,
  };
  const currentTileWidth = getTileWidth();
  const rect = canvas.getBoundingClientRect();
  const mx = (currentX - rect.left) / (fullSizeCanvas / currentSizeCanvas);
  const my = (currentY - rect.top) / (fullSizeCanvas / currentSizeCanvas);
  const xIndex = Math.floor(mx / currentTileWidth);
  const yIndex = Math.floor(my / currentTileWidth);
  mouse.x = xIndex * currentTileWidth;
  mouse.y = yIndex * currentTileWidth;
  ctx.lineTo(mouse.x, mouse.y);
  ctx.fillRect(mouse.x, mouse.y, currentTileWidth, currentTileWidth);
}

function getCanvasSize(size) {
  canvas.width = size;
  canvas.height = size;
}

function getMouseX(event) {
  const rect = canvas.getBoundingClientRect();
  const mx = (event.clientX - rect.left) / (fullSizeCanvas / currentSizeCanvas);
  const xIndex = Math.floor(mx / getTileWidth());
  return xIndex * getTileWidth();
}

function getMouseY(event) {
  const rect = canvas.getBoundingClientRect();
  const my = (event.clientY - rect.top) / (fullSizeCanvas / currentSizeCanvas);
  const yIndex = Math.floor(my / getTileWidth());
  return yIndex * getTileWidth();
}

function fillCanvas(color) {
  ctx.clearRect(0, 0, fullSizeCanvas, fullSizeCanvas);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, fullSizeCanvas, fullSizeCanvas);
  currentStateCanvas();
}

function floodFill(x, y, fillColor) {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const targetColor = getPixel(imageData, x, y);
  if (!colorsMatch(targetColor, fillColor)) {
    const pixelsToCheck = [x, y];
    while (pixelsToCheck.length > 0) {
      const yIndex = pixelsToCheck.pop();
      const xIndex = pixelsToCheck.pop();
      const currentColor = getPixel(imageData, xIndex, yIndex);
      if (colorsMatch(currentColor, targetColor)) {
        setPixel(imageData, xIndex, yIndex, fillColor);
        pixelsToCheck.push(xIndex + 1, yIndex);
        pixelsToCheck.push(xIndex - 1, yIndex);
        pixelsToCheck.push(xIndex, yIndex + 1);
        pixelsToCheck.push(xIndex, yIndex - 1);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
}

function getPixel(imageData, x, y) {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1];
  }
  const offset = (y * imageData.width + x) * 4;
  return imageData.data.slice(offset, offset + 4);
}

function setPixel(imageData, x, y, color) {
  const offset = (y * imageData.width + x) * 4;
  const dataCanvas = imageData;
  for (let i = 0; i < 3; i += 1) {
    dataCanvas.data[offset + i] = color[i];
  }
}

function currentStateCanvas() {
  const dataURL = canvas.toDataURL();
  const smallCtx = currentFrameItem.children[0].getContext('2d');

  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    smallCtx.drawImage(img, 0, 0, smallSizeCanvas, smallSizeCanvas);
  };

  const indexItemFrame = Array.from(listFrames.children).findIndex((el) => el.classList.contains('active-frame'));
  listCanvasImages[indexItemFrame] = dataURL;
}
