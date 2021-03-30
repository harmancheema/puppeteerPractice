import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('home page', () => {
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
  })

  afterEach(async () => {
    // Close page
    await page.close()
  })

  afterAll(async () => {
    // Close browser
    await browser.close()
  })

  it('verify header & subheader', async () => {
    // Verify header and sub-header
    const headers = Object.values(homePageObj.headings)
    for (const header of headers) {
      switch (header) {
        case homePageObj.headings.header:
          expect(await getElementText(page, header)).toMatch(
            'Welcome to the-internet',
          )
          break

        case homePageObj.headings.subheader:
          expect(await getElementText(page, header)).toMatch(
            'Available Examples',
          )
          break

        default:
          break
      }
    }
  })

  it('verify links', async () => {
    // Verify all links are present
    const links = Object.values(homePageObj.pageLinks)
    for (const link of links) {
      expect(await page.$(link)).toBeTruthy()
    }
  })
})
