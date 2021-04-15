import { launchSettings } from '@fixtures/launch'
import { urls } from '@fixtures/urls'
import * as homePageObj from '@pages/homepage'
import * as subpagesObj from '@pages/subpages'
import { getElementText } from '@utils/pageUtils'
import puppeteer from 'puppeteer'

describe('notification messages', () => {
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
    await page.click(homePageObj.pageLinks.notificationMessages)
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
    expect(header).toMatch('Notification Message')
  })

  it('verify body', async () => {
    // Verify body text
    await page.waitForSelector(subpagesObj.commonElements.body, {
      visible: true,
    })
    let body = await getElementText(page, subpagesObj.commonElements.body)
    expect(body).toContain(
      'The message displayed above the heading is a notification message.',
    )
  })

  it('trigger notifcation', async () => {
    // Click to trigger notification
    await page.click(subpagesObj.notificationMessages.newMessage)
    await page.waitForSelector(subpagesObj.notificationMessages.notifcation, {
      visible: true,
    })

    // Verify text of notification message
    let notificationMessage = await getElementText(
      page,
      subpagesObj.notificationMessages.notifcation,
    )
    try {
      expect(notificationMessage).toContain(
        'Action unsuccesful, please try again',
      )
    } catch {
      expect(notificationMessage).toContain('Action succesful')
    }
  })
})
