import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('disappearing elements', () => {
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
    await page.click(homePageObj.pageLinks.disappearingElements)
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
    expect(header).toMatch('Disappearing Elements')
  })

  it('verify body', async () => {
    // Verify header text
    let body = await getElementText(page, subpagesObj.commonElements.body)
    expect(body).toContain(
      'This example demonstrates when elements on a page change by disappearing/reappearing on each page load.',
    )
  })

  it('verify all other elements', async () => {
    const buttons = [
      subpagesObj.disappearingElements.home,
      subpagesObj.disappearingElements.about,
      subpagesObj.disappearingElements.contactUs,
      subpagesObj.disappearingElements.portfolio,
      subpagesObj.disappearingElements.gallery,
    ]

    // Verify all elements and their links
    for (const button of buttons) {
      switch (button) {
        // Verify home link goes back to homepage
        case subpagesObj.disappearingElements.home:
          await page.click(button)
          expect(await page.$(homePageObj.headings.header)).toBeTruthy()
          expect(
            await getElementText(page, homePageObj.headings.header),
          ).toMatch('Welcome to the-internet')
          break

        // Gallery button may or may not be there
        case subpagesObj.disappearingElements.gallery:
          try {
            await page.click(button)
            expect(
              await getElementText(
                page,
                subpagesObj.disappearingElements.newPageHeading,
              ),
            ).toMatch('Not Found')
          } catch {}
          break

        // All other cases should open a page which is not found
        default:
          await page.click(button)
          expect(
            await getElementText(
              page,
              subpagesObj.disappearingElements.newPageHeading,
            ),
          ).toMatch('Not Found')
          break
      }

      // Go back to previous page
      await page.goBack()
    }
  })
})
