const { faker } = require('@faker-js/faker')

function createRandomUser() {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email()
  const password = faker.internet.password({prefix: "$"})
  const createdAt = faker.date.past()
  const updatedAt = faker.date.recent()

  return {
    email,
    firstName,
    lastName,
    password,
    createdAt,
    updatedAt
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  
   const fakeUsers = []
    for (let i = 0; i < 100; i++) {
      fakeUsers.push(createRandomUser())
    }

    await queryInterface.bulkInsert('users', fakeUsers)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

      await queryInterface.bulkDelete('users', null)
  }
}
