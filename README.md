# playwright-api-test-framework

## Overview

This project is an API automation framework built using **Playwright** and **JavaScript**. It follows a modular structure to improve maintainability and scalability.

### Features

- Playwright Test Runner
- Page/Object Client pattern
- JSON Schema Validation (AJV)
- Request and Response Logging
- Automatic Retry Handling
- HTML Test Reports
- Environment Variable Support
- API Key Authentication

---

## Prerequisites

Before you begin, ensure the following are installed:

- Node.js (v18 or later recommended)
- npm
- Git

---

## Clone the Repository

```bash
git clone https://github.com/dinitha/playwright-api-test-framework.git
cd api-tests
```

---

## Install Dependencies

```bash
npm install
```

Install Playwright browsers (required by Playwright):

```bash
npx playwright install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

Example:

```text
API_KEY=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your API key from https://restful-api.dev.

---

## Project Structure

```text
api-tests/
│
├── api/
│   ├── clients/
│   ├── schemas/
│   └── endpoints.js
│
├── tests/
│
├── utils/
│
├── playwright.config.js
├── package.json
└── README.md
```

---

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/objectTests.spec.js
```

Run a specific test by name:

```bash
npx playwright test -g "Verify user is able to add an object"
```

List all available tests:

```bash
npx playwright test --list
```

---

## Test Reports

After executing the tests, open the HTML report using:

```bash
npx playwright show-report
```

---

## Framework Components

### API Clients

Encapsulate all API request logic.

Example:

- `ObjectClient.js`

### Schemas

JSON Schemas used for response validation.

Examples:

- `object.schema.json`
- `object-list.schema.json`
- `delete-object.schema.json`

### Utilities

Contains reusable components such as:

- Logger
- Schema Validator
- Payload Factory

---

## Configuration

Framework configuration is available in:

```text
playwright.config.js
```

This includes:

- Base URL
- Retry configuration
- Reporters
- Default HTTP headers
- API Key configuration

---

## Coding Standards

This project uses:

- Prettier for code formatting
- Four-space indentation
- Single quotes
- Semicolons

To format the project:

```bash
npm run format
```

---

