/* eslint-disable */
import { drawMouseMove } from './canvas';
/* eslint-enable */

function getCoordBrezenheim(arrForBrez) {
  for (let i = 0; i < arrForBrez.length - 1; i += 1) {
    drawLine(arrForBrez[i][0], arrForBrez[i][1], arrForBrez[i + 1][0], arrForBrez[i + 1][1]);
  }
}

function getTileWidth() {
  return document.querySelector('input[name=size-pencil]:checked').value;
}

function drawLine(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dx1 = Math.abs(dx);
  const dy1 = Math.abs(dy);
  let x;
  let y;
  let xe;
  let ye;
  let px = 2 * dy1 - dx1;
  let py = 2 * dx1 - dy1;

  if (dy1 <= dx1) {
    if (dx >= 0) {
      x = x1;
      y = y1;
      xe = x2;
    } else {
      x = x2;
      y = y2;
      xe = x1;
    }

    drawMouseMove(x, y);

    for (let i = 0; x < xe; i += 1) {
      x += 1;
      if (px < 0) {
        px += 2 * dy1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          y += 1;
        } else {
          y -= 1;
        }
        px += 2 * (dy1 - dx1);
      }

      drawMouseMove(x, y);
    }
  } else {
    if (dy >= 0) {
      x = x1;
      y = y1;
      ye = y2;
    } else {
      x = x2; y = y2; ye = y1;
    }

    drawMouseMove(x, y);

    for (let i = 0; y < ye; i += 1) {
      y += 1;
      if (py <= 0) {
        py += 2 * dx1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          x += 1;
        } else {
          x -= 1;
        }
        py += 2 * (dx1 - dy1);
      }

      drawMouseMove(x, y);
    }
  }
}

export {
  getTileWidth,
  getCoordBrezenheim,
};
