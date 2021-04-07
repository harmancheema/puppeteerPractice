import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('dynamic content', () => {
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
    await page.click(homePageObj.pageLinks.dynamicLoading)
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
    expect(header).toMatch('Dynamically Loaded Page Elements')
  })

  it('verify body', async () => {
    // Verify body text
    let body = await getElementText(page, subpagesObj.commonElements.body)
    expect(body).toContain(
      "It's common to see an action get triggered that returns a result dynamically.",
    )
  })

  it('two example', async () => {
    // Define two links
    const examples = [
      subpagesObj.dynamicLoading.exampleOne,
      subpagesObj.dynamicLoading.exampleTwo,
    ]

    // Verify both links
    for (const example of examples) {
      const text = await getElementText(page, example)
      switch (example) {
        case subpagesObj.dynamicLoading.exampleOne:
          expect(text).toMatch('Example 1: Element on page that is hidden')
          break

        case subpagesObj.dynamicLoading.exampleTwo:
          expect(text).toMatch('Example 2: Element rendered after the fact')
          break
      }
    }
  })

  it('dynamic loading', async () => {
    // Define links
    const links = [
      subpagesObj.dynamicLoading.exampleOne,
      subpagesObj.dynamicLoading.exampleTwo,
    ]

    // Verify dynamic loading for both links
    for (const link of links) {
      // Click link
      await page.click(link)
      await page.waitForSelector(subpagesObj.dynamicLoading.startButton, {
        visible: true,
      })

      // Click Start button
      await page.click(subpagesObj.dynamicLoading.startButton)
      await page.waitForSelector(subpagesObj.dynamicLoading.finishedText, {
        visible: true,
      })

      // Get text of header
      const header = await getElementText(
        page,
        subpagesObj.commonElements.header,
      )

      // Get text of subheader
      const subHeader = await getElementText(
        page,
        subpagesObj.dynamicLoading.subHeader,
      )

      // Get text of body
      const text = await getElementText(
        page,
        subpagesObj.dynamicLoading.finishedText,
      )

      // Go back to previous page
      await page.goBack()
      await page.waitForSelector(subpagesObj.dynamicLoading.exampleOne, {
        visible: true,
      })

      // Verify texts are as expected
      expect(header).toMatch('Dynamically Loaded Page Elements')
      expect(text).toMatch('Hello World!')

      switch (link) {
        case subpagesObj.dynamicLoading.exampleOne:
          expect(subHeader).toMatch('Example 1: Element on page that is hidden')
          break

        case subpagesObj.dynamicLoading.exampleTwo:
          expect(subHeader).toMatch(
            'Example 2: Element rendered after the fact',
          )
          break
      }
    }
  })
})
