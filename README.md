# OrangeHRM Cypress Automation Testing

Automated functional testing of the OrangeHRM web application using **Cypress** and the **Page Object Model (POM)** design pattern.

This project focuses on validating core application functionalities across the Login, Directory, and Recruitment modules. It is built to practice UI automation, test case implementation, reusable test structures, and functional validation.

---

## Project Overview

The objective of this project is to automate functional test scenarios on the OrangeHRM application using Cypress.

The framework implements the Page Object Model (POM) to separate test scripts from page interactions, making the automation code easier to maintain, organize, and reuse.

### Modules Covered

| Module | Testing Scope |
|---|---|
| Login | Authentication, input validation, password visibility, forgot password, and logout |
| Directory | Employee search, autocomplete, filtering, reset functionality, and employee details |
| Recruitment | Candidate creation, form validation, resume upload, candidate search, and status filtering |

---

## Tech Stack

- **Programming Language:** JavaScript
- **Automation Framework:** Cypress
- **Design Pattern:** Page Object Model (POM)
- **Runtime Environment:** Node.js
- **Test Data:** JSON Fixtures
- **Version Control:** Git & GitHub

---

## Project Structure

```text
orangehrm-cypress-automation/
│
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   ├── directory.cy.js
│   │   └── recruitment.cy.js
│   │
│   ├── fixtures/
│   │   ├── loginData.json
│   │   ├── directoryData.json
│   │   └── recruitmentData.json
│   │
│   └── support/
│       ├── commands.js
│       ├── e2e.js
│       │
│       └── pageObjects/
│           ├── loginPage.js
│           ├── directoryPage.js
│           └── recruitmentPage.js
│
├── cypress.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/marshandaks/orangehrm-cypress-recruitment.git
```

**2. Navigate to the project directory**

```bash
cd orangehrm-cypress-recruitment
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure the application URL**

Check `cypress.config.js` and make sure the `baseUrl` points to the OrangeHRM demo application:

```javascript
baseUrl: 'https://opensource-demo.orangehrmlive.com'
```

---

## Running Tests

**Open Cypress Test Runner**

```bash
npx cypress open
```

**Run all tests in headless mode**

```bash
npx cypress run
```

**Run a specific test module**

Login:

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

Directory:

```bash
npx cypress run --spec "cypress/e2e/directory.cy.js"
```

Recruitment:

```bash
npx cypress run --spec "cypress/e2e/recruitment.cy.js"
```

---

## Test Coverage

This project contains **43 automated test scenarios** across three modules.

### 1. Login Module

| Test Case ID | Test Scenario |
|---|---|
| TC-LGN-001 | Login with valid credentials |
| TC-LGN-002 | Login with invalid password |
| TC-LGN-003 | Login with invalid username |
| TC-LGN-004 | Login with invalid username and password |
| TC-LGN-005 | Login with empty username and password |
| TC-LGN-006 | Login with empty username |
| TC-LGN-007 | Login with empty password |
| TC-LGN-008 | Validate username case sensitivity |
| TC-LGN-009 | Validate password case sensitivity |
| TC-LGN-010 | Validate masked password |
| TC-LGN-011 | Login with special characters |
| TC-LGN-012 | Forgot password functionality |
| TC-LGN-013 | Logout and access after logout |

### 2. Directory Module

| Test Case ID | Test Scenario |
|---|---|
| TC-DIR-001 | Open Directory menu |
| TC-DIR-002 | Search employee using valid name |
| TC-DIR-003 | Search for a non-existing employee |
| TC-DIR-004 | Search employee using special characters |
| TC-DIR-005 | Search using lowercase letters [BUG-004] |
| TC-DIR-006 | Search employee using paste input [BUG-005] |
| TC-DIR-007 | Type manually and select from autocomplete dropdown |
| TC-DIR-008 | Filter employees by Job Title |
| TC-DIR-009 | Filter employees by Location |
| TC-DIR-010 | Combine Job Title and Location filters |
| TC-DIR-012 | Reset filter functionality |
| TC-DIR-013 | Click Search without entering filters |
| TC-DIR-014 | View employee details by clicking employee card [BUG-018] |
| TC-DIR-015 | Click email button in employee detail panel [BUG-006] |

### 3. Recruitment Module

| Test Case ID | Test Scenario |
|---|---|
| TC-REC-001 | Open Recruitment page |
| TC-REC-002 | Add candidate with valid data |
| TC-REC-003 | Validate required candidate fields |
| TC-REC-004 | Enter invalid email format |
| TC-REC-005 | Enter contact number containing symbols |
| TC-REC-006 | Enter valid contact number |
| TC-REC-007 | Check application date in the past |
| TC-REC-008 | Check application date today |
| TC-REC-010 | Add candidate with consent |
| TC-REC-012 | Add candidate with PDF resume |
| TC-REC-013 | Validate candidate name with one character |
| TC-REC-015 | Add candidate with valid name |
| TC-REC-017 | Upload valid PDF resume |
| TC-REC-018 | Search for a candidate |
| TC-REC-019 | Filter candidates by status |

---

## Automation Approach

The project uses several approaches to organize and execute automated tests:

- **Page Object Model (POM):** Page-specific locators and interactions are organized into reusable page object files.
- **Data-Driven Testing:** Test data is stored separately in JSON fixture files.
- **Custom Commands:** Reusable actions are defined in Cypress support commands.
- **API Interception:** Network requests are intercepted and validated in selected test scenarios.
- **Assertions:** Cypress assertions are used to verify page navigation, UI elements, validation messages, and test results.

---

## Notes

- The `node_modules/` directory is excluded from version control using `.gitignore`.
- Run `npm install` to install project dependencies after cloning.
- The application uses the OrangeHRM demo environment, so test data and application behavior may change.
- Some test scenarios are associated with identified bugs and are marked with their respective bug IDs.

---
