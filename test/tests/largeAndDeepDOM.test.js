import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('large and deep DOM', () => {
  let browser = null
  let page = null

  beforeAll(async () => {
    // Open browser
    browser = await puppeteer.launch({
      ...launchSettings,
    })
  })

  beforeEach(async () => {
    // Open new page
    page = await browser.newPage()

    // Go to home page
    await page.goto(urls.heroku)

    // Wait for selector
    await page.waitForSelector(homePageObj.headings.header)

    // Click link
    await page.click(homePageObj.pageLinks.largeAndDeepDOM)
  })

  afterEach(async () => {
    // Close page
    await page.close()
  })

  afterAll(async () => {
    // Close browser
    await browser.close()
  })

  it('verify header', async () => {
    // Verify header text
    await page.waitForSelector(subpagesObj.commonElements.header, {
      visible: true,
    })
    let header = await getElementText(page, subpagesObj.commonElements.header)
    expect(header).toMatch('Large & Deep DOM')
  })

  it('verify subheaders', async () => {
    // Define subheaders
    const text = ['No Siblings', 'Siblings', 'Table']

    // Get subheaders
    const subheaders = await page.$$eval(
      subpagesObj.largeAndDeepDOM.subheaders,
      (elements) => elements.map((item) => item.textContent),
    )

    // Verify subheaders are from the array
    for (const subheader of subheaders) {
      expect(text).toContain(subheader)
    }
  })

  it('verify selector is unique', async () => {
    // Get count of selectors
    const count = await page.$$(
      subpagesObj.largeAndDeepDOM.uniqueTableIdentifier,
    )

    // Verify count = 1
    expect(count.length).toEqual(1)
  })
})
