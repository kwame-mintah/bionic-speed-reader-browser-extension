/**
 * Make a request to convert the entire page into Bionic Reading format
 * convert the response into a DOM tree and get all of the p tags
 * get all of the p tags on the page originally and
 * replace the innerHTML with the innerHTML of the corresponding response p tag
 */
async function convertPageWithWebpageUrl() {
  const apiKey = await readLocalStorage("apiKey");
  const fixation = await readLocalStorage("fixation");
  const saccade = await readLocalStorage("saccade");
  const parser = new DOMParser();
  const response = await requestBionic(
    apiKey,
    document.URL,
    fixation,
    saccade,
    true
  );
  const responseText = parser
    .parseFromString(response, "text/html")
    .getElementsByTagName("p");

  const arrayText = document.getElementsByTagName("p");
  for (let i = 0; i < arrayText.length; i++) {
    arrayText[i].innerHTML = responseText[i].innerHTML;
  }
}

/**
 * Find all elements with the p tag and for each one,
 * get the inner text for that tag, to be used as the content
 * for the post request to get the text in Bionic Reading format.
 *
 * Note: requesting for each paragraph to be converted means more
 * API calls are made to RapidAPI and may result in the user reaching,
 * their daily API limit quicker.
 */
async function convertPageWithParagraphs() {
  const arrayText = document.getElementsByTagName("p");
  const apiKey = await readLocalStorage("apiKey");
  const fixation = await readLocalStorage("fixation");
  const saccade = await readLocalStorage("saccade");
  for (let i = 0; i < arrayText.length; i++) {
    const innerText = arrayText[i].innerText;
    const text = await requestBionic(apiKey, innerText, fixation, saccade, true);
    arrayText[i].innerHTML = text;
  }
}

async function checkFeaturesEnabled() {
  const convertWithUrl = await readLocalStorage("convertWithUrl");
  convertWithUrl == "enable"
    ? convertPageWithWebpageUrl()
    : convertPageWithParagraphs();
}

checkFeaturesEnabled();
