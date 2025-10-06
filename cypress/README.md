# 🧪 Cypress UI Automation Framework (BDD + POM)

This is a **Cypress-based UI automation framework** built using the **BDD (Cucumber)** approach with the **Page Object Model (POM)** design pattern.  
It automates web UI flows like user registration on [DemoQA](https://demoqa.com/register) and is designed for **scalability, reusability, and CI/CD readiness**.

---

## 📌 Features

✅ Cypress + Cucumber Integration (BDD with Gherkin syntax)  
✅ Page Object Model (POM) for clean and maintainable code  
✅ Data-Driven Testing using fixture files  
✅ Centralized configuration via `cypress.config.js`  
✅ Alert and UI validation support  
✅ Modular structure for reusability and scalability  
✅ CI/CD ready (GitHub Actions or Jenkins)

---

## 🧱 Technologies Used

| Tool / Library | Purpose |
|-----------------|----------|
| **Cypress** | Core UI automation tool |
| **@badeball/cypress-cucumber-preprocessor** | BDD with Gherkin syntax |
| **JavaScript (ES6)** | Test scripting language |
| **Fixture JSONs** | External test data management |
| **Mochawesome / Allure (optional)** | Reporting |
| **GitHub Actions (optional)** | CI/CD execution |

---


## How to Run

```bash
npm install
npx cypress open #Cypress test runner browser
npx cypress run #headless

💻 Author

Sachin Mate
QA Automation Engineer | Python, Cypress, API & UI Test Automation