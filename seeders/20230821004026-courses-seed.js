'use strict';
const { faker } = require('@faker-js/faker')

function createRandomCourse() {
  const name = faker.animal.horse()
  const category = faker.person.jobType()
  const description = faker.commerce.productDescription()
  const createdAt = faker.date.past()
  const updatedAt = faker.date.recent()

  return {
    name,
    category,
    description,
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

    const fakeCourses = []
    for (let i = 0; i < 100; i++) {
      fakeCourses.push(createRandomCourse())
    }

    await queryInterface.bulkInsert('courses', fakeCourses)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

      await queryInterface.bulkDelete('courses', null)
  }
};
