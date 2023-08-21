const db = require('../../models');
const Course = db.Course;

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll()
    res.status(200).json({courses})
  } catch (error) {
    res.status(500).json({error})
  }
};

const getCourse = async (req, res) => {
  try {
    //this will find the course and all of its associated task templates
    const course = await Course.findByPk(req.params.id)
    const taskTemplates = await course.getTaskTemplates()
    res.status(200).json({course, taskTemplates})
  } catch (error) {
    res.status(500).json({error})
  }
};

const postCourse = async (req, res) => {
  res.send('Creating Course');
};

const updateCourse = async (req, res) => {
  res.send(`Updating Course ${req.params.id}`);
};

const deleteCourse = async (req, res) => {
  res.send(`Deleting Course ${req.params.id}`);
};

module.exports = {
  getCourses,
  getCourse,
  postCourse,
  updateCourse,
  deleteCourse,
};
