import {Behave, Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import SignupPage from "../../pages/SignupPage";

const signupPage = new SignupPage();

Given("Visit demoqa register site page", () => {
	signupPage.navigate();
});

When("I enter valid registration details", () =>{
	cy.fixture("user").then((user) => {
		signupPage.fillRegistrationForm(user);
	});
});

When("I check captacha", () => {
	signupPage.verifyCaptcha();
});

When("I click on register button", () => {
	signupPage.clickRegister();
});

Then("User registration should be successful", () => {
	signupPage.verifyAlertMessage();
});
