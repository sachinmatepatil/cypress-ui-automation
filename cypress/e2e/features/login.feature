Feature: Login feature

    Scenario: To check login functionality
    Given Access website 
    When I enter a username webdriver
    And I enter a password webdriver123
    And I click on login button
    Then user should be able to login get message "validation failed"