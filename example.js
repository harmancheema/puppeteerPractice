const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10, // 0 to 20 seems to work
    args: ["--start-maximized"],
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // to disable pop-up while running in local
  });
  const page = await browser.newPage();
  await page.goto("https://www.youtube.com/watch?v=5eUaKfXFGEM");
  //   await page.type("input#search", "Rajvir Jawandha");
  //   await page.click("button#search-icon-legacy");
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  //   const link = await page.$$("a#thumbnail");
  //   await link[0].click();

  const element = await page.$(
    "span.view-count.style-scope.yt-view-count-renderer"
  );
  const text = await page.evaluate((element) => element.innerText, element);
  console.log("# of views:" + text);

  await page.waitForTimeout(1000);
  await browser.close();
})();
