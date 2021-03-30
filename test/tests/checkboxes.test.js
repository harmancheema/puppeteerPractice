import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('checkboxes', () => {
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
    await page.click(homePageObj.pageLinks.checkboxes)
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
    expect(header).toMatch('Checkboxes')
  })

  it('verify checking and unchecking boxes', async () => {
    let statusBefore = null
    let statusAfter = null

    // Loop through each checkbox
    const checkboxes = Object.values(subpagesObj.checkboxes)
    for (const checkbox of checkboxes) {
      // Get initial status
      statusBefore = await page.$eval(checkbox, (input) => input.checked)

      // Change checkbox status
      await page.click(checkbox)

      // Get status after clicking
      statusAfter = await page.$eval(checkbox, (input) => input.checked)

      // Verify before and after statuses are different
      expect(statusAfter !== statusBefore)
    }
  })
})
