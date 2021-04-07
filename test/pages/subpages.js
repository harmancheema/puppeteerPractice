export const commonElements = {
  header: 'h3',
  body: 'div.example > p',
}

export const addRemoveElements = {
  addElement: 'button[onclick="addElement()"]',
  deleteElement: 'button[onclick="deleteElement()"]',
}

export const brokenImages = {
  image1: 'img[src="asdf.jpg"]',
  image2: 'img[src="hjkl.jpg"]',
  image3: 'img[src="img/avatar-blank.jpg"]',
}

export const challengingDOM = {
  blueButton: 'a[class=button]',
  redButton: 'a[class="button alert"]',
  greenButton: 'a[class="button success"]',
  answerSection: 'canvas#canvas',
  table: 'div.large-10.columns > table',
  edit: 'a[href="#edit"]',
  delete: 'a[href="#delete"]',
}

export const checkboxes = {
  checkbox1: 'form#checkboxes > input:nth-child(1)',
  checkbox2: 'form#checkboxes > input:nth-child(3)',
}

export const contextMenu = {
  hotspot: 'div#hot-spot',
}

export const disappearingElements = {
  home: 'ul > li:nth-child(1)',
  about: 'a[href="/about/"]',
  contactUs: 'a[href="/contact-us/"]',
  portfolio: 'a[href="/portfolio/"]',
  gallery: 'a[href="/gallery/"]',
  newPageHeading: 'h1',
}

export const dragAndDrop = {
  boxA: 'div#column-a',
  boxB: 'div#column-b',
}

export const dropdown = {
  menu: 'select#dropdown',
  option1: '1',
  option2: '2',
  option1selected: 'option[value="1"][selected="selected"]',
  option2selected: 'option[value="2"][selected="selected"]',
}

export const dynamicContent = {
  staticContent: 'a[href="/dynamic_content?with_content=static"]',
  firstParagraph: 'div#content > div.row:nth-child(1) > div.large-10.columns',
  secondParagraph: 'div#content > div.row:nth-child(4) > div.large-10.columns',
  thirdParagraph: 'div#content > div.row:nth-child(7) > div.large-10.columns',
}

export const dynamicControls = {
  header: 'div.example > h4:nth-child(1)',
  addRemoveButton: 'button[onclick="swapCheckbox()"]',
  checkbox: 'div#checkbox',
  enableDisableButton: 'button[onclick="swapInput()"]',
  textField: 'input[type=text]',
  successMessage: 'p#message',
}

export const dynamicLoading = {
  exampleOne: 'a[href*="1"]',
  exampleTwo: 'a[href*="2"]',
  subHeader: 'div.example > h3 ~ h4',
  startButton: 'div#start > button',
  finishedText: 'div#finish > h4',
}
