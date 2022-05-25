/**
 * Experimental Feature check boxes
 */
let disabledF1Check = document.getElementById("enableFeature1D");
let enableF1Check = document.getElementById("enableFeature1E");

/**
 * Listen for click event, to initiate saving of the users options.
 */
const btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", saveDataOptions);

/**
 * Listen for click event, to initiate POST request to update preview.
 */
const btnPreview = document.getElementById("preview");
btnPreview.addEventListener("click", previewChanges);

/**
 * Toggle feature for using webpage url as the content for,
 * convert.
 */
const checkBoxF1 = document.getElementById("toggleWebsiteConvert");
checkBoxF1.addEventListener("click", (Event) => {
  const toggleF1 = Event.target.value;
  toggleFeature1(toggleF1);
});

/**
 * Clear all extension local storage.
 */
const btnClear = document.getElementById("clear");
btnClear.addEventListener("click", () => chrome.storage.local.clear());

/**
 * Make a post request using the preview text as content,
 * response is shown on the page.
 */
function previewChanges() {
  const content = document.getElementById("previewText").innerHTML;
  requestBionic(apiKey, content, fixation, saccade);
}

/**
 * Set local storage if experimental feature is enabled or
 * disabled and change the checkbox from true/false.
 * @param {String} value
 */
function toggleFeature1(value) {
  chrome.storage.local.set({ convertWithUrl: value });
  if (value == "disable") {
    enableF1Check.checked = false;
  } else if (value == "enable") {
    disabledF1Check.checked = false;
  }
}

/**
 * Check which features user has enabled/disabled
 * and check the corresponding checkbox.
 */
async function displayExperimentalFeaturesEnabled() {
  let convertWithUrl = await readLocalStorage("convertWithUrl");
  if (convertWithUrl == "enable") {
    enableF1Check.checked = true;
  } else {
    disabledF1Check.checked = true;
  }
}

/**
 * Initialize the page displaying users current options set.
 */
displayCurrentOptions();

/**
 * Check which experimental features the user has enabled.
 */
displayExperimentalFeaturesEnabled();
