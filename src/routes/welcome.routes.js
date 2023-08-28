const express = require('express')
const {
  getWelcome,
} = require('../controllers/welcome.controller')

const welcomeRouter = express.Router()

welcomeRouter.route('/')
  .get(getWelcome)

module.exports = welcomeRouter
