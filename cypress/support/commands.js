
Cypress.Commands.add('login', () => {
  cy.visit('/web/index.php/auth/login');

  cy.get('input[name="username"]')
    .should('be.visible')
    .type('Admin');

  cy.get('input[name="password"]')
    .should('be.visible')
    .type('admin123');

  cy.get('button[type="submit"]')
    .should('be.enabled')
    .click();

  // Pastikan berhasil masuk ke dashboard
  cy.url({ timeout: 20000 })
    .should('include', '/dashboard');

  cy.get('.oxd-topbar-header-title', { timeout: 20000 })
    .should('be.visible');
});
