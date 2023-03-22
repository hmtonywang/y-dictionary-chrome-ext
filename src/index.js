import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const ROOT_ID = 'yd-lookup';
const BUTTON_ID = 'yd-lookup-btn';
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
  const text = selection.toString();
  if (!text || !text.trim()) {
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
    createRoot(text);
  }
  buttonClicked = false;
};

const GlobalStyle = createGlobalStyle`
  #${ROOT_ID} {
    position: fixed;
    width: 360px;
    max-height: 600px;
    top: 10px;
    right: 10px;
    z-index: 2147483647;
    border: solid 1px #991e91;
    box-shadow: 0 3px 5px 0 rgb(0, 0, 0, 0.5);
    background: #ffffff;
    overflow: hidden;
    box-sizing: border-box;
    color: #000;
    font-size: 14px;
  }
`;

const createRoot = (text) => {
  let rootElement = document.getElementById(ROOT_ID);
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = ROOT_ID;
    document.body.appendChild(rootElement);
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App
        text={text}
        onClose={() => removeRoot()}
      />
    </React.StrictMode>
  );
};

const removeRoot = (rootElement) => {
  const root = rootElement || document.getElementById(ROOT_ID);
  if (!root) {
    return;
  }
  document.body.removeChild(root);
};

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
window.chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg === 'open') {
    const selection = window.getSelection();
    const text = selection.toString();
    if (text && text.trim()) {
      createRoot(text);
    } else {
      const rootElement = document.getElementById(ROOT_ID);
      if (rootElement) {
        document.getElementById('search-text').focus();
      } else {
        createRoot();
      }
    }
    removeButton();
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
