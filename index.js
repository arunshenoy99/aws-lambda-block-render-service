const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async (event) => {

  const width = event.width || 1200;
  const height = event.height || 900;
  const content = event.content || "";

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: event.executablePath || await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.setContent(content);
  const imageBuffer = await page.screenshot({
    optimizeForSpeed: true,
    type: 'png',
    encoding: 'base64',
    clip: { x: 0, y: 0, width, height }
  });

  await page.close();
  await browser.close();
  return {
    statusCode: 201,
    body: JSON.stringify({
      screenshot: imageBuffer
    }),
  };
};
