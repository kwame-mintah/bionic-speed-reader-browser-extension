/**
 * Find all elements with the p tag and for each one,
 * get the inner text for that tag, to be used as the content
 * for the post request to get the text in Bionic Reading format.
 *
 */
async function convertPage() {
  let apiKey = await readLocalStorage("apiKey");
  let fixation = await readLocalStorage("fixation");
  let saccade = await readLocalStorage("saccade");

  let arrayText = document.getElementsByTagName("p");
  let response = requestBionic(apiKey, document.URL, fixation, saccade, true);
  let responseText = DOMParser()
    .parseFromString(response, "text/html")
    .getElementsByTagName("p");
  console.log(responseText);
  for (let i = 0; i < arrayText.length; i++) {
    arrayText[i].innerHTML = responseText[i].innerHTML;
  }
}

convertPage();
