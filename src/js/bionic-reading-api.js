/**
 * Send a post request to RapidAPI convert endpoint:
 * https://bionic-reading1.p.rapidapi.com/convert
 *
 * Required parameters are content, response_type, request_type,
 * fixation and saccade.
 *
 * @param {String} apiKey
 * @param {String} content
 * @param {String} fixation
 * @param {String} saccade
 * @param {Boolean} isWebpageConvert
 */
async function requestBionic(apiKey, content, fixation, saccade, isWebpageConvert) {
  const encodedParams = new URLSearchParams();
  encodedParams.append("content", content);
  encodedParams.append("response_type", "html");
  encodedParams.append("request_type", "html");
  encodedParams.append("fixation", fixation);
  encodedParams.append("saccade", saccade);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Host": "bionic-reading1.p.rapidapi.com",
      "X-RapidAPI-Key": apiKey,
    },
    body: encodedParams,
  };

  if (isWebpageConvert == false) {
    fetch("https://bionic-reading1.p.rapidapi.com/convert", options)
      .then((response) => response.text())
      .then((response) => {
        document.getElementById("bionic-response").innerHTML = response;
      })
      .catch((err) => alert(err));
  } else if (isWebpageConvert == true) {
    return fetch("https://bionic-reading1.p.rapidapi.com/convert", options)
      .then((response) => response.text())
      .then((response) => response)
      .catch((err) => alert(err));
  }
}

/**
 * Get values from local storage and call `requestBionic` function,
 * need to wait for values to be returned, or else will be undefined.
 */
async function autoRequestBionic() {
  const apiKey = await readLocalStorage("apiKey");
  const fixation = await readLocalStorage("fixation");
  const saccade = await readLocalStorage("saccade");
  const content = await readLocalStorage("content");
  requestBionic(apiKey, content, fixation, saccade, false);
}

/**
 * Get value from chrome local storage, needs to be async
 * as values are not immediately returned back.
 * @param {*} key
 * @returns
 */
const readLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject();
      } else {
        resolve(result[key]);
      }
    });
  });
};

/**
 * On page load, request for Bionic Reading of content stored.
 */
if (document.title == "Converted Bionic Text") {
  autoRequestBionic();
}
