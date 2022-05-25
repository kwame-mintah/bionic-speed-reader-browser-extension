/**
 * Make a request to convert the entire page into Bionic Reading format
 * convert the response into a DOM tree and get all of the p tags
 * get all of the p tags on the page originally and 
 * replace the innerHTML with the innerHTML of the corresponding response p tag
 */
async function convertPage() {
  let apiKey = await readLocalStorage('apiKey');
  let fixation = await readLocalStorage('fixation');
  let saccade = await readLocalStorage('saccade');

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

convertPage();
