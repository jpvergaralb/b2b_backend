const express = require('express');
const {
  getUser,
  getUsers,
  postUser,
  updateUser,
  deleteUser,
  inscribeUserToCourse,
} = require('../controllers/user.controllers');

const userRoutes = express.Router();

userRoutes.route('/')
  .get(getUsers)
  .post(postUser);

userRoutes.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)
  .post(inscribeUserToCourse);

module.exports = userRoutes;
