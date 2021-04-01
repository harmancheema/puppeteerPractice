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
    await page.click(homePageObj.pageLinks.dynamicContent)
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
    expect(header).toMatch('Dynamic Content')
  })

  it('verify body', async () => {
    // Verify body text
    let body = await getElementText(page, subpagesObj.commonElements.body)
    expect(body).toContain(
      'nature of content by loading new text and images on each page refresh.',
    )
  })

  it('verify dynamic content', async () => {
    // Define paragraphs
    const paragrahs = [
      subpagesObj.dynamicContent.firstParagraph,
      subpagesObj.dynamicContent.secondParagraph,
      subpagesObj.dynamicContent.thirdParagraph,
    ]

    // Define variable to store text
    let textBeforeReload = []
    let textAfterReload = []

    // Counter
    let i = 0

    // Store initial texts
    for (const paragraph of paragrahs) {
      textBeforeReload[i] = await getElementText(page, paragraph)
      i++
    }

    // Reload page and reset counter
    await page.reload({ waitUntil: 'networkidle2' })
    i = 0

    // Store changed texts
    for (const paragraph of paragrahs) {
      textAfterReload[i] = await getElementText(page, paragraph)
      i++
    }

    // Verify text has changed
    for (let i = 0; i < paragrahs.length; i++) {
      expect(textBeforeReload[i] !== textAfterReload[i])
    }
  })

  it('verify static content', async () => {
    // Define paragraphs
    const paragrahs = [
      subpagesObj.dynamicContent.firstParagraph,
      subpagesObj.dynamicContent.secondParagraph,
      subpagesObj.dynamicContent.thirdParagraph,
    ]

    // Define variable to store text
    let textBeforeReload = []
    let textAfterReload = []

    // Counter
    let i = 0

    // Click on static page link
    await page.click(subpagesObj.dynamicContent.staticContent)

    // Store initial texts
    for (const paragraph of paragrahs) {
      textBeforeReload[i] = await getElementText(page, paragraph)
      i++
    }

    // Reload page and reset counter
    await page.reload({ waitUntil: 'networkidle2' })
    i = 0

    // Verify only paragrah 3 is different, but 1 & 2 are the same
    for (const paragraph of paragrahs) {
      textAfterReload[i] = await getElementText(page, paragraph)
      i++

      paragraph === subpagesObj.dynamicContent.thirdParagraph
        ? expect(textBeforeReload[i] !== textAfterReload[i])
        : expect(textBeforeReload[i] === textAfterReload[i])
    }
  })
})
