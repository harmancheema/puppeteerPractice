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
    await page.click(homePageObj.pageLinks.dynamicControls)
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
    let header = await getElementText(page, subpagesObj.dynamicControls.header)
    expect(header).toMatch('Dynamic Controls')
  })

  it('verify body', async () => {
    // Verify body text
    let body = await getElementText(page, subpagesObj.commonElements.body)
    expect(body).toContain(
      'This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.',
    )
  })

  it('remove/add checkbox', async () => {
    if (subpagesObj.dynamicControls.checkbox) {
      // Verify button is to remove
      expect(
        await getElementText(page, subpagesObj.dynamicControls.addRemoveButton),
      ).toMatch('Remove')

      // Click Remove button
      await page.click(subpagesObj.dynamicControls.addRemoveButton)

      // Wait for selector
      await page.waitForSelector(subpagesObj.dynamicControls.successMessage, {
        visible: true,
      })

      // Verify button is to add now
      expect(
        await getElementText(page, subpagesObj.dynamicControls.addRemoveButton),
      ).toMatch('Add')
    }

    if (!subpagesObj.dynamicControls.checkbox) {
      // Verify button is to add
      expect(
        await getElementText(page, subpagesObj.dynamicControls.addRemoveButton),
      ).toMatch('Add')

      // Click Add button
      await page.click(subpagesObj.dynamicControls.addRemoveButton)

      // Wait for selector
      await page.waitForSelector(subpagesObj.dynamicControls.successMessage, {
        visible: true,
      })

      // Verify button is to remove
      expect(
        await getElementText(page, subpagesObj.dynamicControls.addRemoveButton),
      ).toMatch('Remove')
    }
  })

  it('enable/disable field', async () => {
    const buttonText = await getElementText(
      page,
      subpagesObj.dynamicControls.enableDisableButton,
    )

    // Enable field function
    const enableField = async (page) => {
      // Click Enable button
      await page.click(subpagesObj.dynamicControls.enableDisableButton)

      // Wait for selector
      await page.waitForSelector(subpagesObj.dynamicControls.successMessage, {
        visible: true,
      })

      // Verify button text is now Disable
      expect(
        await getElementText(
          page,
          subpagesObj.dynamicControls.enableDisableButton,
        ),
      ).toMatch('Disable')
    }

    // Disable field function
    const disableField = async (page) => {
      // Click Disable button
      await page.click(subpagesObj.dynamicControls.enableDisableButton)

      // Wait for selector
      await page.waitForSelector(subpagesObj.dynamicControls.successMessage, {
        visible: true,
      })

      // Verify button is to Enable
      expect(
        await getElementText(
          page,
          subpagesObj.dynamicControls.enableDisableButton,
        ),
      ).toMatch('Enable')
    }

    // Check button text and trigger function
    buttonText === 'Enable' ? await enableField(page) : await disableField(page)
  })
})
