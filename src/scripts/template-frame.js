export default function addFrameHTML(listFrames) {
  return listFrames.insertAdjacentHTML('beforeend',
    `<li class="list-frames-item">
    <canvas class="small-canvas" width="100" height="100"></canvas>
    <button class="btn-frame delete-frame" id="btn-delete-frame">
      <i class="fas fa-trash"></i>
    </button>
    <button class="btn-frame clone-frame" id="btn-clone-frame">
      <i class="fas fa-clone"></i>
    </button>
  </li>`);
}
