const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function userSignupLoginFlow() {
  const driver = await new Builder().forBrowser('chrome').build();
  driver.manage().window().maximize();

  try {

    await driver.get('https://letcode.in/test'); // Might need adjustment based on site structure

    // Click on Edit link (replace with actual selector)
    await driver.wait(until.elementLocated(By.xpath("//a[text()='Edit']")), 10000).click();

    // Enter full name
    await driver.findElement(By.id('fullName')).sendKeys('Dinesh Kolati');

    // Clear join field and enter new value
    await driver.findElement(By.xpath("//input[@id='join']")).clear();
    await driver.findElement(By.xpath("//input[@id='join']")).sendKeys('Done');

    // Enter text in getMe field
    await driver.findElement(By.id('getMe')).sendKeys('HIIII');

 
  } finally {
    await driver.quit();
  }
}

userSignupLoginFlow();
