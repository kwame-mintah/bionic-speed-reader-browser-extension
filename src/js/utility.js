/**
 * Request Body parameters, used for requesting preview update.
 */
let fixation;
let saccade;
let apiKey;
const highClassName = "btn-select";

/**
 * User input options
 */
let inputFixation;
let inputSaccade;
const inputApiKey = document.getElementById("apiKey");

/**
 * sets the colour of the button by the id of the button
 * @param {String} value
 * @param {String} colour
 */
function setBtnColourById(value) {
  document.getElementById("btn" + value).className = highClassName;
}

/**
 * Update the local storage values, with what the user has,
 * selected. And then get the updated values after saving.
 */
/* eslint-disable */
function saveDataOptions(e) {
  e.target.innerText = "Saved";
  e.target.className = "btn-saved";
  e.target.disabled = true;

  if (inputFixation != undefined) {
    chrome.storage.local.set({ fixation: inputFixation });
  }
  if (inputSaccade != undefined) {
    chrome.storage.local.set({ saccade: inputSaccade });
  }
  if (inputApiKey != undefined && inputApiKey.value !== "undefined") {
    chrome.storage.local.set({ apiKey: inputApiKey.value });
  }
}

const resetSave = () => {
  btnSubmit.className = "btn-save";
  btnSubmit.innerText = "Save";
  btnSubmit.disabled = false;
};

/* eslint-disable */

/**
 * Get the value of each the local storage, e.g. KEY=VALUE.
 * If values are present, change the button color depending,
 * of the value passed. Additionally, fill input field for,
 * RapidAPI key if it is not empty or undefined.
 */
/* eslint-disable */
async function displayCurrentOptions() {
  fixation = await readLocalStorage("fixation");
  saccade = await readLocalStorage("saccade");
  setBtnColourById(fixation);
  setBtnColourById(saccade);
  chrome.storage.local.get(["apiKey"], function (result) {
    apiKey = result.apiKey;
    if (apiKey != "" && apiKey != undefined) {
      inputApiKey.value = apiKey;
    }
  });
}

/**
 * Listen for events on Fixation options, if user clicks a button get the value,
 * of the button clicked.
 */
const fixationOptions = document.getElementById("fixationOption");
fixationOptions.addEventListener("click", e => {
  const btnClicked = e.target.nodeName === "BUTTON";
  if (!btnClicked) {
    return;
  }
  inputFixation = document.getElementById(e.target.id).value;
  changeButtonColor(e);
  resetSave();
});

/**
 * Listen for events on Saccade options, if user clicks a button get the value,
 * of the button clicked.
 */
const saccadeOptions = document.getElementById("saccadeOption");
saccadeOptions.addEventListener("click", e => {
  const btnClicked = e.target.nodeName === "BUTTON";
  if (!btnClicked) {
    return;
  }
  inputSaccade = document.getElementById(e.target.id).value;
  changeButtonColor(e);
  resetSave();
});

/**
 * Change the <button> color to green on select.
 * @param {String} btnId
 */
function changeButtonColor(btnId) {
  const btnParent = btnId.target.parentElement.parentElement;

  if (btnParent.id === "fixationOption") {
    document.querySelectorAll("#fixationOption button").forEach(b => {
      b.className = "";
    });
    btnId.target.className = highClassName;
  }

  if (btnParent.id === "saccadeOption") {
    document.querySelectorAll("#saccadeOption button").forEach(b => {
      b.className = "";
    });
    btnId.target.className = highClassName;
  }
}
