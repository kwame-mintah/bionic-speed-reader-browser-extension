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
 */
function requestBionic(apiKey, content, fixation, saccade) {
  const encodedParams = new URLSearchParams();
  encodedParams.append("content", content);
  encodedParams.append("response_type", "html");
  encodedParams.append("request_type", "html");
  encodedParams.append("fixation", fixation);
  encodedParams.append("saccade", saccade);

  const options = {
    method: 'POST',
    url: 'https://bionic-reading1.p.rapidapi.com/convert',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Host': 'bionic-reading1.p.rapidapi.com',
      'X-RapidAPI-Key': apiKey
    },
    data: encodedParams
  };

  axios.request(options).then(function (response) {
    document.getElementById("bionic-response").innerHTML = response.data
  }).catch(function (error) {
    alert(error)
    console.error(error);
  });
}

/**
 * Get values from local storage and call `requestBionic` function,
 * need to wait for values to be returned, or else will be undefined.
 */
async function autoRequestBionic(){
  let apiKey = await readLocalStorage('apiKey');
  let fixation = await readLocalStorage('fixation');
  let saccade = await readLocalStorage('saccade');
  let content = await readLocalStorage('content');
  requestBionic(apiKey, content, fixation, saccade)
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
 * On page load, request for Bionic Reading.
 */
autoRequestBionic();
