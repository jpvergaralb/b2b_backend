// we import whatever is exported in the index.js file in the models folder
const db = require('../../models');

const { User, Course } = db;

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUser = async (req, res) => {
  try {
    // this will get the user and all of its associated tasks
    const user = await User.findByPk(req.params.id);
    const tasks = await user.getTasks();
    const courses = await user.getCourses();
    res.status(200).json({ user, tasks, courses });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const postUser = async (req, res) => {
  res.send('Creating user');
};

const inscribeUserToCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    const course = await Course.findByPk(courseId);
    await user.addCourse(course);
    res.status(200).json({ user, course });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateUser = async (req, res) => {
  res.send(`Updating user ${req.params.id}`);
};

const deleteUser = async (req, res) => {
  res.send(`Deleting user ${req.params.id}`);
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
  inscribeUserToCourse,
};
