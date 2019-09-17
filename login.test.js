const puppeteer = require("puppeteer");
const fs = require("fs");
const CRED =  require ('./credenthials.json');

let page;
let browser;
const width = 1366;
const height = 768;
const APP = "https://app.theeye.io/dashboard#";
const user = CRED.user;
const pass = CRED.pass;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 75,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.goto(APP);
  await page.setViewport({ width, height });
},30000);

describe("Contact form", () => {
  test("login", async () => {
      //insertamos nuestro email en el input
      const selector = 'input.form-input';
      await page.waitForSelector(selector);
      await page.type(selector, user);
      //insertamos nuestra contraseña en el input
      await page.keyboard.press('Tab');
      await page.keyboard.type(pass);
      //click a login
      let buttonSelector = 'button[data-hook="start-login"]';
      await page.click(buttonSelector);
  }, 30000);

  test("prueba", async () => {

    //Click en test de prueba 
    await page.waitForXPath('//*[@id="collapse_header_5d6031937e5352000f83e27d"]/h4[2]/span/div/div[2]/li/button');
    const [setting] = await page.$x('//*[@id="collapse_header_5d6031937e5352000f83e27d"]/h4[2]/span/div/div[2]/li/button');
    if(setting) setting.click();

    await page.waitFor(3000);
    if (await page.$('button[ data-hook="confirm"]') !== null) 
      console.log('found');
    else
      console.log('not found1');

    await page.waitForSelector('button[ data-hook="confirm"]');
    await page.$eval('button[ data-hook="confirm"]', el => el.click());

    //var button1 = await page.$('button[data-hook="confirm"]')
    //button1.click();

    //verificar si corre
      //await page.waitForSelector('div[id=“collapse_container_5d811d5a7f7c3c85fbc64f73”] i.remark-success');

     await page.evaluate(() => document.querySelector('div[id=“collapse_container_5d811d5a7f7c3c85fbc64f73”] i.remark-success'));
      
      //await page.waitForSelector('i.fa.fa-check.remark-success') 
      //await page.waitForXPath('//*[@id="collapse_container_5d6031937e5352000f83e27d"]/div/div[2]/div[2]/div/div/h4/div/div/li/button/i[2]');
     
      //i.fa.fa-check.remark-success::before
      
      //await page.waitForSelector('button[data-hook="action_button"]');
     // await page.$eval('button[data-hook="action_button"]', el => el.click());
      console.log("pass!!!");
}, 50000);


  /*test("Deslogin", async () => {

      //iremos a menu
  
      await page.waitForSelector('span[ data-hook="menu-toggle"]');
      await page.$eval('span[ data-hook="menu-toggle"]', el => el.click());
    
      //deslogueamos
          
      await page.waitForSelector('a[ data-hook="logout"]');
      await page.$eval('a[ data-hook="logout"]', el => el.click());
      browser.close();
  },30000);*/

});



//afterAll(() => {
 // browser.close();
//});
