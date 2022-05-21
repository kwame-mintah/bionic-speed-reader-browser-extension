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
    console.error(error);
  });
}
