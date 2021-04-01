import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('dropdown', () => {
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
    await page.click(homePageObj.pageLinks.dropdown)
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
    expect(header).toMatch('Dropdown List')
  })

  it('verify dropdown list', async () => {
    const options = [subpagesObj.dropdown.option1, subpagesObj.dropdown.option2]

    // Verify both options can be selected
    for (const option of options) {
      await page.select(subpagesObj.dropdown.menu, option)
      switch (option) {
        case subpagesObj.dropdown.option1:
          expect(
            await page.$(subpagesObj.dropdown.option1selected),
          ).toBeTruthy()
          break

        case subpagesObj.dropdown.option2:
          expect(
            await page.$(subpagesObj.dropdown.option2selected),
          ).toBeTruthy()
          break

        default:
          break
      }
    }
  })
})
