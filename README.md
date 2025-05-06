# Playwright API Test Framework

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Allure Report](https://img.shields.io/badge/Allure-Report-blueviolet)](https://github.com/allure-framework/allure2)

This project is a scalable and easy-to-understand API test automation framework built using:

- [Playwright](https://playwright.dev/docs/test-api-testing)
- [Allure Report](https://github.com/allure-framework/allure-js)
- [Faker.js](https://fakerjs.dev) — for generating dynamic test data

> **Base URL:**  
> `https://reqres.in`

---

## API Test Scenarios

### POST `/api/users` — Creates a new user with random name and job

| Test Case | Description |
|-----------|-------------|
| TC01 | Verify response status is **201 Created** |
| TC02 | Check if response contains **name**, **job**, **id**, and **createdAt** |
| TC03 | Assert **name** matches request data |
| TC04 | Assert **job** matches request data |
| TC05 | Validate **id** is not null |
| TC06 | Check **createdAt** follows **ISO 8601 format** |

---

### GET `/api/users/:id` — Retrieves user information by random ID (1-10)

| Test Case | Description |
|-----------|-------------|
| TC01 | Verify response status is **200 OK** |
| TC02 | Check response includes **data** and **support** as objects |
| TC03 | Validate **data** includes **id**, **email**, **first_name**, **last_name**, and **avatar** |
| TC04 | Validate **support** includes **url** and **text** |

---

### PUT `/api/users/:id` — Updates user details with new random name and job

| Test Case | Description |
|-----------|-------------|
| TC01 | Verify response status is **200 OK** |
| TC02 | Check response includes **name**, **job**, and **updatedAt** |
| TC03 | Assert **name** matches request data |
| TC04 | Assert **job** matches request data |
| TC05 | Validate **updatedAt** follows **ISO 8601 format** |

---

### DELETE `/api/users/:id` — Deletes a user by ID (1-10)

| Test Case | Description |
|-----------|-------------|
| TC01 | Verify response status is **204 No Content** |
| TC02 | Confirm the response body is empty |

---

## Project Structure

```bash
(root folder)
├── tests/
│   └── api-users.spec.ts
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
