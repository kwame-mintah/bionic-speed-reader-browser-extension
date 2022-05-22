/**
 * Set fixation and saccade values locally in the users storage after extension,
 * has been installed.
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ fixation: "1" });
  chrome.storage.local.set({ saccade: "10" });
});

/**
 * Create context menu for the extension, multiple contexts are,
 * collapsed into a single menu.
 */
let contextMenuConvertSelection = {
  id: "1",
  title: "Bionic Reading convert text '%s'",
  contexts: ["selection"],
};

chrome.contextMenus.create(contextMenuConvertSelection);

chrome.contextMenus.onClicked.addListener(async function (info) {
  var selectedText = info.selectionText;
  chrome.storage.local.set({ content: selectedText });
  let tab = await chrome.tabs.create({
    url: '../src/html/response.html',
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['src/js/bionic-reading-api.js'],
  });
});
