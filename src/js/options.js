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
* sets the colour of the button by the id of the button
* @param {String} value
* @param {String} colour
*/
function setBtnColourById(value,colour){
    document.getElementById('btn'+value).style.background = colour
}




/**
 * Make a post request using the preview text as content,
 * response is shown on the page.
 */
function previewChanges() {
  const content = document.getElementById('previewText').innerHTML;
  requestBionic(apiKey, content, fixation, saccade);
}

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

/**
 * Initialize the page displaying users current options set
 */
displayCurrentOptions();
