import {Behave, Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";

const loginPage = new LoginPage();

Given("Visit login page", () => {
  loginPage.navigateLogin();
});

When("I enter a valid username and password", () => {
    cy.fixture("user").then((user) => {
      loginPage.fillLoginForm(user);
    });
  });

  Then("I click on login button", () => {
    loginPage.clickLogin();
  });

  // Then("user should be able to login and land on dashboard page", () => {

  // });
