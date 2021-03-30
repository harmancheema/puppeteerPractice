import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('add/remove elements', () => {
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
    await page.click(homePageObj.pageLinks.addRemoveElements)
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
    expect(header).toMatch('Add/Remove Elements')
  })

  it('add & remove element', async () => {
    // Click Add Element
    await page.click(subpagesObj.addRemoveElements.addElement)

    // Wait for selector
    await page.waitForSelector(subpagesObj.addRemoveElements.deleteElement, {
      visible: true,
    })

    // Verify delete button is shown
    expect(
      await page.$(subpagesObj.addRemoveElements.deleteElement),
    ).toBeTruthy()

    // Click on Delete button
    await page.click(subpagesObj.addRemoveElements.deleteElement)

    // Verify delete button is not shown anymore
    expect(
      await page.$(subpagesObj.addRemoveElements.deleteElement),
    ).toBeFalsy()
  })
})
