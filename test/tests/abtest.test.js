import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('A/B test', () => {
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

    // Click on A/B test
    await page.click(homePageObj.pageLinks.abTesting)
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
    let header = await getElementText(page, subpagesObj.commonElements.header)
    try {
      expect(header).toMatch('A/B Test Control')
    } catch {
      expect(header).toMatch('A/B Test Variation 1')
    }
  })

  it('verify body', async () => {
    // Verify body text
    let body = await getElementText(page, subpagesObj.commonElements.body)
    expect(body).toContain('Also known as split testing.')
  })
})
