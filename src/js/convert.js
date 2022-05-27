/**
 * Make a request to convert the entire page into Bionic Reading format
 * convert the response into a DOM tree and get all of the p tags
 * get all of the p tags on the page originally and
 * replace the innerHTML with the innerHTML of the corresponding response p tag
 */
async function convertPageWithWebpageUrl() {
  let apiKey = await readLocalStorage("apiKey");
  let fixation = await readLocalStorage("fixation");
  let saccade = await readLocalStorage("saccade");
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

  let arrayText = document.getElementsByTagName("p");
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
  let arrayText = document.getElementsByTagName("p");
  let apiKey = await readLocalStorage("apiKey");
  let fixation = await readLocalStorage("fixation");
  let saccade = await readLocalStorage("saccade");
  for (let i = 0; i < arrayText.length; i++) {
    let innerText = arrayText[i].innerText;
    let text = await requestBionic(apiKey, innerText, fixation, saccade, true);
    arrayText[i].innerHTML = text;
  }
}

async function checkFeaturesEnabled() {
  let convertWithUrl = await readLocalStorage("convertWithUrl");
  if (convertWithUrl == "enable") {
    convertPageWithWebpageUrl();
  } else if (convertWithUrl == "disable") {
    convertPageWithParagraphs();
  }
}

checkFeaturesEnabled();
