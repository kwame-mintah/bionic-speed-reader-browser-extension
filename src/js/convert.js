/**
 * Find all elements with the p tag and for each one,
 * get the inner text for that tag, to be used as the content
 * for the post request to get the text in Bionic Reading format.
 *
 */
async function convertPage() {
  let apiKey = await readLocalStorage('apiKey');
  let fixation = await readLocalStorage('fixation');
  let saccade = await readLocalStorage('saccade');

  let arrayText = document.getElementsByTagName("p");
  for (let i = 0; i < arrayText.length; i++) {
    let innerText = arrayText[i].innerText;
    let text = await requestBionic(apiKey, innerText, fixation, saccade, true)
    arrayText[i].innerHTML = text;
  }
};

convertPage();
