import { MessageReceiver, OpenPageMessage } from './modules/chrome_runtime_message';

function run(chrome) {
  const manifest = chrome.runtime.getManifest();
  const APP_ID = manifest.id;
  const APP_TITLE = manifest.name;

  function createContextMenu() {
    chrome.contextMenus.create({
      id: APP_ID,
      title: APP_TITLE,
      contexts: ['all'],
    });
  }

  chrome.runtime.onInstalled.addListener((details) => {
    createContextMenu();
  });

  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

  function onContextMenusClicked (info, tab) {
    if (info.menuItemId === APP_ID) {
      const { windowId } = tab;
      chrome.sidePanel.open({ windowId });
    }
  }

  chrome.contextMenus.onClicked.addListener(onContextMenusClicked);

  function openPage(message, sender) {
    const { tab } = sender;
    if (!tab) {
      return;
    }
    const { windowId } = tab;
    chrome.sidePanel.open({ windowId });
  }

  const receiver = new MessageReceiver(chrome);
  receiver
    .listen(OpenPageMessage, openPage)
    .start();
}

/* eslint-disable-next-line no-undef */
run(chrome);