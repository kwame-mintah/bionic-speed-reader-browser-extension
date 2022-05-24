

/**
 * Listen for click event, to initiate saving of the users options.
 */
const btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('click', saveDataOptions);

/**
 * Listen for click event, to initiate POST request to update preview.
 */
const btnPreview = document.getElementById('preview');
btnPreview.addEventListener('click', previewChanges);

/**
 * Listen for click event, to clear local extension storage
 */
/**
 * Clear extension local storage
 */
const btnClear = document.getElementById('clear');
btnClear.addEventListener('click', () => chrome.storage.local.clear());

/**
 * Make a post request using the preview text as content,
 * response is shown on the page.
 */
function previewChanges() {
  const content = document.getElementById('previewText').innerHTML;
  requestBionic(apiKey, content, fixation, saccade);
}

/**
 * Initialize the page displaying users current options set
 */
displayCurrentOptions();
