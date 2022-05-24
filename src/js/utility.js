/**
 * Request Body parameters, used for requesting preview update.
 */
let fixation;
let saccade;
let apiKey;
let fontSize;
let colour ='#07ff42'

/**
 * User input options
 */
let inputFixation;
let inputSaccade;
const inputApiKey = document.getElementById('apiKey');

/**
* sets the colour of the button by the id of the button
* @param {String} value
* @param {String} colour
*/
function setBtnColourById(value,colour){
    document.getElementById('btn'+value).style.background = colour
}

/**
 * Update the local storage values, with what the user has,
 * selected. And then get the updated values after saving.
 */
function saveDataOptions() {
  if (inputFixation != undefined) {
    chrome.storage.local.set({ fixation: inputFixation });
  }
  if (inputSaccade != undefined) {
    chrome.storage.local.set({ saccade: inputSaccade });
  }
  if (inputApiKey != undefined && inputApiKey.value !== 'undefined') {
    chrome.storage.local.set({ apiKey: inputApiKey.value });
  }
}

/**
 * Get the value of each the local storage, e.g. KEY=VALUE.
 * If values are present, change the button color depending,
 * of the value passed. Additionally, fill input field for,
 * RapidAPI key if it is not empty or undefined.
 */
async function displayCurrentOptions() {
  fixation = await readLocalStorage('fixation');
  saccade = await readLocalStorage('saccade');
  setBtnColourById(fixation,colour)
  setBtnColourById(saccade,colour)
  chrome.storage.local.get(['apiKey'], function (result) {
    apiKey = result.apiKey;
    if (apiKey != '' && apiKey != undefined) {
      inputApiKey.value = apiKey;
    }
  });
}
/**
 * Listen for events on Fixation options, if user clicks a button get the value,
 * of the button clicked.
 */
const fixationOptions = document.getElementById('fixationOption');
fixationOptions.addEventListener('click', e => {
  const btnClicked = e.target.nodeName === 'BUTTON';
  if (!btnClicked) {
    return;
  }
  inputFixation = document.getElementById(e.target.id).value;
  changeButtonColor(e);
});

/**
 * Listen for events on Saccade options, if user clicks a button get the value,
 * of the button clicked.
 */
const saccadeOptions = document.getElementById('saccadeOption');
saccadeOptions.addEventListener('click', e => {
  const btnClicked = e.target.nodeName === 'BUTTON';
  if (!btnClicked) {
    return;
  }
  inputSaccade = document.getElementById(e.target.id).value;
  changeButtonColor(e);
});

/**
 * Change the <button> color to green on select.
 * @param {String} btnId
 */
function changeButtonColor(btnId) {
  const btnParent = btnId.target.parentElement.parentElement;

  if (btnParent.id === 'fixationOption') {
    document.querySelectorAll('#fixationOption button').forEach(b => {
      b.style.background = '';
    });
    btnId.target.style.background = colour;
  }

  if (btnParent.id === 'saccadeOption') {
    document.querySelectorAll('#saccadeOption button').forEach(b => {
      b.style.background = '';
    });
    btnId.target.style.background = colour;
  }
}
