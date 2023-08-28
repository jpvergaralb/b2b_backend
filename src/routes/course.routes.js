const express = require('express')
const {
  getCourse,
  getCourses,
  postCourse,
  deleteCourse,
  updateCourse,
} = require('../controllers/course.controller')

const courseRouter = express.Router()

courseRouter.route('/')
  .get(getCourses)
  .post(postCourse)

courseRouter.route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse)

module.exports = courseRouter
