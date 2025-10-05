//When the error doesn't impact test flow
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });