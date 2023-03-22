chrome.contextMenus.create({
  id: 'yd-lookup',
  title: 'yd-lookup',
  contexts: ['all'],
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, 'open');
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  chrome.tabs.sendMessage(tab.id, 'open');
});