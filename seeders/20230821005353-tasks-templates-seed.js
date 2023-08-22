'use strict';
const { faker } = require('@faker-js/faker')
const { QueryTypes } = require('sequelize')

function createRandomTaskTemplate(courseId) {
  const name = faker.animal.horse()
  const category = faker.person.jobType()
  const createdAt = faker.date.past()
  const updatedAt = faker.date.recent()

  return {
    name,
    category,
    createdAt,
    updatedAt,
    courseId
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
    const courses = await queryInterface.sequelize.query('SELECT id FROM "courses"', {
      type: QueryTypes.SELECT,
    });

    const fakeTaskTemplates = []


    for (let i = 0; i < 100; i++) {
      fakeTaskTemplates.push(createRandomTaskTemplate(5))
    }

    await queryInterface.bulkInsert('tasktemplates', fakeTaskTemplates)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

      await queryInterface.bulkDelete('tasktemplates', null)
  }
};
