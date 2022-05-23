/**
*
*/



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
