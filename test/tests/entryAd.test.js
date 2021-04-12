import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('entry ad', () => {
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
    await page.click(homePageObj.pageLinks.entryAd)
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
    // Close modal
    await page.waitForSelector(subpagesObj.entryAd.modalFooter, {
      visible: true,
    })
    await page.click(subpagesObj.entryAd.modalFooter)

    // Verify header text
    await page.waitForSelector(subpagesObj.commonElements.header, {
      visible: true,
    })
    let header = await getElementText(page, subpagesObj.commonElements.header)
    expect(header).toMatch('Entry Ad')
  })

  it('verify body', async () => {
    // Close modal
    await page.waitForSelector(subpagesObj.entryAd.modalFooter, {
      visible: true,
    })
    await page.click(subpagesObj.entryAd.modalFooter)

    // Verify body text
    await page.waitForSelector(subpagesObj.commonElements.body, {
      visible: true,
    })
    let body = await getElementText(page, subpagesObj.commonElements.body)
    expect(body).toContain('Displays an ad on page load.')
  })

  it('verify modal opens on page load', async () => {
    const items = [
      subpagesObj.entryAd.modalBody,
      subpagesObj.entryAd.modalTitle,
      subpagesObj.entryAd.modalFooter,
    ]
    let text

    // Vereify contents of the modal
    for (const item of items) {
      // Wait for selector & verify selector exists
      await page.waitForSelector(item, { visible: true })
      expect(await page.$(item)).toBeTruthy()

      // Get text of selector & verify
      text = await getElementText(page, item)
      switch (item) {
        case subpagesObj.entryAd.modalTitle:
          expect(text).toMatch('This is a modal windo')
          break
        case subpagesObj.entryAd.modalBody:
          expect(text).toMatch(
            "It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).",
          )
          break
        case subpagesObj.entryAd.modalFooter:
          expect(text).toMatch('Close')
          break
      }
    }
  })

  it('reopen ad', async () => {
    // Close modal
    await page.waitForSelector(subpagesObj.entryAd.modalFooter, {
      visible: true,
    })
    await page.click(subpagesObj.entryAd.modalFooter)

    // Restart ad
    await page.waitForSelector(subpagesObj.entryAd.restartAd, {
      visible: true,
    })
    await page.click(subpagesObj.entryAd.restartAd)

    // Verify modal is reopened
    await page.waitForSelector(subpagesObj.entryAd.modalFooter, {
      visible: true,
    })
    expect(await page.$(subpagesObj.entryAd.modalFooter)).toBeTruthy()
  })
})
