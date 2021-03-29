import puppeteer from 'puppeteer'
import { locator } from '../pages/sum'

describe('Example', () => {
  it('test', async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      args: ['--start-maximized'],
      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // to disable pop-up while running in local
    })
    const page = await browser.newPage()
    await page.goto('https://www.youtube.com/watch?v=5eUaKfXFGEM')
    // await page.type('input#search', 'Rajvir Jawandha')
    // await page.click('button#search-icon-legacy')
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    // const link = await page.$$('a#thumbnail')
    // await link[0].click()

    const element = await page.$(locator.viewCount)
    const text = await page.evaluate((element) => element.innerText, element)
    console.log('# of views: ' + text)

    await page.waitForTimeout(1000)
    await browser.close()
  })
})
