
import LoginPage from '../support/pageObjects/loginPage'

describe('Login OrangeHRM', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    cy.fixture('loginData').as('data')
    loginPage.visit()
  })

  it('TC-LGN-001 Login dengan kredensial valid', function () {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest')

    loginPage.login(
      this.data.validUser.username,
      this.data.validUser.password
    )

    cy.wait('@loginRequest')
    loginPage.verifyLoginSuccess()
  })

  it('TC-LGN-002 Login dengan password salah', function () {
    loginPage.login(
      this.data.invalidPassword.username,
      this.data.invalidPassword.password
    )

    loginPage.verifyInvalidCredentials()
  })

  it('TC-LGN-003 Login dengan username salah', function () {
    loginPage.login(
      this.data.invalidUsername.username,
      this.data.invalidUsername.password
    )

    loginPage.verifyInvalidCredentials()
  })

  it('TC-LGN-004 Login dengan username dan password salah', function () {
    loginPage.login(
      this.data.invalidBoth.username,
      this.data.invalidBoth.password
    )

    loginPage.verifyInvalidCredentials()
  })

  it('TC-LGN-005 Login dengan username dan password kosong', () => {
    loginPage.getLoginButton().click()
    loginPage.verifyRequiredMessages(2)
  })

  it('TC-LGN-006 Login dengan username kosong', function () {
    loginPage.login(
      this.data.emptyUsername.username,
      this.data.emptyUsername.password
    )

    loginPage.verifyRequiredMessages(1)
  })

  it('TC-LGN-007 Login dengan password kosong', function () {
    loginPage.login(
      this.data.emptyPassword.username,
      this.data.emptyPassword.password
    )

    loginPage.verifyRequiredMessages(1)
  })

  it('TC-LGN-008 Validasi case sensitivity username', function () {
    loginPage.login(
      this.data.lowercaseUsername.username,
      this.data.lowercaseUsername.password
    )

    cy.url().should('include', '/auth/login')
    loginPage.verifyInvalidCredentials()
  })

  it('TC-LGN-009 Validasi case sensitivity password', function () {
    loginPage.login(
      this.data.uppercasePassword.username,
      this.data.uppercasePassword.password
    )

    loginPage.verifyInvalidCredentials()
  })

  it('TC-LGN-010 Validasi password tersamarkan', function () {
    loginPage.enterPassword(this.data.validUser.password)
    loginPage.verifyPasswordMasked()
  })

  it('TC-LGN-011 Login dengan karakter spesial', function () {
    loginPage.login(
      this.data.specialInput.username,
      this.data.specialInput.password
    )

    loginPage.verifyInvalidCredentials()
  })

  it('TC-LGN-012 Fungsi Forgot your password', function () {
    loginPage.clickForgotPassword()
    loginPage.verifyResetPasswordPage()

    loginPage.enterResetUsername(this.data.resetUser.username)
    loginPage.clickResetPassword()

    loginPage.verifyResetPasswordSuccess()
  })

  it('TC-LGN-013 Logout dan akses ulang setelah logout', function () {
    loginPage.login(
      this.data.validUser.username,
      this.data.validUser.password
    )

    loginPage.verifyLoginSuccess()
    loginPage.logout()

    cy.url().should('include', '/auth/login')

    cy.go('back')
    cy.reload()

    cy.url().should('include', '/auth/login')
  })
})
