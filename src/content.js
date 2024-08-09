import {
  MessageSender,
  OpenPageMessage,
  PageReadyMessage,
  LookWordsUpMessage
} from './modules/chrome_runtime_message';

function run (chrome) {
  const messageSender = new MessageSender(chrome);
  const manifest = chrome.runtime.getManifest();
  const APP_ID = manifest.id;
  const ICON_BUTTON_ID = `${APP_ID}-icon-btn`;
  const ICON_IMAGE_URL = chrome.runtime.getURL('logo48.png');
  let isIconButtonClicked = false;

  function createIconButton (position) {
    const { x, y } = position;
    let element = document.getElementById(ICON_BUTTON_ID);
    if (element) {
      element.remove();
    }
    element = document.createElement('button');
    element.setAttribute('id', ICON_BUTTON_ID);
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.backgroundImage = `url(${ICON_IMAGE_URL})`;
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

  function removeIconButton () {
    const element = document.getElementById(ICON_BUTTON_ID);
    if (!element) {
      return;
    }
    document.body.removeChild(element);
  };

  function getSelectionPosition (selection) {
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

  function onMouseDown (event) {
    const element = event.target;
    if (!element) {
      return;
    }
    if (element.id !== ICON_BUTTON_ID) {
      removeIconButton();
      return;
    }
    isIconButtonClicked = true;
  };

  async function onMouseUp (event) {
    if (!window && !window.getSelection) {
      return;
    }
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (!selectedText || !selectedText.trim()) {
      removeIconButton();
      return;
    }
    if (!isIconButtonClicked) {
      const position = getSelectionPosition(selection);
      createIconButton(position);
      return;
    }
    const element = event.target;
    if (element && element.id === ICON_BUTTON_ID) {
      removeIconButton();
      await makePageReady();
      await lookWordsUp(selectedText);
    }
    isIconButtonClicked = false;
  };

  async function makePageReady () {
    const isReady = await isPageReady();
    if (!isReady) {
      await openPage();
      await makePageReady();
    }
  }

  async function isPageReady () {
    const message = new PageReadyMessage({ app: APP_ID });
    try {
      await messageSender.send(message);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function openPage () {
    const message = new OpenPageMessage({ app: APP_ID });
    try {
      await messageSender.send(message);
    } catch (error) {
      console.error('Something wrong while opening the page', error);
      throw error;
    }
  }

  async function lookWordsUp (words) {
    const message = new LookWordsUpMessage({ app: APP_ID, payload: words });
    try {
      await messageSender.send(message);
    } catch (error) {
      console.error('Something wrong while opening the page', error);
      throw error;
    }
  }

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
}

run(window.chrome);