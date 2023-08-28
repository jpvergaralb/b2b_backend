const express = require('express')
const {
  getTask,
  getTasks,
  postTask,
  deleteTask,
  updateTask,
} = require('../controllers/task.controllers')

const taskRoutes = express.Router()

taskRoutes.route('/')
  .get(getTasks)
  .post(postTask)

taskRoutes.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask)

module.exports = taskRoutes
