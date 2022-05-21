chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ fixation: "1" });
  chrome.storage.local.set({ saccade: "10" });

  var contextMenuItem = {
    id: "Bionic Reading",
    title: "Convert text to Bionic Reading",
    contexts: ["selection"],
  };

  chrome.contextMenus.create(contextMenuItem);

  chrome.contextMenus.onClicked.addListener(function (info) {
    var selectedText = info.selectionText;
    chrome.tabs.create({
      url: '../src/html/response.html',
    });
  });
});
