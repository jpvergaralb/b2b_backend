const db = require('../../models');

const { Task } = db;

const getTasks = async (req, res) => {
  res.send('This will fetch all tasks');
};

const getTask = async (req, res) => {
  try {
    // get task and its tempalte
    const task = await Task.findByPk(req.params.id);
    const taskTemplate = await task.getTaskTemplate();
    res.status(200).json({ task, taskTemplate });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const postTask = async (req, res) => {
  res.send('Creating task');
};

const updateTask = async (req, res) => {
  res.send(`Updating task ${req.params.id}`);
};

const deleteTask = async (req, res) => {
  res.send(`Deleting task ${req.params.id}`);
};

module.exports = {
  getTasks,
  getTask,
  postTask,
  updateTask,
  deleteTask,
};
