// cypress/pages/SignupPage.js

class SignupPage{
    //Locators
    elements = {
        firstNameInput: () => cy.get('#firstname'),
        lastNameInput: () => cy.get('#lastname'),
        userNameInput: () => cy.get('#userName'),
        passwordInput: () => cy.get('#password'),
        registerButton: () => cy.get('#register'),
        captchFrame: () => cy.get('iframe[title="reCAPTCHA"]'),
        messageBox: () => cy.get('#name'),
    };

    //Actions
    navigate(){
        cy.visit('/register');
    }

    fillRegistrationForm(user){
        this.elements.firstNameInput().type(user.firstName);
        this.elements.lastNameInput().type(user.lastName);
        this.elements.userNameInput().type(user.username);
        this.elements.passwordInput().type(user.password);
    }

    clickRegister(){
        this.elements.registerButton().click();
    }

    verifyCaptcha(){
        this.elements.captchFrame().click();
    }

    verifyAlertMessage(alertText){
        cy.on("window:alert", (txt) => {
        expect(txt).to.contains(alertText);
    });
    }


}

export default SignupPage;