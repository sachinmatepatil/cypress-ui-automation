// cypress/pages/LoginPage.js


class LoginPage{
    //Locators
    elements={
        usernameInput: () => cy.get('#userName'),
        passwordInput: () => cy.get('#password'),
        loginButton: () => cy.get('#login')
    };   

//Actions
navigateLogin(){
    cy.visit('/login');
}

fillLoginForm(user){
    this.elements.usernameInput().type(user.username);
    this.elements.passwordInput().type(user.password);
}

clickLogin(){
    this.elements.loginButton().click();
}

// verifyLogin(){

// }

}

export default LoginPage;