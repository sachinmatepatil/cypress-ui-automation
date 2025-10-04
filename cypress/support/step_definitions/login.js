import {Behave, Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";



Given("Access website", () => {
  cy.visit("https://webdriveruniversity.com/Login-Portal/index.html");
});


When("I enter a username {word}", (userName) => {
	cy.get("#text").type(userName);
});

When("I enter a password {word}", (password) => {
	cy.get('#password').type(password);

});

When("I click on login button", () => {
  cy.get('#login-button').click();
});


Then("user should be able to login get message {string}", (alertText) => {
  cy.on("window:alert", (txt) => {
    expect(txt).to.contains(alertText);
  });
});