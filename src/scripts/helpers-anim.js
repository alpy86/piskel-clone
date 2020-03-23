const animSizeCanvas = 200;
const canvasAnim = document.getElementById('anim-canvas');
let count = 0;

canvasAnim.addEventListener('click', fullScreen);

export default function step(canvasImages) {
  const animCtx = document.getElementById('anim-canvas').getContext('2d');
  const img = new Image();

  animCtx.clearRect(0, 0, animSizeCanvas, animSizeCanvas);

  if (count >= canvasImages.length) {
    count = 0;
  }
  if (canvasImages[count]) {
    img.src = canvasImages[count];
    img.onload = () => {
      animCtx.drawImage(img, 0, 0, animSizeCanvas, animSizeCanvas);
    };

    count += 1;
  }
}

function fullScreen() {
  if ('fullscreenEnabled' in document || 'webkitFullscreenEnabled' in document) {
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
      const element = document.getElementById('anim-canvas');
      if ('requestFullscreen' in element) {
        element.requestFullscreen();
      } else if ('webkitRequestFullscreen' in element) {
        element.webkitRequestFullscreen();
      }
    }
  }
}
