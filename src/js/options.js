// Request Body parameters, used for requesting preview update.
var fixation;
var saccade;
var apiKey;

// User input options
var inputFixation;
var inputSaccade;
var inputApiKey = document.getElementById("apiKey");

// Listen for click event, to initiate saving of the users options.
var btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", saveUserOptions);

// Listen for click event, to initiate POST request to update preview.
var btnPreview = document.getElementById("preview");
btnPreview.addEventListener("click", previewChanges);

// Listen for click event, to clear local extension storage
var btnClear = document.getElementById("clear");
btnClear.addEventListener("click", clearLocalStorage)

// Get the elements by Id, to be used later when saving to local storage.

// Listen for events on Fixation options, if user clicks a button get the value,
// of the button clicked.
const fixationOptions = document.getElementById("fixationOption");
fixationOptions.addEventListener("click", (Event) => {
  const btnClicked = Event.target.nodeName === "BUTTON";
  if (!btnClicked) {
    return;
  }
  inputFixation = document.getElementById(Event.target.id).value;
});

// Listen for events on Saccade options, if user clicks a button get the value,
// of the button clicked.
const saccadeOptions = document.getElementById("saccadeOption");
saccadeOptions.addEventListener("click", (Event) => {
  const btnClicked = Event.target.nodeName === "BUTTON";
  if (!btnClicked) {
    return;
  }
  inputSaccade = document.getElementById(Event.target.id).value;
});

function displayCurrentOptions() {
  chrome.storage.local.get(["fixation"], function (result) {
    fixation = result.fixation;
  });
  chrome.storage.local.get(["saccade"], function (result) {
    saccade = result.saccade;
  });
  chrome.storage.local.get(["apiKey"], function (result) {
    apiKey = result.apiKey;
    if (apiKey != "" && apiKey != undefined){
      inputApiKey.value = apiKey
    }
  });
}

function saveUserOptions() {
  if (inputFixation != undefined) {
    chrome.storage.local.set({ fixation: inputFixation });
  }
  if (inputSaccade != undefined) {
    chrome.storage.local.set({ saccade: inputSaccade });
  }
  if (inputApiKey != undefined && inputApiKey.value !== "undefined"){
    chrome.storage.local.set({ apiKey: inputApiKey.value });
  }
  displayCurrentOptions();
}

function previewChanges() {
  var content = document.getElementById("previewText").innerHTML;
  requestBionic(apiKey, content, fixation, saccade)
}

function clearLocalStorage(){
  chrome.storage.local.clear()
}

// Initialize the page displaying the current user options
displayCurrentOptions();
