'use strict';
const { faker } = require('@faker-js/faker')
const { QueryTypes } = require('sequelize')

function createRandomTask(userId, taskTemplateId) {
  const name = faker.animal.horse()
  const category = faker.person.jobType()
  const duration = faker.number.int({min: 1, max: 100})
  const createdAt = faker.date.past()
  const updatedAt = faker.date.recent()

  return {
    name,
    category,
    duration,
    createdAt,
    updatedAt,
    userId,
    taskTemplateId
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
    const users = await queryInterface.sequelize.query('SELECT id FROM "users"', {
      type: QueryTypes.SELECT,
    });

    const tasktemplates = await queryInterface.sequelize.query('SELECT id FROM "tasktemplates"', {
      type: QueryTypes.SELECT,
    });

    const fakeTasks = []


    for (let i = 11; i < 100; i++) {
      fakeTasks.push(createRandomTask(5, 11))
    }


    await queryInterface.bulkInsert('tasks', fakeTasks)



  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

      await queryInterface.bulkDelete('tasks', null)
  }
};
