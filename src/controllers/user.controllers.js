//we import whatever is exported in the index.js file in the models folder
const db = require('../../models');
const { User } = db;

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUser = async (req, res) => {
  res.send(
    { response: `This corresponds to user ${req.params.id}` },
  );
};

const postUser = async (req, res) => {
  res.send('Creating user');
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
};
