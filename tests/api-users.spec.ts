import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';

test.describe('User Management API Tests', () => {
  
  // Test Case: Create a new user with random name and job
  test('POST /api/users - Create user', async ({ request }, testInfo) => {
    allure.feature('User Management');
    allure.story('Create User');
    allure.severity('Critical');

    // Generate random name and job
    const name = faker.person.firstName();
    const job = faker.person.jobTitle();
    const payload = { name, job };

    await test.step('Send POST request to create user', async () => {
      const response = await request.post('/api/users', { data: payload });

      // Attach request payload to report
      await testInfo.attach('Request Payload', {
        body: JSON.stringify(payload, null, 2),
        contentType: 'application/json',
      });

      // Parse response JSON
      const resBody = await response.json();

      // Attach response body to report
      await testInfo.attach('Response Body', {
        body: JSON.stringify(resBody, null, 2),
        contentType: 'application/json',
      });

      // TC01: Verify response status is 201 Created
      expect(response.status()).toBe(201);

      // TC02: Check if response contains name, job, id, and createdAt
      expect(resBody).toHaveProperty('name');
      expect(resBody).toHaveProperty('job');
      expect(resBody).toHaveProperty('id');
      expect(resBody).toHaveProperty('createdAt');

      // TC03: Assert name matches request data
      expect(resBody.name).toBe(name);

      // TC04: Assert job matches request data
      expect(resBody.job).toBe(job);

      // TC05: Validate id is not null
      expect(resBody.id).toBeTruthy();

      // TC06: Check createdAt follows ISO 8601 format
      expect(resBody.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  // Test Case: Retrieve user information by random ID
  test('GET /api/users/:id - Retrieve user info', async ({ request }, testInfo) => {
    allure.feature('User Management');
    allure.story('Retrieve User');
    allure.severity('Normal');

    // Generate random user ID between 1-10
    const userId = Math.floor(Math.random() * 10) + 1;

    await test.step(`Send GET request for user ID ${userId}`, async () => {
      const response = await request.get(`/api/users/${userId}`);

      // Parse response JSON
      const resBody = await response.json();

      // Attach response body to report
      await testInfo.attach('Response Body', {
        body: JSON.stringify(resBody, null, 2),
        contentType: 'application/json',
      });

      // TC01: Verify response status is 200 OK
      expect(response.status()).toBe(200);

      // TC02: Check response includes data and support as objects
      expect(resBody).toHaveProperty('data');
      expect(resBody).toHaveProperty('support');

      const { data, support } = resBody;

      // TC03: Validate that data includes id, email, first_name, last_name, and avatar
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('email');
      expect(data).toHaveProperty('first_name');
      expect(data).toHaveProperty('last_name');
      expect(data).toHaveProperty('avatar');

      // TC04: Validate support includes url and text
      expect(support).toHaveProperty('url');
      expect(support).toHaveProperty('text');
    });
  });

  // Test Case: Update user details with new random name and job
  test('PUT /api/users/:id - Update user', async ({ request }, testInfo) => {
    allure.feature('User Management');
    allure.story('Update User');
    allure.severity('Critical');

    // Generate random user ID between 1-10
    const userId = Math.floor(Math.random() * 10) + 1;
    // Generate random name and job
    const name = faker.person.firstName();
    const job = faker.person.jobTitle();
    const payload = { name, job };

    await test.step(`Send PUT request to update user ID ${userId}`, async () => {
      const response = await request.put(`/api/users/${userId}`, { data: payload });

      // Attach request payload to report
      await testInfo.attach('Request Payload', {
        body: JSON.stringify(payload, null, 2),
        contentType: 'application/json',
      });

      // Parse response JSON
      const resBody = await response.json();

      // Attach response body to report
      await testInfo.attach('Response Body', {
        body: JSON.stringify(resBody, null, 2),
        contentType: 'application/json',
      });

      // TC01: Verify response status is 200 OK
      expect(response.status()).toBe(200);

      // TC02: Check response includes name, job, and updatedAt
      expect(resBody).toHaveProperty('name');
      expect(resBody).toHaveProperty('job');
      expect(resBody).toHaveProperty('updatedAt');

      // TC03: Assert name matches request data
      expect(resBody.name).toBe(name);

      // TC04: Assert job matches request data
      expect(resBody.job).toBe(job);

      // TC05: Validate updatedAt follows ISO 8601 format
      expect(resBody.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  // Test Case: Delete a user by random ID
  test('DELETE /api/users/:id - Delete user', async ({ request }, testInfo) => {
    allure.feature('User Management');
    allure.story('Delete User');
    allure.severity('Minor');

    // Generate random user ID between 1-10
    const userId = Math.floor(Math.random() * 10) + 1;

    await test.step(`Send DELETE request for user ID ${userId}`, async () => {
      const response = await request.delete(`/api/users/${userId}`);

      // TC01: Verify response status is 204 No Content
      expect(response.status()).toBe(204);

      // TC02: Confirm the response body is empty
      expect(await response.text()).toBe('');
    });
  });

});