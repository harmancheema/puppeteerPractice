/**
 *
 * @param {Object} page
 * @param {Object} inputElement
 * @returns String
 */
export const getElementText = async (page, inputElement) => {
  let element = await page.waitForSelector(inputElement)
  let text = await element.evaluate((el) => el.textContent)
  return text
}
