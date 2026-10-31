import directoryPage from '../support/pageObjects/directoryPage'

describe('Directory Menu', () => {
  let data

  before(() => {
    cy.fixture('directoryData').then((d) => {
      data = d
    })
  })

  beforeEach(() => {
    directoryPage.interceptAll()
    cy.login()
    directoryPage.openFromSidebar()
    directoryPage.assertApiStatus('@getEmployees')
  })

  it('TC-DIR-001 - Membuka menu Directory', () => {
    directoryPage.assertUrlIsDirectory()
    directoryPage.assertFilterFormVisible(data.filterLabels)
    directoryPage.assertCardsDisplayed(data.message.recordsFound)
  })

  it('TC-DIR-002 - Pencarian Employee Name valid', () => {
    directoryPage.typeEmployeeName(data.employee.keyword)
    directoryPage.assertApiStatus('@getAutocomplete')
    directoryPage.selectAutocomplete(data.employee.valid)

    directoryPage.interceptFiltered()
    directoryPage.clickSearch()

    directoryPage.assertApiStatus('@getFilteredEmployees')
    directoryPage.assertOnlyCardsOf(data.employee.valid)
    directoryPage.assertRecordsCountMatchesCards()
  })

  it('TC-DIR-003 - Pencarian Employee Name yang tidak ada', () => {
    directoryPage.typeEmployeeName(data.invalid.notFound)
    directoryPage.assertApiStatus('@getAutocomplete')
    directoryPage.clickSearch()
    directoryPage.assertInvalidMessage(data.message.invalid)
  })

  it('TC-DIR-004 - Pencarian Employee Name dengan karakter spesial', () => {
    directoryPage.typeEmployeeName(data.invalid.special)
    directoryPage.clickSearch()
    directoryPage.assertInvalidMessage(data.message.invalid)
    directoryPage.assertUrlIsDirectory()
  })

  it('TC-DIR-005 - Pencarian huruf kecil semua [BUG-004]', () => {
    directoryPage.typeEmployeeName(data.employee.lowerCase)
    directoryPage.assertApiStatus('@getAutocomplete')
    directoryPage.assertAutocompleteHasResult(data.message.noRecordsFound)
    directoryPage.selectAutocomplete(data.employee.valid)
    directoryPage.clickSearch()
    directoryPage.assertOnlyCardsOf(data.employee.valid)
  })

  it('TC-DIR-006 - Pencarian Employee Name hasil paste [BUG-005]', () => {
    directoryPage.pasteEmployeeName(data.employee.valid)
    directoryPage.assertApiStatus('@getAutocomplete')
    directoryPage.assertAutocompleteContains(data.employee.valid)
    directoryPage.clickSearch()
    directoryPage.assertOnlyCardsOf(data.employee.valid)
  })

  it('TC-DIR-007 - Ketik manual lalu pilih dari dropdown', () => {
    directoryPage.typeEmployeeName(data.employee.keyword)
    directoryPage.assertApiStatus('@getAutocomplete')
    directoryPage.assertAutocompleteContains(data.employee.valid)
    directoryPage.selectAutocomplete(data.employee.valid)
    directoryPage.clickSearch()
    directoryPage.assertOnlyCardsOf(data.employee.valid)
  })

  it('TC-DIR-008 - Filter berdasarkan Job Title', () => {
    directoryPage.interceptFiltered()
    directoryPage.selectJobTitle(data.filter.jobTitle)
    directoryPage.clickSearch()

    directoryPage.assertFilterResultMatchesCards(
      '@getFilteredEmployees',
      'jobTitleId'
    )
  })

  it('TC-DIR-009 - Filter berdasarkan Location', () => {
    directoryPage.interceptFiltered()
    directoryPage.selectLocation(data.filter.location)
    directoryPage.clickSearch()

    directoryPage.assertFilterResultMatchesCards(
      '@getFilteredEmployees',
      'locationId'
    )
  })

  it('TC-DIR-010 - Kombinasi filter Job Title + Location', () => {
    directoryPage.interceptFiltered()
    directoryPage.selectJobTitle(data.filter.jobTitle)
    directoryPage.selectLocation(data.filter.location)
    directoryPage.clickSearch()

    directoryPage.assertFilterResultMatchesCards(
      '@getFilteredEmployees',
      'jobTitleId',
      'locationId'
    )
  })

  it('TC-DIR-012 - Fungsi tombol Reset', () => {
    directoryPage.selectJobTitle(data.filter.jobTitle)
    directoryPage.selectLocation(data.filter.location)
    directoryPage.clickSearch()
    directoryPage.clickReset()
    directoryPage.assertFiltersReset()
    directoryPage.assertCardsDisplayed(data.message.recordsFound)
  })

  it('TC-DIR-013 - Klik Search tanpa mengisi filter', () => {
    directoryPage.clickSearch()
    directoryPage.assertApiStatus('@getEmployees')
    directoryPage.assertCardsDisplayed(data.message.recordsFound)
  })

  it('TC-DIR-014 - Melihat detail karyawan dengan klik kartu [BUG-018]', () => {
    directoryPage.interceptDetail()
    directoryPage.clickCardByName(data.employee.noDetail)
    directoryPage.assertApiStatus('@getEmployeeDetail')
    directoryPage.assertDetailPanel(data.employee.noDetail)
    directoryPage.assertDetailComplete()
  })

  it('TC-DIR-015 - Klik tombol email pada panel detail [BUG-006]', () => {
    directoryPage.interceptDetailWithContact(
      data.employee.phone,
      data.employee.email
    )

    directoryPage.clickCardByName(data.employee.withContact)
    directoryPage.assertApiStatus('@getEmployeeDetail')
    directoryPage.assertMailtoLink(data.employee.email)
  })
})