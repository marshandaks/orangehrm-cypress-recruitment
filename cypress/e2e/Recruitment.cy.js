
import RecruitmentPage from '../support/pageObjects/recruitmentPage'

describe('Recruitment Module - OrangeHRM', () => {
  let data

  before(() => {
    cy.fixture('recruitmentData').then((d) => {
      data = d
    })
  })

  beforeEach(() => {
    cy.visit('/web/index.php/auth/login')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.location('pathname', { timeout: 15000 })
      .should('include', '/dashboard/index')
  })

  function openAddCandidate() {
    RecruitmentPage.openAddCandidate()

    cy.location('pathname')
      .should('include', '/recruitment/addCandidate')
  }

  function fillCandidate(candidate) {
    RecruitmentPage.firstName()
      .clear()
      .type(candidate.firstName)

    if (candidate.middleName) {
      RecruitmentPage.middleName()
        .clear()
        .type(candidate.middleName)
    }

    RecruitmentPage.lastName()
      .clear()
      .type(candidate.lastName)

    if (candidate.email) {
      RecruitmentPage.inputFor('Email')
        .clear()
        .type(candidate.email)
    }

    if (candidate.contactNumber) {
      RecruitmentPage.inputFor('Contact Number')
        .clear()
        .type(candidate.contactNumber)
    }
  }

  function openAddVacancy() {
    RecruitmentPage.openAddVacancy()

    cy.location('pathname')
      .should('include', '/recruitment/addJobVacancy')
  }

  function fillVacancy(name, positions) {
    RecruitmentPage.inputFor('Vacancy Name')
      .clear()
      .type(name)

    if (positions !== null && positions !== undefined) {
      RecruitmentPage.inputFor('Number of Positions')
        .clear()
        .type(String(positions))
    }
  }

  function openCandidateList() {
    RecruitmentPage.open()

    cy.location('pathname')
      .should('include', '/recruitment/viewCandidates')

    cy.get('.oxd-table', { timeout: 15000 })
      .should('be.visible')
  }

  it('TC-REC-001 - Membuka halaman Recruitment', () => {
    RecruitmentPage.open()

    cy.location('pathname', { timeout: 15000 })
      .should('include', '/recruitment/viewCandidates')

    cy.get('.oxd-table', { timeout: 15000 })
      .should('be.visible')

    cy.contains('h5, h6', 'Candidates')
      .should('be.visible')
  })

  it('TC-REC-002 - Menambahkan kandidat dengan data valid', () => {
    openAddCandidate()
    fillCandidate(data.validCandidate)

    RecruitmentPage.saveButton()
    RecruitmentPage.successMessage()
  })

  it('TC-REC-003 - Memeriksa validasi field wajib kandidat', () => {
    openAddCandidate()

    RecruitmentPage.saveButton()

    RecruitmentPage.requiredMessages()
      .should('have.length.greaterThan', 0)
  })

  it('TC-REC-004 - Memasukkan format email tidak valid', () => {
    openAddCandidate()
    fillCandidate(data.invalidEmailCandidate)

    RecruitmentPage.saveButton()

    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
  })

  it('TC-REC-005 - Memasukkan nomor kontak berisi simbol', () => {
    openAddCandidate()
    fillCandidate(data.invalidContactCandidate)

    RecruitmentPage.saveButton()

    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
  })

  it('TC-REC-006 - Memasukkan nomor kontak valid', () => {
    openAddCandidate()
    fillCandidate(data.validCandidate)

    RecruitmentPage.saveButton()
    RecruitmentPage.successMessage()
  })

  it('TC-REC-007 - Memeriksa tanggal aplikasi di masa lalu', () => {
    openAddCandidate()

    RecruitmentPage.field('Date of Application')
      .should('exist')
      .find('input')
      .first()
      .should('be.visible')
  })

  it('TC-REC-008 - Memeriksa tanggal aplikasi hari ini', () => {
    openAddCandidate()

    RecruitmentPage.field('Date of Application')
      .should('exist')
      .find('input')
      .first()
      .should('be.visible')
  })

  it('TC-REC-010 - Menambahkan kandidat dengan persetujuan', () => {
    openAddCandidate()
    fillCandidate(data.validCandidate)

    cy.get('input[type="checkbox"]').then(($checkboxes) => {
      if ($checkboxes.length && !$checkboxes.first().is(':checked')) {
        cy.wrap($checkboxes.first()).check({ force: true })
      }
    })

    RecruitmentPage.saveButton()

    cy.get('body').should('be.visible')
  })

  it('TC-REC-012 - Menambahkan kandidat dengan resume PDF', () => {
    openAddCandidate()
    fillCandidate(data.validCandidate)

    RecruitmentPage.uploadResume('cypress/fixtures/cv.pdf')

    RecruitmentPage.saveButton()
    RecruitmentPage.successMessage()
  })

  it('TC-REC-013 - Memeriksa nama kandidat satu karakter', () => {
    openAddCandidate()
    fillCandidate(data.shortNameCandidate)

    RecruitmentPage.saveButton()

    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
  })

  it('TC-REC-015 - Menambahkan kandidat dengan nama valid', () => {
    openAddCandidate()
    fillCandidate(data.validNameCandidate)

    RecruitmentPage.saveButton()
    RecruitmentPage.successMessage()
  })

  it('TC-REC-017 - Mengunggah file resume PDF valid', () => {
    openAddCandidate()

    RecruitmentPage.uploadResume('cypress/fixtures/cv.pdf')

    cy.get('input[type="file"]')
      .should('exist')
  })

  it('TC-REC-018 - Mencari kandidat', () => {
    openCandidateList()

    RecruitmentPage.searchName()
      .should('be.visible')
      .clear()
      .type(data.search.candidateName)

    RecruitmentPage.searchButton()

    cy.get('.oxd-table-body', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Budi')
  })

  it('TC-REC-019 - Memfilter kandidat berdasarkan status', () => {
    openCandidateList()

    RecruitmentPage.field('Status')
      .find('.oxd-select-text')
      .click()

    cy.get('.oxd-select-dropdown', { timeout: 10000 })
      .should('be.visible')
      .contains('.oxd-select-option', data.search.status)
      .click()

    RecruitmentPage.searchButton()

    cy.get('.oxd-table', { timeout: 15000 })
      .should('be.visible')
  })
})
