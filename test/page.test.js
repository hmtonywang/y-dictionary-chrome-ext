import puppeteer from 'puppeteer';
import { EXTENSION_PATH, EXTENSION_ID } from './config';


describe('Test page', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`
      ]
    });
  });
  
  afterAll(async () => {
    page = undefined;
    await browser.close();
    browser = undefined;
  });
  
  test('page renders correctly with one text input', async () => {
    page = await browser.newPage();
    await page.goto(`chrome-extension://${EXTENSION_ID}/index.html`);
    const title = await page.title();
    expect(title).toEqual('Y Dictionary');
    const textInputType = await page.evaluate('document.getElementById("text-input").type');
    expect(textInputType).toBe('text');
  });
  
  test('should can type into the text input', async () => {
    const text = 'this is test text';
    await page.locator('#text-input').fill(text);
    const textInputValue = await page.evaluate('document.getElementById("text-input").value');
    expect(textInputValue).toBe(text);
  });

  // test('should call async api after press enter', async () => {
  //   await page.keyboard.press('Enter');
  // });

  test('should clear text input', async () => {
    await page
      .locator('button')
      .filter(button => button.title === '清除')
      .click();
    const textInputValue = await page.evaluate('document.getElementById("text-input").value');
    expect(textInputValue).toBe('');
  });
});