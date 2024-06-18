const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function launchHeadlessChrome() {
  const options = new chrome.Options();
  options.addArguments(); // Enable headless mode
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  // Your test logic using the driver here...

//   await driver.quit();
}

launchHeadlessChrome();
