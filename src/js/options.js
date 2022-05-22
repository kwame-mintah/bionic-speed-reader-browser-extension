/**
 * Request Body parameters, used for requesting preview update.
 */
var fixation;
var saccade;
var apiKey;

/**
 * User input options
 */
var inputFixation;
var inputSaccade;
var inputApiKey = document.getElementById("apiKey");

/**
 * Listen for click event, to initiate saving of the users options.
 */
var btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", saveUserOptions);

/**
 * Listen for click event, to initiate POST request to update preview.
 */
var btnPreview = document.getElementById("preview");
btnPreview.addEventListener("click", previewChanges);

/**
 * Listen for click event, to clear local extension storage
 */
var btnClear = document.getElementById("clear");
btnClear.addEventListener("click", clearLocalStorage)

/**
 * Listen for events on Fixation options, if user clicks a button get the value,
 * of the button clicked.
 */
const fixationOptions = document.getElementById("fixationOption");
fixationOptions.addEventListener("click", (Event) => {
  const btnClicked = Event.target.nodeName === "BUTTON";
  if (!btnClicked) {
    return;
  }
  inputFixation = document.getElementById(Event.target.id).value;
  changeButtonColor(inputFixation);
});


/**
 * Listen for events on Saccade options, if user clicks a button get the value,
 * of the button clicked.
 */
const saccadeOptions = document.getElementById("saccadeOption");
saccadeOptions.addEventListener("click", (Event) => {
  const btnClicked = Event.target.nodeName === "BUTTON";
  if (!btnClicked) {
    return;
  }
  inputSaccade = document.getElementById(Event.target.id).value;
  changeButtonColor(inputSaccade);
});

/**
 * Get the value of each the local storage, e.g. KEY=VALUE.
 * If values are present, change the button color depending,
 * of the value passed. Additionally, fill input field for,
 * RapidAPI key if it is not empty or undefined.
 */
function displayCurrentOptions() {
  chrome.storage.local.get(["fixation"], function (result) {
    fixation = result.fixation;
    changeButtonColor(fixation);
  });
  chrome.storage.local.get(["saccade"], function (result) {
    saccade = result.saccade;
    changeButtonColor(saccade);
  });
  chrome.storage.local.get(["apiKey"], function (result) {
    apiKey = result.apiKey;
    if (apiKey != "" && apiKey != undefined){
      inputApiKey.value = apiKey
    }
  });
}

/**
 * Update the local storage values, with what the user has,
 * selected. And then get the updated values after saving.
 */
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

/**
 * Make a post request using the preview text as content,
 * response is shown on the page.
 */
function previewChanges() {
  var content = document.getElementById("previewText").innerHTML;
  requestBionic(apiKey, content, fixation, saccade)
}

/**
 * Clear extension local storage
 */
function clearLocalStorage(){
  chrome.storage.local.clear()
}

/**
 * Change the <button> color to green.
 * @param {String} btnId
 */
function changeButtonColor(btnId) {
  document.getElementById("btn" + btnId).style.background = '#07ff42';
}

/**
 * Initialize the page displaying users current options set
 */
displayCurrentOptions();
