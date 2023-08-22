// we import whatever is exported in the index.js file in the models folder
const db = require('../../models');

const { User, Course } = db;

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']],
    });
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
  try {
    const {firstName, lastName, email, password} = req.body;
    const user = await User.create({ firstName, lastName, email, password });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error });

  }
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
  res.status(200).send(`Updating user ${req.params.id}`);
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send(`User ${req.params.id} not found`);
    }
    await user.destroy();
    res.status(200).send(`User ${req.params.id} deleted`);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
  inscribeUserToCourse,
};
