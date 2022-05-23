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
chrome.contextMenus.create({
  id: "1",
  title: "Bionic Reading convert text '%s'",
  contexts: ["selection"],
});

chrome.contextMenus.create({
  id: "2",
  title: "Bionic Reading convert page",
  contexts: ["page"],
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info) {
    if (info.menuItemId == "1") {
      var selectedText = info.selectionText;
      chrome.storage.local.set({ content: selectedText });
      let tab = await chrome.tabs.create({
        url: "../src/html/response.html",
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["src/js/bionic-reading-api.js"],
      });
    }
    if (info.menuItemId == "2") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["src/js/bionic-reading-api.js"],
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["src/js/convert.js"],
      });
    }
  }
});
