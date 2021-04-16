import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('multiple windows', () => {
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
    await page.click(homePageObj.pageLinks.multipleWindows)
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
    expect(header).toMatch('Opening a new window')
  })

  it('verify new tab is opened', async () => {
    // Get number of tabs before clicking the link
    let initialCount = (await browser.pages()).length

    // Click link
    await page.click(subpagesObj.multipleWindows.newWindow)
    await page.waitForTimeout(2000)

    // Get number of tabs after & header of new tab
    let allPages = await browser.pages()
    let updatedCount = allPages.length
    let header = await getElementText(
      allPages[updatedCount - 1],
      subpagesObj.multipleWindows.newHeader,
    )

    // Verify # of tabs are not equal & header of new tab
    expect(updatedCount).not.toEqual(initialCount)
    expect(header).toMatch('New Window')
  })
})
