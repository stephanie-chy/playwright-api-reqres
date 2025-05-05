import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json',
    },
  },
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
});