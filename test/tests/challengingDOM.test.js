import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('challenging DOM', () => {
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
    await page.click(homePageObj.pageLinks.challengingDOM)
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
    expect(header).toMatch('Challenging DOM')
  })

  it('verify body', async () => {
    // Verify header text
    let header = await getElementText(page, subpagesObj.commonElements.body)
    expect(header).toContain(
      'The hardest part in automated web testing is finding the best locators',
    )
  })

  it('all buttons', async () => {
    // Verify all images are present
    const buttons = Object.values(subpagesObj.challengingDOM)
    for (const button of buttons) {
      expect(await page.$(button)).toBeTruthy()
    }
  })
})
