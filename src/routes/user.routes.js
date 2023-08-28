const express = require('express')
const {
  getUser,
  getUsers,
  loginUser,
  postUser,
  updateUser,
  deleteUser,
  inscribeUserToCourse,
} = require('../controllers/user.controllers')

const validateToken = require('../middlewares/validateAuthToken.middleware')

const userRoutes = express.Router()

userRoutes.route('/')
  .get(getUsers)

userRoutes.route('/signup')
  .post(postUser)

userRoutes.route('/me')
  .get(validateToken, getUser)

userRoutes.route('/login')
  .post(loginUser)

userRoutes.route('/:id')
  .put(updateUser)
  .delete(deleteUser)
  .post(inscribeUserToCourse)

module.exports = userRoutes
