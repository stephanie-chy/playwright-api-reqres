import { faker } from '@faker-js/faker';

export function generateRandomUserData() {
  const name = `${faker.person.firstName()} ${faker.person.lastName()}`;
  const job = faker.person.jobTitle();

  return {
    name,
    job,
  };
}

export function getRandomId() {
  return Math.floor(Math.random() * 10) + 1; // returns 1-10
}