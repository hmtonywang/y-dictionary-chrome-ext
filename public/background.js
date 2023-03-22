chrome.contextMenus.create({
  id: 'y-dictionary',
  title: 'Y Dictionary',
  contexts: ['all'],
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, 'open');
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  chrome.tabs.sendMessage(tab.id, 'open');
});