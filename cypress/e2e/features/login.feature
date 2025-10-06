Feature: Login feature

    Scenario: To check login functionality
    Given Visit login page
    When I enter a valid username and password
    Then I click on login button
    # Then user should be able to login and land on dashboard page