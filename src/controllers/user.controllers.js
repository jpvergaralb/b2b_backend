require('dotenv').config();
const db = require('../../models');
const jwt = require('jsonwebtoken');

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
    const user = req.user
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const postUser = async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body;
    const user = await User.create({ firstName, lastName, email, password });
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
    res.cookie('authToken', token, {httpOnly: true, secure: true });
    res.status(201).json({response: `User ${user.firstName} created`});
  } catch (error) {
    res.status(500).json({ error });
  }
};  

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password){
    res.status(400).json({error: 'Email and password are required'})
  }

  
    const user = await User.findOne({ where: { email }})
    if (!user){
      res.status(404).json({error: 'User not found'})
    }
  
    const didPasswordMatch = await user.isPasswordValid(password)
    if (!didPasswordMatch){
      res.status(401).json({error: 'Invalid password'})
    }
  
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
    res.cookie('authToken', token, {httpOnly: true, secure: true });
  
    res.status(200).json({response: `User ${user.firstName} logged in`});
}

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
  loginUser,
  updateUser,
  deleteUser,
  inscribeUserToCourse,
};
