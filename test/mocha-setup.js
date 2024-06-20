const { Builder, By, until } = require("selenium-webdriver");
const { exec } = require('child_process');
const assert = require("assert");

describe('User Signup and Login Flow', function() {
  let driver;

  // Set longer timeout for asynchronous operations
  this.timeout(30000);

  before(async function() {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  after(async function() {
    await driver.quit();
  });

  after(done => {
    exec('your-command', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing command: ${stderr}`);
        done(err);
      } else {
        console.log(`Command output: ${stdout}`);
        done();
      }
    });
  });

  it('should complete user signup and login flow', async function() {
    await driver.get('https://letcode.in/test'); // Adjust based on site structure

    // Click on Edit link (replace with actual selector)
    const editLink = await driver.wait(until.elementLocated(By.xpath("//a[text()='Edit']")), 10000);
    await editLink.click();

    // Clear join field and enter new value
    const joinField = await driver.findElement(By.xpath("//input[@id='join']"));
    await joinField.clear();
    await joinField.sendKeys('Done');

    // Enter text in getMe field
    const getMeField = await driver.findElement(By.id('getMe'));
    await getMeField.sendKeys('HIIII');
  });

  it('should login to the application', async function() {
    // Navigate to the login page
    await driver.get("https://test-login-app.vercel.app/");
    
    // Enter email
    const emailField = await driver.findElement(By.id("email"));
    await emailField.sendKeys("test3@gmail.com");
    
    // Enter password
    const passwordField = await driver.findElement(By.id("password"));
    await passwordField.sendKeys("Password@12345");
    
    // Click login button
    const loginButton = await driver.findElement(By.name("login"));
    await loginButton.click();
    
    // Verify the login was successful by checking the page title
    const pageTitle = await driver.getTitle();
    assert.strictEqual(pageTitle, "Welcome Page Title"); // Replace with the actual expected title
    console.log("Login successful, page title:", pageTitle);
  });

  // Add more test cases as needed
});
