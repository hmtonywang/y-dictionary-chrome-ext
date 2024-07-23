const BUTTON_ID = 'y-dictionary-icon-btn';
const ICON_URL = window.chrome.runtime.getURL('logo48.png');
let buttonClicked = false;

const createButton = (position) => {
  const { x, y } = position;
  let element = document.getElementById(BUTTON_ID);
  if (element) {
    element.remove();
  }
  element = document.createElement('button');
  element.setAttribute('id', BUTTON_ID);
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  element.style.backgroundImage = `url(${ICON_URL})`;
  element.style.backgroundSize = '19px';
  element.style.backgroundRepeat = 'no-repeat';
  element.style.backgroundColor = '#991e91';
  element.style.backgroundPosition = 'center';
  element.style.position = 'absolute';
  element.style.width = '27px';
  element.style.height = '27px';
  element.style.zIndex = 2147483647;
  element.style.border = '1px solid #991e91';
  element.style.borderRadius = '5px';
  element.style.cursor = 'pointer';
  document.body.appendChild(element);
};

const removeButton = () => {
  const element = document.getElementById(BUTTON_ID);
  if (!element) {
    return;
  }
  document.body.removeChild(element);
};

const getSelectionPosition = (selection) => {
  const scrollTop = window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const { left, top } = rect;
  const x = left;
  const y = top + scrollTop - 27;
  return { x, y };
};

const onMouseDown = (event) => {
  const element = event.target;
  if (!element) {
    return;
  }
  if (element.id !== BUTTON_ID) {
    removeButton();
    return;
  }
  buttonClicked = true;
};

const onMouseUp = (event) => {
  if (!window && !window.getSelection) {
    return;
  }
  const selection = window.getSelection();
  const selectedText = selection.toString();
  if (!selectedText || !selectedText.trim()) {
    removeButton();
    return;
  }
  if (!buttonClicked) {
    const position = getSelectionPosition(selection);
    createButton(position);
    return;
  }
  const element = event.target;
  if (element && element.id === BUTTON_ID) {
    removeButton();
    lookWordsUp(selectedText);
  }
  buttonClicked = false;
};

function lookWordsUp(words) {
  window.chrome.runtime.sendMessage({
    from: 'y-dictionary-content-script',
    action: 'look-words-up',
    words,
  });
}

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);