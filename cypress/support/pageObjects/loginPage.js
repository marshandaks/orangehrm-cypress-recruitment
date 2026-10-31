
class LoginPage {
  visit() {
    cy.visit('/web/index.php/auth/login')
  }

  getUsernameInput() {
    return cy.get('input[name="username"]')
  }

  getPasswordInput() {
    return cy.get('input[name="password"]')
  }

  getLoginButton() {
    return cy.get('button[type="submit"]')
  }

  enterUsername(username) {
    this.getUsernameInput().clear()

    if (username !== '') {
      this.getUsernameInput().type(username)
    }
  }

  enterPassword(password) {
    this.getPasswordInput().clear()

    if (password !== '') {
      this.getPasswordInput().type(password, { log: false })
    }
  }

  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.getLoginButton().click()
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard/index')
    cy.contains('h6', 'Dashboard').should('be.visible')
  }

  verifyInvalidCredentials() {
    cy.get('.oxd-alert-content-text')
      .should('contain.text', 'Invalid credentials')

    cy.url().should('include', '/auth/login')
  }

  verifyRequiredMessages(count) {
    cy.get('.oxd-input-field-error-message')
      .should('have.length', count)
      .each(($message) => {
        cy.wrap($message).should('contain.text', 'Required')
      })
  }

  verifyPasswordMasked() {
    this.getPasswordInput()
      .should('have.attr', 'type', 'password')
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?').click()
  }

  verifyResetPasswordPage() {
    cy.url().should('include', '/requestPasswordResetCode')
    cy.contains('h6', 'Reset Password').should('be.visible')
  }

  enterResetUsername(username) {
    cy.get('input[name="username"]').clear().type(username)
  }

  clickResetPassword() {
    cy.get('button[type="submit"]').click()
  }

  verifyResetPasswordSuccess() {
    cy.contains('Reset Password link sent successfully')
      .should('be.visible')
  }

  logout() {
    cy.get('.oxd-userdropdown-tab').click()
    cy.contains('a', 'Logout').click()
  }
}

export default LoginPage
