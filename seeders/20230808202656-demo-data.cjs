'use strict';

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
    await queryInterface.bulkInsert('users', [
      {
        name: 'John',
        email: 'johndoe2@gmail.com',
        password: 'Johndoe123!',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane',
        email: 'janedoe2@gmail.com',
        password: 'Janedoe123!',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})

  //   await queryInterface.bulkInsert('subjects', [
  //     {
  //       name: 'Math',
  //       category: 'Science',
  //       description: 'Mathematics is the study of numbers, shapes and patterns.',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       userId: 12
  // }
  //   ], {})

  //   const dueDate = new Date();
  //   dueDate.setDate(dueDate.getDate() + 7);
  //   await queryInterface.bulkInsert('tasks', [
  //     {
  //       name: 'Algebra',
  //       category: 'Math',
  //       duration: 60,
  //       description: 'Algebra is a branch of mathematics that substitutes letters for numbers in an equation, so that you can work out what the numbers are.',
  //       status: 'pending',
  //       //this one will have one week from now
  //       dueDate: dueDate,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       subjectId: 6
  //     },
  //     {
  //       name: 'Geometry',
  //       category: 'Math',
  //       duration: 60,
  //       description: 'Geometry is the branch of mathematics concerned with the properties and relations of points, lines, surfaces, solids, and higher dimensional objects.',
  //       status: 'pending',
  //       //this one will have one week from now
  //       dueDate: dueDate,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       subjectId: 6
  //    },
  //   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('users', null, {})
      await queryInterface.bulkDelete('subjects', null, {})
      await queryInterface.bulkDelete('tasks', null, {})
  }
};

