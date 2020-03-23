const listTools = document.getElementById('list-tools');

document.addEventListener('keydown', (e) => addHotKeys(e));
listTools.addEventListener('click', (e) => changeTool(e));

function addHotKeys(event) {
  const listHotKeys = {
    KeyP: 'pencil',
    KeyB: 'fill',
    KeyC: 'choose',
    KeyL: 'line',
    KeyE: 'eraser',
  };
  const newTool = Array.from(listTools.children).find((el) => el.id === listHotKeys[event.code]);

  if (!newTool) {
    return;
  }

  const currentTool = listTools.querySelector('.selected');
  currentTool.classList.remove('selected');

  newTool.classList.add('selected');
}

function checkCurrentTool() {
  if (!listTools.querySelector('.selected')) {
    const currentTool = listTools.querySelector('.pencil');
    currentTool.classList.add('selected');
  }
}

function changeTool(event) {
  event.preventDefault();

  const currentTool = event.currentTarget.querySelector('.selected');
  currentTool.classList.remove('selected');

  const newCurrentTool = event.target.closest('li');
  newCurrentTool.classList.add('selected');
}

function getCurrentTool() {
  const currentTool = listTools.querySelector('.selected');
  return currentTool.id;
}

export {
  addHotKeys,
  checkCurrentTool,
  getCurrentTool,
};
