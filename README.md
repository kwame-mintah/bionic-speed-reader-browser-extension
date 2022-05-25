<h1><b>Bion</b>ic <b>Readi</b>ng <b>Chro</b>me <b>Extensi</b>on</h1>

A simple chrome extension using [Bionic Reading API](https://rapidapi.com/bionic-reading-bionic-reading-default/api/bionic-reading1/), provided by [RapidAPI](https://rapidapi.com/hub).

<p style="text-align:center"> 🚧  👷 Currently in the early stages of development 👷 🚧 </p>

## Prerequisites

1. Have a RapidAPI account,
2. Subscribed to Bionic Reading API.

## Installation Instructions

1. Navigate to the [releases page](https://github.com/kwame-mintah/bionic-reading-chrome-extension/releases) of the gitlab repository.
2. Find the release you wish to download, or download the most recent release version.
3. Expand the 'Assets' section and download the 'Source code (zip).
4. Unzip the file and you should have a folder named `bionic-reading-extension-v*`.
5. In Brave/Edge go to the following page (`brave://extensions/` / `edge://extensions`).
6. On the extension page, enable developer mode.
7. Click on "Load unpacked" locate the `bionic-reading-extensions-v*` folder and open it.

## Usage

1. On your browsers extension page, click 'Details' on Bionic Reading Chrome Extension.
2. Next click 'Extension options'.
3. Enter your RapidAPI Key that is subscribed to the Bionic Reading API.
4. You can change your fixation (default: 1) and saccade (default: 10).
5. If you want to preview your changes, click 'Save' first, then 'Preview' button.
6. Highlight text on a page and right click and select 'Bionic Reading convert text ...'
7. Alternately, not selecting any text, right click the page and select 'Bionic Reading convert page'

## FAQ

### Is it safe for me to enter my RapidAPI key?

This extension uses your browsers local storage meaning, the API key is stored locally on your machine and it is only used when making a request to RapidAPI. Removing the extension from your browser also means that this data is removed.

### How do I request an RapidAPI key for Bionic Reading API?

Documentation of using RapidAPI can be found [here](https://docs.rapidapi.com/docs/consumer-quick-start-guide).

## Web browser support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/brave/brave_48x48.png" alt="Brave" width="28px" />](https://brave.com)</br>Brave     | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" />](https://www.google.com/intl/en_us/chrome/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://www.microsoft.com/edge)</br>Edge           |
|-----------|--------|----------------|
| V1.38.119 | V101.0.4951.67 | V101.0.1210.53 |

## Improvements

- [ ] Add styling to extensions HTML pages,
- [ ] Use a pop-up for the API response, rather than opening in a new tab,
- [ ] Better error handling, e.g. inform the user if they have reached their request limit for the day.
- [ ] Tidy-up the code :sweat_smile:

## Disclaimer

Un-official chrome extension for Bionic Reading (BR®). All trademarks are the property of their respective owners.

For more information on Bionic Reading and how it works, please see: https://bionic-reading.com/about/
