Feature: New user signup

    Scenario: To check signup flow
    Given Visit demoqa register site page 
    When I enter valid registration details
    And I check captacha
    And I click on register button
    Then User registration should be successful
