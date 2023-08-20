const getTasks = async (req, res) => {
  res.send('This will fetch all tasks');
};

const getTask = async (req, res) => {
  res.send(`This corresponds to task ${req.params.id}`);
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
