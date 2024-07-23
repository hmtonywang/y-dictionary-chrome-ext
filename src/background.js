function createContextMenu() {
  /* eslint-disable-next-line no-undef */
  chrome.contextMenus.create({
    id: 'y-dictionary',
    title: 'Y Dictionary',
    contexts: ['all'],
  });
}

/* eslint-disable-next-line no-undef */
chrome.runtime.onInstalled.addListener((details) => {
  createContextMenu();
});

/* eslint-disable-next-line no-undef */
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

  /* eslint-disable-next-line no-undef */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'y-dictionary') {
    const { windowId } = tab;
    /* eslint-disable-next-line no-undef */
    chrome.sidePanel.open({ windowId });
  }
});

/* eslint-disable-next-line no-undef */
chrome.runtime.onMessage.addListener((msg, sender) => {
  const { from, action, words } = msg;
  if (from === 'y-dictionary-content-script' && action === 'look-words-up') {
    if (isSidePanelOpened) {
      /* eslint-disable-next-line no-undef */
      chrome.runtime.sendMessage({
        from: 'y-dictionary-service-worker',
        action: 'look-words-up',
        words,
      });
      return;
    }
    const { tab } = sender;
    const { windowId } = tab;
    /* eslint-disable-next-line no-undef */
    chrome.sidePanel.setOptions({ path: `index.html?words=${words}` });
    /* eslint-disable-next-line no-undef */
    chrome.sidePanel.open({ windowId });
  }
});

let isSidePanelOpened = false;

/* eslint-disable-next-line no-undef */
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'y-dictionary-side-panel') {
    isSidePanelOpened = true;
    port.onDisconnect.addListener(() => {
      isSidePanelOpened = false;
    });
  }
});