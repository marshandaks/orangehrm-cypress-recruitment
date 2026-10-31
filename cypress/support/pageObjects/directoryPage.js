class DirectoryPage {
  getMenuDirectory() {
    return cy.get('.oxd-main-menu-item[href*="viewDirectory"]')
  }

  getNameInput() {
    return cy.get('input[placeholder="Type for hints..."]')
  }

  getAutocompleteDropdown() {
    return cy.get('.oxd-autocomplete-dropdown')
  }

  getAutocompleteOption() {
    return cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option')
  }

  getSelectBox(index) {
    return cy.get('.oxd-select-text').eq(index)
  }

  getJobTitleArrow() {
    return cy.get(
      ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon'
    )
  }

  getJobTitleInput() {
    return cy.get(
      ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input'
    )
  }

  getSearchButton() {
    return cy.get('button[type="submit"]')
  }

  getResetButton() {
    return cy.get('button[type="reset"]')
  }

  getCards() {
    return cy.get('.orangehrm-directory-card')
  }

  getCardHeader() {
    return cy.get('.orangehrm-directory-card-header')
  }

  getRecordsText() {
    return cy.get('.orangehrm-paper-container .orangehrm-horizontal-padding span')
  }

  getDetailPanel() {
    return cy.get('.orangehrm-directory-card-expanded')
  }

  getMailLink() {
    return cy.get('a[href^="mailto:"]')
  }

  getFieldError() {
    return cy.get('.oxd-input-field-error-message')
  }

  interceptList() {
    cy.intercept('GET', '**/api/v2/directory/employees?limit=*').as('getEmployees')
  }

  interceptAutocomplete() {
    cy.intercept('GET', '**/api/v2/directory/employees?nameOrId=*').as('getAutocomplete')
  }

  interceptFiltered() {
    cy.intercept(
      'GET',
      /\/api\/v2\/directory\/employees\?.*(locationId|jobTitleId|empNumber)=.*/
    ).as('getFilteredEmployees')
  }

  interceptDetail() {
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees/*?model=detailed'
    ).as('getEmployeeDetail')
  }

  interceptDetailWithContact(phone, email) {
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees/*?model=detailed',
      (req) => {
        req.continue((res) => {
          res.body.data.workTelephone = phone
          res.body.data.workEmail = email
        })
      }
    ).as('getEmployeeDetail')
  }

  interceptAll() {
    this.interceptList()
    this.interceptAutocomplete()
  }

  openFromSidebar() {
    this.getMenuDirectory().click()
  }

  typeEmployeeName(text) {
    this.getNameInput().clear().type(text, {
      parseSpecialCharSequences: false
    })
  }

  pasteEmployeeName(text) {
    this.getNameInput()
      .clear()
      .invoke('val', text)
      .trigger('input', { force: true })
  }

  selectAutocomplete(text) {
    cy.contains(
      '.oxd-autocomplete-dropdown .oxd-autocomplete-option',
      text,
      { matchCase: false }
    ).click()
  }

  openJobTitle() {
    this.getJobTitleArrow().click({ force: true })

    cy.get('.oxd-select-dropdown')
      .should('be.visible')
  }

  selectJobTitle(title) {
    this.openJobTitle()

    cy.get('.oxd-select-dropdown')
      .contains('.oxd-select-option', title)
      .should('be.visible')
      .click()
  }

  openLocation() {
    this.getSelectBox(1)
      .find('.oxd-select-text--after')
      .click({ force: true })

    cy.get('.oxd-select-dropdown')
      .should('be.visible')
  }

  selectLocation(location) {
    this.openLocation()

    cy.get('.oxd-select-dropdown')
      .contains('.oxd-select-option', location)
      .should('be.visible')
      .click()
  }

  clickSearch() {
    this.getSearchButton().click()
  }

  clickReset() {
    this.getResetButton().click()
  }

  clickCardByName(name) {
    cy.contains('.orangehrm-directory-card-header', name).click()
  }

  openFirstCard() {
    this.getCards().should('have.length.greaterThan', 0)

    this.getCardHeader().first().invoke('text').then((text) => {
      cy.wrap(text.replace(/\s+/g, ' ').trim()).as('selectedEmployee')
    })

    this.getCards().first().click()
  }

  clickEmailIcon() {
    this.getMailLink().first().click({ force: true })
  }

  assertApiStatus(alias, code = 200) {
    cy.wait(alias)
      .its('response.statusCode')
      .should('eq', code)
  }

  assertFilterResultMatchesCards(alias, ...keys) {
    cy.wait(alias).then(({ request, response }) => {
      keys.forEach((key) => {
        expect(request.url).to.include(key)
      })

      expect(response.statusCode).to.eq(200)

      const total = response.body.data.length

      if (total > 0) {
        this.getCards().should('have.length', total)
      } else {
        this.getCards().should('not.exist')
      }
    })
  }

  assertUrlIsDirectory() {
    cy.url().should('include', 'directory/viewDirectory')
  }

  assertFilterFormVisible(labels) {
    labels.forEach((label) => {
      cy.contains('.oxd-label', label).should('be.visible')
    })

    this.getResetButton().should('be.visible')
    this.getSearchButton().should('be.visible')
  }

  assertCardsDisplayed(recordsText) {
    this.getCards().should('have.length.greaterThan', 0)
    this.getRecordsText().should('contain.text', recordsText)
  }

  assertOnlyCardsOf(name) {
    this.getCards().should('have.length.greaterThan', 0)

    this.getCardHeader().each(($header) => {
      expect(
        $header.text().replace(/\s+/g, ' ').toLowerCase()
      ).to.contain(name.toLowerCase())
    })
  }

  assertRecordsCountMatchesCards() {
    this.getCards().its('length').then((total) => {
      this.getRecordsText()
        .invoke('text')
        .should('match', new RegExp(`\\(${total}\\)`))
    })
  }

  assertInvalidMessage(message) {
    this.getFieldError()
      .should('contain.text', message)
      .and('be.visible')
  }

  assertNoCards() {
    this.getCards().should('not.exist')
  }

  assertNoRecordsFound(message) {
    cy.contains(message).should('be.visible')
  }

  assertAutocompleteContains(name) {
    this.getAutocompleteOption().should(($options) => {
      const text = $options.text().replace(/\s+/g, ' ').toLowerCase()
      expect(text).to.contain(name.toLowerCase())
    })
  }

  assertAutocompleteHasResult(message) {
    this.getAutocompleteDropdown().should('not.contain.text', message)
  }

  assertCardsContain(text) {
    this.getCards().should('have.length.greaterThan', 0)

    this.getCards().each(($card) => {
      expect($card.text()).to.contain(text)
    })
  }

  assertFilteredCardsContain(text) {
    this.getCards().then(($cards) => {
      if ($cards.length > 0) {
        cy.wrap($cards).each(($card) => {
          expect($card.text()).to.contain(text)
        })
      } else {
        cy.get('.orangehrm-directory-card').should('not.exist')
      }
    })
  }

  assertFiltersReset() {
    this.getNameInput().should('have.value', '')
    this.getSelectBox(0).should('contain.text', '-- Select --')
    this.getSelectBox(1).should('contain.text', '-- Select --')
  }

  assertDetailPanel(name) {
    this.getDetailPanel()
      .should('be.visible')
      .and('contain.text', name)
  }

  assertDetailOfSelectedEmployee() {
    cy.get('@selectedEmployee').then((name) => {
      this.assertDetailPanel(name)
    })
  }

  assertDetailComplete() {
    this.getDetailPanel().within(() => {
      cy.get('p')
        .filter(':visible')
        .its('length')
        .should('be.gte', 4)
    })
  }

  assertMailtoLink(email) {
    this.getMailLink()
      .first()
      .should('have.attr', 'href', `mailto:${email}`)
  }
}

export default new DirectoryPage()