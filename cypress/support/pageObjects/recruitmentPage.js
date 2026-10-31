class RecruitmentPage {
  open() {
    cy.visit('/web/index.php/recruitment/viewCandidates');
  }

  openVacancies() {
    cy.visit('/web/index.php/recruitment/viewJobVacancy');
  }

  openAddCandidate() {
    cy.visit('/web/index.php/recruitment/addCandidate');
  }

  openAddVacancy() {
    cy.visit('/web/index.php/recruitment/addJobVacancy');
  }

  addButton() {
    cy.contains('button', 'Add')
      .should('be.visible')
      .click();
  }

  firstName() {
    return cy.get('input[name="firstName"]');
  }

  middleName() {
    return cy.get('input[name="middleName"]');
  }

  lastName() {
    return cy.get('input[name="lastName"]');
  }

  field(label) {
    return cy
      .contains('.oxd-input-group label', label)
      .closest('.oxd-input-group');
  }

  inputFor(label) {
    return this.field(label).find('input');
  }

  selectFor(label, option) {
    this.field(label)
      .find('.oxd-select-text')
      .click();

    cy.get('.oxd-select-dropdown')
      .contains('.oxd-select-option', option)
      .click();
  }

  saveButton() {
    cy.contains('button', 'Save')
      .should('be.visible')
      .click();
  }

  cancelButton() {
    cy.contains('button', 'Cancel')
      .should('be.visible')
      .click();
  }

  searchButton() {
    cy.contains('button', 'Search')
      .should('be.visible')
      .click();
  }

  resetButton() {
    cy.contains('button', 'Reset')
      .should('be.visible')
      .click();
  }

  requiredMessages() {
    return cy.get('.oxd-input-field-error-message');
  }

  successMessage() {
    return cy.get('.oxd-toast')
      .should('be.visible')
      .and('contain.text', 'Successfully Saved');
  }

  deletedMessage() {
    return cy.get('.oxd-toast')
      .should('be.visible')
      .and('contain.text', 'Successfully Deleted');
  }

  searchName() {
    return cy.get('input[placeholder="Type for hints..."]').first();
  }

  uploadResume(filePath) {
    cy.get('input[type="file"]')
      .selectFile(filePath, { force: true });
  }

  confirmDelete() {
    cy.contains('button', 'Yes, Delete')
      .should('be.visible')
      .click();
  }

  candidateRow(name) {
    return cy.get('.oxd-table-body')
      .contains('.oxd-table-cell', name)
      .closest('.oxd-table-row');
  }

  vacancyCards() {
    return cy.get('.oxd-table-card');
  }

  vacancyExists(name) {
    return this.vacancyCards()
      .contains('.oxd-table-card-cell .data', name);
  }
}

export default new RecruitmentPage();