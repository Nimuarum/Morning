import { faker } from '@faker-js/faker';

function generateUser() {
  const username = faker.internet.userName();
  const password = faker.internet.password();

  return { username, password };
} 

module.exports = { generateUser };